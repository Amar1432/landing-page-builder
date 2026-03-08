"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { PlusCircle, Search, LayoutTemplate, Trash2, ExternalLink, Edit2, Loader2, Copy, Mail } from "lucide-react";
import { createPage, deletePage, duplicatePage } from "@/lib/actions";
import { useRouter } from "next/navigation";
import type { Page } from "@prisma/client";

interface DashboardClientProps {
  initialPages: Page[];
  userId: string;
  userName: string;
}

export function DashboardClient({ initialPages, userId, userName }: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, startCreating] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const router = useRouter();

  const filteredPages = initialPages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    const title = window.prompt("Enter page title:");
    if (!title) return;

    startCreating(async () => {
      const pageId = await createPage(title, userId);
      router.push(`/editor/${pageId}`);
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    await deletePage(id);
    setDeletingId(null);
  };

  const handleDuplicate = async (id: string) => {
    setDuplicatingId(id);
    try {
      const newId = await duplicatePage(id);
      router.push(`/editor/${newId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to duplicate page");
    } finally {
      setDuplicatingId(null);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, <span className="text-slate-900 font-medium">{userName}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/leads"
            className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Mail size={20} className="text-slate-400" />
            View Leads
          </Link>
          <button 
            onClick={handleCreate}
            disabled={isCreating}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isCreating ? <Loader2 size={20} className="animate-spin" /> : <PlusCircle size={20} />}
            Create New Page
          </button>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search pages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="text-sm text-slate-500 font-medium">
            {filteredPages.length} {filteredPages.length === 1 ? 'page' : 'pages'}
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {filteredPages.map(page => (
            <div key={page.id} className="p-6 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shadow-sm">
                  <LayoutTemplate size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{page.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1.5">
                    <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-600 font-mono">/{page.slug}</code>
                    <span className="text-slate-300">•</span>
                    <span className="capitalize text-xs font-semibold text-slate-500 tracking-wide">{page.themeId}</span>
                    <span className="text-slate-300">•</span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      page.isPublished 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${page.isPublished ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                      {page.isPublished ? "Live" : "Draft"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Link 
                  href={`/editor/${page.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 border border-slate-200 rounded-lg hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <Edit2 size={16} />
                  Edit
                </Link>
                <button 
                  onClick={() => handleDuplicate(page.id)}
                  disabled={duplicatingId === page.id}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50"
                  title="Duplicate Page"
                >
                  {duplicatingId === page.id ? <Loader2 size={18} className="animate-spin" /> : <Copy size={18} />}
                </button>
                <Link 
                  href={`/${page.slug}`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-700 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all"
                >
                  <ExternalLink size={16} />
                  View
                </Link>
                <button 
                  onClick={() => handleDelete(page.id, page.title)}
                  disabled={deletingId === page.id}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                  title="Delete Page"
                >
                  {deletingId === page.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                </button>
              </div>
            </div>
          ))}

          {filteredPages.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutTemplate size={32} />
              </div>
              <p className="text-xl font-bold text-slate-900">No pages found</p>
              <p className="text-slate-500 mt-1 max-w-xs mx-auto">
                {searchQuery ? `No results for "${searchQuery}"` : "Get started by creating your first landing page."}
              </p>
              {!searchQuery && (
                <button 
                  onClick={handleCreate}
                  className="mt-6 font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
                >
                  <PlusCircle size={18} />
                  Create your first page
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
