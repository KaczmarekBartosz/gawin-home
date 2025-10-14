# Gawin-Home - Premium E-commerce Platform

**Typ Projektu:** E-commerce (Meble Premium)
**Wersja:** 1.0.0
**Data Rozpoczęcia:** 2025-10-15
**Status:** 🟡 W trakcie inicjalizacji

---

## 📋 Spis Treści

1. [Wizja i Założenia](#wizja-i-założenia)
2. [Stack Technologiczny](#stack-technologiczny)
3. [Architektura Projektu](#architektura-projektu)
4. [Design System](#design-system)
5. [Struktura Danych](#struktura-danych)
6. [Roadmap Implementacji](#roadmap-implementacji)
7. [Kluczowe Decyzje](#kluczowe-decyzje)
8. [Checklisty](#checklisty)

---

## 🎯 Wizja i Założenia

### Misja Główna
Stworzenie **nowoczesnego, premium sklepu e-commerce** z meblami wysokiej jakości, który wyróżnia się eleganckim designem hybrydowym i doskonałym UX.

### Filozofia "Hybrydowego Designu"

#### 🌙 Dark Entry (Strona Główna)
- **Paleta:** Ciemna (grafit #1a1a1a, złoto #d4af37)
- **Cel:** Budowanie prestiżu, luksusowe pierwsze wrażenie
- **Elementy:** Hero z tłem wideo/obrazem, elegancka typografia, złote akcenty
- **Vibe:** Premium boutique, ekskluzywność

#### ☀️ Light Showroom (Produkty)
- **Paleta:** Jasna (biel #ffffff, krem #f5f5f0, szary #e5e5e5)
- **Cel:** Czyste tło, które wyeksponuje meble
- **Elementy:** Duże zdjęcia produktów, minimalistyczny layout, subtelne cienie
- **Vibe:** Galeria sztuki, przestronny showroom

#### 🎨 Spójne Premium UI
- **Przyciski:** `rounded-xl` (nie `rounded-md` ani `rounded-full`)
- **Typografia:** Elegancka, czytelna (Geist lub Space Grotesk)
- **Ikony:** Lucide Icons, spójny styl (stroke-width: 1.5)
- **Animacje:** Subtelne, płynne (framer-motion)
- **Spacing:** Większe odstępy (8px grid, nie 4px)

### Kluczowe Cele Projektu

1. **Clean Code**
   - Nieskazitelnie czysty kod
   - Dobrze zorganizowany
   - Łatwy do zrozumienia i utrzymania
   - Pełne typowanie TypeScript

2. **Top-Level Class Design**
   - "Śliczny" frontend
   - Użyteczność na pierwszym miejscu
   - Premium look & feel
   - Perfekcyjna responsywność

3. **Realistyczne Dane**
   - Lokalne dane testowe od początku
   - Realistyczne opisy produktów
   - Prawdziwe zdjęcia mebli (placeholder)
   - Kompletne dane (ceny, wymiary, materiały)

---

## 🎨 Stack Technologiczny

### Core Framework
```json
{
  "next": "^15.4.6",
  "react": "^19.1.0",
  "typescript": "^5"
}
```

### Styling & UI
```json
{
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4",
  "shadcn/ui": "latest",
  "@radix-ui/react-*": "latest",
  "lucide-react": "^0.539.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1"
}
```

### Vercel Commerce Foundation
```json
{
  "@vercel/commerce": "latest",
  // Commerce utilities, types, hooks
}
```

### Additional Features
```json
{
  "framer-motion": "^11", // Animacje
  "next-themes": "^0.4.6", // Dark/Light toggle (opcjonalnie)
  "sonner": "^1", // Toast notifications
  "react-hook-form": "^7.60.0",
  "@hookform/resolvers": "^5.1.1",
  "zod": "^4"
}
```

### Development Tools
```json
{
  "@eslint/eslintrc": "^3",
  "eslint": "^9",
  "eslint-config-next": "15.x",
  "prettier": "^3",
  "prettier-plugin-tailwindcss": "^0.6"
}
```

---

## 🏗️ Architektura Projektu

### Struktura Folderów

```
gawin-home/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (auth)/                   # Route group: Auth pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (shop)/                   # Route group: Shop pages
│   │   │   ├── products/
│   │   │   │   └── [slug]/
│   │   │   ├── category/
│   │   │   │   └── [slug]/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── api/                      # API Routes
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage (Dark)
│   │   └── globals.css               # Global styles
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── layout/                   # Layout components
│   │   │   ├── header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── MobileNav.tsx
│   │   │   │   ├── CartButton.tsx
│   │   │   │   └── SearchBar.tsx
│   │   │   ├── footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── FooterLinks.tsx
│   │   │   └── sidebar/
│   │   │       └── FilterSidebar.tsx
│   │   ├── commerce/                 # E-commerce specific
│   │   │   ├── product/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductGrid.tsx
│   │   │   │   ├── ProductDetails.tsx
│   │   │   │   ├── ProductGallery.tsx
│   │   │   │   └── ProductVariants.tsx
│   │   │   ├── cart/
│   │   │   │   ├── Cart.tsx
│   │   │   │   ├── CartItem.tsx
│   │   │   │   └── CartSummary.tsx
│   │   │   └── checkout/
│   │   │       ├── CheckoutForm.tsx
│   │   │       └── PaymentSection.tsx
│   │   ├── sections/                 # Page sections
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx   # Dark, elegant
│   │   │   │   ├── FeaturedProducts.tsx
│   │   │   │   ├── CategoriesShowcase.tsx
│   │   │   │   └── TrustedBrands.tsx
│   │   │   └── shared/
│   │   │       ├── Newsletter.tsx
│   │   │       └── Testimonials.tsx
│   │   └── shared/                   # Shared utilities
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── ImageWithFallback.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts                  # cn() + utilities
│   │   ├── commerce/                 # Commerce logic
│   │   │   ├── products.ts
│   │   │   ├── cart.ts
│   │   │   └── checkout.ts
│   │   ├── hooks/                    # Custom hooks
│   │   │   ├── useCart.ts
│   │   │   ├── useProducts.ts
│   │   │   └── useCheckout.ts
│   │   └── validations/              # Zod schemas
│   │       ├── product.ts
│   │       ├── cart.ts
│   │       └── checkout.ts
│   │
│   ├── data/                         # Local test data
│   │   ├── products.json             # Product catalog
│   │   ├── categories.json           # Categories
│   │   ├── collections.json          # Featured collections
│   │   └── testimonials.json         # Customer reviews
│   │
│   ├── config/
│   │   ├── site.ts                   # Site config
│   │   ├── navigation.ts             # Nav structure
│   │   └── constants.ts              # App constants
│   │
│   └── types/
│       ├── product.ts                # Product types
│       ├── cart.ts                   # Cart types
│       ├── commerce.ts               # Commerce types
│       └── index.ts                  # Exports
│
├── public/
│   ├── images/
│   │   ├── products/                 # Product images
│   │   ├── categories/               # Category banners
│   │   ├── hero/                     # Hero backgrounds
│   │   └── logos/                    # Brand logos
│   ├── fonts/                        # Custom fonts
│   └── icons/                        # Favicons
│
├── .env.local                        # Environment variables
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json
└── README.md
```

### Route Groups Strategy

**`(auth)` Group:**
- `/login`, `/register`, `/forgot-password`
- Shared auth layout (centered card)

**`(shop)` Group:**
- `/products`, `/category`, `/cart`, `/checkout`
- Shared shop layout (header + footer)

**Root `/`:**
- Homepage (unique dark design)

---

## 🎨 Design System

### Color Palette

#### Primary Colors (Dark Entry)
```css
--dark-bg: #1a1a1a;           /* Main dark background */
--dark-surface: #252525;       /* Cards, sections */
--gold-primary: #d4af37;       /* Primary gold accent */
--gold-hover: #c19b2b;         /* Gold hover state */
--text-light: #f5f5f5;         /* Primary text on dark */
--text-muted: #a0a0a0;         /* Muted text on dark */
```

#### Secondary Colors (Light Showroom)
```css
--light-bg: #ffffff;           /* Main light background */
--cream-bg: #f5f5f0;           /* Warm cream alternative */
--light-surface: #fafafa;      /* Cards, sections */
--border-light: #e5e5e5;       /* Borders, dividers */
--text-dark: #1a1a1a;          /* Primary text on light */
--text-gray: #666666;          /* Muted text on light */
```

#### Accent Colors
```css
--accent-blue: #3b82f6;        /* Info, links */
--accent-green: #10b981;       /* Success */
--accent-red: #ef4444;         /* Error, sale */
--accent-orange: #f59e0b;      /* Warning, featured */
```

### Typography

#### Font Families
```css
--font-primary: 'Geist', system-ui, sans-serif;
--font-display: 'Space Grotesk', sans-serif; /* Headings */
--font-mono: 'Geist Mono', monospace;
```

#### Font Scales
```css
/* Display (Hero) */
--text-display-2xl: 4.5rem;    /* 72px - H1 Hero */
--text-display-xl: 3.75rem;    /* 60px */
--text-display-lg: 3rem;       /* 48px */

/* Headings */
--text-h1: 2.25rem;            /* 36px */
--text-h2: 1.875rem;           /* 30px */
--text-h3: 1.5rem;             /* 24px */
--text-h4: 1.25rem;            /* 20px */

/* Body */
--text-lg: 1.125rem;           /* 18px - Product descriptions */
--text-base: 1rem;             /* 16px - Default */
--text-sm: 0.875rem;           /* 14px - Captions */
--text-xs: 0.75rem;            /* 12px - Labels */
```

### Spacing Scale (8px Grid)

```css
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-5: 2.5rem;   /* 40px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
--space-10: 5rem;    /* 80px */
--space-12: 6rem;    /* 96px */
```

### Border Radius

```css
--radius-sm: 0.5rem;   /* 8px - Small elements */
--radius-md: 0.75rem;  /* 12px - Cards */
--radius-lg: 1rem;     /* 16px - Large cards */
--radius-xl: 1.5rem;   /* 24px - 🎯 BUTTONS (KEY!) */
--radius-2xl: 2rem;    /* 32px - Hero sections */
```

### Shadows

```css
/* Light theme */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

/* Dark theme */
--shadow-dark-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-dark-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-dark-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
```

### Component Variants

#### Button
```typescript
// Primary Gold (Dark background)
"bg-gold-primary text-dark-bg hover:bg-gold-hover rounded-xl"

// Secondary Light (Dark background)
"bg-transparent border-2 border-gold-primary text-gold-primary hover:bg-gold-primary/10 rounded-xl"

// Primary Dark (Light background)
"bg-dark-bg text-light-bg hover:bg-dark-surface rounded-xl"

// Ghost (Transparent)
"bg-transparent hover:bg-dark-surface/10 rounded-xl"
```

#### Card
```typescript
// Dark variant (Homepage)
"bg-dark-surface border border-gold-primary/20 rounded-lg"

// Light variant (Products)
"bg-white border border-border-light rounded-lg shadow-md"
```

---

## 📊 Struktura Danych

### Product Schema

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  collection?: string;

  // Pricing
  price: {
    amount: number;
    currency: string;
    compareAtAmount?: number; // Original price for sales
  };

  // Images
  images: {
    url: string;
    alt: string;
    width: number;
    height: number;
  }[];

  // Variants (np. kolor, rozmiar)
  variants: {
    id: string;
    name: string;
    options: {
      name: string;
      value: string;
      priceModifier?: number;
      inStock: boolean;
    }[];
  }[];

  // Details
  details: {
    dimensions: {
      width: number;
      height: number;
      depth: number;
      unit: "cm" | "in";
    };
    weight?: number;
    materials: string[];
    colors: string[];
    manufacturer?: string;
  };

  // Metadata
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Status
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  onSale: boolean;

  createdAt: string;
  updatedAt: string;
}
```

### Category Schema

```typescript
interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  subcategories?: {
    id: string;
    slug: string;
    name: string;
  }[];
  productCount: number;
}
```

### Cart Schema

```typescript
interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
}

interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product: Pick<Product, "name" | "images" | "slug">;
}
```

---

## 🗓️ Roadmap Implementacji

### Phase 1: Foundation (Day 1-2) ✅ W TRAKCIE

**Setup:**
- [x] Struktura projektu
- [ ] Next.js 15 + TypeScript
- [ ] Tailwind CSS v4
- [ ] shadcn/ui init
- [ ] ESLint + Prettier

**Design System:**
- [ ] Konfiguracja kolorów w Tailwind
- [ ] Typografia (Geist fonts)
- [ ] Komponenty UI podstawowe (Button, Card, Input)
- [ ] CVA variants setup

**Data Layer:**
- [ ] TypeScript types (Product, Category, Cart)
- [ ] Mock data (10 produktów mebli)
- [ ] Utilities (formatters, validators)

### Phase 2: Homepage (Day 3-4)

**Dark Entry:**
- [ ] Hero Section (video/image background)
- [ ] Featured Products (karuzela)
- [ ] Categories Showcase (4-6 kategorii)
- [ ] Newsletter Section
- [ ] Footer (ciemny)

**Komponenty:**
- [ ] Header z transparent→solid transition
- [ ] Mobile navigation (Sheet)
- [ ] Search bar (elegancki)
- [ ] Cart button (z licznikiem)

### Phase 3: Product Listing (Day 5-6)

**Light Showroom:**
- [ ] Product Grid (responsive)
- [ ] Filter Sidebar (kategorie, cena, materiały)
- [ ] Sort options (cena, nowość, popularność)
- [ ] Pagination / Infinite scroll
- [ ] "No results" state

**Komponenty:**
- [ ] ProductCard (hover effects)
- [ ] FilterPanel (Accordion)
- [ ] PriceRange slider
- [ ] CategoryChips

### Phase 4: Product Details (Day 7-8)

**Product Page:**
- [ ] Image Gallery (zoom, thumbnails)
- [ ] Product Info (nazwa, cena, opis)
- [ ] Variant Selector (kolor, rozmiar)
- [ ] Add to Cart (z animacją)
- [ ] Specs Table (wymiary, materiały)
- [ ] Related Products (4-6 items)

**Komponenty:**
- [ ] ImageGallery (lightbox)
- [ ] VariantSelector (radio groups)
- [ ] QuantitySelector
- [ ] SpecsTable
- [ ] RelatedProducts carousel

### Phase 5: Cart & Checkout (Day 9-10)

**Cart:**
- [ ] Cart Drawer (Sheet)
- [ ] Cart Items (editable quantity)
- [ ] Cart Summary (subtotal, tax, total)
- [ ] Empty cart state

**Checkout:**
- [ ] Multi-step form (shipping, payment, review)
- [ ] Form validation (Zod)
- [ ] Payment integration (placeholder)
- [ ] Order confirmation

**Komponenty:**
- [ ] CheckoutStepper
- [ ] ShippingForm
- [ ] PaymentForm
- [ ] OrderSummary

### Phase 6: Polish & Optimization (Day 11-12)

**Performance:**
- [ ] Image optimization (WebP, blur placeholders)
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Bundle analysis

**UX Enhancements:**
- [ ] Loading states (Suspense)
- [ ] Error boundaries
- [ ] Toast notifications (Sonner)
- [ ] Smooth animations (Framer Motion)

**SEO:**
- [ ] Metadata API (wszystkie strony)
- [ ] Sitemap
- [ ] robots.txt
- [ ] OG images

**Testing:**
- [ ] Manual testing (wszystkie flow)
- [ ] Responsywność (mobile, tablet, desktop)
- [ ] Accessibility audit
- [ ] Performance (Lighthouse)

---

## 🎯 Kluczowe Decyzje

### 1. Dlaczego Vercel Commerce?
✅ **PROS:**
- Nowoczesny, aktywnie utrzymywany
- Next.js 15 App Router
- Gotowe patterns dla e-commerce
- TypeScript first
- Świetna dokumentacja

❌ **Odrzucone alternatywy:**
- `next-merce` - przestarzały (Pages Router)
- `shopify-nextjs` - zbyt mocno związany z Shopify
- Od zera - za długo by trwało

### 2. Dlaczego "Hybrydowy Design"?
- **Differentiation:** Większość sklepów używa jednego theme
- **Storytelling:** Dark entry = prestiż, Light showroom = focus na produkt
- **Flexibility:** Można łatwo dostosować do różnych sekcji
- **Premium Feel:** Pokazuje attention to detail

### 3. Dlaczego Lokalne Dane?
- Szybki development (nie czekamy na backend)
- Kontrola nad strukturą danych
- Łatwe testowanie edge cases
- Przygotowanie na przyszłe API integration

### 4. Dlaczego rounded-xl dla Przycisków?
- `rounded-md` - za kanciasty
- `rounded-full` - za "zabawkowy"
- `rounded-xl` - **PERFECT** balance, premium look

---

## ✅ Checklisty

### Pre-Development Checklist
- [x] ✅ Zdefiniowano wymagania projektu
- [x] ✅ Wybrano fundament (Vercel Commerce)
- [x] ✅ Opracowano design philosophy
- [x] ✅ Ustalono stack technologiczny
- [ ] Utworzono folder projektu
- [ ] Zainicjowano Git repo

### Setup Checklist (Day 1)
- [ ] `npx create-next-app@latest` z Turbopack
- [ ] Instalacja Tailwind CSS v4
- [ ] `npx shadcn@latest init` (New York style)
- [ ] Instalacja dependencies (framer-motion, sonner, etc.)
- [ ] Konfiguracja ESLint + Prettier
- [ ] Utworzenie struktury folderów
- [ ] Setup fonts (Geist)
- [ ] Konfiguracja design system w globals.css
- [ ] Test build: `npm run build`

### Design System Checklist
- [ ] Zdefiniowano palety kolorów (dark + light)
- [ ] Skonfigurowano typografię
- [ ] Utworzono CVA variants dla Button
- [ ] Utworzono CVA variants dla Card
- [ ] Dodano komponenty UI: button, card, input, sheet, dialog
- [ ] Przygotowano ikony (Lucide)
- [ ] Test dark/light theme switching

### Data Preparation Checklist
- [ ] Utworzono TypeScript types
- [ ] Przygotowano 10 produktów (JSON)
- [ ] Przygotowano 4-6 kategorii
- [ ] Przygotowano 1-2 kolekcje
- [ ] Dodano placeholder images
- [ ] Test data loading

### Quality Checklist (Final)
- [ ] ✅ Wszystkie strony responsywne
- [ ] ✅ Accessibility (ARIA labels)
- [ ] ✅ SEO metadata kompletne
- [ ] ✅ Performance (Lighthouse >90)
- [ ] ✅ TypeScript errors: 0
- [ ] ✅ ESLint warnings: 0
- [ ] ✅ Build success
- [ ] ✅ Manual testing (wszystkie flow)

---

## 📝 Notatki Developerskie

### Konwencje Kodowania
- **Komponenty:** PascalCase.tsx
- **Utilities:** camelCase.ts
- **Routes:** kebab-case
- **Types:** PascalCase
- **Zmienne:** camelCase
- **Stałe:** UPPER_CASE

### Import Order
```typescript
// 1. React & Next.js
import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// 2. External libraries
import { motion } from "framer-motion"
import { toast } from "sonner"

// 3. shadcn/ui
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// 4. Local components
import { Header } from "@/components/layout/header/Header"

// 5. Utilities & types
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"

// 6. Data
import products from "@/data/products.json"
```

### Git Commit Messages
```bash
feat: add Hero section with video background
fix: resolve mobile navigation z-index issue
style: update Button variants to rounded-xl
refactor: extract ProductCard to separate component
docs: update README with setup instructions
chore: upgrade Next.js to 15.4.6
```

---

## 🏷️ Tags & Metadata

**Kategorie:**
🟦 E-commerce | 🟩 Next.js | 🟨 Premium Design | 🟪 Vercel Commerce

**Keywords:**
e-commerce, furniture, premium, next.js-15, vercel-commerce, typescript, tailwind-v4, shadcn-ui, dark-design, hybrid-design

**Wersja dokumentu:** 1.0.0
**Ostatnia aktualizacja:** 2025-10-15
**Autor:** Claude Code + Sonnet 4.5
**Status:** 🟡 Inicjalizacja w trakcie

---

> 🎯 **Cel:** Stworzyć najpiękniejszy, najbardziej premium sklep e-commerce z meblami, jaki można sobie wyobrazić. Clean code, top-level design, realistyczne dane.

> 🔥 **Motto:** "If it's not beautiful, it's not done."
