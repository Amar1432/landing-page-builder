import React from 'react';
import { PageContent } from '@/lib/schema';

export interface ThemeComponents {
    Layout: React.FC<{ children: React.ReactNode; defaultFont?: string }>;
    Hero: React.FC<PageContent['hero']>;
    Features: React.FC<{ items: PageContent['features'] }>;
    Pricing: React.FC<{ items: PageContent['pricing'] }>;
    FAQ: React.FC<{ items: PageContent['faq'] }>;
    Footer: React.FC<PageContent['footer']>;
}
