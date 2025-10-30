# 💻 GOTOWE KOMPONENTY - COPY & PASTE

## SEKCJA 1: HeroSection.tsx (NOWA WERSJA)

```typescript
'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-cream overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-sand to-cream opacity-50 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold-light/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col justify-center">
        
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-8 w-fit"
        >
          <span className="text-label text-gray-500">Meble Premium</span>
          <div className="w-8 h-px bg-gold-light/50" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-display-hero font-bold text-charcoal mb-6 max-w-4xl"
        >
          Perfekcja<br />
          <span className="text-gold-dark">w prostocie</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-body-large text-gray-500 mb-12 max-w-2xl"
        >
          Każdy detal ma znaczenie. Odkryj kolekcję mebli, które łączą ponadczasowy design z najwyższą jakością rzemiosła.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button className="px-8 py-4 bg-charcoal text-white rounded-pill font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-card hover:shadow-card-hover">
            Odkryj Kolekcję
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-8 py-4 bg-sand border-2 border-charcoal rounded-pill font-medium transition-all shadow-neo-subtle hover:shadow-neo-light">
            Umów konsultację
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-row gap-8 sm:gap-12"
        >
          {[
            { label: '10 lat', value: 'Gwarancji' },
            { label: '2,500+', value: 'Klientów' },
            { label: '4.9/5', value: 'Ocena' },
          ].map((item) => (
            <div key={item.label}>
              <span className="text-h3 font-bold text-charcoal">{item.label}</span>
              <span className="text-caption text-gray-500">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-caption text-gray-500">Przewiń</span>
        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
```

---

## SEKCJA 2: BestsellersSection.tsx (NOWA WERSJA)

```typescript
'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/cards/product-card'
import type { MockProduct } from '@/lib/data-adapters/mock'
import productsData from '@/mock/products.json'

export function BestsellersSection() {
  const bestsellers = (productsData as MockProduct[]).slice(0, 4)

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-gold-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-h1 font-bold text-charcoal mb-4">Bestsellery</h2>
          <p className="text-body-large text-gray-500 max-w-2xl">
            Najchętniej wybierane przez naszych klientów. Sprawdzona jakość i ponadczasowy design.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              {/* Neomorphic card */}
              <div className="relative bg-white rounded-soft-lg p-4 shadow-neo-subtle hover:shadow-neo-light transition-all overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -top-20 right-0 w-40 h-40 bg-neo-green-dark/0 group-hover:bg-neo-green-dark/10 rounded-full group-hover:opacity-100 opacity-0 transition-all duration-500" />

                <ProductCard product={product} />

                {/* Badge */}
                {product.isNew && (
                  <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-neo-orange-light to-neo-orange text-neo-orange-dark text-label rounded-soft font-bold shadow-neo-subtle">
                    Nowy
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <button className="px-8 py-4 bg-charcoal text-white rounded-pill font-medium transition-all hover:scale-105 shadow-card">
            Pokaż wszystkie bestsellery
          </button>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## SEKCJA 3: TestimonialsSection.tsx (NOWA WERSJA)

```typescript
'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Anna Kowalska',
    role: 'Architekt wnętrz',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Jakość wykonania mebli jest wyjątkowa. Sofa, którą kupiłam, zachwyca moich klientów.',
  },
  {
    id: 2,
    name: 'Michał Nowak',
    role: 'Właściciel restauracji',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Zamówiłem meble do mojej restauracji i jestem zachwycony. Wytrzymałe i piękne.',
  },
  {
    id: 3,
    name: 'Katarzyna Wiśniewska',
    role: 'Designer',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Gawin-Home to synonim elegancji. Najlepsza inwestycja w moim domu.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-sand relative overflow-hidden">
      {/* Background */}
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-gold-light/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h2 className="text-h1 font-bold text-charcoal mb-4">Co mówią nasi klienci</h2>
          <p className="text-body-large text-gray-500">
            Dołącz do grona zadowolonych właścicieli mebli premium
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Neomorphic card */}
              <div className="bg-white rounded-soft-lg p-8 shadow-neo-subtle hover:shadow-neo-light transition-all">
                <Quote className="w-8 h-8 text-gold-light mb-4 opacity-50" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-body text-charcoal mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-charcoal text-body-small">{testimonial.name}</p>
                    <p className="text-caption text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-charcoal text-white rounded-soft-xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row justify-around items-center gap-6">
            <div className="text-center">
              <p className="text-h2 font-bold">2,500+</p>
              <p className="text-body-small">zadowolonych klientów</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gold-light/20" />
            <div className="text-center">
              <p className="text-h2 font-bold">4.9/5</p>
              <p className="text-body-small">średnia ocena</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gold-light/20" />
            <div className="text-center">
              <p className="text-h2 font-bold">10+</p>
              <p className="text-body-small">lat na rynku</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## SEKCJA 4: InteractiveConfigurator.tsx (NOWY KOMPONENT)

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ConfiguratorProps {
  productId: string
  productName: string
  basePrice: number
}

export function InteractiveConfigurator({ 
  productId, 
  productName, 
  basePrice 
}: ConfiguratorProps) {
  const [color, setColor] = useState('charcoal')
  const [size, setSize] = useState('standard')
  const [totalPrice, setTotalPrice] = useState(basePrice)

  const colors = [
    { id: 'charcoal', label: 'Charcoal', hex: '#1A1A1A' },
    { id: 'cream', label: 'Cream', hex: '#FAFAF9' },
    { id: 'gold', label: 'Gold', hex: '#D4A574' },
    { id: 'copper', label: 'Copper', hex: '#B8956A' },
  ]

  const sizes = [
    { id: 'small', label: 'S', price: -500 },
    { id: 'standard', label: 'Standard', price: 0 },
    { id: 'large', label: 'L', price: 1500 },
    { id: 'xlarge', label: 'XL', price: 3000 },
  ]

  return (
    <section className="py-16 bg-sand">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-h1 font-bold text-charcoal mb-12">
          Konfiguruj swój {productName}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Preview */}
          <motion.div className="flex items-center justify-center">
            <div className="relative w-80 h-96 rounded-soft-lg shadow-neo-light overflow-hidden">
              <div
                className="w-full h-full transition-colors duration-300 flex items-center justify-center"
                style={{ backgroundColor: colors.find(c => c.id === color)?.hex }}
              >
                <span className="text-white text-h2 font-bold opacity-50">
                  Podgląd
                </span>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="space-y-12">
            {/* Color selector */}
            <div>
              <label className="text-label text-gray-500 mb-4 block">Kolor</label>
              <div className="flex gap-4">
                {colors.map((c) => (
                  <motion.button
                    key={c.id}
                    onClick={() => setColor(c.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-16 h-16 rounded-soft-lg shadow-neo-subtle transition-all ${
                      color === c.id ? 'ring-2 ring-gold scale-110' : ''
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <label className="text-label text-gray-500 mb-4 block">Rozmiar</label>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((s) => (
                  <motion.button
                    key={s.id}
                    onClick={() => {
                      setSize(s.id)
                      setTotalPrice(basePrice + s.price)
                    }}
                    className={`py-3 px-4 rounded-soft text-body-small font-medium transition-all ${
                      size === s.id
                        ? 'bg-charcoal text-white shadow-neo-pressed'
                        : 'bg-white text-charcoal shadow-neo-subtle hover:shadow-neo-light'
                    }`}
                  >
                    {s.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Price */}
            <motion.div
              className="bg-gradient-to-r from-gold-light to-copper-light rounded-soft-lg p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-label text-gray-600 mb-2">Cena</p>
              <p className="text-display-hero font-bold text-charcoal">
                {totalPrice.toLocaleString('pl-PL')} zł
              </p>
            </motion.div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-charcoal text-white rounded-pill font-medium shadow-neo-light hover:shadow-neo-light"
            >
              Dodaj do koszyka
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## SEKCJA 5: Navbar.tsx (NOWA WERSJA)

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Kolekcja', href: '/products' },
    { label: 'O nas', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Kontakt', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm shadow-soft border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="font-bold text-charcoal text-h2">
            Gawin
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body text-charcoal hover:text-gold-dark transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-dark group-hover:w-full transition-all" />
              </Link>
            ))}
          </div>

          {/* CTA + Cart */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-sand rounded-pill shadow-neo-subtle cursor-pointer"
            >
              🔍
            </motion.div>
            <Link
              href="/cart"
              className="relative px-6 py-2 bg-charcoal text-white rounded-pill font-medium hover:scale-105"
            >
              Koszyk
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-neo-green text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-sand"
      >
        <div className="p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-body text-charcoal rounded-soft hover:bg-gray-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}
```

---

## SEKCJA 6: Plik CSS - neo-components.css

```css
/* Neo-Morphic Design System */

:root {
  --neo-shadow-light: 6px 6px 12px rgba(0, 0, 0, 0.15), -6px -6px 12px rgba(255, 255, 255, 1);
  --neo-shadow-pressed: inset 4px 4px 8px rgba(0, 0, 0, 0.15), inset -4px -4px 8px rgba(255, 255, 255, 0.7);
  --neo-shadow-subtle: 3px 3px 6px rgba(0, 0, 0, 0.12), -3px -3px 6px rgba(255, 255, 255, 0.95);
}

/* Utility classes */
.shadow-neo-light {
  box-shadow: var(--neo-shadow-light);
}

.shadow-neo-pressed {
  box-shadow: var(--neo-shadow-pressed);
}

.shadow-neo-subtle {
  box-shadow: var(--neo-shadow-subtle);
}

.rounded-pill {
  border-radius: 50px;
}

.rounded-soft {
  border-radius: 12px;
}

.rounded-soft-lg {
  border-radius: 16px;
}

.rounded-soft-xl {
  border-radius: 24px;
}

.text-gradient-gold {
  background: linear-gradient(125deg, #D4A574, #B8956A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## ✅ INSTRUKCJE INSTALACJI

1. **Kopij wszystkie komponenty** do odpowiednich folderów w `components/sections/`
2. **Zaktualizuj globals.css** z nowymi zmiennymi kolorów i typografią
3. **Dodaj neo-components.css** do pliku global
4. **Import komponentów** w `page.tsx` lub layoutach
5. **Testuj na urządzeniach** - mobile, tablet, desktop

---

**Gotowe do wdrożenia! 🚀**
