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
  {
    countySlug: "hockley",
    articleSlug: "hockley-county-levelland-yellow-house-canyon-oil-cotton-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/hockley-county-profile")
      .then((module) => module.hockleyCountyProfileArticle),
  },
  {
    countySlug: "terry",
    articleSlug: "terry-county-brownfield-cotton-grapes-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/terry-county-brownfield-cotton-grapes-south-plains-texas")
      .then((module) => module.terryCountyBrownfieldCottonGrapesSouthPlainsTexasArticle),
  },
  {
    countySlug: "lynn",
    articleSlug: "lynn-county-tahoka-cotton-tahoka-lake-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/lynn-county-tahoka-cotton-tahoka-lake-south-plains-texas")
      .then((module) => module.lynnCountyTahokaCottonTahokaLakeSouthPlainsTexasArticle),
  },
  {
    countySlug: "lubbock",
    articleSlug: "lubbock-county-hub-city-cotton-texas-tech-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/lubbock-county-hub-city-cotton-texas-tech-south-plains-texas")
      .then((module) => module.lubbockCountyHubCityCottonTexasTechSouthPlainsTexasArticle),
  },
  {
    countySlug: "andrews",
    articleSlug: "andrews-county-andrews-oil-ranching-high-plains-west-texas",
    loadArticle: () => import("@/data/fixtures/andrews-county-andrews-oil-ranching-high-plains-west-texas")
      .then((module) => module.andrewsCountyOilRanchingHighPlainsWestTexasArticle),
  },
  {
    countySlug: "yoakum",
    articleSlug: "yoakum-county-plains-denver-city-oil-ogallala-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/yoakum-county-plains-denver-city-oil-ogallala-south-plains-texas")
      .then((module) => module.yoakumCountyPlainsDenverCityOilOgallalaSouthPlainsTexasArticle),
  },
  {
    countySlug: "cochran",
    articleSlug: "cochran-county-morton-whiteface-oil-irrigation-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/cochran-county-morton-whiteface-oil-irrigation-south-plains-texas")
      .then((module) => module.cochranCountyMortonWhitefaceOilIrrigationSouthPlainsTexasArticle),
  },
  {
    countySlug: "bailey",
    articleSlug: "bailey-county-muleshoe-refuge-irrigation-high-plains-texas",
    loadArticle: () => import("@/data/fixtures/bailey-county-muleshoe-refuge-irrigation-high-plains-texas")
      .then((module) => module.baileyCountyMuleshoeRefugeIrrigationHighPlainsTexasArticle),
  },
  {
    countySlug: "lamb",
    articleSlug: "lamb-county-littlefield-olton-irrigation-cotton-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/lamb-county-littlefield-olton-irrigation-cotton-south-plains-texas")
      .then((module) => module.lambCountyLittlefieldOltonIrrigationCottonSouthPlainsTexasArticle),
  },
  {
    countySlug: "martin",
    articleSlug: "martin-county-stanton-marienfeld-cotton-oil-southern-high-plains-texas",
    loadArticle: () => import("@/data/fixtures/martin-county-stanton-marienfeld-cotton-oil-southern-high-plains-texas")
      .then((module) => module.martinCountyStantonMarienfeldCottonOilSouthernHighPlainsTexasArticle),
  },
  {
    countySlug: "hale",
    articleSlug: "hale-county-plainview-runningwater-draw-irrigation-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/hale-county-plainview-runningwater-draw-irrigation-south-plains-texas")
      .then((module) => module.haleCountyPlainviewRunningwaterDrawIrrigationSouthPlainsTexasArticle),
  },
  {
    countySlug: "floyd",
    articleSlug: "floyd-county-floydada-lockney-caprock-agriculture-south-plains-texas",
    loadArticle: () => import("@/data/fixtures/floyd-county-floydada-lockney-caprock-agriculture-south-plains-texas")
      .then((module) => module.floydCountyFloydadaLockneyCaprockAgricultureSouthPlainsTexasArticle),
  },
];
