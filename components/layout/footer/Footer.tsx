"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  CreditCard,
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface ContactInfo {
  icon: typeof Mail;
  text: string;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, margin: "0px 0px -10% 0px" });

  // Scroll to top functionality
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const shopLinks: FooterLink[] = [
    { label: "Wszystkie produkty", href: "/products" },
    { label: "Nowości", href: "/products?filter=new" },
    { label: "Promocje", href: "/products?filter=sale" },
    { label: "Bestsellery", href: "/products?filter=bestsellers" },
  ];

  const categoryLinks: FooterLink[] = [
    { label: "Łóżka", href: "/category/lozka" },
    { label: "Sofy", href: "/category/sofy" },
    { label: "Stoły", href: "/category/stoly" },
    { label: "Oświetlenie", href: "/category/oswietlenie" },
  ];

  const companyLinks: FooterLink[] = [
    { label: "O nas", href: "/about" },
    { label: "Kontakt", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Kariera", href: "/career" },
  ];

  const helpLinks: FooterLink[] = [
    { label: "Dostawa", href: "/delivery" },
    { label: "Zwroty", href: "/returns" },
    { label: "Gwarancja", href: "/warranty" },
    { label: "FAQ", href: "/faq" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/gawin-home",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/gawin-home",
      label: "Instagram",
    },
    { icon: Linkedin, href: "https://linkedin.com/company/gawin-home", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@gawin-home", label: "YouTube" },
  ];

  const contactInfo: ContactInfo[] = [
    { icon: Phone, text: "+48 123 456 789" },
    { icon: Mail, text: "kontakt@gawin-home.pl" },
    { icon: MapPin, text: "ul. Przykładowa 123, 00-001 Warszawa" },
  ];

  const paymentMethods = [CreditCard, CreditCard, CreditCard]; // Placeholder - could use actual payment icons

  const legalLinks: FooterLink[] = [
    { label: "Regulamin", href: "/terms" },
    { label: "Polityka prywatności", href: "/privacy" },
    { label: "Polityka cookies", href: "/cookies" },
  ];

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-brand-gold/15 bg-gradient-to-b from-brand-charcoal to-brand-charcoal/95"
    >
      {/* Premium decorative elements */}
      <div className="absolute top-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-brand-gold/12 blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-10%] h-[360px] w-[360px] rounded-full bg-brand-copper/10 blur-[120px]" />
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-12 text-[min(18vw,220px)] font-display uppercase tracking-[0.2em] text-white/5"
      >
        Gawin
      </span>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {/* Main Footer Content - 4 Column Grid (responsive) */}
        <motion.div
          className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand & Logo Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="group mb-6 flex items-center gap-3">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-gold-premium shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl font-bold text-white">G</span>
              </motion.div>
              <span className="text-2xl font-bold text-brand-cream transition-colors group-hover:text-brand-gold">
                GAWIN
              </span>
            </Link>

            {/* Premium tagline */}
            <p className="mb-6 leading-relaxed text-brand-cream/80">
              Elegancja przez prostotę. Meble premium, które łączą ponadczasowy
              design z najwyższą jakością wykonania.
            </p>

            {/* Social Icons - Animated */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-xl p-3 glass-dark transition-all duration-300 hover:glass-gold"
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                  >
                    <Icon className="h-5 w-5 text-brand-cream" strokeWidth={1.5} />
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl bg-brand-gold/0 shadow-glow-gold/0 transition-all duration-300 group-hover:shadow-glow-gold/50" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Shop Links Column */}
          <motion.div variants={itemVariants} className="sm:col-span-1">
            <h3 className="mb-4 text-lg font-bold text-brand-cream">
              Sklep
              <div className="mt-2 h-1 w-12 bg-brand-gold" />
            </h3>
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {shopLinks.map((link) => (
                <motion.li key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className="relative inline-block text-sm text-brand-cream/70 transition-colors hover:text-brand-gold"
                  >
                    <span className="relative">
                      {link.label}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-gold"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Categories Links Column */}
          <motion.div variants={itemVariants} className="sm:col-span-1">
            <h3 className="mb-4 text-lg font-bold text-brand-cream">
              Kategorie
              <div className="mt-2 h-1 w-12 bg-brand-gold" />
            </h3>
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {categoryLinks.map((link) => (
                <motion.li key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className="relative inline-block text-sm text-brand-cream/70 transition-colors hover:text-brand-gold"
                  >
                    <span className="relative">
                      {link.label}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-gold"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Company & Help Combined (mobile-responsive) */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-lg font-bold text-brand-cream">
              Firma
              <div className="mt-2 h-1 w-12 bg-brand-gold" />
            </h3>
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {companyLinks.map((link) => (
                <motion.li key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className="relative inline-block text-sm text-brand-cream/70 transition-colors hover:text-brand-gold"
                  >
                    <span className="relative">
                      {link.label}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-gold"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Section Integration */}
        <motion.div
          className="my-8 rounded-xl bg-gradient-to-r from-brand-gold/12 via-brand-copper/8 to-brand-gold/10 border border-brand-gold/25 p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-brand-cream">
                Zapisz się do newslettera
              </h3>
              <p className="mt-1 text-sm text-brand-cream/70">
                Otrzymuj inspiracje i limitowane kolekcje jako pierwszy
              </p>
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <input
                type="email"
                placeholder="Twój e-mail"
                className="flex-1 rounded-lg border border-brand-gold/30 bg-brand-charcoal/50 px-4 py-2 text-sm text-brand-cream placeholder:text-brand-cream/40 transition-all duration-300 focus:border-brand-gold focus:bg-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                aria-label="Newsletter email"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-gradient-gold-premium px-6 py-2 text-sm font-semibold text-brand-charcoal transition-all duration-300 hover:shadow-glow-gold"
              >
                Zapisz
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Contact Info & Payment Methods */}
        <motion.div
          className="border-t border-brand-gold/20 py-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-cream/80">
                Kontakt
              </h4>
              <div className="space-y-3">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.text}
                      className="flex items-center gap-3"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="rounded-lg bg-brand-gold/20 p-2">
                        <Icon className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm text-brand-cream/80">{info.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-cream/80">
                Metody płatności
              </h4>
              <div className="flex items-center gap-3 flex-wrap">
                {["Visa", "Mastercard", "PayPal"].map((method) => (
                  <motion.div
                    key={method}
                    className="rounded-lg border border-brand-gold/30 bg-brand-gold/5 px-4 py-2 text-xs font-semibold text-brand-cream/80"
                    whileHover={{ backgroundColor: "rgba(212, 165, 116, 0.15)", borderColor: "rgba(212, 165, 116, 0.5)" }}
                  >
                    {method}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar - Legal Links + Back to Top */}
        <motion.div
          className="flex flex-col items-center justify-between gap-6 border-t border-brand-gold/20 py-6 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-center text-xs text-brand-cream/60 sm:text-left">
            © {currentYear} Gawin-Home. Wszelkie prawa zastrzeżone.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs text-brand-cream/60 transition-colors hover:text-brand-gold"
              >
                <span className="relative">
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-px w-0 bg-brand-gold"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/50 transition-all duration-300 ${
              isVisible
                ? "bg-brand-gold/20 hover:bg-brand-gold/30"
                : "pointer-events-none"
            }`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 text-brand-gold" strokeWidth={2} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
