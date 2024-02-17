import { z } from "zod";

// Schema for login does not include username
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for sign-up includes username
const SignUpSchema = z.object({
  username: z.string().min(4, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export { LoginSchema, SignUpSchema };