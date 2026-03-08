"use client";

import { Plus, X, Star, StarOff } from "lucide-react";
import type { PricingData } from "@/lib/schema";

interface PricingEditorProps {
  data: PricingData[];
  onChange: (data: PricingData[]) => void;
}

export function PricingEditor({ data, onChange }: PricingEditorProps) {
  const updateTier = (index: number, key: keyof PricingData, value: string | boolean | string[]) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const addTier = () => {
    onChange([
      ...data,
      {
        id: `p-${Date.now()}`,
        tierName: "New Tier",
        price: "$0",
        features: ["Feature 1"],
        isPopular: false,
        ctaText: "Get Started",
        ctaUrl: "#",
      },
    ]);
  };

  const removeTier = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateFeatureList = (tierIndex: number, featureStr: string) => {
    const features = featureStr.split("\n").filter((f) => f.trim() !== "");
    updateTier(tierIndex, "features", features);
  };

  return (
    <div className="space-y-3">
      {data.map((tier, i) => (
        <div key={tier.id} className="relative p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => updateTier(i, "isPopular", !tier.isPopular)}
              className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full transition-colors ${
                tier.isPopular ? "bg-amber-500/20 text-amber-400" : "bg-slate-800 text-slate-500"
              }`}
            >
              {tier.isPopular ? <Star size={10} /> : <StarOff size={10} />}
              {tier.isPopular ? "Popular" : "Set Popular"}
            </button>
            <button onClick={() => removeTier(i)} className="p-1 hover:bg-red-900/40 rounded text-red-400 transition-colors">
              <X size={12} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={tier.tierName}
              onChange={(e) => updateTier(i, "tierName", e.target.value)}
              className="bg-transparent border border-slate-800 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 text-white"
              placeholder="Tier name"
            />
            <input
              value={tier.price}
              onChange={(e) => updateTier(i, "price", e.target.value)}
              className="bg-transparent border border-slate-800 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 text-white"
              placeholder="Price"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase">Features (one per line)</label>
            <textarea
              value={tier.features.join("\n")}
              onChange={(e) => updateFeatureList(i, e.target.value)}
              rows={3}
              className="w-full bg-transparent border border-slate-800 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500 text-white resize-none font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={tier.ctaText}
              onChange={(e) => updateTier(i, "ctaText", e.target.value)}
              className="bg-transparent border border-slate-800 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 text-white"
              placeholder="CTA text"
            />
            <input
              value={tier.ctaUrl}
              onChange={(e) => updateTier(i, "ctaUrl", e.target.value)}
              className="bg-transparent border border-slate-800 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 text-white"
              placeholder="CTA URL"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addTier}
        className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-slate-700 rounded-lg text-xs text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors"
      >
        <Plus size={14} /> Add Pricing Tier
      </button>
    </div>
  );
}
