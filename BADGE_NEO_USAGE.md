# BadgeNeo Component Usage Guide

## Overview
BadgeNeo is a small badge/label component for status indicators, prices, ratings, and tags with neomorphic styling and shadow effects.

## File Location
`components/ui/badge-neo.tsx`

## Import
```typescript
import { BadgeNeo } from "@/components/ui/badge-neo"
```

## Component API

### Props
- `variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'gold'` (default: 'primary')
- `size?: 'sm' | 'md' | 'lg'` (default: 'md')
- `shape?: 'rounded' | 'pill'` (default: 'pill')
- `outline?: boolean` (default: false)
- `children: React.ReactNode`
- `className?: string`
- `asChild?: boolean` - Use Radix Slot for component composition
- All standard HTML span attributes

## Variants

### Primary (Charcoal)
```tsx
<BadgeNeo variant="primary">Draft</BadgeNeo>
<BadgeNeo variant="primary" outline>Draft</BadgeNeo>
```
- Background: charcoal (#1A1A1A)
- Text: cream (#FAFAF9)
- Shadow: shadow-neo-subtle
- Hover: shadow-neo-light

### Success (Neo-Green)
```tsx
<BadgeNeo variant="success">In Stock</BadgeNeo>
<BadgeNeo variant="success" outline>Active</BadgeNeo>
```
- Background: neo-green (#6EE7B7)
- Text: charcoal
- Shadow: shadow-glow-green (neon glow effect)

### Warning (Neo-Orange)
```tsx
<BadgeNeo variant="warning">Limited Stock</BadgeNeo>
<BadgeNeo variant="warning" outline>Pending</BadgeNeo>
```
- Background: neo-orange (#FDBA74)
- Text: charcoal
- Shadow: shadow-glow-orange (neon glow effect)

### Error (Red)
```tsx
<BadgeNeo variant="error">Out of Stock</BadgeNeo>
<BadgeNeo variant="error" outline>Critical</BadgeNeo>
```
- Background: error red (#E74C3C)
- Text: white
- Shadow: shadow-neo-subtle
- Hover: shadow-neo-light

### Info (Brand Gold)
```tsx
<BadgeNeo variant="info">New</BadgeNeo>
<BadgeNeo variant="info" outline>Featured</BadgeNeo>
```
- Background: brand-gold (#D4A574)
- Text: charcoal
- Shadow: shadow-glow-gold (premium glow effect)

### Gold (Premium)
```tsx
<BadgeNeo variant="gold">Premium</BadgeNeo>
<BadgeNeo variant="gold" outline>Exclusive</BadgeNeo>
```
- Background: gold gradient
- Text: charcoal
- Shadow: shadow-glow-gold (premium glow)

## Sizes

### Small (sm)
```tsx
<BadgeNeo size="sm">New</BadgeNeo>
```
- Font size: 0.75rem
- Padding: 0.25rem 0.75rem (4px 12px)

### Medium (md) - Default
```tsx
<BadgeNeo size="md">In Stock</BadgeNeo>
```
- Font size: 0.875rem
- Padding: 0.375rem 1rem (6px 16px)

### Large (lg)
```tsx
<BadgeNeo size="lg">Premium</BadgeNeo>
```
- Font size: 1rem
- Padding: 0.5rem 1.25rem (8px 20px)

## Shapes

### Pill (Default)
```tsx
<BadgeNeo shape="pill">Status</BadgeNeo>
```
- Border radius: 9999px (fully rounded)

### Rounded
```tsx
<BadgeNeo shape="rounded">Tag</BadgeNeo>
```
- Border radius: 12px (soft corners)

## With Icons

```tsx
import { CheckCircle, AlertCircle, Zap } from "lucide-react"

<BadgeNeo variant="success">
  <CheckCircle className="w-4 h-4" />
  Active
</BadgeNeo>

<BadgeNeo variant="warning">
  <AlertCircle className="w-4 h-4" />
  Warning
</BadgeNeo>

<BadgeNeo variant="info">
  <Zap className="w-4 h-4" />
  Premium
</BadgeNeo>
```

## Outline Variant

All variants support `outline={true}` for transparent backgrounds with colored borders:

```tsx
// Outline variants with all colors
<BadgeNeo variant="primary" outline>Primary</BadgeNeo>
<BadgeNeo variant="success" outline>Success</BadgeNeo>
<BadgeNeo variant="warning" outline>Warning</BadgeNeo>
<BadgeNeo variant="error" outline>Error</BadgeNeo>
<BadgeNeo variant="info" outline>Info</BadgeNeo>
<BadgeNeo variant="gold" outline>Gold</BadgeNeo>
```

Outline styles:
- Background: transparent
- Border: 2px border with variant color
- Text: variant color
- Hover: subtle background tint
- Shadow: none

## Usage Examples

### Price Badge
```tsx
<BadgeNeo variant="info" size="md" shape="rounded">
  $299
</BadgeNeo>
```

### Product Status
```tsx
<div className="flex gap-2">
  <BadgeNeo variant="success">In Stock</BadgeNeo>
  <BadgeNeo variant="info">Best Seller</BadgeNeo>
  <BadgeNeo variant="gold">Premium</BadgeNeo>
</div>
```

### Rating / Badge Collection
```tsx
<div className="flex gap-1">
  <BadgeNeo size="sm" variant="primary">
    4.5★
  </BadgeNeo>
  <BadgeNeo size="sm" variant="success" outline>
    Verified
  </BadgeNeo>
</div>
```

### Category Tags
```tsx
<div className="flex gap-2 flex-wrap">
  <BadgeNeo shape="rounded" outline>Furniture</BadgeNeo>
  <BadgeNeo shape="rounded" outline>Modern</BadgeNeo>
  <BadgeNeo shape="rounded" outline variant="info">Featured</BadgeNeo>
</div>
```

### Alert Badge
```tsx
<BadgeNeo variant="error" size="lg">
  <AlertCircle className="w-5 h-5 mr-1" />
  Out of Stock
</BadgeNeo>
```

## Styling

### Custom Classes
```tsx
<BadgeNeo variant="success" className="ml-2 uppercase">
  Custom Style
</BadgeNeo>
```

### Using asChild (Radix Slot)
```tsx
<BadgeNeo asChild>
  <a href="/new-products">New</a>
</BadgeNeo>
```

## Accessibility

- Proper focus management with `focus-visible` ring (brand-gold)
- Semantic HTML (`<span>` by default)
- Support for all HTML attributes
- Supports `aria-*` attributes
- Proper icon sizing and shrinking

## Animations & Transitions

- Smooth transitions: 150ms for all effects
- Hover shadow elevation on primary/error
- Subtle background tint on outline variants
- Focus-visible ring with proper offset

## Colors Reference

| Variant | Background | Text | Hex |
|---------|-----------|------|-----|
| Primary | Charcoal | Cream | #1A1A1A → #FAFAF9 |
| Success | Neo-Green | Charcoal | #6EE7B7 → #1A1A1A |
| Warning | Neo-Orange | Charcoal | #FDBA74 → #1A1A1A |
| Error | Error Red | White | #E74C3C → #FFFFFF |
| Info | Brand Gold | Charcoal | #D4A574 → #1A1A1A |
| Gold | Gold Gradient | Charcoal | gradient → #1A1A1A |

## Design System Integration

Uses Tailwind utilities from the design system:
- Colors: `charcoal`, `neo-green`, `neo-orange`, `error`, `brand-gold`, `gradient-gold`
- Shadows: `shadow-neo-subtle`, `shadow-neo-light`, `shadow-glow-gold`, `shadow-glow-green`, `shadow-glow-orange`
- Spacing: `px-3/4/5`, `py-1/1.5/2`
- Radius: `rounded-soft`, `rounded-pill`

## TypeScript

```typescript
import { BadgeNeo, type BadgeNeoProps } from "@/components/ui/badge-neo"

const MyBadge: React.FC<BadgeNeoProps> = (props) => (
  <BadgeNeo {...props} />
)
```

## Specifications

- Font weight: 600 (semibold)
- Display: inline-flex
- Alignment: items-center, justify-center
- Transition: 150ms duration
- Whitespace: nowrap
- User select: none
- Icon sizing: automatic (size-4, shrink-0, pointer-events-none)
