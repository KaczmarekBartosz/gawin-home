"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    name: "Łóżka",
    slug: "lozka",
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
  },
  {
    name: "Sofy",
    slug: "sofy",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    name: "Stoły",
    slug: "stoly",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
  },
  {
    name: "Oświetlenie",
    slug: "oswietlenie",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
  },
];

export function CollectionsSection() {
  return (
    <section className="py-20 md:py-32 mesh-gradient-light relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 text-brand-charcoal mb-4">Nasze Kolekcje</h2>
          <p className="text-body-descriptive max-w-2xl mx-auto">
            Odkryj starannie wyselekcjonowane kategorie mebli, które zmienią
            Twoje wnętrze
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Link
                href={`/category/${collection.slug}`}
                className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:glow-gold transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/20 to-transparent" />
                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {collection.name}
                    </h3>
                    <span className="inline-flex items-center text-brand-gold text-sm font-semibold group-hover:gap-2 transition-all">
                      Zobacz więcej
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
