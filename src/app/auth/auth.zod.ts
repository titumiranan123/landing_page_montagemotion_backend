import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(5).max(50),
  email: z.string().email().max(100),
  password: z.string(),
  role: z.enum(["MODARATOR", "ADMIN"]).default("MODARATOR"),
  verified: z.boolean().default(false),
});
