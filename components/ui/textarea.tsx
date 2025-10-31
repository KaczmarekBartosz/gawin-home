import * as React from "react";

import { cn } from "@/lib/utils";

const textareaBase =
  "w-full min-h-[140px] rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-brand-charcoal transition-all duration-200";
const textareaFocus =
  "focus:border-[#B7A99D] focus-visible:ring-2 focus-visible:ring-[#B7A99D]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const textareaMisc =
  "placeholder:text-neutral-500 selection:bg-[#B7A99D]/20 disabled:cursor-not-allowed disabled:opacity-60 resize-none";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(textareaBase, textareaFocus, textareaMisc, className)}
    {...props}
  />
));

Textarea.displayName = "Textarea";

export { Textarea };
