import { ThemeComponents } from './types';
import { ModernTheme } from './modern';
import { MinimalistTheme } from './minimalist';

export const ThemeRegistry: Record<string, ThemeComponents> = {
  modern: ModernTheme,
  minimalist: MinimalistTheme,
};

export function getTheme(themeId: string): ThemeComponents {
  return ThemeRegistry[themeId] || ThemeRegistry['modern'];
}
