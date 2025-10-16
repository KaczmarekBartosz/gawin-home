"use client";

import { cn } from "@/lib/utils";

type SpecItem = {
  label: string;
  value: string;
  hint?: string;
};

type SpecCardProps = {
  title?: string;
  items: SpecItem[];
  className?: string;
};

export function SpecCard({ title, items, className }: SpecCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/8 px-8 py-10 text-brand-cream backdrop-blur",
        "md:px-10 md:py-12",
        className,
      )}
    >
      {title ? (
        <h3 className="text-h3 text-brand-cream">{title}</h3>
      ) : (
        <p className="text-label text-brand-gold">Specyfikacja</p>
      )}
      <dl className="mt-6 space-y-6">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold/80">
              {item.label}
            </dt>
            <dd className="text-sm text-brand-cream">{item.value}</dd>
            {item.hint ? (
              <p className="text-xs text-brand-cream/70">{item.hint}</p>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  );
}
