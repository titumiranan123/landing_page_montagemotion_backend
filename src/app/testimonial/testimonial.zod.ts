import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(1),
  designation: z.string().min(1),
  image: z.string().url(),
  video_message: z.string().optional(),
  message: z.string().optional(),
  position: z.number().optional(),
  category: z.enum(["message", "video_message"]),
  type: z.enum([
    "main",
    "shorts",
    "talking",
    "podcast",
    "graphic",
    "advertising",
    "website",
  ]),
});
