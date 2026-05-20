import { MetadataRoute } from "next";
import { CLIENT } from "@/lib/client-data";
import { blogPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = CLIENT.siteUrl;
  const now = new Date();

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/sobre-mi`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/servicios`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/libros`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/conferencias`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/prensa`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/en`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const bookPages = CLIENT.books.map((book) => ({
    url: `${base}/libros/${book.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...bookPages, ...blogPages];
}
