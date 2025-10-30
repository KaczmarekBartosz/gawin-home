"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterChip {
  id: string;
  label: string;
  type: "color" | "style" | "price" | "feature";
  color?: string;
  count?: number;
}

interface VisualFilterProps {
  onFilterChange?: (filters: FilterChip[]) => void;
}

/**
 * Advanced Visual Filter System
 * Premium visual filtering with color swatches, style chips, price ranges
 * Designed for furniture e-commerce with elegant interactions
 */

const filterOptions = {
  colors: [
    { id: "black", label: "Czarny", color: "#000000" },
    { id: "white", label: "Biały", color: "#FFFFFF" },
    { id: "gray", label: "Szary", color: "#808080" },
    { id: "brown", label: "Brązowy", color: "#8B4513" },
    { id: "gold", label: "Złoty", color: "#D4A574" },
    { id: "copper", label: "Miedziany", color: "#B8956A" },
    { id: "beige", label: "Beż", color: "#F5F5DC" },
    { id: "navy", label: "Granat", color: "#000080" },
  ],
  styles: [
    { id: "modern", label: "Nowoczesny", count: 234 },
    { id: "classic", label: "Klasyczny", count: 156 },
    { id: "minimalist", label: "Minimalistyczny", count: 189 },
    { id: "rustic", label: "Rustykalny", count: 98 },
    { id: "scandinavian", label: "Skandynawski", count: 145 },
  ],
  priceRanges: [
    { id: "under1k", label: "Poniżej 1000 zł", count: 342 },
    { id: "1k-3k", label: "1000 - 3000 zł", count: 567 },
    { id: "3k-5k", label: "3000 - 5000 zł", count: 234 },
    { id: "above5k", label: "Powyżej 5000 zł", count: 128 },
  ],
  features: [
    { id: "modular", label: "Modułowe", count: 123 },
    { id: "storage", label: "Z przechowywaniem", count: 98 },
    { id: "adjustable", label: "Regulowane", count: 76 },
    { id: "premium", label: "Premium", count: 234 },
  ],
};

export function AdvancedVisualFilter({
  onFilterChange,
}: VisualFilterProps) {
  const [selectedFilters, setSelectedFilters] = React.useState<FilterChip[]>([]);
  const [expandedSections, setExpandedSections] = React.useState({
    colors: true,
    styles: true,
    priceRanges: false,
    features: false,
  });

  const handleFilterSelect = (filter: FilterChip) => {
    setSelectedFilters((prev) => {
      const exists = prev.find((f) => f.id === filter.id);
      const newFilters = exists
        ? prev.filter((f) => f.id !== filter.id)
        : [...prev, filter];
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    onFilterChange?.([]);
  };

  const toggleSection = (
    section: keyof typeof expandedSections
  ) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Active Filters Display */}
      <AnimatePresence>
        {selectedFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-brand-gold/10 rounded-xl border border-brand-gold/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-brand-charcoal">
                Aktywne filtry ({selectedFilters.length})
              </span>
              <button
                onClick={clearAllFilters}
                className="text-xs font-medium text-brand-gold hover:text-brand-copper transition-colors"
              >
                Wyczyść wszystkie
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <motion.div
                  key={filter.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-brand-gold/50"
                >
                  {filter.type === "color" && (
                    <div
                      className="size-3 rounded-full border border-brand-charcoal/20"
                      style={{ backgroundColor: filter.color }}
                    />
                  )}
                  <span className="text-xs font-medium text-brand-charcoal">
                    {filter.label}
                  </span>
                  <button
                    onClick={() => handleFilterSelect(filter)}
                    className="ml-1 text-brand-gold hover:text-brand-copper transition-colors"
                  >
                    <X className="size-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Color Filter Section */}
      <FilterSection
        title="Kolory"
        isExpanded={expandedSections.colors}
        onToggle={() => toggleSection("colors")}
      >
        <div className="grid grid-cols-4 gap-4">
          {filterOptions.colors.map((colorOption) => {
            const isSelected = selectedFilters.some((f) => f.id === colorOption.id);

            return (
              <motion.button
                key={colorOption.id}
                onClick={() =>
                  handleFilterSelect({
                    id: colorOption.id,
                    label: colorOption.label,
                    type: "color",
                    color: colorOption.color,
                  })
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200",
                  isSelected
                    ? "bg-brand-gold/20 border-2 border-brand-gold"
                    : "bg-white border-2 border-brand-charcoal/10 hover:border-brand-gold/30"
                )}
              >
                <div
                  className="size-8 rounded-full border-2 border-brand-charcoal/20 shadow-sm"
                  style={{ backgroundColor: colorOption.color }}
                />
                <span className="text-xs font-medium text-brand-charcoal text-center">
                  {colorOption.label}
                </span>

                {/* Checkmark */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-bold">✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </FilterSection>

      {/* Style Filter Section */}
      <FilterSection
        title="Styl"
        isExpanded={expandedSections.styles}
        onToggle={() => toggleSection("styles")}
      >
        <div className="flex flex-wrap gap-3">
          {filterOptions.styles.map((styleOption) => {
            const isSelected = selectedFilters.some((f) => f.id === styleOption.id);

            return (
              <motion.button
                key={styleOption.id}
                onClick={() =>
                  handleFilterSelect({
                    id: styleOption.id,
                    label: styleOption.label,
                    type: "style",
                    count: styleOption.count,
                  })
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 relative overflow-hidden",
                  isSelected
                    ? "bg-brand-gold text-white shadow-lg shadow-brand-gold/30"
                    : "bg-white border-2 border-brand-charcoal/10 text-brand-charcoal hover:border-brand-gold/50"
                )}
              >
                <span className="relative z-10">
                  {styleOption.label}
                  <span
                    className={cn(
                      "ml-2 text-xs font-semibold",
                      isSelected ? "text-white/80" : "text-brand-charcoal/60"
                    )}
                  >
                    ({styleOption.count})
                  </span>
                </span>

                {/* Shimmer effect on hover */}
                {!isSelected && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </FilterSection>

      {/* Price Range Filter Section */}
      <FilterSection
        title="Zakres ceny"
        isExpanded={expandedSections.priceRanges}
        onToggle={() => toggleSection("priceRanges")}
      >
        <div className="space-y-3">
          {filterOptions.priceRanges.map((priceOption) => {
            const isSelected = selectedFilters.some((f) => f.id === priceOption.id);

            return (
              <motion.button
                key={priceOption.id}
                onClick={() =>
                  handleFilterSelect({
                    id: priceOption.id,
                    label: priceOption.label,
                    type: "price",
                    count: priceOption.count,
                  })
                }
                whileHover={{ x: 4 }}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg transition-all duration-200",
                  isSelected
                    ? "bg-brand-gold/20 border-2 border-brand-gold"
                    : "bg-white border-2 border-brand-charcoal/10 hover:border-brand-gold/30"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-brand-charcoal">
                    {priceOption.label}
                  </span>
                  <span className="text-xs text-brand-charcoal/60">
                    {priceOption.count} produktów
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </FilterSection>

      {/* Features Filter Section */}
      <FilterSection
        title="Cechy"
        isExpanded={expandedSections.features}
        onToggle={() => toggleSection("features")}
      >
        <div className="space-y-2">
          {filterOptions.features.map((featureOption) => {
            const isSelected = selectedFilters.some((f) => f.id === featureOption.id);

            return (
              <label
                key={featureOption.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-cream cursor-pointer transition-colors"
              >
                <motion.input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() =>
                    handleFilterSelect({
                      id: featureOption.id,
                      label: featureOption.label,
                      type: "feature",
                      count: featureOption.count,
                    })
                  }
                  className="size-4 accent-brand-gold cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
                <span className="flex-1 font-medium text-brand-charcoal">
                  {featureOption.label}
                </span>
                <span className="text-sm text-brand-charcoal/60">
                  {featureOption.count}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="border-b border-brand-charcoal/10 pb-6 last:border-0"
      initial={false}
    >
      <motion.button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3"
      >
        <h3 className="text-body-large font-semibold text-brand-charcoal">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-5 text-brand-charcoal/60" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AdvancedVisualFilter;
