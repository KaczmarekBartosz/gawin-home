# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage
.playwright

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env*
!.env.example

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
.env*.local

```

# .vscode\launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "pnpm dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "pnpm dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}

```

# .vscode\settings.json

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "explicit",
    "source.sortMembers": "explicit"
  }
}

```

# app\[page]\layout.tsx

```tsx
import Footer from 'components/layout/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">
        <div className="mx-8 max-w-2xl py-20 sm:mx-auto">{children}</div>
      </div>
      <Footer />
    </>
  );
}

```

# app\[page]\opengraph-image.tsx

```tsx
import OpengraphImage from 'components/opengraph-image';
import { getPage } from 'lib/shopify';

export default async function Image({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}

```

# app\[page]\page.tsx

```tsx
import type { Metadata } from 'next';

import Prose from 'components/prose';
import { getPage } from 'lib/shopify';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(page.updatedAt))}.`}
      </p>
    </>
  );
}

```

# app\api\revalidate\route.ts

```ts
import { revalidate } from 'lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}

```

# app\error.tsx

```tsx
'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
      <h2 className="text-xl font-bold">Oh no!</h2>
      <p className="my-2">
        There was an issue with our storefront. This could be a temporary issue, please try your
        action again.
      </p>
      <button
        className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}

```

# app\favicon.ico

This is a binary file of the type: Binary

# app\globals.css

```css
@import 'tailwindcss';
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@plugin "@tailwindcss/container-queries";
@plugin "@tailwindcss/typography";

@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}

@supports (font: -apple-system-body) and (-webkit-appearance: none) {
  img[loading='lazy'] {
    clip-path: inset(0.6px);
  }
}

a,
input,
button {
  @apply focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-900;
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  /* Gawin-Home Custom Radius (rounded-xl for buttons) */
  --radius: 1.5rem; /* 24px - rounded-xl */

  /* Light Showroom Theme (Product pages) */
  --background: oklch(1 0 0); /* #ffffff */
  --foreground: oklch(0.145 0 0); /* #1a1a1a */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);

  /* Gold Primary (Premium accent) */
  --primary: oklch(0.75 0.12 85); /* Gold #d4af37 */
  --primary-foreground: oklch(0.145 0 0); /* Dark text on gold */

  --secondary: oklch(0.97 0 0); /* Light gray */
  --secondary-foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.145 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0); /* #e5e5e5 */
  --input: oklch(0.922 0 0);
  --ring: oklch(0.75 0.12 85); /* Gold ring for focus */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.75 0.12 85); /* Gold */
  --sidebar-primary-foreground: oklch(0.145 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.145 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.75 0.12 85);
}

.dark {
  /* Dark Entry Theme (Homepage - Premium dark background) */
  --background: oklch(0.145 0 0); /* #1a1a1a - Dark graphite */
  --foreground: oklch(0.985 0 0); /* #f5f5f5 - Light text */
  --card: oklch(0.205 0 0); /* #252525 - Dark surface */
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);

  /* Gold Primary (Premium accent) */
  --primary: oklch(0.75 0.12 85); /* Gold #d4af37 */
  --primary-foreground: oklch(0.145 0 0); /* Dark text on gold */

  --secondary: oklch(0.269 0 0); /* Lighter dark surface */
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0); /* Muted text #a0a0a0 */
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%); /* Subtle border */
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.75 0.12 85); /* Gold ring for focus */
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.75 0.12 85); /* Gold */
  --sidebar-primary-foreground: oklch(0.145 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.75 0.12 85);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

# app\layout.tsx

```tsx
import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { WelcomeToast } from 'components/welcome-toast';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { baseUrl } from 'lib/utils';

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}

```

# app\opengraph-image.tsx

```tsx
import OpengraphImage from 'components/opengraph-image';

export default async function Image() {
  return await OpengraphImage();
}

```

# app\page.tsx

```tsx
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { CategoriesShowcase } from '@/components/sections/categories-showcase';
import { Newsletter } from '@/components/sections/newsletter';
import Footer from 'components/layout/footer';

export const metadata = {
  title: 'Gawin-Home - Premium Meble i Wyposażenie Wnętrz',
  description:
    'Odkryj kolekcję premium mebli, które łączą ponadczasową elegancję z nowoczesnym designem. Meble, które tworzą dom.',
  openGraph: {
    type: 'website',
    title: 'Gawin-Home - Premium Meble i Wyposażenie Wnętrz',
    description:
      'Odkryj kolekcję premium mebli, które łączą ponadczasową elegancję z nowoczesnym designem.'
  }
};

export default function HomePage() {
  return (
    <div className="dark">
      <HeroSection />
      <FeaturedProducts />
      <CategoriesShowcase />
      <Newsletter />
      <Footer />
    </div>
  );
}

```

# app\product\[handle]\page.tsx

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Image } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
        <RelatedProducts id={product.id} />
      </div>
      <Footer />
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

```

# app\robots.ts

```ts
import { baseUrl } from 'lib/utils';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*'
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}

```

# app\search\[collection]\opengraph-image.tsx

```tsx
import OpengraphImage from 'components/opengraph-image';
import { getCollection } from 'lib/shopify';

export default async function Image({
  params
}: {
  params: { collection: string };
}) {
  const collection = await getCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}

```

# app\search\[collection]\page.tsx

```tsx
import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}

```

# app\search\children-wrapper.tsx

```tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';

// Ensure children are re-rendered when the search query changes
export default function ChildrenWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  return <Fragment key={searchParams.get('q')}>{children}</Fragment>;
}

```

# app\search\layout.tsx

```tsx
import Footer from 'components/layout/footer';
import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import ChildrenWrapper from './children-wrapper';
import { Suspense } from 'react';

export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      <Footer />
    </>
  );
}

```

# app\search\loading.tsx

```tsx
import Grid from 'components/grid';

export default function Loading() {
  return (
    <>
      <div className="mb-4 h-6" />
      <Grid className="grid-cols-2 lg:grid-cols-3">
        {Array(12)
          .fill(0)
          .map((_, index) => {
            return (
              <Grid.Item key={index} className="animate-pulse bg-neutral-100 dark:bg-neutral-800" />
            );
          })}
      </Grid>
    </>
  );
}

```

# app\search\page.tsx

```tsx
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}

```

# app\sitemap.ts

```ts
import { getCollections, getPages, getProducts } from 'lib/shopify';
import { baseUrl, validateEnvironmentVariables } from 'lib/utils';
import { MetadataRoute } from 'next';

type Route = {
  url: string;
  lastModified: string;
};

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt
    }))
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/${page.handle}`,
      lastModified: page.updatedAt
    }))
  );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}

```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}

```

# components\carousel.tsx

```tsx
import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

```

# components\cart\actions.ts

```ts
'use server';

import { TAGS } from 'lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return 'Error adding item to cart';
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return 'Error updating item quantity';
  }
}

export async function redirectToCheckout() {
  let cart = await getCart();
  redirect(cart!.checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set('cartId', cart.id!);
}

```

# components\cart\add-to-cart.tsx

```tsx
'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

```

# components\cart\cart-context.tsx

```tsx
'use client';

import type {
  Cart,
  CartItem,
  Product,
  ProductVariant
} from 'lib/shopify/types';
import React, {
  createContext,
  use,
  useContext,
  useMemo,
  useOptimistic
} from 'react';

type UpdateType = 'plus' | 'minus' | 'delete';

type CartAction =
  | {
      type: 'UPDATE_ITEM';
      payload: { merchandiseId: string; updateType: UpdateType };
    }
  | {
      type: 'ADD_ITEM';
      payload: { variant: ProductVariant; product: Product };
    };

type CartContextType = {
  cartPromise: Promise<Cart | undefined>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType === 'delete') return null;

  const newQuantity =
    updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString()
  );

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount
      }
    }
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const totalAmount = calculateItemCost(quantity, variant.price.amount);

  return {
    id: existingItem?.id,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode
      }
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage
      }
    }
  };
}

function updateCartTotals(
  lines: CartItem[]
): Pick<Cart, 'totalQuantity' | 'cost'> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? 'USD';

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: '0', currencyCode }
    }
  };
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: '',
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'USD' },
      totalAmount: { amount: '0', currencyCode: 'USD' },
      totalTaxAmount: { amount: '0', currencyCode: 'USD' }
    }
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case 'UPDATE_ITEM': {
      const { merchandiseId, updateType } = action.payload;
      const updatedLines = currentCart.lines
        .map((item) =>
          item.merchandise.id === merchandiseId
            ? updateCartItem(item, updateType)
            : item
        )
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return {
          ...currentCart,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...currentCart.cost,
            totalAmount: { ...currentCart.cost.totalAmount, amount: '0' }
          }
        };
      }

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines
      };
    }
    case 'ADD_ITEM': {
      const { variant, product } = action.payload;
      const existingItem = currentCart.lines.find(
        (item) => item.merchandise.id === variant.id
      );
      const updatedItem = createOrUpdateCartItem(
        existingItem,
        variant,
        product
      );

      const updatedLines = existingItem
        ? currentCart.lines.map((item) =>
            item.merchandise.id === variant.id ? updatedItem : item
          )
        : [...currentCart.lines, updatedItem];

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines
      };
    }
    default:
      return currentCart;
  }
}

export function CartProvider({
  children,
  cartPromise
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  return (
    <CartContext.Provider value={{ cartPromise }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const initialCart = use(context.cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer
  );

  const updateCartItem = (merchandiseId: string, updateType: UpdateType) => {
    updateOptimisticCart({
      type: 'UPDATE_ITEM',
      payload: { merchandiseId, updateType }
    });
  };

  const addCartItem = (variant: ProductVariant, product: Product) => {
    updateOptimisticCart({ type: 'ADD_ITEM', payload: { variant, product } });
  };

  return useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem
    }),
    [optimisticCart]
  );
}

```

# components\cart\delete-item-button.tsx

```tsx
'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { removeItem } from 'components/cart/actions';
import type { CartItem } from 'lib/shopify/types';
import { useActionState } from 'react';

export function DeleteItemButton({
  item,
  optimisticUpdate
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(removeItem, null);
  const merchandiseId = item.merchandise.id;
  const removeItemAction = formAction.bind(null, merchandiseId);

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, 'delete');
        removeItemAction();
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

```

# components\cart\edit-item-quantity-button.tsx

```tsx
'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { updateItemQuantity } from 'components/cart/actions';
import type { CartItem } from 'lib/shopify/types';
import { useActionState } from 'react';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  return (
    <button
      type="submit"
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus'
        }
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate
}: {
  item: CartItem;
  type: 'plus' | 'minus';
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };
  const updateItemQuantityAction = formAction.bind(null, payload);

  return (
    <form
      action={async () => {
        optimisticUpdate(payload.merchandiseId, type);
        updateItemQuantityAction();
      }}
    >
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

```

# components\cart\modal.tsx

```tsx
'use client';

import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createCartAndSetCookie, redirectToCheckout } from './actions';
import { useCart } from './cart-context';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="grow overflow-auto py-4">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title
                        )
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          }
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams)
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-40 -ml-1 -mt-2">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                              <div className="flex flex-row">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                  <Image
                                    className="h-full w-full object-cover"
                                    width={64}
                                    height={64}
                                    alt={
                                      item.merchandise.product.featuredImage
                                        .altText ||
                                      item.merchandise.product.title
                                    }
                                    src={
                                      item.merchandise.product.featuredImage.url
                                    }
                                  />
                                </div>
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="z-30 ml-2 flex flex-row space-x-4"
                                >
                                  <div className="flex flex-1 flex-col text-base">
                                    <span className="leading-tight">
                                      {item.merchandise.product.title}
                                    </span>
                                    {item.merchandise.title !==
                                    DEFAULT_OPTION ? (
                                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        {item.merchandise.title}
                                      </p>
                                    ) : null}
                                  </div>
                                </Link>
                              </div>
                              <div className="flex h-16 flex-col justify-between">
                                <Price
                                  className="flex justify-end space-y-2 text-right text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <form action={redirectToCheckout}>
                    <CheckoutButton />
                  </form>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <XMarkIcon
        className={clsx(
          'h-6 transition-all ease-in-out hover:scale-110',
          className
        )}
      />
    </div>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
    </button>
  );
}

```

# components\cart\open-cart.tsx

```tsx
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <ShoppingCartIcon
        className={clsx('h-4 transition-all ease-in-out hover:scale-110', className)}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}

```

# components\grid\index.tsx

```tsx
import clsx from 'clsx';

function Grid(props: React.ComponentProps<'ul'>) {
  return (
    <ul {...props} className={clsx('grid grid-flow-row gap-4', props.className)}>
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<'li'>) {
  return (
    <li {...props} className={clsx('aspect-square transition-opacity', props.className)}>
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;

export default Grid;

```

# components\grid\three-items.tsx

```tsx
import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}

```

# components\grid\tile.tsx

```tsx
import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          relative: label,
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}

```

# components\icons\logo.tsx

```tsx
import clsx from 'clsx';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 32 28"
      {...props}
      className={clsx('h-4 w-4 fill-black dark:fill-white', props.className)}
    >
      <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z" />
      <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z" />
    </svg>
  );
}

```

# components\label.tsx

```tsx
import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">{title}</h3>
        <Price
          className="flex-none rounded-full bg-blue-600 p-2 text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;

```

# components\layout\footer-menu.tsx

```tsx
'use client';

import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FooterMenuItem({ item }: { item: Menu }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item: Menu) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}

```

# components\layout\footer.tsx

```tsx
import Link from 'next/link';

import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        <div className="md:ml-auto">
          <a
            className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white"
            aria-label="Deploy on Vercel"
            href="https://vercel.com/templates/next.js/nextjs-commerce"
          >
            <span className="px-3">▲</span>
            <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
            <span className="px-3">Deploy</span>
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>
            <a href="https://github.com/vercel/commerce">View the source</a>
          </p>
          <p className="md:ml-auto">
            <a href="https://vercel.com" className="text-black dark:text-white">
              Created by ▲ Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

```

# components\layout\navbar\index.tsx

```tsx
import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}

```

# components\layout\navbar\mobile-menu.tsx

```tsx
'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu } from 'lib/shopify/types';
import Search, { SearchSkeleton } from './search';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-4 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>
                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu) => (
                      <li
                        className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                        key={item.title}
                      >
                        <Link href={item.path} prefetch={true} onClick={closeMobileMenu}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

```

# components\layout\navbar\search.tsx

```tsx
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}

```

# components\layout\product-grid-items.tsx

```tsx
import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.handle}`}
            prefetch={true}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}

```

# components\layout\search\collections.tsx

```tsx
import clsx from 'clsx';
import { Suspense } from 'react';

import { getCollections } from 'lib/shopify';
import FilterList from './filter';

async function CollectionList() {
  const collections = await getCollections();
  return <FilterList list={collections} title="Collections" />;
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded-sm';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}

```

# components\layout\search\filter\dropdown.tsx

```tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { ListItem } from '.';
import { FilterItem } from './item';

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ('path' in listItem && pathname === listItem.path) ||
        ('slug' in listItem && searchParams.get('sort') === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        className="flex w-full items-center justify-between rounded-sm border border-black/30 px-4 py-2 text-sm dark:border-white/30"
      >
        <div>{active}</div>
        <ChevronDownIcon className="h-4" />
      </div>
      {openSelect && (
        <div
          onClick={() => {
            setOpenSelect(false);
          }}
          className="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black"
        >
          {list.map((item: ListItem, i) => (
            <FilterItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

```

# components\layout\search\filter\index.tsx

```tsx
import { SortFilterItem } from 'lib/constants';
import { Suspense } from 'react';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <>
      <nav>
        {title ? (
          <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
            {title}
          </h3>
        ) : null}
        <ul className="hidden md:block">
          <Suspense fallback={null}>
            <FilterItemList list={list} />
          </Suspense>
        </ul>
        <ul className="md:hidden">
          <Suspense fallback={null}>
            <FilterItemDropdown list={list} />
          </Suspense>
        </ul>
      </nav>
    </>
  );
}

```

# components\layout\search\filter\item.tsx

```tsx
'use client';

import clsx from 'clsx';
import type { SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ListItem, PathFilterItem } from '.';

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? 'p' : Link;

  newParams.delete('q');

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.title}>
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={clsx(
          'w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100',
          {
            'underline underline-offset-4': active
          }
        )}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item.slug;
  const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug })
    })
  );
  const DynamicTag = active ? 'p' : Link;

  return (
    <li className="mt-2 flex text-sm text-black dark:text-white" key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx('w-full hover:underline hover:underline-offset-4', {
          'underline underline-offset-4': active
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? <PathFilterItem item={item} /> : <SortFilterItem item={item} />;
}

```

# components\loading-dots.tsx

```tsx
import clsx from 'clsx';

const dots = 'mx-[1px] inline-block h-1 w-1 animate-blink rounded-md';

const LoadingDots = ({ className }: { className: string }) => {
  return (
    <span className="mx-2 inline-flex items-center">
      <span className={clsx(dots, className)} />
      <span className={clsx(dots, 'animation-delay-[200ms]', className)} />
      <span className={clsx(dots, 'animation-delay-[400ms]', className)} />
    </span>
  );
};

export default LoadingDots;

```

# components\logo-square.tsx

```tsx
import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black',
        {
          'h-[40px] w-[40px] rounded-xl': !size,
          'h-[30px] w-[30px] rounded-lg': size === 'sm'
        }
      )}
    >
      <LogoIcon
        className={clsx({
          'h-[16px] w-[16px]': !size,
          'h-[10px] w-[10px]': size === 'sm'
        })}
      />
    </div>
  );
}

```

# components\opengraph-image.tsx

```tsx
import { ImageResponse } from 'next/og';
import LogoIcon from './icons/logo';
import { join } from 'path';
import { readFile } from 'fs/promises';

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };

  const file = await readFile(join(process.cwd(), './fonts/Inter-Bold.ttf'));
  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" fill="white" />
        </div>
        <p tw="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: font,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}

```

# components\price.tsx

```tsx
import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount))}`}
    <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
  </p>
);

export default Price;

```

# components\product\gallery.tsx

```tsx
'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import Image from 'next/image';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <form>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-20 w-20">
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                  }}
                  aria-label="Select product image"
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}

```

# components\product\product-context.tsx

```tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useMemo, useOptimistic } from 'react';

type ProductState = {
  [key: string]: string;
} & {
  image?: string;
};

type ProductContextType = {
  state: ProductState;
  updateOption: (name: string, value: string) => ProductState;
  updateImage: (index: string) => ProductState;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update
    })
  );

  const updateOption = (name: string, value: string) => {
    const newState = { [name]: value };
    setOptimisticState(newState);
    return { ...state, ...newState };
  };

  const updateImage = (index: string) => {
    const newState = { image: index };
    setOptimisticState(newState);
    return { ...state, ...newState };
  };

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage
    }),
    [state]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}

```

# components\product\product-description.tsx

```tsx
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
    </>
  );
}

```

# components\product\variant-selector.tsx

```tsx
'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/shopify/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            // Base option params on current selectedOptions so we can preserve any other param state.
            const optionParams = { ...state, [optionNameLowerCase]: value };

            // Filter out invalid options and check if the option combination is available for sale.
            const filtered = Object.entries(optionParams).filter(([key, value]) =>
              options.find(
                (option) => option.name.toLowerCase() === key && option.values.includes(value)
              )
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) => combination[key] === value && combination.availableForSale
              )
            );

            // The option is active if it's in the selected options.
            const isActive = state[optionNameLowerCase] === value;

            return (
              <button
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateURL(newState);
                }}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                className={clsx(
                  'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                  {
                    'cursor-default ring-2 ring-blue-600': isActive,
                    'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600':
                      !isActive && isAvailableForSale,
                    'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 dark:before:bg-neutral-700':
                      !isAvailableForSale
                  }
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}

```

# components\prose.tsx

```tsx
import clsx from 'clsx';

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        'prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline prose-a:hover:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;

```

# components\sections\categories-showcase.tsx

```tsx
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

```

# components\sections\featured-products.tsx

```tsx
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

```

# components\sections\hero-section.tsx

```tsx
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

```

# components\sections\newsletter.tsx

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check } from 'lucide-react';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 px-8 py-16 sm:px-16 sm:py-20">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-400 blur-[120px]" />
          </div>

          {/* Content */}
          <div className="relative mx-auto max-w-2xl text-center">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Dołącz do naszej społeczności
            </h2>
            <p className="mb-8 text-lg text-neutral-400">
              Otrzymuj ekskluzywne oferty, inspiracje designerskie i pierwszeństwo dostępu do nowych
              kolekcji. Bez spamu, tylko wartościowe treści.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Twój adres e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-neutral-700 bg-neutral-900/50 pr-12 text-white placeholder:text-neutral-500 focus-visible:ring-primary"
                />
                {isSubmitted && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 bg-primary text-neutral-900 hover:bg-primary/90"
                disabled={isSubmitted}
              >
                {isSubmitted ? 'Zapisano!' : 'Zapisz się'}
              </Button>
            </form>

            {/* Privacy note */}
            <p className="mt-4 text-xs text-neutral-500">
              Zapisując się, akceptujesz naszą{' '}
              <a href="/privacy" className="underline hover:text-primary">
                Politykę Prywatności
              </a>
              . Możesz wypisać się w każdej chwili.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-neutral-600">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Bez spamu</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">100% bezpieczeństwo</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Możliwość rezygnacji</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

# components\ui\accordion.tsx

```tsx
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

# components\ui\badge.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```

# components\ui\button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-xl gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-xl px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```

# components\ui\card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

# components\ui\checkbox.tsx

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

```

# components\ui\dialog.tsx

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```

# components\ui\form.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

# components\ui\input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

# components\ui\label.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

# components\ui\radio-group.tsx

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

```

# components\ui\select.tsx

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

```

# components\ui\sheet.tsx

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

# components\ui\skeleton.tsx

```tsx
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

# components\welcome-toast.tsx

```tsx
'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ Welcome to Next.js Commerce!', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            This is a high-performance, SSR storefront powered by Shopify, Next.js, and Vercel.{' '}
            <a
              href="https://vercel.com/templates/next.js/nextjs-commerce"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Deploy your own
            </a>
            .
          </>
        )
      });
    }
  }, []);

  return null;
}

```

# docs\CLAUDE.md

```md
# Gawin-Home - Premium E-commerce Platform

**Typ Projektu:** E-commerce (Meble Premium)
**Wersja:** 1.0.0
**Data Rozpoczęcia:** 2025-10-15
**Status:** 🟡 W trakcie inicjalizacji

---

## 📋 Spis Treści

1. [Wizja i Założenia](#wizja-i-założenia)
2. [Stack Technologiczny](#stack-technologiczny)
3. [Architektura Projektu](#architektura-projektu)
4. [Design System](#design-system)
5. [Struktura Danych](#struktura-danych)
6. [Roadmap Implementacji](#roadmap-implementacji)
7. [Kluczowe Decyzje](#kluczowe-decyzje)
8. [Checklisty](#checklisty)

---

## 🎯 Wizja i Założenia

### Misja Główna
Stworzenie **nowoczesnego, premium sklepu e-commerce** z meblami wysokiej jakości, który wyróżnia się eleganckim designem hybrydowym i doskonałym UX.

### Filozofia "Hybrydowego Designu"

#### 🌙 Dark Entry (Strona Główna)
- **Paleta:** Ciemna (grafit #1a1a1a, złoto #d4af37)
- **Cel:** Budowanie prestiżu, luksusowe pierwsze wrażenie
- **Elementy:** Hero z tłem wideo/obrazem, elegancka typografia, złote akcenty
- **Vibe:** Premium boutique, ekskluzywność

#### ☀️ Light Showroom (Produkty)
- **Paleta:** Jasna (biel #ffffff, krem #f5f5f0, szary #e5e5e5)
- **Cel:** Czyste tło, które wyeksponuje meble
- **Elementy:** Duże zdjęcia produktów, minimalistyczny layout, subtelne cienie
- **Vibe:** Galeria sztuki, przestronny showroom

#### 🎨 Spójne Premium UI
- **Przyciski:** `rounded-xl` (nie `rounded-md` ani `rounded-full`)
- **Typografia:** Elegancka, czytelna (Geist lub Space Grotesk)
- **Ikony:** Lucide Icons, spójny styl (stroke-width: 1.5)
- **Animacje:** Subtelne, płynne (framer-motion)
- **Spacing:** Większe odstępy (8px grid, nie 4px)

### Kluczowe Cele Projektu

1. **Clean Code**
   - Nieskazitelnie czysty kod
   - Dobrze zorganizowany
   - Łatwy do zrozumienia i utrzymania
   - Pełne typowanie TypeScript

2. **Top-Level Class Design**
   - "Śliczny" frontend
   - Użyteczność na pierwszym miejscu
   - Premium look & feel
   - Perfekcyjna responsywność

3. **Realistyczne Dane**
   - Lokalne dane testowe od początku
   - Realistyczne opisy produktów
   - Prawdziwe zdjęcia mebli (placeholder)
   - Kompletne dane (ceny, wymiary, materiały)

---

## 🎨 Stack Technologiczny

### Core Framework
\`\`\`json
{
  "next": "^15.4.6",
  "react": "^19.1.0",
  "typescript": "^5"
}
\`\`\`

### Styling & UI
\`\`\`json
{
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4",
  "shadcn/ui": "latest",
  "@radix-ui/react-*": "latest",
  "lucide-react": "^0.539.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1"
}
\`\`\`

### Vercel Commerce Foundation
\`\`\`json
{
  "@vercel/commerce": "latest",
  // Commerce utilities, types, hooks
}
\`\`\`

### Additional Features
\`\`\`json
{
  "framer-motion": "^11", // Animacje
  "next-themes": "^0.4.6", // Dark/Light toggle (opcjonalnie)
  "sonner": "^1", // Toast notifications
  "react-hook-form": "^7.60.0",
  "@hookform/resolvers": "^5.1.1",
  "zod": "^4"
}
\`\`\`

### Development Tools
\`\`\`json
{
  "@eslint/eslintrc": "^3",
  "eslint": "^9",
  "eslint-config-next": "15.x",
  "prettier": "^3",
  "prettier-plugin-tailwindcss": "^0.6"
}
\`\`\`

---

## 🏗️ Architektura Projektu

### Struktura Folderów

\`\`\`
gawin-home/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (auth)/                   # Route group: Auth pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (shop)/                   # Route group: Shop pages
│   │   │   ├── products/
│   │   │   │   └── [slug]/
│   │   │   ├── category/
│   │   │   │   └── [slug]/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── api/                      # API Routes
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage (Dark)
│   │   └── globals.css               # Global styles
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── layout/                   # Layout components
│   │   │   ├── header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── MobileNav.tsx
│   │   │   │   ├── CartButton.tsx
│   │   │   │   └── SearchBar.tsx
│   │   │   ├── footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── FooterLinks.tsx
│   │   │   └── sidebar/
│   │   │       └── FilterSidebar.tsx
│   │   ├── commerce/                 # E-commerce specific
│   │   │   ├── product/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductGrid.tsx
│   │   │   │   ├── ProductDetails.tsx
│   │   │   │   ├── ProductGallery.tsx
│   │   │   │   └── ProductVariants.tsx
│   │   │   ├── cart/
│   │   │   │   ├── Cart.tsx
│   │   │   │   ├── CartItem.tsx
│   │   │   │   └── CartSummary.tsx
│   │   │   └── checkout/
│   │   │       ├── CheckoutForm.tsx
│   │   │       └── PaymentSection.tsx
│   │   ├── sections/                 # Page sections
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx   # Dark, elegant
│   │   │   │   ├── FeaturedProducts.tsx
│   │   │   │   ├── CategoriesShowcase.tsx
│   │   │   │   └── TrustedBrands.tsx
│   │   │   └── shared/
│   │   │       ├── Newsletter.tsx
│   │   │       └── Testimonials.tsx
│   │   └── shared/                   # Shared utilities
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── ImageWithFallback.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts                  # cn() + utilities
│   │   ├── commerce/                 # Commerce logic
│   │   │   ├── products.ts
│   │   │   ├── cart.ts
│   │   │   └── checkout.ts
│   │   ├── hooks/                    # Custom hooks
│   │   │   ├── useCart.ts
│   │   │   ├── useProducts.ts
│   │   │   └── useCheckout.ts
│   │   └── validations/              # Zod schemas
│   │       ├── product.ts
│   │       ├── cart.ts
│   │       └── checkout.ts
│   │
│   ├── data/                         # Local test data
│   │   ├── products.json             # Product catalog
│   │   ├── categories.json           # Categories
│   │   ├── collections.json          # Featured collections
│   │   └── testimonials.json         # Customer reviews
│   │
│   ├── config/
│   │   ├── site.ts                   # Site config
│   │   ├── navigation.ts             # Nav structure
│   │   └── constants.ts              # App constants
│   │
│   └── types/
│       ├── product.ts                # Product types
│       ├── cart.ts                   # Cart types
│       ├── commerce.ts               # Commerce types
│       └── index.ts                  # Exports
│
├── public/
│   ├── images/
│   │   ├── products/                 # Product images
│   │   ├── categories/               # Category banners
│   │   ├── hero/                     # Hero backgrounds
│   │   └── logos/                    # Brand logos
│   ├── fonts/                        # Custom fonts
│   └── icons/                        # Favicons
│
├── .env.local                        # Environment variables
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json
└── README.md
\`\`\`

### Route Groups Strategy

**`(auth)` Group:**
- `/login`, `/register`, `/forgot-password`
- Shared auth layout (centered card)

**`(shop)` Group:**
- `/products`, `/category`, `/cart`, `/checkout`
- Shared shop layout (header + footer)

**Root `/`:**
- Homepage (unique dark design)

---

## 🎨 Design System

### Color Palette

#### Primary Colors (Dark Entry)
\`\`\`css
--dark-bg: #1a1a1a;           /* Main dark background */
--dark-surface: #252525;       /* Cards, sections */
--gold-primary: #d4af37;       /* Primary gold accent */
--gold-hover: #c19b2b;         /* Gold hover state */
--text-light: #f5f5f5;         /* Primary text on dark */
--text-muted: #a0a0a0;         /* Muted text on dark */
\`\`\`

#### Secondary Colors (Light Showroom)
\`\`\`css
--light-bg: #ffffff;           /* Main light background */
--cream-bg: #f5f5f0;           /* Warm cream alternative */
--light-surface: #fafafa;      /* Cards, sections */
--border-light: #e5e5e5;       /* Borders, dividers */
--text-dark: #1a1a1a;          /* Primary text on light */
--text-gray: #666666;          /* Muted text on light */
\`\`\`

#### Accent Colors
\`\`\`css
--accent-blue: #3b82f6;        /* Info, links */
--accent-green: #10b981;       /* Success */
--accent-red: #ef4444;         /* Error, sale */
--accent-orange: #f59e0b;      /* Warning, featured */
\`\`\`

### Typography

#### Font Families
\`\`\`css
--font-primary: 'Geist', system-ui, sans-serif;
--font-display: 'Space Grotesk', sans-serif; /* Headings */
--font-mono: 'Geist Mono', monospace;
\`\`\`

#### Font Scales
\`\`\`css
/* Display (Hero) */
--text-display-2xl: 4.5rem;    /* 72px - H1 Hero */
--text-display-xl: 3.75rem;    /* 60px */
--text-display-lg: 3rem;       /* 48px */

/* Headings */
--text-h1: 2.25rem;            /* 36px */
--text-h2: 1.875rem;           /* 30px */
--text-h3: 1.5rem;             /* 24px */
--text-h4: 1.25rem;            /* 20px */

/* Body */
--text-lg: 1.125rem;           /* 18px - Product descriptions */
--text-base: 1rem;             /* 16px - Default */
--text-sm: 0.875rem;           /* 14px - Captions */
--text-xs: 0.75rem;            /* 12px - Labels */
\`\`\`

### Spacing Scale (8px Grid)

\`\`\`css
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-5: 2.5rem;   /* 40px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
--space-10: 5rem;    /* 80px */
--space-12: 6rem;    /* 96px */
\`\`\`

### Border Radius

\`\`\`css
--radius-sm: 0.5rem;   /* 8px - Small elements */
--radius-md: 0.75rem;  /* 12px - Cards */
--radius-lg: 1rem;     /* 16px - Large cards */
--radius-xl: 1.5rem;   /* 24px - 🎯 BUTTONS (KEY!) */
--radius-2xl: 2rem;    /* 32px - Hero sections */
\`\`\`

### Shadows

\`\`\`css
/* Light theme */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

/* Dark theme */
--shadow-dark-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-dark-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-dark-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
\`\`\`

### Component Variants

#### Button
\`\`\`typescript
// Primary Gold (Dark background)
"bg-gold-primary text-dark-bg hover:bg-gold-hover rounded-xl"

// Secondary Light (Dark background)
"bg-transparent border-2 border-gold-primary text-gold-primary hover:bg-gold-primary/10 rounded-xl"

// Primary Dark (Light background)
"bg-dark-bg text-light-bg hover:bg-dark-surface rounded-xl"

// Ghost (Transparent)
"bg-transparent hover:bg-dark-surface/10 rounded-xl"
\`\`\`

#### Card
\`\`\`typescript
// Dark variant (Homepage)
"bg-dark-surface border border-gold-primary/20 rounded-lg"

// Light variant (Products)
"bg-white border border-border-light rounded-lg shadow-md"
\`\`\`

---

## 📊 Struktura Danych

### Product Schema

\`\`\`typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  collection?: string;

  // Pricing
  price: {
    amount: number;
    currency: string;
    compareAtAmount?: number; // Original price for sales
  };

  // Images
  images: {
    url: string;
    alt: string;
    width: number;
    height: number;
  }[];

  // Variants (np. kolor, rozmiar)
  variants: {
    id: string;
    name: string;
    options: {
      name: string;
      value: string;
      priceModifier?: number;
      inStock: boolean;
    }[];
  }[];

  // Details
  details: {
    dimensions: {
      width: number;
      height: number;
      depth: number;
      unit: "cm" | "in";
    };
    weight?: number;
    materials: string[];
    colors: string[];
    manufacturer?: string;
  };

  // Metadata
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Status
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  onSale: boolean;

  createdAt: string;
  updatedAt: string;
}
\`\`\`

### Category Schema

\`\`\`typescript
interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  subcategories?: {
    id: string;
    slug: string;
    name: string;
  }[];
  productCount: number;
}
\`\`\`

### Cart Schema

\`\`\`typescript
interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
}

interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product: Pick<Product, "name" | "images" | "slug">;
}
\`\`\`

---

## 🗓️ Roadmap Implementacji

### Phase 1: Foundation (Day 1-2) ✅ W TRAKCIE

**Setup:**
- [x] Struktura projektu
- [ ] Next.js 15 + TypeScript
- [ ] Tailwind CSS v4
- [ ] shadcn/ui init
- [ ] ESLint + Prettier

**Design System:**
- [ ] Konfiguracja kolorów w Tailwind
- [ ] Typografia (Geist fonts)
- [ ] Komponenty UI podstawowe (Button, Card, Input)
- [ ] CVA variants setup

**Data Layer:**
- [ ] TypeScript types (Product, Category, Cart)
- [ ] Mock data (10 produktów mebli)
- [ ] Utilities (formatters, validators)

### Phase 2: Homepage (Day 3-4)

**Dark Entry:**
- [ ] Hero Section (video/image background)
- [ ] Featured Products (karuzela)
- [ ] Categories Showcase (4-6 kategorii)
- [ ] Newsletter Section
- [ ] Footer (ciemny)

**Komponenty:**
- [ ] Header z transparent→solid transition
- [ ] Mobile navigation (Sheet)
- [ ] Search bar (elegancki)
- [ ] Cart button (z licznikiem)

### Phase 3: Product Listing (Day 5-6)

**Light Showroom:**
- [ ] Product Grid (responsive)
- [ ] Filter Sidebar (kategorie, cena, materiały)
- [ ] Sort options (cena, nowość, popularność)
- [ ] Pagination / Infinite scroll
- [ ] "No results" state

**Komponenty:**
- [ ] ProductCard (hover effects)
- [ ] FilterPanel (Accordion)
- [ ] PriceRange slider
- [ ] CategoryChips

### Phase 4: Product Details (Day 7-8)

**Product Page:**
- [ ] Image Gallery (zoom, thumbnails)
- [ ] Product Info (nazwa, cena, opis)
- [ ] Variant Selector (kolor, rozmiar)
- [ ] Add to Cart (z animacją)
- [ ] Specs Table (wymiary, materiały)
- [ ] Related Products (4-6 items)

**Komponenty:**
- [ ] ImageGallery (lightbox)
- [ ] VariantSelector (radio groups)
- [ ] QuantitySelector
- [ ] SpecsTable
- [ ] RelatedProducts carousel

### Phase 5: Cart & Checkout (Day 9-10)

**Cart:**
- [ ] Cart Drawer (Sheet)
- [ ] Cart Items (editable quantity)
- [ ] Cart Summary (subtotal, tax, total)
- [ ] Empty cart state

**Checkout:**
- [ ] Multi-step form (shipping, payment, review)
- [ ] Form validation (Zod)
- [ ] Payment integration (placeholder)
- [ ] Order confirmation

**Komponenty:**
- [ ] CheckoutStepper
- [ ] ShippingForm
- [ ] PaymentForm
- [ ] OrderSummary

### Phase 6: Polish & Optimization (Day 11-12)

**Performance:**
- [ ] Image optimization (WebP, blur placeholders)
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Bundle analysis

**UX Enhancements:**
- [ ] Loading states (Suspense)
- [ ] Error boundaries
- [ ] Toast notifications (Sonner)
- [ ] Smooth animations (Framer Motion)

**SEO:**
- [ ] Metadata API (wszystkie strony)
- [ ] Sitemap
- [ ] robots.txt
- [ ] OG images

**Testing:**
- [ ] Manual testing (wszystkie flow)
- [ ] Responsywność (mobile, tablet, desktop)
- [ ] Accessibility audit
- [ ] Performance (Lighthouse)

---

## 🎯 Kluczowe Decyzje

### 1. Dlaczego Vercel Commerce?
✅ **PROS:**
- Nowoczesny, aktywnie utrzymywany
- Next.js 15 App Router
- Gotowe patterns dla e-commerce
- TypeScript first
- Świetna dokumentacja

❌ **Odrzucone alternatywy:**
- `next-merce` - przestarzały (Pages Router)
- `shopify-nextjs` - zbyt mocno związany z Shopify
- Od zera - za długo by trwało

### 2. Dlaczego "Hybrydowy Design"?
- **Differentiation:** Większość sklepów używa jednego theme
- **Storytelling:** Dark entry = prestiż, Light showroom = focus na produkt
- **Flexibility:** Można łatwo dostosować do różnych sekcji
- **Premium Feel:** Pokazuje attention to detail

### 3. Dlaczego Lokalne Dane?
- Szybki development (nie czekamy na backend)
- Kontrola nad strukturą danych
- Łatwe testowanie edge cases
- Przygotowanie na przyszłe API integration

### 4. Dlaczego rounded-xl dla Przycisków?
- `rounded-md` - za kanciasty
- `rounded-full` - za "zabawkowy"
- `rounded-xl` - **PERFECT** balance, premium look

---

## ✅ Checklisty

### Pre-Development Checklist
- [x] ✅ Zdefiniowano wymagania projektu
- [x] ✅ Wybrano fundament (Vercel Commerce)
- [x] ✅ Opracowano design philosophy
- [x] ✅ Ustalono stack technologiczny
- [ ] Utworzono folder projektu
- [ ] Zainicjowano Git repo

### Setup Checklist (Day 1)
- [ ] `npx create-next-app@latest` z Turbopack
- [ ] Instalacja Tailwind CSS v4
- [ ] `npx shadcn@latest init` (New York style)
- [ ] Instalacja dependencies (framer-motion, sonner, etc.)
- [ ] Konfiguracja ESLint + Prettier
- [ ] Utworzenie struktury folderów
- [ ] Setup fonts (Geist)
- [ ] Konfiguracja design system w globals.css
- [ ] Test build: `npm run build`

### Design System Checklist
- [ ] Zdefiniowano palety kolorów (dark + light)
- [ ] Skonfigurowano typografię
- [ ] Utworzono CVA variants dla Button
- [ ] Utworzono CVA variants dla Card
- [ ] Dodano komponenty UI: button, card, input, sheet, dialog
- [ ] Przygotowano ikony (Lucide)
- [ ] Test dark/light theme switching

### Data Preparation Checklist
- [ ] Utworzono TypeScript types
- [ ] Przygotowano 10 produktów (JSON)
- [ ] Przygotowano 4-6 kategorii
- [ ] Przygotowano 1-2 kolekcje
- [ ] Dodano placeholder images
- [ ] Test data loading

### Quality Checklist (Final)
- [ ] ✅ Wszystkie strony responsywne
- [ ] ✅ Accessibility (ARIA labels)
- [ ] ✅ SEO metadata kompletne
- [ ] ✅ Performance (Lighthouse >90)
- [ ] ✅ TypeScript errors: 0
- [ ] ✅ ESLint warnings: 0
- [ ] ✅ Build success
- [ ] ✅ Manual testing (wszystkie flow)

---

## 📝 Notatki Developerskie

### Konwencje Kodowania
- **Komponenty:** PascalCase.tsx
- **Utilities:** camelCase.ts
- **Routes:** kebab-case
- **Types:** PascalCase
- **Zmienne:** camelCase
- **Stałe:** UPPER_CASE

### Import Order
\`\`\`typescript
// 1. React & Next.js
import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// 2. External libraries
import { motion } from "framer-motion"
import { toast } from "sonner"

// 3. shadcn/ui
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// 4. Local components
import { Header } from "@/components/layout/header/Header"

// 5. Utilities & types
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"

// 6. Data
import products from "@/data/products.json"
\`\`\`

### Git Commit Messages
\`\`\`bash
feat: add Hero section with video background
fix: resolve mobile navigation z-index issue
style: update Button variants to rounded-xl
refactor: extract ProductCard to separate component
docs: update README with setup instructions
chore: upgrade Next.js to 15.4.6
\`\`\`

---

## 🏷️ Tags & Metadata

**Kategorie:**
🟦 E-commerce | 🟩 Next.js | 🟨 Premium Design | 🟪 Vercel Commerce

**Keywords:**
e-commerce, furniture, premium, next.js-15, vercel-commerce, typescript, tailwind-v4, shadcn-ui, dark-design, hybrid-design

**Wersja dokumentu:** 1.0.0
**Ostatnia aktualizacja:** 2025-10-15
**Autor:** Claude Code + Sonnet 4.5
**Status:** 🟡 Inicjalizacja w trakcie

---

> 🎯 **Cel:** Stworzyć najpiękniejszy, najbardziej premium sklep e-commerce z meblami, jaki można sobie wyobrazić. Clean code, top-level design, realistyczne dane.

> 🔥 **Motto:** "If it's not beautiful, it's not done."

```

# docs\IMPLEMENTATION_PLAN.md

```md
# Gawin-Home - Plan Implementacji Krok po Kroku

**Data utworzenia:** 2025-10-15
**Status:** 📋 Plan gotowy do wykonania

---

## 📋 Spis Treści

1. [Phase 1: Foundation Setup](#phase-1-foundation-setup)
2. [Phase 2: Design System](#phase-2-design-system)
3. [Phase 3: Data Layer](#phase-3-data-layer)
4. [Phase 4: Homepage Implementation](#phase-4-homepage-implementation)
5. [Phase 5: Product Pages](#phase-5-product-pages)
6. [Phase 6: Cart & Checkout](#phase-6-cart--checkout)
7. [Phase 7: Polish & Deploy](#phase-7-polish--deploy)

---

## Phase 1: Foundation Setup

### 🎯 Cel
Utworzenie solidnego fundamentu projektu z Next.js 15, TypeScript i Tailwind v4.

### ⏱️ Czas: 2-3 godziny

### 📝 Kroki

#### 1.1 Inicjalizacja Projektu

\`\`\`bash
# Krok 1: Przejdź do folderu roboczego
cd C:\Users\NicoN\Desktop\Claude

# Krok 2: Utwórz nowy projekt Next.js
npx create-next-app@latest gawin-home \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack

# Krok 3: Przejdź do projektu
cd gawin-home

# Krok 4: Otwórz w VS Code
code .
\`\`\`

**Odpowiedzi na pytania setup:**
- TypeScript: ✅ Yes
- ESLint: ✅ Yes
- Tailwind CSS: ✅ Yes
- `src/` directory: ✅ Yes
- App Router: ✅ Yes
- Customize import alias: ✅ Yes (@/*)
- Turbopack: ✅ Yes

#### 1.2 Instalacja shadcn/ui

\`\`\`bash
# Inicjalizacja shadcn/ui
npx shadcn@latest init

# Odpowiedzi:
# - Style: New York
# - Base color: Neutral
# - CSS variables: Yes
\`\`\`

#### 1.3 Instalacja Dependencies

\`\`\`bash
# UI & Styling
npm install lucide-react class-variance-authority clsx tailwind-merge

# Animations & UX
npm install framer-motion sonner next-themes

# Forms
npm install react-hook-form @hookform/resolvers zod

# Dev Tools
npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier

# Fonts (Geist)
# Already included in Next.js 15
\`\`\`

#### 1.4 Struktura Folderów

\`\`\`bash
# Utwórz strukturę
mkdir -p src/components/{ui,layout,commerce,sections,shared}
mkdir -p src/components/layout/{header,footer,sidebar}
mkdir -p src/components/commerce/{product,cart,checkout}
mkdir -p src/components/sections/{home,shared}
mkdir -p src/lib/{commerce,hooks,validations}
mkdir -p src/data
mkdir -p src/config
mkdir -p src/types
mkdir -p public/images/{products,categories,hero,logos}
\`\`\`

#### 1.5 Konfiguracja Git

\`\`\`bash
# Inicjalizacja repo
git init
git add .
git commit -m "chore: initial project setup with Next.js 15 and shadcn/ui"

# Utwórz .gitignore (już jest)
# Dodaj .env.local do .gitignore
\`\`\`

#### 1.6 Prettier Configuration

**Utwórz `.prettierrc.json`:**
\`\`\`json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
\`\`\`

---

## Phase 2: Design System

### 🎯 Cel
Konfiguracja design systemu: kolory, typografia, komponenty.

### ⏱️ Czas: 3-4 godziny

### 📝 Kroki

#### 2.1 Tailwind v4 Configuration

**Edytuj `src/app/globals.css`:**
\`\`\`css
@import "tailwindcss";

@theme {
  /* === SPACING (8px grid) === */
  --spacing-1: 0.5rem;
  --spacing-2: 1rem;
  --spacing-3: 1.5rem;
  --spacing-4: 2rem;
  --spacing-5: 2.5rem;
  --spacing-6: 3rem;
  --spacing-8: 4rem;
  --spacing-10: 5rem;
  --spacing-12: 6rem;

  /* === RADIUS === */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;    /* 🎯 PRIMARY for buttons */
  --radius-2xl: 2rem;

  /* === DARK ENTRY COLORS === */
  --color-dark-bg: oklch(0.11 0 0);           /* #1a1a1a */
  --color-dark-surface: oklch(0.15 0 0);      /* #252525 */
  --color-gold-primary: oklch(0.75 0.12 85);  /* #d4af37 */
  --color-gold-hover: oklch(0.68 0.12 85);    /* #c19b2b */
  --color-text-light: oklch(0.96 0 0);        /* #f5f5f5 */
  --color-text-muted: oklch(0.63 0 0);        /* #a0a0a0 */

  /* === LIGHT SHOWROOM COLORS === */
  --color-light-bg: oklch(1 0 0);             /* #ffffff */
  --color-cream-bg: oklch(0.97 0.005 85);     /* #f5f5f0 */
  --color-light-surface: oklch(0.98 0 0);     /* #fafafa */
  --color-border-light: oklch(0.90 0 0);      /* #e5e5e5 */
  --color-text-dark: oklch(0.11 0 0);         /* #1a1a1a */
  --color-text-gray: oklch(0.40 0 0);         /* #666666 */

  /* === ACCENT COLORS === */
  --color-accent-blue: oklch(0.60 0.25 250);  /* #3b82f6 */
  --color-accent-green: oklch(0.60 0.25 155); /* #10b981 */
  --color-accent-red: oklch(0.60 0.25 25);    /* #ef4444 */
  --color-accent-orange: oklch(0.70 0.20 60); /* #f59e0b */

  /* === SEMANTIC MAPPING === */
  --color-background: var(--color-light-bg);
  --color-foreground: var(--color-text-dark);
  --color-primary: var(--color-gold-primary);
  --color-primary-foreground: var(--color-dark-bg);
}

/* === DARK MODE (Optional - dla toggles) === */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: var(--color-dark-bg);
    --color-foreground: var(--color-text-light);
  }
}

/* === BASE STYLES === */
@layer base {
  * {
    @apply border-border-light;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display tracking-tight;
  }
}

/* === UTILITIES === */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
\`\`\`

#### 2.2 Font Configuration

**Edytuj `src/app/layout.tsx`:**
\`\`\`typescript
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

**Dodaj do `tailwind.config.ts`:**
\`\`\`typescript
fontFamily: {
  sans: ["var(--font-geist-sans)", "sans-serif"],
  mono: ["var(--font-geist-mono)", "monospace"],
  display: ["var(--font-display)", "sans-serif"],
}
\`\`\`

#### 2.3 Komponenty UI (shadcn/ui)

\`\`\`bash
# Dodaj podstawowe komponenty
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add sheet
npx shadcn@latest add dialog
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add skeleton
npx shadcn@latest add accordion
npx shadcn@latest add select
npx shadcn@latest add radio-group
npx shadcn@latest add checkbox
npx shadcn@latest add form
\`\`\`

#### 2.4 Customize Button Component

**Edytuj `src/components/ui/button.tsx`:**

Zmień `defaultVariants` radius:
\`\`\`typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl ...", // 🎯 rounded-xl
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        gold: "bg-gold-primary text-dark-bg hover:bg-gold-hover", // NEW
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3", // rounded-lg dla small
        lg: "h-11 rounded-2xl px-8", // rounded-2xl dla large
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
\`\`\`

#### 2.5 Utility Functions

**Utwórz `src/lib/utils.ts`:**
\`\`\`typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = "PLN"): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
\`\`\`

---

## Phase 3: Data Layer

### 🎯 Cel
Utworzenie TypeScript types i mock data dla produktów.

### ⏱️ Czas: 2-3 godziny

### 📝 Kroki

#### 3.1 TypeScript Types

**Utwórz `src/types/product.ts`:**
\`\`\`typescript
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  collection?: string;

  price: {
    amount: number;
    currency: string;
    compareAtAmount?: number;
  };

  images: ProductImage[];
  variants: ProductVariant[];
  details: ProductDetails;
  seo: ProductSEO;

  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  onSale: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: VariantOption[];
}

export interface VariantOption {
  name: string;
  value: string;
  priceModifier?: number;
  inStock: boolean;
}

export interface ProductDetails {
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: "cm" | "in";
  };
  weight?: number;
  materials: string[];
  colors: string[];
  manufacturer?: string;
}

export interface ProductSEO {
  title: string;
  description: string;
  keywords: string[];
}
\`\`\`

**Utwórz `src/types/category.ts`:**
\`\`\`typescript
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  subcategories?: Subcategory[];
  productCount: number;
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
}
\`\`\`

**Utwórz `src/types/cart.ts`:**
\`\`\`typescript
import type { Product } from "./product";

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product: Pick<Product, "name" | "images" | "slug">;
}
\`\`\`

**Utwórz `src/types/index.ts`:**
\`\`\`typescript
export * from "./product";
export * from "./category";
export * from "./cart";
\`\`\`

#### 3.2 Mock Data - Products

**Utwórz `src/data/products.json`:**
\`\`\`json
[
  {
    "id": "sofa-skandynawska-beige",
    "slug": "sofa-skandynawska-beige",
    "name": "Sofa Skandynawska Bergen",
    "description": "Elegancka sofa w stylu skandynawskim, wykonana z wysokiej jakości tkaniny. Idealna do nowoczesnych wnętrz. Wygodne, miękkie siedzisko zapewnia maksymalny komfort.",
    "category": "sofas",
    "subcategory": "scandinavian",
    "collection": "bergen",
    "price": {
      "amount": 3499,
      "currency": "PLN",
      "compareAtAmount": 4299
    },
    "images": [
      {
        "url": "/images/products/sofa-bergen-beige-1.jpg",
        "alt": "Sofa Bergen - widok z przodu",
        "width": 1200,
        "height": 800
      },
      {
        "url": "/images/products/sofa-bergen-beige-2.jpg",
        "alt": "Sofa Bergen - widok z boku",
        "width": 1200,
        "height": 800
      }
    ],
    "variants": [
      {
        "id": "color",
        "name": "Kolor",
        "options": [
          { "name": "Beżowy", "value": "beige", "inStock": true },
          { "name": "Szary", "value": "gray", "priceModifier": 200, "inStock": true },
          { "name": "Ciemny Niebieski", "value": "navy", "priceModifier": 300, "inStock": false }
        ]
      }
    ],
    "details": {
      "dimensions": {
        "width": 220,
        "height": 85,
        "depth": 95,
        "unit": "cm"
      },
      "weight": 85,
      "materials": ["Tkanina premium", "Drewno brzozowe", "Pianka wysokoelastyczna"],
      "colors": ["Beżowy", "Szary", "Ciemny Niebieski"],
      "manufacturer": "Gawin Furniture Co."
    },
    "seo": {
      "title": "Sofa Skandynawska Bergen - Beżowa | Gawin Home",
      "description": "Elegancka sofa skandynawska Bergen w kolorze beżowym. Wysoka jakość, skandynawski design, komfort na lata.",
      "keywords": ["sofa skandynawska", "sofa beżowa", "meble bergen", "sofa nowoczesna"]
    },
    "inStock": true,
    "isFeatured": true,
    "isNew": false,
    "onSale": true,
    "createdAt": "2024-10-01T10:00:00Z",
    "updatedAt": "2025-01-10T14:30:00Z"
  },
  {
    "id": "fotel-loftowy-skora",
    "slug": "fotel-loftowy-skora",
    "name": "Fotel Loftowy Manhattan",
    "description": "Ekskluzywny fotel w stylu industrialnym, wykonany z naturalnej skóry. Metalowa rama dodaje charakteru. Idealny do loftów i nowoczesnych wnętrz.",
    "category": "armchairs",
    "subcategory": "industrial",
    "collection": "manhattan",
    "price": {
      "amount": 2899,
      "currency": "PLN"
    },
    "images": [
      {
        "url": "/images/products/fotel-manhattan-1.jpg",
        "alt": "Fotel Manhattan - widok z przodu",
        "width": 1200,
        "height": 800
      }
    ],
    "variants": [
      {
        "id": "leather-color",
        "name": "Kolor Skóry",
        "options": [
          { "name": "Brązowy Vintage", "value": "brown-vintage", "inStock": true },
          { "name": "Czarny Mat", "value": "black-matte", "priceModifier": 400, "inStock": true }
        ]
      }
    ],
    "details": {
      "dimensions": {
        "width": 80,
        "height": 95,
        "depth": 85,
        "unit": "cm"
      },
      "weight": 32,
      "materials": ["Naturalna skóra", "Stal szczotkowana", "Pianka poliuretanowa"],
      "colors": ["Brązowy Vintage", "Czarny Mat"],
      "manufacturer": "Gawin Furniture Co."
    },
    "seo": {
      "title": "Fotel Loftowy Manhattan - Skórzany | Gawin Home",
      "description": "Ekskluzywny fotel loftowy Manhattan ze skóry naturalnej. Industrialny design, najwyższa jakość wykonania.",
      "keywords": ["fotel loftowy", "fotel skórzany", "meble industrialne", "fotel manhattan"]
    },
    "inStock": true,
    "isFeatured": true,
    "isNew": true,
    "onSale": false,
    "createdAt": "2025-01-05T09:00:00Z",
    "updatedAt": "2025-01-15T11:20:00Z"
  }
]
\`\`\`

*(Dodaj więcej produktów - docelowo 10-12)*

#### 3.3 Mock Data - Categories

**Utwórz `src/data/categories.json`:**
\`\`\`json
[
  {
    "id": "sofas",
    "slug": "sofas",
    "name": "Sofy",
    "description": "Wygodne i eleganckie sofy do Twojego salonu",
    "image": "/images/categories/sofas.jpg",
    "subcategories": [
      { "id": "scandinavian", "slug": "scandinavian", "name": "Skandynawskie" },
      { "id": "modern", "slug": "modern", "name": "Nowoczesne" },
      { "id": "classic", "slug": "classic", "name": "Klasyczne" }
    ],
    "productCount": 24
  },
  {
    "id": "armchairs",
    "slug": "armchairs",
    "name": "Fotele",
    "description": "Komfortowe fotele do relaksu",
    "image": "/images/categories/armchairs.jpg",
    "subcategories": [
      { "id": "industrial", "slug": "industrial", "name": "Industrialne" },
      { "id": "scandinavian", "slug": "scandinavian", "name": "Skandynawskie" }
    ],
    "productCount": 16
  },
  {
    "id": "tables",
    "slug": "tables",
    "name": "Stoły",
    "description": "Stylowe stoły jadalne i kawowe",
    "image": "/images/categories/tables.jpg",
    "productCount": 18
  },
  {
    "id": "chairs",
    "slug": "chairs",
    "name": "Krzesła",
    "description": "Krzesła do jadalni, biura i nie tylko",
    "image": "/images/categories/chairs.jpg",
    "productCount": 32
  }
]
\`\`\`

#### 3.4 Configuration Files

**Utwórz `src/config/site.ts`:**
\`\`\`typescript
export const siteConfig = {
  name: "Gawin Home",
  description: "Premium meble dla wymagających. Elegancja w każdym detalu.",
  url: "https://gawin-home.vercel.app",
  ogImage: "/images/og-image.jpg",
  links: {
    facebook: "https://facebook.com/gawinhome",
    instagram: "https://instagram.com/gawinhome",
    pinterest: "https://pinterest.com/gawinhome",
  },
};

export const navigationConfig = {
  mainNav: [
    {
      title: "Kategorie",
      items: [
        { title: "Sofy", href: "/category/sofas" },
        { title: "Fotele", href: "/category/armchairs" },
        { title: "Stoły", href: "/category/tables" },
        { title: "Krzesła", href: "/category/chairs" },
      ],
    },
    {
      title: "Kolekcje",
      items: [
        { title: "Bergen", href: "/collection/bergen" },
        { title: "Manhattan", href: "/collection/manhattan" },
        { title: "Tokyo", href: "/collection/tokyo" },
      ],
    },
  ],
  footerNav: [
    {
      title: "Sklep",
      items: [
        { title: "Wszystkie Produkty", href: "/products" },
        { title: "Nowości", href: "/new" },
        { title: "Promocje", href: "/sale" },
      ],
    },
    {
      title: "Pomoc",
      items: [
        { title: "Kontakt", href: "/contact" },
        { title: "FAQ", href: "/faq" },
        { title: "Dostawa", href: "/shipping" },
        { title: "Zwroty", href: "/returns" },
      ],
    },
    {
      title: "Firma",
      items: [
        { title: "O Nas", href: "/about" },
        { title: "Blog", href: "/blog" },
        { title: "Kariera", href: "/careers" },
      ],
    },
  ],
};
\`\`\`

---

## Phase 4: Homepage Implementation

### 🎯 Cel
Implementacja ciemnej, eleganciej strony głównej.

### ⏱️ Czas: 6-8 godzin

### 📝 Kroki

#### 4.1 Header Component

**Utwórz `src/components/layout/header/Header.tsx`:**
\`\`\`typescript
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-dark-bg/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-gold-primary">
              GAWIN
            </span>
            <span className="text-2xl font-display font-light text-text-light">
              HOME
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-text-light hover:text-gold-primary transition-colors"
            >
              Produkty
            </Link>
            <Link
              href="/categories"
              className="text-text-light hover:text-gold-primary transition-colors"
            >
              Kategorie
            </Link>
            <Link
              href="/collections"
              className="text-text-light hover:text-gold-primary transition-colors"
            >
              Kolekcje
            </Link>
            <Link
              href="/about"
              className="text-text-light hover:text-gold-primary transition-colors"
            >
              O Nas
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-text-light">
              <Search className="h-5 w-5" />
              <span className="sr-only">Szukaj</span>
            </Button>

            <Button variant="ghost" size="icon" className="text-text-light">
              <User className="h-5 w-5" />
              <span className="sr-only">Konto</span>
            </Button>

            <Button variant="ghost" size="icon" className="relative text-text-light">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-primary text-xs text-dark-bg">
                0
              </span>
              <span className="sr-only">Koszyk</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-text-light">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-dark-bg border-gold-primary/20">
                {/* Mobile navigation content */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
\`\`\`

#### 4.2 Hero Section

**Utwórz `src/components/sections/home/HeroSection.tsx`:**
\`\`\`typescript
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark-bg">
      {/* Background Image/Video */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Premium furniture"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 via-dark-bg/70 to-dark-bg" />
      </div>

      {/* Content */}
      <div className="container px-4 py-32 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-gold-primary/30 bg-dark-surface/50 px-4 py-2 backdrop-blur-sm">
            <span className="text-sm text-gold-primary">
              Nowa Kolekcja 2025
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight text-text-light sm:text-6xl md:text-7xl lg:text-8xl">
            Elegancja w{" "}
            <span className="bg-gradient-to-r from-gold-primary via-gold-hover to-gold-primary bg-clip-text text-transparent">
              każdym detalu
            </span>
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-text-muted sm:text-xl md:text-2xl">
            Odkryj kolekcję premium mebli, które łączą nowoczesny design z
            ponadczasową elegancją. Stwórz wnętrze swoich marzeń.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              variant="gold"
              className="group text-lg"
            >
              <Link href="/products">
                Zobacz Kolekcję
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold-primary/50 text-gold-primary hover:bg-gold-primary/10 text-lg"
            >
              <Link href="/about">Poznaj Nas</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-text-muted">
            Przewiń w dół
          </span>
          <div className="h-8 w-5 rounded-full border-2 border-gold-primary/50">
            <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-gold-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
\`\`\`

*(Więcej komponentów sekcji w kolejnych krokach)*

---

## Phase 5-7: Detailed Implementation

*(Kontynuacja szczegółowych kroków dla Product Pages, Cart & Checkout, Polish & Deploy w kolejnych sekcjach dokumentu)*

---

## ✅ Checklisty Kontrolne

### Pre-Implementation Checklist
- [ ] Folder `C:\Users\NicoN\Desktop\Claude\gawin-home` utworzony
- [ ] Git zainicjalizowany
- [ ] Dependencies zainstalowane
- [ ] shadcn/ui skonfigurowany
- [ ] Struktura folderów utworzona

### Phase 1 Done Checklist
- [ ] `npm run dev` działa bez błędów
- [ ] `npm run build` kończy się sukcesem
- [ ] Tailwind CSS v4 skonfigurowany
- [ ] Fonts (Geist) załadowane
- [ ] ESLint + Prettier działa

### Phase 2 Done Checklist
- [ ] Design system (kolory) w `globals.css`
- [ ] Button component z `rounded-xl`
- [ ] Wszystkie komponenty shadcn/ui dodane
- [ ] `cn()` utility działa
- [ ] Preview Button variants w przeglądarce

### Phase 3 Done Checklist
- [ ] TypeScript types utworzone
- [ ] Mock data (products.json) gotowe
- [ ] Categories.json gotowe
- [ ] Site config utworzony
- [ ] Test import data w komponencie

---

## 🚀 Następne Kroki

Po ukończeniu Phase 1-3, przejdź do implementacji:
1. Header + Footer
2. Homepage sections (Hero, Featured, Categories)
3. Product listing page
4. Product detail page
5. Cart & Checkout
6. Polish & Deploy

---

**Status:** 📋 Plan gotowy do wykonania
**Szacowany czas:** 5-7 dni (40-50 godzin pracy)
**Priorytet:** 🔥 Wysoki - Rozpocznij natychmiast!

---

> 💡 **Tip:** Commituj często! Po każdej ukończonej sekcji zrób commit z opisowym message.

```

# docs\PROGRESS_LOG.md

```md
# Gawin-Home - Progress Log

**Data Rozpoczęcia:** 2025-10-15
**Ostatnia Aktualizacja:** 2025-10-15

---

## 📊 Status Postępu

| Phase | Task | Status | Data | Czas | Notatki |
|-------|------|--------|------|------|---------|
| **Planning** | Utworzenie dokumentacji projektu | ✅ DONE | 2025-10-15 | 45 min | CLAUDE.md, IMPLEMENTATION_PLAN.md, QUICKSTART.md |
| **Phase 1** | Inicjalizacja projektu Next.js | ✅ DONE | 2025-10-15 | 10 min | Vercel Commerce + stable versions |
| **Phase 1** | Instalacja dependencies | ✅ DONE | 2025-10-15 | 5 min | zustand, RHF, zod, framer-motion, lucide, embla |
| **Phase 1** | Setup shadcn/ui | ✅ DONE | 2025-10-15 | 20 min | 13 components + custom rounded-xl |
| **Phase 1** | Git init + pierwszy commit | ✅ DONE | 2025-10-15 | 5 min | Commit 4bf0e1b + 80ca885 + 1e91ac9 |
| **Phase 2** | Homepage Dark Entry design | ✅ DONE | 2025-10-15 | 25 min | Hero + Featured + Categories + Newsletter |
| **Phase 2** | Fix 'use cache' dla stable Next.js | ✅ DONE | 2025-10-15 | 5 min | 7 funkcji w lib/shopify |
| **Phase 2** | Mock Mode dla production build | ✅ DONE | 2025-10-15 | 20 min | 9 funkcji w try-catch, build SUCCESS |
| **Phase 3** | TypeScript types | ⏳ PENDING | - | - | - |
| **Phase 3** | Mock data (products) | ⏳ PENDING | - | - | - |
| **Phase 5** | Product listing | ⏳ PENDING | - | - | - |
| **Phase 6** | Cart & Checkout | ⏳ PENDING | - | - | - |
| **Phase 7** | Polish & Deploy | ⏳ PENDING | - | - | - |

**Legend:**
- ✅ DONE - Ukończone
- 🟡 IN PROGRESS - W trakcie
- ⏳ PENDING - Zaplanowane
- ❌ BLOCKED - Zablokowane
- ⚠️ ISSUE - Problem

---

## 📝 Szczegółowy Log Postępu

### 2025-10-15 - Planning & Documentation

#### ✅ Task: Utworzenie Dokumentacji Projektu
**Czas:** 14:00 - 14:45 (45 minut)
**Status:** COMPLETED

**Co zostało zrobione:**
1. ✅ Utworzono `CLAUDE.md` - główna dokumentacja projektu
   - Wizja i założenia (hybrydowy design)
   - Stack technologiczny
   - Architektura projektu (struktura folderów)
   - Design system (kolory, typografia, spacing)
   - Struktura danych (Product, Category, Cart schemas)
   - Roadmap implementacji (7 phases)
   - Kluczowe decyzje
   - Checklisty kontrolne

2. ✅ Utworzono `IMPLEMENTATION_PLAN.md` - szczegółowy plan krok po kroku
   - Phase 1: Foundation Setup (inicjalizacja, dependencies)
   - Phase 2: Design System (Tailwind, fonts, komponenty)
   - Phase 3: Data Layer (types, mock data)
   - Phase 4: Homepage Implementation (Header, Hero, sections)
   - Phase 5-7: Product Pages, Cart, Polish (zarys)
   - Checklisty weryfikacyjne dla każdej fazy

3. ✅ Utworzono `QUICKSTART.md` - przewodnik szybkiego startu
   - Krok po kroku setup (7 kroków, ~30 minut)
   - Clone Vercel Commerce
   - Instalacja dependencies (zustand, RHF, zod, framer-motion, lucide, embla)
   - shadcn/ui setup (inicjalizacja + komponenty)
   - Konfiguracja design system (custom colors)
   - Zustand cart store
   - Git setup
   - Troubleshooting guide

4. ✅ Utworzono `PROGRESS_LOG.md` - ten plik

**Kluczowe Decyzje:**
- ✅ Bazujemy na **Vercel Commerce** (nowoczesny, Next.js 15, aktywnie utrzymywany)
- ✅ **Hybrydowy Design:** Dark Entry (homepage) + Light Showroom (products)
- ✅ **rounded-xl** dla przycisków (perfect balance)
- ✅ Tailwind v4 już w Vercel Commerce (nie instalujemy)
- ✅ Dodatkowe pakiety: zustand, RHF+zod, framer-motion, lucide, embla-carousel

**Następny Krok:**
Przejście do Phase 1 - Inicjalizacja projektu Next.js z Vercel Commerce.

---

### 2025-10-15 - Phase 1: Foundation Setup

#### ✅ Task: Inicjalizacja Projektu Next.js (COMPLETED)
**Rozpoczęto:** 14:45
**Zakończono:** 14:55
**Czas:** 10 minut
**Status:** ✅ COMPLETED

**Co zostało zrobione:**
1. ✅ Zainstalowano pnpm globalnie (`npm install -g pnpm`)
2. ✅ Template Vercel Commerce został pobrany (poprzednia próba z npm)
3. ✅ Dependencies zainstalowane z `pnpm install` (77 pakietów)
4. ✅ Test dev server: `pnpm dev` - działa na http://localhost:3000
5. ✅ Dodatkowe pakiety zainstalowane:
   - zustand 5.0.8 (state management)
   - react-hook-form 7.65.0 + @hookform/resolvers 5.2.2
   - zod 4.1.12 (validation)
   - lucide-react 0.545.0 (icons)
   - framer-motion 12.23.24 (animations)
   - embla-carousel-react 8.6.0 (carousels)

**Stack:**
- Next.js 15.3.0-canary.13 (Turbopack)
- React 19.0.0
- TypeScript 5.8.2
- Tailwind CSS 4.0.14
- Prettier 3.5.3 + tailwindcss plugin

**Notatki:**
- Używamy `pnpm` zamiast npm (szybszy, oszczędniejszy)
- Turbopack enabled (szybszy HMR)
- Ready in ~1.1s (bardzo szybki dev server)

**Następny Krok:**
shadcn/ui setup + komponenty

---

#### ✅ Task: CRITICAL FIX - Upgrade do Stable Versions (COMPLETED)
**Rozpoczęto:** 14:55
**Zakończono:** 15:00
**Czas:** 5 minut
**Status:** ✅ COMPLETED
**Priorytet:** 🔥 CRITICAL

**Problem:**
Template Vercel Commerce używał **CANARY/UNSTABLE** wersji:
- Next.js: 15.3.0-canary.13 ❌
- Experimental features w next.config.ts wymagające canary (ppr, useCache)

**Rozwiązanie:**
1. ✅ Upgrade do najnowszych **STABLE** versions:
   \`\`\`bash
   pnpm update next@latest react@latest react-dom@latest
   \`\`\`

   **Zainstalowano:**
   - **Next.js: 15.5.5** (latest stable) ✅
   - **React: 19.2.0** (latest stable) ✅
   - **React-DOM: 19.2.0** (latest stable) ✅

2. ✅ Fix next.config.ts - usunięto canary-only features:
   - Usunięto: `experimental.ppr` (canary-only)
   - Usunięto: `experimental.useCache` (canary-only)
   - Zostawiono: `experimental.inlineCss` (safe dla stable)

3. ✅ Dodano import alias do tsconfig.json:
   \`\`\`json
   "paths": { "@/*": ["./*"] }
   \`\`\`

4. ✅ Test dev server: **SUCCESS**
   - URL: http://localhost:3000
   - Turbopack aktywny
   - Ready w 1.3s

**Kluczowa Decyzja:**
🎯 **Projekt MUSI być na najnowszym STABLE stacku - ZERO canary/beta/experimental versions**

**Następny Krok:**
Git initialization + pierwszy commit (ze wszystkimi plikami md dokumentacji)

---

#### ✅ Task: Git Initialization + Pierwszy Commit (COMPLETED)
**Rozpoczęto:** 15:00
**Zakończono:** 15:05
**Czas:** 5 minut
**Status:** ✅ COMPLETED

**Co zostało zrobione:**
1. ✅ Skopiowano wszystkie pliki md dokumentacji do projektu:
   - Utworzono folder `docs/`
   - Skopiowano: CLAUDE.md, IMPLEMENTATION_PLAN.md, QUICKSTART.md, PROGRESS_LOG.md
   - Wszystkie pliki dostępne zarówno w projekcie jak i w głównym folderze Claude

2. ✅ Zainicjalizowano Git repository:
   \`\`\`bash
   git init
   git add .
   git commit -m "chore: initial setup - Gawin-Home e-commerce project"
   \`\`\`

3. ✅ Pierwszy commit wykonany:
   - Commit hash: `4bf0e1b`
   - **83 pliki dodane** (cały projekt + dokumentacja)
   - **8,033 insertions**
   - Branch: `master`
   - Working tree: **clean** ✅

**Zawartość commit:**
- ✅ Całe Vercel Commerce template
- ✅ Zaktualizowane package.json (stable versions)
- ✅ Fixed next.config.ts (bez canary features)
- ✅ Updated tsconfig.json (import alias)
- ✅ **Wszystkie pliki md dokumentacji w `docs/`** 🎯

**Następny Krok:**
shadcn/ui configuration + custom design system

---

#### ✅ Task: shadcn/ui Configuration + Design System (COMPLETED)
**Rozpoczęto:** 15:10
**Zakończono:** 15:30
**Czas:** 20 minut
**Status:** ✅ COMPLETED

**Co zostało zrobione:**

1. ✅ **shadcn/ui Initialization**:
   \`\`\`bash
   npx shadcn@latest init -d
   \`\`\`
   - Używamy defaults (New York style, Neutral colors, CSS variables)
   - Automatyczna konfiguracja components.json
   - Auto-update globals.css z CSS variables
   - Instalacja: class-variance-authority, tailwind-merge, tw-animate-css

2. ✅ **Dodano 13 Core Components**:
   \`\`\`bash
   npx shadcn@latest add button card input sheet dialog badge form select radio-group checkbox accordion skeleton
   \`\`\`
   - **Zainstalowano komponenty**:
     - button.tsx, card.tsx, input.tsx, label.tsx
     - sheet.tsx, dialog.tsx, badge.tsx
     - form.tsx, select.tsx, radio-group.tsx, checkbox.tsx
     - accordion.tsx, skeleton.tsx
   - **Zainstalowano Radix UI primitives**:
     - @radix-ui/react-accordion, @radix-ui/react-checkbox
     - @radix-ui/react-dialog, @radix-ui/react-label
     - @radix-ui/react-radio-group, @radix-ui/react-select
     - @radix-ui/react-slot

3. ✅ **Button Component - Customization**:
   - **Zmiana: `rounded-md` → `rounded-xl`** (zgodnie z designem premium)
   - Base class: `rounded-xl` (linia 8)
   - Size variants: sm/lg również `rounded-xl` (linie 25, 26)
   - **Powód**: `rounded-xl` (24px) = perfect balance, premium look

4. ✅ **Utworzono Strukturę Folderów**:
   \`\`\`bash
   lib/stores/     # Zustand stores (cart, wishlist)
   lib/data/       # Mock data (products, categories)
   lib/config/     # Site config, constants
   types/          # TypeScript types
   components/layout/    # Header, Footer
   components/commerce/  # ProductCard, Cart
   components/sections/  # Page sections
   \`\`\`
   - Niektóre foldery już istniały w Vercel Commerce template
   - Dodano brakujące foldery zgodnie z planem

5. ✅ **Design System - Custom Colors w globals.css**:

   **a) Zmiana --radius na 1.5rem (rounded-xl):**
   \`\`\`css
   --radius: 1.5rem; /* 24px - rounded-xl */
   \`\`\`

   **b) Light Showroom Theme (:root) - Product Pages:**
   \`\`\`css
   --background: oklch(1 0 0);         /* #ffffff - White */
   --foreground: oklch(0.145 0 0);     /* #1a1a1a - Dark graphite */
   --primary: oklch(0.75 0.12 85);     /* #d4af37 - Gold */
   --primary-foreground: oklch(0.145 0 0); /* Dark text on gold */
   --border: oklch(0.922 0 0);         /* #e5e5e5 - Light gray */
   --ring: oklch(0.75 0.12 85);        /* Gold focus ring */
   \`\`\`

   **c) Dark Entry Theme (.dark) - Homepage:**
   \`\`\`css
   --background: oklch(0.145 0 0);     /* #1a1a1a - Dark graphite */
   --foreground: oklch(0.985 0 0);     /* #f5f5f5 - Light text */
   --card: oklch(0.205 0 0);           /* #252525 - Dark surface */
   --primary: oklch(0.75 0.12 85);     /* #d4af37 - Gold */
   --muted-foreground: oklch(0.708 0 0); /* #a0a0a0 - Muted text */
   --border: oklch(1 0 0 / 10%);       /* Subtle border */
   --ring: oklch(0.75 0.12 85);        /* Gold focus ring */
   \`\`\`

**Kluczowe Decyzje:**
- ✅ **Gold (#d4af37)** jako primary color dla obu theme (premium accent)
- ✅ **rounded-xl (1.5rem)** globalnie dla wszystkich przycisków
- ✅ **Hybrid Design System**: Light default + Dark class dla homepage
- ✅ **OKLCH colors** zamiast HSL (lepszy color space, perceptually uniform)

**Stack Update:**
\`\`\`json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "tw-animate-css": "^1.4.0"
  }
}
\`\`\`

**Następny Krok:**
Homepage implementation z Dark Entry designem

---

### 2025-10-15 - Phase 2: Homepage Implementation (Dark Entry)

#### ✅ Task: Implementacja Homepage z Hybrydowym Designem (COMPLETED)
**Rozpoczęto:** 15:35
**Zakończono:** 16:00
**Czas:** 25 minut
**Status:** ✅ COMPLETED

**Co zostało zrobione:**

1. ✅ **Hero Section** (`components/sections/hero-section.tsx`):
   - Dark gradient background (neutral-900 → neutral-800 → neutral-900)
   - Animated badge z pulsującym punktem ("Nowa Kolekcja 2025")
   - Główny nagłówek z gradient gold text
   - Subheading z opisem
   - 2 CTA przyciski (złoty primary + outline transparent)
   - Stats grid (500+ Produktów, 50+ Marek, 10k+ Klientów, 4.9 Ocena)
   - Scroll indicator z bounce animation
   - **Design:** Projekt 3 (Elegancki i Dramatyczny) + minimalizm

2. ✅ **Featured Products Section** (`components/sections/featured-products.tsx`):
   - 4 produkty w grid (responsive: 1 col mobile → 4 col desktop)
   - Product cards z:
     - Badge system (Bestseller, Nowy, -15%)
     - Hover effects (quick actions: Heart, Eye icons)
     - Image hover scale effect
     - Price display z przekreślonymi cenami
     - "Do koszyka" button
   - Section header z gradient gold text
   - "Zobacz wszystkie produkty" link
   - **Mock data**: Realistyczne produkty mebli z Unsplash images

3. ✅ **Categories Showcase Section** (`components/sections/categories-showcase.tsx`):
   - 6 kategorii w grid (1 col → 2 col → 3 col responsive)
   - Category cards z:
     - Background image z overlay
     - Gradient overlay (neutral-900)
     - Category count badge
     - Hover effects (scale image, bright overlay)
     - Arrow icon transition
   - Section header + "Wszystkie kategorie" link
   - **Kategorie**: Sofy i Fotele, Stoły i Krzesła, Sypialnia, Szafy i Komody, Oświetlenie, Dekoracje

4. ✅ **Newsletter Section** (`components/sections/newsletter.tsx`):
   - Dark gradient card z decorative background blurs
   - Mail icon w circle z rings
   - Newsletter form (email + button)
   - Success state z check icon
   - Privacy note link
   - Trust badges (Bez spamu, 100% bezpieczeństwo, Możliwość rezygnacji)
   - Client component z React state

5. ✅ **Zaktualizowano app/page.tsx**:
   - Import wszystkich nowych sekcji
   - Wrapper div z `className="dark"` (Dark Entry theme)
   - Zaktualizowano metadata (title, description, OG)
   - Layout: HeroSection → FeaturedProducts → CategoriesShowcase → Newsletter → Footer

6. ✅ **FIX: 'use cache' Issues**:
   - **Problem**: Vercel Commerce template używał `'use cache'` directive (canary-only)
   - **Rozwiązanie**: Wykomentowano wszystkie `'use cache'` w `lib/shopify/index.ts`
   - Używamy sed: `s/'use cache';/\/\/ 'use cache'; \/\/ Disabled for stable Next.js/g`
   - **7 funkcji poprawionych**: getCollection, getCollectionProducts, getCollections, getMenu, getProduct, getProductRecommendations, getProducts

**Tech Stack używany:**
- Next.js Image component z Unsplash CDN
- Lucide React icons (ArrowRight, ShoppingCart, Heart, Eye, Mail, Check)
- shadcn/ui components (Button, Card, Badge, Input)
- Framer Motion ready (animacje przygotowane do rozbudowy)
- Tailwind CSS v4 z custom gold colors

**Design Philosophy:**
✅ **Hybrid Design** - dokładnie jak planowaliśmy:
- **Dark Entry**: Homepage z ciemnym tłem (neutral-900/950) + złote akcenty
- **Premium Feel**: Gradienty, blur effects, subtelne animacje
- **Minimalizm**: Dużo white space, clean typography
- **Focus na produkcie**: Duże obrazy, czytelne ceny, hover effects

**Dev Server:**
- URL: http://localhost:3001 (port 3000 zajęty)
- Status: ✅ RUNNING
- Ready in: 1.25s (Turbopack)

**Następny Krok:**
Git commit + test w przeglądarce

---

#### ✅ Task: FIX - Mock Mode dla Production Build (COMPLETED)
**Rozpoczęto:** 16:05
**Zakończono:** 16:25
**Czas:** 20 minut
**Status:** ✅ COMPLETED
**Priorytet:** 🔥 CRITICAL

**Problem:**
- Production build (`pnpm build`) failował z błędami Shopify API "Not Found"
- Next.js próbował statycznie generować strony używając mock credentials
- Wszystkie funkcje w `lib/shopify/index.ts` rzucały błędy podczas SSG

**Rozwiązanie:**
✅ **Implementowano Mock Mode** - wszystkie Shopify fetch functions z graceful fallback:

1. ✅ **Wrapped 8 functions w try-catch**:
   - `getMenu()` - return `[]` on error
   - `getCollection()` - return `undefined` on error
   - `getCollectionProducts()` - return `[]` on error
   - `getCollections()` - return default "All" collection on error
   - `getPage()` - return mock page object on error
   - `getPages()` - return `[]` on error
   - `getProduct()` - return `undefined` on error
   - `getProductRecommendations()` - return `[]` on error
   - `getProducts()` - return `[]` on error

2. ✅ **Console warnings dodane**:
   \`\`\`typescript
   console.warn(`[Mock Mode] getMenu failed for handle: ${handle}, returning empty array`);
   \`\`\`
   - Pozwala na debugowanie w build logs
   - Wyraźnie oznacza mock mode działanie

3. ✅ **Production build test - SUCCESS**:
   \`\`\`bash
   pnpm build
   \`\`\`
   - ✅ Compiled successfully in 2.7s
   - ✅ 9/9 static pages generated
   - ✅ Route (app) built successfully
   - ✅ No errors, tylko warnings "[Mock Mode]" w konsoli

**Build Output:**
\`\`\`
Route (app)                                  Size  First Load JS
┌ ƒ /                                     4.06 kB         121 kB
├ ƒ /_not-found                             985 B         102 kB
├ ƒ /[page]                                 142 B         101 kB
├ ƒ /product/[handle]                     4.88 kB         114 kB
├ ƒ /search                                 175 B         110 kB
├ ƒ /search/[collection]                    175 B         110 kB
└ ƒ /sitemap.xml                            142 B         101 kB
\`\`\`

**Kluczowa Decyzja:**
🎯 **Mock Mode Strategy**: Zamiast blokować build, gracefully failujemy Shopify API calls i zwracamy puste/default dane. To pozwala:
- ✅ Deploy do Netlify bez backend
- ✅ Skupienie 100% na designie i UI
- ✅ Łatwa wymiana na prawdziwe API później
- ✅ Development bez external dependencies

**Następny Krok:**
Git commit + przygotowanie do deploy na Netlify

---

## 📋 Checklisty

### ✅ Planning Checklist
- [x] CLAUDE.md utworzony
- [x] IMPLEMENTATION_PLAN.md utworzony
- [x] QUICKSTART.md utworzony
- [x] PROGRESS_LOG.md utworzony
- [x] Struktura dokumentacji gotowa
- [ ] **NEXT:** Inicjalizacja projektu

### ⏳ Phase 1 Checklist (Foundation)
- [x] ✅ Vercel Commerce template cloned
- [x] ✅ Dependencies zainstalowane (zustand, RHF, zod, framer-motion, lucide, embla)
- [x] ✅ shadcn/ui zainicjalizowany
- [x] ✅ shadcn/ui komponenty dodane (button, card, input, sheet, dialog, badge, form, etc.)
- [x] ✅ Struktura folderów utworzona
- [x] ✅ Custom colors dodane do globals.css
- [x] ✅ Button component zaktualizowany (rounded-xl)
- [ ] Zustand cart store utworzony
- [x] ✅ Git initialized
- [x] ✅ Pierwszy commit wykonany
- [x] ✅ `pnpm dev` działa
- [ ] `pnpm build` sukces (test pending)

### ⏳ Phase 2 Checklist (Design System)
- [ ] Tailwind colors skonfigurowane
- [ ] Fonts setup (Geist + Space Grotesk)
- [ ] Button variants (gold, outline, ghost)
- [ ] Card variants (dark, light)
- [ ] CVA setup dla komponentów
- [ ] Test preview w przeglądarce

### ⏳ Phase 3 Checklist (Data Layer)
- [ ] TypeScript types (Product, Category, Cart)
- [ ] Mock data: products.json (10+ produktów)
- [ ] Mock data: categories.json (4-6 kategorii)
- [ ] Site config (src/config/site.ts)
- [ ] Utils functions (formatPrice, formatDate)
- [ ] Test data import

---

## 🎯 Cele na Dziś (2025-10-15)

**Target:** Ukończenie Phase 1 + Phase 2

- [x] ✅ Planning & Documentation (45 min) - DONE
- [ ] 🟡 Phase 1: Foundation Setup (2-3h) - IN PROGRESS
- [ ] ⏳ Phase 2: Design System (2-3h) - PENDING
- [ ] ⏳ Phase 3: Data Layer (start) - jeśli zostanie czas

**Szacowany czas:** 5-7 godzin dzisiaj

---

## 📊 Statystyki

**Całkowity Czas Pracy:** ~2.5 godziny (150 minut)
**Ukończone Taski:** 8/14 (57%)
**Pozostałe Taski:** 6
**Szacowany Pozostały Czas:** 25-35 godzin

**Breakdown:**
- Planning: 45 min
- Phase 1 (Foundation): 40 min
- Phase 2 (Homepage + Mock Mode): 50 min
- Dokumentacja i troubleshooting: 15 min

---

## 💭 Notatki i Insights

### Dobre Decyzje
- ✅ Szczegółowa dokumentacja na początku oszczędzi czas później
- ✅ Vercel Commerce jako fundament - sprawdzony template
- ✅ Hybrydowy design - unique approach, differentiation

### Potencjalne Wyzwania
- ⚠️ Integracja z Vercel Commerce API (custom data layer)
- ⚠️ Performance optimization (duże obrazy produktów)
- ⚠️ Dark/Light theme switching (planujesz?)

### Do Przemyślenia
- 🤔 Czy dodać dark mode toggle? (opcjonalnie)
- 🤔 Strategia cache'owania obrazów
- 🤔 SEO optimization strategy
- 🤔 Analytics integration (Google Analytics? Vercel Analytics?)

---

## 🔄 Aktualizacje

**Ostatnia Aktualizacja:** 2025-10-15 14:45
**Następna Aktualizacja:** Po ukończeniu Phase 1

---

> 💡 **Tip:** Commituj często! Minimum jeden commit po każdej zakończonej fazie.

> 🎯 **Motto:** "Progress over perfection. Ship iteratively."

```

# docs\QUICKSTART.md

```md
# Gawin-Home - Quick Start Guide

**🚀 Szybki Start dla Developera**
**Czas Setup: ~30 minut**

---

## 📋 Wymagania Wstępne

\`\`\`bash
# Sprawdź wersje
node --version   # v18+ wymagane
pnpm --version   # v8+ zalecane (lub npm/yarn)
git --version    # Git zainstalowany
\`\`\`

---

## 🎯 Krok 1: Clone Vercel Commerce (5 min)

### Opcja A: Użyj Vercel CLI (ZALECANE)

\`\`\`bash
# Przejdź do folderu roboczego
cd C:\Users\NicoN\Desktop\Claude

# Clone szablon Vercel Commerce
npx create-next-app@latest gawin-home \
  --example https://github.com/vercel/commerce \
  --use-pnpm

# Przejdź do projektu
cd gawin-home
\`\`\`

### Opcja B: Clone z GitHub

\`\`\`bash
cd C:\Users\NicoN\Desktop\Claude

git clone https://github.com/vercel/commerce.git gawin-home
cd gawin-home

# Zainstaluj dependencies
pnpm install
\`\`\`

### ✅ Weryfikacja
\`\`\`bash
pnpm dev
\`\`\`
Otwórz: http://localhost:3000 - powinna załadować się domyślna strona Vercel Commerce.

---

## 🎯 Krok 2: Instalacja Dodatkowych Pakietów (10 min)

### 2.1 Zarządzanie Stanem i Formularze

\`\`\`bash
pnpm add zustand react-hook-form zod @hookform/resolvers
\`\`\`

**Co to daje:**
- `zustand` - globalny state (koszyk, wishlist)
- `react-hook-form` - professional forms
- `zod` - schema validation
- `@hookform/resolvers` - bridge RHF + Zod

### 2.2 Ikony i Animacje

\`\`\`bash
pnpm add lucide-react framer-motion embla-carousel-react
\`\`\`

**Co to daje:**
- `lucide-react` - modern icon library
- `framer-motion` - smooth animations
- `embla-carousel-react` - efficient carousels

### 2.3 shadcn/ui Setup

**shadcn/ui instalujemy INACZEJ - nie przez pnpm install!**

\`\`\`bash
# Inicjalizacja shadcn/ui
npx shadcn@latest init

# Odpowiedzi na pytania:
# ✅ Would you like to use TypeScript? Yes
# ✅ Which style would you like to use? New York
# ✅ Which color would you like to use as base color? Neutral
# ✅ Where is your global CSS file? src/app/globals.css (sprawdź ścieżkę!)
# ✅ Would you like to use CSS variables for colors? Yes
# ✅ Where is your tailwind.config.js located? tailwind.config.ts
# ✅ Configure the import alias for components? @/components
# ✅ Configure the import alias for utils? @/lib/utils
\`\`\`

**Dodaj komponenty UI:**
\`\`\`bash
# Core components (Must have)
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add sheet
npx shadcn@latest add dialog
npx shadcn@latest add badge
npx shadcn@latest add separator

# Form components
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add radio-group
npx shadcn@latest add checkbox

# Layout components
npx shadcn@latest add accordion
npx shadcn@latest add skeleton
\`\`\`

### ✅ Weryfikacja
\`\`\`bash
# Sprawdź czy powstały foldery:
ls src/components/ui          # powinny być komponenty
ls src/lib/utils.ts           # powinien być utils.ts z cn()
\`\`\`

---

## 🎯 Krok 3: Konfiguracja Design System (10 min)

### 3.1 Customize Tailwind Colors

**Edytuj `src/app/globals.css` (lub `app/globals.css` - sprawdź gdzie jest!):**

Dodaj na początku pliku (ZARAZ PO `@tailwind` directives):

\`\`\`css
@layer base {
  :root {
    /* === DARK ENTRY COLORS === */
    --dark-bg: 26 26 26;           /* #1a1a1a */
    --dark-surface: 37 37 37;       /* #252525 */
    --gold-primary: 212 175 55;     /* #d4af37 */
    --gold-hover: 193 155 43;       /* #c19b2b */
    --text-light: 245 245 245;      /* #f5f5f5 */
    --text-muted: 160 160 160;      /* #a0a0a0 */

    /* === LIGHT SHOWROOM COLORS === */
    --light-bg: 255 255 255;        /* #ffffff */
    --cream-bg: 245 245 240;        /* #f5f5f0 */
    --light-surface: 250 250 250;   /* #fafafa */
    --border-light: 229 229 229;    /* #e5e5e5 */
    --text-dark: 26 26 26;          /* #1a1a1a */
    --text-gray: 102 102 102;       /* #666666 */

    /* === SEMANTIC COLORS (Already in Commerce) === */
    /* Użyj istniejących z Vercel Commerce i dodaj nasze custom */
  }
}

/* === CUSTOM UTILITY CLASSES === */
@layer utilities {
  .bg-dark-entry {
    background-color: rgb(var(--dark-bg));
  }

  .bg-light-showroom {
    background-color: rgb(var(--light-bg));
  }

  .text-gold {
    color: rgb(var(--gold-primary));
  }

  .border-gold {
    border-color: rgb(var(--gold-primary));
  }

  /* Add more as needed */
}
\`\`\`

### 3.2 Update Button Component

**Znajdź i edytuj `src/components/ui/button.tsx`:**

Zmień `rounded-md` na `rounded-xl` w base classes:

\`\`\`typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl ...", // 🎯 ZMIANA: rounded-xl
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        gold: "bg-[rgb(var(--gold-primary))] text-[rgb(var(--dark-bg))] hover:bg-[rgb(var(--gold-hover))]", // NEW
        // ... reszta wariantów
      },
      // ...
    }
  }
);
\`\`\`

### 3.3 Custom Fonts (Opcjonalne)

Vercel Commerce już ma Geist font. Jeśli chcesz dodać Space Grotesk:

**Edytuj `src/app/layout.tsx`:**
\`\`\`typescript
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      className={`${GeistSans.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
\`\`\`

---

## 🎯 Krok 4: Struktura Projektu (5 min)

### 4.1 Dodaj Brakujące Foldery

\`\`\`bash
# Utwórz strukturę dla Gawin-Home
mkdir -p src/components/commerce/{product,cart,checkout}
mkdir -p src/components/sections/{home,shop}
mkdir -p src/lib/{commerce,hooks,validations}
mkdir -p src/stores
mkdir -p src/data
mkdir -p public/images/{products,categories,hero,logos}
\`\`\`

### 4.2 Utwórz Podstawowe Pliki Config

**Utwórz `src/config/site.ts`:**
\`\`\`typescript
export const siteConfig = {
  name: "Gawin Home",
  description: "Premium meble dla wymagających",
  url: "https://gawin-home.vercel.app",
};
\`\`\`

**Utwórz `src/lib/utils.ts` (jeśli nie istnieje):**
\`\`\`typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = "PLN"): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
  }).format(amount);
}
\`\`\`

---

## 🎯 Krok 5: Zustand Store Setup (5 min)

### 5.1 Cart Store

**Utwórz `src/stores/useCartStore.ts`:**
\`\`\`typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "gawin-cart-storage",
    }
  )
);
\`\`\`

---

## 🎯 Krok 6: Test Build (2 min)

### 6.1 Development Server

\`\`\`bash
pnpm dev
\`\`\`
Otwórz: http://localhost:3000

### 6.2 Production Build

\`\`\`bash
pnpm build
\`\`\`

**Sprawdź output:**
- ✅ Build success
- ✅ No TypeScript errors
- ✅ No ESLint errors

---

## 🎯 Krok 7: Git Setup (3 min)

\`\`\`bash
# Jeśli jeszcze nie zainicjalizowano
git init

# Dodaj wszystkie pliki
git add .

# Pierwszy commit
git commit -m "chore: initial setup with Vercel Commerce + custom packages

- Added zustand for state management
- Added react-hook-form + zod for forms
- Added lucide-react, framer-motion, embla-carousel
- Configured shadcn/ui with custom design system
- Created folder structure for Gawin-Home
- Set up cart store with zustand"

# Utwórz repo na GitHub i połącz (opcjonalnie)
# git remote add origin https://github.com/your-username/gawin-home.git
# git push -u origin main
\`\`\`

---

## ✅ Checklist Weryfikacyjna

Po ukończeniu Quick Start, sprawdź:

- [ ] ✅ `pnpm dev` działa bez błędów
- [ ] ✅ `pnpm build` kończy się sukcesem
- [ ] ✅ shadcn/ui komponenty w `src/components/ui/`
- [ ] ✅ `cn()` utility w `src/lib/utils.ts`
- [ ] ✅ Zustand cart store w `src/stores/useCartStore.ts`
- [ ] ✅ Custom colors w `globals.css`
- [ ] ✅ Button z `rounded-xl`
- [ ] ✅ Wszystkie pakiety zainstalowane (sprawdź `package.json`)
- [ ] ✅ Git commit zrobiony

---

## 🚀 Następne Kroki

**Po ukończeniu Quick Start, przejdź do:**

1. **Data Layer Setup** (`IMPLEMENTATION_PLAN.md` → Phase 3)
   - Utwórz TypeScript types
   - Dodaj mock data (products.json)
   - Test data loading

2. **Homepage Implementation** (`IMPLEMENTATION_PLAN.md` → Phase 4)
   - Header component
   - Hero section (dark entry)
   - Featured products
   - Categories showcase

3. **Product Pages** (`IMPLEMENTATION_PLAN.md` → Phase 5)
   - Product listing (light showroom)
   - Product details
   - Cart integration

---

## 📚 Przydatne Komendy

\`\`\`bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript check

# shadcn/ui
npx shadcn@latest add [component]   # Dodaj komponent
npx shadcn@latest add --help        # Lista komponentów

# Zustand DevTools (opcjonalnie)
# Install: pnpm add -D @redux-devtools/extension
\`\`\`

---

## 🐛 Troubleshooting

### Problem: `pnpm dev` nie startuje

**Rozwiązanie:**
\`\`\`bash
# Usuń node_modules i lockfile
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install

# Spróbuj ponownie
pnpm dev
\`\`\`

### Problem: shadcn/ui nie znalazł `globals.css`

**Rozwiązanie:**
Sprawdź dokładną ścieżkę:
\`\`\`bash
# Może być:
# - src/app/globals.css
# - app/globals.css
# - styles/globals.css

# Podaj prawidłową ścieżkę podczas `npx shadcn@latest init`
\`\`\`

### Problem: TypeScript errors w `button.tsx`

**Rozwiązanie:**
\`\`\`bash
# Update types
pnpm add -D @types/react@latest @types/node@latest
\`\`\`

---

## 📖 Dokumentacja

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Commerce Docs](https://vercel.com/docs/commerce)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)

---

**Status:** ✅ Ready to Start!
**Szacowany czas setup:** ~30 minut
**Następny krok:** Data Layer Setup

---

> 🎯 **Goal:** Clean setup, wszystko działa, gotowy do implementacji features.

> 💡 **Pro Tip:** Po setup zrób snapshot projektu (commit lub backup), żeby móc wrócić do czystego stanu jeśli coś pójdzie nie tak.

```

# fonts\Inter-Bold.ttf

This is a binary file of the type: Binary

# lib\constants.ts

```ts
export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';

```

# lib\shopify\fragments\cart.ts

```ts
import productFragment from './product';

const cartFragment = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                ...product
              }
            }
          }
        }
      }
    }
    totalQuantity
  }
  ${productFragment}
`;

export default cartFragment;

```

# lib\shopify\fragments\image.ts

```ts
const imageFragment = /* GraphQL */ `
  fragment image on Image {
    url
    altText
    width
    height
  }
`;

export default imageFragment;

```

# lib\shopify\fragments\product.ts

```ts
import imageFragment from './image';
import seoFragment from './seo';

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;

```

# lib\shopify\fragments\seo.ts

```ts
const seoFragment = /* GraphQL */ `
  fragment seo on SEO {
    description
    title
  }
`;

export default seoFragment;

```

# lib\shopify\index.ts

```ts
import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS
} from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import {
  revalidateTag,
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife
} from 'next/cache';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import { getMenuQuery } from './queries/menu';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';
import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never;

export async function shopifyFetch<T>({
  headers,
  query,
  variables
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: cart.cost.totalAmount.currencyCode
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (
  collection: ShopifyCollection
): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true
) => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    }
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    }
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    }
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(): Promise<Cart | undefined> {
  const cartId = (await cookies()).get('cartId')?.value;

  if (!cartId) {
    return undefined;
  }

  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId }
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  // 'use cache'; // Disabled for stable Next.js
  // cacheTag(TAGS.collections);
  // cacheLife('days');

  try {
    const res = await shopifyFetch<ShopifyCollectionOperation>({
      query: getCollectionQuery,
      variables: {
        handle
      }
    });

    return reshapeCollection(res.body.data.collection);
  } catch (error) {
    console.warn(`[Mock Mode] getCollection failed for handle: ${handle}, returning undefined`);
    return undefined;
  }
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  // 'use cache'; // Disabled for stable Next.js
  // cacheTag(TAGS.collections, TAGS.products);
  // cacheLife('days');

  try {
    const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
      query: getCollectionProductsQuery,
      variables: {
        handle: collection,
        reverse,
        sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
      }
    });

    if (!res.body.data.collection) {
      console.log(`No collection found for \`${collection}\``);
      return [];
    }

    return reshapeProducts(
      removeEdgesAndNodes(res.body.data.collection.products)
    );
  } catch (error) {
    console.warn(`[Mock Mode] getCollectionProducts failed for collection: ${collection}, returning empty array`);
    return [];
  }
}

export async function getCollections(): Promise<Collection[]> {
  // 'use cache'; // Disabled for stable Next.js
  // cacheTag(TAGS.collections);
  // cacheLife('days');

  try {
    const res = await shopifyFetch<ShopifyCollectionsOperation>({
      query: getCollectionsQuery
    });
    const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
    const collections = [
      {
        handle: '',
        title: 'All',
        description: 'All products',
        seo: {
          title: 'All',
          description: 'All products'
        },
        path: '/search',
        updatedAt: new Date().toISOString()
      },
      // Filter out the `hidden` collections.
      // Collections that start with `hidden-*` need to be hidden on the search page.
      ...reshapeCollections(shopifyCollections).filter(
        (collection) => !collection.handle.startsWith('hidden')
      )
    ];

    return collections;
  } catch (error) {
    console.warn('[Mock Mode] getCollections failed, returning default "All" collection');
    return [
      {
        handle: '',
        title: 'All',
        description: 'All products',
        seo: {
          title: 'All',
          description: 'All products'
        },
        path: '/search',
        updatedAt: new Date().toISOString()
      }
    ];
  }
}

export async function getMenu(handle: string): Promise<Menu[]> {
  // 'use cache'; // Disabled for stable Next.js
  // cacheTag(TAGS.collections);
  // cacheLife('days');

  try {
    const res = await shopifyFetch<ShopifyMenuOperation>({
      query: getMenuQuery,
      variables: {
        handle
      }
    });

    return (
      res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
        title: item.title,
        path: item.url
          .replace(domain, '')
          .replace('/collections', '/search')
          .replace('/pages', '')
      })) || []
    );
  } catch (error) {
    console.warn(`[Mock Mode] getMenu failed for handle: ${handle}, returning empty array`);
    return [];
  }
}

export async function getPage(handle: string): Promise<Page> {
  try {
    const res = await shopifyFetch<ShopifyPageOperation>({
      query: getPageQuery,
      variables: { handle }
    });

    return res.body.data.pageByHandle;
  } catch (error) {
    console.warn(`[Mock Mode] getPage failed for handle: ${handle}, returning mock page`);
    return {
      id: `mock-${handle}`,
      title: handle,
      handle,
      body: '',
      bodySummary: '',
      seo: {
        title: handle,
        description: ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

export async function getPages(): Promise<Page[]> {
  try {
    const res = await shopifyFetch<ShopifyPagesOperation>({
      query: getPagesQuery
    });

    return removeEdgesAndNodes(res.body.data.pages);
  } catch (error) {
    console.warn('[Mock Mode] getPages failed, returning empty array');
    return [];
  }
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  // 'use cache'; // Disabled for stable Next.js
  // cacheTag(TAGS.products);
  // cacheLife('days');

  try {
    const res = await shopifyFetch<ShopifyProductOperation>({
      query: getProductQuery,
      variables: {
        handle
      }
    });

    return reshapeProduct(res.body.data.product, false);
  } catch (error) {
    console.warn(`[Mock Mode] getProduct failed for handle: ${handle}, returning undefined`);
    return undefined;
  }
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  // 'use cache'; // Disabled for stable Next.js
  // cacheTag(TAGS.products);
  // cacheLife('days');

  try {
    const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
      query: getProductRecommendationsQuery,
      variables: {
        productId
      }
    });

    return reshapeProducts(res.body.data.productRecommendations);
  } catch (error) {
    console.warn(`[Mock Mode] getProductRecommendations failed for productId: ${productId}, returning empty array`);
    return [];
  }
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  // 'use cache'; // Disabled for stable Next.js
  // cacheTag(TAGS.products);
  // cacheLife('days');

  try {
    const res = await shopifyFetch<ShopifyProductsOperation>({
      query: getProductsQuery,
      variables: {
        query,
        reverse,
        sortKey
      }
    });

    return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
  } catch (error) {
    console.warn(`[Mock Mode] getProducts failed, returning empty array`);
    return [];
  }
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = [
    'collections/create',
    'collections/delete',
    'collections/update'
  ];
  const productWebhooks = [
    'products/create',
    'products/delete',
    'products/update'
  ];
  const topic = (await headers()).get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 401 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

```

# lib\shopify\mutations\cart.ts

```ts
import cartFragment from '../fragments/cart';

export const addToCartMutation = /* GraphQL */ `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const createCartMutation = /* GraphQL */ `
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const editCartItemsMutation = /* GraphQL */ `
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = /* GraphQL */ `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

```

# lib\shopify\queries\cart.ts

```ts
import cartFragment from '../fragments/cart';

export const getCartQuery = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${cartFragment}
`;

```

# lib\shopify\queries\collection.ts

```ts
import productFragment from '../fragments/product';
import seoFragment from '../fragments/seo';

const collectionFragment = /* GraphQL */ `
  fragment collection on Collection {
    handle
    title
    description
    seo {
      ...seo
    }
    updatedAt
  }
  ${seoFragment}
`;

export const getCollectionQuery = /* GraphQL */ `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionFragment}
`;

export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      products(sortKey: $sortKey, reverse: $reverse, first: 100) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

```

# lib\shopify\queries\menu.ts

```ts
export const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;

```

# lib\shopify\queries\page.ts

```ts
import seoFragment from '../fragments/seo';

const pageFragment = /* GraphQL */ `
  fragment page on Page {
    ... on Page {
      id
      title
      handle
      body
      bodySummary
      seo {
        ...seo
      }
      createdAt
      updatedAt
    }
  }
  ${seoFragment}
`;

export const getPageQuery = /* GraphQL */ `
  query getPage($handle: String!) {
    pageByHandle(handle: $handle) {
      ...page
    }
  }
  ${pageFragment}
`;

export const getPagesQuery = /* GraphQL */ `
  query getPages {
    pages(first: 100) {
      edges {
        node {
          ...page
        }
      }
    }
  }
  ${pageFragment}
`;

```

# lib\shopify\queries\product.ts

```ts
import productFragment from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;

```

# lib\shopify\types.ts

```ts
export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

```

# lib\type-guards.ts

```ts
export interface ShopifyErrorLike {
  status: number;
  message: Error;
  cause?: Error;
}

export const isObject = (object: unknown): object is Record<string, unknown> => {
  return typeof object === 'object' && object !== null && !Array.isArray(object);
};

export const isShopifyError = (error: unknown): error is ShopifyErrorLike => {
  if (!isObject(error)) return false;

  if (error instanceof Error) return true;

  return findError(error);
};

function findError<T extends object>(error: T): boolean {
  if (Object.prototype.toString.call(error) === '[object Error]') {
    return true;
  }

  const prototype = Object.getPrototypeOf(error) as T | null;

  return prototype === null ? false : findError(prototype);
}

```

# lib\utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReadonlyURLSearchParams } from 'next/navigation'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

export function ensureStartsWith(stringToCheck: string, startsWith: string) {
  return stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`
}

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = ['SHOPIFY_STORE_DOMAIN', 'SHOPIFY_STOREFRONT_ACCESS_TOKEN'];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        '\n'
      )}\n`
    );
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes('[') ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes(']')
  ) {
    throw new Error(
      'Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.'
    );
  }
};

```

# license.md

```md
The MIT License (MIT)

Copyright (c) 2025 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference path="./.next/types/routes.d.ts" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.ts

```ts
export default {
  // Removed experimental features that require canary (ppr, useCache)
  // Using stable Next.js 15.5.5
  experimental: {
    inlineCss: true, // Safe for stable
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
};

```

# package.json

```json
{
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "prettier": "prettier --write --ignore-unknown .",
    "prettier:check": "prettier --check --ignore-unknown .",
    "test": "pnpm prettier:check"
  },
  "dependencies": {
    "@headlessui/react": "^2.2.0",
    "@heroicons/react": "^2.2.0",
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.23.24",
    "geist": "^1.3.1",
    "lucide-react": "^0.545.0",
    "next": "15.5.5",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-hook-form": "^7.65.0",
    "sonner": "^2.0.1",
    "tailwind-merge": "^3.3.1",
    "zod": "^4.1.12",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@tailwindcss/container-queries": "^0.1.1",
    "@tailwindcss/postcss": "^4.0.14",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "22.13.10",
    "@types/react": "19.0.12",
    "@types/react-dom": "19.0.4",
    "postcss": "^8.5.3",
    "prettier": "3.5.3",
    "prettier-plugin-tailwindcss": "^0.6.11",
    "tailwindcss": "^4.0.14",
    "tw-animate-css": "^1.4.0",
    "typescript": "5.8.2"
  }
}

```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  }
};

```

# README.md

```md
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&env=COMPANY_NAME,SHOPIFY_REVALIDATION_SECRET,SHOPIFY_STORE_DOMAIN,SHOPIFY_STOREFRONT_ACCESS_TOKEN,SITE_NAME)

# Next.js Commerce

A high-performance, server-rendered Next.js App Router ecommerce application.

This template uses React Server Components, Server Actions, `Suspense`, `useOptimistic`, and more.

<h3 id="v1-note"></h3>

> Note: Looking for Next.js Commerce v1? View the [code](https://github.com/vercel/commerce/tree/v1), [demo](https://commerce-v1.vercel.store), and [release notes](https://github.com/vercel/commerce/releases/tag/v1).

## Providers

Vercel will only be actively maintaining a Shopify version [as outlined in our vision and strategy for Next.js Commerce](https://github.com/vercel/commerce/pull/966).

Vercel is happy to partner and work with any commerce provider to help them get a similar template up and running and listed below. Alternative providers should be able to fork this repository and swap out the `lib/shopify` file with their own implementation while leaving the rest of the template mostly unchanged.

- Shopify (this repository)
- [BigCommerce](https://github.com/bigcommerce/nextjs-commerce) ([Demo](https://next-commerce-v2.vercel.app/))
- [Ecwid by Lightspeed](https://github.com/Ecwid/ecwid-nextjs-commerce/) ([Demo](https://ecwid-nextjs-commerce.vercel.app/))
- [Geins](https://github.com/geins-io/vercel-nextjs-commerce) ([Demo](https://geins-nextjs-commerce-starter.vercel.app/))
- [Medusa](https://github.com/medusajs/vercel-commerce) ([Demo](https://medusa-nextjs-commerce.vercel.app/))
- [Prodigy Commerce](https://github.com/prodigycommerce/nextjs-commerce) ([Demo](https://prodigy-nextjs-commerce.vercel.app/))
- [Saleor](https://github.com/saleor/nextjs-commerce) ([Demo](https://saleor-commerce.vercel.app/))
- [Shopware](https://github.com/shopwareLabs/vercel-commerce) ([Demo](https://shopware-vercel-commerce-react.vercel.app/))
- [Swell](https://github.com/swellstores/verswell-commerce) ([Demo](https://verswell-commerce.vercel.app/))
- [Umbraco](https://github.com/umbraco/Umbraco.VercelCommerce.Demo) ([Demo](https://vercel-commerce-demo.umbraco.com/))
- [Wix](https://github.com/wix/headless-templates/tree/main/nextjs/commerce) ([Demo](https://wix-nextjs-commerce.vercel.app/))
- [Fourthwall](https://github.com/FourthwallHQ/vercel-commerce) ([Demo](https://vercel-storefront.fourthwall.app/))

> Note: Providers, if you are looking to use similar products for your demo, you can [download these assets](https://drive.google.com/file/d/1q_bKerjrwZgHwCw0ovfUMW6He9VtepO_/view?usp=sharing).

## Integrations

Integrations enable upgraded or additional functionality for Next.js Commerce

- [Orama](https://github.com/oramasearch/nextjs-commerce) ([Demo](https://vercel-commerce.oramasearch.com/))

  - Upgrades search to include typeahead with dynamic re-rendering, vector-based similarity search, and JS-based configuration.
  - Search runs entirely in the browser for smaller catalogs or on a CDN for larger.

- [React Bricks](https://github.com/ReactBricks/nextjs-commerce-rb) ([Demo](https://nextjs-commerce.reactbricks.com/))
  - Edit pages, product details, and footer content visually using [React Bricks](https://www.reactbricks.com) visual headless CMS.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopify store.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

Your app should now be running on [localhost:3000](http://localhost:3000/).

<details>
  <summary>Expand if you work at Vercel and want to run locally and / or contribute</summary>

1. Run `vc link`.
1. Select the `Vercel Solutions` scope.
1. Connect to the existing `commerce-shopify` project.
1. Run `vc env pull` to get environment variables.
1. Run `pnpm dev` to ensure everything is working correctly.
</details>

## Vercel, Next.js Commerce, and Shopify Integration Guide

You can use this comprehensive [integration guide](https://vercel.com/docs/integrations/ecommerce/shopify) with step-by-step instructions on how to configure Shopify as a headless CMS using Next.js Commerce as your headless Shopify storefront on Vercel.

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2015",
    "lib": ["dom", "dom.iterable", "esnext"],
    "downlevelIteration": true,
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "noUncheckedIndexedAccess": true,
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

