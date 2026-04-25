import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';
import { GoldButton } from '../ui/GoldButton';

const plans = [
  {
    name: "Starter",
    price: 1500,
    currency: "PHP",
    sessions: 4,
    features: [
      "4 sessions per month",
      "45 minutes per session",
      "Session recordings",
      "Study materials included",
      "WhatsApp support"
    ],
    popular: false
  },
  {
    name: "Growth",
    price: 2800,
    currency: "PHP",
    sessions: 8,
    features: [
      "8 sessions per month",
      "45 minutes per session",
      "Session recordings",
      "Study materials included",
      "Priority scheduling",
      "Progress tracking"
    ],
    popular: true
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
      "Monthly assessment report"
    ],
    popular: false
  }
];

export const PricingSection: React.FC = () => {
  const handlePayment = async (planName: string, amount: number) => {
    try {
      const res = await fetch('/api/payments/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planName, amount }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert('Payment gateway error.');
    }
  };

  return (
    <section id="pricing" className="bg-ivory py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>Investment</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-navy mt-4">
            Choose Your Learning Pace
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.02 }}
              className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${
                plan.popular
                ? 'bg-navy text-ivory border-gold scale-105 shadow-2xl'
                : 'bg-white text-navy border-gold/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy text-[10px] font-body font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-display font-semibold mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-display font-bold">{plan.currency} {plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-muted' : 'text-muted'}`}>/mo</span>
              </div>

              <div className="text-center mb-8 py-4 border-y border-gold/20 font-body text-sm">
                {plan.sessions} sessions per month
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-body">
                    <span className="text-gold">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <GoldButton
                className="w-full"
                variant={plan.popular ? 'primary' : 'outline'}
                onClick={() => handlePayment(plan.name, plan.price)}
              >
                Get Started
              </GoldButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
