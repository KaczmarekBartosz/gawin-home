"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LookbookCard } from "@/components/sections/LookbookCard";
import { cn } from "@/lib/utils";
import lookbookCollections from "@/data/lookbook-collections.json";

interface LookbookGridProps {
  className?: string;
}

export function LookbookGrid({ className }: LookbookGridProps) {
  const [selectedCollections, setSelectedCollections] = React.useState<
    string[]
  >([]);

  // Sort collections: featured first, then by order
  const sortedCollections = React.useMemo(() => {
    return [...lookbookCollections].sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return a.order - b.order;
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className={cn("py-24 md:py-32 bg-white", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-label uppercase tracking-widest text-[#B7A99D]">
            Inspiracja i trendy
          </span>
          <h2 className="text-h1 text-brand-charcoal mt-4 mb-6">
            Lookbook Kolekcje
          </h2>
          <p className="text-body-large text-brand-charcoal/60 max-w-3xl mx-auto leading-relaxed">
            Odkryj naszą wybraną kolekcję inspirujących aranżacji i stylów wnętrz. Każda kolekcja opowiada swoją historię dizajnu i estetyki.
          </p>
        </motion.div>

        {/* Lookbook Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-20 md:mb-24"
        >
          {sortedCollections.map((collection) => (
            <motion.div key={collection.id} variants={item}>
              <LookbookCard
                id={collection.id}
                title={collection.title}
                subtitle={collection.subtitle}
                description={collection.description}
                image={collection.image}
                overlayImage={collection.overlayImage}
                theme={collection.theme}
                color={collection.color}
                featured={collection.featured}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Shopping Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 md:mt-32 pt-16 md:pt-20 border-t border-brand-charcoal/10 dark:border-brand-cream/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shopping Tips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-h3 font-bold text-brand-charcoal dark:text-brand-cream">
                Jak korzystać
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#B7A99D] font-bold">1.</span>
                  <span className="text-body text-brand-charcoal/70 dark:text-brand-cream/70">
                    Wybierz interesującą Cię kolekcję z galerii
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B7A99D] font-bold">2.</span>
                  <span className="text-body text-brand-charcoal/70 dark:text-brand-cream/70">
                    Poznaj każdy produkt wchodzący w skład kolekcji
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B7A99D] font-bold">3.</span>
                  <span className="text-body text-brand-charcoal/70 dark:text-brand-cream/70">
                    Dodaj wybrane meble do koszyka
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B7A99D] font-bold">4.</span>
                  <span className="text-body text-brand-charcoal/70 dark:text-brand-cream/70">
                    Stwórz swoje idealne wnętrze
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Styling Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-h3 font-bold text-brand-charcoal dark:text-brand-cream">
                Porady stylizacyjne
              </h3>
              <ul className="space-y-2 text-body text-brand-charcoal/70 dark:text-brand-cream/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#B7A99D]">✓</span>
                  <span>Łącz różne kolory w ramach jednej palety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B7A99D]">✓</span>
                  <span>Wprowadź tekstury poprzez różne materiały</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B7A99D]">✓</span>
                  <span>Nie bój się eksperymentować z rozmiarami</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B7A99D]">✓</span>
                  <span>Oświetlenie to kluczowy element aranżacji</span>
                </li>
              </ul>
            </motion.div>

            {/* Featured Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-h3 font-bold text-brand-charcoal dark:text-brand-cream">
                Dlaczego warto?
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-[#B7A99D]/10 dark:bg-[#B7A99D]/5 border border-[#B7A99D]/20">
                  <p className="text-sm font-semibold text-[#B7A99D] mb-1">
                    Gotowe rozwiązania
                  </p>
                  <p className="text-body-small text-brand-charcoal/70 dark:text-brand-cream/70">
                    Już zaplanowane aranżacje wnętrz
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#B7A99D]/10 dark:bg-[#B7A99D]/5 border border-[#B7A99D]/20">
                  <p className="text-sm font-semibold text-[#B7A99D] mb-1">
                    Spójny design
                  </p>
                  <p className="text-body-small text-brand-charcoal/70 dark:text-brand-cream/70">
                    Profesjonalnie dobrane elementy
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#B7A99D]/10 dark:bg-[#B7A99D]/5 border border-[#B7A99D]/20">
                  <p className="text-sm font-semibold text-[#B7A99D] mb-1">
                    Oszczędność czasu
                  </p>
                  <p className="text-body-small text-brand-charcoal/70 dark:text-brand-cream/70">
                    Nie musisz szukać produktów
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-brand-charcoal to-brand-charcoal/80 text-center"
        >
          <h3 className="text-h2 font-bold text-brand-cream mb-4">
            Nie wiesz, od czego zacząć?
          </h3>
          <p className="text-body-large text-brand-cream/80 mb-8 max-w-3xl mx-auto">
            Skontaktuj się z naszymi doradcami projektowymi. Pomogą Ci stworzyć
            idealne wnętrze dopasowane do Twoich potrzeb i preferencji.
          </p>
          <button
            className={cn(
              "px-8 py-4 rounded-xl",
              "bg-[#B7A99D] hover:bg-[#B7A99D]/90",
              "text-brand-charcoal font-semibold",
              "transition-all duration-300",
              "inline-flex items-center gap-2"
            )}
          >
            Zarezerwuj konsultację
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default LookbookGrid;
