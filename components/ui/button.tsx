import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-gold active:scale-95",
  {
    variants: {
      variant: {
        // Gold (Primary Gradient CTA) - zgodnie z Biblią
        gold: "bg-gradient-to-br from-brand-gold to-brand-copper text-white shadow-lg hover:brightness-110 hover:shadow-md active:brightness-100",

        // Outline (Secondary) - zgodnie z Biblią
        outline:
          "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white",

        // Ghost - zgodnie z Biblią
        ghost:
          "bg-transparent hover:bg-brand-sand",

        // Legacy variants (keeping for compatibility)
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "bg-gradient-to-br from-brand-gold to-brand-copper text-white shadow-lg hover:brightness-110 hover:shadow-md active:brightness-100",
        secondary:
          "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-3 text-sm has-[>svg]:px-4",
        sm: "h-8 rounded-lg gap-1.5 px-4 py-2 text-xs has-[>svg]:px-3",
        md: "h-11 rounded-xl px-6 py-3 text-base has-[>svg]:px-4",
        lg: "h-12 rounded-2xl px-8 py-4 text-base has-[>svg]:px-6",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
