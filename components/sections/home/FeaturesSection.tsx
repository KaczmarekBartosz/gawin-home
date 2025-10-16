'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Award, Headphones, Clock, Leaf } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Darmowa dostawa',
    description: 'Bezpłatna dostawa i montaż przy zamówieniach powyżej 5000 zł',
  },
  {
    icon: ShieldCheck,
    title: 'Gwarancja 10 lat',
    description: 'Pełna gwarancja na konstrukcję i mechanizmy',
  },
  {
    icon: Award,
    title: 'Ręczne wykończenie',
    description: 'Każdy mebel wykonywany jest ręcznie przez mistrzów',
  },
  {
    icon: Headphones,
    title: 'Wsparcie 24/7',
    description: 'Nasz zespół doradców zawsze do Twojej dyspozycji',
  },
  {
    icon: Clock,
    title: 'Szybka realizacja',
    description: 'Realizacja zamówienia w ciągu 14-30 dni roboczych',
  },
  {
    icon: Leaf,
    title: 'Eko-friendly',
    description: 'Drewno z certyfikowanych, odnawialnych źródeł',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 mesh-gradient-gold relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-30" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 text-brand-cream mb-4">Dlaczego Gawin-Home?</h2>
          <p className="text-body-descriptive text-brand-cream/80 max-w-2xl mx-auto">
            Oferujemy nie tylko meble, ale kompleksowe doświadczenie premium
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-dark rounded-2xl p-8 hover:glass-gold transition-all duration-300 border-gradient-gold h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex p-4 rounded-xl bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors">
                      <Icon className="h-8 w-8 text-brand-gold" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-brand-cream mb-3">{feature.title}</h3>
                  <p className="text-brand-cream/70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
