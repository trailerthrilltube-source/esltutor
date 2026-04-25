import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  { title: "Discovery Call", description: "Share your goals and language challenges." },
  { title: "Custom Plan", description: "Get a lesson strategy aligned to your schedule." },
  { title: "Weekly Growth", description: "Attend sessions and track measurable progress." },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-navy py-20 text-ivory">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <SectionLabel label="How It Works" />
        <h2 className="font-display text-5xl">A Simple High-Impact Learning Flow</h2>
        <div className="relative mt-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="absolute left-[13%] top-6 hidden w-[74%] border-t-2 border-dashed border-gold md:block" />
          {steps.map((step, index) => (
            <article key={step.title} className="relative z-10 max-w-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold font-display text-2xl font-semibold text-navy">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-4xl">{step.title}</h3>
              <p className="mt-2 font-body text-sm text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
