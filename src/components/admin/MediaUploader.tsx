"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SessionMedia, MediaType } from "@/types";

export function MediaUploader() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<MediaType>("image");
  const [file, setFile] = useState<File | null>(null);
  const [items, setItems] = useState<SessionMedia[]>([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("session_media").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as SessionMedia[]);
  };

  useEffect(() => {
    load();
  }, []);

  const uploadFile = async () => {
    if (!file || !title) return;
    setBusy(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("session-media").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) throw error;

      const { data: urlData } = supabase.storage.from("session-media").getPublicUrl(fileName);

      await supabase.from("session_media").insert({
        title,
        description,
        type,
        storage_path: fileName,
        public_url: urlData.publicUrl,
        is_published: false,
      });

      setTitle("");
      setDescription("");
      setType("image");
      setFile(null);
      await load();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("session_media").update({ is_published: !current }).eq("id", id);
    await load();
  };

  const remove = async (id: string, path: string) => {
    await supabase.storage.from("session-media").remove([path]);
    await supabase.from("session_media").delete().eq("id", id);
    await load();
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" className="rounded border border-slate-300 px-3 py-2 text-sm" />
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description" rows={2} className="rounded border border-slate-300 px-3 py-2 text-sm" />
        <select value={type} onChange={(event) => setType(event.target.value as MediaType)} className="rounded border border-slate-300 px-3 py-2 text-sm">
          <option value="image">Image</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
        <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="text-sm" />
        <button disabled={busy} onClick={uploadFile} className="rounded bg-navy px-4 py-2 text-sm text-white hover:bg-[#142a5f]">
          {busy ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
            {item.type === "image" ? <img src={item.public_url} alt={item.title} className="mb-3 h-40 w-full rounded-lg object-cover" /> : null}
            <p className="font-display text-2xl text-navy">{item.title}</p>
            <p className="font-body text-sm text-slate-600">{item.description}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => togglePublish(item.id, item.is_published)} className="rounded border border-slate-300 px-3 py-1 text-xs">
                {item.is_published ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => remove(item.id, item.storage_path)} className="rounded border border-red-300 px-3 py-1 text-xs text-red-600">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
