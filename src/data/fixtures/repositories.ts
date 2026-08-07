import type {
  ArticleRepository,
  CollectionRepository,
  DestinationRepository,
  EventRepository,
  GuideRepository,
  PlatformRepositories,
  ProductRepository,
  SearchRepository,
  TaxonomyRepository,
} from "../repositories";
import { supplementalExploreCategories } from "../explore-categories";
import { guideHref } from "../guide-links";
import type { SearchDocument } from "../types";
import { migratedEditorialArticles } from "./migrated-editorial";
import { texasBarbecueStylesArticle } from "./texas-barbecue-styles";
import {
  articles,
  authors,
  categories,
  collections,
  destinations,
  events,
  guides,
  products,
  regions,
} from "./texas";

/**
 * Fixture-backed implementations. Swapping to a Supabase-backed platform is a
 * single edit in `src/data/index.ts` — no component changes.
 */

const editorialArticles = [texasBarbecueStylesArticle, ...articles, ...migratedEditorialArticles];

const byBrand = <T extends { brandId: string }>(rows: T[], brandId: string) =>
  rows.filter((row) => row.brandId === brandId);

const take = <T>(rows: T[], limit?: number) => (limit ? rows.slice(0, limit) : rows);

const newestFirst = <T extends { publishedAt: string }>(rows: T[]) =>
  [...rows].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

const today = () => new Date().toISOString().slice(0, 10);
const currentEvents = <T extends { startDate: string; endDate?: string }>(rows: T[]) =>
  rows.filter((event) => (event.endDate ? event.endDate >= today() : event.startDate >= today()));

export const fixtureArticles: ArticleRepository = {
  async list(query) {
    let rows = newestFirst(byBrand(editorialArticles, query.brandId));
    if (query.category) rows = rows.filter((a) => a.category === query.category);
    if (query.tag) rows = rows.filter((a) => a.tags.includes(query.tag!));
    if (query.featured !== undefined) rows = rows.filter((a) => Boolean(a.featured) === query.featured);
    if (query.excludeSlug) rows = rows.filter((a) => a.slug !== query.excludeSlug);
    return take(rows, query.limit);
  },
  async getBySlug(scope, slug) {
    return byBrand(editorialArticles, scope.brandId).find((a) => a.slug === slug) ?? null;
  },
};

export const fixtureDestinations: DestinationRepository = {
  async list(query) {
    let rows = byBrand(destinations, query.brandId);
    if (query.category) rows = rows.filter((d) => d.category === query.category);
    if (query.region) rows = rows.filter((d) => d.region === query.region);
    if (query.featured !== undefined) rows = rows.filter((d) => Boolean(d.featured) === query.featured);
    return take(rows, query.limit);
  },
  async getBySlug(scope, slug) {
    return byBrand(destinations, scope.brandId).find((d) => d.slug === slug) ?? null;
  },
};

export const fixtureProducts: ProductRepository = {
  async list(query) {
    let rows = byBrand(products, query.brandId);
    if (query.collection) rows = rows.filter((p) => p.collectionSlugs.includes(query.collection!));
    return take(rows, query.limit);
  },
  async getBySlug(scope, slug) {
    return byBrand(products, scope.brandId).find((p) => p.slug === slug) ?? null;
  },
};

export const fixtureCollections: CollectionRepository = {
  async list(scope) {
    return byBrand(collections, scope.brandId);
  },
  async getBySlug(scope, slug) {
    return byBrand(collections, scope.brandId).find((c) => c.slug === slug) ?? null;
  },
};

export const fixtureGuides: GuideRepository = {
  async list(query) {
    let rows = byBrand(guides, query.brandId);
    if (query.topic) rows = rows.filter((g) => g.topic === query.topic);
    return rows;
  },
  async getBySlug(scope, slug) {
    return byBrand(guides, scope.brandId).find((g) => g.slug === slug) ?? null;
  },
};

export const fixtureEvents: EventRepository = {
  async list(query) {
    const rows = currentEvents(byBrand(events, query.brandId)).sort((a, b) =>
      a.startDate < b.startDate ? -1 : 1,
    );
    return take(rows, query.limit);
  },
};

export const fixtureTaxonomy: TaxonomyRepository = {
  async categories() {
    const merged = new Map(categories.map((category) => [category.slug, category]));
    for (const category of supplementalExploreCategories) merged.set(category.slug, category);
    return [...merged.values()];
  },
  async regions() {
    return regions;
  },
  async authors() {
    return authors;
  },
  async getAuthor(_scope, id) {
    return authors.find((a) => a.id === id) ?? null;
  },
};

export const fixtureSearch: SearchRepository = {
  async documents(scope) {
    const docs: SearchDocument[] = [
      ...byBrand(editorialArticles, scope.brandId).map((a) => ({
        id: a.id,
        brandId: a.brandId,
        kind: "article" as const,
        title: a.title,
        summary: a.dek,
        keywords: [...a.tags, a.category],
        href: `/article/${a.slug}`,
      })),
      ...byBrand(destinations, scope.brandId).map((d) => ({
        id: d.id,
        brandId: d.brandId,
        kind: "destination" as const,
        title: d.name,
        summary: d.summary,
        keywords: [d.category, d.region, d.nearestTown],
        href: `/destination/${d.slug}`,
      })),
      ...byBrand(guides, scope.brandId).map((g) => ({
        id: g.id,
        brandId: g.brandId,
        kind: "guide" as const,
        title: g.title,
        summary: g.summary,
        keywords: [g.topic, g.kind],
        href: guideHref(g) ?? "/guides",
      })),
      ...byBrand(products, scope.brandId).map((p) => ({
        id: p.id,
        brandId: p.brandId,
        kind: "product" as const,
        title: p.name,
        summary: p.blurb,
        keywords: [p.maker, ...p.collectionSlugs],
        href: `/shop/${p.collectionSlugs[0] ?? ""}`,
      })),
      ...currentEvents(byBrand(events, scope.brandId)).map((e) => ({
        id: e.id,
        brandId: e.brandId,
        kind: "event" as const,
        title: e.name,
        summary: e.blurb,
        keywords: [e.city, e.category, e.region],
        href: `/events#${e.id}`,
      })),
    ];
    return docs;
  },
};

export const fixturePlatform: PlatformRepositories = {
  articles: fixtureArticles,
  destinations: fixtureDestinations,
  products: fixtureProducts,
  collections: fixtureCollections,
  guides: fixtureGuides,
  events: fixtureEvents,
  taxonomy: fixtureTaxonomy,
  search: fixtureSearch,
};
