import { PremiumNavbar } from "components/layout/PremiumNavbar";
import { Footer } from "components/layout/footer/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { ReactNode } from "react";

import { geistSans, spaceGrotesk } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "Gawin-Home — Premium Furniture Collection",
  description:
    "Premium furniture e-commerce with dark mode, interactive features, and beautiful design system. Modern, minimalist, and luxury styles for your home.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-light-showroom text-brand-charcoal selection:bg-[#B7A99D]/20 dark:bg-brand-charcoal dark:text-brand-cream transition-colors duration-300">
        <ThemeProvider defaultTheme="light" storageKey="gawin-home-theme">
          <PremiumNavbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
