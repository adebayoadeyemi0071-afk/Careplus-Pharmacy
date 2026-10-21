
import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const SITE_URL = "https://careplus-pharmacy-nu.vercel.app";

const publicPages = [
  "",
  "/shop",
  "/categories",
  "/about",
  "/contact",
  "/customer-care",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = publicPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = products
    .filter(
      (product) =>
        typeof product.id === "string" && product.id.trim().length > 0
    )
    .map((product) => ({
      url: `${SITE_URL}/shop/${encodeURIComponent(product.id)}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticPages, ...productPages];
}
