import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
const apiEndpoint = process.env.API_ENDPOINT_DATA || "http://localhost:5000/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/likes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${apiEndpoint}/products?limit=100`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      const products = data?.products || data?.data?.products || [];
      if (Array.isArray(products)) {
        productPages = products.map((p: any) => ({
          url: `${siteUrl}/shop/${p._id}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }));
      }
    }
  } catch (e) {
    console.error("Failed to generate dynamic product sitemap:", e);
  }

  return [...staticPages, ...productPages];
}
