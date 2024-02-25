import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long"})
    .max(48, { message: "Password must be less than 100 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,100}$/, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
});

export default LoginSchema;