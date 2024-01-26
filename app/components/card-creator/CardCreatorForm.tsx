"use client;"

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, TextField, Button, InputLabel } from "@mui/material/";
import { CardData } from "@/app/utils/types/types";
import cardSchema from "@/app/utils/schemas/cardSchema";
import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import PromptInput from "@/app/components/card-creator/PromptInput";

export default function CardCreatorForm() {
    const {
      register,
      control,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<CardData>({
      defaultValues: {
        cardCreator: "",
        cardName: "",
        cardCost: {
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
        cardGrade: "Common",
        cardText: "",
        cardFlavorText: "",
        cardAttack: "",
        cardDefense: "",
      },
      resolver: zodResolver(cardSchema),
    });

    const formNexusCardData = watch();

    function onImageGeneration() {
        // Call OpenAI API to generate image
        // Store image url in state
        // Add image url to card data
        // Display image in card preview
    };

    function onSubmit(data: CardData) {
        console.log(data);
        // Generate png image from code / card data
        // Write card data to database (with image url)
        // Write finished card image to database
        // Fetch finished card image from database
        // Open modal to see & share card
    };

    return (
        <Box className="
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
        ">
            <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="flex flex-col w-full gap-4">
            <Typography variant="h2">
               {formNexusCardData.cardName ? formNexusCardData.cardName : "Card Name"}
             </Typography>
             <Typography variant="subtitle1">
               by {formNexusCardData.cardCreator ? formNexusCardData.cardCreator : "Card Creator"}
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
            {/* <PromptInput register={register} errors={errors} /> */}
              <Button
                // {!isValid && true(disabled)}
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
          <NexusCardForm
            control={control}
            watch={watch}
            formCardData={formNexusCardData}
          />
          </Box>
            </form>
        </Box>
    );
};