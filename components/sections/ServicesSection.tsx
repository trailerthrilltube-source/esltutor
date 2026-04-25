import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';

interface ServiceCardProps {
  icon: string;
  title: string;
  desc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-7 rounded-2xl border border-[#E8E4DD] hover:border-l-[3px] hover:border-l-gold transition-all duration-300"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-display font-semibold text-navy mb-2">{title}</h3>
      <p className="text-sm font-body text-muted leading-relaxed">{desc}</p>
    </motion.div>
  );
};

export const ServicesSection: React.FC = () => {
  const services = [
    { icon: "💬", title: "Conversational English", desc: "Build real-world speaking confidence" },
    { icon: "📖", title: "Grammar Lessons", desc: "Master the rules that make you sound natural" },
    { icon: "🔤", title: "Vocabulary Building", desc: "Expand your word bank the smart way" },
    { icon: "🎙️", title: "Pronunciation", desc: "Sound clear, confident, and fluent" },
    { icon: "✍️", title: "Sentence Patterns", desc: "Structure your thoughts with precision" },
    { icon: "📚", title: "Reading & Comprehension", desc: "Read faster and understand deeper" },
  ];

  return (
    <section id="services" className="bg-ivory py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>Our Expertise</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-navy mt-4">
            Comprehensive Learning Paths
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
