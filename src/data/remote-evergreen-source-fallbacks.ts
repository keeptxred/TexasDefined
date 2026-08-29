import type { Article } from "./types";

type EvergreenPrimarySource = Readonly<{ name: string; url: string }>;

export const remoteEvergreenPrimarySourceFallbacks: Readonly<Record<string, EvergreenPrimarySource>> = {
  "audie-murphy-texas-war-hero-actor": { name: "Texas State Historical Association", url: "https://www.tshaonline.org/handbook/entries/murphy-audie-leon" },
  "blue-bell-ice-cream-brenham-texas-history": { name: "Blue Bell Creameries", url: "https://www.bluebell.com/about-us/" },
  "bucees-texas-road-trip-history": { name: "Buc-ee’s", url: "https://buc-ees.com/about/" },
  "chester-nimitz-texas-fleet-admiral": { name: "U.S. Naval History and Heritage Command", url: "https://www.history.navy.mil/browse-by-topic/people/chiefs-of-naval-operations/fleet-admiral-chester-w--nimitz.html" },
  "chris-kyle-texas-navy-seal-life-legacy": { name: "U.S. Navy", url: "https://www.navy.mil/Resources/Photo-Gallery/igphoto/2002439330/" },
  "davy-crockett-texas-alamo-legend": { name: "The Alamo", url: "https://www.thealamo.org/remember/battle-and-revolution/defenders/david-davy-crockett" },
  "fort-worth-stockyards-history-cattle-culture": { name: "Texas State Historical Association", url: "https://www.tshaonline.org/handbook/entries/fort-worth-stockyards" },
  "heb-texas-grocery-history-culture": { name: "H-E-B", url: "https://careers.heb.com/about-us" },
  "james-bowie-texas-alamo-life-legend": { name: "Texas State Historical Association", url: "https://www.tshaonline.org/handbook/entries/bowie-james" },
  "juan-seguin-tejano-texas-revolution": { name: "Texas State Historical Association", url: "https://www.tshaonline.org/handbook/entries/seguin-juan-nepomuceno" },
  "king-ranch-texas-history-cattle-legacy": { name: "King Ranch", url: "https://king-ranch.com/about-us/history/" },
  "mirabeau-b-lamar-president-republic-texas": { name: "Texas State Historical Association", url: "https://www.tshaonline.org/handbook/entries/lamar-mirabeau-buonaparte" },
  "sam-houston-texas-life-legacy": { name: "Texas State Historical Association", url: "https://www.tshaonline.org/handbook/entries/houston-sam" },
  "san-antonio-spurs-texas-basketball-culture": { name: "NBA", url: "https://www.nba.com/news/history-nba-champions" },
  "san-antonio-stock-show-rodeo-history-guide": { name: "San Antonio Stock Show & Rodeo", url: "https://www.sarodeo.com/p/about/about1" },
  "stephen-f-austin-father-of-texas": { name: "Texas State Library and Archives Commission", url: "https://www.tsl.texas.gov/lobbyexhibits/homefortexashistory/stephenfaustin" },
  "texas-high-school-football-friday-night-lights": { name: "University Interscholastic League", url: "https://www.uiltexas.org/100/football" },
  "texas-oil-boom-wichita-falls-west-texas-rigs": { name: "Texas State Historical Association", url: "https://www.tshaonline.org/handbook/entries/oil-and-gas-industry" },
  "william-barret-travis-alamo-commander": { name: "Texas State Library and Archives Commission", url: "https://www.tsl.texas.gov/travis-letter" },
};

const SOURCES_HEADING = "Sources and further reading";

function hasSourcesSection(article: Article) {
  return article.body.some((block) => block.type === "heading" && block.text.trim() === SOURCES_HEADING);
}

/**
 * Keeps the governed remote-evergreen cohort attributable when a local-first
 * article resolves but the optional public Supabase read is unavailable.
 * Richer source sections already present on an article are preserved.
 */
export function ensureRemoteEvergreenSourceFallback(article: Article): Article {
  const fallback = remoteEvergreenPrimarySourceFallbacks[article.slug];
  if (!fallback) return article;

  const sourceName = article.sourceName?.trim() || fallback.name;
  const sourceUrl = article.sourceUrl?.trim() || fallback.url;
  const body = hasSourcesSection(article)
    ? article.body
    : [
        ...article.body,
        { type: "heading" as const, text: SOURCES_HEADING },
        { type: "list" as const, items: [`${sourceName}: ${sourceUrl}`] },
      ];

  if (sourceName === article.sourceName && sourceUrl === article.sourceUrl && body === article.body) return article;
  return { ...article, sourceName, sourceUrl, body };
}
