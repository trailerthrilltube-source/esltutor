"use client";

import { useCountUp } from "@/hooks/useCountUp";

export function StatCard({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const { ref, value: display } = useCountUp(value);

  return (
    <div ref={ref} className="rounded-2xl border border-gold/25 bg-white/80 px-5 py-4 text-center shadow-sm">
      <p className="font-display text-4xl font-semibold text-navy">
        {display}
        {suffix}
      </p>
      <p className="mt-1 font-body text-sm text-slate-600">{label}</p>
    </div>
  );
}
