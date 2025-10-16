import { HeroSection } from '@/components/sections/home/HeroSection';

export const metadata = {
  title: 'Gawin-Home - Meble Premium',
  description:
    'Odkryj kolekcję mebli premium. Ponadczasowy design, najwyższa jakość wykonania. Perfekcja w prostocie.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section - Dark Entry (Elegant) - Minimalistyczny styl "Hybrydowy" */}
      <HeroSection />

      {/* TODO: Pozostałe sekcje będą dodane z nowym designem minimalistycznym */}
    </div>
  );
}
