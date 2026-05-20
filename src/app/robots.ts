import { MetadataRoute } from "next";
import { CLIENT } from "@/lib/client-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AI crawlers — Phase 6: Optimization for AIs
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Anthropic-AI", allow: "/" },
      { userAgent: "Cohere-AI", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      // Protect admin area
      { userAgent: "*", disallow: ["/admin/", "/api/pr-autopilot/"] },
    ],
    sitemap: `${CLIENT.siteUrl}/sitemap.xml`,
  };
}
