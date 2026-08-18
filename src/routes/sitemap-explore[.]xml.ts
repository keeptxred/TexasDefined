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
import { fetchExploreDestinations, hasExploreRemoteData } from "@/data/explore-remote";
import { applyStateParkHeroAssets } from "@/data/state-park-heroes";
import type { Destination } from "@/data/types";
import { isExploreSitemapOwnedPath, isIndexablePublicPath, normalizePublicPath } from "@/lib/public-routes";

const BASE_URL = `https://${texasDefinedBrand.identity.domain}`;
const EXPLORE_CATEGORY_SLUGS = new Set([
  "lakes-rivers", "major-springs", "state-parks", "national-parks", "caverns",
  "beaches-coast", "historic-sites", "road-trips", "small-towns", "food-bbq", "outdoors",
]);
const EXPLORE_REGION_SLUGS = [
  "hill-country", "gulf-coast", "big-bend", "panhandle", "piney-woods", "prairies-lakes", "south-texas",
];
const PAINTED_CHURCH_PATHS = [
  "/explore/painted-churches/high-hill-nativity-of-mary",
  "/explore/painted-churches/ammannsville-st-john-the-baptist",
  "/explore/painted-churches/praha-st-marys-assumption",
  "/explore/painted-churches/dubina-saints-cyril-methodius",
  "/explore/painted-churches/moravia-ascension-of-our-lord",
  "/explore/painted-churches/st-john-texas-st-john-the-baptist",
  "/explore/painted-churches/wallis-guardian-angel",
  "/explore/painted-churches/wesley-brethren-church",
  "/explore/painted-churches/amarillo-first-baptist-church",
  "/explore/painted-churches/umbarger-st-marys-catholic-church",
  "/explore/painted-churches/paris-first-united-methodist-church",
  "/explore/painted-churches/lindsay-st-peters-catholic-church",
  "/explore/painted-churches/fredericksburg-st-marys-catholic-church",
  "/explore/painted-churches/sweet-home-queen-of-peace",
  "/explore/painted-churches/st-marys-immaculate-conception-lavaca",
  "/explore/painted-churches/shiner-saints-cyril-methodius",
  "/explore/painted-churches/serbin-st-paul-lutheran-church",
  "/explore/painted-churches/panna-maria-immaculate-conception",
] as const;

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

function mergeDestinationSources(...groups: Destination[][]): Destination[] {
  const merged = new Map<string, Destination>();
  for (const group of groups) {
    for (const destination of group) {
      if (!destination.slug) continue;
      const existing = merged.get(destination.slug);
      if (!existing) {
        merged.set(destination.slug, destination);
        continue;
      }
      merged.set(destination.slug, {
        ...existing,
        ...destination,
        hero: destination.hero ?? existing.hero,
        highlights: destination.highlights?.length ? destination.highlights : existing.highlights,
        body: destination.body?.length ? destination.body : existing.body,
      });
    }
  }
  return [...merged.values()];
}

function resolveDestinationCatalog(destinations: Destination[]) {
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
        let enrichedDestinations: Awaited<ReturnType<typeof fetchExploreDestinations>> = [];
        let coreDestinations: Awaited<ReturnType<typeof fetchCoreExploreDestinations>> = [];
        const remoteConfigured = hasExploreRemoteData();
        let enrichedFailed = !remoteConfigured;
        let coreFailed = !remoteConfigured;

        if (remoteConfigured) {
          try {
            enrichedDestinations = await fetchExploreDestinations({ limit: 5000 });
          } catch (error) {
            enrichedFailed = true;
            console.error("Explore sitemap enriched catalog unavailable", error);
          }
          try {
            coreDestinations = await fetchCoreExploreDestinations({ limit: 5000 });
          } catch (error) {
            coreFailed = true;
            console.error("Explore sitemap core catalog unavailable", error);
          }
        }

        const remoteDestinations = mergeDestinationSources(coreDestinations, enrichedDestinations);
        const useFixtureFallback = (enrichedFailed && coreFailed) || remoteDestinations.length === 0;
        const rawDestinations = useFixtureFallback ? fixtureDestinations : remoteDestinations;
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
          "/explore/painted-churches",
          ...PAINTED_CHURCH_PATHS,
          "/explore/attractions-comparison",
          "/explore/top-attractions",
          "/explore/top-attractions/methodology",
          "/explore/top-attractions/road-trips",
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
