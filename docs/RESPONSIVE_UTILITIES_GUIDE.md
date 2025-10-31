# Responsive Utilities Implementation Guide

Task 14: Mobile Responsiveness - Update Utility Classes

## Overview

Comprehensive mobile-first responsive utility classes have been added to `app/globals.css`. This document provides usage examples for each utility category.

---

## 1. Responsive Typography

### Hero Headlines

Mobile: 30px | Tablet: 48px | Desktop: 72px

```jsx
<h1 className="text-display-hero-mobile md:text-display-hero-tablet lg:text-display-hero-desktop">
  Welcome to Gawin
</h1>
```

### Section Headlines

Mobile: 24px | Tablet: 32px | Desktop: 48px

```jsx
<h2 className="text-h1-mobile md:text-h1-tablet lg:text-h1-desktop">
  Our Collection
</h2>
```

### Body Text

Mobile: 0.95rem | Tablet+: 1rem

```jsx
<p className="text-body-mobile md:text-body-tablet">
  Lorem ipsum dolor sit amet...
</p>
```

---

## 2. Responsive Spacing

### Padding Utilities

```jsx
<div className="px-mobile md:px-tablet lg:px-desktop">
  {/* Mobile: 1rem, Tablet: 1.5rem, Desktop: 2rem */}
</div>
```

### Gap for Grids

```jsx
<div className="flex flex-col gap-mobile md:gap-tablet lg:gap-desktop">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## 3. Responsive Containers

### Full-Width to Constrained

```jsx
<div className="container-mobile md:container-tablet lg:container-desktop">
  {/* Mobile: 100% | Tablet: 640px | Desktop: 1024px */}
</div>
```

---

## 4. Responsive Grid/Flex

### Auto-Responsive Grid

```jsx
<div className="grid-cols-responsive">
  {/* Mobile: 1 col | Tablet: 2 cols | Desktop: 3 cols */}
  <Card />
  <Card />
  <Card />
</div>
```

### Mobile Column Layout

```jsx
<div className="flex-mobile-col md:flex-tablet-row gap-mobile md:gap-tablet">
  {/* Mobile: vertical | Tablet+: horizontal */}
</div>
```

---

## 5. Touch-Friendly Elements (WCAG AAA)

### Buttons with Proper Touch Targets

```jsx
<button className="btn-mobile md:btn-tablet lg:btn-desktop">
  {/* Mobile: 48px | Tablet: 44px | Desktop: 40px */}
  Click Me
</button>
```

### Expanded Touch Area

```jsx
<div className="tap-target">
  <button>Small Button</button>
  {/* Provides invisible 48x48px touch area */}
</div>
```

---

## 6. Responsive Images

### Fluid Images

```jsx
<img src="/image.jpg" alt="Description" className="img-responsive" />
```

### Images with Aspect Ratios

```jsx
<img src="/video.jpg" alt="" className="aspect-video-mobile" />
<img src="/product.jpg" alt="" className="aspect-square-mobile" />
<img src="/portrait.jpg" alt="" className="aspect-portrait-mobile" />
```

---

## 7. Responsive Visibility

### Hide on Mobile

```jsx
<nav className="hidden-mobile">
  {/* Hidden on mobile, visible on tablet+ */}
</nav>
```

### Show Mobile Only

```jsx
<button className="visible-mobile-only">Open Menu</button>
```

### Desktop Only

```jsx
<div className="visible-desktop-only">Premium Features</div>
```

---

## 8. iOS Safe Area Support

### Header with Notch Support

```jsx
<header className="safe-area-inset">
  {/* Respects iPhone notch and home indicator */}
</header>
```

### Directional Safe Area

```jsx
<div className="safe-padding-x">Horizontal padding</div>
<div className="safe-padding-top">Status bar area</div>
<div className="safe-padding-bottom">Home indicator area</div>
```

---

## 9. Responsive Forms

### Mobile-Optimized Input

```jsx
<input type="text" placeholder="Enter name" className="input-mobile" />;
{
  /* Full width, 44px tall, touch-friendly */
}
```

### Responsive Form Layout

```jsx
<form className="form-field-mobile md:form-field-tablet lg:form-field-desktop">
  {/* Mobile: 1 col | Tablet: 1 col | Desktop: 2 cols */}
  <input type="text" className="input-mobile" />
  <input type="email" className="input-mobile" />
  <button type="submit" className="btn-mobile">
    Submit
  </button>
</form>
```

---

## 10. Responsive Section Padding

### Section Spacing

```jsx
<section className="section-padding-mobile md:section-padding-tablet lg:section-padding-desktop">
  {/* Mobile: 2rem vertical, 1rem horizontal */}
  {/* Tablet: 3rem vertical, 1.5rem horizontal */}
  {/* Desktop: 4rem vertical, 2rem horizontal */}
</section>
```

---

## 11. Responsive Scroll Utilities

### Smooth Scrolling

```jsx
<div className="scroll-smooth">Content</div>
```

### Hide Scrollbar (iOS Compatible)

```jsx
<div className="hide-scrollbar overflow-y-auto">
  {/* Content scrolls but scrollbar is hidden */}
</div>
```

### Scroll Snapping

```jsx
<div className="snap-y-mobile hide-scrollbar">
  <div className="snap-item">Item 1</div>
  <div className="snap-item">Item 2</div>
</div>
```

---

## Complete Example: Hero Section

```jsx
<section className="section-padding-mobile md:section-padding-tablet lg:section-padding-desktop">
  <div className="container-mobile md:container-tablet lg:container-desktop">
    <h1 className="text-display-hero-mobile md:text-display-hero-tablet lg:text-display-hero-desktop">
      Luxury Furniture for Modern Living
    </h1>
    <p className="text-body-mobile md:text-body-tablet mt-4">
      Discover our curated collection of premium furniture pieces
    </p>
    <button className="btn-mobile md:btn-tablet lg:btn-desktop mt-6">
      Shop Now
    </button>
  </div>
</section>
```

---

## Complete Example: Product Grid

```jsx
<section className="section-padding-mobile md:section-padding-tablet lg:section-padding-desktop">
  <div className="container-mobile md:container-tablet lg:container-desktop">
    <h2 className="text-h1-mobile md:text-h1-tablet lg:text-h1-desktop mb-6">
      Featured Products
    </h2>
    <div className="grid-cols-responsive">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col gap-2">
          <Image
            src={product.image}
            alt={product.name}
            className="aspect-square-mobile"
            width={300}
            height={300}
          />
          <h3 className="text-h3">{product.name}</h3>
          <p className="text-body-mobile">${product.price}</p>
          <button className="btn-mobile md:btn-tablet lg:btn-desktop w-full">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Breakpoints Reference

| Width   | Tailwind | Device        |
| ------- | -------- | ------------- |
| 320px+  | default  | Mobile        |
| 640px+  | sm:      | Tablet        |
| 1024px+ | lg:      | Desktop       |
| 1280px+ | xl:      | Desktop Large |

---

## Accessibility Features

- Touch targets: 48x48px minimum (WCAG AAA)
- Interactive elements: 44-48px height
- iOS safe area support for notches
- Keyboard navigation maintained
- Focus ring styling preserved

---

## Testing Checklist

- [ ] Responsive behavior on 320px, 640px, 1024px viewports
- [ ] Touch targets verified on mobile devices
- [ ] Safe area support tested on iPhone
- [ ] Form inputs work on mobile
- [ ] Images scale properly across breakpoints
- [ ] Navigation responsive on all sizes
- [ ] No horizontal scrolling on mobile
- [ ] WCAG AA/AAA accessibility compliance

---

For detailed implementation in `app/globals.css`, see the commented sections for each utility category.
