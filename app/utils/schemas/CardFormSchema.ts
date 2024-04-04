import { z } from "zod";

const EnergyCostSchema = z
  .object({
    radiant: z.number().int().min(0).optional(),
    volatile: z.number().int().min(0).optional(),
    corrupt: z.number().int().min(0).optional(),
    blaze: z.number().int().min(0).optional(),
    verdant: z.number().int().min(0).optional(),
    void: z.number().int().min(0).optional(),
  })
  .optional();

const CardFormSchema = z
  .object({
    user_id: z.string().min(1, "User ID is required."), 
    cardCreator: z.string().min(1, "Card creator is required."),
    cardName: z.string().min(1, "Card name is required."),
    cardEnergyValue: z.number().optional(),
    cardEnergyCost: EnergyCostSchema,
    cardEnergyAlignment: z.string().optional(),
    cardArt: z
      .string()
      .min(1, "Card art is required.")
      .default("/images/card-parts/card-art/default-art.jpg"),
    cardType: z.string().min(1, "Card type is required."),
    cardSuperType: z.string().optional(),
    cardSubType: z.array(z.string()).optional(),
    cardSpeed: z.string().optional(),
    cardGrade: z.string().min(1, "Card grade is required.").default("core"),
    cardText: z.string().min(1, "Card text is required."),
    cardLoreText: z.string().optional(),
    cardAttack: z.string().optional(),
    cardDefense: z.string().optional(),
    cardUnitType: z.string().optional(),
    cardPrompt: z.string().optional(),
    cardArtPrompt: z.string().optional(),
    cardRender: z.string().optional(),
    cardAnomalyMode: z.string().optional().default("common"),
    cardAnomalyModeName: z.string().optional(),
    cardAnomalyModeFlavorText: z.string().optional(),
    cardAnomalyModeText: z.string().optional(),
    cardAnomalyModeGrade: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.cardType && 
      !data.cardType.includes("anomaly")
    ) {
      if (!data.cardEnergyCost) {
        ctx.addIssue({
          path: ["cardCost"],
          message: "Card cost is required for this card type.",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.cardSpeed || data.cardSpeed.trim() === "") {
        ctx.addIssue({
          path: ["cardSpeed"],
          message: "Card speed is required for this card type.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export default CardFormSchema;
