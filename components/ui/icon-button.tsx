import * as React from "react";

import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:oklch(0.9_0_0)] bg-white/80 text-brand-charcoal transition-all duration-200";
const interactionStyles =
  "hover:bg-[oklch(0.94_0.02_85_/_0.7)] hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.75_0.12_85_/_0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:oklch(1_0_0)] active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

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
