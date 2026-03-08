import { z } from 'zod';

export const HeroSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  subheadline: z.string().optional(),
  ctaText: z.string().min(1, 'CTA Text is required'),
  ctaUrl: z.string().min(1, 'CTA URL is required'),
  imageUrl: z.string().optional(),
});

export const FeatureSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Feature title is required'),
  description: z.string().min(1, 'Feature description is required'),
  iconName: z.string().optional(),
});

export const PricingTierSchema = z.object({
  id: z.string(),
  tierName: z.string().min(1, 'Tier name is required'),
  price: z.string().min(1, 'Price is required'),
  features: z.array(z.string()),
  isPopular: z.boolean().default(false),
  ctaText: z.string().min(1, 'CTA Text is required'),
  ctaUrl: z.string().min(1, 'CTA URL is required'),
});

export const FAQSchema = z.object({
  id: z.string(),
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

export const TestimonialSchema = z.object({
  id: z.string(),
  quote: z.string().min(1, 'Quote is required'),
  author: z.string().min(1, 'Author is required'),
  role: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const LeadFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  ctaText: z.string().default("Submit"),
  successMessage: z.string().default("Thanks! We'll be in touch."),
  requireEmail: z.boolean().default(true),
  requirePhone: z.boolean().default(true),
  requireMessage: z.boolean().default(false),
});

export const HeaderSchema = z.object({
  logoText: z.string().min(1, 'Logo text is required'),
  links: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  ).default([]),
});

export const FooterSchema = z.object({
  copyrightText: z.string().min(1, 'Copyright text is required'),
  socialLinks: z.array(
    z.object({
      platform: z.string(),
      url: z.string().url(),
    })
  ).optional(),
});

// --- Dynamic Sections ---

export const SectionTypeSchema = z.enum(["hero", "features", "pricing", "faq", "testimonials", "lead-form"]);

export const BaseSectionSchema = z.object({
  id: z.string(),
  hidden: z.boolean().optional(),
});

export const PageSectionSchema = z.discriminatedUnion("type", [
  BaseSectionSchema.extend({ type: z.literal("hero"), data: HeroSchema }),
  BaseSectionSchema.extend({ type: z.literal("features"), data: z.array(FeatureSchema) }),
  BaseSectionSchema.extend({ type: z.literal("pricing"), data: z.array(PricingTierSchema) }),
  BaseSectionSchema.extend({ type: z.literal("faq"), data: z.array(FAQSchema) }),
  BaseSectionSchema.extend({ type: z.literal("testimonials"), data: z.array(TestimonialSchema) }),
  BaseSectionSchema.extend({ type: z.literal("lead-form"), data: LeadFormSchema }),
]);

export const PageSettingsSchema = z.object({
  accentColor: z.string().default('#3b82f6'),
  fontFamily: z.enum(['sans', 'mono', 'serif']).default('sans'),
  siteName: z.string().optional(),
  headScript: z.string().optional(),
  bodyScript: z.string().optional(),
});

export const PageContentSchema = z.object({
  sections: z.array(PageSectionSchema),
  header: HeaderSchema.optional(),
  footer: FooterSchema.optional(),
});

export type PageSettings = z.infer<typeof PageSettingsSchema>;
export type PageContent = z.infer<typeof PageContentSchema>;
export type PageSection = z.infer<typeof PageSectionSchema>;
export type HeroData = z.infer<typeof HeroSchema>;
export type FeatureData = z.infer<typeof FeatureSchema>;
export type PricingData = z.infer<typeof PricingTierSchema>;
export type FAQData = z.infer<typeof FAQSchema>;
export type TestimonialData = z.infer<typeof TestimonialSchema>;
export type LeadFormData = z.infer<typeof LeadFormSchema>;
export type HeaderData = z.infer<typeof HeaderSchema>;
export type FooterData = z.infer<typeof FooterSchema>;
export type SectionType = z.infer<typeof SectionTypeSchema>;

// --- Default Data Factories ---

export function createDefaultSection(type: SectionType): PageSection {
  const id = `${type}-${Date.now()}`;
  switch (type) {
    case "hero":
      return { id, type, data: { headline: "New Headline", ctaText: "Click Here", ctaUrl: "#" } };
    case "features":
      return { id, type, data: [{ id: `f-${Date.now()}`, title: "New Feature", description: "Describe this feature." }] };
    case "pricing":
      return { id, type, data: [{ id: `p-${Date.now()}`, tierName: "Basic", price: "$0", features: ["Feature 1"], isPopular: false, ctaText: "Get Started", ctaUrl: "#" }] };
    case "faq":
      return { id, type, data: [{ id: `q-${Date.now()}`, question: "New Question?", answer: "Answer goes here." }] };
    case "testimonials":
      return { id, type, data: [{ id: `t-${Date.now()}`, quote: "This is a great service!", author: "John Doe", role: "CEO" }] };
    case "lead-form":
      return { id, type, data: { title: "Get in Touch", description: "Fill out the form below.", ctaText: "Submit", successMessage: "Thanks!", requireEmail: true, requirePhone: false, requireMessage: false } };
  }
}
