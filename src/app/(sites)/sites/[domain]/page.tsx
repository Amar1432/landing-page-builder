import { notFound } from "next/navigation";
import { getTheme } from "@/components/themes/registry";
import { PageContent, PageSettings } from "@/lib/schema";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  
  const page = domain.includes(".") 
    ? await prisma.page.findUnique({ where: { customDomain: domain } })
    : await prisma.page.findUnique({ where: { slug: domain } });
    
  if (!page) return { title: "Not Found" };
  
  const content = page.content as unknown as PageContent;
  const settings = (page.settings as unknown as PageSettings) || {};

  return {
    title: settings.siteName || `${page.title} | SaaS Builder`,
    description: page.title,
  };
}

export default async function PublishedPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;

  const page = domain.includes(".") 
    ? await prisma.page.findUnique({ where: { customDomain: domain } })
    : await prisma.page.findUnique({ where: { slug: domain } });

  if (!page || !page.isPublished) notFound();

  const Theme = getTheme(page.themeId);
  const content = page.content as unknown as PageContent;
  const settings = (page.settings as unknown as PageSettings) || { accentColor: "#3b82f6", fontFamily: "sans" };
  const sections = content.sections || [];

  return (
    <>
      {/* Head Script Injection */}
      {settings.headScript && (
        <script 
          dangerouslySetInnerHTML={{ __html: settings.headScript }}
        />
      )}
      
      <Theme.Layout settings={settings}>
        {content.header && <Theme.Header {...content.header} settings={settings} />}
        {sections.filter(s => !s.hidden).map((section) => {
          const BlockComponent = Theme.blocks?.[section.type] as React.FC<any>;
          if (!BlockComponent) return null;
          return <BlockComponent key={section.id} {...section.data} pageId={page.id} />;
        })}
        {content.footer && <Theme.Footer {...content.footer} />}
      </Theme.Layout>

      {/* Body Script Injection */}
      {settings.bodyScript && (
        <script 
          dangerouslySetInnerHTML={{ __html: settings.bodyScript }}
        />
      )}
    </>
  );
}
