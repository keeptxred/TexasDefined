import { queryOptions } from "@tanstack/react-query";

import { prepareArticleForDelivery, prepareDestinationForDelivery } from "@/lib/editorial-image-delivery";
import { fetchPublishedTexasDefinedEvergreenArticle } from "./articles-remote";
import { fetchPublishedTexasEvents } from "./events-remote";
import { supplementalExploreCategories } from "./explore-categories";
import { isArticleDiscoveryReady } from "./fixtures/texas-gateway-index-readiness";
import { guideIsAvailable } from "./guide-links";
import { platform, scope } from "./index";
import type { ArticleQuery, DestinationQuery } from "./repositories";
import { fetchAssignedShopProducts } from "./shop-products-remote";
import type { Destination, SearchDocument, Slug } from "./types";

export const articlesQuery = (params: Omit<ArticleQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["articles", scope.brandId, params],
  queryFn: async () => (await platform.articles.list({ ...scope, ...params }))
    .map(prepareArticleForDelivery)
    .filter(isArticleDiscoveryReady),
});
export const articleQuery = (slug: Slug) => queryOptions({
  queryKey: ["article", scope.brandId, slug],
  queryFn: async () => {
    const localArticle = await platform.articles.getBySlug(scope, slug);
    if (localArticle) {
      if (localArticle.sourceName && localArticle.sourceUrl) return prepareArticleForDelivery(localArticle);
      const remoteSourceArticle = await fetchPublishedTexasDefinedEvergreenArticle(slug);
      const sourceHydratedLocalArticle = remoteSourceArticle
        ? {
            ...localArticle,
            sourceName: localArticle.sourceName ?? remoteSourceArticle.sourceName,
            sourceUrl: localArticle.sourceUrl ?? remoteSourceArticle.sourceUrl,
          }
        : localArticle;
      return prepareArticleForDelivery(sourceHydratedLocalArticle);
    }
    const remoteArticle = await fetchPublishedTexasDefinedEvergreenArticle(slug);
    return remoteArticle ? prepareArticleForDelivery(remoteArticle) : null;
  },
});

export const destinationsQuery = (params: Omit<DestinationQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["destinations", scope.brandId, params],
  staleTime: 10 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  queryFn: async () => {
    const { listResolvedDestinations } = await import("./destination-query-runtime");
    return (await listResolvedDestinations(params)).map(prepareDestinationForDelivery);
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
    const destination = await getResolvedDestination(slug);
    return destination ? prepareDestinationForDelivery(destination) : destination;
  },
});

export const productsQuery = (params: { collection?: Slug; limit?: number } = {}) => queryOptions({ queryKey: ["products", scope.brandId, params], staleTime: 5 * 60 * 1000, gcTime: 30 * 60 * 1000, refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false, queryFn: async () => { let lastError: unknown; for (let attempt = 0; attempt < 3; attempt += 1) { try { return await fetchAssignedShopProducts(params); } catch (error) { lastError = error; if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1))); } } console.error("Assigned commerce catalog unavailable; using local catalog fallback", lastError); return platform.products.list({ ...scope, ...params }); } });
export const collectionsQuery = () => queryOptions({ queryKey: ["collections", scope.brandId], queryFn: () => platform.collections.list(scope) });
export const collectionQuery = (slug: Slug) => queryOptions({ queryKey: ["collection", scope.brandId, slug], queryFn: () => platform.collections.getBySlug(scope, slug) });
export const guidesQuery = () => queryOptions({ queryKey: ["guides", scope.brandId], queryFn: async () => (await platform.guides.list(scope)).filter(guideIsAvailable) });
export const eventsQuery = (params: { limit?: number } = {}) => queryOptions({ queryKey: ["events", scope.brandId, params], staleTime: 15 * 60 * 1000, queryFn: async () => { try { const remote = await fetchPublishedTexasEvents(params.limit ?? 24); if (remote.length) return remote; } catch (error) { console.error("Live Texas events catalog unavailable; using curated fixture fallback", error); } return platform.events.list({ ...scope, ...params }); } });
export const categoriesQuery = () => queryOptions({ queryKey: ["categories", scope.brandId], queryFn: async () => { const categories = await platform.taxonomy.categories(scope); const merged = new Map(categories.map((category) => [category.slug, category])); for (const category of supplementalExploreCategories) { const existing = merged.get(category.slug); merged.set(category.slug, existing ? { ...existing, ...category } : category); } return [...merged.values()]; } });
export const regionsQuery = () => queryOptions({ queryKey: ["regions", scope.brandId], queryFn: () => platform.taxonomy.regions(scope) });
export const authorsQuery = () => queryOptions({ queryKey: ["authors", scope.brandId], queryFn: () => platform.taxonomy.authors(scope) });

function destinationSearchDocument(destination: Destination): SearchDocument {
  const keywords = [destination.category, destination.region, destination.nearestTown, destination.county, destination.managingAuthority, destination.bestSeason, ...destination.highlights].filter((value): value is string => Boolean(value));
  return { id: `destination:${destination.slug}`, brandId: "texasdefined", kind: "destination", title: destination.name, summary: destination.summary, keywords: [...new Set(keywords)], href: `/destination/${destination.slug}` };
}

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
];

export const searchDocumentsQuery = () => queryOptions({
  queryKey: ["search-documents", scope.brandId],
  queryFn: async () => {
    const [rawBase, articleCatalog] = await Promise.all([
      platform.search.documents(scope),
      platform.articles.list(scope),
    ]);
    const indexableArticleHrefs = new Set(
      articleCatalog
        .map(prepareArticleForDelivery)
        .filter(isArticleDiscoveryReady)
        .map((article) => `/article/${article.slug}`),
    );
    const base = rawBase.filter(
      (document) => document.kind !== "article" || indexableArticleHrefs.has(document.href),
    );
    const knownHrefs = new Set(base.map((document) => document.href));
    for (const document of staticSearchDocuments) {
      if (knownHrefs.has(document.href)) continue;
      base.push(document);
      knownHrefs.add(document.href);
    }
    const { buildPrioritySearchDocuments } = await import("./priority-search-documents");
    for (const document of buildPrioritySearchDocuments()) {
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
    const { getMajorEventGuideDirectory } = await import("./major-event-directory");
    const majorEventGuides = await getMajorEventGuideDirectory();
    for (const event of majorEventGuides) {
      const href = `/event/${event.slug}`;
      if (knownHrefs.has(href)) continue;
      base.push({
        id: `event-guide:${event.slug}`,
        brandId: "texasdefined",
        kind: "event",
        title: event.name,
        summary: `Permanent Texas Defined event guide · ${event.detail}`,
        keywords: [event.name, event.detail, "Texas events", "Texas festival guide"],
        href,
      });
      knownHrefs.add(href);
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