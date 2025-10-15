'use client';

import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section id="newsletter" className="bg-neutral-50 py-14 dark:bg-neutral-100">
      <div className="mx-auto max-w-3xl px-6 text-neutral-900">
        <h2 className="text-2xl font-bold">Zapisz się do newslettera</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Nowości, inspiracje i limitowane kolekcje — tylko jakościowe treści.
        </p>
        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input
            type="email"
            required
            placeholder="Twój e‑mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-400"
          />
          <button
            type="submit"
            className="rounded-xl bg-neutral-900 px-6 py-3 font-medium text-white hover:opacity-90"
          >
            Zapisz się
          </button>
        </form>
        {sent ? (
          <p className="mt-3 text-sm text-emerald-700">Dziękujemy! Sprawdź swoją skrzynkę.</p>
        ) : null}
      </div>
    </section>
  );
}

