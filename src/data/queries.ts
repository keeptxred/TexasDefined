import { queryOptions } from "@tanstack/react-query";

import { fetchCoreExploreDestination, fetchCoreExploreDestinations } from "./explore-core-remote";
import { supplementalExploreCategories } from "./explore-categories";
import { fetchExploreDestination, fetchExploreDestinations } from "./explore-remote";
import { platform, scope } from "./index";
import type { ArticleQuery, DestinationQuery } from "./repositories";
import type { Slug } from "./types";

/**
 * Query option factories: routes prefetch with `ensureQueryData`, components
 * read with `useSuspenseQuery`. Components never import fixtures.
 */

export const articlesQuery = (params: Omit<ArticleQuery, "brandId"> = {}) =>
  queryOptions({
    queryKey: ["articles", scope.brandId, params],
    queryFn: () => platform.articles.list({ ...scope, ...params }),
  });

export const articleQuery = (slug: Slug) =>
  queryOptions({
    queryKey: ["article", scope.brandId, slug],
    queryFn: () => platform.articles.getBySlug(scope, slug),
  });

export const destinationsQuery = (params: Omit<DestinationQuery, "brandId"> = {}) =>
  queryOptions({
    queryKey: ["destinations", scope.brandId, params],
    queryFn: async () => {
      const options = { featured: params.featured, category: params.category, limit: params.limit };
      try {
        const enriched = await fetchExploreDestinations(options);
        if (enriched.length) return enriched;
      } catch (error) {
        console.error("Explore enrichment unavailable; retrying core remote catalog", error);
      }
      try {
        const core = await fetchCoreExploreDestinations(options);
        if (core.length) return core;
      } catch (error) {
        console.error("Core Explore remote catalog unavailable; using outage fixtures", error);
      }
      return platform.destinations.list({ ...scope, ...params });
    },
  });

export const destinationQuery = (slug: Slug) =>
  queryOptions({
    queryKey: ["destination", scope.brandId, slug],
    queryFn: async () => {
      try {
        const enriched = await fetchExploreDestination(slug);
        if (enriched) return enriched;
      } catch (error) {
        console.error("Explore destination enrichment unavailable; retrying core remote record", error);
      }
      try {
        const core = await fetchCoreExploreDestination(slug);
        if (core) return core;
      } catch (error) {
        console.error("Core Explore remote destination unavailable; using outage fixture", error);
      }
      return platform.destinations.getBySlug(scope, slug);
    },
  });

export const productsQuery = (params: { collection?: Slug; limit?: number } = {}) =>
  queryOptions({ queryKey: ["products", scope.brandId, params], queryFn: () => platform.products.list({ ...scope, ...params }) });

export const collectionsQuery = () =>
  queryOptions({ queryKey: ["collections", scope.brandId], queryFn: () => platform.collections.list(scope) });

export const collectionQuery = (slug: Slug) =>
  queryOptions({ queryKey: ["collection", scope.brandId, slug], queryFn: () => platform.collections.getBySlug(scope, slug) });

export const guidesQuery = () =>
  queryOptions({ queryKey: ["guides", scope.brandId], queryFn: () => platform.guides.list(scope) });

export const eventsQuery = (params: { limit?: number } = {}) =>
  queryOptions({ queryKey: ["events", scope.brandId, params], queryFn: () => platform.events.list({ ...scope, ...params }) });

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories", scope.brandId],
    queryFn: async () => {
      const categories = await platform.taxonomy.categories(scope);
      const merged = new Map(categories.map((category) => [category.slug, category]));
      for (const category of supplementalExploreCategories) if (!merged.has(category.slug)) merged.set(category.slug, category);
      return [...merged.values()];
    },
  });

export const regionsQuery = () =>
  queryOptions({ queryKey: ["regions", scope.brandId], queryFn: () => platform.taxonomy.regions(scope) });

export const authorsQuery = () =>
  queryOptions({ queryKey: ["authors", scope.brandId], queryFn: () => platform.taxonomy.authors(scope) });

export const searchDocumentsQuery = () =>
  queryOptions({ queryKey: ["search-documents", scope.brandId], queryFn: () => platform.search.documents(scope) });
