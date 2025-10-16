'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Anna Kowalska',
    role: 'Architekt wnętrz',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Jakość wykonania mebli jest wyjątkowa. Sofa, którą kupiłam, zachwyca moich klientów podczas każdej wizyty. Obsługa klienta na najwyższym poziomie.',
  },
  {
    id: 2,
    name: 'Michał Nowak',
    role: 'Właściciel restauracji',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Zamówiłem meble do mojej restauracji i jestem zachwycony. Nie tylko wyglądają przepięknie, ale są też niezwykle wytrzymałe. Polecam każdemu!',
  },
  {
    id: 3,
    name: 'Katarzyna Wiśniewska',
    role: 'Designer',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Gawin-Home to synonim elegancji i klasy. Łóżko, które u nich nabyłam, to najlepsza inwestycja w moim domu. Jakość materiałów premium.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-copper rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 text-brand-charcoal mb-4">Co mówią nasi klienci</h2>
          <p className="text-body-descriptive max-w-2xl mx-auto">
            Dołącz do grona zadowolonych właścicieli mebli premium
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-light rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-neutral-border/50 hover:border-brand-gold/30 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="h-10 w-10 text-brand-gold/30" strokeWidth={1.5} />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-brand-gold fill-brand-gold"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-brand-charcoal/80 leading-relaxed mb-6 flex-grow">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-border/50">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-gold/20">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-charcoal">{testimonial.name}</p>
                    <p className="text-sm text-brand-charcoal/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-brand-charcoal/60">
            Ponad <span className="font-bold text-brand-gold">2,500+</span> zadowolonych klientów
          </p>
        </motion.div>
      </div>
    </section>
  );
}
