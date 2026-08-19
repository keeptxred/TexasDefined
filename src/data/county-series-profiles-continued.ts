import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_CONTINUED: CountySeriesProfile[] = [
  {
    countySlug: "johnson",
    articleSlug: "johnson-county-cleburne-chisholm-trail-railroad-prairies-texas",
    loadArticle: () => import("@/data/fixtures/johnson-county-cleburne-chisholm-trail-railroad-prairies")
      .then((module) => module.johnsonCountyCleburneChisholmTrailRailroadPrairiesArticle),
  },
  {
    countySlug: "hill",
    articleSlug: "hill-county-hillsboro-lake-whitney-cotton-prairies-texas",
    loadArticle: () => import("@/data/fixtures/hill-county-hillsboro-lake-whitney-cotton-prairies")
      .then((module) => module.hillCountyHillsboroLakeWhitneyCottonPrairiesArticle),
  },
];
