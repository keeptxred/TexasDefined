import type { Article } from "../types";
import "./newest-evergreen-links";
import "./military-museum-links";
import "./seasonal-authority-links";
import { winklerCountyArticleStub } from "./winkler-county-article-stub";
import { seasonalAuthorityArticleStubs, loadSeasonalAuthorityArticle } from "./lazy-seasonal-authority";

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

export const newestEvergreenArticles: Article[] = [
  ...seasonalAuthorityArticleStubs,
  winklerCountyArticleStub,
  texasFlagHistoryStub,
  texasFlagEtiquetteStub,
  texasMilitaryMuseumsGuideStub,
];

const loaders: Record<string, () => Promise<Article>> = {
  "history-of-the-texas-flag": async () => (await import("./texas-flag-history")).texasFlagHistoryArticle,
  "texas-flag-etiquette-display-guide": async () => (await import("./texas-flag-etiquette")).texasFlagEtiquetteArticle,
  "texas-military-museums-historic-sites-guide": async () => (await import("./texas-military-museums-historic-sites-guide")).texasMilitaryMuseumsHistoricSitesGuideArticle,
};

export async function loadNewestEvergreenArticle(brandId: string, slug: string) {
  if (brandId !== "texasdefined") return null;
  const seasonalArticle = await loadSeasonalAuthorityArticle(brandId, slug);
  if (seasonalArticle) return seasonalArticle;
  const loader = loaders[slug];
  return loader ? loader() : null;
}
