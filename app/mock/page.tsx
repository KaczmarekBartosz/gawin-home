import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { CategoriesShowcase } from "@/components/sections/categories-showcase";
import { Newsletter } from "@/components/sections/newsletter";
import { TrustedBrands } from "@/components/sections/trusted-brands";

export const metadata = {
  title: "Gawin-Home — Strona Główna (Mock)",
  description:
    "Projektowanie layoutu i treści: hybrydowy design Dark Entry + Light Showroom na mockowych danych.",
};

export default function MockLanding() {
  return (
    <div className="dark">
      <HeroSection />
      <TrustedBrands />
      <FeaturedProducts />
      <CategoriesShowcase />
      <Newsletter />
    </div>
  );
}
