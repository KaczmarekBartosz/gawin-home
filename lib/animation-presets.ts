/**
 * Central animation presets for consistent scroll and entrance animations
 * across all sections using Framer Motion.
 *
 * Usage:
 * ```tsx
 * import { slideUpFadeIn, staggerContainer } from '@/lib/animation-presets'
 *
 * <motion.div {...slideUpFadeIn}>...</motion.div>
 * ```
 */

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

/**
 * Basic fade-in animation (0.6s default duration)
 */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

/**
 * Fast fade-in animation (0.3s duration)
 */
export const fadeInFast = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

/**
 * Slow fade-in animation (1s duration)
 */
export const fadeInSlow = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1 },
};

/**
 * Group fade presets for easy access
 */
export const fadePresets = {
  in: fadeIn,
  inFast: fadeInFast,
  inSlow: fadeInSlow,
};

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

/**
 * Slide up with fade-in animation
 */
export const slideUpFadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

/**
 * Slide down with fade-in animation
 */
export const slideDownFadeIn = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

/**
 * Slide left with fade-in animation
 */
export const slideLeftFadeIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

/**
 * Slide right with fade-in animation
 */
export const slideRightFadeIn = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

/**
 * Group slide presets for easy access
 */
export const slidePresets = {
  upFadeIn: slideUpFadeIn,
  downFadeIn: slideDownFadeIn,
  leftFadeIn: slideLeftFadeIn,
  rightFadeIn: slideRightFadeIn,
};

// ============================================================================
// SCALE ANIMATIONS
// ============================================================================

/**
 * Scale in from 0.8 with fade-in
 */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
};

/**
 * Scale in from 0.95 (subtle) with fade-in
 */
export const scaleInSmall = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 },
};

/**
 * Scale up with slide up and fade-in (combined animation)
 */
export const scaleUpFadeIn = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.6 },
};

/**
 * Group scale presets for easy access
 */
export const scalePresets = {
  in: scaleIn,
  inSmall: scaleInSmall,
  upFadeIn: scaleUpFadeIn,
};

// ============================================================================
// STAGGER CONTAINER VARIANTS
// ============================================================================

/**
 * Standard stagger container for animating child items sequentially
 * Use with children that have stagger item variants
 */
export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Fast stagger container (0.05s between children)
 */
export const staggerContainerFast = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

/**
 * Slow stagger container (0.15s between children)
 */
export const staggerContainerSlow = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

/**
 * Group stagger container presets for easy access
 */
export const staggerContainerPresets = {
  default: staggerContainer,
  fast: staggerContainerFast,
  slow: staggerContainerSlow,
};

// ============================================================================
// STAGGER ITEM VARIANTS
// ============================================================================

/**
 * Stagger item with slide up and fade-in
 * Use inside components with staggerContainer variant
 */
export const staggerItemSlideUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/**
 * Stagger item with scale and fade-in
 */
export const staggerItemScale = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

/**
 * Stagger item with slide left and fade-in
 */
export const staggerItemSlideLeft = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

/**
 * Stagger item with slide right and fade-in
 */
export const staggerItemSlideRight = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

/**
 * Group stagger item presets for easy access
 */
export const staggerItemPresets = {
  slideUp: staggerItemSlideUp,
  scale: staggerItemScale,
  slideLeft: staggerItemSlideLeft,
  slideRight: staggerItemSlideRight,
};

/**
 * Stagger presets - container and item combined
 */
export const staggerPresets = {
  ...staggerContainerPresets,
  ...staggerItemPresets,
};

// ============================================================================
// BOUNCE & SPRING ANIMATIONS
// ============================================================================

/**
 * Bounce animation with spring physics
 */
export const bounceIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  },
};

/**
 * Bounce up with larger displacement for more dramatic effect
 */
export const bounceUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: {
    type: "spring" as const,
    bounce: 0.4,
    duration: 0.8,
  },
};

/**
 * Group bounce presets for easy access
 */
export const bouncePresets = {
  in: bounceIn,
  up: bounceUp,
};

// ============================================================================
// SCROLL TRIGGER VARIANTS (InView)
// ============================================================================

/**
 * Fade-in animation triggered on scroll into view
 * Only animates once (whileInView fires once by default)
 */
export const scrollFadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

/**
 * Slide up with fade-in triggered on scroll
 * Common pattern for section animations
 */
export const scrollSlideUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

/**
 * Scale animation triggered on scroll
 */
export const scrollScale = {
  initial: { opacity: 0, scale: 0.85 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

/**
 * Slide left animation triggered on scroll
 */
export const scrollSlideLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

/**
 * Slide right animation triggered on scroll
 */
export const scrollSlideRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

/**
 * Group scroll presets for easy access
 */
export const scrollPresets = {
  fadeIn: scrollFadeIn,
  slideUp: scrollSlideUp,
  scale: scrollScale,
  slideLeft: scrollSlideLeft,
  slideRight: scrollSlideRight,
};

// ============================================================================
// CONTINUOUS LOOP ANIMATIONS
// ============================================================================

/**
 * Float animation - element bobs up and down
 * Infinite loop, useful for hero elements or decorative items
 */
export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/**
 * Pulse animation - element scales and fades slightly
 * Infinite loop, useful for CTAs or highlights
 */
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
  },
};

/**
 * Shimmer animation - horizontal wave effect
 * Infinite loop, useful for loading states or highlights
 */
export const shimmerAnimation = {
  animate: {
    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
  },
};

/**
 * Rotate animation - continuous 360° rotation
 * Infinite loop, useful for spinners or decorative elements
 */
export const rotateAnimation = {
  animate: {
    rotate: 360,
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "linear" as const,
  },
};

/**
 * Group loop presets for easy access
 */
export const loopPresets = {
  float: floatAnimation,
  pulse: pulseAnimation,
  shimmer: shimmerAnimation,
  rotate: rotateAnimation,
};

// ============================================================================
// EXPORT ALL PRESETS
// ============================================================================

/**
 * Master export of all animation presets grouped by type
 */
export const allAnimationPresets = {
  fade: fadePresets,
  slide: slidePresets,
  scale: scalePresets,
  stagger: staggerPresets,
  bounce: bouncePresets,
  scroll: scrollPresets,
  loop: loopPresets,
};
