"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingInput } from "@/lib/validations";
import { GoldButton } from "@/components/ui/GoldButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function BookingSection() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (values: BookingInput) => {
    setError("");
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error ?? "Unable to submit booking.");
      return;
    }

    router.push("/booking/confirmation");
  };

  const inputClass = "w-full border-b-2 border-gold/50 bg-transparent pb-2 font-body text-sm text-navy outline-none transition focus:border-gold";

  return (
    <section id="booking" className="bg-cream py-20">
      <div className="mx-auto grid w-[min(1120px,92vw)] gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionLabel label="Book Free Trial" />
          <h2 className="font-display text-5xl text-navy">Reserve your 15-minute assessment</h2>
          <p className="mt-4 font-body text-sm text-slate-600">
            Share your schedule and level. We will confirm your slot and send your session guide.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-[#E3DAC9] bg-white p-7">
          <div>
            <label className="mb-1 block font-body text-xs uppercase tracking-[0.12em] text-slate-500">Full Name</label>
            <input {...register("fullName")} className={inputClass} />
            {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p> : null}
          </div>

          <div>
            <label className="mb-1 block font-body text-xs uppercase tracking-[0.12em] text-slate-500">Email</label>
            <input type="email" {...register("email")} className={inputClass} />
            {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
          </div>

          <div>
            <label className="mb-1 block font-body text-xs uppercase tracking-[0.12em] text-slate-500">WhatsApp</label>
            <input {...register("whatsapp")} className={inputClass} />
            {errors.whatsapp ? <p className="mt-1 text-xs text-red-600">{errors.whatsapp.message}</p> : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-body text-xs uppercase tracking-[0.12em] text-slate-500">English Level</label>
              <select {...register("englishLevel")} className={inputClass}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-body text-xs uppercase tracking-[0.12em] text-slate-500">Preferred Date</label>
              <input type="date" {...register("preferredDate")} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-body text-xs uppercase tracking-[0.12em] text-slate-500">Preferred Time</label>
            <input type="time" {...register("preferredTime")} className={inputClass} />
          </div>

          <div>
            <label className="mb-1 block font-body text-xs uppercase tracking-[0.12em] text-slate-500">Learning Goals</label>
            <textarea rows={3} {...register("goals")} className={inputClass} />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <GoldButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Booking"}
          </GoldButton>
        </form>
      </div>
    </section>
  );
}
