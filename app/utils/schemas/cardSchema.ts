import { z } from 'zod';

const colorCostSchema = z.object({
    yellow: z.number().int().min(0).optional(),
    blue: z.number().int().min(0).optional(),
    purple: z.number().int().min(0).optional(),
    red: z.number().int().min(0).optional(),
    green: z.number().int().min(0).optional(),
    void: z.number().int().min(0).optional(),
}).optional();

const cardSchema = z.object({
    cardCreator: z.string().min(1, "Card creator is required."),
    cardName: z.string().min(1, "Card name is required."),
    cardCost: colorCostSchema,
    cardColor: z.string(),
    cardArt: z.string().min(1, "Card art is required."),
    cardType: z.string().min(1, "Card type is required."),
    cardSuperType: z.string().optional(),
    cardSubType: z.array(z.string()).min(1).optional(),
    cardGrade: z.string().min(1, "Card grade is required."),
    cardText: z.string().min(1, "Card text is required."),
    cardFlavorText: z.string().optional(),
    cardAttack: z.string().optional(),
    cardDefense: z.string().optional(),
}).superRefine((val, ctx) => {
    const typesRequiringCost = [
        "Event",
        "Entity",
        "Effect",
        "Object"
    ];

    if (typesRequiringCost.includes(val.cardType) && !val.cardCost) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Card cost is required for this card type."
        });
    }
});

export default cardSchema;