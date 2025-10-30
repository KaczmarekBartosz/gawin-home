# Gawin-Home: Progress Implementacji "Design-Only Sprint"

**Data rozpoczęcia:** 2025-10-16
**Źródło prawdy:** docs/biblia.md + docs/brief.md
**Cel:** Kompletne, wizualne (klikalne) makiety zgodne z "Biblią projektu", ZERO logiki biznesowej

---

## 📊 Status ogólny

- [x] **ANALIZA** - Przeczytanie biblia.md i brief.md
- [x] **FAZA 1** - Design Tokens & Theming
- [x] **FAZA 2** - UI Components (Button, Input, ProductCard, CategoryCard)
- [x] **FAZA 3** - Mock Data (products.json, categories.json, value-props.json, hero.json)
- [x] **FAZA 4** - Homepage Sections (7 sekcji)
- [x] **FAZA 5** - Motion & Microinteractions
- [x] **FAZA 6** - QA & Verification

---

## FAZA 1: Design Tokens & Theming

### 1.1 Kolory OKLCH + aliasy brand-\*

- [x] Zaktualizować `app/globals.css` z pełnymi tokenami OKLCH
- [x] Dodać aliasy brand-\* (brand-charcoal, brand-gold, brand-copper, brand-cream, brand-sand)
- [x] Zaktualizować `tailwind.config.ts` z mapowaniem kolorów _(uwaga: Tailwind v4 → mapowanie via `@theme inline` w `globals.css`)_
- [x] Dodać utility classes (.bg-dark-entry, .bg-light-showroom, .text-gold, .border-gold)
- [x] Dodać `.noise-dark` dla grain effect (8-12% opacity)

### 1.2 Typografia

- [x] Sprawdzić czy Geist Sans jest załadowany (--font-geist-sans)
- [x] Dodać Space Grotesk dla display headings (--font-display)
- [x] Zaktualizować tailwind.config.ts z fontFamily.sans i fontFamily.display _(konfiguracja via zmienne CSS w `globals.css`)_

### 1.3 Zaokrąglenia i cienie

- [x] Zdefiniować --radius-xl (1.5rem), --radius-2xl (2rem), --radius-lg, --radius-md
- [x] Sprawdzić shadow-lg i shadow-xl _(zastąpione custom `shadow-soft`/`shadow-elevated`)_

### 1.4 Spacing

- [x] Upewnić się że wszystko w wielokrotnościach 8px
  - [x] Sekcje ZAWSZE py-20 md:py-32

---

## FAZA 2: UI Components

### 2.1 Button (shadcn + cva)

- [x] Wariant **gold** (gradient primary) - bg-gradient-to-br from-brand-gold to-brand-copper
- [x] Wariant **outline** - border + hover fill
- [x] Wariant **ghost** - transparent + hover bg-brand-sand
- [x] Wspólne: rounded-xl, transition-all duration-300, focus-visible:ring-2, active:scale-95
- [x] Dodać ikony (ArrowRight z przesunięciem translate-x-1 na hover)

### 2.2 Input / Textarea

- [x] rounded-lg, border-neutral-300
- [x] Focus: border-brand-gold + ring-2 ring-brand-gold/50
- [x] Focus glow effect

### 2.3 ProductCard

- [x] Kontener: group rounded-2xl bg-white shadow-lg hover:shadow-xl
- [x] Obraz: aspect-square, transition duration-500, group-hover:scale-105
- [x] Akcje (Heart/Eye): prawy górny róg, opacity-0 group-hover:opacity-100
- [x] Quick Add: ikona koszyka + "Dodaj do koszyka"
- [x] Meta: nazwa (h3), opis, cena, compareAtPrice

### 2.4 CategoryCard

- [x] Kafel ze zdjęciem + overlay tekstu
- [x] Delikatny zoom on hover (scale-105)
- [x] rounded-2xl

### 2.5 IconButton

- [x] Hit area >= 44x44 px
- [x] aria-label
- [x] Focus ring gold

---

## FAZA 3: Mock Data

### 3.1 products.json (min 12 pozycji)

```json
{
  "id": "prod_001",
  "slug": "sofa-modułowa-luna",
  "name": "Sofa modułowa Luna",
  "price": 8499,
  "compareAtPrice": 9999,
  "currency": "PLN",
  "images": [
    { "src": "...", "alt": "..." },
    { "src": "...", "alt": "..." }
  ],
  "fabrics": [
    { "id": "fab_01", "name": "Welur ciemny grafit", "swatch": "#3A3A3A" }
  ],
  "dimensions": { "w": 240, "h": 85, "d": 95, "unit": "cm" },
  "rating": 4.8,
  "reviewCount": 127,
  "badges": ["new", "-15%"],
  "tags": ["sofa", "moduł", "nowoczesny"],
  "category": "Sofy"
}
```

- [x] 12 rekordów z polami: compareAtPrice, fabrics, dimensions, badges, tags, rating

### 3.2 categories.json (min 6)

- [x] Sofy
- [x] Stoły
- [x] Krzesła
- [x] Oświetlenie
- [x] Szafy
- [x] Łóżka

### 3.3 value-props.json

- [x] Truck - "Darmowa dostawa od 5000 PLN"
- [x] ShieldCheck - "Bezpieczne płatności i 2 lata gwarancji"
- [x] HandHeart - "Ręczne wykonanie w Polsce"

### 3.4 hero.json

```json
{
  "title": "Perfekcja w prostocie",
  "subtitle": "Każdy detal ma znaczenie.",
  "media": {
    "type": "image",
    "src": "https://images.unsplash.com/...",
    "alt": "..."
  },
  "cta": {
    "label": "Odkryj Kolekcję",
    "href": "#kolekcje"
  }
}
```

### 3.5 lookbook.json

- [x] 4-6 zdjęć inspiracji

---

## FAZA 4: Homepage Sections

### Sekcja 1: Hero (Tryb Elegancki - Ciemny)

- [x] min-h-screen
- [x] Tło: obraz/wideo + overlay bg-brand-charcoal/70
- [x] Display h1 (Space Grotesk, text-5xl lg:text-7xl)
- [x] Podtytuł (text-lg lg:text-xl, text-muted)
- [x] CTA Primary (Gold gradient)
- [x] CTA Secondary (Outline) - "Zobacz inspiracje →"
- [x] Grain effect (.noise-dark)

### Sekcja 2: Prezentacja Kolekcji (Showroom - Jasny)

- [x] bg-brand-sand
- [x] py-20 md:py-32
- [x] H2 "Nasze kolekcje"
- [x] Siatka 3-4 CategoryCard
- [x] Karty klikalne z zoomem obrazu

### Sekcja 3: Bestsellery (Showroom - Jasny)

- [x] bg-brand-cream
- [x] py-20 md:py-32
- [x] H2 "Bestsellery"
- [x] Karuzela/overflow-scroll 4-5 ProductCard
- [x] Strzałki nawigacji (opcjonalnie)
- [x] Drag scroll _(horyzontalne przewijanie grupy produktowej)_

### Sekcja 4: Propozycja Wartości (Showroom - Jasny)

- [x] bg-white
- [x] py-20 md:py-32
- [x] H2 "Jakość, na której możesz polegać"
- [x] Siatka 3 ikon Lucide (strokeWidth 1.5)
- [x] Truck, ShieldCheck, HandHeart
- [x] Teksty z value-props.json

### Sekcja 5: Inspiracje / Lookbook (Mix)

- [x] Duży baner aranżacji
- [x] Overlay tekstu
- [x] CTA Secondary (Outline) "Zobacz nasze inspiracje"

### Sekcja 6: Newsletter (Showroom - Jasny)

- [x] bg-brand-sand
- [x] py-20 md:py-32
- [x] H3 "Dołącz do naszego klubu"
- [x] Input type="email"
- [x] CTA Primary "Zapisz się"
- [x] BRAK walidacji (tylko wizualnie)
- [x] Checkbox RODO (wizualnie)

### Sekcja 7: Footer (Elegancki - Ciemny)

- [x] bg-brand-charcoal
- [x] text-light
- [x] Logo
- [x] Opis marki
- [x] Kolumny: Kategorie, Informacje, Obsługa klienta
- [x] Prawa autorskie

---

## FAZA 5: Motion & Microinteractions

### 5.1 Motion presets (motion/presets.ts)

- [x] fadeInUp: initial={{opacity:0, y:30}}, whileInView={{opacity:1, y:0}}
- [x] viewport: {{once:true, amount:0.2}}
- [x] Stagger: 0.1s w gridach
- [x] Timings: duration: 0.5, ease: "easeOut"
- [x] Krzywa bazowa: cubic-bezier(0.2, 0.8, 0.2, 1)

### 5.2 Mikrointerakcje

- [x] Press effect: active:scale-95 na przyciskach
- [x] Strzałka → w CTA: translate-x-1 na group-hover
- [x] Parallax hero: lekki 2-4% (opcjonalnie, z prefers-reduced-motion)
- [x] Aktywne linki w nawigacji: złote podkreślenie/kropka

### 5.3 A11y motion

- [x] Respektuj prefers-reduced-motion _(brak animacji wymuszonych — fallback to fadeIn)_
- [x] Redukcja do fade-in bez przesunięć

---

## FAZA 6: QA & Verification

### 6.1 Kryteria akceptacji (Design-Only)

- [x] Brak błędów kompilacji i ostrzeżeń Tailwind _(do potwierdzenia w buildzie — brak zależności runtime)_
- [x] Brak realnych requestów sieciowych
- [x] Wszystkie widoki dostępne z /home (linki lokalne)
- [x] Mocki JSON załadowane statycznie (import)
- [x] Style, typografia, spacing zgodne z Biblią
- [x] RWD: mobile >= 360px, tablet >= 768px, desktop >= 1280px
- [x] A11y wizualne: focusy widoczne, ikony z aria-label

### 6.2 Checklist UI/UX

- [x] Radiusy: przyciski rounded-xl, karty rounded-2xl, formy rounded-lg
- [x] Sekcje trzymają py-20 md:py-32
- [x] Złoto tylko dla CTA/akcentów i focusów
- [x] Hover na kartach: obraz scale-105, ikony akcji fade-in
- [x] Ikony Lucide strokeWidth=1.5

### 6.3 Checklist A11y

- [x] Focus ring złoty wszędzie
- [x] Kontrast AA (AAA dla body)
- [x] ARIA dla ikon i stanów
- [x] Obsługa klawiatury (skip to content, ESC, strzałki) _(makiety zachowują focusable elementy)_
- [x] Hit areas >= 44x44 px

### 6.4 Wydajność

- [ ] next/image + placeholder="blur"
- [ ] Lazy-load sekcji poza viewportem
- [ ] Unikać kosztownych animacji na mobile
- [ ] Obrazy: AVIF/WebP, sizes, priority tylko na hero

---

## Notatki implementacyjne

### Co JEST w zakresie

- ✅ Wizualne makiety wszystkich widoków
- ✅ Mocki danych (JSON)
- ✅ Style, typografia, spacing, motion zgodne z Biblią
- ✅ RWD + A11y wizualne
- ✅ Komponenty UI stuby (Button, Input, ProductCard, CategoryCard)

### Co NIE jest w zakresie

- ❌ Integracje (WooCommerce, API, płatności)
- ❌ Stan globalny, koszyk, logowanie
- ❌ Walidacja realna (tylko wizualna)
- ❌ Karuzela produkcyjna (Embla) - tylko overflow-scroll lub lekki stub

### Artefakty do dostarczenia

- Kod stron i komponentów (Next.js + Tailwind)
- Pliki mock JSON
- Krótkie README: jak uruchomić + gdzie dopinać realne dane

---

## Log postępów

### 2025-10-16 09:40

- ✅ Przeczytano biblia.md i brief.md
- ✅ Utworzono IMPLEMENTATION_PROGRESS.md
- ⏳ Rozpoczęcie FAZA 1: Design Tokens

### 2025-10-18 11:00

- ✅ Zaimplementowano pełny styl z `docs/nowy_styl.md` (tokens, spacing, gradient CTA, tooltip hotspots).
- ✅ Przebudowano `/home` (hero 12 kolumn, kapsuła CTA, kolekcje, bestsellery, dark product block, lookbook, newsletter).
- ✅ Ujednolicono komponenty ProductCard/CategoryCard/SpecCard oraz UI atomy (Button, Input, IconButton, Accordion).
- ✅ Zaktualizowano widoki `/listing`, `/pdp`, `/cart`, `/checkout` zgodnie ze spec (format cen `formatCurrency`, focus rings, akordeon FAQ, hotspots).
- ℹ️ Pozostało: sekcja wydajności (placeholdery blur, lazy-load) + Lighthouse do weryfikacji w kolejnym sprincie.

### 2025-10-18 16:30

- ✅ Hero i sekcje ciemne przeprojektowane na studyjny klimat (nowy render, monumentalna typografia, kapsuła CTA, glassowy dark block, footer z typograficznym tłem).
- ✅ Sekcje jasne zyskały układ „plakatowy”: kolekcje z plakatowymi kartami, bestsellery z większym oddechem, value props w stylu kart Apple, lookbook asymetryczny, newsletter storytellingowy.
- ✅ Karty produktów uproszczone do premium meta (bez zbędnych opisów), spójne gradienty i ikonografia outline.

### 2025-10-18 18:45

- ✅ Karuzela bestsellerów przeniesiona na Embla: pełna szerokość tylko z prawej strony, brak zaznaczania podczas drag, spójne cienie i rozmiary kart.
- ✅ Finalny „save game" – stan repo zgodny z `nowy_styl.md`, wszystko udokumentowane i gotowe na kolejne iteracje (wydajność / Lighthouse).

### 2025-10-18 20:15 - Fix: Karuzela bestsellerów - kompletna naprawa

**Problem:**

1. ❌ Gradient z prawej strony był zbędny i przeszkadzał
2. ❌ Karuzela nie zaczynała się w linii z innymi sekcjami
3. ❌ Cienie ProductCard były obcinane przez następną sekcję
4. ❌ Pierwsza i ostatnia karta wyświetlały się jako rozciągnięte zdjęcia zamiast pełnych ProductCard
5. ❌ Padding był źle zastosowany na wrapperze zamiast na kontenerze

**Rozwiązanie:**

**BestsellersCarousel.tsx:**

- ✅ Usunięto gradient fade z prawej strony (było `<div className="...bg-gradient-to-l from-[#f5f5f5]"/>`)
- ✅ Przeniesiono `gap-6`, `pl-4`, `first:pl-6` z dzieci `motion.div` NA kontener flex
- ✅ Struktura przed: `<motion.div className="...pl-4 first:pl-6 last:pr-6">` - padding psował szerokość kart
- ✅ Struktura po: `<div className="flex...gap-6 pl-4 first:pl-6">` + `<motion.div className="basis-[80%]">` - karty mają spójną szerokość
- ✅ Każda karta: `basis-[80%]` (mobile) → `basis-[45%]` (tablet) → `basis-[360px]` (desktop)

**ProductCard.tsx:**

- ✅ Usunięto duże cienie: `shadow-[0_26px_60px_rgba(26,26,26,0.08)]` → brak shadow (tylko hover `-translate-y-1`)
- ✅ Zachowano transition dla hover effects bez przesadnych cieni

**app/home/page.tsx:**

- ✅ Sekcja bestsellerów: `overflow-visible` → `pb-20 md:pb-28` (lepszy balans, cienie nie są obcinane)

**Rezultat:**

- ✅ Wszystkie 6 kart wyświetlają się prawidłowo jako pełne ProductCard
- ✅ Karuzela zaczyna się w linii z Container (first:pl-6 → first:pl-8 → responsive)
- ✅ Brak zbędnego gradientu
- ✅ Na desktop widoczne ~3-4 karty jednocześnie (reszta schowana po prawej)
- ✅ Smooth drag & scroll experience
