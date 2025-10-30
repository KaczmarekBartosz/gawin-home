"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoSlider } from "@/components/ui/neo-slider";
import { NeoToggle } from "@/components/ui/neo-toggle";
import { BadgeNeo } from "@/components/ui/badge-neo";

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  materials: string[];
  colors: string[];
  inStock: boolean;
}

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  onMobileClose?: () => void;
  isMobileOpen?: boolean;
}

const categories = [
  { id: "sofas", label: "Sofy", count: 24 },
  { id: "chairs", label: "Fotele", count: 32 },
  { id: "tables", label: "Stoły", count: 18 },
  { id: "beds", label: "Łóżka", count: 15 },
  { id: "shelves", label: "Regały", count: 21 },
  { id: "cabinets", label: "Szafki", count: 19 },
  { id: "lighting", label: "Oświetlenie", count: 27 },
  { id: "decor", label: "Dekoracje", count: 43 },
];

const materials = [
  { id: "wood", label: "Drewno" },
  { id: "leather", label: "Skóra" },
  { id: "fabric", label: "Tkanina" },
  { id: "metal", label: "Metal" },
  { id: "glass", label: "Szkło" },
];

const colors = [
  { id: "black", label: "Czarny", color: "bg-black" },
  { id: "white", label: "Biały", color: "bg-white border" },
  { id: "gray", label: "Szary", color: "bg-gray-500" },
  { id: "brown", label: "Brązowy", color: "bg-amber-800" },
  { id: "gold", label: "Złoty", color: "bg-brand-gold" },
];

export function FilterSidebar({
  onFilterChange,
  onMobileClose,
  isMobileOpen,
}: FilterSidebarProps) {
  const [filters, setFilters] = React.useState<FilterState>({
    priceRange: [100, 5000],
    categories: [],
    materials: [],
    colors: [],
    inStock: false,
  });

  const [expandedSections, setExpandedSections] = React.useState({
    price: true,
    category: true,
    material: false,
    color: false,
    stock: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.materials.length +
    filters.colors.length +
    (filters.inStock ? 1 : 0);

  const resetFilters = () => {
    setFilters({
      priceRange: [100, 5000],
      categories: [],
      materials: [],
      colors: [],
      inStock: false,
    });
    onFilterChange?.({
      priceRange: [100, 5000],
      categories: [],
      materials: [],
      colors: [],
      inStock: false,
    });
  };

  const content = (
    <div className="flex flex-col gap-6">
      {/* Header with reset button */}
      <div className="flex items-center justify-between">
        <h3 className="text-h4 font-semibold text-brand-charcoal">Filtry</h3>
        {activeFiltersCount > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetFilters}
            className="text-caption text-brand-gold hover:text-brand-charcoal transition-colors"
          >
            Wyczyść ({activeFiltersCount})
          </motion.button>
        )}
      </div>

      {/* Price Range Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between py-3 border-b border-brand-charcoal/10"
        >
          <span className="font-semibold text-brand-charcoal">Cena</span>
          <motion.div
            animate={{ rotate: expandedSections.price ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="size-5 text-brand-charcoal/60" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedSections.price && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden py-4"
            >
              <div className="space-y-4">
                <NeoSlider
                  min={100}
                  max={5000}
                  step={100}
                  value={filters.priceRange}
                  onChange={(value) =>
                    updateFilters({ priceRange: value as [number, number] })
                  }
                  variant="gold"
                  label="Zakres ceny"
                  unit="zł"
                />
                <div className="flex items-center justify-between text-body-small">
                  <span className="text-brand-charcoal/60">
                    {filters.priceRange[0].toLocaleString("pl-PL")} zł
                  </span>
                  <span className="text-brand-charcoal/60">
                    {filters.priceRange[1].toLocaleString("pl-PL")} zł
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => toggleSection("category")}
          className="flex w-full items-center justify-between py-3 border-b border-brand-charcoal/10"
        >
          <span className="font-semibold text-brand-charcoal">Kategorie</span>
          <motion.div
            animate={{ rotate: expandedSections.category ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="size-5 text-brand-charcoal/60" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedSections.category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden py-4 space-y-3"
            >
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat.id)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...filters.categories, cat.id]
                        : filters.categories.filter((c) => c !== cat.id);
                      updateFilters({ categories: newCategories });
                    }}
                    className="size-4 rounded accent-brand-gold cursor-pointer"
                  />
                  <span className="text-body-small text-brand-charcoal group-hover:text-brand-gold transition-colors">
                    {cat.label}
                  </span>
                  <BadgeNeo variant="primary" className="text-xs ml-auto">
                    {cat.count}
                  </BadgeNeo>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Material Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => toggleSection("material")}
          className="flex w-full items-center justify-between py-3 border-b border-brand-charcoal/10"
        >
          <span className="font-semibold text-brand-charcoal">Materiały</span>
          <motion.div
            animate={{ rotate: expandedSections.material ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="size-5 text-brand-charcoal/60" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedSections.material && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden py-4 space-y-3"
            >
              {materials.map((mat) => (
                <label
                  key={mat.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.materials.includes(mat.id)}
                    onChange={(e) => {
                      const newMaterials = e.target.checked
                        ? [...filters.materials, mat.id]
                        : filters.materials.filter((m) => m !== mat.id);
                      updateFilters({ materials: newMaterials });
                    }}
                    className="size-4 rounded accent-brand-gold cursor-pointer"
                  />
                  <span className="text-body-small text-brand-charcoal group-hover:text-brand-gold transition-colors">
                    {mat.label}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Color Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => toggleSection("color")}
          className="flex w-full items-center justify-between py-3 border-b border-brand-charcoal/10"
        >
          <span className="font-semibold text-brand-charcoal">Kolory</span>
          <motion.div
            animate={{ rotate: expandedSections.color ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="size-5 text-brand-charcoal/60" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedSections.color && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden py-4 space-y-3"
            >
              <div className="flex flex-wrap gap-3">
                {colors.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      const newColors = filters.colors.includes(col.id)
                        ? filters.colors.filter((c) => c !== col.id)
                        : [...filters.colors, col.id];
                      updateFilters({ colors: newColors });
                    }}
                    className={cn(
                      "size-8 rounded-full transition-all duration-200",
                      col.color,
                      filters.colors.includes(col.id)
                        ? "ring-2 ring-brand-gold ring-offset-2"
                        : "ring-1 ring-brand-charcoal/20"
                    )}
                    title={col.label}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stock Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="py-4 border-b border-brand-charcoal/10">
          <label className="flex items-center gap-3 cursor-pointer">
            <NeoToggle
              checked={filters.inStock}
              onChange={(checked) => updateFilters({ inStock: checked })}
              variant="gold"
              size="md"
            />
            <span className="text-body-small font-medium text-brand-charcoal">
              Tylko dostępne
            </span>
          </label>
        </div>
      </motion.div>
    </div>
  );

  // Desktop version
  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="hidden lg:block w-72 flex-shrink-0 rounded-2xl bg-white p-6 shadow-neo-light sticky top-24"
      >
        {content}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/40 lg:hidden z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white z-50 overflow-y-auto lg:hidden shadow-neo-medium"
            >
              <div className="flex items-center justify-between sticky top-0 z-10 bg-white p-6 border-b border-brand-charcoal/10">
                <h2 className="text-h4 font-semibold text-brand-charcoal">
                  Filtry
                </h2>
                <button
                  onClick={onMobileClose}
                  className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                  aria-label="Close filters"
                >
                  <X className="size-5 text-brand-charcoal" />
                </button>
              </div>

              <div className="p-6">{content}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
