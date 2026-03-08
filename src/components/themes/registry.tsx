import { ThemeEntry, ThemeComponents, ThemeMeta } from './types';
import { ModernTheme } from './modern';
import { MinimalistTheme } from './minimalist';
import { BoldTheme } from './bold';

export const ThemeRegistry: Record<string, ThemeEntry> = {
  modern: { 
    meta: { name: 'Modern', description: 'Clean, corporate, and highly versatile.', previewBg: 'bg-white', previewAccent: '#3b82f6' }, 
    components: ModernTheme as unknown as ThemeComponents 
  },
  minimalist: { 
    meta: { name: 'Minimalist', description: 'Stark, spaced out, monochrome styling.', previewBg: 'bg-[#FDFDFD]', previewAccent: '#1c1917' }, 
    components: MinimalistTheme as unknown as ThemeComponents 
  },
  bold: { 
    meta: { name: 'Bold', description: 'High Impact & Dark', previewBg: 'bg-zinc-950', previewAccent: '#f97316' }, 
    components: BoldTheme as unknown as ThemeComponents 
  },
};

export function getTheme(themeId: string): ThemeComponents {
  return ThemeRegistry[themeId]?.components || ThemeRegistry['modern'].components;
}

export function getThemeMeta(themeId: string): ThemeMeta {
  return ThemeRegistry[themeId]?.meta || ThemeRegistry['modern'].meta;
}

export function getAllThemes(): { id: string; meta: ThemeMeta }[] {
  return Object.entries(ThemeRegistry).map(([id, entry]) => ({ id, meta: entry.meta }));
}
