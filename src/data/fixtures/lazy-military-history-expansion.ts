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

const buffaloSoldiersTexasFrontierGuideStub: Article = {
  id: "evergreen-buffalo-soldiers-texas-frontier-guide", brandId: "texasdefined", slug: "buffalo-soldiers-texas-frontier-guide",
  title: "Buffalo Soldiers in Texas: The Black Regulars Who Manned the Frontier",
  dek: "After the Civil War, African American soldiers served across Texas in the 9th and 10th Cavalry and the 24th and 25th Infantry. Fort Davis, Fort Concho, Fort McKavett and Fort Lancaster preserve parts of that complicated frontier story.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Davis_National_Historic_Site_%28790ae2ca-cd05-44da-bfd4-b713441c231b%29.jpg?width=1600", alt: "Historic image of mounted African American soldiers associated with Fort Davis National Historic Site", width: 1600, height: 1067, credit: "National Park Service · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 17,
  tags: ["buffalo soldiers", "black regulars", "african american texas history", "fort davis", "fort mckavett", "fort concho", "fort lancaster", "texas military history"], featured: true,
  sourceName: "National Park Service", sourceUrl: "https://www.nps.gov/foda/learn/historyculture/buffalo-soldiers.htm",
  body: [], relatedCollections: [], relatedDestinations: ["fort-davis-national-historic-site", "fort-mckavett", "fort-lancaster"],
};

const texasRedRiverWarGuideStub: Article = {
  id: "evergreen-texas-red-river-war-guide", brandId: "texasdefined", slug: "texas-red-river-war-guide",
  title: "The Red River War in Texas: Adobe Walls, Palo Duro Canyon and the End of the Southern Plains Frontier",
  dek: "The 1874–1875 Red River War was the U.S. Army campaign that forced Comanche, Kiowa, Southern Cheyenne and Arapaho peoples from the Texas Panhandle onto reservations. Adobe Walls, Palo Duro Canyon and bison destruction explain how the Southern Plains changed so quickly.",
  category: "texas-history", region: "panhandle-plains",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ledger-sm2.jpg?width=1600", alt: "Kiowa ledger drawing from 1874 possibly depicting the Battle of Buffalo Wallow during the Red River War", width: 780, height: 442, credit: "Kiowa ledger drawing · 1874 · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 18,
  tags: ["Red River War", "Adobe Walls", "Palo Duro Canyon", "Quanah Parker", "Comanche history", "Kiowa history", "Texas Panhandle history", "Texas military history"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/learn/archeological-spotlight/red-river-war-battle-sites-project",
  body: [], relatedCollections: [], relatedDestinations: ["palo-duro-canyon", "goodnight-ranch"],
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

const republicOfTexasNavyHistoryStub: Article = {
  id: "evergreen-republic-of-texas-navy-history", brandId: "texasdefined", slug: "republic-of-texas-navy-history",
  title: "The Republic of Texas Navy: The Forgotten Fleet That Fought for Texas Independence",
  dek: "Texas maintained two small navies between the Revolution and annexation. From Liberty, Invincible and Independence to Austin, Wharton and the Battle of Campeche, the fleet protected supply lines, challenged Mexican blockades and became entangled in the political feud between Sam Houston and Edwin Ward Moore.",
  category: "texas-history", region: "gulf-coast",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pencil_sktech_of_texas_navy_ships_on_a_calling_card_circa_1840.jpg?width=1600", alt: "Pencil sketch of eight Texas Navy ships and waterfront buildings on a calling card around 1840", width: 752, height: 445, credit: "Anonymous sketch · circa 1840 · Public domain · Wikimedia Commons / San Jacinto Museum" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 18,
  tags: ["Republic of Texas Navy", "Texas Navy", "Edwin Ward Moore", "Battle of Campeche", "Texas Revolution", "Republic of Texas", "Galveston history", "Texas military history"], featured: true,
  sourceName: "Texas State Library and Archives Commission", sourceUrl: "https://www.tsl.texas.gov/exhibits/navy/index.html",
  body: [], relatedCollections: [], relatedDestinations: ["san-jacinto-battleground", "battleship-texas"],
};

const texasColdWarMilitaryHistoryStub: Article = {
  id: "evergreen-texas-cold-war-military-history", brandId: "texasdefined", slug: "texas-cold-war-military-history",
  title: "Cold War Texas: Strategic Bombers, Missile Silos, Pantex and a State Built for Deterrence",
  dek: "From B-36 bombers at Fort Worth and Atlas missile silos around Abilene to U-2 missions from Laughlin and nuclear-warhead work at Pantex, Texas became one of the country's most important Cold War military landscapes.",
  category: "texas-history", region: "north-texas",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/B36-b-52-b-58-carswell.jpg?width=1600", alt: "B-36, B-52 and B-58 strategic bombers from Carswell Air Force Base flying together over Texas in 1958", width: 684, height: 404, credit: "U.S. Air Force Historical Research Agency · 1958 · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 18,
  tags: ["Cold War Texas", "Pantex Plant", "Carswell Air Force Base", "Dyess Air Force Base", "Atlas missile silos", "Strategic Air Command", "nuclear history", "Texas military history"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/learn/military-history/texas-cold-war",
  body: [], relatedCollections: [], relatedDestinations: ["texas-military-forces-museum"],
};

const buffaloSoldiersLink = {
  href: "/article/buffalo-soldiers-texas-frontier-guide",
  label: "Buffalo Soldiers in Texas",
  description: "Follow the Black Regulars through Fort Davis, Fort Concho, Fort McKavett and Fort Lancaster while holding military service, citizenship and Native dispossession in the same history.",
};
const redRiverWarLink = {
  href: "/article/texas-red-river-war-guide",
  label: "The Red River War in Texas",
  description: "Follow the 1874–1875 campaign from Adobe Walls through Palo Duro Canyon and into the rapid ranching transformation of the Panhandle.",
};
const republicNavyLink = {
  href: "/article/republic-of-texas-navy-history",
  label: "The Republic of Texas Navy",
  description: "See how two small fleets protected Gulf supply lines, fought Mexico and exposed the financial and political limits of the independent Republic.",
};
const coldWarLink = {
  href: "/article/texas-cold-war-military-history",
  label: "Cold War Texas",
  description: "Connect strategic bombers, Atlas missile fields, Pantex, U-2 reconnaissance and the military infrastructure that made Texas central to nuclear deterrence.",
};

const supplementalLinks: Record<string, Array<{ href: string; label: string; description: string }>> = {
  "texas-us-mexican-war-palo-alto-guide": [
    { href: "/destination/palo-alto-battlefield-national-historical-park", label: "Visit Palo Alto Battlefield", description: "Open the Trip Planner destination for the preserved 1846 battlefield, visitor context and lower Rio Grande area guide." },
  ],
  "texas-military-history-timeline": [buffaloSoldiersLink, redRiverWarLink, republicNavyLink, coldWarLink],
  "texas-frontier-forts-road-trip": [buffaloSoldiersLink, redRiverWarLink],
  "buffalo-soldiers-texas-frontier-guide": [redRiverWarLink],
  "texas-cattle-ranching-history-guide": [redRiverWarLink],
  "republic-of-texas-government-trail": [republicNavyLink],
  "texas-revolution-historic-sites-road-trip": [republicNavyLink],
  "battleship-texas-bb-35-history-restoration": [republicNavyLink],
  "texas-national-guard-history": [
    { href: "/destination/texas-military-forces-museum", label: "Texas Military Forces Museum", description: "Turn the Guard history into a Camp Mabry visit with current access guidance and an Austin area guide." },
    buffaloSoldiersLink,
    coldWarLink,
  ],
  "san-antonio-military-aviation-history": [coldWarLink],
  "texas-world-war-ii-bases-pow-camps": [
    { href: "/article/battleship-texas-bb-35-history-restoration", label: "Battleship Texas (BB-35)", description: "Connect the Texas home front with the surviving dreadnought that fought from North Africa and Normandy to Iwo Jima and Okinawa." },
    coldWarLink,
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
  buffaloSoldiersTexasFrontierGuideStub,
  texasRedRiverWarGuideStub,
  texasNationalGuardHistoryStub,
  sanAntonioMilitaryAviationHistoryStub,
  texasWorldWarIIBasesPowCampsStub,
  republicOfTexasNavyHistoryStub,
  texasColdWarMilitaryHistoryStub,
];

export async function loadMilitaryHistoryExpansionArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;
  if (slug === texasUsMexicanWarPaloAltoGuideStub.slug) return import("./texas-us-mexican-war-palo-alto-guide").then((module) => module.texasUsMexicanWarPaloAltoGuideArticle);
  if (slug === buffaloSoldiersTexasFrontierGuideStub.slug) return import("./buffalo-soldiers-texas-frontier-guide").then((module) => module.buffaloSoldiersTexasFrontierGuideArticle);
  if (slug === texasRedRiverWarGuideStub.slug) return import("./texas-red-river-war-guide").then((module) => module.texasRedRiverWarGuideArticle);
  if (slug === texasNationalGuardHistoryStub.slug) return import("./texas-national-guard-history").then((module) => module.texasNationalGuardHistoryArticle);
  if (slug === sanAntonioMilitaryAviationHistoryStub.slug) return import("./san-antonio-military-aviation-history").then((module) => module.sanAntonioMilitaryAviationHistoryArticle);
  if (slug === texasWorldWarIIBasesPowCampsStub.slug) return import("./texas-world-war-ii-bases-pow-camps").then((module) => module.texasWorldWarIIBasesPowCampsArticle);
  if (slug === republicOfTexasNavyHistoryStub.slug) return import("./republic-of-texas-navy-history").then((module) => module.republicOfTexasNavyHistoryArticle);
  if (slug === texasColdWarMilitaryHistoryStub.slug) return import("./texas-cold-war-military-history").then((module) => module.texasColdWarMilitaryHistoryArticle);
  return null;
}
