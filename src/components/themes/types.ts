import React from 'react';
import { HeroData, FeatureData, PricingData, FAQData, FooterData, PageSettings, LeadFormData, TestimonialData, HeaderData } from '@/lib/schema';

export interface ThemeMeta {
    name: string;
    description: string;
    previewBg: string;       // e.g. 'bg-white'
    previewAccent: string;   // e.g. '#3b82f6'
}

export interface ThemeComponents {
    Layout: React.FC<{ children: React.ReactNode; settings?: PageSettings }>;
    blocks: {
        hero: React.FC<HeroData>;
        features: React.FC<{ items: FeatureData[] }>;
        pricing: React.FC<{ items: PricingData[] }>;
        faq: React.FC<{ items: FAQData[] }>;
        'lead-form': React.FC<LeadFormData & { pageId: string }>;
        testimonials: React.FC<{ items: TestimonialData[] }>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: React.FC<any> | undefined;
    };
    Header: React.FC<HeaderData & { settings?: PageSettings }>;
    Footer: React.FC<FooterData>;
}

export interface ThemeEntry {
    meta: ThemeMeta;
    components: ThemeComponents;
}
