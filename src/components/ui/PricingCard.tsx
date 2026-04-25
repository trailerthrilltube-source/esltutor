"use client";

import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/GoldButton";
import type { PricingPlan } from "@/types";

export function PricingCard({ plan, onCheckout }: { plan: PricingPlan; onCheckout: (plan: PricingPlan) => void }) {
  const popular = plan.popular;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl border p-6 shadow-sm ${popular ? "scale-100 border-gold bg-navy text-ivory lg:scale-105" : "border-[#E8E4DD] bg-white text-navy"}`}
    >
      {popular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 font-body text-xs font-medium text-navy">Most Popular</span>
      ) : null}
      <h3 className="font-display text-4xl">{plan.name}</h3>
      <p className={`mt-2 font-body text-sm ${popular ? "text-muted" : "text-slate-600"}`}>{plan.sessions} sessions monthly</p>
      <p className="mt-4 font-display text-5xl font-semibold">₱{plan.price}</p>
      <ul className="mt-5 space-y-2 font-body text-sm">
        {plan.features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <GoldButton className="mt-6 w-full" onClick={() => onCheckout(plan)}>
        Get Started
      </GoldButton>
    </motion.article>
  );
}
