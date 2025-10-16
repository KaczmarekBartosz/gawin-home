# Gawin-Home — STATUS (Sprint Design-Only, 2025-10-17)

Ten plik zbiera aktualny stan projektu po wdrożeniu kompletnej makiety UI na mockach. Służy jako punkt startowy przed rozpoczęciem Sprintu 2 (funkcjonalności, integracje).

## 🔀 Trasy (widoki)
- `/home` – strona główna, tryb Dark Entry + sekcje Showroom.
- `/listing` – listing produktów (mock filtrowania + scrollowana lista kart).
- `/pdp` – strona produktu z Material Passport, wariantami i rekomendacjami.
- `/cart` – koszyk mockowy, podsumowanie, kod rabatowy, upsell.
- `/checkout` – checkout trzyetapowy (dostawa, płatność, podsumowanie).
- `/mock/*` – pozostałość po poprzednim mocku (do rozważenia archiwizacja/usunięcie).

## 🧱 Design System / komponenty
- Tokeny OKLCH, gradienty, spacing 8 px w `app/globals.css`.
- Fonty: Geist Sans + Space Grotesk (`app/fonts.ts`, `app/layout.tsx`).
- Komponenty shadcn/ui z premium stylingiem (`components/ui/*`).
- Layout helpers: `components/layout/section.tsx`, `components/layout/container.tsx`.
- Karty: `components/cards/product-card.tsx`, `components/cards/category-card.tsx`.
- Styl typu „Technologiczny luksus + ciepły minimalizm” wdrożony według `docs/nowy_styl.md` (hero hotspots, capsule CTA, SpecCard, akordeon FAQ).

## 📦 Mocki danych
- JSON: `mock/products.json`, `mock/categories.json`, `mock/value-props.json`, `mock/lookbook.json`, `mock/hero.json`.
- Adapter: `lib/data-adapters/mock.ts` (spójny interfejs `MockProduct`).

## 📑 Dokumentacja operacyjna
- `docs/IMPLEMENTATION_PROGRESS.md` – checklisty faz (1–6 odhaczone).
- `docs/PROGRESS_LOG.md` – log sprintu (wpis 2025-10-17 + hotfix motion presets).
- `docs/biblia.md` + `docs/brief.md` – aktywne źródła wymagań.
- `docs/archive/` – archiwum wcześniejszych planów i instrukcji.

## ⚠️ Uwagi / znane kwestie
- Dev serwer: jeśli Next nie ma dostępu do cache SWC → `XDG_CACHE_HOME=$PWD/.cache pnpm dev` albo załóż `/home/nicon/.cache/next-swc`.
- Legacy `/mock/*` – potwierdzić, czy nadal potrzebne; w przeciwnym razie przenieść do archiwum.

## ▶️ Jak wznowić prace
```bash
pnpm install
XDG_CACHE_HOME=$PWD/.cache pnpm dev
# Odwiedź http://localhost:3000/home
```

## ✔️ Najbliższe kroki
1. Plan sprintu funkcjonalnego (integracje, stan, płatności) w oparciu o aktualne UI.
2. Uporządkować pozostałe mockowe trasy `/mock/*` (usunąć lub zarchiwizować).
3. Kontynuować logowanie postępu w `docs/PROGRESS_LOG.md` i checklisty w `docs/IMPLEMENTATION_PROGRESS.md`.
