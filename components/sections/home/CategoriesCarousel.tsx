"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/motion/presets";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  {
    id: "1",
    name: "Sofy",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    slug: "sofy",
  },
  {
    id: "2",
    name: "Łóżka",
    image:
      "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=400&h=400&fit=crop",
    slug: "lozka",
  },
  {
    id: "3",
    name: "Stoliki",
    image:
      "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=400&h=400&fit=crop",
    slug: "stoliki",
  },
  {
    id: "4",
    name: "Fotele",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop",
    slug: "fotele",
  },
  {
    id: "5",
    name: "Komody",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    slug: "komody",
  },
  {
    id: "6",
    name: "Szafki",
    image:
      "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=400&h=400&fit=crop",
    slug: "szafki",
  },
  {
    id: "7",
    name: "Regały",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop",
    slug: "regaly",
  },
];

export function CategoriesCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  return (
    <section className="py-24 md:py-32 bg-white">
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
            Kategorie
          </span>
          <h2 className="text-h1 text-brand-charcoal mt-4 mb-6">
            Przeglądaj nasze kolekcje
          </h2>
          <p className="text-body-large text-brand-charcoal/60 max-w-3xl mx-auto leading-relaxed">
            Odkryj szeroką gamę mebli dla każdego pomieszczenia i stylu
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
            <div className="flex touch-pan-x cursor-grab active:cursor-grabbing gap-6 pl-4 first:pl-4 sm:gap-8 sm:pl-6 sm:first:pl-6 lg:gap-10 lg:pl-8 lg:first:pl-8">
              {CATEGORIES.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="min-w-0 flex-shrink-0 basis-[65%] sm:basis-[45%] lg:basis-[280px]"
                  {...fadeInUp}
                  transition={{
                    ...fadeInUp.transition,
                    delay: index * 0.08,
                  }}
                >
                  <Link
                    href={`/search?category=${category.slug}`}
                    className="group overflow-hidden rounded-xl border border-neutral-200 bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 65vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 px-4 py-5 flex items-center justify-center">
                      <p className="text-center text-lg font-semibold text-brand-charcoal group-hover:text-brand-gold transition-colors">
                        {category.name}
                      </p>
                    </div>
                  </Link>
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
          <Button
            size="lg"
            className="bg-brand-gold hover:bg-brand-gold/90 text-brand-charcoal font-semibold"
          >
            Przeglądaj wszystkie kategorie
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
