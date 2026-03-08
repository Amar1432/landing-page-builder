"use client";

import { LeadFormData } from "@/lib/schema";

export function LeadFormEditor({
  data,
  onChange,
}: {
  data: LeadFormData;
  onChange: (data: LeadFormData) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Heading</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Description (Optional)</label>
        <textarea
          value={data.description || ""}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none min-h-[80px]"
          placeholder="Subtext below the heading..."
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Submit Button Text</label>
        <input
          type="text"
          value={data.ctaText}
          onChange={(e) => onChange({ ...data, ctaText: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="pt-4 border-t border-slate-800 space-y-3">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Field Requirements</h4>
        
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={data.requireEmail}
            onChange={(e) => onChange({ ...data, requireEmail: e.target.checked })}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Require Email</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={data.requirePhone}
            onChange={(e) => onChange({ ...data, requirePhone: e.target.checked })}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Require Phone</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={data.requireMessage}
            onChange={(e) => onChange({ ...data, requireMessage: e.target.checked })}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Require Message</span>
        </label>

        <p className="text-[10px] text-slate-500 italic mt-2">
          Note: Name is always required. Uncheck Email/Message for real estate style leads (Name + Phone).
        </p>
      </div>
    </div>
  );
}
