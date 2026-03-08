import React from 'react';
import { HeroData, FeatureData, PricingData, FAQData, FooterData, PageSettings } from '@/lib/schema';

export interface ThemeComponents {
    Layout: React.FC<{ children: React.ReactNode; settings?: PageSettings }>;
    blocks: {
        hero: React.FC<HeroData>;
        features: React.FC<{ items: FeatureData[] }>;
        pricing: React.FC<{ items: PricingData[] }>;
        faq: React.FC<{ items: FAQData[] }>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: React.FC<any> | undefined;
    };
    Footer: React.FC<FooterData>;
}
