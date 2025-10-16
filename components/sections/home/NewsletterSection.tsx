'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Dziękujemy za zapis! Sprawdź swoją skrzynkę mailową.');
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-20 md:py-32 mesh-gradient-light relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-copper/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mx-auto"
        >
          {/* Glass card container */}
          <div className="glass-light rounded-3xl p-8 md:p-12 border-gradient-gold">
            {/* Heading */}
            <h3 className="text-h2 text-brand-charcoal mb-4 text-center">
              Dołącz do naszego klubu
            </h3>
            <p className="text-body-descriptive mb-8 text-center">
              Otrzymaj <span className="font-bold text-brand-gold">-10%</span> na pierwsze zakupy
              oraz bądź na bieżąco z nowościami i specjalnymi ofertami
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
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
                variant="primary"
                disabled={isLoading}
                className="sm:w-auto h-14 px-8 shimmer glow-gold hover:scale-105 transition-transform"
              >
                {isLoading ? 'Zapisywanie...' : 'Zapisz się'}
              </Button>
            </form>

            <p className="text-xs text-brand-charcoal/60 mt-4 text-center">
              Zapisując się, akceptujesz naszą{' '}
              <a href="/privacy" className="underline hover:text-brand-gold transition-colors">
                Politykę Prywatności
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
