"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeNeo } from "@/components/ui/badge-neo";

interface SearchSortProps {
  totalProducts?: number;
  onSearchChange?: (query: string) => void;
  onSortChange?: (sortBy: string) => void;
  defaultSort?: string;
  placeholder?: string;
}

const sortOptions = [
  { id: "newest", label: "Najnowsze", icon: "⏱️" },
  { id: "price-low", label: "Cena: od najniższej", icon: "📉" },
  { id: "price-high", label: "Cena: od najwyższej", icon: "📈" },
  { id: "rating", label: "Ocena: od najwyższej", icon: "⭐" },
  { id: "popularity", label: "Popularność", icon: "🔥" },
  { id: "name-asc", label: "Nazwa: A-Z", icon: "A→Z" },
];

export function SearchSort({
  totalProducts = 0,
  onSearchChange,
  onSortChange,
  defaultSort = "newest",
  placeholder = "Szukaj produktów...",
}: SearchSortProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState(defaultSort);
  const [isSortOpen, setIsSortOpen] = React.useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  const handleSort = (id: string) => {
    setSortBy(id);
    onSortChange?.(id);
    setIsSortOpen(false);
  };

  const currentSort = sortOptions.find((opt) => opt.id === sortBy);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-4"
    >
      {/* Top bar with search and filters info */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative flex-1 max-w-md group"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-brand-charcoal/40 pointer-events-none group-focus-within:text-brand-gold transition-colors duration-200" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder={placeholder}
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-xl",
                "bg-white border-2 border-brand-charcoal/10",
                "text-brand-charcoal placeholder-brand-charcoal/40",
                "transition-all duration-200",
                "focus:outline-none focus:border-brand-gold focus:shadow-neo-light",
                "group-focus-within:border-brand-gold"
              )}
            />
          </div>
        </motion.div>

        {/* Product count and sort */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-4 flex-wrap sm:flex-nowrap"
        >
          {/* Product count badge */}
          {totalProducts > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <BadgeNeo variant="info">
                {totalProducts} produktów
              </BadgeNeo>
            </motion.div>
          )}

          {/* Sort dropdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative"
          >
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg",
                "bg-white border-2 border-brand-charcoal/10",
                "text-brand-charcoal font-medium text-sm",
                "transition-all duration-200",
                "hover:border-brand-gold hover:shadow-neo-light",
                "focus:outline-none focus:border-brand-gold focus:shadow-neo-light",
                isSortOpen && "border-brand-gold shadow-neo-light"
              )}
            >
              <span className="hidden sm:inline">{currentSort?.label}</span>
              <span className="sm:hidden">{currentSort?.icon}</span>
              <motion.div
                animate={{ rotate: isSortOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="size-4" />
              </motion.div>
            </button>

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={
                isSortOpen
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10, pointerEvents: "none" }
              }
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-56 rounded-lg bg-white shadow-neo-medium border border-brand-charcoal/10 overflow-hidden z-10"
            >
              <div className="max-h-80 overflow-y-auto">
                {sortOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleSort(option.id)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={cn(
                      "w-full px-4 py-3 text-left text-sm font-medium",
                      "transition-all duration-200",
                      "hover:bg-brand-cream hover:text-brand-gold",
                      sortBy === option.id &&
                        "bg-brand-gold/10 text-brand-gold border-l-2 border-brand-gold"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                      {sortBy === option.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto size-4 rounded-full bg-brand-gold"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Backdrop to close dropdown */}
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSortOpen(false)}
                className="fixed inset-0 z-0"
              />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Active search indicator */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-2 text-sm text-brand-charcoal/70"
        >
          <Search className="size-4" />
          <span>
            Wyniki wyszukiwania dla:{" "}
            <span className="font-semibold text-brand-gold">
              "{searchQuery}"
            </span>
          </span>
          <button
            onClick={() => {
              setSearchQuery("");
              onSearchChange?.("");
            }}
            className="ml-auto text-brand-gold hover:text-brand-charcoal transition-colors"
            aria-label="Clear search"
          >
            Wyczyść
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// Compact variant for inline use
export function SearchSortCompact({
  totalProducts,
  onSearchChange,
  onSortChange,
}: {
  totalProducts?: number;
  onSearchChange?: (query: string) => void;
  onSortChange?: (sortBy: string) => void;
}) {
  return (
    <SearchSort
      totalProducts={totalProducts}
      onSearchChange={onSearchChange}
      onSortChange={onSortChange}
      placeholder="Szukaj..."
    />
  );
}
