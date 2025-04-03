import { z } from "zod";

export const recentSchema = z.object({
  question: z.string(),
  answer: z.string(),
  isVisible: z.boolean(),
  type: z.enum(["short_video", "talking_head", "podcast", "thumbnail"]),
});
