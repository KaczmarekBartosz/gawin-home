"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Theme Toggle Component
 * Premium dark/light mode switcher with smooth animations
 * Used in header/navigation for theme switching
 */

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="size-10" />; // Placeholder
  }

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative inline-flex items-center justify-center p-2 rounded-lg",
        "transition-colors duration-300",
        isDark
          ? "bg-brand-charcoal/50 hover:bg-brand-charcoal/70"
          : "bg-[#B7A99D]/20 hover:bg-[#B7A99D]/30"
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Sun Icon (Light Mode) */}
      <AnimatePresence mode="wait">
        {!isDark && (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -180 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Sun className={cn("size-5", "text-[#B7A99D]")} />
          </motion.div>
        )}

        {/* Moon Icon (Dark Mode) */}
        {isDark && (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -180 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Moon className={cn("size-5", "text-brand-cream")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glow effect */}
      <motion.div
        initial={false}
        animate={{
          boxShadow: isDark
            ? "0 0 12px rgba(26, 26, 26, 0.5)"
            : "0 0 12px rgba(212, 165, 116, 0.3)",
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-lg pointer-events-none"
      />
    </motion.button>
  );
}

export default ThemeToggle;
