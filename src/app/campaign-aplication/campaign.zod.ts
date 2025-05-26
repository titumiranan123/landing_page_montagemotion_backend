import { z } from "zod";

export const CampaignSchema = z.object({
  id: z.string().uuid().optional(),

  name: z.string().min(1, { message: "Name is required." }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  phone: z.string().min(1, { message: "Phone number is required." }),

  ovc: z.string().min(1, { message: "OVC field is required." }),

  message: z.string().min(1, { message: "Message is required." }),

  selectedinfluencers: z
    .array(z.string().min(1, { message: "Influencer ID cannot be empty." }))
    .min(1, { message: "At least one influencer must be selected." }),

  budget: z.string().min(1, { message: "Budget is required." }),

  project_brief: z.string().min(1, { message: "Project brief is required." }),

  is_read: z.boolean().optional().default(false),

  is_marked: z.boolean().optional().default(false),

  is_rejected: z.boolean().optional().default(false),

  is_sent: z.boolean().optional().default(false),

  rejected_message: z.string().optional().default(""),

  created_at: z.date().optional(),

  updated_at: z.date().optional(),
});

export type ICampaign = z.infer<typeof CampaignSchema>;
