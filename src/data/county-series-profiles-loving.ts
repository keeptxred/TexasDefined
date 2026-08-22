import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_LOVING: CountySeriesProfile[] = [
  {
    countySlug: "loving",
    articleSlug: "loving-county-mentone-pecos-river-oil-permian-basin-texas",
    loadArticle: () => import("@/data/fixtures/loving-county-mentone-pecos-river-oil-permian-basin-texas")
      .then((module) => module.lovingCountyMentonePecosRiverOilPermianBasinTexasArticle),
  },
];
