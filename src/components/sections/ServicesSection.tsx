import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

const services = [
  { icon: "💬", title: "Conversational English", description: "Build real-world speaking confidence" },
  { icon: "📖", title: "Grammar Lessons", description: "Master the rules that make you sound natural" },
  { icon: "🔤", title: "Vocabulary Building", description: "Expand your word bank the smart way" },
  { icon: "🎙️", title: "Pronunciation", description: "Sound clear, confident, and fluent" },
  { icon: "✍️", title: "Sentence Patterns", description: "Structure your thoughts with precision" },
  { icon: "📚", title: "Reading & Comprehension", description: "Read faster and understand deeper" },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-ivory py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <SectionLabel label="Services" />
        <h2 className="font-display text-5xl text-navy">Focused ESL Programs</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
