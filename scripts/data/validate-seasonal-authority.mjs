import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const authority = read("src/data/fixtures/seasonal-authority-articles.ts");
const intents = read("src/data/fixtures/seasonal-intent-articles.ts");
const authorityLazy = read("src/data/fixtures/lazy-seasonal-authority.ts");
const intentLazy = read("src/data/fixtures/lazy-seasonal-intents.ts");
const links = read("src/data/fixtures/seasonal-authority-links.ts");
const countyRegistry = read("src/data/county-seasonal-links.ts");
const countyLegacyLinks = read("src/data/fixtures/seasonal-county-links.ts");
const countyComponent = read("src/components/content/CountySeasonalPlanning.tsx");
const countyIdentity = read("src/components/content/CountyIdentitySection.tsx");
const destinationLinks = read("src/data/destination-editorial-links.ts");
const newest = read("src/data/fixtures/lazy-newest-evergreen.ts");
const exploreIntents = read("src/components/editorial/ExploreIntentPaths.tsx");
const server = read("src/server.ts");

const groups = {
  bluebonnets: ["texas-bluebonnets-complete-guide", "best-places-to-see-bluebonnets-in-texas", "texas-bluebonnet-road-trip", "bluebonnets-near-austin", "bluebonnets-near-houston", "bluebonnets-near-dallas-fort-worth", "bluebonnets-near-san-antonio", "texas-bluebonnet-festivals", "is-it-illegal-to-pick-bluebonnets-in-texas"],
  christmas: ["christmas-in-texas-complete-guide", "best-christmas-towns-in-texas", "texas-christmas-road-trip", "best-christmas-lights-in-texas", "texas-christmas-train-rides", "free-christmas-events-in-texas"],
  fall: ["fall-in-texas-complete-guide", "texas-fall-foliage-road-trip", "east-texas-fall-colors", "hill-country-fall-colors", "best-texas-state-parks-for-fall-colors"],
};

const retiredSeasonalRedirects = {
  "/article/best-places-for-fall-colors-in-texas": "/article/best-texas-state-parks-for-fall-colors",
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

for (const [from, to] of Object.entries(retiredSeasonalRedirects)) {
  const retiredSlug = from.slice("/article/".length);
  if (!server.includes(`\"${from}\": \"${to}\"`)) fail(`missing canonical seasonal redirect ${from} -> ${to}`);
  if (lazySource.includes(`slug: \"${retiredSlug}\"`)) fail(`${retiredSlug}: retired page must not remain in discovery stubs`);
  if (links.includes(`\"${retiredSlug}\": [`)) fail(`${retiredSlug}: retired page must not retain reciprocal authority-link entry`);
}

const retiredFallHref = 'href: "/article/best-places-for-fall-colors-in-texas"';
for (const [label, source] of Object.entries({
  "seasonal authority links": links,
  "county seasonal links": countyRegistry,
  "destination seasonal links": destinationLinks,
})) {
  if (source.includes(retiredFallHref)) fail(`${label}: retired fall URL remains internally linked`);
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
  "caddo-lake": ["/article/fall-in-texas-complete-guide", "/article/east-texas-fall-colors", "/article/best-texas-state-parks-for-fall-colors"],
  "guadalupe-river-state-park": ["/article/fall-in-texas-complete-guide", "/article/hill-country-fall-colors", "/article/best-texas-state-parks-for-fall-colors"],
  "new-braunfels": ["/article/christmas-in-texas-complete-guide", "/article/best-christmas-towns-in-texas", "/article/texas-christmas-road-trip"],
  "gruene-historic-district": ["/article/christmas-in-texas-complete-guide", "/article/best-christmas-towns-in-texas"],
};
for (const [destination, hrefs] of Object.entries(destinationRequirements)) {
  if (!destinationLinks.includes(`\"${destination}\"`)) fail(`missing seasonal destination link group for ${destination}`);
  for (const href of hrefs) if (!destinationLinks.includes(`href: \"${href}\"`)) fail(`${destination}: missing ${href}`);
}

const countyRequirements = {
  gillespie: ["/article/texas-bluebonnets-complete-guide", "/article/texas-bluebonnet-road-trip", "/article/texas-christmas-road-trip", "/article/christmas-in-texas-complete-guide"],
  harrison: ["/article/east-texas-fall-colors", "/article/fall-in-texas-complete-guide", "/article/best-christmas-towns-in-texas"],
  marion: ["/article/east-texas-fall-colors", "/article/fall-in-texas-complete-guide", "/article/best-christmas-towns-in-texas"],
  ellis: ["/article/bluebonnets-near-dallas-fort-worth", "/article/best-places-to-see-bluebonnets-in-texas", "/article/texas-bluebonnet-festivals"],
  washington: ["/article/bluebonnets-near-houston", "/article/texas-bluebonnets-complete-guide", "/article/texas-bluebonnet-road-trip"],
  burnet: ["/article/texas-bluebonnets-complete-guide", "/article/best-places-to-see-bluebonnets-in-texas", "/article/texas-bluebonnet-road-trip"],
  llano: ["/article/texas-bluebonnets-complete-guide", "/article/best-places-to-see-bluebonnets-in-texas", "/article/texas-bluebonnet-road-trip"],
  uvalde: ["/article/fall-in-texas-complete-guide", "/article/hill-country-fall-colors", "/article/best-texas-state-parks-for-fall-colors"],
  bandera: ["/article/hill-country-fall-colors", "/article/fall-in-texas-complete-guide"],
};
for (const [county, hrefs] of Object.entries(countyRequirements)) {
  if (!countyRegistry.includes(`\n  ${county}: [`)) fail(`missing canonical seasonal county link group for /county/${county}`);
  for (const href of hrefs) if (!countyRegistry.includes(`href: \"${href}\"`)) fail(`/county/${county}: missing ${href}`);
}
if (!countyComponent.includes("countySeasonalLinks(countySlug)")) fail("canonical county seasonal component is not reading the shared county registry");
if (!countyIdentity.includes("<CountySeasonalPlanning countySlug={slug} countyName={countyName} />")) fail("canonical county pages are not rendering the seasonal planning layer");
if (!countyLegacyLinks.includes("countySeasonalLinksBySlug, legacyCountyArticleSlugByCountySlug")) fail("legacy county articles are not sharing the canonical seasonal registry");
if (!newest.includes('import "./seasonal-county-links"')) fail("legacy seasonal county reciprocity compatibility file is not loaded");

if (!exploreIntents.includes('title: "Seasonal Texas"')) fail("Explore seasonal planning group missing");
if (!authority.includes("There is no statewide law that simply bans picking bluebonnets everywhere")) fail("bluebonnet law caveat missing from statewide authority content");
if (!intents.includes("Texas does not have a statewide law that simply says 'it is illegal to pick a bluebonnet.'")) fail("bluebonnet-law intent answer missing");
if (!authority.includes("Treat event dates as current information, not evergreen facts")) fail("Christmas current-date caveat missing");
if (!authority.includes("Use current foliage reports whenever they exist")) fail("fall current-report caveat missing");
if (!authority.includes("private ranch country") || !authority.includes("never assume a roadside flower patch creates public access")) fail("bluebonnet private-property caveat missing");
if (!newest.includes("loadSeasonalIntentArticle") || !newest.includes("loadSeasonalAuthorityArticle")) fail("seasonal articles are not wired through lazy evergreen loaders");
if (!authorityLazy.includes('await import("./seasonal-authority-articles")')) fail("seasonal authority full bodies are not dynamically imported");
if (!intentLazy.includes('await import("./seasonal-intent-articles")')) fail("seasonal intent full bodies are not dynamically imported");

if (!process.exitCode) console.log("Seasonal authority guardrail passed: 20 canonical pages, 1 retired redirect, county/destination reciprocity, Explore discovery, safety/currentness caveats and lazy loading verified.");
