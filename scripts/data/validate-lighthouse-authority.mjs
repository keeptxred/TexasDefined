import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const stubs = read("src/data/fixtures/lazy-lighthouse-deep-dives.ts");
const expansions = read("src/data/fixtures/lighthouse-deep-dive-expansions.ts");
const links = read("src/data/fixtures/lighthouse-authority-links.ts");
const searchIntentStubs = read("src/data/fixtures/lazy-lighthouse-search-intents.ts");
const searchIntentArticles = read("src/data/fixtures/lighthouse-search-intent-articles.ts");
const newestEvergreen = read("src/data/fixtures/lazy-newest-evergreen.ts");
const hub = read("src/routes/explore.lighthouses.tsx");
const visitorPlans = read("src/data/lighthouse-visitor-planning.ts");
const topicPaths = read("src/components/editorial/ExploreTopicPaths.tsx");
const intentPaths = read("src/components/editorial/ExploreIntentPaths.tsx");
const routes = read("src/lib/public-routes.ts");

const lighthouses = [
  { articleSlug: "point-bolivar-lighthouse-history", mapSlug: "point-bolivar-lighthouse", hero: "Port_Bolivar_TX_-_Point_Bolivar_Lighthouse.jpg", county: "galveston-county-island-port-juneteenth-texas" },
  { articleSlug: "lydia-ann-lighthouse-port-aransas", mapSlug: "lydia-ann-lighthouse", hero: "Lydia_Ann_Lighthouse_near_Port_Aransas.jpg", county: "aransas-county-rockport-fulton-bays-coastal-heritage-texas" },
  { articleSlug: "matagorda-island-lighthouse-history", mapSlug: "matagorda-island-lighthouse", hero: "Matagorda_Island_Light_%28Calhoun_County%2C_Texas%29.jpg", county: "calhoun-county-port-lavaca-indianola-seadrift-bays-texas" },
  { articleSlug: "halfmoon-reef-lighthouse-port-lavaca", mapSlug: "halfmoon-reef-lighthouse", hero: "HALFMOON_REEF_LIGHTHOUSE.jpg", county: "calhoun-county-port-lavaca-indianola-seadrift-bays-texas" },
  { articleSlug: "sabine-pass-lighthouse-texas-border", mapSlug: "sabine-pass-lighthouse", hero: "Sabine_Pass_Lighthouse_01.jpg", county: "texas-civil-war-sites-guide" },
];

for (const lighthouse of lighthouses) {
  assert(stubs.includes(lighthouse.articleSlug), `Missing lighthouse stub: ${lighthouse.articleSlug}`);
  assert(stubs.includes(lighthouse.hero), `Missing exact hero for ${lighthouse.articleSlug}`);
  assert(expansions.includes(`\"${lighthouse.articleSlug}\"`), `Missing lazy authority expansion for ${lighthouse.articleSlug}`);
  assert(links.includes(`\"${lighthouse.articleSlug}\"`), `Missing lighthouse authority links for ${lighthouse.articleSlug}`);
  assert(links.includes(`\"${lighthouse.county}\"`), `Missing reciprocal authority target ${lighthouse.county}`);
  assert(visitorPlans.includes(`slug: \"${lighthouse.mapSlug}\"`), `Missing visitor plan for ${lighthouse.mapSlug}`);
}
assert(visitorPlans.includes('slug: "port-isabel-lighthouse"'), "Missing visitor plan for Port Isabel Lighthouse");

const uniqueHeroMarkers = new Set(lighthouses.map((lighthouse) => lighthouse.hero));
assert(uniqueHeroMarkers.size === lighthouses.length, "Lighthouse deep dives must use unique exact-subject heroes");
for (const creditMarker of ["CC BY 2.0", "CC BY-SA 2.0", "Public domain"]) assert(stubs.includes(creditMarker), `Missing lighthouse image license marker: ${creditMarker}`);

assert(expansions.includes("The most important fact: the tower is in Louisiana") && expansions.includes("The historic tower is on the Louisiana side"), "Sabine Pass Louisiana caveat must remain explicit in the deep-dive expansion");
assert(visitorPlans.includes("the tower itself is on the Louisiana side of the Sabine") && visitorPlans.includes("do not imply tower access"), "Sabine Pass visitor guidance must preserve the Louisiana location and no-access caveat");
assert(stubs.includes('import("./lighthouse-deep-dive-expansions")'), "Lighthouse authority expansions must remain lazy-loaded");
assert(hub.includes("Texas Lighthouse") || hub.includes("Texas lighthouse"), "Lighthouse authority hub content is missing");
assert(hub.includes("Visitability at a glance"), "Lighthouse visitability comparison is missing from the hub");
assert(hub.includes('"@type": "FAQPage"'), "Lighthouse hub FAQ schema is missing");
assert(hub.includes("Which Texas lighthouse can you climb?"), "Lighthouse climb answer layer is missing");
assert(hub.includes("/destination/port-isabel-lighthouse-state-park"), "Port Isabel destination guide link is missing");
assert(routes.includes('"/explore/lighthouses"') || routes.includes("'/explore/lighthouses'"), "/explore/lighthouses must remain governed as a public route");

for (const categoryMarker of ['"beaches-coast": [', '"historic-sites": [', '"road-trips": [']) {
  const start = topicPaths.indexOf(categoryMarker);
  assert(start >= 0, `Missing Explore topic group ${categoryMarker}`);
  const end = topicPaths.indexOf("\n  ],", start + categoryMarker.length);
  const block = topicPaths.slice(start, end > start ? end : topicPaths.length);
  assert(block.includes('to: "/explore/lighthouses"'), `Explore topic group ${categoryMarker} must link to /explore/lighthouses`);
}
const historyIntentStart = intentPaths.indexOf('title: "History routes"');
assert(historyIntentStart >= 0, "Explore History routes intent group is missing");
const historyIntentEnd = intentPaths.indexOf("\n  },", historyIntentStart);
const historyIntentBlock = intentPaths.slice(historyIntentStart, historyIntentEnd > historyIntentStart ? historyIntentEnd : intentPaths.length);
assert(historyIntentBlock.includes('to: "/explore/lighthouses"'), "Explore History routes must link to /explore/lighthouses");

const intentSlug = "best-lighthouses-to-visit-in-texas";
assert(searchIntentStubs.includes(`slug: \"${intentSlug}\"`), "Best-lighthouses search-intent stub is missing");
assert(searchIntentStubs.includes('import("./lighthouse-search-intent-articles")'), "Best-lighthouses article must remain lazy-loaded");
assert(searchIntentStubs.includes("Port_Isabel_Texas_Lighthouse.jpg"), "Best-lighthouses page must retain its unique exact-subject hero");
assert(searchIntentStubs.includes("CC BY 2.0"), "Best-lighthouses hero attribution/license is missing");
assert(searchIntentStubs.includes('relatedDestinations: ["port-isabel-lighthouse"]'), "Best-lighthouses stub must point to the canonical Port Isabel destination slug");
assert(newestEvergreen.includes("lighthouseSearchIntentStubs") && newestEvergreen.includes("loadLighthouseSearchIntentArticle"), "Best-lighthouses intent loader is not registered");
assert(searchIntentArticles.includes('title: "Best Lighthouses to Visit in Texas: What You Can Actually See and Climb"'), "Best-lighthouses search title is missing");
for (const requiredText of [
  "1. Port Isabel Lighthouse — best overall",
  "2. Point Bolivar Lighthouse — best for Galveston Bay history",
  "3. Halfmoon Reef Lighthouse — best easy historic stop from land",
  "4. Lydia Ann Lighthouse — best for Port Aransas waterways",
  "5. Matagorda Island Lighthouse — best for remote maritime history",
  "6. Sabine Pass Lighthouse — best for the story, not a conventional visit",
  "the historic lighthouse tower stands on the Louisiana side of the Sabine",
]) assert(searchIntentArticles.includes(requiredText), `Best-lighthouses article missing required authority text: ${requiredText}`);
assert(links.includes(`\"${intentSlug}\"`), "Best-lighthouses intent page is missing from lighthouse reciprocal links");
assert(links.includes(`/article/${intentSlug}`), "Existing lighthouse authority pages must discover the best-lighthouses intent page");

const reciprocalDiscoverySlugs = [
  "cameron-county-brownsville-harlingen-south-padre-rio-grande",
  "galveston-county-island-port-juneteenth-texas",
  "aransas-county-rockport-fulton-bays-coastal-heritage-texas",
  "calhoun-county-port-lavaca-indianola-seadrift-bays-texas",
  "texas-civil-war-sites-guide",
];
for (const slug of reciprocalDiscoverySlugs) {
  const start = links.indexOf(`\"${slug}\"`);
  assert(start >= 0, `Missing lighthouse reciprocal discovery block for ${slug}`);
  const end = links.indexOf("\n  ],", start);
  const block = links.slice(start, end > start ? end : links.length);
  assert(block.includes(`/article/${intentSlug}`) || block.includes("bestToVisit"), `${slug} must discover the best-lighthouses intent page`);
}

const intentParagraphCount = (searchIntentArticles.match(/type: \"paragraph\"/g) ?? []).length;
const intentHeadingCount = (searchIntentArticles.match(/type: \"heading\"/g) ?? []).length;
assert(intentParagraphCount >= 20, `Expected at least 20 best-lighthouses paragraphs; found ${intentParagraphCount}`);
assert(intentHeadingCount >= 10, `Expected at least 10 best-lighthouses headings; found ${intentHeadingCount}`);

const visitorPlanCount = (visitorPlans.match(/slug: \"/g) ?? []).length;
assert(visitorPlanCount >= 6, `Expected at least 6 lighthouse visitor plans; found ${visitorPlanCount}`);
for (const field of ["publicAccess:", "bestFor:", "pairWith:", "planningNote:"]) {
  const count = (visitorPlans.match(new RegExp(field, "g")) ?? []).length;
  assert(count >= 6, `Expected visitor planning field ${field} for all lighthouse plans; found ${count}`);
}
const expansionHeadingCount = (expansions.match(/h\("/g) ?? []).length;
const expansionParagraphCount = (expansions.match(/p\("/g) ?? []).length;
assert(expansionHeadingCount >= 18, `Expected at least 18 lighthouse expansion headings; found ${expansionHeadingCount}`);
assert(expansionParagraphCount >= 25, `Expected at least 25 lighthouse expansion paragraphs; found ${expansionParagraphCount}`);

console.log(`Lighthouse authority validation passed: ${lighthouses.length} deep dives, 1 search-intent authority page, ${visitorPlanCount} visitor plans, 5 reciprocal discovery surfaces, 4 broad discovery paths, ${expansionHeadingCount} expansion headings, ${expansionParagraphCount} expansion paragraphs.`);
