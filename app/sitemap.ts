import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const SITE_URL = "https://careplus-pharmacy-nu.vercel.app";

const publicPages = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/shop",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/categories",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/medicine-verification",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/customer-care",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/cookies",
    changeFrequency: "yearly",
    priority: 0.3,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = publicPages.map(
    ({ path, changeFrequency, priority }) => ({
      url: new URL(path, SITE_URL).toString(),
      changeFrequency,
      priority,
    })
  );

  const seenProductIds = new Set<string>();

  const productPages: MetadataRoute.Sitemap = products.flatMap(
    (product) => {
      if (
        typeof product.id !== "string" ||
        product.id.trim().length === 0
      ) {
        return [];
      }

      const productId = product.id.trim();

      // Avoid duplicate product URLs in the sitemap.
      if (seenProductIds.has(productId)) {
        return [];
      }

      seenProductIds.add(productId);

      return [
        {
          url: new URL(
            `/shop/${encodeURIComponent(productId)}`,
            SITE_URL
          ).toString(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        },
      ];
    }
  );

  return [...staticPages, ...productPages];
}
