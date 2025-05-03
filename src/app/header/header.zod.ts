import { z } from "zod";

export const headerSchema = z.object({
  thumbnail: z.string(),
  video_link: z.string(),
  isActive: z.string(),
  type: z.enum(["short_video", "talking_head", "podcast", "thumbnail"]),
});
