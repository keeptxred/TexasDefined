import type { Article } from "../types";
import "./newest-evergreen-links";
import "./military-museum-links";
import "./seasonal-authority-links";
import "./seasonal-county-links";
import "./lighthouse-authority-links";
import "./pest-authority-links";
import "./septic-authority-links";
import { winklerCountyArticleStub } from "./winkler-county-article-stub";
import { seasonalAuthorityArticleStubs, loadSeasonalAuthorityArticle } from "./lazy-seasonal-authority";
import { lighthouseDeepDiveStubs, loadLighthouseDeepDiveArticle } from "./lazy-lighthouse-deep-dives";
import { lighthouseSearchIntentStubs, loadLighthouseSearchIntentArticle } from "./lazy-lighthouse-search-intents";
import { seasonalIntentStubs, loadSeasonalIntentArticle } from "./lazy-seasonal-intents";

const texasFlagHistoryStub: Article = {
  id: "evergreen-texas-flag-history",
  brandId: "texasdefined",
  slug: "history-of-the-texas-flag",
  title: "The Texas Flag: A History of the Lone Star",
  dek: "Texas did not begin with the familiar blue, white and red Lone Star flag. Its path runs through revolution-era proposals, the Burnet flag, a Republic-era redesign, annexation, a decades-long legal gap and the modern Texas Flag Code.",
  category: "texas-history",
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Texas.svg/1280px-Flag_of_Texas.svg.png",
    alt: "The official Texas state flag with one white star on a vertical blue field beside white and red horizontal stripes",
    width: 1280,
    height: 853,
    credit: "Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 11,
  tags: ["texas flag history", "lone star flag", "republic of texas", "burnet flag", "peter krag", "texas state symbols", "texas history"],
  featured: true,
  sourceName: "Texas State Library and Archives Commission",
  sourceUrl: "https://www.tsl.texas.gov/treasures/flagsandmaps/flag-design.html",
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasFlagEtiquetteStub: Article = {
  id: "evergreen-texas-flag-etiquette",
  brandId: "texasdefined",
  slug: "texas-flag-etiquette-display-guide",
  title: "Texas Flag Etiquette: How to Display the Lone Star Flag Correctly",
  dek: "A practical guide to Texas flag position, vertical display, half-staff, the U.S. flag, the state pledge, folding and retirement—grounded in the Texas Flag Code rather than folklore.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flag-of-Texas.jpg?width=1600",
    alt: "Texas flag flying from a flagpole in Austin",
    width: 1600,
    height: 1067,
    credit: "Makaristos · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 8,
  tags: ["texas flag etiquette", "texas flag rules", "texas flag display", "texas flag half staff", "texas flag pledge", "texas flag code", "lone star flag"],
  featured: false,
  sourceName: "Texas State Library and Archives Commission · Texas Flag Code",
  sourceUrl: "https://www.tsl.texas.gov/ref/abouttx/flagcode.html",
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasMilitaryMuseumsGuideStub: Article = {
  id: "evergreen-texas-military-museums-historic-sites-guide",
  brandId: "texasdefined",
  slug: "texas-military-museums-historic-sites-guide",
  title: "Texas Military Museums & Historic Sites: The Best Places to See the Story in Person",
  dek: "From aircraft carriers and battlefields to frontier forts, WASP hangars, glider training and Pacific War collections, this statewide guide turns Texas military history into places you can actually visit.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ceremonies_at_Camp_Mabry_190112-Z-DZ751-0199_(32916620338).jpg?width=1600",
    alt: "A ceremony inside the Texas Military Forces Museum at Camp Mabry in Austin",
    width: 3000,
    height: 2002,
    credit: "Sgt. 1st Class Jim Greenhill / U.S. Army National Guard · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-20",
  readingMinutes: 19,
  tags: ["Texas military museums", "Texas military historic sites", "USS Lexington", "National WASP WWII Museum", "Silent Wings Museum", "Texas Military Forces Museum", "National Museum of the Pacific War", "Texas battlefields", "Texas forts", "Texas military history"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/learn/military-history",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["uss-lexington-museum-corpus-christi", "national-wasp-wwii-museum-sweetwater", "silent-wings-museum-lubbock", "texas-military-forces-museum", "palo-alto-battlefield-national-historical-park"],
};

const texasNationalCemeteriesGuideStub: Article = {
  id: "evergreen-texas-national-cemeteries-guide",
  brandId: "texasdefined",
  slug: "texas-national-cemeteries-guide",
  title: "Texas National Cemeteries: Fort Sam Houston, Houston and Dallas–Fort Worth",
  dek: "A practical and historical guide to three of Texas' major VA national cemeteries—where they are, when visitors can enter, what makes each landscape distinctive and how their veteran stories connect to Texas military history.",
  category: "texas-history",
  region: "south-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Sam_Houston_National_Cemetery.jpg?width=1600",
    alt: "Panoramic view across Fort Sam Houston National Cemetery in San Antonio",
    width: 1600,
    height: 481,
    credit: "Travis K. Witt · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-21",
  readingMinutes: 12,
  tags: ["Texas national cemeteries", "Fort Sam Houston National Cemetery", "Houston National Cemetery", "Dallas-Fort Worth National Cemetery", "Texas veterans", "military cemeteries", "Medal of Honor", "Texas military history"],
  featured: true,
  sourceName: "U.S. Department of Veterans Affairs — National Cemetery Administration",
  sourceUrl: "https://www.cem.va.gov/find-cemetery/state.asp?STATE=TX",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["fort-sam-houston-national-cemetery", "houston-national-cemetery", "dallas-fort-worth-national-cemetery", "texas-military-forces-museum"],
};

const texasHomeownerFieldManualStub: Article = {
  id: "evergreen-texas-homeowner-field-manual",
  brandId: "texasdefined",
  slug: "texas-homeowner-field-manual",
  title: "The Texas Homeowner Field Manual: Weather, Utilities, Insurance, Wildlife and the Systems That Matter",
  dek: "A practical operating manual for owning a house in Texas: storms, freezes, foundations, roofs, electricity, insurance, water, pools, pests, wildlife, school districts, emergency records and the annual maintenance rhythm that ties them together.",
  category: "home-garden",
  hero: {
    src: "https://images.unsplash.com/photo-1768941124710-1a42b3195208?auto=format&fit=crop&w=1600&h=1067&q=82",
    alt: "Brick and stucco suburban home exterior with a green lawn and walkway",
    width: 1600,
    height: 1067,
    credit: "Kellen Riggin · Unsplash",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 19,
  tags: ["texas homeowner guide", "texas home maintenance", "texas weather", "texas insurance", "texas electricity", "texas wildlife", "texas foundation", "texas roof", "moving to texas"],
  featured: true,
  sourceName: "Texas Department of Insurance",
  sourceUrl: "https://www.tdi.texas.gov/consumer/homeowners.html",
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasHouseholdPestsGuideStub: Article = {
  id: "evergreen-texas-household-pests-guide",
  brandId: "texasdefined",
  slug: "texas-household-pests-guide",
  title: "Texas Household Pests: Termites, Fire Ants, Mosquitoes, Scorpions, Roaches and What to Do",
  dek: "A practical Texas homeowner guide to the pests that actually matter: how to recognize the problem, reduce the conditions that attract it, know when DIY prevention is reasonable and when a licensed professional or public-health response makes more sense.",
  category: "home-garden",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fire_ant_mound_(16371103174).jpg?width=1600",
    alt: "Red imported fire ant mound in a Texas research field",
    width: 1600,
    height: 1200,
    credit: "Alex Wild / University of Texas Insects Unlocked · CC0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 17,
  tags: ["texas pests", "texas termites", "fire ants texas", "texas mosquitoes", "texas scorpions", "texas roaches", "texas rodents", "pest control texas", "home and garden"],
  featured: true,
  sourceName: "Texas Department of Agriculture Structural Pest Control Service",
  sourceUrl: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Consumer-Information",
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasSepticSystemsHomeownerGuideStub: Article = {
  id: "evergreen-texas-septic-systems-homeowner-guide",
  brandId: "texasdefined",
  slug: "texas-septic-systems-homeowner-guide",
  title: "Texas Septic Systems: A Homeowner Guide to Conventional, Aerobic and OSSF Systems",
  dek: "A practical guide to owning, buying and maintaining a Texas home with an on-site sewage facility: permits, conventional and aerobic systems, maintenance contracts, alarms, drainfields, flooding, drought, records and the questions to ask before closing.",
  category: "home-garden",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Infiltrator_Quick4_leach_field_septic_system.jpg?width=1600",
    alt: "Residential septic tank and absorption-field chambers being installed",
    width: 1600,
    height: 1200,
    credit: "Raquel Baranow · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 16,
  tags: ["texas septic system", "texas ossf", "aerobic septic texas", "conventional septic texas", "septic maintenance", "rural texas home", "septic permit texas", "home and garden"],
  featured: true,
  sourceName: "Texas Commission on Environmental Quality",
  sourceUrl: "https://www.tceq.texas.gov/permitting/ossf/ossfhomeowners.html",
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

export const newestEvergreenArticles: Article[] = [
  ...seasonalIntentStubs,
  ...lighthouseSearchIntentStubs,
  ...lighthouseDeepDiveStubs,
  ...seasonalAuthorityArticleStubs,
  winklerCountyArticleStub,
  texasFlagHistoryStub,
  texasFlagEtiquetteStub,
  texasMilitaryMuseumsGuideStub,
  texasNationalCemeteriesGuideStub,
  texasHomeownerFieldManualStub,
  texasHouseholdPestsGuideStub,
  texasSepticSystemsHomeownerGuideStub,
];

const loaders: Record<string, () => Promise<Article>> = {
  "history-of-the-texas-flag": async () => (await import("./texas-flag-history")).texasFlagHistoryArticle,
  "texas-flag-etiquette-display-guide": async () => (await import("./texas-flag-etiquette")).texasFlagEtiquetteArticle,
  "texas-military-museums-historic-sites-guide": async () => (await import("./texas-military-museums-historic-sites-guide")).texasMilitaryMuseumsHistoricSitesGuideArticle,
  "texas-national-cemeteries-guide": async () => (await import("./texas-national-cemeteries-guide")).texasNationalCemeteriesGuideArticle,
  "texas-homeowner-field-manual": async () => (await import("./texas-homeowner-field-manual")).texasHomeownerFieldManualArticle,
  "texas-household-pests-guide": async () => (await import("./texas-household-pests-guide")).texasHouseholdPestsGuideArticle,
  "texas-septic-systems-homeowner-guide": async () => (await import("./texas-septic-systems-homeowner-guide")).texasSepticSystemsHomeownerGuideArticle,
};

export async function loadNewestEvergreenArticle(brandId: string, slug: string) {
  if (brandId !== "texasdefined") return null;
  const intentArticle = await loadSeasonalIntentArticle(brandId, slug);
  if (intentArticle) return intentArticle;
  const lighthouseIntentArticle = await loadLighthouseSearchIntentArticle(brandId, slug);
  if (lighthouseIntentArticle) return lighthouseIntentArticle;
  const lighthouseArticle = await loadLighthouseDeepDiveArticle(brandId, slug);
  if (lighthouseArticle) return lighthouseArticle;
  const seasonalArticle = await loadSeasonalAuthorityArticle(brandId, slug);
  if (seasonalArticle) return seasonalArticle;
  const loader = loaders[slug];
  return loader ? loader() : null;
}
