import { notFound } from "next/navigation";
import { getTheme } from "@/components/themes/registry";
import { DEMO_CONTENT, DEMO_SETTINGS } from "@/lib/demo-data";

export default async function DemoPage({ params }: { params: Promise<{ themeId: string }> }) {
  const { themeId } = await params;
  
  // Validate theme exists
  const Theme = getTheme(themeId);
  if (!Theme) notFound();

  const sections = DEMO_CONTENT.sections || [];

  return (
    <Theme.Layout settings={DEMO_SETTINGS}>
      {DEMO_CONTENT.header && <Theme.Header {...DEMO_CONTENT.header} settings={DEMO_SETTINGS} />}
      {sections.map((section) => {
        const BlockComponent = Theme.blocks?.[section.type] as React.FC<any>;
        if (!BlockComponent) return null;
        return <BlockComponent key={section.id} {...section.data} pageId="demo" />;
      })}
      {DEMO_CONTENT.footer && <Theme.Footer {...DEMO_CONTENT.footer} />}
    </Theme.Layout>
  );
}
