import { queryOptions } from "@tanstack/react-query";

import { fetchPublishedTexasEvents } from "./events-remote";
import { fetchCoreExploreDestination, fetchCoreExploreDestinations } from "./explore-core-remote";
import { supplementalExploreCategories } from "./explore-categories";
import { reconcileDestinationHeroes } from "./explore-hero-reconciliation";
import { fetchExploreDestination, fetchExploreDestinations } from "./explore-remote";
import { legacyExploreDestinations } from "./fixtures/legacy-explore";
import { legacyLakeDestinations } from "./fixtures/legacy-lakes";
import { platform, scope } from "./index";
import type { ArticleQuery, DestinationQuery } from "./repositories";
import { fetchAssignedShopProducts } from "./shop-products-remote";
import { applyStateParkHeroAsset, applyStateParkHeroAssets } from "./state-park-heroes";
import type { Destination, SearchDocument, Slug } from "./types";

export const articlesQuery = (params: Omit<ArticleQuery, "brandId"> = {}) => queryOptions({ queryKey: ["articles", scope.brandId, params], queryFn: () => platform.articles.list({ ...scope, ...params }) });
export const articleQuery = (slug: Slug) => queryOptions({ queryKey: ["article", scope.brandId, slug], queryFn: () => platform.articles.getBySlug(scope, slug) });

function featuredFallback(destinations: Destination[], limit = 6) {
  return [...destinations]
    .sort((left, right) => {
      const leftScore = Number(Boolean(left.hero.credit)) + Number(Boolean(left.officialUrl)) + Number(Boolean(left.sourceCheckedAt)) + Math.min(left.highlights.length, 3);
      const rightScore = Number(Boolean(right.hero.credit)) + Number(Boolean(right.officialUrl)) + Number(Boolean(right.sourceCheckedAt)) + Math.min(right.highlights.length, 3);
      return rightScore - leftScore || left.name.localeCompare(right.name);
    })
    .slice(0, limit);
}

function mergeDestinations(...groups: Destination[][]): Destination[] {
  const merged = new Map<string, Destination>();
  for (const group of groups) {
    for (const destination of group) {
      if (!destination.slug || merged.has(destination.slug)) continue;
      merged.set(destination.slug, destination);
    }
  }
  return [...merged.values()];
}

const preservedExploreDestinations = mergeDestinations(legacyExploreDestinations, legacyLakeDestinations);

function preservedFor(query: Omit<DestinationQuery, "brandId">): Destination[] {
  let rows = preservedExploreDestinations;
  if (query.category) rows = rows.filter((destination) => destination.category === query.category);
  if (query.featured !== undefined) rows = rows.filter((destination) => Boolean(destination.featured) === query.featured);
  return query.limit ? rows.slice(0, query.limit) : rows;
}

function reconcileExploreCatalog(destinations: Destination[]) {
  return reconcileDestinationHeroes(applyStateParkHeroAssets(destinations));
}

export const destinationsQuery = (params: Omit<DestinationQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["destinations", scope.brandId, params],
  queryFn: async () => {
    const options = { featured: params.featured, category: params.category, limit: params.limit };
    let enriched: Destination[] = [];
    let core: Destination[] = [];

    try {
      enriched = await fetchExploreDestinations(options);
      if (params.featured && !enriched.length) {
        const catalog = await fetchExploreDestinations({ category: params.category, limit: 5000 });
        enriched = featuredFallback(catalog, params.limit ?? 6);
      }
    } catch (error) {
      console.error("Explore enrichment unavailable; merging core and preserved catalogs", error);
    }

    try {
      core = await fetchCoreExploreDestinations(options);
      if (params.featured && !core.length) {
        const catalog = await fetchCoreExploreDestinations({ category: params.category, limit: 5000 });
        core = featuredFallback(catalog, params.limit ?? 6);
      }
    } catch (error) {
      console.error("Core Explore remote catalog unavailable; merging preserved catalog", error);
    }

    const local = await platform.destinations.list({ ...scope, ...params });
    const preserved = preservedFor(params);
    const merged = reconcileExploreCatalog(mergeDestinations(enriched, core, preserved, local));

    if (params.featured) return featuredFallback(merged, params.limit ?? 6);
    return params.limit ? merged.slice(0, params.limit) : merged;
  },
});

export const destinationQuery = (slug: Slug) => queryOptions({
  queryKey: ["destination", scope.brandId, slug],
  queryFn: async () => {
    try {
      const enriched = await fetchExploreDestination(slug);
      if (enriched) return applyStateParkHeroAsset(enriched);
    } catch (error) {
      console.error("Explore destination enrichment unavailable; retrying core remote record", error);
    }

    try {
      const core = await fetchCoreExploreDestination(slug);
      if (core) return applyStateParkHeroAsset(core);
    } catch (error) {
      console.error("Core Explore remote destination unavailable; retrying preserved catalog", error);
    }

    const preserved = preservedExploreDestinations.find((destination) => destination.slug === slug);
    if (preserved) return applyStateParkHeroAsset(preserved);
    const local = await platform.destinations.getBySlug(scope, slug);
    return local ? applyStateParkHeroAsset(local) : local;
  },
});

export const productsQuery = (params: { collection?: Slug; limit?: number } = {}) => queryOptions({
  queryKey: ["products", scope.brandId, params],
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  queryFn: async () => {
    let lastError: unknown;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        return await fetchAssignedShopProducts(params);
      } catch (error) {
        lastError = error;
        if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
      }
    }
    console.error("Assigned commerce catalog unavailable; using local catalog fallback", lastError);
    return platform.products.list({ ...scope, ...params });
  },
});

export const collectionsQuery = () => queryOptions({ queryKey: ["collections", scope.brandId], queryFn: () => platform.collections.list(scope) });
export const collectionQuery = (slug: Slug) => queryOptions({ queryKey: ["collection", scope.brandId, slug], queryFn: () => platform.collections.getBySlug(scope, slug) });
export const guidesQuery = () => queryOptions({ queryKey: ["guides", scope.brandId], queryFn: () => platform.guides.list(scope) });
export const eventsQuery = (params: { limit?: number } = {}) => queryOptions({
  queryKey: ["events", scope.brandId, params],
  staleTime: 15 * 60 * 1000,
  queryFn: async () => {
    try {
      const remote = await fetchPublishedTexasEvents(params.limit ?? 24);
      if (remote.length) return remote;
    } catch (error) {
      console.error("Live Texas events catalog unavailable; using curated fixture fallback", error);
    }
    return platform.events.list({ ...scope, ...params });
  },
});

export const categoriesQuery = () => queryOptions({
  queryKey: ["categories", scope.brandId],
  queryFn: async () => {
    const categories = await platform.taxonomy.categories(scope);
    const merged = new Map(categories.map((category) => [category.slug, category]));
    for (const category of supplementalExploreCategories) if (!merged.has(category.slug)) merged.set(category.slug, category);
    return [...merged.values()];
  },
});

export const regionsQuery = () => queryOptions({ queryKey: ["regions", scope.brandId], queryFn: () => platform.taxonomy.regions(scope) });
export const authorsQuery = () => queryOptions({ queryKey: ["authors", scope.brandId], queryFn: () => platform.taxonomy.authors(scope) });

function destinationSearchDocument(destination: Destination): SearchDocument {
  const keywords = [destination.category, destination.region, destination.nearestTown, destination.county, destination.managingAuthority, destination.bestSeason, ...destination.highlights].filter((value): value is string => Boolean(value));
  return { id: `destination:${destination.slug}`, brandId: "texasdefined", kind: "destination", title: destination.name, summary: destination.summary, keywords: [...new Set(keywords)], href: `/destination/${destination.slug}` };
}

export const searchDocumentsQuery = () => queryOptions({
  queryKey: ["search-documents", scope.brandId],
  queryFn: async () => {
    const base = await platform.search.documents(scope);
    let enriched: Destination[] = [];
    let core: Destination[] = [];
    try { enriched = await fetchExploreDestinations({ limit: 5000 }); }
    catch (error) { console.error("Enriched destination search index unavailable; merging core and preserved catalogs", error); }
    try { core = await fetchCoreExploreDestinations({ limit: 5000 }); }
    catch (coreError) { console.error("Core remote destination search index unavailable; retaining preserved destinations", coreError); }
    const destinations = reconcileExploreCatalog(mergeDestinations(enriched, core, preservedExploreDestinations));
    if (!destinations.length) return base;
    return [...base.filter((document) => document.kind !== "destination"), ...destinations.map(destinationSearchDocument)];
  },
});
