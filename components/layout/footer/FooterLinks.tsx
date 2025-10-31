"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Social media links configuration
const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com",
    color: "hover:text-blue-600",
    hoverBg: "hover:bg-blue-50",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com",
    color: "hover:text-pink-600",
    hoverBg: "hover:bg-pink-50",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com",
    color: "hover:text-blue-700",
    hoverBg: "hover:bg-blue-50",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com",
    color: "hover:text-red-600",
    hoverBg: "hover:bg-red-50",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "hover:text-blue-500",
    hoverBg: "hover:bg-blue-50",
  },
  {
    name: "Share",
    icon: Share2,
    url: "https://pinterest.com",
    color: "hover:text-purple-600",
    hoverBg: "hover:bg-purple-50",
  },
];

// Footer quick links configuration
const quickLinks = [
  { label: "O nas", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Oferty pracy", href: "#careers" },
  { label: "Prasa", href: "#press" },
  { label: "Kontakt", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

const legalLinks = [
  { label: "Polityka prywatności", href: "#privacy" },
  { label: "Warunki korzystania", href: "#terms" },
  { label: "Zarządzanie ciasteczkami", href: "#cookies" },
];

interface FooterLinksProps {
  variant?: "full" | "social-only" | "compact";
}

export function FooterLinks({ variant = "full" }: FooterLinksProps) {
  return (
    <footer className="bg-brand-charcoal border-t border-brand-gold/20">
      {/* Social Media Section */}
      {(variant === "full" || variant === "social-only") && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-b border-brand-gold/20 py-12 px-4 sm:px-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-between sm:items-start">
              {/* Social heading */}
              <div>
                <h3 className="text-h3 font-bold text-brand-cream">
                  Śledź nas
                </h3>
                <p className="mt-2 text-body text-brand-cream/70">
                  Bądź na bieżąco z naszymi najnowszymi kolekcjami
                </p>
              </div>

              {/* Social icons grid */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${link.name}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-lg",
                        "bg-white border-2 border-brand-charcoal/10",
                        "text-brand-charcoal transition-all duration-200",
                        "hover:border-brand-gold hover:text-brand-gold hover:shadow-neo-light",
                        link.color,
                        link.hoverBg
                      )}
                    >
                      <Icon className="size-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Links Section */}
      {(variant === "full" || variant === "compact") && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="py-8 px-4 sm:px-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {/* Quick Links */}
              <div>
                <h4 className="text-h4 font-semibold text-brand-charcoal">
                  Szybkie linki
                </h4>
                <motion.ul
                  className="mt-4 space-y-3"
                  initial="hidden"
                  whileInView="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  viewport={{ once: true }}
                >
                  {quickLinks.map((link) => (
                    <motion.li
                      key={link.label}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <a
                        href={link.href}
                        className={cn(
                          "text-body-small text-brand-charcoal/70",
                          "relative inline-block",
                          "hover:text-brand-gold transition-colors duration-200",
                          "group"
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-gold to-brand-copper",
                            "w-0 transition-all duration-300 group-hover:w-full"
                          )}
                        />
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-h4 font-semibold text-brand-charcoal">
                  Dokumenty
                </h4>
                <motion.ul
                  className="mt-4 space-y-3"
                  initial="hidden"
                  whileInView="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  viewport={{ once: true }}
                >
                  {legalLinks.map((link) => (
                    <motion.li
                      key={link.label}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <a
                        href={link.href}
                        className={cn(
                          "text-body-small text-brand-charcoal/70",
                          "relative inline-block",
                          "hover:text-brand-gold transition-colors duration-200",
                          "group"
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-gold to-brand-copper",
                            "w-0 transition-all duration-300 group-hover:w-full"
                          )}
                        />
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom bar - Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="border-t border-brand-charcoal/10 py-6 px-4 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <p className="text-center text-body-small text-brand-charcoal/60">
              © {new Date().getFullYear()} Gawin Meble. Wszelkie prawa
              zastrzeżone.
            </p>

            {/* Payment methods */}
            <div className="flex items-center gap-3">
              <span className="text-body-small text-brand-charcoal/60">
                Metody płatności:
              </span>
              <div className="flex gap-2 text-xs font-semibold">
                <span className="inline-block px-2 py-1 rounded border border-brand-charcoal/20 text-brand-charcoal/70">
                  Visa
                </span>
                <span className="inline-block px-2 py-1 rounded border border-brand-charcoal/20 text-brand-charcoal/70">
                  MC
                </span>
                <span className="inline-block px-2 py-1 rounded border border-brand-charcoal/20 text-brand-charcoal/70">
                  PayPal
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

// Export social icons component separately for reuse
export function SocialIcons({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${link.name}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              "bg-white border-2 border-brand-charcoal/10",
              "text-brand-charcoal transition-all duration-200",
              "hover:border-brand-gold hover:text-brand-gold hover:shadow-neo-light",
              link.color,
              link.hoverBg
            )}
          >
            <Icon className="size-4" />
          </motion.a>
        );
      })}
    </div>
  );
}
