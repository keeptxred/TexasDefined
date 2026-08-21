import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_PANHANDLE: CountySeriesProfile[] = [
  {
    countySlug: "oldham",
    articleSlug: "oldham-county-vega-tascosa-canadian-river-route-66-panhandle-texas",
    loadArticle: () => import("@/data/fixtures/oldham-county-vega-tascosa-canadian-river-route-66-panhandle-texas")
      .then((module) => module.oldhamCountyVegaTascosaCanadianRiverRoute66PanhandleTexasArticle),
  },
  {
    countySlug: "potter",
    articleSlug: "potter-county-amarillo-canadian-river-route-66-panhandle-texas",
    loadArticle: () => import("@/data/fixtures/potter-county-amarillo-canadian-river-route-66-panhandle-texas")
      .then((module) => module.potterCountyAmarilloCanadianRiverRoute66PanhandleTexasArticle),
  },
  {
    countySlug: "hartley",
    articleSlug: "hartley-county-channing-xit-ranch-high-plains-texas",
    loadArticle: () => import("@/data/fixtures/hartley-county-channing-xit-ranch-high-plains-texas")
      .then((module) => module.hartleyCountyChanningXitRanchHighPlainsTexasArticle),
  },
  {
    countySlug: "armstrong",
    articleSlug: "armstrong-county-claude-palo-duro-ja-ranch-panhandle-texas",
    loadArticle: () => import("@/data/fixtures/armstrong-county-claude-palo-duro-ja-ranch-panhandle-texas")
      .then((module) => module.armstrongCountyClaudePaloDuroJaRanchPanhandleTexasArticle),
  },
  {
    countySlug: "donley",
    articleSlug: "donley-county-clarendon-saints-roost-greenbelt-panhandle-texas",
    loadArticle: () => import("@/data/fixtures/donley-county-clarendon-saints-roost-greenbelt-panhandle-texas")
      .then((module) => module.donleyCountyClarendonSaintsRoostGreenbeltPanhandleTexasArticle),
  },
  {
    countySlug: "carson",
    articleSlug: "carson-county-panhandle-white-deer-groom-pantex-texas",
    loadArticle: () => import("@/data/fixtures/carson-county-panhandle-white-deer-groom-pantex-texas")
      .then((module) => module.carsonCountyPanhandleWhiteDeerGroomPantexTexasArticle),
  },
  {
    countySlug: "dallam",
    articleSlug: "dallam-county-dalhart-xit-ranch-texline-panhandle-texas",
    loadArticle: () => import("@/data/fixtures/dallam-county-dalhart-xit-ranch-texline-panhandle-texas")
      .then((module) => module.dallamCountyDalhartXitRanchTexlinePanhandleTexasArticle),
  },
  {
    countySlug: "sherman",
    articleSlug: "sherman-county-stratford-canadian-river-agriculture-panhandle-texas",
    loadArticle: () => import("@/data/fixtures/sherman-county-stratford-canadian-river-agriculture-panhandle-texas")
      .then((module) => module.shermanCountyStratfordCanadianRiverAgriculturePanhandleTexasArticle),
  },
];
