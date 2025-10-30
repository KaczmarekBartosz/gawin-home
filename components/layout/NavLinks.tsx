"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface NavLinksProps {
  links: NavLink[];
  variant?: "horizontal" | "vertical";
  onLinkClick?: () => void;
  className?: string;
}

export function NavLinks({
  links,
  variant = "horizontal",
  onLinkClick,
  className,
}: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (!pathname) return false;
    // Handle home route
    if (href === "/home" || href === "/") {
      return pathname === "/" || pathname === "/home";
    }
    // Handle nested routes
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav
      className={cn(
        variant === "horizontal"
          ? "flex gap-4 lg:gap-8"
          : "flex flex-col gap-1",
        className
      )}
    >
      {links.map((link) => {
        const active = isActive(link.href);

        return (
          <motion.div
            key={link.href}
            className="relative"
            layout
          >
            <Link
              href={link.href}
              onClick={onLinkClick}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative inline-flex items-center gap-2 px-2 py-2 transition-all duration-200",
                "font-medium",
                active
                  ? "text-brand-gold"
                  : "text-brand-charcoal hover:text-brand-gold",
                variant === "vertical" &&
                  "w-full px-4 py-3 hover:bg-brand-sand/50 rounded-soft",
                variant === "horizontal" && "text-sm"
              )}
            >
              {/* Icon if provided */}
              {link.icon && (
                <span className="flex-shrink-0 inline-flex items-center justify-center">
                  {link.icon}
                </span>
              )}

              {/* Label */}
              <span>{link.label}</span>

              {/* Badge if provided */}
              {link.badge && (
                <span className="ml-auto bg-brand-gold text-dark-bg text-xs font-bold rounded-full px-2 py-1">
                  {link.badge}
                </span>
              )}

              {/* Animated Underline (Horizontal only) */}
              {variant === "horizontal" && active && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold to-brand-copper rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
