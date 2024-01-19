"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, TextField, Button, InputLabel } from "@mui/material/";
import EditableNexusCard from "./NexusCard";
import cardSchema from "@/app/utils/schemas/cardSchema";
import { CardData } from "@/app/utils/types/types";

const CardForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CardData>({
    resolver: zodResolver(cardSchema),
  });

  const formCardData = watch();

  function onSubmit(data: CardData) {
    console.log(data);
  }

  return (
    <Box className="
      flex
      flex-col
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="flex flex-row justify-between gap-4">
          <Box className="flex flex-col w-full gap-4">
            <Typography variant="h2">
              {formCardData.cardName ? formCardData.cardName : "Card Name"}
            </Typography>
            <Typography variant="subtitle1">
              by {formCardData.cardCreator ? formCardData.cardCreator : "Card Creator"}
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
              {/* AI prompt button */}
              <Button
                type="button"
                variant="outlined"
                size="large"
                className="w-full rounded-full"
              >
                Prompt
              </Button>
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
          <Box className="flex fler-col">
          <EditableNexusCard
            control={control}
            watch={watch}
            formCardData={formCardData}
          />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CardForm;