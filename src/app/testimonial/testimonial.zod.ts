import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(3),
  designation: z.string().min(3),
  message: z.string().min(3).optional(),
  video_message: z.string().min(3).optional(),
  type: z.enum(["short_video", "talking_head", "podcast", "thumbnail"]),
});
