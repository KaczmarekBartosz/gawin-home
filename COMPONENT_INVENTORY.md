# GAWIN Design System - Component Inventory

Complete reference of all design system components, their variants, props, and usage patterns.

**Status:** Production Ready
**Total Components:** 5 core neomorphic + 17 utility components
**Last Updated:** 2025-10-30

---

## 📦 Core Neomorphic Components (5)

### 1. NeoButton

**File:** `/components/ui/neo-button.tsx`
**Status:** ✅ Production Ready

**Purpose:** Primary CTA button with neomorphic styling and 4 variants.

**Props:**

| Prop | Type | Default | Options | Description |
|------|------|---------|---------|-------------|
| `variant` | enum | `"primary"` | `primary`, `secondary`, `ghost`, `danger` | Button style |
| `size` | enum | `"md"` | `sm`, `md`, `lg` | Button dimensions |
| `disabled` | boolean | `false` | — | Disables button |
| `loading` | boolean | `false` | — | Shows loading state |
| `className` | string | — | — | Additional CSS classes |
| `children` | ReactNode | — | — | Button content |
| `...rest` | — | — | — | HTML button attributes |

**Variants:**

```
primary:   Dark charcoal bg, cream text - main CTAs
secondary: Sand bg, dark text - secondary actions
ghost:     Transparent, gold border - tertiary actions
danger:    Red bg, white text - destructive actions
```

**Sizes:**

```
sm: 10px height, 12px text, px-4 py-2
md: 12px height, 16px text, px-6 py-3 (default)
lg: 14px height, 18px text, px-8 py-4
```

**Example Usage:**

```tsx
import { NeoButton } from "@/components/ui/neo-button";

// Basic
<NeoButton>Click Me</NeoButton>

// With variant and size
<NeoButton variant="primary" size="lg">
  Large Primary Button
</NeoButton>

// With icon
<NeoButton variant="secondary">
  <Heart />
  Add to Wishlist
</NeoButton>

// Full width
<NeoButton className="w-full">
  Add to Cart
</NeoButton>

// Disabled
<NeoButton disabled>
  Not Available
</NeoButton>
```

**States:**

- **Default:** Visible shadow, normal scale
- **Hover:** Elevated shadow (neo-medium), 105% scale
- **Active:** Pressed shadow (inset), 100% scale
- **Focus:** 2px gold outline, 2px offset
- **Disabled:** 50% opacity, pointer-events none

---

### 2. NeoCard

**File:** `/components/ui/neo-card.tsx`
**Status:** ✅ Production Ready

**Purpose:** Flexible card container with header, content, and footer sections.

**Props:**

| Prop | Type | Default | Options | Description |
|------|------|---------|---------|-------------|
| `variant` | enum | `"elevated"` | `elevated`, `outlined`, `flat` | Card style |
| `radius` | enum | `"md"` | `md`, `lg`, `xl` | Border radius |
| `hoverable` | boolean | `true` | — | Hover elevation effect |
| `className` | string | — | — | Additional CSS classes |
| `children` | ReactNode | — | — | Card content |

**Sub-components:**

```
Card.Header     (Container for title/header)
Card.Content    (Main content area)
Card.Footer     (Actions/footer area)
Card.Divider    (Visual separator)
```

**Variants:**

```
elevated: 8px shadow with hover effect - prominent cards
outlined: 1px border with minimal shadow - contained content
flat:     Minimal styling, bg color only - minimal emphasis
```

**Example Usage:**

```tsx
import { NeoCard } from "@/components/ui/neo-card";

// Basic card
<NeoCard variant="elevated">
  <NeoCard.Header>
    <h2>Product Name</h2>
  </NeoCard.Header>
  <NeoCard.Content>
    <img src="product.jpg" alt="Product" />
    <p>Product description goes here.</p>
  </NeoCard.Content>
  <NeoCard.Footer>
    <NeoButton variant="primary" className="w-full">
      Add to Cart
    </NeoButton>
  </NeoCard.Footer>
</NeoCard>

// Outlined card
<NeoCard variant="outlined">
  <NeoCard.Content>
    Simple outlined card
  </NeoCard.Content>
</NeoCard>

// With divider
<NeoCard variant="elevated">
  <NeoCard.Header>Header</NeoCard.Header>
  <NeoCard.Divider />
  <NeoCard.Content>Content</NeoCard.Content>
</NeoCard>
```

**Responsive Padding:**

- Mobile: `p-4`
- Tablet: `p-6`
- Desktop: `p-6`

---

### 3. BadgeNeo

**File:** `/components/ui/badge-neo.tsx`
**Status:** ✅ Production Ready

**Purpose:** Status badges and tags with 6 semantic variants.

**Props:**

| Prop | Type | Default | Options | Description |
|------|------|---------|---------|-------------|
| `variant` | enum | `"default"` | `default`, `secondary`, `success`, `warning`, `error`, `info` | Badge style |
| `outline` | boolean | `false` | — | Border-only style |
| `size` | enum | `"md"` | `sm`, `md`, `lg` | Badge size |
| `dismissible` | boolean | `false` | — | Show close button |
| `onDismiss` | function | — | — | Callback on dismiss |
| `className` | string | — | — | Additional CSS classes |
| `children` | ReactNode | — | — | Badge content |

**Variants:**

```
default:   Charcoal bg, cream text
secondary: Sand bg, dark text
success:   Green bg - for positive states
warning:   Orange bg - for caution states
error:     Red bg - for error states
info:      Blue bg - for informational states
```

**Example Usage:**

```tsx
import { BadgeNeo } from "@/components/ui/badge-neo";

// Semantic variants
<BadgeNeo variant="success">In Stock</BadgeNeo>
<BadgeNeo variant="warning">Low Stock</BadgeNeo>
<BadgeNeo variant="error">Out of Stock</BadgeNeo>
<BadgeNeo variant="info">New Arrival</BadgeNeo>

// Outline style
<BadgeNeo variant="success" outline>
  Available
</BadgeNeo>

// Dismissible
<BadgeNeo
  variant="info"
  dismissible
  onDismiss={() => handleDismiss()}
>
  Notification
</BadgeNeo>

// With icon
<BadgeNeo variant="success">
  <CheckCircle className="mr-1 size-3" />
  Verified
</BadgeNeo>

// Multiple badges
<div className="flex flex-wrap gap-2">
  <BadgeNeo variant="default">Premium</BadgeNeo>
  <BadgeNeo variant="success">In Stock</BadgeNeo>
  <BadgeNeo variant="info">New</BadgeNeo>
</div>
```

**Sizes:**

```
sm: 14px text, px-2 py-0.5
md: 14px text, px-3 py-1 (default)
lg: 16px text, px-4 py-1.5
```

---

### 4. NeoSlider

**File:** `/components/ui/neo-slider.tsx`
**Status:** ✅ Production Ready

**Purpose:** Range slider for single value or range selection with keyboard support.

**Props:**

| Prop | Type | Default | Options | Description |
|------|------|---------|---------|-------------|
| `min` | number | `0` | — | Minimum value |
| `max` | number | `100` | — | Maximum value |
| `step` | number | `1` | — | Step increment |
| `value` | number[] | `[0]` | — | Current value(s) |
| `onValueChange` | function | — | — | Change callback |
| `disabled` | boolean | `false` | — | Disable interaction |
| `aria-label` | string | — | — | Accessibility label |

**Features:**

- Single value selection
- Range selection (array of 2 values)
- Keyboard navigation (arrow keys)
- Touch support
- Smooth animations
- Visual track progress

**Example Usage:**

```tsx
import { NeoSlider } from "@/components/ui/neo-slider";
import { useState } from "react";

// Single value
function PriceDisplay() {
  const [price, setPrice] = useState([50]);

  return (
    <div>
      <label>Select Price: ${price[0]}</label>
      <NeoSlider
        min={0}
        max={1000}
        step={10}
        value={price}
        onValueChange={setPrice}
        aria-label="Price slider"
      />
    </div>
  );
}

// Range selection
function PriceRange() {
  const [range, setRange] = useState([100, 500]);

  return (
    <div>
      <p>Range: ${range[0]} - ${range[1]}</p>
      <NeoSlider
        min={0}
        max={1000}
        step={25}
        value={range}
        onValueChange={setRange}
        aria-label="Price range selector"
      />
    </div>
  );
}

export { PriceDisplay, PriceRange };
```

**Keyboard Shortcuts:**

```
Arrow Left:  Decrease value by step
Arrow Right: Increase value by step
Home:        Jump to minimum
End:         Jump to maximum
```

---

### 5. NeoToggle

**File:** `/components/ui/neo-toggle.tsx`
**Status:** ✅ Production Ready

**Purpose:** Toggle switch with 3 variants and spring animations.

**Props:**

| Prop | Type | Default | Options | Description |
|------|------|---------|---------|-------------|
| `enabled` | boolean | `false` | — | Toggle state |
| `onToggle` | function | — | — | State change callback |
| `variant` | enum | `"default"` | `default`, `secondary`, `gold` | Toggle style |
| `disabled` | boolean | `false` | — | Disable interaction |
| `label` | string | — | — | Associated label |
| `id` | string | — | — | HTML id attribute |

**Variants:**

```
default:   Charcoal bg when enabled
secondary: Sand bg when enabled
gold:      Gold bg when enabled - premium feel
```

**Example Usage:**

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
      <label htmlFor="notifications">
        Email notifications
      </label>
      <NeoToggle
        id="notifications"
        enabled={notifications}
        onToggle={setNotifications}
        variant="gold"
      />
    </div>
  );
}

// Multiple toggles in form
function PreferencesForm() {
  const [prefs, setPrefs] = useState({
    marketing: false,
    notifications: true,
    newsletter: false,
  });

  const handleToggle = (key: string) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span>Marketing emails</span>
        <NeoToggle
          enabled={prefs.marketing}
          onToggle={() => handleToggle("marketing")}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Push notifications</span>
        <NeoToggle
          enabled={prefs.notifications}
          onToggle={() => handleToggle("notifications")}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Newsletter</span>
        <NeoToggle
          enabled={prefs.newsletter}
          onToggle={() => handleToggle("newsletter")}
        />
      </div>
    </div>
  );
}

export { FeatureToggle, NotificationPreference, PreferencesForm };
```

**Animation:**

- Spring animation on toggle
- Smooth color transition
- 300ms total duration
- Physical feel with easing

---

## 🎬 Section Components (3)

### 1. HeroSection

**File:** `/components/sections/home/HeroSection.tsx`
**Status:** ✅ Production Ready

**Purpose:** Full-screen hero with video background, gradient overlay, and CTAs.

**Features:**

- Full-screen layout (h-screen)
- Video background (WebM + MP4)
- Dark gradient overlay
- Animated headline
- Multiple CTA buttons
- Mobile image fallback
- Responsive text sizing

**Props:** (Extend as needed)

```
None (static section) - edit file to customize
```

**Customization:**

To modify hero content:

1. Edit `components/sections/home/HeroSection.tsx`
2. Change headline text in JSX
3. Modify button text and onClick handlers
4. Update video source path if needed
5. Adjust gradient overlay opacity

**Responsive Behavior:**

- Mobile: Single column, smaller text, stacked buttons
- Tablet: Centered layout, medium text
- Desktop: Full width, large text, side-by-side buttons

---

### 2. BestsellersSection

**File:** `/components/sections/home/BestsellersSection.tsx`
**Status:** ✅ Production Ready

**Purpose:** Product grid showcase with NeoCard containers.

**Features:**

- 3-column grid (desktop)
- 2-column grid (tablet)
- 1-column grid (mobile)
- NeoCard product containers
- Image optimization with Next.js Image
- Price and rating display
- Add to cart button
- Hover elevation effects
- Responsive spacing

**Data Structure:**

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}
```

**Integration with Real Products:**

1. Replace mock data import with API call
2. Update product array source
3. Ensure image URLs are optimized
4. Connect "Add to Cart" to cart state

**Example Usage:**

```tsx
import { BestsellersSection } from "@/components/sections/home/BestsellersSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BestsellersSection />
    </main>
  );
}
```

---

### 3. TestimonialsSection

**File:** `/components/sections/home/TestimonialsSection.tsx`
**Status:** ✅ Production Ready

**Purpose:** Customer testimonials carousel with Embla.

**Features:**

- Embla carousel for responsive scrolling
- Star ratings (1-5 stars)
- Customer name and title
- Testimonial text
- Navigation arrows
- Mobile gesture support (swipe)
- Responsive layout
- Auto-scroll option (configurable)

**Data Structure:**

```tsx
interface Testimonial {
  id: string;
  name: string;
  title: string;
  text: string;
  rating: number;
  image?: string;
}
```

**Integration with Real Testimonials:**

1. Update testimonial data source
2. Connect to review platform API if needed
3. Add pagination controls if desired
4. Customize card layout

**Example Usage:**

```tsx
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BestsellersSection />
      <TestimonialsSection />
    </main>
  );
}
```

---

## 🛠️ Utility Components (17)

Standard UI components from shadcn/ui and Radix UI:

| Component | File | Status | Purpose |
|-----------|------|--------|---------|
| **Accordion** | `accordion.tsx` | ✅ | Collapsible sections |
| **Badge** | `badge.tsx` | ✅ | Standard badges |
| **Button** | `button.tsx` | ✅ | Radix-based button |
| **Card** | `card.tsx` | ✅ | Standard card container |
| **Checkbox** | `checkbox.tsx` | ✅ | Checkbox input |
| **CircularProgress** | `circular-progress.tsx` | ✅ | Progress indicator |
| **Dialog** | `dialog.tsx` | ✅ | Modal dialog |
| **Form** | `form.tsx` | ✅ | React Hook Form integration |
| **IconButton** | `icon-button.tsx` | ✅ | Icon-only button |
| **Input** | `input.tsx` | ✅ | Text input field |
| **Label** | `label.tsx` | ✅ | Form label |
| **RadioGroup** | `radio-group.tsx` | ✅ | Radio button group |
| **Select** | `select.tsx` | ✅ | Dropdown select |
| **Sheet** | `sheet.tsx` | ✅ | Side drawer |
| **Skeleton** | `skeleton.tsx` | ✅ | Loading skeleton |
| **Textarea** | `textarea.tsx` | ✅ | Multi-line text input |
| **ThemeSwitcher** | `theme-switcher.tsx` | ✅ | Dark/light mode toggle |

---

## 📊 Component Matrix

**By Category:**

### Buttons
- NeoButton (neomorphic primary)
- Button (standard radix)
- IconButton (icon-only)

### Cards & Containers
- NeoCard (neomorphic container)
- Card (standard container)
- Sheet (side drawer)

### Data Display
- Badge / BadgeNeo (labels)
- CircularProgress (progress)

### Forms
- Input (text field)
- Textarea (multi-line)
- Checkbox (boolean)
- RadioGroup (choice selection)
- Select (dropdown)
- Label (form label)
- Form (RHF wrapper)

### Layout & Structure
- Dialog (modal)
- Accordion (collapsible sections)

### Interactions
- NeoSlider (range input)
- NeoToggle (binary switch)
- ThemeSwitcher (theme toggle)

### Loading States
- Skeleton (placeholder)

---

## 🎨 Design Tokens Reference

### Colors

```css
--brand-charcoal: #1A1A1A    /* Primary dark */
--brand-cream: #FAFAF9       /* Primary light */
--brand-sand: #F5F5F5        /* Secondary bg */
--brand-gold: #D4A574        /* Accent primary */
--brand-copper: #B8956A      /* Accent secondary */
--text-gray: #666666         /* Body text alternate */
--neutral-200: #E5E5E5       /* Borders */
```

### Typography

```css
--font-sans: "ABC Diatype", system sans-serif
--font-display: "ABC Diatype", system sans-serif
```

### Shadows

```css
--shadow-card: 0 8px 30px rgba(0, 0, 0, 0.05)
--shadow-neo-light: 0 4px 12px rgba(0, 0, 0, 0.08)
--shadow-neo-medium: 0 8px 24px rgba(0, 0, 0, 0.12)
--shadow-neo-pressed: inset 0 2px 4px rgba(0, 0, 0, 0.1)
```

### Spacing

```
4px: p-1, gap-1
8px: p-2, gap-2
12px: p-3, gap-3
16px: p-4, gap-4
24px: p-6, gap-6
32px: p-8, gap-8
```

### Radii

```
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 24px
--radius-2xl: 32px
```

---

## ✅ Export Reference

### All Components

```tsx
// UI Components
export { NeoButton } from "@/components/ui/neo-button";
export { NeoCard } from "@/components/ui/neo-card";
export { BadgeNeo } from "@/components/ui/badge-neo";
export { NeoSlider } from "@/components/ui/neo-slider";
export { NeoToggle } from "@/components/ui/neo-toggle";

// Standard Components
export { Button } from "@/components/ui/button";
export { Card } from "@/components/ui/card";
export { Badge } from "@/components/ui/badge";
export { Input } from "@/components/ui/input";
export { Textarea } from "@/components/ui/textarea";
export { Dialog } from "@/components/ui/dialog";
export { Sheet } from "@/components/ui/sheet";
export { Label } from "@/components/ui/label";
export { Checkbox } from "@/components/ui/checkbox";
export { RadioGroup } from "@/components/ui/radio-group";
export { Select } from "@/components/ui/select";
export { Accordion } from "@/components/ui/accordion";
export { Skeleton } from "@/components/ui/skeleton";
export { IconButton } from "@/components/ui/icon-button";
export { CircularProgress } from "@/components/ui/circular-progress";
export { ThemeSwitcher } from "@/components/ui/theme-switcher";
export { Form } from "@/components/ui/form";

// Section Components
export { HeroSection } from "@/components/sections/home/HeroSection";
export { BestsellersSection } from "@/components/sections/home/BestsellersSection";
export { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
```

---

## 🔗 Related Documentation

- **DESIGN_SYSTEM.md** - Complete design specification
- **IMPLEMENTATION_GUIDE.md** - How to use components
- **TESTING_REPORT.md** - Test results
- **CHANGELOG.md** - Version history

---

**Last Updated:** 2025-10-30 | Version 1.0.0 | Production Ready
