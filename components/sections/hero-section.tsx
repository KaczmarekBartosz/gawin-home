export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:flex lg:items-center lg:gap-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300">
            <span className="size-1.5 rounded-full bg-amber-400" /> Kolekcja
            Premium 2025
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Ponadczasowa elegancja. Nowoczesna forma. Meble, które tworzą dom.
          </h1>
          <p className="mt-6 max-w-xl text-neutral-300">
            Hybrydowy design: Dark Entry na wejściu, Light Showroom dla
            ekspozycji produktów. Złote akcenty i dopracowane detale — dokładnie
            tak, jak w Gawin‑Home.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/mock/products"
              className="rounded-xl bg-amber-400 px-5 py-3 font-medium text-neutral-900 shadow hover:bg-amber-300"
            >
              Zobacz kolekcję
            </a>
            <a
              href="#newsletter"
              className="rounded-xl border border-neutral-700 px-5 py-3 font-medium text-white hover:bg-neutral-800"
            >
              Dołącz do newslettera
            </a>
          </div>
        </div>
        <div className="mt-12 hidden grow justify-end lg:flex">
          <div className="h-64 w-64 rounded-full bg-amber-400/10 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
