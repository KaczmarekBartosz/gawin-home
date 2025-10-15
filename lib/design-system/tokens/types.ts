/**
 * Base Design Token Types
 *
 * These types define the structure of all theme tokens.
 * Every theme must implement this interface.
 */

export interface ColorTokens {
  // Base colors
  background: string;
  foreground: string;

  // Primary palette
  primary: string;
  'primary-foreground': string;

  // Accent colors (specific to each theme)
  accent: string;
  'accent-foreground': string;
  'accent-blue': string;
  'accent-blue-foreground': string;
  'accent-green': string;
  'accent-green-foreground': string;

  // UI states
  muted: string;
  'muted-foreground': string;
  border: string;

  // Status colors
  destructive: string;
  'destructive-foreground': string;
  warning: string;
  'warning-foreground': string;
  success: string;
  'success-foreground': string;
  info: string;
  'info-foreground': string;

  // Card/Surface
  card: string;
  'card-foreground': string;

  // Popover
  popover: string;
  'popover-foreground': string;

  // Input
  input: string;
  ring: string;
}

export interface TypographyTokens {
  fontFamily: {
    sans: string;
    mono: string;
    heading: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface SpacingTokens {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  64: string;
}

export interface RadiusTokens {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface ShadowTokens {
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

export interface AnimationTokens {
  duration: {
    fast: string;
    base: string;
    slow: string;
    slower: string;
  };
  timing: {
    'ease-in': string;
    'ease-out': string;
    'ease-in-out': string;
    linear: string;
    bounce: string;
  };
}

export interface DesignTokens {
  name: string;
  description: string;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  animations: AnimationTokens;
}
