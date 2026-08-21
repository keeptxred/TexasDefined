import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_SOUTH_PLAINS: CountySeriesProfile[] = [
  {
    countySlug: "crosby",
    articleSlug: "crosby-county-crosbyton-blanco-canyon-caprock-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/crosby-county-crosbyton-blanco-canyon-caprock-south-plains-texas")
      .then((module) => module.crosbyCountyCrosbytonBlancoCanyonCaprockSouthPlainsTexasArticle),
  },
];
