import { z } from 'zod';

const cardSchema = z.object({
    cardCreator: z.string().min(1, "Card creator is required."),
    cardName: z.string().min(1, "Card name is required."),
    cardCost: z.array(z.string()).min(1, "At least one cost is required."),
    cardColor: z.string(),
    cardArt: z.string().min(1, "Card art is required."),
    cardType: z.string().min(1, "Card type is required."),
    cardSuperType: z.string(),
    cardSubType: z.array(z.string()),
    cardGrade: z.string(),
    cardText: z.string().min(1, "Card text is required."),
    cardFlavorText: z.string(),
    cardAttack: z.string(),
    cardDefense: z.string(),
});

export default cardSchema;