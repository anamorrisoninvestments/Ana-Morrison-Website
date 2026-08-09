import { MetadataRoute } from "next";
import { CLIENT } from "@/lib/client-data";
import { blogPosts } from "@/lib/blog-posts";
import { blogPostsEN } from "@/lib/blog-posts-en";
import { I18N_ENABLED } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = CLIENT.siteUrl;
  const now = new Date();

  const esStaticPages = [
    { url: base, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/sobre-mi`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/alquileres-a-corto-plazo`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${base}/tax-deed`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${base}/casos-de-exito`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${base}/recursos`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 },
    // Legal pages omitted from sitemap while under provisional draft (noindex).
  ];

  const esBlogPages = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  if (!I18N_ENABLED) {
    return [...esStaticPages, ...esBlogPages];
  }

  const enStaticPages = [
    { url: `${base}/en`, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/en/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/en/short-term-rentals`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${base}/en/tax-deed-investing`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${base}/en/case-studies`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${base}/en/resources`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/en/blog`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${base}/en/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 },
    // Legal pages omitted from sitemap while under provisional draft (noindex).
  ];

  const enBlogPages = blogPostsEN.map((post) => ({
    url: `${base}/en/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...esStaticPages, ...esBlogPages, ...enStaticPages, ...enBlogPages];
}
