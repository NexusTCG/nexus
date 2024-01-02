"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from "@mui/material/";

// TYPES
import { CardData } from "../../types/types";
import cardSchema from '../../schemas/cardSchema';

// COMPONENTS
import EditableNexusCard from './EditableNexusCard';

export default function NexusCardForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CardData>({
    resolver: zodResolver(cardSchema)
  });

  const cardData = watch();

  const onSubmit = (data: CardData) => {
    console.log(data);
  };

  return (
    <>
      <Typography variant="h2">{cardData.cardName}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
          <EditableNexusCard
            control={control}
            nexusCardData={cardData}
          />
      </form>
    </>
    
  );
};
