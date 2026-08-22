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
  {
    countySlug: "newton",
    articleSlug: "newton-county-newton-sabine-river-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/newton-county-newton-sabine-river-piney-woods-texas")
      .then((module) => module.newtonCountyNewtonSabineRiverPineyWoodsTexasArticle),
  },
  {
    countySlug: "orange",
    articleSlug: "orange-county-orange-sabine-neches-golden-triangle-texas",
    loadArticle: () => import("@/data/fixtures/orange-county-orange-sabine-neches-golden-triangle-texas")
      .then((module) => module.orangeCountyOrangeSabineNechesGoldenTriangleTexasArticle),
  },
  {
    countySlug: "tyler",
    articleSlug: "tyler-county-woodville-big-thicket-neches-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/tyler-county-woodville-big-thicket-neches-piney-woods-texas")
      .then((module) => module.tylerCountyWoodvilleBigThicketNechesPineyWoodsTexasArticle),
  },
  {
    countySlug: "anderson",
    articleSlug: "anderson-county-palestine-railroads-dogwoods-east-texas",
    loadArticle: () => import("@/data/fixtures/anderson-county-palestine-railroads-dogwoods-east-texas")
      .then((module) => module.andersonCountyPalestineRailroadsDogwoodsEastTexasArticle),
  },
  {
    countySlug: "jefferson",
    articleSlug: "jefferson-county-beaumont-port-arthur-spindletop-gulf-coast-texas",
    loadArticle: () => import("@/data/fixtures/jefferson-county-beaumont-port-arthur-spindletop-gulf-coast-texas")
      .then((module) => module.jeffersonCountyBeaumontPortArthurSpindletopGulfCoastTexasArticle),
  },
  {
    countySlug: "hardin",
    articleSlug: "hardin-county-kountze-big-thicket-sour-lake-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/hardin-county-kountze-big-thicket-sour-lake-piney-woods-texas")
      .then((module) => module.hardinCountyKountzeBigThicketSourLakePineyWoodsTexasArticle),
  },
  {
    countySlug: "liberty",
    articleSlug: "liberty-county-liberty-dayton-cleveland-trinity-river-east-texas",
    loadArticle: () => import("@/data/fixtures/liberty-county-liberty-dayton-cleveland-trinity-river-east-texas")
      .then((module) => module.libertyCountyLibertyDaytonClevelandTrinityRiverEastTexasArticle),
  },
];
