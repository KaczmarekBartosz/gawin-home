"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { cn } from "@/lib/utils";

const trustStats = [
  { label: "10 lat", value: "Gwarancji" },
  { label: "2,500+", value: "Klientów" },
  { label: "4.9/5", value: "Ocena" },
];

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
    transition: {
      duration: 0.6,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-brand-cream overflow-hidden">
      {/* Background with mesh gradient overlay */}
      <div className="absolute inset-0 mesh-gradient-light z-0" />

      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl z-0" />
      <div className="absolute bottom-0 left-20 w-96 h-96 rounded-full bg-brand-copper/5 blur-3xl z-0" />

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 max-w-4xl"
        >
          {/* Subtitle with decorative line */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="text-label text-brand-charcoal/70">MEBLE PREMIUM</span>
            <div className="w-8 h-px bg-gradient-to-r from-brand-gold to-transparent" />
          </motion.div>

          {/* Main headline with gold accent */}
          <motion.h1
            variants={itemVariants}
            className="text-display-hero text-brand-charcoal font-bold leading-tight"
          >
            Perfekcja
            <br />
            <span className="text-brand-gold">w prostocie</span>
          </motion.h1>

          {/* Description text */}
          <motion.p
            variants={itemVariants}
            className="text-body-large text-gray-500 max-w-2xl"
          >
            Każdy detal ma znaczenie. Odkryj kolekcję mebli, które łączą ponadczasowy
            design z najwyższą jakością rzemiosła.
          </motion.p>

          {/* CTA Buttons - responsive flex */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
            <NeoButton variant="primary" size="lg" className="group">
              Odkryj Kolekcję
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </NeoButton>
            <NeoButton variant="secondary" size="lg">
              Umów konsultację
            </NeoButton>
          </motion.div>

          {/* Trust indicators - displayed horizontally */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-8 sm:gap-12 pt-8 border-t border-gray-200"
          >
            {trustStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="flex flex-col"
              >
                <span className="text-h3 text-brand-charcoal font-bold">
                  {stat.label}
                </span>
                <span className="text-caption text-gray-500">{stat.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - bottom center with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-caption text-gray-500">Przewiń</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-brand-gold"
        >
          <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
