"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="w-full">
      {/* Main split container */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-0 min-h-screen lg:min-h-[600px]">
        {/* LEFT SIDE - Content */}
        <div className="bg-brand-cream flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div className="max-w-2xl">
            {/* Website URL */}
            <p className="text-xs sm:text-sm font-semibold text-brand-gold mb-8 tracking-widest uppercase">
              Gawin24.pl
            </p>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal leading-tight mb-8">
              Twój dom potrzebuje czegoś więcej niż mebli
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-brand-charcoal mb-12 leading-relaxed max-w-xl">
              Odkryj kolekcję mebli, które łączą ponadczasowy design z najwyższą jakością rzemiosła.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Button variant="gold" size="lg">
                <span className="flex items-center gap-2">
                  Odkryj Kolekcję
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Button>
              <Button variant="outline" size="lg" className="border-brand-gold text-brand-charcoal hover:bg-brand-gold hover:text-white">
                Umów Konsultację
              </Button>
            </div>

            {/* Features below buttons - mobile and desktop */}
            <div className="grid grid-cols-2 gap-6 lg:hidden">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-brand-charcoal">Darmowa dostawa</p>
                <p className="text-xs text-brand-charcoal/60">Na terenie Polski</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-brand-charcoal">Szybka wysyłka</p>
                <p className="text-xs text-brand-charcoal/60">7-14 dni roboczych</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-brand-charcoal">Od producenta</p>
                <p className="text-xs text-brand-charcoal/60">Certyfikowane meble</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-brand-charcoal">Bezpieczne zakupy</p>
                <p className="text-xs text-brand-charcoal/60">Gwarancja 10 lat</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Video */}
        <div className="relative bg-brand-charcoal hidden lg:flex items-center justify-center p-8 overflow-hidden">
          <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black shadow-2xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://gawin.pl/gawin-meble-lozko-paris.mp4"
                type="video/mp4"
              />
            </video>

            {/* Optional overlay gradient for better text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-0 transition-opacity" />
          </div>
        </div>
      </div>

      {/* Mobile video section - appears below left content on mobile */}
      <div className="lg:hidden relative bg-brand-charcoal w-full aspect-video">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://gawin.pl/gawin-meble-lozko-paris.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* FEATURES SECTION - Desktop only below split */}
      <div className="hidden lg:block bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center lg:text-left">
              <div className="mb-4">
                <div className="inline-block p-3 rounded-xl bg-brand-gold/10">
                  <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-brand-charcoal mb-2">Darmowa dostawa</h3>
              <p className="text-sm text-brand-charcoal/60">Na terenie całej Polski</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center lg:text-left">
              <div className="mb-4">
                <div className="inline-block p-3 rounded-xl bg-brand-gold/10">
                  <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-brand-charcoal mb-2">Szybka wysyłka</h3>
              <p className="text-sm text-brand-charcoal/60">7-14 dni roboczych</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center lg:text-left">
              <div className="mb-4">
                <div className="inline-block p-3 rounded-xl bg-brand-gold/10">
                  <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-brand-charcoal mb-2">Od producenta</h3>
              <p className="text-sm text-brand-charcoal/60">Certyfikowane meble</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center lg:text-left">
              <div className="mb-4">
                <div className="inline-block p-3 rounded-xl bg-brand-gold/10">
                  <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-brand-charcoal mb-2">Bezpieczne zakupy</h3>
              <p className="text-sm text-brand-charcoal/60">Gwarancja 10 lat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
