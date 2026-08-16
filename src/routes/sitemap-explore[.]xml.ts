import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { isPrimaryTripPlannerDestination } from "@/data/destination-availability";
import { auditDestination } from "@/data/destination-audit";
import { applyAllCuratedDestinations } from "@/data/destination-curation-all";
import { improveDestinationCatalog } from "@/data/destination-quality";
import { supplementalExploreCategories } from "@/data/explore-categories";
import { fetchCoreExploreDestinations } from "@/data/explore-core-remote";
import { reconcileDestinationHeroes } from "@/data/explore-hero-reconciliation";
import { applyExploreHeroAssets } from "@/data/explore-heroes";
import { categories, destinations as fixtureDestinations, regions } from "@/data/fixtures/texas";
import { fetchExploreDestinations } from "@/data/explore-remote";
import { applyStateParkHeroAssets } from "@/data/state-park-heroes";
import { isExploreSitemapOwnedPath, isIndexablePublicPath, normalizePublicPath } from "@/lib/public-routes";

const BASE_URL = `https://${texasDefinedBrand.identity.domain}`;
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

function entry(path: string, lastModified?: string): string | null {
  const normalized = normalizePublicPath(path);
  if (!normalized || !isExploreSitemapOwnedPath(normalized) || !isIndexablePublicPath(normalized)) return null;
  const lastmod = validLastModified(lastModified);
  return `  <url>\n    <loc>${escapeXml(`${BASE_URL}${normalized}`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`;
}

function resolveDestinationCatalog(destinations: typeof fixtureDestinations) {
  return improveDestinationCatalog(
    applyAllCuratedDestinations(
      reconcileDestinationHeroes(
        applyExploreHeroAssets(
          applyStateParkHeroAssets(destinations),
        ),
      ),
    ),
  );
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

        const rawDestinations = remoteFailed ? fixtureDestinations : remoteDestinations;
        if (remoteFailed && rawDestinations.length === 0) {
          return new Response("Explore catalog temporarily unavailable", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8", "Retry-After": "300", "Cache-Control": "no-store" },
          });
        }
        const destinations = resolveDestinationCatalog(rawDestinations);

        const categorySlugs = [...new Set([...categories, ...supplementalExploreCategories]
          .map((category) => category.slug)
          .filter((slug) => EXPLORE_CATEGORY_SLUGS.has(slug)))];
        const regionSlugs = [...new Set([
          ...regions.map((region) => region.id),
          ...EXPLORE_REGION_SLUGS,
        ])];
        const staticPaths = [
          "/explore",
          "/explore/trip-planner",
          "/explore/attractions-comparison",
          ...categorySlugs.map((slug) => `/explore/${slug}`),
          ...regionSlugs.map((regionSlug) => `/explore/region/${regionSlug}`),
        ];
        const indexableDestinations = [...new Map(destinations.filter((item) => item.slug).map((item) => [item.slug, item])).values()]
          .filter((destination) => isPrimaryTripPlannerDestination(destination) && auditDestination(destination).readyForIndexing);
        const destinationEntries = indexableDestinations
          .map((item) => entry(`/destination/${item.slug}`, item.sourceCheckedAt))
          .filter((item): item is string => Boolean(item));
        const staticEntries = [...new Set(staticPaths)]
          .map((path) => entry(path))
          .filter((item): item is string => Boolean(item));
        const entries = [...staticEntries, ...destinationEntries].join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});