import { HeroSection } from '@/components/sections/home/HeroSection';
import { CollectionsSection } from '@/components/sections/home/CollectionsSection';
import { BestsellersSection } from '@/components/sections/home/BestsellersSection';
import { NewsletterSection } from '@/components/sections/home/NewsletterSection';

export const metadata = {
  title: 'Gawin-Home - Meble Premium',
  description:
    'Odkryj kolekcję mebli premium. Ponadczasowy design, najwyższa jakość wykonania. Perfekcja w prostocie.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Tryb "Elegancki" (Ciemny) */}
      <HeroSection />

      {/* Collections Section - Tryb "Showroom" (Jasny) */}
      <CollectionsSection />

      {/* Bestsellers Section - Tryb "Showroom" (Jasny) */}
      <BestsellersSection />

      {/* Newsletter Section - Tryb "Showroom" (Jasny) */}
      <NewsletterSection />
    </div>
  );
}
