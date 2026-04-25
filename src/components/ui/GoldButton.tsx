"use client";

import type { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

export function GoldButton({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block">
      <button
        className={`rounded-full bg-gold px-6 py-3 text-sm font-medium tracking-wide text-navy transition hover:bg-gold-light ${className}`}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
}
