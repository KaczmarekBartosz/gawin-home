"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, HandHeart, ShieldCheck, Truck } from "lucide-react";

import { CategoryCard } from "@/components/cards/category-card";
import { SpecCard } from "@/components/cards/spec-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { BestsellersCarousel } from "@/components/sections/home/BestsellersCarousel";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { cn, formatCurrency } from "@/lib/utils";
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

const lookbookLayout = [
  "md:col-span-2 md:row-span-2 aspect-[5/3]",
  "md:col-span-1 aspect-[4/5]",
  "md:col-span-1 aspect-square",
  "md:col-span-2 aspect-[16/7]",
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

      <Section tone="cream" id="bestsellery" className="space-y-10">
        <Container className="space-y-6">
          <motion.header
            {...fadeInUp}
            className="flex flex-col gap-4 text-center"
          >
            <p className="text-label text-brand-gold">Bestsellery</p>
            <h2 className="text-h2 text-brand-charcoal">
              Najczęściej wybierane
            </h2>
            <p className="mx-auto max-w-2xl text-body-descriptive">
              4–6 kart produktów w układzie plakatu. Pełnoekranowy przejazd
              podkreśla rytm kolekcji.
            </p>
          </motion.header>
        </Container>
        <Container className="px-6 md:px-8 lg:px-12">
          <BestsellersCarousel products={featuredProducts} />
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
                  className="rounded-[1.75rem] border border-neutral-200/80 bg-white/85 p-10 shadow-[0_24px_60px_rgba(26,26,26,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_80px_rgba(26,26,26,0.12)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-brand-gold/40 bg-brand-gold/12 text-brand-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-brand-charcoal">
                    {prop.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {prop.description}
                  </p>
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

          <div className="grid gap-6 md:auto-rows-[260px] md:grid-cols-3">
            {lookbookData.map((item, index) => {
              const layoutClass = lookbookLayout[index] ?? "aspect-[4/3]";
              return (
                <motion.div
                  key={item.id}
                  {...fadeInUp}
                  transition={{
                    ...fadeInUp.transition,
                    delay: index * 0.08,
                    duration: 0.45,
                  }}
                  className={cn(
                    "group relative overflow-hidden rounded-[2.25rem] shadow-[0_30px_80px_rgba(26,26,26,0.12)]",
                    layoutClass,
                  )}
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/25 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-2 text-brand-cream">
                    <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">
                      Lookbook
                    </p>
                    <p className="text-2xl font-semibold leading-tight">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
    <Section tone="dark" className="relative isolate overflow-hidden pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src={heroData.media.src}
          alt={heroData.media.alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,165,116,0.25),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(184,149,106,0.2),transparent_65%),linear-gradient(to_bottom,rgba(0,0,0,0.82),rgba(0,0,0,0.9))]" />
        <div className="absolute inset-0 noise-dark opacity-60" />
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-14 hidden text-[min(18vw,240px)] font-display uppercase tracking-[0.18em] text-white/5 lg:block"
      >
        Gawin
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute left-[-4%] bottom-10 hidden text-[min(20vw,260px)] font-display uppercase tracking-[0.25em] text-white/[0.04] lg:block"
      >
        Home
      </span>

      <Container className="relative z-10 grid gap-12 lg:grid-cols-12">
        <motion.div
          {...fadeInUp}
          className="space-y-10 lg:col-span-6 xl:col-span-5"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-brand-cream/90">
            Sprint 1 · Design-only mock
          </span>
          <div className="space-y-8">
            <p className="text-label text-brand-cream/60">Gawin-Home</p>
            <h1 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-brand-cream">
              {heroData.title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-brand-cream/75">
              {heroData.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {heroChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-brand-cream/80 backdrop-blur"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-5">
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
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-white/[0.12] bg-white/[0.06] shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <Image
              src={product?.images[0]?.src ?? heroData.media.src}
              alt={product?.images[0]?.alt ?? heroData.media.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/20 to-black/40" />
            {hotspots.map((hotspot) => (
              <Hotspot key={hotspot.id} {...hotspot} />
            ))}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-[-12%] h-40 w-40 rounded-full bg-brand-gold/20 blur-3xl"
          />
        </motion.div>
      </Container>
    </Section>
  );
}

function HeroCapsuleCTA({ product }: { product?: MockProduct }) {
  return (
    <div className="inline-flex overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] backdrop-blur">
      <Link
        href={heroData.cta?.primary?.href ?? "/listing"}
        className="group inline-flex h-12 items-center gap-2 bg-gradient-to-br from-brand-gold via-brand-gold/95 to-brand-copper px-7 text-sm font-semibold text-white transition hover:brightness-115"
      >
        {heroData.cta?.primary?.label ?? "Odkryj kolekcję"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
      {product ? (
        <span className="inline-flex h-12 items-center bg-black/30 px-6 text-sm font-medium text-brand-cream/90">
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
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(212,165,116,0.2),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(184,149,106,0.2),transparent_60%),linear-gradient(160deg,rgba(26,26,26,0.92),rgba(26,26,26,0.98))]" />
      <div className="absolute inset-0 -z-10 opacity-85">
        <div className="absolute inset-0 noise-dark" />
      </div>

      <Container className="relative z-10 grid gap-16 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
        <motion.div
          {...fadeInUp}
          className="relative aspect-[4/3] overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/8 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur"
        >
          <Image
            src={product.images[0]?.src ?? heroData.media.src}
            alt={product.images[0]?.alt ?? product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/15 to-transparent" />
          <div className="absolute bottom-10 left-10 space-y-4 text-brand-cream">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] backdrop-blur">
              Kolekcja Elegancka
            </span>
            <h3 className="text-3xl font-semibold tracking-tight">
              {product.name}
            </h3>
            <p className="max-w-xs text-sm text-brand-cream/75">
              {product.description}
            </p>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="flex flex-col gap-10"
        >
          <div>
            <p className="text-label text-brand-gold">Dark Product Block</p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,4vw,3rem)] font-semibold tracking-[-0.025em] text-brand-cream">
              Specyfikacja premium
            </h2>
            <p className="mt-4 text-body-standard text-brand-cream/70">
              Sekcja pokazuje docelowy układ PDP: zdjęcie, tabelę parametrów,
              CTA outline oraz cenę formatowaną zgodnie z kanonem.
            </p>
          </div>
          <SpecCard
            items={items}
            className="border-white/15 bg-white/12 shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
          />
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="gold" asChild>
              <Link href="/pdp">Zobacz szczegóły</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/listing#samples">Zamów próbki tkanin</Link>
            </Button>
            <p className="text-sm font-medium text-brand-cream/80">
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
      <Container className="max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-neutral-200/60 bg-[radial-gradient(circle_at_20%_20%,rgba(212,165,116,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(184,149,106,0.18),transparent_60%),#f5f5f5] shadow-[0_30px_80px_rgba(26,26,26,0.12)]">
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=80"
            alt="Ambientowa aranżacja wnętrza"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cream/95 via-brand-cream/85 to-brand-sand/80" />
          <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-14 text-center md:px-16">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-gold/80">
              Klub Gawin
            </p>
            <h2 className="text-[clamp(2.5rem,4vw,3.25rem)] font-semibold tracking-[-0.02em] text-brand-charcoal">
              Dołącz do świata GAWIN
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-brand-charcoal/70">
              Otrzymuj selektywne historie o materiałach, zaproszenia na pokazy
              i dostęp do limitowanych kolekcji zanim trafią do showroomu.
            </p>
            <form
              className="flex w-full max-w-xl flex-col gap-3 rounded-full border border-neutral-200/70 bg-white/90 p-3 shadow-[0_18px_40px_rgba(26,26,26,0.12)] backdrop-blur sm:flex-row sm:items-center"
              onSubmit={(event) => event.preventDefault()}
            >
              <Input
                placeholder="Adres e-mail"
                type="email"
                aria-label="Adres e-mail"
                className="h-11 flex-1 rounded-full border-none bg-transparent px-5"
              />
              <Button
                type="submit"
                className="w-full rounded-full px-8 sm:w-auto"
              >
                Zapisz się
              </Button>
            </form>
            <div className="flex items-center justify-center gap-3 text-xs text-brand-charcoal/60">
              <Checkbox
                id="newsletter-rodo"
                aria-label="Zgoda na komunikację marketingową"
              />
              <label
                htmlFor="newsletter-rodo"
                className="max-w-sm text-left md:text-center"
              >
                Akceptuję komunikację GAWIN-Home oraz politykę prywatności.
                Makieta — brak logiki.
              </label>
            </div>
          </div>
        </div>
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
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-white/90 text-brand-gold shadow-[0_12px_25px_rgba(0,0,0,0.35)] backdrop-blur transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110">
        <span className="h-2 w-2 rounded-full bg-brand-gold" />
      </span>
      <div className="pointer-events-none absolute left-8 top-1/2 hidden w-64 -translate-y-1/2 rounded-xl border border-neutral-200/60 bg-white/95 p-4 text-sm text-brand-charcoal shadow-[0_24px_50px_rgba(0,0,0,0.3)] transition-opacity duration-300 group-hover:block group-focus-visible:block">
        <p className="font-semibold tracking-tight">{label}</p>
        <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
          {description}
        </p>
        <span className="absolute left-[-10px] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-l border-t border-neutral-200/60 bg-white/95" />
      </div>
    </button>
  );
}
