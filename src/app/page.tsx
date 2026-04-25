"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function HomePage() {
  const progress = useScrollProgress();

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <HowItWorksSection />
        <BookingSection />
        <PricingSection />
        <GallerySection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
