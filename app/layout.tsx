
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/navbar/navbar";
import CartDrawer from "@/components/cart/cart-drawer";
import Footer from "@/components/footer/footer";
import CookieConsent from "@/components/cookies/cookie-consent";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CarePlus Pharmacy",
  description:
    "Trusted medicines, healthcare products and everyday wellness essentials.",

  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },

  verification: {
    google: "PBw2X5xwWePAEAu8v8SYk9KKmUxs37nvXx4LMmcpRcA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${manrope.variable} bg-[#FAFCFB] text-[#102A26] antialiased`}
      >
        <Navbar />

        <CartDrawer />

        {children}

        <Footer />

        <CookieConsent />
      </body>
    </html>
  );
}
