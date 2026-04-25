import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCard } from "@/components/ui/StatCard";

export function AboutSection() {
  return (
    <section id="about" className="bg-cream py-20">
      <div className="mx-auto flex w-[min(1120px,92vw)] flex-col items-center gap-12 lg:flex-row lg:items-start">
        <div className="relative h-[280px] w-[280px] shrink-0 rounded-full border-[3px] border-gold outline outline-[3px] outline-offset-8 outline-gold">
          <img src="/images/how-it-works-esl.jpg" alt="ESL Tutor" className="h-full w-full rounded-full object-cover sepia-[0.15]" />
          <div className="absolute inset-0 rounded-full bg-gold/10" />
        </div>
        <div className="flex-1">
          <SectionLabel label="About" />
          <h2 className="font-display text-5xl text-navy">Personalized mentoring for global learners</h2>
          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate-600">
            I help students and professionals develop confident, natural English through coaching sessions designed around your goals, work context, and speaking challenges.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard value={500} label="Students Taught" />
            <StatCard value={5} label="Years Teaching" />
            <StatCard value={98} suffix="%" label="Satisfaction" />
          </div>
        </div>
      </div>
    </section>
  );
}
