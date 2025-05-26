import { z } from "zod";

export const aboutSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  alt: z.string().min(1, "Alt text is required"),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
