"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, Globe, Trash2 } from "lucide-react";
import type { Lead } from "@prisma/client";

export default async function LeadsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const leads = await prisma.lead.findMany({
    where: {
      page: {
        userId: userId,
      },
    },
    include: {
      page: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Leads</h1>
              <p className="text-slate-500 mt-1">Manage inquiries from your landing pages</p>
            </div>
          </div>
          <UserButton />
        </header>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Page</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Message</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead: Lead & { page: { title: string; slug: string } }) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      <div className="flex flex-col gap-1 mt-1">
                        {lead.email && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Mail size={12} className="text-slate-400" />
                            {lead.email}
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Phone size={12} className="text-slate-400" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <Globe size={14} className="text-blue-500" />
                        {lead.page.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">/{lead.page.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 line-clamp-2 max-w-xs">
                        {lead.message || <span className="italic text-slate-400">No message provided</span>}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
                        <Calendar size={12} className="text-slate-400" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="w-12 h-12 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={24} />
                      </div>
                      <p className="text-lg font-bold text-slate-900">No leads yet</p>
                      <p className="text-slate-500 text-sm mt-1">Once users fill out forms on your pages, they will appear here.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
