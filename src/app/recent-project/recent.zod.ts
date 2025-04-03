import { z } from "zod";

export const recentSchema = z.object({
thumbnail: z.string(),
  video_link: z.string(),
  isVisible: z.boolean(),
  position: z.boolean().optional(),
  type: z.enum(["short_video" , "talking_head" , "podcast" , "thumbnail"])
})