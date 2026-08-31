import bbqBrisket from "@/assets/bbq-brisket.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import heroHillCountry from "@/assets/hero-hill-country.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";
import closingHeroAsset from "@/assets/generated/texas-courthouse-square.jpg";
import electricityHeroAsset from "@/assets/generated/texas-electricity-plan.jpg";
import foundationHeroAsset from "@/assets/generated/texas-foundation-clay-drought.jpg";
import homeMaintenanceHeroAsset from "@/assets/generated/texas-home-maintenance-calendar-unique.jpg";
import roofHeroAsset from "@/assets/generated/texas-roofs-hail-wind-heat.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string, credit?: string): ImageRef => ({ src, alt, width: 1600, height: 1067, ...(credit ? { credit } : {}) });
const rentBuyHero = image("https://images.unsplash.com/photo-1758915576261-8da237f62126?auto=format&fit=crop&w=1600&q=82", "A distinctive Texas house representing the choice between renting and buying", "Dennis Lamberth · Unsplash");
const downPaymentHero = image("https://images.unsplash.com/photo-1662166980304-8c927b110066?auto=format&fit=crop&w=1600&q=82", "A Texas property representing the purchase price and cash needed to buy a home", "Erin Decker · Unsplash");
const trueCostHero = image(homeMaintenanceHeroAsset, "Texas home maintenance and recurring ownership costs");
const refinanceHero = image(foundationHeroAsset, "A Texas house and foundation representing the value behind a refinance decision");
const helocHero = image("https://images.unsplash.com/photo-1671410304582-1c2fb1390fbf?auto=format&fit=crop&w=1600&h=900&q=82", "A Texas suburban neighborhood representing home equity and borrowing against a property", "Jose Losada · Unsplash");
const mortgageHero = image(heroHillCountry, "Texas homes and neighborhoods representing the full monthly mortgage payment");
const closingHero = image(closingHeroAsset, "A Texas courthouse and civic square representing the legal paperwork behind a home closing");
const utilityHero = image(electricityHeroAsset, "A Texas home, power service and household utility costs");
const insuranceHero = image(roofHeroAsset, "A Texas roof exposed to hail, wind and heat for a homeowners insurance guide");
const salaryHero = image(smallTown, "Texas homes and neighborhoods representing home affordability and household income");
const movingHero = image(roadTrip, "A Texas highway leading toward a new city and a new home");
const cultureHero = image(caddoLake, "A working Texas landscape shaped by water, ranching and local language");
const bbqHero = image(bbqBrisket, "Sliced Texas brisket on butcher paper beside a working barbecue pit");
const cityHero = image(smallTown, "A Texas city and neighborhood seen in warm late-day light");

const stub = (index: number, record: Omit<Article, "id" | "brandId" | "body" | "relatedCollections" | "relatedDestinations">): Article => ({ id: `migration-article-${index}`, brandId: "texasdefined", body: [], relatedCollections: [], relatedDestinations: [], ...record });

export const migratedEditorialArticleStubs: Article[] = [
  stub(1, { slug: "renting-vs-buying-in-texas", title: "Renting vs. Buying in Texas", dek: "A complete comparison of flexibility, equity, taxes, insurance, maintenance and the time it takes ownership costs to break even.", category: "real-estate", hero: rentBuyHero, authorId: "a-hollis", publishedAt: "2026-07-25", readingMinutes: 11, tags: ["renting", "home buying", "affordability", "moving to texas"] }),
  stub(2, { slug: "texas-house-down-payment-guide", title: "How Much Down Payment Do You Need for a Texas House?", dek: "Why 20 percent is not a universal minimum, how loan programs differ and how to preserve enough cash for closing and repairs.", category: "real-estate", hero: downPaymentHero, authorId: "a-hollis", publishedAt: "2026-07-25", readingMinutes: 9, tags: ["down payment", "mortgage", "homebuyer", "closing costs"] }),
  stub(3, { slug: "true-cost-of-owning-a-home-in-texas", title: "The True Cost of Owning a Home in Texas", dek: "Mortgage, taxes and insurance are only the beginning. Build a realistic budget for heat, roofs, foundations, pools, districts and repairs.", category: "real-estate", hero: trueCostHero, authorId: "a-hollis", publishedAt: "2026-07-25", readingMinutes: 12, tags: ["homeownership", "maintenance", "property taxes", "insurance"] }),
  stub(4, { slug: "should-you-refinance-texas-mortgage", title: "Should You Refinance a Texas Mortgage?", dek: "Calculate break-even, compare equal loan terms and avoid lowering the payment by quietly adding years to the debt.", category: "real-estate", hero: refinanceHero, authorId: "a-hollis", publishedAt: "2026-07-25", readingMinutes: 9, tags: ["refinance", "mortgage", "interest rates", "home equity"] }),
  stub(5, { slug: "texas-home-equity-heloc-guide", title: "Texas HELOC and Home Equity Loan Rules", dek: "Texas allows home-equity loans and HELOCs, but homestead-secured borrowing has state-specific constitutional rules. Understand the 80% combined-lien ceiling, loan structures, risks and what to verify before applying.", category: "real-estate", hero: helocHero, authorId: "a-hollis", publishedAt: "2026-07-25", readingMinutes: 14, tags: ["home equity", "heloc", "heloc texas", "home equity loan texas", "texas heloc rules", "texas constitution", "borrowing"] }),
  stub(6, { slug: "texas-mortgage-payment-guide", title: "What Is Included in a Texas Mortgage Payment?", dek: "Principal and interest are only the core. Add property taxes, insurance, mortgage insurance and other housing costs to understand the real payment.", category: "real-estate", hero: mortgageHero, authorId: "a-hollis", publishedAt: "2026-07-25", readingMinutes: 10, tags: ["mortgage payment", "escrow", "property taxes", "home insurance"] }),
  stub(7, { slug: "texas-closing-costs-guide", title: "Texas Closing Costs and Cash to Close", dek: "Understand lender charges, title services, prepaids, escrow deposits and the final amount a buyer must bring to closing.", category: "real-estate", hero: closingHero, authorId: "a-hollis", publishedAt: "2026-07-25", readingMinutes: 8, tags: ["closing costs", "cash to close", "loan estimate", "homebuyer"] }),
  stub(8, { slug: "texas-utility-costs-guide", title: "How to Estimate Texas Utility Costs", dek: "Build an address-specific budget for electricity, water, wastewater, gas, internet, trash, pools and irrigation.", category: "moving-to-texas", hero: utilityHero, authorId: "a-hollis", publishedAt: "2026-07-25", readingMinutes: 8, tags: ["utilities", "electricity", "water", "moving"] }),
  stub(9, { slug: "texas-homeowners-insurance-guide", title: "Texas Homeowners Insurance: What Buyers Should Compare", dek: "Coverage, roof settlement, percentage deductibles, flood exclusions and coastal wind protection can matter more than the cheapest premium.", category: "real-estate", hero: insuranceHero, authorId: "a-hollis", publishedAt: "2026-07-25", readingMinutes: 9, tags: ["home insurance", "deductibles", "flood", "windstorm"] }),
  stub(10, { slug: "salary-needed-to-buy-a-house-in-texas", title: "What Salary Do You Need to Buy a House in Texas?", dek: "Work backward from the complete payment, recurring debts and a comfortable budget instead of relying on one statewide income number.", category: "real-estate", hero: salaryHero, authorId: "a-hollis", publishedAt: "2026-07-25", readingMinutes: 8, tags: ["salary", "affordability", "debt to income", "home buying"] }),
  stub(11, { slug: "moving-to-houston-address-checklist", title: "Moving to Houston: The Address Checklist", dek: "Flood history, drainage, taxing units, utilities, insurance and commute can change block by block across the Houston region.", category: "moving-to-texas", region: "gulf-coast", hero: cityHero, authorId: "a-hollis", publishedAt: "2026-07-23", readingMinutes: 12, tags: ["houston", "relocation", "flood risk", "property taxes"] }),
  stub(12, { slug: "moving-to-dallas-fort-worth-guide", title: "Moving to Dallas–Fort Worth", dek: "Choose the work corridor first, then compare tolls, local governments, school boundaries, utilities and total housing costs.", category: "moving-to-texas", region: "prairies-lakes", hero: movingHero, authorId: "a-hollis", publishedAt: "2026-07-23", readingMinutes: 12, tags: ["dallas", "fort worth", "dfw", "relocation"] }),
  stub(13, { slug: "moving-to-san-antonio-guide", title: "Moving to San Antonio", dek: "How to compare Bexar-area commutes, city boundaries, school districts, CPS Energy, SAWS and fast-growing suburban corridors.", category: "moving-to-texas", region: "south-texas", hero: cityHero, authorId: "a-hollis", publishedAt: "2026-07-23", readingMinutes: 11, tags: ["san antonio", "relocation", "utilities", "commute"] }),
  stub(14, { slug: "moving-to-austin-guide", title: "Moving to Austin and Central Texas", dek: "Compare total monthly cost, city limits, utility territories, school districts and the real commute across Travis, Williamson and Hays counties.", category: "moving-to-texas", region: "hill-country", hero: movingHero, authorId: "a-hollis", publishedAt: "2026-07-23", readingMinutes: 11, tags: ["austin", "central texas", "relocation", "cost of living"] }),
  stub(15, { slug: "moving-to-el-paso-guide", title: "Moving to El Paso", dek: "Choose the right side of the mountain, plan vehicle registration and emissions, and budget for desert utilities and Fort Bliss access.", category: "moving-to-texas", region: "big-bend", hero: movingHero, authorId: "a-hollis", publishedAt: "2026-07-23", readingMinutes: 11, tags: ["el paso", "relocation", "fort bliss", "desert living"] }),
  stub(16, { slug: "live-2026-06-29-the-history-behind-the-texas-stock-tank-name-bxkvg7", title: "Why Texans Call a Pond a Stock Tank", dek: "Why 'stock tank' became ordinary Texas ranch language for small man-made ponds built to water livestock—and why the term now gets used far beyond cattle country.", category: "texas-history", hero: cultureHero, authorId: "a-hollis", publishedAt: "2026-06-29", readingMinutes: 8, tags: ["texas language", "ranching", "stock tank", "history"] }),
  stub(17, { slug: "live-2026-07-07-texas-pitmasters-to-feature-in-new-food-network-competition-series-v3wglp", title: "Texas Pitmasters Bring Several Traditions to National Television", dek: "A Food Network competition puts Central Texas smoke, South Texas influence and live-fire cooking on the same stage.", category: "food-bbq", region: "south-texas", hero: bbqHero, authorId: "a-marisol", publishedAt: "2026-07-07", readingMinutes: 6, tags: ["barbecue", "pitmasters", "san antonio", "live fire"] }),
];

export const migratedEditorialSlugs = migratedEditorialArticleStubs.map((article) => article.slug);
const migratedSlugSet = new Set(migratedEditorialSlugs);
const financeDepthSlugSet = new Set([
  "texas-closing-costs-guide",
  "texas-utility-costs-guide",
  "salary-needed-to-buy-a-house-in-texas",
]);
const financeDepth2SlugSet = new Set([
  "texas-house-down-payment-guide",
  "should-you-refinance-texas-mortgage",
  "texas-homeowners-insurance-guide",
]);
const financeDepth3SlugSet = new Set([
  "renting-vs-buying-in-texas",
  "true-cost-of-owning-a-home-in-texas",
  "texas-home-equity-heloc-guide",
  "texas-mortgage-payment-guide",
]);
const relocationDepthSlugSet = new Set([
  "moving-to-austin-guide",
  "moving-to-dallas-fort-worth-guide",
]);
const relocationDepth2SlugSet = new Set([
  "moving-to-houston-address-checklist",
  "moving-to-san-antonio-guide",
  "moving-to-el-paso-guide",
]);
const HELOC_RANKING_DEPTH_SLUG = "texas-home-equity-heloc-guide";
const STOCK_TANK_DEPTH_SLUG = "live-2026-06-29-the-history-behind-the-texas-stock-tank-name-bxkvg7";

export async function loadMigratedEditorialArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !migratedSlugSet.has(slug)) return null;
  if (financeDepthSlugSet.has(slug)) {
    const { financeEvergreenDepthArticles } = await import("./finance-evergreen-depth");
    return financeEvergreenDepthArticles.find((article) => article.slug === slug) ?? null;
  }
  if (financeDepth2SlugSet.has(slug)) {
    const { financeEvergreenDepth2Articles } = await import("./finance-evergreen-depth-2");
    return financeEvergreenDepth2Articles.find((article) => article.slug === slug) ?? null;
  }
  if (slug === HELOC_RANKING_DEPTH_SLUG) {
    const { texasHelocRulesArticle } = await import("./finance-heloc-depth");
    return texasHelocRulesArticle;
  }
  if (financeDepth3SlugSet.has(slug)) {
    const { financeEvergreenDepth3Articles } = await import("./finance-evergreen-depth-3");
    const article = financeEvergreenDepth3Articles.find((article) => article.slug === slug) ?? null;
    if (!article) return null;
    const { enrichFinanceIndexReadyArticle } = await import("./finance-index-readiness-enrichment");
    return enrichFinanceIndexReadyArticle(article);
  }
  if (relocationDepthSlugSet.has(slug)) {
    const { relocationEvergreenDepthArticles } = await import("./relocation-evergreen-depth");
    return relocationEvergreenDepthArticles.find((article) => article.slug === slug) ?? null;
  }
  if (relocationDepth2SlugSet.has(slug)) {
    const { relocationEvergreenDepth2Articles } = await import("./relocation-evergreen-depth-2");
    return relocationEvergreenDepth2Articles.find((article) => article.slug === slug) ?? null;
  }
  if (slug === STOCK_TANK_DEPTH_SLUG) {
    const { stockTankNameDepthArticle } = await import("./stock-tank-name-depth");
    return stockTankNameDepthArticle;
  }
  const { migratedEditorialArticles } = await import("./migrated-editorial");
  return migratedEditorialArticles.find((article) => article.slug === slug) ?? null;
}
