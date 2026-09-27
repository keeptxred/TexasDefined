import { articleInternalLinks } from "../article-internal-links";
import type { Article } from "../types";

const caddoTexasHistoryStub: Article = {
  id: "evergreen-caddo-texas-history-homelands-mounds-removal", brandId: "texasdefined", slug: "caddo-texas-history-homelands-mounds-removal",
  title: "Caddo in Texas: Homelands, Mounds, Trade Networks and Removal",
  dek: "Follow ancestral Caddo mound centers and farming towns through diplomacy, El Camino Real, epidemic loss, forced removal and the living Caddo Nation.",
  category: "texas-history", region: "piney-woods",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/George_C._Davis_Site.jpg?width=1600", alt: "George C. Davis Site, now Caddo Mounds State Historic Site, in Cherokee County, Texas", width: 1824, height: 1368, credit: "Jon Roanhaus · CC BY-SA 3.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-09-27", updatedAt: "2026-09-27", readingMinutes: 14,
  tags: ["Caddo history", "Caddo Mounds", "East Texas history", "El Camino Real", "Native Texas", "Caddo Nation"], featured: true,
  sourceName: "Caddo Nation — History", sourceUrl: "https://mycaddonation.com/history-1",
  body: [], relatedCollections: [], relatedDestinations: ["caddo-mounds-state-historic-site", "mission-dolores"],
};

const comancheTexasHistoryStub: Article = {
  id: "evergreen-comanche-texas-history-comancheria-red-river-war", brandId: "texasdefined", slug: "comanche-texas-history-comancheria-red-river-war",
  title: "Comanche Texas: Comanchería, Horses, Trade and the Red River War",
  dek: "Follow the rise of Comanche power, horses and bison, diplomacy and trade, Texas settlement, the Red River War and the living Comanche Nation.",
  category: "texas-history", region: "panhandle-plains",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Quanah_Parker%2C_a_Kwahadi_Comanche_chief%2C_full-length%2C_standing_in_front_of_tent_-_NARA_-_530911.jpg?width=1600", alt: "Quanah Parker, a Kwahadi Comanche leader, standing in front of a tipi", width: 1666, height: 3000, credit: "U.S. National Archives · NARA 530911 · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-09-27", updatedAt: "2026-09-27", readingMinutes: 15,
  tags: ["Comanche history", "Comancheria", "Red River War", "Quanah Parker", "Native Texas", "Comanche Nation"], featured: true,
  sourceName: "Comanche Nation — History", sourceUrl: "https://www.comanchenation.com/about/page/history",
  body: [], relatedCollections: [], relatedDestinations: ["fort-griffin", "palo-duro-canyon-state-park", "goodnight-ranch", "fort-davis-national-historic-site"],
};

const livingTribalNationsTexasStub: Article = {
  id: "evergreen-living-tribal-nations-texas-today", brandId: "texasdefined", slug: "living-tribal-nations-texas-today",
  title: "Tribal Nations in Texas Today: Sovereignty, Communities and Living Culture",
  dek: "Meet the Alabama-Coushatta Tribe of Texas, Ysleta del Sur Pueblo and the Kickapoo Traditional Tribe of Texas through their own governments and institutions.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tigua_dancers_at_the_Ysleta_Art_Market_June_29%2C_2022.jpg?width=1600", alt: "Tigua dancers at the Ysleta Art Market in El Paso in 2022", width: 4000, height: 3000, credit: "Susan Barnum · 2022 · CC BY-SA 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-09-27", updatedAt: "2026-09-27", readingMinutes: 13,
  tags: ["tribal nations Texas", "Alabama-Coushatta", "Ysleta del Sur Pueblo", "Kickapoo Traditional Tribe of Texas", "Native Texas", "tribal sovereignty"], featured: true,
  sourceName: "Ysleta del Sur Pueblo — About Us", sourceUrl: "https://www.ysletadelsurpueblo.org/about-us",
  body: [], relatedCollections: [], relatedDestinations: ["ysleta-del-sur-pueblo-cultural-center-museum-el-paso"],
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

const indigenousTexasAuthorityLink = {
  href: "/article/indigenous-texas-history-native-nations",
  label: "Indigenous Texas history: Native nations before European colonization",
  description: "Start with the statewide Indigenous history framework before reading colonial, frontier and military chapters.",
};
const caddoTexasAuthorityLink = {
  href: "/article/caddo-texas-history-homelands-mounds-removal",
  label: "Caddo in Texas",
  description: "Go deeper on East Texas homelands, mound centers, trade networks, colonial diplomacy and forced removal.",
};
const comancheTexasAuthorityLink = {
  href: "/article/comanche-texas-history-comancheria-red-river-war",
  label: "Comanche Texas and Comanchería",
  description: "Place the frontier and Red River War inside the longer story of Comanche power, trade, horses, bison and sovereignty.",
};
const livingTribalNationsAuthorityLink = {
  href: "/article/living-tribal-nations-texas-today",
  label: "Tribal nations in Texas today",
  description: "Meet the three federally recognized tribal nations based in Texas through their own governments and institutions.",
};

for (const slug of ["spanish-texas-military-battle-medina", "mexican-texas-military-history", "texas-borderlands-historic-sites-guide", "texas-red-river-war-guide", "texas-frontier-forts-road-trip"]) {
  const existing = articleInternalLinks[slug] ?? [];
  if (!existing.some((link) => link.href === indigenousTexasAuthorityLink.href)) articleInternalLinks[slug] = [indigenousTexasAuthorityLink, ...existing];
}
for (const slug of ["spanish-texas-military-battle-medina", "texas-borderlands-historic-sites-guide"]) {
  const existing = articleInternalLinks[slug] ?? [];
  if (!existing.some((link) => link.href === caddoTexasAuthorityLink.href)) articleInternalLinks[slug] = [caddoTexasAuthorityLink, ...existing];
}
for (const slug of ["texas-red-river-war-guide", "texas-frontier-forts-road-trip"]) {
  const existing = articleInternalLinks[slug] ?? [];
  if (!existing.some((link) => link.href === comancheTexasAuthorityLink.href)) articleInternalLinks[slug] = [comancheTexasAuthorityLink, ...existing];
}
for (const slug of ["texas-borderlands-historic-sites-guide"]) {
  const existing = articleInternalLinks[slug] ?? [];
  if (!existing.some((link) => link.href === livingTribalNationsAuthorityLink.href)) articleInternalLinks[slug] = [livingTribalNationsAuthorityLink, ...existing];
}

export const historicSupportingStubs: Article[] = [
  indigenousTexasHistoryNativeNationsStub,
  caddoTexasHistoryStub,
  comancheTexasHistoryStub,
  livingTribalNationsTexasStub,
  texasBeforeUnitedStatesStub,
  texasCattleRanchingHistoryGuideStub,
  texasHistoricTravelTransportationGuideStub,
];

export async function loadHistoricSupportingArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;
  if (slug === caddoTexasHistoryStub.slug) return import("./caddo-texas-history-homelands-mounds-removal").then((module) => module.caddoTexasHistoryHomelandsMoundsRemovalArticle);
  if (slug === comancheTexasHistoryStub.slug) return import("./comanche-texas-history-comancheria-red-river-war").then((module) => module.comancheTexasHistoryComancheriaRedRiverWarArticle);
  if (slug === livingTribalNationsTexasStub.slug) return import("./living-tribal-nations-texas-today").then((module) => module.livingTribalNationsTexasTodayArticle);
  if (slug === indigenousTexasHistoryNativeNationsStub.slug) return import("./indigenous-texas-history-native-nations").then((module) => module.indigenousTexasHistoryNativeNationsArticle);
  if (slug === texasBeforeUnitedStatesStub.slug) return import("./texas-before-united-states-how-texas-began").then((module) => module.texasBeforeUnitedStatesArticle);
  if (slug === texasCattleRanchingHistoryGuideStub.slug) return import("./texas-cattle-ranching-history-guide").then((module) => module.texasCattleRanchingHistoryGuideArticle);
  if (slug === texasHistoricTravelTransportationGuideStub.slug) return import("./texas-historic-travel-transportation-guide").then((module) => module.texasHistoricTravelTransportationGuideArticle);
  return null;
}
