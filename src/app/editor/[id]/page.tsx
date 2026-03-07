import { notFound } from "next/navigation";
import { EditorClient } from "./editor-client";
import { prisma } from "@/lib/prisma";

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <main className="h-screen w-full bg-slate-900 overflow-hidden">
      <EditorClient initialPage={page} />
    </main>
  );
}
