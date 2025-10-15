import { HeroWellness } from 'components/sections/hero-wellness';
import { ProductCardWellness } from 'components/product/product-card-wellness';
import { CircularProgress } from 'components/ui/circular-progress';

// Mock product data
const mockProduct = {
  id: '1',
  handle: 'ergonomic-chair',
  title: 'Ergonomiczny Fotel Biurowy',
  description: 'Idealny dla długich godzin pracy',
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
    altText: 'Ergonomic office chair',
  },
  priceRange: {
    minVariantPrice: {
      amount: '1299',
      currencyCode: 'PLN',
    },
  },
  variants: {
    edges: [],
  },
  availableForSale: true,
  seo: {
    title: 'Ergonomiczny Fotel Biurowy',
    description: 'Idealny dla długich godzin pracy',
  },
};

export const metadata = {
  title: 'Wellness Tech Demo — Gawin Home',
  description: 'Demonstracja stylu wizualnego Wellness Tech',
};

export default function WellnessDemoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroWellness />

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Wyróżnione produkty
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Każdy produkt oceniany przez pryzmat komfortu, trwałości i ekologii
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCardWellness product={mockProduct} />
            <ProductCardWellness
              product={{
                ...mockProduct,
                title: 'Biurko Regulowane',
                handle: 'adjustable-desk',
              }}
            />
            <ProductCardWellness
              product={{
                ...mockProduct,
                title: 'Lampa LED Biurkowa',
                handle: 'led-desk-lamp',
              }}
            />
          </div>
        </div>
      </section>

      {/* Components Showcase */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Komponenty UI - Wellness Tech
          </h2>

          {/* Circular Progress Examples */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Circular Progress Indicators
            </h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 p-8 bg-card rounded-lg border border-border">
              <CircularProgress value={95} variant="accent" size="lg" label="Wysoki" />
              <CircularProgress value={78} variant="blue" size="lg" label="Średni" />
              <CircularProgress value={45} variant="green" size="lg" label="Niski" />
              <CircularProgress value={100} variant="accent" size="lg" label="Maksymalny" />
            </div>

            <div className="mt-8 p-8 bg-card rounded-lg border border-border">
              <h4 className="text-lg font-semibold text-foreground mb-4">Rozmiary</h4>
              <div className="flex gap-8 items-end">
                <CircularProgress value={85} variant="accent" size="sm" label="Small" />
                <CircularProgress value={85} variant="accent" size="md" label="Medium" />
                <CircularProgress value={85} variant="accent" size="lg" label="Large" />
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="max-w-4xl mx-auto mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">Paleta kolorów</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-card rounded-lg border border-border space-y-3">
                <div className="h-20 rounded-lg bg-[rgb(var(--accent))]" />
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">Accent (Orange)</p>
                  <p className="text-sm text-muted-foreground">Prices, CTA, Energy</p>
                </div>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border space-y-3">
                <div className="h-20 rounded-lg bg-[rgb(var(--accent-blue))]" />
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">Accent Blue</p>
                  <p className="text-sm text-muted-foreground">Info, Availability</p>
                </div>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border space-y-3">
                <div className="h-20 rounded-lg bg-[rgb(var(--accent-green))]" />
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">Accent Green</p>
                  <p className="text-sm text-muted-foreground">Success, Eco</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
