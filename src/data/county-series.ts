import type { Article } from "@/data/types";
import { andrewsCountyAndrewsOilShafterLakeArticle } from "@/data/fixtures/andrews-county-andrews-oil-shafter-lake";
import { brewsterCountyBigBendArticle } from "@/data/fixtures/brewster-county-big-bend";
import { culbersonCountyVanHornGuadalupeMountainsArticle } from "@/data/fixtures/culberson-county-van-horn-guadalupe-mountains";
import { ectorCountyOdessaOilStonehengeArticle } from "@/data/fixtures/ector-county-odessa-oil-stonehenge";
import { elPasoCountyPassMissionsBorderlandsArticle } from "@/data/fixtures/el-paso-county-pass-missions-borderlands";
import { hudspethCountySierraBlancaSaltFlatsArticle } from "@/data/fixtures/hudspeth-county-sierra-blanca-salt-flats";
import { jeffDavisCountyFortDavisMountainsArticle } from "@/data/fixtures/jeff-davis-county-fort-davis-mountains";
import { pecosCountyFortStocktonComancheSpringsArticle } from "@/data/fixtures/pecos-county-fort-stockton-comanche-springs";
import { presidioCountyMarfaBorderlandsArticle } from "@/data/fixtures/presidio-county-marfa-borderlands";
import { randallCountyCanyonPaloDuroArticle } from "@/data/fixtures/randall-county-canyon-palo-duro";
import { reevesCountyPecosBalmorheaArticle } from "@/data/fixtures/reeves-county-pecos-balmorhea";
import { tomGreenCountySanAngeloConchoArticle } from "@/data/fixtures/tom-green-county-san-angelo-concho";
import { wardCountyMonahansSandhillsArticle } from "@/data/fixtures/ward-county-monahans-sandhills";
import { winklerCountyKermitWinkOilArticle } from "@/data/fixtures/winkler-county-kermit-wink-oil";

export type CountySeriesProfile = {
  countySlug: string;
  article: Article;
};

export const COUNTY_SERIES_PROFILES: CountySeriesProfile[] = [
  { countySlug: "brewster", article: brewsterCountyBigBendArticle },
  { countySlug: "presidio", article: presidioCountyMarfaBorderlandsArticle },
  { countySlug: "jeff-davis", article: jeffDavisCountyFortDavisMountainsArticle },
  { countySlug: "culberson", article: culbersonCountyVanHornGuadalupeMountainsArticle },
  { countySlug: "hudspeth", article: hudspethCountySierraBlancaSaltFlatsArticle },
  { countySlug: "el-paso", article: elPasoCountyPassMissionsBorderlandsArticle },
  { countySlug: "reeves", article: reevesCountyPecosBalmorheaArticle },
  { countySlug: "pecos", article: pecosCountyFortStocktonComancheSpringsArticle },
  { countySlug: "ward", article: wardCountyMonahansSandhillsArticle },
  { countySlug: "winkler", article: winklerCountyKermitWinkOilArticle },
  { countySlug: "andrews", article: andrewsCountyAndrewsOilShafterLakeArticle },
  { countySlug: "ector", article: ectorCountyOdessaOilStonehengeArticle },
  { countySlug: "randall", article: randallCountyCanyonPaloDuroArticle },
  { countySlug: "tom-green", article: tomGreenCountySanAngeloConchoArticle },
];

const byCountySlug = new Map(COUNTY_SERIES_PROFILES.map((profile) => [profile.countySlug, profile.article]));
const legacyArticleToCounty = new Map(COUNTY_SERIES_PROFILES.map((profile) => [profile.article.slug, profile.countySlug]));

export function getCountySeriesArticle(countySlug: string) {
  return byCountySlug.get(countySlug) ?? null;
}

export function countySlugForLegacyArticle(articleSlug: string) {
  return legacyArticleToCounty.get(articleSlug) ?? null;
}

export function isLegacyCountySeriesArticle(articleSlug: string) {
  return legacyArticleToCounty.has(articleSlug);
}
