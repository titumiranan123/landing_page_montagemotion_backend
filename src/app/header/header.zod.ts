import { z } from "zod";

export const HeaderSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  book_link: z.string().url(),
  thumbnail: z.string().url(),
  alt: z.string(),
  video_link: z.string().url(),
  type: z.enum([
    "main",
    "shorts",
    "talking",
    "podcast",
    "graphic",
    "advertising",
    "website",
  ]),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type IHeader = z.infer<typeof HeaderSchema>;
