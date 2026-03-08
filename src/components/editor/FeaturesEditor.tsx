"use client";

import { Plus, X } from "lucide-react";
import type { FeatureData } from "@/lib/schema";

interface FeaturesEditorProps {
  data: FeatureData[];
  onChange: (data: FeatureData[]) => void;
}

export function FeaturesEditor({ data, onChange }: FeaturesEditorProps) {
  const updateItem = (index: number, key: keyof FeatureData, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const addItem = () => {
    onChange([...data, { id: `f-${Date.now()}`, title: "", description: "" }]);
  };

  const removeItem = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={item.id} className="relative p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
          <button
            onClick={() => removeItem(i)}
            className="absolute top-2 right-2 p-1 hover:bg-red-900/40 rounded text-red-400 transition-colors"
          >
            <X size={12} />
          </button>
          <input
            value={item.title}
            onChange={(e) => updateItem(i, "title", e.target.value)}
            className="w-full bg-transparent border border-slate-800 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 text-white"
            placeholder="Feature title"
          />
          <textarea
            value={item.description}
            onChange={(e) => updateItem(i, "description", e.target.value)}
            rows={2}
            className="w-full bg-transparent border border-slate-800 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 text-white resize-none"
            placeholder="Feature description"
          />
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-slate-700 rounded-lg text-xs text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors"
      >
        <Plus size={14} /> Add Feature
      </button>
    </div>
  );
}
