"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { NeoButton } from "@/components/ui/neo-button";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { ProductGrid, FeaturedProductsGrid } from "@/components/sections/ProductGrid";
import { FilterSidebar } from "@/components/sections/FilterSidebar";
import { SearchSort } from "@/components/sections/SearchSort";
import { LookbookGrid } from "@/components/sections/LookbookGrid";
import { NewsletterSection } from "@/components/sections/newsletter/NewsletterSection";
import { FooterLinks } from "@/components/layout/footer/FooterLinks";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, margin: "-100px" },
};

export default function HomePage() {
  return (
    <main className="w-full bg-brand-cream">
      {/* HERO SECTION */}
      <section className="relative min-h-screen bg-gradient-to-br from-brand-charcoal via-brand-charcoal to-brand-charcoal/95 overflow-hidden py-20 md:py-32 px-4 sm:px-6">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,165,116,0.15),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(184,149,106,0.12),transparent_65%)]" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div {...fadeInUp} className="mb-12 md:mb-16 max-w-3xl">
            {/* Premium label */}
            <div className="inline-block mb-6">
              <span className="text-label uppercase tracking-widest text-brand-gold">
                Premium Furniture Collection
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-display-lg md:text-6xl font-bold text-brand-cream leading-tight mb-6">
              Meble, które opowiadają historię
            </h1>

            {/* Description */}
            <p className="text-body-large text-brand-cream/80 max-w-2xl mb-8 leading-relaxed">
              Odkryj naszą kolekcję premium mebli, które łączą nowoczesny design z funkcjonalnością. Każdy element wykonany z dbałością o szczegóły.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <NeoButton variant="primary" size="md" className="group">
                Odkryj Kolekcję
                <motion.span
                  className="transition-transform"
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  <ArrowRight className="size-4" />
                </motion.span>
              </NeoButton>
              <button className="text-brand-gold hover:text-brand-cream transition-colors font-semibold flex items-center gap-2 group">
                Dowiedz się więcej
                <motion.span
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  <ArrowRight className="size-4" />
                </motion.span>
              </button>
            </div>

            {/* Trust indicators */}
            <motion.div
              {...fadeInUp}
              className="mt-12 grid grid-cols-3 gap-4 sm:gap-8"
            >
              <div>
                <p className="text-h4 font-bold text-brand-gold">2500+</p>
                <p className="text-caption text-brand-cream/60">Zadowolonych klientów</p>
              </div>
              <div>
                <p className="text-h4 font-bold text-brand-gold">4.9★</p>
                <p className="text-caption text-brand-cream/60">Średnia ocena</p>
              </div>
              <div>
                <p className="text-h4 font-bold text-brand-gold">24m</p>
                <p className="text-caption text-brand-cream/60">Gwarancja Premium</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY SHOWCASE - NEW COMPONENT */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 bg-brand-cream">
        <CategoryShowcase />
      </section>

      {/* PRODUCT SHOWCASE SYSTEM - NEW COMPONENTS */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <motion.div {...fadeInUp} className="mb-12 text-center">
            <div className="inline-block mb-4">
              <span className="text-label uppercase tracking-widest text-brand-gold">
                Odkryj Produkty
              </span>
            </div>
            <h2 className="text-h1 text-brand-charcoal mb-4">
              Premium Kolekcja Mebli
            </h2>
            <p className="text-body-large text-brand-charcoal/70 max-w-2xl mx-auto">
              Przeglądaj naszą ekstensywną kolekcję mebli z zaawansowanym systemem filtrowania i wyszukiwania
            </p>
          </motion.div>

          {/* Search & Sort Bar */}
          <motion.div {...fadeInUp} className="mb-8">
            <SearchSort totalProducts={9} />
          </motion.div>

          {/* Products Grid with Sidebar */}
          <motion.div
            {...fadeInUp}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Desktop Sidebar */}
            <motion.div className="hidden lg:block">
              <FilterSidebar />
            </motion.div>

            {/* Product Grid */}
            <motion.div className="flex-1">
              <ProductGrid />
            </motion.div>
          </motion.div>

          {/* Browse All Link */}
          <motion.div
            {...fadeInUp}
            className="mt-12 text-center"
          >
            <a
              href="/listing"
              className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-charcoal font-semibold group transition-colors"
            >
              Przeglądaj pełną kolekcję
              <motion.span
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                <ArrowRight className="size-5" />
              </motion.span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PRODUCTS - EXISTING CAROUSEL */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 bg-brand-cream">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeInUp} className="mb-12 text-center">
            <div className="inline-block mb-4">
              <span className="text-label uppercase tracking-widest text-brand-gold">
                Bestsellery
              </span>
            </div>
            <h2 className="text-h1 text-brand-charcoal mb-4">
              Najczęściej Wybierane
            </h2>
            <p className="text-body-large text-brand-charcoal/70 max-w-2xl mx-auto">
              Poznaj produkty, które pokochali nasi klienci - premium wybór najlepszych mebli
            </p>
          </motion.div>

          {/* Featured Products Grid */}
          <motion.div {...fadeInUp}>
            <FeaturedProductsGrid />
          </motion.div>
        </div>
      </section>

      {/* LOOKBOOK SECTION - INSPIRATION GALLERY */}
      <section className="w-full bg-white dark:bg-brand-charcoal px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <LookbookGrid />
        </div>
      </section>

      {/* NEWSLETTER SECTION - NEW PREMIUM VERSION */}
      <section className="w-full">
        <NewsletterSection />
      </section>

      {/* TRUST SIGNALS SECTION */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 bg-brand-cream">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-h1 text-brand-charcoal mb-4">
              Dlaczego Wybrać Gawin-Home
            </h2>
            <p className="text-body-large text-brand-charcoal/70 max-w-2xl mx-auto">
              Jakość, design i obsługa na najwyższym poziomie
            </p>
          </motion.div>

          {/* Trust Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Każdy mebel wykonany z najlepszych materiałów i dbałością o szczegóły",
              },
              {
                title: "Design Excellence",
                description: "Nowoczesny design, który idealnie pasuje do każdego wnętrza",
              },
              {
                title: "24m Gwarancja",
                description: "Pełna gwarancja i serwis door-to-door dla spokoju Twojego umysłu",
              },
              {
                title: "Dostawa Gratis",
                description: "Darmowa dostawa i montaż dla zamówień powyżej 3000 PLN",
              },
              {
                title: "Zwrot 30 dni",
                description: "Jeśli coś nie pasuje - zwrot bez pytań w 30 dni",
              },
              {
                title: "Obsługa 24/7",
                description: "Nasz zespół zawsze gotowy pomóc i odpowiedzieć na pytania",
              },
            ].map((signal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-2xl bg-white shadow-neo-light hover:shadow-neo-medium transition-all duration-300"
              >
                <h3 className="text-h4 font-semibold text-brand-charcoal mb-3">
                  {signal.title}
                </h3>
                <p className="text-body-small text-brand-charcoal/70">
                  {signal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER LINKS */}
      <section className="w-full">
        <FooterLinks variant="full" />
      </section>
    </main>
  );
}
