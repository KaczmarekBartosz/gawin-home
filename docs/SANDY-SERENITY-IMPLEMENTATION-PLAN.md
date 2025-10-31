# Plan Implementacji Sandy Serenity + Poprawki Sekcji

**Data:** 31.10.2025
**Wersja:** 1.0
**Status:** W trakcie wykonania
**Autor:** Claude Code + Bartosz Kaczmarek

---

## 📋 Zakres Prac

Kompletny refactoring kolorystyczny wszystkich sekcji (Navbar → Footer) + poprawki niedopracowanych elementów. Zastąpienie gold/copper palette nową Sandy Serenity palette.

### Pallet Sandy Serenity:
- **#9B8C82** - Deep sand (primary accent)
- **#B7A99D** - Medium sand (buttons, accents)
- **#C2B8B0** - Light sand (borders)
- **#D1CBC5** - Lighter sand (backgrounds)
- **#DADADD** - Very light sand (cream)
- **#423A35** - Warm charcoal (text)
- **#6B6359** - Warm gray (secondary text)
- **#2A2420** - Warm dark (dark mode bg)

---

## 🎨 SEKCJA 1: PremiumNavbar

**Plik:** `components/layout/PremiumNavbar.tsx`

### Aktualny Stan:
- Fixed header z glass morphism
- Gold gradient (#d4af37) na logo
- Białe tło + transparentność przy scrollu

### Zmiany Kolorystyczne:
1. **Logo background:** Gradient gold → Gradient sand (`#9B8C82 → #B7A99D`)
2. **Nav text color:** `#1a1a1a` → `#423A35` (warm charcoal)
3. **Glass morphism:** Gold opacity → Sandy opacity (`rgba(183,169,157,0.12)`)
4. **Hover states:** Gold underline → Sand-deep (`#9B8C82`)
5. **Mobile menu backdrop:** Dark → Warm dark (`#2A2420`)

### Poprawki Funkcjonalne:
- ✅ Brak - sekcja dopracowana

**Szacowany czas:** 15 min

---

## 🎨 SEKCJA 2: HeroSection

**Plik:** `components/sections/home/HeroSection.tsx`

### Aktualny Stan:
- Split layout 40/60
- Interactive hotspots na produkcie
- Gold accents (#d4af37)

### Zmiany Kolorystyczne:
1. **Headline color:** Pozostać warm charcoal (`#423A35`)
2. **Subheadline:** Gray → Warm gray (`#6B6359`)
3. **Primary CTA button:** Gold bg → Sand-primary bg (`#B7A99D`) + white text
4. **Secondary CTA button:** Gold border → Sand-deep border (`#9B8C82`)
5. **Hotspot pins:** Gold → Sand-deep (`#9B8C82`)
6. **Hotspot tooltips:** Gold border → Sand-primary border (`#B7A99D`)
7. **Benefits icons:** Gold → Sand-deep (`#9B8C82`)

### Poprawki Funkcjonalne:
- Zwiększyć contrast na tooltip text
- Poprawić responsywność hotspots na mobile (ukryć lub zmniejszyć)

**Szacowany czas:** 20 min

---

## 🎨 SEKCJA 3: CategoriesCarousel

**Plik:** `components/sections/home/CategoriesCarousel.tsx`

### Zmiany Kolorystyczne:
1. **Card background:** White → Cream (`#DADADD`)
2. **Card hover glow:** Gold → Sand-primary glow (`rgba(183,169,157,0.25)`)
3. **Category title:** Charcoal → Warm charcoal (`#423A35`)
4. **CTA button:** Gold → Sand-primary (`#B7A99D`)

### Poprawki Funkcjonalne:
- Dodać `shadow-neo-light` do kart
- Poprawić spacing między kartami (`gap-8`)
- Dodać fade effect na krawędziach carousel

**Szacowany czas:** 15 min

---

## 🎨 SEKCJA 4: BestsellersCarousel

**Plik:** `components/sections/home/BestsellersCarousel.tsx`

### Zmiany Kolorystyczne:
1. **Section label:** Gold → Sand-deep (`#9B8C82`)
2. **Heading:** Warm charcoal (`#423A35`)
3. **CTA button:** Gold → Sand-primary (`#B7A99D`)

### Poprawki Funkcjonalne:
- ✅ Brak - carousel działa dobrze

**Szacowany czas:** 10 min

---

## 🎨 SEKCJA 5: ProductCard

**Plik:** `components/cards/ProductCard.tsx`

### Zmiany Kolorystyczne:
1. **Badge "BESTSELLER":** Gold variant → Sand-primary (`#B7A99D`)
2. **Badge "NOWOŚĆ":** Green variant → Sand-deep (`#9B8C82`)
3. **Price color:** Charcoal → Warm charcoal (`#423A35`)
4. **Add to cart button:** Gold → Sand-primary (`#B7A99D`)
5. **Wishlist icon hover:** Gold → Sand-primary (`#B7A99D`)

### Poprawki Funkcjonalne:
- Poprawić hover effect na całej karcie (`hover:scale-102`)
- Dodać smooth transition na ceny

**Szacowany czas:** 15 min

---

## 🎨 SEKCJA 6: LookbookGrid

**Plik:** `components/sections/LookbookGrid.tsx`

### Zmiany Kolorystyczne:
1. **Section label:** Gold → Sand-deep (`#9B8C82`)
2. **Heading:** Warm charcoal (`#423A35`)
3. **LookbookCard overlay:** Dark gradient → Warm dark + sand gradient
4. **CTA buttons:** Gold → Sand-primary (`#B7A99D`)
5. **How-to icons:** Gold → Sand-deep (`#9B8C82`)

### Poprawki Funkcjonalne:
- Zwiększyć contrast na overlay text
- Dodać subtle animation na hover (card lift effect)

**Szacowany czas:** 15 min

---

## 🎨 SEKCJA 7: TestimonialsSection

**Plik:** `components/sections/home/TestimonialsSection.tsx`

### Zmiany Kolorystyczne:
1. **Section background:** White → Cream (`#DADADD`)
2. **Card background:** Cream → White (odwrócony kontrast)
3. **Star rating:** Gold → Sand-primary (`#B7A99D`)
4. **Quote marks:** Gold → Sand-deep (`#9B8C82`)
5. **Author name:** Charcoal → Warm charcoal (`#423A35`)

### Poprawki Funkcjonalne:
- Dodać subtle border do kart (`border-sand-primary`)
- Poprawić typography (zwiększyć line-height na quotes)

**Szacowany czas:** 15 min

---

## 🎨 SEKCJA 8: TrustedBrandsSection

**Plik:** `components/sections/home/TrustedBrandsSection.tsx`

### Zmiany Kolorystyczne:
1. **Section background:** Pozostać white
2. **Brand logos hover:** Grayscale → Sand-primary (`#B7A99D`)
3. **Section title:** Warm charcoal (`#423A35`)

### Poprawki Funkcjonalne:
- Dodać smooth transition na hover (150ms)
- Zmniejszyć opacity logo z 0.5 → 0.6 dla lepszej widoczności

**Szacowany czas:** 10 min

---

## 🎨 SEKCJA 9: InstagramSection

**Plik:** `components/sections/home/InstagramSection.tsx`

### Zmiany Kolorystyczne:
1. **Section background:** White → Light sand (`#D1CBC5`)
2. **Overlay hover:** Gold → Sand-primary gradient (`rgba(183,169,157,0.8)`)
3. **Instagram icon:** Gold → Sand-deep (`#9B8C82`)

### Poprawki Funkcjonalne:
- Dodać grid gap spacing (4-6px)
- Poprawić aspect ratio images (ensure 1:1 square)

**Szacowany czas:** 10 min

---

## 🎨 SEKCJA 10: NewsletterSection

**Plik:** `components/sections/home/NewsletterSection.tsx`

### Zmiany Kolorystyczne:
1. **Section background:** Gold gradient → Sand gradient (`#9B8C82 → #D1CBC5`)
2. **Input border:** White → Sand-deep (`#9B8C82`)
3. **Submit button:** White bg + gold text → Sand-primary bg (`#B7A99D`) + white text
4. **Heading:** White → Warm charcoal (`#423A35`)

### Poprawki Funkcjonalne:
- Dodać validation states (error: red, success: sand-primary)
- Poprawić mobile spacing (padding-x)

**Szacowany czas:** 15 min

---

## 🎨 SEKCJA 11: Footer

**Plik:** `components/layout/footer/Footer.tsx`

### Aktualny Stan:
- 4-column layout dopracowany
- Dark background + gold accents

### Zmiany Kolorystyczne:
1. **Background:** Dark (#1a1a1a) → Warm dark (`#2A2420`)
2. **Gold accents:** #d4af37 → Sand-primary (`#B7A99D`)
3. **Link hover:** Gold → Sand-primary (`#B7A99D`)
4. **Social icons:** Gold → Sand-deep (`#9B8C82`)
5. **Newsletter input border:** Gold → Sand-primary (`#B7A99D`)
6. **Back-to-top button:** Gold → Sand-primary (`#B7A99D`)
7. **Decorative gradient circles:** Gold gradient → Sand gradient

### Poprawki Funkcjonalne:
- ✅ Sekcja już dopracowana

**Szacowany czas:** 15 min

---

## 🎨 SEKCJA 12: ListingPage

**Plik:** `app/listing/page.tsx`

### Zmiany Kolorystyczne:
1. **Sidebar background:** Pozostać cream (`#DADADD`)
2. **Filter checkboxes:** Gold → Sand-primary (`#B7A99D`)
3. **Apply button:** Gold → Sand-primary (`#B7A99D`)
4. **Sort dropdown:** Gold accent → Sand-primary (`#B7A99D`)

### Poprawki Funkcjonalne:
- Dodać active states na filtry (border/bg zmiana)
- Poprawić mobile layout (sidebar collapse w accordion)

**Szacowany czas:** 15 min

---

## 🎨 SEKCJA 13: CartPage

**Plik:** `app/cart/page.tsx`

### Zmiany Kolorystyczne:
1. **Card backgrounds:** White → Cream (`#DADADD`)
2. **Quantity buttons:** Gold → Sand-primary (`#B7A99D`)
3. **Checkout button:** Gold → Sand-primary (`#B7A99D`)
4. **Price color:** Charcoal → Warm charcoal (`#423A35`)

### Poprawki Funkcjonalne:
- Dodać loading states na quantity change
- Poprawić empty cart state (placeholder image + tekst)

**Szacowany czas:** 15 min

---

## 🎨 SEKCJA 14: CheckoutPage

**Plik:** `app/checkout/page.tsx`

### Zmiany Kolorystyczne:
1. **Progress indicators:** Gold → Sand-primary (`#B7A99D`)
2. **Active step marker:** Gold glow → Sand-primary glow
3. **Input focus ring:** Gold → Sand-primary (`#B7A99D`)
4. **Submit button:** Gold → Sand-primary (`#B7A99D`)
5. **Order summary header:** Gold accents → Sand-primary (`#B7A99D`)

### Poprawki Funkcjonalne:
- ✅ Już dopracowane w Phase 2D

**Szacowany czas:** 10 min

---

## 🔧 Dodatkowe Komponenty UI

### NeoButton

**Plik:** `components/ui/neo-button.tsx`

- Zmienić domyślny variant "gold" → "sand-primary"
- Zaktualizować kolory dla wszystkich variantów

**Szacowany czas:** 10 min

### BadgeNeo

**Plik:** `components/ui/badge-neo.tsx`

- Zmienić variant "gold" → "sand-primary"
- Zaktualizować kolory dla "success", "error", "warning"

**Szacowany czas:** 10 min

---

## 📊 Plan Wykonania - Fazy

### ✅ Faza 1: Dokumentacja (DONE)
- [x] Zapisanie planu do pliku MD

### ⏳ Faza 2: Layout Components (Navbar + Footer)
- [ ] PremiumNavbar.tsx
- [ ] Footer.tsx

### ⏳ Faza 3: Home Sections
- [ ] HeroSection.tsx
- [ ] CategoriesCarousel.tsx
- [ ] BestsellersCarousel.tsx
- [ ] LookbookGrid.tsx
- [ ] TestimonialsSection.tsx
- [ ] TrustedBrandsSection.tsx
- [ ] InstagramSection.tsx
- [ ] NewsletterSection.tsx

### ⏳ Faza 4: Product Components
- [ ] ProductCard.tsx

### ⏳ Faza 5: Pages
- [ ] listing/page.tsx
- [ ] cart/page.tsx
- [ ] checkout/page.tsx

### ⏳ Faza 6: UI Components
- [ ] neo-button.tsx
- [ ] badge-neo.tsx

### ⏳ Faza 7: Weryfikacja
- [ ] pnpm build
- [ ] Visual inspection (localhost:3001)
- [ ] Responsive test (mobile/tablet/desktop)
- [ ] Dark mode test

### ⏳ Faza 8: Git Commit
- [ ] Finalizacja i commit

---

## ⏱️ Szacowany Czas

- **Total:** ~3-4 godziny
- **Per component:** 10-20 minut
- **Testing:** 30 minut
- **Buffer:** 30 minut

---

## 📝 Notatki

### Referencje Kolorów
```
Gold (OLD):
#d4af37, #d4a574, #b8956a

Sandy Serenity (NEW):
#9B8C82 (sand-deep)
#B7A99D (sand-primary)
#C2B8B0 (sand-light border)
#D1CBC5 (sand - backgrounds)
#DADADD (cream - light)
#423A35 (charcoal - text)
#6B6359 (gray - secondary)
#2A2420 (dark bg)
```

### Ważne: Korzystaj z zmiennych CSS
```css
/* Instead of hardcoding:
color: #B7A99D;

/* Use CSS variables from globals.css:
color: var(--color-sand-primary);
color: var(--brand-sand-primary);
```

### Testing Checklist
- [ ] Build passes: `pnpm build`
- [ ] No TypeScript errors
- [ ] Navbar colors apply
- [ ] Footer colors apply
- [ ] Home sections look cohesive
- [ ] Cart/Checkout consistent
- [ ] Mobile responsive
- [ ] Dark mode works

---

## 👤 Kontakt & Kontekst

Jeśli ktoś inny będzie kontynuować pracę:

1. Przeczytaj ten plik całkowicie
2. Sprawdź `app/globals.css` dla zmiennych kolorów
3. Pracuj sekcja po sekcji, testując po każdej
4. Używaj `localhost:3001` (dev server)
5. Commituj po każdej fazie

---

**Status:** ⏳ W trakcie - rozpoczęto 31.10.2025
