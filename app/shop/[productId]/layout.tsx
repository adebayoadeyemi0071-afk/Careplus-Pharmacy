
import type { Metadata } from "next";
import { products } from "@/data/products";

const siteUrl = "https://careplus-pharmacy-nu.vercel.app";
const shareImage = `${siteUrl}/images/careplus-share.png`;

type ProductLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

type ProductRouteProps = {
  params: Promise<{
    productId: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { productId } = await params;

  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) {
    return {
      title: {
        absolute: "Product Not Found | CarePlus Pharmacy",
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = `${product.name} | CarePlus Pharmacy`;

  const description =
    `Explore ${product.name} in the ${product.category} category on CarePlus Pharmacy. ` +
    "Review the product information available on the website.";

  const canonicalUrl =
    `${siteUrl}/shop/${encodeURIComponent(product.id)}`;

  return {
    title: {
      absolute: title,
    },

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: "CarePlus Pharmacy",
      locale: "en_NG",
      title,
      description,
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: `CarePlus Pharmacy — ${product.name}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export default function ProductLayout({
  children,
}: ProductLayoutProps) {
  return <>{children}</>;
}
