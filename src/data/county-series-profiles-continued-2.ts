import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_CONTINUED_2: CountySeriesProfile[] = [
  {
    countySlug: "lamar",
    articleSlug: "lamar-county-paris-red-river-railroads-northeast-texas",
    loadArticle: () => import("@/data/fixtures/lamar-county-paris-red-river-railroads-northeast-texas")
      .then((module) => module.lamarCountyParisRedRiverRailroadsNortheastTexasArticle),
  },
];
