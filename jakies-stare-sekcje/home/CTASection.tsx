"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 mesh-gradient-gold relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-gold/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-cream mb-6 leading-tight">
              Gotowy na{" "}
              <span className="gradient-gold-premium bg-clip-text text-transparent">
                transformację
              </span>{" "}
              swojego wnętrza?
            </h2>
            <p className="text-xl text-brand-cream/80 mb-8 leading-relaxed">
              Umów się na bezpłatną konsultację z naszym doradcą. Pomożemy Ci
              wybrać idealne meble, które odzwierciedlą Twój styl i spełnią
              wszystkie oczekiwania.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="glass-dark rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-brand-gold mb-1">
                  2,500+
                </p>
                <p className="text-sm text-brand-cream/70">Klientów</p>
              </div>
              <div className="glass-dark rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-brand-gold mb-1">
                  10 lat
                </p>
                <p className="text-sm text-brand-cream/70">Gwarancji</p>
              </div>
              <div className="glass-dark rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-brand-gold mb-1">4.9/5</p>
                <p className="text-sm text-brand-cream/70">Ocena</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                className="text-lg px-8 py-7 h-auto shimmer glow-gold-intense hover:scale-105 transition-transform"
              >
                <span>Umów konsultację</span>
                <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-7 h-auto hover:scale-105 transition-transform"
              >
                <Phone className="h-5 w-5" strokeWidth={1.5} />
                <span>+48 123 456 789</span>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl glow-gold">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
                alt="Luksusowe wnętrze z meblami premium"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 glass-light rounded-2xl p-6 border-gradient-gold"
            >
              <p className="text-sm text-brand-charcoal/60 mb-1">
                Średni czas realizacji
              </p>
              <p className="text-2xl font-bold text-brand-gold">14-30 dni</p>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-copper/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
