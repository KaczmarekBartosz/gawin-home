# LEGACY Design System - Comprehensive Plan

**Date:** 2025-10-31
**Goal:** Unified LEGACY style across ALL home page sections
**Status:** 🟨 In Implementation

---

## 1. DESIGN FOUNDATION

### Color Palette

#### Dark Entry (Hero)
- Background: `bg-white` with subtle gradient
- Accent: `text-brand-gold` (#d4af37)
- Text: `text-brand-charcoal` (#1a1a1a)

#### Light Showroom (Product Sections)
- Background: `bg-white`
- Accent: `text-brand-gold`
- Text: `text-brand-charcoal`

#### Dark Sections (Features/Testimonials)
- Background: `bg-brand-charcoal` or dark gradient
- Accent: `text-brand-gold`
- Text: `text-brand-cream`

### Spacing System (8px grid)

```
Section Vertical:   py-24 md:py-32
Section Horizontal: px-4 sm:px-6 lg:px-8
Container Max:      max-w-7xl
Horizontal Margin:  mx-auto

Grid Gaps:
- Small:   gap-6
- Medium:  gap-8
- Large:   gap-10

Card/Box Padding:
- Compact: p-6
- Normal:  p-8
- Spacious: p-10
```

### Typography System

```
Display:     text-display-hero (4.5rem, bold, leading-tight)
Headings:
  - H1:      text-h1 (2.25rem, bold, leading-relaxed)
  - H2:      text-h2 (1.875rem, bold, leading-relaxed)
  - H3:      text-h3 (1.5rem, bold, leading-tight)

Body:
  - Large:   text-body-large (1.125rem, leading-relaxed)
  - Normal:  text-body (1rem, leading-relaxed)
  - Small:   text-body-small (0.875rem, leading-relaxed)

Captions:
  - Label:   text-label (uppercase, tracking-widest)
  - Caption: text-caption (0.75rem, muted)
```

### Border Radius

```
Buttons/Small:  rounded-xl (1.5rem)
Cards/Medium:   rounded-2xl (2rem)
Large Elements: rounded-3xl (3rem)
```

---

## 2. SECTION STRUCTURE - REUSABLE PATTERN

Every section follows this pattern:

```tsx
<section className="py-24 md:py-32 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="text-center mb-16 md:mb-20">
      <span className="text-label uppercase text-brand-gold">LABEL</span>
      <h2 className="text-h1 text-brand-charcoal mt-4 mb-6">Title</h2>
      <p className="text-body-large text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Description
      </p>
    </div>

    {/* Section Content */}
    <div className="...content...">
      ...
    </div>

  </div>
</section>
```

---

## 3. SECTIONS TO FIX

### ✅ 1. HeroSection
**Status:** DONE
**Changes Made:**
- ✅ White background with gradient
- ✅ Proper spacing (py-24/md:py-32)
- ✅ Trust stats grid layout
- ✅ Leading-relaxed typography

---

### 🔄 2. BestsellersCarousel
**Current State:** Minimal - just carousel, no header
**To Fix:**
- Add section wrapper (py-24 md:py-32)
- Add section header (label, title, description)
- Improve carousel spacing/padding
- Better visual hierarchy

**Target Structure:**
```
<section py-24 md:py-32>
  <header>
    - Label: "BESTSELLERY"
    - Title: "Najchętniej wybierane"
    - Description: "..."
  </header>
  <carousel>
    - Embla carousel with products
    - Gap: gap-8 or gap-10
  </carousel>
</section>
```

---

### 🔄 3. LookbookGrid
**Current State:** Has structure but needs LEGACY polish
**To Fix:**
- Better spacing (gap-8 → gap-10)
- Section header alignment
- Card layout improvements
- Consistent dark/light backgrounds
- Typography fixes

**Target:**
- Light background (white)
- Clear section hierarchy
- Proper grid spacing
- Better image aspect ratios

---

### 🔄 4. TestimonialsSection
**Current State:** Already fixed by me
**Verify:**
- Spacing is correct
- Cards have proper padding
- Layout responsive

---

### 🔄 5. TrustedBrandsSection
**Current State:** Unknown - needs review
**To Fix:**
- Section header
- Grid spacing (gap-8/gap-10)
- Logo sizing/alignment
- Background consistency

---

### 🔄 6. InstagramSection
**Current State:** Unknown - needs review
**To Fix:**
- Section structure
- Grid layout (masonry or standard grid?)
- Image spacing
- CTA placement
- Background

---

### 🔄 7. NewsletterSection
**Current State:** Unknown - needs review
**To Fix:**
- Form layout (centered, clean)
- Input/button styling
- Section spacing
- Mobile responsiveness
- Background (white or dark?)

---

### 🔄 8. FooterLinks
**Current State:** Unknown - needs review
**To Fix:**
- Column spacing
- Link styling
- Social icons
- Mobile layout
- Background (dark or white?)

---

## 4. IMPLEMENTATION ORDER

```
PRIORITY 1 (Foundation):
  1. ✅ HeroSection (DONE)
  2. BestsellersCarousel (Wrapper + Header)
  3. LookbookGrid (Polish existing)

PRIORITY 2 (Core):
  4. TestimonialsSection (Verify)
  5. TrustedBrandsSection (Structure)
  6. InstagramSection (Structure)

PRIORITY 3 (Conversion):
  7. NewsletterSection (Forms)
  8. FooterLinks (Footer)

PRIORITY 4 (Polish):
  9. Test all sections
  10. Visual review
  11. Mobile testing
  12. Final tweaks
```

---

## 5. COMMON FIXES TEMPLATE

For each section:

```
[ ] Add/fix section wrapper with py-24 md:py-32
[ ] Ensure max-w-7xl mx-auto
[ ] Add proper section header (label, title, description)
[ ] Fix content spacing (gap-8 or gap-10)
[ ] Ensure responsive padding (px-4 sm:px-6 lg:px-8)
[ ] Typography: text-h1, text-body-large with leading-relaxed
[ ] Consistent color scheme
[ ] Test on mobile (320px, 375px, 480px)
[ ] Test on tablet (768px, 1024px)
[ ] Test on desktop (1440px+)
```

---

## 6. SUCCESS CRITERIA

✅ All sections follow unified LEGACY style
✅ Consistent spacing throughout (no random px-6 vs px-8)
✅ Proper typography hierarchy
✅ Responsive on all devices
✅ Clear visual hierarchy (headers, content, CTAs)
✅ Smooth flow from Hero → Products → Inspiration → Trust → Newsletter → Footer
✅ No "broken" layouts or cramped spacing

---

## 7. PROGRESS TRACKING

```
HeroSection:           ✅ 100%
BestsellersCarousel:   🟨  0% → (in progress)
LookbookGrid:          🟨  0% → (in progress)
TestimonialsSection:   ✅ 100%
TrustedBrandsSection:  🟨  0% → (pending)
InstagramSection:      🟨  0% → (pending)
NewsletterSection:     🟨  0% → (pending)
FooterLinks:           🟨  0% → (pending)

Overall: ~25% Complete
```

