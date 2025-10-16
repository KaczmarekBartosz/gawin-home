import type { DesignTokens } from "../tokens/types";

/**
 * Hybrid Luxury Theme
 *
 * Philosophy: "Perfekcja w prostocie"
 * Inspiration: Gawin-Home Design Brief
 *
 * Hybrydowe podejście:
 * - Dramatyczna Elegancja (Dark): Homepage Hero, Footer, Promocje
 * - Funkcjonalny Minimalizm (Light): Listing produktów, Product pages
 *
 * Key characteristics:
 * - Warm neutrals with gold accents
 * - Geist Sans typography
 * - rounded-xl buttons (12px) - NIEZMIENNE
 * - rounded-2xl cards (16px)
 * - Generous spacing (py-20 md:py-32)
 * - Subtle animations
 */

export const hybridLuxuryTheme: DesignTokens = {
  name: "hybrid-luxury",
  description:
    "Hybrydowy design łączący ciemną elegancję z jasnym minimalizmem. Złote akcenty.",

  colors: {
    // Base colors - Light (Showroom)
    background: "#FAFAF9", // brand-cream - główne tło
    foreground: "#1A1A1A", // brand-charcoal - główny tekst

    // Primary - Dark (Elegance)
    primary: "#1A1A1A", // brand-charcoal
    "primary-foreground": "#FAFAF9", // cream text on dark

    // Accent - Gold (KEY!)
    accent: "#d4a574", // brand-gold - CTA, links, focus
    "accent-foreground": "#FFFFFF",

    // Accent variants
    "accent-blue": "#d4a574", // Używamy gold również tutaj
    "accent-blue-foreground": "#FFFFFF",
    "accent-green": "#d4a574", // Używamy gold również tutaj
    "accent-green-foreground": "#FFFFFF",

    // UI states
    muted: "#F5F5F5", // brand-sand
    "muted-foreground": "#666666",
    border: "#E5E5E5",

    // Card/Surface
    card: "#FFFFFF", // Pure white cards on cream
    "card-foreground": "#1A1A1A",

    // Popover
    popover: "#FFFFFF",
    "popover-foreground": "#1A1A1A",

    // Input
    input: "#FFFFFF",
    ring: "#d4a574", // Gold focus ring

    // Status colors (subdued)
    destructive: "#DC2626", // Red
    "destructive-foreground": "#FFFFFF",
    warning: "#F59E0B", // Amber
    "warning-foreground": "#FFFFFF",
    success: "#10B981", // Green
    "success-foreground": "#FFFFFF",
    info: "#3B82F6", // Blue
    "info-foreground": "#FFFFFF",
  },

  typography: {
    fontFamily: {
      sans: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
      mono: "var(--font-geist-mono), monospace",
      heading: "var(--font-geist-sans), system-ui, sans-serif",
    },
    fontSize: {
      xs: "0.75rem", // 12px - labels
      sm: "0.875rem", // 14px - captions
      base: "1rem", // 16px - body
      lg: "1.125rem", // 18px - product descriptions
      xl: "1.25rem", // 20px - H4
      "2xl": "1.5rem", // 24px - H3
      "3xl": "1.875rem", // 30px - H2
      "4xl": "2.25rem", // 36px - H1
      "5xl": "3rem", // 48px - Display
      "6xl": "3.75rem", // 60px - Hero H1
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px - py-20 for sections!
    24: "6rem", // 96px
    32: "8rem", // 128px - py-32 for sections (desktop)
    40: "10rem", // 160px
    48: "12rem", // 192px
    64: "16rem", // 256px
  },

  radius: {
    none: "0",
    sm: "0.5rem", // 8px - small elements, inputs
    base: "0.75rem", // 12px - rounded-xl BUTTONS (KEY!)
    md: "0.75rem", // 12px - same as base
    lg: "1rem", // 16px - rounded-2xl CARDS (KEY!)
    xl: "0.75rem", // 12px - BUTTONS always rounded-xl!
    "2xl": "1rem", // 16px - CARDS always rounded-2xl!
    full: "9999px", // Circular (rarely used)
  },

  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.07)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)", // Cards
    xl: "0 20px 25px rgba(0, 0, 0, 0.15)", // Hover cards
    "2xl": "0 25px 50px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
    none: "none",
  },

  animations: {
    duration: {
      fast: "150ms",
      base: "300ms", // Standard transition
      slow: "500ms",
      slower: "700ms",
    },
    timing: {
      "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
      "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
      "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)", // Standard
      linear: "linear",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
};
