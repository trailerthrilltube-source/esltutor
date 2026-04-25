export type EnglishLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PlanType = 'Starter' | 'Growth' | 'Intensive';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type MediaType = 'image' | 'audio' | 'video';

export interface Booking {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  whatsapp: string;
  english_level: EnglishLevel;
  preferred_date: string;
  preferred_time: string;
  goals?: string;
  status: BookingStatus;
}

export interface Student {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  whatsapp?: string;
  plan: PlanType;
  status: string;
}

export interface Payment {
  id: string;
  created_at: string;
  student_id: string;
  amount: number;
  currency: string;
  plan: PlanType;
  paymongo_id?: string;
  status: PaymentStatus;
}

export interface SessionMedia {
  id: string;
  created_at: string;
  title: string;
  description?: string;
  type: MediaType;
  storage_path: string;
  public_url: string;
  thumbnail_url?: string;
  is_published: boolean;
}

export interface Testimonial {
  id: string;
  created_at: string;
  student_name: string;
  country?: string;
  flag_emoji?: string;
  rating: number;
  quote: string;
  photo_url?: string;
  is_published: boolean;
}
