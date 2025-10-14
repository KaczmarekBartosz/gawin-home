import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
        {/* Small badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          Nowa Kolekcja 2025
        </div>

        {/* Main heading */}
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Meble, które{' '}
          <span className="bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent">
            tworzą dom
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-neutral-300 sm:text-xl">
          Odkryj kolekcję premium mebli, które łączą ponadczasową elegancję z nowoczesnym designem.
          Każdy mebel to historia, każde wnętrze to dzieło sztuki.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-primary text-neutral-900 hover:bg-primary/90"
          >
            <Link href="/products">
              Zobacz kolekcję
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-neutral-600 bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/categories">Przeglądaj kategorie</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 sm:mt-20 sm:grid-cols-4">
          {[
            { value: '500+', label: 'Produktów' },
            { value: '50+', label: 'Marek' },
            { value: '10k+', label: 'Klientów' },
            { value: '4.9', label: 'Ocena' }
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-12 w-8 items-start justify-center rounded-full border-2 border-neutral-600 p-2">
          <div className="h-2 w-1 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
