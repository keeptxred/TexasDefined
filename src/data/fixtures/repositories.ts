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
import { editorialDeskById, editorialDesks } from "../editorial-desks";
import { supplementalExploreCategories } from "../explore-categories";
import { guideHref } from "../guide-links";
import { listTexasDogsArticleStubs, loadTexasDogsArticle } from "../texas-dogs-articles";
import type { Article, ArticleBlock, SearchDocument } from "../types";
import { exploreFeatureArticleStubs, loadExploreFeatureArticle } from "./lazy-explore-feature-articles";
import { lazyEvergreenArticleStubs, loadLazyEvergreenArticle } from "./lazy-evergreen";
import { historicSupportingStubs, loadHistoricSupportingArticle } from "./lazy-historic-supporting";
import { militaryHistoryExpansionStubs, loadMilitaryHistoryExpansionArticle } from "./lazy-military-history-expansion";
import { standaloneEvergreenStubs, loadStandaloneEvergreenArticle } from "./lazy-standalone-evergreen";
import { coreEvergreenArticleStubs, loadCoreEvergreenArticle } from "./lazy-core-evergreen";
import { migratedEditorialArticleStubs, loadMigratedEditorialArticle } from "./lazy-migrated-editorial";
import { texasCoreArticleStubs, loadTexasCoreArticle } from "./lazy-texas-core-articles";
import {
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

const editorialArticles = [
  ...exploreFeatureArticleStubs,
  ...coreEvergreenArticleStubs,
  ...lazyEvergreenArticleStubs,
  ...standaloneEvergreenStubs,
  ...historicSupportingStubs,
  ...militaryHistoryExpansionStubs,
  ...texasCoreArticleStubs,
  ...migratedEditorialArticleStubs,
];

let newestEvergreenModulePromise: Promise<typeof import("./lazy-newest-evergreen")> | null = null;
const loadNewestEvergreenModule = () => {
  newestEvergreenModulePromise ??= import("./lazy-newest-evergreen");
  return newestEvergreenModulePromise;
};

let texasLifeSplitArticlesPromise: Promise<Article[]> | null = null;
const loadTexasLifeSplitArticles = () => {
  texasLifeSplitArticlesPromise ??= import("./texas-life-split")
    .then((module) => module.texasLifeSplitArticles);
  return texasLifeSplitArticlesPromise;
};

let countySeriesArticleStubsPromise: Promise<Article[]> | null = null;
const loadCountySeriesArticleStubs = () => {
  countySeriesArticleStubsPromise ??= import("./lazy-county-series")
    .then((module) => module.countySeriesArticleStubs);
  return countySeriesArticleStubsPromise;
};

const loadEditorialArticles = async () => [
  ...editorialArticles,
  ...(await loadNewestEvergreenModule()).newestEvergreenArticles,
  ...(await loadTexasLifeSplitArticles()),
  ...(await loadCountySeriesArticleStubs()),
  ...(await listTexasDogsArticleStubs()),
];

const COUNTY_HERO_OVERRIDES: Partial<Record<string, Article["hero"]>> = {
  "ward-county-monahans-sandhills-texas": {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/11/Monahans_Sandhills_at_Sunrise.jpg",
    alt: "Sunrise over the dunes at Monahans Sandhills State Park in Ward County, Texas",
    width: 2048,
    height: 1360,
    credit: "Wing-Chi Poon · CC BY-SA 3.0 · Wikimedia Commons",
  },
  "brewster-county-big-bend-texas": {
    src: "/images/explore/national-parks/big-bend-national-park.jpg",
    alt: "Big Bend National Park in Brewster County, home of the Chisos Mountains and Rio Grande canyons",
    width: 1600,
    height: 2133,
    credit: "Betty Alex (U.S. National Park Service) · Public domain · Wikimedia Commons",
  },
  "presidio-county-marfa-borderlands-texas": {
    src: "/images/explore/historic-sites/fort-leaton-state-historic-site.jpg",
    alt: "Fort Leaton State Historic Site in Presidio County near the Rio Grande borderlands",
    width: 1600,
    height: 1068,
    credit: "Carol M. Highsmith · Public domain · Wikimedia Commons",
  },
  "jeff-davis-county-fort-davis-mountains-texas": {
    src: "/images/explore/historic-sites/fort-davis-national-historic-site.jpg",
    alt: "Fort Davis National Historic Site beneath the Davis Mountains in Jeff Davis County",
    width: 1600,
    height: 1067,
    credit: "National Park Service Digital Image Archives · Public domain · Wikimedia Commons",
  },
  "culberson-county-van-horn-guadalupe-mountains-texas": {
    src: "/images/explore/national-parks/guadalupe-mountains-national-park.jpg",
    alt: "Guadalupe Mountains National Park in Culberson County, home of Guadalupe Peak",
    width: 1600,
    height: 1053,
    credit: "NPS photo · Public domain · Wikimedia Commons",
  },
  "hudspeth-county-sierra-blanca-salt-flats-texas": {
    src: "https://texas-time-travel.imgix.net/images/A-Regional-Photos/Mountain/Mountain_Hudspeth-County-Courthouse.jpeg?auto=compress%2Cformat&fit=max&h=1080&q=80&w=1920",
    alt: "Hudspeth County Courthouse in Sierra Blanca, Texas",
    width: 1920,
    height: 1080,
    credit: "Texas Historical Commission · Texas Time Travel",
  },
  "el-paso-county-missions-rio-grande-texas": {
    src: "/images/explore/historic-sites/chamizal-national-memorial.jpg",
    alt: "Chamizal National Memorial in El Paso County, Texas",
    width: 1600,
    height: 2134,
    credit: "GoneBefore · CC BY-SA 4.0 · Wikimedia Commons",
  },
};

const COUNTY_INTERNAL_LINK_ADDITIONS: Partial<Record<string, NonNullable<Article["internalLinks"]>>> = {
  "reeves-county-pecos-balmorhea-texas": [
    {
      href: "/article/ward-county-monahans-sandhills-texas",
      label: "Explore neighboring Ward County",
      description: "Continue north toward Monahans Sandhills and the Permian Basin's oil-road country.",
    },
  ],
};

const byBrand = <T extends { brandId: string }>(rows: T[], brandId: string) =>
  rows.filter((row) => row.brandId === brandId);

const take = <T>(rows: T[], limit?: number) => (limit ? rows.slice(0, limit) : rows);

const newestFirst = <T extends { publishedAt: string }>(rows: T[]) =>
  [...rows].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

const wordsInBlock = (block: ArticleBlock) => {
  const text = block.type === "list"
    ? block.items.join(" ")
    : "text" in block
      ? block.text
      : "";
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

const normalizeArticle = (article: Article): Article => {
  const wordCount = article.body.reduce((total, block) => total + wordsInBlock(block), 0);
  const additions = COUNTY_INTERNAL_LINK_ADDITIONS[article.slug] ?? [];
  const existingInternalLinks = article.internalLinks ?? [];
  const internalLinks = [
    ...existingInternalLinks,
    ...additions.filter((addition) => !existingInternalLinks.some((link) => link.href === addition.href)),
  ];
  return {
    ...article,
    hero: COUNTY_HERO_OVERRIDES[article.slug] ?? article.hero,
    internalLinks,
    readingMinutes: wordCount > 0
      ? Math.max(1, Math.ceil(wordCount / 220))
      : article.readingMinutes,
  };
};

const today = () => new Date().toISOString().slice(0, 10);
const currentEvents = <T extends { startDate: string; endDate?: string }>(rows: T[]) =>
  rows.filter((event) => (event.endDate ? event.endDate >= today() : event.startDate >= today()));

export const fixtureArticles: ArticleRepository = {
  async list(query) {
    const allEditorialArticles = await loadEditorialArticles();
    let rows = newestFirst(byBrand(allEditorialArticles, query.brandId));
    if (query.category) rows = rows.filter((a) => a.category === query.category);
    if (query.tag) rows = rows.filter((a) => a.tags.includes(query.tag!));
    if (query.featured !== undefined) rows = rows.filter((a) => Boolean(a.featured) === query.featured);
    if (query.excludeSlug) rows = rows.filter((a) => a.slug !== query.excludeSlug);
    return take(rows, query.limit).map(normalizeArticle);
  },
  async getBySlug(scope, slug) {
    if (scope.brandId === "texasdefined") {
      const texasDogsArticle = await loadTexasDogsArticle(slug);
      if (texasDogsArticle) return normalizeArticle(texasDogsArticle);
    }

    const { loadNewestEvergreenArticle } = await loadNewestEvergreenModule();
    const newestEvergreenArticle = await loadNewestEvergreenArticle(scope.brandId, slug);
    if (newestEvergreenArticle) return normalizeArticle(newestEvergreenArticle);

    const coreEvergreenArticle = await loadCoreEvergreenArticle(scope.brandId, slug);
    if (coreEvergreenArticle) return normalizeArticle(coreEvergreenArticle);

    const lazyArticle = await loadLazyEvergreenArticle(scope.brandId, slug);
    if (lazyArticle) return normalizeArticle(lazyArticle);

    const standaloneArticle = await loadStandaloneEvergreenArticle(scope.brandId, slug);
    if (standaloneArticle) return normalizeArticle(standaloneArticle);

    const historicSupportingArticle = await loadHistoricSupportingArticle(scope.brandId, slug);
    if (historicSupportingArticle) return normalizeArticle(historicSupportingArticle);

    const militaryHistoryArticle = await loadMilitaryHistoryExpansionArticle(scope.brandId, slug);
    if (militaryHistoryArticle) return normalizeArticle(militaryHistoryArticle);

    const { loadCountySeriesArticleBySlug } = await import("./lazy-county-series");
    const countySeriesArticle = await loadCountySeriesArticleBySlug(scope.brandId, slug);
    if (countySeriesArticle) return normalizeArticle(countySeriesArticle);

    const migratedArticle = await loadMigratedEditorialArticle(scope.brandId, slug);
    if (migratedArticle) return normalizeArticle(migratedArticle);

    const exploreFeatureArticle = await loadExploreFeatureArticle(scope.brandId, slug);
    if (exploreFeatureArticle) return normalizeArticle(exploreFeatureArticle);

    const texasCoreArticle = await loadTexasCoreArticle(scope.brandId, slug);
    if (texasCoreArticle) return normalizeArticle(texasCoreArticle);

    const article = byBrand(await loadEditorialArticles(), scope.brandId).find((a) => a.slug === slug) ?? null;
    return article ? normalizeArticle(article) : null;
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
    return editorialDesks;
  },
  async getAuthor(_scope, id) {
    return editorialDeskById(id);
  },
};

export const fixtureSearch: SearchRepository = {
  async documents(scope) {
    const allEditorialArticles = await loadEditorialArticles();
    const docs: SearchDocument[] = [
      ...byBrand(allEditorialArticles, scope.brandId).map((a) => ({
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