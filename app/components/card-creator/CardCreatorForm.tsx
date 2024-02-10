"use client";

import React, { useState, useEffect } from "react";
import useSession from "@/app/hooks/useSession";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardFormDataType } from "@/app/utils/types/types";
import cardFormSchema from "@/app/utils/schemas/CardFormSchema";
import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import convertCardCodeToImage from "@/app/lib/actions/convertCardCodeToImage"
import uploadCardImage from "@/app/lib/actions/supabase/uploadCardImage";
import Image from "next/image";
import PostHogClient from "@/app/lib/posthog/posthog";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Modal,
  Skeleton
} from "@mui/material/";

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

  // Alert states
  const [alertMessage, setAlertMessage] = useState("Submitting card...");
  const [alertSeverity, setAlertSeverity] = useState<string>("info");

  // Log form data
  useEffect(() => {
    console.log(formNexusCardData);
  }, [formNexusCardData]);

  useEffect(() => {
    if (session?.user?.id) {
      setValue('user_id', session.user.id);
    }
  }, [session, setValue]);

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
        const generatedImage = await fetch("/data/generate-card-art", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: cardArtPrompt }),
        });
        
        const { imageUrl } = await generatedImage.json();

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
        setValue("cardArt", imageUrl);
        trigger("cardArt");
        
      } catch (error) {
        console.error('Failed to generate art:', error);
      }
    }
    
    // Cleanup with delay to match card art updating
    setTimeout(() => {
      setValue("cardArtPrompt", "");
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

  return (
    // Outer container
    <Box
      className="
        flex
        flex-col
        w-full
        md:bg-gray-800
        md:border
        md:border-gray-700
        md:shadow-2xl
        md:shadow-black
        md:rounded-lg
        p-6
        md:py-8
        pb:mb-0
        pb-12
      "
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Inner Container */}
          <Box
            className="
              flex
              flex-col
              md:flex-row
              gap-8
            "
          >
            {/* Form Header */}
            <Box
              className="
                flex
                flex-col
                justify-start
                items-start
                w-full
                gap-4
              "
            >
              {/* Card Name + Creator */}
              <Box
                className="
                  flex
                  flex-col
                  w-full
                  justify-start
                  items-start
                  gap-2
                "
              >
                {/* Card Name */}
                <Typography
                  variant="h2"
                  className="
                    text-4xl
                    text-gray-200
                    font-medium
                  "
                >
                  {formNexusCardData.cardName
                    ? formNexusCardData.cardName
                    : "An awesome card"}
                </Typography>

                {/* Card Creator */}
                <Box
                  className="
                    flex
                    flex-row
                    w-full
                    justify-start
                    items-center
                  "
                >
                  <Typography
                    variant="overline"
                    className="text-emerald-400"
                  >
                    <Typography
                      variant="overline"
                      className="text-gray-400"
                      component="span"
                    >
                      by{" "}
                    </Typography>
                    {formNexusCardData.cardCreator
                      ? formNexusCardData.cardCreator
                      : "Card creator"}
                  </Typography>
                </Box>
              </Box>

              {/* Input Fields */}
              <Box
                className="
                  flex
                  flex-col
                  w-full
                  gap-4
                "
              >
                {/* Input: Card creator */}
                <TextField
                  label="Card creator"
                  variant="outlined"
                  {...register("cardCreator")}
                  className="flex w-full"
                  error={Boolean(errors.cardCreator)}
                  helperText={errors.cardCreator?.message}
                />

                {/* Input: AI prompt */}
                <TextField
                  multiline
                  disabled={
                    isSubmitting ||
                    !userId
                  }
                  rows={4}
                  label="Card prompt"
                  variant="outlined"
                  {...register("cardPrompt")}
                  className="flex w-full"
                  error={Boolean(errors.cardPrompt)}
                  helperText={errors.cardPrompt?.message}
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
                  rows={2}
                  label="Card art prompt"
                  variant="outlined"
                  {...register("cardArtPrompt")}
                  className="flex w-full"
                  error={Boolean(errors.cardArtPrompt)}
                  helperText={errors.cardArtPrompt?.message}
                />
                <Button
                  onClick={onImageGeneration}
                  disabled={
                    cardArtPrompt === "" ||
                    isGeneratingArt ||
                    generateArtLimit >= 3 ||
                    isSubmitting ||
                    !userId
                  }
                  variant="outlined"
                  size="large"
                  className="flex w-full rounded-full"
                >
                  {isGeneratingArt ? (
                    <Box display="flex" alignItems="center" gap={2}>
                      <CircularProgress size={24} />
                      <Typography>
                        Generating art in {Math.floor(elapsedTime / 1000)} seconds...
                      </Typography>
                    </Box>
                  ) : generateArtLimit >= 3 ? (
                    "Art generation limit reached"
                  ) : (
                    elapsedTime > 0 ? "Generate new art" : "Generate art"
                  )}
                </Button>

                {/* Alert component goes here */}

                {/* Submit Form */}
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
                    rounded-full
                  "
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </Box>
            </Box>
            {/* Nexus Card Render */}
            <Box
              className="
                flex
                flex-col
                justify-center
                items-center
                w-full
              "
            >
              <NexusCardForm />
            </Box>
          </Box>
        </form>
      </FormProvider>
      
      


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
            bg-gray-800
            border
            border-gray-700
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
                   shadow-gray-950/25
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
                   shadow-gray-950/30
                   hover:shadow-gray-950/20
                   
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
              className="text-gray-400"
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
