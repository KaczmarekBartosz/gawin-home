"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Package2, Shield, Sparkles } from "lucide-react";

import { ProductCard } from "@/components/cards/product-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { formatCurrency } from "@/lib/utils";
import { fadeInUp } from "@/motion/presets";

import productsData from "@/mock/products.json";

const products = productsData as MockProduct[];
const heroProduct = products[0];
const recommended = products.slice(1, 4);

type HotspotPin = {
  id: string;
  label: string;
  description: string;
  position: {
    top: string;
    left: string;
  };
};

const faqItems = [
  {
    question: "Jak działa konfiguracja modułowa?",
    answer:
      "Każdy element posiada szybkie złącza typu click-in. Możesz przełożyć moduły bez narzędzi w około 10 minut (makieta funkcjonalności).",
  },
  {
    question: "Czy mogę zamówić próbki tkanin?",
    answer:
      "Tak — sekcja 'Zamów próbki' na PDP prezentuje przyszły formularz. Aktualnie to placeholder bez logiki.",
  },
  {
    question: "Jak wygląda dostawa premium?",
    answer:
      "Mock danych logistycznych: dostawa z wniesieniem i montażem w ciągu 21–30 dni, termin ustalany przez concierge Gawin-Home.",
  },
];

export default function PDPPage() {
  return (
    <div className="space-y-0">
      <Section tone="light" className="pb-12">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Gallery product={heroProduct} />
          <ProductSummary product={heroProduct} />
        </Container>
      </Section>

      <Section tone="cream">
        <Container className="space-y-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <MaterialPassport product={heroProduct} />
            <ConsultationForm />
          </div>
          <FAQSection />
        </Container>
      </Section>

      <Section tone="light">
        <Container className="space-y-10">
          <motion.header
            {...fadeInUp}
            className="flex flex-col gap-3 text-center"
          >
            <p className="text-label text-brand-gold">Polecane</p>
            <h2 className="text-h2 text-brand-charcoal">Uzupełnij aranżację</h2>
          </motion.header>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} href="/listing" />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

type GalleryProps = {
  product: MockProduct;
};

function Gallery({ product }: GalleryProps) {
  const images = product.images.slice(0, 4);
  const heroImage = images[0];
  const hotspots: HotspotPin[] = [
    {
      id: "module",
      label: "Moduł narożny",
      description: "Łączy się z innymi modułami za pomocą złączy quick lock.",
      position: { top: "30%", left: "28%" },
    },
    {
      id: "leg",
      label: "Stelaż stalowy",
      description: "Proszkowo malowana stal, wysokość 14 cm dla robotów sprzątających.",
      position: { top: "70%", left: "62%" },
    },
  ];

  return (
    <motion.div {...fadeInUp} className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-brand-sand">
        {heroImage && (
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        )}
        {hotspots.map((hotspot) => (
          <ProductHotspot key={hotspot.id} {...hotspot} />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image) => (
          <div
            key={image.src}
            className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-brand-sand"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ProductHotspot({ label, description, position }: HotspotPin) {
  return (
    <button
      type="button"
      className="group absolute flex items-center bg-transparent focus-visible:outline-none"
      style={{ top: position.top, left: position.left }}
      aria-label={`${label}: ${description}`}
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white/90 shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110">
        <span className="h-2 w-2 rounded-full bg-brand-gold" />
      </span>
      <div className="pointer-events-none absolute left-8 top-1/2 hidden w-60 -translate-y-1/2 rounded-xl bg-white p-4 text-sm text-brand-charcoal shadow-elevated transition-opacity duration-300 group-hover:block group-focus-visible:block">
        <p className="font-semibold">{label}</p>
        <p className="mt-1 text-xs text-neutral-600">{description}</p>
        <span className="absolute left-[-10px] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white" />
      </div>
    </button>
  );
}

type ProductSummaryProps = {
  product: MockProduct;
};

function ProductSummary({ product }: ProductSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-3xl border border-neutral-200 bg-white/95 p-10 shadow-soft"
    >
      <div className="flex flex-wrap items-center gap-3 text-sm text-brand-gold">
        {product.badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 font-semibold uppercase tracking-[0.25em]"
          >
            {badge}
          </span>
        ))}
      </div>
      <h1 className="mt-4 text-h1 text-brand-charcoal">{product.name}</h1>
      <p className="mt-3 text-body-standard">{product.description}</p>

      <div className="mt-6 flex flex-wrap items-baseline gap-3 border-y border-neutral-200 py-6">
        <span className="text-3xl font-semibold text-brand-charcoal">
          {formatCurrency(product.price, product.currency)}
        </span>
        {product.compareAtPrice && (
          <span className="text-lg text-neutral-600 line-through">
            {formatCurrency(product.compareAtPrice, product.currency)}
          </span>
        )}
        <span className="ml-auto text-sm text-neutral-600">
          Dostawa 21-30 dni · Ocena {product.rating.toFixed(1)} (
          {product.reviewCount})
        </span>
      </div>

      <section className="mt-6 space-y-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Wykończenia
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {product.fabrics.map((fabric) => (
              <button
                key={fabric.id}
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-brand-charcoal transition-all duration-200 hover:border-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                type="button"
              >
                <span
                  className="size-5 rounded-full border border-neutral-200"
                  style={{ backgroundColor: fabric.swatch }}
                />
                {fabric.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-brand-sand/80 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Wymiary
          </h3>
          <p className="mt-3 text-body-standard">
            {product.dimensions.w} × {product.dimensions.d} ×{" "}
            {product.dimensions.h} {product.dimensions.unit}
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button className="flex-1 min-w-[200px]">Dodaj do koszyka</Button>
        <Button variant="outline" className="flex-1 min-w-[200px]">
          Zamów próbki tkanin
        </Button>
        <IconButton aria-label="Dodaj do ulubionych">
          <Sparkles className="h-4 w-4" strokeWidth={1.5} />
        </IconButton>
      </div>

      <ul className="mt-8 space-y-3 text-sm text-brand-charcoal">
        <li className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
          Ręczne wykonanie w Polsce (kontrola jakości 3-stopniowa)
        </li>
        <li className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
          24 miesiące gwarancji + serwis premium
        </li>
        <li className="flex items-center gap-3">
          <Package2 className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
          Dostawa z wniesieniem i montażem — mock danych logistycznych
        </li>
      </ul>
    </motion.div>
  );
}

type MaterialPassportProps = {
  product: MockProduct;
};

function MaterialPassport({ product }: MaterialPassportProps) {
  return (
    <motion.div
      {...fadeInUp}
      className="rounded-3xl border border-neutral-200 bg-white/95 p-8 shadow-soft"
    >
      <header>
        <p className="text-label text-brand-gold">Material Passport</p>
        <h2 className="mt-3 text-h3 text-brand-charcoal">
          Paszport materiałowy {product.name.split(" ")[0]}
        </h2>
        <p className="mt-3 text-body-standard">
          Sekcja placeholder pokazująca strukturę danych dla materiałów,
          certyfikatów i instrukcji pielęgnacji. Docelowo zaciągane z CMS/API.
        </p>
      </header>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-brand-sand/80 p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Tkanina
          </dt>
          <dd className="mt-2 text-sm text-brand-charcoal">
            {product.fabrics.map((fabric) => fabric.name).join(", ")}
          </dd>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-brand-sand/80 p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Certyfikaty
          </dt>
          <dd className="mt-2 text-sm text-brand-charcoal">
            OEKO-TEX® · FSC® drewno · Emisja VOC A+
          </dd>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-brand-sand/80 p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Pielęgnacja
          </dt>
          <dd className="mt-2 text-sm text-brand-charcoal">
            Delikatne odkurzanie · Pranie chemiczne · Zestaw pielęgnacyjny
            (mock)
          </dd>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-brand-sand/80 p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Ślad węglowy
          </dt>
          <dd className="mt-2 text-sm text-brand-charcoal">
            Dane placeholder — zespół Działu B+R
          </dd>
        </div>
      </dl>
    </motion.div>
  );
}

function ConsultationForm() {
  return (
    <motion.div
      {...fadeInUp}
      className="rounded-3xl border border-neutral-200 bg-white/95 p-8 shadow-soft"
    >
      <p className="text-label text-brand-gold">Konsultacja</p>
      <h2 className="mt-3 text-h3 text-brand-charcoal">
        Umów rozmowę z projektantem
      </h2>
      <p className="mt-3 text-body-standard">
        Formularz wizualny — brak logiki. Pokaż klientowi, jakie dane zbierzemy
        przed personalizacją narożnika lub zestawu modularnego.
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <Input placeholder="Imię i nazwisko" aria-label="Imię i nazwisko" />
        <Input
          placeholder="Adres e-mail"
          type="email"
          aria-label="Adres e-mail"
        />
        <Input
          placeholder="Telefon kontaktowy"
          aria-label="Telefon kontaktowy"
        />
        <Textarea
          placeholder="Opisz przestrzeń lub oczekiwania"
          aria-label="Opis"
        />
        <Button className="w-full">Wyślij zgłoszenie (mock)</Button>
      </form>
    </motion.div>
  );
}

function FAQSection() {
  return (
    <motion.section
      {...fadeInUp}
      className="rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-soft"
    >
      <header>
        <p className="text-label text-brand-gold">FAQ (makieta)</p>
        <h2 className="mt-3 text-h3 text-brand-charcoal">
          Najczęstsze pytania klientów
        </h2>
        <p className="mt-3 text-body-standard">
          Rozpiska docelowego komponentu akordeonu (Radix). Aktualnie mock — bez
          zaplecza danych.
        </p>
      </header>
      <Accordion
        type="single"
        collapsible
        className="mt-6 space-y-4"
        defaultValue={faqItems[0]?.question}
      >
        {faqItems.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="text-left text-base font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-brand-charcoal/80">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
}
