import React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchT = async () => {
      try {
        const { data } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        if (data) setTestimonials(data);
      } catch (e) {
        console.error('Testimonials fetch error:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchT();
  }, []);

  if (isLoading) return <div className="bg-cream py-24 text-center text-navy">Loading Testimonials...</div>;

  return (
    <section id="testimonials" className="bg-cream py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow">Voices of Success</div>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-navy mt-4">
            Student Testimonials
          </h2>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center text-muted font-body py-20">
            No testimonials yet. Be our first success story!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gold/10 flex flex-col gap-6"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-gold p-1">
                    <img src={t.photo_url} className="w-full h-full rounded-full object-cover" alt={t.student_name} />
                  </div>
                  <div>
                    <h4 className="font-body font-medium text-navy">{t.student_name}</h4>
                    <p className="text-xs text-muted">{t.country} {t.flag_emoji}</p>
                  </div>
                </div>
                <div className="text-gold flex gap-1">
                  {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="font-display italic text-navy leading-relaxed">
                  "{t.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
