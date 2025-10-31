"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Dziękujemy za zapis! Sprawdź swoją skrzynkę mailową.");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          {/* Card container */}
          <div className="rounded-2xl p-10 md:p-12 bg-gradient-to-br from-brand-charcoal to-brand-charcoal/95 border border-brand-sand-primary/20">
            {/* Heading */}
            <span className="text-label uppercase tracking-widest text-brand-sand-primary block text-center mb-4">
              Newsletter
            </span>
            <h2 className="text-h1 text-brand-cream mb-6 text-center">
              Dołącz do naszego klubu
            </h2>
            <p className="text-body-large text-brand-cream/80 mb-10 text-center leading-relaxed">
              Otrzymaj <span className="font-bold text-brand-sand-primary">-10%</span> na pierwsze zakupy oraz bądź na bieżąco z nowościami i specjalnymi ofertami
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                placeholder="Twój adres e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-14 text-base"
              />
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="sm:w-auto bg-stone-800 text-stone-100 hover:bg-stone-700 rounded-xl transition-transform"
              >
                {isLoading ? "Zapisywanie..." : "Zapisz się"}
              </Button>
            </form>

            <p className="text-xs text-brand-charcoal/60 mt-4 text-center">
              Zapisując się, akceptujesz naszą{" "}
              <a
                href="/privacy"
                className="underline hover:text-brand-sand-primary transition-colors"
              >
                Politykę Prywatności
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
