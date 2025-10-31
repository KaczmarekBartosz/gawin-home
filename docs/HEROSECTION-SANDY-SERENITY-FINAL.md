# Hero Section - Sandy Serenity Implementation Plan

**Status:** 🟡 Ready for Implementation
**Target File:** `components/sections/HeroSection.tsx`
**Changes:** Comprehensive redesign from "premium boutique" to "Scandinavian showroom"
**Estimated Time:** 45-60 minutes

---

## Visual Transformation

### FROM (Current - "Premium Boutique")
```
Dark, gold-accented, luxury feel
🟫 bg-brand-cream container
🟨 Gold buttons (brand-sand-primary)
🔘 Solid colored pins
📝 Copy: "Twój dom potrzebuje czegoś więcej niż mebli"
```

### TO (New - "Scandinavian Showroom")
```
Light, sandy, warm, peaceful feel
🟤 Pastel sandy gradient background
🪨 Stone/gray buttons with glass pins
💫 Glass-morphism pins & tooltips
📝 Copy: "Twój dom zasługuje na więcej.\nGAWIN MEBLE"
```

---

## Detailed Changes Required

### 1. SECTION CONTAINER & BACKGROUND

**Current (lines 45-47):**
```tsx
<section className="w-full bg-stone-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto bg-brand-cream rounded-2xl overflow-hidden shadow-lg">
```

**New:**
```tsx
<section className="w-full bg-gradient-to-br from-[#F6F3EE] via-[#EAE4DC] to-[#DDD3C8] pt-20 pb-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#F6F3EE] via-[#EAE4DC] to-[#DDD3C8] rounded-3xl overflow-hidden shadow-xl">
```

**Change:**
- Section background: from `bg-stone-50` to sandy gradient
- Container background: from `bg-brand-cream rounded-2xl` to sandy gradient `rounded-3xl`
- Shadow: from `shadow-lg` to `shadow-xl`

---

### 2. LEFT COLUMN - BADGE (NEW ELEMENT)

**Insert after line 51 (before existing space-y-6):**
```tsx
{/* Badge - NEW */}
<div className="inline-flex items-center gap-2 w-fit rounded-full
                bg-white/40 backdrop-blur-sm border border-white/50
                px-4 py-1 text-xs font-medium text-stone-600 shadow-sm">
  <span className="block h-2 w-2 rounded-full bg-stone-400" />
  <span>Naturalne piękno wnętrz</span>
</div>
```

**Position:** Before `<div className="space-y-6">` section

---

### 3. HEADING - COPY UPDATE & STYLING

**Current (lines 59-61):**
```tsx
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight">
  Twój dom potrzebuje czegoś więcej niż mebli
</h1>
```

**New:**
```tsx
<h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight">
  Twój dom zasługuje na więcej.<br/>
  <span className="text-stone-700">GAWIN MEBLE</span>
</h1>
```

**Changes:**
- Added `font-display` for larger, more elegant font
- Size: from `3xl...5xl` to `4xl...6xl` (bigger)
- Color: from `text-brand-charcoal` to `text-stone-800`
- Copy: new emotional message with break
- "GAWIN MEBLE" in `text-stone-700` (slightly lighter)

---

### 4. SUBHEADLINE - NEW COPY

**Current (lines 64-66):**
```tsx
<p className="text-base sm:text-base text-brand-charcoal/70 leading-normal">
  Odkryj premiumową kolekcję mebli, która łączy design z jakością.
</p>
```

**New:**
```tsx
<p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-md">
  Meble, które tworzą przestrzeń pełną spokoju, światła i harmonii.
  Zaprojektowane, by służyć przez lata — i cieszyć każdego dnia.
</p>
```

**Changes:**
- Size: from `text-base` to `text-base sm:text-lg`
- Color: from `text-brand-charcoal/70` to `text-stone-600`
- Leading: from `leading-normal` to `leading-relaxed`
- Added `max-w-md` to constrain width
- New copy (emotional, benefit-driven)

---

### 5. CTA BUTTONS - STYLING & COPY

**Current (lines 70-84):**
```tsx
<div className="flex flex-col sm:flex-row gap-3 pt-4">
  <Button variant="gold" size="lg" className="w-full sm:w-auto">
    <span className="flex items-center gap-2">
      Odkryj Kolekcję
      <ChevronRight className="w-4 h-4" />
    </span>
  </Button>
  <Button
    variant="outline"
    size="lg"
    className="w-full sm:w-auto"
  >
    Umów Konsultację
  </Button>
</div>
```

**New:**
```tsx
<div className="flex flex-col sm:flex-row gap-3 pt-4">
  <Button size="lg" className="w-full sm:w-auto bg-stone-800 text-stone-100 hover:bg-stone-700 rounded-xl">
    Przeglądaj kolekcje
  </Button>
  <Button size="lg" variant="outline" className="w-full sm:w-auto border-stone-400 text-stone-700 hover:bg-stone-100 rounded-xl">
    Zaprojektuj swoje wnętrze
  </Button>
</div>
```

**Changes:**
- Primary button: from `variant="gold"` to `bg-stone-800 text-stone-100 hover:bg-stone-700 rounded-xl`
- Removed ChevronRight icon
- Removed flex wrapper
- New copy: "Przeglądaj kolekcje" + "Zaprojektuj swoje wnętrze"
- Secondary button: from default outline to `border-stone-400 text-stone-700 hover:bg-stone-100 rounded-xl`
- Both buttons: explicit `rounded-xl`

---

### 6. BENEFITS SECTION - COPY & STYLING

**Current (lines 87-102):**
```tsx
<div className="pt-5 border-t border-brand-sand-primary/20 space-y-2 hidden sm:block">
  <div className="space-y-2 text-sm">
    <div className="flex items-start gap-2">
      <span className="text-brand-sand-primary font-bold text-base">✓</span>
      <div>
        <p className="font-semibold text-brand-charcoal text-sm">Darmowa dostawa</p>
      </div>
    </div>
    <div className="flex items-start gap-2">
      <span className="text-brand-sand-primary font-bold text-base">✓</span>
      <div>
        <p className="font-semibold text-brand-charcoal text-sm">Szybka wysyłka</p>
      </div>
    </div>
  </div>
</div>
```

**New:**
```tsx
<ul className="pt-8 border-t border-stone-300/40 grid gap-y-2 gap-x-6 sm:grid-cols-3 text-sm text-stone-700">
  <li className="flex items-center gap-2">
    <span className="text-stone-500 font-semibold">✓</span>
    Polska jakość
  </li>
  <li className="flex items-center gap-2">
    <span className="text-stone-500 font-semibold">✓</span>
    5-letnia gwarancja
  </li>
  <li className="flex items-center gap-2">
    <span className="text-stone-500 font-semibold">✓</span>
    Darmowa dostawa od 1999 zł
  </li>
</ul>
```

**Changes:**
- Changed from `<div>` to semantic `<ul>` + `<li>`
- Layout: from vertical `space-y-2` to 3-column grid `sm:grid-cols-3`
- Border: from `border-brand-sand-primary/20` to `border-stone-300/40`
- Text color: from `text-brand-charcoal` to `text-stone-700`
- Check mark color: from `text-brand-sand-primary` to `text-stone-500`
- New benefits: "Polska jakość", "5-letnia gwarancja", "Darmowa dostawa od 1999 zł"
- Changed from `hidden sm:block` to always visible (responsive grid)

---

### 7. RIGHT COLUMN - BACKGROUND GRADIENT

**Current (line 106):**
```tsx
<div className="relative bg-gradient-to-br from-brand-sand-lighter via-brand-sand-light to-brand-cream w-full h-full flex items-center justify-center overflow-hidden">
```

**New:**
```tsx
<div className="relative bg-[radial-gradient(circle_at_60%_40%,#F8F5F2_0%,#EAE4DC_60%,#DDD3C8_100%)] w-full h-full flex items-center justify-center overflow-hidden">
```

**Change:**
- From linear gradient to radial gradient
- Softer, more natural light effect
- Center of circle at 60% horizontally, 40% vertically

---

### 8. PRODUCT IMAGE COLLECTION BADGE (NEW)

**Insert before closing div of right column (after line 150):**
```tsx
{/* Collection label - positioned in corner */}
<div className="absolute bottom-6 right-6 inline-flex items-center gap-2
                bg-white/40 backdrop-blur-md border border-white/50
                rounded-lg px-3 py-1.5 text-xs font-medium text-stone-700 shadow-md">
  Sofa Ibiza · Kolekcja 2025
</div>
```

---

### 9. HOTSPOTS - GLASS MORPHISM PINS

**Current pins (lines 124-129):**
```tsx
<button
  className="relative z-10 w-10 h-10 rounded-full bg-brand-sand-primary hover:bg-brand-sand-primary/80 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white font-bold text-sm"
  aria-label={`Pin: ${hotspot.title}`}
>
  {hotspot.id}
</button>
```

**New:**
```tsx
<button
  className="relative z-10 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/60 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center text-stone-700 font-bold text-sm"
  aria-label={`Pin: ${hotspot.title}`}
>
  {hotspot.id}
</button>
```

**Changes:**
- Background: from solid `bg-brand-sand-primary` to glass `bg-white/40 backdrop-blur-md`
- Border: new `border border-white/50`
- Hover: from darker sand to `hover:bg-white/60`
- Text color: from `text-white` to `text-stone-700`
- Shadow: adjusted for glass effect

---

### 10. ANIMATED PULSE CIRCLE

**Current (line 132):**
```tsx
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-brand-sand-primary opacity-40 animate-pulse" />
```

**New:**
```tsx
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/50 opacity-50 animate-pulse" />
```

**Changes:**
- Border color: from `border-brand-sand-primary` to `border-white/50`
- Opacity: from `opacity-40` to `opacity-50`

---

### 11. TOOLTIP - GLASS MORPHISM

**Current (lines 135-148):**
```tsx
{activeHotspot === hotspot.id && (
  <div className="absolute z-20 bg-white rounded-lg shadow-2xl p-4 w-64 -translate-x-1/2 -translate-y-full -top-2 left-1/2">
    <h3 className="font-bold text-brand-charcoal text-sm mb-2">{hotspot.title}</h3>
    <p className="text-xs text-brand-charcoal/70 leading-relaxed">{hotspot.description}</p>
    <div className="mt-3 pt-3 border-t border-brand-sand-primary/20">
      <Button variant="gold" size="sm" className="w-full">
        <span className="flex items-center gap-1 justify-center">
          Dowiedz się więcej
          <ChevronRight className="w-3 h-3" />
        </span>
      </Button>
    </div>
  </div>
)}
```

**New:**
```tsx
{activeHotspot === hotspot.id && (
  <div className="absolute z-20 bg-white/80 backdrop-blur-xl border border-stone-200/50 rounded-xl shadow-xl p-4 w-64 -translate-x-1/2 -translate-y-full -top-2 left-1/2">
    <h3 className="font-bold text-stone-800 text-sm mb-2">{hotspot.title}</h3>
    <p className="text-xs text-stone-600 leading-relaxed">{hotspot.description}</p>
    <div className="mt-3 pt-3 border-t border-stone-200/30">
      <Button size="sm" className="w-full bg-stone-800 text-stone-100 hover:bg-stone-700 rounded-lg">
        Dowiedz się więcej
      </Button>
    </div>
  </div>
)}
```

**Changes:**
- Background: from `bg-white` to `bg-white/80 backdrop-blur-xl`
- Border: new `border border-stone-200/50`
- Rounded: from `rounded-lg` to `rounded-xl`
- Shadow: changed to `shadow-xl`
- Text: from `text-brand-charcoal` to `text-stone-800`
- Button: from `variant="gold"` to `bg-stone-800 text-stone-100 hover:bg-stone-700`
- Removed ChevronRight icon
- Removed flex wrapper from button

---

## Hotspots Data (NO CHANGES)

Keep existing hotspots array as-is (lines 8-39). Perfect for showcasing product details.

---

## Imports (NO CHANGES)

Keep existing imports:
```tsx
import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";  // ChevronRight can stay (not used after refactor)
import { useState } from "react";
```

ChevronRight no longer used but safe to keep.

---

## Animation Configuration (OPTIONAL ENHANCEMENT)

Add framer-motion fade-in effect to entire section:

```tsx
import { motion } from "framer-motion";

// Wrap section in:
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="w-full bg-gradient-to-br from-[#F6F3EE] ..."
>
```

---

## Summary of Changes

| Element | Current | New | Priority |
|---------|---------|-----|----------|
| Section BG | `bg-stone-50` | Sandy gradient | 🔴 HIGH |
| Container BG | `bg-brand-cream` | Sandy gradient | 🔴 HIGH |
| Badge | ❌ Missing | Glass badge "Naturalne piękno wnętrz" | 🔴 HIGH |
| H1 | Old copy | "Twój dom zasługuje na więcej. GAWIN MEBLE" | 🔴 HIGH |
| Subheadline | Old copy | New emotional copy | 🔴 HIGH |
| CTA buttons | Gold buttons | Stone-800 buttons | 🔴 HIGH |
| Benefits | Old (2 items) | New (3 items, 3-column) | 🔴 HIGH |
| Right BG | Linear gradient | Radial gradient | 🟡 MEDIUM |
| Pins | Solid color | Glass morphism | 🟡 MEDIUM |
| Tooltip | Plain white | Glass morphism | 🟡 MEDIUM |
| Collection badge | ❌ Missing | "Sofa Ibiza · Kolekcja 2025" | 🟡 MEDIUM |
| Animations | Basic pulse | + Optional fade-in | 🟢 LOW |

---

## Implementation Checklist

- [ ] Update section background gradient
- [ ] Update container styling
- [ ] Add new badge component above H1
- [ ] Update H1 copy and styling
- [ ] Update subheadline copy and styling
- [ ] Update CTA button copy and styling
- [ ] Update benefits list (copy, layout, colors)
- [ ] Update right column gradient
- [ ] Update hotspot pins (glass style)
- [ ] Update tooltip styling (glass)
- [ ] Add collection label in corner
- [ ] Test on localhost:3005
- [ ] Verify responsive (mobile/tablet/desktop)
- [ ] Verify hover states on pins & buttons
- [ ] Commit changes to Git

---

## Testing Points

✓ **Visual:**
- Sandy gradient renders correctly
- Glass morphism effects visible
- Text colors contrast properly
- Buttons responsive and styled

✓ **Interactive:**
- Hotspot hover triggers tooltip
- Tooltip glass effect visible
- Button hover states work
- Mobile: pins touchable, tooltip readable

✓ **Browser Compatibility:**
- Glass morphism (backdrop-filter) works
- Gradients render smoothly
- No layout shift on hover

---

**Status:** Ready for implementation ✓
**Est. Time:** 45-60 minutes
**Complexity:** Medium (mostly copy + styling changes)
