import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { bookingSchema, BookingInput } from '@/lib/validations';
import { GoldButton } from '../ui/GoldButton';
import { SectionLabel } from '../ui/SectionLabel';

export const BookingSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingInput) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = '/booking/confirmation';
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error connecting to server.');
    }
  };

  return (
    <section id="booking" className="bg-cream py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex flex-col gap-6">
          <SectionLabel>Start Your Journey</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-navy leading-tight">
            Book Your <span className="italic">Free Trial</span> Session
          </h2>
          <p className="text-muted font-body text-lg leading-relaxed">
            Take the first step towards fluency. In your free 15-minute consultation,
            we'll assess your current level, discuss your professional goals,
            and map out a personalized roadmap for your success.
          </p>

          <div className="space-y-4 mt-4">
            {[
              'Free Level Assessment',
              'Personalized Learning Plan',
              'Flexible Scheduling',
              'Direct WhatsApp Communication'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-navy font-body text-sm">
                <span className="w-2 h-2 bg-gold rounded-full" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-3xl shadow-xl border border-gold/10"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-body uppercase tracking-wider text-muted">Full Name</label>
                <input
                  {...register('fullName')}
                  className="border-b-2 border-muted focus:border-gold outline-none py-2 font-body text-navy transition-all bg-transparent"
                  placeholder="John Doe"
                />
                {errors.fullName && <span className="text-[10px] text-red-500">{errors.fullName.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-body uppercase tracking-wider text-muted">Email Address</label>
                <input
                  {...register('email')}
                  className="border-b-2 border-muted focus:border-gold outline-none py-2 font-body text-navy transition-all bg-transparent"
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-[10px] text-red-500">{errors.email.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-body uppercase tracking-wider text-muted">WhatsApp Number</label>
                <input
                  {...register('whatsapp')}
                  className="border-b-2 border-muted focus:border-gold outline-none py-2 font-body text-navy transition-all bg-transparent"
                  placeholder="+63 9..."
                />
                {errors.whatsapp && <span className="text-[10px] text-red-500">{errors.whatsapp.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-body uppercase tracking-wider text-muted">English Level</label>
                <select
                  {...register('englishLevel')}
                  className="border-b-2 border-muted focus:border-gold outline-none py-2 font-body text-navy transition-all bg-transparent"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                {errors.englishLevel && <span className="text-[10px] text-red-500">{errors.englishLevel.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-body uppercase tracking-wider text-muted">Preferred Date</label>
                <input
                  type="date"
                  {...register('preferredDate')}
                  className="border-b-2 border-muted focus:border-gold outline-none py-2 font-body text-navy transition-all bg-transparent"
                />
                {errors.preferredDate && <span className="text-[10px] text-red-500">{errors.preferredDate.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-body uppercase tracking-wider text-muted">Preferred Time</label>
                <input
                  {...register('preferredTime')}
                  className="border-b-2 border-muted focus:border-gold outline-none py-2 font-body text-navy transition-all bg-transparent"
                  placeholder="e.g. 6:00 PM PHT"
                />
                {errors.preferredTime && <span className="text-[10px] text-red-500">{errors.preferredTime.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-body uppercase tracking-wider text-muted">Learning Goals</label>
              <textarea
                {...register('goals')}
                rows={3}
                className="border-2 border-muted focus:border-gold outline-none p-2 font-body text-navy transition-all bg-transparent rounded-lg"
                placeholder="What do you want to achieve?"
              />
            </div>

            <GoldButton type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Request Free Trial'}
            </GoldButton>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
