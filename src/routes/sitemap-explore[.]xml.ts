import { createFileRoute } from "@tanstack/react-router";

import { fetchExploreDestinations } from "@/data/explore-remote";

const BASE_URL = "https://texasdefined.com";

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/sitemap-explore.xml")({
  server: {
    handlers: {
      GET: async () => {
        let destinations = [] as Awaited<ReturnType<typeof fetchExploreDestinations>>;
        try {
          destinations = await fetchExploreDestinations({ limit: 5000 });
        } catch (error) {
          console.error("Explore sitemap catalog request failed", error);
        }

        const urls = [
          `${BASE_URL}/explore`,
          `${BASE_URL}/explore/search`,
          ...destinations.filter((item) => item.slug).map((item) => `${BASE_URL}/destination/${item.slug}`),
        ];
        const entries = [...new Set(urls)]
          .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=300, s-maxage=3600",
          },
        });
      },
    },
  },
});
