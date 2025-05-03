import { z } from "zod";

const socialLinksSchema = z
  .object({
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    tiktok: z.string().url().optional(),
    youtube: z.string().url().optional(),
  })
  .strict()
  .optional();

export const memberProfileSchema = z
  .object({
    name: z.string(),
    role: z.enum(["Team Member", "Influencer"]),
    designation: z.string().optional(), // for Team Member
    username: z.string().optional(), // for Influencer
    photourl: z.string().url(),
    bio: z.string().optional(),
    location: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),

    // Influencer specific
    niche: z.string().optional(),
    followers: z.number().nonnegative().optional(),
    platforms: z.array(z.string()).optional(), // ["Instagram", "YouTube"]
    collaborationtype: z.array(z.string()).optional(), // ["Paid Promotion", "Affiliate Marketing"]
    engagementrate: z.number().min(0).max(100).optional(),
    portfoliolinks: z.array(z.string().url()).optional(),

    // Team Member specific
    skills: z.array(z.string()).optional(),

    // Common social links
    sociallinks: socialLinksSchema,
  })
  .strict();
