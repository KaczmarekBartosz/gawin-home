import * as React from "react";

import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white/90 text-brand-charcoal transition-all duration-200";
const interactionStyles =
  "hover:bg-black/5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 disabled:pointer-events-none disabled:opacity-50";

const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    data-slot="icon-button"
    className={cn(baseStyles, interactionStyles, className)}
    {...props}
  />
));

IconButton.displayName = "IconButton";

export { IconButton };
