import type { Article } from "../types";
import { texasRiversExplainedArticle } from "./texas-rivers-explained";
import { texasTownCulturalRootsArticle } from "./texas-town-cultural-roots";
import { texasCourthousesTownSquareArticle } from "./texas-courthouses-town-square";
import { texasHurricanePreparationArticle } from "./texas-hurricane-preparation-guide";
import { texasFoundationCareArticle } from "./texas-foundation-care-clay-drought";
import { texasRoofsHailWindHeatArticle } from "./texas-roofs-hail-wind-heat";
import { prepareTexasHouseFreezeArticle } from "./prepare-texas-house-freeze";
import { mudsPidsHoasSpecialDistrictsArticle } from "./muds-pids-hoas-special-districts";
import { texasSchoolDistrictsExplainedArticle } from "./texas-school-districts-explained";
import { chooseElectricityPlanTexasArticle } from "./choose-electricity-plan-texas";
import { texasHillCountryWhatMakesItArticle } from "./texas-hill-country-what-makes-it";
import { winklerCountyKermitWinkOilArticle } from "./winkler-county-kermit-wink-oil";

const addSourceLinks = (article: Article, links: NonNullable<Article["internalLinks"]>): Article => {
  const existing = article.internalLinks ?? [];
  return {
    ...article,
    internalLinks: [
      ...existing,
      ...links.filter((link) => !existing.some((item) => item.href === link.href)),
    ],
  };
};

export const newestEvergreenArticles = [
  addSourceLinks(texasRiversExplainedArticle, [
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/", label: "Texas Water Development Board river basins", description: "Official Texas river-basin and reservoir reference information." },
    { href: "https://www.twdb.texas.gov/surfacewater/conditions/index.asp", label: "Texas water conditions and data", description: "Current and historical surface-water data from the Texas Water Development Board." },
  ]),
  winklerCountyKermitWinkOilArticle,
  texasTownCulturalRootsArticle,
  texasCourthousesTownSquareArticle,
  addSourceLinks(texasHurricanePreparationArticle, [
    { href: "https://tdem.texas.gov/prepare", label: "Texas emergency preparedness", description: "Official preparedness guidance, evacuation resources and emergency planning information." },
    { href: "https://www.texasready.gov/", label: "TexasReady", description: "State preparedness guidance for plans, kits, alerts and evacuation routes." },
  ]),
  texasFoundationCareArticle,
  addSourceLinks(texasRoofsHailWindHeatArticle, [
    { href: "https://www.tdi.texas.gov/tips/replacing-your-roof.html", label: "Texas Department of Insurance roof guidance", description: "Official guidance on roof coverage, wind and hail deductibles, claims and replacement." },
    { href: "https://www.tdi.texas.gov/tips/after-hail-or-windstorms.html", label: "Texas hail and windstorm claim guidance", description: "Official Texas consumer guidance for documenting damage and handling storm claims." },
  ]),
  prepareTexasHouseFreezeArticle,
  mudsPidsHoasSpecialDistrictsArticle,
  addSourceLinks(texasSchoolDistrictsExplainedArticle, [
    { href: "https://tea.texas.gov/families-and-students/school-district-locator/school-district-locator", label: "Texas Education Agency school district locator", description: "Official state map and district-boundary information for Texas addresses." },
    { href: "https://tea.texas.gov/glossary/askted", label: "AskTED Texas Education Directory", description: "Official school, district, county and regional education directory information." },
  ]),
  addSourceLinks(chooseElectricityPlanTexasArticle, [
    { href: "https://www.powertochoose.org/", label: "Power to Choose", description: "Official Texas resource for comparing retail electricity offers in eligible areas." },
    { href: "https://www.puc.texas.gov/consumer/electricity/", label: "Public Utility Commission electricity information", description: "Official consumer guidance on electric service, utilities and retail providers." },
  ]),
  texasHillCountryWhatMakesItArticle,
];
