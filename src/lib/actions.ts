"use server";

import { prisma } from "./prisma";
import { PageContentSchema } from "./schema";
import { revalidatePath } from "next/cache";

export async function updatePage(id: string, themeId: string, content: any) {
  // Validate content
  const validatedContent = PageContentSchema.parse(content);

  await prisma.page.update({
    where: { id },
    data: {
      themeId,
      content: validatedContent as any,
    },
  });

  revalidatePath(`/editor/${id}`);
  revalidatePath("/dashboard");
}

export async function togglePublish(id: string, isPublished: boolean) {
  const page = await prisma.page.update({
    where: { id },
    data: {
      isPublished: !isPublished,
    },
  });

  revalidatePath(`/editor/${id}`);
  revalidatePath("/dashboard");
  revalidatePath(`/${page.slug}`);
  
  return page.isPublished;
}
