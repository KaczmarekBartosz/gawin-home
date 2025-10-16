"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { ProductCard } from "@/components/cards/product-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { fadeInUp } from "@/motion/presets";

import categoriesData from "@/mock/categories.json";
import productsData from "@/mock/products.json";

const products = productsData as MockProduct[];

const fabricFilters = ["Welur", "Len", "Skóra", "Bouclé"];
const toneFilters = ["Ciepłe", "Chłodne", "Neutralne"];
const badgeFilters = ["Nowość", "Bestseller", "Limitowana", "Eko"];

export default function ListingPage() {
  return (
    <Section tone="light" className="min-h-screen">
      <Container>
        <motion.header {...fadeInUp} className="max-w-3xl">
          <p className="text-label text-brand-gold">Showroom</p>
          <h1 className="mt-4 text-h1 text-brand-charcoal">
            Autorska kolekcja modularna
          </h1>
          <p className="mt-4 text-body-descriptive">
            Listing produktów w trybie Showroom skupia się na czytelności kart.
            Filtry po lewej są wizualne — bez logiki — i pokazują przyszły układ
            komponentów.
          </p>
        </motion.header>

        <div className="mt-16 grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-8 rounded-3xl border border-[color:oklch(0.9_0_0)] bg-brand-cream p-6 shadow-soft">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Wyszukaj
              </h2>
              <div className="mt-3">
                <Input
                  placeholder="np. sofa modułowa"
                  aria-label="Wyszukaj produkt"
                />
              </div>
            </div>

            <FilterGroup title="Kategorie">
              <div className="space-y-3">
                {categoriesData.map((category) => (
                  <FilterCheckbox
                    key={category.id}
                    id={category.slug}
                    label={category.name}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Materiały">
              <div className="space-y-3">
                {fabricFilters.map((fabric) => (
                  <FilterCheckbox key={fabric} id={fabric} label={fabric} />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Paleta">
              <div className="space-y-3">
                {toneFilters.map((tone) => (
                  <FilterCheckbox key={tone} id={tone} label={tone} />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Status produktu">
              <div className="space-y-3">
                {badgeFilters.map((badge) => (
                  <FilterCheckbox key={badge} id={badge} label={badge} />
                ))}
              </div>
            </FilterGroup>

            <div className="flex gap-3">
              <Button variant="gold" className="flex-1">
                Zastosuj
              </Button>
              <Button variant="outline" className="flex-1">
                Resetuj
              </Button>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[color:oklch(0.9_0_0)] bg-white p-4 shadow-soft">
              <p className="text-sm text-[color:oklch(0.45_0_0)]">
                Wyświetlane produkty korzystają z mocków JSON i pokazują
                docelowy layout kart.
              </p>
              <Button variant="ghost" className="gap-2 text-sm font-semibold">
                Sortowanie: rekomendowane
                <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </div>

            <motion.div
              layout
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  {...fadeInUp}
                  transition={{
                    ...fadeInUp.transition,
                    delay: index * 0.04,
                    duration: 0.4,
                  }}
                >
                  <ProductCard product={product} href="/pdp" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

type FilterGroupProps = {
  title: string;
  children: React.ReactNode;
};

function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
        {title}
      </h3>
      <div className="mt-4 space-y-3 text-sm text-brand-charcoal">
        {children}
      </div>
    </div>
  );
}

type FilterCheckboxProps = {
  id: string;
  label: string;
};

function FilterCheckbox({ id, label }: FilterCheckboxProps) {
  return (
    <label className="flex items-center gap-3 text-sm font-medium text-brand-charcoal">
      <Checkbox id={id} />
      <span>{label}</span>
    </label>
  );
}
