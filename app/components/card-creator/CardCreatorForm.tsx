"use client";

import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, TextField, Button } from "@mui/material/";
import { CardFormDataType } from "@/app/utils/types/types";
import cardFormSchema from "@/app/utils/schemas/CardFormSchema";
import NexusCardForm from "@/app/components/card-creator/NexusCardForm";

export default function CardCreatorForm() {
  const methods = useForm<CardFormDataType>({
    defaultValues: {
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
      cardArt: "",
      cardType: "",
      cardSuperType: "",
      cardSubType: [],
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
    formState: { isValid },
  } = methods;

  const formNexusCardData = watch();

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

  function onSubmit(data: CardFormDataType) {
    console.log(data);
    // Generate png image from code / card data
    // Write card data to database (with image url)
    // Write finished card image to database
    // Fetch finished card image from database
    // Open modal to see & share card
  }

  return (
    <Box
      className="
            flex
            flex-col
            w-full
            p-0
            md:p-6
            space-y-4
            md:bg-gray-800
            md:rounded-xl
            md:border
            md:border-gray-700
            md:shadow-xl    
        "
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="flex flex-col w-full gap-4">
            <Typography variant="h2">
              {formNexusCardData.cardName
                ? formNexusCardData.cardName
                : "Card name"}
            </Typography>
            <Typography variant="subtitle1">
              by{" "}
              {formNexusCardData.cardCreator
                ? formNexusCardData.cardCreator
                : "Card creator"}
            </Typography>
            <TextField
              label="Card creator"
              variant="outlined"
              {...register("cardCreator")}
            />
            <TextField
              multiline
              rows={4}
              label="Card prompt"
              variant="outlined"
              {...register("cardPrompt")}
            />
            <Box className="flex flex-row gap-4">
              {/* <PromptInput /> */}
              <Button
                disabled={!isValid}
                type="submit"
                variant="outlined"
                size="large"
                className="w-full rounded-full"
              >
                Submit
              </Button>
            </Box>
          </Box>
          <Box className="flex flex-col">
            <NexusCardForm />
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
