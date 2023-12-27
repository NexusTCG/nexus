import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cardSchema from '../../schemas/cardSchema'; 
import EditableNexusCard from './EditableNexusCard';

export default function NexusCardForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(cardSchema)
  });

  const nexusCardData = watch();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <EditableNexusCard cardData={cardData} />
    </form>
  );
}