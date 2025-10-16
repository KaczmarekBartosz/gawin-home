# Gawin-Home - Quick Start Guide

**🚀 Szybki Start dla Developera**
**Czas Setup: ~30 minut**

---

## 📋 Wymagania Wstępne

```bash
# Sprawdź wersje
node --version   # v18+ wymagane
pnpm --version   # v8+ zalecane (lub npm/yarn)
git --version    # Git zainstalowany
```

---

## 🎯 Krok 1: Clone Vercel Commerce (5 min)

### Opcja A: Użyj Vercel CLI (ZALECANE)

```bash
# Przejdź do folderu roboczego
cd C:\Users\NicoN\Desktop\Claude

# Clone szablon Vercel Commerce
npx create-next-app@latest gawin-home \
  --example https://github.com/vercel/commerce \
  --use-pnpm

# Przejdź do projektu
cd gawin-home
```

### Opcja B: Clone z GitHub

```bash
cd C:\Users\NicoN\Desktop\Claude

git clone https://github.com/vercel/commerce.git gawin-home
cd gawin-home

# Zainstaluj dependencies
pnpm install
```

### ✅ Weryfikacja

```bash
pnpm dev
```

Otwórz: http://localhost:3000 - powinna załadować się domyślna strona Vercel Commerce.

---

## 🎯 Krok 2: Instalacja Dodatkowych Pakietów (10 min)

### 2.1 Zarządzanie Stanem i Formularze

```bash
pnpm add zustand react-hook-form zod @hookform/resolvers
```

**Co to daje:**

- `zustand` - globalny state (koszyk, wishlist)
- `react-hook-form` - professional forms
- `zod` - schema validation
- `@hookform/resolvers` - bridge RHF + Zod

### 2.2 Ikony i Animacje

```bash
pnpm add lucide-react framer-motion embla-carousel-react
```

**Co to daje:**

- `lucide-react` - modern icon library
- `framer-motion` - smooth animations
- `embla-carousel-react` - efficient carousels

### 2.3 shadcn/ui Setup

**shadcn/ui instalujemy INACZEJ - nie przez pnpm install!**

```bash
# Inicjalizacja shadcn/ui
npx shadcn@latest init

# Odpowiedzi na pytania:
# ✅ Would you like to use TypeScript? Yes
# ✅ Which style would you like to use? New York
# ✅ Which color would you like to use as base color? Neutral
# ✅ Where is your global CSS file? src/app/globals.css (sprawdź ścieżkę!)
# ✅ Would you like to use CSS variables for colors? Yes
# ✅ Where is your tailwind.config.js located? tailwind.config.ts
# ✅ Configure the import alias for components? @/components
# ✅ Configure the import alias for utils? @/lib/utils
```

**Dodaj komponenty UI:**

```bash
# Core components (Must have)
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add sheet
npx shadcn@latest add dialog
npx shadcn@latest add badge
npx shadcn@latest add separator

# Form components
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add radio-group
npx shadcn@latest add checkbox

# Layout components
npx shadcn@latest add accordion
npx shadcn@latest add skeleton
```

### ✅ Weryfikacja

```bash
# Sprawdź czy powstały foldery:
ls src/components/ui          # powinny być komponenty
ls src/lib/utils.ts           # powinien być utils.ts z cn()
```

---

## 🎯 Krok 3: Konfiguracja Design System (10 min)

### 3.1 Customize Tailwind Colors

**Edytuj `src/app/globals.css` (lub `app/globals.css` - sprawdź gdzie jest!):**

Dodaj na początku pliku (ZARAZ PO `@tailwind` directives):

```css
@layer base {
  :root {
    /* === DARK ENTRY COLORS === */
    --dark-bg: 26 26 26; /* #1a1a1a */
    --dark-surface: 37 37 37; /* #252525 */
    --gold-primary: 212 175 55; /* #d4af37 */
    --gold-hover: 193 155 43; /* #c19b2b */
    --text-light: 245 245 245; /* #f5f5f5 */
    --text-muted: 160 160 160; /* #a0a0a0 */

    /* === LIGHT SHOWROOM COLORS === */
    --light-bg: 255 255 255; /* #ffffff */
    --cream-bg: 245 245 240; /* #f5f5f0 */
    --light-surface: 250 250 250; /* #fafafa */
    --border-light: 229 229 229; /* #e5e5e5 */
    --text-dark: 26 26 26; /* #1a1a1a */
    --text-gray: 102 102 102; /* #666666 */

    /* === SEMANTIC COLORS (Already in Commerce) === */
    /* Użyj istniejących z Vercel Commerce i dodaj nasze custom */
  }
}

/* === CUSTOM UTILITY CLASSES === */
@layer utilities {
  .bg-dark-entry {
    background-color: rgb(var(--dark-bg));
  }

  .bg-light-showroom {
    background-color: rgb(var(--light-bg));
  }

  .text-gold {
    color: rgb(var(--gold-primary));
  }

  .border-gold {
    border-color: rgb(var(--gold-primary));
  }

  /* Add more as needed */
}
```

### 3.2 Update Button Component

**Znajdź i edytuj `src/components/ui/button.tsx`:**

Zmień `rounded-md` na `rounded-xl` w base classes:

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl ...", // 🎯 ZMIANA: rounded-xl
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        gold: "bg-[rgb(var(--gold-primary))] text-[rgb(var(--dark-bg))] hover:bg-[rgb(var(--gold-hover))]", // NEW
        // ... reszta wariantów
      },
      // ...
    },
  },
);
```

### 3.3 Custom Fonts (Opcjonalne)

Vercel Commerce już ma Geist font. Jeśli chcesz dodać Space Grotesk:

**Edytuj `src/app/layout.tsx`:**

```typescript
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      className={`${GeistSans.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

---

## 🎯 Krok 4: Struktura Projektu (5 min)

### 4.1 Dodaj Brakujące Foldery

```bash
# Utwórz strukturę dla Gawin-Home
mkdir -p src/components/commerce/{product,cart,checkout}
mkdir -p src/components/sections/{home,shop}
mkdir -p src/lib/{commerce,hooks,validations}
mkdir -p src/stores
mkdir -p src/data
mkdir -p public/images/{products,categories,hero,logos}
```

### 4.2 Utwórz Podstawowe Pliki Config

**Utwórz `src/config/site.ts`:**

```typescript
export const siteConfig = {
  name: "Gawin Home",
  description: "Premium meble dla wymagających",
  url: "https://gawin-home.vercel.app",
};
```

**Utwórz `src/lib/utils.ts` (jeśli nie istnieje):**

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
```

---

## 🎯 Krok 5: Zustand Store Setup (5 min)

### 5.1 Cart Store

**Utwórz `src/stores/useCartStore.ts`:**

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          return { items: [...state.items, item] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "gawin-cart-storage",
    },
  ),
);
```

---

## 🎯 Krok 6: Test Build (2 min)

### 6.1 Development Server

```bash
pnpm dev
```

Otwórz: http://localhost:3000

### 6.2 Production Build

```bash
pnpm build
```

**Sprawdź output:**

- ✅ Build success
- ✅ No TypeScript errors
- ✅ No ESLint errors

---

## 🎯 Krok 7: Git Setup (3 min)

```bash
# Jeśli jeszcze nie zainicjalizowano
git init

# Dodaj wszystkie pliki
git add .

# Pierwszy commit
git commit -m "chore: initial setup with Vercel Commerce + custom packages

- Added zustand for state management
- Added react-hook-form + zod for forms
- Added lucide-react, framer-motion, embla-carousel
- Configured shadcn/ui with custom design system
- Created folder structure for Gawin-Home
- Set up cart store with zustand"

# Utwórz repo na GitHub i połącz (opcjonalnie)
# git remote add origin https://github.com/your-username/gawin-home.git
# git push -u origin main
```

---

## ✅ Checklist Weryfikacyjna

Po ukończeniu Quick Start, sprawdź:

- [ ] ✅ `pnpm dev` działa bez błędów
- [ ] ✅ `pnpm build` kończy się sukcesem
- [ ] ✅ shadcn/ui komponenty w `src/components/ui/`
- [ ] ✅ `cn()` utility w `src/lib/utils.ts`
- [ ] ✅ Zustand cart store w `src/stores/useCartStore.ts`
- [ ] ✅ Custom colors w `globals.css`
- [ ] ✅ Button z `rounded-xl`
- [ ] ✅ Wszystkie pakiety zainstalowane (sprawdź `package.json`)
- [ ] ✅ Git commit zrobiony

---

## 🚀 Następne Kroki

**Po ukończeniu Quick Start, przejdź do:**

1. **Data Layer Setup** (`IMPLEMENTATION_PLAN.md` → Phase 3)

   - Utwórz TypeScript types
   - Dodaj mock data (products.json)
   - Test data loading

2. **Homepage Implementation** (`IMPLEMENTATION_PLAN.md` → Phase 4)

   - Header component
   - Hero section (dark entry)
   - Featured products
   - Categories showcase

3. **Product Pages** (`IMPLEMENTATION_PLAN.md` → Phase 5)
   - Product listing (light showroom)
   - Product details
   - Cart integration

---

## 📚 Przydatne Komendy

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript check

# shadcn/ui
npx shadcn@latest add [component]   # Dodaj komponent
npx shadcn@latest add --help        # Lista komponentów

# Zustand DevTools (opcjonalnie)
# Install: pnpm add -D @redux-devtools/extension
```

---

## 🐛 Troubleshooting

### Problem: `pnpm dev` nie startuje

**Rozwiązanie:**

```bash
# Usuń node_modules i lockfile
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install

# Spróbuj ponownie
pnpm dev
```

### Problem: shadcn/ui nie znalazł `globals.css`

**Rozwiązanie:**
Sprawdź dokładną ścieżkę:

```bash
# Może być:
# - src/app/globals.css
# - app/globals.css
# - styles/globals.css

# Podaj prawidłową ścieżkę podczas `npx shadcn@latest init`
```

### Problem: TypeScript errors w `button.tsx`

**Rozwiązanie:**

```bash
# Update types
pnpm add -D @types/react@latest @types/node@latest
```

---

## 📖 Dokumentacja

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Commerce Docs](https://vercel.com/docs/commerce)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)

---

**Status:** ✅ Ready to Start!
**Szacowany czas setup:** ~30 minut
**Następny krok:** Data Layer Setup

---

> 🎯 **Goal:** Clean setup, wszystko działa, gotowy do implementacji features.

> 💡 **Pro Tip:** Po setup zrób snapshot projektu (commit lub backup), żeby móc wrócić do czystego stanu jeśli coś pójdzie nie tak.
