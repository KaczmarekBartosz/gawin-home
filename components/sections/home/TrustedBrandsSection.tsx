'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const brands = [
  {
    name: 'Vitra',
    logo: 'https://logo.clearbit.com/vitra.com',
  },
  {
    name: 'Herman Miller',
    logo: 'https://logo.clearbit.com/hermanmiller.com',
  },
  {
    name: 'Knoll',
    logo: 'https://logo.clearbit.com/knoll.com',
  },
  {
    name: 'Cassina',
    logo: 'https://logo.clearbit.com/cassina.com',
  },
  {
    name: 'B&B Italia',
    logo: 'https://logo.clearbit.com/bebitalia.com',
  },
  {
    name: 'Poltrona Frau',
    logo: 'https://logo.clearbit.com/poltronafrau.com',
  },
];

export function TrustedBrandsSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-neutral-border/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-h3 text-brand-charcoal/60 mb-2 uppercase tracking-wider text-sm font-semibold">
            Zaufane marki
          </h2>
          <p className="text-body-descriptive max-w-2xl mx-auto">
            Współpracujemy z najlepszymi światowymi producentami mebli premium
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center">
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
