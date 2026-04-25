import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  whatsapp: z.string().min(10, "Enter a valid WhatsApp number"),
  englishLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  goals: z.string().optional(),
});

export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const testimonialSchema = z.object({
  student_name: z.string().min(2),
  country: z.string().optional(),
  flag_emoji: z.string().optional(),
  rating: z.coerce.number().int().min(1).max(5),
  quote: z.string().min(10),
  photo_url: z.string().url().optional().or(z.literal("")),
  is_published: z.boolean().default(true),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
