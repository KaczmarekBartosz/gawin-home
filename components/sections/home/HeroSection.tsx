"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import mockProducts from "@/mock/products.json";
import type { MockProduct } from "@/lib/data-adapters/mock";

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const products = (mockProducts as MockProduct[]).slice(0, 5); // Use first 5 products

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentIndex];

  return (
    <section className="w-full bg-brand-charcoal min-h-screen flex items-center overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_80%] gap-0">
        {/* LEFT SIDE - Compact Content */}
        <div className="bg-brand-charcoal flex flex-col justify-center px-6 sm:px-8 py-16 lg:py-24 lg:pr-12">
          <div className="space-y-8">
            {/* Website URL */}
            <p className="text-xs sm:text-sm font-semibold text-brand-gold tracking-widest uppercase">
              Gawin24.pl
            </p>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Twój dom potrzebuje czegoś więcej niż mebli
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                <span className="flex items-center gap-2">
                  Odkryj Kolekcję
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
              >
                Umów Konsultację
              </Button>
            </div>

            {/* Quick Benefits - Text Only */}
            <div className="pt-8 border-t border-white/10 space-y-4 hidden lg:block">
              <div className="text-sm">
                <p className="text-brand-gold font-semibold mb-1">✓ Darmowa dostawa</p>
                <p className="text-white/60 text-xs">Na terenie Polski</p>
              </div>
              <div className="text-sm">
                <p className="text-brand-gold font-semibold mb-1">✓ Szybka wysyłka</p>
                <p className="text-white/60 text-xs">7-14 dni roboczych</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Product Carousel */}
        <div className="relative bg-black w-full h-screen lg:h-auto lg:min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Product Image */}
          {currentProduct && (
            <div className="relative w-full h-full">
              <img
                src={currentProduct.images?.[0]?.url || "/placeholder.jpg"}
                alt={currentProduct.title}
                className="w-full h-full object-cover"
              />

              {/* Dark overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Product Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  {currentProduct.title}
                </h2>
                <p className="text-white/80 mb-6 max-w-lg">
                  {currentProduct.description || "Premium furniture collection"}
                </p>
                <Button variant="gold" size="lg">
                  <span className="flex items-center gap-2">
                    Sprawdź Model
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-brand-gold w-8" : "bg-white/40 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-8 right-8 z-20 text-white text-sm font-semibold">
            {String(currentIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}
