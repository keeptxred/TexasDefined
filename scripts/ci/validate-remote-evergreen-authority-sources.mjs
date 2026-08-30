import { readFileSync } from "node:fs";

const REQUIRED_SLUGS = [
  "sam-houston-texas-life-legacy",
  "davy-crockett-texas-alamo-legend",
  "william-barret-travis-alamo-commander",
  "james-bowie-texas-alamo-life-legend",
  "stephen-f-austin-father-of-texas",
  "mirabeau-b-lamar-president-republic-texas",
  "juan-seguin-tejano-texas-revolution",
  "audie-murphy-texas-war-hero-actor",
  "chester-nimitz-texas-fleet-admiral",
  "chris-kyle-texas-navy-seal-life-legacy",
  "heb-texas-grocery-history-culture",
  "bucees-texas-road-trip-history",
  "king-ranch-texas-history-cattle-legacy",
  "san-antonio-spurs-texas-basketball-culture",
  "texas-high-school-football-friday-night-lights",
  "san-antonio-stock-show-rodeo-history-guide",
  "fort-worth-stockyards-history-cattle-culture",
  "blue-bell-ice-cream-brenham-texas-history",
  "texas-oil-boom-wichita-falls-west-texas-rigs",
];

const APPROVED_SOURCE_HOSTS = new Set([
  "arlingtoncemetery.mil", "buc-ees.com", "careers.heb.com", "chron.com", "fortworthtexas.gov", "gov.texas.gov",
  "history.navy.mil", "king-ranch.com", "newsroom.heb.com", "nba.com", "sanantonio.gov", "sarodeo.com",
  "thealamo.org", "tshaonline.org", "tsl.texas.gov", "uiltexas.org", "www.arlingtoncemetery.mil", "www.bluebell.com",
  "www.chron.com", "www.fda.gov", "www.fortworthtexas.gov", "www.history.navy.mil", "www.nba.com", "www.navy.mil",
  "www.rrc.texas.gov", "www.sanantonio.gov", "www.sarodeo.com", "www.thealamo.org", "www.tshaonline.org",
  "www.tsl.texas.gov", "www.uiltexas.org",
]);

const sourceUrl = new URL("../../src/data/remote-evergreen-authority-sources.ts", import.meta.url);
const sourceText = readFileSync(sourceUrl, "utf8");
const fallbackUrl = new URL("../../src/data/remote-evergreen-source-fallbacks.ts", import.meta.url);
const fallbackText = readFileSync(fallbackUrl, "utf8");
const queriesUrl = new URL("../../src/data/queries.ts", import.meta.url);
const queriesText = readFileSync(queriesUrl, "utf8");
const articleRouteUrl = new URL("../../src/routes/article.$slug.tsx", import.meta.url);
const articleRouteText = readFileSync(articleRouteUrl, "utf8");
const entries = new Map();
const fallbacks = new Map();

for (const line of sourceText.split(/\r?\n/)) {
  const entryMatch = line.match(/^\s{2}"([^"]+)": \[(.*)\],?$/);
  if (!entryMatch) continue;
  const [, slug, listText] = entryMatch;
  const sources = [];
  const sourcePattern = /\{ label: "([^"]+)", url: "([^"]+)", scope: "([^"]+)" \}/g;
  let match;
  while ((match = sourcePattern.exec(listText)) !== null) sources.push({ label: match[1], url: match[2], scope: match[3] });
  if (!sources.length) throw new Error(`Could not parse authority sources for ${slug}`);
  entries.set(slug, sources);
}

for (const line of fallbackText.split(/\r?\n/)) {
  const match = line.match(/^\s{2}"([^"]+)": \{ name: "([^"]+)", url: "([^"]+)" \},?$/);
  if (!match) continue;
  fallbacks.set(match[1], { name: match[2], url: match[3] });
}

const actualSlugs = [...entries.keys()].sort();
const fallbackSlugs = [...fallbacks.keys()].sort();
const requiredSlugs = [...REQUIRED_SLUGS].sort();
if (JSON.stringify(actualSlugs) !== JSON.stringify(requiredSlugs)) {
  throw new Error(`Evergreen authority cohort mismatch. Expected ${requiredSlugs.join(", ")}; found ${actualSlugs.join(", ")}`);
}
if (JSON.stringify(fallbackSlugs) !== JSON.stringify(requiredSlugs)) {
  throw new Error(`Evergreen primary-source fallback mismatch. Expected ${requiredSlugs.join(", ")}; found ${fallbackSlugs.join(", ")}`);
}

for (const slug of REQUIRED_SLUGS) {
  const sources = entries.get(slug);
  if (!sources || sources.length < 2) throw new Error(`${slug} must have at least two authority sources`);
  const urls = new Set(sources.map((source) => source.url));
  if (urls.size !== sources.length) throw new Error(`${slug} contains duplicate authority-source URLs`);
  for (const source of sources) {
    if (source.label.trim().length < 8) throw new Error(`${slug} has an authority-source label shorter than 8 characters`);
    if (source.scope.trim().length < 20) throw new Error(`${slug} has an authority-source scope shorter than 20 characters`);
    const url = new URL(source.url);
    if (url.protocol !== "https:") throw new Error(`${slug} uses a non-HTTPS authority source: ${source.url}`);
    if (!APPROVED_SOURCE_HOSTS.has(url.hostname)) throw new Error(`${slug} uses an unapproved authority-source host: ${url.hostname}`);
  }

  const fallback = fallbacks.get(slug);
  if (!fallback) throw new Error(`${slug} is missing its compact primary-source fallback`);
  if (fallback.name.trim().length < 3) throw new Error(`${slug} has an invalid fallback source name`);
  const fallbackParsedUrl = new URL(fallback.url);
  if (fallbackParsedUrl.protocol !== "https:") throw new Error(`${slug} uses a non-HTTPS fallback source: ${fallback.url}`);
  if (!APPROVED_SOURCE_HOSTS.has(fallbackParsedUrl.hostname)) throw new Error(`${slug} uses an unapproved fallback source host: ${fallbackParsedUrl.hostname}`);
  if (fallback.url !== sources[0].url || fallback.name !== sources[0].label) {
    throw new Error(`${slug} compact fallback must exactly match the first audited authority source`);
  }
}

for (const marker of [
  'const SOURCES_HEADING = "Sources and further reading";',
  'export function ensureRemoteEvergreenSourceFallback(article: Article): Article',
  'const sourceName = article.sourceName?.trim() || fallback.name;',
  'const sourceUrl = article.sourceUrl?.trim() || fallback.url;',
  '{ type: "heading" as const, text: SOURCES_HEADING }',
  'return { ...article, sourceName, sourceUrl, body };',
]) {
  if (!fallbackText.includes(marker)) throw new Error(`Compact evergreen source fallback is missing marker: ${marker}`);
}

for (const marker of [
  'import { ensureRemoteEvergreenSourceFallback } from "./remote-evergreen-source-fallbacks";',
  'return prepareArticleForDelivery(ensureRemoteEvergreenSourceFallback(article));',
  'if (localArticle.sourceName && localArticle.sourceUrl) return prepareArticleDetail(localArticle);',
  'return prepareArticleDetail(sourceHydratedLocalArticle);',
  'return remoteArticle ? prepareArticleDetail(remoteArticle) : null;',
]) {
  if (!queriesText.includes(marker)) throw new Error(`Article query is missing synchronous evergreen fallback marker: ${marker}`);
}
if (queriesText.includes('await import("./remote-evergreen-authority-sources")')) {
  throw new Error("Article query must not depend on a runtime dynamic authority-source import for the governed 19-page fallback.");
}

for (const marker of [
  'import { remoteEvergreenAuthoritySources } from "@/data/remote-evergreen-authority-sources";',
  'const [authors, categories, related, destinations, graph] = await Promise.all([',
  'return { article, authors, categories, related, destinations, graph };',
  'const { article, graph, categories, destinations, authors, related } = Route.useLoaderData();',
  'const primarySource = articlePrimarySource(article);',
  'citation: primarySource.url',
  'Primary source:',
  'Sources and further reading',
]) {
  if (!articleRouteText.includes(marker)) throw new Error(`Article route is missing SSR authority-source marker: ${marker}`);
}

if (articleRouteText.includes('useSuspenseQuery(articleQuery(')) {
  throw new Error('Article route must render the loader-resolved article directly instead of launching a second suspense article query.');
}

console.log(`Validated ${REQUIRED_SLUGS.length} audited authority records, exact compact synchronous fallbacks, all article delivery paths, and SSR source rendering.`);
