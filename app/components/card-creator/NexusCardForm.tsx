"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, TextField, Button } from "@mui/material/";
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
    <>
      <Typography variant="h2">{formCardData.cardName}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditableNexusCard
          control={control}
          watch={watch}
          formCardData={formCardData}
        />
        <Button type="submit" variant="outlined">Submit</Button>
      </form>
    </>
  );
};

export default CardForm;