import { queryOptions } from "@tanstack/react-query";

import { fetchPublishedTexasEvents } from "./events-remote";
import { supplementalExploreCategories } from "./explore-categories";
import { platform, scope } from "./index";
import { PRIORITY_SEARCH_PAGES } from "./priority-search-pages";
import type { ArticleQuery, DestinationQuery } from "./repositories";
import { fetchAssignedShopProducts } from "./shop-products-remote";
import { TEXAS_VS_STATES, texasVsStateProfile, texasVsStateSlug } from "./texas-vs-states";
import type { Destination, SearchDocument, Slug } from "./types";

export const articlesQuery = (params: Omit<ArticleQuery, "brandId"> = {}) => queryOptions({ queryKey: ["articles", scope.brandId, params], queryFn: () => platform.articles.list({ ...scope, ...params }) });
export const articleQuery = (slug: Slug) => queryOptions({ queryKey: ["article", scope.brandId, slug], queryFn: () => platform.articles.getBySlug(scope, slug) });

export const destinationsQuery = (params: Omit<DestinationQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["destinations", scope.brandId, params],
  staleTime: 10 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  queryFn: async () => {
    const { listResolvedDestinations } = await import("./destination-query-runtime");
    return listResolvedDestinations(params);
  },
});

export const destinationQuery = (slug: Slug) => queryOptions({
  queryKey: ["destination", scope.brandId, slug],
  staleTime: 10 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  queryFn: async () => {
    const { getResolvedDestination } = await import("./destination-query-runtime");
    return getResolvedDestination(slug);
  },
});

export const productsQuery = (params: { collection?: Slug; limit?: number } = {}) => queryOptions({ queryKey: ["products", scope.brandId, params], staleTime: 5 * 60 * 1000, gcTime: 30 * 60 * 1000, refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false, queryFn: async () => { let lastError: unknown; for (let attempt = 0; attempt < 3; attempt += 1) { try { return await fetchAssignedShopProducts(params); } catch (error) { lastError = error; if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1))); } } console.error("Assigned commerce catalog unavailable; using local catalog fallback", lastError); return platform.products.list({ ...scope, ...params }); } });
export const collectionsQuery = () => queryOptions({ queryKey: ["collections", scope.brandId], queryFn: () => platform.collections.list(scope) });
export const collectionQuery = (slug: Slug) => queryOptions({ queryKey: ["collection", scope.brandId, slug], queryFn: () => platform.collections.getBySlug(scope, slug) });
export const guidesQuery = () => queryOptions({ queryKey: ["guides", scope.brandId], queryFn: () => platform.guides.list(scope) });
export const eventsQuery = (params: { limit?: number } = {}) => queryOptions({ queryKey: ["events", scope.brandId, params], staleTime: 15 * 60 * 1000, queryFn: async () => { try { const remote = await fetchPublishedTexasEvents(params.limit ?? 24); if (remote.length) return remote; } catch (error) { console.error("Live Texas events catalog unavailable; using curated fixture fallback", error); } return platform.events.list({ ...scope, ...params }); } });
export const categoriesQuery = () => queryOptions({ queryKey: ["categories", scope.brandId], queryFn: async () => { const categories = await platform.taxonomy.categories(scope); const merged = new Map(categories.map((category) => [category.slug, category])); for (const category of supplementalExploreCategories) { const existing = merged.get(category.slug); merged.set(category.slug, existing ? { ...existing, ...category } : category); } return [...merged.values()]; } });
export const regionsQuery = () => queryOptions({ queryKey: ["regions", scope.brandId], queryFn: () => platform.taxonomy.regions(scope) });
export const authorsQuery = () => queryOptions({ queryKey: ["authors", scope.brandId], queryFn: () => platform.taxonomy.authors(scope) });

function destinationSearchDocument(destination: Destination): SearchDocument {
  const keywords = [destination.category, destination.region, destination.nearestTown, destination.county, destination.managingAuthority, destination.bestSeason, ...destination.highlights].filter((value): value is string => Boolean(value));
  return { id: `destination:${destination.slug}`, brandId: "texasdefined", kind: "destination", title: destination.name, summary: destination.summary, keywords: [...new Set(keywords)], href: `/destination/${destination.slug}` };
}

const prioritySearchRoutes = [
  ["texas-attorney-general", "/texas-attorney-general", ["Texas Attorney General", "OAG", "child support", "consumer protection"]],
  ["texas-fishing-license", "/texas-fishing-license", ["Texas fishing license", "fishing permit", "TPWD fishing license"]],
  ["texas-secretary-of-state", "/texas-secretary-of-state", ["Texas Secretary of State", "Texas SOS", "business filings", "elections"]],
  ["texas-drivers-license", "/texas-drivers-license", ["Texas driver license", "drivers license", "DPS license", "REAL ID"]],
  ["texas-dmv", "/texas-dmv", ["Texas DMV", "TxDMV", "vehicle title"]],
  ["texas-dps", "/texas-dps", ["Texas DPS", "Department of Public Safety", "driver license"]],
  ["texas-unemployment", "/texas-unemployment", ["Texas unemployment", "TWC unemployment", "unemployment benefits"]],
  ["texas-comptroller", "/texas-comptroller", ["Texas Comptroller", "Texas taxes", "franchise tax", "sales tax"]],
  ["texas-vehicle-registration", "/texas-vehicle-registration", ["Texas vehicle registration", "registration renewal", "TxDMV registration"]],
  ["texas-flag", "/texas-flag", ["Texas flag", "Lone Star flag", "Texas flag history", "Texas flag rules"]],
  ["texas-state-fair", "/texas-state-fair", ["State Fair of Texas", "Texas state fair", "Fair Park", "Big Tex"]],
  ["texas-two-step", "/texas-two-step", ["Texas Two Step", "Texas lottery", "Two Step lottery"]],
] as const;

const prioritySearchDocuments: SearchDocument[] = prioritySearchRoutes.map(([key, href, keywords]) => {
  const page = PRIORITY_SEARCH_PAGES[key];
  return {
    id: `guide:${key}`,
    brandId: "texasdefined",
    kind: "guide",
    title: page.title,
    summary: page.quickAnswer ?? page.intro,
    keywords: [...keywords, page.eyebrow],
    href,
  };
});

const stateComparisonSearchDocuments: SearchDocument[] = TEXAS_VS_STATES.map((state) => ({
  id: `guide:texas-vs-${texasVsStateSlug(state)}`,
  brandId: "texasdefined",
  kind: "guide",
  title: `Texas vs ${state}`,
  summary: texasVsStateProfile(state)?.comparisonFocus ?? `Compare Texas with ${state} across housing, taxes, jobs, climate and everyday life.`,
  keywords: [`Texas vs ${state}`, `${state} vs Texas`, `moving from ${state} to Texas`, "moving to Texas", "cost of living", "state comparison"],
  href: `/texas-vs/${texasVsStateSlug(state)}`,
}));

const staticSearchDocuments: SearchDocument[] = [
  {
    id: "collection:texas-explained",
    brandId: "texasdefined",
    kind: "collection",
    title: "Texas Explained: 10 Guides to How the State Works",
    summary: "Ten connected guides to why Texas works the way it does: rivers, reservoirs, roads, counties and towns, plants and wildlife, homes and land, regions, culture and migration.",
    keywords: ["Texas Explained", "why Texas", "how Texas works", "Texas geography", "Texas regions", "Texas counties", "Texas nature", "Texas infrastructure", "Texas culture", "Texas settlement", "Texas rivers", "Texas lakes", "farm-to-market roads", "Texas courthouse squares", "Texas wildflowers", "Texas trees", "Texas wildlife", "Texas homes", "buying land in Texas", "Texas cultural regions"],
    href: "/texas-explained",
  },
  {
    id: "guide:best-camping-texas",
    brandId: "texasdefined",
    kind: "guide",
    title: "Best Places to Go Camping in Texas",
    summary: "Choose standout Texas camping destinations by region, season and camping style, with state-park planning and official reservation links.",
    keywords: ["best places to go camping in Texas", "best camping in Texas", "Texas camping", "Texas campgrounds", "Texas state park camping", "RV camping Texas", "tent camping Texas"],
    href: "/best-places-to-go-camping-in-texas",
  },
  {
    id: "collection:texas-vs-every-state",
    brandId: "texasdefined",
    kind: "collection",
    title: "Texas vs Every Other State",
    summary: "Compare Texas with all 49 other states using a consistent framework for housing, taxes, jobs, climate, geography and everyday life.",
    keywords: ["Texas vs every state", "Texas vs other states", "Texas state comparison", "moving to Texas", "Texas cost of living"],
    href: "/texas-vs-every-state",
  },
  {
    id: "collection:texas-resources",
    brandId: "texasdefined",
    kind: "collection",
    title: "Texas Resources & State Agencies",
    summary: "Texas driver licenses, DMV, DPS, vehicle registration, unemployment, fishing licenses, state agencies and practical official-service guides.",
    keywords: ["Texas resources", "Texas state agencies", "Texas government services", "Texas DMV", "Texas DPS", "Texas unemployment", "Texas Comptroller", "Texas Secretary of State"],
    href: "/texas-resources",
  },
  ...prioritySearchDocuments,
  ...stateComparisonSearchDocuments,
];

export const searchDocumentsQuery = () => queryOptions({
  queryKey: ["search-documents", scope.brandId],
  queryFn: async () => {
    const base = await platform.search.documents(scope);
    const knownHrefs = new Set(base.map((document) => document.href));
    for (const document of staticSearchDocuments) {
      if (knownHrefs.has(document.href)) continue;
      base.push(document);
      knownHrefs.add(document.href);
    }
    const { buildFishingSearchDocuments } = await import("./fishing/search");
    const fishingDocuments = await buildFishingSearchDocuments();
    for (const document of fishingDocuments) {
      if (knownHrefs.has(document.href)) continue;
      base.push(document);
      knownHrefs.add(document.href);
    }
    const { buildSportsVenueSearchDocuments } = await import("./sports-venue-search");
    const sportsDocuments = buildSportsVenueSearchDocuments();
    for (const document of sportsDocuments) {
      if (knownHrefs.has(document.href)) continue;
      base.push(document);
      knownHrefs.add(document.href);
    }
    const { listResolvedDestinationSearchCatalog } = await import("./destination-query-runtime");
    const destinations = await listResolvedDestinationSearchCatalog();
    const nonDestinationDocuments = base.filter((document) => document.kind !== "destination");
    const nonDestinationHrefs = new Set(nonDestinationDocuments.map((document) => document.href));
    const { paintedChurchSearchDocuments } = await import("./painted-church-search");
    for (const document of paintedChurchSearchDocuments) {
      if (nonDestinationHrefs.has(document.href)) continue;
      const normalizedDocument: SearchDocument = document.id.startsWith("painted-church:")
        ? { ...document, kind: "guide" }
        : document;
      nonDestinationDocuments.push(normalizedDocument);
      nonDestinationHrefs.add(normalizedDocument.href);
    }
    if (!destinations.length) return nonDestinationDocuments;
    const documents = [
      ...nonDestinationDocuments,
      ...destinations.map(destinationSearchDocument),
    ];
    return [...new Map(documents.map((document) => [document.href, document])).values()];
  },
});