import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_NORTHEAST: CountySeriesProfile[] = [
  {
    countySlug: "hopkins",
    articleSlug: "hopkins-county-sulphur-springs-dairy-railroads-northeast-texas",
    loadArticle: () => import("@/data/fixtures/hopkins-county-sulphur-springs-dairy-railroads-northeast-texas")
      .then((module) => module.hopkinsCountySulphurSpringsDairyRailroadsNortheastTexasArticle),
  },
  {
    countySlug: "hunt",
    articleSlug: "hunt-county-greenville-cotton-railroads-blackland-prairie-texas",
    loadArticle: () => import("@/data/fixtures/hunt-county-greenville-cotton-railroads-blackland-prairie-texas")
      .then((module) => module.huntCountyGreenvilleCottonRailroadsBlacklandPrairieArticle),
  },
  {
    countySlug: "rains",
    articleSlug: "rains-county-emory-lake-tawakoni-lake-fork-texas",
    loadArticle: () => import("@/data/fixtures/rains-county-emory-lake-tawakoni-lake-fork-texas")
      .then((module) => module.rainsCountyEmoryLakeTawakoniLakeForkTexasArticle),
  },
  {
    countySlug: "fannin",
    articleSlug: "fannin-county-bonham-bois-darc-lake-rayburn-northeast-texas",
    loadArticle: () => import("@/data/fixtures/fannin-county-bonham-bois-darc-lake-rayburn-northeast-texas")
      .then((module) => module.fanninCountyBonhamBoisDArcLakeRayburnNortheastTexasArticle),
  },
  {
    countySlug: "van-zandt",
    articleSlug: "van-zandt-county-canton-grand-saline-first-monday-east-texas",
    loadArticle: () => import("@/data/fixtures/van-zandt-county-canton-grand-saline-first-monday-east-texas")
      .then((module) => module.vanZandtCountyCantonGrandSalineFirstMondayEastTexasArticle),
  },
  {
    countySlug: "wood",
    articleSlug: "wood-county-quitman-mineola-lake-fork-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/wood-county-quitman-mineola-lake-fork-piney-woods-texas")
      .then((module) => module.woodCountyQuitmanMineolaLakeForkPineyWoodsTexasArticle),
  },
];
