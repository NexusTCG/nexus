import { z } from "zod";

const CardCommentFormSchema = z
  .object({
    card_id: z.number().min(1, "Card ID is required."), 
    user_id: z.string().min(1, "User ID is required."), 
    user: z.string().min(1, "Username is required."),
    comment: z.string().optional(),
  })

export default CardCommentFormSchema;
