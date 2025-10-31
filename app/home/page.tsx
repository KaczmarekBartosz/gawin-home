"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { HeroSection as HeroSectionNeo } from "@/components/sections/home/HeroSection";
import { HeroSection as LegacyHeroSection } from "@/components/sections/home/HeroSection.old";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { CollectionsSection } from "@/components/sections/home/CollectionsSection";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FilterSidebar } from "@/components/sections/FilterSidebar";
import { SearchSort } from "@/components/sections/SearchSort";
import { LookbookGrid } from "@/components/sections/LookbookGrid";
import { InteractiveProductCarousel } from "@/components/sections/InteractiveProductCarousel";
import { BestsellersSection } from "@/components/sections/home/BestsellersSection";
import { BestsellersCarousel } from "@/components/sections/home/BestsellersCarousel";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { FeaturesSection } from "@/components/sections/home/FeaturesSection";
import { TrustedBrandsSection } from "@/components/sections/home/TrustedBrandsSection";
import { InstagramSection } from "@/components/sections/home/InstagramSection";
import { NewsletterSection as LegacyNewsletterSection } from "@/components/sections/home/NewsletterSection";
import { NewsletterSection as PremiumNewsletterSection } from "@/components/sections/newsletter/NewsletterSection";
import { CTASection } from "@/components/sections/home/CTASection";
import { FooterLinks } from "@/components/layout/footer/FooterLinks";
import productsData from "@/data/products.json";
import type { MockProduct } from "@/lib/data-adapters/mock";
import mockProducts from "@/mock/products.json";

type Product = (typeof productsData)[number];

type FilterState = {
  priceRange: [number, number];
  categories: string[];
  materials: string[];
  colors: string[];
  inStock: boolean;
};

type SortOption =
  | "newest"
  | "price-low"
  | "price-high"
  | "rating"
  | "popularity"
  | "name-asc";

type SectionVariant = "neo" | "legacy" | "experimental";

interface SectionConfig {
  id: string;
  label: string;
  variant: SectionVariant;
  description?: string;
  element: ReactNode;
}

const DEFAULT_FILTERS: FilterState = {
  priceRange: [100, 5000],
  categories: [],
  materials: [],
  colors: [],
  inStock: false,
};

const SORT_OPTIONS: SortOption[] = [
  "newest",
  "price-low",
  "price-high",
  "rating",
  "popularity",
  "name-asc",
];

const LEGACY_BESTSELLERS: MockProduct[] = mockProducts as MockProduct[];

const VARIANT_STYLES: Record<SectionVariant, string> = {
  neo: "bg-brand-gold text-brand-charcoal",
  legacy: "bg-brand-charcoal text-brand-cream",
  experimental: "bg-brand-copper text-white",
};

const VARIANT_LABELS: Record<SectionVariant, string> = {
  neo: "NEO",
  legacy: "LEGACY",
  experimental: "WOW",
};

const PRODUCT_META: Record<string, { materials: string[]; colors: string[] }> = {
  "sofa-modern-grey": { materials: ["fabric"], colors: ["gray"] },
  "lounge-chair-leather": {
    materials: ["leather", "metal"],
    colors: ["brown", "black"],
  },
  "coffee-table-marble": {
    materials: ["glass", "metal"],
    colors: ["white", "gold"],
  },
  "bed-frame-oak": { materials: ["wood"], colors: ["brown"] },
  "wall-shelf-floating": { materials: ["wood"], colors: ["brown", "black"] },
  "cabinet-storage-white": { materials: ["wood"], colors: ["white"] },
  "pendant-light-gold": { materials: ["metal", "glass"], colors: ["gold"] },
  "wall-art-abstract": { materials: ["fabric"], colors: ["black", "white"] },
  "sofa-sectional-cream": { materials: ["fabric"], colors: ["white", "gold"] },
};

const SORTERS: Record<SortOption, (a: Product, b: Product) => number> = {
  newest: (a, b) =>
    Number(b.isNew) - Number(a.isNew) ||
    (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
  "price-low": (a, b) => a.price - b.price,
  "price-high": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  popularity: (a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
  "name-asc": (a, b) => a.name.localeCompare(b.name, "pl"),
};

const DEFAULT_PRODUCT_META = { materials: [] as string[], colors: [] as string[] };

const isSortOption = (value: string): value is SortOption =>
  SORT_OPTIONS.includes(value as SortOption);

export default function HomePage() {
  const sections: SectionConfig[] = [
    {
      id: "hero-neo",
      label: "Hero — Neo (2025)",
      variant: "neo",
      description:
        "Wersja premium z neomorficznymi akcentami i nową typografią ABC Diatype.",
      element: <HeroSectionNeo />,
    },
    {
      id: "hero-legacy",
      label: "Hero — Legacy (2024)",
      variant: "legacy",
      description:
        "Poprzednia wersja hero z glassmorphismem – utrzymana dla porównania.",
      element: <LegacyHeroSection />,
    },
    {
      id: "category-showcase",
      label: "Category Showcase — Neo",
      variant: "neo",
      description:
        "Nowa, gradientowa sekcja kategorii z animacjami i gridem 4x2.",
      element: <CategoryShowcase />,
    },
    {
      id: "collections-legacy",
      label: "Collections — Legacy",
      variant: "legacy",
      description:
        "Pierwsza wersja kolekcji – klasyczne kafelki z overlayem i CTA.",
      element: <CollectionsSection />,
    },
    {
      id: "product-showcase",
      label: "Product Showcase — Neo (filtry + sortowanie)",
      variant: "neo",
      description:
        "Pełny system filtrowania, wyszukiwania i sortowania korzystający z komponentów Neo.",
      element: <ProductShowcaseBlock />,
    },
    {
      id: "bestsellers-neo",
      label: "Bestsellery — Neo karty",
      variant: "neo",
      description:
        "Nowe karty NeoCard z badge’ami, animacjami i przyciskiem dodania.",
      element: <BestsellersSection />,
    },
    {
      id: "bestsellers-legacy",
      label: "Bestsellery — Legacy carousel",
      variant: "legacy",
      description:
        "Oryginalny karuzelowy moduł bestsellers (Embla) do porównania.",
      element: <BestsellersCarousel products={LEGACY_BESTSELLERS} />,
    },
    {
      id: "lookbook-neo",
      label: "Lookbook — Neo masonry grid",
      variant: "neo",
      description:
        "Nowy lookbook z kartami, overlayami i CTA – sekcja inspiracyjna.",
      element: <LookbookGrid />,
    },
    {
      id: "interactive-carousel",
      label: "Interactive Product Carousel — WOW",
      variant: "experimental",
      description:
        "Eksperymentalna sekcja z animowaną sceną produktu i carousel’em 3D.",
      element: <InteractiveProductCarousel />,
    },
    {
      id: "features-legacy",
      label: "Features — Legacy",
      variant: "legacy",
      description:
        "Sekcja benefitów z poprzedniego layoutu – zachowana do ewaluacji.",
      element: <FeaturesSection />,
    },
    {
      id: "testimonials-legacy",
      label: "Testimonials — Legacy",
      variant: "legacy",
      description:
        "Dotychczasowe opinie klientów (karuzela) z poprzedniej iteracji.",
      element: <TestimonialsSection />,
    },
    {
      id: "trusted-brands",
      label: "Trusted Brands — Legacy",
      variant: "legacy",
      description:
        "Sekcja logotypów partnerów – szybki blok zaufania do porównania.",
      element: <TrustedBrandsSection />,
    },
    {
      id: "instagram-gallery",
      label: "Instagram Gallery — Legacy",
      variant: "legacy",
      description:
        "Siatka social proof bazująca na zdjęciach – wersja sprzed redesignu.",
      element: <InstagramSection />,
    },
    {
      id: "newsletter-neo",
      label: "Newsletter — Neo premium",
      variant: "neo",
      description:
        "Nowa wersja premium z glassmorphismem i gradientową kartą.",
      element: <PremiumNewsletterSection />,
    },
    {
      id: "newsletter-legacy",
      label: "Newsletter — Legacy",
      variant: "legacy",
      description:
        "Poprzednia sekcja zapisu (formularz z Button/Input) do porównania.",
      element: <LegacyNewsletterSection />,
    },
    {
      id: "cta-legacy",
      label: "CTA — Legacy",
      variant: "legacy",
      description:
        "Dotychczasowy call-to-action – zachowany, aby zdecydować o dalszych losach.",
      element: <CTASection />,
    },
    {
      id: "footer-links-neo",
      label: "Footer Links — Neo",
      variant: "neo",
      description:
        "Nowe linki stopki z ikonami social i układem full-width.",
      element: <FooterLinks variant="full" />,
    },
  ];

  return (
    <main className="bg-brand-cream text-brand-charcoal pt-24">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-charcoal text-brand-cream px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
          Biblioteka sekcji
        </span>
        <h1 className="mt-6 text-display-hero">
          Wszystkie warianty sekcji Gawin-Home
        </h1>
        <p className="mt-4 max-w-3xl text-body-large text-brand-charcoal/70">
          Zebraliśmy każdy moduł – stary i nowy – w jednym widoku. Możesz je
          teraz porównać, wybrać najlepsze wersje i zadecydować, które zostają w
          finalnym układzie strony.
        </p>
      </header>

      <div className="space-y-16 pb-24">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${VARIANT_STYLES[section.variant]}`}
                >
                  {VARIANT_LABELS[section.variant]}
                </span>
                <h2 className="text-h2">{section.label}</h2>
              </div>
              {section.description && (
                <p className="mt-2 text-body text-brand-charcoal/70 md:max-w-3xl">
                  {section.description}
                </p>
              )}
            </div>

            <div className="relative">{section.element}</div>
          </section>
        ))}
      </div>
    </main>
  );
}

function ProductShowcaseBlock() {
  const [filters, setFilters] = useState<FilterState>(() => ({
    priceRange: [...DEFAULT_FILTERS.priceRange] as [number, number],
    categories: [],
    materials: [],
    colors: [],
    inStock: false,
  }));
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(
    () => filterProducts(productsData, filters, searchQuery),
    [filters, searchQuery],
  );

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy],
  );

  const activeFiltersCount = useMemo(
    () => countActiveFilters(filters),
    [filters],
  );

  const handleFilterChange = (state: FilterState) => {
    setFilters({
      ...state,
      priceRange: [...state.priceRange] as [number, number],
    });
  };

  const handleSortChange = (value: string) => {
    setSortBy(isSortOption(value) ? value : "newest");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
        <div className="mb-10 text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-cream px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-charcoal/80">
            Kolekcja produktów
          </span>
          <h3 className="text-h1">Zoptymalizowane filtrowanie Neo</h3>
          <p className="text-body-large text-brand-charcoal/70 max-w-3xl mx-auto">
            Przetestuj filtry, wyszukiwarkę i sortowanie na realnych danych –
            wszystko w zgodzie z nową stylistyką neomorficzną.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:hidden">
          <div className="flex items-center justify-between rounded-2xl bg-brand-cream px-4 py-3 shadow-neo-light">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-charcoal">
                Filtry
              </p>
              <p className="text-caption text-brand-charcoal/60">
                Aktywne: {activeFiltersCount}
              </p>
            </div>
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="rounded-xl bg-brand-charcoal px-4 py-2 text-sm font-semibold text-brand-cream shadow-neo-light transition-transform hover:-translate-y-0.5 hover:shadow-neo-medium"
              type="button"
            >
              Otwórz
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <FilterSidebar
            onFilterChange={handleFilterChange}
            isMobileOpen={isMobileFiltersOpen}
            onMobileClose={() => setIsMobileFiltersOpen(false)}
          />

          <div className="flex-1 space-y-8">
            <SearchSort
              totalProducts={sortedProducts.length}
              onSearchChange={setSearchQuery}
              onSortChange={handleSortChange}
              defaultSort="newest"
            />

            <ProductGrid products={sortedProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

function filterProducts(
  source: Product[],
  filters: FilterState,
  query: string,
): Product[] {
  const normalizedQuery = query.trim().toLowerCase();

  return source.filter((product) => {
    if (product.price < filters.priceRange[0]) return false;
    if (product.price > filters.priceRange[1]) return false;

    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    const meta = PRODUCT_META[product.id] ?? DEFAULT_PRODUCT_META;

    if (
      filters.materials.length > 0 &&
      !filters.materials.some((material) => meta.materials.includes(material))
    ) {
      return false;
    }

    if (
      filters.colors.length > 0 &&
      !filters.colors.some((color) => meta.colors.includes(color))
    ) {
      return false;
    }

    if (filters.inStock && !product.inStock) {
      return false;
    }

    if (normalizedQuery.length > 0) {
      const haystack = `${product.name} ${product.description ?? ""}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}

function sortProducts(items: Product[], sortBy: SortOption): Product[] {
  const sorter = SORTERS[sortBy] ?? SORTERS.newest;
  return [...items].sort(sorter);
}

function countActiveFilters(filters: FilterState): number {
  const priceModified =
    filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
    filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1];

  return (
    filters.categories.length +
    filters.materials.length +
    filters.colors.length +
    (filters.inStock ? 1 : 0) +
    (priceModified ? 1 : 0)
  );
}
