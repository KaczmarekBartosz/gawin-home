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
import { Textarea } from "@/components/ui/textarea";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { fadeInUp } from "@/motion/presets";

import productsData from "@/mock/products.json";

const products = productsData as MockProduct[];
const heroProduct = products[0];
const recommended = products.slice(1, 4);

const formatPrice = (value: number, currency: string) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency }).format(value);

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
        <Container className="grid gap-8 lg:grid-cols-2">
          <MaterialPassport product={heroProduct} />
          <ConsultationForm />
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

  return (
    <motion.div {...fadeInUp} className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-sand">
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
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image) => (
          <div
            key={image.src}
            className="relative aspect-square overflow-hidden rounded-2xl bg-brand-sand"
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

type ProductSummaryProps = {
  product: MockProduct;
};

function ProductSummary({ product }: ProductSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-3xl border border-[color:oklch(0.9_0_0)] bg-white p-8 shadow-soft"
    >
      <div className="flex flex-wrap items-center gap-3 text-sm text-brand-gold">
        {product.badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full bg-[oklch(0.75_0.12_85_/_0.12)] px-3 py-1 font-semibold uppercase tracking-[0.25em]"
          >
            {badge}
          </span>
        ))}
      </div>
      <h1 className="mt-4 text-h1 text-brand-charcoal">{product.name}</h1>
      <p className="mt-3 text-body-standard">{product.description}</p>

      <div className="mt-6 flex flex-wrap items-baseline gap-3 border-y border-[color:oklch(0.9_0_0)] py-6">
        <span className="text-3xl font-semibold text-brand-charcoal">
          {formatPrice(product.price, product.currency)}
        </span>
        {product.compareAtPrice && (
          <span className="text-lg text-[color:oklch(0.45_0_0)] line-through">
            {formatPrice(product.compareAtPrice, product.currency)}
          </span>
        )}
        <span className="ml-auto text-sm text-[color:oklch(0.45_0_0)]">
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
                className="flex items-center gap-2 rounded-full border border-[color:oklch(0.9_0_0)] bg-white px-4 py-2 text-sm font-medium text-brand-charcoal transition-all duration-200 hover:border-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.75_0.12_85_/_0.45)]"
                type="button"
              >
                <span
                  className="size-5 rounded-full border border-[color:oklch(0.9_0_0)]"
                  style={{ backgroundColor: fabric.swatch }}
                />
                {fabric.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-brand-sand p-5">
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
      className="rounded-3xl border border-[color:oklch(0.9_0_0)] bg-white p-8 shadow-soft"
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
        <div className="rounded-2xl bg-brand-sand p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Tkanina
          </dt>
          <dd className="mt-2 text-sm text-brand-charcoal">
            {product.fabrics.map((fabric) => fabric.name).join(", ")}
          </dd>
        </div>
        <div className="rounded-2xl bg-brand-sand p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Certyfikaty
          </dt>
          <dd className="mt-2 text-sm text-brand-charcoal">
            OEKO-TEX® · FSC® drewno · Emisja VOC A+
          </dd>
        </div>
        <div className="rounded-2xl bg-brand-sand p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Pielęgnacja
          </dt>
          <dd className="mt-2 text-sm text-brand-charcoal">
            Delikatne odkurzanie · Pranie chemiczne · Zestaw pielęgnacyjny
            (mock)
          </dd>
        </div>
        <div className="rounded-2xl bg-brand-sand p-4">
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
      className="rounded-3xl border border-[color:oklch(0.9_0_0)] bg-white p-8 shadow-soft"
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
