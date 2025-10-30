"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";

import { NeoCard } from "@/components/ui/neo-card";
import { NeoButton } from "@/components/ui/neo-button";
import { BadgeNeo } from "@/components/ui/badge-neo";
import { cn, formatCurrency } from "@/lib/utils";
import type { MockProduct } from "@/lib/data-adapters/mock";
import productsData from "@/mock/products.json";

export function BestsellersSection() {
  const bestsellers = (productsData as MockProduct[]).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-h1 text-brand-charcoal mb-4">Bestsellery</h2>
          <p className="text-body-descriptive text-gray-600 max-w-2xl">
            Nasze najchętniej wybierane meble. Sprawdzona jakość i ponadczasowy design, które polubili już tysiące klientów.
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {bestsellers.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCardNeo product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.4 }}
        >
          <NeoButton variant="secondary" size="lg" className="px-8">
            Przeglądaj wszystkie bestsellery
          </NeoButton>
        </motion.div>
      </div>
    </section>
  );
}

interface ProductCardNeoProps {
  product: MockProduct;
}

function ProductCardNeo({ product }: ProductCardNeoProps) {
  const primaryImage = product.images[0];

  if (!primaryImage) {
    return null;
  }

  const priceLabel = formatCurrency(product.price, product.currency);
  const ratingInteger = Math.round(product.rating);

  const hasBadges = product.badges && product.badges.length > 0;

  return (
    <NeoCard variant="elevated" hoverEffect={true} padding="none" className="h-full flex flex-col overflow-hidden">
      {/* Header - Product Image */}
      <NeoCard.Header className="relative h-64 overflow-hidden bg-brand-sand flex-shrink-0">
        <Image
          src={primaryImage.src}
          alt={primaryImage.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Optional Badge */}
        {hasBadges && product.badges[0] && (
          <BadgeNeo
            variant="gold"
            size="md"
            shape="pill"
            className="absolute top-4 left-4 shadow-neo-medium"
          >
            {product.badges[0]}
          </BadgeNeo>
        )}
      </NeoCard.Header>

      {/* Body - Product Info */}
      <NeoCard.Body className="flex-grow px-6 py-5">
        <h3 className="text-h3 text-brand-charcoal mb-3 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "text-sm",
                  index < ratingInteger ? "text-brand-gold" : "text-gray-300"
                )}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-caption text-gray-600">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-caption text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        {product.description && (
          <p className="text-body-small text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}
      </NeoCard.Body>

      {/* Footer - Price and Button */}
      <NeoCard.Footer className="px-6 py-5 border-t border-gray-100">
        <span className="text-h3 font-bold text-brand-gold">
          {priceLabel}
        </span>
        <NeoButton
          variant="primary"
          size="sm"
          className="gap-2 flex-shrink-0"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Dodaj</span>
        </NeoButton>
      </NeoCard.Footer>
    </NeoCard>
  );
}
