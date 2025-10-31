"use client";

import { HeroSection } from "@/components/sections/home/HeroSection";
import { InteractiveProductCarousel } from "@/components/sections/home/CategoriesCarousel";
import { BestsellersCarousel } from "@/components/sections/home/BestsellersCarousel";
import { LookbookGrid } from "@/components/sections/LookbookGrid";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { TrustedBrandsSection } from "@/components/sections/home/TrustedBrandsSection";
import { InstagramSection } from "@/components/sections/home/InstagramSection";
import { NewsletterSection } from "@/components/sections/home/NewsletterSection";
import mockProducts from "@/mock/products.json";
import type { MockProduct } from "@/lib/data-adapters/mock";

export default function HomePage() {
  const bestsellersProducts = mockProducts as MockProduct[];

  return (
    <main className="w-full">
      {/* 1. Hero Section — LEGACY */}
      <HeroSection />

      {/* 2. Categories Carousel — INTERACTIVE */}
      <InteractiveProductCarousel />

      {/* 3. Bestsellers Carousel — LEGACY */}
      <BestsellersCarousel products={bestsellersProducts} />

      {/* 4. Lookbook Gallery — LEGACY */}
      <LookbookGrid />

      {/* 5. Testimonials — LEGACY */}
      <TestimonialsSection />

      {/* 6. Trusted Brands — LEGACY */}
      <TrustedBrandsSection />

      {/* 7. Instagram Gallery — LEGACY */}
      <InstagramSection />

      {/* 8. Newsletter — LEGACY */}
      <NewsletterSection />
    </main>
  );
}
