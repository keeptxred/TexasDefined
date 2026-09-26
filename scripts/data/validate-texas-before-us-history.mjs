import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");

const articlePath = "src/data/fixtures/texas-before-united-states-how-texas-began.ts";
const lazyPath = "src/data/fixtures/lazy-historic-supporting.ts";
const historyHubPath = "src/routes/texas-history.lazy.tsx";
const sitemapPath = "src/routes/sitemap[.]xml.ts";
const productionSurfacesPath = "scripts/ci/verify-production-surfaces.mjs";
const localAuthoritySourcesPath = "src/data/local-article-authority-sources.ts";
const articleRoutePath = "src/routes/article.$slug.tsx";

for (const path of [articlePath, lazyPath, historyHubPath, sitemapPath, productionSurfacesPath, localAuthoritySourcesPath, articleRoutePath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas-before-U.S. authority dependency: ${path}`);
}

const article = fs.existsSync(articlePath) ? read(articlePath) : "";
const lazy = fs.existsSync(lazyPath) ? read(lazyPath) : "";
const historyHub = fs.existsSync(historyHubPath) ? read(historyHubPath) : "";
const sitemap = fs.existsSync(sitemapPath) ? read(sitemapPath) : "";
const productionSurfaces = fs.existsSync(productionSurfacesPath) ? read(productionSurfacesPath) : "";
const localAuthoritySources = fs.existsSync(localAuthoritySourcesPath) ? read(localAuthoritySourcesPath) : "";
const articleRoute = fs.existsSync(articleRoutePath) ? read(articleRoutePath) : "";

const slug = "texas-before-united-states-how-texas-began";
const canonicalPath = `/article/${slug}`;

for (const marker of [
  `slug: "${slug}"`,
  'title: "Texas Before the United States: How Texas Began"',
  'category: "texas-history"',
  'sourceName: "Texas Historical Commission — Indigenous Texas and Exploration"',
  'sourceUrl: "https://learning.thc.texas.gov/texas-history/indigenous-texas/"',
  'credit: "Edmund Francis Lee · 1836 · UTA Libraries Special Collections · Public domain · Wikimedia Commons"',
]) {
  if (!article.includes(marker)) failures.push(`Texas-before-U.S. article contract missing: ${marker}`);
}

const paragraphCount = (article.match(/\bp\("/g) ?? []).length;
const headingCount = (article.match(/\bh\("/g) ?? []).length;
if (paragraphCount < 30) failures.push(`Texas-before-U.S. article is too thin: ${paragraphCount} paragraphs; expected at least 30.`);
if (headingCount < 10) failures.push(`Texas-before-U.S. article lacks chronological section depth: ${headingCount} headings; expected at least 10.`);

for (const marker of [
  "Indigenous homelands",
  "1519",
  "1685",
  "Spanish Texas",
  "1821",
  "Coahuila y Tejas",
  "Law of April 6, 1830",
  "October 2, 1835",
  "March 2, 1836",
  "San Jacinto",
  "Republic of Texas",
  "December 29, 1845",
  "February 19, 1846",
  "Treaty of Guadalupe Hidalgo",
  "Compromise of 1850",
]) {
  if (!article.includes(marker)) failures.push(`Texas-before-U.S. chronology marker missing: ${marker}`);
}

for (const href of [
  "/article/spanish-texas-military-battle-medina",
  "/article/mexican-texas-military-history",
  "/article/texas-revolution-historic-sites-road-trip",
  "/article/republic-of-texas-government-trail",
  "/article/republic-of-texas-navy-history",
  "/article/history-of-the-texas-flag",
  "/article/six-flags-over-texas-meaning",
  "/destination/washington-on-the-brazos",
  "/destination/san-jacinto-battleground",
]) {
  if (!article.includes(`href: "${href}"`)) failures.push(`Texas-before-U.S. internal authority link missing: ${href}`);
}

for (const destination of [
  "san-antonio-missions-national-historical-park",
  "the-alamo",
  "presidio-la-bahia",
  "san-felipe-de-austin",
  "washington-on-the-brazos",
  "san-jacinto-battleground",
]) {
  if (!article.includes(`"${destination}"`)) failures.push(`Texas-before-U.S. related destination missing: ${destination}`);
}

for (const marker of [
  'const texasBeforeUnitedStatesStub',
  `slug: "${slug}"`,
  'import("./texas-before-united-states-how-texas-began")',
  "texasBeforeUnitedStatesArticle",
]) {
  if (!lazy.includes(marker)) failures.push(`Texas-before-U.S. lazy registry contract missing: ${marker}`);
}


const requiredAuthoritySourceUrls = [
  "https://learning.thc.texas.gov/texas-history/indigenous-texas/",
  "https://thc.texas.gov/learn/military-history/military-spanish-texas",
  "https://thc.texas.gov/learn/military-history/military-mexican-texas",
  "https://www.tsl.texas.gov/declaration-independence.html",
  "https://thc.texas.gov/learn/military-history/texas-revolution-and-republic",
  "https://www.tshaonline.org/handbook/entries/republic-of-texas",
  "https://www.tsl.texas.gov/lobbyexhibits/homefortexashistory/statehood",
  "https://www.tsl.texas.gov/ref/abouttx/annexation/4july1845.html",
  "https://thc.texas.gov/learn/military-history/texas-mexican-war",
];
if (!localAuthoritySources.includes(`"${slug}": [`)) failures.push("Texas-before-U.S. local multi-source registry entry is missing.");
for (const url of requiredAuthoritySourceUrls) {
  if (!localAuthoritySources.includes(`url: "${url}"`)) failures.push(`Texas-before-U.S. authority source missing: ${url}`);
}
const localSourceCount = (localAuthoritySources.match(/url: "https:\/\//g) ?? []).length;
if (localSourceCount < requiredAuthoritySourceUrls.length) failures.push(`Texas-before-U.S. authority source registry is too thin: ${localSourceCount} URLs.`);
for (const marker of [
  'import { localArticleAuthoritySources } from "@/data/local-article-authority-sources";',
  "localArticleAuthoritySources[article.slug] ?? remoteEvergreenAuthoritySources[article.slug] ?? []",
  "Sources and further reading",
]) {
  if (!articleRoute.includes(marker)) failures.push(`Texas-before-U.S. source rendering contract missing: ${marker}`);
}

if (!historyHub.includes(`slug: "${slug}"`)) failures.push("Texas History hub is missing the Texas-before-U.S. start-here guide.");
if (!historyHub.includes("Texas before the United States: how Texas began")) failures.push("Texas History hub is missing the Texas-before-U.S. visible discovery label.");

for (const marker of [
  "platform.articles.list(scope)",
  "isArticleDiscoveryReady(article)",
  "platform.articles.getBySlug(scope, article.slug)",
  "isArticleIndexReady(article)",
  "...indexableLocalArticles.map((article) => ({ path: `/article/${article.slug}`",
]) {
  if (!sitemap.includes(marker)) failures.push(`Texas-before-U.S. sitemap discovery contract missing: ${marker}`);
}

for (const marker of [
  `['texas-before-us-authority', '${canonicalPath}', 'Texas Before the United States: How Texas Began']`,
  `['texas-history-origins-discovery', '/texas-history', 'Texas before the United States: how Texas began']`,
  `['texas-before-us-sitemap', '/sitemap.xml', '${canonicalPath}']`,
  `['texas-before-us-source-panel', '${canonicalPath}', 'Sources and further reading']`,
  `['texas-before-us-statehood-source', '${canonicalPath}', 'Texas State Library and Archives Commission — Statehood']`,
]) {
  if (!productionSurfaces.includes(marker)) failures.push(`Texas-before-U.S. production smoke contract missing: ${marker}`);
}

if (failures.length) {
  console.error("Texas-before-U.S. history authority validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Texas-before-U.S. history authority validation passed: ${paragraphCount} paragraphs, ${headingCount} chronological sections, source/hero provenance, nine visible authority sources, reciprocal history links, related destinations, lazy loading, History hub discovery, quality-gated sitemap publication and live production smoke coverage are protected.`,
);
