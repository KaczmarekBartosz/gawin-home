'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/commerce/product/ProductCard';
import productsData from '@/data/products.json';

export function BestsellersSection() {
  // Get first 4 products as bestsellers
  const bestsellers = productsData.slice(0, 4);

  return (
    <section className="py-20 md:py-32 bg-brand-cream">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 text-brand-charcoal mb-4">Bestsellery</h2>
          <p className="text-body-descriptive max-w-2xl mx-auto">
            Najchętniej wybierane przez naszych klientów. Sprawdzona jakość i ponadczasowy design.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
