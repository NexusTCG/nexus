import { z } from "zod";

const PasswordSchema = z.object({
  password: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100),
});

export default PasswordSchema;