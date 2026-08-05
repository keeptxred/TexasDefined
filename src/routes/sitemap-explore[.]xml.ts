import { createFileRoute } from "@tanstack/react-router";

import { supplementalExploreCategories } from "@/data/explore-categories";
import { categories, destinations as fixtureDestinations, regions } from "@/data/fixtures/texas";
import { fetchExploreDestinations } from "@/data/explore-remote";

const BASE_URL = "https://texasdefined.com";
const EXPLORE_CATEGORY_SLUGS = new Set([
  "lakes-rivers",
  "major-springs",
  "state-parks",
  "national-parks",
  "caverns",
  "beaches-coast",
  "historic-sites",
  "road-trips",
  "small-towns",
  "food-bbq",
  "outdoors",
]);

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/sitemap-explore.xml")({
  server: {
    handlers: {
      GET: async () => {
        let remoteDestinations: Awaited<ReturnType<typeof fetchExploreDestinations>> = [];
        let remoteFailed = false;
        try {
          remoteDestinations = await fetchExploreDestinations({ limit: 5000 });
        } catch (error) {
          remoteFailed = true;
          console.error("Explore sitemap catalog request failed; using fixture destinations", error);
        }

        const destinations = remoteDestinations.length ? remoteDestinations : fixtureDestinations;

        // Failure protection: never publish a truncated Explore sitemap.
        if (remoteFailed && destinations.length === 0) {
          return new Response("Explore catalog temporarily unavailable", {
            status: 503,
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Retry-After": "300",
              "Cache-Control": "no-store",
            },
          });
        }

        const categorySlugs = [...categories, ...supplementalExploreCategories]
          .map((category) => category.slug)
          .filter((slug) => EXPLORE_CATEGORY_SLUGS.has(slug));
        const urls = [
          `${BASE_URL}/explore`,
          ...categorySlugs.map((slug) => `${BASE_URL}/explore/${slug}`),
          ...regions.map((region) => `${BASE_URL}/explore/region/${region.id}`),
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
