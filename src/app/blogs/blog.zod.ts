import { z } from "zod";

export const BlogSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title is required"),
  short_description: z.string().min(20, "Short description is too short"),
  description: z.string().min(100, "Description is too short"),
  image: z.string().url("Invalid image URL"),
  is_publish: z.boolean().optional(),
  is_feature: z.boolean().optional(),
});

export const BlogUpdateSchema = BlogSchema.partial();
