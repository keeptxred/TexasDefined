import { isIndexablePublicPath as isBaseIndexablePublicPath } from "@/lib/public-routes";

export { getTexasCountyHousingCosts } from "@/data/acs-county-housing-costs.functions";
export {
  fetchPublishedTexasDefinedEvergreenArticlesForSitemap,
  fetchPublishedTexasDefinedNewsArticlesForSitemap,
} from "@/data/articles-remote";
export { loadTexasCountyGrowth } from "@/data/census-county-growth";
export { isLegacyCountySeriesArticle } from "@/data/county-series";
export {
  isEvergreenEventCollectionPath,
  loadEvergreenEventSitemapEntriesServer,
} from "@/data/event-evergreen-sitemap.server";
export { hasCurrentOrFutureConfirmedEventOccurrence } from "@/data/event-occurrence-lifecycle";
export { loadTemporalEventSitemapEntriesServer } from "@/data/event-temporal-sitemap.server";
export {
  isArticleDiscoveryReady,
  isArticleIndexReady,
} from "@/data/fixtures/texas-gateway-index-readiness";
export { loadFishingGuideSitemapEntriesServer } from "@/data/fishing/guide-sitemap.server";
export { loadFishingLocalSitemapEntriesServer } from "@/data/fishing/local-sitemap.server";
export { loadFishingReportSitemapEntriesServer } from "@/data/fishing/report-sitemap.server";
export { FISHING_SITEMAP_ENTRIES } from "@/data/fishing/sitemap";
export { HUNTING_SITEMAP_ENTRIES } from "@/data/hunting/sitemap";
export {
  canonicalEntityPath,
  isIndexableEntityPage,
} from "@/data/knowledge-graph/relationships";
export { majorEventIndexRecords } from "@/data/major-event-index";
export { hasCompliantMajorEventImageServer } from "@/data/major-event-schema-enrichment.server";
export { loadSupplementalMajorEventSitemapEntriesServer } from "@/data/major-event-supplemental-registry.server";
export { isCountyPropertyIndexReady } from "@/data/property/county-property-schema";
export { fetchAssignedShopProducts } from "@/data/shop-products-remote";
export { TEXAS_DATASETS } from "@/data/texas-data-center";
export { loadTexasDogSitemapEntriesServer } from "@/data/texas-dogs-sitemap.server";
export { isTexasVsStateSitemapReady } from "@/data/texas-vs-state-index-readiness.server";
export { TEXAS_VS_STATES, texasVsStateSlug } from "@/data/texas-vs-states-index";
export {
  isTexasDefinedOwnedEntity,
  isTexasDefinedOwnedStaticPath,
} from "@/lib/brand-route-ownership";
export {
  INDEXABLE_STATIC_PATHS,
  isExploreSitemapOwnedPath,
  normalizePublicPath,
} from "@/lib/public-routes";

const CONSOLIDATED_LEGACY_PREFIXES = [
  "/property-tax-calculator/",
  "/texas-home-affordability-calculator/",
  "/texas-homeownership-cost-calculator/",
  "/texas-home-insurance-calculator/",
  "/texas-mortgage-calculator/",
  "/texas-cost-of-living-calculator/",
  "/texas-salary-needed-calculator/",
  "/texas-vs/",
] as const;

export function isIndexablePublicPath(path: string) {
  if (!isBaseIndexablePublicPath(path)) return false;
  return !CONSOLIDATED_LEGACY_PREFIXES.some((prefix) => path.startsWith(prefix));
}
