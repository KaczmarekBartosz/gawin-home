"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Palette, RotateCcw, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoButton } from "@/components/ui/neo-button";

/**
 * Room Designer Preview Component
 * Upload your room photo and see furniture in your space
 * Premium feature for visualizing products in real environment
 */

interface RoomDesignStyle {
  id: string;
  name: string;
  description: string;
  overlay: string;
}

const designStyles: RoomDesignStyle[] = [
  {
    id: "modern",
    name: "Nowoczesny",
    description: "Minimalistyczny, czysty design",
    overlay: "linear-gradient(135deg, rgba(26,26,26,0.1), rgba(212,165,116,0.05))",
  },
  {
    id: "warm",
    name: "Ciepły",
    description: "Przytulna, domowa atmosfera",
    overlay: "linear-gradient(135deg, rgba(212,165,116,0.15), rgba(184,149,106,0.1))",
  },
  {
    id: "luxury",
    name: "Luksus",
    description: "Elegancki, wytworny styl",
    overlay: "linear-gradient(135deg, rgba(184,149,106,0.2), rgba(212,165,116,0.15))",
  },
];

export function RoomDesignerPreview() {
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = React.useState<string>("modern");
  const [overlayOpacity, setOverlayOpacity] = React.useState(0.3);
  const [isLoading, setIsLoading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (uploadedImage) {
      const link = document.createElement("a");
      link.href = uploadedImage;
      link.download = "room-design.jpg";
      link.click();
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedStyle("modern");
    setOverlayOpacity(0.3);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const selectedStyleData = designStyles.find((s) => s.id === selectedStyle);

  return (
    <section className="w-full py-20 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-brand-charcoal via-brand-charcoal to-brand-charcoal/95">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-block mb-4">
            <span className="text-label uppercase tracking-widest text-brand-gold">
              Interactive Tool
            </span>
          </div>
          <h2 className="text-h1 text-brand-cream mb-4">
            Room Designer Preview
          </h2>
          <p className="text-body-large text-brand-cream/70 max-w-2xl mx-auto">
            Załaduj zdjęcie swojego pokoju i zobacz, jak nasze meble będą wyglądać
            w Twojej przestrzeni
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload & Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative p-8 rounded-2xl border-2 border-dashed border-brand-gold/50 bg-brand-gold/10 hover:bg-brand-gold/20 transition-colors cursor-pointer group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Upload className="size-8 text-brand-gold" />
                </motion.div>
                <div className="text-center">
                  <p className="font-semibold text-brand-cream">Kliknij aby dodać zdjęcie</p>
                  <p className="text-sm text-brand-cream/60">
                    lub przeciągnij i upuść
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Uploaded Image Preview */}
            <AnimatePresence>
              {uploadedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-4 rounded-xl bg-white/10 border border-brand-gold/20"
                >
                  <p className="text-sm font-medium text-brand-cream/80 mb-2">
                    Załadowana zdjęcie
                  </p>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <img
                      src={uploadedImage}
                      alt="Room"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Design Styles */}
            <div className="space-y-3">
              <h3 className="text-body-small font-semibold text-brand-cream">
                Styl projektu
              </h3>
              {designStyles.map((style) => (
                <motion.button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-all duration-200",
                    selectedStyle === style.id
                      ? "bg-brand-gold text-brand-charcoal ring-2 ring-brand-copper"
                      : "bg-white/10 text-brand-cream hover:bg-white/20"
                  )}
                >
                  <div className="font-medium">{style.name}</div>
                  <div className="text-xs opacity-70">{style.description}</div>
                </motion.button>
              ))}
            </div>

            {/* Overlay Opacity */}
            {uploadedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <label className="text-body-small font-semibold text-brand-cream">
                    Intensywność
                  </label>
                  <span className="text-xs text-brand-gold font-mono">
                    {Math.round(overlayOpacity * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={overlayOpacity * 100}
                  onChange={(e) => setOverlayOpacity(parseInt(e.target.value) / 100)}
                  className="w-full accent-brand-gold"
                />
              </motion.div>
            )}

            {/* Action Buttons */}
            {uploadedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 pt-4"
              >
                <NeoButton
                  variant="secondary"
                  size="sm"
                  onClick={handleDownload}
                  className="flex-1 gap-2"
                >
                  <Download className="size-4" />
                  Pobierz
                </NeoButton>
                <NeoButton
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="flex-1 gap-2"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </NeoButton>
              </motion.div>
            )}
          </motion.div>

          {/* Preview Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-brand-gold/20">
              {/* Default State */}
              {!uploadedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-charcoal/50 to-brand-charcoal/80"
                >
                  <div className="text-center">
                    <Palette className="size-16 text-brand-gold/50 mx-auto mb-4" />
                    <p className="text-brand-cream/60 font-medium">
                      Załaduj zdjęcie pokoju aby zobaczyć podgląd
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Uploaded Image with Overlay */}
              <AnimatePresence>
                {uploadedImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full h-full"
                  >
                    <img
                      src={uploadedImage}
                      alt="Room Preview"
                      className="w-full h-full object-cover"
                    />

                    {/* Style Overlay */}
                    <motion.div
                      key={selectedStyle}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: overlayOpacity }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: selectedStyleData?.overlay,
                      }}
                    />

                    {/* Furniture Suggestion Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      className="absolute bottom-0 right-0 p-6 bg-gradient-to-t from-brand-charcoal to-transparent rounded-tl-2xl max-w-xs"
                    >
                      <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider mb-2">
                        Sugerowana kolekcja
                      </p>
                      <p className="text-brand-cream font-semibold mb-3">
                        {selectedStyle === "modern" && "Modern Minimalist Collection"}
                        {selectedStyle === "warm" && "Cozy Comfort Collection"}
                        {selectedStyle === "luxury" && "Premium Elegance Collection"}
                      </p>
                      <button className="w-full px-4 py-2 bg-brand-gold text-brand-charcoal rounded-lg font-semibold text-sm hover:bg-brand-copper transition-colors">
                        Przeglądaj kolekcję
                      </button>
                    </motion.div>

                    {/* Loading State */}
                    {isLoading && (
                      <motion.div
                        className="absolute inset-0 bg-black/50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 border-4 border-brand-gold/30 border-t-brand-gold rounded-full"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-6 p-6 rounded-xl bg-white/10 border border-brand-gold/20"
            >
              <h4 className="text-body-large font-semibold text-brand-cream mb-3">
                Jak to działa?
              </h4>
              <ul className="space-y-2 text-body-small text-brand-cream/70">
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">1.</span>
                  <span>Załaduj zdjęcie swojego pokoju</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">2.</span>
                  <span>Wybierz styl projektu który Ci się podoba</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">3.</span>
                  <span>Dostosuj intensywność podglądu</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">4.</span>
                  <span>Pobierz efekt i zdecyduj się na zakup!</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default RoomDesignerPreview;
