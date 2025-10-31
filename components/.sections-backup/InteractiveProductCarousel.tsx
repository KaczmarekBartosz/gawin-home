"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Sofa Minimalista",
    price: 2499,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    description: "Elegancka sofa w minimalistycznym stylu",
    rating: 4.9,
    reviews: 234,
  },
  {
    id: "2",
    name: "Stół Designerski",
    price: 1899,
    image: "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=800&h=600&fit=crop",
    description: "Nowoczesny stół ze złoconymi detailami",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "3",
    name: "Fotel Premium",
    price: 1299,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=600&fit=crop",
    description: "Wygodny fotel z naturalnych materiałów",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "4",
    name: "Komoda Luksusowa",
    price: 1599,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    description: "Komoda z drewna dębu z bronzowymi uchwytami",
    rating: 4.9,
    reviews: 201,
  },
  {
    id: "5",
    name: "Łóżko Prestige",
    price: 3299,
    image: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800&h=600&fit=crop",
    description: "Łóżko king-size z nowoczesnym dossem",
    rating: 5.0,
    reviews: 445,
  },
];

export function InteractiveProductCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + PRODUCTS.length) % PRODUCTS.length);
  };

  const currentProduct = PRODUCTS[currentIndex]!;
  const nextProduct = PRODUCTS[(currentIndex + 1) % PRODUCTS.length]!;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-brand-charcoal via-brand-charcoal/95 to-brand-charcoal overflow-hidden py-20">
      {/* Gradient Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(212,165,116,0.1),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(184,149,106,0.08),transparent_60%)]" />
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(212,165,116,0.1),transparent)]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-label uppercase tracking-widest text-brand-gold">
              Bestsellers
            </span>
            <h2 className="mt-4 text-4xl font-bold text-brand-cream md:text-5xl">
              Interaktywna Galeria
              <span className="block text-brand-gold">Naszych Flagowych Produktów</span>
            </h2>
            <p className="mt-6 text-body-large text-brand-cream/70 max-w-2xl mx-auto">
              Odkryj nasze bestsellery. Przeciągaj, obracaj, zainspiruj się. Każdy produkt
              to historia doskonałości i designu.
            </p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative h-[500px] md:h-[600px] mb-12">
          {/* Main Product */}
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            <div className="relative h-full flex items-center justify-center">
              {/* Product Image Container */}
              <motion.div
                initial={{ scale: 0.8, rotateY: 45 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full max-w-md"
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />

                {/* Product Info Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-transparent to-transparent rounded-2xl flex flex-col justify-end p-8"
                >
                  <h3 className="text-3xl font-bold text-brand-cream mb-2">
                    {currentProduct.name}
                  </h3>
                  <p className="text-brand-cream/70 mb-4 text-sm">
                    {currentProduct.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "text-lg",
                            i < Math.floor(currentProduct.rating)
                              ? "text-brand-gold"
                              : "text-brand-cream/30"
                          )}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-brand-cream/70">
                      {currentProduct.rating} ({currentProduct.reviews} opinii)
                    </span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-brand-gold">
                      {currentProduct.price.toLocaleString()} zł
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-brand-gold hover:bg-brand-gold/90 text-brand-charcoal rounded-full p-3 transition-all"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-brand-gold/20 hover:bg-brand-gold/40 text-brand-gold rounded-full p-3 backdrop-blur-md transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-brand-gold/20 hover:bg-brand-gold/40 text-brand-gold rounded-full p-3 backdrop-blur-md transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Thumbnail Preview */}
        <div className="flex justify-center gap-4 mb-8 overflow-x-auto pb-4">
          {PRODUCTS.map((product, idx) => (
            <motion.button
              key={product.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300",
                currentIndex === idx
                  ? "ring-2 ring-brand-gold shadow-lg shadow-brand-gold/50"
                  : "opacity-60 hover:opacity-80"
              )}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {currentIndex === idx && (
                <motion.div
                  layoutId="activeProduct"
                  className="absolute inset-0 ring-2 ring-brand-gold"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2">
          {PRODUCTS.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              animate={{
                width: currentIndex === idx ? 32 : 8,
                backgroundColor: currentIndex === idx ? "#d4af37" : "rgba(212, 165, 116, 0.3)",
              }}
              className="h-2 rounded-full transition-all"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
