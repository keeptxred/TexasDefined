import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  guide: "src/data/fixtures/texas-state-railroad-rusk-palestine-history-guide.ts",
  registry: "src/data/fixtures/lazy-historic-supporting.ts",
  anderson: "src/data/fixtures/anderson-county-palestine-railroads-piney-woods-texas.ts",
  cherokee: "src/data/fixtures/cherokee-county-rusk-jacksonville-caddo-mounds-piney-woods-texas.ts",
  andersonSecondary: "src/data/fixtures/anderson-county-palestine-railroads-dogwoods-east-texas.ts",
  palestine: "src/data/small-town-destinations-wave5.ts",
  museum: "src/data/museum-expansion-statewide-wave8.ts",
  collections: "src/data/curated-tourism-collections.ts",
  collectionUi: "src/components/explore/CuratedTourismPage.tsx",
  sitemap: "src/routes/sitemap[.]xml.ts",
};
const failures = [];
const sources = {};
for (const [key, path] of Object.entries(paths)) {
  if (!fs.existsSync(path)) failures.push(`Missing railroad authority source: ${path}`);
  else sources[key] = read(path);
}
const must = (file, token) => {
  if (!(sources[file] || "").includes(token)) failures.push(`${file}: missing ${token}`);
};
const guideSlug = "texas-state-railroad-rusk-palestine-history-guide";
const guideHref = `/article/${guideSlug}`;
for (const key of ["guide", "registry", "anderson", "cherokee", "andersonSecondary", "palestine", "collections"]) {
  must(key, guideSlug);
}
must("registry", `import("./texas-state-railroad-rusk-palestine-history-guide")`);
must("registry", "texasStateRailroadRuskPalestineHistoryGuideArticle");
must("registry", "texasStateRailroadRuskPalestineHistoryGuideStub,");
must("sitemap", "platform.articles.list(scope)");
must("sitemap", "...indexableLocalArticles.map");
must("collectionUi", "editorialGuideUrl");
must("museum", 'slug: "heritage-center-cherokee-county-rusk"');
must("guide", "heritage-center-cherokee-county-rusk");
must("guide", 'category: "texas-history"');
must("guide", 'updatedAt: "2026-11-22"');
must("guide", 'readingTimeVerified: false');
must("guide", 'type: "image"');
for (const [key, needle] of [
  ["guide", "Rusk Penitentiary"], ["guide", "1883"], ["guide", "528"],
  ["guide", "February 1884"], ["guide", "1909"], ["guide", "1910"], ["guide", "1917"], ["guide", "1919"],
  ["guide", "Texas State Capitol"], ["guide", "Prison labor"], ["guide", "power plant"],
  ["guide", "Rusk State Hospital"], ["guide", "Texas & Eastern"], ["guide", "Union Pacific"],
  ["guide", "International & Great Northern"], ["guide", "film"], ["guide", "working facilities"],
  ["guide", "Palestine Depot"], ["guide", "Rusk Depot"], ["guide", "45 minutes"], ["guide", "FAQ"],
  ["guide", "https://www.tsl.texas.gov/exhibits/prisons/lease/rusk.html"],
  ["guide", "https://www.tsl.texas.gov/exhibits/prisons/convictlease/capitol.html"],
  ["guide", "https://www.tshaonline.org/handbook/entries/texas-state-railroad"],
  ["guide", "https://www.up.com/shipping/short-line/lines/tsr"],
  ["guide", "https://texasstaterailroad.net/faq-2/"],
  ["guide", "CC BY 4.0"],
]) must(key, needle);
for (const key of ["anderson", "cherokee", "andersonSecondary"]) must(key, `href: "${guideHref}"`);
must("palestine", `href: "${guideHref}"`);
must("collections", `"editorialGuideUrl": "${guideHref}"`);
must("guide", 'href: "/county/anderson"');
must("guide", 'href: "/county/cherokee"');
const guide = sources.guide || "";
const paragraphs = [...guide.matchAll(/\bp\("/g)].length;
const headings = [...guide.matchAll(/\bh\("/g)].length;
const sourceUrls = [...guide.matchAll(/\{ label: "[^"]+", url: "https:\/\/[^"]+" \}/g)].length;
if (paragraphs < 30) failures.push(`Article too thin: ${paragraphs} paragraphs`);
if (headings < 12) failures.push(`Article missing depth: ${headings} section headings`);
if (sourceUrls < 8) failures.push(`Inadequate primary and institutional sources: ${sourceUrls}`);
if (guide.includes("was built in 1894 and")) failures.push("Reject incorrect 1894 penitentiary construction date");
if (guide.includes("Union Pacific operates the excursion")) failures.push("Reject incorrect passenger operator attribution");
if (guide.includes("the Palestine extension was built to move Capitol iron")) failures.push("Reject unsupported Capitol shipment narrative");
if (!guide.includes('alt: "Texas State Railroad diesel locomotive')) failures.push("Specific railroad hero alt text missing");
if (failures.length) {
  console.error(`Texas State Railroad authority audit failed (${failures.length}):\n${failures.map(x => "- "+x).join("\n")}`);
  process.exit(1);
}
console.log(`Texas State Railroad authority: PASS; ${paragraphs} paragraphs, ${headings} headings, ${sourceUrls} research sources; reciprocal county, destination, museum and scenic-train links present.`);
