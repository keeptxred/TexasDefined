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
  "texas-military-history-timeline": [{ href: "/article/uss-texas-1895-original-battleship", label: "USS Texas (1895): Spanish–American War", description: "A detailed guide to the first ship, its naval architecture, Santiago battle, and San Marcos target-ship fate." }, visitorGuide, nationalCemeteryGuide],
  "texas-military-museums-historic-sites-guide": [{ href: "/article/uss-lexington-cv16-history-visitor-guide", label: "Complete USS Lexington (CV-16) guide", description: "The Blue Ghost, Pacific naval aviation, Corpus Christi museum, archival photographs and practical visitor details." }, nationalCemeteryGuide],
  "women-in-texas-military-history": [waspDestination, visitorGuide],
  "texas-medal-of-honor-heroes": [visitorGuide, nationalCemeteryGuide],
  "buffalo-soldiers-texas-frontier-guide": [visitorGuide],
  "texas-frontier-forts-road-trip": [visitorGuide],
  "texas-world-war-ii-bases-pow-camps": [waspDestination, silentWingsDestination, lexingtonDestination, visitorGuide, nationalCemeteryGuide],
  "texas-world-war-ii-historic-sites-guide": [waspDestination, silentWingsDestination, lexingtonDestination, visitorGuide, nationalCemeteryGuide],
  "texas-national-guard-history": [visitorGuide, nationalCemeteryGuide],
  "san-antonio-military-aviation-history": [waspDestination, silentWingsDestination, visitorGuide, nationalCemeteryGuide],
  "texas-cold-war-military-history": [visitorGuide, nationalCemeteryGuide],
  "texas-recent-wars-military-history": [visitorGuide, nationalCemeteryGuide],
  "uss-lexington-cv16-history-visitor-guide": [
    { href: "/article/battleship-texas-bb-35-history-restoration", label: "Battleship Texas (BB-35)", description: "Contrast carrier aircraft with battleship gunfire and current Galveston restoration." },
    { href: "/article/uss-texas-1895-original-battleship", label: "First USS Texas (1895)", description: "Compare the original U.S. Navy battleship with the aircraft carrier preserved at Corpus Christi." },
    visitorGuide,
  ],
    "battleship-texas-bb-35-history-restoration": [lexingtonDestination, visitorGuide],
  "uss-texas-1895-original-battleship": [lexingtonDestination, visitorGuide],
  "republic-of-texas-navy-history": [{ href: "/article/uss-texas-1895-original-battleship", label: "The first U.S. Navy battleship Texas", description: "Continue from the Republic’s separate navy to the Spanish–American War and USS San Marcos." }],
  "texas-world-war-i-history-guide": [{ href: "/article/uss-texas-1895-original-battleship", label: "The first Texas, before World War I", description: "Learn why the pre-dreadnought original Texas did not serve in the First World War." }],
};

for (const [slug, additions] of Object.entries(additionsBySlug)) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...additions.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}
