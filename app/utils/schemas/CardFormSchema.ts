import { z } from "zod";

const EnergyCostSchema = z
  .object({
    radiant: z.number().int().min(0).default(0).optional(),
    volatile: z.number().int().min(0).default(0).optional(),
    corrupt: z.number().int().min(0).default(0).optional(),
    blaze: z.number().int().min(0).default(0).optional(),
    verdant: z.number().int().min(0).default(0).optional(),
    void: z.number().int().min(0).default(0).optional(),
  });

const CardFormSchema = z
  .object({
    // Base Card Data
    id: z.number().optional(),
    user_id: z.string()
      .min(1, "User ID is required."),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    username: z.string()
      .min(1, "Username is required."),
    // Initial Mode Card Data
    im_name: z.string()
      .min(1, "Card name is required."),
    im_type: z.string()
      .min(1, "Card type is required."),
    im_sub_type: z.array(z.string()).optional(),
    im_super_type: z.string().optional(),
    im_grade: z.string()
      .min(1, "Card grade is required.")
      .default("core"),
    im_text: z.string().optional(),
    im_lore_text: z.string().optional(),
    im_card_prompt: z.string().optional(), // Not implemented
    im_art_prompt: z.string().optional(),
    im_art_prompt_options: z.array(z.string()).optional(),
    im_art: z.string()
      .min(1, "Card art is required.")
      .default("/images/card-parts/card-art/default-art.jpg"),
    im_render: z.string().optional(),
    im_energy_value: z.number().default(0),
    im_energy_cost: EnergyCostSchema,
    im_energy_alignment: z.string().optional(),
    im_unit_attack: z.string().optional(),
    im_unit_defense: z.string().optional(),
    im_unit_range: z.string().optional(),
    im_speed: z.string().optional(),
    // Anomaly Mode Card Data
    am_name: z.string()
      .optional()
      .default("Common Anomaly"),
    am_type: z.string()
      .optional()
      .default("common"),
    am_sub_type: z.string().optional(), // Not implemented
    am_super_type: z.string().optional(), // Not implemented
    am_grade: z.string()
      .min(1, "Card grade is required.")
      .default("core"),
    am_text: z.string().optional(),
    am_lore_text: z.string().optional(),
    am_card_prompt: z.string().optional(), // Not implemented
    am_art_prompt: z.string().optional(), // Not implemented
    am_art_prompt_options: z.array(z.string()).optional(), // Not implemented
    am_art: z.string()
      .min(1, "Card art is required.")
      .default("/images/card-parts/card-art/default-anomaly-art.webp"),
    am_render: z.string().optional(), // Not implemented
  })
  // .superRefine((data, ctx) => {
  //   if (
  //     data.cardType && 
  //     !data.cardType.includes("anomaly")
  //   ) {
  //     if (!data.cardEnergyCost) {
  //       ctx.addIssue({
  //         path: ["cardCost"],
  //         message: "Card cost is required for this card type.",
  //         code: z.ZodIssueCode.custom,
  //       });
  //     }

  //     if (!data.cardSpeed || data.cardSpeed.trim() === "") {
  //       ctx.addIssue({
  //         path: ["cardSpeed"],
  //         message: "Card speed is required for this card type.",
  //         code: z.ZodIssueCode.custom,
  //       });
  //     }
  //   }
  // });

export default CardFormSchema;
