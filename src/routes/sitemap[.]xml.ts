import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { platform, scope } from "@/data";
import { getTexasCountyHousingCosts } from "@/data/acs-county-housing-costs.functions";
import { fetchPublishedTexasDefinedEvergreenArticlesForSitemap, fetchPublishedTexasDefinedNewsArticlesForSitemap } from "@/data/articles-remote";
import { loadTexasCountyGrowth } from "@/data/census-county-growth";
import { isLegacyCountySeriesArticle } from "@/data/county-series";
import { isArticleDiscoveryReady, isArticleIndexReady } from "@/data/fixtures/texas-gateway-index-readiness";
import { loadFishingGuideSitemapEntriesServer } from "@/data/fishing/guide-sitemap.server";
import { loadFishingLocalSitemapEntriesServer } from "@/data/fishing/local-sitemap.server";
import { loadFishingReportSitemapEntriesServer } from "@/data/fishing/report-sitemap.server";
import { FISHING_SITEMAP_ENTRIES } from "@/data/fishing/sitemap";
import { FOOD_DESTINATIONS } from "@/data/food-destinations";
import { LOCAL_COST_OF_LIVING_PROFILES } from "@/data/local-cost-of-living";
import { LOCAL_HOME_AFFORDABILITY_PROFILES } from "@/data/local-home-affordability";
import { LOCAL_HOME_INSURANCE_PROFILES } from "@/data/local-home-insurance";
import { LOCAL_HOMEOWNERSHIP_COST_PROFILES } from "@/data/local-homeownership-cost";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath, isIndexableEntityPage } from "@/data/knowledge-graph/relationships";
import { LOCAL_MORTGAGE_PROFILES } from "@/data/local-mortgage";
import { LOCAL_PROPERTY_TAX_PROFILES } from "@/data/local-property-tax-calculators";
import { LOCAL_SALARY_NEEDED_PROFILES } from "@/data/local-salary-needed";
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
const AUTHORITY_LASTMOD = "2026-09-01";
const AUTHORITY_STATIC_PATHS = [
  "/track-texas-drivers-license",
  "/texas-by-texas-txt",
  "/replace-texas-registration-receipt",
  "/texas-toll-tags",
  "/start-a-business-in-texas",
  "/everything-bigger-in-texas",
  "/what-does-chud-mean",
] as const;
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
  "/editorial-policy": "2026-09-01",
  "/corrections-policy": "2026-09-01",
  "/sourcing-methodology": "2026-09-01",
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
          fetchPublishedTexasDefinedNewsArticlesForSitemap(),
          fetchPublishedTexasDefinedEvergreenArticlesForSitemap(),
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

        const [articlesResult, collectionsResult, authorsResult, graphResult, remoteNewsResult, remoteEvergreenResult, countyHousingResult, fishingGuideSitemapResult, fishingReportSitemapResult, fishingLocalSitemapResult] = coreResults;
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
          ...INDEXABLE_STATIC_PATHS.filter((path) => !isExploreSitemapOwnedPath(path)).filter((path) => isTexasDefinedOwnedStaticPath(path)).map((path) => ({ path, lastmod: STATIC_LASTMOD_BY_PATH[path] })),
          ...AUTHORITY_STATIC_PATHS.map((path) => ({ path, lastmod: AUTHORITY_LASTMOD })),
          ...LOCAL_PROPERTY_TAX_PROFILES.map((profile) => ({ path: profile.path, lastmod: "2026-08-30" })),
          ...LOCAL_HOME_AFFORDABILITY_PROFILES.map((profile) => ({ path: profile.path, lastmod: "2026-08-30" })),
          ...LOCAL_HOMEOWNERSHIP_COST_PROFILES.map((profile) => ({ path: profile.ownershipPath, lastmod: "2026-08-30" })),
          ...LOCAL_HOME_INSURANCE_PROFILES.map((profile) => ({ path: profile.insurancePath, lastmod: "2026-08-30" })),
          ...LOCAL_MORTGAGE_PROFILES.map((profile) => ({ path: profile.mortgagePath, lastmod: "2026-08-30" })),
          ...LOCAL_COST_OF_LIVING_PROFILES.map((profile) => ({ path: profile.path, lastmod: "2026-09-01" })),
          ...LOCAL_SALARY_NEEDED_PROFILES.map((profile) => ({ path: profile.salaryPath, lastmod: "2026-09-01" })),
          ...FOOD_DESTINATIONS.map((destination) => ({ path: `/food/${destination.slug}`, lastmod: destination.verifiedAt })),
          { path: "/texas-icons" },
          ...majorEventIndexRecords.map((event) => ({ path: `/event/${event.slug}`, lastmod: toDate(event.sourceCheckedAt) })),
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
          ...(countyHousingCosts?.available ? [{ path: "/texas-data/county-housing-costs", lastmod: toDate(countyHousingCosts.generatedAt ?? undefined) }] : []),
          ...collections.filter((collection) => activeCollectionSlugs.has(collection.slug)).map((collection) => ({ path: `/shop/${collection.slug}` })),
          ...authors.map((author) => ({ path: `/authors/${author.id}` })),
          ...articles.filter((article) => !isLegacyCountySeriesArticle(article.slug) && isArticleIndexReady(article)).map((article) => ({ path: `/article/${article.slug}`, lastmod: toDate(ARTICLE_LASTMOD_BY_SLUG[article.slug] ?? article.publishedAt) })),
          ...articles.filter((article) => !isLegacyCountySeriesArticle(article.slug) && isArticleDiscoveryReady(article)).map((article) => ({ path: `/article/${article.slug}`, lastmod: toDate(ARTICLE_LASTMOD_BY_SLUG[article.slug] ?? article.publishedAt) })),
          ...countyPages.map((county) => ({ path: `/property-tax/county/${county.slug}`, lastmod: toDate(county.lastVerifiedAt ?? undefined) })),
          ...entityPages.map((entity) => ({ path: canonicalEntityPath(entity), lastmod: toDate(entity.sourceCheckedAt) })),
          ...TEXAS_DATASETS.map((dataset) => ({ path: `/texas-data/${dataset.slug}`, lastmod: toDate(dataset.updated) })),
        ];

        const uniqueEntries = [...new Map(entries.map((entry) => {
          const path = normalizePublicPath(entry.path);
          return path ? { ...entry, path } : null;
        }).filter((entry): entry is SitemapEntry => Boolean(entry) && isIndexablePublicPath(entry.path) && isTexasDefinedOwnedStaticPath(entry.path)).map((entry) => [entry.path, entry])).values()];

        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniqueEntries.map(({ path, lastmod }) => `  <url><loc>${escapeXml(`${origin}${path}`)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>`;
        return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400" } });
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
