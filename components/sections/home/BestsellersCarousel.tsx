"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ProductCard } from "@/components/cards/ProductCard";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/motion/presets";

type BestsellersCarouselProps = {
  products: MockProduct[];
  className?: string;
};

export function BestsellersCarousel({
  products,
  className,
}: BestsellersCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

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
          <span className="text-label uppercase tracking-widest text-brand-gold">
            Bestsellery
          </span>
          <h2 className="text-h1 text-brand-charcoal mt-4 mb-6">
            Najchętniej wybierane przez klientów
          </h2>
          <p className="text-body-large text-brand-charcoal/60 max-w-3xl mx-auto leading-relaxed">
            Odkryj nasze najpopularniejsze meble, które zdobyły serca tysięcy zadowolonych klientów
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative select-none -mx-4 sm:-mx-6 lg:-mx-8 mb-16 md:mb-20"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-x cursor-grab active:cursor-grabbing gap-8 pl-4 first:pl-4 sm:gap-8 sm:pl-6 sm:first:pl-6 lg:gap-10 lg:pl-8 lg:first:pl-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="min-w-0 flex-shrink-0 basis-[85%] sm:basis-[45%] lg:basis-[380px]"
                  {...fadeInUp}
                  transition={{
                    ...fadeInUp.transition,
                    delay: index * 0.08,
                  }}
                >
                  <ProductCard
                    {...product}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-brand-charcoal font-semibold">
            Przeglądaj wszystkie bestsellery
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
