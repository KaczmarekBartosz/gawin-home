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
        "group relative block overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
        className,
      )}
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={category.image.src}
          alt={category.image.alt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="inline-flex items-center justify-center rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
          Kolekcja
        </span>
        <h3 className="mt-4 text-2xl font-semibold text-white drop-shadow-lg">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
