import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_CONCHO: CountySeriesProfile[] = [
  {
    countySlug: "concho",
    articleSlug: "concho-county-paint-rock-eden-pictographs-ranching-west-central-texas",
    loadArticle: () => import("@/data/fixtures/concho-county-paint-rock-eden-pictographs-ranching-west-central-texas")
      .then((module) => module.conchoCountyPaintRockEdenPictographsRanchingWestCentralTexasArticle),
  },
  {
    countySlug: "runnels",
    articleSlug: "runnels-county-ballinger-winters-colorado-river-west-central-texas",
    loadArticle: () => import("@/data/fixtures/runnels-county-ballinger-winters-colorado-river-west-central-texas")
      .then((module) => module.runnelsCountyBallingerWintersColoradoRiverWestCentralTexasArticle),
  },
  {
    countySlug: "coke",
    articleSlug: "coke-county-robert-lee-bronte-colorado-river-west-central-texas",
    loadArticle: () => import("@/data/fixtures/coke-county-robert-lee-bronte-colorado-river-west-central-texas")
      .then((module) => module.cokeCountyRobertLeeBronteColoradoRiverWestCentralTexasArticle),
  },
];
