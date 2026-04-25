import React from 'react';
import { motion } from 'framer-motion';
import { GoldButton } from '../ui/GoldButton';
import { SectionLabel } from '../ui/SectionLabel';

export const HeroSection: React.FC = () => {
  const headline = "Master English. Transform Your Life.";
  const words = headline.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <section className="relative h-screen w-full bg-navy overflow-hidden flex items-center justify-center text-center px-6">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/20 blur-3xl animate-float-slow rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 blur-3xl animate-float-slow-delayed rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 blur-3xl animate-float-slow rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <SectionLabel>Online ESL Tutoring</SectionLabel>
        </motion.div>

        <motion.h1 className="text-5xl md:text-8xl font-display font-semibold text-ivory mt-6 mb-8 leading-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              className={`inline-block mr-4 ${
                word === 'Life.' ? 'italic' : ''
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl font-body font-light text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Experience a personalized approach to English learning.
          Empowering professionals to communicate with precision,
          confidence, and elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GoldButton onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
            Book Free Trial
          </GoldButton>
          <GoldButton variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Services
          </GoldButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 flex items-center justify-center gap-4 text-muted text-xs font-body uppercase tracking-widest"
        >
          <span>Personalized</span>
          <span className="w-1 h-1 bg-gold rounded-full" />
          <span>Professional</span>
          <span className="w-1 h-1 bg-gold rounded-full" />
          <span>Result-Driven</span>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-slow-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        .animate-float-slow { animation: float-slow 20s infinite ease-in-out; }
        .animate-float-slow-delayed { animation: float-slow-delayed 20s infinite ease-in-out; }
      `}</style>
    </section>
  );
};
