import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cardSchema from '../../schemas/cardSchema'; 
import EditableNexusCard from './EditableNexusCard';
import { CardData } from "../../types/types";

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
    <form onSubmit={handleSubmit(onSubmit)}>
        <EditableNexusCard
          control={control}
            nexusCardData={cardData}
        />
    </form>
  );
};
