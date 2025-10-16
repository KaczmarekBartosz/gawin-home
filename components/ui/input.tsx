import * as React from "react";

import { cn } from "@/lib/utils";

const inputBaseStyles =
  "flex h-12 w-full rounded-lg border border-[color:oklch(0.9_0_0)] bg-white/90 px-4 text-base text-brand-charcoal transition-all duration-200";
const inputFocusStyles =
  "focus:border-brand-gold focus-visible:ring-2 focus-visible:ring-[oklch(0.75_0.12_85_/_0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:oklch(1_0_0)] focus-visible:shadow-[0_18px_42px_rgba(26,26,26,0.08)]";
const inputMisc =
  "placeholder:text-[color:oklch(0.45_0_0)] selection:bg-[oklch(0.75_0.12_85_/_0.2)] disabled:cursor-not-allowed disabled:opacity-60";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(inputBaseStyles, inputFocusStyles, inputMisc, className)}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export { Input };
