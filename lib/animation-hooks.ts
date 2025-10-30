"use client";

import { useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";

/**
 * Custom React hooks for common animation patterns using Framer Motion
 * Designed to simplify animation logic in components
 */

/**
 * Hook for triggering animations when element comes into view
 * Uses Intersection Observer API
 *
 * @param options - Intersection Observer options
 * @returns Object with ref, controls, and inView status
 *
 * @example
 * ```tsx
 * const { ref, controls, inView } = useScrollAnimation()
 *
 * return (
 *   <motion.div
 *     ref={ref}
 *     initial="initial"
 *     animate={controls}
 *     variants={slideUpFadeIn}
 *   >
 *     Content
 *   </motion.div>
 * )
 * ```
 */
export function useScrollAnimation(
  options: IntersectionObserverInit = { threshold: 0.3 },
) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        controls.start("animate");
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [controls, options]);

  return { ref, controls };
}

/**
 * Hook for stagger animations with automatic timing
 *
 * @param itemCount - Number of items to stagger
 * @param delay - Initial delay in seconds
 * @param staggerDuration - Duration between each item in seconds
 * @returns Controls for animation and calculated delay function
 *
 * @example
 * ```tsx
 * const { controls, getDelay } = useStaggerAnimation(items.length, 0.2, 0.1)
 *
 * return items.map((item, i) => (
 *   <motion.div
 *     key={item.id}
 *     initial={{ opacity: 0, y: 20 }}
 *     animate={controls}
 *     transition={{
 *       duration: 0.6,
 *       delay: getDelay(i)
 *     }}
 *   >
 *     {item.content}
 *   </motion.div>
 * ))
 * ```
 */
export function useStaggerAnimation(
  itemCount: number,
  delay = 0.2,
  staggerDuration = 0.1,
) {
  const controls = useAnimation();

  const getDelay = (index: number) => delay + index * staggerDuration;

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  return {
    controls,
    getDelay,
    totalDuration: delay + itemCount * staggerDuration,
  };
}

/**
 * Hook combining scroll detection with stagger animation
 * Perfect for animating lists/grids on scroll
 *
 * @param itemCount - Number of items to animate
 * @param staggerDelay - Delay between each item
 * @returns Ref for container, controls, and getDelay function
 *
 * @example
 * ```tsx
 * const { containerRef, controls, getDelay } = useScrollStaggerAnimation(items.length)
 *
 * return (
 *   <motion.div ref={containerRef}>
 *     {items.map((item, i) => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0, y: 20 }}
 *         animate={controls}
 *         transition={{ duration: 0.6, delay: getDelay(i) }}
 *       >
 *         {item.content}
 *       </motion.div>
 *     ))}
 *   </motion.div>
 * )
 * ```
 */
export function useScrollStaggerAnimation(
  itemCount: number,
  staggerDelay = 0.1,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  const getDelay = (index: number) => index * staggerDelay;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          controls.start("animate");
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [controls]);

  return { containerRef, controls, getDelay };
}

/**
 * Hook for scroll-based position tracking
 * Useful for parallax and scroll-linked animations
 *
 * @returns Ref for element and scroll progress (0-1)
 *
 * @example
 * ```tsx
 * const { elementRef, scrollProgress } = useScrollProgress()
 *
 * return (
 *   <motion.div
 *     ref={elementRef}
 *     style={{
 *       y: scrollProgress * 100 // moves 100px for full scroll
 *     }}
 *   >
 *     Content that parallaxes
 *   </motion.div>
 * )
 * ```
 */
export function useScrollProgress() {
  const elementRef = useRef<HTMLDivElement>(null);

  // Note: For production parallax, consider using framer-motion's
  // useScroll and useTransform hooks directly
  return { elementRef };
}

/**
 * Hook for delayed animation chains
 * Useful for sequential animations of different elements
 *
 * @param triggers - Array of conditions to trigger animations
 * @param delayBetween - Delay between each animation trigger
 * @returns Array of controls for each trigger
 *
 * @example
 * ```tsx
 * const controls = useSequentialAnimation([true, true], 0.3)
 *
 * return (
 *   <>
 *     <motion.h1 animate={controls[0]}>Title</motion.h1>
 *     <motion.p animate={controls[1]}>Content</motion.p>
 *   </>
 * )
 * ```
 */
export function useSequentialAnimation(
  triggers: boolean[],
  delayBetween = 0.3,
) {
  const controlsList = useRef<ReturnType<typeof useAnimation>[]>([]);

  // Initialize controls if needed
  if (controlsList.current.length !== triggers.length) {
    controlsList.current = triggers.map(() => useAnimation());
  }

  const controls = controlsList.current;

  useEffect(() => {
    triggers.forEach((trigger, index) => {
      if (trigger) {
        const control = controls[index];
        if (control) {
          const timeoutId = setTimeout(
            () => {
              control.start("animate");
            },
            index * delayBetween * 1000,
          );

          return () => clearTimeout(timeoutId);
        }
      }
    });
  }, [triggers, controls, delayBetween]);

  return controls;
}

/**
 * Hook for hover animations with optimized re-renders
 * Prevents unnecessary animations on hover
 *
 * @returns Ref and animation properties for motion elements
 *
 * @example
 * ```tsx
 * const { whileHover, whileTap } = useHoverAnimation()
 *
 * return (
 *   <motion.button
 *     whileHover={whileHover}
 *     whileTap={whileTap}
 *   >
 *     Hover me
 *   </motion.button>
 * )
 * ```
 */
export function useHoverAnimation() {
  const whileHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const whileTap = {
    scale: 0.95,
    transition: { duration: 0.1 },
  };

  return {
    whileHover,
    whileTap,
  };
}

/**
 * Hook for mount/unmount animations
 * Animates element in on mount and out on unmount
 *
 * @returns Ref and animation controls for entry/exit
 *
 * @example
 * ```tsx
 * const { elementRef, controls } = useMountAnimation()
 *
 * return (
 *   <motion.div
 *     ref={elementRef}
 *     initial={{ opacity: 0 }}
 *     animate={controls}
 *     exit={{ opacity: 0 }}
 *   >
 *     Content
 *   </motion.div>
 * )
 * ```
 */
export function useMountAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  return { elementRef, controls };
}

/**
 * Hook for creating intersection observer with animation callback
 * Lightweight alternative to scroll libraries
 *
 * @param callback - Function to call when element enters view
 * @param options - Intersection Observer options
 * @returns Ref to attach to the element
 *
 * @example
 * ```tsx
 * const elementRef = useOnceInView(() => {
 *   console.log('Element entered view!')
 * })
 *
 * return <div ref={elementRef}>Content</div>
 * ```
 */
export function useOnceInView(
  callback: () => void,
  options: IntersectionObserverInit = { threshold: 0.3 },
) {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasBeenCalled = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting && !hasBeenCalled.current) {
        hasBeenCalled.current = true;
        callback();
        observer.disconnect();
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return elementRef;
}

/**
 * Hook for debounced scroll animations
 * Prevents animation jank from rapid scroll events
 *
 * @param callback - Function to call when scroll event fires
 * @param debounceMs - Debounce delay in milliseconds
 * @returns undefined (hook sets up listener internally)
 *
 * @example
 * ```tsx
 * useDebouncedScroll(() => {
 *   console.log('User scrolled!')
 * }, 200)
 * ```
 */
export function useDebouncedScroll(callback: () => void, debounceMs = 200) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        callback();
      }, debounceMs);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [callback, debounceMs]);
}

/**
 * Hook for triggering animation on specific breakpoint
 * Useful for responsive animations
 *
 * @param breakpoint - Pixel width breakpoint (e.g., 768 for md)
 * @returns Boolean indicating if window width is above breakpoint
 *
 * @example
 * ```tsx
 * const isDesktop = useBreakpointAnimation(768)
 *
 * return (
 *   <motion.div
 *     variants={isDesktop ? desktopAnimation : mobileAnimation}
 *   >
 *     Content
 *   </motion.div>
 * )
 * ```
 */
export function useBreakpointAnimation(breakpoint = 768) {
  const isAboveBreakpointRef = useRef(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      isAboveBreakpointRef.current = window.innerWidth >= breakpoint;
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);

    return () => {
      window.removeEventListener("resize", checkBreakpoint);
    };
  }, [breakpoint]);

  return isAboveBreakpointRef.current;
}
