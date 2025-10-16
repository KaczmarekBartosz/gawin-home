import * as React from "react";

import { cn } from "@/lib/utils";

type SectionTone = "light" | "cream" | "sand" | "dark";

type SectionProps<T extends React.ElementType> = {
  as?: T;
  tone?: SectionTone;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

const toneClassMap: Record<SectionTone, string> = {
  light: "bg-light-showroom text-brand-charcoal",
  cream: "bg-brand-cream text-brand-charcoal",
  sand: "bg-brand-sand text-brand-charcoal",
  dark: "bg-dark-entry text-brand-cream",
};

function Section<T extends React.ElementType = "section">({
  as,
  tone = "light",
  className,
  children,
  ...props
}: SectionProps<T>) {
  const Component = (as ?? "section") as React.ElementType;

  return (
    <Component
      className={cn("py-20 md:py-32", toneClassMap[tone], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Section };
