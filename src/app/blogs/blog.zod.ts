import { z } from "zod";

export const BlogSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  short_description: z.string(),
  description: z.string(),
  image: z.string().url(),
  alt: z.string(),
  is_publish: z.boolean().optional().default(false),
  is_feature: z.boolean().optional().default(false),
  is_position: z.boolean().optional().default(false),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type IBlog = z.infer<typeof BlogSchema>;
