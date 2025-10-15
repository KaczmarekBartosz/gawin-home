# Gawin-Home — Troubleshooting (Dev/Build)

## Problem: Build error — `@alloc/quick-lru`

Podczas `pnpm build` pojawił się błąd:

```
An error occurred in `next/font`.
Error: Cannot find module '@alloc/quick-lru'
Require stack:
- ...\\@tailwindcss\\postcss\\dist\\index.js
...
```

Prawdopodobna przyczyna: niespójna instalacja pakietów (PNPM virtual store przeniesiony między różnymi ścieżkami) + brakująca transitive dependency.

### Rozwiązanie
1) Wyczyść i zainstaluj zależności w repo `gawin-home` (w TTY):
```
cd "..\\Nowe Projekty 2025\\gawin-home"
pnpm install
```
Jeśli PNPM zgłasza komunikat o „Unexpected virtual store location”, pozwól na reinstalację (`pnpm install`).

2) W razie potrzeby doinstaluj brakujący pakiet (dev):
```
pnpm add -D @alloc/quick-lru
```

3) Uruchom dev:
```
pnpm dev
```

## Problem: PNPM — Unexpected virtual store location

Komunikat:
```
Unexpected virtual store location...
If you want to use the new virtual store location, reinstall your dependencies with "pnpm install".
```

### Rozwiązanie
- Uruchom `pnpm install` w katalogu projektu z TTY (interaktywna powłoka), aby PNPM zainicjalizował poprawny virtual store.
- Alternatywnie ustaw `PNPM_HOME` i upewnij się, że ścieżki nie są współdzielone między różnymi projektami.

## Dodatkowe wskazówki
- Jeśli problem się utrzymuje: usuń `node_modules` i folder `.pnpm` w projekcie, a następnie `pnpm install`.
- Upewnij się, że używasz PNPM >= 8 oraz Node >= 18.
- Po reinstalacji: `pnpm dev` i odwiedź `http://localhost:3000/mock`.

