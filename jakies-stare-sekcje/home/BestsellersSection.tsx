"use client";

import { motion } from "framer-motion";

import { ProductCard } from "@/components/cards/product-card";
import type { MockProduct } from "@/lib/data-adapters/mock";
import productsData from "@/mock/products.json";

export function BestsellersSection() {
  const bestsellers = (productsData as MockProduct[]).slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-light-showroom py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2 className="text-h2 text-brand-charcoal mb-4">Bestsellery</h2>
          <p className="text-body-descriptive mx-auto max-w-2xl">
            Najchętniej wybierane przez naszych klientów. Sprawdzona jakość i
            ponadczasowy design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
