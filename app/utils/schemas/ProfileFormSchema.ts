import { z } from "zod";

const ProfileFormSchema = z.object({
  id: z
    .string()
    .optional(),
  username: z
    .string()
    .min(4, "Usernames must be at least 4 characters")
    .max(20, "Usernames must be at most 20 characters"),
  first_name: z
    .string()
    .max(50)
    .optional(),
  last_name: z
    .string()
    .max(50)
    .optional(),
  // avatar_url: z
  //   .string()
  //   .optional(),
  bio: z
    .string()
    .max(150)
    .optional(),
});

export default ProfileFormSchema;