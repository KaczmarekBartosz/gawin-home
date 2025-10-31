"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Premium furniture hero images - luxury pieces
const heroProducts = [
  {
    id: 1,
    title: "Sofa Ibiza",
    description: "Nowoczesna sofa z tkaniny Bouclé. Wygoda i elegancja w jednym.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop",
  },
  {
    id: 2,
    title: "Łóżko Kontynentalne",
    description: "Luksusowe łóżko z systemem sprężyn bonelowych. Najwyższa jakość spania.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
  },
  {
    id: 3,
    title: "Fotel Chesterfield",
    description: "Elegancki fotel welurowy z pikowanymi detalami. Klasyka nowoczesna.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&h=800&fit=crop",
  },
  {
    id: 4,
    title: "Stół Drewniany",
    description: "Masywny stół z naturalnego drewna. Centrum salonu i miejsca spotkań.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop",
  },
  {
    id: 5,
    title: "Szafka Nowoczesna",
    description: "Minimalistyczna szafka z białego lakieru. Praktyczność i design.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
  };

  const currentProduct = heroProducts[currentIndex];

  return (
    <section className="w-full bg-brand-cream py-12 px-4 sm:px-6 lg:px-8">
      {/* Container with rounded corners */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-0 min-h-[600px] lg:min-h-[700px]">

          {/* LEFT SIDE - Content with breathing space */}
          <div className="bg-brand-cream flex flex-col justify-center px-8 sm:px-12 py-16 lg:py-24 space-y-12">
            <div className="space-y-10">
              {/* Website URL */}
              <p className="text-xs sm:text-sm font-semibold text-brand-gold tracking-widest uppercase">
                Gawin24.pl
              </p>

              {/* Large Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-charcoal leading-tight">
                Twój dom potrzebuje czegoś więcej niż mebli
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-brand-charcoal/70 leading-relaxed max-w-md">
                Odkryj premiumową kolekcję, która łączy ponadczasowy design z najwyższą jakością rzemiosła.
              </p>
            </div>

            {/* CTA Buttons with breathing space */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                <span className="flex items-center gap-2">
                  Odkryj Kolekcję
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-brand-gold text-brand-charcoal hover:bg-brand-gold hover:text-white"
              >
                Umów Konsultację
              </Button>
            </div>

            {/* Benefits section */}
            <div className="pt-8 border-t border-brand-gold/20 space-y-4 hidden sm:block">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-brand-gold font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold text-brand-charcoal">Darmowa dostawa</p>
                    <p className="text-sm text-brand-charcoal/60">Na terenie Polski</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-gold font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold text-brand-charcoal">Szybka wysyłka</p>
                    <p className="text-sm text-brand-charcoal/60">7-14 dni roboczych</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Product Carousel */}
          <div className="relative bg-black w-full h-full flex items-center justify-center overflow-hidden">
            {/* Product Image */}
            {currentProduct && (
              <div className="relative w-full h-full">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="w-full h-full object-cover"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    {currentProduct.title}
                  </h2>
                  <p className="text-base sm:text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
                    {currentProduct.description}
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
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 p-3 sm:p-4 rounded-full transition-all duration-200 backdrop-blur-md"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 p-3 sm:p-4 rounded-full transition-all duration-200 backdrop-blur-md"
              aria-label="Next product"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {heroProducts.map((_, index) => (
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
            <div className="absolute top-6 right-6 z-20 text-white text-xs sm:text-sm font-semibold bg-black/40 px-3 py-2 rounded-full backdrop-blur-md">
              {String(currentIndex + 1).padStart(2, "0")} / {String(heroProducts.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
