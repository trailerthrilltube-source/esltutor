import { Testimonial } from "@/types";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="rounded-2xl border border-[#e6decd] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-gold bg-cream">
          {item.photo_url ? <img src={item.photo_url} alt={item.student_name} className="h-full w-full object-cover" /> : null}
        </div>
        <div>
          <p className="font-body text-sm font-medium text-navy">{item.student_name}</p>
          <p className="font-body text-xs text-slate-500">
            {item.flag_emoji} {item.country}
          </p>
        </div>
      </div>
      <p className="mb-2 text-gold">{"★".repeat(item.rating)}</p>
      <blockquote className="font-display text-2xl italic leading-relaxed text-navy">“{item.quote}”</blockquote>
    </article>
  );
}
