# HeroSection Component Guide

**Component:** HeroSection (Product Showcase)
**Location:** `components/sections/home/HeroSection.tsx`
**Type:** Server Component with Client Interactivity
**Status:** ✅ Complete & Production Ready

---

## 📐 Component Overview

The HeroSection displays a premium product showcase (Sofa Ibiza) with interactive hotspots. It combines:
- Left side: Marketing content & CTAs
- Right side: Product image with clickable information pins

### Key Features
- ✅ Responsive layout (mobile-first)
- ✅ Interactive hover hotspots (5 pins)
- ✅ Accessible tooltips
- ✅ Brand-consistent styling
- ✅ Optimized WebP image

---

## 🎯 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  OUTER: bg-brand-cream (pt-20 pb-8)                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  CONTAINER: bg-white rounded-2xl shadow-lg            │  │
│  │  ┌──────────────────┬──────────────────────────────┐  │  │
│  │  │  LEFT (40%)      │  RIGHT (60%)                 │  │  │
│  │  │  bg-cream        │  bg-black (image)            │  │  │
│  │  │                  │                              │  │  │
│  │  │  • GAWIN24.PL    │  🖼️ SOFA IMAGE              │  │  │
│  │  │  • HEADLINE      │  [PIN 1] 🔴                 │  │  │
│  │  │  • SUBHEADING    │  [PIN 2] 🔴                 │  │  │
│  │  │  • CTA BUTTONS   │  [PIN 3] 🔴 TOOLTIP         │  │  │
│  │  │  • BENEFITS      │  [PIN 4] 🔴                 │  │  │
│  │  │                  │  [PIN 5] 🔴                 │  │  │
│  │  └──────────────────┴──────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Left Side - Content

### Structure
```tsx
<div className="bg-brand-cream flex flex-col justify-center px-6 sm:px-10 py-12 lg:py-16 space-y-8">
```

### Elements

#### 1. Website Label
```tsx
<p className="text-xs sm:text-sm font-semibold text-brand-gold tracking-widest uppercase">
  Gawin24.pl
</p>
```
- Small gold caps
- Sets brand context

#### 2. Main Headline
```tsx
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight">
  Twój dom potrzebuje czegoś więcej niż mebli
</h1>
```
- Responsive sizing: 3xl → 4xl → 5xl
- Tight line height for proper wrapping
- No max-width (uses full left column)

#### 3. Subheading
```tsx
<p className="text-base sm:text-base text-brand-charcoal/70 leading-normal">
  Odkryj premiumową kolekcję mebli, która łączy design z jakością.
</p>
```
- Consistent text-base across all breakpoints
- Normal line height for good readability
- 70% opacity for visual hierarchy

#### 4. CTA Buttons
```tsx
<div className="flex flex-col sm:flex-row gap-3 pt-4">
  <Button variant="gold" size="lg">Odkryj Kolekcję</Button>
  <Button variant="outline" size="lg">Umów Konsultację</Button>
</div>
```
- Responsive: column on mobile, row on tablet+
- Gap: 3 (12px)
- Both size "lg"

#### 5. Benefits Section (hidden on mobile)
```tsx
<div className="pt-5 border-t border-brand-gold/20 space-y-2 hidden sm:block">
  <div className="space-y-2 text-sm">
    <div className="flex items-start gap-2">
      <span className="text-brand-gold font-bold text-base">✓</span>
      <p className="font-semibold text-brand-charcoal text-sm">Darmowa dostawa</p>
    </div>
    <div className="flex items-start gap-2">
      <span className="text-brand-gold font-bold text-base">✓</span>
      <p className="font-semibold text-brand-charcoal text-sm">Szybka wysyłka</p>
    </div>
  </div>
</div>
```
- Hidden on mobile (`hidden sm:block`)
- Gold checkmarks
- Separated by border

---

## 🖼️ Right Side - Product Image & Hotspots

### Image Container
```tsx
<div className="relative bg-black w-full h-full flex items-center justify-center overflow-hidden">
  <img
    src="/sofa_ibiza.webp"
    alt="Sofa Rozkładana Ibiza"
    className="w-full h-full object-cover"
  />
```

### Hotspots Data Structure
```typescript
const sofaHotspots = [
  {
    id: 1,
    title: "Tkanina Bouclé Premium",
    description: "Miękka, pętelkowa struktura - modna, trwała i przyjemna w dotyku",
    position: { x: 55, y: 45 },  // % from top-left
  },
  // ... 4 more hotspots
];
```

### Pin Rendering (per hotspot)
```tsx
<div
  className="absolute"
  style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)' }}
  onMouseEnter={() => setActiveHotspot(id)}
  onMouseLeave={() => setActiveHotspot(null)}
>
  {/* Pin button */}
  <button className="w-10 h-10 rounded-full bg-brand-gold text-white">
    {id}
  </button>

  {/* Animated pulse circle */}
  <div className="absolute w-12 h-12 rounded-full border-2 border-brand-gold animate-pulse" />

  {/* Tooltip (on hover) */}
  {activeHotspot === id && (
    <div className="absolute z-20 bg-white rounded-lg shadow-2xl p-4 w-64">
      <h3>{title}</h3>
      <p>{description}</p>
      <Button>Dowiedz się więcej</Button>
    </div>
  )}
</div>
```

### Pin Positions (Sofa Ibiza)
| Pin | Feature | Position | Notes |
|-----|---------|----------|-------|
| 1 | Tkanina Bouclé Premium | 55%, 45% | Right center (main sofa area) |
| 2 | Ryflowane Siedzisko | 50%, 58% | Center-left (visible stitching) |
| 3 | Pojemnik na Pościel | 45%, 68% | Lower center (storage area) |
| 4 | Funkcja Spania DL | 65%, 35% | Right upper (backrest) |
| 5 | Wymiary & Cena | 30%, 75% | Lower left (info) |

---

## 🎯 Hotspot Interaction

### State Management
```typescript
const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
```

### Hover Flow
1. **Mouse Enter Pin Area**
   - `onMouseEnter` → `setActiveHotspot(id)`
   - Tooltip renders (z-20)
   - Animated circle appears

2. **Mouse Hover Tooltip**
   - Tooltip remains visible
   - Button is interactive (`pointer-events-auto`)

3. **Mouse Leave Pin Area**
   - `onMouseLeave` → `setActiveHotspot(null)`
   - Tooltip disappears smoothly

---

## 📱 Responsive Behavior

### Breakpoints
```
Mobile      sm (640px)    md (768px)    lg (1024px)
─────────────────────────────────────────────────────
1 col       1 col → 2 col transition
            Benefits hidden → visible
```

### Left Side Sizing
```css
px-6 sm:px-10              /* Padding: 24px → 40px */
py-12 lg:py-16             /* Padding-y: 48px → 64px */
text-3xl sm:text-4xl lg:text-5xl  /* Headline scaling */
```

### Min Heights
```css
min-h-[500px] lg:min-h-[600px]  /* Maintain aspect ratio */
```

---

## 🎨 Color Reference

```typescript
// Text Colors
text-brand-charcoal    // #1a1a1a (headings, text)
text-brand-gold        // #d4a574 (accents, checkmarks)
text-brand-charcoal/70 // 70% opacity (subtext)

// Background Colors
bg-brand-cream         // #fafaf9 (left side)
bg-white              // #ffffff (main container)
bg-black              // #000000 (image area)

// Interactive
hover:bg-brand-gold/80
border-brand-gold/20
```

---

## 🔧 Common Customizations

### Change Headline
```tsx
<h1>Nowy nagłówek</h1>
```

### Add/Remove Hotspots
1. Edit `sofaHotspots` array
2. Add new object with id, title, description, position
3. Optional: Update pin count logic

### Adjust Pin Positions
```typescript
// Fine-tune x, y (in percentages)
position: { x: 55, y: 45 }  // ← Change these
```

### Change Product Image
```tsx
<img src="/new-image.webp" alt="..." />
```
- Image must be in `/public/` folder
- Use WebP format for optimization

### Modify Tooltip Content
```tsx
<h3>{hotspot.title}</h3>
<p>{hotspot.description}</p>
```
- Keep descriptions concise
- Use Polish language

---

## ⚠️ Known Limitations & Notes

### Hotspot Positioning
- Uses % positioning (percentage of image width/height)
- Works well for 16:9 aspect ratios
- Might need adjustment for different image dimensions

### Tooltip Positioning
- Currently positioned relative to pin location
- May overflow on small screens
- Solution: Add media query to adjust tooltip width on mobile

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported (uses CSS Grid, Flexbox, modern JS)

---

## 🚀 Future Enhancements

### Potential Improvements
1. **Tooltip arrows** - Add pointer/triangle to tooltip
2. **Analytics** - Track which pins are most clicked
3. **Mobile touch** - Use tap instead of hover on touch devices
4. **Animation** - Add entrance animations to pins
5. **Dark mode** - Adjust colors for dark theme

### Code Refactoring
- Extract hotspots data to separate file
- Create reusable Tooltip component
- Create reusable Pin component

---

## 📖 Example Usage

```tsx
import { HeroSection } from '@/components/sections/home/HeroSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* Other sections */}
    </main>
  );
}
```

---

## 🔗 Related Files

- **globals.css** - Color system definitions
- **button.tsx** - CTA button styling
- **layout.tsx** - Main layout container

---

**Dokument wersja:** 1.0.0
**Last updated:** 2025-10-31
**Status:** ✅ Production Ready
