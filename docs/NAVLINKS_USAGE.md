# NavLinks Component Usage Guide

## Overview

The `NavLinks` component is a reusable navigation links component with active state styling, animated underline, and smooth transitions. It supports both horizontal (desktop) and vertical (mobile) layouts.

## Location

`components/layout/NavLinks.tsx`

## Component Props

```typescript
interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface NavLinksProps {
  links: NavLink[];
  variant?: "horizontal" | "vertical";
  onLinkClick?: () => void;
  className?: string;
}
```

## Features

- ✅ Active link detection via `usePathname()`
- ✅ Animated gold underline (horizontal variant only)
- ✅ Smooth color transitions on hover/active
- ✅ Icon support with proper alignment
- ✅ Badge display with count
- ✅ Two layout variants: horizontal (desktop) and vertical (mobile)
- ✅ Proper accessibility (semantic links, aria-current)
- ✅ Framer Motion animations
- ✅ Design system colors (gold, charcoal, sand)

## Usage Examples

### Basic Horizontal Navigation (Desktop)

```tsx
import { NavLinks } from "@/components/layout/NavLinks";

export function Header() {
  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header>
      <NavLinks links={navLinks} variant="horizontal" />
    </header>
  );
}
```

### Vertical Navigation (Mobile Menu)

```tsx
import { NavLinks } from "@/components/layout/NavLinks";
import { useState } from "react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {isOpen && (
        <NavLinks
          links={navLinks}
          variant="vertical"
          onLinkClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

### With Icons

```tsx
import { NavLinks } from "@/components/layout/NavLinks";
import { Home, Info, Mail } from "lucide-react";

export function NavigationWithIcons() {
  const navLinks = [
    { href: "/home", label: "Home", icon: <Home size={18} /> },
    { href: "/about", label: "About", icon: <Info size={18} /> },
    { href: "/contact", label: "Contact", icon: <Mail size={18} /> },
  ];

  return <NavLinks links={navLinks} variant="horizontal" />;
}
```

### With Badges

```tsx
import { NavLinks } from "@/components/layout/NavLinks";

export function NavigationWithBadges() {
  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/products", label: "Products", badge: 12 },
    { href: "/news", label: "News", badge: 5 },
  ];

  return <NavLinks links={navLinks} variant="horizontal" />;
}
```

### With Icons and Badges

```tsx
import { NavLinks } from "@/components/layout/NavLinks";
import { Home, ShoppingBag, Bell } from "lucide-react";

export function CompleteNavigation() {
  const navLinks = [
    { href: "/home", label: "Home", icon: <Home size={18} /> },
    { href: "/products", label: "Products", icon: <ShoppingBag size={18} />, badge: 12 },
    { href: "/notifications", label: "Notifications", icon: <Bell size={18} />, badge: 3 },
  ];

  return <NavLinks links={navLinks} variant="horizontal" />;
}
```

## Design System Integration

### Colors

- **Base text**: `brand-charcoal` (#1A1A1A)
- **Active text**: `brand-gold` (#D4A574)
- **Hover text**: `brand-gold` with smooth transition
- **Vertical hover background**: `brand-sand/50` (#F5F5F5 with 50% opacity)
- **Gradient underline**: `from-brand-gold to-brand-copper`

### Typography

- **Font**: ABC Diatype (or system fallback)
- **Weight**: Medium (font-medium)
- **Size**: Small (text-sm) for horizontal, default for vertical

### Animations

- **Underline transition**: Spring animation (stiffness: 300, damping: 30)
- **Color transitions**: 200ms duration
- **Layout animations**: Framer Motion layoutId for smooth underline movement

## Active State Detection

The component automatically detects active links based on the current pathname:

- Home route (`/home` or `/`) is recognized as the same
- Nested routes are supported (e.g., `/products/category` matches `/products`)
- Case-sensitive comparison

## Current Implementation in PremiumNavbar

The `NavLinks` component is currently used in the `PremiumNavbar`:

```tsx
// Desktop navigation
<div className="hidden md:flex items-center">
  <NavLinks links={navLinks} variant="horizontal" />
</div>

// Mobile navigation
<NavLinks
  links={navLinks}
  variant="vertical"
  onLinkClick={() => setIsMobileMenuOpen(false)}
  className="space-y-2"
/>
```

## Accessibility

- Semantic `<nav>` and `<Link>` elements
- `aria-current="page"` on active links
- Proper link labeling
- Keyboard navigation support (inherited from Next.js `<Link>`)

## Customization

You can customize the appearance by passing additional classes via the `className` prop:

```tsx
<NavLinks
  links={navLinks}
  variant="horizontal"
  className="mx-auto space-x-8"
/>
```

## Future Enhancements

- Submenu support
- Pills/rounded style variant
- Custom animation easing options
- Theme customization props
- Icon positioning variants (left, right, top)
