"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavLinks } from "./NavLinks";

export function PremiumNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/listing", label: "Listing" },
    { href: "/pdp", label: "PDP" },
    { href: "/cart", label: "Koszyk" },
    { href: "/checkout", label: "Checkout" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-dark shadow-lg border-b border-[color:rgba(183,169,157,0.2)]"
            : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-sand-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-xl font-bold text-brand-charcoal group-hover:text-brand-sand-primary transition-colors">
                Gawin-Home
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <NavLinks links={navLinks} variant="horizontal" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <Link
                href="/listing"
                className="rounded-xl p-2 transition-colors hover:bg-[rgba(183,169,157,0.12)]"
                aria-label="Przejdź do listingu"
              >
                <Search
                  className="h-5 w-5 text-brand-charcoal"
                  strokeWidth={1.5}
                />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative rounded-xl p-2 transition-colors hover:bg-[rgba(183,169,157,0.12)]"
                aria-label="Koszyk"
              >
                <ShoppingBag
                  className="h-5 w-5 text-brand-charcoal"
                  strokeWidth={1.5}
                />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-sand-primary text-xs font-bold text-white">
                  0
                </span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-xl transition-colors hover:bg-[rgba(183,169,157,0.12)]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-brand-charcoal" strokeWidth={1.5} />
                ) : (
                  <Menu
                    className="h-6 w-6 text-brand-charcoal"
                    strokeWidth={1.5}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm bg-[rgba(66,58,53,0.82)]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm glass-dark border-l border-[color:rgba(183,169,157,0.2)]"
            >
              <div className="p-6 pt-24">
                <NavLinks
                  links={navLinks}
                  variant="vertical"
                  onLinkClick={() => setIsMobileMenuOpen(false)}
                  className="space-y-2"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
