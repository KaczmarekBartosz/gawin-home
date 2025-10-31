# GAWIN Design System - Implementation Guide

A step-by-step guide for developers implementing pages and components using the GAWIN design system.

**For:** Next.js developers
**Level:** Intermediate
**Last Updated:** 2025-10-30

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm package manager
- Basic React and TypeScript knowledge
- Familiarity with Tailwind CSS v4

### Project Setup

```bash
# Clone repository
git clone <repo-url>
cd gawin-home

# Install dependencies
pnpm install

# Start development server (with Turbopack)
pnpm dev -- --turbopack

# Open browser to http://localhost:3000
```

### Verify Installation

```bash
# Check TypeScript (should output nothing)
npx tsc --noEmit

# Check build (should complete in < 5 seconds)
pnpm build

# Check formatting (should pass all files)
pnpm prettier:check
```

---

## 📦 Project Structure

```
src/
├── app/
│   ├── globals.css            # Design system definitions
│   ├── layout.tsx             # Root layout component
│   ├── page.tsx               # Home page
│   ├── [page]/                # CMS pages (dynamic)
│   ├── cart/                  # Cart page
│   └── product/               # Product detail page
│
├── components/
│   ├── ui/                    # Core design system components
│   │   ├── neo-button.tsx      # Primary CTA button
│   │   ├── neo-card.tsx        # Card container
│   │   ├── badge-neo.tsx       # Status/tag badges
│   │   ├── neo-slider.tsx      # Range slider
│   │   ├── neo-toggle.tsx      # Toggle switch
│   │   └── [other-components]/ # Standard shadcn components
│   │
│   ├── sections/              # Page sections (reusable)
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── BestsellersSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── [other-sections]/
│   │   └── pdp/               # Product detail page sections
│   │
│   └── layout/                # Site-wide layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Navigation.tsx
│
├── lib/
│   ├── utils.ts               # cn() utility function
│   ├── animation-hooks.ts     # Framer Motion hooks
│   ├── design-system/         # Design tokens
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   └── shopify/               # Shopify API integration
│
├── motion/
│   └── presets.ts             # 28 animation presets
│
├── public/
│   ├── fonts/
│   │   └── abc-diatype/       # Font files (placeholders)
│   └── [images]/
│
└── types/
    └── index.ts               # TypeScript types
```

---

## 🎨 Using Core Components

### NeoButton

The primary CTA button component. Use for main actions.

```tsx
import { NeoButton } from "@/components/ui/neo-button";

// Basic usage
<NeoButton>Click Me</NeoButton>

// With variants
<NeoButton variant="primary" size="md">
  Primary Action
</NeoButton>

<NeoButton variant="secondary" size="lg">
  Secondary Action
</NeoButton>

<NeoButton variant="ghost">
  Tertiary Link
</NeoButton>

<NeoButton variant="danger" disabled>
  Disabled Action
</NeoButton>

// With icons
import { Heart } from "lucide-react";

<NeoButton variant="primary">
  <Heart className="mr-2" />
  Add to Wishlist
</NeoButton>

// Full-width button
<NeoButton variant="primary" className="w-full">
  Add to Cart
</NeoButton>
```

**Variants:** `primary` | `secondary` | `ghost` | `danger`
**Sizes:** `sm` | `md` | `lg`

### NeoCard

Container component for grouping related content.

```tsx
import { NeoCard } from "@/components/ui/neo-card";

// Basic card
<NeoCard variant="elevated">
  <NeoCard.Header>Card Title</NeoCard.Header>
  <NeoCard.Content>
    This is the main content area of the card.
  </NeoCard.Content>
</NeoCard>

// Card with footer
<NeoCard variant="elevated">
  <NeoCard.Header>Product</NeoCard.Header>
  <NeoCard.Content>
    <img src="product.jpg" alt="Product" />
    <p>Description</p>
  </NeoCard.Content>
  <NeoCard.Footer>
    <NeoButton variant="primary" className="w-full">
      Add to Cart
    </NeoButton>
  </NeoCard.Footer>
</NeoCard>

// Minimal card
<NeoCard variant="flat">
  <NeoCard.Content>Simple content</NeoCard.Content>
</NeoCard>
```

**Variants:** `elevated` | `outlined` | `flat`

### BadgeNeo

Status badges for tags and labels.

```tsx
import { BadgeNeo } from "@/components/ui/badge-neo";

// Semantic variants
<BadgeNeo variant="default">Default</BadgeNeo>
<BadgeNeo variant="secondary">Secondary</BadgeNeo>
<BadgeNeo variant="success">In Stock</BadgeNeo>
<BadgeNeo variant="warning">Low Stock</BadgeNeo>
<BadgeNeo variant="error">Out of Stock</BadgeNeo>
<BadgeNeo variant="info">New Arrival</BadgeNeo>

// Outline style
<BadgeNeo variant="success" outline>
  Success
</BadgeNeo>

// Dismissible badge
<BadgeNeo
  variant="info"
  dismissible
  onDismiss={() => console.log("dismissed")}
>
  Notification
</BadgeNeo>

// With icons
import { CheckCircle } from "lucide-react";

<BadgeNeo variant="success">
  <CheckCircle className="mr-1" />
  Verified
</BadgeNeo>
```

**Variants:** `default` | `secondary` | `success` | `warning` | `error` | `info`

### NeoSlider

Price range or value selection slider.

```tsx
import { NeoSlider } from "@/components/ui/neo-slider";
import { useState } from "react";

// Single value
function PriceDisplay() {
  const [price, setPrice] = useState([50]);

  return (
    <div>
      <label>Price: ${price[0]}</label>
      <NeoSlider
        min={0}
        max={1000}
        step={10}
        value={price}
        onValueChange={setPrice}
        aria-label="Select price"
      />
    </div>
  );
}

// Range selector
function PriceRange() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div>
      <label>
        Price Range: ${range[0]} - ${range[1]}
      </label>
      <NeoSlider
        min={0}
        max={1000}
        step={5}
        value={range}
        onValueChange={setRange}
        aria-label="Select price range"
      />
    </div>
  );
}

export { PriceDisplay, PriceRange };
```

### NeoToggle

Feature toggle or preference switch.

```tsx
import { NeoToggle } from "@/components/ui/neo-toggle";
import { useState } from "react";

// Basic toggle
function FeatureToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <NeoToggle
      enabled={enabled}
      onToggle={setEnabled}
      variant="default"
    />
  );
}

// With label
function NotificationPreference() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="notifications">Enable notifications</label>
      <NeoToggle
        id="notifications"
        enabled={notifications}
        onToggle={setNotifications}
        variant="gold"
      />
    </div>
  );
}

export { FeatureToggle, NotificationPreference };
```

**Variants:** `default` | `secondary` | `gold`

---

## 📍 Using Page Sections

### HeroSection

Full-screen hero with video background and CTA buttons.

```tsx
import { HeroSection } from "@/components/sections/home/HeroSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* Rest of page content */}
    </main>
  );
}

// Customizing hero content (see component source)
// - Change headline text
// - Add/remove CTA buttons
// - Modify video source
// - Adjust gradient overlay
```

**Features:**
- Video background (WebM + MP4 for compatibility)
- Animated headline and buttons
- Responsive text sizing
- Mobile image fallback
- Touch-optimized on mobile

### BestsellersSection

Product grid showcase with 3-column layout (responsive).

```tsx
import { BestsellersSection } from "@/components/sections/home/BestsellersSection";

export default function HomePage() {
  return (
    <main>
      <BestsellersSection />
    </main>
  );
}

// Products fetched from mock data
// To connect to real products:
// 1. Replace mock data with API call
// 2. Update product props in component
// 3. Ensure image URLs are optimized
```

**Features:**
- 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- NeoCard product containers
- Image optimization with Next.js Image
- Price and rating display
- Add to cart functionality
- Hover elevation effects

### TestimonialsSection

Customer testimonials carousel.

```tsx
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";

export default function HomePage() {
  return (
    <main>
      <TestimonialsSection />
    </main>
  );
}

// Testimonials fetched from mock data
// To connect to real testimonials:
// 1. Update testimonials data source
// 2. Add pagination controls (if needed)
// 3. Connect to review platform (optional)
```

**Features:**
- Embla carousel for smooth scrolling
- Star rating component (1-5 stars)
- Customer name and title
- Responsive carousel (full width, scrollable)
- Navigation arrows
- Mobile gesture support (swipe)

---

## 🎬 Working with Animations

### Using Animation Hooks

Framer Motion hooks for common animation patterns:

```tsx
import { motion } from "framer-motion";
import {
  useFadeIn,
  useSlideInUp,
  useSlideInLeft,
  useScaleIn,
} from "@/lib/animation-hooks";

// Fade in animation
function FadingElement() {
  const fadeProps = useFadeIn({ delay: 0.2 });
  return <motion.div {...fadeProps}>Content fades in</motion.div>;
}

// Slide up animation
function SlidingElement() {
  const slideProps = useSlideInUp({ delay: 0.1, duration: 0.5 });
  return <motion.div {...slideProps}>Content slides up</motion.div>;
}

// Staggered children animations
function StaggeredList() {
  const containerProps = {
    initial: "initial",
    whileInView: "animate",
    viewport: { once: true },
    variants: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
      },
    },
  };

  const itemProps = {
    variants: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
  };

  return (
    <motion.ul {...containerProps}>
      <motion.li {...itemProps}>Item 1</motion.li>
      <motion.li {...itemProps}>Item 2</motion.li>
      <motion.li {...itemProps}>Item 3</motion.li>
    </motion.ul>
  );
}

export { FadingElement, SlidingElement, StaggeredList };
```

### Available Animation Presets

**Entry animations:**
- `fadeIn` - Opacity transition
- `slideInLeft` - From left side
- `slideInRight` - From right side
- `slideInUp` - From bottom
- `scaleIn` - Grow from center

**Exit animations:**
- `fadeOut`, `slideOutLeft`, `slideOutRight`, `slideOutDown`, `scaleOut`

**Continuous:**
- `pulse`, `bounce`, `shimmer`, `wiggle`

See `/motion/presets.ts` for complete list.

---

## 🎨 Styling & Tailwind Usage

### Using Tailwind Classes

All design system utilities available through Tailwind:

```tsx
// Typography
<h1 className="text-4xl font-bold text-brand-charcoal">Heading</h1>
<p className="text-base font-normal text-text-gray">Body text</p>

// Spacing & Layout
<div className="p-6 gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// Colors
<div className="bg-brand-cream text-brand-charcoal border-2 border-brand-gold">

// Shadows
<div className="shadow-card hover:shadow-card-hover">

// Rounded corners
<div className="rounded-md sm:rounded-lg lg:rounded-xl">

// Responsive padding
<div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">

// Opacity & transforms
<div className="opacity-50 hover:opacity-100 hover:scale-105">
```

### The `cn()` Utility

Combine and merge Tailwind classes intelligently:

```tsx
import { cn } from "@/lib/utils";

// Merge conflicting utilities
const buttonClasses = cn(
  "px-4 py-2 bg-blue-500",
  someCondition && "bg-red-500", // Overrides blue
  userClasses // Can contain conflicting classes
);

// Complex merging
function CustomCard({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-4",
        className // User can override specific styles
      )}
      {...props}
    />
  );
}
```

---

## 🔐 TypeScript Best Practices

### Type-Safe Component Props

```tsx
import { ComponentPropsWithoutRef } from "react";

interface CustomButtonProps
  extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function CustomButton({
  variant = "primary",
  size = "md",
  loading = false,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(
        "transition-all",
        variant === "primary" && "bg-brand-charcoal text-white",
        size === "md" && "px-4 py-2"
      )}
      disabled={loading}
      {...props}
    />
  );
}
```

### Extracting Types from Components

```tsx
// Get component props types
import type { ComponentProps } from "react";
import { NeoButton } from "@/components/ui/neo-button";

type NeoButtonProps = ComponentProps<typeof NeoButton>;

// Use in other components
function MyComponent(props: NeoButtonProps) {
  return <NeoButton {...props} />;
}
```

---

## 🌐 Responsive Design Patterns

### Mobile-First Grid Layouts

```tsx
// ✅ CORRECT: Start with mobile, add breakpoints
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>

// Responsive text sizes
<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Heading</h2>

// Responsive padding
<section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
  Content
</section>
```

### Responsive Images

```tsx
import Image from "next/image";

function ResponsiveImage() {
  return (
    <Image
      src="/image.jpg"
      alt="Description"
      width={1200}
      height={800}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
      quality={80}
      priority={false}
      className="w-full h-auto"
    />
  );
}
```

### Conditional Rendering for Responsive Layout

```tsx
import { useMediaQuery } from "@/hooks/useMediaQuery";

function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
```

---

## 🚀 Performance Optimization

### Image Optimization

```tsx
// ✅ Use Next.js Image component
<Image
  src="/product.jpg"
  alt="Product"
  width={600}
  height={600}
  quality={80}        // Optimize JPEG
  placeholder="blur"  // Blur placeholder while loading
  priority={above}    // Preload if above the fold
/>

// ✅ Use WebP format
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Fallback" />
</picture>
```

### Code Splitting & Lazy Loading

```tsx
import dynamic from "next/dynamic";

// Lazy load heavy component
const HeavyProductGrid = dynamic(
  () => import("@/components/ProductGrid"),
  {
    loading: () => <ProductGridSkeleton />,
    ssr: false, // Optional: disable SSR if data is client-only
  }
);

// Use in page
export default function ProductsPage() {
  return (
    <main>
      <h1>Products</h1>
      <HeavyProductGrid />
    </main>
  );
}
```

### Animation Performance

```tsx
// ✅ Use GPU-accelerated properties
import { motion } from "framer-motion";

<motion.div
  animate={{
    x: 100, // transform (GPU accelerated)
    opacity: 0.5, // opacity (GPU accelerated)
  }}
/>

// ❌ Avoid animating layout properties
{
  /* width, height, left, right (cause reflow) */
}
```

---

## 🧪 Testing Components

### Component Testing Example

```tsx
// components/ui/__tests__/neo-button.test.tsx
import { render, screen } from "@testing-library/react";
import { NeoButton } from "@/components/ui/neo-button";

describe("NeoButton", () => {
  it("renders button with text", () => {
    render(<NeoButton>Click me</NeoButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<NeoButton variant="secondary">Test</NeoButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-brand-sand");
  });

  it("disables button when disabled prop is true", () => {
    render(<NeoButton disabled>Disabled</NeoButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

---

## ⚠️ Common Pitfalls & Solutions

### Issue: Conflicting Tailwind Classes

```tsx
// ❌ Wrong: px-4 overrides px-6
<div className="px-4 px-6">Content</div>

// ✅ Correct: Use cn() to merge
<div className={cn("px-4", responsive && "lg:px-6")}>Content</div>
```

### Issue: Unused Component Variants

```tsx
// ❌ Wrong: Inline condition creates unused CSS
variant={isActive ? "primary" : "secondary"}

// ✅ Correct: All variants used statically
<NeoButton variant={status === "active" ? "primary" : "secondary"} />
```

### Issue: Missing Responsive Utilities

```tsx
// ❌ Wrong: Only works on desktop
<div className="grid grid-cols-3 gap-8">

// ✅ Correct: Mobile-first responsive
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
```

### Issue: Performance - Too Many useState

```tsx
// ❌ Wrong: Multiple states for related data
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");

// ✅ Correct: Combine related state
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
});
```

---

## 📋 Accessibility Checklist

When implementing components:

- [ ] All interactive elements are keyboard accessible
- [ ] Focus styles are visible (2px gold ring)
- [ ] Color is not the only way to convey information
- [ ] Form labels are properly associated with inputs
- [ ] Images have descriptive alt text
- [ ] Heading hierarchy is semantic (h1 > h2 > h3)
- [ ] ARIA attributes used where needed
- [ ] Touch targets are minimum 44x48px
- [ ] Contrast ratio meets WCAG AA (4.5:1)
- [ ] Motion preferences respected (`prefers-reduced-motion`)

---

## 🔄 Git Workflow

### Creating a New Feature

```bash
# Update main branch
git checkout master
git pull origin master

# Create feature branch
git checkout -b feature/my-feature

# Work on feature (commit regularly)
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-feature

# Create PR and request review
```

### Commit Message Format

```
feat: add hero section with animations
fix: resolve button focus ring visibility
docs: update component documentation
refactor: simplify responsive utilities
style: format code with prettier
```

---

## 🚀 Deployment

### Pre-deployment Checklist

```bash
# Type check
npx tsc --noEmit

# Run build
pnpm build

# Check formatting
pnpm prettier:check

# Run tests (if available)
pnpm test
```

### Build Output

Build produces:
- Optimized JavaScript bundles
- CSS with Tailwind utilities (tree-shaken)
- Optimized images (WebP + fallbacks)
- Static and dynamic route handlers

---

## 📚 Additional Resources

- **DESIGN_SYSTEM.md** - Complete design specification
- **COMPONENT_INVENTORY.md** - All components reference
- **TESTING_REPORT.md** - Test results
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS v4:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion
- **ABC Diatype Font:** https://abcdinamo.com/typefaces/diatype

---

**Last Updated:** 2025-10-30 | Version 1.0.0
