import path from "node:path";
import { promises as fs } from "node:fs";

type Dimensions = {
  w: number;
  h: number;
  d: number;
  unit: string;
};

type Fabric = {
  id: string;
  name: string;
  swatch: string;
};

type RawProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: Array<{ src: string; alt: string }>;
  fabrics: Fabric[];
  dimensions: Dimensions;
  rating: number;
  reviewCount: number;
  badges: string[];
  tags: string[];
};

export type MockProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: RawProduct["images"];
  fabrics: Fabric[];
  dimensions: Dimensions;
  rating: number;
  reviewCount: number;
  badges: string[];
  tags: string[];
};

let cache: { products?: MockProduct[] } = {};

async function readJson<T>(relativePath: string): Promise<T> {
  const file = path.join(process.cwd(), relativePath);
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data) as T;
}

export async function getMockProducts(): Promise<MockProduct[]> {
  if (!cache.products) {
    const raw = await readJson<RawProduct[]>(`mock/products.json`);
    cache.products = raw.map((product) => ({
      ...product,
    }));
  }
  return cache.products!;
}

export async function getMockProductBySlug(
  slug: string,
): Promise<MockProduct | null> {
  const products = await getMockProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getMockCategories(): Promise<string[]> {
  const products = await getMockProducts();
  return Array.from(new Set(products.map((p) => p.category)));
}
