import { PremiumNavbar } from "components/layout/PremiumNavbar";
import { Footer } from "components/layout/footer/Footer";
import type { ReactNode } from "react";

import { geistSans, spaceGrotesk } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "Gawin-Home — Makiety designowe",
  description:
    "Design-only sprint: hybrydowy system Gawin-Home z trybami Elegancki i Showroom, oparty na mockach danych.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-light-showroom text-brand-charcoal selection:bg-brand-gold/20">
        <PremiumNavbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
