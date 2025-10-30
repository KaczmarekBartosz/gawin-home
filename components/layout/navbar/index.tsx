"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { BadgeNeo } from "@/components/ui/badge-neo";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-context";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/categories", label: "Kategorie" },
  { href: "/bestsellers", label: "Bestsellery" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/about", label: "O nas" },
  { href: "/contact", label: "Kontakt" },
];

export async function Navbar() {
  return <NavbarClient />;
}

function NavbarClient() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (href: string) => pathname === href;

  const cartCount = cart?.totalQuantity || 0;

  const handleSearchClick = () => {
    // Search functionality will be implemented in Task 28
    console.log("Search clicked");
  };

  const handleAccountClick = () => {
    router.push("/account");
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <nav className="sticky top-0 z-50 bg-brand-cream shadow-neo-subtle">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-h3 font-bold text-brand-charcoal">GAWIN</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-body transition-all duration-200 relative",
                  isActive(link.href)
                    ? "text-brand-gold font-semibold"
                    : "text-brand-charcoal hover:text-brand-gold"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-3 lg:gap-4">
            {/* Search Button */}
            <NeoButton
              variant="ghost"
              size="sm"
              className="p-2 h-10 w-10"
              onClick={handleSearchClick}
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5" />
            </NeoButton>

            {/* Cart Button with Badge */}
            <NeoButton
              variant="ghost"
              size="sm"
              className="relative p-2 h-10 w-10"
              onClick={handleCartClick}
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <BadgeNeo
                  variant="info"
                  size="sm"
                  className="absolute -top-1 -right-1"
                >
                  {cartCount}
                </BadgeNeo>
              )}
            </NeoButton>

            {/* Account Button */}
            <NeoButton
              variant="ghost"
              size="sm"
              className="p-2 h-10 w-10"
              onClick={handleAccountClick}
              aria-label="Account"
            >
              <UserIcon className="w-5 h-5" />
            </NeoButton>

            {/* Mobile Menu Toggle */}
            <button
              className="sm:hidden p-2 h-10 w-10 text-brand-charcoal hover:shadow-neo-subtle transition-all rounded-soft"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="sm:hidden border-t border-brand-gold/20 bg-white/50 backdrop-blur-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 px-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 text-body rounded-soft transition-all",
                      isActive(link.href)
                        ? "text-brand-gold font-semibold bg-brand-gold/10"
                        : "text-brand-charcoal hover:bg-brand-gold/5 hover:text-brand-gold"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
