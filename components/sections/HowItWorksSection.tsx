import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';

const steps = [
  {
    title: "Free Consultation",
    desc: "A 15-minute discovery call to assess your current level and goals."
  },
  {
    title: "Customized Roadmap",
    desc: "A tailored learning plan focusing on your specific professional needs."
  },
  {
    title: "Fluent Communication",
    desc: "Consistent practice and feedback leading to natural, confident speech."
  }
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-navy py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <SectionLabel>The Process</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-ivory mt-4">
            Your Journey to Fluency
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-0">
          {/* Dotted line connecting steps */}
          <div className="hidden md:block absolute top-12 left-0 right-0 border-t-2 border-dashed border-gold/30 -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center max-w-sm"
            >
              <div className="w-16 h-16 rounded-full bg-gold text-navy flex items-center justify-center text-2xl font-display font-semibold mb-6 shadow-lg">
                0{i + 1}
              </div>
              <h3 className="text-xl font-display font-semibold text-ivory mb-3">{step.title}</h3>
              <p className="text-muted font-body text-sm leading-relaxed px-4">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
