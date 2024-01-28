import { z } from 'zod';

const EnergyCostSchema = z.object({
    yellow: z.number().int().min(0).optional(),
    blue: z.number().int().min(0).optional(),
    purple: z.number().int().min(0).optional(),
    red: z.number().int().min(0).optional(),
    green: z.number().int().min(0).optional(),
    void: z.number().int().min(0).optional(),
  }).optional();

const CardFormSchema = z.object({
    cardCreator: z.string().min(1, "Card creator is required."),
    cardName: z.string().min(1, "Card name is required."),
    cardEnergyValue: z.number().optional(),
    cardEnergyCost: EnergyCostSchema,
    cardColor: z.string().optional(),
    cardArt: z.string().min(1, "Card art is required.").default("/images/card-parts/card-art/default-art.jpg"),
    cardType: z.string().min(1, "Card type is required."),
    cardSuperType: z.string().optional(),
    cardSubType: z.array(z.string()).optional(),
    cardSpeed: z.string().optional(),
    cardGrade: z.string().min(1, "Card grade is required.").default("Common"),
    cardText: z.string().min(1, "Card text is required."),
    cardFlavorText: z.string().optional(),
    cardAttack: z.string().optional(),
    cardDefense: z.string().optional(),
    cardPrompt: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (data.cardType !== "node") {
      if (!data.cardEnergyCost) {
        ctx.addIssue({
          path: ["cardCost"],
          message: "Card cost is required for this card type.",
          code: z.ZodIssueCode.custom,
        });
      }
  
      if (!data.cardSpeed || data.cardSpeed.trim() === '') {
        ctx.addIssue({
          path: ["cardSpeed"],
          message: "Card speed is required for this card type.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
  
  export default CardFormSchema;