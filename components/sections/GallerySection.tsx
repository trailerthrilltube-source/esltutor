"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const MOCK_MEDIA = [
  {
    id: '1',
    type: 'image',
    title: 'Student Presentation',
    public_url: 'https://images.unsplash.com/photo-1522202176988-66233c5fd44b?w=800&q=80'
  },
  {
    id: '2',
    type: 'image',
    title: 'Interactive Lesson',
    public_url: 'https://images.unsplash.com/photo-1503676260776-bf10dbe73d6d?w=800&q=80'
  },
  {
    id: '3',
    type: 'image',
    title: 'Group Discussion',
    public_url: 'https://images.unsplash.com/photo-1524178232363-80a1425d2589?w=800&q=80'
  }
];

export const GallerySection: React.FC = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Temporary: Using mock data instead of Supabase
        setMedia(MOCK_MEDIA);

        /*
        const { data } = await supabase
          .from('session_media')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        if (data) setMedia(data);
        */
      } catch (e) {
        console.error('Gallery fetch error:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedia();
  }, []);

  if (isLoading) return <div className="bg-navy py-24 text-center text-ivory">Loading Gallery...</div>;

  return (
    <section id="gallery" className="bg-navy py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow">Student Success</div>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-ivory mt-4">
            Learning in Action
          </h2>
        </div>

        {media.length === 0 ? (
          <div className="text-center text-muted font-body py-20">
            No published media yet. Check back soon!
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {media.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden group bg-white/5 border border-white/10"
              >
                {item.type === 'image' && (
                  <img src={item.public_url} alt={item.title} className="w-full h-auto object-cover" />
                )}
                {item.type === 'video' && (
                  <div className="relative aspect-video bg-navy flex items-center justify-center">
                    <video src={item.public_url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-navy">▶</div>
                    </div>
                  </div>
                )}
                {item.type === 'audio' && (
                  <div className="bg-white p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="font-display font-semibold text-navy">{item.title}</span>
                      <audio src={item.public_url} controls className="h-8 scale-90" />
                    </div>
                    <div className="flex gap-1 items-end h-8">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-1 bg-gold animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-ivory text-sm font-body">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
