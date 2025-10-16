import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, HandHeart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Import mock data
import heroData from '@/mock/hero.json';
import categoriesData from '@/mock/categories.json';
import valuePropsData from '@/mock/value-props.json';
import lookbookData from '@/mock/lookbook.json';

export const metadata = {
  title: 'Gawin-Home - Meble Premium',
  description:
    'Odkryj kolekcję mebli premium. Ponadczasowy design, najwyższa jakość wykonania. Perfekcja w prostocie.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ==================================================
          SEKCJA 1: HERO - Tryb Elegancki (Ciemny)
          ================================================== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-charcoal">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src={heroData.media.src}
            alt={heroData.media.alt}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/80 via-brand-charcoal/60 to-brand-charcoal/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtitle */}
              <p className="text-sm md:text-base text-color-text-muted uppercase tracking-wider mb-6 font-medium">
                Meble Premium
              </p>

              {/* Main Heading */}
              <h1 className="text-display-hero text-color-text-light mb-8 leading-tight">
                {heroData.title}
              </h1>

              {/* Description */}
              <p className="text-body-descriptive text-color-text-muted max-w-2xl mx-auto mb-12">
                {heroData.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  className="group"
                  asChild
                >
                  <a href={heroData.cta.primary.href}>
                    <span>{heroData.cta.primary.label}</span>
                    <ArrowRight className="transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                >
                  <a href={heroData.cta.secondary.href}>
                    {heroData.cta.secondary.label} →
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 pt-12 border-t border-white/10"
            >
              <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-brand-gold mb-1">10 lat</p>
                  <p className="text-sm text-color-text-muted">Gwarancji</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-brand-gold mb-1">2,500+</p>
                  <p className="text-sm text-color-text-muted">Klientów</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-brand-gold mb-1">4.9/5</p>
                  <p className="text-sm text-color-text-muted">Ocena</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-brand-gold rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ==================================================
          SEKCJA 2: KOLEKCJE - Tryb Showroom (Jasny)
          ================================================== */}
      <section id="kolekcje" className="py-20 md:py-32 bg-brand-sand">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 text-brand-charcoal mb-4">Nasze kolekcje</h2>
            <p className="text-body-standard text-muted-foreground max-w-2xl mx-auto">
              Odkryj starannie wyselekcjonowane kategorie mebli premium
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categoriesData.map((category, idx) => (
              <motion.a
                key={category.id}
                href={`#${category.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-h3 text-white">{category.name}</h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SEKCJA 3: BESTSELLERY - Tryb Showroom (Jasny)
          ================================================== */}
      <section id="bestsellery" className="py-20 md:py-32 bg-brand-cream">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 text-brand-charcoal mb-4">Bestsellery</h2>
            <p className="text-body-standard text-muted-foreground max-w-2xl mx-auto">
              Najpopularniejsze produkty wybierane przez naszych klientów
            </p>
          </motion.div>

          {/* Horizontal scroll container */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-6 min-w-max">
              {[1, 2, 3, 4, 5].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="w-[280px] md:w-[320px]"
                >
                  <div className="group rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={`https://images.unsplash.com/photo-${1555041469 + idx * 1000}-a586c61ea9bc?w=800&q=80`}
                        alt={`Produkt ${item}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="320px"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-h3 text-brand-charcoal mb-2">Produkt Premium {item}</h3>
                      <p className="text-sm text-muted-foreground mb-3">Kategoria</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-brand-gold">3 499 zł</span>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SEKCJA 4: VALUE PROPS - Tryb Showroom (Jasny)
          ================================================== */}
      <section id="value-props" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 text-brand-charcoal mb-4">Jakość, na której możesz polegać</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {valuePropsData.map((prop, idx) => {
              const IconComponent = prop.icon === 'Truck' ? Truck : prop.icon === 'ShieldCheck' ? ShieldCheck : HandHeart;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-sand mb-4">
                    <IconComponent className="h-8 w-8 text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-h3 text-brand-charcoal mb-2">{prop.title}</h3>
                  <p className="text-body-standard text-muted-foreground">{prop.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SEKCJA 5: LOOKBOOK - Inspiracje
          ================================================== */}
      <section id="lookbook" className="py-20 md:py-32 bg-brand-sand">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 text-brand-charcoal mb-4">Inspiracje</h2>
            <p className="text-body-standard text-muted-foreground max-w-2xl mx-auto mb-8">
              Zobacz nasze meble w prawdziwych wnętrzach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {lookbookData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-lg font-semibold text-white">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <a href="#lookbook">
                Zobacz więcej inspiracji →
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================================================
          SEKCJA 6: NEWSLETTER - Tryb Showroom (Jasny)
          ================================================== */}
      <section id="newsletter" className="py-20 md:py-32 bg-brand-cream">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-h2 text-brand-charcoal mb-4">Dołącz do naszego klubu</h3>
            <p className="text-body-standard text-muted-foreground mb-8">
              Otrzymuj ekskluzywne oferty i inspiracje prosto na swoją skrzynkę
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Twój adres e-mail"
                className="flex-1 px-4 py-3 rounded-lg border border-neutral-border bg-white text-brand-charcoal focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/50 transition-all"
              />
              <Button variant="gold" size="default" type="submit">
                Zapisz się
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Wysyłając formularz akceptujesz naszą politykę prywatności
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          SEKCJA 7: FOOTER - Tryb Elegancki (Ciemny)
          ================================================== */}
      <footer className="bg-brand-charcoal text-color-text-light py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-h3 mb-4 text-brand-gold">Gawin-Home</h4>
              <p className="text-sm text-color-text-muted">
                Meble premium. Perfekcja w prostocie.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Kategorie</h5>
              <ul className="space-y-2 text-sm text-color-text-muted">
                <li><a href="#sofy" className="hover:text-brand-gold transition-colors">Sofy</a></li>
                <li><a href="#stoly" className="hover:text-brand-gold transition-colors">Stoły</a></li>
                <li><a href="#krzesla" className="hover:text-brand-gold transition-colors">Krzesła</a></li>
                <li><a href="#oswietlenie" className="hover:text-brand-gold transition-colors">Oświetlenie</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Informacje</h5>
              <ul className="space-y-2 text-sm text-color-text-muted">
                <li><a href="#o-nas" className="hover:text-brand-gold transition-colors">O nas</a></li>
                <li><a href="#kontakt" className="hover:text-brand-gold transition-colors">Kontakt</a></li>
                <li><a href="#dostawa" className="hover:text-brand-gold transition-colors">Dostawa</a></li>
                <li><a href="#zwroty" className="hover:text-brand-gold transition-colors">Zwroty</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Obsługa klienta</h5>
              <ul className="space-y-2 text-sm text-color-text-muted">
                <li><a href="#faq" className="hover:text-brand-gold transition-colors">FAQ</a></li>
                <li><a href="#regulamin" className="hover:text-brand-gold transition-colors">Regulamin</a></li>
                <li><a href="#prywatnosc" className="hover:text-brand-gold transition-colors">Polityka prywatności</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-color-text-muted">
            <p>&copy; {new Date().getFullYear()} Gawin-Home. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
