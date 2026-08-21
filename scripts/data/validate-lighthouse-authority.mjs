import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const stubs = read("src/data/fixtures/lazy-lighthouse-deep-dives.ts");
const expansions = read("src/data/fixtures/lighthouse-deep-dive-expansions.ts");
const links = read("src/data/fixtures/lighthouse-authority-links.ts");
const hub = read("src/routes/explore.lighthouses.tsx");
const routes = read("src/lib/public-routes.ts");

const lighthouses = [
  {
    slug: "point-bolivar-lighthouse-history",
    hero: "Port_Bolivar_TX_-_Point_Bolivar_Lighthouse.jpg",
    county: "galveston-county-island-port-juneteenth-texas",
  },
  {
    slug: "lydia-ann-lighthouse-port-aransas",
    hero: "Lydia_Ann_Lighthouse_near_Port_Aransas.jpg",
    county: "aransas-county-rockport-fulton-bays-coastal-heritage-texas",
  },
  {
    slug: "matagorda-island-lighthouse-history",
    hero: "Matagorda_Island_Light_%28Calhoun_County%2C_Texas%29.jpg",
    county: "calhoun-county-port-lavaca-indianola-seadrift-bays-texas",
  },
  {
    slug: "halfmoon-reef-lighthouse-port-lavaca",
    hero: "HALFMOON_REEF_LIGHTHOUSE.jpg",
    county: "calhoun-county-port-lavaca-indianola-seadrift-bays-texas",
  },
  {
    slug: "sabine-pass-lighthouse-texas-border",
    hero: "Sabine_Pass_Lighthouse_01.jpg",
    county: "texas-civil-war-sites-guide",
  },
];

for (const lighthouse of lighthouses) {
  assert(stubs.includes(lighthouse.slug), `Missing lighthouse stub: ${lighthouse.slug}`);
  assert(stubs.includes(lighthouse.hero), `Missing exact hero for ${lighthouse.slug}`);
  assert(expansions.includes(`\"${lighthouse.slug}\"`), `Missing lazy authority expansion for ${lighthouse.slug}`);
  assert(links.includes(`\"${lighthouse.slug}\"`), `Missing lighthouse authority links for ${lighthouse.slug}`);
  assert(links.includes(`\"${lighthouse.county}\"`), `Missing reciprocal authority target ${lighthouse.county}`);
}

const uniqueHeroMarkers = new Set(lighthouses.map((lighthouse) => lighthouse.hero));
assert(uniqueHeroMarkers.size === lighthouses.length, "Lighthouse deep dives must use unique exact-subject heroes");

for (const creditMarker of ["CC BY 2.0", "CC BY-SA 2.0", "Public domain"]) {
  assert(stubs.includes(creditMarker), `Missing lighthouse image license marker: ${creditMarker}`);
}

assert(
  expansions.includes("The most important fact: the tower is in Louisiana") &&
    expansions.includes("The historic tower is on the Louisiana side"),
  "Sabine Pass Louisiana caveat must remain explicit in the deep-dive expansion",
);
assert(
  stubs.includes('import("./lighthouse-deep-dive-expansions")'),
  "Lighthouse authority expansions must remain lazy-loaded",
);
assert(
  hub.includes("Texas Lighthouse") || hub.includes("Texas lighthouse"),
  "Lighthouse authority hub content is missing",
);
assert(
  routes.includes('"/explore/lighthouses"') || routes.includes("'/explore/lighthouses'"),
  "/explore/lighthouses must remain governed as a public route",
);

const expansionHeadingCount = (expansions.match(/h\("/g) ?? []).length;
const expansionParagraphCount = (expansions.match(/p\("/g) ?? []).length;
assert(expansionHeadingCount >= 20, `Expected at least 20 lighthouse expansion headings; found ${expansionHeadingCount}`);
assert(expansionParagraphCount >= 25, `Expected at least 25 lighthouse expansion paragraphs; found ${expansionParagraphCount}`);

console.log(`Lighthouse authority validation passed: ${lighthouses.length} deep dives, ${expansionHeadingCount} expansion headings, ${expansionParagraphCount} expansion paragraphs.`);
