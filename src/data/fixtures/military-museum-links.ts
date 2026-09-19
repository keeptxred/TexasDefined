import { articleInternalLinks } from "../article-internal-links";

const visitorGuide = {
  href: "/article/texas-military-museums-historic-sites-guide",
  label: "Texas military museums & historic sites",
  description: "Turn the statewide military chronology into visits to ships, aviation museums, battlefields, frontier forts and Camp Mabry.",
};

const nationalCemeteryGuide = {
  href: "/article/texas-national-cemeteries-guide",
  label: "Texas national cemeteries",
  description: "Connect Fort Sam Houston, Houston and Dallas–Fort Worth national cemeteries with veteran stories, visitor information and Texas military memory.",
};

const medalHonorMuseumDestination = {
  href: "/destination/national-medal-of-honor-museum",
  label: "Visit the National Medal of Honor Museum",
  description: "Continue the Medal of Honor story at the national museum in Arlington, with immersive recipient stories and current visitor planning.",
};

const waspDestination = {
  href: "/destination/national-wasp-wwii-museum-sweetwater",
  label: "Visit the National WASP WWII Museum",
  description: "See the WASP story at Avenger Field in Sweetwater, the principal wartime training base for the program.",
};

const silentWingsDestination = {
  href: "/destination/silent-wings-museum-lubbock",
  label: "Visit Silent Wings Museum",
  description: "See the World War II military-glider story at the former South Plains Army Air Field in Lubbock.",
};

const lexingtonDestination = {
  href: "/destination/uss-lexington-museum-corpus-christi",
  label: "Visit USS Lexington",
  description: "Walk the flight and hangar decks of the World War II Essex-class aircraft carrier preserved in Corpus Christi.",
};

const additionsBySlug: Record<string, Array<{ href: string; label: string; description: string }>> = {
  "texas-military-history-timeline": [visitorGuide, nationalCemeteryGuide, medalHonorMuseumDestination],
  "texas-military-museums-historic-sites-guide": [nationalCemeteryGuide, medalHonorMuseumDestination],
  "women-in-texas-military-history": [waspDestination, visitorGuide],
  "texas-medal-of-honor-heroes": [visitorGuide, nationalCemeteryGuide, medalHonorMuseumDestination],
  "buffalo-soldiers-texas-frontier-guide": [visitorGuide],
  "texas-frontier-forts-road-trip": [visitorGuide],
  "texas-world-war-ii-bases-pow-camps": [waspDestination, silentWingsDestination, lexingtonDestination, visitorGuide, nationalCemeteryGuide],
  "texas-world-war-ii-historic-sites-guide": [waspDestination, silentWingsDestination, lexingtonDestination, visitorGuide, nationalCemeteryGuide],
  "texas-national-guard-history": [visitorGuide, nationalCemeteryGuide],
  "san-antonio-military-aviation-history": [waspDestination, silentWingsDestination, visitorGuide, nationalCemeteryGuide],
  "texas-cold-war-military-history": [visitorGuide, nationalCemeteryGuide],
  "texas-recent-wars-military-history": [visitorGuide, nationalCemeteryGuide, medalHonorMuseumDestination],
  "battleship-texas-bb-35-history-restoration": [lexingtonDestination, visitorGuide],
};

for (const [slug, additions] of Object.entries(additionsBySlug)) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...additions.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}
