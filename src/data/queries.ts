import { queryOptions } from "@tanstack/react-query";

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
      try {
        const remote = await fetchExploreDestinations({
          featured: params.featured,
          category: params.category,
          limit: params.limit,
        });
        if (remote.length) return remote;
      } catch (error) {
        console.error("Explore remote catalog unavailable; using fixtures", error);
      }
      return platform.destinations.list({ ...scope, ...params });
    },
  });

export const destinationQuery = (slug: Slug) =>
  queryOptions({
    queryKey: ["destination", scope.brandId, slug],
    queryFn: async () => {
      try {
        const remote = await fetchExploreDestination(slug);
        if (remote) return remote;
      } catch (error) {
        console.error("Explore remote destination unavailable; using fixtures", error);
      }
      return platform.destinations.getBySlug(scope, slug);
    },
  });

export const productsQuery = (params: { collection?: Slug; limit?: number } = {}) =>
  queryOptions({
    queryKey: ["products", scope.brandId, params],
    queryFn: () => platform.products.list({ ...scope, ...params }),
  });

export const collectionsQuery = () =>
  queryOptions({
    queryKey: ["collections", scope.brandId],
    queryFn: () => platform.collections.list(scope),
  });

export const collectionQuery = (slug: Slug) =>
  queryOptions({
    queryKey: ["collection", scope.brandId, slug],
    queryFn: () => platform.collections.getBySlug(scope, slug),
  });

export const guidesQuery = () =>
  queryOptions({
    queryKey: ["guides", scope.brandId],
    queryFn: () => platform.guides.list(scope),
  });

export const eventsQuery = (params: { limit?: number } = {}) =>
  queryOptions({
    queryKey: ["events", scope.brandId, params],
    queryFn: () => platform.events.list({ ...scope, ...params }),
  });

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories", scope.brandId],
    queryFn: () => platform.taxonomy.categories(scope),
  });

export const regionsQuery = () =>
  queryOptions({
    queryKey: ["regions", scope.brandId],
    queryFn: () => platform.taxonomy.regions(scope),
  });

export const authorsQuery = () =>
  queryOptions({
    queryKey: ["authors", scope.brandId],
    queryFn: () => platform.taxonomy.authors(scope),
  });

export const searchDocumentsQuery = () =>
  queryOptions({
    queryKey: ["search-documents", scope.brandId],
    queryFn: () => platform.search.documents(scope),
  });
