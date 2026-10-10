import type { Article } from "../types";

const houstonCommuterHero: Article["hero"] = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2025-09-14_16_24_08_View_north_along_Texas_State_Highway_99_%28Grand_Parkway%29_just_north_of_its_western_interchange_with_Interstate_10_%28Katy_Freeway%29_in_Houston%2C_Harris_County%2C_Texas.jpg/1280px-thumbnail.jpg",
  alt: "Grand Parkway State Highway 99 commuter corridor near Katy and Houston, Texas",
  width: 1280,
  height: 960,
  credit: "Famartin · CC BY-SA 4.0 · Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:2025-09-14_16_24_08_View_north_along_Texas_State_Highway_99_(Grand_Parkway)_just_north_of_its_western_interchange_with_Interstate_10_(Katy_Freeway)_in_Houston,_Harris_County,_Texas.jpg",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
};

const dallasCommuterHero: Article["hero"] = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/A_DART_%28Dallas_Area_Rapid_Transit%29_light-rail_train_leaves_the_Akard_Station_in_downtown_Dallas%2C_Texas.jpg/1280px-A_DART_%28Dallas_Area_Rapid_Transit%29_light-rail_train_leaves_the_Akard_Station_in_downtown_Dallas%2C_Texas.jpg",
  alt: "DART light-rail train on a downtown Dallas commuter route",
  width: 1280,
  height: 896,
  credit: "Carol M. Highsmith / Library of Congress · public domain · Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:A_DART_(Dallas_Area_Rapid_Transit)_light-rail_train_leaves_the_Akard_Station_in_downtown_Dallas,_Texas.jpg",
};

const propertyTaxHero: Article["hero"] = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Webb_County%2C_TX%2C_Appraisal_District_Office_IMG_2011.JPG/1280px-Webb_County%2C_TX%2C_Appraisal_District_Office_IMG_2011.JPG",
  alt: "Webb County Appraisal District office in Laredo, Texas",
  width: 1280,
  height: 960,
  credit: "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Webb_County,_TX,_Appraisal_District_Office_IMG_2011.JPG",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
};

const corporateRelocationHero: Article["hero"] = {
  src: "https://upload.wikimedia.org/wikipedia/commons/7/7d/OneCongressPlazaAustinTX.JPG",
  alt: "One Congress Plaza office tower in downtown Austin, Texas",
  width: 1704,
  height: 2272,
  credit: "WhisperToMe · public domain · Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:OneCongressPlazaAustinTX.JPG",
};

const employeeRelocationHero: Article["hero"] = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Desk-office-workspace-coworking_%2823699033283%29.jpg/1280px-Desk-office-workspace-coworking_%2823699033283%29.jpg",
  alt: "Employee working at a desk in a shared office space",
  width: 1280,
  height: 853,
  credit: "Pixel.la / Startup Stock Photos · CC0 · Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Desk-office-workspace-coworking_(23699033283).jpg",
};

const stub = (
  id: string,
  record: Omit<Article, "id" | "brandId" | "authorId" | "body" | "relatedCollections" | "relatedDestinations">,
): Article => ({
  id,
  brandId: "texasdefined",
  authorId: "a-hollis",
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
  ...record,
});

export const relocationAuthorityExpansionStubs: Article[] = [
  stub("relocation-authority-houston-commuters", {
    slug: "best-houston-suburbs-for-commuters",
    title: "Best Houston Suburbs for Commuters: Choose by Job Corridor",
    dek: "A practical Houston-area shortlist organized around the job corridor, transit option and daily trip—not a generic ranking of suburbs.",
    category: "moving-to-texas",
    region: "gulf-coast",
    hero: houstonCommuterHero,
    publishedAt: "2026-09-29",
    readingMinutes: 8,
    tags: ["houston", "suburbs", "commuting", "relocation", "moving to texas"],
    sourceName: "METRO Park & Ride",
    sourceUrl: "https://www.ridemetro.org/riding-metro/transit-services/park-and-ride-bus",
  }),
  stub("relocation-authority-dallas-commuters", {
    slug: "best-dallas-suburbs-for-commuters",
    title: "Best Dallas Suburbs for Commuters: Choose by Job Corridor",
    dek: "A Dallas-area commuter guide built around the actual workplace, rail and road corridor, toll exposure and household budget instead of a one-size-fits-all suburb ranking.",
    category: "moving-to-texas",
    region: "prairies-lakes",
    hero: dallasCommuterHero,
    publishedAt: "2026-09-29",
    readingMinutes: 8,
    tags: ["dallas", "dfw", "suburbs", "commuting", "relocation"],
    sourceName: "Dallas Area Rapid Transit",
    sourceUrl: "https://www.dart.org/guide/transit-and-use/rail/rail-station-detail/northwest-plano-park-ride",
  }),
  stub("relocation-authority-property-taxes", {
    slug: "texas-property-taxes-for-new-residents",
    title: "Texas Property Taxes for New Residents",
    dek: "How Texas property taxes, appraisal districts, taxing units and homestead exemptions fit together when you buy a home after moving to the state.",
    category: "moving-to-texas",
    hero: propertyTaxHero,
    publishedAt: "2026-09-29",
    readingMinutes: 8,
    tags: ["property taxes", "homestead exemption", "homebuyer", "relocation", "moving to texas"],
    sourceName: "Texas Comptroller Property Tax Assistance",
    sourceUrl: "https://comptroller.texas.gov/taxes/property-tax/exemptions/",
  }),
  stub("relocation-authority-corporate", {
    slug: "corporate-relocation-to-texas",
    title: "Corporate Relocation to Texas: Employer & Site-Selection Guide",
    dek: "A practical Texas corporate-relocation framework for employers evaluating sites, workforce, registration, taxes, employee transition and household logistics.",
    category: "moving-to-texas",
    hero: corporateRelocationHero,
    publishedAt: "2026-09-29",
    readingMinutes: 9,
    tags: ["corporate relocation", "business", "workforce", "site selection", "texas economy"],
    sourceName: "Texas Economic Development & Tourism",
    sourceUrl: "https://gov.texas.gov/business/page/moving-business-to-texas",
  }),
  stub("relocation-authority-employee", {
    slug: "employee-relocation-guide-to-texas",
    title: "Employee Relocation Guide to Texas",
    dek: "A practical employee transfer guide for Texas: relocation benefits, housing, commute, taxes, utilities, vehicle registration, driver licensing and first-month tasks.",
    category: "moving-to-texas",
    hero: employeeRelocationHero,
    publishedAt: "2026-09-29",
    readingMinutes: 9,
    tags: ["employee relocation", "moving to texas", "corporate relocation", "new resident", "relocation benefits"],
    sourceName: "Texas Department of Motor Vehicles",
    sourceUrl: "https://www.txdmv.gov/motorists/new-to-texas",
  }),
];

const relocationAuthorityExpansionSlugs = new Set(relocationAuthorityExpansionStubs.map((article) => article.slug));

export async function loadRelocationAuthorityExpansionArticle(
  brandId: string,
  slug: string,
): Promise<Article | null> {
  if (brandId !== "texasdefined" || !relocationAuthorityExpansionSlugs.has(slug)) return null;
  const { relocationAuthorityExpansionArticles } = await import("./relocation-authority-expansion");
  return relocationAuthorityExpansionArticles.find((article) => article.slug === slug) ?? null;
}
