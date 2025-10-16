import type { MotionProps } from "framer-motion";

export const fadeInUp: MotionProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
};

export const fadeIn: MotionProps = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const viewportOnce = { once: true, amount: 0.2 } as const;

export const stagger = (delay = 0.08) => ({
  transition: { staggerChildren: delay },
});
