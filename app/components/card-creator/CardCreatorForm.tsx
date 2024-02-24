"use client";

import React, { useState, useEffect, useContext } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DashboardContext } from "@/app/context/DashboardContext";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import { CardFormDataType } from "@/app/utils/types/types";
import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import ConstructArtPrompt from "@/app/lib/actions/constructArtPrompt";
import { ArtPromptAccordion, ArtPromptAccordionData } from "@/app/components/card-creator/ArtPromptAccordion";
import { ArtPromptOptions } from "@/app/utils/data/artPromptOptions";
import PostHogClient from "@/app/lib/posthog/posthog";
import Image from "next/image";
import clsx from "clsx";
// Add debouncer to reduce input lag in art prompt
import {
  Box,
  Typography,
  TextField,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  Badge
} from "@mui/material/";
import {
  Send,
  SmartToy,
  Palette,
  Check,
  Error,
  Info,
} from "@mui/icons-material";

type CardRenderProps = {
  cardData?: CardsTableType | CardFormDataType | null;
  showCardRender?: boolean;
  showSimpleCardRender?: boolean;
  cardRenderRef?: React.RefObject<HTMLDivElement>;
};

export default function CardCreatorForm({
  cardData,
  showCardRender,
  showSimpleCardRender,
  cardRenderRef,
}: CardRenderProps) {
  const {
    setValue,
    control,
    watch,
    trigger,
    formState: {
      isSubmitting,
    },
  } = useFormContext<CardFormDataType>();

  const form = watch();
  const posthog = PostHogClient();
  // const session = useSession(); // Remove?
  const { userProfileData } = useContext(DashboardContext);

  // Prompt states
  const [promptTab, setPromptTab] = useState(0);
  const [generateArtLimit, setGenerateArtLimit] = useState(0);
  const [isGeneratingArt, setIsGeneratingArt] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [artPromptSelections, setArtPromptSelections] = useState<{
    [category: string]: string
  }>({});
  // Card art states
  const [showCardArtOptions, setShowCardArtOptions] = useState<boolean>(false);
  const [cardArtOptions, setCardArtOptions] = useState<{
    options: string[];
    activeOption: number;
  }>({
    options: [],
    activeOption: 0,
  });
  // Alert states
  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  // Generate card art
  async function generateArt() {
    setIsGeneratingArt(true);
    setTimerStart(Date.now());
    setElapsedTime(0);

    // Udate elapsed time every second
    const newIntervalId = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
    }, 1000) as unknown as number;
    setIntervalId(newIntervalId);

    if (generateArtLimit < 3 && form.cardArtPrompt) {
      setAlertInfo({
        type: "info",
        icon: <Info />,
        message: "Generating art..."
      });
      
      try {
        // Construct prompt based on user selections and input
        const constructedArtPrompt = await ConstructArtPrompt(
          artPromptSelections,
          form.cardArtPrompt
        );

        // Generate card art
        const response = await fetch("/data/generate-card-art", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: constructedArtPrompt
          }),
        });

        if (!response.ok) {
          setAlertInfo({
            type: "error",
            icon: <Error />,
            message: "Failed to generate artwork. Please try again later or check OpenAI's status here: https://status.openai.com/"
          });
        }
        
        const { imageUrl } = await response.json();
        if (imageUrl) {
          if (
              userProfileData
              && userProfileData.id
          ) {
            setAlertInfo({
              type: "success",
              icon: <Check />,
              message: "Artwork generated successfully!"
            });

            // Track event in PostHog
            posthog.capture({
              distinctId: userProfileData.id,
              event: "🎨 New Card Image Generated"
            })
          }

          // Update the card
          setGenerateArtLimit(generateArtLimit + 1);
          setValue("cardArt", imageUrl);
          setCardArtOptions(prevState => {
            const newOptions = [...prevState.options, imageUrl];
            const newActiveOption = newOptions.length - 1;
            return {
              options: newOptions,
              activeOption: newActiveOption,
            };
          });
          if (cardArtOptions.options.length > 0) {
            setShowCardArtOptions(true);
          };
          await trigger("cardArt");
        }
        
      } catch (error) {        
        setAlertInfo({
          type: "error",
          icon: <Error />,
          message: "Failed to generate artwork. Please try again later or check OpenAI's status here: https://status.openai.com/"
        });
      }
    }
    // Cleanup with delay to match card art updating
    setTimeout(() => {
      clearInterval(newIntervalId);
      setIsGeneratingArt(false);
      setElapsedTime(Date.now() - timerStart);
      setShowAlertInfo(false);
    }, 5000);
  }

  // Reset timer on new art generation
  useEffect(() => {
    if (isGeneratingArt) {
      setElapsedTime(0);
    }
  }, [isGeneratingArt]);

  // Clear interval on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  // AI prompt tab handler
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
    .map(({ category, title }) => (
      <ArtPromptAccordion
        key={category}
        category={category as keyof typeof ArtPromptOptions}
        title={title}
        selectedOptions={artPromptSelections[category] || ""}
        onSelectionChange={handleSelectionChange}
      />
  ));

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
                icon={<Palette />}
                iconPosition="start"
                label="Generate Art"
              />
              <Tab
                icon={<SmartToy />}
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
            {promptTab === 1 && (<Controller
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
                  disabled // Disabled until functionality is added
                  // disabled={
                  //   isSubmitting || 
                  //   !userProfileData?.id
                  // }
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
            {promptTab === 0 && (<Controller
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
                    isGeneratingArt ||
                    generateArtLimit >= 3 ||
                    isSubmitting ||
                    !userProfileData?.id
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
                  className="
                    flex
                    w-full
                    bg-neutral-900/50
                  "
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                      >
                        <Tooltip
                          title={`${3 - generateArtLimit} prompts left`}
                          arrow
                        >
                          <span className="tooltip-wrapper">
                            <IconButton
                              onClick={generateArt}
                              disabled={
                                field.value === "" ||
                                isGeneratingArt ||
                                generateArtLimit >= 3 ||
                                isSubmitting ||
                                !userProfileData?.id
                              }
                              size="small"
                              className="ml-2 mt-auto"
                            >
                              {isGeneratingArt ? (
                                <CircularProgress size={24} />
                              ) : generateArtLimit >= 3 ? (
                                <Typography>Limit reached</Typography>
                              ) : (
                                <Badge
                                  badgeContent={
                                    generateArtLimit ? 
                                    3 - generateArtLimit : 3
                                  }
                                  color={
                                    generateArtLimit >= 3 ? 
                                    "error" : "success"
                                  }
                                >
                                  <Send
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
            {promptTab === 0 && artPromptSelections && (<Box
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
                    font-light
                    rounded-full
                    text-xs
                    bg-teal-800/25
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
          {promptTab === 0 && (<Box
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
          </Box>)}
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
            py-4
            md:px-6
            md:py-6
            md:border
            md:border-neutral-700
            md:bg-neutral-800
            md:rounded-md
            md:shadow-xl
            md:shadow-neutral-950/25
            gap-6
          "
        >
          {/* Card Render / Form */}
          <NexusCardForm
            cardData={cardData}
            showCardRender={showCardRender}
            showSimpleCardRender={showSimpleCardRender}
            cardRenderRef={cardRenderRef}
          />

          {/* Card Art Options */}
          {showCardArtOptions && (<Box
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
              {cardArtOptions.options.map((imageUrl, index) => (
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
                    alt={`Card art option ${index + 1}`}
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
}
