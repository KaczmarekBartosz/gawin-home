'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: {
      amount: number;
      currency: string;
      installment: number;
    };
    images: Array<{
      url: string;
      alt: string;
    }>;
    colors?: Array<{
      name: string;
      hex: string;
    }>;
    dimensions?: {
      width: number;
      height: number;
      depth: number;
      unit: string;
    };
    rating?: number;
    reviewCount?: number;
    isNew?: boolean;
    onSale?: boolean;
  };
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn('group block', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-2xl bg-white shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-brand-sand">
          <Image
            src={currentImage.url}
            alt={currentImage.alt}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-brand-gold text-white text-xs font-semibold rounded-lg">
                NOWOŚĆ
              </span>
            )}
            {product.onSale && (
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg">
                PROMOCJA
              </span>
            )}
          </div>

          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            aria-label="Dodaj do ulubionych"
          >
            <Heart
              className={cn(
                'h-5 w-5 transition-colors',
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-brand-charcoal'
              )}
              strokeWidth={1.5}
            />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                // TODO: Add to cart logic
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-gold text-white rounded-xl font-semibold hover:bg-brand-copper transition-colors"
            >
              <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
              <span>Dodaj do koszyka</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-brand-charcoal line-clamp-2">
            {product.name}
          </h3>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.hex}
                  className="w-6 h-6 rounded-full border-2 border-neutral-border hover:border-brand-gold transition-colors cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Dimensions */}
          {product.dimensions && (
            <p className="text-sm text-muted-foreground">
              Szerokość: {product.dimensions.width} {product.dimensions.unit}
            </p>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'text-lg',
                      i < Math.floor(product.rating!)
                        ? 'text-brand-gold'
                        : 'text-neutral-border'
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="pt-2 border-t border-neutral-border">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-2xl font-bold text-brand-gold">
                  {product.price.amount.toLocaleString('pl-PL')} {product.price.currency}
                </p>
                <p className="text-sm text-muted-foreground">
                  lub {product.price.installment} zł/mc
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
