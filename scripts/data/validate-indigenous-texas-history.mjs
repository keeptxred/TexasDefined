import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");

const articlePath = "src/data/fixtures/indigenous-texas-history-native-nations.ts";
const lazyPath = "src/data/fixtures/lazy-historic-supporting.ts";
const historyHubPath = "src/routes/texas-history.lazy.tsx";
const originsPath = "src/data/fixtures/texas-before-united-states-how-texas-began.ts";
const sourcesPath = "src/data/local-article-authority-sources.ts";
const articleRoutePath = "src/routes/article.$slug.tsx";
const sitemapPath = "src/routes/sitemap[.]xml.ts";
const productionSurfacesPath = "scripts/ci/verify-production-surfaces.mjs";

for (const path of [articlePath, lazyPath, historyHubPath, originsPath, sourcesPath, articleRoutePath, sitemapPath, productionSurfacesPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Indigenous Texas authority dependency: ${path}`);
}

const article = fs.existsSync(articlePath) ? read(articlePath) : "";
const lazy = fs.existsSync(lazyPath) ? read(lazyPath) : "";
const historyHub = fs.existsSync(historyHubPath) ? read(historyHubPath) : "";
const origins = fs.existsSync(originsPath) ? read(originsPath) : "";
const sources = fs.existsSync(sourcesPath) ? read(sourcesPath) : "";
const articleRoute = fs.existsSync(articleRoutePath) ? read(articleRoutePath) : "";
const sitemap = fs.existsSync(sitemapPath) ? read(sitemapPath) : "";
const productionSurfaces = fs.existsSync(productionSurfacesPath) ? read(productionSurfacesPath) : "";

const slug = "indigenous-texas-history-native-nations";
const canonicalPath = `/article/${slug}`;

for (const marker of [
  `slug: "${slug}"`,
  'title: "Indigenous Texas History: Native Nations Before European Colonization"',
  'category: "texas-history"',
  'sourceName: "Texas Historical Commission — Indigenous Texas and Exploration"',
  'sourceUrl: "https://learning.thc.texas.gov/texas-history/indigenous-texas/"',
  'Grass_House_Caddo_Mounds_SHS_Texas_2026.jpg',
  'Larry D. Moore · 2026 · CC BY 4.0 · Wikimedia Commons',
]) {
  if (!article.includes(marker)) failures.push(`Indigenous Texas article contract missing: ${marker}`);
}

const paragraphCount = (article.match(/\bp\("/g) ?? []).length;
const headingCount = (article.match(/\bh\("/g) ?? []).length;
const internalLinkCount = (article.match(/href: "/g) ?? []).length;
if (paragraphCount < 40) failures.push(`Indigenous Texas article is too thin: ${paragraphCount} paragraphs; expected at least 40.`);
if (headingCount < 12) failures.push(`Indigenous Texas article lacks statewide section depth: ${headingCount} headings; expected at least 12.`);
if (internalLinkCount < 10) failures.push(`Indigenous Texas article lacks authority-network depth: ${internalLinkCount} internal links; expected at least 10.`);

for (const marker of [
  "more than 13,000 years",
  "East Texas: Caddo towns",
  "The Gulf Coast: Karankawa",
  "South Texas: many peoples hidden by the word Coahuiltecan",
  "Central Texas: Tonkawa, Apache",
  "The Southern Plains: Comanche power",
  "West Texas and the Rio Grande",
  "European arrival did not mean European control",
  "The Republic and United States accelerated dispossession and removal",
  "Native Texas is still living Texas",
  "Alabama-Coushatta Tribe of Texas",
  "Kickapoo Traditional Tribe of Texas",
  "Ysleta del Sur Pueblo",
  "Caddo Nation",
  "Comanche Nation",
  "Tonkawa Tribe",
]) {
  if (!article.includes(marker)) failures.push(`Indigenous Texas statewide-history marker missing: ${marker}`);
}

for (const href of [
  "/article/texas-before-united-states-how-texas-began",
  "/destination/caddo-mounds-state-historic-site",
  "/destination/hueco-tanks-state-park-and-historic-site",
  "/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso",
  "/destination/lipantitlan",
  "/destination/mission-dolores",
  "/article/texas-borderlands-historic-sites-guide",
  "/county/cherokee",
  "/county/el-paso",
  "/county/polk",
]) {
  if (!article.includes(`href: "${href}"`)) failures.push(`Indigenous Texas internal authority link missing: ${href}`);
}

for (const destination of [
  "caddo-mounds-state-historic-site",
  "hueco-tanks-state-park-and-historic-site",
  "ysleta-del-sur-pueblo-cultural-center-museum-el-paso",
  "lipantitlan",
  "mission-dolores",
]) {
  if (!article.includes(`"${destination}"`)) failures.push(`Indigenous Texas related destination missing: ${destination}`);
}

for (const marker of [
  "const indigenousTexasHistoryNativeNationsStub",
  `slug: "${slug}"`,
  'import("./indigenous-texas-history-native-nations")',
  "indigenousTexasHistoryNativeNationsArticle",
]) {
  if (!lazy.includes(marker)) failures.push(`Indigenous Texas lazy registry contract missing: ${marker}`);
}

if (!historyHub.includes(`slug: "${slug}"`)) failures.push("Texas History hub is missing the Indigenous Texas start-here guide.");
if (!historyHub.includes("Indigenous Texas: Native nations before European colonization")) failures.push("Texas History hub is missing the Indigenous Texas visible discovery label.");
if (!origins.includes(`href: "${canonicalPath}"`)) failures.push("Texas-before-U.S. cornerstone must retain a reciprocal link to the Indigenous Texas guide.");

const requiredAuthoritySourceUrls = [
  "https://learning.thc.texas.gov/texas-history/indigenous-texas/",
  "https://thc.texas.gov/historic-sites/caddo-mounds",
  "https://tpwd.texas.gov/state-parks/hueco-tanks/history",
  "https://www.nps.gov/elte/learn/historyculture/caddo-nation-introduction.htm",
  "https://www.tshaonline.org/handbook/entries/karankawa-indians",
  "https://www.alabama-coushatta.com/about-us/our-history/",
  "https://www.ysletadelsurpueblo.org/about-us",
  "https://kickapootexas.org/",
  "https://mycaddonation.com/history-1",
  "https://www.comanchenation.com/about/page/history",
  "https://tonkawatribe.com/language-culture/history/",
];
if (!sources.includes(`"${slug}": [`)) failures.push("Indigenous Texas multi-source registry entry is missing.");
for (const url of requiredAuthoritySourceUrls) {
  if (!sources.includes(`url: "${url}"`)) failures.push(`Indigenous Texas authority source missing: ${url}`);
}
for (const marker of [
  'import { localArticleAuthoritySources } from "@/data/local-article-authority-sources";',
  "localArticleAuthoritySources[article.slug] ?? remoteEvergreenAuthoritySources[article.slug] ?? []",
  "Sources and further reading",
]) {
  if (!articleRoute.includes(marker)) failures.push(`Indigenous Texas source rendering contract missing: ${marker}`);
}

for (const marker of [
  "platform.articles.list(scope)",
  "isArticleDiscoveryReady(article)",
  "platform.articles.getBySlug(scope, article.slug)",
  "isArticleIndexReady(article)",
  "...indexableLocalArticles.map((article) => ({ path: `/article/${article.slug}`",
]) {
  if (!sitemap.includes(marker)) failures.push(`Indigenous Texas sitemap discovery contract missing: ${marker}`);
}

for (const marker of [
  `['indigenous-texas-authority', '${canonicalPath}', 'Indigenous Texas History: Native Nations Before European Colonization']`,
  `['texas-history-indigenous-discovery', '/texas-history', 'Indigenous Texas: Native nations before European colonization']`,
  `['indigenous-texas-sitemap', '/sitemap.xml', '${canonicalPath}']`,
  `['indigenous-texas-source-panel', '${canonicalPath}', 'Sources and further reading']`,
  `['indigenous-texas-tribal-source', '${canonicalPath}', 'Kickapoo Traditional Tribe of Texas']`,
]) {
  if (!productionSurfaces.includes(marker)) failures.push(`Indigenous Texas production smoke contract missing: ${marker}`);
}

if (failures.length) {
  console.error("Indigenous Texas history authority validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Indigenous Texas history authority validation passed: ${paragraphCount} paragraphs, ${headingCount} statewide sections, ${internalLinkCount} internal authority links, eleven visible authority sources, licensed hero provenance, lazy loading, reciprocal origins discovery, Texas History hub discovery, quality-gated sitemap publication and live production smoke coverage are protected.`,
);
