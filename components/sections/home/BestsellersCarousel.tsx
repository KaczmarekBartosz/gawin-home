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
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5]/85 to-transparent" />
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6 gap-8 pb-6 pl-6 pr-[clamp(128px,18vw,220px)] touch-pan-x cursor-grab active:cursor-grabbing sm:-ml-10 sm:gap-10 sm:pl-10 md:-ml-16 md:pl-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="flex-shrink-0 basis-[min(78vw,360px)] pr-6 last:pr-[clamp(96px,16vw,180px)] sm:basis-[320px] md:basis-[360px]"
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
