import { ThemeSwitcher } from 'components/ui/theme-switcher';
import Link from 'next/link';

export const metadata = {
  title: 'Gawin-Home - Theme Demo',
  description: 'Interactive theme showcase for Gawin-Home design system',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with ThemeSwitcher */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Gawin-Home Design System
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Interaktywny showcase różnych wariantów designu. Wybierz theme i zobacz jak
              zmienia się wygląd strony.
            </p>
          </div>

          {/* ThemeSwitcher - Main Feature */}
          <div className="max-w-2xl mx-auto mb-16">
            <ThemeSwitcher />
          </div>

          {/* Quick Links */}
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Link
              href="/wellness-demo"
              className="p-6 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Wellness Tech Demo
              </h3>
              <p className="text-sm text-muted-foreground">
                Health-app inspired design z circular progress indicators
              </p>
            </Link>

            <Link
              href="/mock"
              className="p-6 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">Mock Homepage</h3>
              <p className="text-sm text-muted-foreground">
                Oryginalna strona z dark entry design
              </p>
            </Link>

            <div className="p-6 bg-card rounded-lg border border-border opacity-60">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Hybrid Luxury
              </h3>
              <p className="text-sm text-muted-foreground">Coming soon...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Components Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Sample Components
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Button Examples */}
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Buttons</h3>
              <div className="space-y-3">
                <button className="w-full px-6 py-3 bg-[rgb(var(--accent))] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  Primary CTA
                </button>
                <button className="w-full px-6 py-3 border-2 border-[rgb(var(--accent))] text-[rgb(var(--accent))] bg-transparent rounded-xl font-semibold hover:bg-[rgb(var(--accent))] hover:text-white transition-all">
                  Secondary
                </button>
              </div>
            </div>

            {/* Card Example */}
            <div className="p-6 bg-card rounded-2xl border border-border shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">Product Card</h3>
              <div className="aspect-square bg-muted rounded-lg mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Example Product</p>
              <p className="text-2xl font-bold text-[rgb(var(--accent))]">1299 PLN</p>
            </div>

            {/* Typography Example */}
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Typography</h3>
              <div className="space-y-2 text-sm">
                <p className="font-bold text-foreground">Bold Heading</p>
                <p className="font-semibold text-foreground">Semibold Text</p>
                <p className="text-foreground">Regular Body</p>
                <p className="text-muted-foreground">Muted Text</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
