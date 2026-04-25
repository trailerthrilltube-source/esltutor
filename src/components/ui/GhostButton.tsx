"use client";

import type { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

export function GhostButton({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block">
      <button
        className={`rounded-full border border-gold/70 bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-ivory transition hover:bg-gold/10 ${className}`}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
}
