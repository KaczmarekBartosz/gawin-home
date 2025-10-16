import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Category = {
  id: string;
  slug: string;
  name: string;
  image: {
    src: string;
    alt: string;
  };
};

type CategoryCardProps = {
  category: Category;
  href?: string;
  className?: string;
};

export function CategoryCard({
  category,
  href = "#",
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-[2rem] bg-brand-cream shadow-[0_24px_60px_rgba(26,26,26,0.12)] transition-transform duration-500 hover:-translate-y-2",
        className,
      )}
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={category.image.src}
          alt={category.image.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(26,26,26,0.75)] via-[rgba(26,26,26,0.35)] to-transparent" />
        <div className="absolute inset-0 mix-blend-soft-light bg-gradient-to-tr from-brand-gold/20 via-transparent to-brand-copper/15" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-8">
        <span className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/90 backdrop-blur">
          Kolekcja
        </span>
        <h3 className="mt-5 text-[2rem] font-semibold tracking-tight text-white drop-shadow-[0_18px_32px_rgba(0,0,0,0.45)]">
          {category.name}
        </h3>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-6 text-7xl font-display uppercase tracking-[0.25em] text-white/5 transition-transform duration-500 group-hover:-translate-y-1"
      >
        {category.name.slice(0, 2)}
      </span>
    </Link>
  );
}
