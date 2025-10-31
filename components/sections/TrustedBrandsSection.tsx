"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  {
    name: "Vitra",
    logo: "https://logo.clearbit.com/vitra.com",
  },
  {
    name: "Herman Miller",
    logo: "https://logo.clearbit.com/hermanmiller.com",
  },
  {
    name: "Knoll",
    logo: "https://logo.clearbit.com/knoll.com",
  },
  {
    name: "Cassina",
    logo: "https://logo.clearbit.com/cassina.com",
  },
  {
    name: "B&B Italia",
    logo: "https://logo.clearbit.com/bebitalia.com",
  },
  {
    name: "Poltrona Frau",
    logo: "https://logo.clearbit.com/poltronafrau.com",
  },
];

export function TrustedBrandsSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-label uppercase tracking-widest text-brand-sand-primary">
            Zaufane marki
          </span>
          <h2 className="text-h1 text-brand-charcoal mt-4 mb-6">
            Współpracujemy z liderami branży
          </h2>
          <p className="text-body-large text-brand-charcoal/60 max-w-3xl mx-auto leading-relaxed">
            Najlepsi światowi producenci mebli premium wybierają nas jako partnera
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 items-center">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full aspect-[3/2] grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
