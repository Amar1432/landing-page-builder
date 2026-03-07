"use client";

import { useState, useTransition } from "react";
import { getTheme } from "@/components/themes/registry";
import { PageContent } from "@/lib/schema";
import type { Page } from "@prisma/client";
import { updatePage, togglePublish } from "@/lib/actions";
import { Save, Globe, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function EditorClient({ initialPage }: { initialPage: Page }) {
  const [content, setContent] = useState<PageContent>(initialPage.content as unknown as PageContent);
  const [themeId, setThemeId] = useState(initialPage.themeId);
  const [isPublished, setIsPublished] = useState(initialPage.isPublished);
  const [isSaving, startSaving] = useTransition();
  const [isPublishing, startPublishing] = useTransition();

  // Retrieve the dynamically selected theme
  const Theme = getTheme(themeId);

  // Simple handler for 1st level text changes
  const updateHero = (key: keyof PageContent['hero'], value: string) => {
    setContent(prev => ({ ...prev, hero: { ...prev.hero, [key]: value } }));
  };

  const handleSave = () => {
    startSaving(async () => {
      await updatePage(initialPage.id, themeId, content);
    });
  };

  const handlePublish = () => {
    startPublishing(async () => {
      const newStatus = await togglePublish(initialPage.id, isPublished);
      setIsPublished(newStatus);
    });
  };

  return (
    <div className="h-screen w-full flex flex-col bg-slate-900 text-slate-100 overflow-hidden font-sans">
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
          <div className="text-xs font-semibold px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
            Theme: <span className="text-white ml-1 capitalize">{themeId}</span>
          </div>
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
        {/* Sidebar: Form Controls */}
        <aside className="w-[400px] border-r border-slate-800 bg-slate-900 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-8">
            
            {/* Theme Selector */}
            <section>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-4">Appearance</h3>
              <div className="flex bg-slate-800 p-1 rounded-lg">
                <button 
                  onClick={() => setThemeId('modern')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition ${themeId === 'modern' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Modern
                </button>
                <button 
                  onClick={() => setThemeId('minimalist')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition ${themeId === 'minimalist' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Minimalist
                </button>
              </div>
            </section>

            {/* Hero Section Form */}
            <section className="space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-4 border-b border-slate-800 pb-2">Hero Section</h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Headline</label>
                <input 
                  value={content.hero.headline} 
                  onChange={e => updateHero('headline', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors"
                  placeholder="Enter headline..."
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Subheadline</label>
                <textarea 
                  value={content.hero.subheadline || ""} 
                  onChange={e => updateHero('subheadline', e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors resize-none"
                  placeholder="Enter subheadline..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">CTA Text</label>
                  <input 
                    value={content.hero.ctaText} 
                    onChange={e => updateHero('ctaText', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">CTA URL</label>
                  <input 
                    value={content.hero.ctaUrl} 
                    onChange={e => updateHero('ctaUrl', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Additional Sections Notice */}
            <section className="pt-4 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-500 mb-2">Editor expansion for Features, Pricing, and FAQ will go here.</p>
            </section>
          </div>
        </aside>

        {/* Main Preview Area */}
        <section className="flex-1 bg-slate-950 overflow-y-auto relative custom-scrollbar flex p-8 justify-center">
          {/* We wrap the dynamically loaded Theme inside a scaling container to simulate a browser view */}
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

            {/* Dynamical Rendering Engine */}
            <div className="w-full">
              <Theme.Layout>
                <Theme.Hero {...content.hero} />
                <Theme.Features items={content.features} />
                <Theme.Pricing items={content.pricing} />
                <Theme.FAQ items={content.faq} />
                <Theme.Footer {...content.footer} />
              </Theme.Layout>
            </div>
          </div>
        </section>
      </div>
      
      {/* Scrollbar styling for a cleaner dark UI */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />
    </div>
  );
}
