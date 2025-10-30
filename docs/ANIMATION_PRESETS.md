# Framer Motion Animation Presets

Complete guide to using the centralized animation presets for consistent scroll and entrance animations across the Gawin Home project.

## Files

- **`lib/animation-presets.ts`** - Core animation preset definitions (464 lines)
- **`lib/animation-hooks.ts`** - Custom React hooks for animation patterns (435 lines)

## Quick Start

### Basic Fade-In Animation

```tsx
import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animation-presets"

export function MyComponent() {
  return <motion.div {...fadeIn}>Content animates on load</motion.div>
}
```

### Scroll-Triggered Slide-Up

```tsx
import { motion } from "framer-motion"
import { scrollSlideUp } from "@/lib/animation-presets"

export function MySection() {
  return (
    <motion.section {...scrollSlideUp}>
      Content animates when scrolled into view
    </motion.section>
  )
}
```

### Stagger Effect for Lists

```tsx
import { motion } from "framer-motion"
import { staggerContainer, staggerItemSlideUp } from "@/lib/animation-presets"

export function ProductList({ products }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={staggerItemSlideUp}>
          {/* Product content */}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

## Animation Categories

### 1. Fade Animations

Smooth opacity transitions without movement.

```tsx
import { fadeIn, fadeInFast, fadeInSlow } from "@/lib/animation-presets"

<motion.div {...fadeIn}>              {/* 0.6s */}
  <motion.div {...fadeInFast}>        {/* 0.3s */}
    <motion.div {...fadeInSlow} />    {/* 1s */}
  </motion.div>
</motion.div>
```

**Use cases:**
- Text content
- Overlay elements
- Background images
- Subtle transitions

**Group preset:** `fadePresets`

---

### 2. Slide Animations

Movement with opacity for entrance effects.

```tsx
import { slideUpFadeIn, slideDownFadeIn, slideLeftFadeIn, slideRightFadeIn } from "@/lib/animation-presets"

<motion.div {...slideUpFadeIn}>      {/* From bottom */}
  <motion.div {...slideLeftFadeIn}>  {/* From left */}
    Content here
  </motion.div>
</motion.div>
```

**Use cases:**
- Section headings
- Navigation items
- Card entrances
- Hero content

**Group preset:** `slidePresets`

---

### 3. Scale Animations

Size growth with fade for emphasis.

```tsx
import { scaleIn, scaleInSmall, scaleUpFadeIn } from "@/lib/animation-presets"

<motion.div {...scaleIn}>          {/* 0.8 → 1 */}
  <motion.div {...scaleInSmall}>   {/* 0.95 → 1 (subtle) */}
    <motion.div {...scaleUpFadeIn} /> {/* 0.9 → 1 with slide */}
  </motion.div>
</motion.div>
```

**Use cases:**
- Image reveals
- Icon highlights
- Button presses
- Product cards

**Group preset:** `scalePresets`

---

### 4. Stagger Animations

Sequential animations for groups of items.

#### Containers (parent)

```tsx
import { staggerContainer, staggerContainerFast, staggerContainerSlow } from "@/lib/animation-presets"

{/* Standard: 0.1s between children, 0.2s delay */}
<motion.div variants={staggerContainer} initial="initial" animate="animate">

{/* Fast: 0.05s between children, 0.1s delay */}
<motion.div variants={staggerContainerFast} initial="initial" animate="animate">

{/* Slow: 0.15s between children, 0.3s delay */}
<motion.div variants={staggerContainerSlow} initial="initial" animate="animate">
</motion.div>
```

#### Items (children)

```tsx
import { staggerItemSlideUp, staggerItemScale, staggerItemSlideLeft, staggerItemSlideRight } from "@/lib/animation-presets"

<motion.div variants={staggerItemSlideUp}>   {/* Slides up then fades */}
<motion.div variants={staggerItemScale}>     {/* Scales in and fades */}
<motion.div variants={staggerItemSlideLeft}> {/* Slides from left */}
```

**Complete example:**

```tsx
import { staggerContainer, staggerItemSlideUp } from "@/lib/animation-presets"

export function Gallery({ items }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={staggerItemSlideUp}>
          <img src={item.image} alt={item.title} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

**Group preset:** `staggerPresets`

---

### 5. Bounce & Spring Animations

Physics-based animations for playful interactions.

```tsx
import { bounceIn, bounceUp } from "@/lib/animation-presets"

<motion.div {...bounceIn}>  {/* Spring: stiffness 300, damping 20 */}
  <motion.div {...bounceUp} /> {/* Spring: bounce 0.4, duration 0.8 */}
</motion.div>
```

**Use cases:**
- Call-to-action buttons
- Celebratory animations
- Interactive elements
- Micro-interactions

**Group preset:** `bouncePresets`

---

### 6. Scroll-Triggered Animations

Animations that fire when element enters viewport.

```tsx
import { scrollFadeIn, scrollSlideUp, scrollScale, scrollSlideLeft, scrollSlideRight } from "@/lib/animation-presets"

{/* Only animates once when scrolled into view */}
<motion.section {...scrollFadeIn}>        {/* Fades in */}
  <motion.div {...scrollSlideUp}>         {/* Slides up 40px */}
    <motion.img {...scrollScale} />       {/* Scales from 0.85 */}
  </motion.div>
</motion.section>
```

**Features:**
- Fires once (`viewport: { once: true }`)
- Triggers at 30% visibility (`amount: 0.3`)
- Perfect for sections below fold
- No JavaScript overhead

**Use cases:**
- Full section animations
- Hero parallax
- Feature reveals
- Product showcases

**Group preset:** `scrollPresets`

---

### 7. Continuous Loop Animations

Infinite animations for decorative elements.

```tsx
import { floatAnimation, pulseAnimation, shimmerAnimation, rotateAnimation } from "@/lib/animation-presets"

<motion.div {...floatAnimation}>    {/* Bobs up/down */}
  <motion.div {...pulseAnimation}>  {/* Pulses in/out */}
    <motion.div {...shimmerAnimation} /> {/* Shimmer effect */}
  </motion.div>
</motion.div>
```

**Use cases:**
- Hero floating elements
- Loading states
- CTA emphasis
- Decorative spinners

**Group preset:** `loopPresets`

---

## Custom Hooks

### useScrollAnimation()

Trigger animation when element enters viewport.

```tsx
import { useScrollAnimation } from "@/lib/animation-hooks"
import { slideUpFadeIn } from "@/lib/animation-presets"

export function Section() {
  const { ref, controls } = useScrollAnimation({
    threshold: 0.3, // Trigger at 30% visible
    once: true,     // Only animate once
  })

  return (
    <motion.section
      ref={ref}
      variants={slideUpFadeIn}
      initial="initial"
      animate={controls}
    >
      Content
    </motion.section>
  )
}
```

---

### useScrollStaggerAnimation()

Stagger animate items as they scroll into view.

```tsx
import { useScrollStaggerAnimation } from "@/lib/animation-hooks"
import { staggerItemSlideUp } from "@/lib/animation-presets"

export function ProductGrid({ products }) {
  const { containerRef, controls, getDelay } = useScrollStaggerAnimation(
    products.length,
    0.1, // 0.1s between items
  )

  return (
    <motion.div ref={containerRef}>
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{
            duration: 0.6,
            delay: getDelay(i),
          }}
        >
          {product.name}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

---

### useHoverAnimation()

Optimize hover state animations.

```tsx
import { useHoverAnimation } from "@/lib/animation-hooks"

export function CardButton() {
  const { whileHover, whileTap } = useHoverAnimation()

  return (
    <motion.button whileHover={whileHover} whileTap={whileTap}>
      Click Me
    </motion.button>
  )
}
```

---

### useSequentialAnimation()

Chain animations with calculated delays.

```tsx
import { useSequentialAnimation } from "@/lib/animation-hooks"

export function HeroSection() {
  const controls = useSequentialAnimation(
    [true, true, true], // Triggers for each animation
    0.3,                // Delay between each (seconds)
  )

  return (
    <>
      <motion.h1 animate={controls[0]}>Hero Title</motion.h1>
      <motion.p animate={controls[1]}>Hero description</motion.p>
      <motion.button animate={controls[2]}>CTA Button</motion.button>
    </>
  )
}
```

---

### useOnceInView()

Simple callback when element enters viewport.

```tsx
import { useOnceInView } from "@/lib/animation-hooks"

export function AnalyticsSection() {
  const elementRef = useOnceInView(() => {
    // Fire analytics event once when user scrolls here
    trackEvent("analytics-section-viewed")
  })

  return <section ref={elementRef}>Analytics content</section>
}
```

---

### useDebouncedScroll()

Prevent jank from rapid scroll events.

```tsx
import { useDebouncedScroll } from "@/lib/animation-hooks"

export function ScrollIndicator() {
  useDebouncedScroll(() => {
    // This callback fires max once per 200ms
    updateScrollPosition()
  }, 200) // ms debounce

  return <div>Scroll indicator</div>
}
```

---

## Real-World Examples

### Hero Section with Multiple Animations

```tsx
import { motion } from "framer-motion"
import {
  slideUpFadeIn,
  scaleIn,
  bounceUp,
  staggerContainer,
  staggerItemSlideUp,
  floatAnimation,
} from "@/lib/animation-presets"

export function HeroSection() {
  return (
    <section className="hero">
      {/* Background float animation */}
      <motion.div
        className="hero-bg"
        {...floatAnimation}
        style={{ backgroundImage: "url(...)" }}
      />

      {/* Main content with stagger */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1 variants={staggerItemSlideUp} className="text-5xl">
          Welcome to Gawin Home
        </motion.h1>

        <motion.p variants={staggerItemSlideUp} className="text-xl">
          Discover beautiful collections
        </motion.p>

        <motion.button
          variants={staggerItemSlideUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now
        </motion.button>
      </motion.div>
    </section>
  )
}
```

### Product Grid with Scroll Animations

```tsx
import { motion } from "framer-motion"
import { useScrollStaggerAnimation } from "@/lib/animation-hooks"
import { staggerItemScale } from "@/lib/animation-presets"

export function ProductGrid({ products }) {
  const { containerRef, controls, getDelay } = useScrollStaggerAnimation(
    products.length,
    0.08, // Tight spacing
  )

  return (
    <motion.div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          variants={staggerItemScale}
          animate={controls}
          transition={{
            duration: 0.6,
            delay: getDelay(i),
          }}
          whileHover={{ y: -10 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Loading State with Shimmer

```tsx
import { motion } from "framer-motion"
import { shimmerAnimation } from "@/lib/animation-presets"

export function LoadingCard() {
  return (
    <motion.div
      className="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
      {...shimmerAnimation}
      style={{
        backgroundSize: "200% 100%",
      }}
    />
  )
}
```

---

## Performance Tips

### 1. Use `viewport={{ once: true }}` for Section Animations

Prevents re-triggering animations on scroll:

```tsx
{/* GOOD - animates once */}
<motion.section {...scrollSlideUp} />

{/* Avoid - animates every time in viewport */}
<motion.section
  whileInView={{ opacity: 1 }}
  initial={{ opacity: 0 }}
/>
```

### 2. Use CSS Transform Properties

Animations using `opacity`, `scale`, `x`, `y`, `rotate` are GPU-accelerated:

```tsx
{/* GOOD - GPU accelerated */}
<motion.div animate={{ scale: 1.1, opacity: 1 }} />

{/* Avoid - CPU intensive */}
<motion.div animate={{ width: "100%", height: "100%" }} />
```

### 3. Limit Simultaneous Animations

Too many animations at once cause jank:

```tsx
{/* GOOD - staggered */}
<motion.div variants={staggerContainerFast} animate="animate">
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItemSlideUp} />
  ))}
</motion.div>

{/* Avoid - all animate at once */}
{items.map((item) => (
  <motion.div key={item.id} animate={{ y: 0 }} initial={{ y: 20 }} />
))}
```

### 4. Test on Mobile Devices

Mobile devices may need slower animations:

```tsx
import { useBreakpointAnimation } from "@/lib/animation-hooks"

export function ResponsiveAnimation() {
  const isDesktop = useBreakpointAnimation(768)

  const duration = isDesktop ? 0.6 : 0.8 // Slower on mobile
  const delay = isDesktop ? 0.1 : 0.15

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration, delay }}
    />
  )
}
```

---

## Customization

### Create Custom Presets

Extend presets for specific use cases:

```tsx
// lib/animation-presets.ts (add to file)
export const customPresets = {
  heroTitle: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },

  cardHover: {
    whileHover: { y: -8, boxShadow: "0 20px 25px rgba(0,0,0,0.1)" },
    transition: { duration: 0.2 },
  },
}
```

### Adjust Timing Globally

All presets use 0.6s default. Adjust in `animation-presets.ts`:

```tsx
// For slower animations globally, increase duration:
export const fadeIn = {
  // ...
  transition: { duration: 0.8 }, // Changed from 0.6
}
```

---

## Troubleshooting

### Animation Not Triggering

**Problem:** Scroll animation doesn't fire
**Solution:** Check `viewport` settings in preset

```tsx
{/* Add explicit viewport if scroll animation doesn't work */}
<motion.div
  {...scrollSlideUp}
  viewport={{ amount: 0.3, once: true }}
/>
```

### Animation Looks Janky

**Problem:** Smooth animation appears stuttery
**Solution:** Use GPU-accelerated properties only

```tsx
{/* GOOD */}
<motion.div animate={{ y: 0, opacity: 1 }} />

{/* BAD */}
<motion.div animate={{ top: 0, left: 0 }} />
```

### Ref Warning

**Problem:** "Failed to resolve reference to motion"
**Solution:** Ensure element accepts ref prop

```tsx
{/* GOOD - div accepts ref */}
<motion.div ref={ref}>Content</motion.div>

{/* May need forwardRef for custom components */}
const CustomComponent = forwardRef((props, ref) => (
  <div ref={ref}>{props.children}</div>
))
```

---

## Compatibility

- **Next.js:** 15.2.5+
- **React:** 19.0.0+
- **Framer Motion:** 12.23.24+
- **TypeScript:** 5.8.2+

---

## Summary

| Category | Presets | Use Case |
|----------|---------|----------|
| Fade | 3 | Subtle transitions |
| Slide | 4 | Directional entrance |
| Scale | 3 | Emphasis effects |
| Stagger | 7 | List/grid animations |
| Bounce | 2 | Playful interactions |
| Scroll | 5 | Below-fold reveals |
| Loop | 4 | Infinite/continuous |
| **Hooks** | **10** | **Dynamic patterns** |

Total: **38 reusable animation patterns** ready to use!
