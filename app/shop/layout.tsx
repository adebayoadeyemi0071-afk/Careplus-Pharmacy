
import type { Metadata } from "next";

const siteUrl = "https://careplus-pharmacy-nu.vercel.app";
const shareImage = `${siteUrl}/images/careplus-share.png`;

export const metadata: Metadata = {
  title: "Shop Healthcare Products",
  description:
    "Browse healthcare product categories, everyday wellness essentials, personal care and more in the CarePlus Pharmacy catalogue.",

  alternates: {
    canonical: "/shop",
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/shop`,
    siteName: "CarePlus Pharmacy",
    locale: "en_NG",
    title: "Shop Healthcare Products | CarePlus Pharmacy",
    description:
      "Explore the CarePlus Pharmacy catalogue and browse healthcare and wellness product categories.",
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
    title: "Shop Healthcare Products | CarePlus Pharmacy",
    description:
      "Explore the CarePlus Pharmacy healthcare and wellness product catalogue.",
    images: [shareImage],
  },
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
