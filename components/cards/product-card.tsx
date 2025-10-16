"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: MockProduct;
  href?: string;
  className?: string;
};

const formatPrice = (value: number, currency: string) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency }).format(value);

export function ProductCard({
  product,
  href = "#",
  className,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] ?? primaryImage;

  if (!primaryImage) {
    return null;
  }

  const priceLabel = formatPrice(product.price, product.currency);
  const compareLabel = product.compareAtPrice
    ? formatPrice(product.compareAtPrice, product.currency)
    : null;

  return (
    <Link href={href} className={cn("group block", className)}>
      <article className="overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-elevated">
        <div className="relative aspect-square overflow-hidden bg-brand-sand">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />
          {secondaryImage && (
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              className="object-cover transition-opacity duration-500 ease-out opacity-0 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={false}
            />
          )}

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-[oklch(0.75_0.12_85_/_0.15)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <IconButton
              aria-label={
                isWishlisted ? "Usuń z ulubionych" : "Dodaj do ulubionych"
              }
              onClick={(event) => {
                event.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className={cn(
                isWishlisted
                  ? "bg-[oklch(0.75_0.12_85)] text-brand-charcoal hover:bg-[oklch(0.75_0.12_85_/_0.9)]"
                  : "bg-white/85",
              )}
            >
              <Heart
                strokeWidth={isWishlisted ? 0 : 1.5}
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isWishlisted && "scale-110",
                )}
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </IconButton>
            <IconButton
              aria-label="Zobacz szczegóły produktu"
              onClick={(event) => event.preventDefault()}
              className="bg-white/85"
            >
              <Eye className="h-4 w-4" strokeWidth={1.5} />
            </IconButton>
          </div>

          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              variant="gold"
              size="md"
              className="w-full justify-center"
              onClick={(event) => event.preventDefault()}
            >
              <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
              Dodaj do koszyka
            </Button>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="space-y-2">
            <p className="text-sm font-medium text-brand-gold uppercase tracking-[0.2em]">
              {product.category}
            </p>
            <h3 className="text-lg font-semibold text-brand-charcoal line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-[color:oklch(0.45_0_0)] line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {product.fabrics.slice(0, 4).map((fabric) => (
              <span
                key={fabric.id}
                className="size-7 rounded-full border border-[color:oklch(0.9_0_0)] shadow-sm"
                style={{ backgroundColor: fabric.swatch }}
                title={fabric.name}
              />
            ))}
            {product.fabrics.length > 4 && (
              <span className="text-xs font-medium text-brand-gold">
                +{product.fabrics.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-brand-charcoal">
                {priceLabel}
              </p>
              {compareLabel && (
                <p className="text-sm text-[color:oklch(0.45_0_0)] line-through">
                  {compareLabel}
                </p>
              )}
            </div>
            <div className="text-right text-sm text-[color:oklch(0.45_0_0)]">
              <span>
                {product.dimensions.w}×{product.dimensions.d}×
                {product.dimensions.h} {product.dimensions.unit}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-[color:oklch(0.45_0_0)]">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "text-base",
                    index < Math.round(product.rating)
                      ? "text-brand-gold"
                      : "text-[color:oklch(0.88_0_0)]",
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="font-medium text-brand-charcoal">
              {product.rating.toFixed(1)} · {product.reviewCount} opinii
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
