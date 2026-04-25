"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldButton } from '../ui/GoldButton';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#booking' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy/80 backdrop-blur-md border-b border-gold/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display font-semibold text-gold">
            ESL<span className={isScrolled ? 'text-ivory' : 'text-ivory'}>Tutor</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-body font-medium transition-colors ${
                isScrolled ? 'text-ivory hover:text-gold' : 'text-ivory hover:text-gold'
              }`}
            >
              {link.name}
            </a>
          ))}
          <GoldButton onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
            Book Free Trial
          </GoldButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ivory"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-navy z-40 flex flex-col items-center justify-center gap-8 pt-20 px-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display text-ivory hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <GoldButton onClick={() => {
              setIsMobileMenuOpen(false);
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Book Free Trial
            </GoldButton>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
