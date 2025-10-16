# Gawin‑Home — Hybrydowy Design: wytyczne dla webdeva (v1)

**Projekt:** Gawin‑Home  
**Styl:** „Hybrydowy” — połączenie elegancji i minimalizmu  
**Motto:** _„Perfekcja w prostocie. Każdy detal ma znaczenie.”_

---

## 0) Zasada nadrzędna

Budujemy **cyfrowe doświadczenie**, nie tylko stronę. Interfejs ma pracować na emocje (prestiż) i konwersję (czytelność, skupienie na produkcie). Hybryda dwóch równoprawnych trybów:

- **Tryb „Elegancki” (Ciemny)** — _Dark Entry_  
  Stosowanie: homepage (Hero, sekcje otwierające), kluczowe banery, stopka.  
  Cel: pierwsze, mocne wrażenie premium.

- **Tryb „Showroom” (Jasny)** — _Light Product Focus_  
  Stosowanie: listingi, karty produktu, checkout, blog.  
  Cel: maksymalna czytelność, zero rozpraszaczy.

---

## 1) Design Tokens (niezmienne)

Wszystkie komponenty **MUSZĄ** bazować na tokenach zdefiniowanych w `:root` (`globals.css`). Kolor w przestrzeni **OKLCH** (perceptual).

### 1.1 Paleta kolorów (OKLCH)

```css
/* globals.css */
@layer base {
  :root {
    /* === DARK / Elegant === */
    --color-dark-bg: oklch(0.11 0 0); /* #1a1a1a */
    --color-dark-surface: oklch(0.15 0 0); /* #252525 */
    --color-text-light: oklch(0.96 0 0); /* #f5f5f5 */
    --color-text-muted: oklch(0.63 0 0); /* #a0a0a0 */

    /* === LIGHT / Showroom === */
    --color-light-bg: oklch(1 0 0); /* #ffffff */
    --color-cream-bg: oklch(0.97 0.005 85); /* #f5f5f0 */
    --color-light-surface: oklch(0.98 0 0); /* #fafafa */
    --color-border-light: oklch(0.9 0 0); /* #e5e5e5 */
    --color-text-dark: oklch(0.11 0 0); /* #1a1a1a */
    --color-text-gray: oklch(0.4 0 0); /* #666666 */

    /* === ACCENTS === */
    --color-gold-primary: oklch(0.75 0.12 85); /* #d4af37 */
    --color-gold-hover: oklch(0.68 0.12 85); /* #c19b2b */

    /* === SEMANTICS / Tailwind map (opcjonalnie) === */
    --color-background: var(--color-light-bg);
    --color-foreground: var(--color-text-dark);
    --color-primary: var(--color-gold-primary);
    --color-ring: var(--color-gold-primary);
  }
}

@layer utilities {
  .bg-dark-entry {
    background-color: var(--color-dark-bg);
  }
  .bg-light-showroom {
    background-color: var(--color-light-bg);
  }
  .text-gold {
    color: var(--color-gold-primary);
  }
  .border-gold {
    border-color: var(--color-gold-primary);
  }
}
```

### 1.2 Typografia

- **Font UI/Body:** `Geist Sans` (zmienna `--font-geist-sans`).
- **Font Display (nagłówki):** `Space Grotesk` (zmienna `--font-display`).

**Skala / Hierarchia** _(Tailwind sugerowane)_

- **Hero (h1):** `font-display` · `text-5xl`→`text-8xl` · `font-bold` · `tracking-tight`
- **Section Title (h2):** `font-display` · `text-3xl`→`text-4xl` · `font-bold`
- **Card/Module Title (h3):** `font-sans` · `text-xl`→`text-2xl` · `font-semibold`
- **Body:** `font-sans` · `text-base`/`text-lg` · `leading-relaxed`

### 1.3 Spacing (siatka 8px)

- Wszystko w wielokrotnościach **8 px**.
- **Wnętrza komponentów:** `p-2` (16px), `p-4` (32px), `p-6` (48px) itd.
- **Między sekcjami (globalny rytm):** `py-20 md:py-32` **obowiązkowo**.

### 1.4 Zaokrąglenia (radius)

```css
:root {
  --radius-xl: 1.5rem; /* przyciski główne */
  --radius-2xl: 2rem; /* duże kontenery, karty, banery */
  --radius-lg: 1rem; /* pola formularzy, mniejsze CTAs */
  --radius-md: 0.75rem; /* tagi, badge */
}
```

Tailwind: `rounded-xl` (primary), `rounded-2xl` (karty/banery), `rounded-lg`, `rounded-md`.

---

## 2) Komponenty kluczowe (specyfikacja)

### 2.1 `<Button />`

**Warianty:**

- **primary / "Gold"** — tło `--color-gold-primary`, tekst `--color-dark-bg`, `hover:bg-[--color-gold-hover]`, `rounded-xl`, subtelny cień.
- **secondary / "Outline"** — `bg-transparent` · `border` `--color-gold-primary` · tekst w złocie; `hover:` wypełnienie złotem + tekst czarny.
- **ghost / link** — nawigacja pomocnicza.

**Interakcje:**

- `transition-all duration-300 ease-in-out`
- `active:scale-95` (subtelny „press”)
- Focus ring w kolorze złota: `ring-2 ring-[--color-gold-primary] ring-offset-2`

**Przykład (shadcn/cva — skrót):**

```ts
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        gold: "bg-[--color-gold-primary] text-[--color-dark-bg] hover:bg-[--color-gold-hover]",
        outline:
          "border border-[--color-gold-primary] text-[--color-gold-primary] hover:bg-[--color-gold-primary] hover:text-[--color-dark-bg]",
        ghost: "hover:bg-black/5",
      },
      size: {
        sm: "h-9 px-3 rounded-lg",
        md: "h-11 px-6",
        lg: "h-12 px-8 rounded-2xl",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);
```

### 2.2 `<ProductCard />`

**Kontener:** `rounded-2xl` · tło `--color-light-bg` · cień `shadow-lg` (rozproszony).  
**Obraz:** `aspect-square` · `overflow-hidden` · na hover całej karty (`group`): obraz skaluje do **105%** (`duration-500`).  
**Akcje:** w prawym górnym rogu, fade‑in przy hoverze karty: ikony **Heart** i **Eye** (podgląd).  
**Meta:** nazwa (h3), krótki opis (opcjonalnie), cena z ewentualnym `compareAt`.

**Szkic JSX (skrót):**

```tsx
<Card className="group rounded-2xl bg-[--color-light-bg] shadow-lg">
  <div className="relative aspect-square overflow-hidden rounded-2xl">
    <Image ... className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
    <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
      <IconButton aria-label="Dodaj do ulubionych"><Heart /></IconButton>
      <IconButton aria-label="Szybki podgląd"><Eye /></IconButton>
    </div>
  </div>
  <div className="p-4">
    <h3 className="text-xl font-semibold">Nazwa produktu</h3>
    <p className="mt-1 text-sm text-[--color-text-gray]">Krótki opis…</p>
    <div className="mt-3 flex items-center gap-2">
      <span className="text-lg font-bold">3 499 zł</span>
      <span className="text-sm text-[--color-text-gray] line-through">4 299 zł</span>
    </div>
  </div>
</Card>
```

### 2.3 `<Input />` (formularze)

- Minimalistyczny: `bg-[--color-light-surface]` · `border` `--color-border-light` · `rounded-lg`.
- **Focus premium:** ramka płynnie na `--color-gold-primary` + delikatny _glow_ (`shadow-[0_0_0_4px_rgba(212,175,55,0.15)]`).

```css
/* globals.css — przykład focus */
input:focus {
  outline: none;
  border-color: var(--color-gold-primary);
  box-shadow: 0 0 0 4px
    color-mix(in oklab, var(--color-gold-primary) 20%, transparent);
}
```

---

## 3) Animacje i mikrointerakcje

**Zasada:** elegancko, nie nachalnie.

- **Płynność globalna:** `transition-all duration-300 ease-in-out` na przyciskach, linkach, kartach.
- **Wejście on‑scroll (Framer Motion):**
  ```tsx
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  ```
- **Strzałka w CTA:** w przyciskach „→” przesuwa się o `translate-x-1` przy `group-hover`.
- **Nawigacja (active state):** złota kropka/podkreślenie pod aktywnym linkiem.
- **Respect reduced motion:** jeśli `prefers-reduced-motion`, animacje wygaszone do `opacity` only.

---

## 4) Zastosowanie trybów (routing/styling)

- **Homepage, hero, stopka, banery:** klasa tematyczna _dark entry_.  
  Przykład: wrapper strony głównej z `.bg-dark-entry text-[--color-text-light]`, karty na `--color-dark-surface` z akcentami złota.
- **Produkty, listing, PDP, koszyk/checkout, blog:** _light showroom_ (`bg-[--color-light-bg]`, treść na `--color-text-dark]`, subtelne `--color-border-light`).
- **Spójność akcentów:** złoto jako jedyny mocny kolor akcji (CTA, linki aktywne, focus ringi). Nie nadużywać.

---

## 5) Siatki, spacing i rytm pionowy

- Każda sekcja: **`py-20 md:py-32`**.
- Siatki: 12‑kolumnowa dla desktopu, 6 dla tabletów, 4/2 dla mobile; karty produktów w responsywnym `grid`/`auto-fit` z `minmax(280px, 1fr)`.
- Oddech wokół obrazów — „galeria sztuki”, nie magazyn.

---

## 6) Dostępność (A11y) i UX

- **Kontrast:** tekst do tła ≥ WCAG AA. Złoto na białym — używać oszczędnie (napisy w gold tylko na ciemnym lub jako accent na linkach/ikonach).
- **Focus states:** zawsze widoczne (gold ring), nie usuwać outlines bez zamiany.
- **Hit areas:** min. 44×44 px.
- **ARIA:** ikony akcji z `aria-label`.
- **Klawiatura:** pełna tabulacja (menu, modal, quick‑view).
- **Formy:** czytelne etykiety, stany błędów i podpowiedzi.

---

## 7) Wzorce dla kluczowych widoków

### 7.1 Homepage (Dark Entry)

- **Hero:** tło wideo/obraz (50–60% wysokości viewportu), overlay gradient, nagłówek z `Space Grotesk`, złoty akcent w tekście (`bg-clip-text`).
- **Featured:** 4–8 kart w `grid`, badge („Nowość”, „-15%”) jako `rounded-md` z delikatnym kontrastem.
- **Kategorie:** kafle z overlayem i strzałką przesuwającą się o `1–1.5ch`.
- **Newsletter:** karta na ciemnym z delikatnym blur‑tłem i ikoną.

### 7.2 Listing produktów (Light Showroom)

- **Filtry w sidebarze** (Accordion): kategoria, cena (range), materiały/kolor.
- **Sortowanie:** cena / nowość / popularność.
- **Paginacja** lub **infinite scroll** (progresywny).
- **Empty state:** „Brak wyników” z sugestiami filtrów.

### 7.3 Karta produktu (PDP)

- **Galeria:** miniatury + zoom; `aspect-square`.
- **Info blok:** nazwa, krótki opis, cena + warianty (radio chips), CTA.
- **Specyfikacja:** tabela (wymiary, materiały).
- **Powiązane produkty:** 4–6 elementów w karuzeli.
- **Trust:** ikony dostawy/zwrotów/gwarancji (złoto jako akcent ikon).

### 7.4 Checkout (Light)

- **Form wieloetapowy:** wysyłka → płatność → podsumowanie.
- **Walidacja Zod/RHF:** stany błędów jasno opisane.
- **Przyciski:** „Dalej” złoty, „Wstecz” outline.

---

## 8) Mikrocopy & ton komunikacji

- Krótko, rzeczowo, bez marketingowego przeładowania.
- Na dark entry można pozwolić sobie na odrobinę „luksusu” w słowach, ale zachować **prostotę**.
- CTA: „Zobacz kolekcję”, „Dodaj do koszyka”, „Przejdź do płatności”.

---

## 9) Implementacja (Next.js + Tailwind + shadcn)

- **Fonts:** w `layout.tsx` załaduj `Geist` i `Space Grotesk` do zmiennych `--font-geist-sans`, `--font-display`; przypisz do Tailwinda (`fontFamily.sans/display`).
- **Tokens:** sekcja 1.1 jako jedyne źródło prawdy; nie wpisujemy kolorów „na dziko”.
- **Button:** domyślnie `rounded-xl`; wariant `gold` i `outline` jak w spec.
- **Utilsy:** `cn()`, `formatPrice()` (PLN) gotowe do użycia.
- **Framer Motion:** helpers dla „fade-in-up” + `viewport.once`.

---

## 10) Kontrola jakości (checklisty)

**UI/UX**

- [ ] Spójne radiusy: przyciski `rounded-xl`, karty `rounded-2xl`.
- [ ] Sekcje trzymają `py-20 md:py-32`.
- [ ] Złoto tylko dla CTA/akcentów i focusów.
- [ ] Hover na kartach: obraz 105%, ikony akcji fade‑in.

**A11y**

- [ ] Focus ring złoty wszędzie.
- [ ] Kontrast AA.
- [ ] ARIA dla ikon i stanów.
- [ ] Obsługa klawiatury (modale, menu, quick‑view).

**Wydajność**

- [ ] Obrazy `next/image` + placeholder blur.
- [ ] Lazy‑load karuzel i sekcji off‑screen.
- [ ] Bez zbędnych animacji na mobile.

---

## 11) Przykładowe klasy Tailwind (ściąga)

- **Dark Entry tła:** `bg-[--color-dark-bg] text-[--color-text-light]`
- **Light Showroom tła:** `bg-[--color-light-bg] text-[--color-text-dark]`
- **Obramowania:** `border border-[--color-border-light]`
- **CTA Gold:** `bg-[--color-gold-primary] hover:bg-[--color-gold-hover] text-[--color-dark-bg]`
- **Focus:** `focus:outline-none focus:ring-2 focus:ring-[--color-gold-primary] focus:ring-offset-2`

---

## 12) Finalna wskazówka dla developera

Myśl jak **rzemieślnik**. Każdy piksel, każdy easing, każdy odstęp ma znaczenie. Ten dokument to plan — **trzymaj się go bezkompromisowo**, a zbudujemy produkt klasy światowej, nie „kolejny sklep”.

---

# BIBLIA PROJEKTU — Kompletny dokument dla Frontendu (v2)

**Do:** Deweloper Frontend  
**Od:** NicoN & GeminiAI  
**Projekt:** Gawin‑Home  
**Filozofia:** _„Perfekcja w prostocie. Każdy detal ma znaczenie.”_  
**Status:** To jest **jedyne źródło prawdy** dla designu, architektury i UX. Wszelkie rozbieżności rozstrzygaj na korzyść tego dokumentu.

---

## Część 1 — Specyfikacja Techniczna „Stylu Hybrydowego” (ultra‑szczegółowa)

### 1) Filozofia i zastosowanie trybów

- **Tryb „Elegancki” (ciemny)**: budowanie prestiżu i pierwszego wrażenia.  
  **Zastosowanie:** Hero na stronie głównej, kluczowe banery, stopka.
- **Tryb „Showroom” (jasny)**: maksymalny fokus na produkt, zero rozpraszaczy.  
  **Zastosowanie:** listingi, karty produktu (PDP), checkout, większość sekcji treściowych.

> **Reguła:** Sekcje „emocjonalne” → Elegancki. Sekcje „transakcyjne i informacyjne” → Showroom.

### 2) Design Tokens (CSS OKLCH + mapowanie Tailwind)

Tokeny są **nienaruszalne**. Źródło prawdy w `app/globals.css`. Tailwind korzysta z aliasów kolorów poprzez `tailwind.config.ts`.

#### 2.1 Kolory (OKLCH kanonicznie) + aliasy „brand-\*” (HEX)

```css
/* app/globals.css */
@layer base {
  :root {
    /* === DARK / Elegant === */
    --color-dark-bg: oklch(0.11 0 0); /* ≈ #1A1A1A | alias: --brand-charcoal */
    --color-dark-surface: oklch(0.15 0 0); /* ≈ #252525 */
    --color-text-light: oklch(0.96 0 0); /* ≈ #FAFAF9 */
    --color-text-muted: oklch(0.63 0 0); /* ≈ #A0A0A0 */

    /* === LIGHT / Showroom === */
    --color-light-bg: oklch(1 0 0); /* #FFFFFF */
    --color-cream-bg: oklch(0.98 0 0); /* ≈ #FAFAF9 | alias: --brand-cream */
    --color-sand-bg: oklch(0.97 0 0); /* ≈ #F5F5F5 | alias: --brand-sand */
    --color-border-light: oklch(
      0.9 0 0
    ); /* ≈ #E5E7EB | alias: --neutral-border */
    --color-text-dark: oklch(0.11 0 0); /* #1A1A1A */
    --color-text-gray: oklch(0.4 0 0); /* #666666 */

    /* === ACCENTS === */
    --color-gold-primary: oklch(
      0.75 0.12 85
    ); /* ≈ #D4A574 | alias: --brand-gold */
    --color-gold-hover: oklch(
      0.7 0.12 85
    ); /* ≈ #B8956A | alias: --brand-copper */
  }
}
```

**Mapowanie Tailwind (`tailwind.config.ts`)**

```ts
// tailwind.config.ts — fragment
export default {
  theme: {
    extend: {
      colors: {
        "brand-cream": "#FAFAF9",
        "brand-sand": "#F5F5F5",
        "brand-charcoal": "#1A1A1A",
        "brand-gold": "#D4A574",
        "brand-copper": "#B8956A",
        "neutral-200": "#E5E7EB",
      },
      borderColor: { "neutral-200": "#E5E7EB" },
    },
  },
};
```

> **Zasada:** w komponentach używaj zmiennych CSS (`var(--color-*)`) albo aliasów `brand-*`. Nie wpisujemy kolorów „na twardo”.

#### 2.2 Typografia (Geist Sans + Space Grotesk)

- **Body/UI:** Geist Sans (zmienna `--font-geist-sans`).
- **Display (nagłówki główne):** Space Grotesk (zmienna `--font-display`).

**Skala i klasy Tailwind**
| Element | Klasy Tailwind | Zastosowanie |
|---|---|---|
| **Display (Hero)** | `text-5xl lg:text-7xl font-bold tracking-tighter font-[var(--font-display)]` | Nagłówek Hero |
| **Heading 1** | `text-4xl lg:text-5xl font-bold tracking-tight font-[var(--font-display)]` | Tytuły stron |
| **Heading 2** | `text-3xl lg:text-4xl font-bold font-[var(--font-display)]` | Sekcje główne |
| **Heading 3** | `text-xl lg:text-2xl font-semibold` | Karty/podsekcje |
| **Body opisowy** | `text-base lg:text-lg leading-relaxed text-neutral-600` | Opisy produktów |
| **Body standard** | `text-base` | Tekst ogólny |
| **Label** | `text-sm font-medium uppercase tracking-wider` | Etykiety, kategorie |

> **Spacing:** Siatka 8px. Sekcje zawsze `py-20 md:py-32`.

#### 2.3 Zaokrąglenia (radius) i cienie

- **Radiusy (źródło w `:root`):** `--radius-xl: 1.5rem` (przyciski), `--radius-2xl: 2rem` (karty/banery), `--radius-lg: 1rem` (pola/form), `--radius-md: .75rem` (tagi).
- **Cienie:** karty `shadow-lg` → hover `shadow-xl` (rozproszone). Zero „twardych” ciemnych cieni.

#### 2.4 Komponenty UI — specyfikacje twarde

**`<Button />` (shadcn + cva)**

- **Wspólne:** `rounded-xl font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-gold active:scale-95`.
- **Primary (Gradient CTA):** `bg-gradient-to-br from-brand-gold to-brand-copper text-white shadow-lg hover:brightness-110 hover:shadow-md active:brightness-100`.
- **Secondary (Outline):** `bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white`.
- **Ghost (Icon):** `bg-transparent hover:bg-brand-sand`.

**`<ProductCard />`**

- **Kontener:** `group rounded-2xl bg-white shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl`.
- **Obraz:** wrapper `relative aspect-square overflow-hidden`; obraz `w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105`.
- **Akcje:** „Quick Add” (ikona koszyka) i/lub Heart/Eye — prawy górny róg; `opacity-0 group-hover:opacity-100 transition-opacity`.

**`<Input />`, `<Textarea />`**

- `rounded-lg border-neutral-300 bg-white text-brand-charcoal focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/50`.

#### 2.5 Ikonografia (Lucide React)

- **Styl:** outline, `strokeWidth={1.5}` dla lekkości premium.
- **Rozmiary:** domyślnie `h-5 w-5` (20px); w przyciskach `h-4 w-4`.

#### 2.6 Animacje (Framer Motion)

- **Timing globalny:** `duration: 0.5`, `ease: "easeOut"`.
- **Wejścia sekcji:** `initial={{ opacity: 0, y: 30 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.2 }}`.
- **Listy (stagger):** kontener z `staggerChildren: 0.1`.
- **Mikrointerakcje:** strzałki w linkach przesuw `translate-x-1` na hover; aktywne linki w nawigacji z subtelnym złotym podkreśleniem/kropką.
- **A11y motion:** respektuj `prefers-reduced-motion` → redukcja do fade‑in bez przesunięć.

---

## Część 2 — Architektura strony głównej (pod konwersję i wrażenie premium)

> Strona główna prowadzi użytkownika przez 4 etapy: **Emocje → Logika → Zaufanie → Akcja**.

### Sekcja 1 — **Hero** (_Emocje_, Tryb Elegancki)

**Cel:** „Wow” w 3 sekundy, definicja marki.  
**Design:** `min-h-screen` tło (obraz/wideo) + overlay `bg-brand-charcoal/70`.  
**Elementy:**

- Display h1 (Space Grotesk), krótki podtytuł.
- **CTA Primary (Gradient):** „Odkryj Kolekcję”.
- Opcj. link secondary: „Zobacz inspiracje →”.

### Sekcja 2 — **Prezentacja kolekcji** (_Logika_, Showroom)

**Cel:** Szybka nawigacja do kluczowych kategorii.  
**Design:** `bg-brand-sand`.  
**Elementy:** H2 + siatka 3–4 `<CategoryCard />` (np. Sofy, Stoły, Oświetlenie). Kafel klikalny z delikatnym zoomem obrazu.

### Sekcja 3 — **Bestsellery** (_Zaufanie — Social Proof_, Showroom)

**Cel:** Pokazać popularne i sprawdzone produkty.  
**Design:** `bg-brand-cream`.  
**Elementy:** H2 + **karuzela pozioma** (Embla) 4–5 × `<ProductCard />` z drag + strzałki na desktopie.

### Sekcja 4 — **Propozycja wartości** (_Zaufanie — Racjonalne_, Showroom)

**Cel:** Dlaczego warto kupić u nas?  
**Elementy:** H2 „Jakość, na której możesz polegać” + siatka 3 ikon:

- `Truck` — „Darmowa dostawa od 5000 PLN”.
- `ShieldCheck` — „Bezpieczne płatności i 2 lata gwarancji”.
- `HandHeart` — „Ręczne wykonanie w Polsce”.

### Sekcja 5 — **Inspiracje / Lookbook** (_Emocje — powrót_, mix)

**Cel:** Kontekst i aspiracja.  
**Design:** duży baner aranżacji (ciemny lub mieszany), overlay tekstu + **CTA Secondary (Outline)** „Zobacz nasze inspiracje”.

### Sekcja 6 — **Newsletter** (_Akcja_, Showroom)

**Cel:** Pozyskiwanie leadów.  
**Elementy:** H3 „Dołącz do naszego klubu” + `<Input type="email" />` + **CTA Primary** „Zapisz się”.  
**Walidacja:** maska e‑mail, stany błędów, RODO checkbox.

### Sekcja 7 — **Stopka (Footer)** (_Zaufanie_, Elegancki)

**Design:** `bg-brand-charcoal` + jasny tekst.  
**Elementy:** Logo, opis marki, kolumny z linkami (Kategorie, Informacje, Obsługa klienta), prawa autorskie.

---

## Specyfikacje dodatkowe i check‑listy egzekucyjne

### A) Siatki/spacing

- Sekcje: zawsze `py-20 md:py-32`.
- Siatki: 12‑kolumn desktop, 6 tablet, 2–4 mobile; karty produktów: `grid auto-fit minmax(280px,1fr)`.

### B) Dostępność (A11y)

- Kontrast min. AA; złoto na bieli tylko jako akcent/ikony.
- Focus ring **zawsze** widoczny (`ring-brand-gold`).
- Hit area ≥ 44×44 px.
- ARIA dla ikon akcji; pełna obsługa klawiatury (menu, modale, quick‑view).
- `prefers-reduced-motion` obsłużony.

### C) Wydajność

- `next/image` + `placeholder="blur"`.
- Lazy‑load sekcji poza viewportem i karuzel.
- Unikaj kosztownych animacji na mobile; throttling scroll.

### D) Kontrola jakości (QA)

- [ ] Radiusy: przyciski `rounded-xl`, karty `rounded-2xl`, formy `rounded-lg`.
- [ ] Złoto tylko CTA/akcent/focus; brak konfliktów kolorystycznych.
- [ ] Hover kart: obraz `scale-105`, akcje `opacity-100`.
- [ ] Framer Motion: `once: true`, `amount: 0.2` na sekcjach.
- [ ] Ikony Lucide `strokeWidth=1.5`.

### E) Implementacja (skrót techniczny)

- Fonts w `layout.tsx` → CSS vars `--font-geist-sans`, `--font-display`.
- Tokeny kolorów w `globals.css`; aliasy w `tailwind.config.ts`.
- `Button`: warianty **gradient/outline/ghost** jak wyżej (cva).
- `ProductCard` i `Input` zgodnie ze spec.
- Embla Carousel (bestsellery), Framer Motion (wejścia/stagger).
- Utilsy: `cn()`, `formatPrice(PLN)`, komponent `IconButton` (hit area, aria‑label).

---

**Notatka końcowa dla developera:** Myśl jak rzemieślnik. Każdy piksel, easing i odstęp mają znaczenie. Jeśli czegoś nie przewidziano — wybieraj wariant **prostszy** i **bardziej spójny** z niniejszym dokumentem. Bez kompromisów jakościowych.

---

## Część 3 — „Premium feel” i wyróżniki na tle rynku (must‑have)

> Celem jest **poczucie klasy premium** bez kiczu: wyważone, konsekwentne, mierzalne w UX i wynikach.

### 3.1 Język wizualny premium

- **Złoto jako światło, nie farba:** gradient `brand-gold → brand-copper` tylko na CTA i mikroakcentach (ikony, focus). Zero złotych tłowych plam.
- **Mikro‑faktura/ziarno:** delikatny _grain_ (8–12% opacity) na ciemnym hero i w stopce, by uniknąć „pustej czerni”.
- **„Galeria sztuki” dla zdjęć:** szerokie _white space_, brak ramek; `max-w-[1320px]` siatka + `gap-8/12`.
- **Cienie premium:** miękkie, rozproszone (`shadow-lg → shadow-xl` na hover), bez ostrych obrysów; brak „liftingu kart” na mobile.
- **Reżim kolorów stanów:**
  - **hover:** +4–6 L w OKLCH,
  - **active:** −2 L i `scale-95`,
  - **focus:** ring w `brand-gold` + `ring-offset-2`.

### 3.2 System motion (markowy)

- **Krzywa bazowa:** `cubic-bezier(0.2, 0.8, 0.2, 1)` (_gentle spring_).
- **Długości:** 200–300 ms UI; 500 ms wejścia sekcji; `stagger = 100 ms`.
- **Scroll‑linked subtelnie:** parallax obrazów hero (2–4% przesunięcia) z _clamp_ i pełnym wsparciem `prefers-reduced-motion`.
- **Reguła „zero zaskoczeń”:** animacje nigdy nie zasłaniają treści ani nie przesuwają CTA poza viewport.

### 3.3 Doświadczenie produktu (wyróżniki)

- **Konfigurator 3D + warianty tkanin:**
  - Format: `glTF/GLB` (Draco), tekstury `KTX2` (BC7/ETC1s), _viewers_: `react‑three‑fiber` + `drei`.
  - **Tryb „Fabric Live”**: _fabric swatch_ z podglądem faktury 4× i **symulacja ugięcia** (normal map + parallax occlusion).
  - **Hotspoty** „zobacz detal”: szwy, nóżki, mechanizmy rozkładania.
- **AR „Zobacz w swoim pokoju”:**
  - iOS: `USDZ` przez `<a rel="ar" />` / Quick Look,
  - Android: `Scene Viewer` (`.glb`).
  - Bez AR: fallback 360° (36 klatek, drag).
- **Przewodnik rozmiaru i komfortu:** skala twardości siedziska (1–5), **wizualny check**: „pasuje do pokoju 18–25 m²”.
- **Zestaw próbek tkanin (lead magnet):** CTA „Zamów darmowe próbki” z selekcją 3–5 próbek w koszyku.

### 3.4 Storytelling i zaufanie

- **„Mastercraft”** — sekcja rzemiosła: film 12–18 s (hero/wyżej folda na PDP), fotografie makro → **dowód jakości**.
- **„Material Passport”** — karta materiału (pochodzenie, certyfikaty, czyszczenie, recykling).
- **UGC galeria „W waszych domach”**: moderowana siatka zdjęć klientów (z automatycznym kadrowaniem do `aspect-square`).

### 3.5 Checkout premium

- **Estimator dostawy w czasie rzeczywistym:** data dostawy od magazynu/produkcji + okno czasowe.
- **Opcja wniesienia i montażu** jako _upsell_ (transparentny cennik).
- **Płatności i finansowanie**: jasne odznaki z ikonami Lucide; raty komunikowane przy cenie (APR, RRSO).
- **Progres krokowy** (Shipping → Payment → Review) z _autosave_.
- **Zaufanie:** polityka zwrotów jako mini‑akordeon tuż obok CTA.

### 3.6 Dostępność+ (ponad standard)

- **Kontrast AA wszędzie, AAA dla body na jasnym**.
- **Fokusy „gold” zawsze widoczne** także na kartach i ikonach.
- **Widoczne etykiety** (nie tylko placeholders).
- **Klawiszologia:** _skip to content_, strzałki w karuzeli, zamykanie ESC, pułapek focusu brak.

### 3.7 Wydajność & jakość (SLA)

- **Budżety wydajności:**
  - LCP < **1.8 s** (4G, Moto G4, 75th pctl),
  - CLS < **0.03**, INP < **200 ms**, TTFB < **0.5 s**.
- **Budżety zasobów:** JS ≤ **180 kB** gzip na homepage, obraz hero ≤ **220 kB** (AVIF/WebP), glTF ≤ **5–8 MB** z _lazy-init_.
- **Optymalizacje:** `next/image` (AVIF/WebP, `sizes`, `priority` tylko na hero), `preconnect` CDN, `font-display: swap`, `@next/font` subset PL, `react‑three‑fiber` _suspense + dynamic import_.
- **RUM:** web‑vitals + `eventLogger` (GA4 / PostHog).
- **CI:** Lighthouse >= 95 / 95 / 100 / 100 (PWA opcjonalnie).
- **QA wizualne:** Storybook + Playwright + Percy (regresje).

### 3.8 SEO & dane strukturalne

- **Schema.org:** `Product` (z `AggregateRating`), `BreadcrumbList`, `FAQPage` (PDP), `ItemList` (listing), `ImageObject` (hero).
- **Hreflang:** `pl-PL`.
- **Meta i podglądy:** Open Graph + alt‑teksty bogate w deskryptory materiałów.
- **Słownictwo:** polski, zwięźle, bez frazesów; liczby **niełamane** (3 499 zł).

---

## Część 4 — Plan wdrożenia „premium feel” (kroki deweloperskie)

1. **Tokens & theming**
   - Zaimplementuj OKLCH + aliasy `brand-*`; dodaj util `.noise-dark` (grain SVG/PNG, `opacity: 0.08`).
2. **Motion kit**
   - Utwórz `motion/presets.ts` (curves, durations, `fadeInUp`, `stagger`).
   - Dodaj `ScrollParallax` (requestAnimationFrame, _clamp_, `prefers-reduced-motion`).
3. **UI premium**
   - `Button` (gradient, outline, ghost) + _press effect_.
   - `ProductCard` z hotspotami i quick‑add; `Image` z `sizes` i `priority` tylko tam, gdzie trzeba.
   - `Input` focus glow i walidacja RHF + Zod.
4. **Product 3D/AR**
   - Pipeline GLB/USdz + komponent `ModelViewer` (dynamic).
   - `ARButton` (iOS/Android) z fallback 360°.
5. **Checkout**
   - Sloty dostawy + upsell montażu; _autosave_ koszyka w `localStorage` + konta.
6. **QA & budżety**
   - Budżety w CI (lighthouse‑ci), web‑vitals w prod, Playwright testy krytycznych ścieżek.

---

## Część 5 — Mikrocopy (ton marki)

- **Prosty, rzeczowy, spokojny.**
- **Przykłady:**
  - CTA: „Odkryj kolekcję”, „Dodaj do koszyka”, „Zamów próbki tkanin”.
  - Błędy: „Sprawdź adres e‑mail” (bez żargonu).
  - Wartość: „Ręcznie wykończone w Polsce. 24‑miesięczna gwarancja.”

---

## Część 6 — Telemetria i eksperymenty

- **Eventy kluczowe:** `home_hero_cta_click`, `category_tile_click`, `product_quick_add`, `pdp_ar_open`, `sample_kit_order`, `checkout_shipping_selected`, `checkout_success`.
- **A/B framework:** GrowthBook / PostHog Experiments dla:
  - zdjęcia lifestyle vs. studyjne w hero,
  - placement CTA w hero,
  - liczba kart w karuzeli bestsellerów,
  - treść value prop („dostawa” vs „ręczne wykonanie”).

---

**Definicja „ukończone premium”:**

> LCP ≤ 1.8 s, CLS ≤ 0.03, INP ≤ 200 ms; focusy wszędzie widoczne; Hero robi „wow” bez agresji; PDP ma 3D/AR lub pełny 360°; checkout jasno komunikuje dostawę/montaż; wskaźnik zapisu do newslettera ≥ 2.5%; CTR hero CTA ≥ 8% na desktopie.
