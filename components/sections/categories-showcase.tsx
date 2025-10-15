import Image from 'next/image';
import Link from 'next/link';
import { getMockCategories, getMockProducts } from '@/lib/data-adapters/mock';

export async function CategoriesShowcase() {
  const [categories, products] = await Promise.all([getMockCategories(), getMockProducts()]);
  const cards = categories.map((c) => {
    const first = products.find((p) => p.category === c);
    return { category: c, image: first?.image, link: '/mock/products' };
  });

  return (
    <section className="bg-white py-14 dark:bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">Kategorie</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Szybki przegląd — do dalszego dopracowania filtrów i nawigacji.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cards.map((c) => (
            <Link
              key={c.category}
              href={c.link}
              className="group overflow-hidden rounded-xl border border-neutral-200 bg-white hover:shadow"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={c.image ?? 'https://picsum.photos/600'}
                  alt={c.category}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-3">
                <p className="text-center text-sm font-medium text-neutral-900">{c.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

