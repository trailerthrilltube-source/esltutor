"use client";

import { useMemo, useState } from "react";
import { SessionMedia } from "@/types";

export function MediaCard({ media }: { media: SessionMedia }) {
  const [playing, setPlaying] = useState(false);
  const bars = useMemo(() => Array.from({ length: 20 }, (_, idx) => idx), []);

  if (media.type === "image") {
    return (
      <article className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-gold/20 bg-[#12234e]">
        <img src={media.public_url} alt={media.title} className="w-full object-cover transition duration-300 hover:scale-105" />
        <div className="p-4">
          <p className="font-display text-2xl text-ivory">{media.title}</p>
          <p className="font-body text-sm text-muted">{media.description}</p>
        </div>
      </article>
    );
  }

  if (media.type === "video") {
    return (
      <article className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-gold/20 bg-[#12234e] p-4">
        <div className="relative overflow-hidden rounded-xl">
          <img src={media.thumbnail_url || media.public_url} alt={media.title} className="w-full object-cover" />
          <button className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-gold text-navy">▶</button>
        </div>
        <p className="mt-3 font-display text-2xl text-ivory">{media.title}</p>
      </article>
    );
  }

  return (
    <article className="mb-4 break-inside-avoid rounded-2xl border border-gold/20 bg-[#12234e] p-4">
      <div className="flex items-end gap-1 rounded-xl bg-[#0b1738] p-3">
        {bars.map((bar) => (
          <span
            key={bar}
            className={`block w-1 rounded bg-gold ${playing ? "animate-waveform" : ""}`}
            style={{ height: `${8 + (bar % 7) * 3}px`, animationDelay: `${bar * 0.05}s` }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="font-display text-2xl text-ivory">{media.title}</p>
        <button onClick={() => setPlaying((v) => !v)} className="rounded-full border border-gold/60 px-3 py-1 font-body text-xs text-gold">
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <audio src={media.public_url} controls className="mt-3 w-full" />
    </article>
  );
}
