import type { Article } from "./types";

type EvergreenPrimarySource = Readonly<{ name: string; url: string }>;

export const remoteEvergreenPrimarySourceFallbacks: Readonly<Record<string, EvergreenPrimarySource>> = {
  "sam-houston-texas-life-legacy": { name: "Handbook of Texas — Sam Houston", url: "https://www.tshaonline.org/handbook/entries/houston-sam" },
  "davy-crockett-texas-alamo-legend": { name: "The Alamo — David ‘Davy’ Crockett", url: "https://www.thealamo.org/remember/battle-and-revolution/defenders/david-davy-crockett" },
  "william-barret-travis-alamo-commander": { name: "Texas State Library and Archives Commission — Travis Letter", url: "https://www.tsl.texas.gov/travis-letter" },
  "james-bowie-texas-alamo-life-legend": { name: "Handbook of Texas — James Bowie", url: "https://www.tshaonline.org/handbook/entries/bowie-james" },
  "stephen-f-austin-father-of-texas": { name: "Texas State Library and Archives Commission — Stephen F. Austin", url: "https://www.tsl.texas.gov/lobbyexhibits/homefortexashistory/stephenfaustin" },
  "mirabeau-b-lamar-president-republic-texas": { name: "Handbook of Texas — Mirabeau Buonaparte Lamar", url: "https://www.tshaonline.org/handbook/entries/lamar-mirabeau-buonaparte" },
  "juan-seguin-tejano-texas-revolution": { name: "Handbook of Texas — Juan Nepomuceno Seguín", url: "https://www.tshaonline.org/handbook/entries/seguin-juan-nepomuceno" },
  "audie-murphy-texas-war-hero-actor": { name: "Arlington National Cemetery — Audie Murphy", url: "https://www.arlingtoncemetery.mil/Explore/Notable-Graves/Medal-of-Honor-Recipients/World-War-II-MoH-recipients/Audie-Murphy" },
  "chester-nimitz-texas-fleet-admiral": { name: "U.S. Naval History and Heritage Command — Fleet Admiral Chester W. Nimitz", url: "https://www.history.navy.mil/browse-by-topic/people/chiefs-of-naval-operations/fleet-admiral-chester-w--nimitz.html" },
  "chris-kyle-texas-navy-seal-life-legacy": { name: "Office of the Texas Governor — Texas Legislative Medal of Honor for Chris Kyle", url: "https://gov.texas.gov/news/post/governor_abbott_signs_resolution_posthumously_awarding_chris_kyle_the_texas" },
  "heb-texas-grocery-history-culture": { name: "H-E-B — About Us", url: "https://careers.heb.com/about-us" },
  "bucees-texas-road-trip-history": { name: "Buc-ee’s — About", url: "https://buc-ees.com/about/" },
  "king-ranch-texas-history-cattle-legacy": { name: "King Ranch — History", url: "https://king-ranch.com/about-us/history/" },
  "san-antonio-spurs-texas-basketball-culture": { name: "NBA — History of NBA champions", url: "https://www.nba.com/news/history-nba-champions" },
  "texas-high-school-football-friday-night-lights": { name: "University Interscholastic League — 100 Years of Football", url: "https://www.uiltexas.org/100/football" },
  "san-antonio-stock-show-rodeo-history-guide": { name: "San Antonio Stock Show & Rodeo — About", url: "https://www.sarodeo.com/p/about/about1" },
  "fort-worth-stockyards-history-cattle-culture": { name: "City of Fort Worth — Stockyards Historic District", url: "https://www.fortworthtexas.gov/departments/development-services/historic-preservation/historic-stockyards" },
  "blue-bell-ice-cream-brenham-texas-history": { name: "Blue Bell Creameries — About Us", url: "https://www.bluebell.com/about-us/" },
  "texas-oil-boom-wichita-falls-west-texas-rigs": { name: "Handbook of Texas — Oil and Gas Industry", url: "https://www.tshaonline.org/handbook/entries/oil-and-gas-industry" },
};

const SOURCES_HEADING = "Sources and further reading";

function hasSourcesSection(article: Article) {
  return article.body.some(
    (block) => block.type === "heading" && block.text.trim().toLowerCase() === SOURCES_HEADING.toLowerCase(),
  );
}

/**
 * Keeps the governed remote-evergreen cohort attributable even when optional
 * public remote reads are unavailable during server rendering. Existing
 * source metadata and richer source sections always win.
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
