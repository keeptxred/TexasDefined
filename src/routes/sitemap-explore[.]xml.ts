import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { isPrimaryTripPlannerDestination } from "@/data/destination-availability";
import { auditDestination } from "@/data/destination-audit";
import { applyAllCuratedDestinations } from "@/data/destination-curation-all";
import { preservedExploreDestinations } from "@/data/destination-preserved-catalog";
import { improveDestinationCatalog } from "@/data/destination-quality";
import { supplementalExploreCategories } from "@/data/explore-categories";
import { isExploreCategoryIndexReady } from "@/data/explore-category-indexability";
import { fetchCoreExploreDestinations } from "@/data/explore-core-remote";
import { reconcileDestinationHeroes } from "@/data/explore-hero-reconciliation";
import { applyExploreHeroAssets } from "@/data/explore-heroes";
import { categories, regions } from "@/data/fixtures/texas";
import { paintedChurchGlossary } from "@/data/painted-church-glossary";
import { paintedChurchHeritage } from "@/data/painted-church-heritage";
import { paintedChurchItineraries } from "@/data/painted-church-itineraries";
import { paintedChurchPeople } from "@/data/painted-church-people";
import { paintedChurchPreservationTopics } from "@/data/painted-church-preservation";
import { paintedChurchSymbols } from "@/data/painted-church-symbols";
import { paintedChurchTechniques } from "@/data/painted-church-techniques";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { fetchExploreDestinations, hasExploreRemoteData } from "@/data/explore-remote";
import { applyStateParkHeroAssets } from "@/data/state-park-heroes";
import type { Destination } from "@/data/types";
import { isExploreSitemapOwnedPath, isIndexablePublicPath, normalizePublicPath } from "@/lib/public-routes";

const BASE_URL = `https://${texasDefinedBrand.identity.domain}`;
const SWIMMING_HOLES_RIVER_TUBING_SLUG = "swimming-holes-river-tubing";
const EXPLORE_CATEGORY_SLUGS = new Set([
  "lakes-rivers", "major-springs", SWIMMING_HOLES_RIVER_TUBING_SLUG, "state-parks", "national-parks", "caverns",
  "beaches-coast", "historic-sites", "road-trips", "small-towns", "food-bbq", "outdoors",
]);
const EXPLORE_CATEGORY_ARTICLE_COUNTS = {
  "lakes-rivers": 3,
  "state-parks": 1,
  "historic-sites": 1,
  "road-trips": 3,
  "small-towns": 2,
  "food-bbq": 3,
  "outdoors": 3,
} as const;
const EXPLORE_REGION_SLUGS = [
  "hill-country", "gulf-coast", "big-bend", "panhandle", "piney-woods", "prairies-lakes", "south-texas",
];

const PAINTED_CHURCH_STATIC_PATHS = [
  "/explore/painted-churches",
  "/explore/painted-churches-plan",
  "/explore/painted-churches/map",
  "/explore/painted-churches/compare",
  "/explore/painted-churches/how-many",
  "/explore/painted-churches/methodology",
  "/explore/painted-churches/census",
  "/explore/painted-churches/techniques",
  "/explore/painted-churches/symbols",
  "/explore/painted-churches/people",
  "/explore/painted-churches/heritage",
  "/explore/painted-churches/preservation",
  "/explore/painted-churches/knowledge-graph",
  "/explore/painted-churches/harwood-archive",
  "/explore/painted-churches/how-to-read",
  "/explore/painted-churches/glossary",
  "/explore/painted-churches/timeline",
  "/explore/painted-churches/routes",
  "/explore/painted-churches/guides",
  "/explore/painted-churches/print-guide",
  "/explore/painted-churches/media",
  "/explore/painted-churches/cite",
  "/explore/painted-churches/then-and-now",
] as const;

const TEXAS_ROUTE_66_STATIC_PATHS = [
  "/explore/route-66/texas-road-trip",
  "/explore/route-66/shamrock",
  "/explore/route-66/lela",
  "/explore/route-66/mclean",
  "/explore/route-66/alanreed",
  "/explore/route-66/groom",
  "/explore/route-66/conway",
  "/explore/route-66/washburn",
  "/explore/route-66/amarillo",
  "/explore/route-66/bushland",
  "/explore/route-66/wildorado",
  "/explore/route-66/vega",
  "/explore/route-66/adrian",
  "/explore/route-66/glenrio",
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
        const { landscapeGuideSlugs, landscapeSlugs } = await import("@/data/texas-landscape-slugs");
        const { paintedChurchSearchGuides } = await import("@/data/painted-church-search-guides");
        const { selectSwimmingHoleAndTubingDestinations } = await import("@/data/water-recreation");
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
        const usePreservedFallback = (enrichedFailed && coreFailed) || remoteDestinations.length === 0;
        const rawDestinations = usePreservedFallback ? preservedExploreDestinations : remoteDestinations;
        if (!usePreservedFallback) {
          const remoteSlugs = new Set(rawDestinations.map((destination) => destination.slug));
          rawDestinations.push(...preservedExploreDestinations.filter((destination) => destination.slug && !remoteSlugs.has(destination.slug)));
        }
        const destinations = resolveDestinationCatalog(rawDestinations);
        const indexableDestinations = [...new Map(destinations.filter((item) => item.slug).map((item) => [item.slug, item])).values()]
          .filter((destination) => isPrimaryTripPlannerDestination(destination) && auditDestination(destination).readyForIndexing);
        const swimmingHoleAndTubingCount = selectSwimmingHoleAndTubingDestinations(indexableDestinations).length;
        const swimmingHoleAndTubingCategory = supplementalExploreCategories.find((category) => category.slug === SWIMMING_HOLES_RIVER_TUBING_SLUG);
        const swimmingHoleAndTubingIndexReady = Boolean(swimmingHoleAndTubingCategory && isExploreCategoryIndexReady(swimmingHoleAndTubingCategory.slug, swimmingHoleAndTubingCount));

        const categoryCandidates = [...new Set([...categories, ...supplementalExploreCategories]
          .map((category) => category.slug)
          .filter((slug) => EXPLORE_CATEGORY_SLUGS.has(slug)))];
        const categorySlugs = categoryCandidates.filter((slug) => isExploreCategoryIndexReady(
          slug,
          (EXPLORE_CATEGORY_ARTICLE_COUNTS[slug as keyof typeof EXPLORE_CATEGORY_ARTICLE_COUNTS] ?? 0)
            + destinations.filter((destination) => destination.category === slug).length
            + (slug === "food-bbq" ? 1 : 0),
        ));
        const regionSlugs = [...new Set([
          ...regions.map((region) => region.id),
          ...EXPLORE_REGION_SLUGS,
        ])];
        const staticPaths = [
          "/explore",
          "/explore/beaches-coast",
          "/explore/trip-planner",
          "/explore/attractions-comparison",
          "/explore/museums",
          "/explore/aquariums",
          "/explore/rv-parks",
          "/explore/wildlife",
          ...PAINTED_CHURCH_STATIC_PATHS,
          "/explore/top-attractions",
          "/explore/top-attractions/methodology",
          "/explore/top-attractions/road-trips",
          ...TEXAS_ROUTE_66_STATIC_PATHS,
          "/explore/landscapes",
          ...landscapeSlugs.map((slug) => `/explore/landscapes/${slug}`),
          ...landscapeGuideSlugs.map((slug) => `/explore/landscapes/${slug}`),
          ...(swimmingHoleAndTubingIndexReady ? [`/explore/${SWIMMING_HOLES_RIVER_TUBING_SLUG}`] : []),
          ...categorySlugs.map((slug) => `/explore/${slug}`),
          ...regionSlugs.map((regionSlug) => `/explore/region/${regionSlug}`),
        ];
        const destinationEntries = indexableDestinations
          .map((item) => entry(`/destination/${item.slug}`, item.sourceCheckedAt))
          .filter((item): item is string => Boolean(item));
        const paintedChurchEntries = expandedPaintedChurches
          .map((church) => entry(`/explore/painted-churches/${church.slug}`, church.sourceCheckedAt))
          .filter((item): item is string => Boolean(item));
        const techniqueEntries = paintedChurchTechniques.map((item) => entry(`/explore/painted-churches/techniques/${item.slug}`, "2026-08-18")).filter((item): item is string => Boolean(item));
        const symbolEntries = paintedChurchSymbols.map((item) => entry(`/explore/painted-churches/symbols/${item.slug}`, "2026-08-18")).filter((item): item is string => Boolean(item));
        const peopleEntries = paintedChurchPeople.map((item) => entry(`/explore/painted-churches/people/${item.slug}`, "2026-08-18")).filter((item): item is string => Boolean(item));
        const heritageEntries = paintedChurchHeritage.map((item) => entry(`/explore/painted-churches/heritage/${item.slug}`, "2026-08-18")).filter((item): item is string => Boolean(item));
        const preservationEntries = paintedChurchPreservationTopics.map((item) => entry(`/explore/painted-churches/preservation/${item.slug}`, "2026-08-18")).filter((item): item is string => Boolean(item));
        const glossaryEntries = paintedChurchGlossary.map((item) => entry(`/explore/painted-churches/glossary/${item.slug}`, "2026-08-18")).filter((item): item is string => Boolean(item));
        const itineraryEntries = paintedChurchItineraries.map((item) => entry(`/explore/painted-churches/routes/${item.slug}`, "2026-08-18")).filter((item): item is string => Boolean(item));
        const searchGuideEntries = paintedChurchSearchGuides.map((item) => entry(`/explore/painted-churches/guides/${item.slug}`, "2026-08-18")).filter((item): item is string => Boolean(item));
        const staticEntries = [...new Set(staticPaths)].map((path) => entry(path)).filter((item): item is string => Boolean(item));
        const entries = [
          ...staticEntries,
          ...destinationEntries,
          ...paintedChurchEntries,
          ...techniqueEntries,
          ...symbolEntries,
          ...peopleEntries,
          ...heritageEntries,
          ...preservationEntries,
          ...glossaryEntries,
          ...itineraryEntries,
          ...searchGuideEntries,
        ].join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/sitemap/0.9">\n${entries}\n</urlset>`;
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