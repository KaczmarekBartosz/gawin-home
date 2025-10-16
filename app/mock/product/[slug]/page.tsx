import Image from "next/image";
import { notFound } from "next/navigation";

import { getMockProductBySlug } from "@/lib/data-adapters/mock";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getMockProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Gawin-Home (Mock)`,
    description: product.description ?? undefined,
  };
}

export default async function ProductMockPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getMockProductBySlug(slug);
  if (!product) return notFound();

  const heroImage = product.images[0];
  const gallery = product.images.slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-brand-sand">
            {heroImage && (
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            )}
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-square overflow-hidden rounded-xl bg-brand-sand"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-[oklch(0.75_0.12_85_/_0.15)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-4xl font-bold text-brand-charcoal">
              {product.name}
            </h1>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-brand-gold">
              {product.category}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:oklch(0.45_0_0)]">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-4 border-t border-[color:oklch(0.9_0_0)] pt-4">
            <p className="text-3xl font-semibold text-brand-charcoal">
              {new Intl.NumberFormat("pl-PL", {
                style: "currency",
                currency: product.currency,
              }).format(product.price)}
            </p>
            {product.compareAtPrice && (
              <p className="text-lg text-[color:oklch(0.45_0_0)] line-through">
                {new Intl.NumberFormat("pl-PL", {
                  style: "currency",
                  currency: product.currency,
                }).format(product.compareAtPrice)}
              </p>
            )}
            <p className="ml-auto text-sm text-[color:oklch(0.45_0_0)]">
              Ocena {product.rating.toFixed(1)} · {product.reviewCount} opinii
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">
              Dostępne wykończenia
            </h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.fabrics.map((fabric) => (
                <div key={fabric.id} className="flex items-center gap-2">
                  <span
                    className="size-8 rounded-full border border-[color:oklch(0.9_0_0)] shadow-sm"
                    style={{ backgroundColor: fabric.swatch }}
                  />
                  <span className="text-sm text-brand-charcoal">
                    {fabric.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-brand-sand p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">
              Wymiary
            </h3>
            <p className="mt-3 text-base text-brand-charcoal">
              Szerokość: {product.dimensions.w} {product.dimensions.unit} ·
              Głębokość: {product.dimensions.d} {product.dimensions.unit} ·
              Wysokość: {product.dimensions.h} {product.dimensions.unit}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl bg-gradient-gold px-6 py-3 font-semibold text-brand-charcoal transition-transform duration-200 hover:scale-[1.01]">
              Dodaj do koszyka (mock)
            </button>
            <button className="rounded-xl border border-brand-gold px-6 py-3 font-semibold text-brand-gold transition-colors duration-200 hover:bg-[oklch(0.75_0.12_85_/_0.12)]">
              Zapytaj o produkt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
