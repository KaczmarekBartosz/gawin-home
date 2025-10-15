export function TrustedBrands() {
  const brands = ['GawIn', 'Atelier', 'Linea', 'Aurum', 'Velour', 'Aria'];
  return (
    <section className="bg-neutral-900 py-8 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-sm uppercase tracking-widest text-neutral-500">
          Zaufanie i rzemiosło
        </p>
        <ul className="grid grid-cols-2 place-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((b) => (
            <li
              key={b}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-center text-sm text-neutral-300"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

