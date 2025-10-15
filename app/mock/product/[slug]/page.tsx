import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMockProductBySlug } from '@/lib/data-adapters/mock';

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }) {
  const product = await getMockProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.title} — Gawin-Home (Mock)`,
    description: product.description ?? undefined
  };
}

export default async function ProductMockPage({ params }: { params: Params }) {
  const product = await getMockProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-neutral-500">{product.category}</p>
          <p className="mt-4 text-2xl font-semibold">
            {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: product.currency }).format(
              product.price
            )}
          </p>
          {product.description ? (
            <p className="mt-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
              {product.description}
            </p>
          ) : null}
          <div className="mt-8 flex gap-3">
            <button className="rounded-xl bg-black px-6 py-3 text-white hover:opacity-90 dark:bg-white dark:text-black">
              Dodaj do koszyka (mock)
            </button>
            <button className="rounded-xl border border-neutral-300 px-6 py-3 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
              Zapytaj o produkt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

