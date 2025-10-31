"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Share2,
  ShoppingBag,
  TrendingUp,
  Award,
  Zap,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MicrointeractionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  trigger: "hover" | "click" | "scroll";
}

/**
 * Premium Micro-interactions Collection
 * Showcase of premium hover effects, click feedback, and scroll animations
 * Used throughout the app for delightful UX
 */

export function HoverLiftCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(212, 165, 116, 0.2)" }}
      whileTap={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-2xl bg-white border border-brand-charcoal/10 transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function GlassButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [clicked, setClicked] = React.useState(false);

  return (
    <motion.button
      onClick={() => {
        setClicked(true);
        onClick?.();
        setTimeout(() => setClicked(false), 600);
      }}
      whileHover={{ scale: 1.05, backdropFilter: "blur(10px)" }}
      whileTap={{ scale: 0.95 }}
      className="relative px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 transition-all duration-300 text-white font-medium overflow-hidden"
    >
      {/* Ripple effect */}
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white/30 rounded-full pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
          />
        )}
      </AnimatePresence>

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export function FloatingAction({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<any>;
  label: string;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <motion.button
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="p-3 rounded-full bg-gradient-to-br from-brand-gold to-brand-copper text-white shadow-lg hover:shadow-xl transition-all"
      >
        <Icon className="size-5" />
      </motion.button>

      {/* Label tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-brand-charcoal text-white text-xs font-medium rounded-lg whitespace-nowrap"
          >
            {label}
            {/* Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-charcoal rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PulseCounter({
  count,
  max = 100,
}: {
  count: number;
  max?: number;
}) {
  const percentage = (count / max) * 100;

  return (
    <motion.div className="flex items-center gap-3">
      {/* Circular progress */}
      <div className="relative size-12">
        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-brand-charcoal/10"
          />

          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
            className="text-brand-gold transition-all duration-500"
          />

          {/* Pulse circle (animated) */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-brand-gold/50"
            animate={{ r: [40, 50] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-brand-gold">{count}</span>
        </div>
      </div>

      {/* Label */}
      <div className="flex flex-col">
        <span className="text-xs font-medium text-brand-charcoal/60">
          Obserwujący
        </span>
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-bold text-brand-charcoal"
        >
          +{Math.floor(count / 10)}
        </motion.span>
      </div>
    </motion.div>
  );
}

export function SmoothScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCounter({
  from = 0,
  to = 100,
  duration = 2,
  suffix = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      setCount(Math.floor(from + (to - from) * progress));

      if (progress === 1) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, [from, to, duration]);

  return (
    <span ref={nodeRef} className="font-bold text-brand-gold">
      {count}
      {suffix}
    </span>
  );
}

export function ShinyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("relative inline-block", className)}
      initial={{ backgroundPosition: "200% center" }}
      animate={{ backgroundPosition: "-200% center" }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      style={{
        backgroundImage: "linear-gradient(90deg, transparent, rgba(212,165,116,0.4), transparent)",
        backgroundSize: "200% 100%",
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  stagger = 0.1,
}: {
  children: React.ReactNode[];
  stagger?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ staggerChildren: stagger }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Showcase Component - Display all micro-interactions
 */
export function MicrointeractionsShowcase() {
  const interactions: MicrointeractionProps[] = [
    {
      title: "Hover Lift Cards",
      description: "Cards that lift up with shadow on hover",
      icon: <Award className="size-6 text-brand-gold" />,
      trigger: "hover",
    },
    {
      title: "Glass Buttons",
      description: "Frosted glass buttons with ripple effect",
      icon: <Zap className="size-6 text-brand-gold" />,
      trigger: "click",
    },
    {
      title: "Floating Actions",
      description: "Animated action buttons with tooltips",
      icon: <Heart className="size-6 text-brand-gold" />,
      trigger: "hover",
    },
    {
      title: "Animated Counters",
      description: "Numbers that count up smoothly",
      icon: <TrendingUp className="size-6 text-brand-gold" />,
      trigger: "scroll",
    },
  ];

  return (
    <section className="w-full py-20 md:py-32 px-4 sm:px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-block mb-4">
            <span className="text-label uppercase tracking-widest text-brand-gold">
              Premium Polish
            </span>
          </div>
          <h2 className="text-h1 text-brand-charcoal mb-4">
            Micro-interactions
          </h2>
          <p className="text-body-large text-brand-charcoal/70 max-w-2xl mx-auto">
            Premium animations and interactions for delightful user experience
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {interactions.map((item, i) => (
            <HoverLiftCard key={i} className="p-8">
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="p-3 rounded-lg bg-brand-cream"
                >
                  {item.icon}
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-h4 font-semibold text-brand-charcoal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-body-small text-brand-charcoal/70">
                    {item.description}
                  </p>
                  <div className="mt-3 inline-block px-2 py-1 rounded text-xs font-medium bg-brand-gold/10 text-brand-gold">
                    {item.trigger}
                  </div>
                </div>
              </div>
            </HoverLiftCard>
          ))}
        </div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="p-12 rounded-2xl bg-gradient-to-br from-brand-charcoal to-brand-charcoal/95 text-white"
        >
          <h3 className="text-h3 font-bold mb-8 text-center">
            Try Interactive Demo
          </h3>

          <div className="flex flex-wrap gap-6 justify-center items-center">
            {/* Floating Actions */}
            <FloatingAction
              icon={Heart}
              label="Add to Favorites"
              onClick={() => console.log("Added to favorites!")}
            />
            <FloatingAction
              icon={Share2}
              label="Share"
              onClick={() => console.log("Share clicked!")}
            />
            <FloatingAction
              icon={ShoppingBag}
              label="Add to Cart"
              onClick={() => console.log("Added to cart!")}
            />

            {/* Animated Counter */}
            <div className="flex-shrink-0">
              <PulseCounter count={2547} />
            </div>
          </div>

          {/* Glass Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <GlassButton onClick={() => console.log("Button 1 clicked")}>
              Discover More
            </GlassButton>
            <GlassButton onClick={() => console.log("Button 2 clicked")}>
              Learn More
            </GlassButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MicrointeractionsShowcase;
