import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-xl font-semibold transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0',
    "active:scale-95",
  ].join(" "),
  {
    variants: {
      variant: {
        gold: "bg-[#9B8C82] text-white shadow-md hover:shadow-lg hover:bg-[#B7A99D] transition-colors",
        outline:
          "border-2 border-[#423A35] text-[#423A35] hover:bg-[#423A35] hover:text-white transition-colors",
        ghost: "bg-transparent text-[#423A35] hover:bg-[#DADADD]",
        subtle:
          "border border-transparent bg-[#DADADD] text-[#423A35] hover:border-[#B7A99D]/50 hover:shadow-sm",
        link: "text-[#B7A99D] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 rounded-lg px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-base",
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
