"use client";

import React, { useState, useTransition } from "react";
import { getTheme } from "@/components/themes/registry";
import { PageContent, PageSection, HeroData, FeatureData, PricingData, FAQData, FooterData, SectionType, createDefaultSection, PageSettings } from "@/lib/schema";
import type { Page } from "@prisma/client";
import { updatePage, togglePublish } from "@/lib/actions";
import { Save, Globe, Loader2, ArrowLeft, Plus, Settings2, Palette, X } from "lucide-react";
import Link from "next/link";

import { SectionPanel } from "@/components/editor/SectionPanel";
import { HeroEditor } from "@/components/editor/HeroEditor";
import { FeaturesEditor } from "@/components/editor/FeaturesEditor";
import { PricingEditor } from "@/components/editor/PricingEditor";
import { FAQEditor } from "@/components/editor/FAQEditor";
import { FooterEditor } from "@/components/editor/FooterEditor";

const SECTION_TYPES: { type: SectionType; label: string }[] = [
  { type: "hero", label: "🚀 Hero" },
  { type: "features", label: "✨ Features" },
  { type: "pricing", label: "💰 Pricing" },
  { type: "faq", label: "❓ FAQ" },
];

export function EditorClient({ initialPage }: { initialPage: Page }) {
  const [content, setContent] = useState<PageContent>(initialPage.content as unknown as PageContent);
  const [settings, setSettings] = useState<PageSettings>(
    (initialPage.settings as unknown as PageSettings) || { accentColor: "#3b82f6", fontFamily: "sans" }
  );
  const [themeId, setThemeId] = useState(initialPage.themeId);
  const [isPublished, setIsPublished] = useState(initialPage.isPublished);
  const [isSaving, startSaving] = useTransition();
  const [isPublishing, startPublishing] = useTransition();
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "settings">("content");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const Theme = getTheme(themeId);
  const sections = content.sections || [];

  // --- Section Management Handlers ---

  const updateSectionData = (sectionId: string, data: HeroData | FeatureData[] | PricingData[] | FAQData[]) => {
    setContent(prev => ({
      ...prev,
      sections: (prev.sections || []).map(s =>
        s.id === sectionId ? { ...s, data } as PageSection : s
      ),
    }));
  };

  const addSection = (type: SectionType) => {
    setContent(prev => ({
      ...prev,
      sections: [...(prev.sections || []), createDefaultSection(type)],
    }));
    setShowAddMenu(false);
  };

  const deleteSection = (sectionId: string) => {
    setContent(prev => ({
      ...prev,
      sections: (prev.sections || []).filter(s => s.id !== sectionId),
    }));
  };

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    setContent(prev => {
      const arr = [...(prev.sections || [])];
      const idx = arr.findIndex(s => s.id === sectionId);
      if (idx < 0) return prev;
      const target = direction === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= arr.length) return prev;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return { ...prev, sections: arr };
    });
  };

  const duplicateSection = (sectionId: string) => {
    setContent(prev => {
      const arr = [...(prev.sections || [])];
      const idx = arr.findIndex(s => s.id === sectionId);
      if (idx < 0) return prev;
      const clone: PageSection = JSON.parse(JSON.stringify(arr[idx]));
      clone.id = `${clone.type}-${Date.now()}`;
      arr.splice(idx + 1, 0, clone);
      return { ...prev, sections: arr };
    });
  };

  const toggleVisibility = (sectionId: string) => {
    setContent(prev => ({
      ...prev,
      sections: (prev.sections || []).map(s =>
        s.id === sectionId ? { ...s, hidden: !s.hidden } as PageSection : s
      ),
    }));
  };

  const updateFooter = (footer: FooterData) => {
    setContent(prev => ({ ...prev, footer }));
  };

  const handleSave = () => {
    startSaving(async () => {
      await updatePage(initialPage.id, themeId, content, settings);
    });
  };

  const handlePublish = () => {
    startPublishing(async () => {
      const newStatus = await togglePublish(initialPage.id, isPublished);
      setIsPublished(newStatus);
    });
  };

  // --- Section Editor Router ---
  const renderSectionEditor = (section: PageSection) => {
    switch (section.type) {
      case "hero":
        return <HeroEditor data={section.data} onChange={(d) => updateSectionData(section.id, d)} />;
      case "features":
        return <FeaturesEditor data={section.data} onChange={(d) => updateSectionData(section.id, d)} />;
      case "pricing":
        return <PricingEditor data={section.data} onChange={(d) => updateSectionData(section.id, d)} />;
      case "faq":
        return <FAQEditor data={section.data} onChange={(d) => updateSectionData(section.id, d)} />;
      default:
        return <p className="text-xs text-slate-500">Unknown section type.</p>;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Header */}
      <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <span className="font-bold tracking-tight text-white flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500"></div> Editor
          </span>
          <div className="h-4 w-px bg-slate-700"></div>
          <span className="text-sm font-medium text-slate-300">{initialPage.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-1.5 rounded transition disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded transition disabled:opacity-50 ${
              isPublished
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {isPublishing ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
            {isPublished ? "Unpublish" : "Publish Live"}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[400px] border-r border-slate-800 bg-slate-900 flex flex-col shrink-0 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-slate-800 shrink-0">
            <button 
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition ${activeTab === 'content' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Content
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition ${activeTab === 'settings' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Settings
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {activeTab === 'content' ? (
              <>
                {/* Theme Selector (Modal Trigger) */}
                <section className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-2">
                      <Palette size={14} /> Active Theme
                    </h3>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-blue-400 capitalize">{themeId}</span>
                  </div>
                  <button
                    onClick={() => setIsThemeModalOpen(true)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors border border-slate-700"
                  >
                    Change Theme Gallery
                  </button>
                </section>

                {/* Section Label */}
                <div className="flex items-center justify-between pt-2">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500">Sections</h3>
                  <span className="text-[10px] text-slate-600 font-mono">{sections.length} blocks</span>
                </div>

                {/* Dynamic Section Panels */}
                {sections.map((section, index) => (
                  <SectionPanel
                    key={section.id}
                    section={section}
                    index={index}
                    total={sections.length}
                    isHidden={!!section.hidden}
                    onMoveUp={() => moveSection(section.id, "up")}
                    onMoveDown={() => moveSection(section.id, "down")}
                    onDuplicate={() => duplicateSection(section.id)}
                    onDelete={() => deleteSection(section.id)}
                    onToggleVisibility={() => toggleVisibility(section.id)}
                  >
                    {renderSectionEditor(section)}
                  </SectionPanel>
                ))}

                {/* Add Section Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-700 rounded-xl text-sm text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors font-medium"
                  >
                    <Plus size={16} /> Add Section
                  </button>
                  {showAddMenu && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10 overflow-hidden">
                      {SECTION_TYPES.map(({ type, label }) => (
                        <button
                          key={type}
                          onClick={() => addSection(type)}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-slate-700 transition-colors border-b border-slate-700/50 last:border-b-0"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Editor */}
                {content.footer && (
                  <FooterEditor data={content.footer} onChange={updateFooter} />
                )}
              </>
            ) : (
              <div className="space-y-6">
                <section className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <Palette size={14} /> Global Styling
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Accent Color</label>
                      <div className="flex gap-2 items-center">
                        <input 
                          type="color" 
                          value={settings.accentColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                          className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                        />
                        <input 
                          type="text" 
                          value={settings.accentColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Typography</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['sans', 'serif', 'mono'] as const).map(f => (
                          <button 
                            key={f}
                            onClick={() => setSettings(prev => ({ ...prev, fontFamily: f }))}
                            className={`py-2 text-[10px] font-bold uppercase rounded border transition ${settings.fontFamily === f ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'}`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <Settings2 size={14} /> Site Configuration
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Site Name</label>
                      <input 
                        type="text"
                        value={settings.siteName || ""}
                        onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white"
                        placeholder="My SaaS Website"
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </aside>

        {/* Main Preview Area */}
        <section className="flex-1 bg-slate-950 overflow-y-auto relative custom-scrollbar flex p-8 justify-center">
          <div className="w-full max-w-[1200px] h-fit bg-white rounded-xl shadow-2xl border border-slate-800 overflow-hidden shrink-0 transform origin-top transition-all duration-300">

            {/* Mock Browser Topbar */}
            <div className="h-8 bg-slate-100 border-b flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="ml-4 text-[10px] text-slate-400 font-mono flex-1 text-center bg-white py-1 rounded-sm mx-8">
                preview.saasbuilder.com/{initialPage.slug}
              </div>
            </div>

            {/* Dynamic Rendering Engine */}
            <div className="w-full">
              <Theme.Layout settings={settings}>
                {sections.filter(s => !s.hidden).map((section) => {
                  const BlockComponent = Theme.blocks?.[section.type] as React.FC<Record<string, unknown>>;
                  if (!BlockComponent) return null;
                  return <BlockComponent key={section.id} {...section.data} />;
                })}
                {content.footer && <Theme.Footer {...content.footer} />}
              </Theme.Layout>
            </div>
          </div>
        </section>
      </div>

      {/* Scrollbar styling */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />

      {/* Theme Gallery Modal */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Palette className="text-blue-500" /> Theme Gallery
                </h2>
                <p className="text-sm text-slate-400 mt-1">Select a theme to instantly apply it to your page.</p>
              </div>
              <button 
                onClick={() => setIsThemeModalOpen(false)}
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Theme Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Modern Theme Card */}
                <button 
                  onClick={() => { setThemeId('modern'); setIsThemeModalOpen(false); }}
                  className={`group text-left rounded-xl overflow-hidden border-2 transition-all ${themeId === 'modern' ? 'border-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]' : 'border-slate-800 hover:border-slate-600'}`}
                >
                  <div className="h-40 bg-white p-4 flex flex-col gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="h-3 w-full bg-slate-100 rounded-sm flex items-center px-2 justify-between">
                      <div className="w-6 h-1.5 bg-blue-500 rounded-full"></div>
                      <div className="flex gap-1"><div className="w-3 h-1.5 bg-slate-200"></div><div className="w-3 h-1.5 bg-slate-200"></div></div>
                    </div>
                    <div className="flex-1 bg-blue-50 rounded-lg flex flex-col items-center justify-center p-2 border border-blue-100">
                      <div className="w-24 h-2 bg-slate-800 rounded-full mb-2"></div>
                      <div className="w-16 h-1.5 bg-slate-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className={`p-4 bg-slate-900 border-t ${themeId === 'modern' ? 'border-blue-500/30 bg-blue-950/20' : 'border-slate-800'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className={`text-base font-bold ${themeId === 'modern' ? 'text-blue-400' : 'text-white'}`}>Modern</div>
                      {themeId === 'modern' && <span className="text-[10px] font-bold uppercase bg-blue-500 text-white px-2 py-0.5 rounded-full">Active</span>}
                    </div>
                    <div className="text-xs text-slate-400 font-sans">Clean, corporate, and highly versatile.</div>
                  </div>
                </button>

                {/* Minimalist Theme Card */}
                <button 
                  onClick={() => { setThemeId('minimalist'); setIsThemeModalOpen(false); }}
                  className={`group text-left rounded-xl overflow-hidden border-2 transition-all ${themeId === 'minimalist' ? 'border-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]' : 'border-slate-800 hover:border-slate-600'}`}
                >
                  <div className="h-40 bg-[#FDFDFD] p-4 flex flex-col gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="h-3 w-full border-b border-stone-200 flex justify-between px-2 items-center">
                      <div className="w-10 h-0.5 bg-stone-800"></div>
                      <div className="w-6 h-0.5 bg-stone-300"></div>
                    </div>
                    <div className="flex-1 flex flex-col mt-4 px-2">
                      <div className="w-20 h-3 bg-stone-900 mb-2"></div>
                      <div className="w-14 h-1.5 bg-stone-300"></div>
                      <div className="w-12 h-5 border border-stone-900 mt-auto"></div>
                    </div>
                  </div>
                  <div className={`p-4 bg-slate-900 border-t ${themeId === 'minimalist' ? 'border-blue-500/30 bg-blue-950/20' : 'border-slate-800'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className={`text-base font-bold ${themeId === 'minimalist' ? 'text-blue-400' : 'text-white'}`}>Minimalist</div>
                      {themeId === 'minimalist' && <span className="text-[10px] font-bold uppercase bg-blue-500 text-white px-2 py-0.5 rounded-full">Active</span>}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">Stark, spaced out, monochrome styling.</div>
                  </div>
                </button>

                {/* Bold Theme Card */}
                <button 
                  onClick={() => { setThemeId('bold'); setIsThemeModalOpen(false); }}
                  className={`group text-left rounded-xl overflow-hidden border-2 transition-all ${themeId === 'bold' ? 'border-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]' : 'border-slate-800 hover:border-slate-600'}`}
                >
                  <div className="h-40 bg-zinc-950 p-4 flex flex-col gap-2 relative overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-orange-600/30 blur-2xl rounded-full"></div>
                    <div className="h-3 w-full border-b border-zinc-800 flex justify-between z-10 px-2 items-center">
                      <div className="w-8 h-1 bg-white"></div>
                      <div className="w-8 h-0.5 bg-zinc-700"></div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center z-10">
                      <div className="w-32 h-4 bg-white skew-x-[-10deg] mb-2"></div>
                      <div className="w-20 h-2 bg-zinc-500 mb-4"></div>
                      <div className="w-16 h-4 bg-orange-600 border border-white skew-x-[-10deg]"></div>
                    </div>
                  </div>
                  <div className={`p-4 bg-slate-900 border-t ${themeId === 'bold' ? 'border-blue-500/30 bg-blue-950/20' : 'border-slate-800'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className={`text-base font-bold ${themeId === 'bold' ? 'text-blue-400' : 'text-white'}`}>Bold</div>
                      {themeId === 'bold' && <span className="text-[10px] font-bold uppercase bg-blue-500 text-white px-2 py-0.5 rounded-full">Active</span>}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest">High Impact & Dark</div>
                  </div>
                </button>

                {/* More Themes Coming Soon Placeholder */}
                <div className="group rounded-xl overflow-hidden border-2 border-dashed border-slate-800 flex flex-col items-center justify-center p-6 text-center opacity-50">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                    <Plus className="text-slate-500" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">More Themes</h3>
                  <p className="text-xs text-slate-500">Coming soon</p>
                </div>

              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end shrink-0">
              <button 
                onClick={() => setIsThemeModalOpen(false)}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
