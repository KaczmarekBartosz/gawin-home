import { HeroSection } from "@/components/sections/HeroSection-Legacy";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CategoriesShowcase } from "@/components/sections/CategoriesShowcase";
import { Newsletter } from "@/components/sections/Newsletter";
import { TrustedBrands } from "@/components/sections/TrustedBrands";

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
