# Plan Realizacji Projektu Gawin-Home

**Data rozpoczęcia:** 2025-10-15
**Deweloper:** Claude Code + Sonnet 4.5
**Status:** 🟡 W trakcie realizacji

---

## Źródła Prawdy

Ten plan realizacji bazuje na dwóch kluczowych dokumentach:

1. **`DESIGN_GUIDELINES.md`** - Specyfikacja techniczna "Stylu Hybrydowego"
2. **`PROJECT_PLAN.md`** - Kompletny plan rozwoju w 3 fazach

---

## Strategia Realizacji

### Priorytet: FAZA 1 - Fundament Premium (MVP)

Skupiamy się na **perfekcyjnym wykonaniu** podstawowych funkcji zgodnie z filozofią "Perfekcja w prostocie".

---

## ETAP 1: Przygotowanie Infrastruktury (Foundation)

### 1.1 System Kolorów i Design Tokens

- [x] Zdefiniowano theme w `lib/design-system/themes/hybrid-luxury.ts`
- [x] Skonfigurowano CSS variables w `app/globals.css`
- [ ] **TODO:** Dodać wszystkie kolory z DESIGN_GUIDELINES.md do CSS:
  - `--brand-cream: #FAFAF9`
  - `--brand-sand: #F5F5F5`
  - `--brand-charcoal: #1A1A1A`
  - `--brand-gold: #d4a574`
  - `--brand-copper: #b8956a`
  - `--neutral-border: #E5E7EB`

### 1.2 Komponenty UI Podstawowe (zgodnie z DESIGN_GUIDELINES)

- [ ] **Button Component** - CVA variants:
  - [ ] `primary` - Gradient (gold → copper), `rounded-xl`
  - [ ] `secondary` - Outline gold, `rounded-xl`
  - [ ] `ghost` - Transparent, `rounded-xl`
  - [ ] Focus states: `ring-2 ring-brand-gold`
- [ ] **Card Component** - Product Card:
  - [ ] `rounded-2xl` (IMMUTABLE)
  - [ ] Hover: `shadow-xl`
  - [ ] Image wrapper: `aspect-square`
  - [ ] Hover image scale: `group-hover:scale-105`
- [ ] **Input Component**:
  - [ ] `rounded-lg`
  - [ ] Focus: `border-brand-gold ring-2 ring-brand-gold/50`

### 1.3 Typografia (Geist Sans)

- [x] Geist Sans zainstalowany
- [ ] **TODO:** Zdefiniować utility classes w `globals.css`:
  - [ ] Display: `text-5xl lg:text-7xl font-bold tracking-tighter`
  - [ ] H1: `text-4xl lg:text-5xl font-bold tracking-tight`
  - [ ] H2: `text-3xl lg:text-4xl font-bold`
  - [ ] H3: `text-xl lg:text-2xl font-semibold`
  - [ ] Body Descriptive: `text-base lg:text-lg leading-relaxed text-neutral-600`
  - [ ] Label: `text-sm font-medium uppercase tracking-wider`

---

## ETAP 2: Strona Główna - Sekcje (Homepage Sections)

### 2.1 Hero Section (Tryb "Elegancki")

**Opis:** Kinematograficzne, pełnoekranowe wejście. Tło wideo/zdjęcie, ciemna nakładka.

**Komponenty do stworzenia:**

- [ ] `components/sections/home/HeroSection.tsx`
  - [ ] Pełnoekranowy layout (`min-h-screen`)
  - [ ] Background video/image
  - [ ] Ciemna nakładka: `bg-brand-charcoal/70`
  - [ ] Nagłówek Display: "Twój Dom, Twoja Perfekcja"
  - [ ] Podtytuł
  - [ ] Button CTA (variant `primary`)
  - [ ] 2-3 ikony z propozycjami wartości:
    - [ ] Ikona `Truck` (Lucide) - "Darmowa dostawa"
    - [ ] Ikona `ShieldCheck` - "Gwarancja 10 lat"
    - [ ] Ikona `Award` - "Ręczne wykonanie"
  - [ ] Framer Motion: `initial={{ opacity: 0, y: 30 }}`

**Specyfikacja techniczna:**

- Tryb: Elegancki (ciemny)
- Ikony: `strokeWidth={1.5}`, `h-5 w-5`
- Animacja: `duration: 0.5`, `ease: "easeOut"`

---

### 2.2 Nawigacja i Mega Menu (Sticky Header)

**Opis:** Lepka nawigacja z mega menu rozwijanym po hover.

**Komponenty do stworzenia:**

- [ ] `components/layout/header/Header.tsx` - refaktoryzacja istniejącego
  - [ ] Sticky: `sticky top-0 z-50`
  - [ ] Transition: transparent → solid przy scroll
  - [ ] Logo
  - [ ] Desktop navigation links
  - [ ] Cart button z licznikiem
  - [ ] Mobile menu toggle
- [ ] `components/layout/header/MegaMenu.tsx`
  - [ ] Rozwijane menu dla głównych kategorii
  - [ ] Podkategorie (wg. Stylu, wg. Rozmiaru)
  - [ ] Inspirujące zdjęcie aranżacji (po prawej stronie)
  - [ ] Hover interactions
- [ ] `components/layout/header/MobileNav.tsx`
  - [ ] Sheet z pełną nawigacją
  - [ ] Accordion dla kategorii

**Struktura menu:**

- Łóżka → [Wg. Stylu, Wg. Rozmiaru]
- Sofy → [Wg. Stylu, Wg. Rozmiaru]
- Stoły → [Wg. Stylu, Wg. Rozmiaru]
- Oświetlenie

---

### 2.3 Prezentacja Kolekcji (Tryb "Showroom")

**Opis:** Siatka 3-4 kafelków z kategoriami.

**Komponenty do stworzenia:**

- [ ] `components/sections/home/CollectionsSection.tsx`
  - [ ] Tło: `bg-brand-sand`
  - [ ] Nagłówek H2: "Nasze Kolekcje"
  - [ ] Grid: 3-4 kolumny (responsive)
- [ ] `components/commerce/CategoryCard.tsx`
  - [ ] Zdjęcie kategorii
  - [ ] Nazwa kategorii
  - [ ] Link do strony kategorii
  - [ ] Hover: `shadow-lg`

**Dane do przygotowania:**

- [ ] `data/categories.json` - 4-6 kategorii ze zdjęciami

---

### 2.4 Bestsellery / Polecane Produkty (Tryb "Showroom")

**Opis:** KLUCZOWA SEKCJA. Siatka produktów z pełną funkcjonalnością.

**Komponenty do stworzenia:**

- [ ] `components/sections/home/BestsellersSection.tsx`
  - [ ] Tło: `bg-brand-cream`
  - [ ] Nagłówek H2: "Bestsellery"
  - [ ] Grid: 3-4 kolumny (responsive)
- [ ] `components/commerce/product/ProductCard.tsx` - **KRYTYCZNY KOMPONENT**
  - [ ] Kontener: `group rounded-2xl bg-white shadow-lg`
  - [ ] Image wrapper: `relative aspect-square overflow-hidden`
  - [ ] **Funkcja 1:** Hover zmienia zdjęcie na drugie ujęcie
    - [ ] State dla aktywnego obrazka
    - [ ] `onMouseEnter` → zmiana na image[1]
    - [ ] `onMouseLeave` → powrót na image[0]
  - [ ] **Funkcja 2:** Ikona serca (wishlist)
    - [ ] Position: `absolute top-4 right-4`
    - [ ] Toggle active state
  - [ ] **Funkcja 3:** Miniatury kolorów (swatches)
    - [ ] Renderowanie dostępnych kolorów jako małe kółka
    - [ ] Hover highlight
  - [ ] **Funkcja 4:** Kluczowe wymiary
    - [ ] np. "Szerokość: 220 cm"
  - [ ] **Funkcja 5:** Cena + opcja ratalna
    - [ ] Główna cena: `text-2xl font-bold text-brand-gold`
    - [ ] Pod spodem: "lub 208 zł/mc" (mniejszy font)
  - [ ] **Funkcja 6:** Oceny w gwiazdkach
    - [ ] Rendering: ★★★★☆ + liczba opinii
  - [ ] **Funkcja 7:** Badges (NOWOŚĆ, PROMOCJA)
    - [ ] Position: `absolute top-4 left-4`
    - [ ] Conditional rendering
  - [ ] **Funkcja 8:** Quick Add button (hover)
    - [ ] Ikona koszyka
    - [ ] `opacity-0 group-hover:opacity-100`

**Dane do przygotowania:**

- [ ] `data/products.json` - 10-12 produktów z pełnymi danymi:
  - [ ] Minimum 2 zdjęcia na produkt
  - [ ] Dostępne kolory (hex)
  - [ ] Wymiary (szerokość, wysokość, głębokość)
  - [ ] Cena + cena ratalna
  - [ ] Rating (1-5) + liczba opinii
  - [ ] Flags: isNew, onSale

---

### 2.5 Inspiracje / Lifestyle Imagery (Tryb "Elegancki/Mieszany")

**Opis:** Shoppable images - zdjęcia aranżacji z tagami produktów.

**Komponenty do stworzenia:**

- [ ] `components/sections/home/InspirationsSection.tsx`
  - [ ] Pełnoekranowy baner lub gallery
  - [ ] 2-3 duże zdjęcia lifestyle
- [ ] `components/commerce/ShoppableImage.tsx`
  - [ ] Image z nałożonymi tagami produktów
  - [ ] Hover: tagi stają się widoczne
  - [ ] Click na tag → przekierowanie do ProductCard
  - [ ] Animacja: fade in tagów

**Dane do przygotowania:**

- [ ] 2-3 wysokiej jakości zdjęcia aranżacji wnętrz
- [ ] JSON z pozycjami tagów (x, y, productId)

---

### 2.6 Sygnały Zaufania / Social Proof (Tryb "Showroom")

**Opis:** Opinie klientów + logotypy płatności + gwarancje.

**Komponenty do stworzenia:**

- [ ] `components/sections/home/SocialProofSection.tsx`
  - [ ] Podsekcja 1: Karuzela opinii
  - [ ] Podsekcja 2: Logotypy płatności
  - [ ] Podsekcja 3: Gwarancje (30 dni zwrotu, 10 lat)
- [ ] `components/shared/TestimonialCard.tsx`
  - [ ] Avatar klienta
  - [ ] Imię + "Verified Buyer"
  - [ ] Gwiazdki rating
  - [ ] Tekst opinii (2-3 zdania max)
- [ ] `components/shared/TrustBadge.tsx`
  - [ ] Ikona
  - [ ] Tekst (np. "30 dni na zwrot")

**Dane do przygotowania:**

- [ ] `data/testimonials.json` - 3-5 opinii klientów
- [ ] Logotypy: Przelewy24, Blik, Visa, Mastercard, FSC

---

### 2.7 Newsletter (Tryb "Showroom")

**Opis:** Formularz zapisu do newslettera z zachętą (-10%).

**Komponenty do stworzenia:**

- [ ] `components/sections/home/NewsletterSection.tsx`
  - [ ] Nagłówek H3: "Dołącz do naszego klubu"
  - [ ] Podtytuł: "Otrzymaj -10% na pierwsze zakupy"
  - [ ] Pole Input (email)
  - [ ] Button (variant `primary`): "Zapisz się"
  - [ ] Formularz validation (Zod)
  - [ ] Toast notification po zapisie (Sonner)

---

### 2.8 Stopka / Footer (Tryb "Elegancki")

**Opis:** Rozbudowany hub informacyjny z linkami i informacjami prawnymi.

**Komponenty do stworzenia:**

- [ ] `components/layout/footer/Footer.tsx`
  - [ ] Tło: `bg-brand-charcoal`
  - [ ] Tekst: `text-brand-cream`
  - [ ] 4 kolumny:
    - [ ] Kolumna 1: Logo + krótki opis firmy
    - [ ] Kolumna 2: Kategorie (linki)
    - [ ] Kolumna 3: Informacje (O nas, Kontakt, Blog)
    - [ ] Kolumna 4: Obsługa klienta (FAQ, Zwroty, Reklamacje)
  - [ ] Bottom row: Copyright + Polityka prywatności + Regulamin
- [ ] `components/layout/footer/FooterLinks.tsx`
  - [ ] Lista linków z hover states

---

## ETAP 3: Dane Testowe (Mock Data)

### 3.1 Produkty

- [ ] `data/products.json` - Minimum 10-12 produktów:
  - [ ] Łóżka (4 produkty)
  - [ ] Sofy (3 produkty)
  - [ ] Stoły (2 produkty)
  - [ ] Oświetlenie (2 produkty)

**Struktura każdego produktu:**

```json
{
  "id": "prod_001",
  "slug": "lozko-dębowe-king-size",
  "name": "Łóżko Dębowe King Size",
  "description": "Eleganckie łóżko...",
  "category": "Łóżka",
  "subcategory": "Nowoczesne",
  "price": {
    "amount": 2499,
    "currency": "PLN",
    "installment": 208
  },
  "images": [
    { "url": "/images/products/bed-1-main.jpg", "alt": "..." },
    { "url": "/images/products/bed-1-side.jpg", "alt": "..." }
  ],
  "colors": [
    { "name": "Dąb naturalny", "hex": "#D4A574" },
    { "name": "Orzech", "hex": "#5C4033" }
  ],
  "dimensions": {
    "width": 220,
    "height": 120,
    "depth": 200,
    "unit": "cm"
  },
  "rating": 4.8,
  "reviewCount": 127,
  "isNew": true,
  "onSale": false,
  "inStock": true
}
```

### 3.2 Kategorie

- [ ] `data/categories.json` - 4-6 kategorii ze zdjęciami

### 3.3 Opinie

- [ ] `data/testimonials.json` - 5 opinii klientów

### 3.4 Inspiracje

- [ ] `data/inspirations.json` - 2-3 lifestyle images z tagami

---

## ETAP 4: Integracja i Połączenie (Integration)

### 4.1 Strona Główna (app/page.tsx)

- [ ] Import wszystkich sekcji
- [ ] Ułożenie w kolejności narracji:
  1. Hero
  2. Collections
  3. Bestsellers
  4. Inspirations
  5. Social Proof
  6. Newsletter
- [ ] Footer (w layout.tsx)

### 4.2 Animacje (Framer Motion)

- [ ] Dodać `whileInView` do wszystkich sekcji
- [ ] Stagger dla list produktów
- [ ] Smooth scroll behavior

### 4.3 Responsywność

- [ ] Test mobile (375px - iPhone SE)
- [ ] Test tablet (768px - iPad)
- [ ] Test desktop (1440px - laptop)
- [ ] Test 4K (2560px+)

---

## ETAP 5: Optymalizacja i Polish

### 5.1 Performance

- [ ] Image optimization (Next.js Image)
- [ ] Lazy loading dla sekcji
- [ ] Code splitting
- [ ] Bundle analysis

### 5.2 Accessibility

- [ ] ARIA labels dla wszystkich interaktywnych elementów
- [ ] Keyboard navigation
- [ ] Focus states (wszystkie zgodne z `ring-brand-gold`)
- [ ] Alt texts dla wszystkich obrazków

### 5.3 SEO

- [ ] Metadata API (all pages)
- [ ] Structured data (Product schema)
- [ ] Sitemap
- [ ] robots.txt

### 5.4 Testing

- [ ] Manual testing (wszystkie flow)
- [ ] Cross-browser (Chrome, Firefox, Safari)
- [ ] Lighthouse audit (target: >90)

---

## Checklist Główny (Quick Overview)

### Infrastructure ✅ / ⏳

- [x] Theme system (hybrid-luxury)
- [x] CSS variables
- [ ] Button component (3 variants)
- [ ] ProductCard component (8 funkcji)
- [ ] Input component
- [ ] Typography utilities

### Homepage Sections ⏳

- [ ] Hero Section
- [ ] Navigation + Mega Menu
- [ ] Collections Section
- [ ] Bestsellers Section (KLUCZOWA)
- [ ] Inspirations Section
- [ ] Social Proof Section
- [ ] Newsletter Section
- [ ] Footer

### Data ⏳

- [ ] products.json (10-12 items)
- [ ] categories.json (4-6 items)
- [ ] testimonials.json (5 items)
- [ ] inspirations.json (2-3 items)

### Integration ⏳

- [ ] app/page.tsx - all sections
- [ ] Framer Motion animations
- [ ] Responsiveness
- [ ] Performance optimization
- [ ] Accessibility
- [ ] SEO

---

## Uwagi Techniczne

### Konwencje CSS

- **Przyciski:** ZAWSZE `rounded-xl` - NIGDY inaczej!
- **Karty:** ZAWSZE `rounded-2xl`
- **Ikony:** ZAWSZE `strokeWidth={1.5}`
- **Złoto (#d4a574):** TYLKO dla CTA, cen, linków, focus states

### Framer Motion Pattern

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {/* content */}
</motion.div>
```

### Product Card Hover Pattern

```tsx
<div className="group">
  <div className="overflow-hidden">
    <img className="transition-transform duration-500 group-hover:scale-105" />
  </div>
  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
    Quick Add
  </button>
</div>
```

---

## Status Realizacji

| Etap                      | Postęp | Status        |
| ------------------------- | ------ | ------------- |
| ETAP 1: Infrastructure    | 40%    | 🟡 W trakcie  |
| ETAP 2: Homepage Sections | 0%     | 🔴 Oczekujące |
| ETAP 3: Mock Data         | 0%     | 🔴 Oczekujące |
| ETAP 4: Integration       | 0%     | 🔴 Oczekujące |
| ETAP 5: Optimization      | 0%     | 🔴 Oczekujące |

**Ogólny postęp:** 8% (infrastructure częściowo gotowa)

---

**Wersja dokumentu:** 1.0.0
**Ostatnia aktualizacja:** 2025-10-15
**Deweloper:** Claude Code + Sonnet 4.5
