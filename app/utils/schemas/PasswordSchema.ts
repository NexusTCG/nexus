import { z } from "zod";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,100}$/;

const PasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long"})
    .max(48, { message: "Password must be less than 100 characters long" })
    .regex(passwordPattern, {
      message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default PasswordSchema;