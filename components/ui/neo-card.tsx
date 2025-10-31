import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const neoCardVariants = cva(
  [
    "relative flex flex-col",
    "rounded-soft-lg overflow-hidden",
    "transition-all duration-200",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-[#B7A99D] focus-within:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        elevated: [
          "bg-white border border-gray-100",
          "shadow-neo-light",
          "hover:shadow-neo-medium hover:scale-105",
        ].join(" "),
        flat: [
          "bg-brand-sand border border-gray-200",
          "shadow-none",
          "hover:bg-opacity-80",
        ].join(" "),
        outlined: [
          "bg-white border-2 border-[#B7A99D]",
          "shadow-neo-subtle",
          "hover:shadow-glow-gold",
        ].join(" "),
      },
      hoverEffect: {
        true: "cursor-pointer",
        false: "",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-10",
      },
    },
    defaultVariants: {
      variant: "elevated",
      hoverEffect: true,
      padding: "md",
    },
  },
);

export interface NeoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof neoCardVariants> {}

interface NeoCardComponent
  extends React.ForwardRefExoticComponent<
    NeoCardProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: typeof NeoCardHeader;
  Body: typeof NeoCardBody;
  Footer: typeof NeoCardFooter;
}

const NeoCard = React.forwardRef<HTMLDivElement, NeoCardProps>(
  (
    {
      className,
      variant = "elevated",
      hoverEffect = true,
      padding = "md",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="neo-card"
      className={cn(
        neoCardVariants({
          variant,
          hoverEffect,
          padding,
        }),
        className,
      )}
      {...props}
    />
  ),
) as NeoCardComponent;

NeoCard.displayName = "NeoCard";

// Sub-component: Header
export interface NeoCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const NeoCardHeader = React.forwardRef<HTMLDivElement, NeoCardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="neo-card-header"
      className={cn("overflow-hidden", className)}
      {...props}
    />
  ),
);

NeoCardHeader.displayName = "NeoCardHeader";

// Sub-component: Body
export interface NeoCardBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const NeoCardBody = React.forwardRef<HTMLDivElement, NeoCardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="neo-card-body"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  ),
);

NeoCardBody.displayName = "NeoCardBody";

// Sub-component: Footer
export interface NeoCardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const NeoCardFooter = React.forwardRef<HTMLDivElement, NeoCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="neo-card-footer"
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    />
  ),
);

NeoCardFooter.displayName = "NeoCardFooter";

// Attach sub-components to main component
NeoCard.Header = NeoCardHeader;
NeoCard.Body = NeoCardBody;
NeoCard.Footer = NeoCardFooter;

export { NeoCard, neoCardVariants, NeoCardHeader, NeoCardBody, NeoCardFooter };
