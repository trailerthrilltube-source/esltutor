import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';
import { StatCard } from '../ui/StatCard';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-cream py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <div className="relative w-[280px] h-[280px]">
            <div className="absolute inset-0 rounded-full border-[3px] border-gold outline-offset-[8px] outline-[3px] outline-gold z-10 pointer-events-none" />
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&h=600&auto=format&fit=crop"
                alt="Tutor Profile"
                className="w-full h-full object-cover grayscale-[20%] sepia-[20%]"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <SectionLabel>About Me</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-navy leading-tight">
            Dedicated to Your <span className="italic">Evolution</span>
          </h2>
          <p className="text-muted font-body text-lg leading-relaxed">
            With years of experience in linguistic coaching, I specialize in bridging the gap
            between academic English and the nuances of professional communication.
            My approach is not just about grammar, but about the psychology of speaking.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <StatCard label="Students Taught" targetValue={500} />
            <StatCard label="Years Teaching" targetValue={5} />
            <StatCard label="Satisfaction" targetValue={98} suffix="%" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
