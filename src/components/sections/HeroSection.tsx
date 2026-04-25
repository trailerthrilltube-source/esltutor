"use client";

import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/GoldButton";
import { GhostButton } from "@/components/ui/GhostButton";

const headline = "Master English. Transform Your Life.".split(" ");

export function HeroSection() {
  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-navy pt-24 text-ivory">
      <div className="absolute -left-20 top-20 h-72 w-72 animate-float-orb rounded-full bg-gold/20 blur-[80px]" />
      <div className="absolute right-0 top-1/4 h-80 w-80 animate-float-orb rounded-full bg-amber-400/15 blur-[90px] [animation-delay:3s]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-float-orb rounded-full bg-white/10 blur-[85px] [animation-delay:6s]" />

      <div className="relative z-10 mx-auto w-[min(1120px,92vw)]">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-4 font-body text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
          ONLINE ESL TUTORING
        </motion.p>

        <h1 className="max-w-5xl font-display text-[44px] font-semibold leading-[1.02] md:text-[64px] lg:text-[72px]">
          {headline.map((word, index) => {
            const isItalic = word.includes("Life.");
            return (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.08, duration: 0.5 }}
                className={`mr-3 inline-block ${isItalic ? "italic" : ""}`}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 max-w-2xl font-body text-xl font-light text-muted">
          Personalized 1-on-1 lessons for conversational fluency, grammar confidence, and professional communication.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-8 flex flex-wrap gap-4">
          <GoldButton onClick={() => scrollTo("booking")}>Book Free Trial</GoldButton>
          <GhostButton onClick={() => scrollTo("services")}>Explore Services</GhostButton>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-16 flex flex-wrap items-center gap-3 font-body text-xs uppercase tracking-[0.08em] text-ivory/80">
          <span>Trusted by Professionals</span>
          <span className="text-gold">•</span>
          <span>International Learners</span>
          <span className="text-gold">•</span>
          <span>Flexible Online Sessions</span>
        </motion.div>
      </div>
    </section>
  );
}
