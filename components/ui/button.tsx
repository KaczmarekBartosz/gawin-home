import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const baseFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.75_0.12_85_/_0.9)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:oklch(1_0_0)]";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-xl font-semibold transition-all duration-300 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0',
    baseFocus,
    "active:scale-95",
  ].join(" "),
  {
    variants: {
      variant: {
        gold: "bg-gradient-gold text-brand-charcoal shadow-soft hover:shadow-elevated hover:brightness-[1.05]",
        outline:
          "border border-brand-gold text-brand-gold hover:bg-[oklch(0.75_0.12_85_/_0.12)] hover:text-brand-charcoal",
        ghost:
          "bg-transparent text-brand-charcoal hover:bg-[oklch(0.94_0.02_85_/_0.6)] hover:text-brand-charcoal",
        subtle:
          "bg-[oklch(0.97_0.005_85)] text-brand-charcoal border border-[color:oklch(0.9_0_0)] hover:border-brand-gold hover:shadow-soft",
        link: "text-brand-gold underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-lg px-4 text-sm",
        md: "h-11 rounded-xl px-6 text-base",
        lg: "h-12 rounded-2xl px-8 text-base",
        icon: "size-10 rounded-xl",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "md",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
