import type { DesignTokens } from "../tokens/types";

/**
 * Wellness Tech Theme
 *
 * Inspired by: Whoop, Oura, Apple Health
 *
 * Key characteristics:
 * - Clean, minimalist aesthetic
 * - Light background with dark text
 * - Rounded corners (8-16px)
 * - Circular progress indicators
 * - Color-coded metrics: Orange (energy/price), Blue (info), Green (success)
 * - Generous white space
 * - Sans-serif typography
 */

export const wellnessTechTheme: DesignTokens = {
  name: "wellness-tech",
  description:
    "Minimalist, health-app inspired design with clean UI and data-driven aesthetics",

  colors: {
    // Base colors
    background: "#F8F8F8", // Very light grey, clean canvas
    foreground: "#333333", // Dark grey text (not pure black for less eye strain)

    // Primary palette
    primary: "#333333",
    "primary-foreground": "#FFFFFF",

    // Accent colors (energy/price/CTA)
    accent: "#FF8C42", // Energetic orange/gold
    "accent-foreground": "#FFFFFF",

    // Accent Blue (info/availability)
    "accent-blue": "#5B8DEF", // Calm blue
    "accent-blue-foreground": "#FFFFFF",

    // Accent Green (success/eco)
    "accent-green": "#4CAF50", // Positive green
    "accent-green-foreground": "#FFFFFF",

    // UI states
    muted: "#E8E8E8", // Slightly darker than background
    "muted-foreground": "#757575", // Mid-grey
    border: "#E0E0E0", // Subtle borders

    // Status colors
    destructive: "#EF4444", // Red for errors
    "destructive-foreground": "#FFFFFF",
    warning: "#F59E0B", // Amber for warnings
    "warning-foreground": "#FFFFFF",
    success: "#4CAF50", // Green for success
    "success-foreground": "#FFFFFF",
    info: "#5B8DEF", // Blue for info
    "info-foreground": "#FFFFFF",

    // Card/Surface
    card: "#FFFFFF", // Pure white cards on light grey background
    "card-foreground": "#333333",

    // Popover
    popover: "#FFFFFF",
    "popover-foreground": "#333333",

    // Input
    input: "#E8E8E8", // Light grey input backgrounds
    ring: "#FF8C42", // Orange focus ring
  },

  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans), Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'var(--font-geist-mono), "SF Mono", Monaco, "Cascadia Code", monospace',
      heading:
        "var(--font-geist-sans), Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
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
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
    40: "10rem", // 160px
    48: "12rem", // 192px
    64: "16rem", // 256px
  },

  radius: {
    none: "0",
    sm: "0.5rem", // 8px
    base: "0.75rem", // 12px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px - characteristic of wellness tech
    xl: "2rem", // 32px
    "2xl": "2.5rem", // 40px
    full: "9999px", // Circular
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "none",
  },

  animations: {
    duration: {
      fast: "150ms",
      base: "200ms",
      slow: "300ms",
      slower: "500ms",
    },
    timing: {
      "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
      "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
      "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      linear: "linear",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
};
