"use client";

import { useEffect, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { supabase } from "@/lib/supabase";
import { Testimonial } from "@/types";

const fallback: Testimonial[] = [
  {
    id: "t1",
    created_at: new Date().toISOString(),
    student_name: "Ana Reyes",
    country: "Philippines",
    flag_emoji: "🇵🇭",
    rating: 5,
    quote: "My speaking confidence improved in just one month.",
    is_published: true,
    photo_url: "/images/workspace-esl.jpg",
  },
  {
    id: "t2",
    created_at: new Date().toISOString(),
    student_name: "Kenji Sato",
    country: "Japan",
    flag_emoji: "🇯🇵",
    rating: 5,
    quote: "Very structured sessions and practical corrections.",
    is_published: true,
    photo_url: "/images/hero-esl.jpg",
  },
  {
    id: "t3",
    created_at: new Date().toISOString(),
    student_name: "Mina Park",
    country: "Korea",
    flag_emoji: "🇰🇷",
    rating: 5,
    quote: "Professional and motivating lessons tailored for work.",
    is_published: true,
    photo_url: "/images/how-it-works-esl.jpg",
  },
];

export function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>(fallback);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (data && data.length) {
        setItems(data as Testimonial[]);
      }
    };
    load();
  }, []);

  return (
    <section id="testimonials" className="bg-cream py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <SectionLabel label="Testimonials" />
        <h2 className="font-display text-5xl text-navy">Stories from Learners Worldwide</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
