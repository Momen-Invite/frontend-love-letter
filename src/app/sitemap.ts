import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://momeninvite.web.id/love-letter";
  const now = new Date();

  // Daftar slug tema publik terindeks
  const publicPages = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sayang`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  return publicPages;
}
