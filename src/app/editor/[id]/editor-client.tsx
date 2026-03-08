"use client";

import React, { useState, useTransition } from "react";
import { getTheme, getAllThemes } from "@/components/themes/registry";
import { PageContent, PageSection, HeroData, FeatureData, PricingData, FAQData, FooterData, SectionType, createDefaultSection, PageSettings, TestimonialData, LeadFormData, HeaderData } from "@/lib/schema";
import type { Page } from "@prisma/client";
import { updatePage, togglePublish, updateCustomDomain } from "@/lib/actions";
import { Save, Globe, Loader2, ArrowLeft, Plus, Settings2, Palette, Sparkles, Code, Layout, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

import { SectionPanel } from "@/components/editor/SectionPanel";
import { HeroEditor } from "@/components/editor/HeroEditor";
import { FeaturesEditor } from "@/components/editor/FeaturesEditor";
import { PricingEditor } from "@/components/editor/PricingEditor";
import { FAQEditor } from "@/components/editor/FAQEditor";
import { HeaderEditor } from "@/components/editor/HeaderEditor";
import { FooterEditor } from "@/components/editor/FooterEditor";
import { TestimonialsEditor } from "@/components/editor/TestimonialsEditor";
import { LeadFormEditor } from "@/components/editor/LeadFormEditor";
import { ThemeGalleryModal } from "@/components/editor/ThemeGalleryModal";

const SECTION_TYPES: { type: SectionType; label: string }[] = [
  { type: "hero", label: "🚀 Hero" },
  { type: "features", label: "✨ Features" },
  { type: "pricing", label: "💰 Pricing" },
  { type: "faq", label: "❓ FAQ" },
  { type: "testimonials", label: "💬 Testimonials" },
  { type: "lead-form", label: "📥 Lead Form" },
];

export function EditorClient({ initialPage, isAiEnabled = false }: { initialPage: Page, isAiEnabled?: boolean }) {
  const [content, setContent] = useState<PageContent>(initialPage.content as unknown as PageContent);
  const [settings, setSettings] = useState<PageSettings>(
    (initialPage.settings as unknown as PageSettings) || { accentColor: "#3b82f6", fontFamily: "sans" }
  );
  const [themeId, setThemeId] = useState(initialPage.themeId);
  const [isPublished, setIsPublished] = useState(initialPage.isPublished);
  const [isSaving, startSaving] = useTransition();
  const [isPublishing, startPublishing] = useTransition();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "settings">("content");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [customDomain, setCustomDomain] = useState(initialPage.customDomain || "");
  const [isConnectingDomain, startConnectingDomain] = useTransition();
  const [domainError, setDomainError] = useState("");
  const [domainSuccess, setDomainSuccess] = useState(false);

  const Theme = getTheme(themeId);
  const sections = content.sections || [];

  // --- AI Content Generation ---
  const handleAIGenerate = async (prompt: string) => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const json = await res.json();
      if (json.success && json.data?.sections) {
        setContent({ 
          sections: json.data.sections,
          footer: content.footer 
        });
      } else {
        alert("Failed to generate content: " + (json.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  // --- Section Management Handlers ---

  const updateSectionData = (sectionId: string, data: any) => {
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

  const updateHeader = (header: HeaderData) => {
    setContent(prev => ({ ...prev, header }));
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
      try {
        const newStatus = await togglePublish(initialPage.id, isPublished);
        setIsPublished(newStatus);
      } catch (e) {
        console.error("Failed to publish", e);
      }
    });
  };

  const handleConnectDomain = () => {
    setDomainError("");
    setDomainSuccess(false);
    startConnectingDomain(async () => {
      try {
        await updateCustomDomain(initialPage.id, customDomain === "" ? null : customDomain);
        setDomainSuccess(true);
        setTimeout(() => setDomainSuccess(false), 3000);
      } catch (e: any) {
        setDomainError(e.message || "Failed to update custom domain");
      }
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
      case "lead-form":
        return <LeadFormEditor data={section.data as any} onChange={(d) => updateSectionData(section.id, d as any)} />;
      case "testimonials":
        return <TestimonialsEditor data={{ items: section.data as any }} onChange={(d) => updateSectionData(section.id, d.items)} />;
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
                      <Layout size={14} /> Active Theme
                    </h3>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-blue-400 capitalize">{themeId}</span>
                  </div>
                  <button
                    onClick={() => setIsThemeModalOpen(true)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors border border-slate-700 flex items-center justify-center gap-2"
                  >
                    <Palette size={14} /> Change Theme
                  </button>
                </section>

                {/* Section Label & AI Gen */}
                <div className="flex items-center justify-between pt-2">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500">Sections</h3>
                  <span className="text-[10px] text-slate-600 font-mono">{sections.length} blocks</span>
                </div>

                {isAiEnabled && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex flex-col gap-2">
                    <p className="text-xs text-blue-400 font-medium flex items-center gap-2">
                      <Sparkles size={14} /> Generate with AI
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="ai-prompt"
                        placeholder="e.g. A real estate agent in NY..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 outline-none"
                      />
                      <button
                        disabled={isGenerating}
                        onClick={() => {
                          const input = document.getElementById('ai-prompt') as HTMLInputElement;
                          handleAIGenerate(input.value);
                        }}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors"
                      >
                        {isGenerating ? <Loader2 size={14} className="animate-spin" /> : "Gen"}
                      </button>
                    </div>
                  </div>
                )}

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

                {/* Header Editor */}
                {content.header ? (
                  <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-2">
                         Header
                      </h3>
                    </div>
                    <HeaderEditor data={content.header} onChange={updateHeader} />
                  </div>
                ) : (
                  <button 
                    onClick={() => updateHeader({ logoText: initialPage.title || "My Brand", links: [] })}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-colors border border-slate-700 border-dashed flex items-center justify-center gap-2 mt-4"
                  >
                    <Plus size={16} /> Add Header Section
                  </button>
                )}

                {/* Footer Editor */}
                {content.footer && (
                  <FooterEditor data={content.footer} onChange={updateFooter} />
                )}
              </>
            ) : (
              <div className="space-y-6">
                <section className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <Palette size={14} /> Styling
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
                    <Code size={14} /> Custom Scripts
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Head Scripts</label>
                      <textarea 
                        value={settings.headScript || ""}
                        onChange={(e) => setSettings(prev => ({ ...prev, headScript: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-[10px] text-blue-300 font-mono min-h-[100px]"
                        placeholder="<!-- GTM, Meta Pixel, etc. -->"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Body Scripts</label>
                      <textarea 
                        value={settings.bodyScript || ""}
                        onChange={(e) => setSettings(prev => ({ ...prev, bodyScript: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-[10px] text-blue-300 font-mono min-h-[100px]"
                        placeholder="<!-- Analytics, Chat Widgets, etc. -->"
                      />
                    </div>
                  </div>
                </section>

                <section className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <Settings2 size={14} /> Site Configuration
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Site Name / SEO Title</label>
                      <input 
                        type="text"
                        value={settings.siteName || ""}
                        onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white"
                        placeholder="My SaaS Website"
                      />
                    </div>
                    <div className="space-y-2 pt-4 border-t border-slate-800">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                        <LinkIcon size={12} /> Custom Domain
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={customDomain}
                          onChange={(e) => {
                            setCustomDomain(e.target.value);
                            setDomainError("");
                          }}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                          placeholder="www.mybrand.com"
                        />
                        <button
                          onClick={handleConnectDomain}
                          disabled={isConnectingDomain}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded transition disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                        >
                          {isConnectingDomain ? <Loader2 size={14} className="animate-spin" /> : "Connect"}
                        </button>
                      </div>
                      {domainError && <p className="text-[10px] text-red-500 font-bold">{domainError}</p>}
                      {domainSuccess && <p className="text-[10px] text-emerald-500 font-bold">Domain updated successfully!</p>}
                      <p className="text-[10px] text-slate-500 mt-1">Requires DNS configuration. Enter an empty value to disconnect.</p>
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
                {initialPage.slug}.saasbuilder.com
              </div>
            </div>

            {/* Dynamic Rendering Engine */}
            <div className="w-full">
              <Theme.Layout settings={settings}>
                {content.header && <Theme.Header {...content.header} settings={settings} />}
                {sections.filter(s => !s.hidden).map((section) => {
                  const BlockComponent = Theme.blocks?.[section.type] as React.FC<any>;
                  if (!BlockComponent) return null;
                  return <BlockComponent key={section.id} {...section.data} pageId={initialPage.id} />;
                })}
                {content.footer && <Theme.Footer {...content.footer} />}
              </Theme.Layout>
            </div>
          </div>
        </section>
      </div>

      {/* Theme Gallery Modal */}
      <ThemeGalleryModal 
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentThemeId={themeId}
        onSelectTheme={setThemeId}
      />

      {/* Scrollbar styling */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />
    </div>
  );
}
