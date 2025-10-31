export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-sand-light via-brand-sand-lighter to-brand-cream text-brand-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:flex lg:items-center lg:gap-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-sand-primary/20 bg-white/50 px-3 py-1 text-xs text-brand-sand-deep">
            <span className="size-1.5 rounded-full bg-brand-sand-primary" /> Kolekcja
            Premium 2025
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-brand-charcoal sm:text-5xl">
            Ponadczasowa elegancja. Nowoczesna forma. Meble, które tworzą dom.
          </h1>
          <p className="mt-6 max-w-xl text-brand-charcoal/75">
            Hybrydowy design: Dark Entry na wejściu, Light Showroom dla
            ekspozycji produktów. Piaskowe akcenty i dopracowane detale — dokładnie
            tak, jak w Gawin‑Home.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/mock/products"
              className="rounded-xl bg-gradient-sand-primary px-5 py-3 font-medium text-white shadow-neo-light hover:shadow-neo-medium transition-all"
            >
              Zobacz kolekcję
            </a>
            <a
              href="#newsletter"
              className="rounded-xl border-2 border-brand-sand-primary px-5 py-3 font-medium text-brand-charcoal hover:bg-brand-sand-primary/10 transition-colors"
            >
              Dołącz do newslettera
            </a>
          </div>
        </div>
        <div className="mt-12 hidden grow justify-end lg:flex">
          <div className="h-64 w-64 rounded-full bg-brand-sand-primary/15 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
