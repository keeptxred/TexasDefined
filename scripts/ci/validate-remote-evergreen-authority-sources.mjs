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
const entries = new Map();

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

const actualSlugs = [...entries.keys()].sort();
const requiredSlugs = [...REQUIRED_SLUGS].sort();
if (JSON.stringify(actualSlugs) !== JSON.stringify(requiredSlugs)) {
  throw new Error(`Evergreen authority cohort mismatch. Expected ${requiredSlugs.join(", ")}; found ${actualSlugs.join(", ")}`);
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
}

const fallbackUrl = new URL("../../src/data/remote-evergreen-source-fallbacks.ts", import.meta.url);
const fallbackText = readFileSync(fallbackUrl, "utf8");
const fallbacks = new Map();
for (const line of fallbackText.split(/\r?\n/)) {
  const match = line.match(/^\s{2}"([^"]+)": \{ name: "([^"]+)", url: "([^"]+)" \},?$/);
  if (!match) continue;
  fallbacks.set(match[1], { name: match[2], url: match[3] });
}

const fallbackSlugs = [...fallbacks.keys()].sort();
if (JSON.stringify(fallbackSlugs) !== JSON.stringify(requiredSlugs)) {
  throw new Error(`Evergreen primary-source fallback mismatch. Expected ${requiredSlugs.join(", ")}; found ${fallbackSlugs.join(", ")}`);
}

for (const slug of REQUIRED_SLUGS) {
  const fallback = fallbacks.get(slug);
  if (!fallback) throw new Error(`${slug} is missing its primary-source fallback`);
  if (fallback.name.trim().length < 3) throw new Error(`${slug} has an invalid fallback source name`);
  const url = new URL(fallback.url);
  if (url.protocol !== "https:") throw new Error(`${slug} uses a non-HTTPS fallback source: ${fallback.url}`);
  if (!APPROVED_SOURCE_HOSTS.has(url.hostname)) throw new Error(`${slug} uses an unapproved fallback source host: ${url.hostname}`);
}

if (!fallbackText.includes('const SOURCES_HEADING = "Sources and further reading"')) {
  throw new Error("Evergreen source fallback must preserve the visible Sources and further reading contract");
}

const queriesUrl = new URL("../../src/data/queries.ts", import.meta.url);
const queriesText = readFileSync(queriesUrl, "utf8");
if (!queriesText.includes('import { ensureRemoteEvergreenSourceFallback } from "./remote-evergreen-source-fallbacks";')) {
  throw new Error("Article query must import the compact evergreen source fallback");
}
for (const target of ["localArticle", "sourceHydratedLocalArticle", "remoteArticle"]) {
  if (!queriesText.includes(`ensureRemoteEvergreenSourceFallback(${target})`)) {
    throw new Error(`Article query must apply evergreen source fallback to ${target}`);
  }
}

console.log(`Validated ${REQUIRED_SLUGS.length} remote evergreen authority-source records and compact production fallbacks.`);