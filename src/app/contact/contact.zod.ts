import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email format")
    .max(100, "Email must be at most 100 characters long"),

  message: z
    .string({ required_error: "Message is required" })
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message must be at most 500 characters long")
    .refine((msg) => /^[a-zA-Z0-9\s.,!?/]+$/.test(msg), {
      message: "Message contains invalid characters",
    }),
});
