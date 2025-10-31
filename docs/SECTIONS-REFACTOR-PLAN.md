# Sekcje Refactor Plan - Sandy Serenity Implementation

**Data:** 2025-10-31
**Status:** 🔴 READY FOR IMPLEMENTATION
**Prioritet:** HIGH - Muszą być najpierw naprawione przed dalszą pracą

---

## 📊 Analiza Stanu Obecnego

### Sekcje Aktywne na /home:
1. ✅ HeroSection - GOTOWA
2. 🟡 CategoriesCarousel - Wymaga naprawy
3. 🟡 BestsellersCarousel - Wymaga naprawy
4. 🟡 LookbookGrid - Wymaga naprawy
5. 🟡 TestimonialsSection - Wymaga naprawy
6. 🟡 TrustedBrandsSection - Wymaga naprawy
7. 🟡 InstagramSection - Wymaga naprawy
8. 🟡 NewsletterSection - Wymaga naprawy

---

## 🎯 Problemy Znalezione

### 1. HARDKODOWANE KOLORY (ZAMIAST Z globals.css)
- **LookbookGrid.tsx:61** → `text-[#B7A99D]` powinno być `text-brand-sand-primary`
- **CategoriesCarousel.tsx:115** → `border-neutral-200` powinno być z globals
- **NewsletterSection.tsx** → `variant="gold"` (deprecated!) powinno być `bg-stone-800`

### 2. RESPONSYWNOŚĆ
- **Sekcje karuzeli** (Categories, Bestsellers) - mogą się nie skalować dobrze na mobile
- **TestimonialsSection** - konieczna weryfikacja layoutu na mobile
- **NewsletterSection** - przycisk może być za mały na mobile

### 3. BACKGROUND HIERARCHY (NOWE ZNALEZISKO!)
- Wszystkie sekcje mają `bg-white` statycznie
- Po zmianach body na `bg-brand-cream`, powinny mieć `bg-white` lub jakiś gradient
- Brakuje strategi: które sekcje `bg-white`, które `bg-brand-cream`?

### 4. KONSYSTENCJA PADDING/SPACING
- Różne sekcje mają różne `py-24 md:py-32` - dobrze
- Ale wewnętrzne spacing nie jest spójny

---

## 📋 Refactoring Strategy

### BACKGROUND HIERARCHY DECISION:
```
Proponuję:
- HeroSection        → bg-white (jak teraz) ✅
- CategoriesCarousel → bg-brand-cream (zmiana!) dla kontrastu
- BestsellersCarousel → bg-white (jak teraz)
- LookbookGrid       → bg-brand-cream (zmiana!)
- TestimonialsSection → bg-white (jak teraz)
- TrustedBrandsSection → bg-brand-cream (zmiana!)
- InstagramSection   → bg-white (jak teraz)
- NewsletterSection  → bg-white (keep dark card inside)
```

To da efekt **pulsowania** zwischen białym i kremowym - bardzo subtylny, ale widoczny.

---

## 🔧 Konkretne Zmiany na Sekcję

### 1. CategoriesCarousel

**Zmiany:**
- [ ] Background: `bg-white` → `bg-brand-cream`
- [ ] Border: `border-neutral-200` → `border-color-border-light` (z globals)
- [ ] Responsywność: Sprawdzić basis breakpoints (mogą być OK)

**Linie do zmiany:**
- Line 72: `bg-white` → `bg-brand-cream`
- Line 115: `border-neutral-200` → `border-[var(--color-border-light)]`

---

### 2. BestsellersCarousel

**Zmiany:**
- [ ] Wygląda OK - tylko weryf responsywności
- [ ] Produkty na mobile mogą być zbyt duże

**Linie do zmiany:**
- Line 29: sprawdzić czy może być zmieniane

---

### 3. LookbookGrid

**Zmiany:**
- [ ] Background: `bg-white` → `bg-brand-cream`
- [ ] Color: `text-[#B7A99D]` → `text-brand-sand-primary`
- [ ] Responsywność: Grid OK, ale sprawdzić LookbookCard wewnątrz

**Linie do zmiany:**
- Line 51: `bg-white` → `bg-brand-cream`
- Line 61: `text-[#B7A99D]` → `text-brand-sand-primary`

---

### 4. TestimonialsSection

**Zmiany:**
- [ ] Przeczytać pełnie i zanalizować
- [ ] Sprawdzić responsywność na mobile
- [ ] Kolory: może być OK

---

### 5. TrustedBrandsSection

**Zmiany:**
- [ ] Background: `bg-white` → `bg-brand-cream`
- [ ] Responsywność: 6 kolumn na desktop - może być zbyt mało space

**Linie do zmiany:**
- Line 31: `bg-white` → `bg-brand-cream`
- Line 52: `grid-cols-2 md:grid-cols-3 lg:grid-cols-6` → może zmienić gap

---

### 6. InstagramSection

**Zmiany:**
- [ ] Wygląda OK
- [ ] Layout: 6 kolumn na desktop - OK
- [ ] Responsywność: na mobile mogą być małe

---

### 7. NewsletterSection - DUŻY REFACTOR!

**Zmiany:**
- [ ] Background outer: `bg-white` - OK
- [ ] Przycisk: `variant="gold"` → `bg-stone-800 text-stone-100 hover:bg-stone-700`
- [ ] Responsywność: Form na mobile - OK
- [ ] Opcjonalnie: Zmienić gradient card na coś bardziej Sandy Serenity?

**Linie do zmiany:**
- Line 32: Przycisk - zmienić variant
- Opcjonalnie card background

---

## 📐 Responsywność Checklist

Dla każdej sekcji sprawdzić:
- [ ] Mobile (320px) - czy tekst się mieści?
- [ ] Tablet (768px) - czy spacing jest OK?
- [ ] Desktop (1024px+) - czy layout się rozciąga prawidłowo?
- [ ] Images - czy się ładują szybko?

---

## 🎨 Kolory z globals.css (DO UŻYCIA)

```css
/* Z :root */
--brand-charcoal: #423A35
--brand-cream: #DADADD
--brand-sand: #D1CBC5
--brand-sand-primary: #B7A99D
--brand-sand-deep: #9B8C82
--color-border-light: #C2B8B0 (from --color-border-light)

/* W @theme */
--color-border-light: oklch(0.85 0.01 70) → #C2B8B0
```

**NIGDY NIE HARDKODUJ!** Zawsze używaj:
- `bg-brand-cream`
- `text-brand-sand-primary`
- `border-[var(--color-border-light)]` (jeśli globals nie ma Tailwind klasy)

---

## ✅ Implementacja Order

1. **LookbookGrid** - najprostsza, 2 zmiany
2. **CategoriesCarousel** - 2 zmiany, border fix
3. **TrustedBrandsSection** - 1 zmiana background
4. **NewsletterSection** - przycisk refactor
5. **TestimonialsSection** - analiza + ewentualne poprawki
6. **BestsellersCarousel** - sprawdzenie responsywności
7. **InstagramSection** - sprawdzenie responsywności

---

## 🚀 Procedura na Każdą Sekcję

1. Przeczytać pełnie komponent
2. Zidentyfikować wszystkie hardkodowane kolory
3. Zmienić na zmienne z globals.css
4. Zmienić background na odpowiedni (white/cream)
5. Przetestować responsywność
6. Commit
7. Push

---

## 📊 Summary Table

| Sekcja | BG Now | BG New | Issues | Priority |
|--------|--------|--------|--------|----------|
| Hero | white | white | ✅ NONE | ✅ DONE |
| Categories | white | **cream** | border-neutral-200 | HIGH |
| Bestsellers | white | white | responsywność? | MEDIUM |
| Lookbook | white | **cream** | #B7A99D hardcode | HIGH |
| Testimonials | ? | ? | analiza potrzebna | MEDIUM |
| TrustedBrands | white | **cream** | — | MEDIUM |
| Instagram | white | white | — | LOW |
| Newsletter | white | white | variant=gold | HIGH |

---

**Gotowy do implementacji!** ✅
