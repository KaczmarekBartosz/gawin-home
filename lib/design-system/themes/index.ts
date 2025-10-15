import type { DesignTokens } from '../tokens/types';
import { hybridLuxuryTheme } from './hybrid-luxury';
import { wellnessTechTheme } from './wellness-tech';

/**
 * Available themes registry
 */
export const themes = {
  'hybrid-luxury': hybridLuxuryTheme,
  'wellness-tech': wellnessTechTheme,
  // Add more themes here as they're created
  // 'dark-luxury': darkLuxuryTheme,
  // 'minimal-elegant': minimalElegantTheme,
} as const;

export type ThemeName = keyof typeof themes;

export function getTheme(name: ThemeName): DesignTokens {
  return themes[name];
}

export function getThemeNames(): ThemeName[] {
  return Object.keys(themes) as ThemeName[];
}

// Export individual themes
export { hybridLuxuryTheme, wellnessTechTheme };
