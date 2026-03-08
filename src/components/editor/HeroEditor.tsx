"use client";

import type { HeroData } from "@/lib/schema";
import { ImageUpload } from "./ImageUpload";

interface HeroEditorProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export function HeroEditor({ data, onChange }: HeroEditorProps) {
  const update = (key: keyof HeroData, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <>
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-400">Headline</label>
        <input
          value={data.headline}
          onChange={(e) => update("headline", e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors"
          placeholder="Enter headline..."
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-400">Subheadline</label>
        <textarea
          value={data.subheadline || ""}
          onChange={(e) => update("subheadline", e.target.value)}
          rows={3}
          className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors resize-none"
          placeholder="Enter subheadline..."
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400">CTA Text</label>
          <input
            value={data.ctaText}
            onChange={(e) => update("ctaText", e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400">CTA URL</label>
          <input
            value={data.ctaUrl}
            onChange={(e) => update("ctaUrl", e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors"
          />
        </div>
      </div>
      <ImageUpload
        label="Hero Image (Optional)"
        value={data.imageUrl || ""}
        onChange={(url) => update("imageUrl", url)}
      />
    </>
  );
}
