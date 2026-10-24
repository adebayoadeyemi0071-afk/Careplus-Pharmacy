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
    "Explore healthcare product information, medicine categories, wellness essentials, and customer support with CarePlus Pharmacy.",
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
    default:
      "CarePlus Pharmacy Nigeria | Medicines & Wellness Products",
    template: "%s | CarePlus Pharmacy",
  },

  description:
    "Explore medicine and healthcare product information, shop wellness essentials, browse product categories, and find customer support with CarePlus Pharmacy.",

  applicationName: "CarePlus Pharmacy",

  verification: {
    google: "PBw2X5xwWePAEAu8v8SYk9KKmUxs37nvXx4LMmcpRcA",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "CarePlus Pharmacy",
    locale: "en_NG",
    title:
      "CarePlus Pharmacy Nigeria | Medicines & Wellness Products",
    description:
      "Explore healthcare products, medicine information, and everyday wellness essentials with CarePlus Pharmacy.",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "CarePlus Pharmacy — Medicines and Wellness Products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "CarePlus Pharmacy Nigeria | Medicines & Wellness Products",
    description:
      "Explore healthcare products, medicine information, and everyday wellness essentials with CarePlus Pharmacy.",
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
            __html: JSON.stringify(websiteJsonLd).replace(
              /</g,
              "\\u003c"
            ),
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
