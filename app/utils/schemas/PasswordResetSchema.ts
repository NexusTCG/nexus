import { z } from "zod";

const PasswordResetSchema = z.object({
  resetEmail: z.string().email({ message: "Invalid email address" }),
});

export default PasswordResetSchema;