import Link from "next/link";
import { PlusCircle, Search, LayoutTemplate } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage your landing pages</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
            <PlusCircle size={20} />
            Create Page
          </button>
        </header>

        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center gap-4 bg-slate-50/50">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search pages..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="divide-y">
            {pages.map(page => (
              <div key={page.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <LayoutTemplate size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{page.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                      <span>/{page.slug}</span>
                      <span>•</span>
                      <span className="capitalize text-xs font-medium bg-slate-100 px-2 py-0.5 rounded">{page.themeId} theme</span>
                      <span>•</span>
                      <span className={page.isPublished ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>
                        {page.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link 
                    href={`/editor/${page.id}`}
                    className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Edit Content
                  </Link>
                  <Link 
                    href={`/${page.slug}`}
                    target="_blank"
                    className="px-4 py-2 text-sm font-medium border border-blue-200 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
                  >
                    View Live
                  </Link>
                </div>
              </div>
            ))}

            {pages.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                <LayoutTemplate size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">No pages yet</p>
                <p className="mt-1">Create your first landing page to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
