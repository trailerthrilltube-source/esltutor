import React from 'react';
import { GoldButton } from '../ui/GoldButton';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-ivory py-16 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-6">
          <span className="text-2xl font-display font-semibold text-gold">
            ESL<span className="text-ivory">Tutor</span>
          </span>
          <p className="text-muted font-body text-sm leading-relaxed">
            Dedicated to helping professionals and students worldwide master
            the English language with confidence and precision.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-display text-xl text-gold">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-muted text-sm font-body">
            <li><a href="#services" className="hover:text-gold transition-colors">Our Services</a></li>
            <li><a href="#about" className="hover:text-gold transition-colors">About the Tutor</a></li>
            <li><a href="#gallery" className="hover:text-gold transition-colors">Student Gallery</a></li>
            <li><a href="#pricing" className="hover:text-gold transition-colors">Pricing Plans</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-display text-xl text-gold">Contact</h4>
          <ul className="flex flex-col gap-2 text-muted text-sm font-body">
            <li>Email: hello@esltutor.com</li>
            <li>WhatsApp: +63 9xx xxx xxxx</li>
            <li>Based in Philippines / Online Worldwide</li>
          </ul>
          <GoldButton variant="outline" className="w-fit text-sm">
            Get in Touch
          </GoldButton>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gold/10 text-center text-xs text-muted font-body">
        © {new Date().getFullYear()} ESL Tutoring. All rights reserved.
      </div>
    </footer>
  );
};
