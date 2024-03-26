"use client";

// Hooks
import React, { 
  useState, 
  useEffect, 
  useContext 
} from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DashboardContext } from "@/app/context/DashboardContext";
// Actions
import ConstructArtPrompt from "@/app/lib/actions/constructArtPrompt";
import updateUserCredits from "@/app/lib/actions/supabase-data/updateUserCredits";
// Types
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import { CardFormDataType } from "@/app/utils/types/types";
// Utils
import PostHogClient from "@/app/lib/posthog/posthog";
import { ArtPromptOptions } from "@/app/utils/data/artPromptOptions";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
// Components
import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import { ArtPromptAccordion, ArtPromptAccordionData } from "@/app/components/card-creator/ArtPromptAccordion";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Badge from "@mui/material/Badge";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
// Icons
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PaletteIcon from "@mui/icons-material/Palette";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import PaidIcon from '@mui/icons-material/Paid';

type CardRenderProps = {
  cardData?: CardsTableType | CardFormDataType | null;
  showCardRender?: boolean;
};

export default function CardCreatorForm({
  cardData,
}: CardRenderProps) {
  // Utils
  const { userProfileData } = useContext(DashboardContext);
  const posthog = PostHogClient();

  // Prompt states
  const [currentCredits, setCurrentCredits] = useState<number>(0);
  const [promptTab, setPromptTab] = useState(0);
  const [artPromptSelections, setArtPromptSelections] = useState<{
    [category: string]: string
  }>({});
  // API timer states
  const [isGeneratingArt, setIsGeneratingArt] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  // Card creation states
  const [cardMode, setCardMode] = useState<"initial" | "anomaly">("initial");
  const [showFlavorText, setShowFlavorText] = useState<boolean>(true);
  // Card art states
  const [showCardArtOptions, setShowCardArtOptions] = useState<boolean>(false);
  const [cardArtOptions, setCardArtOptions] = useState<{
    options: string[];
    activeOption: number;
  }>({
    options: [],
    activeOption: -1,
  });
  // Feedback states
  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  const {
    setValue,
    control,
    watch,
    trigger,
    formState: {
      isSubmitting,
      isDirty,
    },
  } = useFormContext<CardFormDataType>();
  const form = watch();

  // DALL-E API fetch with retry
  async function fetchWithRetry(
    url: string, 
    body: Record<string, unknown>, 
    retries = 3, 
    delay = 1000
  ) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
  
        if (!response.ok) {
          throw new Error(`Attempt ${attempt}: Server responded with status ${response.status}`);
        }
  
        return response;
      } catch (error) {
        console.error(`Attempt ${attempt}:`, error);
  
        if (attempt === retries) {
          throw new Error(`Failed after ${retries} attempts.`);
        }
  
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  }
  
  // Generate card art
  async function generateArt() {
    setIsGeneratingArt(true);
    setTimerStart(Date.now());
    setElapsedTime(0);
  
    const newIntervalId = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
    }, 1000) as unknown as number;
    setIntervalId(newIntervalId);
  
    if (
    userProfileData &&
    userProfileData.credits !== undefined &&
    userProfileData.credits > 0 && 
    form.cardArtPrompt
  ) {
      setAlertInfo({
        type: "info",
        icon: <InfoIcon />,
        message: "Generating art..."
      });
      
      try {
        const constructedArtPrompt = await ConstructArtPrompt(
          artPromptSelections, form.cardArtPrompt
        );
  
        const response = await fetchWithRetry(
          "/api/data/generate-card-art", {
          prompt: constructedArtPrompt,
        });
  
        if (!response) {
          throw new Error('No response received.');
        }

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
  
        const { imageUrl } = await response.json();
        
        if (imageUrl) {
          setAlertInfo({
            type: "success",
            icon: <CheckIcon />,
            message: "Artwork generated successfully!"
          });
  
          await handleUpdateCredits();

          if (
            userProfileData && 
            userProfileData.id
          ) {
            posthog.capture({
              distinctId: userProfileData.id,
              event: "🎨 New Card Image Generated"
            });
          }
          
          setValue("cardArt", imageUrl);
          setCardArtOptions(prevState => {
            if (!prevState.options.includes(imageUrl)) {
              return {
                options: [...prevState.options, imageUrl],
                activeOption: prevState.options.length,
              };
            } else {
              return prevState;
            }
          });
  
          if (cardArtOptions.options.length > 0) {
            setShowCardArtOptions(true);
          };
          
          await trigger("cardArt");
        } else {
          throw new Error('Image URL not found in the response.');
        }
        
      } catch (error) {
        console.error(error);
        setAlertInfo({
          type: "error",
          icon: <ErrorIcon />,
          message: "Failed to generate artwork. Please try again later or check OpenAI's status here: https://status.openai.com/"
        });
      } finally {
        setTimeout(() => {
          clearInterval(newIntervalId);
          setIsGeneratingArt(false);
          setElapsedTime(Date.now() - timerStart);
          setShowAlertInfo(false);
        }, 5000);
      }
    }
  }

  // Update user credits
  async function handleUpdateCredits() {
    const userId = userProfileData?.id;
    const userCreditsChange = 1;
    const operation = "subtract";
    try {
      await updateUserCredits({
        userId: userId as string,
        currentUserCredits: currentCredits as number,
        userCreditsChange: userCreditsChange,
        operation: operation,
      });
      console.log("User spent 1 credit!");
    } catch (error) {
      setAlertInfo({
        type: "error",
        icon: <ErrorIcon />,
          message: (error as Error).message || "Failed to update credits. Please try again."
      });
      setShowAlertInfo(true);
      setTimeout(() => setShowAlertInfo(false), 5000);
    }
  }

  // Flavor visibility handler
  // make this inline
  function handleShowFlavorTextChange() {
    setShowFlavorText(!showFlavorText);
  };

  // Prompt tab handler
  function handlePromptTabChange(
    event: React.SyntheticEvent,
    newPromptTab: number
  ) {
    setPromptTab(newPromptTab);
  };

  // Art prompt options handler
  const handleSelectionChange = (
    category: keyof typeof ArtPromptOptions,
    selectedOption: string
  ) => {
    setArtPromptSelections(prev => ({
      ...prev,
      [category]: selectedOption,
    }));
  };

  // Current card art options handler
  function handleCardArtOptionChange(
    index: number
  ) {
    setCardArtOptions(prevState => ({
      ...prevState,
      activeOption: index,
    }));
    setValue(
      "cardArt", 
      cardArtOptions.options[index]
    );
  };

  // Art prompt accordions
  const renderedAccordions = ArtPromptAccordionData
    .map(({ 
      category, 
      title 
    }) => (
      <ArtPromptAccordion
        key={category}
        category={
          category as keyof typeof 
          ArtPromptOptions
        }
        title={title}
        selectedOptions={
          artPromptSelections[category] || ""
        }
        onSelectionChange={
          handleSelectionChange
        }
      />
  ));

  // Set initial art options
  useEffect(() => {
    if (cardData?.cardArt) {
      setCardArtOptions({
        options: [cardData.cardArt],
        activeOption: 0,
      });
    }
  }, [cardData]);
  
  // Set initial credits
  useEffect(() => {
    if (userProfileData?.credits !== undefined) {
      setCurrentCredits(userProfileData?.credits);
    }
  }, [userProfileData?.credits])

  // Reset timer on new art generation
  useEffect(() => {
    if (isGeneratingArt) {
      setElapsedTime(0);
    }
  }, [isGeneratingArt]);

  // Clear interval on unmount 
  // to prevent memory leaks
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    // Outer container
    <Box
      id="card-form-container-outer"
      className="
        flex
        flex-col
        justify-start
        items-center
        w-full
      "
    >
      {/* Inner Container */}
      <Box
        id="card-form-container-inner"
        className="
          flex
          flex-col-reverse
          md:flex-row
          justify-start
          items-start
          w-full
          gap-2
          md:gap-8
          md:px-0
          px-6
        "
      >
        {/* Prompt Container */}
        <Box
          id="card-form-prompt-container"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            md:w-1/2
            border
            border-neutral-700
            bg-neutral-800
            rounded-md
            md:shadow-xl
            shadow-lg
            md:shadow-neutral-950/25
            shadow-neutral-950/50
          "
        >
          {/* Prompt Tabs */}
          <Box
            id="card-form-prompt-tabs-container"
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              border-b
              border-neutral-700
            "
          >
            <Tabs
              value={promptTab}
              onChange={handlePromptTabChange}
              aria-label="icon position tabs example"
            >
              <Tab
                icon={<PaletteIcon />}
                iconPosition="start"
                label="Generate Art"
              />
              <Tab
                icon={<SmartToyIcon />}
                iconPosition="start"
                label="Brainstorm"
              />
            </Tabs>
          </Box>
          {/* Prompt Input Fields */}
          <Box
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              gap-4
              p-4
              pt-6
              border-b
              border-neutral-700
            "
          >
            {/* Input: AI prompt */}
            {promptTab === 1 && (
            <Controller
              name="cardPrompt"
              control={control}
              defaultValue=""
              render={({
                field,
                fieldState: {
                  error
                }
              }) => (
                <TextField
                  {...field}
                  multiline
                  disabled
                  label="AI brainstorm (coming soon)"
                  error={!!error}
                  helperText={
                    error ? 
                    error.message : null
                  }
                  rows={4}
                  variant="outlined"
                  className="
                    w-full
                    bg-neutral-900/50
                  "
                />
              )}
            />)}
            
            {/* Input: AI art prompt */}
            {promptTab === 0 && (
            <Controller
              name="cardArtPrompt"
              control={control}
              defaultValue=""
              render={({
                field,
                fieldState: {
                  error
                }
              }) => (
                <TextField
                  {...field}
                  multiline
                  disabled={
                    !userProfileData?.id ||
                    currentCredits === 0 ||
                    isGeneratingArt ||
                    isSubmitting
                    // generateArtLimit >= 3 ||
                  }
                  placeholder="Generate art for the card..."
                  label={
                    isGeneratingArt
                      ? `Generating art in ${Math.floor(elapsedTime / 1000)} seconds...`
                      : "Art prompt"
                  }
                  error={!!error}
                  helperText={
                    error ? 
                    error.message : null
                  }
                  rows={4}
                  variant="outlined"
                  className={clsx("flex w-full",
                    {
                    "bg-neutral-900/50": currentCredits > 0,
                    "text-red-400 bg-red-900/50": currentCredits === 0,
                    }
                  )}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                      >
                        <Tooltip
                          title={`${currentCredits} credits left`}
                          arrow
                        >
                          <span className="tooltip-wrapper">
                            <IconButton
                              onClick={generateArt}
                              disabled={
                                field.value === "" ||
                                !userProfileData?.id ||
                                currentCredits === 0 ||
                                isGeneratingArt ||
                                isSubmitting
                              }
                              size="small"
                              className="ml-2 mt-auto"
                            >
                              {isGeneratingArt ? (
                                <CircularProgress size={24} />
                              ) : currentCredits === 0 ? (
                                <Typography
                                  variant="overline"
                                  className={clsx("font-semibold",
                                    {
                                    "text-white": currentCredits > 0,
                                    "text-red-500": currentCredits === 0,
                                    }
                                  )}
                                >
                                  No credits left..
                                </Typography>
                              ) : (
                                <Badge
                                  badgeContent={currentCredits}
                                  color={
                                    currentCredits === 0 ? 
                                    "error" : "success"
                                  }
                                >
                                  <SendIcon
                                    className={clsx(
                                      "",
                                      field.value === "" ? 
                                      "text-neutral-700" : 
                                      "text-neutral-300"
                                    )}
                                  />
                                </Badge>
                              )}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />)}
            {currentCredits === 0 && (
              <Box
                className="
                  flex
                  flex-col
                  justify-start
                  items-start
                  w-full
                  gap-4
                  p-4
                  rounded-md
                  bg-neutral-900/50
                "
              >
                <Typography
                  variant="subtitle2"
                  className="
                  
                  text-neutral-400"
                >
                  You&apos;re out of credits. 
                  Buy more credits to continue creating cards, 
                  and support the development of Nexus.
                </Typography>
                <Link
                  href="/dashboard/credits"
                  className="w-full"
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PaidIcon />}
                    className="
                      w-full
                      text-neutral-200
                      hover:text-white
                      bg-teal-400/25
                      hover:bg-teal-400/50
                      border-teal-400/80
                      hover:border-teal-400
                    "
                  >
                    Get more credits
                  </Button>
                </Link>
              </Box>
            )}
            
            {/* Alert */}
            {showAlertInfo && (<Alert
              severity={alertInfo?.type}
              icon={
                alertInfo ? 
                alertInfo.icon : 
                undefined
              }
            >
              {
                alertInfo ? 
                alertInfo.message : 
                "Error"
              }
            </Alert>)}

            {/* Art Prompt Selections */}
            {
            promptTab === 0 && 
            artPromptSelections && (
            <Box
              className="
                flex
                flex-row
                justify-start
                items-start
                flex-wrap
                w-full
                gap-2
              "
            >
              {Object.entries(artPromptSelections).map(
                ([category, selection]) => (
                <Typography
                  key={category}
                  variant="caption"
                  className="
                    text-teal-400
                    bg-teal-800/25 
                    font-light 
                    rounded-full 
                    text-xs 
                    px-2
                    py-1
                  "
                >
                  {selection}
                </Typography>
              ))}
            </Box>)}
            
          </Box>
          {/* Art Prompt Options Accordions */}
          {promptTab === 0 && (
            <Box
              className="
                flex
                flex-col
                justify-start
                items-start
                bg-neutral-900
                rounded-b-lg
              "
            >
              {/* Art Prompt Options Title */}
              <Box
                className="
                  flex
                  flex-col
                  justify-between
                  items-center
                  bg-neutral-900
                  w-full
                  gap-1
                  border-b
                  border-neutral-700
                "
              >
                <Box
                  className="
                    flex
                    flex-row
                    justify-between
                    items-center
                    px-4
                    pt-2
                    w-full
                  "
                >
                  <Typography
                    variant="subtitle2"
                    className="
                      font-semibold
                      text-teal-500
                    "
                  >
                    ART DIRECTION
                  </Typography>
                  <Typography
                    variant="overline"
                    component={"span"}
                    className="
                      text-teal-500
                    "
                  >
                    {Object.keys(artPromptSelections).length}
                    <Typography
                      variant="overline"
                      className="
                        text-neutral-500
                      "
                    >
                      /9 selected
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  className="
                    flex
                    flex-col
                    justify-start
                    items-start
                    px-4
                    pb-3
                    w-full
                  "
                >
                  <Typography
                    variant="body2"
                  >
                    Select options to include them in the art generation prompt.
                  </Typography>
                </Box>
              </Box>
              
              {/* Prompt Options Container */}
              <Box
                id="art-prompt-options-container"
                className="
                  flex
                  flex-row
                  justify-center
                  items-start
                  flex-wrap
                  w-full
                  rounded-xl
                  gap-0
                  my-0
                "
              >
                {/* Art Prompt Options Accordions */}
                {renderedAccordions}
              </Box>
            </Box>
          )}
        </Box>

        {/* Card Render */}
        <Box
          id="card-render-container"
          className="
            flex
            flex-col
            justify-start
            items-center
            w-full
            h-full
            md:w-1/2
            px-0
            pb-6
            pt-2
            md:px-6
            md:pt-4
            md:pb-8
            md:border
            md:border-neutral-700
            md:bg-neutral-800
            md:rounded-md
            gap-4
          "
        >
          {/* Additional Options */}
          {isDirty && (
          <Box
            className="
              flex
              flex-col
              justify-center
              items-center
              w-full
            "
          >
            <FormGroup
              row={true}
            >
              <Tooltip title={
                cardMode === "initial" ? 
                "Switch to Anomaly Mode" : 
                "Switch to Initial Mode"
              }>
                <FormControlLabel
                  onChange={() => {
                    setCardMode(
                      cardMode === "initial" ? 
                      "anomaly" : 
                      "initial"
                    )
                  }}
                  control={
                    <Switch
                      defaultChecked
                      checked={cardMode === "initial"}
                    />
                  } 
                  label={
                    cardMode === "initial" ? 
                    "Initial Mode" : 
                    "Anomaly Mode"
                  }
                />
              </Tooltip>
              {form.cardText && (
                <FormControlLabel
                  onChange={handleShowFlavorTextChange}
                  control={
                    <Checkbox
                      checked={
                        showFlavorText && 
                        form.cardText.length <= 352
                      }
                      size="small"
                    />
                  } 
                  label={
                    <Typography
                      variant="subtitle2"
                      className="
                        hover:text-neutral-400
                        font-medium
                      "
                    >
                      Flavor Text
                    </Typography>
                  }
                />
              )}
              {form.cardType && (
                form.cardType === "entity" || 
                form.cardType === "entityEffect" || 
                form.cardType === "entityObject"
              ) && cardMode === "initial" && (
                <FormControlLabel
                  onChange={() => {
                    form.cardUnitType === "melee" ? 
                    setValue("cardUnitType", "ranged") : 
                    setValue("cardUnitType", "melee")
                  }}
                  control={
                    <Checkbox
                      checked={form.cardUnitType === "ranged"}
                      size="small"
                    />
                  } 
                  label={
                    <Typography
                      variant="subtitle2"
                      className="
                      hover:text-neutral-400
                        font-medium
                      "
                    >
                      {
                        form.cardUnitType === "melee" ? 
                        "Melee" : "Ranged"
                      }
                    </Typography>
                  }
                />
              )}
              {form.cardType && form.cardType !== "event" && (
                <FormControlLabel
                  onChange={() => {
                    form.cardSuperType === "default" || 
                    form.cardSuperType === "" ? 
                    setValue("cardSuperType", "mythic") : 
                    setValue("cardSuperType", "default")
                  }}
                  control={
                    <Checkbox
                      checked={form.cardSuperType === "mythic"}
                      size="small"
                    />
                  } 
                  label={
                    <Typography
                      variant="subtitle2"
                      className="
                      hover:text-neutral-400
                        font-medium
                      "
                    >
                      Mythic
                    </Typography>
                  }
                />
              )}
            </FormGroup>
            {/* Alerts */}
            <Box
              className="
                flex
                flex-col
                justify-start
                items-start
                w-full
              "
            >
            {
              form.cardType && 
              form.cardType.length === 1 && 
              form.cardType.includes("") && (
              <Typography
                variant="body2"
                className="
                  flex 
                  justify-center
                  items-center
                  w-full
                  py-2
                  rounded-sm
                  bg-red-500/20
                  text-red-500
                "
              >
                Card type is required!
              </Typography>)
            }
            </Box>
          </Box>)}

          {/* Div is for screenshot */}
          <div 
            id="nexus-form-container" 
            style={{ 
              borderRadius: "12.5px" 
            }}
          >
            {/* Card Render / Form */}
            <NexusCardForm
              cardMode={cardMode}
              showFlavorText={showFlavorText}
            />
          </div>

          {cardMode === "anomaly" && (
            <Typography
              variant="body2"
              className="
                flex 
                justify-center
                items-center
                w-full
                bg-neutral-900/50
                py-2
                px-3
              "
            >
              {"Each Nexus card has an initial mode (the card above), and an anomaly mode. Cards can be converted to its anomaly mode, so it can be played as an anomaly (resource card) instead of its initial mode card. The anamoly mode typically lets you Lock {L} the card to make energy. But a card's anomaly mode can also have other effects. The default anomaly mode, converts the card into one of the five Common Anomalies. Anything other than that is considered an Uncommon Anomaly."}
            </Typography>
          )}

          {/* Card Art Options */}
          {showCardArtOptions && (
          <Box
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              gap-2
              p-4
              rounded-lg
              bg-neutral-900
            "
          >
            <Typography
                variant="subtitle2"
                className="
                  text-neutral-500
                  font-medium
                "
              >
                {
                  form.cardName ? 
                  `${form.cardName} art options` : 
                  "Card art options"
                }
              </Typography>
            <Box
              className="
                flex
                flex-row
                justify-center
                items-center
                w-full
                gap-2
              "
            >
              {cardArtOptions
                .options
                .map((
                  imageUrl, 
                  index
                ) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: "1/1",
                    maxHeight: "144px",
                  }}
                  className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    w-full
                    gap-2
                  "
                >
                  <Image
                    key={index}
                    src={imageUrl}
                    fill
                    alt={`Card art option ${index}`}
                    onClick={handleCardArtOptionChange.bind(null, index)}
                    style={{ objectFit: "cover"}}
                    className={clsx("rounded-md border border-neutral-500 shadow-md shadow-neutral-950/50",
                      {
                        "opacity-100 border-teal-500": index === cardArtOptions.activeOption,
                        "opacity-25 hover:opacity-100 hover:cursor-pointer hover:shadow-neutral-950": index !== cardArtOptions.activeOption,
                      }
                    )}
                  />
                </Box>
              ))}
            </Box>
          </Box>)}
        </Box>
      </Box>
    </Box>
  );
};