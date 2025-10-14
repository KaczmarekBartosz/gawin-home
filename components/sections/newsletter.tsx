'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check } from 'lucide-react';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 px-8 py-16 sm:px-16 sm:py-20">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-400 blur-[120px]" />
          </div>

          {/* Content */}
          <div className="relative mx-auto max-w-2xl text-center">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Dołącz do naszej społeczności
            </h2>
            <p className="mb-8 text-lg text-neutral-400">
              Otrzymuj ekskluzywne oferty, inspiracje designerskie i pierwszeństwo dostępu do nowych
              kolekcji. Bez spamu, tylko wartościowe treści.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Twój adres e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-neutral-700 bg-neutral-900/50 pr-12 text-white placeholder:text-neutral-500 focus-visible:ring-primary"
                />
                {isSubmitted && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 bg-primary text-neutral-900 hover:bg-primary/90"
                disabled={isSubmitted}
              >
                {isSubmitted ? 'Zapisano!' : 'Zapisz się'}
              </Button>
            </form>

            {/* Privacy note */}
            <p className="mt-4 text-xs text-neutral-500">
              Zapisując się, akceptujesz naszą{' '}
              <a href="/privacy" className="underline hover:text-primary">
                Politykę Prywatności
              </a>
              . Możesz wypisać się w każdej chwili.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-neutral-600">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Bez spamu</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">100% bezpieczeństwo</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Możliwość rezygnacji</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
