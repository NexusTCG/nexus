export default async function sitemap() {
  const baseUrl = "https://play.nexus";
  return [{
    url: baseUrl,
    lastModified: new Date(),
  }]
}