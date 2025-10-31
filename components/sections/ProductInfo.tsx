"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoButton } from "@/components/ui/neo-button";
import { BadgeNeo } from "@/components/ui/badge-neo";

interface ProductInfoProps {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: string;
  description: string;
  sku: string;
  category: string;
  className?: string;
}

export function ProductInfo({
  id,
  name,
  price,
  comparePrice,
  rating,
  reviewCount,
  inStock,
  badge,
  description,
  sku,
  category,
  className,
}: ProductInfoProps) {
  const [quantity, setQuantity] = React.useState(1);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const discount = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${name} to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={cn("flex flex-col gap-8", className)}
    >
      {/* Breadcrumb context */}
      <div>
        <p className="text-caption text-brand-charcoal/60 mb-2">
          {category}
        </p>
        <h1 className="text-display-lg md:text-5xl font-bold text-brand-charcoal leading-tight">
          {name}
        </h1>
      </div>

      {/* Rating & Reviews */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4 flex-wrap"
      >
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < Math.round(rating)
                  ? "fill-[#B7A99D] text-[#B7A99D]"
                  : "text-brand-charcoal/20"
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-body-small">
          <span className="font-semibold text-brand-charcoal">
            {rating.toFixed(1)}
          </span>
          <a
            href="#reviews"
            className="text-[#B7A99D] hover:text-[#9B8C82] transition-colors underline"
          >
            ({reviewCount} opinii)
          </a>
        </div>
        {inStock && (
          <BadgeNeo variant="success" className="text-xs">
            Dostępne
          </BadgeNeo>
        )}
      </motion.div>

      {/* Pricing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <div className="flex items-baseline gap-3">
          <div className="text-5xl font-black text-[#B7A99D]">
            {price.toLocaleString("pl-PL")} zł
          </div>
          {comparePrice && (
            <div className="flex items-center gap-2">
              <span className="text-2xl text-brand-charcoal/40 line-through">
                {comparePrice.toLocaleString("pl-PL")} zł
              </span>
              <BadgeNeo variant="error" className="text-xs">
                -{discount}%
              </BadgeNeo>
            </div>
          )}
        </div>
        <p className="text-body-small text-brand-charcoal/60">
          Cena zawiera VAT
        </p>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-brand-cream rounded-xl border border-brand-charcoal/5"
      >
        <p className="text-body-large text-brand-charcoal/80 leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Add to Cart Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="text-body-small font-medium text-brand-charcoal">
            Ilość
          </span>
          <div className="flex items-center gap-0 border border-brand-charcoal/20 rounded-lg overflow-hidden">
            <motion.button
              whileHover={{ backgroundColor: "rgba(212, 165, 116, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-[#B7A99D]/10 transition-colors"
            >
              −
            </motion.button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center py-2 border-0 border-l border-r border-brand-charcoal/20 focus:outline-none focus:ring-0"
              min="1"
              max="99"
            />
            <motion.button
              whileHover={{ backgroundColor: "rgba(212, 165, 116, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-[#B7A99D]/10 transition-colors"
            >
              +
            </motion.button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <NeoButton
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex-1"
          >
            {inStock ? "Dodaj do koszyka" : "Niedostępne"}
          </NeoButton>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={cn(
              "p-3 rounded-lg border-2 transition-all duration-200",
              isWishlisted
                ? "border-[#B7A99D] bg-[#B7A99D]/10"
                : "border-brand-charcoal/20 hover:border-[#B7A99D]"
            )}
            aria-label="Add to wishlist"
          >
            <Heart
              className={cn(
                "size-5",
                isWishlisted
                  ? "fill-[#B7A99D] text-[#B7A99D]"
                  : "text-brand-charcoal"
              )}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-lg border-2 border-brand-charcoal/20 hover:border-[#B7A99D] transition-all"
            aria-label="Share"
          >
            <Share2 className="size-5 text-brand-charcoal" />
          </motion.button>
        </div>
      </motion.div>

      {/* Trust Signals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-brand-charcoal/10"
      >
        {[
          {
            icon: Truck,
            label: "Darmowa dostawa",
            desc: "Na zamówienia powyżej 500 zł",
          },
          {
            icon: Shield,
            label: "24 m-ce gwarancji",
            desc: "Pełne pokrycie ubezpieczenia",
          },
          {
            icon: RotateCcw,
            label: "Zwrot 30 dni",
            desc: "Bez pytań zwrot do domu",
          },
        ].map((signal, idx) => (
          <div key={idx} className="text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex justify-center mb-3"
            >
              <signal.icon className="size-6 text-[#B7A99D]" />
            </motion.div>
            <h3 className="text-body-small font-semibold text-brand-charcoal mb-1">
              {signal.label}
            </h3>
            <p className="text-caption text-brand-charcoal/60">{signal.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Product Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-2 pt-6 border-t border-brand-charcoal/10 text-body-small"
      >
        <div className="flex justify-between">
          <span className="text-brand-charcoal/60">SKU</span>
          <span className="font-medium text-brand-charcoal font-mono">{sku}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-charcoal/60">Kategoria</span>
          <a href="#" className="text-[#B7A99D] hover:text-[#9B8C82]">
            {category}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductInfo;
