/* eslint-disable jsx-a11y/no-redundant-roles */
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HandHeart, ShieldCheck, Truck } from "lucide-react";

import { CategoryCard } from "@/components/cards/category-card";
import { ProductCard } from "@/components/cards/product-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { fadeInUp } from "@/motion/presets";

import heroData from "@/mock/hero.json";
import categoriesData from "@/mock/categories.json";
import productsData from "@/mock/products.json";
import valuePropsData from "@/mock/value-props.json";
import lookbookData from "@/mock/lookbook.json";

const iconsMap = {
  Truck,
  ShieldCheck,
  HandHeart,
} as const;

const products = productsData as MockProduct[];

export default function HomePage() {
  const featuredProducts = useMemo(() => products.slice(0, 4), []);

  return (
    <div className="space-y-0">
      <Section tone="dark" className="relative overflow-hidden pb-16">
        <Container className="relative z-10 flex min-h-[70vh] flex-col justify-center py-24">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <p className="text-label text-brand-cream opacity-70">Gawin-Home</p>
            <h1 className="mt-6 text-display-hero text-brand-cream text-glow-gold">
              {heroData.title}
            </h1>
            <p className="mt-6 text-body-descriptive text-brand-cream opacity-80">
              {heroData.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/listing" className="group">
                  Odkryj kolekcję
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/pdp">Zobacz szczegóły produktu</Link>
              </Button>
            </div>
          </motion.div>

          <motion.dl
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-8 text-brand-cream md:grid-cols-3"
          >
            <div>
              <dt className="text-sm uppercase tracking-[0.25em] opacity-70">
                Gwarancja
              </dt>
              <dd className="mt-2 text-3xl font-semibold">24 miesiące</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-[0.25em] opacity-70">
                Realizacje
              </dt>
              <dd className="mt-2 text-3xl font-semibold">2 500+</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-[0.25em] opacity-70">
                Ocena
              </dt>
              <dd className="mt-2 text-3xl font-semibold">4.9/5</dd>
            </div>
          </motion.dl>
        </Container>

        <Image
          src={heroData.media.src}
          alt={heroData.media.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.11_0_0_/_0.85)] via-[oklch(0.11_0_0_/_0.6)] to-[oklch(0.11_0_0_/_0.85)]" />
        <div className="absolute inset-0 -z-10 noise-dark opacity-70" />
      </Section>

      <Section tone="cream">
        <Container className="space-y-12">
          <motion.header {...fadeInUp} className="text-center">
            <p className="text-label text-brand-gold">Kolekcje</p>
            <h2 className="mt-4 text-h2 text-brand-charcoal">
              Znajdź idealną formę
            </h2>
            <p className="mt-4 text-body-descriptive mx-auto max-w-2xl">
              Przełączaj się pomiędzy trybem Eleganckim i Showroom, koncentrując
              się na jakości materiałów i proporcjach.
            </p>
          </motion.header>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesData.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                href={`/listing#${category.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container className="space-y-12">
          <motion.header
            {...fadeInUp}
            className="flex flex-col gap-4 text-center"
          >
            <p className="text-label text-brand-gold">Bestsellery</p>
            <h2 className="text-h2 text-brand-charcoal">
              Najczęściej wybierane
            </h2>
            <p className="text-body-descriptive mx-auto max-w-2xl">
              Produkty, które najczęściej trafiają do domów naszych klientów.
              Świetny punkt wyjścia do projektowania kart i sekcji PDP.
            </p>
          </motion.header>
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max gap-6 pr-4">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  {...fadeInUp}
                  transition={{
                    ...fadeInUp.transition,
                    delay: index * 0.1,
                    duration: 0.45,
                  }}
                >
                  <ProductCard
                    product={product}
                    href="/pdp"
                    className="w-[280px] sm:w-[320px]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container className="space-y-10">
          <motion.header {...fadeInUp} className="text-center">
            <p className="text-label text-brand-gold">Dlaczego Gawin-Home?</p>
            <h2 className="mt-4 text-h2 text-brand-charcoal">
              Jakość, na której możesz polegać
            </h2>
          </motion.header>

          <div className="grid gap-8 md:grid-cols-3">
            {valuePropsData.map((prop, index) => {
              const Icon =
                iconsMap[prop.icon as keyof typeof iconsMap] ?? Truck;
              return (
                <motion.div
                  key={prop.title}
                  {...fadeInUp}
                  transition={{
                    ...fadeInUp.transition,
                    delay: index * 0.1,
                    duration: 0.4,
                  }}
                  className="rounded-2xl bg-white p-8 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.75_0.12_85_/_0.15)] text-brand-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-h3 text-brand-charcoal">
                    {prop.title}
                  </h3>
                  <p className="mt-3 text-body-standard">{prop.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="light" className="pt-16">
        <Container className="space-y-10">
          <motion.header
            {...fadeInUp}
            className="flex flex-col gap-4 text-center"
          >
            <p className="text-label text-brand-gold">Inspiracje</p>
            <h2 className="text-h2 text-brand-charcoal">Hybrydowy lookbook</h2>
            <p className="text-body-descriptive mx-auto max-w-2xl">
              Zobacz, jak kolekcja prezentuje się w realnych wnętrzach. Hero
              uzupełnia tryb Elegancki, poniżej przechodzimy w Showroom.
            </p>
          </motion.header>

          <div className="grid gap-6 md:grid-cols-2">
            {lookbookData.map((item, index) => (
              <motion.div
                key={item.id}
                {...fadeInUp}
                transition={{
                  ...fadeInUp.transition,
                  duration: 0.45,
                  delay: index * 0.1,
                }}
                className="group relative overflow-hidden rounded-3xl shadow-soft"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.11_0_0_/_0.65)] via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-brand-cream">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">
                      Lookbook
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/listing#lookbook">Zobacz nasze inspiracje →</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-h2 text-brand-charcoal">
            Otrzymuj ekskluzywne inspiracje
          </h2>
          <p className="text-body-descriptive max-w-2xl">
            Zapisz się do naszego biuletynu i dowiedz się jako pierwszy o nowych
            kolekcjach, limitowanych tkaninach oraz premierach AR/3D.
          </p>
          <form
            className="flex w-full max-w-xl flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft sm:flex-row sm:items-center"
            onSubmit={(event) => event.preventDefault()}
          >
            <Input
              placeholder="Adres e-mail"
              type="email"
              aria-label="Adres e-mail"
            />
            <Button type="submit" className="w-full sm:w-auto">
              Zapisz się
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 text-xs text-[color:oklch(0.45_0_0)]">
            <Checkbox
              id="newsletter-rodo"
              aria-label="Zgoda na komunikację marketingową"
            />
            <label htmlFor="newsletter-rodo">
              Wyrażam zgodę na kontakt marketingowy (wizualny placeholder)
            </label>
          </div>
          <p className="text-xs text-[color:oklch(0.45_0_0)]">
            Zapisując się, akceptujesz naszą politykę prywatności. Brak realnego
            zapisu — makieta.
          </p>
        </Container>
      </Section>

      <Section tone="light" className="pb-24">
        <Container className="grid gap-6 text-center lg:grid-cols-2">
          <div className="rounded-3xl bg-brand-sand p-10 shadow-soft">
            <h3 className="text-h3 text-brand-charcoal">
              Przejdź do widoków makiet
            </h3>
            <p className="mt-3 text-body-standard">
              Sprawdź przygotowane ekrany listingu, PDP, koszyka i checkoutu.
              Wszystkie oparte na mock danych.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="gold" asChild>
                <Link href="/listing">Listing produktów</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/pdp">PDP — szczegóły</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl bg-brand-sand p-10 shadow-soft">
            <h3 className="text-h3 text-brand-charcoal">Proces zakupowy</h3>
            <p className="mt-3 text-body-standard">
              Makiety koszyka i checkoutu w układzie premium: moduły upsell,
              kosztorys i wizualna oś postępu bez realnej logiki.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="gold" asChild>
                <Link href="/cart">Koszyk</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/checkout">Checkout — 3 kroki</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
