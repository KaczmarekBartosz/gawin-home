"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
      {/* Background Image - subtelny */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2400&auto=format&fit=crop"
          alt="Eleganckie wnętrze"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-[#1a1a1a]/60 to-[#1a1a1a]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtitle */}
            <p className="text-sm md:text-base text-[#a0a0a0] uppercase tracking-wider mb-6 font-medium">
              Meble Premium
            </p>

            {/* Main Heading - Space Grotesk */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[#f5f5f5] mb-8 leading-tight">
              Perfekcja
              <br />
              <span className="text-[#d4af37]">w prostocie</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#a0a0a0] max-w-2xl mx-auto mb-12 leading-relaxed font-sans">
              Każdy detal ma znaczenie. Odkryj kolekcję mebli, które łączą
              ponadczasowy design z najwyższą jakością rzemiosła.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="gold"
                size="lg"
                className="text-base px-8 group"
              >
                <span>Odkryj Kolekcję</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8">
                Umów konsultację
              </Button>
            </div>
          </motion.div>

          {/* Trust Indicators - minimalistyczne */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 pt-12 border-t border-white/10"
          >
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-1">
                  10 lat
                </p>
                <p className="text-sm text-[#a0a0a0]">Gwarancji</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-1">
                  2,500+
                </p>
                <p className="text-sm text-[#a0a0a0]">Klientów</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-1">
                  4.9/5
                </p>
                <p className="text-sm text-[#a0a0a0]">Ocena</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - prosty */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-[#d4af37] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
