import { CircularProgress } from 'components/ui/circular-progress';
import { cn } from 'lib/utils';
import Link from 'next/link';

export function HeroWellness() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-block">
              <span
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-4 py-2',
                  'rounded-full', // Full rounded for badge
                  'bg-[rgb(var(--accent)/0.1)]',
                  'text-[rgb(var(--accent))]',
                  'text-sm font-medium'
                )}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Premium Quality
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Meble zaprojektowane
                <span className="block text-[rgb(var(--accent))]">dla Twojego dobra</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-xl">
                Połączenie ergonomii, trwałości i zrównoważonego rozwoju. Każdy element
                przemyślany, aby wspierać Twoje codzienne życie.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-8 py-4',
                  'rounded-lg', // 24px - Wellness Tech
                  'bg-[rgb(var(--accent))] text-white',
                  'font-semibold text-base',
                  'transition-all duration-200',
                  'hover:opacity-90 hover:scale-105',
                  'active:scale-95'
                )}
              >
                Odkryj kolekcję
              </Link>
              <Link
                href="/about"
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-8 py-4',
                  'rounded-lg',
                  'border-2 border-[rgb(var(--accent))]',
                  'text-[rgb(var(--accent))]',
                  'font-semibold text-base',
                  'transition-all duration-200',
                  'hover:bg-[rgb(var(--accent)/0.05)]'
                )}
              >
                Nasza historia
              </Link>
            </div>
          </div>

          {/* Right Column - Metrics Dashboard (Wellness Tech Style) */}
          <div
            className={cn(
              'rounded-lg', // 24px
              'bg-card',
              'border border-border',
              'p-8 md:p-12',
              'shadow-lg'
            )}
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Nasze standardy jakości
            </h3>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-8">
              <CircularProgress value={95} variant="accent" label="Satysfakcja" />
              <CircularProgress value={90} variant="blue" label="Trwałość" />
              <CircularProgress value={85} variant="green" label="Ekologia" />
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">10+</div>
                <div className="text-sm text-muted-foreground mt-1">Lat doświadczenia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">5000+</div>
                <div className="text-sm text-muted-foreground mt-1">Zadowolonych klientów</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">200+</div>
                <div className="text-sm text-muted-foreground mt-1">Modeli mebli</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
