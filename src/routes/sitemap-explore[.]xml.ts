import { createFileRoute } from "@tanstack/react-router";

import { supplementalExploreCategories } from "@/data/explore-categories";
import { fetchCoreExploreDestinations } from "@/data/explore-core-remote";
import { categories, destinations as fixtureDestinations, regions } from "@/data/fixtures/texas";
import { fetchExploreDestinations } from "@/data/explore-remote";

const BASE_URL = "https://texasdefined.com";
const EXPLORE_CATEGORY_SLUGS = new Set([
  "lakes-rivers", "major-springs", "state-parks", "national-parks", "caverns",
  "beaches-coast", "historic-sites", "road-trips", "small-towns", "food-bbq", "outdoors",
]);
const EXPLORE_REGION_SLUGS = [
  "hill-country", "gulf-coast", "big-bend", "panhandle", "piney-woods", "prairies-lakes", "south-texas",
];

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");
}

function validLastModified(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

function entry(url: string, lastModified?: string): string {
  const lastmod = validLastModified(lastModified);
  return `  <url>\n    <loc>${escapeXml(url)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`;
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
          console.error("Explore sitemap enrichment unavailable; retrying core remote catalog", error);
          try {
            remoteDestinations = await fetchCoreExploreDestinations({ limit: 5000 });
          } catch (coreError) {
            remoteFailed = true;
            console.error("Core Explore sitemap catalog unavailable; using outage fixtures", coreError);
          }
        }

        const destinations = remoteDestinations.length ? remoteDestinations : fixtureDestinations;
        if (remoteFailed && destinations.length === 0) {
          return new Response("Explore catalog temporarily unavailable", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8", "Retry-After": "300", "Cache-Control": "no-store" },
          });
        }

        const categorySlugs = [...categories, ...supplementalExploreCategories]
          .map((category) => category.slug)
          .filter((slug) => EXPLORE_CATEGORY_SLUGS.has(slug));
        const staticUrls = [
          `${BASE_URL}/explore`,
          ...categorySlugs.map((slug) => `${BASE_URL}/explore/${slug}`),
          ...regions.map((region) => `${BASE_URL}/explore/region/${region.id}`),
          ...EXPLORE_REGION_SLUGS.map((regionSlug) => `${BASE_URL}/explore/region/${regionSlug}`),
        ];
        const destinationEntries = [...new Map(destinations.filter((item) => item.slug).map((item) => [item.slug, item])).values()]
          .map((item) => entry(`${BASE_URL}/destination/${item.slug}`, item.sourceCheckedAt));
        const entries = [...[...new Set(staticUrls)].map((url) => entry(url)), ...destinationEntries].join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300, s-maxage=3600" },
        });
      },
    },
  },
});