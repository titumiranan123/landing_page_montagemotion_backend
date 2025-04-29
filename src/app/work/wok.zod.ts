import { z } from "zod";

export const VideoSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  video_link: z.string().url("Video link must be a valid URL").optional(),
  isVisible: z.boolean().optional(),
  isFeature: z.boolean().optional(),
  position: z.number().optional(),
  type: z.enum([
    "main",
    "shorts",
    "talking",
    "podcast",
    "graphic",
    "advertising",
    "website"
  ]),
  subType: z.enum([
    "full",
    "short",
    "hook",
    "thumbnail",
    "poster",
    "uiux_design",
    "web_development",
    "ovc",
    "reels"
  ]).optional(),
});

// export Type from Schema
export type VideoSchemaType = z.infer<typeof VideoSchema>;
