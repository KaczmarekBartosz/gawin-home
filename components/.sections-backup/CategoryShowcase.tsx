"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import categories from "@/data/categories.json";

interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  color: string;
  index: number;
}

function CategoryCard({
  id,
  name,
  slug,
  description,
  image,
  productCount,
  color,
  index,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link href={`/category/${slug}`}>
        <div
          className={cn(
            "group relative h-80 overflow-hidden rounded-2xl",
            "bg-gradient-to-br shadow-neo-light",
            "transition-all duration-300 hover:shadow-neo-medium",
            "cursor-pointer"
          )}
          style={{
            backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
          }}
        >
          {/* Background gradient overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-80",
              "transition-opacity duration-300 group-hover:opacity-90",
              color
            )}
          />

          {/* Image background */}
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover opacity-20 transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Content overlay */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
            {/* Top section */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-h2 font-bold text-white drop-shadow-lg">
                  {name}
                </h3>
                <p className="mt-2 text-body-small text-white/80 drop-shadow">
                  {description}
                </p>
              </motion.div>
            </div>

            {/* Bottom section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 + 0.15 }}
              viewport={{ once: true }}
              className="flex items-center justify-between"
            >
              {/* Product count badge */}
              <div className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 border border-white/30">
                <span className="text-sm font-semibold text-white">
                  {productCount} produktów
                </span>
              </div>

              {/* Arrow icon */}
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white transition-all group-hover:bg-white/30"
              >
                <ArrowRight className="size-5" />
              </motion.div>
            </motion.div>
          </div>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%)`,
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryShowcase() {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-brand-cream">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-block mb-4">
            <span className="text-label uppercase tracking-widest text-brand-gold">
              Odkryj nasze kolekcje
            </span>
          </div>
          <h2 className="text-display-lg font-semibold text-brand-charcoal">
            Kategorie mebli
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-body-large text-brand-charcoal/70">
            Przeglądaj nasze wybrańskie kolekcje mebli do każdego wnętrza.
            Od nowoczesnych sof do eleganckich regałów - znajdziesz wszystko.
          </p>
        </motion.div>

        {/* Categories grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-max"
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              {...category}
              index={index}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/categories"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-4 rounded-xl",
              "bg-brand-charcoal text-brand-cream font-semibold",
              "shadow-neo-light hover:shadow-neo-medium transition-all duration-200",
              "hover:scale-105 active:scale-100 active:shadow-neo-pressed",
              "group"
            )}
          >
            Przeglądaj wszystkie kategorie
            <motion.span
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <ArrowRight className="size-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
