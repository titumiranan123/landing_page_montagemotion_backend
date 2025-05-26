import { z } from "zod";

export const testimonialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  image: z.string().url("Image must be a valid URL"),
  video_message: z.string().url("Video message must be a valid URL").optional(),
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
