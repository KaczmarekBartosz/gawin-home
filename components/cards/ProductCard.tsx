"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoButton } from "@/components/ui/neo-button";
import { BadgeNeo } from "@/components/ui/badge-neo";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  compareAtPrice?: number;
  image?: string;
  images?: Array<{ src: string; alt: string }> | string[];
  rating: number;
  reviewCount: number;
  badge?: string | null;
  badges?: string[];
  inStock?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  comparePrice,
  compareAtPrice,
  image,
  images,
  rating,
  reviewCount,
  badge,
  badges,
  inStock = true,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) {
  // Normalize image - support multiple data structures
  let productImage = image || "";
  if (!productImage && images && images.length > 0) {
    const firstImage = images[0];
    if (firstImage) {
      productImage = typeof firstImage === "string" ? firstImage : firstImage.src;
    }
  }

  // Normalize badge - support both old and new data structures
  const productBadge = badge || badges?.[0] || null;

  // Normalize compare price
  const productComparePrice = comparePrice ?? compareAtPrice;

  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const discount = productComparePrice
    ? Math.round(((productComparePrice - price) / productComparePrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link href={`/product/${slug}`}>
        <div className="flex h-full flex-col rounded-2xl bg-white shadow-neo-light hover:shadow-neo-medium transition-all duration-300 overflow-hidden group">
          {/* Image container */}
          <div className="relative overflow-hidden bg-neutral-100 aspect-square">
            {/* Product image */}
            <Image
              src={productImage}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Badge - top left */}
            {productBadge && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="absolute top-3 left-3 z-10"
              >
                <BadgeNeo
                  variant={
                    productBadge === "BESTSELLER"
                      ? "gold"
                      : productBadge === "NOWOŚĆ"
                        ? "success"
                        : productBadge === "NIEDOSTĘPNE"
                          ? "error"
                          : "primary"
                  }
                  className="text-xs font-bold"
                >
                  {productBadge}
                </BadgeNeo>
              </motion.div>
            )}

            {/* Discount badge - top right */}
            {discount > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="absolute top-3 right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white font-bold text-sm shadow-neo-light"
              >
                -{discount}%
              </motion.div>
            )}

            {/* Wishlist button - bottom right (shown on hover) */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
                onAddToWishlist?.(id);
              }}
              className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-neo-light hover:bg-brand-cream transition-all duration-200"
              aria-label="Add to wishlist"
            >
              <motion.div
                animate={{
                  scale: isWishlisted ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={cn(
                    "size-5 transition-colors duration-200",
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-brand-charcoal"
                  )}
                />
              </motion.div>
            </motion.button>

            {/* Stock status overlay */}
            {!inStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <p className="text-center text-white font-semibold text-sm">
                  Niedostępne
                </p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
            {/* Top section */}
            <div>
              {/* Product name */}
              <h3 className="text-h4 font-semibold text-brand-charcoal line-clamp-2 group-hover:text-brand-sand-primary transition-colors duration-200">
                {name}
              </h3>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-3 flex items-center gap-2"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "size-4",
                        i < Math.floor(rating)
                          ? "fill-brand-sand-primary text-brand-sand-primary"
                          : "fill-neutral-200 text-neutral-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-caption text-brand-charcoal/60">
                  ({reviewCount})
                </span>
              </motion.div>
            </div>

            {/* Pricing */}
            <div className="mt-4 mb-4 flex items-baseline gap-2">
              <span className="text-h4 font-bold text-brand-charcoal">
                {price.toLocaleString("pl-PL")} zł
              </span>
              {productComparePrice && (
                <span className="text-body-small text-brand-charcoal/50 line-through">
                  {productComparePrice.toLocaleString("pl-PL")} zł
                </span>
              )}
            </div>

            {/* Add to cart button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(id);
              }}
              disabled={!inStock}
              whileHover={inStock ? { scale: 1.02 } : {}}
              whileTap={inStock ? { scale: 0.98 } : {}}
              className="w-full"
            >
              <NeoButton
                variant={inStock ? "primary" : "ghost"}
                size="sm"
                className="w-full"
                disabled={!inStock}
              >
                <ShoppingCart className="size-4" />
                {inStock ? "Do koszyka" : "Niedostępne"}
              </NeoButton>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
