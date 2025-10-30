"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Award, ChevronDown } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const features = [
    {
      icon: Truck,
      title: "Darmowa dostawa",
      description: "Przy zamówieniach powyżej 5000 zł",
    },
    {
      icon: ShieldCheck,
      title: "Gwarancja 10 lat",
      description: "Pewność na lata",
    },
    {
      icon: Award,
      title: "Ręczne wykonanie",
      description: "Perfekcja w każdym detalu",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient-gold">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2400&auto=format&fit=crop"
          alt="Luksusowe wnętrze z designerskimi meblami"
          fill
          className="object-cover opacity-30"
          priority
          quality={90}
        />
        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/80 via-brand-charcoal/60 to-brand-charcoal/90" />
      </div>

      {/* Floating particles - decorative */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center">
          {/* Main Content Card - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto mb-16"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-8"
            >
              <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
              <span className="text-sm font-medium text-brand-cream">
                Premium Furniture Collection 2025
              </span>
            </motion.div>

            {/* Main Heading - HUGE with glow */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-brand-cream mb-8 text-glow-gold"
            >
              Perfekcja
              <br />
              <span className="gradient-gold-premium bg-clip-text text-transparent">
                w Twoim Domu
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-brand-cream/80 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Odkryj kolekcję mebli premium, które łączą{" "}
              <span className="text-brand-gold font-semibold">
                ponadczasowy design
              </span>{" "}
              z najwyższą jakością wykonania
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button
                variant="gold"
                size="lg"
                className="text-lg px-10 py-7 h-auto shimmer glow-gold-intense hover:scale-105 transition-transform"
              >
                Odkryj Kolekcję
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-7 h-auto hover:scale-105 transition-transform"
              >
                Zobacz Realizacje
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Cards - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="glass-dark rounded-2xl p-6 hover:glass-gold transition-all duration-300 group border-gradient-gold"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    {/* Icon with glow */}
                    <div className="p-4 rounded-xl bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors">
                      <Icon
                        className="h-8 w-8 text-brand-gold group-hover:scale-110 transition-transform"
                        strokeWidth={1.5}
                      />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-brand-cream">
                      {feature.title}
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-brand-cream/70">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Premium */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-brand-cream/50 uppercase tracking-wider">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-2 rounded-full glass-dark"
        >
          <ChevronDown className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
