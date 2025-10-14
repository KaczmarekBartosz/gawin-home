import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data - will be replaced with real data later
const featuredProducts = [
  {
    id: 1,
    name: 'Skandynawska Sofa Nordic',
    category: 'Sofy',
    price: 4999,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    badge: 'Bestseller',
    isNew: false
  },
  {
    id: 2,
    name: 'Stół Dębowy Elegance',
    category: 'Stoły',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    badge: 'Nowy',
    isNew: true
  },
  {
    id: 3,
    name: 'Fotel Skórzany Premium',
    category: 'Fotele',
    price: 2799,
    originalPrice: 3299,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    badge: '-15%',
    isNew: false
  },
  {
    id: 4,
    name: 'Komoda Industrialna Loft',
    category: 'Komody',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    isNew: false
  }
];

export function FeaturedProducts() {
  return (
    <section className="bg-neutral-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Wyróżnione{' '}
            <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              Produkty
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            Starannie wyselekcjonowane meble, które zachwycają designem i jakością wykonania
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group relative overflow-hidden border-neutral-800 bg-neutral-800/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-neutral-800/80"
            >
              {/* Badge */}
              {product.badge && (
                <Badge
                  className={`absolute left-4 top-4 z-10 ${
                    product.isNew
                      ? 'bg-primary text-neutral-900'
                      : 'bg-neutral-900/80 text-primary backdrop-blur-sm'
                  }`}
                >
                  {product.badge}
                </Badge>
              )}

              {/* Quick actions */}
              <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-primary hover:text-neutral-900">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-primary hover:text-neutral-900">
                  <Eye className="h-5 w-5" />
                </button>
              </div>

              {/* Image */}
              <Link href={`/product/${product.id}`} className="relative block aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </Link>

              {/* Content */}
              <div className="p-6">
                <p className="mb-1 text-sm text-neutral-500">{product.category}</p>
                <Link href={`/product/${product.id}`}>
                  <h3 className="mb-3 text-lg font-semibold text-white transition-colors hover:text-primary">
                    {product.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString('pl-PL')} zł
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-500 line-through">
                      {product.originalPrice.toLocaleString('pl-PL')} zł
                    </span>
                  )}
                </div>

                {/* Add to cart button */}
                <Button className="w-full bg-primary text-neutral-900 hover:bg-primary/90" size="sm">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Do koszyka
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-neutral-700 bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/products">Zobacz wszystkie produkty</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
