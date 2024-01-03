// Some export / import or component in here is causing the error:

"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Typography, TextField, Button } from "@mui/material/";
import EditableNexusCard from "./EditableNexusCard"
import cardSchema from "@/app/schemas/cardSchema"
import { CardData } from "@/app/types/types"

export default function NexusCardForm() {
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
          formCardData={formCardData}
        />
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </>
  )
};

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Typography } from "@mui/material/";

// // TYPES
// import { CardData } from "../../types/types";
// import cardSchema from '../../schemas/cardSchema';

// // COMPONENTS
// import EditableNexusCard from './EditableNexusCard';

// export default function NexusCardForm() {
//   const {
//     control,
//     handleSubmit,
//     watch,
//     formState: { errors }
//   } = useForm<CardData>({
//     resolver: zodResolver(cardSchema)
//   });

//   const cardData = watch();

//   const onSubmit = (data: CardData) => {
//     console.log(data);
//   };

//   return (
//     <>
//       <Typography variant="h2">{cardData.cardName}</Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//           <EditableNexusCard
//             control={control}
//             cardData={cardData}
//           />
//       </form>
//     </>
    
//   );
// };