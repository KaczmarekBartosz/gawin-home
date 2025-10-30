import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const neoButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-soft font-semibold transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0',
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-brand-charcoal text-brand-cream",
          "shadow-neo-light hover:shadow-neo-medium hover:scale-105",
          "active:shadow-neo-pressed active:scale-100",
        ].join(" "),
        secondary: [
          "bg-brand-sand text-brand-charcoal border-2 border-gray-300",
          "shadow-neo-subtle hover:shadow-neo-medium hover:scale-105",
          "active:shadow-neo-pressed active:scale-100",
        ].join(" "),
        ghost: [
          "bg-transparent text-brand-charcoal border border-brand-gold",
          "hover:bg-brand-gold/10 hover:shadow-neo-light hover:scale-105",
          "active:shadow-neo-inset active:scale-100",
        ].join(" "),
        danger: [
          "bg-red-600 text-white",
          "shadow-neo-light hover:shadow-neo-medium hover:scale-105",
          "active:shadow-neo-pressed active:scale-100",
        ].join(" "),
      },
      size: {
        sm: "px-4 py-2 text-sm h-10",
        md: "px-6 py-3 text-base h-12",
        lg: "px-8 py-4 text-lg h-14",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface NeoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neoButtonVariants> {}

export const NeoButton = React.forwardRef<
  HTMLButtonElement,
  NeoButtonProps
>(({ className, variant, size, disabled = false, ...props }, ref) => (
  <button
    ref={ref}
    disabled={disabled}
    className={cn(neoButtonVariants({ variant, size }), className)}
    {...props}
  />
));

NeoButton.displayName = "NeoButton";

export { neoButtonVariants };
