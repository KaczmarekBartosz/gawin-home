"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://gawin.pl/gawin-meble-lozko-paris.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Subtle decorative elements with improved visibility */}
      <div className="absolute top-20 right-5 w-96 h-96 rounded-full bg-brand-gold/20 blur-3xl z-0 opacity-50 pointer-events-none" />
      <div className="absolute bottom-32 left-10 w-80 h-80 rounded-full bg-brand-copper/15 blur-3xl z-0 opacity-40 pointer-events-none" />

      {/* Main content container with improved spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 min-h-screen flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10 max-w-4xl"
        >
          {/* Subtitle with decorative line - white on video */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <span className="text-label text-white/70">
              MEBLE PREMIUM
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-brand-gold to-transparent" />
          </motion.div>

          {/* Main headline with gold accent - white on video */}
          <motion.h1
            variants={itemVariants}
            className="text-display-hero text-white font-bold leading-relaxed mb-6"
          >
            Perfekcja
            <br />
            <span className="text-brand-gold">w prostocie</span>
          </motion.h1>

          {/* Description text - better width for Polish text wrapping */}
          <motion.p
            variants={itemVariants}
            className="text-body-large text-white/85 max-w-3xl leading-relaxed"
          >
            Każdy detal ma znaczenie. Odkryj kolekcję mebli, które łączą
            ponadczasowy design z najwyższą jakością rzemiosła.
          </motion.p>

          {/* CTA Buttons - responsive flex */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-10"
          >
            <Button asChild variant="gold" size="lg">
              <Link href="/products" className="flex items-center gap-2 group">
                Odkryj Kolekcję
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-semibold backdrop-blur-sm">
              Umów konsultację
            </Button>
          </motion.div>

          {/* Trust indicators - displayed horizontally */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 sm:gap-12 pt-12 sm:pt-16 border-t border-white/10"
          >
            {trustStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="flex flex-col items-center sm:items-start"
              >
                <span className="text-h3 sm:text-h2 text-white font-bold leading-tight">
                  {stat.label}
                </span>
                <span className="text-body-small sm:text-body text-white/70 mt-2">{stat.value}</span>
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
        <span className="text-caption text-white/50">Przewiń</span>
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
