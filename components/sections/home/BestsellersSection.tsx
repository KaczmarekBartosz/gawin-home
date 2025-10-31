"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-h1 text-brand-charcoal mb-6">Bestsellery</h2>
          <p className="text-body-large text-gray-600 max-w-2xl leading-relaxed">
            Nasze najchętniej wybierane meble. Sprawdzona jakość i ponadczasowy
            design, które polubili już tysiące klientów.
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {bestsellers.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
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
          <Button variant="outline" size="lg" className="px-8">
            Przeglądaj wszystkie bestsellery
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: MockProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];

  if (!primaryImage) {
    return null;
  }

  const priceLabel = formatCurrency(product.price, product.currency);
  const ratingInteger = Math.round(product.rating);

  const hasBadges = product.badges && product.badges.length > 0;

  return (
    <Card className="h-full flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
      {/* Header - Product Image */}
      <div className="relative w-full h-72 overflow-hidden bg-gray-100 flex-shrink-0 group">
        <Image
          src={primaryImage.src}
          alt={primaryImage.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Optional Badge */}
        {hasBadges && product.badges[0] && (
          <div className="absolute top-4 left-4 bg-brand-gold text-brand-charcoal px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {product.badges[0]}
          </div>
        )}
      </div>

      {/* Body - Product Info */}
      <CardContent className="flex-grow py-6 px-8">
        <h3 className="text-h3 text-brand-charcoal mb-4 line-clamp-2 font-bold">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "text-sm",
                  index < ratingInteger ? "text-brand-gold" : "text-gray-300",
                )}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-caption text-gray-600 font-medium">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-caption text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        {product.description && (
          <p className="text-body-small text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
      </CardContent>

      {/* Footer - Price and Button */}
      <CardFooter className="px-8 py-6 border-t border-gray-200 flex items-center justify-between gap-4">
        <span className="text-h3 font-bold text-brand-gold whitespace-nowrap">{priceLabel}</span>
        <Button variant="gold" size="sm" className="gap-2 flex-shrink-0">
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Dodaj</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
