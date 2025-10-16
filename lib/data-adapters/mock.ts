import path from 'node:path';
import { promises as fs } from 'node:fs';

export type MockProduct = {
  slug: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  tags?: string[];
  description?: string;
};

type RawProduct = {
  slug: string;
  name: string;
  description?: string;
  category: string;
  price: {
    amount: number;
    currency: string;
  };
  images: Array<{ url: string; alt: string }>;
  tags?: string[];
};

let cache: { products?: MockProduct[] } = {};

async function readJson<T>(relativePath: string): Promise<T> {
  const file = path.join(process.cwd(), relativePath);
  const data = await fs.readFile(file, 'utf8');
  return JSON.parse(data) as T;
}

export async function getMockProducts(): Promise<MockProduct[]> {
  if (!cache.products) {
    const raw = await readJson<RawProduct[]>(`data/products.json`);
    cache.products = raw.map(p => ({
      slug: p.slug,
      title: p.name,
      price: p.price.amount,
      currency: p.price.currency,
      image: p.images[0]?.url || '',
      category: p.category,
      tags: p.tags,
      description: p.description
    }));
  }
  return cache.products!;
}

export async function getMockProductBySlug(slug: string): Promise<MockProduct | null> {
  const products = await getMockProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getMockCategories(): Promise<string[]> {
  const products = await getMockProducts();
  return Array.from(new Set(products.map((p) => p.category)));
}

