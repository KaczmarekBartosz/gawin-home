import Image from "next/image";
import Link from "next/link";
import { getMockProducts } from "@/lib/data-adapters/mock";

export async function FeaturedProducts() {
  const products = (await getMockProducts()).slice(0, 6);

  return (
    <section className="bg-neutral-50 py-14 text-neutral-900 dark:bg-neutral-100 dark:text-neutral-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Polecane produkty</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Wybrane pozycje do szybkiego projektowania kart i gridów.
            </p>
          </div>
          <Link
            href="/mock/products"
            className="text-sm underline hover:opacity-80"
          >
            Zobacz wszystkie
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/mock/product/${p.slug}`}
              className="group overflow-hidden rounded-xl border border-neutral-200 bg-white hover:shadow-md"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={p.images[0]?.src ?? ""}
                  alt={p.images[0]?.alt ?? p.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-lg font-semibold">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{p.category}</p>
                <p className="mt-2 text-base font-medium">
                  {new Intl.NumberFormat("pl-PL", {
                    style: "currency",
                    currency: p.currency,
                  }).format(p.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
