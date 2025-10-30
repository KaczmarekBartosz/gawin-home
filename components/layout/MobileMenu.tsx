"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoButton } from "@/components/ui/neo-button";

export interface MobileMenuNavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
  submenu?: Array<{
    href: string;
    label: string;
  }>;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: MobileMenuNavLink[];
}

/**
 * MobileMenu Component
 *
 * A full-screen drawer menu for mobile devices with smooth animations,
 * nested menu support, and full accessibility features.
 *
 * Features:
 * - Slide-in from left with 300ms animation
 * - Semi-transparent backdrop overlay
 * - Expandable submenu items with smooth animations
 * - Chevron icon rotation on expand
 * - Close button and backdrop click to close
 * - ESC key support (should be handled by parent)
 * - Proper accessibility (aria labels, semantic HTML)
 *
 * @example
 * const navLinks = [
 *   { href: "/categories", label: "Kategorie" },
 *   {
 *     href: "#",
 *     label: "Produkty",
 *     submenu: [
 *       { href: "/products/tables", label: "Stoły" },
 *       { href: "/products/chairs", label: "Krzesła" },
 *     ],
 *   },
 * ];
 *
 * return (
 *   <MobileMenu
 *     isOpen={isOpen}
 *     onClose={() => setIsOpen(false)}
 *     navLinks={navLinks}
 *   />
 * );
 */
export function MobileMenu({
  isOpen,
  onClose,
  navLinks,
}: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // Close menu when route changes (handled by parent, but we can reset expanded items)
  React.useEffect(() => {
    if (!isOpen) {
      setExpandedItems([]);
    }
  }, [isOpen]);

  // Handle ESC key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.nav
            className={cn(
              "fixed left-0 top-0 h-full w-80 max-w-full",
              "bg-brand-cream z-50 overflow-y-auto",
              "shadow-lg flex flex-col"
            )}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="navigation"
            aria-label="Mobile menu"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-h3 font-bold text-brand-charcoal">Menu</h2>
              <NeoButton
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 h-10 w-10"
              >
                <XIcon className="w-5 h-5" />
              </NeoButton>
            </div>

            {/* Navigation Links Container */}
            <div className="flex-1 py-4 overflow-y-auto">
              <nav className="space-y-0">
                {navLinks.map((link) => (
                  <MobileMenuItemWrapper key={link.href}>
                    {link.submenu ? (
                      <>
                        {/* Main Item with Submenu */}
                        <button
                          onClick={() => toggleSubmenu(link.label)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3",
                            "text-body text-brand-charcoal hover:text-brand-gold",
                            "transition-colors hover:bg-brand-sand/30"
                          )}
                          aria-expanded={expandedItems.includes(link.label)}
                          aria-controls={`submenu-${link.label}`}
                        >
                          <span className="font-medium">{link.label}</span>
                          <motion.div
                            animate={{
                              rotate: expandedItems.includes(link.label)
                                ? 180
                                : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDownIcon className="w-4 h-4 text-brand-charcoal" />
                          </motion.div>
                        </button>

                        {/* Submenu Items */}
                        <AnimatePresence>
                          {expandedItems.includes(link.label) && (
                            <motion.div
                              id={`submenu-${link.label}`}
                              className="bg-brand-sand/20 overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {link.submenu.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className={cn(
                                    "block px-8 py-2.5",
                                    "text-body-small text-gray-700",
                                    "hover:text-brand-gold hover:bg-brand-sand/40",
                                    "transition-colors"
                                  )}
                                  onClick={onClose}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      /* Regular Link */
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-4 py-3",
                          "text-body text-brand-charcoal hover:text-brand-gold",
                          "transition-colors hover:bg-brand-sand/30"
                        )}
                        onClick={onClose}
                      >
                        {link.label}
                      </Link>
                    )}
                  </MobileMenuItemWrapper>
                ))}
              </nav>
            </div>

            {/* Footer Links Section */}
            <div className="border-t border-gray-200 p-4 space-y-2">
              <Link
                href="/account"
                className={cn(
                  "block px-4 py-3 -mx-4",
                  "text-body text-brand-charcoal hover:text-brand-gold",
                  "transition-colors hover:bg-brand-sand/30"
                )}
                onClick={onClose}
              >
                Moje konto
              </Link>
              <Link
                href="/about"
                className={cn(
                  "block px-4 py-3 -mx-4",
                  "text-body text-brand-charcoal hover:text-brand-gold",
                  "transition-colors hover:bg-brand-sand/30"
                )}
                onClick={onClose}
              >
                O nas
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "block px-4 py-3 -mx-4",
                  "text-body text-brand-charcoal hover:text-brand-gold",
                  "transition-colors hover:bg-brand-sand/30"
                )}
                onClick={onClose}
              >
                Kontakt
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Wrapper component for menu items with animation support
 */
function MobileMenuItemWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="border-b border-gray-100">{children}</div>;
}
