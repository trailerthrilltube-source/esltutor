"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PricingCard } from "@/components/ui/PricingCard";
import type { PricingPlan } from "@/types";

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: 1500,
    currency: "PHP",
    sessions: 4,
    features: ["4 sessions per month", "45 minutes per session", "Session recordings", "Study materials included", "WhatsApp support"],
    popular: false,
  },
  {
    name: "Growth",
    price: 2800,
    currency: "PHP",
    sessions: 8,
    features: ["8 sessions per month", "45 minutes per session", "Session recordings", "Study materials included", "Priority scheduling", "Progress tracking"],
    popular: true,
  },
  {
    name: "Intensive",
    price: 3800,
    currency: "PHP",
    sessions: 12,
    features: [
      "12 sessions per month",
      "45 minutes per session",
      "Session recordings",
      "Study materials included",
      "Priority scheduling",
      "Progress tracking",
      "Monthly assessment report",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string>("");

  const handleCheckout = async (plan: PricingPlan) => {
    setLoadingPlan(plan.name);
    try {
      const response = await fetch("/api/payments/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? "Could not create payment link");
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      alert(error instanceof Error ? error.message : "Payment initialization failed");
    } finally {
      setLoadingPlan("");
    }
  };

  return (
    <section id="pricing" className="bg-ivory py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <SectionLabel label="Pricing" />
        <h2 className="font-display text-5xl text-navy">Choose Your Learning Plan</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={loadingPlan === plan.name ? "pointer-events-none opacity-70" : ""}>
              <PricingCard plan={plan} onCheckout={handleCheckout} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
