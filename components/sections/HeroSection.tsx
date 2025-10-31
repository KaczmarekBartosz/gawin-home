"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

// Sofa Ibiza hotspots with detailed information
const sofaHotspots = [
  {
    id: 1,
    title: "Tkanina Bouclé Premium",
    description: "Miękka, pętelkowa struktura - modna, trwała i przyjemna w dotyku",
    position: { x: 55, y: 45 },
  },
  {
    id: 2,
    title: "Ryflowane Siedzisko",
    description: "Charakterystyczne pionowe przeszycia nadają sofie unikalnego charakteru",
    position: { x: 50, y: 58 },
  },
  {
    id: 3,
    title: "Pojemnik na Pościel",
    description: "Obszerny schowek pod siedziskiem, idealny do przechowywania pościeli i koców",
    position: { x: 45, y: 68 },
  },
  {
    id: 4,
    title: "Funkcja Spania DL",
    description: "Łatwe rozkładanie dzięki automatowi - powierzchnia spania 142×198 cm",
    position: { x: 65, y: 35 },
  },
  {
    id: 5,
    title: "Wymiary & Cena",
    description: "258×113×95 cm | 2 499,00 zł | Gwarancja 5 lat",
    position: { x: 30, y: 75 },
  },
];

export function HeroSection() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <section className="w-full bg-white pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Container with rounded corners - uses hero-gradient from globals.css */}
      <div
        className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-[0_8px_20px_rgba(150,130,110,0.15)]"
        style={{ backgroundImage: 'var(--hero-gradient)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px] lg:min-h-[600px]">

          {/* LEFT SIDE - Content */}
          <div className="flex flex-col justify-center px-6 sm:px-10 py-12 lg:py-16">
            <div className="flex flex-col max-w-xl space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 w-fit rounded-full bg-white/50 backdrop-blur-md border border-white/60 px-4 py-1.5 text-xs font-medium text-stone-600 shadow-sm">
                <span className="block h-2 w-2 rounded-full bg-[#B7A99D]" />
                <span>Naturalne piękno wnętrz</span>
              </div>

              {/* Heading */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight">
                Twój dom zasługuje na więcej.<br />
                <span className="text-stone-700">GAWIN MEBLE</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-md">
                Meble, które tworzą przestrzeń pełną spokoju, światła i harmonii.
                Zaprojektowane, by służyć przez lata — i cieszyć każdego dnia.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="w-full sm:w-auto bg-stone-800 text-stone-100 hover:bg-stone-700 rounded-xl">
                  Przeglądaj kolekcje
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-stone-400 text-stone-700 hover:bg-stone-100 rounded-xl"
                >
                  Zaprojektuj swoje wnętrze
                </Button>
              </div>

              {/* Benefits */}
              <ul className="pt-8 border-t border-stone-300/40 grid gap-y-2 gap-x-6 sm:grid-cols-3 text-sm text-stone-700">
                <li className="flex items-center gap-2">
                  <span className="text-stone-500 font-semibold">✓</span>
                  Polska jakość
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-stone-500 font-semibold">✓</span>
                  5-letnia gwarancja
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-stone-500 font-semibold">✓</span>
                  Darmowa dostawa od 1999 zł
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE - Product Image with Hotspots */}
          <div className="relative bg-white w-full h-full flex items-center justify-center overflow-hidden">
            {/* Product Image */}
            <img
              src="/sofa_ibiza.webp"
              alt="Sofa Rozkładana Ibiza"
              className="w-full h-full object-cover"
            />

            {/* Collection label */}
            <div className="absolute bottom-6 right-6 inline-flex items-center gap-2 bg-white/70 backdrop-blur-lg border border-white/50 rounded-lg px-3 py-1.5 text-xs font-medium text-stone-700 shadow-md animate-in fade-in duration-1000 delay-1000">
              Sofa Ibiza · Kolekcja 2025
            </div>

            {/* Hotspots */}
            {sofaHotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className="absolute"
                style={{ left: `${hotspot.position.x}%`, top: `${hotspot.position.y}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setActiveHotspot(hotspot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {/* Pin Button - Glass Morphism */}
                <button
                  className="relative z-10 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/60 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center text-stone-700 font-bold text-sm"
                  aria-label={`Pin: ${hotspot.title}`}
                >
                  {hotspot.id}
                </button>

                {/* Animated circle around pin - subtle ping effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/50 opacity-40 animate-ping" style={{ animationDuration: '2s' }} />

                {/* Tooltip - Glass Morphism */}
                {activeHotspot === hotspot.id && (
                  <div className="absolute z-20 bg-white/80 backdrop-blur-xl border border-stone-200/50 rounded-xl shadow-xl p-4 w-64 -translate-x-1/2 -translate-y-full -top-2 left-1/2">
                    <h3 className="font-bold text-stone-800 text-sm mb-2">{hotspot.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{hotspot.description}</p>
                    <div className="mt-3 pt-3 border-t border-stone-200/30">
                      <Button size="sm" className="w-full bg-stone-800 text-stone-100 hover:bg-stone-700 rounded-lg">
                        Dowiedz się więcej
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
