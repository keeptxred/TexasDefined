export { platform, scope } from "@/data";
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
export { LOCAL_COST_OF_LIVING_PROFILES } from "@/data/local-cost-of-living";
export { LOCAL_HOME_AFFORDABILITY_PROFILES } from "@/data/local-home-affordability";
export { LOCAL_HOME_INSURANCE_PROFILES } from "@/data/local-home-insurance";
export { LOCAL_HOMEOWNERSHIP_COST_PROFILES } from "@/data/local-homeownership-cost";
export { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
export {
  canonicalEntityPath,
  isIndexableEntityPage,
} from "@/data/knowledge-graph/relationships";
export { LOCAL_MORTGAGE_PROFILES } from "@/data/local-mortgage";
export { LOCAL_PROPERTY_TAX_PROFILES } from "@/data/local-property-tax-calculators";
export { LOCAL_SALARY_NEEDED_PROFILES } from "@/data/local-salary-needed";
export { majorEventIndexRecords } from "@/data/major-event-index";
export { loadSupplementalMajorEventSitemapEntriesServer } from "@/data/major-event-supplemental-registry.server";
export { COUNTY_PROPERTY_RECORDS } from "@/data/property/county-property-data";
export { isCountyPropertyIndexReady } from "@/data/property/county-property-schema";
export { fetchAssignedShopProducts } from "@/data/shop-products-remote";
export { TEXAS_DATASETS } from "@/data/texas-data-center";
export { isTexasVsStateSitemapReady } from "@/data/texas-vs-state-index-readiness.server";
export { TEXAS_VS_STATES, texasVsStateSlug } from "@/data/texas-vs-states-index";
export {
  isTexasDefinedOwnedEntity,
  isTexasDefinedOwnedStaticPath,
} from "@/lib/brand-route-ownership";
export {
  INDEXABLE_STATIC_PATHS,
  isExploreSitemapOwnedPath,
  isIndexablePublicPath,
  normalizePublicPath,
} from "@/lib/public-routes";
