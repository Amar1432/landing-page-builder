"use server";

import { prisma } from "./prisma";
import { PageContentSchema, PageContent, PageSettingsSchema, PageSettings, SlugSchema, CustomDomainSchema } from "./schema";
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
      content: validatedContent as any,
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
  let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (baseSlug.length < 3) baseSlug = baseSlug + "-site";
  baseSlug = baseSlug.substring(0, 55); // Leave room for timestamp

  const timestamp = Date.now().toString().slice(-4);
  const slug = `${baseSlug}-${timestamp}`;

  // Enforce strict DB boundary
  SlugSchema.parse(slug);

  const page = await prisma.page.create({
    data: {
      title,
      slug,
      userId,
      themeId: 'modern',
      settings: {
        accentColor: '#3b82f6',
        fontFamily: 'sans'
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

export async function duplicatePage(id: string) {
  const source = await prisma.page.findUnique({ where: { id } });
  if (!source) throw new Error("Page not found");

  let baseSlug = source.slug;
  if (baseSlug.length > 50) baseSlug = baseSlug.substring(0, 50);
  const newSlug = `${baseSlug}-copy-${Date.now().toString().slice(-4)}`;

  // Enforce strict DB boundary
  SlugSchema.parse(newSlug);

  const page = await prisma.page.create({
    data: {
      title: `${source.title} (Copy)`,
      slug: newSlug,
      userId: source.userId,
      themeId: source.themeId,
      content: source.content || {},
      settings: source.settings || {},
      isPublished: false,
    }
  });

  revalidatePath("/dashboard");
  return page.id;
}

export async function updateCustomDomain(id: string, customDomain: string | null) {
  if (!customDomain) {
    // Clear the domain
    const page = await prisma.page.update({
      where: { id },
      data: { customDomain: null }
    });
    revalidatePath(`/editor/${id}`);
    revalidatePath("/dashboard");
    return { success: true };
  }

  // 1. Normalize
  let normalized = customDomain.toLowerCase().trim();
  normalized = normalized.replace(/^https?:\/\//, ''); // Strip protocol
  normalized = normalized.replace(/\/$/, ''); // Trim trailing slash

  // 2. Validate
  CustomDomainSchema.parse(normalized);

  // 3. Conflict Check
  const existing = await prisma.page.findUnique({
    where: { customDomain: normalized }
  });

  if (existing && existing.id !== id) {
    throw new Error("This domain is already connected to another site.");
  }

  // 4. Update
  const page = await prisma.page.update({
    where: { id },
    data: { customDomain: normalized }
  });

  revalidatePath(`/editor/${id}`);
  revalidatePath("/dashboard");
  return { success: true, domain: page.customDomain };
}
