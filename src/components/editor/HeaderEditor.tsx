"use client";

import { HeaderData } from "@/lib/schema";
import { Plus, Trash2 } from "lucide-react";

export function HeaderEditor({
  data,
  onChange,
}: {
  data: HeaderData;
  onChange: (data: HeaderData) => void;
}) {
  const addLink = () => {
    onChange({
      ...data,
      links: [...data.links, { label: "New Link", url: "#" }],
    });
  };

  const updateLink = (index: number, field: "label" | "url", value: string) => {
    const newLinks = [...data.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange({ ...data, links: newLinks });
  };

  const removeLink = (index: number) => {
    const newLinks = [...data.links];
    newLinks.splice(index, 1);
    onChange({ ...data, links: newLinks });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Logo Text</label>
        <input
          type="text"
          value={data.logoText}
          onChange={(e) => onChange({ ...data, logoText: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          placeholder="Brand Name"
        />
      </div>

      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Navigation Links</label>
        </div>

        <div className="space-y-2">
          {data.links.map((link, index) => (
            <div key={index} className="flex items-start gap-2 bg-slate-900/50 p-2 rounded border border-slate-800/50">
              <div className="grid grid-cols-2 gap-2 flex-1">
                <input
                  value={link.label}
                  onChange={(e) => updateLink(index, "label", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white"
                  placeholder="Link Label"
                />
                <input
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white"
                  placeholder="URL (e.g. #pricing)"
                />
              </div>
              <button
                onClick={() => removeLink(index)}
                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addLink}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors border border-slate-700 border-dashed flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Add Link
        </button>
      </div>
    </div>
  );
}
