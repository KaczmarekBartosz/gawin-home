# Gawin‑Home — Brief dla webdeva: „Reprezentacja danych” (Design‑Only Sprint)

**Cel:** Dostarczyć **kompletne, wizualne (klikalne) makiety w kodzie** zgodne z „Biblią projektu”, **bez logiki biznesowej** i **bez integracji**. Budujemy **reprezentację danych** (mock), aby móc iterować nad UI/UX, typografią, spacingiem i motion.

> **Zakres:** Zero API, zero stanów koszyka/płatności, zero walidacji rzeczywistej. Wszystko oparte na mockach i stubach.

---

## 1) Zasady ogólne

- **Źródło prawdy:** „Biblia projektu” v2+ (tokens, komponenty, architektura).
- **Tryby:** „Elegancki” (ciemny) dla sekcji emocjonalnych; „Showroom” (jasny) dla sekcji produktowych.
- **Bez funkcjonalności:** brak fetchy, brak mutation, brak nawigacji dynamicznej (linki mogą być #).
- **A11y wizualne:** focus ring, stany hover/active/focus **symulowane** klasami.

---

## 2) Struktura repo i plików (proponowana)

```
/app
  /home (strona główna v1)
  /components
    /ui (atomy: Button, Input, Badge, IconButton, Tag)
    /cards (ProductCard, CategoryCard)
    /layout (Header, Footer, Section, Container)
    /composite (Hero, BestsellersCarousel, ValueProps, Newsletter)
  /mock
    products.json, categories.json, value-props.json, hero.json, lookbook.json
  /motion
    presets.ts (fadeInUp, stagger, timings)
  globals.css
  tailwind.config.ts
```

---

## 3) Mocki danych (reprezentacja)

- **products.json** (min. 12 pozycji): `{ id, slug, name, price, compareAtPrice?, images:[{src,alt}], fabrics:[{id,name,swatch}], dimensions:{w,h,d}, rating, badges:["new","-15%"], tags:["sofa","moduł"] }`
- **categories.json**: `{ id, slug, name, image:{src,alt} }` (min. 6)
- **value-props.json**: `[ {icon:"Truck", title:"Darmowa dostawa od 5000 PLN", desc:"..."}, ... ]`
- **hero.json**: `{ title, subtitle, media:{type:"image"|"video", src, poster?}, cta:{label, href:"#"} }`
- **lookbook.json**: `[ { id, image:{src,alt}, caption } ]`

> **Uwaga:** Obrazy mogą być z placeholderów/unsplash lub lokalnych assetów. Użyj `next/image` z `fill` i `sizes`.

---

## 4) Komponenty (stuby wizualne)

- **Button**: warianty `gradient` (primary), `outline`, `ghost`. Tylko style i stany pseudo (hover/active/focus).
- **Input/Textarea**: style + focus glow; **bez walidacji** (atrybuty dekoracyjne).
- **ProductCard**: obraz `aspect-square`, meta (nazwa, cena, compareAt), ikony (Heart/Eye) pojawiają się na `group-hover`. „Quick Add” **tylko wizualny**.
- **CategoryCard**: kafel ze zdjęciem + overlay tekstu; delikatny zoom on hover.
- **Header/Footer**: zgodnie z trybami; menu bez realnych dropdownów (symulacja).
- **BestsellersCarousel**: **pseudo‑karuzela** — overflow-x scroll + strzałki, bez JS (lub lekki stub).
- **ValueProps**: siatka 3 ikon Lucide ze zdefiniowanym strokeWidth 1.5.
- **Newsletter**: Input + CTA; brak obsługi formularza.

---

## 5) Widoki, które mają powstać (klikalne makiety)

1. **Home v1** (Hero → Kolekcje → Bestsellery → Value Props → Lookbook → Newsletter → Footer).
2. **Listing produktów** (siatka 3–4 w rzędzie, sidebar filtrów **martwy**).
3. **PDP v1** (galeria, tytuł, cena, warianty jako chipsy, sekcja „Material Passport” placeholder, powiązane produkty).
4. **Koszyk (mini / strona)** — layout, ceny i CTA jako mock.
5. **Checkout (3 kroki)** — układ stron, puste pola formularzy, wizualna oś postępu.

---

## 6) Motion i mikrointerakcje (makiety)

- **Presety:** `initial={{opacity:0,y:30}}`, `whileInView={{opacity:1,y:0}}`, `viewport={{once:true,amount:0.2}}`.
- **Stagger**: 0.1 s w gridach.
- **Press effect**: `active:scale-95` na przyciskach.
- **Parallax hero**: lekki (2–4%) **tylko wizualny** (opcjonalnie, przy wyłączonym prefers-reduced-motion).

---

## 7) Zasady stylów (tokens)

- Używamy **OKLCH + aliasów brand-\*** jak w Biblii.
- Sekcje: `py-20 md:py-32`.
- Radius: przyciski `rounded-xl`, karty `rounded-2xl`, pola `rounded-lg`.
- CTA w złocie (gradient), focus ring w `brand-gold`.

---

## 8) Kryteria akceptacji (Design‑Only)

- [ ] Brak błędów kompilacji i ostrzeżeń Tailwind.
- [ ] Brak realnych requestów sieciowych.
- [ ] Wszystkie widoki dostępne z `/home` (linki lokalne lub #).
- [ ] Mocki JSON załadowane statycznie (import).
- [ ] Style, typografia, spacing i motion zgodne z Biblią.
- [ ] RWD: mobile ≥ 360px, tablet ≥ 768px, desktop ≥ 1280px.
- [ ] A11y wizualne: focusy widoczne; ikony z `aria-label`.

---

## 9) Co **nie** jest w zakresie

- ❌ Integracje (WooCommerce, API, płatności).
- ❌ Stan globalny, koszyk, logowanie, walidacja realna.
- ❌ Karuzela produkcyjna (Embla) — na tym etapie tylko overflow‑scroll albo lekki stub bez logiki.

---

## 10) Dostarczane artefakty

- Kod stron i komponentów (Next.js + Tailwind),
- **pliki mock JSON**,
- krótkie **README**: jak uruchomić lokalnie i gdzie dopinać realne dane w kolejnym sprincie.

---

**Uwagi końcowe:** Ten sprint ma w 100% odblokować prace nad designem i UX. Po akceptacji wizualnej wchodzimy w **Sprint 2: funkcjonalność i integracje** bez przepisywania UI.
