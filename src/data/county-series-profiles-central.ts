import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_CENTRAL: CountySeriesProfile[] = [
  {
    countySlug: "robertson",
    articleSlug: "robertson-county-franklin-hearne-calvert-brazos-railroads-texas",
    loadArticle: () => import("@/data/fixtures/robertson-county-franklin-hearne-calvert-brazos-railroads-texas")
      .then((module) => module.robertsonCountyFranklinHearneCalvertBrazosRailroadsTexasArticle),
  },
];
