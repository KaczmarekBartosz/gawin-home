"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Gift, Minus, Plus, Truck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { formatCurrency } from "@/lib/utils";
import { fadeInUp } from "@/motion/presets";

import productsData from "@/mock/products.json";

type CartLine = {
  product: MockProduct;
  quantity: number;
  variant: string;
};

const products = productsData as MockProduct[];
const cartLines: CartLine[] = [
  {
    product: products[0]!,
    quantity: 1,
    variant: "Welur obsydian · Lewy narożnik",
  },
  {
    product: products[6]!,
    quantity: 4,
    variant: "Welur korzenny · Zestaw 4 szt.",
  },
];

export default function CartPage() {
  const subtotal = cartLines.reduce(
    (acc, line) => acc + line.product.price * line.quantity,
    0,
  );
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <Section tone="light">
      <Container className="space-y-10">
        <motion.header {...fadeInUp} className="flex flex-col gap-4">
          <p className="text-label text-brand-gold">Koszyk (mock)</p>
          <h1 className="text-h1 text-brand-charcoal">Twoje zestawienie</h1>
          <p className="text-body-descriptive max-w-3xl">
            Makieta koszyka prezentuje układ modułów, kosztorys i elementy
            upsell. Brak realnej logiki zwiększania/zmniejszania — komponenty
            klikają się wizualnie.
          </p>
        </motion.header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, duration: 0.5 }}
            className="space-y-6"
          >
            {cartLines.map((line) => (
              <div
                key={line.product.id}
                className="grid gap-6 rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-soft md:grid-cols-[160px_1fr]"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-brand-sand/80">
                  <Image
                    src={line.product.images[0]?.src ?? ""}
                    alt={line.product.images[0]?.alt ?? line.product.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-brand-charcoal">
                      {line.product.name}
                    </h2>
                    <p className="text-sm text-neutral-600">{line.variant}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-brand-charcoal">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 p-0"
                        aria-label="Zmniejsz"
                      >
                        <Minus className="h-4 w-4" strokeWidth={1.5} />
                      </Button>
                      <span className="min-w-[2ch] text-center">
                        {line.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 p-0"
                        aria-label="Zwiększ"
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      </Button>
                    </div>
                    <p className="text-lg font-semibold text-brand-charcoal">
                      {formatCurrency(
                        line.product.price * line.quantity,
                        line.product.currency,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-3xl border border-neutral-200 bg-brand-cream p-6 shadow-soft">
              <div className="flex items-center gap-3 text-sm text-brand-charcoal">
                <Truck className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
                Darmowa dostawa i wniesienie dla zamówień powyżej 5000 PLN. Czas
                realizacji: 21-30 dni (mock danych logistycznych).
              </div>
            </div>
          </motion.div>

          <motion.aside
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, duration: 0.6, delay: 0.1 }}
            className="space-y-6 rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-soft"
          >
            <div className="space-y-4">
              <h2 className="text-h3 text-brand-charcoal">Podsumowanie</h2>
              <div className="flex items-center justify-between text-sm text-brand-charcoal">
                <span>Suma</span>
                <span>{formatCurrency(subtotal, heroCurrency())}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-brand-charcoal">
                <span>Dostawa</span>
                <span>
                  {shipping === 0
                    ? "0 PLN (mock)"
                    : formatCurrency(shipping, heroCurrency())}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 pt-4 text-base font-semibold text-brand-charcoal">
                <span>Łącznie</span>
                <span>{formatCurrency(total, heroCurrency())}</span>
              </div>
              <Button className="w-full" asChild>
                <a href="/checkout">Przejdź do checkoutu</a>
              </Button>
            </div>

            <div className="rounded-2xl bg-brand-sand/60 p-4">
              <div className="flex items-start gap-3">
                <Gift className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
                <div className="space-y-2 text-sm text-brand-charcoal">
                  <p className="font-semibold uppercase tracking-[0.25em]">
                    Kod rabatowy
                  </p>
                  <Input
                    placeholder="Wpisz kod (mock)"
                    aria-label="Kod rabatowy"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Notatka dla projektanta
              </h3>
              <Input placeholder="Uwagi do dostawy / montażu (mock)" />
            </div>

            <div className="space-y-3 text-xs text-neutral-600">
              <p>
                To widok makiety — brak realnych obliczeń i walidacji. Pokazuje
                strukturę przyszłej implementacji.
              </p>
              <p>
                Kliknięcie w CTA przeniesie do `/checkout`, gdzie zaprezentowane
                jest flow 3-krokowe z osią postępu.
              </p>
            </div>
          </motion.aside>
        </div>
      </Container>
    </Section>
  );
}

function heroCurrency() {
  return cartLines[0]?.product.currency ?? "PLN";
}
