"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { BookingSection } from '@/components/sections/BookingSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function Page() {
  const progress = useScrollProgress();

  return (
    <main className="relative">
      <div
        className="fixed top-0 left-0 h-[2px] bg-gold z-[9999] transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      <Navbar />

      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <HowItWorksSection />
      <BookingSection />
      <PricingSection />
      <GallerySection />
      <TestimonialsSection />

      <Footer />
    </main>
  );
}
