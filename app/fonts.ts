import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";

export const geistSans = GeistSans;

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});
