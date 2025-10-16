"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { cn, formatCurrency } from "@/lib/utils";

type ProductCardProps = {
  product: MockProduct;
  href?: string;
  className?: string;
};

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

  const priceLabel = formatCurrency(product.price, product.currency);
  const compareLabel = product.compareAtPrice
    ? formatCurrency(product.compareAtPrice, product.currency)
    : null;

  return (
    <Link href={href} className={cn("group block", className)}>
      <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-200/70 bg-white/90 transition-all duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-brand-sand">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-black/20" />
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

          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold backdrop-blur"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
                  ? "bg-brand-gold text-white hover:bg-brand-gold/90"
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

        <div className="flex grow flex-col justify-between space-y-6 px-7 py-9 md:px-9 md:py-11">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-brand-gold/80">
              {product.category}
            </p>
            <h3 className="text-2xl font-semibold tracking-[-0.01em] text-brand-charcoal">
              {product.name}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {product.fabrics.slice(0, 4).map((fabric) => (
              <span
                key={fabric.id}
                className="size-7 rounded-full border border-neutral-200 shadow-sm"
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
                <p className="text-sm text-neutral-500 line-through">
                  {compareLabel}
                </p>
              )}
            </div>
            <div className="text-right text-sm text-neutral-500">
              <span>
                {product.dimensions.w}×{product.dimensions.d}×
                {product.dimensions.h} {product.dimensions.unit}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "text-sm",
                    index < Math.round(product.rating)
                      ? "text-brand-gold"
                      : "text-neutral-300",
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
