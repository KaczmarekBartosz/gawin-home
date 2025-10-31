"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImage {
  url: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
  className?: string;
}

export function ProductImageGallery({
  images,
  productName,
  className,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);

  const currentImage = images[selectedIndex];
  const thumbnails = images.slice(0, 4); // Max 4 thumbnails visible

  if (!currentImage) {
    return null; // Prevent rendering if no images
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleZoom = () => {
    setZoom((prev) => (prev === 1 ? 1.5 : 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Main Image Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-brand-charcoal/10 group"
      >
        {/* Main Image */}
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full cursor-zoom-in"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={currentImage.url}
            alt={currentImage.alt || productName}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
          />

          {/* Zoom Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center"
          >
            <div className="flex items-center gap-2 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
              <ZoomIn className="size-4" />
              <span className="text-sm font-medium">Kliknij aby powiększyć</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6 text-brand-charcoal" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="size-6 text-brand-charcoal" />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      </motion.div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex gap-3 overflow-x-auto pb-2"
        >
          {thumbnails.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200",
                selectedIndex === index
                  ? "border-[#B7A99D] shadow-lg shadow-[#B7A99D]/50"
                  : "border-brand-charcoal/10 hover:border-brand-charcoal/20"
              )}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />

              {/* Active Indicator */}
              <AnimatePresence>
                {selectedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#B7A99D]/20"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          ))}

          {/* "View all" indicator if more images exist */}
          {images.length > 4 && (
            <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-brand-cream border-2 border-dashed border-brand-charcoal/20 flex items-center justify-center text-brand-charcoal/60 text-xs font-medium text-center p-2">
              +{images.length - 4} więcej
            </div>
          )}
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-square rounded-xl overflow-hidden"
            >
              {/* Lightbox Image */}
              <Image
                src={currentImage.url}
                alt={currentImage.alt || productName}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
              />

              {/* Lightbox Navigation */}
              {images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-8 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-8 text-white" />
                  </motion.button>
                </>
              )}

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm"
                aria-label="Close lightbox"
              >
                <X className="size-8 text-white" />
              </motion.button>

              {/* Image Counter in Lightbox */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductImageGallery;
