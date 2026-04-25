"use client";

import { motion } from "framer-motion";

export function ServiceCard({ icon, title, description, delay = 0 }: { icon: string; title: string; description: string; delay?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-[#E8E4DD] bg-white p-7 transition-all duration-300 hover:border-l-[3px] hover:border-l-gold"
    >
      <p className="text-2xl">{icon}</p>
      <h3 className="mt-3 font-display text-3xl text-navy">{title}</h3>
      <p className="mt-2 font-body text-sm text-slate-600">{description}</p>
    </motion.article>
  );
}
