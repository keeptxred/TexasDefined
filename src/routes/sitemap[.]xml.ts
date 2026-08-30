import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { platform, scope } from "@/data";
import { getTexasCountyHousingCosts } from "@/data/acs-county-housing-costs.functions";
import { fetchPublishedTexasDefinedEvergreenArticles, fetchPublishedTexasDefinedNewsArticles } from "@/data/articles-remote";
import { loadTexasCountyGrowth } from "@/data/census-county-growth";
import { isLegacyCountySeriesArticle } from "@/data/county-series";
import { EVENT_COLLECTIONS } from "@/data/event-collections";
import { isArticleDiscoveryReady, isArticleIndexReady } from "@/data/fixtures/texas-gateway-index-readiness";
import { loadFishingGuideSitemapEntriesServer } from "@/data/fishing/guide-sitemap.server";
import { loadFishingLocalSitemapEntriesServer } from "@/data/fishing/local-sitemap.server";
import { loadFishingReportSitemapEntriesServer } from "@/data/fishing/report-sitemap.server";
import { FISHING_SITEMAP_ENTRIES } from "@/data/fishing/sitemap";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath, isIndexableEntityPage } from "@/data/knowledge-graph/relationships";
import { majorEventIndexRecords } from "@/data/major-event-index";
import { loadSupplementalMajorEventSitemapEntriesServer } from "@/data/major-event-supplemental-registry.server";
import { COUNTY_PROPERTY_RECORDS } from "@/data/property/county-property-data";
import { isCountyPropertyIndexReady } from "@/data/property/county-property-schema";
import { fetchAssignedShopProducts } from "@/data/shop-products-remote";
import { TEXAS_DATASETS } from "@/data/texas-data-center";
import { TEXAS_VS_STATES, texasVsStateSlug } from "@/data/texas-vs-states-index";
import { isTexasDefinedOwnedEntity, isTexasDefinedOwnedStaticPath } from "@/lib/brand-route-ownership";
import { INDEXABLE_STATIC_PATHS, isExploreSitemapOwnedPath, isIndexablePublicPath, normalizePublicPath } from "@/lib/public-routes";

const origin = `https://${texasDefinedBrand.identity.domain}`;
type SitemapEntry = { path: string; lastmod?: string };

const PRIORITY_SEO_LASTMOD = "2026-08-20";
const STATIC_LASTMOD_BY_PATH: Readonly<Record<string, string>> = {
  "/best-places-to-go-camping-in-texas": PRIORITY_SEO_LASTMOD,
  "/texas-state-fair": PRIORITY_SEO_LASTMOD,
  "/texas-two-step": PRIORITY_SEO_LASTMOD,
  "/texas-fishing-license": PRIORITY_SEO_LASTMOD,
  "/texas-drivers-license": PRIORITY_SEO_LASTMOD,
  "/texas-dmv": PRIORITY_SEO_LASTMOD,
  "/texas-vehicle-registration": PRIORITY_SEO_LASTMOD,
  "/texas-flag": PRIORITY_SEO_LASTMOD,
  "/texas-vs-every-state": PRIORITY_SEO_LASTMOD,
  "/texas-history": "2026-08-20",
  "/texas-symbols": "2026-08-20",
};
const ARTICLE_LASTMOD_BY_SLUG: Readonly<Record<string, string>> = {
  "history-of-the-texas-flag": "2026-08-20",
  "texas-flag-etiquette-display-guide": "2026-08-20",
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const coreResults = await Promise.allSettled([
          platform.articles.list(scope),
          platform.collections.list(scope),
          platform.taxonomy.authors(scope),
          loadTexasKnowledgeGraph(),
          fetchPublishedTexasDefinedNewsArticles({ limit: 200 }),
          fetchPublishedTexasDefinedEvergreenArticles({ limit: 200 }),
          getTexasCountyHousingCosts(),
          loadFishingGuideSitemapEntriesServer(),
          loadFishingReportSitemapEntriesServer(),
          loadFishingLocalSitemapEntriesServer(),
        ]);
        const failures = coreResults.filter((result) => result.status === "rejected");
        if (failures.length > 0) {
          for (const failure of failures) console.error("Primary sitemap core data unavailable", failure.reason);
          return new Response("Sitemap data temporarily unavailable", {
            status: 503,
            headers: {
              "content-type": "text/plain; charset=utf-8",
              "cache-control": "no-store",
              "retry-after": "300",
            },
          });
        }

        const [
          articlesResult,
          collectionsResult,
          authorsResult,
          graphResult,
          remoteNewsResult,
          remoteEvergreenResult,
          countyHousingResult,
          fishingGuideSitemapResult,
          fishingReportSitemapResult,
          fishingLocalSitemapResult,
        ] = coreResults;
        const articles = articlesResult.status === "fulfilled" ? articlesResult.value : [];
        const collections = collectionsResult.status === "fulfilled" ? collectionsResult.value : [];
        const authors = authorsResult.status === "fulfilled" ? authorsResult.value : [];
        const graph = graphResult.status === "fulfilled" ? graphResult.value : [];
        const remoteNews = remoteNewsResult.status === "fulfilled" ? remoteNewsResult.value : [];
        const remoteEvergreen = remoteEvergreenResult.status === "fulfilled" ? remoteEvergreenResult.value : [];
        const indexableRemoteNews = remoteNews.filter(isArticleIndexReady);
        const indexableRemoteEvergreen = remoteEvergreen.filter(isArticleIndexReady);
        const countyHousingCosts = countyHousingResult.status === "fulfilled" ? countyHousingResult.value : null;
        const fishingGuideSitemapEntries = fishingGuideSitemapResult.status === "fulfilled" ? fishingGuideSitemapResult.value : [];
        const fishingReportSitemapEntries = fishingReportSitemapResult.status === "fulfilled" ? fishingReportSitemapResult.value : [];
        const fishingLocalSitemapEntries = fishingLocalSitemapResult.status === "fulfilled" ? fishingLocalSitemapResult.value : [];
        const countyGrowth = await loadTexasCountyGrowth();
        const liveShopProducts = await fetchAssignedShopProducts();
        const activeCollectionSlugs = new Set(liveShopProducts.flatMap((product) => product.collectionSlugs));
        const countyPages = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady);
        const entityPages = graph.filter(isIndexableEntityPage).filter(isTexasDefinedOwnedEntity);
        const supplementalMajorEventSitemapEntries = loadSupplementalMajorEventSitemapEntriesServer();

        const entries: SitemapEntry[] = [
          ...INDEXABLE_STATIC_PATHS
            .filter((path) => !isExploreSitemapOwnedPath(path))
            .filter((path) => isTexasDefinedOwnedStaticPath(path))
            .map((path) => ({ path, lastmod: STATIC_LASTMOD_BY_PATH[path] })),
          { path: "/texas-icons" },
          ...EVENT_COLLECTIONS.map((collection) => ({ path: collection.path })),
          ...majorEventIndexRecords.map((event) => ({
            path: `/event/${event.slug}`,
            lastmod: toDate(event.sourceCheckedAt),
          })),
          ...supplementalMajorEventSitemapEntries,
          ...TEXAS_VS_STATES.map((state) => ({ path: `/texas-vs/${texasVsStateSlug(state)}`, lastmod: PRIORITY_SEO_LASTMOD })),
          ...FISHING_SITEMAP_ENTRIES,
          ...fishingGuideSitemapEntries,
          ...fishingReportSitemapEntries,
          ...fishingLocalSitemapEntries,
          ...(indexableRemoteNews.length ? [{ path: "/news" }] : []),
          ...indexableRemoteNews.map((article) => ({ path: `/news/${article.slug}`, lastmod: toDate(article.publishedAt) })),
          ...indexableRemoteEvergreen.map((article) => ({ path: `/article/${article.slug}`, lastmod: toDate(article.publishedAt) })),
          ...(countyGrowth.available ? [{ path: "/texas-data/county-growth", lastmod: "2026-03-17" }] : []),
          ...(countyHousingCosts?.available
            ? [{ path: "/texas-data/county-housing-costs", lastmod: toDate(countyHousingCosts.generatedAt ?? undefined) }]
            : []),
          ...collections
            .filter((collection) => activeCollectionSlugs.has(collection.slug))
            .map((collection) => ({ path: `/shop/${collection.slug}` })),
          ...authors.map((author) => ({ path: `/authors/${author.id}` })),
          ...articles
            .filter((article) => !isLegacyCountySeriesArticle(article.slug) && isArticleIndexReady(article))
            .map((article) => ({ path: `/article/${article.slug}`, lastmod: toDate(ARTICLE_LASTMOD_BY_SLUG[article.slug] ?? article.publishedAt) })),
          ...articles
            .filter((article) => !isLegacyCountySeriesArticle(article.slug) && isArticleDiscoveryReady(article))
            .map((article) => ({ path: `/article/${article.slug}`, lastmod: toDate(ARTICLE_LASTMOD_BY_SLUG[article.slug] ?? article.publishedAt) })),
          ...countyPages.map((county) => ({ path: `/property-tax/county/${county.slug}`, lastmod: toDate(county.lastVerifiedAt ?? undefined) })),
          ...entityPages.map((entity) => ({ path: canonicalEntityPath(entity), lastmod: toDate(entity.sourceCheckedAt) })),
          ...TEXAS_DATASETS.map((dataset) => ({ path: `/texas-data/${dataset.slug}`, lastmod: toDate(dataset.updated) })),
        ];

        const uniqueEntries = [
          ...new Map(
            entries
              .map((entry) => {
                const path = normalizePublicPath(entry.path);
                return path ? { ...entry, path } : null;
              })
              .filter(
                (entry): entry is SitemapEntry =>
                  Boolean(entry) && isIndexablePublicPath(entry.path) && isTexasDefinedOwnedStaticPath(entry.path),
              )
              .map((entry) => [entry.path, entry]),
          ).values(),
        ];

        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniqueEntries
          .map(
            ({ path, lastmod }) =>
              `  <url><loc>${escapeXml(`${origin}${path}`)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
          )
          .join("\n")}\n</urlset>`;

        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});

function toDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&apos;" })[character] ?? character);
}
