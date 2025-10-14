import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Sofy i Fotele',
    count: 120,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    slug: 'sofy-fotele'
  },
  {
    id: 2,
    name: 'Stoły i Krzesła',
    count: 85,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
    slug: 'stoly-krzesla'
  },
  {
    id: 3,
    name: 'Sypialnia',
    count: 65,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80',
    slug: 'sypialnia'
  },
  {
    id: 4,
    name: 'Szafy i Komody',
    count: 95,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    slug: 'szafy-komody'
  },
  {
    id: 5,
    name: 'Oświetlenie',
    count: 45,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80',
    slug: 'oswietlenie'
  },
  {
    id: 6,
    name: 'Dekoracje',
    count: 150,
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80',
    slug: 'dekoracje'
  }
];

export function CategoriesShowcase() {
  return (
    <section className="bg-neutral-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h2 className="mb-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Przeglądaj{' '}
              <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                Kategorie
              </span>
            </h2>
            <p className="text-lg text-neutral-400">Znajdź idealne meble dla każdego pomieszczenia</p>
          </div>
          <Link
            href="/categories"
            className="group flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
          >
            Wszystkie kategorie
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <Card className="group relative h-80 overflow-hidden border-neutral-800 bg-neutral-900 transition-all hover:border-primary/40">
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-8">
                  <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm">
                    {category.count} produktów
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-primary">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-neutral-400 transition-all group-hover:gap-3 group-hover:text-primary">
                    Odkryj kolekcję
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
