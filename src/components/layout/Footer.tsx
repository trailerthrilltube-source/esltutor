"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type InquiryInput } from "@/lib/validations";
import { GoldButton } from "@/components/ui/GoldButton";

export function Footer() {
  const [status, setStatus] = useState<string>("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: InquiryInput) => {
    setStatus("");
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("Unable to send inquiry. Please try again.");
      return;
    }

    setStatus("Inquiry sent. We will contact you shortly.");
    reset();
  };

  return (
    <footer id="contact" className="bg-[#0A1636] py-20 text-ivory">
      <div className="mx-auto grid w-[min(1120px,92vw)] gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-gold">Contact</p>
          <h2 className="mt-3 font-display text-5xl">Let’s Plan Your English Journey</h2>
          <p className="mt-5 max-w-md font-body text-sm text-muted">For teens, adults, and professionals seeking high-impact online English coaching.</p>
          <div className="mt-6 space-y-1 font-body text-sm text-ivory/90">
            <p>WhatsApp: +63 900 000 0000</p>
            <p>Email: hello@bluepeakesl.com</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-gold/20 bg-white/5 p-6 backdrop-blur">
          <div>
            <input {...register("name")} placeholder="Your Name" className="w-full border-b-2 border-gold/50 bg-transparent pb-2 font-body text-sm outline-none placeholder:text-ivory/60 focus:border-gold" />
            {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name.message}</p> : null}
          </div>
          <div>
            <input {...register("email")} placeholder="Your Email" className="w-full border-b-2 border-gold/50 bg-transparent pb-2 font-body text-sm outline-none placeholder:text-ivory/60 focus:border-gold" />
            {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email.message}</p> : null}
          </div>
          <div>
            <textarea {...register("message")} rows={4} placeholder="Tell us your learning goals" className="w-full border-b-2 border-gold/50 bg-transparent pb-2 font-body text-sm outline-none placeholder:text-ivory/60 focus:border-gold" />
            {errors.message ? <p className="mt-1 text-xs text-red-300">{errors.message.message}</p> : null}
          </div>

          <GoldButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </GoldButton>
          {status ? <p className="font-body text-xs text-gold-light">{status}</p> : null}
        </form>
      </div>
    </footer>
  );
}
