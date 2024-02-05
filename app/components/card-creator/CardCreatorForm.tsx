"use client";

import React, { useState, useEffect } from "react";
import useSession from "@/app/hooks/useSession";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, TextField, Button, Snackbar, Alert, CircularProgress } from "@mui/material/";
import { CardFormDataType } from "@/app/utils/types/types";
import cardFormSchema from "@/app/utils/schemas/CardFormSchema";
import NexusCardForm from "@/app/components/card-creator/NexusCardForm";

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
    },
    resolver: zodResolver(cardFormSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors, isSubmitting },
    setError,
    setValue
  } = methods;

  const formNexusCardData = watch();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  useEffect(() => {
    console.log(formNexusCardData);
  }, [formNexusCardData]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function sendPromptToOpenAI() {
    // Send prompt to OpenAI API
    // Store response in state
    // Add response to card data
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onImageGeneration() {
    // Call OpenAI API to generate image
    // Store image url in state
    // Add image url to card data
    // Display image in card preview
  }

  const session = useSession();
  const userId = watch("user_id")

  useEffect(() => {
    if (session?.user?.id) {
      setValue('user_id', session.user.id);
    }
  }, [session, setValue]);
  
  async function onSubmit(data: CardFormDataType) {

    if (!userId) {
      setError("user_id", { type: "manual", message: "User must be logged in to submit a card." });
      console.error("User ID is not available. User must be logged in to submit a card.");
      return;
    }

    try {
      const response = await fetch("/data/submit-card", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSnackbarMessage('Submission successful');
        setSnackbarSeverity('success');
        // setOpenSnackbar(true);
      } else {
        setSnackbarMessage('Submission failed: ' + responseData.error);
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Submission failed: ' + error);
      setSnackbarSeverity('error');
      // Handle the error (e.g., showing an error message)
    }
    setSnackbarOpen(true);
    // Generate png image from code / card data
    // Write card data to database (with image url)
    // Write finished card image to database
    // Fetch finished card image from database
    // Open modal to see & share card
  }

  return (
    // Outerontainer
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
                  rows={4}
                  label="Card prompt"
                  variant="outlined"
                  {...register("cardPrompt")}
                  className="flex w-full"
                  error={Boolean(errors.cardPrompt)}
                  helperText={errors.cardPrompt?.message}
                />

                {/* Submit Form */}
                <Button
                  disabled={!isValid || isSubmitting}
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
      
    </Box>
  );
}
