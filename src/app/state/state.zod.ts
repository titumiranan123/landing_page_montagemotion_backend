import { z } from "zod";

export const recentSchema = z.object({
  successfull_projects: z.string(),
  experience: z.string(),
  total_member: z.boolean(),
  type: z.enum(["short_video", "talking_head", "podcast", "thumbnail"]),
});
