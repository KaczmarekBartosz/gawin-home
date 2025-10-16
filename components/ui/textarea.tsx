import * as React from "react";

import { cn } from "@/lib/utils";

const textareaBase =
  "w-full min-h-[140px] rounded-lg border border-[color:oklch(0.9_0_0)] bg-white/90 px-4 py-3 text-base text-brand-charcoal transition-all duration-200";
const textareaFocus =
  "focus:border-brand-gold focus-visible:ring-2 focus-visible:ring-[oklch(0.75_0.12_85_/_0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:oklch(1_0_0)] focus-visible:shadow-[0_18px_42px_rgba(26,26,26,0.08)]";
const textareaMisc =
  "placeholder:text-[color:oklch(0.45_0_0)] selection:bg-[oklch(0.75_0.12_85_/_0.2)] disabled:cursor-not-allowed disabled:opacity-60 resize-none";

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
