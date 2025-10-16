# Gawin-Home: Progress Implementacji "Design-Only Sprint"

**Data rozpoczęcia:** 2025-10-16
**Źródło prawdy:** docs/biblia.md + docs/brief.md
**Cel:** Kompletne, wizualne (klikalne) makiety zgodne z "Biblią projektu", ZERO logiki biznesowej

---

## 📊 Status ogólny

- [x] **ANALIZA** - Przeczytanie biblia.md i brief.md
- [ ] **FAZA 1** - Design Tokens & Theming
- [ ] **FAZA 2** - UI Components (Button, Input, ProductCard, CategoryCard)
- [ ] **FAZA 3** - Mock Data (products.json, categories.json, value-props.json, hero.json)
- [ ] **FAZA 4** - Homepage Sections (7 sekcji)
- [ ] **FAZA 5** - Motion & Microinteractions
- [ ] **FAZA 6** - QA & Verification

---

## FAZA 1: Design Tokens & Theming

### 1.1 Kolory OKLCH + aliasy brand-*
- [ ] Zaktualizować `app/globals.css` z pełnymi tokenami OKLCH
- [ ] Dodać aliasy brand-* (brand-charcoal, brand-gold, brand-copper, brand-cream, brand-sand)
- [ ] Zaktualizować `tailwind.config.ts` z mapowaniem kolorów
- [ ] Dodać utility classes (.bg-dark-entry, .bg-light-showroom, .text-gold, .border-gold)
- [ ] Dodać `.noise-dark` dla grain effect (8-12% opacity)

### 1.2 Typografia
- [ ] Sprawdzić czy Geist Sans jest załadowany (--font-geist-sans)
- [ ] Dodać Space Grotesk dla display headings (--font-display)
- [ ] Zaktualizować tailwind.config.ts z fontFamily.sans i fontFamily.display

### 1.3 Zaokrąglenia i cienie
- [ ] Zdefiniować --radius-xl (1.5rem), --radius-2xl (2rem), --radius-lg, --radius-md
- [ ] Sprawdzić shadow-lg i shadow-xl

### 1.4 Spacing
- [ ] Upewnić się że wszystko w wielokrotnościach 8px
- [ ] Sekcje ZAWSZE py-20 md:py-32

---

## FAZA 2: UI Components

### 2.1 Button (shadcn + cva)
- [ ] Wariant **gold** (gradient primary) - bg-gradient-to-br from-brand-gold to-brand-copper
- [ ] Wariant **outline** - border + hover fill
- [ ] Wariant **ghost** - transparent + hover bg-brand-sand
- [ ] Wspólne: rounded-xl, transition-all duration-300, focus-visible:ring-2, active:scale-95
- [ ] Dodać ikony (ArrowRight z przesunięciem translate-x-1 na hover)

### 2.2 Input / Textarea
- [ ] rounded-lg, border-neutral-300
- [ ] Focus: border-brand-gold + ring-2 ring-brand-gold/50
- [ ] Focus glow effect

### 2.3 ProductCard
- [ ] Kontener: group rounded-2xl bg-white shadow-lg hover:shadow-xl
- [ ] Obraz: aspect-square, transition duration-500, group-hover:scale-105
- [ ] Akcje (Heart/Eye): prawy górny róg, opacity-0 group-hover:opacity-100
- [ ] Quick Add: ikona koszyka + "Dodaj do koszyka"
- [ ] Meta: nazwa (h3), opis, cena, compareAtPrice

### 2.4 CategoryCard
- [ ] Kafel ze zdjęciem + overlay tekstu
- [ ] Delikatny zoom on hover (scale-105)
- [ ] rounded-2xl

### 2.5 IconButton
- [ ] Hit area >= 44x44 px
- [ ] aria-label
- [ ] Focus ring gold

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
    {"src": "...", "alt": "..."},
    {"src": "...", "alt": "..."}
  ],
  "fabrics": [
    {"id": "fab_01", "name": "Welur ciemny grafit", "swatch": "#3A3A3A"}
  ],
  "dimensions": {"w": 240, "h": 85, "d": 95, "unit": "cm"},
  "rating": 4.8,
  "reviewCount": 127,
  "badges": ["new", "-15%"],
  "tags": ["sofa", "moduł", "nowoczesny"],
  "category": "Sofy"
}
```

### 3.2 categories.json (min 6)
- [ ] Sofy
- [ ] Stoły
- [ ] Krzesła
- [ ] Oświetlenie
- [ ] Szafy
- [ ] Łóżka

### 3.3 value-props.json
- [ ] Truck - "Darmowa dostawa od 5000 PLN"
- [ ] ShieldCheck - "Bezpieczne płatności i 2 lata gwarancji"
- [ ] HandHeart - "Ręczne wykonanie w Polsce"

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
- [ ] 4-6 zdjęć inspiracji

---

## FAZA 4: Homepage Sections

### Sekcja 1: Hero (Tryb Elegancki - Ciemny)
- [ ] min-h-screen
- [ ] Tło: obraz/wideo + overlay bg-brand-charcoal/70
- [ ] Display h1 (Space Grotesk, text-5xl lg:text-7xl)
- [ ] Podtytuł (text-lg lg:text-xl, text-muted)
- [ ] CTA Primary (Gold gradient)
- [ ] CTA Secondary (Outline) - "Zobacz inspiracje →"
- [ ] Grain effect (.noise-dark)

### Sekcja 2: Prezentacja Kolekcji (Showroom - Jasny)
- [ ] bg-brand-sand
- [ ] py-20 md:py-32
- [ ] H2 "Nasze kolekcje"
- [ ] Siatka 3-4 CategoryCard
- [ ] Karty kllikalne z zoomem obrazu

### Sekcja 3: Bestsellery (Showroom - Jasny)
- [ ] bg-brand-cream
- [ ] py-20 md:py-32
- [ ] H2 "Bestsellery"
- [ ] Karuzela/overflow-scroll 4-5 ProductCard
- [ ] Strzałki nawigacji (opcjonalnie)
- [ ] Drag scroll

### Sekcja 4: Propozycja Wartości (Showroom - Jasny)
- [ ] bg-white
- [ ] py-20 md:py-32
- [ ] H2 "Jakość, na której możesz polegać"
- [ ] Siatka 3 ikon Lucide (strokeWidth 1.5)
- [ ] Truck, ShieldCheck, HandHeart
- [ ] Teksty z value-props.json

### Sekcja 5: Inspiracje / Lookbook (Mix)
- [ ] Duży baner aranżacji
- [ ] Overlay tekstu
- [ ] CTA Secondary (Outline) "Zobacz nasze inspiracje"

### Sekcja 6: Newsletter (Showroom - Jasny)
- [ ] bg-brand-sand
- [ ] py-20 md:py-32
- [ ] H3 "Dołącz do naszego klubu"
- [ ] Input type="email"
- [ ] CTA Primary "Zapisz się"
- [ ] BRAK walidacji (tylko wizualnie)
- [ ] Checkbox RODO (wizualnie)

### Sekcja 7: Footer (Elegancki - Ciemny)
- [ ] bg-brand-charcoal
- [ ] text-light
- [ ] Logo
- [ ] Opis marki
- [ ] Kolumny: Kategorie, Informacje, Obsługa klienta
- [ ] Prawa autorskie

---

## FAZA 5: Motion & Microinteractions

### 5.1 Motion presets (motion/presets.ts)
- [ ] fadeInUp: initial={{opacity:0, y:30}}, whileInView={{opacity:1, y:0}}
- [ ] viewport: {{once:true, amount:0.2}}
- [ ] Stagger: 0.1s w gridach
- [ ] Timings: duration: 0.5, ease: "easeOut"
- [ ] Krzywa bazowa: cubic-bezier(0.2, 0.8, 0.2, 1)

### 5.2 Mikrointerakcje
- [ ] Press effect: active:scale-95 na przyciskach
- [ ] Strzałka → w CTA: translate-x-1 na group-hover
- [ ] Parallax hero: lekki 2-4% (opcjonalnie, z prefers-reduced-motion)
- [ ] Aktywne linki w nawigacji: złote podkreślenie/kropka

### 5.3 A11y motion
- [ ] Respektuj prefers-reduced-motion
- [ ] Redukcja do fade-in bez przesunięć

---

## FAZA 6: QA & Verification

### 6.1 Kryteria akceptacji (Design-Only)
- [ ] Brak błędów kompilacji i ostrzeżeń Tailwind
- [ ] Brak realnych requestów sieciowych
- [ ] Wszystkie widoki dostępne z /home (linki lokalne lub #)
- [ ] Mocki JSON załadowane statycznie (import)
- [ ] Style, typografia, spacing zgodne z Biblią
- [ ] RWD: mobile >= 360px, tablet >= 768px, desktop >= 1280px
- [ ] A11y wizualne: focusy widoczne, ikony z aria-label

### 6.2 Checklist UI/UX
- [ ] Radiusy: przyciski rounded-xl, karty rounded-2xl, formy rounded-lg
- [ ] Sekcje trzymają py-20 md:py-32
- [ ] Złoto tylko dla CTA/akcentów i focusów
- [ ] Hover na kartach: obraz scale-105, ikony akcji fade-in
- [ ] Ikony Lucide strokeWidth=1.5

### 6.3 Checklist A11y
- [ ] Focus ring złoty wszędzie
- [ ] Kontrast AA (AAA dla body)
- [ ] ARIA dla ikon i stanów
- [ ] Obsługa klawiatury (skip to content, ESC, strzałki)
- [ ] Hit areas >= 44x44 px

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

