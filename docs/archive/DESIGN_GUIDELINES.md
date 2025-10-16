# Dokumentacja Frontend dla Dewelopera: Projekt Gawin-Home

**Do:** Deweloper Frontend
**Od:** NicoN & GeminiAI
**Temat:** Kompletna specyfikacja techniczna i architektura strony głównej

---

## Cel

Stworzenie topowego, premium sklepu e-commerce z meblami, opartego o filozofię **"Perfekcja w prostocie"**.

Poniższy dokument jest **ostatecznym i jedynym źródłem prawdy** w kwestiach designu, architektury i UX.

---

## Część 1: Specyfikacja Techniczna "Stylu Hybrydowego"

### 1. Filozofia i Zastosowanie

Stosujemy **dualizm wizualny**:

#### Tryb "Elegancki" (Ciemny)

Używany do budowania pierwszego wrażenia i prestiżu.

**Zastosowanie:**

- Sekcja Hero
- Banery promocyjne
- Stopka (Footer)

#### Tryb "Showroom" (Jasny)

Używany do prezentacji produktów. Ma być czysty, minimalistyczny i nie odciągać uwagi od oferty.

**Zastosowanie:**

- Listingi produktów
- Strony produktowe
- Tła większości sekcji

---

### 2. System Kolorów (Design Tokens)

Implementacja w `app/globals.css` jako zmienne CSS i w `tailwind.config.ts`.

| Token CSS          | Wartość Hex | Nazwa Klasy Tailwind                                    | Zastosowanie                            |
| ------------------ | ----------- | ------------------------------------------------------- | --------------------------------------- |
| `--brand-cream`    | `#FAFAF9`   | `bg-brand-cream`                                        | Główne tło "Showroom"                   |
| `--brand-sand`     | `#F5F5F5`   | `bg-brand-sand`                                         | Tło dla wyróżnionych sekcji             |
| `--brand-charcoal` | `#1A1A1A`   | `bg-brand-charcoal`                                     | Główne tło "Eleganckie", tekst          |
| `--brand-gold`     | `#d4a574`   | `bg-brand-gold`, `text-brand-gold`, `border-brand-gold` | **Tylko** dla CTA, cen, linków, focusów |
| `--brand-copper`   | `#b8956a`   | `hover:bg-brand-copper`                                 | Stan `:hover` dla złotych elementów     |
| `--neutral-border` | `#E5E7EB`   | `border-neutral-200`                                    | Subtelne ramki i separatory             |

---

### 3. Typografia (Geist Sans)

| Element             | Klasy Tailwind                                          | Zastosowanie                  |
| ------------------- | ------------------------------------------------------- | ----------------------------- |
| **Display (Hero)**  | `text-5xl lg:text-7xl font-bold tracking-tighter`       | Główny nagłówek w sekcji Hero |
| **Heading 1**       | `text-4xl lg:text-5xl font-bold tracking-tight`         | Tytuły stron                  |
| **Heading 2**       | `text-3xl lg:text-4xl font-bold`                        | Tytuły głównych sekcji        |
| **Heading 3**       | `text-xl lg:text-2xl font-semibold`                     | Tytuły kart, podsekcji        |
| **Body (Opisowy)**  | `text-base lg:text-lg leading-relaxed text-neutral-600` | Długie opisy produktów        |
| **Body (Standard)** | `text-base`                                             | Standardowy tekst             |
| **Label**           | `text-sm font-medium uppercase tracking-wider`          | Etykiety, kategorie           |

---

### 4. Komponenty UI (Specyfikacja Techniczna)

#### Przyciski (`<Button />`)

**Wspólne atrybuty:**

```
rounded-xl font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-gold
```

⚠️ **ZAKAZ używania innych `border-radius`.**

**Warianty:**

1. **`primary` (Gradientowy CTA):**

   - Klasy: `bg-gradient-to-br from-brand-gold to-brand-copper text-white shadow-lg`
   - Interakcja: `hover:brightness-110 hover:shadow-md active:brightness-100`

2. **`secondary` (Outline):**

   - Klasy: `bg-transparent border border-brand-gold text-brand-gold`
   - Interakcja: `hover:bg-brand-gold hover:text-white`

3. **`ghost` (Tylko ikona):**
   - Klasy: `bg-transparent`
   - Interakcja: `hover:bg-brand-sand`

---

#### Karty Produktów (`<ProductCard />`)

- **Kontener:** `group rounded-2xl bg-white shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl`
- **Wrapper Obrazka:** `relative aspect-square overflow-hidden`
- **Obrazek:** `w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105`
- **Przycisk "Quick Add" (na karcie):**
  - Ikona koszyka
  - Pojawia się na hover: `opacity-0 group-hover:opacity-100 transition-opacity`

---

#### Pola Formularzy (`<Input />`, `<Textarea />`)

- **Styl:** `rounded-lg border-neutral-300 bg-white text-brand-charcoal`
- **Interakcja:** `focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/50`

---

### 5. Ikonografia (Lucide React)

- **Styl:** Konturowy (outline)
- **Grubość Linii (Stroke Width):** `strokeWidth={1.5}`
  - ⚠️ To **kluczowe** dla uzyskania lekkiego, premium wyglądu
- **Rozmiar:**
  - Domyślnie `h-5 w-5` (20px)
  - W przyciskach może być `h-4 w-4`

---

### 6. Animacje (Framer Motion)

**Timing:**

- Domyślny `duration: 0.5`, `ease: "easeOut"`

**Wejście Sekcji:**

```jsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.2 }}
```

**Stagger (dla list):**

- Kontener listy powinien mieć animację `staggerChildren` z opóźnieniem **0.1s** dla każdego elementu

---

## Część 2: Architektura Strony Głównej

Strona główna to **narracja**, która prowadzi klienta przez cztery etapy:

**Emocje → Logika → Zaufanie → Akcja**

---

### Sekcja 1: Hero Section (Etap: Emocje)

**Cel:** Zrobić piorunujące pierwsze wrażenie i zdefiniować markę w 3 sekundy.

**Design:**

- Tryb "Elegancki"
- Pełnoekranowy (`min-h-screen`) obraz lub wideo w tle
- Pokryte półprzezroczystą, ciemną nakładką (`bg-brand-charcoal/70`)

**Komponenty:**

- Nagłówek Display: np. "Perfekcja w Twoim Domu"
- Krótki podtytuł
- Główny przycisk CTA (wariant `primary`): "Odkryj Kolekcję"

---

### Sekcja 2: Prezentacja Kolekcji (Etap: Logika)

**Cel:** Szybkie pokazanie szerokości oferty i nawigacja do kluczowych kategorii.

**Design:**

- Tryb "Showroom"
- Jasne tło (`bg-brand-sand`), aby wyróżnić się od tła strony

**Komponenty:**

- Nagłówek H2: "Nasze Kolekcje"
- Siatka 3-4 kafelków (`<CategoryCard />`) ze zdjęciami reprezentującymi kategorie (np. "Sofy", "Stoły", "Oświetlenie")
- Kafelki są klikalne

---

### Sekcja 3: Bestsellery (Etap: Zaufanie - Social Proof)

**Cel:** Pokazanie, co jest popularne i co kupują inni. Buduje zaufanie i ułatwia wybór.

**Design:**

- Tryb "Showroom"
- Jasne tło (`bg-brand-cream`)

**Komponenty:**

- Nagłówek H2: "Bestsellery"
- Pozioma karuzela (np. **Embla Carousel**) z 4-5 komponentami `<ProductCard />`
- Karuzela musi być interaktywna (przeciąganie, strzałki na desktopie)

---

### Sekcja 4: Propozycja Wartości (Etap: Zaufanie - Racjonalne)

**Cel:** Odpowiedzenie na pytanie "Dlaczego mam kupić właśnie tutaj?".

**Design:**

- Tryb "Showroom"
- Prosta, czysta sekcja

**Komponenty:**

- Nagłówek H2: "Jakość, na której możesz polegać"
- Siatka 3 ikon z krótkim tekstem, np.:
  - Ikona `Truck`: "Darmowa dostawa od 5000 PLN"
  - Ikona `ShieldCheck`: "Bezpieczne płatności i 2 lata gwarancji"
  - Ikona `HandHeart`: "Ręczne wykonanie w Polsce"

---

### Sekcja 5: Inspiracje / Lookbook (Etap: Emocje - Powrót)

**Cel:** Zainspirowanie klienta, pokazanie produktów w kontekście pięknych aranżacji.

**Design:**

- Tryb "Elegancki" lub mieszany
- Duży, wysokiej jakości baner ze zdjęciem aranżacji wnętrza

**Komponenty:**

- Duży obraz z nałożonym tekstem i przyciskiem CTA (wariant `secondary`): "Zobacz nasze inspiracje"

---

### Sekcja 6: Newsletter (Etap: Akcja)

**Cel:** Zbudowanie bazy mailingowej i utrzymanie kontaktu z klientem.

**Design:**

- Tryb "Showroom"
- Prosta sekcja zorientowana na konwersję

**Komponenty:**

- Nagłówek H3: "Dołącz do naszego klubu"
- Pole `<Input />` na adres e-mail
- Przycisk CTA (wariant `primary`): "Zapisz się"

---

### Sekcja 7: Stopka (Footer)

**Cel:** Nawigacja, informacje prawne, budowanie zaufania.

**Design:**

- Tryb "Elegancki"
- Ciemne tło (`bg-brand-charcoal`), biały/kremowy tekst

**Komponenty:**

- Logo, krótkie info o firmie
- Kolumny z linkami (Kategorie, Informacje, Obsługa klienta)
- Informacje o prawach autorskich

---

## Podsumowanie Kluczowych Zasad

1. ✅ **Dualizm wizualny:** Ciemny (Elegancki) dla emocji, Jasny (Showroom) dla produktów
2. ✅ **Przyciski:** TYLKO `rounded-xl` - NIGDY inne `border-radius`
3. ✅ **Złoto (#d4a574):** TYLKO dla CTA, cen, linków, focusów
4. ✅ **Ikony:** `strokeWidth={1.5}` dla lekkiego, premium wyglądu
5. ✅ **Animacje:** Subtelne, `duration: 0.5`, `ease: "easeOut"`
6. ✅ **Narracja:** Emocje → Logika → Zaufanie → Akcja
7. ✅ **Typografia:** Geist Sans - czytelna, elegancka

---

**Wersja dokumentu:** 1.0.0
**Data:** 2025-10-15
**Status:** 🟢 Obowiązujący standard
