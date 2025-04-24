import { z } from "zod";

export const workSchema = z.object({
  id:z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string(),
  video_link: z.string().optional(),
  isVisible: z.boolean(),
  isFeature: z.boolean().optional(),
  position: z.number().optional(),
  type: z.enum(["main" ,"shorts" , "talking" , "podcast" , "graphic" , "advertising" , "website" ]),
});
