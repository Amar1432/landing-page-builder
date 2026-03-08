"use server";

import { prisma } from "@/lib/prisma";
import { DashboardClient } from "./dashboard-client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/");
  }

  // Ensure user exists in our DB
  await prisma.user.upsert({
    where: { email: user.emailAddresses[0].emailAddress },
    update: { name: `${user.firstName} ${user.lastName}` },
    create: {
      id: userId,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
    },
  });

  const pages = await prisma.page.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <UserButton />
        </div>
        <DashboardClient 
          initialPages={JSON.parse(JSON.stringify(pages))} 
          userId={userId} 
          userName={user.firstName || user.emailAddresses[0].emailAddress} 
        />
      </div>
    </div>
  );
}
