"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/cards/ProductCard";
import productsData from "@/data/products.json";

type Product = (typeof productsData)[number];

interface ProductGridProps {
  category?: string;
  limit?: number;
  products?: Product[];
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
}

export function ProductGrid({
  category,
  limit,
  products,
  onAddToCart,
  onAddToWishlist,
}: ProductGridProps) {
  const sourceProducts = React.useMemo<Product[]>(
    () => (products && products.length > 0 ? products : productsData),
    [products],
  );

  const filteredProducts = React.useMemo(() => {
    let result = [...sourceProducts];

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }, [category, limit, sourceProducts]);

  if (filteredProducts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-body-large text-brand-charcoal/60">
          Brak produktów w tej kategorii
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {filteredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.2) }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ProductCard
            {...product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Export a featured products variant
export function FeaturedProductsGrid({
  onAddToCart,
  onAddToWishlist,
  products,
}: {
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  products?: Product[];
}) {
  const sourceProducts = products && products.length > 0 ? products : productsData;
  const featured = sourceProducts.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {featured.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ProductCard
            {...product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Export a new arrivals variant
export function NewArrivalsGrid({
  onAddToCart,
  onAddToWishlist,
  products,
}: {
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  products?: Product[];
}) {
  const sourceProducts = products && products.length > 0 ? products : productsData;
  const newArrivals = sourceProducts.filter((p) => p.isNew).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {newArrivals.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ProductCard
            {...product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
