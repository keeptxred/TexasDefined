import { articleInternalLinks } from "../article-internal-links";
import type { Article } from "../types";

const texasUsMexicanWarPaloAltoGuideStub: Article = {
  id: "evergreen-texas-us-mexican-war-palo-alto-guide", brandId: "texasdefined", slug: "texas-us-mexican-war-palo-alto-guide",
  title: "Texas and the U.S.–Mexican War: Palo Alto, the Rio Grande and the Border That Changed a Continent",
  dek: "The first major battles of the U.S.–Mexican War were fought near Brownsville. This guide connects annexation, the disputed border, Palo Alto, Resaca de la Palma, Texas Rangers, the Treaty of Guadalupe Hidalgo and the war's lasting consequences.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nebel_Mexican_War_01_Battle_of_Palo_Alto.jpg?width=1600", alt: "1851 hand-colored lithograph depicting the Battle of Palo Alto near Brownsville", width: 5066, height: 3797, credit: "Adolphe Jean-Baptiste Bayot after Carl Nebel · 1851 · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 16,
  tags: ["u.s.-mexican war", "mexican-american war", "palo alto", "resaca de la palma", "brownsville history", "texas military history", "rio grande", "treaty of guadalupe hidalgo"], featured: true,
  sourceName: "National Park Service", sourceUrl: "https://www.nps.gov/paal/learn/historyculture/index.htm",
  body: [], relatedCollections: [], relatedDestinations: ["palo-alto-battlefield-national-historical-park", "palmito-ranch-battlefield", "port-isabel-lighthouse"],
};

const texasNationalGuardHistoryStub: Article = {
  id: "evergreen-texas-national-guard-history", brandId: "texasdefined", slug: "texas-national-guard-history",
  title: "Texas National Guard History: From Militia Companies to the Modern Guard",
  dek: "Texas citizen-soldier traditions stretch from colonial-era militia and the Republic through Camp Mabry, the 36th Infantry Division, border mobilizations, world wars, disaster response and post-9/11 deployments.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Guardsmen_respond_to_South_Central_Texas_Floods_160602-Z-XX123-475.jpg?width=1600", alt: "Texas National Guard members responding to South Central Texas flooding", width: 4524, height: 3024, credit: "Staff Sgt. Timothy Pruitt / Texas Military Department · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 15,
  tags: ["texas national guard", "camp mabry", "36th infantry division", "texas military department", "texas state guard", "texas military history", "citizen soldiers"], featured: true,
  sourceName: "Texas Military Department", sourceUrl: "https://tmd.texas.gov/texas-military-department-history",
  body: [], relatedCollections: [], relatedDestinations: ["texas-military-forces-museum", "fort-griffin", "fort-mckavett", "national-museum-pacific-war"],
};

const sanAntonioMilitaryAviationHistoryStub: Article = {
  id: "evergreen-san-antonio-military-aviation-history", brandId: "texasdefined", slug: "san-antonio-military-aviation-history",
  title: "Why San Antonio Became a Military Aviation Capital",
  dek: "Kelly Field, Brooks Field, Randolph, Lackland and Fort Sam Houston turned San Antonio into one of the most important military training and aviation centers in the United States.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/U.S._soldiers_getting_library_books_from_truck,_Kelly_Field_Library_LCCN92510822.jpg?width=1600", alt: "U.S. soldiers at Kelly Field in San Antonio in 1917 receiving library books from a truck", width: 4096, height: 3288, credit: "National Photo Company Collection / Library of Congress · 1917 · No known restrictions · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 15,
  tags: ["san antonio military history", "kelly field", "randolph field", "lackland air force base", "brooks field", "military aviation", "joint base san antonio", "texas aviation history"], featured: true,
  sourceName: "Joint Base San Antonio", sourceUrl: "https://www.jbsa.mil/Information/JBSA-History-Fact-Sheets/",
  body: [], relatedCollections: [], relatedDestinations: ["the-alamo", "san-antonio-missions-national-historical-park", "casa-navarro"],
};

const texasWorldWarIIBasesPowCampsStub: Article = {
  id: "evergreen-texas-world-war-ii-bases-pow-camps", brandId: "texasdefined", slug: "texas-world-war-ii-bases-pow-camps",
  title: "Texas in World War II: The Bases, Training Camps and POW Camps That Remade the State",
  dek: "World War II turned Texas into a giant military training ground. Camps, airfields, depots and prisoner-of-war facilities reshaped towns, transportation, labor markets and postwar growth across the state.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/If_you_talk_too_much,_this_man_may_die.jpg?width=1600", alt: "A 1943 Camp Hood soldier looking into a mirror beside a wartime security warning", width: 3691, height: 4672, credit: "Library of Congress · Camp Hood, Texas, 1943 · No known copyright restrictions · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 17,
  tags: ["texas world war ii", "texas military bases", "texas pow camps", "camp hood", "camp swift", "camp wolters", "camp bowie", "world war ii home front"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/learn/military-history/texas-world-war-ii",
  body: [], relatedCollections: [], relatedDestinations: ["eisenhower-birthplace", "national-museum-pacific-war", "iwo-jima-museum-monument", "slaton-harvey-house"],
};

const supplementalLinks: Record<string, Array<{ href: string; label: string; description: string }>> = {
  "texas-us-mexican-war-palo-alto-guide": [
    { href: "/destination/palo-alto-battlefield-national-historical-park", label: "Visit Palo Alto Battlefield", description: "Open the Trip Planner destination for the preserved 1846 battlefield, visitor context and lower Rio Grande area guide." },
  ],
  "texas-national-guard-history": [
    { href: "/destination/texas-military-forces-museum", label: "Texas Military Forces Museum", description: "Turn the Guard history into a Camp Mabry visit with current access guidance and an Austin area guide." },
  ],
  "texas-world-war-ii-bases-pow-camps": [
    { href: "/article/battleship-texas-bb-35-history-restoration", label: "Battleship Texas (BB-35)", description: "Connect the Texas home front with the surviving dreadnought that fought from North Africa and Normandy to Iwo Jima and Okinawa." },
  ],
};

for (const [slug, additions] of Object.entries(supplementalLinks)) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...additions.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}

export const militaryHistoryExpansionStubs: Article[] = [
  texasUsMexicanWarPaloAltoGuideStub,
  texasNationalGuardHistoryStub,
  sanAntonioMilitaryAviationHistoryStub,
  texasWorldWarIIBasesPowCampsStub,
];

export async function loadMilitaryHistoryExpansionArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;
  if (slug === texasUsMexicanWarPaloAltoGuideStub.slug) return import("./texas-us-mexican-war-palo-alto-guide").then((module) => module.texasUsMexicanWarPaloAltoGuideArticle);
  if (slug === texasNationalGuardHistoryStub.slug) return import("./texas-national-guard-history").then((module) => module.texasNationalGuardHistoryArticle);
  if (slug === sanAntonioMilitaryAviationHistoryStub.slug) return import("./san-antonio-military-aviation-history").then((module) => module.sanAntonioMilitaryAviationHistoryArticle);
  if (slug === texasWorldWarIIBasesPowCampsStub.slug) return import("./texas-world-war-ii-bases-pow-camps").then((module) => module.texasWorldWarIIBasesPowCampsArticle);
  return null;
}
