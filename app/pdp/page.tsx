"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Package2, Shield } from "lucide-react";

import { ProductBreadcrumb } from "@/components/sections/ProductBreadcrumb";
import { ProductImageGallery } from "@/components/sections/ProductImageGallery";
import { ProductInfo } from "@/components/sections/ProductInfo";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FooterLinks } from "@/components/layout/footer/FooterLinks";

import productsData from "@/data/products.json";

const product = (productsData as any)[0] || {
  id: "sofa-modern-grey",
  name: "Sofa Modern Grey - Premium Comfort",
  category: "Meble > Sofy > Nowoczesne",
  price: 3499,
  compareAtPrice: 4299,
  rating: 4.8,
  reviewCount: 234,
  inStock: true,
  badge: "BESTSELLER",
  description:
    "Elegancka sofa nowoczesna z szarą tkanką premium. Idealny wybór do minimalistycznych i loft wnętrz. Wykonana z drewna bukowego i pianki wysokiej gęstości.",
  sku: "SOFA-MODERN-GREY-01",
};

const reviews = [
  {
    id: "1",
    author: "Anna K.",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    title: "Świetna sofa, wspaniała jakość",
    content: "Kupiłam tę sofę 6 miesięcy temu i jestem bardzo zadowolona. Materiał jest wytrzymały.",
    date: "2024-09-15",
    helpful: 45,
    unhelpful: 2,
    verified: true,
  },
  {
    id: "2",
    author: "Maciej R.",
    avatar: "https://i.pravatar.cc/100?img=2",
    rating: 5,
    title: "Najlepsza inwestycja w moje mieszkanie",
    content: "Taka sofa to jeden z tych mebli, w który warto zainwestować. Długoletnia gwarancja.",
    date: "2024-08-22",
    helpful: 62,
    unhelpful: 1,
    verified: true,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, margin: "-100px" },
};

export default function ProductDetailPage() {
  const images = [
    { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80", alt: "Główny widok" },
    { url: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80", alt: "Widok z boku" },
    { url: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80", alt: "Szczegóły" },
    { url: "https://images.unsplash.com/photo-1503855671918-48716c0ce86e?w=1200&q=80", alt: "Widok z góry" },
  ];

  return (
    <main className="w-full bg-white">
      {/* Breadcrumb */}
      <section className="w-full py-6 px-4 sm:px-6 bg-brand-cream border-b border-brand-charcoal/10">
        <div className="mx-auto max-w-7xl">
          <ProductBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Meble", href: "/listing" },
              { label: "Sofy", href: "/listing?category=sofas" },
              { label: product.name },
            ]}
          />
        </div>
      </section>

      {/* Product Details */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
          >
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ProductImageGallery
                images={images}
                productName={product.name}
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <ProductInfo
                id={product.id}
                name={product.name}
                price={product.price}
                comparePrice={product.compareAtPrice}
                rating={product.rating}
                reviewCount={product.reviewCount}
                inStock={product.inStock}
                badge={product.badge}
                description={product.description}
                sku={product.sku}
                category={product.category}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Specifications */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 bg-brand-cream">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeInUp} className="mb-12 text-center">
            <h2 className="text-h1 text-brand-charcoal mb-4">Specyfikacja</h2>
            <p className="text-body-large text-brand-charcoal/70 max-w-2xl mx-auto">
              Szczegółowe informacje o produkcie
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { label: "Wymiary", value: "220 × 95 × 85 cm" },
              { label: "Materiał", value: "100% tkanina poliestrowa premium" },
              { label: "Struktura", value: "Drewno bukowe, piana wysokiej gęstości" },
              { label: "Kolor", value: "Szary (RAL 7045)" },
              { label: "Waga", value: "85 kg" },
              { label: "Montaż", value: "Dostawa + montaż bez opłat" },
            ].map((spec) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white border border-brand-charcoal/10 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-h4 font-semibold text-brand-charcoal mb-2">
                  {spec.label}
                </h3>
                <p className="text-body-small text-brand-charcoal/70">
                  {spec.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews">
        <ReviewsSection
          reviews={reviews}
          averageRating={product.rating}
          totalReviews={product.reviewCount}
        />
      </section>

      {/* Related Products */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 bg-brand-cream">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeInUp} className="mb-12 text-center">
            <div className="inline-block mb-4">
              <span className="text-label uppercase tracking-widest text-brand-sand-primary">
                Powiązane produkty
              </span>
            </div>
            <h2 className="text-h1 text-brand-charcoal mb-4">
              Polecane dla Ciebie
            </h2>
            <p className="text-body-large text-brand-charcoal/70 max-w-2xl mx-auto">
              Inne produkty, które mogą Cię zainteresować
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <ProductGrid limit={4} />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="w-full">
        <FooterLinks variant="full" />
      </section>
    </main>
  );
}
