# Gawin-Home Design Transformation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` or `superpowers:subagent-driven-development` to implement this plan task-by-task.

**Goal:** Transform gawin-home from generic e-commerce into a premium furniture brand with minimalist 1X.tech-inspired design + neomorphic interactive UI components.

**Architecture:**

- **Phase 1 (Setup):** Font system, Tailwind v4 design tokens (@theme, colors, shadows, utilities)
- **Phase 2 (Components):** Neomorphic UI library (buttons, cards, sliders, toggles, badges)
- **Phase 3 (Sections):** Rebuild Hero, Bestsellers, Testimonials with new design system
- **Phase 4 (Polish):** Responsiveness, animations, final testing

**Tech Stack:**

- Next.js 15, React 19, TypeScript 5.8
- Tailwind CSS v4 (with @theme in tailwind.css)
- Framer Motion 11.x
- ABC Diatype (custom font - woff2)

---

## PHASE 1: DESIGN SYSTEM SETUP

### Task 1: Create ABC Diatype Font Files Structure

**Files:**

- Create: `public/fonts/abc-diatype/` directory structure
- Reference: Design docs mention woff2 font weights: Light (300), Regular (400), Medium (500), Bold (700)

**Step 1: Create directories**

```bash
mkdir -p public/fonts/abc-diatype
cd public/fonts/abc-diatype
touch ABCDiatype-Light.woff2
touch ABCDiatype-Regular.woff2
touch ABCDiatype-Medium.woff2
touch ABCDiatype-Bold.woff2
```

**Step 2: Download ABC Diatype fonts**

Since ABC Diatype is a premium font from Dinamo, you need to:

1. Purchase/download from: https://abcdinamo.com/typefaces/diatype
2. Convert to woff2 format (use https://cloudconvert.com or local tool)
3. Place files in `public/fonts/abc-diatype/`

**CRITICAL:** For now, we'll set up the @font-face rules with placeholder. You'll swap actual font files later.

**Step 3: Verify structure**

```bash
ls -la public/fonts/abc-diatype/
# Expected: 4 .woff2 files
```

**Step 4: Commit**

```bash
git add public/fonts/
git commit -m "feat: add ABC Diatype font directory structure"
```

---

### Task 2: Update `app/globals.css` - Add @font-face Declarations

**Files:**

- Modify: `app/globals.css` - Add @font-face rules at top

**Step 1: Read current globals.css**

Current file should contain `@theme` and global styles. We'll add @font-face BEFORE @theme.

**Step 2: Add @font-face rules**

Insert at the very top of `app/globals.css`:

```css
/* ABC Diatype - Premium custom font */
@font-face {
  font-family: "ABC Diatype";
  src: url("/fonts/abc-diatype/ABCDiatype-Light.woff2") format("woff2");
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: "ABC Diatype";
  src: url("/fonts/abc-diatype/ABCDiatype-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "ABC Diatype";
  src: url("/fonts/abc-diatype/ABCDiatype-Medium.woff2") format("woff2");
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "ABC Diatype";
  src: url("/fonts/abc-diatype/ABCDiatype-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}

/* Fallback to system font if ABC Diatype loads fail */
@supports (font-technology(variations)) {
  @font-face {
    font-family: "ABC Diatype Fallback";
    src: local(-apple-system), local("Segoe UI");
  }
}
```

**Step 3: Add @theme with font variables**

Find the `@theme` block and update it to include:

```css
@theme {
  --font-sans: "ABC Diatype", system-ui, -apple-system, sans-serif;
  --font-display: "ABC Diatype", system-ui, -apple-system, sans-serif;

  /* ... rest of existing @theme ... */
}
```

**Step 4: Verify no breaking changes**

Run dev server - should load without errors (fonts will warn about missing files, that's OK):

```bash
pnpm dev
# Check browser console for no critical errors
```

**Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat: add ABC Diatype font-face declarations and @theme font variables"
```

---

### Task 3: Add Typography Utility Classes to `app/globals.css`

**Files:**

- Modify: `app/globals.css` - Add @layer utilities section

**Step 1: Add text utilities AFTER @theme block**

```css
@layer utilities {
  /* Display - Hero Headlines */
  .text-display-hero {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.05;
    font-size: clamp(2.5rem, 7vw, 4.5rem);
  }

  /* H1 - Section Headlines */
  .text-h1 {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.02em;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.1;
  }

  /* H2 - Subsection Headers */
  .text-h2 {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.02em;
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    line-height: 1.2;
  }

  /* H3 - Card/Feature Headers */
  .text-h3 {
    font-family: var(--font-sans);
    font-weight: 600;
    letter-spacing: -0.01em;
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    line-height: 1.3;
  }

  /* Body - Large paragraphs */
  .text-body-large {
    font-family: var(--font-sans);
    font-size: 1.125rem;
    line-height: 1.7;
    font-weight: 400;
    letter-spacing: 0;
  }

  /* Body - Standard paragraphs */
  .text-body {
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.7;
    font-weight: 400;
    letter-spacing: 0;
  }

  /* Body Small - Secondary text */
  .text-body-small {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    line-height: 1.6;
    font-weight: 400;
  }

  /* Label - Uppercase labels, captions */
  .text-label {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    line-height: 1.4;
  }

  /* Caption - Small helper text */
  .text-caption {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    line-height: 1.5;
    font-weight: 400;
  }
}
```

**Step 2: Test typography**

Create quick test in browser DevTools:

```html
<h1 class="text-display-hero">Test Hero</h1>
<h2 class="text-h1">Test H1</h2>
<p class="text-body">Test body</p>
```

Should render with correct sizes across breakpoints.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add typography utility classes (text-display-hero, text-h1, text-h2, text-body, etc)"
```

---

### Task 4: Add Color Variables to Tailwind `@theme` (in `app/globals.css`)

**Files:**

- Modify: `app/globals.css` - Extend @theme with color variables

**Step 1: Add color tokens to @theme**

Update the @theme block to include:

```css
@theme {
  /* ... existing font variables ... */

  /* Premium Brand Colors */
  --color-charcoal: #1a1a1a;
  --color-charcoal-light: #2a2a2a;

  --color-cream: #fafaf9;
  --color-sand: #f5f5f5;
  --color-sand-dark: #ebebeb;

  --color-gold: #d4a574;
  --color-gold-light: #e5d5c3;
  --color-gold-dark: #b8956a;

  --color-copper: #b8956a;
  --color-copper-light: #d4c5b0;

  /* Neomorphism Accents - Green */
  --color-neo-mint: #a8f5d0;
  --color-neo-green: #6ee7b7;
  --color-neo-green-dark: #22c55e;

  /* Neomorphism Accents - Orange */
  --color-neo-orange: #fdba74;
  --color-neo-orange-light: #fed7aa;
  --color-neo-orange-dark: #ea580c;

  /* Neutrals */
  --color-white: #ffffff;
  --color-gray-50: #f9f9f9;
  --color-gray-100: #f3f3f3;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d0d0d0;
  --color-gray-400: #999999;
  --color-gray-500: #666666;
  --color-gray-600: #404040;

  /* Semantic Colors */
  --color-success: var(--color-neo-green);
  --color-warning: var(--color-neo-orange);
  --color-error: #e74c3c;
}
```

**Step 2: Map to Tailwind classes**

These will automatically become Tailwind utilities:

- `bg-charcoal`, `text-charcoal`, `border-charcoal`
- `bg-cream`, `bg-gold`, `bg-neo-green`
- etc.

**Step 3: Test in HTML**

```html
<div class="bg-cream text-charcoal">Test colors</div>
<button class="bg-gold text-white">Gold button</button>
<div class="bg-neo-green">Neo green</div>
```

**Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: add brand color palette to Tailwind @theme (charcoal, cream, gold, neo-green, neo-orange)"
```

---

### Task 5: Add Shadow and Spacing Utilities to Tailwind

**Files:**

- Modify: `app/globals.css` - Add to @layer utilities

**Step 1: Add shadow utilities**

```css
@layer utilities {
  /* ... existing text utilities ... */

  /* Neomorphic Shadows - Light Mode */
  .shadow-neo-subtle {
    box-shadow:
      3px 3px 6px rgba(0, 0, 0, 0.12),
      -3px -3px 6px rgba(255, 255, 255, 0.95);
  }

  .shadow-neo-light {
    box-shadow:
      6px 6px 12px rgba(0, 0, 0, 0.15),
      -6px -6px 12px rgba(255, 255, 255, 1);
  }

  .shadow-neo-pressed {
    box-shadow:
      inset 4px 4px 8px rgba(0, 0, 0, 0.15),
      inset -4px -4px 8px rgba(255, 255, 255, 0.7);
  }

  .shadow-neo-inset {
    box-shadow:
      inset 3px 3px 6px rgba(0, 0, 0, 0.12),
      inset -3px -3px 6px rgba(255, 255, 255, 0.8);
  }

  /* Card shadows */
  .shadow-card {
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.04);
  }

  .shadow-card-hover {
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.12),
      0 4px 8px rgba(0, 0, 0, 0.08);
  }

  /* Glow effects */
  .shadow-glow-green {
    box-shadow: 0 0 20px rgba(110, 231, 183, 0.3);
  }

  .shadow-glow-orange {
    box-shadow: 0 2px 8px rgba(253, 186, 116, 0.35);
  }

  /* Spacing Utilities - 8px system */
  .gap-xs {
    gap: 0.25rem; /* 4px */
  }

  .gap-sm {
    gap: 0.5rem; /* 8px */
  }

  .gap-md {
    gap: 1rem; /* 16px */
  }

  .gap-lg {
    gap: 1.5rem; /* 24px */
  }

  .gap-xl {
    gap: 2rem; /* 32px */
  }

  /* Rounded utilities for neomorphism */
  .rounded-soft {
    border-radius: 0.75rem;
  }

  .rounded-soft-lg {
    border-radius: 1rem;
  }

  .rounded-soft-xl {
    border-radius: 1.5rem;
  }

  .rounded-pill {
    border-radius: 9999px;
  }
}
```

**Step 2: Test shadows**

```html
<div class="p-4 bg-gray-100 shadow-neo-subtle rounded-soft">
  Subtle neo shadow
</div>
<button class="px-6 py-3 bg-cream shadow-neo-light rounded-pill">
  Light neo button
</button>
```

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add neomorphic shadow utilities and spacing classes"
```

---

## PHASE 2: NEOMORPHIC UI COMPONENTS

### Task 6: Create NeoButton Component

**Files:**

- Create: `components/ui/neo-button.tsx`

**Step 1: Create component file**

```typescript
import React from 'react'

type Variant = 'raised' | 'pressed' | 'flat'
type Size = 'sm' | 'md' | 'lg'

interface NeoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: React.ReactNode
}

export const NeoButton = React.forwardRef<
  HTMLButtonElement,
  NeoButtonProps
>(({ variant = 'raised', size = 'md', className = '', ...props }, ref) => {
  const baseStyles =
    'font-medium transition-all duration-300 rounded-pill border-none cursor-pointer font-abc-diatype'

  const variantStyles = {
    raised:
      'bg-neo-green text-white shadow-neo-light hover:shadow-neo-light hover:scale-102 active:scale-98 active:shadow-neo-pressed',
    pressed:
      'bg-white shadow-neo-pressed text-charcoal active:shadow-neo-inset',
    flat: 'bg-cream text-charcoal border border-gray-200 hover:bg-gray-100',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return <button ref={ref} className={combinedClassName} {...props} />
})

NeoButton.displayName = 'NeoButton'
```

**Step 2: Test in Storybook-style**

Create quick test file `components/ui/neo-button.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { NeoButton } from './neo-button'

describe('NeoButton', () => {
  it('renders button with text', () => {
    render(<NeoButton>Click me</NeoButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies raised variant styles', () => {
    const { container } = render(<NeoButton variant="raised">Test</NeoButton>)
    const button = container.querySelector('button')
    expect(button).toHaveClass('shadow-neo-light')
  })

  it('applies size styles', () => {
    const { container } = render(<NeoButton size="lg">Test</NeoButton>)
    const button = container.querySelector('button')
    expect(button).toHaveClass('px-10')
  })
})
```

**Step 3: Run tests**

```bash
pnpm test -- neo-button.test.tsx
# Expected: 3 passing
```

**Step 4: Commit**

```bash
git add components/ui/neo-button.tsx components/ui/neo-button.test.tsx
git commit -m "feat: create NeoButton component with raised/pressed/flat variants"
```

---

### Task 7: Create NeoCard Component

**Files:**

- Create: `components/ui/neo-card.tsx`

**Step 1: Create component**

```typescript
import React from 'react'

interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  interactive?: boolean
  hoverEffect?: boolean
}

export const NeoCard = React.forwardRef<HTMLDivElement, NeoCardProps>(
  ({ children, interactive = false, hoverEffect = true, className = '', ...props }, ref) => {
    const baseStyles = 'rounded-soft-lg p-6 bg-white transition-all duration-300'

    const interactiveStyles = interactive
      ? 'shadow-neo-subtle hover:shadow-neo-light hover:scale-102'
      : 'shadow-card'

    const hoverStyles = hoverEffect ? 'hover:-translate-y-1' : ''

    const combinedClassName = `${baseStyles} ${interactiveStyles} ${hoverStyles} ${className}`

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    )
  }
)

NeoCard.displayName = 'NeoCard'
```

**Step 2: Test**

```bash
pnpm test -- neo-card
```

**Step 3: Commit**

```bash
git add components/ui/neo-card.tsx
git commit -m "feat: create NeoCard component with neomorphic styling"
```

---

### Task 8: Create Badge Neomorphic Component

**Files:**

- Create: `components/ui/badge-neo.tsx`

**Step 1: Create component**

```typescript
import React from 'react'

type BadgeColor = 'orange' | 'green' | 'blue'

interface BadgeNeoProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  color?: BadgeColor
}

export const BadgeNeo = React.forwardRef<HTMLSpanElement, BadgeNeoProps>(
  ({ children, color = 'orange', className = '', ...props }, ref) => {
    const baseStyles =
      'inline-block px-4 py-2 rounded-full text-label font-bold shadow-glow-orange'

    const colorStyles = {
      orange:
        'bg-gradient-to-r from-neo-orange-light to-neo-orange text-neo-orange-dark',
      green:
        'bg-gradient-to-r from-neo-mint to-neo-green text-neo-green-dark',
      blue: 'bg-blue-100 text-blue-900',
    }

    const combinedClassName = `${baseStyles} ${colorStyles[color]} ${className}`

    return (
      <span ref={ref} className={combinedClassName} {...props}>
        {children}
      </span>
    )
  }
)

BadgeNeo.displayName = 'BadgeNeo'
```

**Step 2: Commit**

```bash
git add components/ui/badge-neo.tsx
git commit -m "feat: create BadgeNeo component with gradient backgrounds"
```

---

### Task 9: Create NeoSlider Component

**Files:**

- Create: `components/ui/neo-slider.tsx`

**Step 1: Create component**

```typescript
'use client'

import React, { useState } from 'react'

interface NeoSliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  min?: number
  max?: number
  step?: number
  value?: number
  onChange?: (value: number) => void
  label?: string
}

export const NeoSlider = React.forwardRef<HTMLInputElement, NeoSliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value: externalValue,
      onChange,
      label,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(externalValue || 50)
    const value = externalValue !== undefined ? externalValue : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      setInternalValue(newValue)
      onChange?.(newValue)
    }

    const percentage = ((value - min) / (max - min)) * 100

    return (
      <div className="w-full">
        {label && <label className="text-label mb-4 block">{label}</label>}

        <div className="relative h-20 flex items-center justify-center">
          {/* Track */}
          <div className="absolute w-full h-5 bg-gray-100 rounded-full shadow-neo-inset" />

          {/* Thumb */}
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className="absolute w-full h-32 appearance-none bg-transparent cursor-pointer z-5 rounded-full
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-32
              [&::-webkit-slider-thumb]:h-32
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-neo-light
              [&::-webkit-slider-thumb]:cursor-grab
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:duration-200
              [&::-moz-range-thumb]:w-32
              [&::-moz-range-thumb]:h-32
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:shadow-neo-light
              [&::-moz-range-thumb]:cursor-grab
              [&::-moz-range-thumb]:border-none
              hover:[&::-webkit-slider-thumb]:scale-110
              active:[&::-webkit-slider-thumb]:scale-95
              active:[&::-webkit-slider-thumb]:shadow-neo-pressed"
            {...props}
          />
        </div>

        {/* Value Display */}
        <div className="text-center mt-4 text-body-small text-gray-500">
          {Math.round(value)}
        </div>
      </div>
    )
  }
)

NeoSlider.displayName = 'NeoSlider'
```

**Step 2: Commit**

```bash
git add components/ui/neo-slider.tsx
git commit -m "feat: create NeoSlider component with draggable thumb and neomorphic styling"
```

---

### Task 10: Create NeoToggle Component

**Files:**

- Create: `components/ui/neo-toggle.tsx`

**Step 1: Create component**

```typescript
'use client'

import React, { useState } from 'react'

interface NeoToggleProps {
  defaultValue?: boolean
  onChange?: (value: boolean) => void
  labelOn?: string
  labelOff?: string
}

export const NeoToggle = React.forwardRef<HTMLButtonElement, NeoToggleProps>(
  (
    { defaultValue = false, onChange, labelOn = 'ON', labelOff = 'OFF' },
    ref
  ) => {
    const [isOn, setIsOn] = useState(defaultValue)

    const handleToggle = () => {
      const newValue = !isOn
      setIsOn(newValue)
      onChange?.(newValue)
    }

    return (
      <button
        ref={ref}
        onClick={handleToggle}
        className={`relative w-52 h-14 rounded-full p-1 transition-all duration-300 cursor-pointer
          ${
            isOn
              ? 'bg-gray-100 shadow-neo-inset'
              : 'bg-gray-100 shadow-neo-inset'
          }`}
      >
        {/* OFF Label */}
        <span
          className={`absolute left-8 top-1/2 -translate-y-1/2 text-xl font-bold transition-all duration-300 ${
            isOn ? 'text-gray-400' : 'text-charcoal'
          }`}
        >
          {labelOff}
        </span>

        {/* ON Label */}
        <span
          className={`absolute right-8 top-1/2 -translate-y-1/2 text-xl font-bold transition-all duration-300 ${
            isOn ? 'text-charcoal' : 'text-gray-400'
          }`}
        >
          {labelOn}
        </span>

        {/* Thumb */}
        <div
          className={`absolute top-1 w-12 h-12 bg-white rounded-full transition-all duration-300 shadow-neo-light
            ${isOn ? 'right-1' : 'left-1'}
            ${
              isOn
                ? 'bg-gradient-to-br from-neo-mint to-neo-green shadow-glow-green'
                : 'bg-white'
            }`}
        >
          {/* Inner ripple for ON state */}
          {isOn && (
            <div
              className="absolute inset-0 rounded-full border-2 border-neo-green opacity-60 animate-ping"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          )}
        </div>
      </button>
    )
  }
)

NeoToggle.displayName = 'NeoToggle'
```

**Step 2: Commit**

```bash
git add components/ui/neo-toggle.tsx
git commit -m "feat: create NeoToggle component with ON/OFF states and animations"
```

---

## PHASE 3: SECTION REBUILDS

### Task 11: Rebuild HeroSection.tsx

**Files:**

- Modify: `components/sections/home/HeroSection.tsx` - Complete rewrite

**Step 1: Read current HeroSection**

Check current implementation at `components/sections/home/HeroSection.tsx`

**Step 2: Replace with new version**

```typescript
'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-cream overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-sand to-cream opacity-50 pointer-events-none" />

      {/* Mesh gradient accent */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-radial from-gold-light/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col justify-center">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 w-fit"
        >
          <span className="text-label text-gray-500 uppercase">
            Meble Premium
          </span>
          <div className="w-8 h-px bg-gradient-to-r from-gold-light to-transparent" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-display-hero font-bold text-charcoal mb-6 max-w-4xl"
        >
          Perfekcja
          <br />
          <span className="text-gold-dark">w prostocie</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-body-large text-gray-500 mb-12 max-w-2xl"
        >
          Każdy detal ma znaczenie. Odkryj kolekcję mebli, które łączą
          ponadczasowy design z najwyższą jakością rzemiosła.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button className="px-8 py-4 bg-charcoal text-white rounded-pill font-medium transition-all hover:scale-105 hover:shadow-lg active:scale-95 flex items-center gap-2">
            Odkryj Kolekcję
            <ArrowRight className="w-4 h-4" />
          </button>

          <button className="px-8 py-4 bg-sand border-2 border-charcoal rounded-pill font-medium transition-all shadow-neo-subtle hover:shadow-neo-light">
            Umów konsultację
          </button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-row gap-8 sm:gap-12"
        >
          {[
            { label: '10 lat', value: 'Gwarancji' },
            { label: '2,500+', value: 'Klientów' },
            { label: '4.9/5', value: 'Ocena' },
          ].map((item) => (
            <div key={item.label}>
              <span className="text-h3 font-bold text-charcoal">
                {item.label}
              </span>
              <span className="text-caption text-gray-500 block">
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-caption text-gray-500">Przewiń</span>
        <svg
          className="w-5 h-5 text-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  )
}
```

**Step 3: Test rendering**

```bash
pnpm dev
# Navigate to home page, check Hero section displays correctly
```

**Step 4: Commit**

```bash
git add components/sections/home/HeroSection.tsx
git commit -m "feat: rebuild HeroSection with premium minimalist design and Framer Motion animations"
```

---

### Task 12: Rebuild BestsellersSection.tsx

**Files:**

- Modify: `components/sections/home/BestsellersSection.tsx`

**Step 1: Replace with new version**

```typescript
'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/cards/product-card'
import type { MockProduct } from '@/lib/data-adapters/mock'
import productsData from '@/mock/products.json'

export function BestsellersSection() {
  const bestsellers = (productsData as MockProduct[]).slice(0, 4)

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-gold-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-h1 font-bold text-charcoal mb-4">Bestsellery</h2>
          <p className="text-body-large text-gray-500 max-w-2xl">
            Najchętniej wybierane przez naszych klientów. Sprawdzona jakość i
            ponadczasowy design.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              {/* Neomorphic card */}
              <div className="relative bg-white rounded-soft-lg p-4 shadow-neo-subtle hover:shadow-neo-light transition-all overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -top-20 right-0 w-40 h-40 bg-neo-green-dark/0 group-hover:bg-neo-green-dark/10 rounded-full group-hover:opacity-100 opacity-0 transition-all duration-500" />

                <ProductCard product={product} />

                {/* Badge */}
                {product.isNew && (
                  <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-neo-orange-light to-neo-orange text-neo-orange-dark text-label rounded-soft font-bold shadow-neo-subtle">
                    Nowy
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <button className="px-8 py-4 bg-charcoal text-white rounded-pill font-medium transition-all hover:scale-105 shadow-card">
            Pokaż wszystkie bestsellery
          </button>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Test**

```bash
pnpm dev
# Check Bestsellers section renders with grid
```

**Step 3: Commit**

```bash
git add components/sections/home/BestsellersSection.tsx
git commit -m "feat: rebuild BestsellersSection with neomorphic cards and glow effects"
```

---

### Task 13: Rebuild TestimonialsSection.tsx

**Files:**

- Modify: `components/sections/home/TestimonialsSection.tsx`

**Step 1: Replace with new version**

```typescript
'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Anna Kowalska',
    role: 'Architekt wnętrz',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Jakość wykonania mebli jest wyjątkowa. Sofa, którą kupiłam, zachwyca moich klientów.',
  },
  {
    id: 2,
    name: 'Michał Nowak',
    role: 'Właściciel restauracji',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Zamówiłem meble do mojej restauracji i jestem zachwycony. Wytrzymałe i piękne.',
  },
  {
    id: 3,
    name: 'Katarzyna Wiśniewska',
    role: 'Designer',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Gawin-Home to synonim elegancji. Najlepsza inwestycja w moim domu.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-sand relative overflow-hidden">
      {/* Background */}
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-gold-light/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h2 className="text-h1 font-bold text-charcoal mb-4">
            Co mówią nasi klienci
          </h2>
          <p className="text-body-large text-gray-500">
            Dołącz do grona zadowolonych właścicieli mebli premium
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Neomorphic card */}
              <div className="bg-white rounded-soft-lg p-8 shadow-neo-subtle hover:shadow-neo-light transition-all">
                <Quote className="w-8 h-8 text-gold-light mb-4 opacity-50" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-body text-charcoal mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-charcoal text-body-small">
                      {testimonial.name}
                    </p>
                    <p className="text-caption text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-charcoal text-white rounded-soft-xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row justify-around items-center gap-6">
            <div className="text-center">
              <p className="text-h2 font-bold">2,500+</p>
              <p className="text-body-small">zadowolonych klientów</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gold-light/20" />
            <div className="text-center">
              <p className="text-h2 font-bold">4.9/5</p>
              <p className="text-body-small">średnia ocena</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gold-light/20" />
            <div className="text-center">
              <p className="text-h2 font-bold">10 lat</p>
              <p className="text-body-small">gwarancji</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Test**

```bash
pnpm dev
# Check Testimonials section renders
```

**Step 3: Commit**

```bash
git add components/sections/home/TestimonialsSection.tsx
git commit -m "feat: rebuild TestimonialsSection with neomorphic cards and stats bar"
```

---

## PHASE 4: POLISH & TESTING

### Task 14: Mobile Responsiveness - Update Utility Classes

**Files:**

- Modify: `app/globals.css` - Add mobile-specific overrides

**Step 1: Add responsive utilities**

```css
@layer utilities {
  /* Mobile-first shadow reductions */
  @media (max-width: 768px) {
    .shadow-neo-light {
      box-shadow:
        4px 4px 8px rgba(0, 0, 0, 0.12),
        -4px -4px 8px rgba(255, 255, 255, 1);
    }

    .shadow-neo-subtle {
      box-shadow:
        2px 2px 4px rgba(0, 0, 0, 0.1),
        -2px -2px 4px rgba(255, 255, 255, 0.9);
    }

    /* Larger touch targets */
    .rounded-pill {
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Responsive text scaling */
    .text-display-hero {
      font-size: clamp(1.75rem, 5vw, 2.5rem);
    }

    .text-h1 {
      font-size: clamp(1.25rem, 3vw, 1.75rem);
    }
  }
}
```

**Step 2: Test on mobile viewport**

```bash
pnpm dev
# Open DevTools, check mobile responsiveness
```

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add mobile responsiveness overrides for shadows and touch targets"
```

---

### Task 15: Framer Motion Scroll Animations

**Files:**

- Create: `lib/animation-presets.ts` (if doesn't exist)

**Step 1: Create animation presets**

```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.6 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

export const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};
```

**Step 2: Use in sections (update imports)**

In HeroSection, BestsellersSection, etc., import and use these presets for consistent animations.

**Step 3: Commit**

```bash
git add lib/animation-presets.ts
git commit -m "feat: create reusable Framer Motion animation presets"
```

---

### Task 16: Final Testing & Documentation

**Files:**

- Create: `docs/DESIGN_SYSTEM.md` - Document the new system

**Step 1: Create documentation**

````markdown
# Gawin-Home Design System

## Typography

### Text Utilities

- `.text-display-hero` - Hero section headlines (responsive: 2.5-4.5rem)
- `.text-h1` - Section headlines (responsive: 2-3rem)
- `.text-h2` - Subsection headers (responsive: 1.5-2.25rem)
- `.text-h3` - Card headers (responsive: 1.125-1.5rem)
- `.text-body-large` - Large paragraphs (1.125rem)
- `.text-body` - Standard text (1rem)
- `.text-body-small` - Secondary text (0.875rem)
- `.text-label` - Uppercase labels (0.75rem, 0.25em spacing)
- `.text-caption` - Small captions (0.75rem)

## Colors

### Brand Colors

- `bg-charcoal` (#1a1a1a) - Primary dark
- `bg-cream` (#fafaf9) - Primary light background
- `bg-sand` (#f5f5f5) - Secondary background
- `bg-gold` (#d4a574) - Accent color
- `bg-copper` (#b8956a) - Warm accent

### Neomorphic Accents

- `bg-neo-green` (#6ee7b7) - Success/interactive
- `bg-neo-orange` (#fdba74) - Warning/badge
- `text-neo-green-dark` (#22c55e) - Dark text

## Shadows

### Neomorphic Shadows

- `.shadow-neo-subtle` - Light neomorphic effect
- `.shadow-neo-light` - Medium neomorphic effect
- `.shadow-neo-pressed` - Inset pressed effect
- `.shadow-card` - Standard card shadow
- `.shadow-glow-green` - Green glow effect
- `.shadow-glow-orange` - Orange glow effect

## Components

### NeoButton

```tsx
<NeoButton variant="raised" size="md">
  Click me
</NeoButton>
```
````

- Variants: `raised`, `pressed`, `flat`
- Sizes: `sm`, `md`, `lg`

### NeoCard

```tsx
<NeoCard interactive hoverEffect>
  Content
</NeoCard>
```

### BadgeNeo

```tsx
<BadgeNeo color="orange">New</BadgeNeo>
```

- Colors: `orange`, `green`, `blue`

### NeoSlider

```tsx
<NeoSlider min={0} max={100} label="Brightness" />
```

### NeoToggle

```tsx
<NeoToggle labelOn="ON" labelOff="OFF" />
```

## Sections

### HeroSection

- Minimalist hero with premium typography
- Trust indicators (10 lat, 2,500+, 4.9/5)
- Dual CTA buttons (primary + neomorphic secondary)
- Scroll indicator animation

### BestsellersSection

- Grid layout (responsive: 1-4 columns)
- Neomorphic cards with glow on hover
- Badge for new products
- "Show all" CTA button

### TestimonialsSection

- 3-column testimonial grid
- Star ratings (1-5)
- Author info with avatar
- Charcoal stats bar with 3 KPIs

## Grid System

- 8px base unit
- Container max-width: 80rem (1280px)
- Responsive breakpoints: mobile, tablet, desktop
- Spacing: gap-xs (4px), gap-sm (8px), gap-md (16px), gap-lg (24px), gap-xl (32px)

## Animation

- All scroll animations: Framer Motion `whileInView`
- Duration: 0.6s for standard, 0.8s for staggered
- Easing: default `ease-out`
- Button hover: `scale(1.05)`, shadow intensification
- Cards: `translateY(-4px)` on hover

````

**Step 2: Run full test suite**

```bash
pnpm test
# Expected: All tests passing
pnpm prettier:check
# Expected: All files formatted
````

**Step 3: Build verification**

```bash
pnpm build
# Expected: Build succeeds, no errors
```

**Step 4: Commit documentation**

```bash
git add docs/DESIGN_SYSTEM.md
git commit -m "docs: add comprehensive design system documentation"
```

---

## SUMMARY & NEXT STEPS

**Total Tasks:** 16
**Estimated Time:** 4 days
**Git Worktree:** `.worktrees/design-transformation`
**Branch:** `feature/design-transformation`

**After Completing All Tasks:**

1. All tests passing ✅
2. Build succeeds ✅
3. Design system fully implemented ✅
4. Sections rebuilt with new design ✅
5. Neomorphic components ready ✅
6. Documentation complete ✅

**Then:** Use `superpowers:finishing-a-development-branch` to merge back to master with proper PR.

---

**Ready to execute this plan? Choose approach:**

**Option 1:** Use `superpowers:subagent-driven-development` - Fresh subagent per task, code review between tasks
**Option 2:** Manual execution - Follow tasks one by one in your own session
