import * as React from "react";

import { cn } from "@/lib/utils";

const inputBaseStyles =
  "flex h-11 w-full rounded-lg border border-neutral-200 bg-white px-4 text-base text-brand-charcoal transition-all duration-200";
const inputFocusStyles =
  "focus:border-[#B7A99D] focus-visible:ring-2 focus-visible:ring-[#B7A99D]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const inputMisc =
  "placeholder:text-neutral-500 selection:bg-[#B7A99D]/20 disabled:cursor-not-allowed disabled:opacity-60";

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
