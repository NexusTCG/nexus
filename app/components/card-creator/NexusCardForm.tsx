"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, TextField, Button } from "@mui/material/";
import EditableNexusCard from "./EditableNexusCard";
import cardSchema from "@/app/schemas/cardSchema";
import { CardData } from "@/app/types/types";

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
    <Box className="flex flex-col p-0 md:p-6 space-y-4 md:bg-gray-800 md:rounded-xl md:border md:border-gray-700 md:shadow-xl">
      <Typography variant="h2">{formCardData.cardName}</Typography>
      <Typography variant="h3">by {formCardData.cardCreator}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register("cardCreator")} />
        {/* AI prompt input field */}
        {/* AI prompt button */}
        <EditableNexusCard
          control={control}
          watch={watch}
          formCardData={formCardData}
        />
        <Button type="submit" variant="outlined">Submit</Button>
      </form>
    </Box>
  );
};

export default CardForm;