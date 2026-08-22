import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const authority = read("src/data/fixtures/seasonal-authority-articles.ts");
const intents = read("src/data/fixtures/seasonal-intent-articles.ts");
const authorityLazy = read("src/data/fixtures/lazy-seasonal-authority.ts");
const intentLazy = read("src/data/fixtures/lazy-seasonal-intents.ts");
const links = read("src/data/fixtures/seasonal-authority-links.ts");
const countyLinks = read("src/data/fixtures/seasonal-county-links.ts");
const destinationLinks = read("src/data/destination-editorial-links.ts");
const newest = read("src/data/fixtures/lazy-newest-evergreen.ts");
const exploreIntents = read("src/components/editorial/ExploreIntentPaths.tsx");

const groups = {
  bluebonnets: ["texas-bluebonnets-complete-guide", "best-places-to-see-bluebonnets-in-texas", "texas-bluebonnet-road-trip", "bluebonnets-near-austin", "bluebonnets-near-houston", "bluebonnets-near-dallas-fort-worth", "bluebonnets-near-san-antonio", "texas-bluebonnet-festivals", "is-it-illegal-to-pick-bluebonnets-in-texas"],
  christmas: ["christmas-in-texas-complete-guide", "best-christmas-towns-in-texas", "texas-christmas-road-trip", "best-christmas-lights-in-texas", "texas-christmas-train-rides", "free-christmas-events-in-texas"],
  fall: ["fall-in-texas-complete-guide", "best-places-for-fall-colors-in-texas", "texas-fall-foliage-road-trip", "east-texas-fall-colors", "hill-country-fall-colors", "best-texas-state-parks-for-fall-colors"],
};

const fail = (message) => { console.error(`SEASONAL AUTHORITY FAIL: ${message}`); process.exitCode = 1; };
const allSource = `${authority}\n${intents}`;
const lazySource = `${authorityLazy}\n${intentLazy}`;

for (const [group, slugs] of Object.entries(groups)) {
  for (const slug of slugs) {
    if (!allSource.includes(`slug: \"${slug}\"`)) fail(`${group}: missing full article ${slug}`);
    if (!lazySource.includes(`slug: \"${slug}\"`)) fail(`${group}: missing discovery stub ${slug}`);
    if (!links.includes(`\"${slug}\"`)) fail(`${group}: missing reciprocal authority-link entry ${slug}`);
  }
}

for (const hub of ["texas-bluebonnets-complete-guide", "christmas-in-texas-complete-guide", "fall-in-texas-complete-guide"]) {
  const marker = `slug: \"${hub}\"`;
  const at = authority.indexOf(marker);
  if (at < 0) continue;
  const next = authority.indexOf("\n  {\n    id:", at + marker.length);
  const block = authority.slice(at, next < 0 ? authority.length : next);
  const headings = (block.match(/type: \"heading\"/g) || []).length;
  const paragraphs = (block.match(/type: \"paragraph\"/g) || []).length;
  if (headings < 4 || paragraphs < 5) fail(`${hub}: authority body is too thin (${headings} headings, ${paragraphs} paragraphs)`);
  if (!exploreIntents.includes(`/article/${hub}`)) fail(`${hub}: missing direct Explore discovery path`);
}

const destinationRequirements = {
  "enchanted-rock-state-natural-area": ["/article/texas-bluebonnets-complete-guide", "/article/best-places-to-see-bluebonnets-in-texas", "/article/texas-bluebonnet-road-trip"],
  "caddo-lake-state-park": ["/article/fall-in-texas-complete-guide", "/article/east-texas-fall-colors", "/article/best-texas-state-parks-for-fall-colors", "/article/texas-fall-foliage-road-trip"],
  "caddo-lake": ["/article/fall-in-texas-complete-guide", "/article/east-texas-fall-colors", "/article/best-places-for-fall-colors-in-texas"],
  "guadalupe-river-state-park": ["/article/fall-in-texas-complete-guide", "/article/hill-country-fall-colors", "/article/best-texas-state-parks-for-fall-colors"],
  "new-braunfels": ["/article/christmas-in-texas-complete-guide", "/article/best-christmas-towns-in-texas", "/article/texas-christmas-road-trip"],
  "gruene": ["/article/christmas-in-texas-complete-guide", "/article/best-christmas-towns-in-texas"],
};
for (const [destination, hrefs] of Object.entries(destinationRequirements)) {
  if (!destinationLinks.includes(`\"${destination}\"`)) fail(`missing seasonal destination link group for ${destination}`);
  for (const href of hrefs) if (!destinationLinks.includes(`href: \"${href}\"`)) fail(`${destination}: missing ${href}`);
}

const countyRequirements = {
  "gillespie-county-fredericksburg-stonewall-hill-country-texas": ["/article/texas-bluebonnets-complete-guide", "/article/texas-bluebonnet-road-trip", "/article/texas-christmas-road-trip", "/article/christmas-in-texas-complete-guide"],
  "harrison-county-marshall-caddo-lake-railroads-piney-woods-texas": ["/article/east-texas-fall-colors", "/article/fall-in-texas-complete-guide", "/article/best-christmas-towns-in-texas"],
  "marion-county-jefferson-caddo-lake-riverport-piney-woods-texas": ["/article/east-texas-fall-colors", "/article/fall-in-texas-complete-guide", "/article/best-christmas-towns-in-texas"],
  "ellis-county-waxahachie-ennis-blackland-prairie-texas": ["/article/bluebonnets-near-dallas-fort-worth", "/article/best-places-to-see-bluebonnets-in-texas", "/article/texas-bluebonnet-festivals"],
  "washington-county-brenham-washington-brazos-independence-texas": ["/article/bluebonnets-near-houston", "/article/texas-bluebonnets-complete-guide", "/article/texas-bluebonnet-road-trip"],
  "burnet-county-burnet-marble-falls-highland-lakes-granite-texas": ["/article/texas-bluebonnets-complete-guide", "/article/best-places-to-see-bluebonnets-in-texas", "/article/texas-bluebonnet-road-trip"],
  "llano-county-llano-river-granite-highland-lakes-texas": ["/article/texas-bluebonnets-complete-guide", "/article/best-places-to-see-bluebonnets-in-texas", "/article/texas-bluebonnet-road-trip"],
};
for (const [county, hrefs] of Object.entries(countyRequirements)) {
  if (!countyLinks.includes(`\"${county}\"`)) fail(`missing seasonal county link group for ${county}`);
  for (const href of hrefs) if (!countyLinks.includes(`href: \"${href}\"`)) fail(`${county}: missing ${href}`);
}
if (!newest.includes('import "./seasonal-county-links"')) fail("seasonal county reciprocity file is not loaded");

if (!exploreIntents.includes('title: "Seasonal Texas"')) fail("Explore seasonal planning group missing");
if (!authority.includes("There is no statewide law that simply bans picking bluebonnets everywhere")) fail("bluebonnet law caveat missing from statewide authority content");
if (!intents.includes("Texas does not have a statewide law that simply says 'it is illegal to pick a bluebonnet.'")) fail("bluebonnet-law intent answer missing");
if (!authority.includes("Treat event dates as current information, not evergreen facts")) fail("Christmas current-date caveat missing");
if (!authority.includes("Use current foliage reports whenever they exist")) fail("fall current-report caveat missing");
if (!authority.includes("private ranch country") || !authority.includes("never assume a roadside flower patch creates public access")) fail("bluebonnet private-property caveat missing");
if (!newest.includes("loadSeasonalIntentArticle") || !newest.includes("loadSeasonalAuthorityArticle")) fail("seasonal articles are not wired through lazy evergreen loaders");
if (!authorityLazy.includes('await import("./seasonal-authority-articles")')) fail("seasonal authority full bodies are not dynamically imported");
if (!intentLazy.includes('await import("./seasonal-intent-articles")')) fail("seasonal intent full bodies are not dynamically imported");

if (!process.exitCode) console.log("Seasonal authority guardrail passed: 21 pages, reciprocal article/county/destination links, Explore discovery, safety/currentness caveats and lazy loading verified.");
