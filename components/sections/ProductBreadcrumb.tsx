"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function ProductBreadcrumb({
  items,
  className,
}: ProductBreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center gap-1 mb-8 py-4 px-4 sm:px-6 rounded-xl",
        "bg-gradient-to-r from-brand-cream to-white",
        "border border-brand-charcoal/5",
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-0.5 text-body-small">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {item.href ? (
                <Link href={item.href}>
                  <motion.span
                    className="inline-flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 hover:bg-[#B7A99D]/10 cursor-pointer group"
                    whileHover={{ x: 2 }}
                  >
                    <span className="text-brand-charcoal/70 group-hover:text-[#B7A99D] transition-colors">
                      {item.label}
                    </span>
                  </motion.span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 py-2 px-3 rounded-lg font-semibold text-brand-charcoal">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <motion.div
                  initial={{ opacity: 0.4 }}
                  whileHover={{ opacity: 1 }}
                  className="text-brand-charcoal/40 -mx-1"
                >
                  <ChevronRight className="size-4" strokeWidth={2} />
                </motion.div>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}

export default ProductBreadcrumb;
