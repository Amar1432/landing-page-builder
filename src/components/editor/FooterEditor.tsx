"use client";

import type { FooterData } from "@/lib/schema";

interface FooterEditorProps {
  data: FooterData;
  onChange: (data: FooterData) => void;
}

export function FooterEditor({ data, onChange }: FooterEditorProps) {
  return (
    <div className="border border-slate-800 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-slate-800/50">
        <span className="text-sm font-semibold">📄 Footer</span>
      </div>
      <div className="p-4 space-y-3 bg-slate-900/50">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400">Copyright Text</label>
          <input
            value={data.copyrightText}
            onChange={(e) => onChange({ ...data, copyrightText: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors"
            placeholder="© 2026 Your Company"
          />
        </div>
      </div>
    </div>
  );
}
