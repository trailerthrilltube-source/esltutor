export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type EnglishLevel = "Beginner" | "Intermediate" | "Advanced";
export type MediaType = "image" | "audio" | "video";

export interface Booking {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  whatsapp: string;
  english_level: EnglishLevel;
  preferred_date: string;
  preferred_time: string;
  goals?: string | null;
  status: BookingStatus;
}

export interface Student {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  whatsapp?: string | null;
  plan?: "Starter" | "Growth" | "Intensive" | null;
  status?: string;
}

export interface Payment {
  id: string;
  created_at: string;
  student_id?: string | null;
  amount: number;
  currency: string;
  plan: string;
  paymongo_id?: string | null;
  status: "pending" | "paid" | "failed" | "refunded";
}

export interface SessionMedia {
  id: string;
  created_at: string;
  title: string;
  description?: string | null;
  type: MediaType;
  storage_path: string;
  public_url: string;
  thumbnail_url?: string | null;
  is_published: boolean;
}

export interface Testimonial {
  id: string;
  created_at: string;
  student_name: string;
  country?: string | null;
  flag_emoji?: string | null;
  rating: number;
  quote: string;
  photo_url?: string | null;
  is_published: boolean;
}

export interface PricingPlan {
  name: "Starter" | "Growth" | "Intensive";
  price: number;
  currency: "PHP";
  sessions: number;
  features: string[];
  popular: boolean;
}
