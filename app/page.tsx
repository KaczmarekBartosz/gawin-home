import { HeroSection } from '@/components/sections/home/HeroSection';
import { TrustedBrandsSection } from '@/components/sections/home/TrustedBrandsSection';
import { CollectionsSection } from '@/components/sections/home/CollectionsSection';
import { BestsellersSection } from '@/components/sections/home/BestsellersSection';
import { FeaturesSection } from '@/components/sections/home/FeaturesSection';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';
import { InstagramSection } from '@/components/sections/home/InstagramSection';
import { CTASection } from '@/components/sections/home/CTASection';
import { NewsletterSection } from '@/components/sections/home/NewsletterSection';

export const metadata = {
  title: 'Gawin-Home - Meble Premium',
  description:
    'Odkryj kolekcję mebli premium. Ponadczasowy design, najwyższa jakość wykonania. Perfekcja w prostocie.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section - Dark Entry (Elegant) */}
      <HeroSection />

      {/* 2. Trusted Brands - Light (Trust Building) */}
      <TrustedBrandsSection />

      {/* 3. Collections Section - Light Showroom */}
      <CollectionsSection />

      {/* 4. Bestsellers Section - Light Showroom */}
      <BestsellersSection />

      {/* 5. Features Section - Dark (Premium USPs) */}
      <FeaturesSection />

      {/* 6. Testimonials Section - Light (Social Proof) */}
      <TestimonialsSection />

      {/* 7. Instagram Section - Light (Social Engagement) */}
      <InstagramSection />

      {/* 8. CTA Section - Dark (Conversion Focus) */}
      <CTASection />

      {/* 9. Newsletter Section - Light (Final Engagement) */}
      <NewsletterSection />
    </div>
  );
}
