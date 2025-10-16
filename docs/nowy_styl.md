# GAWIN‑HOME — Spec Wykonawcza (Dev‑Ready) v2
**Status:** Instrukcja wykonawcza „zero domysłów” — na podstawie: Biblii + Briefu Design‑Only + INSIGHT („Technologiczny Luksus + Ciepły Minimalizm”).  
**Cel:** Deweloper ma zbudować **identyczny styl i układ** (mocki), według poniższych **konkretnych** reguł, wartości i kryteriów akceptacji.

---

## 1) Struktura repo (Next.js App Router)
```
/app
  /home                   # Strona główna v1 (design‑only)
  /products               # Listing v1 (design‑only)
  /products/[slug]        # PDP v1 (design‑only)
  /cart                   # Koszyk v1 (design‑only)
  /checkout               # Checkout (3 kroki, design‑only)
/components
  /ui     # Button, Input, Textarea, Badge, IconButton, Accordion, Chip
  /cards  # ProductCard, CategoryCard, SpecCard
  /layout # Header, Footer, Container, Section
  /composite # Hero, ValueProps, Bestsellers, Lookbook, DarkProductBlock, Newsletter
/mock     # hero.json, categories.json, products.json, value-props.json, lookbook.json
/motion   # presets.ts (fadeInUp, stagger, parallax)
app/globals.css
/tailwind.config.ts
/README.md
```

---

## 2) Design Tokens (KANON) — wartości **dokładne**
> Źródło prawdy: `app/globals.css`. W komponentach korzystamy wyłącznie z tych zmiennych **lub** aliasów Tailwind `brand-*`.

### 2.1 Kolory (OKLCH + aliasy)
```css
:root {
  /* Dark / Elegancki */
  --color-dark-bg: oklch(0.11 0 0);       /* #1A1A1A */
  --color-dark-surface: oklch(0.15 0 0);  /* #252525 */
  --color-text-light: oklch(0.98 0 0);    /* #FAFAF9 */
  --color-text-muted: oklch(0.63 0 0);    /* #A0A0A0 */

  /* Light / Showroom */
  --color-light-bg: oklch(1 0 0);         /* #FFFFFF */
  --color-cream-bg: oklch(0.98 0 0);      /* #FAFAF9 */  /* brand-cream */
  --color-sand-bg:  oklch(0.97 0 0);      /* #F5F5F5 */  /* brand-sand  */
  --color-border-light: oklch(0.90 0 0);  /* #E5E7EB */  /* neutral-200 */
  --color-text-dark: oklch(0.11 0 0);     /* #1A1A1A */
  --color-text-gray: oklch(0.40 0 0);     /* #666666 */

  /* Accents */
  --color-gold:   oklch(0.78 0.11 85);    /* #D4A574 */  /* brand-gold   */
  --color-copper: oklch(0.72 0.10 85);    /* #B8956A */  /* brand-copper */
}
```
**Alias Tailwind (wymagane):** `brand-cream: #FAFAF9`, `brand-sand: #F5F5F5`, `brand-charcoal: #1A1A1A`, `brand-gold: #D4A574`, `brand-copper: #B8956A`, `neutral-200: #E5E7EB`.

**Reguły niepodważalne:**
- Złoto/miedź **tylko** CTA, focus, mikroakcent (ikony, badge).  
- Duże powierzchnie zawsze neutralne (cream/sand/charcoal).

### 2.2 Typografia (rozmiary i tracking)
- **Display (Space Grotesk):**  
  - Hero: `text-[clamp(40px,7vw,92px)]`, `font-bold`, `tracking-[-0.02em]`.  
  - Dekor tła: `text-[min(18vw,240px)]`, `opacity: 0.05`, `pointer-events-none`.
- **H1:** `text-[clamp(32px,4vw,56px)]`, `font-bold`  
- **H2:** `text-[clamp(28px,3vw,44px)]`, `font-bold`  
- **H3:** `text-[clamp(20px,2vw,28px)]`, `font-semibold`  
- **Body (Geist Sans):** `text-base md:text-lg`, `leading-relaxed`  
- **Label/Chips:** `text-sm uppercase tracking-wider font-medium`

### 2.3 Spacing i radius
- **Sekcje:** `py-20 md:py-32` (obowiązkowe).  
- **Padding kart:** `p-10 md:p-16`.  
- **Grid gutters:** `gap-8 md:gap-12`.  
- **Radius:** przyciski `rounded-xl (1.5rem)`, karty `rounded-2xl (2rem)`, inputy `rounded-lg (1rem)`.

### 2.4 Cienie i tekstury
- **Cień bazowy kart:** `shadow-[0_8px_30px_rgba(0,0,0,0.05)]` (≈ Tailwind `shadow-lg`).  
- **Hover:** `shadow-xl`.  
- **Noise na ciemnym:** `.noise-dark { background-image:url('/noise.png'); opacity:.08; }`.

---

## 3) Komponenty (zachowanie i stany — **dokładnie**)

### 3.1 Button
- **Klasa bazowa:** `inline-flex items-center justify-center rounded-xl px-6 h-12 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 active:scale-95`.
- **Primary (gradient):** `bg-gradient-to-br from-brand-gold to-brand-copper text-white shadow-lg hover:brightness-110 hover:shadow-xl`.
- **Outline:** `border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white`.
- **Ghost:** `hover:bg-black/5`.
- **Z ceną (capsule):** wrapper `inline-flex overflow-hidden rounded-xl shadow-lg` → lewy segment (Primary), prawy segment: `px-4 h-12 flex items-center bg-black/5 text-black/80 font-medium`.

### 3.2 ProductCard
- **Kontener:** `group rounded-2xl bg-white shadow-lg overflow-hidden transition-shadow hover:shadow-xl`.
- **Obraz:** `relative aspect-square` → `<Image fill class="object-cover transition-transform duration-500 group-hover:scale-105"/>`.
- **Ikony akcji:** `absolute right-3 top-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity`.
- **Meta:** nazwa (`text-xl font-semibold`), cena (`text-lg font-bold`), `compareAt` (`line-through text-[--color-text-gray]`).
- **Chips:** `inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm`.

### 3.3 Input/Textarea
- `rounded-lg border border-neutral-200 bg-white text-brand-charcoal h-11 px-4`
- **Focus:** `focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/50` (bez JS).  
- Placeholdery subtelne: `placeholder:text-neutral-500`.

### 3.4 Accordion (FAQ)
- **Item:** `rounded-2xl border border-neutral-200 bg-brand-cream`  
- **Active:** dodaj `border-brand-gold text-brand-gold` do nagłówka, ikonka obraca się `rotate-180` `duration-300`.

### 3.5 Hotspot (PDP)
- **Dot:** `h-6 w-6 rounded-full bg-white/80 backdrop-blur border border-neutral-200 shadow-sm` (`cursor-pointer`).  
- **Tooltip:** `rounded-xl bg-white shadow-xl p-4 max-w-[280px] text-sm` z trójkącikiem pseudo‑elementem.  
- **Pozycjonowanie:** absolutne w kontenerze obrazu; współrzędne procentowe z mocka.

---

## 4) Motion (wartości **konkretne**)
- **Ease global:** `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Fade‑in‑up sekcji:** `duration: 0.5`, `initial: {opacity:0,y:30}`, `whileInView:{opacity:1,y:0}`, `viewport:{once:true,amount:0.2}`.  
- **Stagger list:** kontener `staggerChildren: 0.1`.  
- **Hover media:** `scale: 1.03–1.05`.  
- **Parallax hero:** `translateY` w zakresie `[-3%, 3%]` powiązany ze scroll; **fallback** do fade jeśli `prefers-reduced-motion`.

---

## 5) Home v1 — układ **piksel po pikselu**
1) **Hero (Elegancki)**
- Wrapper: `relative isolate overflow-hidden bg-brand-charcoal text-[--color-text-light] py-24 md:py-40`
- Dekor brand: `h1[aria-hidden]` absolutnie, `text-[min(18vw,240px)] opacity-5% top-[-24px]`
- Grid: 12 kolumn, content `max-w-[1320px] mx-auto px-6`
- Lewa kolumna: Display (Space Grotesk), podtytuł (Geist `text-neutral-300`), chipsy (3 szt.), **CTA capsule**
- Prawa kolumna: render produktu (`aspect-[4/3]`), **2 hotspoty** (pozycje przykładowe: 32%/28%, 68%/62%)

2) **Kolekcje (Showroom)**
- Tło: `bg-brand-sand`, `py-24`
- Grid 3–4 karty `CategoryCard` (min. 6 na cały projekt), obraz z delikatnym zoomem.

3) **Bestsellery (Showroom)**
- Tło: `bg-brand-cream`
- „Karuzela” jako `overflow-x-auto snap-x` (bez JS), 4–6 `ProductCard` (`min-w-[280px] snap-start`)

4) **Value Props (Showroom)**
- 3 kolumny, ikony Lucide `strokeWidth=1.5`, krótkie copy, kapsuły bez obramowań.

5) **Dark Product Block (Elegancki)**
- Tło: `bg-brand-charcoal noise-dark`
- Po lewej render produktu, po prawej `SpecCard` (tabela: wymiary, materiały, gwarancja), CTA outline.

6) **Lookbook (mix)**
- Duży baner `aspect-[16/9]`, overlay copy, CTA outline.

7) **Newsletter**
- Input + CTA primary; checkbox RODO (mock).

8) **Footer (Elegancki)**
- `bg-brand-charcoal`, `text-[--color-text-light]`, typograficzny dekor „GAWIN”.

---

## 6) Mocki danych — **schematy i przykłady**
- **products.json (12+)**
```json
{
  "id": "sofa-aria",
  "slug": "sofa-aria",
  "name": "Sofa ARIA 3‑os.",
  "price": 3499,
  "compareAtPrice": 4299,
  "images": [{"src":"/images/aria-01.jpg","alt":"Sofa ARIA w tkaninie latte"}],
  "fabrics": [{"id":"latte","name":"Latte 12","swatch":"/swatches/latte-12.jpg"}],
  "dimensions": {"w": 220, "h": 88, "d": 95},
  "rating": 4.8,
  "badges": ["nowość","-15%"],
  "tags": ["sofa","moduł"]
}
```
- **categories.json (6+)**: `{ "id":"sofy","slug":"sofy","name":"Sofy","image":{"src":"/images/cat-sofy.jpg","alt":"Sofy"} }`
- **value-props.json (3)**: `[ {"icon":"Truck","title":"Darmowa dostawa od 5000 PLN","desc":"…"}, … ]`
- **hero.json**: `{ "title":"Perfekcja w Twoim domu","subtitle":"Polska precyzja, ręczne wykonanie.", "media":{"type":"image","src":"/images/hero-sofa.jpg"}, "cta":{"label":"Odkryj kolekcję","href":"#"} }`
- **lookbook.json (4+)**: `[ {"id":"1","image":{"src":"/images/look-01.jpg","alt":"Salon w beżach"},"caption":"Salon natural warm"} ]`

---

## 7) A11y, Performance, SEO — **kryteria twarde**
- **Kontrast:** AA dla wszystkich par tekst/tło; body na jasnym dąży do AAA.  
- **Focus:** wszędzie widoczny (`ring-brand-gold`).  
- **Hit area:** min. 44×44 px.  
- **Ruch:** `prefers-reduced-motion` ogranicza animacje do fade.  
- **Budżety (na mockach):** LCP ≤ 1.8s, CLS ≤ 0.03, INP ≤ 200ms, JS ≤ 180kB gzip (home), hero ≤ 220kB (AVIF/WebP).  
- **Schema:** `Product`, `ItemList`, `BreadcrumbList`, `FAQPage` (stub).  
- **Format ceny:** `3 499 zł` (niełamane spacje).

---

## 8) Definition of Done (Design‑Only Sprint)
- [ ] Wszystkie strony z pkt 1 istnieją i budują się bez błędów.  
- [ ] Style, typografia, spacing, radius i motion **zgodne z sekcjami 2–5**.  
- [ ] Mocki danych w `/mock` i importowane statycznie. Brak realnych requestów.  
- [ ] RWD: 360 / 768 / 1280+; hero dekor nie przytłacza mobile.  
- [ ] Focus ring złoty, a11y podstawowe działają.  
- [ ] Lighthouse: **≥ 90 / 90 / 100 / 100** (Performance/Accessibility/Best Practices/SEO) przy mockach.  
- [ ] README: jak uruchomić i gdzie będą podpinane realne dane.

---

## 9) Roadmap wdrożenia (kolejność prac)
1. **Tokens + Tailwind config + globals.css**  
2. **UI atomy:** Button, Input, Chip, IconButton, Accordion  
3. **Karty:** ProductCard, CategoryCard, SpecCard  
4. **Composite:** Hero, ValueProps, Bestsellers (overflow scroll), DarkProductBlock, Lookbook, Newsletter  
5. **Widoki:** Home → Listing → PDP (z hotspotami) → Cart → Checkout  
6. **QA & Budżety:** kontrast, focus, wydajność, Lighthouse, README

---

**Uwaga końcowa:** Styl to **dużo oddechu, miękkie światło, cienkie detale, złoto tylko w interakcji**. Produkt zawsze bohaterem. Każde odstępstwo zgłaszać przed implementacją.

