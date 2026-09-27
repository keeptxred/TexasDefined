import { articleInternalLinks } from "../article-internal-links";
import type { Article } from "../types";

const nativeNationsTexasTodayStub: Article = {
  id: "evergreen-native-nations-texas-today",
  brandId: "texasdefined",
  slug: "native-nations-texas-today",
  title: "Native Nations in Texas Today: Tribal Governments, Reservations and Living Communities",
  dek: "Texas has three federally recognized tribal nations located in the state, while dozens of other federally recognized tribes maintain historical and cultural connections to Texas.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Alabama_Coushatta_Tribe_-_panoramio.jpg?width=1600",
    alt: "Welcome sign at the Alabama-Coushatta Tribe of Texas reservation in Polk County",
    width: 3328,
    height: 2168,
    credit: "Lance L Lowry · CC BY 3.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-26",
  updatedAt: "2026-09-26",
  readingMinutes: 13,
  tags: ["Native nations Texas", "tribes in Texas", "Alabama-Coushatta Tribe of Texas", "Kickapoo Traditional Tribe of Texas", "Ysleta del Sur Pueblo", "tribal sovereignty", "Texas reservations", "Indigenous Texas"],
  featured: true,
  sourceName: "Texas Historical Commission — Tribal Consultation Guidelines",
  sourceUrl: "https://thc.texas.gov/review/consultation-process/tribal-consultation-guidelines",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["ysleta-del-sur-pueblo-cultural-center-museum-el-paso", "caddo-mounds-state-historic-site", "hueco-tanks-state-park-and-historic-site", "mission-dolores", "lipantitlan"],
};

const indigenousTexasHistoryNativeNationsStub: Article = {
  id: "evergreen-indigenous-texas-history-native-nations",
  brandId: "texasdefined",
  slug: "indigenous-texas-history-native-nations",
  title: "Indigenous Texas History: Native Nations Before European Colonization",
  dek: "Texas history begins thousands of years before Spanish maps or the Republic. Follow Native peoples, homelands, trade networks and living nations across the region before and after European colonization.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Grass_House_Caddo_Mounds_SHS_Texas_2026.jpg?width=1600",
    alt: "Replica Caddo grass house at Caddo Mounds State Historic Site in Cherokee County, Texas",
    width: 3001,
    height: 2000,
    credit: "Larry D. Moore · 2026 · CC BY 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-26",
  updatedAt: "2026-09-26",
  readingMinutes: 17,
  tags: ["Indigenous Texas", "Native American history Texas", "Caddo", "Karankawa", "Tonkawa", "Lipan Apache", "Comanche", "Tigua", "Alabama-Coushatta", "Kickapoo", "Texas archaeology"],
  featured: true,
  sourceName: "Texas Historical Commission — Indigenous Texas and Exploration",
  sourceUrl: "https://learning.thc.texas.gov/texas-history/indigenous-texas/",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["caddo-mounds-state-historic-site", "hueco-tanks-state-park-and-historic-site", "ysleta-del-sur-pueblo-cultural-center-museum-el-paso", "lipantitlan", "mission-dolores"],
};

const texasBeforeUnitedStatesStub: Article = {
  id: "evergreen-texas-before-united-states-how-texas-began",
  brandId: "texasdefined",
  slug: "texas-before-united-states-how-texas-began",
  title: "Texas Before the United States: How Texas Began",
  dek: "Texas did not begin as a U.S. state—or even with the Republic. Follow Indigenous Texas, Spanish and French incursions, Mexican Texas, the Revolution, the independent Republic and the long road to statehood.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lee_Map_of_Texas_1836_UTA.jpg?width=1600",
    alt: "Edmund Francis Lee's 1836 map of Texas showing grants, settlements, rivers and neighboring territory",
    width: 1600,
    height: 2396,
    credit: "Edmund Francis Lee · 1836 · UTA Libraries Special Collections · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-26",
  updatedAt: "2026-09-26",
  readingMinutes: 18,
  tags: ["Texas history", "Texas before statehood", "Indigenous Texas", "Spanish Texas", "Mexican Texas", "Texas Revolution", "Republic of Texas", "Texas annexation", "Texas statehood"],
  featured: true,
  sourceName: "Texas Historical Commission — Indigenous Texas and Exploration",
  sourceUrl: "https://learning.thc.texas.gov/texas-history/indigenous-texas/",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["san-antonio-missions-national-historical-park", "the-alamo", "presidio-la-bahia", "san-felipe-de-austin", "washington-on-the-brazos", "san-jacinto-battleground"],
};

const texasCattleRanchingHistoryGuideStub: Article = {
  id: "evergreen-texas-cattle-ranching-history-guide",
  brandId: "texasdefined",
  slug: "texas-cattle-ranching-history-guide",
  title: "Texas Cattle History: Longhorns, Cattle Trails and Goodnight Ranch",
  dek: "Connect the Official State Longhorn Herd, Fort Griffin and Goodnight Ranch to the cattle drives, ranch businesses, trail towns and conservation stories that turned cattle into one of Texas' defining symbols.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Charles_Goodnight_Ranch_House.jpg?width=1600",
    alt: "Charles and Mary Ann Goodnight Ranch House in Armstrong County, Texas",
    width: 1600,
    height: 1200,
    credit: "Pi3.124 · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 14,
  tags: ["texas cattle history", "texas longhorns", "cattle trails", "goodnight ranch", "fort griffin", "charles goodnight", "texas ranching"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/state-historic-sites/official-state-texas-longhorn-herd/state-texas-longhorn-herd-history",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["official-texas-longhorn-herd", "fort-griffin", "goodnight-ranch"],
};

const texasHistoricTravelTransportationGuideStub: Article = {
  id: "evergreen-texas-historic-travel-transportation-guide",
  brandId: "texasdefined",
  slug: "texas-historic-travel-transportation-guide",
  title: "How Texans Traveled Before Highways: Stagecoach Inns, Wagon Roads and Harvey Houses",
  dek: "Use Fanthorp Inn, Landmark Inn and the Slaton Harvey House to follow Texas travel from stage roads and wagon freight to the railroad networks that transformed distance, lodging and food on the road.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/LandmarkInn_%281_of_1%29.jpg?width=1600",
    alt: "Landmark Inn in Castroville, Texas",
    width: 1600,
    height: 1031,
    credit: "Renelibrary · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 13,
  tags: ["texas transportation history", "stagecoach texas", "fanthorp inn", "landmark inn", "slaton harvey house", "texas railroads", "historic inns"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/state-historic-sites/fanthorp-inn/fanthorp-inn-history",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["fanthorp-inn", "landmark-inn", "slaton-harvey-house", "fort-lancaster"],
};

const texasBeforeUnitedStatesLink = {
  href: "/article/texas-before-united-states-how-texas-began",
  label: "Texas before the United States: how Texas began",
  description: "Start with the full chronology from Indigenous homelands and European empires through Mexican Texas, the Revolution, Republic and statehood.",
};

for (const slug of [
  "spanish-texas-military-battle-medina",
  "mexican-texas-military-history",
  "texas-revolution-historic-sites-road-trip",
  "republic-of-texas-government-trail",
  "republic-of-texas-navy-history",
  "history-of-the-texas-flag",
  "six-flags-over-texas-meaning",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  if (!existing.some((link) => link.href === texasBeforeUnitedStatesLink.href)) {
    articleInternalLinks[slug] = [texasBeforeUnitedStatesLink, ...existing];
  }
}

export const historicSupportingStubs: Article[] = [
  nativeNationsTexasTodayStub,
  indigenousTexasHistoryNativeNationsStub,
  texasBeforeUnitedStatesStub,
  texasCattleRanchingHistoryGuideStub,
  texasHistoricTravelTransportationGuideStub,
];

export async function loadHistoricSupportingArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;
  if (slug === nativeNationsTexasTodayStub.slug) return import("./native-nations-texas-today").then((module) => module.nativeNationsTexasTodayArticle);
  if (slug === indigenousTexasHistoryNativeNationsStub.slug) return import("./indigenous-texas-history-native-nations").then((module) => module.indigenousTexasHistoryNativeNationsArticle);
  if (slug === texasBeforeUnitedStatesStub.slug) return import("./texas-before-united-states-how-texas-began").then((module) => module.texasBeforeUnitedStatesArticle);
  if (slug === texasCattleRanchingHistoryGuideStub.slug) return import("./texas-cattle-ranching-history-guide").then((module) => module.texasCattleRanchingHistoryGuideArticle);
  if (slug === texasHistoricTravelTransportationGuideStub.slug) return import("./texas-historic-travel-transportation-guide").then((module) => module.texasHistoricTravelTransportationGuideArticle);
  return null;
}
