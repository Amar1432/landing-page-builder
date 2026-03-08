"use client";

import { X, Check } from "lucide-react";
import { getAllThemes } from "@/components/themes/registry";

interface ThemeGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export function ThemeGalleryModal({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme,
}: ThemeGalleryModalProps) {
  if (!isOpen) return null;

  const themes = getAllThemes();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Theme Gallery</h2>
            <p className="text-sm text-slate-400 mt-1">Select a visual style for your landing page.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map(({ id, meta }) => {
              const isActive = id === currentThemeId;
              
              return (
                <button
                  key={id}
                  onClick={() => {
                    onSelectTheme(id);
                    onClose();
                  }}
                  className={`group relative flex flex-col text-left rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                    isActive 
                      ? "border-blue-500 ring-2 ring-blue-500/20" 
                      : "border-slate-800 hover:border-slate-700 bg-slate-800/20"
                  }`}
                >
                  {/* Theme Preview Box */}
                  <div className={`aspect-video w-full ${meta.previewBg} p-4 flex flex-col gap-2 relative overflow-hidden`}>
                    <div className="w-1/2 h-2 rounded-full" style={{ backgroundColor: meta.previewAccent, opacity: 0.4 }}></div>
                    <div className="w-full h-1.5 rounded-full bg-slate-400/20"></div>
                    <div className="w-3/4 h-1.5 rounded-full bg-slate-400/20"></div>
                    <div className="mt-auto flex justify-center">
                      <div className="w-10 h-4 rounded" style={{ backgroundColor: meta.previewAccent }}></div>
                    </div>
                    
                    {isActive && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg">
                        <Check size={12} strokeWidth={4} />
                      </div>
                    )}
                  </div>

                  {/* Theme Info */}
                  <div className="p-4 bg-slate-900/50">
                    <h4 className="font-bold text-white flex items-center justify-between">
                      {meta.name}
                      {isActive && <span className="text-[10px] uppercase tracking-widest text-blue-400 font-black">Active</span>}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                      {meta.description}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors pointer-events-none"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
