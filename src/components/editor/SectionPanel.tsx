"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import type { PageSection } from "@/lib/schema";

const SECTION_LABELS: Record<string, string> = {
  hero: "🚀 Hero",
  features: "✨ Features",
  pricing: "💰 Pricing",
  faq: "❓ FAQ",
  lead_form: "✉️ Lead Form",
  testimonials: "💬 Testimonials",
};

interface SectionPanelProps {
  section: PageSection;
  index: number;
  total: number;
  isHidden: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
  children: React.ReactNode;
}

export function SectionPanel({
  section,
  index,
  total,
  isHidden,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onToggleVisibility,
  children,
}: SectionPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`border border-slate-800 rounded-lg overflow-hidden transition-colors ${isHidden ? "opacity-50" : ""}`}>
      {/* Panel Header */}
      <div className="w-full flex justify-between px-4 py-3 bg-slate-800/50 hover:bg-slate-800 transition-colors">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-1 items-center gap-2 text-left w-full h-full cursor-pointer focus:outline-none"
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span className="text-sm font-semibold">
            {SECTION_LABELS[section.type] || section.type}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">#{index + 1}</span>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onToggleVisibility} className="p-1 hover:bg-slate-700 rounded transition-colors" title={isHidden ? "Show" : "Hide"}>
            {isHidden ? <EyeOff size={13} className="text-slate-500" /> : <Eye size={13} className="text-slate-400" />}
          </button>
          <button onClick={onMoveUp} disabled={index === 0} className="p-1 hover:bg-slate-700 rounded transition-colors disabled:opacity-30" title="Move Up">
            <ArrowUp size={13} />
          </button>
          <button onClick={onMoveDown} disabled={index === total - 1} className="p-1 hover:bg-slate-700 rounded transition-colors disabled:opacity-30" title="Move Down">
            <ArrowDown size={13} />
          </button>
          <button onClick={onDuplicate} className="p-1 hover:bg-slate-700 rounded transition-colors" title="Duplicate">
            <Copy size={13} />
          </button>
          <button onClick={onDelete} className="p-1 hover:bg-red-900/50 rounded transition-colors text-red-400" title="Delete">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Panel Body */}
      {isOpen && (
        <div className="p-4 space-y-4 bg-slate-900/50">
          {children}
        </div>
      )}
    </div>
  );
}
