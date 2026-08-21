import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_PANHANDLE: CountySeriesProfile[] = [
  {
    countySlug: "oldham",
    articleSlug: "oldham-county-vega-tascosa-canadian-river-route-66-panhandle-texas",
    loadArticle: () => import("@/data/fixtures/oldham-county-vega-tascosa-canadian-river-route-66-panhandle-texas")
      .then((module) => module.oldhamCountyVegaTascosaCanadianRiverRoute66PanhandleTexasArticle),
  },
];
