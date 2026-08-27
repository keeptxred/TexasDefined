import type { ArticleInternalLink } from "./types";

const iconsHub: ArticleInternalLink = {
  href: "/texas-icons",
  label: "Explore 250 Texas icons",
  description: "Browse TexasDefined's canonical directory of influential Texans, institutions, places, brands and cultural symbols.",
};

const historyHub: ArticleInternalLink = {
  href: "/texas-history",
  label: "Explore Texas history",
  description: "Continue through TexasDefined's broader history guides, historic places and people who shaped the state.",
};

const historyLinks: Record<string, ArticleInternalLink[]> = {
  "sam-houston-texas-life-legacy": [
    { href: "/article/stephen-f-austin-father-of-texas", label: "Stephen F. Austin and the settlement era", description: "Compare Houston's revolutionary and political career with the empresario most closely associated with Anglo-American settlement in Mexican Texas." },
    { href: "/article/mirabeau-b-lamar-president-republic-texas", label: "Mirabeau B. Lamar's rival vision", description: "See how the Republic's second president differed sharply from Houston on expansion, Native policy and the future of Texas." },
    { href: "/article/juan-seguin-tejano-texas-revolution", label: "Juan Seguín and the Tejano revolutionaries", description: "Add the Tejano military and political experience to the Texas Revolution story." },
    historyHub,
    iconsHub,
  ],
  "davy-crockett-texas-alamo-legend": [
    { href: "/article/william-barret-travis-alamo-commander", label: "William Barret Travis at the Alamo", description: "Read the documented story of the Alamo commander and his famous appeal for reinforcements." },
    { href: "/article/james-bowie-texas-alamo-life-legend", label: "James Bowie: life, legend and controversy", description: "Separate the historical Bowie from the frontier mythology that grew around him." },
    { href: "/destination/the-alamo", label: "Visit the Alamo authority guide", description: "Connect the biography to TexasDefined's canonical guide to the historic site in San Antonio." },
    historyHub,
    iconsHub,
  ],
  "william-barret-travis-alamo-commander": [
    { href: "/article/davy-crockett-texas-alamo-legend", label: "Davy Crockett at the Alamo", description: "Follow the former Tennessee congressman from national celebrity to the Texas Revolution." },
    { href: "/article/james-bowie-texas-alamo-life-legend", label: "James Bowie and the Alamo", description: "Compare Travis's command role with Bowie's frontier career and place in the siege." },
    { href: "/destination/the-alamo", label: "The Alamo historic-site guide", description: "Put Travis's story back into the surviving mission complex and modern visitor site." },
    historyHub,
    iconsHub,
  ],
  "james-bowie-texas-alamo-life-legend": [
    { href: "/article/william-barret-travis-alamo-commander", label: "William Barret Travis and Alamo command", description: "See how Travis's role developed during the final defense of the Alamo." },
    { href: "/article/davy-crockett-texas-alamo-legend", label: "Davy Crockett: frontier celebrity and defender", description: "Compare Bowie's mythology with another Alamo defender whose legend often exceeds the surviving evidence." },
    { href: "/destination/the-alamo", label: "Explore the Alamo", description: "Use the canonical destination guide for the site, its history and visitor context." },
    historyHub,
    iconsHub,
  ],
  "stephen-f-austin-father-of-texas": [
    { href: "/article/sam-houston-texas-life-legacy", label: "Sam Houston's Texas career", description: "Continue from settlement-era Texas into revolution, the Republic and state politics." },
    { href: "/article/juan-seguin-tejano-texas-revolution", label: "Juan Seguín and Tejano Texas", description: "Balance the Anglo settlement story with a leading Tejano participant in independence and early Texas politics." },
    { href: "/article/mirabeau-b-lamar-president-republic-texas", label: "Mirabeau B. Lamar and the Republic", description: "See the competing policy choices that emerged after independence." },
    historyHub,
    iconsHub,
  ],
  "mirabeau-b-lamar-president-republic-texas": [
    { href: "/article/sam-houston-texas-life-legacy", label: "Sam Houston and the competing Republic vision", description: "Compare Lamar's presidency with the leader whose policies he frequently opposed." },
    { href: "/article/juan-seguin-tejano-texas-revolution", label: "Juan Seguín in the Republic era", description: "Follow how revolutionary unity fractured for some Tejano leaders after independence." },
    { href: "/article/stephen-f-austin-father-of-texas", label: "Stephen F. Austin before the Republic", description: "Trace the settlement and diplomatic era that preceded Lamar's presidency." },
    historyHub,
    iconsHub,
  ],
  "juan-seguin-tejano-texas-revolution": [
    { href: "/article/sam-houston-texas-life-legacy", label: "Sam Houston and the Texas Revolution", description: "Connect Seguín's service with the larger revolutionary command and political story." },
    { href: "/article/stephen-f-austin-father-of-texas", label: "Stephen F. Austin and Mexican Texas", description: "Understand the settlement and political tensions that preceded the revolution." },
    { href: "/destination/the-alamo", label: "The Alamo historic-site guide", description: "Connect Seguín's wartime experience to San Antonio and the Alamo campaign." },
    historyHub,
    iconsHub,
  ],
};

const militaryLinks: Record<string, ArticleInternalLink[]> = {
  "audie-murphy-texas-war-hero-actor": [
    { href: "/article/chester-nimitz-texas-fleet-admiral", label: "Fleet Admiral Chester W. Nimitz", description: "Read the story of another Texas-born military figure whose service shaped World War II." },
    { href: "/article/chris-kyle-texas-navy-seal-life-legacy", label: "Chris Kyle: service, fame and legacy", description: "Compare two very different eras of Texas military service and public memory." },
    { href: "/texas-history", label: "Texas military history", description: "Explore the broader wars, installations, museums and service traditions connected to Texas." },
    iconsHub,
  ],
  "chester-nimitz-texas-fleet-admiral": [
    { href: "/article/audie-murphy-texas-war-hero-actor", label: "Audie Murphy and World War II", description: "Pair the Pacific command story with one of the war's best-known Texas soldiers." },
    { href: "/article/chris-kyle-texas-navy-seal-life-legacy", label: "Chris Kyle and modern special operations", description: "Continue into a much later era of American military service and public memory." },
    { href: "/texas-history", label: "Explore Texas military history", description: "Find more Texas military sites, people and historical context." },
    iconsHub,
  ],
  "chris-kyle-texas-navy-seal-life-legacy": [
    { href: "/article/audie-murphy-texas-war-hero-actor", label: "Audie Murphy: soldier and public figure", description: "Compare how military service, celebrity and memory intersected in another Texas life." },
    { href: "/article/chester-nimitz-texas-fleet-admiral", label: "Chester Nimitz and the Pacific War", description: "Move from modern special operations to a Texas admiral who led Allied naval strategy in World War II." },
    { href: "/texas-history", label: "Texas military history", description: "Explore the wider military history collection and historic sites." },
    iconsHub,
  ],
};

const cultureLinks: Record<string, ArticleInternalLink[]> = {
  "heb-texas-grocery-history-culture": [
    { href: "/texas-brand-origin-stories", label: "Texas brand origin stories", description: "See how H-E-B fits alongside Whataburger, Blue Bell, Shiner, Dickies and Buc-ee's in Texas cultural identity." },
    { href: "/article/bucees-texas-road-trip-history", label: "How Buc-ee's became a road-trip ritual", description: "Compare two Texas retailers that became cultural institutions through very different everyday routines." },
    { href: "/article/blue-bell-ice-cream-brenham-texas-history", label: "Blue Bell and Brenham", description: "Follow another place-based Texas brand from local business to statewide identity." },
    iconsHub,
  ],
  "bucees-texas-road-trip-history": [
    { href: "/texas-brand-origin-stories", label: "Texas brand origin stories", description: "Place Buc-ee's in the larger story of Texas companies that became cultural shorthand." },
    { href: "/article/heb-texas-grocery-history-culture", label: "H-E-B and Texas civic identity", description: "Compare the highway-stop phenomenon with a grocery chain embedded in everyday community life." },
    { href: "/texas-roadside-oddities", label: "Texas roadside culture", description: "Keep exploring the attractions, stops and visual landmarks that make long Texas drives distinctive." },
    iconsHub,
  ],
  "king-ranch-texas-history-cattle-legacy": [
    { href: "/article/texas-oil-boom-wichita-falls-west-texas-rigs", label: "How oil reshaped Texas", description: "Compare the cattle economy with the energy booms that transformed land, labor and wealth across Texas." },
    { href: "/texas-history", label: "Texas ranching and settlement history", description: "Place King Ranch in the wider history of South Texas, livestock, land and migration." },
    iconsHub,
  ],
  "texas-oil-boom-wichita-falls-west-texas-rigs": [
    { href: "/article/king-ranch-texas-history-cattle-legacy", label: "King Ranch and the cattle economy", description: "Compare two industries that became enduring symbols of Texas land and enterprise." },
    { href: "/texas-history", label: "Texas economic history", description: "Continue through the historical forces that shaped the state's regions, cities and industries." },
    iconsHub,
  ],
  "san-antonio-spurs-texas-basketball-culture": [
    { href: "/article/texas-high-school-football-friday-night-lights", label: "Why high school football matters in Texas", description: "Compare a major-league championship culture with the local Friday-night tradition found across the state." },
    { href: "/sports", label: "Texas sports", description: "Explore more teams, venues and sports culture across Texas." },
    iconsHub,
  ],
  "texas-high-school-football-friday-night-lights": [
    { href: "/article/san-antonio-spurs-texas-basketball-culture", label: "The San Antonio Spurs and team-first culture", description: "Move from school-level Friday nights to one of Texas's most successful professional franchises." },
    { href: "/sports", label: "Explore Texas sports", description: "Browse teams, venues and sports culture around the state." },
    iconsHub,
  ],
  "san-antonio-stock-show-rodeo-history-guide": [
    { href: "/article/fort-worth-stockyards-history-cattle-culture", label: "Fort Worth Stockyards and cattle culture", description: "Connect the modern stock show and rodeo tradition with the historic livestock district that helped define Cowtown." },
    { href: "/article/king-ranch-texas-history-cattle-legacy", label: "King Ranch and modern ranching", description: "Follow the livestock story south into one of the most influential ranching enterprises in Texas history." },
    { href: "/texas-history", label: "Texas western heritage", description: "Explore the broader ranching, livestock and western-history collection." },
    iconsHub,
  ],
  "fort-worth-stockyards-history-cattle-culture": [
    { href: "/article/san-antonio-stock-show-rodeo-history-guide", label: "San Antonio Stock Show & Rodeo", description: "See how livestock culture continues through a major modern stock show, rodeo and scholarship institution." },
    { href: "/article/king-ranch-texas-history-cattle-legacy", label: "King Ranch and Texas cattle history", description: "Connect Fort Worth's livestock market with the ranching systems that supplied cattle across the state." },
    { href: "/texas-history", label: "Explore Texas western history", description: "Continue through ranching, cattle drives, towns and historic sites." },
    iconsHub,
  ],
  "blue-bell-ice-cream-brenham-texas-history": [
    { href: "/texas-brand-origin-stories", label: "Texas brand origin stories", description: "See Blue Bell alongside other Texas companies whose hometown origins became part of the brand itself." },
    { href: "/article/heb-texas-grocery-history-culture", label: "H-E-B and everyday Texas identity", description: "Compare two brands whose cultural status grew from repeated everyday use across Texas." },
    { href: "/things-unique-to-texas/texas-brands", label: "Legendary Texas brands", description: "Browse the larger TexasDefined brand and cultural-institution index." },
    iconsHub,
  ],
};

export const remoteEvergreenInternalLinks: Readonly<Record<string, readonly ArticleInternalLink[]>> = {
  ...historyLinks,
  ...militaryLinks,
  ...cultureLinks,
};
