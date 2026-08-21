import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_SOUTH_PLAINS: CountySeriesProfile[] = [
  {
    countySlug: "crosby",
    articleSlug: "crosby-county-crosbyton-blanco-canyon-caprock-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/crosby-county-crosbyton-blanco-canyon-caprock-south-plains-texas")
      .then((module) => module.crosbyCountyCrosbytonBlancoCanyonCaprockSouthPlainsTexasArticle),
  },
  {
    countySlug: "gaines",
    articleSlug: "gaines-county-seminole-oil-cotton-peanuts-high-plains-texas",
    loadArticle: () => import("@/data/fixtures/gaines-county-seminole-oil-cotton-peanuts-high-plains-texas")
      .then((module) => module.gainesCountySeminoleOilCottonPeanutsHighPlainsTexasArticle),
  },
];
