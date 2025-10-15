import Image from 'next/image';
import Link from 'next/link';
import { getMockProducts } from '@/lib/data-adapters/mock';

export const metadata = {
  title: 'Produkty (Mock) — Gawin-Home',
  description: 'Lista przykładowych produktów do pracy nad layoutem i treścią.'
};

export default async function ProductsMockPage() {
  const products = await getMockProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Mock — Produkty</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/mock/product/${p.slug}`}
            className="group overflow-hidden rounded-xl border border-neutral-200 bg-white hover:shadow-md dark:border-neutral-800 dark:bg-black"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={false}
              />
            </div>
            <div className="p-4">
              <h2 className="line-clamp-2 text-lg font-semibold">{p.title}</h2>
              <p className="mt-1 text-sm text-neutral-500">{p.category}</p>
              <p className="mt-2 text-base font-medium">
                {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: p.currency }).format(
                  p.price
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

