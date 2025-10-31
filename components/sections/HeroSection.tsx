"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
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
    <section className="w-full bg-stone-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Container with rounded corners */}
      <div className="max-w-7xl mx-auto bg-brand-cream rounded-2xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 min-h-[500px] lg:min-h-[600px]">

          {/* LEFT SIDE - Content */}
          <div className="bg-brand-cream flex flex-col justify-center px-6 sm:px-10 py-12 lg:py-16 space-y-8">
            <div className="space-y-6">
              {/* Website URL */}
              <p className="text-xs sm:text-sm font-semibold text-brand-sand-primary tracking-widest uppercase">
                Gawin24.pl
              </p>

              {/* Large Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight">
                Twój dom potrzebuje czegoś więcej niż mebli
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-base text-brand-charcoal/70 leading-normal">
                Odkryj premiumową kolekcję mebli, która łączy design z jakością.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                <span className="flex items-center gap-2">
                  Odkryj Kolekcję
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Umów Konsultację
              </Button>
            </div>

            {/* Benefits section */}
            <div className="pt-5 border-t border-brand-sand-primary/20 space-y-2 hidden sm:block">
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-brand-sand-primary font-bold text-base">✓</span>
                  <div>
                    <p className="font-semibold text-brand-charcoal text-sm">Darmowa dostawa</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-brand-sand-primary font-bold text-base">✓</span>
                  <div>
                    <p className="font-semibold text-brand-charcoal text-sm">Szybka wysyłka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Product Image with Hotspots */}
          <div className="relative bg-gradient-to-br from-brand-sand-lighter via-brand-sand-light to-brand-cream w-full h-full flex items-center justify-center overflow-hidden">
            {/* Product Image */}
            <img
              src="/sofa_ibiza.webp"
              alt="Sofa Rozkładana Ibiza"
              className="w-full h-full object-cover"
            />

            {/* Hotspots */}
            {sofaHotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className="absolute"
                style={{ left: `${hotspot.position.x}%`, top: `${hotspot.position.y}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setActiveHotspot(hotspot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {/* Pin Button */}
                <button
                  className="relative z-10 w-10 h-10 rounded-full bg-brand-sand-primary hover:bg-brand-sand-primary/80 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white font-bold text-sm"
                  aria-label={`Pin: ${hotspot.title}`}
                >
                  {hotspot.id}
                </button>

                {/* Animated circle around pin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-brand-sand-primary opacity-40 animate-pulse" />

                {/* Tooltip - appears on hover */}
                {activeHotspot === hotspot.id && (
                  <div className="absolute z-20 bg-white rounded-lg shadow-2xl p-4 w-64 -translate-x-1/2 -translate-y-full -top-2 left-1/2">
                    <h3 className="font-bold text-brand-charcoal text-sm mb-2">{hotspot.title}</h3>
                    <p className="text-xs text-brand-charcoal/70 leading-relaxed">{hotspot.description}</p>
                    <div className="mt-3 pt-3 border-t border-brand-sand-primary/20">
                      <Button variant="gold" size="sm" className="w-full">
                        <span className="flex items-center gap-1 justify-center">
                          Dowiedz się więcej
                          <ChevronRight className="w-3 h-3" />
                        </span>
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
