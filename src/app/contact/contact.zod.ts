import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50, "Name must be at most 50 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Invalid email format")
    .max(100, "Name can onley contain letters and spaces"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message must be at most 500 characters long")
    .refine((msg) => /^[a-zA-Z0-9\s.,!?/]+$/.test(msg), {
      message: "Message contains invalid characters",
    }),
});
