import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "src/data/fixtures/texas-gateway-articles.ts",
  "src/data/fixtures/texas-gateway-articles-batch2.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch3.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch4.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch5.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch6.ts",
  "src/data/fixtures/texas-gateway-regional-batch7.ts",
  "src/data/fixtures/texas-gateway-bestof-batch8.ts",
  "src/data/fixtures/texas-gateway-bestof-batch9.ts",
  "src/data/fixtures/texas-gateway-itinerary-batch10.ts",
  "src/data/fixtures/texas-gateway-decision-batch11.ts",
  "src/data/fixtures/texas-gateway-decision-batch12.ts",
  "src/data/fixtures/texas-gateway-decision-batch13.ts",
  "src/data/fixtures/texas-gateway-occasion-batch14.ts",
  "src/data/fixtures/texas-gateway-monthly-batch15.ts",
  "src/data/fixtures/texas-gateway-identity-batch16.ts",
];

const rows = [];
const hrefs = [];
const editorialDebris = /\b(?:TODO|TBD|placeholder|editor(?:'s)? note)\b|out of state[—-]+keep/i;
for (const file of files) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) throw new Error(`Missing gateway module: ${file}`);
  const source = fs.readFileSync(full, "utf8");
  const debrisMatch = source.match(editorialDebris);
  if (debrisMatch) throw new Error(`${file}: reader-facing editorial debris detected: ${debrisMatch[0]}`);

  const objectIds = [...source.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
  const objectSlugs = [...source.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
  if (objectIds.length !== objectSlugs.length) {
    throw new Error(`${file}: found ${objectIds.length} object IDs but ${objectSlugs.length} object slugs`);
  }
  objectIds.forEach((id, index) => rows.push({ id, slug: objectSlugs[index], file }));

  for (const match of source.matchAll(/\b(?:make|trip|article)\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g)) {
    rows.push({ id: match[1], slug: match[2], file });
  }

  for (const match of source.matchAll(/href:\s*"([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) {
      throw new Error(`${file}: invalid gateway internal href ${href}`);
    }
    hrefs.push({ href, file });
  }
}

if (rows.length !== 140) {
  throw new Error(`Gateway consolidation count changed: expected exactly 140 articles, found ${rows.length}`);
}

const duplicates = (key) => {
  const seen = new Map();
  for (const row of rows) {
    const value = row[key];
    const list = seen.get(value) ?? [];
    list.push(row.file);
    seen.set(value, list);
  }
  return [...seen.entries()].filter(([, sources]) => sources.length > 1);
};

const duplicateIds = duplicates("id");
const duplicateSlugs = duplicates("slug");
if (duplicateIds.length) throw new Error(`Duplicate gateway IDs: ${duplicateIds.map(([value]) => value).join(", ")}`);
if (duplicateSlugs.length) throw new Error(`Duplicate gateway slugs: ${duplicateSlugs.map(([value]) => value).join(", ")}`);

function walk(dir, output = []) {
  if (!fs.existsSync(dir)) return output;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, output);
    else if (/\.(?:ts|tsx)$/.test(entry.name)) output.push(full);
  }
  return output;
}

const normalizeRoute = (value) => value === "/" ? value : value.replace(/\/+$/, "");
const sourceFiles = walk(path.join(root, "src"));
const articleSlugs = new Set(rows.map((row) => row.slug));
for (const sourceFile of sourceFiles) {
  const source = fs.readFileSync(sourceFile, "utf8");
  for (const match of source.matchAll(/\bslug:\s*["']([^"']+)["']/g)) articleSlugs.add(match[1]);
}

const publicRoutesPath = path.join(root, "src/lib/public-routes.ts");
if (!fs.existsSync(publicRoutesPath)) throw new Error("Missing src/lib/public-routes.ts");
const publicRouteSource = fs.readFileSync(publicRoutesPath, "utf8");
const publicRoutes = new Set(
  [...publicRouteSource.matchAll(/["'](\/[^"']*)["']/g)].map((match) => normalizeRoute(match[1])),
);
publicRoutes.add("/");

const gatewayAliases = {
  "/lakes-rivers": "/explore/lakes-rivers",
  "/major-springs": "/explore/major-springs",
  "/state-parks": "/explore/state-parks",
  "/national-parks": "/explore/national-parks",
  "/caverns": "/explore/caverns",
  "/beaches-coast": "/explore/beaches-coast",
  "/historic-sites": "/explore/historic-sites",
  "/road-trips": "/explore/road-trips",
  "/small-towns": "/explore/small-towns",
  "/food-bbq": "/explore/food-bbq",
  "/outdoors": "/explore/outdoors",
  "/explore/texas-camping-guide": "/best-places-to-go-camping-in-texas",
};

const dynamicPrefixes = [
  "/explore/",
  "/destination/",
  "/county/",
  "/city/",
  "/texas-vs/",
  "/property-tax/county/",
];
const isKnownRoute = (route) => publicRoutes.has(route) || dynamicPrefixes.some((prefix) => route.startsWith(prefix));
const brokenLinks = [];
for (const { href, file } of hrefs) {
  const sourcePath = normalizeRoute(href.split(/[?#]/, 1)[0] || "/");
  const clean = gatewayAliases[sourcePath] ?? sourcePath;
  if (clean.startsWith("/article/")) {
    const slug = clean.slice("/article/".length);
    if (!articleSlugs.has(slug)) brokenLinks.push({ href, file, reason: "unknown article slug" });
    continue;
  }
  if (!isKnownRoute(clean)) brokenLinks.push({ href, file, reason: `missing public route after normalization (${clean})` });
}
if (brokenLinks.length) {
  const detail = brokenLinks.slice(0, 25).map((item) => `${item.href} (${item.reason}; ${item.file})`).join("\n");
  throw new Error(`Broken gateway internal links (${brokenLinks.length}):\n${detail}`);
}

const loaderPath = path.join(root, "src/data/fixtures/lazy-texas-gateway.ts");
const corePath = path.join(root, "src/data/fixtures/lazy-texas-core-articles.ts");
const stubsPath = path.join(root, "src/data/fixtures/texas-gateway-index-ready-stubs.ts");
for (const required of [loaderPath, corePath, stubsPath]) {
  if (!fs.existsSync(required)) throw new Error(`Missing gateway integration file: ${path.relative(root, required)}`);
}

const loader = fs.readFileSync(loaderPath, "utf8");
const core = fs.readFileSync(corePath, "utf8");
for (const file of files) {
  const moduleName = `./${path.basename(file, ".ts")}`;
  if (!loader.includes(`import("${moduleName}")`)) throw new Error(`Lazy loader does not reference ${moduleName}`);
}
for (const [legacy, canonical] of Object.entries(gatewayAliases)) {
  if (!loader.includes(`"${legacy}": "${canonical}"`)) throw new Error(`Gateway loader is missing alias normalization ${legacy} -> ${canonical}`);
  if (!isKnownRoute(canonical)) throw new Error(`Gateway alias target is not a public route: ${canonical}`);
}
if (!core.includes('await import("./lazy-texas-gateway")')) throw new Error("Core article resolution is not dynamically loading full gateway articles");
if (!core.includes('import { texasGatewayIndexReadyStubs } from "./texas-gateway-index-ready-stubs";')) throw new Error("Core article discovery is missing the lightweight gateway promotion registry");
if (!core.includes("texasCoreArticleStubs.push(...texasGatewayIndexReadyStubs);")) throw new Error("Promoted gateway stubs are missing from existing article list/search discovery");
if (/^import .*from "\.\/texas-gateway-(?!index-ready-stubs)/m.test(core)) throw new Error("Core article registry must not statically import full gateway content modules");

console.log(`PASS Texas gateway consolidation: ${rows.length} unique articles across ${files.length} modules`);
console.log(`PASS gateway internal links: ${hrefs.length} validated against public routes`);
console.log("PASS gateway editorial hygiene: no TODO/TBD/placeholder/editor-note debris detected");
console.log("PASS gateway discovery architecture: full bodies stay lazy; only explicit promotion stubs enter synchronous list/search discovery");
