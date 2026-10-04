import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { resolveFishingLocation } from "@/data/fishing/location.functions";
import { getFishingPlannerData } from "@/data/fishing/planner-data.functions";
import { FISHING_TRIP_PLANNER_PATH } from "@/data/fishing/planner-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Find a Texas fishing lake by place and target species. Select multiple fish, compare verified lake-to-species matches, and open the lake guide or profile that matches your trip.";
type PlannerSearch = {
  q?: string;
  species?: string[];
  match?: "all";
  lat?: number;
  lng?: number;
  origin?: string;
  sort?: "best" | "closest";
  view?: "list" | "map";
  radius?: "50" | "100" | "200" | "400";
  shore?: "1";
  boat?: "1";
  camp?: "1";
  guide?: "1";
  report?: "1";
};

export const Route = createFileRoute("/fishing/plan")({
  validateSearch: (search: Record<string, unknown>): PlannerSearch => ({
    q: cleanText(search.q) ?? cleanText(search.region),
    species: cleanSlugs(search.species),
    match: search.match === "all" ? "all" : undefined,
    lat: cleanCoordinate(search.lat, -90, 90),
    lng: cleanCoordinate(search.lng, -180, 180),
    origin: cleanText(search.origin),
    sort: search.sort === "closest" ? "closest" : search.sort === "best" ? "best" : undefined,
    view: search.view === "map" ? "map" : search.view === "list" ? "list" : undefined,
    radius: ["50", "100", "200", "400"].includes(String(search.radius)) ? String(search.radius) as PlannerSearch["radius"] : undefined,
    shore: search.shore === "1" ? "1" : undefined,
    boat: search.boat === "1" ? "1" : undefined,
    camp: search.camp === "1" ? "1" : undefined,
    guide: search.guide === "1" ? "1" : undefined,
    report: search.report === "1" ? "1" : undefined,
  }),
  loaderDeps: ({ search }) => ({ q: search.q ?? "", lat: search.lat, lng: search.lng, origin: search.origin }),
  loader: async ({ deps }) => {
    const data = await getFishingPlannerData();
    const resolvedOrigin = typeof deps.lat === "number" && typeof deps.lng === "number"
      ? { label: deps.origin ?? "My approximate location", lat: deps.lat, lng: deps.lng, source: "browser" as const }
      : deps.q
        ? await resolveFishingLocation(deps.q)
        : null;
    return { ...data, resolvedOrigin };
  },
  head: ({ loaderData }) => {
    const rows = loaderData?.rows ?? [];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", url: `${siteUrl}${FISHING_TRIP_PLANNER_PATH}`, name: "Texas Fishing Lake Finder", description },
        { "@type": "ItemList", numberOfItems: rows.length, itemListElement: rows.map((row, index) => ({ "@type": "ListItem", position: index + 1, name: row.lake.name, url: `${siteUrl}${row.href}` })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Lake finder", item: `${siteUrl}${FISHING_TRIP_PLANNER_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Lake Finder — Search by Place & Fish Species", description, canonicalPath: FISHING_TRIP_PLANNER_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_TRIP_PLANNER_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
});

Route.lazy(() => import("@/lazy/fishing-plan").then((d) => d.Route));

function cleanText(value: unknown) {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().replace(/\s+/g, " ").slice(0, 80);
  return normalized || undefined;
}

function cleanSlugs(value: unknown) {
  const raw = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : [];
  const valid = raw.filter((item): item is string => typeof item === "string" && /^[a-z0-9-]+$/.test(item));
  const unique = [...new Set(valid)].slice(0, 12);
  return unique.length ? unique : undefined;
}

function cleanCoordinate(value: unknown, min: number, max: number) {
  const number = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : Number.NaN;
  return Number.isFinite(number) && number >= min && number <= max ? number : undefined;
}
