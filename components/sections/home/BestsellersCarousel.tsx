"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

import { ProductCard } from "@/components/cards/product-card";
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
    <div className={cn("relative select-none", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-x cursor-grab active:cursor-grabbing gap-6 pl-4 first:pl-6 sm:gap-8 sm:pl-4 sm:first:pl-8 lg:gap-10 lg:pl-4 lg:first:pl-[max(2rem,calc((100vw-1280px)/2+2rem))]">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="min-w-0 flex-shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[360px]"
              {...fadeInUp}
              transition={{
                ...fadeInUp.transition,
                delay: index * 0.08,
              }}
            >
              <ProductCard
                product={product}
                href="/pdp"
                className="h-full w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
