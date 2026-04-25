"use client";

import { useEffect, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MediaCard } from "@/components/ui/MediaCard";
import { supabase } from "@/lib/supabase";
import { SessionMedia } from "@/types";

const fallbackMedia: SessionMedia[] = [
  {
    id: "demo-1",
    created_at: new Date().toISOString(),
    title: "Speaking Practice Snapshot",
    description: "Live pronunciation correction segment",
    type: "image",
    storage_path: "",
    public_url: "/images/hero-esl.jpg",
    is_published: true,
  },
  {
    id: "demo-2",
    created_at: new Date().toISOString(),
    title: "Pronunciation Demo Audio",
    description: "Accent and pacing exercise",
    type: "audio",
    storage_path: "",
    public_url: "",
    is_published: true,
  },
];

export function GallerySection() {
  const [media, setMedia] = useState<SessionMedia[]>(fallbackMedia);

  useEffect(() => {
    const loadMedia = async () => {
      const { data } = await supabase
        .from("session_media")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (data && data.length) {
        setMedia(data as SessionMedia[]);
      }
    };

    loadMedia();
  }, []);

  return (
    <section id="gallery" className="bg-navy py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <SectionLabel label="Gallery" />
        <h2 className="font-display text-5xl text-ivory">Session Highlights</h2>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {media.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
