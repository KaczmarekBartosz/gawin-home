"use client";

import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  Award,
  Headphones,
  Clock,
  Leaf,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Darmowa dostawa",
    description: "Bezpłatna dostawa i montaż przy zamówieniach powyżej 5000 zł",
  },
  {
    icon: ShieldCheck,
    title: "Gwarancja 10 lat",
    description: "Pełna gwarancja na konstrukcję i mechanizmy",
  },
  {
    icon: Award,
    title: "Ręczne wykończenie",
    description: "Każdy mebel wykonywany jest ręcznie przez mistrzów",
  },
  {
    icon: Headphones,
    title: "Wsparcie 24/7",
    description: "Nasz zespół doradców zawsze do Twojej dyspozycji",
  },
  {
    icon: Clock,
    title: "Szybka realizacja",
    description: "Realizacja zamówienia w ciągu 14-30 dni roboczych",
  },
  {
    icon: Leaf,
    title: "Eko-friendly",
    description: "Drewno z certyfikowanych, odnawialnych źródeł",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-brand-charcoal via-brand-charcoal to-brand-charcoal/95 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-copper/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 md:mb-24"
        >
          <h2 className="text-h1 text-brand-cream mb-6">
            Dlaczego Gawin-Home?
          </h2>
          <p className="text-body-large text-brand-cream/80 max-w-2xl mx-auto leading-relaxed">
            Oferujemy nie tylko meble, ale kompleksowe doświadczenie premium
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="rounded-2xl p-10 hover:bg-brand-gold/5 transition-all duration-300 border border-brand-gold/20 h-full flex flex-col bg-brand-charcoal/50 backdrop-blur-sm">
                  {/* Icon */}
                  <div className="mb-8">
                    <div className="inline-flex p-5 rounded-xl bg-brand-gold/15 group-hover:bg-brand-gold/25 transition-all duration-300">
                      <Icon
                        className="h-10 w-10 text-brand-gold"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-h3 font-bold text-brand-cream mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-body-large text-brand-cream/70 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
