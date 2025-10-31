"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * NeoToggle Props Interface
 * Controlled component for toggle/switch UI with neomorphic styling
 */
export interface NeoToggleProps
  extends Omit<React.ComponentProps<"button">, "onChange"> {
  /** Current state of the toggle */
  checked: boolean;
  /** Callback when toggle state changes */
  onChange: (checked: boolean) => void;
  /** Disable toggle interaction */
  disabled?: boolean;
  /** Color variant when checked */
  variant?: "primary" | "gold" | "success";
  /** Physical size of toggle */
  size?: "sm" | "md" | "lg";
  /** Optional label text */
  label?: string;
  /** Label position relative to toggle */
  labelPosition?: "left" | "right";
}

/**
 * CVA for toggle track (background)
 * Handles states: OFF (gray), ON (variant-color)
 * Applies appropriate shadows based on state
 */
const toggleTrackVariants = cva(
  [
    "relative inline-flex items-center",
    "rounded-pill transition-all duration-300 ease-out",
    "cursor-pointer select-none",
    // Base state - OFF
    "bg-gray-300",
    "shadow-neo-inset",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "",
        gold: "",
        success: "",
      },
      size: {
        sm: "w-11 h-6",
        md: "w-14 h-8",
        lg: "w-17 h-10",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Primary - ON state
      {
        variant: "primary",
        checked: true,
        className: "bg-charcoal shadow-neo-light",
      },
      // Gold - ON state with glow
      {
        variant: "gold",
        checked: true,
        className: "bg-[#B7A99D] shadow-glow-gold",
      },
      // Success - ON state with glow
      {
        variant: "success",
        checked: true,
        className: "bg-neo-green shadow-glow-green",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      checked: false,
    },
  },
);

/**
 * CVA for toggle indicator (white circle)
 * Slides left/right based on checked state
 * Applies shadow based on interaction state
 */
const toggleIndicatorVariants = cva(
  [
    "absolute top-0.5 bg-white rounded-full",
    "transition-all duration-300 ease-out",
    "shadow-neo-subtle",
    "pointer-events-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "w-5 h-5",
        md: "w-7 h-7",
        lg: "w-9 h-9",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Position: OFF (left)
      {
        size: "sm",
        checked: false,
        className: "left-0.5",
      },
      {
        size: "md",
        checked: false,
        className: "left-0.5",
      },
      {
        size: "lg",
        checked: false,
        className: "left-0.5",
      },
      // Position: ON (right)
      {
        size: "sm",
        checked: true,
        className: "left-5.5",
      },
      {
        size: "md",
        checked: true,
        className: "left-7.5",
      },
      {
        size: "lg",
        checked: true,
        className: "left-9.5",
      },
    ],
    defaultVariants: {
      size: "md",
      checked: false,
    },
  },
);

/**
 * NeoToggle Component
 * Accessible, animated toggle switch with neomorphic design
 *
 * Features:
 * - Smooth 300ms CSS transitions
 * - Full keyboard support (Space, Enter)
 * - ARIA accessibility attributes
 * - Three size variants (sm, md, lg)
 * - Three color variants (primary, gold, success)
 * - Optional label support
 * - Hover effects with proper cursor feedback
 *
 * @example
 * const [enabled, setEnabled] = useState(false)
 * <NeoToggle checked={enabled} onChange={setEnabled} variant="gold" size="md" />
 */
export const NeoToggle = React.forwardRef<HTMLButtonElement, NeoToggleProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
      variant = "primary",
      size = "md",
      label,
      labelPosition = "right",
      className,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    /**
     * Handle click/toggle
     */
    const handleToggle = React.useCallback(() => {
      if (!disabled) {
        onChange(!checked);
      }
    }, [checked, disabled, onChange]);

    /**
     * Handle keyboard interaction
     * Support Space and Enter keys
     */
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if ((e.key === " " || e.key === "Enter") && !disabled) {
          e.preventDefault();
          handleToggle();
        }
        onKeyDown?.(e);
      },
      [handleToggle, disabled, onKeyDown],
    );

    /**
     * Render toggle component
     */
    const toggleElement = (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        aria-label={label || "Toggle switch"}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        data-slot="neo-toggle"
        className={cn(
          toggleTrackVariants({ variant, size, checked }),
          "hover:shadow-neo-medium",
          disabled && "opacity-50 cursor-not-allowed hover:shadow-neo-inset",
          !disabled && "active:shadow-neo-pressed",
          className,
        )}
        {...props}
      >
        {/* Indicator Circle */}
        <div
          className={toggleIndicatorVariants({
            size,
            checked,
          })}
          aria-hidden="true"
        />
      </button>
    );

    // Return with optional label
    if (label) {
      return (
        <div
          className={cn(
            "inline-flex items-center",
            labelPosition === "left" ? "flex-row" : "flex-row-reverse",
            "gap-2",
          )}
        >
          <label
            className="text-body-small text-charcoal cursor-pointer select-none user-select-none"
            onClick={() => !disabled && handleToggle()}
          >
            {label}
          </label>
          {toggleElement}
        </div>
      );
    }

    return toggleElement;
  },
);

NeoToggle.displayName = "NeoToggle";

export { toggleTrackVariants, toggleIndicatorVariants };
