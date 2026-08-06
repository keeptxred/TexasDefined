import { queryOptions } from "@tanstack/react-query";

import { fetchCoreExploreDestination, fetchCoreExploreDestinations } from "./explore-core-remote";
import { supplementalExploreCategories } from "./explore-categories";
import { fetchExploreDestination, fetchExploreDestinations } from "./explore-remote";
import { platform, scope } from "./index";
import type { ArticleQuery, DestinationQuery } from "./repositories";
import { fetchAssignedShopProducts } from "./shop-products-remote";
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

export const destinationsQuery = (params: Omit<DestinationQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["destinations", scope.brandId, params],
  queryFn: async () => {
    const options = { featured: params.featured, category: params.category, limit: params.limit };
    let enrichedFailed = false;
    try {
      const enriched = await fetchExploreDestinations(options);
      if (enriched.length) return enriched;
      if (params.featured) {
        const catalog = await fetchExploreDestinations({ category: params.category, limit: 5000 });
        return featuredFallback(catalog, params.limit ?? 6);
      }
      return [];
    } catch (error) {
      enrichedFailed = true;
      console.error("Explore enrichment unavailable; retrying core remote catalog", error);
    }

    let coreFailed = false;
    try {
      const core = await fetchCoreExploreDestinations(options);
      if (core.length) return core;
      if (params.featured) {
        const catalog = await fetchCoreExploreDestinations({ category: params.category, limit: 5000 });
        return featuredFallback(catalog, params.limit ?? 6);
      }
      return [];
    } catch (error) {
      coreFailed = true;
      console.error("Core Explore remote catalog unavailable", error);
    }

    if (enrichedFailed && coreFailed) return platform.destinations.list({ ...scope, ...params });
    return [];
  },
});

export const destinationQuery = (slug: Slug) => queryOptions({
  queryKey: ["destination", scope.brandId, slug],
  queryFn: async () => {
    let enrichedFailed = false;
    try { return await fetchExploreDestination(slug); }
    catch (error) {
      enrichedFailed = true;
      console.error("Explore destination enrichment unavailable; retrying core remote record", error);
    }

    let coreFailed = false;
    try { return await fetchCoreExploreDestination(slug); }
    catch (error) {
      coreFailed = true;
      console.error("Core Explore remote destination unavailable", error);
    }

    if (enrichedFailed && coreFailed) return platform.destinations.getBySlug(scope, slug);
    return null;
  },
});

export const productsQuery = (params: { collection?: Slug; limit?: number } = {}) => queryOptions({
  queryKey: ["products", scope.brandId, params],
  // The shared storefront API occasionally times out. Retry before ever showing the
  // local outage fallback, and keep the fetched catalog stable so a background
  // refetch cannot swap the live catalog back to the fixture list.
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
export const eventsQuery = (params: { limit?: number } = {}) => queryOptions({ queryKey: ["events", scope.brandId, params], queryFn: () => platform.events.list({ ...scope, ...params }) });

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

function destinationSearchDocument(destination: Awaited<ReturnType<typeof fetchExploreDestinations>>[number]): SearchDocument {
  const keywords = [destination.category, destination.region, destination.nearestTown, destination.county, destination.managingAuthority, destination.bestSeason, ...destination.highlights].filter((value): value is string => Boolean(value));
  return { id: `destination:${destination.slug}`, brandId: "texasdefined", kind: "destination", title: destination.name, summary: destination.summary, keywords: [...new Set(keywords)], href: `/destination/${destination.slug}` };
}

export const searchDocumentsQuery = () => queryOptions({
  queryKey: ["search-documents", scope.brandId],
  queryFn: async () => {
    const base = await platform.search.documents(scope);
    let destinations = [] as Awaited<ReturnType<typeof fetchExploreDestinations>>;
    try { destinations = await fetchExploreDestinations({ limit: 5000 }); }
    catch (error) {
      console.error("Enriched destination search index unavailable; retrying core remote catalog", error);
      try { destinations = await fetchCoreExploreDestinations({ limit: 5000 }); }
      catch (coreError) { console.error("Core remote destination search index unavailable; retaining fixture search documents", coreError); }
    }
    if (!destinations.length) return base;
    return [...base.filter((document) => document.kind !== "destination"), ...destinations.map(destinationSearchDocument)];
  },
});