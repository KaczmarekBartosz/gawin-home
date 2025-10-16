'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Award } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  const features = [
    {
      icon: Truck,
      text: 'Darmowa dostawa',
    },
    {
      icon: ShieldCheck,
      text: 'Gwarancja 10 lat',
    },
    {
      icon: Award,
      text: 'Ręczne wykonanie',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2400&auto=format&fit=crop"
          alt="Luksusowe wnętrze z designerskimi meblami"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-brand-charcoal/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center text-white"
        >
          {/* Main Heading */}
          <h1 className="text-display-hero text-brand-cream mb-6">
            Twój Dom, Twoja Perfekcja
          </h1>

          {/* Subtitle */}
          <p className="text-body-descriptive text-brand-cream/90 max-w-2xl mx-auto mb-10">
            Odkryj kolekcję mebli premium, które łączą ponadczasowy design z najwyższą jakością
            wykonania. Każdy detal ma znaczenie.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="mb-16"
          >
            <Button variant="primary" size="lg" className="text-base px-8 py-6 h-auto">
              Odkryj Kolekcję
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: 'easeOut' }}
                  className="flex items-center gap-3"
                >
                  <div className="p-3 bg-brand-gold/20 backdrop-blur-sm rounded-xl">
                    <Icon className="h-6 w-6 text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm md:text-base font-medium text-brand-cream">
                    {feature.text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-brand-cream/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-brand-cream/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
