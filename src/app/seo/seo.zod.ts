import { z } from "zod";

export const seoMetaSchema = z.object({
  page_name: z.enum([
    "main",
    "shorts",
    "talking",
    "podcast",
    "graphic",
    "advertising",
    "website",
    "about",
    "terms",
    "privacy",
    "contact",
    "blog",
  ]),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  metaKeywords: z.string().optional(),

  canonicalUrl: z.string().url().optional(),
  robots: z
    .enum([
      "index, follow",
      "noindex, nofollow",
      "index, nofollow",
      "noindex, follow",
    ])
    .optional(),

  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().url().optional(),
  schema: z.string().optional(),
  structuredData: z.record(z.any()).optional(),
});

// For PUT or PATCH (optional fields)
export const updateSeoMetaSchema = seoMetaSchema.partial();

// If you're validating with ID (like in PUT), you can use:
export const seoMetaWithIdSchema = seoMetaSchema.extend({
  id: z.number(),
});
