import { z } from "zod";

export const faqItemSchema = z.object({
  id: z.string().optional(),
  question: z.string(),
  answer: z.string(),
  is_visible: z.boolean(),
  position: z.number().optional(),
});

export const faqSchema = z.object({
  title: z.string(),
  sub_title: z.string(),
  is_visible: z.boolean(),
  type: z.enum([
    "main",
    "shorts",
    "talking",
    "podcast",
    "graphic",
    "advertising",
    "website",
  ]),
  faqs: z.array(faqItemSchema).optional(),
});
