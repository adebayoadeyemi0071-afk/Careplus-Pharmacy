
import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const SITE_URL = "https://YOUR-LIVE-DOMAIN";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = [
    "",
    "/shop",
    "/categories",
    "/about",
    "/contact",
    "/customer-care",
    "/privacy",
    "/terms",
  ];

  const staticPages: MetadataRoute.Sitemap = publicPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/shop/${encodeURIComponent(product.id)}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
