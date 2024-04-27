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
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
// Custom components
import ArtPromptOptionsSections from "@/app/components/card-creator/ArtPromptOptionsSections";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
// Icons
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import PaidIcon from '@mui/icons-material/Paid';
import { ArtPromptOptionsData } from "@/app/utils/data/artPromptOptions";

type CardRenderProps = {
  cardData?: CardsTableType | CardFormDataType | null;
};

export default function ArtPromptManager({
  cardData,
}: CardRenderProps) {
  // Utils
  const { userProfileData } = useContext(DashboardContext);
  const posthog = PostHogClient();

  // Prompt states
  const [currentCredits, setCurrentCredits] = useState<number>(0);
  const [artPromptSelections, setArtPromptSelections] = useState<{
    [category: string]: string | null;
  }>({});
  // API timer states
  const [isGeneratingArt, setIsGeneratingArt] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  // Card creation states
  
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
      // isDirty,
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
    form.im_art_prompt
  ) {
      setAlertInfo({
        type: "info",
        icon: <InfoIcon />,
        message: "Generating art..."
      });
      
      try {
        const constructedArtPrompt = await ConstructArtPrompt(
          artPromptSelections, form.im_art_prompt
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
          
          setValue("im_art", imageUrl);
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
          
          await trigger("im_art");
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

  // Art prompt options handler
  const handleSelectionChange = (
    category: string, 
    selectedOptionTitle: string | null
  ) => {
    setArtPromptSelections(prev => ({
      ...prev,
      [category]: selectedOptionTitle
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
      "im_art", 
      cardArtOptions.options[index]
    );
  };

  // Set initial art options
  useEffect(() => {
    if (cardData?.im_art) {
      setCardArtOptions({
        options: [cardData.im_art],
        activeOption: 0,
      });
    }
  }, [cardData]);

  // Update art prompt options in form
useEffect(() => {
  if (
    artPromptSelections && 
    Object
      .keys(artPromptSelections)
      .length > 0) {
    const filteredValues = Object
      .values(artPromptSelections)
      .filter(v => v !== null) as string[];
    setValue(
      "im_art_prompt_options", 
      filteredValues.length > 0 ? filteredValues : [""]
    );
  } else {
    setValue(
      "im_art_prompt_options", 
      [""]
    );
  }
}, [
  artPromptSelections, 
  setValue
]);
  
  // Set initial credits
  useEffect(() => {
    if (userProfileData?.credits !== undefined) {
      setCurrentCredits(userProfileData?.credits);
    } else if (!userProfileData) {
      setCurrentCredits(2);
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
        h-full
      "
    >
      {/* Inner Container */}
      <Box
        id="card-form-container-inner"
        className="
          flex
          flex-col
          justify-between
          items-start
          w-full
          md:px-0
          px-6
        "
      >
        
        {/* Prompt Container */}
        <Box
          id="card-form-prompt-container"
          className="
            sticky 
            top-0
            flex
            flex-col
            sm:h-screen
            lg:max-w-[480px]
            w-full
            sm:border-t
            lg:border-t-0
            border-l-0
            lg:border-l
            border-neutral-700
            mb-4
            sm:mb-0
          "
        >
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
            <Controller
              name="im_art_prompt"
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
                  }
                  placeholder="Generate art for the card..."
                  label={
                    isGeneratingArt
                      ? `Generating art in ${Math.floor(elapsedTime / 1000)} seconds...`
                      : "AI art prompt"
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
            />
            {/* Credits */}
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
            {showAlertInfo && (
              <Alert
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
              </Alert>
            )}

            {/* Art Prompt Selections */}
            {artPromptSelections && (
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
                  ([category, selection]) => selection && (
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
              </Box>
            )}
          </Box>
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
                  form.im_name ? 
                  `${form.im_name} art options` : 
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
                      aspectRatio: "4/3",
                      maxHeight: "400px",
                      maxWidth: "300px",
                      minxHeight: "100px",
                      minWidth: "75px",
                    }}
                    className="
                      flex
                      flex-wrap
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
                      className={clsx("rounded-sm border border-neutral-500 shadow-md shadow-neutral-950/50",
                        {
                          "opacity-100 border-teal-500 border-1": index === cardArtOptions.activeOption,
                          "opacity-25 hover:opacity-100 hover:cursor-pointer hover:shadow-neutral-950": index !== cardArtOptions.activeOption,
                        }
                      )}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          {/* Art Prompt Options */}
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
                    {`/${Object.keys(ArtPromptOptionsData).length} selected`}
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
              
              {/* Art Prompt Options Sections */}
              <ArtPromptOptionsSections
                selectedOptions={artPromptSelections}
                onSelectionChange={handleSelectionChange}
              />
            </Box>
          </Box>
        </Box>
        
      </Box>
    </Box>
  );
};