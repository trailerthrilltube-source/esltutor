import { z } from 'zod';

export const bookingSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  whatsapp: z.string().min(10, { message: 'Valid WhatsApp number is required' }),
  englishLevel: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
    errorMap: () => ({ message: 'Please select your English level' }),
  }),
  preferredDate: z.string().min(1, { message: 'Please select a date' }),
  preferredTime: z.string().min(1, { message: 'Please select a time' }),
  goals: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
