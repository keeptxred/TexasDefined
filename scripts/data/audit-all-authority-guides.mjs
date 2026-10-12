/**
 * TexasDefined complete-guide discovery and gap inventory.
 * Scans every checked-in route and the fixture/article datasets; enumerates dynamic
 * guide families separately because static source inspection cannot count live Supabase rows.
 *
 * This reports gaps; it must never silently mark a page fact-checked or deindex
 * a legacy page because a static source grep couldn't resolve a data import.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));
const entries = (dir) => exists(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : [];
function walk(dir) {
  return entries(dir).flatMap((x) => {
    const p = path.posix.join(dir, x.name);
    return x.isDirectory() ? walk(p) : [p];
  });
}
const families = [
  { key: "editorial-articles", label: "Editorial and best-of article guides", route: "/article/$slug", registry: "src/data/fixtures", source: "mixed lazy fixtures and remote evergreen" },
  { key: "destinations", label: "Destination, attraction, park, museum and town visitor guides", route: "/destination/$slug", registry: "src/data/explore-remote.ts", source: "shared Supabase Explore catalog and local fallback" },
  { key: "counties", label: "County and city reference guides", route: "/county/$slug", registry: "src/data", source: "shared generated and Supabase geography records" },
  { key: "painted-churches", label: "Painted Churches individual search and visitor guides", route: "/explore/painted-churches/guides/$slug", registry: "src/data/painted-church-search-guides.ts", source: "typed editorial registry" },
  { key: "fishing-guide-profiles", label: "Fishing charter and guide profiles", route: "/fishing/guides/$slug", registry: "src/data/fishing", source: "fishing directory registry" },
  { key: "lakes", label: "Fishing and swimming lake guides", route: "/fishing/lake/$slug", registry: "src/data/fishing", source: "lake catalog and lake authority profiles" },
  { key: "local-near", label: "Proximity and local-intent travel guides", route: "/explore/near/$metro/$collection", registry: "src/data", source: "location-based generation" },
  { key: "topic-collections", label: "Explore category and region guides", route: "/explore/$category", registry: "src/data/explore-categories.ts", source: "category and geography catalogs" },
  { key: "research", label: "Texas data, living, property tax, insurance and relocation guides", route: "/texas-data/research/$slug", registry: "src/data", source: "research and topical editorial pages" },
];
function classify(text) {
  if (/fish|lake|river|tub|swim|paddl|boat|water/i.test(text)) return "water-and-fishing";
  if (/park|camp|rv-|ohv|trail|bird|outdoor|hunting|mountain|rock-climb/i.test(text)) return "parks-and-outdoors";
  if (/museum|church|historic|heritage|old-west|military|battle/i.test(text)) return "history-and-culture";
  if (/tax|insurance|property|home|pool|pest|snake|mortgage|law|regulation|money/i.test(text)) return "home-finance-and-safety";
  if (/town|road|scenic|travel|trip|weekend|citypass|antique|winer/i.test(text)) return "travel-and-lodging";
  return "general-reference";
}
const requiredByTopic = {
  "water-and-fishing": ["permit or licensing", "legal access and location", "flow/level/weather", "official regulations", "recreation fit"],
  "parks-and-outdoors": ["managed access", "season and safety", "facility/campsite facts if relevant", "rules and reservations", "weather"],
  "history-and-culture": ["primary historical records", "collections or interpretive scope", "visitor access/accessibility", "hours/admission when relevant", "history context"],
  "home-finance-and-safety": ["official legal/technical source", "as-of rules and dates", "eligibility/safety", "step-by-step actions", "county/state variation"],
  "travel-and-lodging": ["verified destination details", "practical route/base", "hours or booking when relevant", "accessibility", "alternate plans"],
  "general-reference": ["primary sources", "definitions/method", "topic-specific data", "limitations", "related references"],
};
const routeFiles = walk("src/routes").filter((x) => x.endsWith(".tsx"));
const namedGuides = new Map();
for (const file of routeFiles) {
  const base = file.replace(/\.lazy\.tsx$/, ".tsx");
  const fileName = path.basename(base);
  if (!/(?:^guides\.|\.guides|guide|best-places|best-|camping)/i.test(fileName)) continue;
  if (!namedGuides.has(base)) namedGuides.set(base, []);
  namedGuides.get(base).push(file);
}
const rows = [...namedGuides].map(([file, components]) => {
  const body = [...new Set([...components, file])].filter(exists).map(source).join("\n");
  const slug = file.replace(/^src\/routes\//, "").replace(/\.tsx$/, "");
  const topic = classify(slug);
  // A dynamically imported component can own the actual evidence and photo gallery.
  const hasShared = /from ["']@\/(components|data)\//.test(body);
  const presence = {
    primarySource: /https:\/\/|officialSources|authoritySources|\.sources|sourceUrl/i.test(body),
    image: /<img|\/images\/|@\/assets|heroImage|imageRef|image:/i.test(body),
    freshness: /verifiedAt|reviewedAt|lastVerified|lastReview|sourceCheckedAt|updatedAt|last checked|checked on/i.test(body),
    crossLinks: /<Link|href=|internalLinks|relatedPaths|\.related|<a /i.test(body),
    guidance: /access|reservation|permit|fee|history|safety|plan|cost|schedule|hours|regulations|when to visit|steps/i.test(body),
  };
  const ambiguous = hasShared && Object.values(presence).some((v) => !v);
  const missing = Object.entries(presence).filter(([, v]) => !v).map(([k]) => k);
  return {
    kind: "standalone-route", id: slug, routeFile: file, sourceFiles: components,
    topic, requiredEvidence: requiredByTopic[topic],
    structuralSignals: presence, status: missing.length ? (ambiguous ? "requires-shared-data-inspection" : "needs-remediation") : "requires-fact-and-photo-rights-verification",
    gaps: missing, dynamicDependencies: hasShared,
  };
});
const fixtureFiles = walk("src/data/fixtures").filter((x) => /\.[cm]?[jt]sx?$/.test(x));
const articleRefs = new Map();
for (const file of fixtureFiles) {
  const t = source(file);
  // Source-level inventory only. Slug matches do not imply content is live.
  const re = /(?:^|[,\s{])slug:\s*["']([^"']+)["']/gm;
  for (const match of t.matchAll(re)) {
    const slug = match[1];
    if (!/(guide|best-|travel|camp|rv-|fishing|tubing|swimming|road-trip|museums|antiqu)/i.test(slug)) continue;
    if (!articleRefs.has(slug)) articleRefs.set(slug, []);
    articleRefs.get(slug).push(file);
  }
}
const fixtureRows = [...articleRefs].map(([slug, paths]) => {
  const topic = classify(slug);
  return {
    kind: "article-fixture-candidate", id: slug, sourceFiles: [...new Set(paths)], topic,
    requiredEvidence: requiredByTopic[topic], status: "requires-loaded-article-fact-and-image-audit",
    gaps: ["inspect actual merged article including remote content, rights, internal links and verified dates"],
  };
});
const churchFile = "src/data/painted-church-search-guides.ts";
const churchSource = exists(churchFile) ? source(churchFile) : "";
const body = churchSource.split("export const paintedChurchSearchGuides")[1]?.split("export const paintedChurchSearchCoverage")[0] || "";
const paintedChurchCount = [...body.matchAll(/\bslug:\s*["']([^"']+)["']/g)].length;
const registeredGuideRoutes = JSON.parse(source("docs/editorial/guide-route-registry.json")).routes;
const registeredPaths = new Set(registeredGuideRoutes.map((row) => row.routeFile));
const discoveredPaths = new Set(rows.map((row) => row.routeFile));
const unregisteredGuideRoutes = [...discoveredPaths].filter((item) => !registeredPaths.has(item));
const staleRegistryRoutes = [...registeredPaths].filter((item) => !discoveredPaths.has(item));
const sorted = [...rows, ...fixtureRows].sort((a, b) => a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));
const summary = {
  generatedAt: new Date().toISOString(),
  standaloneRoutes: rows.length,
  fixtureGuideCandidates: fixtureRows.length,
  paintedChurchSearchGuideRecords: paintedChurchCount,
  dynamicGuideFamilies: families.length,
  unregisteredGuideRoutes,
  staleRegistryRoutes,
  sourceCoverageNote: "Additional Supabase rows, generated pages, and externally managed guide records require runtime inventory. Source inspection alone never certifies full coverage.",
  byStatus: Object.fromEntries([...new Set(sorted.map((x) => x.status))].map((key) => [key, sorted.filter((x) => x.status === key).length])),
};
const report = { summary, families, rows: sorted };
const output = process.argv.find((x) => x.startsWith("--output="))?.slice("--output=".length);
if (output) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
}
console.log(JSON.stringify(summary, null, 2));
console.log("Gap samples:", sorted.filter((x) => x.gaps?.length).slice(0, 12).map((x) => x.id + ": " + x.gaps.join(", ")).join(" | "));
if (process.argv.includes("--fail-on-untracked") && (rows.length === 0 || fixtureRows.length === 0 || paintedChurchCount === 0 || unregisteredGuideRoutes.length > 0 || staleRegistryRoutes.length > 0)) { console.error("Guide routes not fully registered or data families unexpectedly absent:", unregisteredGuideRoutes, staleRegistryRoutes); process.exit(1); }
