'use client';

import * as React from 'react';
import Link from 'next/link';
import { SearchIcon, ShoppingCartIcon, HeartIcon, UserIcon } from 'lucide-react';
import { NeoButton } from '@/components/ui/neo-button';
import { BadgeNeo } from '@/components/ui/badge-neo';
import { cn } from '@/lib/utils';

export interface HeaderBarProps {
  cartCount?: number;
  wishlistCount?: number;
  onSearch?: (query: string) => void;
  logoHref?: string;
  showSearch?: boolean;
}

export function HeaderBar({
  cartCount = 0,
  wishlistCount = 0,
  onSearch,
  logoHref = '/',
  showSearch = true,
}: HeaderBarProps) {
  const [searchValue, setSearchValue] = React.useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };

  const handleMobileSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-cream shadow-neo-subtle">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo - Left */}
          <Link
            href={logoHref}
            className="flex-shrink-0 transition-transform hover:scale-105 active:scale-100"
          >
            <span className="text-2xl sm:text-3xl font-bold text-brand-charcoal">GAWIN</span>
          </Link>

          {/* Search Bar - Desktop & Tablet */}
          {showSearch && (
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-md"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Szukaj mebli..."
                  className={cn(
                    'w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-soft',
                    'text-body text-brand-charcoal placeholder:text-gray-400',
                    'focus:outline-none focus:border-[#B7A99D] focus:shadow-neo-light',
                    'transition-all duration-200'
                  )}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal hover:text-[#B7A99D] transition-colors"
                  aria-label="Szukaj"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Icon */}
            {showSearch && (
              <NeoButton
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={handleMobileSearchToggle}
                aria-label="Otwórz wyszukiwanie"
              >
                <SearchIcon className="w-5 h-5" />
              </NeoButton>
            )}

            {/* Wishlist Button */}
            <NeoButton
              variant="ghost"
              size="sm"
              className="relative"
              aria-label={`Lista życzeń, ${wishlistCount} przedmiotów`}
            >
              <HeartIcon className="w-5 h-5" />
              {wishlistCount > 0 && (
                <BadgeNeo
                  variant="info"
                  size="sm"
                  className="absolute -top-1 -right-1"
                >
                  {wishlistCount}
                </BadgeNeo>
              )}
            </NeoButton>

            {/* Cart Button */}
            <NeoButton
              variant="ghost"
              size="sm"
              className="relative"
              aria-label={`Koszyk, ${cartCount} przedmiotów`}
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
              className="hidden sm:flex"
              aria-label="Konto"
            >
              <UserIcon className="w-5 h-5" />
            </NeoButton>
          </div>
        </div>

        {/* Mobile Search Bar - Below Header */}
        {showSearch && isMobileSearchOpen && (
          <form
            onSubmit={(e) => {
              handleSearch(e);
              setIsMobileSearchOpen(false);
            }}
            className="md:hidden pb-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Szukaj..."
                autoFocus
                className={cn(
                  'w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-soft',
                  'text-body-small text-brand-charcoal placeholder:text-gray-400',
                  'focus:outline-none focus:border-[#B7A99D] focus:shadow-neo-light',
                  'transition-all duration-200'
                )}
              />
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </form>
        )}
      </div>
    </header>
  );
}
