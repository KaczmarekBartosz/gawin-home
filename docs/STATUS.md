# Gawin-Home — STATUS (Checkpoint 2025-10-15)

Ten plik podsumowuje aktualny stan prac, aby łatwo wznowić po przerwie.

## Gdzie skończyliśmy
- Przygotowany pełny „design-unblock” na mocku (bez backendu):
  - Strona mock: `/mock` z sekcjami (Hero, Trusted Brands, Featured, Categories, Newsletter).
  - Listing i produkt: `/mock/products`, `/mock/product/[slug]`.
  - Dane: `data/products.json`; adapter: `lib/data-adapters/mock.ts`.
  - Obrazy z domen: Unsplash/Pexels/Picsum (konfiguracja w `next.config.ts`).
- Dokumenty wsparcia:
  - `docs/DESIGN_START.md` — jak uruchomić i gdzie projektować.
  - `docs/TROUBLESHOOTING.md` — znane problemy i naprawy.
  - `docs/PROGRESS_LOG.md` — wpis “Design Unblock (Mock)”.

## Znane problemy
- PNPM virtual store: konieczna reinstalacja zależności w TTY (`pnpm install`).
- Brak transitive `@alloc/quick-lru` w ścieżce builda: w razie potrzeby `pnpm add -D @alloc/quick-lru`.

## Jak wznowić
```bash
cd "..\\Nowe Projekty 2025\\gawin-home"
pnpm install
pnpm dev
# Otwórz: http://localhost:3000/mock
```

## Najbliższe kroki (Design)
- Dopracować copy/układ sekcji w `components/sections/*` zgodnie z wizją (Dark Entry + Light Showroom, akcent gold, rounded-xl).
- Rozszerzyć mock o Testimonials/Editorial (opcjonalnie) i dopracować karty produktów.

## Commit referencyjny
- `5917447` — feat(mock): add design-ready mock homepage, sections and product flows

