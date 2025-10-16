"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, HandHeart, ShieldCheck, Truck } from "lucide-react";

import { CategoryCard } from "@/components/cards/category-card";
import { ProductCard } from "@/components/cards/product-card";
import { SpecCard } from "@/components/cards/spec-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { formatCurrency } from "@/lib/utils";
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

const heroChips = [
  "Technologiczny luksus",
  "Ciepły minimalizm",
  "Ręczne wykonanie",
];

const heroMetrics = [
  { label: "Gwarancja", value: "24 miesiące" },
  { label: "Realizacje", value: "2 500+" },
  { label: "Ocena", value: "4.9 / 5" },
];

const products = productsData as MockProduct[];

export default function HomePage() {
  const featuredProducts = useMemo(() => products.slice(0, 6), []);
  const heroProduct = products[0];
  const darkFeatureProduct = products[5] ?? heroProduct;

  const heroHotspots: HotspotData[] = heroProduct
    ? [
        {
          id: "frame",
          label: "Rama dębowa",
          description: "Lite drewno olejowane na mat, ręczne wykończenie.",
          position: { top: "28%", left: "32%" },
        },
        {
          id: "fabric",
          label: "Tkanina Latte 12",
          description:
            "Miękka bouclé odporniejsza na zabrudzenia (test Martindale 60k).",
          position: { top: "62%", left: "68%" },
        },
      ]
    : [];

  const specItems = darkFeatureProduct
    ? [
        {
          label: "Materiały",
          value: `${darkFeatureProduct.fabrics
            .slice(0, 2)
            .map((fabric) => fabric.name)
            .join(", ")} · Lite drewno · Stal lakierowana`,
        },
        {
          label: "Wymiary",
          value: `${darkFeatureProduct.dimensions.w} × ${darkFeatureProduct.dimensions.d} × ${darkFeatureProduct.dimensions.h} ${darkFeatureProduct.dimensions.unit}`,
        },
        {
          label: "Gwarancja",
          value: "24 miesiące premium · Serwis door-to-door",
        },
      ]
    : [];

  return (
    <div className="space-y-0">
      <HeroSection product={heroProduct} hotspots={heroHotspots} />

      <Section tone="sand" id="kolekcje">
        <Container className="space-y-12">
          <motion.header {...fadeInUp} className="text-center">
            <p className="text-label text-brand-gold">Kolekcje</p>
            <h2 className="mt-4 text-h2 text-brand-charcoal">
              Znajdź idealną formę
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-descriptive">
              Showroom prezentuje moduły, które możesz miksować. Każda karta to
              docelowy layout komponentu kategorii.
            </p>
          </motion.header>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesData.map((category) => (
              <motion.div
                key={category.id}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, duration: 0.45 }}
              >
                <CategoryCard
                  category={category}
                  href={`/listing#${category.slug}`}
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream" id="bestsellery">
        <Container className="space-y-12">
          <motion.header
            {...fadeInUp}
            className="flex flex-col gap-4 text-center"
          >
            <p className="text-label text-brand-gold">Bestsellery</p>
            <h2 className="text-h2 text-brand-charcoal">
              Najczęściej wybierane
            </h2>
            <p className="mx-auto max-w-2xl text-body-descriptive">
              4–6 kart produktów z overflow-scroll. Karuzela bez JS — użyj
              `snap-x` i CTA jako wzoru docelowego modułu.
            </p>
          </motion.header>
          <div className="overflow-x-auto pb-4">
            <div className="flex min-w-max gap-6 pr-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  {...fadeInUp}
                  transition={{
                    ...fadeInUp.transition,
                    delay: index * 0.08,
                    duration: 0.45,
                  }}
                  className="snap-start"
                >
                  <ProductCard
                    product={product}
                    href="/pdp"
                    className="w-[300px] md:w-[340px]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light">
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
                <motion.article
                  key={prop.title}
                  {...fadeInUp}
                  transition={{
                    ...fadeInUp.transition,
                    delay: index * 0.08,
                  }}
                  className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-h3 text-brand-charcoal">
                    {prop.title}
                  </h3>
                  <p className="mt-3 text-body-standard">{prop.description}</p>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </Section>

      <DarkProductBlock product={darkFeatureProduct} items={specItems} />

      <Section tone="light" id="lookbook">
        <Container className="space-y-10">
          <motion.header
            {...fadeInUp}
            className="flex flex-col gap-4 text-center"
          >
            <p className="text-label text-brand-gold">Inspiracje</p>
            <h2 className="text-h2 text-brand-charcoal">Hybrydowy lookbook</h2>
            <p className="mx-auto max-w-2xl text-body-descriptive">
              Duże zdjęcia lifestyle — layout docelowy dla sekcji inspiracyjnej.
              Hover = delikatny zoom obrazu.
            </p>
          </motion.header>

          <div className="grid gap-6 md:grid-cols-2">
            {lookbookData.map((item, index) => (
              <motion.div
                key={item.id}
                {...fadeInUp}
                transition={{
                  ...fadeInUp.transition,
                  delay: index * 0.08,
                  duration: 0.45,
                }}
                className="group relative overflow-hidden rounded-3xl shadow-soft"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-brand-cream">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">
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
              <Link
                href="/listing#lookbook"
                className="group inline-flex items-center gap-2"
              >
                Zobacz nasze inspiracje
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <NewsletterSection />

      <Section tone="light" className="pb-24">
        <Container className="grid gap-6 text-center lg:grid-cols-2">
          <div className="rounded-3xl bg-brand-sand p-10 shadow-soft">
            <h3 className="text-h3 text-brand-charcoal">
              Przejdź do widoków makiet
            </h3>
            <p className="mt-3 text-body-standard">
              Listing, PDP, koszyk i checkout — wszystkie sekcje gotowe jako
              klikalne makiety na mockach.
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
              Makiety koszyka i checkoutu pokazują docelowe moduły UX — brak
              silnika zakupowego, ale kompletna struktura.
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

type HotspotData = {
  id: string;
  label: string;
  description: string;
  position: {
    top: string;
    left: string;
  };
};

type HeroSectionProps = {
  product?: MockProduct;
  hotspots: HotspotData[];
};

function HeroSection({ product, hotspots }: HeroSectionProps) {
  return (
    <Section tone="dark" className="relative isolate overflow-hidden pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={heroData.media.src}
          alt={heroData.media.alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
        <div className="absolute inset-0 noise-dark opacity-70" />
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-16 hidden text-[min(18vw,240px)] font-display uppercase tracking-[0.2em] text-white/5 lg:block"
      >
        Gawin
      </span>

      <Container className="relative z-10 grid gap-12 lg:grid-cols-12">
        <motion.div
          {...fadeInUp}
          className="space-y-8 lg:col-span-6 xl:col-span-5"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-cream">
            Sprint 1 · Design-only mock
          </span>
          <div className="space-y-6">
            <p className="text-label text-brand-cream/70">Gawin-Home</p>
            <h1 className="text-display-hero text-brand-cream">
              {heroData.title}
            </h1>
            <p className="max-w-xl text-body-descriptive text-brand-cream/80">
              {heroData.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {heroChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cream"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <HeroCapsuleCTA product={product} />
            <Button variant="outline" asChild>
              <Link
                href={heroData.cta?.secondary?.href ?? "#lookbook"}
                className="group inline-flex items-center gap-2"
              >
                {heroData.cta?.secondary?.label ?? "Zobacz inspiracje"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <motion.dl
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.15 }}
            className="grid grid-cols-2 gap-6 pt-10 text-brand-cream md:grid-cols-3"
          >
            {heroMetrics.map((metric) => (
              <div key={metric.label}>
                <dt className="text-xs uppercase tracking-[0.3em] text-brand-cream/60">
                  {metric.label}
                </dt>
                <dd className="mt-3 text-2xl font-semibold">{metric.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.08 }}
          className="relative lg:col-span-6 xl:col-span-7"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 shadow-soft">
            <Image
              src={product?.images[0]?.src ?? heroData.media.src}
              alt={product?.images[0]?.alt ?? heroData.media.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            {hotspots.map((hotspot) => (
              <Hotspot key={hotspot.id} {...hotspot} />
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

function HeroCapsuleCTA({ product }: { product?: MockProduct }) {
  return (
    <div className="inline-flex overflow-hidden rounded-xl shadow-soft">
      <Link
        href={heroData.cta?.primary?.href ?? "/listing"}
        className="group inline-flex h-12 items-center gap-2 bg-gradient-to-br from-brand-gold to-brand-copper px-6 text-sm font-semibold text-white transition hover:brightness-110"
      >
        {heroData.cta?.primary?.label ?? "Odkryj kolekcję"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
      {product ? (
        <span className="inline-flex h-12 items-center bg-black/10 px-5 text-sm font-medium text-brand-cream">
          {formatCurrency(product.price, product.currency)}
        </span>
      ) : null}
    </div>
  );
}

type DarkProductBlockProps = {
  product?: MockProduct;
  items: {
    label: string;
    value: string;
    hint?: string;
  }[];
};

function DarkProductBlock({ product, items }: DarkProductBlockProps) {
  if (!product) return null;

  return (
    <Section tone="dark" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute inset-0 noise-dark" />
      </div>
      <Container className="relative z-10 grid gap-12 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
        <motion.div
          {...fadeInUp}
          className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5"
        >
          <Image
            src={product.images[0]?.src ?? heroData.media.src}
            alt={product.images[0]?.alt ?? product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 space-y-3 text-brand-cream">
            <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
              Kolekcja Elegancka
            </span>
            <h3 className="text-2xl font-semibold">{product.name}</h3>
            <p className="text-sm text-brand-cream/70">{product.description}</p>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          <div>
            <p className="text-label text-brand-gold">Dark Product Block</p>
            <h2 className="mt-4 text-h2 text-brand-cream">
              Specyfikacja premium
            </h2>
            <p className="mt-4 text-body-standard text-brand-cream/70">
              Sekcja pokazuje docelowy układ PDP: zdjęcie, tabelę parametrów,
              CTA outline oraz cenę formatowaną zgodnie z kanonem.
            </p>
          </div>
          <SpecCard items={items} className="border-white/15 bg-white/8" />
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="gold" asChild>
              <Link href="/pdp">Zobacz szczegóły</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/listing#samples">Zamów próbki tkanin</Link>
            </Button>
            <p className="text-sm font-medium text-brand-cream">
              {formatCurrency(product.price, product.currency)}
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

function NewsletterSection() {
  return (
    <Section tone="cream">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-h2 text-brand-charcoal">
          Otrzymuj ekskluzywne inspiracje
        </h2>
        <p className="max-w-2xl text-body-descriptive">
          Newsletter pokazuje docelowy układ formularza — brak logiki, tylko
          warstwa wizualna z focus ringiem i kapsułą CTA.
        </p>
        <form
          className="flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-neutral-200 bg-white/80 p-4 shadow-soft sm:flex-row sm:items-center"
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
  );
}

function Hotspot({ label, description, position }: HotspotData) {
  return (
    <button
      type="button"
      className="group absolute flex items-center bg-transparent focus-visible:outline-none"
      style={{ top: position.top, left: position.left }}
      aria-label={`${label}: ${description}`}
    >
      <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white/80 shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110">
        <span className="h-2 w-2 rounded-full bg-brand-gold" />
      </span>
      <div className="pointer-events-none absolute left-7 top-1/2 hidden w-64 -translate-y-1/2 rounded-xl bg-white p-4 text-sm text-brand-charcoal shadow-elevated transition-opacity duration-300 group-hover:block group-focus-visible:block">
        <p className="font-semibold">{label}</p>
        <p className="mt-1 text-xs text-neutral-600">{description}</p>
        <span className="absolute left-[-10px] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white" />
      </div>
    </button>
  );
}
