'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    alt: 'Minimalistyczna sypialnia',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    alt: 'Elegancka sofa w salonie',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
    alt: 'Nowoczesna jadalnia',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80',
    alt: 'Stylowe krzesło',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    alt: 'Luksusowy salon',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    alt: 'Designerska lampa',
  },
];

export function InstagramSection() {
  return (
    <section className="py-20 md:py-32 mesh-gradient-light relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Instagram className="h-8 w-8 text-brand-gold" strokeWidth={1.5} />
            <h2 className="text-h2 text-brand-charcoal">@GawinHome</h2>
          </div>
          <p className="text-body-descriptive max-w-2xl mx-auto mb-6">
            Odkryj inspiracje i zobacz nasze meble w pięknych wnętrzach
          </p>
          <Link
            href="https://instagram.com/gawinhome"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-copper transition-colors font-semibold"
          >
            Obserwuj nas na Instagramie
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                href="https://instagram.com/gawinhome"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" strokeWidth={1.5} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
