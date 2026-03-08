"use client";

import { TestimonialData } from "@/lib/schema";
import { Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "./ImageUpload";

export function TestimonialsEditor({
  data,
  onChange,
}: {
  data: { items: TestimonialData[] };
  onChange: (data: { items: TestimonialData[] }) => void;
}) {
  const addItem = () => {
    const newItem: TestimonialData = {
      id: Math.random().toString(36).substring(7),
      author: "New Client",
      role: "CEO, Company",
      quote: "This product changed everything.",
    };
    onChange({ items: [...data.items, newItem] });
  };

  const updateItem = (index: number, field: keyof TestimonialData, value: string) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ items: newItems });
  };

  const removeItem = (index: number) => {
    onChange({ items: data.items.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
          Testimonials ({data.items.length})
        </label>
        <button
          onClick={addItem}
          className="text-[10px] flex items-center gap-1 font-bold text-blue-500 hover:text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded"
        >
          <Plus size={12} /> Add
        </button>
      </div>

      <div className="space-y-3">
        {data.items.map((item, index) => (
          <div key={item.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 space-y-3 relative group">
            <button
              onClick={() => removeItem(index)}
              className="absolute right-2 top-2 p-1 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
              title="Remove Item"
            >
              <Trash2 size={13} />
            </button>

            <div className="pr-6 space-y-2">
              <input
                value={item.quote}
                onChange={(e) => updateItem(index, "quote", e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white"
                placeholder="Quote..."
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={item.author}
                  onChange={(e) => updateItem(index, "author", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white"
                  placeholder="Author Name"
                />
                <input
                  value={item.role || ""}
                  onChange={(e) => updateItem(index, "role", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white"
                  placeholder="Role / Subtitle"
                />
              </div>
              <ImageUpload
                label="Avatar Image (Optional)"
                value={item.imageUrl || ""}
                onChange={(url) => updateItem(index, "imageUrl", url)}
              />
            </div>
          </div>
        ))}

        {data.items.length === 0 && (
          <div className="text-center p-4 border border-dashed border-slate-700 rounded-lg text-slate-500 text-xs">
            No testimonials added yet.
          </div>
        )}
      </div>
    </div>
  );
}
