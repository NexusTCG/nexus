import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://play.nexus";

  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: []
    },
    sitemap: baseUrl + "/sitemap.xml",
  };
};