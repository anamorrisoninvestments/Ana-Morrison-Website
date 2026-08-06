import { MetadataRoute } from "next";
import { CLIENT } from "@/lib/client-data";
import { blogPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = CLIENT.siteUrl;
  const now = new Date();

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/sobre-mi`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/alquileres-a-corto-plazo`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${base}/tax-deed`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${base}/casos-de-exito`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${base}/recursos`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${base}/politica-de-privacidad`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/politica-de-cookies`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/terminos-de-uso`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
