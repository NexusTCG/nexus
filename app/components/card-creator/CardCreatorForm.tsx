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
      cardType: "entity",
      cardSuperType: "",
      cardSubType: [],
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
        md:bg-gray-800
        md:rounded-xl
        md:border
        md:border-gray-700
        md:shadow-xl    
      "
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            className="
              flex
              flex-col
              w-full
              gap-4
              my-4
            "
          >
            {/* Form header */}
            <Box
              className="
                flex
                flex-col
                w-full
                justify-start
                items-start
                gap-1
              "
            >
              {/* Card title */}
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

              {/* Creator */}
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
            
            {/* Replace with fetched username */}
            <TextField
              label="Card creator"
              variant="outlined"
              {...register("cardCreator")}
            />

            {/* AI prompt */}
            <TextField
              multiline
              rows={4}
              label="Card prompt"
              variant="outlined"
              {...register("cardPrompt")}
            />

            {/* Submit form */}
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
          <Box
            className="
              flex
              flex-col
              justify-center
              items-center
            "
          >
            {/* Nexus Card Form */}
            <NexusCardForm />
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
