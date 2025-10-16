import Image from "next/image";
import Link from "next/link";

import { getMockProducts } from "@/lib/data-adapters/mock";

export const metadata = {
  title: "Produkty (Mock) — Gawin-Home",
  description: "Lista przykładowych produktów do pracy nad layoutem i treścią.",
};

export default async function ProductsMockPage() {
  const products = await getMockProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Mock — Produkty</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const image = product.images[0];
          return (
            <Link
              key={product.id}
              href={`/mock/product/${product.slug}`}
              className="group overflow-hidden rounded-xl border border-[color:oklch(0.9_0_0)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-brand-sand text-sm text-brand-charcoal">
                    Brak zdjęcia
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="line-clamp-2 text-lg font-semibold text-brand-charcoal">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-[color:oklch(0.45_0_0)]">
                  {product.category}
                </p>
                <p className="mt-2 text-base font-medium text-brand-charcoal">
                  {new Intl.NumberFormat("pl-PL", {
                    style: "currency",
                    currency: product.currency,
                  }).format(product.price)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
