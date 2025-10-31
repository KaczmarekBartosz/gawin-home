# 📦 Sections Structure - gawin-home

## Active Sections (Used in home page)

All active sections are in `components/sections/` directory:

```
components/sections/
├── home/
│   ├── HeroSection.tsx           ✨ Video background hero with trust indicators
│   ├── BestsellersCarousel.tsx    🎠 Embla carousel with product cards
│   ├── TestimonialsSection.tsx    ⭐ Customer testimonials grid (6 items)
│   ├── TrustedBrandsSection.tsx   🏢 Brand logos carousel
│   ├── InstagramSection.tsx       📸 Instagram gallery (6 items)
│   └── NewsletterSection.tsx      📧 Newsletter signup form
├── LookbookGrid.tsx              📚 Lookbook collections with styling tips
└── LookbookCard.tsx              🎨 Individual lookbook card component
```

## Integration in Home Page

File: `app/home/page.tsx`

```typescript
// Rendering order:
1. HeroSection         // Video background + headline
2. BestsellersCarousel // Product showcase
3. LookbookGrid        // Design inspiration
4. TestimonialsSection // Social proof
5. TrustedBrandsSection// Partner brands
6. InstagramSection    // Social media gallery
7. NewsletterSection   // Call to action
// Footer (from app/layout.tsx - global)
```

## Backup Archive

Unused sections are archived in `components/.sections-backup/` for future reference:

```
.sections-backup/
├── Product pages:
│   ├── ProductGrid.tsx
│   ├── ProductImageGallery.tsx
│   ├── ProductInfo.tsx
│   └── ProductBreadcrumb.tsx
├── Filtering & Search:
│   ├── AdvancedVisualFilter.tsx
│   ├── FilterSidebar.tsx
│   └── SearchSort.tsx
├── Hero variations:
│   ├── hero-section.tsx
│   └── hero-wellness.tsx
├── Other:
│   ├── CategoryShowcase.tsx
│   ├── featured-products.tsx
│   ├── InteractiveProductCarousel.tsx
│   ├── PremiumMicrointeractions.tsx
│   ├── ReviewsSection.tsx
│   ├── RoomDesignerPreview.tsx
│   ├── categories-showcase.tsx
│   ├── newsletter.tsx
│   ├── trusted-brands.tsx
│   └── newsletter/ (folder with duplicate)
```

## Section Features

### 1. HeroSection
- **Video Background**: `https://gawin.pl/gawin-meble-lozko-paris.mp4`
- **Dark Overlay**: `bg-black/40` for text readability
- **Text Colors**: White for contrast on video
- **Trust Stats**: 3-column grid (10 lat, 2500+, 4.9/5)
- **CTA Buttons**: Primary (gold) + Secondary (outline)
- **Scroll Indicator**: Animated chevron at bottom

### 2. BestsellersCarousel
- **Layout**: Embla carousel (85% mobile, 45% tablet, 380px desktop)
- **Cards**: ProductCard component with images
- **CTA**: "Przeglądaj wszystkie bestsellery" button
- **Max-width**: `max-w-3xl` for descriptions

### 3. LookbookGrid
- **Grid**: 1 column (mobile), 3 columns (desktop)
- **Cards**: LookbookCard with featured state support
- **Additional Sections**:
  - How-to guide (4 steps)
  - Styling tips (4 bullet points)
  - Benefits callouts (3 items)
  - CTA section with button
- **Max-width**: `max-w-3xl` for text content

### 4. TestimonialsSection
- **Grid**: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- **Cards**: 6 testimonials with star ratings
- **Avatar**: Circular images (14x14)
- **Closing**: "+2500 happy customers" stat
- **Max-width**: `max-w-3xl` for description

### 5. TrustedBrandsSection
- **Grid**: 2 columns (mobile), 3 columns (tablet), 6 columns (desktop)
- **Logo Display**: Grayscale → Full color on hover
- **Brands**: Vitra, Herman Miller, Knoll, Cassina, B&B Italia, Poltrona Frau
- **Max-width**: `max-w-3xl` for description

### 6. InstagramSection
- **Grid**: 2 columns (mobile), 3 columns (tablet), 6 columns (desktop)
- **Hover**: Gold Instagram icon appears on overlay
- **CTA**: "Obserwuj nas" button linking to Instagram
- **Max-width**: `max-w-3xl` for description

### 7. NewsletterSection
- **Background**: Dark charcoal with gold border
- **Form**: Email input + Subscribe button
- **Features**: -10% discount mention
- **Max-width**: `max-w-2xl` (OK for form container)

## Styling Guidelines

All sections follow LEGACY design system:
- **Brand Colors**: charcoal, cream, sand, gold, copper
- **Typography**: ABC Diatype (premium font)
- **Spacing**: py-24 md:py-32 (96px / 128px vertical)
- **Animations**: Framer Motion with viewport detection
- **Responsive**: Mobile-first approach (sm:, md:, lg: breakpoints)

## Adding New Sections

1. **Create file** in `components/sections/home/` or `components/sections/`
2. **Follow naming**: PascalCase.tsx (e.g., `MyNewSection.tsx`)
3. **Import in** `app/home/page.tsx`
4. **Add comment**: `{/* X. Section Name — LEGACY */}`
5. **Use consistent**:
   - Tailwind classes for styling
   - Framer Motion for animations
   - Brand colors from globals.css
   - max-w-3xl for text descriptions

## Unused Sections

These sections are archived but can be restored if needed:
- Product detail pages (ProductInfo, ProductImageGallery)
- Filter/search components (FilterSidebar, SearchSort)
- Alternative hero designs (hero-section, hero-wellness)
- Room designer (RoomDesignerPreview)

Restore from `.sections-backup/` when needed.
