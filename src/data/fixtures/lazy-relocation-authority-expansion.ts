import { houstonCommuterHero, dallasCommuterHero, propertyTaxHero, corporateRelocationHero, employeeRelocationHero } from "./relocation-remaining-media";
import type { Article } from "../types";



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
    title: "Best Houston Suburbs for Commuters: Compare by Job Corridor",
    dek: "Evidence-backed Houston commuter-area comparisons, real transit options, congestion cautions, a geographic map and a two-home commute cost worksheet.",
    category: "moving-to-texas",
    region: "gulf-coast",
    hero: houstonCommuterHero,
    publishedAt: "2026-09-29",
    updatedAt: "2026-11-08",
    readingMinutes: 11,
    tags: ["houston", "suburbs", "commuting", "relocation", "moving to texas"],
    sourceName: "Houston TranStar historical travel times",
    sourceUrl: "https://traffic.houstontranstar.org/hist/hist_traveltimes_menu.aspx",
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
