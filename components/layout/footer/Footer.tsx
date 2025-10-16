"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "Wszystkie produkty", href: "/products" },
      { label: "Nowości", href: "/products?filter=new" },
      { label: "Promocje", href: "/products?filter=sale" },
      { label: "Bestsellery", href: "/products?filter=bestsellers" },
    ],
    categories: [
      { label: "Łóżka", href: "/category/lozka" },
      { label: "Sofy", href: "/category/sofy" },
      { label: "Stoły", href: "/category/stoly" },
      { label: "Oświetlenie", href: "/category/oswietlenie" },
    ],
    company: [
      { label: "O nas", href: "/about" },
      { label: "Kontakt", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Kariera", href: "/career" },
    ],
    help: [
      { label: "Dostawa", href: "/delivery" },
      { label: "Zwroty", href: "/returns" },
      { label: "Gwarancja", href: "/warranty" },
      { label: "FAQ", href: "/faq" },
    ],
    legal: [
      { label: "Regulamin", href: "/terms" },
      { label: "Polityka prywatności", href: "/privacy" },
      { label: "Polityka cookies", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+48 123 456 789" },
    { icon: Mail, text: "kontakt@gawin-home.pl" },
    { icon: MapPin, text: "ul. Przykładowa 123, 00-001 Warszawa" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-brand-gold/15 bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(184,149,106,0.14),transparent_60%),linear-gradient(175deg,rgba(26,26,26,0.95),rgba(26,26,26,0.98))]">
      {/* Decorative elements */}
      <div className="absolute top-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-brand-gold/12 blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-10%] h-[360px] w-[360px] rounded-full bg-brand-copper/10 blur-[120px]" />
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-12 text-[min(18vw,220px)] font-display uppercase tracking-[0.2em] text-white/5"
      >
        Gawin
      </span>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 rounded-xl gradient-gold-premium flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">G</span>
              </div>
              <span className="text-2xl font-bold text-brand-cream group-hover:text-brand-gold transition-colors">
                Gawin-Home
              </span>
            </Link>
            <p className="text-brand-cream/80 mb-6 leading-relaxed">
              Meble premium, które łączą ponadczasowy design z najwyższą
              jakością wykonania. Perfekcja w prostocie.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-dark rounded-xl hover:glass-gold transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon
                      className="h-5 w-5 text-brand-cream"
                      strokeWidth={1.5}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-brand-cream font-bold mb-4 text-lg">Sklep</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream/70 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h3 className="text-brand-cream font-bold mb-4 text-lg">
              Kategorie
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream/70 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-brand-cream font-bold mb-4 text-lg">Firma</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream/70 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-brand-cream font-bold mb-4 text-lg">Pomoc</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream/70 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-8 border-t border-brand-gold/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.text} className="flex items-center gap-3">
                  <div className="p-2 glass-dark rounded-lg">
                    <Icon
                      className="h-5 w-5 text-brand-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-brand-cream/80 text-sm">
                    {info.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-brand-gold/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-cream/60 text-sm text-center md:text-left">
            © {currentYear} Gawin-Home. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-cream/60 hover:text-brand-gold transition-colors text-xs"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
