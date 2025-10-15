import { CircularProgress } from 'components/ui/circular-progress';
import { cn } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from 'lib/shopify/types';

export interface ProductCardWellnessProps {
  product: Product;
  className?: string;
}

export function ProductCardWellness({ product, className }: ProductCardWellnessProps) {
  const { handle, title, featuredImage, priceRange } = product;

  // Mock metrics for Wellness Tech style (replace with real data later)
  const metrics = {
    comfort: 92,
    durability: 85,
    sustainability: 78,
  };

  const price = priceRange.minVariantPrice;

  return (
    <Link
      href={`/product/${handle}`}
      className={cn(
        'group block',
        'rounded-lg bg-card', // 24px rounded - characteristic of Wellness Tech
        'border border-border',
        'overflow-hidden',
        'transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02]',
        className
      )}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {featuredImage ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground line-clamp-2">{title}</h3>

        {/* Metrics - Circular Progress Indicators (Wellness Tech signature) */}
        <div className="flex justify-between gap-4">
          <CircularProgress
            value={metrics.comfort}
            size="sm"
            variant="accent"
            label="Komfort"
          />
          <CircularProgress
            value={metrics.durability}
            size="sm"
            variant="blue"
            label="Trwałość"
          />
          <CircularProgress
            value={metrics.sustainability}
            size="sm"
            variant="green"
            label="Ekologia"
          />
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-2xl font-bold text-[rgb(var(--accent))]">
              {price.amount}
            </span>
            <span className="ml-1 text-sm text-muted-foreground">{price.currencyCode}</span>
          </div>
          <button
            className={cn(
              'px-4 py-2',
              'rounded-lg', // 24px - Wellness Tech radius
              'bg-[rgb(var(--accent))] text-white',
              'font-medium text-sm',
              'transition-opacity duration-200',
              'hover:opacity-90',
              'active:scale-95'
            )}
          >
            Zobacz
          </button>
        </div>
      </div>
    </Link>
  );
}
