import { notFound } from "next/navigation";
import { getTheme } from "@/components/themes/registry";
import { PageContent, PageSettings } from "@/lib/schema";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) return { title: "Not Found" };
  
  const content = page.content as PageContent;
  
  // Find a hero section to extract a subheadline for SEO
  const heroSection = content.sections?.find((s) => s.type === "hero");
  const description = heroSection?.data?.subheadline || page.title;

  return {
    title: `${page.title} | Hosted by SaaS Builder`,
    description,
  };
}

export default async function PublishedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page || !page.isPublished) notFound();

  const Theme = getTheme(page.themeId);
  const content = page.content as PageContent;
  const settings = (page.settings as unknown as PageSettings) || { accentColor: '#3b82f6', fontFamily: 'sans' as const };

  return (
    <Theme.Layout settings={settings}>
      {content.sections?.filter(s => !s.hidden).map((section) => {
        const BlockComponent = Theme.blocks?.[section.type] as React.FC<Record<string, unknown>>;
        if (!BlockComponent) return null;

        return <BlockComponent key={section.id} {...section.data} />;
      })}
      
      {content.footer && <Theme.Footer {...content.footer} />}
    </Theme.Layout>
  );
}

