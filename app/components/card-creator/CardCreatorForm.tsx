"use client";

import React, { useState, useEffect, useContext } from "react";
import { DashboardContext } from "@/app/context/DashboardContext";
import useSession from "@/app/hooks/useSession";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardFormDataType } from "@/app/utils/types/types";
import cardFormSchema from "@/app/utils/schemas/CardFormSchema";
import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import ConstructArtPrompt from "@/app/lib/actions/constructArtPrompt";
import convertCardCodeToImage from "@/app/lib/actions/convertCardCodeToImage"
import uploadCardImage from "@/app/lib/actions/supabase-data/uploadCardImage";
import ArtPromptAccordion from "@/app/components/card-creator/ArtPromptAccordion";
import Image from "next/image";
import { ArtPromptOptions } from "@/app/utils/data/artPromptOptions";
import PostHogClient from "@/app/lib/posthog/posthog";
import clsx from "clsx";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Modal,
  Skeleton,
  InputAdornment,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  Badge
} from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PaletteIcon from '@mui/icons-material/Palette';

// Remove the user id
export default function CardCreatorForm() {
  const methods = useForm<CardFormDataType>({
    defaultValues: {
      user_id: "", 
      cardCreator: "",
      cardName: "",
      cardEnergyValue: 0,
      cardEnergyCost: {
        yellow: 0,
        blue: 0,
        purple: 0,
        red: 0,
        green: 0,
        void: 0,
      },
      cardColor: "",
      cardArt: "/images/card-parts/card-art/default-art.jpg",
      cardType: "entity",
      cardSuperType: "default",
      cardSubType: [""],
      cardSpeed: "1",
      cardGrade: "common",
      cardText: "",
      cardFlavorText: "",
      cardAttack: "",
      cardDefense: "",
      cardPrompt: "",
      cardArtPrompt: "",
      cardRender: "",
    },
    resolver: zodResolver(cardFormSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: {
      isValid,
      errors,
      isSubmitting
    },
    setError,
    setValue
  } = methods;

  const formNexusCardData = watch();
  const session = useSession();
  const userId = watch("user_id")
  const cardArtPrompt = watch("cardArtPrompt");
  const cardRender = watch("cardRender");

  const posthog = PostHogClient();

  // States
  const [isGeneratingArt, setIsGeneratingArt] = useState(false);
  const [generateArtLimit, setGenerateArtLimit] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [timerStart, setTimerStart] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState({ open: false, message: "" });

  const [promptTab, setPromptTab] = React.useState(0);
  const [artPromptSelections, setArtPromptSelections] = useState<{ [category: string]: string }>({});
  const [showCardArtOptions, setShowCardArtOptions] = useState<boolean>(false);
  const [cardArtOptions, setCardArtOptions] = useState<string[]>([]);
  const [activeCardArtOption, setActiveCardArtOption] = useState<number>(0);

  // Alert states
  const [alertMessage, setAlertMessage] = useState("Submitting card...");
  const [alertSeverity, setAlertSeverity] = useState<string>("info");

  const { userProfileData } = useContext(DashboardContext);

  // Log form data
  useEffect(() => {
    console.log(formNexusCardData);
  }, [formNexusCardData]);

  useEffect(() => {
    if (session?.user?.id) {
      setValue('user_id', session.user.id);
    }
    if (userProfileData?.username && userProfileData?.username !== undefined) {
      setValue('cardCreator', userProfileData?.username as string);
    }
  }, [session, setValue, userProfileData]);

  function downloadCard(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formNexusCardData.cardName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Generate card art
  async function onImageGeneration() {
    setIsGeneratingArt(true);
    setTimerStart(Date.now());
    setElapsedTime(0);

    const newIntervalId = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
    }, 1000) as unknown as number;
    setIntervalId(newIntervalId);

    if (generateArtLimit >= 3) {
      setSnackbarMessage('Art generation limit reached');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      
      setIsGeneratingArt(false);
      clearInterval(newIntervalId);

      return;
    } 
    
    if (generateArtLimit < 3) {
      setSnackbarMessage("Generating art...");
      try {
        const constructedArtPrompt = await ConstructArtPrompt(artPromptSelections, cardArtPrompt);

        console.log("Constructed art prompt:", constructedArtPrompt);

        const response = await fetch("/data/generate-card-art", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: constructedArtPrompt }),
        });

        if (!response.ok) {
          throw new Error('Artwork generation failed.');
        }
        
        const { imageUrl } = await response.json();

        if (imageUrl) {
          if (session
              && session.user
              && session.user.id
            ) {
            posthog.capture({
              distinctId: session.user.id,
              event: '🎨 New Card Image Generated'
            })
          }
        }

        setGenerateArtLimit(generateArtLimit + 1);
        setValue("cardArtPrompt", "");
        setValue("cardArt", imageUrl);
        setCardArtOptions(prev => [...prev, imageUrl]);
        setActiveCardArtOption(cardArtOptions.length);
        if (cardArtOptions.length > 0) {
          setShowCardArtOptions(true);
        };
        trigger("cardArt");
        
      } catch (error) {
        setApiError({ open: true, message: "Failed to generate artwork. Please try again later or check OpenAI's status here: https://status.openai.com/" });
      }
    }
    
    // Cleanup with delay to match card art updating
    setTimeout(() => {
      clearInterval(newIntervalId);
      setIsGeneratingArt(false);
      setElapsedTime(Date.now() - timerStart);
    }, 5000);
  }

  // Reset timer on new art generation
  useEffect(() => {
    if (isGeneratingArt) {
      setElapsedTime(0);
    }
  }, [isGeneratingArt]);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);
  
  // Submit form data
  async function onSubmit(data: CardFormDataType) {
    if (!userId) {
      setError("user_id", {
        type: "manual",
        message: "User must be logged in to submit a card."
      });
      console.error("User ID is not available. User must be logged in to submit a card.");
      return;
    }

    if (generateArtLimit === 0) {
      setError("cardArtPrompt", {
        type: "manual",
        message: "Please generate art for the card."
      });
      console.error("Please generate art for the card.");
      return;
    }

    try {
      setIsImageLoading(true);
      setAlertMessage('Uploading card to database...');
      setAlertSeverity('info');
      setModalOpen(true);

      // Convert card code to PNG
      const imageDataUrl = await convertCardCodeToImage("card-border"); 

      // Upload the PNG to Supabase bucket
      const imagePublicUrl = await uploadCardImage(imageDataUrl);

      if (!imagePublicUrl) {
        throw new Error("Failed to upload card image.");
      }

      setValue("cardRender",
        imagePublicUrl, {
        shouldValidate: true
      });
      await trigger("cardRender");
      
      // Submit the card form data Supabase table
      const response = await fetch("/data/submit-card", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, cardRender: imagePublicUrl}),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Track card submission event on PostHog
        if (session && session.user && session.user.id) {
          posthog.capture({
            distinctId: session.user.id,
            event: '🎉 New Card Submitted'
          })
        }

        setIsSubmitted(true);
        setAlertMessage('Card submitted successfully!')
        setAlertSeverity('success')

        setSnackbarMessage('Submission successful');
        setSnackbarSeverity('success');

        // Redirect to the cards/id page

      } else {
        setIsSubmitted(false);
        setAlertMessage('Submission failed: ' + responseData.error)
        setAlertSeverity('error')

        setSnackbarMessage('Submission failed: ' + responseData.error);
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);      

    } catch (error) {
      setIsSubmitted(false);
      setAlertMessage('Submission failed: ' + error)
      setAlertSeverity('error')

      setSnackbarMessage('Submission failed: ' + error);
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
    
    setTimeout(() => {
      setIsImageLoading(false);
    }, 3000);
  }

  function handleChange(
    event: React.SyntheticEvent,
    newPromptTab: number
  ) {
    setPromptTab(newPromptTab);
  };

  const handleSelectionChange = (
    category: keyof typeof ArtPromptOptions,
    selectedOption: string
  ) => {
    setArtPromptSelections(prev => ({
      ...prev,
      [category]: selectedOption,
    }));
  };

  // Handle changing image option
  function handleCardArtOptionChange(index: number) {
    setValue("cardArt", cardArtOptions[index]);
    setActiveCardArtOption(index);
  };


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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  onChange={handleChange}
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
                {/* Conditionally render based on currently active tab */}
                {/* Input: AI prompt */}
                <TextField
                  multiline
                  disabled={isSubmitting || !userId}
                  label="Card prompt"
                  {...register("cardPrompt")}
                  error={Boolean(errors.cardPrompt)}
                  helperText={errors.cardPrompt?.message}
                  rows={2}
                  variant="outlined"
                  className="
                    w-full
                    bg-neutral-900/50
                    hidden
                  "
                />
                
                {/* Input: AI art prompt */}
                <TextField
                  multiline
                  disabled={
                    isGeneratingArt ||
                    generateArtLimit >= 3 ||
                    isSubmitting ||
                    !userId
                  }
                  placeholder="Generate art for the card..."
                  label={isGeneratingArt ?
                    `Generating art in ${Math.floor(elapsedTime / 1000)} seconds...` : 
                    "Art prompt"
                  }
                  {...register("cardArtPrompt")}
                  error={Boolean(errors.cardArtPrompt)}
                  helperText={errors.cardArtPrompt?.message}
                  rows={2}
                  variant="outlined"
                  className="
                    flex
                    w-full
                    bg-neutral-900/50
                  "
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title={`${3 - generateArtLimit} prompts left`}
                          arrow
                        >
                          <span className="tooltip-wrapper">
                            <IconButton
                              onClick={onImageGeneration}
                              disabled={
                                cardArtPrompt === "" ||
                                isGeneratingArt ||
                                generateArtLimit >= 3 ||
                                isSubmitting ||
                                !userId
                              }
                              size="small"
                              className="
                                ml-2
                                mt-auto
                              "
                            >
                              {isGeneratingArt ? (
                                <CircularProgress size={24} />
                              ) : generateArtLimit >= 3 ? (
                                <Typography>
                                  Limit reached
                                </Typography>
                              ) : (
                                <Badge
                                  badgeContent={generateArtLimit ? 3 - generateArtLimit : 3}
                                  color={generateArtLimit < 3 ? "error" : "primary"}
                                >
                                  <SendIcon
                                    className={clsx("",
                                      cardArtPrompt === "" ? "text-neutral-500" : "text-lime-500"
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

                {/* Art Prompt Selections */}
                {artPromptSelections && (<Box
                  className="
                    flex
                    flex-row
                    justify-start
                    items-start
                    flex-wrap
                    w-full
                    gap-3
                  "
                >
                  {Object.entries(artPromptSelections).map(
                    ([category, selection]) => (
                    <Typography
                      key={category}
                      variant="overline"
                      className="
                        text-neutral-500
                        rounded-full
                        text-xs
                      "
                    >
                      {selection}
                    </Typography>
                  ))}
                </Box>)}
                
              </Box>
              {/* Art Prompt Options Accordions */}
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
                        text-lime-500
                      "
                    >
                      ART DIRECTION
                    </Typography>
                    <Typography
                      variant="overline"
                      component={"span"}
                      className="
                        text-lime-500
                      "
                    >
                      {Object.keys(artPromptSelections).length} {" "}
                      <Typography
                        variant="overline"
                        className="
                          text-neutral-500
                        "
                      >
                        / 8 selected
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
                  <ArtPromptAccordion
                    category="style"
                    title="Style"
                    selectedOptions={
                      artPromptSelections["style"] || ""
                    }
                    onSelectionChange={handleSelectionChange}
                  />
                  <ArtPromptAccordion
                    category="technique"
                    title="Technique"
                    selectedOptions={
                      artPromptSelections["technique"] || ""
                    }
                    onSelectionChange={handleSelectionChange}
                  />
                  <ArtPromptAccordion
                    category="subject"
                    title="Subject"
                    selectedOptions={
                      artPromptSelections["subject"] || ""
                    }
                    onSelectionChange={handleSelectionChange}
                  />
                  <ArtPromptAccordion
                    category="setting"
                    title="Setting"
                    selectedOptions={
                      artPromptSelections["setting"] || ""
                    }
                    onSelectionChange={handleSelectionChange}
                  />
                  <ArtPromptAccordion
                    category="time"
                    title="Time"
                    selectedOptions={
                      artPromptSelections["time"] || ""
                    }
                    onSelectionChange={handleSelectionChange}
                  />
                  <ArtPromptAccordion
                    category="weather"
                    title="Weather"
                    selectedOptions={
                      artPromptSelections["weather"] || ""
                    }
                    onSelectionChange={handleSelectionChange}
                  />
                  <ArtPromptAccordion
                    category="mood"
                    title="Mood"
                    selectedOptions={
                      artPromptSelections["mood"] || ""
                    }
                    onSelectionChange={handleSelectionChange}
                  />
                  <ArtPromptAccordion
                    category="composition"
                    title="Composition"
                    selectedOptions={
                      artPromptSelections["composition"] || ""
                    }
                    onSelectionChange={handleSelectionChange}
                  />
                </Box>
              </Box>
              {/* Alert component goes here */}
              
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
              <NexusCardForm />

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
                    {formNexusCardData.cardName ? `${formNexusCardData.cardName} art options` : "Card art options"}
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
                  {cardArtOptions.map((imageUrl, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        aspectRatio: "1/1"
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
                            "opacity-100 border-teal-500": index === activeCardArtOption,
                            "opacity-25 hover:opacity-100 hover:cursor-pointer hover:shadow-neutral-950": index !== activeCardArtOption
                          }
                        )}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>)}
            </Box>
          </Box>

          {/* TODO: Move state up to page level */}
          <Box
            className="
              flex
              flex-col
              justify-center
              items-center
              mt-8
            "
          >
            {/* Submit Form Button */}
            <Button
              disabled={
                !isValid ||
                isGeneratingArt ||
                isSubmitting ||
                !userId ||
                formNexusCardData.cardArt === "/images/card-parts/card-art/default-art.jpg"
              }
              type="submit"
              variant="outlined"
              size="large"
              className="
                flex
                w-full
              "
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Box>
        </form>
      </FormProvider>

      {/* TODO Make Separate page */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          max-w-4xl
          m-auto
          md:p-auto
          p-12 
        "
      >
        <Box
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            p-6
            gap-4
            bg-neutral-800
            border
            border-neutral-700
            rounded-2xl
            shadow-2xl
            shadow-black
          "
        >
          {
            isImageLoading ? (
              <Skeleton
                variant="rectangular"
                width={400}
                height={560}
                animation="wave"
                className="
                  my-4
                  rounded-2xl
                  shadow-xl
                   shadow-neutral-950/25
                "
              />
            ) : (
              <Image
                src={cardRender}
                width={400}
                height={560}
                alt={`Nexus TCG card: ${formNexusCardData.cardName} by ${formNexusCardData.cardCreator}`}
                className="
                  my-4
                  rounded-2xl
                  shadow-lg
                  hover:shadow-xl
                   shadow-neutral-950/30
                   hover:shadow-neutral-950/20
                "
                onLoad={() => setIsImageLoading(false)}
              />
            )
          }
          
          <Box
            className="
              flex
              flex-col
              justify-center
              items-center
              w-full
              gap-2
            "
          >
            <Typography
              id="modal-card-title"
              variant="h3"
              className="text-white font-medium"
            >
              {formNexusCardData.cardName}
            </Typography>
            <Typography
              id="modal-card-subtitle"
              variant="overline"
              className="text-neutral-400"
            >
              {`Created by ${formNexusCardData.cardCreator} on ${new Date().toLocaleDateString()}`}
            </Typography>
          </Box>
          

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity={
                snackbarSeverity === "success" ?
                "success" : "error"
              }
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>

          <Snackbar
            open={apiError.open}
            autoHideDuration={6000}
            onClose={() => setApiError({ ...apiError, open: false })}
          >
            <Alert
              onClose={() => setApiError({ ...apiError, open: false })}
              severity="error"
              sx={{ width: '100%' }}
            >
              {apiError.message}
            </Alert>
          </Snackbar>

          {isImageLoading && (<Alert
            severity={alertSeverity as "error" | "info" | "success" }
            // variant=""
            className="
              w-full
              rounded-full
            "
          >
            {alertMessage}
          </Alert>)}

          <Box
            className="
              flex
              flex-row
              w-full
              gap-4
            "
          >
            {isSubmitted ? (
              <Button
                // onClick={() => shareCard(cardRender)}
                variant="outlined"
                color="primary"
                size="large"
                className="w-full rounded-full"
              >
                Share card
              </Button>
            ) : (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={48}
                animation="wave"
                className="rounded-full"
              />
            )}
            
            {isSubmitted ? (
              <Button
                onClick={() => downloadCard(cardRender)}
                variant="outlined"
                color="secondary"
                size="large"
                className="w-full rounded-full"
              >
                Download card
              </Button>
            ) : (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={48}
                animation="wave"
                className="rounded-full"
              />
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
