import { notFound, redirect } from "next/navigation";
import { EditorClient } from "./editor-client";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  
  if (!page) notFound();
  
  // Authorization check
  if (page.userId !== userId) {
    redirect("/dashboard");
  }

  const isAiEnabled = !!process.env.OPENAI_API_KEY;

  return (
    <main className="h-screen w-full bg-slate-900 overflow-hidden">
      <EditorClient initialPage={page} isAiEnabled={isAiEnabled} />
    </main>
  );
}
