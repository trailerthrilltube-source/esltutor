"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoldButton } from "@/components/ui/GoldButton";

const links = [
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.45 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-gold/20 bg-navy/80 backdrop-blur-md" : "bg-transparent"}`}>
      <nav className="mx-auto flex w-[min(1120px,92vw)] items-center justify-between py-4">
        <Link href="/" className={`font-display text-3xl ${scrolled ? "text-ivory" : "text-ivory"}`}>
          BluePeak ESL
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`font-body text-sm transition ${active === link.id ? "text-gold" : "text-ivory/90 hover:text-gold"}`}
            >
              {link.label}
            </button>
          ))}
          <GoldButton onClick={() => scrollTo("booking")}>Book Free Trial</GoldButton>
        </div>

        <button className="font-body text-sm text-ivory md:hidden" onClick={() => setMenuOpen((v) => !v)}>
          Menu
        </button>
      </nav>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-navy px-6">
          {links.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="font-display text-4xl text-ivory">
              {link.label}
            </button>
          ))}
          <GoldButton onClick={() => scrollTo("booking")}>Book Free Trial</GoldButton>
        </div>
      ) : null}
    </header>
  );
}
