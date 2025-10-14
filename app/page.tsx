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
