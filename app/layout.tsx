import { CartProvider } from 'components/cart/cart-context';
import { PremiumNavbar } from 'components/layout/PremiumNavbar';
import { Footer } from 'components/layout/footer/Footer';
// import { WelcomeToast } from 'components/welcome-toast'; // Disabled - causes cart errors
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'lib/design-system';
import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground selection:bg-accent/20">
        <ThemeProvider defaultTheme="hybrid-luxury">
          <CartProvider cartPromise={cart}>
            <PremiumNavbar />
            <main>
              {children}
              <Toaster closeButton />
              {/* <WelcomeToast /> */}
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
