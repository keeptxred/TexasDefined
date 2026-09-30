import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  hub: "src/data/fixtures/indigenous-texas-history-native-nations.ts",
  caddo: "src/data/fixtures/caddo-texas-history-homelands-mounds-removal.ts",
  comanche: "src/data/fixtures/comanche-texas-history-comancheria-red-river-war.ts",
  living: "src/data/fixtures/living-tribal-nations-texas-today.ts",
  lazy: "src/data/fixtures/lazy-historic-supporting.ts",
  sources: "src/data/local-article-authority-sources.ts",
  articleRoute: "src/routes/article.$slug.tsx",
  historyHub: "src/routes/texas-history.lazy.tsx",
  authorityUi: "src/components/content/IndigenousTexasAuthorityHub.tsx",
  originsNav: "src/components/content/TexasOriginsAuthorityNav.tsx",
  productionSurfaces: "scripts/ci/verify-production-surfaces.mjs",
};
for (const path of Object.values(paths)) if (!fs.existsSync(path)) failures.push("Missing Indigenous authority-cluster dependency: " + path);
const content = Object.fromEntries(Object.entries(paths).map(([key,path]) => [key, fs.existsSync(path) ? read(path) : ""]));

for (const [key, minimumParagraphs] of [["hub", 40], ["caddo", 20], ["comanche", 22], ["living", 18]]) {
  const paragraphs = (content[key].match(/\bp\("/g) || []).length;
  if (paragraphs < minimumParagraphs) failures.push(key + " article is too thin: " + paragraphs + " paragraphs; expected at least " + minimumParagraphs + ".");
}
for (const [key, slug] of [
  ["caddo","caddo-texas-history-homelands-mounds-removal"],
  ["comanche","comanche-texas-history-comancheria-red-river-war"],
  ["living","living-tribal-nations-texas-today"],
]) {
  if (!content[key].includes('slug: "' + slug + '"')) failures.push("Missing deep-dive slug: " + slug);
  if (!content.lazy.includes('slug: "' + slug + '"') || !content.lazy.includes('import("./' + slug + '")')) failures.push("Deep dive is not lazy-registered: " + slug);
  if (!content.historyHub.includes('slug: "' + slug + '"')) failures.push("Texas History hub is missing deep dive: " + slug);
  if (!content.sources.includes('"' + slug + '": [')) failures.push("Deep dive source trail is missing: " + slug);
}
const indigenousSourceBlock = (content.sources.split('"indigenous-texas-history-native-nations": [')[1] || "").split('\n  ],\n  "caddo-texas-history-homelands-mounds-removal"')[0] || "";
const indigenousSourceCount = (indigenousSourceBlock.match(/url: "https:\/\//g) || []).length;
if (indigenousSourceCount < 20) failures.push("Indigenous hub source trail is too thin: " + indigenousSourceCount + "; expected at least 20 sources.");

for (const marker of [
  "Start with land, time and living nations—not a modern state boundary",
  "Six geographic frames make the history easier to understand",
  "Native Texas is present tense",
  "Tribal + academic",
  "caddo-texas-history-homelands-mounds-removal",
  "comanche-texas-history-comancheria-red-river-war",
  "living-tribal-nations-texas-today",
]) if (!content.authorityUi.includes(marker)) failures.push("Indigenous authority UI marker missing: " + marker);

for (const marker of [
  "Texas origins · authority series",
  "Indigenous history comes first",
  "texas-revolution-historic-sites-road-trip",
  "republic-of-texas-government-trail",
  "texas-us-mexican-war-palo-alto-guide",
]) if (!content.originsNav.includes(marker)) failures.push("Origins navigation marker missing: " + marker);

for (const marker of [
  "TexasOriginsAuthorityNav",
  "IndigenousTexasAuthorityHub",
  "authoritySources.length >= 8",
  "authoritative sources",
]) if (!content.articleRoute.includes(marker)) failures.push("Article-route authority UX marker missing: " + marker);

for (const marker of [
  "/article/caddo-texas-history-homelands-mounds-removal",
  "/article/comanche-texas-history-comancheria-red-river-war",
  "/article/living-tribal-nations-texas-today",
  "/destination/seminole-canyon-state-park-and-historic-site",
  "Seminole Canyon and the Lower Pecos preserve another deep archive",
]) if (!content.hub.includes(marker)) failures.push("Indigenous hub content/link marker missing: " + marker);

for (const key of ["texas-red-river-war-guide","texas-borderlands-historic-sites-guide","spanish-texas-military-battle-medina","mexican-texas-military-history"]) {
  if (!content.sources.includes('"' + key + '": [')) failures.push("Related authority source trail missing: " + key);
}

for (const marker of [
  "Texas history begins before Texas.",
  "Indigenous Texas authority hub",
  "Caddo Texas: homelands, mounds and removal",
  "Comanche Texas: horses, trade and the Red River War",
  "Tribal nations in Texas today",
]) if (!content.historyHub.includes(marker)) failures.push("Texas History origin-cluster UI marker missing: " + marker);

for (const marker of [
  "indigenous-texas-reference-hub",
  "indigenous-texas-regions-ui",
  "indigenous-texas-living-ui",
  "texas-origins-series",
  "caddo-texas-authority",
  "comanche-texas-authority",
  "tribal-nations-texas-authority",
  "caddo-texas-sitemap",
  "comanche-texas-sitemap",
  "tribal-nations-texas-sitemap",
]) if (!content.productionSurfaces.includes(marker)) failures.push("Production smoke marker missing: " + marker);

if (failures.length) {
  console.error("Indigenous Texas authority cluster validation failed:");
  failures.forEach((failure) => console.error("- " + failure));
  process.exit(1);
}
console.log("Indigenous Texas authority cluster validation passed: canonical hub + three deep dives, " + indigenousSourceCount + " hub sources, regional/timeline/living-nations UI, shared origins navigation, expanded related-page sources, history-hub discovery and live production smoke are protected.");
