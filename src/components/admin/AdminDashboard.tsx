"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingsList } from "@/components/admin/BookingsList";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { PaymentsList } from "@/components/admin/PaymentsList";
import { supabase } from "@/lib/supabase";

const tabs = ["Bookings", "Media Upload", "Payments", "Testimonials"] as const;

export function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Bookings");
  const [testimonial, setTestimonial] = useState({
    student_name: "",
    country: "",
    flag_emoji: "",
    rating: 5,
    quote: "",
    photo_url: "",
    is_published: true,
  });

  const submitTestimonial = async () => {
    if (!testimonial.student_name || !testimonial.quote) return;
    const { error } = await supabase.from("testimonials").insert(testimonial);
    if (error) {
      alert(error.message);
      return;
    }
    setTestimonial({ student_name: "", country: "", flag_emoji: "", rating: 5, quote: "", photo_url: "", is_published: true });
    alert("Testimonial saved");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-[#f5f7fc] px-4 py-8">
      <div className="mx-auto w-[min(1180px,96vw)]">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-5xl text-navy">Admin Dashboard</h1>
          <button onClick={logout} className="rounded-full border border-slate-300 px-4 py-2 text-sm">Logout</button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm ${activeTab === tab ? "bg-navy text-white" : "bg-white text-slate-700 border border-slate-200"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          {activeTab === "Bookings" ? <BookingsList /> : null}
          {activeTab === "Media Upload" ? <MediaUploader /> : null}
          {activeTab === "Payments" ? <PaymentsList /> : null}
          {activeTab === "Testimonials" ? (
            <div className="space-y-3">
              <input className="w-full rounded border border-slate-300 px-3 py-2 text-sm" placeholder="Student Name" value={testimonial.student_name} onChange={(e) => setTestimonial((p) => ({ ...p, student_name: e.target.value }))} />
              <div className="grid gap-3 sm:grid-cols-3">
                <input className="rounded border border-slate-300 px-3 py-2 text-sm" placeholder="Country" value={testimonial.country} onChange={(e) => setTestimonial((p) => ({ ...p, country: e.target.value }))} />
                <input className="rounded border border-slate-300 px-3 py-2 text-sm" placeholder="Flag Emoji" value={testimonial.flag_emoji} onChange={(e) => setTestimonial((p) => ({ ...p, flag_emoji: e.target.value }))} />
                <input type="number" min={1} max={5} className="rounded border border-slate-300 px-3 py-2 text-sm" value={testimonial.rating} onChange={(e) => setTestimonial((p) => ({ ...p, rating: Number(e.target.value) }))} />
              </div>
              <input className="w-full rounded border border-slate-300 px-3 py-2 text-sm" placeholder="Photo URL" value={testimonial.photo_url} onChange={(e) => setTestimonial((p) => ({ ...p, photo_url: e.target.value }))} />
              <textarea className="w-full rounded border border-slate-300 px-3 py-2 text-sm" rows={4} placeholder="Quote" value={testimonial.quote} onChange={(e) => setTestimonial((p) => ({ ...p, quote: e.target.value }))} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={testimonial.is_published} onChange={(e) => setTestimonial((p) => ({ ...p, is_published: e.target.checked }))} />
                Publish testimonial
              </label>
              <button onClick={submitTestimonial} className="rounded bg-navy px-4 py-2 text-sm text-white">Save Testimonial</button>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
