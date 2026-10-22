
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/navbar/navbar";
import CartDrawer from "@/components/cart/cart-drawer";
import Footer from "@/components/footer/footer";
import CookieConsent from "@/components/cookies/cookie-consent";

const siteUrl = "https://careplus-pharmacy-nu.vercel.app";
const shareImage = `${siteUrl}/images/careplus-share.png`;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name: "CarePlus Pharmacy",
  alternateName: "CarePlus",
  description:
    "CarePlus Pharmacy's healthcare product catalogue and online shopping experience.",
  inLanguage: "en-NG",
};

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "CarePlus Pharmacy | Your Health, Our Priority",
    template: "%s | CarePlus Pharmacy",
  },

  description:
    "Explore CarePlus Pharmacy's healthcare product categories, product information, and everyday wellness essentials.",

  applicationName: "CarePlus Pharmacy",

  verification: {
    google: "PBw2X5xwWePAEAu8v8SYk9KKmUxs37nvXx4LMmcpRcA",
  },

  openGraph: {
    type: "website",
    siteName: "CarePlus Pharmacy",
    locale: "en_NG",
    title: "CarePlus Pharmacy | Your Health, Our Priority",
    description:
      "Explore healthcare products and everyday wellness essentials with CarePlus Pharmacy.",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "CarePlus Pharmacy — Your Health, Our Priority",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CarePlus Pharmacy | Your Health, Our Priority",
    description:
      "Explore healthcare products and everyday wellness essentials with CarePlus Pharmacy.",
    images: [shareImage],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <Navbar />

        <CartDrawer />

        {children}

        <Footer />

        <CookieConsent />
      </body>
    </html>
  );
}
