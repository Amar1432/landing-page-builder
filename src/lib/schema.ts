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

export const FooterSchema = z.object({
  copyrightText: z.string().min(1, 'Copyright text is required'),
  socialLinks: z.array(
    z.object({
      platform: z.string(),
      url: z.string().url(),
    })
  ).optional(),
});

export const PageContentSchema = z.object({
  hero: HeroSchema,
  features: z.array(FeatureSchema),
  pricing: z.array(PricingTierSchema),
  faq: z.array(FAQSchema),
  footer: FooterSchema,
});

export type PageContent = z.infer<typeof PageContentSchema>;
