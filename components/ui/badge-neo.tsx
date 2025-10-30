import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeNeoVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-semibold transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
    '[&>svg]:pointer-events-none [&>svg:not([class*="size-"])]:size-4 [&>svg]:shrink-0',
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-charcoal text-cream shadow-neo-subtle hover:shadow-neo-light",
        success:
          "bg-neo-green text-charcoal shadow-glow-green hover:shadow-glow-green",
        warning:
          "bg-neo-orange text-charcoal shadow-glow-orange hover:shadow-glow-orange",
        error: "bg-error text-white shadow-neo-subtle hover:shadow-neo-light",
        info: "bg-brand-gold text-charcoal shadow-glow-gold hover:shadow-glow-gold",
        gold: "bg-gradient-gold text-charcoal shadow-glow-gold hover:shadow-glow-gold",
      },
      size: {
        sm: "text-xs px-3 py-1",
        md: "text-sm px-4 py-1.5",
        lg: "text-base px-5 py-2",
      },
      shape: {
        rounded: "rounded-soft",
        pill: "rounded-pill",
      },
      outline: {
        true: "bg-transparent border-2",
      },
    },
    compoundVariants: [
      // Outline variants
      {
        outline: true,
        variant: "primary",
        className:
          "border-charcoal text-charcoal hover:bg-charcoal/5 shadow-none hover:shadow-none",
      },
      {
        outline: true,
        variant: "success",
        className:
          "border-neo-green text-neo-green hover:bg-neo-green/10 shadow-none hover:shadow-none",
      },
      {
        outline: true,
        variant: "warning",
        className:
          "border-neo-orange text-neo-orange hover:bg-neo-orange/10 shadow-none hover:shadow-none",
      },
      {
        outline: true,
        variant: "error",
        className:
          "border-error text-error hover:bg-error/10 shadow-none hover:shadow-none",
      },
      {
        outline: true,
        variant: "info",
        className:
          "border-brand-gold text-brand-gold hover:bg-brand-gold/10 shadow-none hover:shadow-none",
      },
      {
        outline: true,
        variant: "gold",
        className:
          "border-brand-gold text-brand-gold hover:bg-brand-gold/10 shadow-none hover:shadow-none",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "pill",
    },
  },
);

export interface BadgeNeoProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeNeoVariants> {
  asChild?: boolean;
}

const BadgeNeo = React.forwardRef<HTMLSpanElement, BadgeNeoProps>(
  (
    { className, variant, size, shape, outline, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        data-slot="badge-neo"
        className={cn(
          badgeNeoVariants({ variant, size, shape, outline }),
          className,
        )}
        {...props}
      />
    );
  },
);
BadgeNeo.displayName = "BadgeNeo";

export { BadgeNeo, badgeNeoVariants };
