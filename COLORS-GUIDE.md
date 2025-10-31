# 🎨 Przewodnik Kolorów - gawin-home

## Brand Colors (LEGACY Design System)

```
⚪ CHARCOAL (główny tekst)
   - HEX: #1a1a1a
   - Klasa: text-brand-charcoal
   - Użycie: Nagłówki, tekst główny na jasnym tle

🟡 GOLD (akcent premium)
   - HEX: #d4a574
   - Klasa: text-brand-gold, bg-brand-gold
   - Użycie: CTA buttons, highlights, akcenty

🟫 COPPER (secondary gold)
   - HEX: #b8956a
   - Klasa: text-brand-copper, bg-brand-copper
   - Użycie: Dekoracyjne elementy, hover states

🟦 CREAM (jasne tło)
   - HEX: #fafaf9
   - Klasa: bg-brand-cream, text-brand-cream
   - Użycie: Jasne tła, kontrast z charcoal

🟨 SAND (jasne tło alternatywne)
   - HEX: #f5f5f5
   - Klasa: bg-brand-sand
   - Użycie: Section backgrounds, subtle contrast
```

## White & Transparency (dla video backgrounds)

```
⚪ WHITE
   - Klasa: text-white, bg-white
   - Użycie: Tekst na ciemnych/video backgrounds

💨 WHITE + TRANSPARENCY
   - text-white/50  (50% opacity)
   - text-white/60  (60% opacity)
   - text-white/70  (70% opacity)
   - text-white/85  (85% opacity)
   - bg-white/10    (10% opacity backgrounds)
```

## Brand Color + Transparency

```
text-brand-charcoal/60   → 60% opacity charcoal
text-brand-charcoal/50   → 50% opacity charcoal
text-brand-gold/80       → 80% opacity gold
bg-brand-gold/10         → 10% opacity gold background
bg-brand-gold/5          → 5% opacity gold background
```

## Black & Overlays

```
🔴 BLACK OVERLAYS (dla video backgrounds)
   - bg-black/40  → 40% opacity (readable text overlay)
   - bg-black/30  → 30% opacity (lighter overlay)
```

## Gradient Example

```css
/* Gold gradient (główny) */
bg-gradient-to-r from-brand-gold to-brand-copper
bg-gradient-to-br from-white via-brand-cream/30 to-brand-cream/50
```

## Neutrals (System)

```
Gray Colors (nie używaj ich - używaj brand colors zamiast):
- gray-50, gray-100, gray-200, gray-300, gray-400, gray-500, gray-600
❌ UNIKAJ: text-gray-600, text-gray-500
✅ UŻYWAJ: text-brand-charcoal/60, text-white/60
```

## Layout Constraints (FIX)

```
❌ MAX-WIDTH PROBLEMS:
max-w-2xl  → za wąski dla tekstu (każde słowo w linii)
max-w-3xl  → lepiej dla polskiego tekstu
max-w-4xl  → zapatrz dla sekcji zawartości
max-w-full → bez ograniczenia (wymaga padding)

✅ PATTERN:
<p className="text-body-large text-white/85 max-w-3xl leading-relaxed">
```

## Dark Mode (@dark selector)

```
W dark mode:
- text-brand-charcoal → #fafaf9 (light text)
- bg-brand-cream → #08 oklch (dark background)
```

---

## Quick Reference for Sections

### Hero Section (VIDEO background)
```
- bg: video overlay (bg-black/40)
- text: text-white, text-white/85, text-white/70
- accent: text-brand-gold
- subtitle: text-white/70
```

### Normal Sections (white background)
```
- bg: bg-white
- text: text-brand-charcoal
- muted: text-brand-charcoal/60, text-brand-charcoal/50
- accent: text-brand-gold
- button: bg-brand-gold text-brand-charcoal
```

### CTA Sections (dark background)
```
- bg: bg-brand-charcoal (dark)
- text: text-white
- button: bg-brand-gold text-brand-charcoal
```
