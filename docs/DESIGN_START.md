# Gawin-Home — Design Start (Mock)

Cel: Natychmiast odblokować prace nad treścią i layoutem bez backendu.

## Jak uruchomić

```bash
pnpm install
pnpm dev
# Otwórz: http://localhost:3000/mock
```

## Co jest dostępne (mock)
- `/mock` — landing dla mocka.
- `/mock/products` — prosta lista produktów (PLP) z obrazkami.
- `/mock/product/[slug]` — podstawowy PDP z ceną, opisem i przyciskami (mock).

Dane: `data/products.json` (kilka przykładowych pozycji). Adapter: `lib/data-adapters/mock.ts`.

Obrazy: dopuszczone domeny w `next.config.ts` (`images.unsplash.com`, `images.pexels.com`, `picsum.photos`).

## Jak projektować
- Modyfikuj teksty/układy bez obaw o integrację — mock działa niezależnie od Shopify.
- Możesz tworzyć nowe sekcje i komponenty, podpinając je tymczasowo pod `/mock/*`.
- Docelowo dodamy adapter `wp.ts` i przełącznik `DATA_MODE`.

## Następne kroki (po etapie mock)
- i18n (PL/EN) + hreflang/canonical, sitemap/robots + JSON-LD.
- Blog (mock) pod `/blog`, potem integracja z WP.
- Telemetria (Sentry + analytics) i CMP (cookies/RODO).

> Uwaga: Trasy `/mock/*` są pomocnicze i mogą zostać usunięte po podpięciu realnych danych.

