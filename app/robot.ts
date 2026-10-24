import type { MetadataRoute } from "next";

const SITE_URL = "https://careplus-pharmacy-nu.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/auth",
        "/checkout",
        "/order-success",
        "/prescription-upload",
        "/prescription-status",
        "/wishlist",
      ],
    },

    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
