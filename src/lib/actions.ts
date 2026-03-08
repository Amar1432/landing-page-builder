"use server";

import { prisma } from "./prisma";
import { PageContentSchema, PageContent, PageSettingsSchema, PageSettings } from "./schema";
import { revalidatePath } from "next/cache";

export async function updatePage(
  id: string,
  themeId: string,
  content: PageContent,
  settings?: PageSettings
) {
  const validatedContent = PageContentSchema.parse(content);
  const validatedSettings = settings ? PageSettingsSchema.parse(settings) : undefined;

  await prisma.page.update({
    where: { id },
    data: {
      themeId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: validatedContent as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      settings: validatedSettings as any,
    },
  });

  revalidatePath(`/editor/${id}`);
  revalidatePath("/dashboard");
  const page = await prisma.page.findUnique({ where: { id }, select: { slug: true } });
  if (page) revalidatePath(`/${page.slug}`);
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

export async function createPage(title: string, userId: string) {
  const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const timestamp = Date.now().toString().slice(-4);
  const slug = `${baseSlug}-${timestamp}`;

  const page = await prisma.page.create({
    data: {
      title,
      slug,
      userId,
      themeId: 'modern',
      settings: {
        accentColor: '#3b82f6',
        fontFamily: 'sans'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      content: {
        sections: [
          {
            id: `hero-${Date.now()}`,
            type: 'hero',
            data: {
              headline: title,
              subheadline: "Start building your SaaS today.",
              ctaText: "Get Started",
              ctaUrl: "#"
            }
          }
        ],
        footer: {
          copyrightText: `© ${new Date().getFullYear()} ${title}`
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
    }
  });

  revalidatePath("/dashboard");
  return page.id;
}

export async function deletePage(id: string) {
  const page = await prisma.page.delete({
    where: { id }
  });

  revalidatePath("/dashboard");
  revalidatePath(`/${page.slug}`);
}
