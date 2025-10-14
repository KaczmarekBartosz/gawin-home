# Gawin-Home - Plan Implementacji Krok po Kroku

**Data utworzenia:** 2025-10-15
**Status:** 📋 Plan gotowy do wykonania

---

## 📋 Spis Treści

1. [Phase 1: Foundation Setup](#phase-1-foundation-setup)
2. [Phase 2: Design System](#phase-2-design-system)
3. [Phase 3: Data Layer](#phase-3-data-layer)
4. [Phase 4: Homepage Implementation](#phase-4-homepage-implementation)
5. [Phase 5: Product Pages](#phase-5-product-pages)
6. [Phase 6: Cart & Checkout](#phase-6-cart--checkout)
7. [Phase 7: Polish & Deploy](#phase-7-polish--deploy)

---

## Phase 1: Foundation Setup

### 🎯 Cel
Utworzenie solidnego fundamentu projektu z Next.js 15, TypeScript i Tailwind v4.

### ⏱️ Czas: 2-3 godziny

### 📝 Kroki

#### 1.1 Inicjalizacja Projektu

```bash
# Krok 1: Przejdź do folderu roboczego
cd C:\Users\NicoN\Desktop\Claude

# Krok 2: Utwórz nowy projekt Next.js
npx create-next-app@latest gawin-home \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack

# Krok 3: Przejdź do projektu
cd gawin-home

# Krok 4: Otwórz w VS Code
code .
```

**Odpowiedzi na pytania setup:**
- TypeScript: ✅ Yes
- ESLint: ✅ Yes
- Tailwind CSS: ✅ Yes
- `src/` directory: ✅ Yes
- App Router: ✅ Yes
- Customize import alias: ✅ Yes (@/*)
- Turbopack: ✅ Yes

#### 1.2 Instalacja shadcn/ui

```bash
# Inicjalizacja shadcn/ui
npx shadcn@latest init

# Odpowiedzi:
# - Style: New York
# - Base color: Neutral
# - CSS variables: Yes
```

#### 1.3 Instalacja Dependencies

```bash
# UI & Styling
npm install lucide-react class-variance-authority clsx tailwind-merge

# Animations & UX
npm install framer-motion sonner next-themes

# Forms
npm install react-hook-form @hookform/resolvers zod

# Dev Tools
npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier

# Fonts (Geist)
# Already included in Next.js 15
```

#### 1.4 Struktura Folderów

```bash
# Utwórz strukturę
mkdir -p src/components/{ui,layout,commerce,sections,shared}
mkdir -p src/components/layout/{header,footer,sidebar}
mkdir -p src/components/commerce/{product,cart,checkout}
mkdir -p src/components/sections/{home,shared}
mkdir -p src/lib/{commerce,hooks,validations}
mkdir -p src/data
mkdir -p src/config
mkdir -p src/types
mkdir -p public/images/{products,categories,hero,logos}
```

#### 1.5 Konfiguracja Git

```bash
# Inicjalizacja repo
git init
git add .
git commit -m "chore: initial project setup with Next.js 15 and shadcn/ui"

# Utwórz .gitignore (już jest)
# Dodaj .env.local do .gitignore
```

#### 1.6 Prettier Configuration

**Utwórz `.prettierrc.json`:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## Phase 2: Design System

### 🎯 Cel
Konfiguracja design systemu: kolory, typografia, komponenty.

### ⏱️ Czas: 3-4 godziny

### 📝 Kroki

#### 2.1 Tailwind v4 Configuration

**Edytuj `src/app/globals.css`:**
```css
@import "tailwindcss";

@theme {
  /* === SPACING (8px grid) === */
  --spacing-1: 0.5rem;
  --spacing-2: 1rem;
  --spacing-3: 1.5rem;
  --spacing-4: 2rem;
  --spacing-5: 2.5rem;
  --spacing-6: 3rem;
  --spacing-8: 4rem;
  --spacing-10: 5rem;
  --spacing-12: 6rem;

  /* === RADIUS === */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;    /* 🎯 PRIMARY for buttons */
  --radius-2xl: 2rem;

  /* === DARK ENTRY COLORS === */
  --color-dark-bg: oklch(0.11 0 0);           /* #1a1a1a */
  --color-dark-surface: oklch(0.15 0 0);      /* #252525 */
  --color-gold-primary: oklch(0.75 0.12 85);  /* #d4af37 */
  --color-gold-hover: oklch(0.68 0.12 85);    /* #c19b2b */
  --color-text-light: oklch(0.96 0 0);        /* #f5f5f5 */
  --color-text-muted: oklch(0.63 0 0);        /* #a0a0a0 */

  /* === LIGHT SHOWROOM COLORS === */
  --color-light-bg: oklch(1 0 0);             /* #ffffff */
  --color-cream-bg: oklch(0.97 0.005 85);     /* #f5f5f0 */
  --color-light-surface: oklch(0.98 0 0);     /* #fafafa */
  --color-border-light: oklch(0.90 0 0);      /* #e5e5e5 */
  --color-text-dark: oklch(0.11 0 0);         /* #1a1a1a */
  --color-text-gray: oklch(0.40 0 0);         /* #666666 */

  /* === ACCENT COLORS === */
  --color-accent-blue: oklch(0.60 0.25 250);  /* #3b82f6 */
  --color-accent-green: oklch(0.60 0.25 155); /* #10b981 */
  --color-accent-red: oklch(0.60 0.25 25);    /* #ef4444 */
  --color-accent-orange: oklch(0.70 0.20 60); /* #f59e0b */

  /* === SEMANTIC MAPPING === */
  --color-background: var(--color-light-bg);
  --color-foreground: var(--color-text-dark);
  --color-primary: var(--color-gold-primary);
  --color-primary-foreground: var(--color-dark-bg);
}

/* === DARK MODE (Optional - dla toggles) === */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: var(--color-dark-bg);
    --color-foreground: var(--color-text-light);
  }
}

/* === BASE STYLES === */
@layer base {
  * {
    @apply border-border-light;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display tracking-tight;
  }
}

/* === UTILITIES === */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

#### 2.2 Font Configuration

**Edytuj `src/app/layout.tsx`:**
```typescript
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Dodaj do `tailwind.config.ts`:**
```typescript
fontFamily: {
  sans: ["var(--font-geist-sans)", "sans-serif"],
  mono: ["var(--font-geist-mono)", "monospace"],
  display: ["var(--font-display)", "sans-serif"],
}
```

#### 2.3 Komponenty UI (shadcn/ui)

```bash
# Dodaj podstawowe komponenty
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add sheet
npx shadcn@latest add dialog
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add skeleton
npx shadcn@latest add accordion
npx shadcn@latest add select
npx shadcn@latest add radio-group
npx shadcn@latest add checkbox
npx shadcn@latest add form
```

#### 2.4 Customize Button Component

**Edytuj `src/components/ui/button.tsx`:**

Zmień `defaultVariants` radius:
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl ...", // 🎯 rounded-xl
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        gold: "bg-gold-primary text-dark-bg hover:bg-gold-hover", // NEW
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3", // rounded-lg dla small
        lg: "h-11 rounded-2xl px-8", // rounded-2xl dla large
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

#### 2.5 Utility Functions

**Utwórz `src/lib/utils.ts`:**
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = "PLN"): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
```

---

## Phase 3: Data Layer

### 🎯 Cel
Utworzenie TypeScript types i mock data dla produktów.

### ⏱️ Czas: 2-3 godziny

### 📝 Kroki

#### 3.1 TypeScript Types

**Utwórz `src/types/product.ts`:**
```typescript
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  collection?: string;

  price: {
    amount: number;
    currency: string;
    compareAtAmount?: number;
  };

  images: ProductImage[];
  variants: ProductVariant[];
  details: ProductDetails;
  seo: ProductSEO;

  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  onSale: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: VariantOption[];
}

export interface VariantOption {
  name: string;
  value: string;
  priceModifier?: number;
  inStock: boolean;
}

export interface ProductDetails {
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
}

export interface ProductSEO {
  title: string;
  description: string;
  keywords: string[];
}
```

**Utwórz `src/types/category.ts`:**
```typescript
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  subcategories?: Subcategory[];
  productCount: number;
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
}
```

**Utwórz `src/types/cart.ts`:**
```typescript
import type { Product } from "./product";

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product: Pick<Product, "name" | "images" | "slug">;
}
```

**Utwórz `src/types/index.ts`:**
```typescript
export * from "./product";
export * from "./category";
export * from "./cart";
```

#### 3.2 Mock Data - Products

**Utwórz `src/data/products.json`:**
```json
[
  {
    "id": "sofa-skandynawska-beige",
    "slug": "sofa-skandynawska-beige",
    "name": "Sofa Skandynawska Bergen",
    "description": "Elegancka sofa w stylu skandynawskim, wykonana z wysokiej jakości tkaniny. Idealna do nowoczesnych wnętrz. Wygodne, miękkie siedzisko zapewnia maksymalny komfort.",
    "category": "sofas",
    "subcategory": "scandinavian",
    "collection": "bergen",
    "price": {
      "amount": 3499,
      "currency": "PLN",
      "compareAtAmount": 4299
    },
    "images": [
      {
        "url": "/images/products/sofa-bergen-beige-1.jpg",
        "alt": "Sofa Bergen - widok z przodu",
        "width": 1200,
        "height": 800
      },
      {
        "url": "/images/products/sofa-bergen-beige-2.jpg",
        "alt": "Sofa Bergen - widok z boku",
        "width": 1200,
        "height": 800
      }
    ],
    "variants": [
      {
        "id": "color",
        "name": "Kolor",
        "options": [
          { "name": "Beżowy", "value": "beige", "inStock": true },
          { "name": "Szary", "value": "gray", "priceModifier": 200, "inStock": true },
          { "name": "Ciemny Niebieski", "value": "navy", "priceModifier": 300, "inStock": false }
        ]
      }
    ],
    "details": {
      "dimensions": {
        "width": 220,
        "height": 85,
        "depth": 95,
        "unit": "cm"
      },
      "weight": 85,
      "materials": ["Tkanina premium", "Drewno brzozowe", "Pianka wysokoelastyczna"],
      "colors": ["Beżowy", "Szary", "Ciemny Niebieski"],
      "manufacturer": "Gawin Furniture Co."
    },
    "seo": {
      "title": "Sofa Skandynawska Bergen - Beżowa | Gawin Home",
      "description": "Elegancka sofa skandynawska Bergen w kolorze beżowym. Wysoka jakość, skandynawski design, komfort na lata.",
      "keywords": ["sofa skandynawska", "sofa beżowa", "meble bergen", "sofa nowoczesna"]
    },
    "inStock": true,
    "isFeatured": true,
    "isNew": false,
    "onSale": true,
    "createdAt": "2024-10-01T10:00:00Z",
    "updatedAt": "2025-01-10T14:30:00Z"
  },
  {
    "id": "fotel-loftowy-skora",
    "slug": "fotel-loftowy-skora",
    "name": "Fotel Loftowy Manhattan",
    "description": "Ekskluzywny fotel w stylu industrialnym, wykonany z naturalnej skóry. Metalowa rama dodaje charakteru. Idealny do loftów i nowoczesnych wnętrz.",
    "category": "armchairs",
    "subcategory": "industrial",
    "collection": "manhattan",
    "price": {
      "amount": 2899,
      "currency": "PLN"
    },
    "images": [
      {
        "url": "/images/products/fotel-manhattan-1.jpg",
        "alt": "Fotel Manhattan - widok z przodu",
        "width": 1200,
        "height": 800
      }
    ],
    "variants": [
      {
        "id": "leather-color",
        "name": "Kolor Skóry",
        "options": [
          { "name": "Brązowy Vintage", "value": "brown-vintage", "inStock": true },
          { "name": "Czarny Mat", "value": "black-matte", "priceModifier": 400, "inStock": true }
        ]
      }
    ],
    "details": {
      "dimensions": {
        "width": 80,
        "height": 95,
        "depth": 85,
        "unit": "cm"
      },
      "weight": 32,
      "materials": ["Naturalna skóra", "Stal szczotkowana", "Pianka poliuretanowa"],
      "colors": ["Brązowy Vintage", "Czarny Mat"],
      "manufacturer": "Gawin Furniture Co."
    },
    "seo": {
      "title": "Fotel Loftowy Manhattan - Skórzany | Gawin Home",
      "description": "Ekskluzywny fotel loftowy Manhattan ze skóry naturalnej. Industrialny design, najwyższa jakość wykonania.",
      "keywords": ["fotel loftowy", "fotel skórzany", "meble industrialne", "fotel manhattan"]
    },
    "inStock": true,
    "isFeatured": true,
    "isNew": true,
    "onSale": false,
    "createdAt": "2025-01-05T09:00:00Z",
    "updatedAt": "2025-01-15T11:20:00Z"
  }
]
```

*(Dodaj więcej produktów - docelowo 10-12)*

#### 3.3 Mock Data - Categories

**Utwórz `src/data/categories.json`:**
```json
[
  {
    "id": "sofas",
    "slug": "sofas",
    "name": "Sofy",
    "description": "Wygodne i eleganckie sofy do Twojego salonu",
    "image": "/images/categories/sofas.jpg",
    "subcategories": [
      { "id": "scandinavian", "slug": "scandinavian", "name": "Skandynawskie" },
      { "id": "modern", "slug": "modern", "name": "Nowoczesne" },
      { "id": "classic", "slug": "classic", "name": "Klasyczne" }
    ],
    "productCount": 24
  },
  {
    "id": "armchairs",
    "slug": "armchairs",
    "name": "Fotele",
    "description": "Komfortowe fotele do relaksu",
    "image": "/images/categories/armchairs.jpg",
    "subcategories": [
      { "id": "industrial", "slug": "industrial", "name": "Industrialne" },
      { "id": "scandinavian", "slug": "scandinavian", "name": "Skandynawskie" }
    ],
    "productCount": 16
  },
  {
    "id": "tables",
    "slug": "tables",
    "name": "Stoły",
    "description": "Stylowe stoły jadalne i kawowe",
    "image": "/images/categories/tables.jpg",
    "productCount": 18
  },
  {
    "id": "chairs",
    "slug": "chairs",
    "name": "Krzesła",
    "description": "Krzesła do jadalni, biura i nie tylko",
    "image": "/images/categories/chairs.jpg",
    "productCount": 32
  }
]
```

#### 3.4 Configuration Files

**Utwórz `src/config/site.ts`:**
```typescript
export const siteConfig = {
  name: "Gawin Home",
  description: "Premium meble dla wymagających. Elegancja w każdym detalu.",
  url: "https://gawin-home.vercel.app",
  ogImage: "/images/og-image.jpg",
  links: {
    facebook: "https://facebook.com/gawinhome",
    instagram: "https://instagram.com/gawinhome",
    pinterest: "https://pinterest.com/gawinhome",
  },
};

export const navigationConfig = {
  mainNav: [
    {
      title: "Kategorie",
      items: [
        { title: "Sofy", href: "/category/sofas" },
        { title: "Fotele", href: "/category/armchairs" },
        { title: "Stoły", href: "/category/tables" },
        { title: "Krzesła", href: "/category/chairs" },
      ],
    },
    {
      title: "Kolekcje",
      items: [
        { title: "Bergen", href: "/collection/bergen" },
        { title: "Manhattan", href: "/collection/manhattan" },
        { title: "Tokyo", href: "/collection/tokyo" },
      ],
    },
  ],
  footerNav: [
    {
      title: "Sklep",
      items: [
        { title: "Wszystkie Produkty", href: "/products" },
        { title: "Nowości", href: "/new" },
        { title: "Promocje", href: "/sale" },
      ],
    },
    {
      title: "Pomoc",
      items: [
        { title: "Kontakt", href: "/contact" },
        { title: "FAQ", href: "/faq" },
        { title: "Dostawa", href: "/shipping" },
        { title: "Zwroty", href: "/returns" },
      ],
    },
    {
      title: "Firma",
      items: [
        { title: "O Nas", href: "/about" },
        { title: "Blog", href: "/blog" },
        { title: "Kariera", href: "/careers" },
      ],
    },
  ],
};
```

---

## Phase 4: Homepage Implementation

### 🎯 Cel
Implementacja ciemnej, eleganciej strony głównej.

### ⏱️ Czas: 6-8 godzin

### 📝 Kroki

#### 4.1 Header Component

**Utwórz `src/components/layout/header/Header.tsx`:**
```typescript
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-dark-bg/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-gold-primary">
              GAWIN
            </span>
            <span className="text-2xl font-display font-light text-text-light">
              HOME
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-text-light hover:text-gold-primary transition-colors"
            >
              Produkty
            </Link>
            <Link
              href="/categories"
              className="text-text-light hover:text-gold-primary transition-colors"
            >
              Kategorie
            </Link>
            <Link
              href="/collections"
              className="text-text-light hover:text-gold-primary transition-colors"
            >
              Kolekcje
            </Link>
            <Link
              href="/about"
              className="text-text-light hover:text-gold-primary transition-colors"
            >
              O Nas
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-text-light">
              <Search className="h-5 w-5" />
              <span className="sr-only">Szukaj</span>
            </Button>

            <Button variant="ghost" size="icon" className="text-text-light">
              <User className="h-5 w-5" />
              <span className="sr-only">Konto</span>
            </Button>

            <Button variant="ghost" size="icon" className="relative text-text-light">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-primary text-xs text-dark-bg">
                0
              </span>
              <span className="sr-only">Koszyk</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-text-light">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-dark-bg border-gold-primary/20">
                {/* Mobile navigation content */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
```

#### 4.2 Hero Section

**Utwórz `src/components/sections/home/HeroSection.tsx`:**
```typescript
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark-bg">
      {/* Background Image/Video */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Premium furniture"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 via-dark-bg/70 to-dark-bg" />
      </div>

      {/* Content */}
      <div className="container px-4 py-32 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-gold-primary/30 bg-dark-surface/50 px-4 py-2 backdrop-blur-sm">
            <span className="text-sm text-gold-primary">
              Nowa Kolekcja 2025
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight text-text-light sm:text-6xl md:text-7xl lg:text-8xl">
            Elegancja w{" "}
            <span className="bg-gradient-to-r from-gold-primary via-gold-hover to-gold-primary bg-clip-text text-transparent">
              każdym detalu
            </span>
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-text-muted sm:text-xl md:text-2xl">
            Odkryj kolekcję premium mebli, które łączą nowoczesny design z
            ponadczasową elegancją. Stwórz wnętrze swoich marzeń.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              variant="gold"
              className="group text-lg"
            >
              <Link href="/products">
                Zobacz Kolekcję
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold-primary/50 text-gold-primary hover:bg-gold-primary/10 text-lg"
            >
              <Link href="/about">Poznaj Nas</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-text-muted">
            Przewiń w dół
          </span>
          <div className="h-8 w-5 rounded-full border-2 border-gold-primary/50">
            <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-gold-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

*(Więcej komponentów sekcji w kolejnych krokach)*

---

## Phase 5-7: Detailed Implementation

*(Kontynuacja szczegółowych kroków dla Product Pages, Cart & Checkout, Polish & Deploy w kolejnych sekcjach dokumentu)*

---

## ✅ Checklisty Kontrolne

### Pre-Implementation Checklist
- [ ] Folder `C:\Users\NicoN\Desktop\Claude\gawin-home` utworzony
- [ ] Git zainicjalizowany
- [ ] Dependencies zainstalowane
- [ ] shadcn/ui skonfigurowany
- [ ] Struktura folderów utworzona

### Phase 1 Done Checklist
- [ ] `npm run dev` działa bez błędów
- [ ] `npm run build` kończy się sukcesem
- [ ] Tailwind CSS v4 skonfigurowany
- [ ] Fonts (Geist) załadowane
- [ ] ESLint + Prettier działa

### Phase 2 Done Checklist
- [ ] Design system (kolory) w `globals.css`
- [ ] Button component z `rounded-xl`
- [ ] Wszystkie komponenty shadcn/ui dodane
- [ ] `cn()` utility działa
- [ ] Preview Button variants w przeglądarce

### Phase 3 Done Checklist
- [ ] TypeScript types utworzone
- [ ] Mock data (products.json) gotowe
- [ ] Categories.json gotowe
- [ ] Site config utworzony
- [ ] Test import data w komponencie

---

## 🚀 Następne Kroki

Po ukończeniu Phase 1-3, przejdź do implementacji:
1. Header + Footer
2. Homepage sections (Hero, Featured, Categories)
3. Product listing page
4. Product detail page
5. Cart & Checkout
6. Polish & Deploy

---

**Status:** 📋 Plan gotowy do wykonania
**Szacowany czas:** 5-7 dni (40-50 godzin pracy)
**Priorytet:** 🔥 Wysoki - Rozpocznij natychmiast!

---

> 💡 **Tip:** Commituj często! Po każdej ukończonej sekcji zrób commit z opisowym message.
