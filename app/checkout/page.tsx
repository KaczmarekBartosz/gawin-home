"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Check,
  CreditCard,
  Home,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { MockProduct } from "@/lib/data-adapters/mock";
import { formatCurrency } from "@/lib/utils";
import { fadeInUp } from "@/motion/presets";

import productsData from "@/mock/products.json";

const products = productsData as MockProduct[];
const orderLines = products.slice(0, 2);
const subtotal = orderLines.reduce(
  (total, product) => total + product.price,
  0,
);

export default function CheckoutPage() {
  const currency = orderLines[0]?.currency ?? "PLN";
  const deliveryCost = 0;
  const total = subtotal + deliveryCost;

  return (
    <Section tone="cream">
      <Container className="space-y-12">
        <motion.header {...fadeInUp} className="space-y-4">
          <p className="text-label text-brand-gold">Checkout — makieta</p>
          <h1 className="text-h1 text-brand-charcoal">
            Trzy kroki do finalizacji
          </h1>
          <p className="text-body-descriptive max-w-3xl">
            Układ przedstawia wizualną oś postępu, układy formularzy i sekcję
            podsumowania zamówienia. Wszystkie elementy są oparte na mockach —
            brak walidacji i realnej logiki.
          </p>
        </motion.header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-8">
            <Stepper />
            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, duration: 0.5 }}
              className="space-y-6 rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-soft"
            >
              <StepHeader
                icon={<Home className="h-4 w-4" strokeWidth={1.5} />}
                title="Krok 1 · Dane dostawy"
                description="Makieta formularza adresowego. Pola są statyczne."
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="Imię" aria-label="Imię" />
                <Input placeholder="Nazwisko" aria-label="Nazwisko" />
                <Input
                  placeholder="Adres e-mail"
                  type="email"
                  aria-label="Adres e-mail"
                />
                <Input
                  placeholder="Telefon kontaktowy"
                  aria-label="Telefon kontaktowy"
                />
                <Input
                  placeholder="Ulica i numer"
                  aria-label="Ulica i numer"
                  className="md:col-span-2"
                />
                <Input placeholder="Miasto" aria-label="Miasto" />
                <Input placeholder="Kod pocztowy" aria-label="Kod pocztowy" />
              </div>
              <Textarea
                placeholder="Uwagi dla kuriera / montażu (mock)"
                aria-label="Uwagi dla kuriera / montażu"
              />
              <div className="flex flex-wrap gap-3">
                <Button className="flex-1 min-w-[180px]">
                  Kontynuuj do płatności
                </Button>
                <Button
                  variant="ghost"
                  className="min-w-[180px] text-brand-charcoal"
                >
                  Wróć do koszyka
                </Button>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, duration: 0.5, delay: 0.1 }}
              className="space-y-6 rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-soft"
            >
              <StepHeader
                icon={<CreditCard className="h-4 w-4" strokeWidth={1.5} />}
                title="Krok 2 · Płatność (mock)"
                description="Placeholder opisu: w następnym sprincie podłączamy realne metody płatności."
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="Numer karty" aria-label="Numer karty" />
                <Input placeholder="MM/RR" aria-label="Data ważności" />
                <Input placeholder="CVV" aria-label="CVV" />
                <Input
                  placeholder="Imię i nazwisko posiadacza"
                  aria-label="Imię i nazwisko posiadacza"
                />
              </div>
              <Button variant="outline" className="w-full">
                Zastosuj płatność ratalną (mock funkcji)
              </Button>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, duration: 0.5, delay: 0.2 }}
              className="space-y-6 rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-soft"
            >
              <StepHeader
                icon={<PackageSearch className="h-4 w-4" strokeWidth={1.5} />}
                title="Krok 3 · Podsumowanie"
                description="Sekcja potwierdzenia z możliwością edycji danych — makieta."
              />
              <p className="text-sm text-neutral-600">
                Tutaj wyświetlimy recenzję zamówienia z możliwością powrotu do
                poprzednich kroków. W obecnej wersji to placeholder opisowy.
              </p>
              <div className="rounded-2xl bg-brand-sand p-4 text-sm text-brand-charcoal">
                <p>
                  <strong>Automatyczne zapisywanie</strong> — placeholder. UI
                  pokazuje, że dane są tymczasowo zachowane, ale logika pojawi
                  się w kolejnym sprincie.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.aside
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, duration: 0.6, delay: 0.15 }}
            className="space-y-6 rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-soft"
          >
            <div>
              <h2 className="text-h3 text-brand-charcoal">
                Podsumowanie zamówienia
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Produkty i ceny pochodzą z mocków JSON. W realnej wersji
                będziemy je pobierać z koszyka.
              </p>
            </div>
            <ul className="space-y-4">
              {orderLines.map((product) => (
                <li
                  key={product.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-medium text-brand-charcoal">
                      {product.name}
                    </p>
                    <p className="text-xs text-neutral-600">
                      {product.fabrics[0]?.name ?? "Wykończenie premium"}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-brand-charcoal">
                    {formatCurrency(product.price, product.currency)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-brand-charcoal">
              <div className="flex justify-between">
                <span>Suma</span>
                <span>{formatCurrency(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Dostawa</span>
                <span>
                  {deliveryCost === 0
                    ? "0 PLN (mock)"
                    : formatCurrency(deliveryCost, currency)}
                </span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-semibold">
                <span>Do zapłaty</span>
                <span>{formatCurrency(total, currency)}</span>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl bg-brand-sand/70 p-4 text-sm text-brand-charcoal">
              <div className="flex gap-3">
                <ShieldCheck
                  className="h-5 w-5 text-brand-gold"
                  strokeWidth={1.5}
                />
                <p>
                  Twoje dane są szyfrowane. To komunikat UI — brak realnej
                  integracji na tym etapie.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
                <p>
                  Po stronie backendu zaplanujemy walidację i webhooki — tutaj
                  tylko wskazówka.
                </p>
              </div>
            </div>

            <Button className="w-full" variant="gold">
              Finalizuj (makieta)
            </Button>
          </motion.aside>
        </div>
      </Container>
    </Section>
  );
}

function Stepper() {
  const steps = [
    { label: "Dostawa", description: "Dane klienta", status: "active" },
    { label: "Płatność", description: "Metoda i adres", status: "pending" },
    { label: "Podsumowanie", description: "Weryfikacja", status: "pending" },
  ] as const;

  return (
    <motion.div
      {...fadeInUp}
      className="grid gap-4 rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-soft md:grid-cols-3"
    >
      {steps.map((step, index) => (
        <div key={step.label} className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span
              className={cnStepCircle(
                step.status === "active"
                  ? "bg-brand-gold text-brand-charcoal"
                  : "bg-brand-sand text-brand-charcoal",
              )}
            >
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-charcoal">
                {step.label}
              </p>
              <p className="text-xs text-neutral-600">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

type StepHeaderProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function StepHeader({ icon, title, description }: StepHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
        {icon}
      </span>
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
          {title}
        </h2>
        <p className="text-xs text-neutral-600">{description}</p>
      </div>
    </div>
  );
}

function cnStepCircle(className: string) {
  return [
    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200",
    className,
  ].join(" ");
}
