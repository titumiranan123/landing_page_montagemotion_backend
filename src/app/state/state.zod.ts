import { z } from "zod";

export const StateSchema = z.object({
  id: z.string().optional(),
  isActive: z.boolean(),
  states: z.array(
    z.object({
      title: z.string(),
      count: z.number(),
      unit: z.string(),
      isPublish: z.boolean(),
    }),
  ),
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
