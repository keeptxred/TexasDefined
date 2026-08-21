import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_EAST_TEXAS: CountySeriesProfile[] = [
  {
    countySlug: "polk",
    articleSlug: "polk-county-livingston-lake-livingston-alabama-coushatta-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/polk-county-livingston-lake-livingston-alabama-coushatta-piney-woods-texas")
      .then((module) => module.polkCountyLivingstonLakeLivingstonAlabamaCoushattaPineyWoodsTexasArticle),
  },
  {
    countySlug: "jasper",
    articleSlug: "jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas")
      .then((module) => module.jasperCountyJasperKirbyvilleSamRayburnPineyWoodsTexasArticle),
  },
];
