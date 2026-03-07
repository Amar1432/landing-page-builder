import { notFound } from "next/navigation";
import { getTheme } from "@/components/themes/registry";
import { PageContent } from "@/lib/schema";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) return { title: "Not Found" };
  
  const content = page.content as PageContent;
  return {
    title: `${page.title} | Hosted by SaaS Builder`,
    description: content.hero?.subheadline || page.title,
  };
}

export default async function PublishedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page || !page.isPublished) notFound();

  const Theme = getTheme(page.themeId);
  const content = page.content as PageContent;

  return (
    <Theme.Layout>
      <Theme.Hero {...content.hero} />
      {content.features?.length > 0 && <Theme.Features items={content.features} />}
      {content.pricing?.length > 0 && <Theme.Pricing items={content.pricing} />}
      {content.faq?.length > 0 && <Theme.FAQ items={content.faq} />}
      <Theme.Footer {...content.footer} />
    </Theme.Layout>
  );
}
