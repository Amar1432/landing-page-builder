import { ThemeComponents } from './types';
import { ModernTheme } from './modern';
import { MinimalistTheme } from './minimalist';
import { BoldTheme } from './bold';

export const ThemeRegistry: Record<string, ThemeComponents> = {
  modern: ModernTheme,
  minimalist: MinimalistTheme,
  bold: BoldTheme,
};

export function getTheme(themeId: string): ThemeComponents {
  return ThemeRegistry[themeId] || ThemeRegistry['modern'];
}
