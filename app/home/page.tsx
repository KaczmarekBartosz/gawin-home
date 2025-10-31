"use client";

import { HeroSection } from "@/components/sections/home/HeroSection";
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

      {/* 2. Bestsellers Carousel — LEGACY */}
      <BestsellersCarousel products={bestsellersProducts} />

      {/* 3. Lookbook Gallery — LEGACY */}
      <LookbookGrid />

      {/* 4. Testimonials — LEGACY */}
      <TestimonialsSection />

      {/* 5. Trusted Brands — LEGACY */}
      <TrustedBrandsSection />

      {/* 6. Instagram Gallery — LEGACY */}
      <InstagramSection />

      {/* 7. Newsletter — LEGACY */}
      <NewsletterSection />
    </main>
  );
}
