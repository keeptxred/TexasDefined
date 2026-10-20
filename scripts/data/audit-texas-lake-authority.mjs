/**
 * TexasDefined lake authority inventory & coverage audit.
 * Offline static coverage check: it does NOT verify operating hours, photo URLs,
 * current regulations or make competitive ranking claims.
 * Run: node scripts/data/audit-texas-lake-authority.mjs [--write]
 */
import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(path.join(process.cwd(), file), "utf8");
const slugsFile = read("src/data/fishing/slugs.ts");
const statewide = read("src/data/fishing/statewide-lake-network.ts");
const photoLibrary = read("src/data/fishing/image-library.ts");
const legacyDestinations = read("src/data/fixtures/legacy-lakes.ts");
const prototypeFiles = [
  "src/data/fishing/showcase-lakes-prototype.ts",
  "src/data/fishing/expanded-showcase-lakes-prototype.ts",
  "src/data/fishing/wave2-showcase-lakes-prototype.ts",
].map((path) => [path, read(path)]);
const conroe = read("src/data/fishing/lake-conroe-prototype.ts");
const getArray = (key) => {
  const block = slugsFile.match(new RegExp(key + "\\s*=\\s*\\[([^\\]]+)\\]", "s"))?.[1] ?? "";
  return [...block.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
};
const slugs = [
  ...getArray("BASE_COMPLETE_FISHING_LAKE_SLUGS"),
  ...getArray("WAVE2_COMPLETE_FISHING_LAKE_SLUGS"),
  ...getArray("STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS"),
];
const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
if (duplicates.length) throw new Error("Duplicate complete lake slugs: " + duplicates.join(", "));
const status = (yes) => yes ? "yes" : "no";
const baselines = {
  official: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lakelist.phtml",
  sourceReviewed: "2026-10-12",
  sectionsPerGuide: 9,
  officialLakeFinderCovers: "more than 150 lake destinations (TPWD's own description)",
};
const entries = slugs.map((slug) => {
  const isStatewide = statewide.includes(`    slug: "${slug}", name:`);
  const sourceFile = isStatewide
    ? "src/data/fishing/statewide-lake-network.ts"
    : prototypeFiles.find(([, body]) => body.includes(`slug: "${slug}"`))?.[0];
  const src = isStatewide ? statewide : prototypeFiles.find(([p]) => p === sourceFile)?.[1] ?? "";
  const start = src.indexOf(`slug: "${slug}"`);
  const end = isStatewide ? src.indexOf("\n  },", start) : src.indexOf("\n};", start);
  const block = start >= 0 ? src.slice(start, end > start ? end : start + 20000) : "";
  if (slug === "lake-conroe") {
    return {
      slug, name: "Lake Conroe", page: "/fishing/lakes/lake-conroe", tier: "dedicated",
      sourceFile: "src/data/fishing/lake-conroe-prototype.ts",
      officialTpwd: conroe.includes("tpwd.texas.gov"), mappedPhoto: photoLibrary.includes('"lake-conroe":'),
      fishTargets: 5, namedAccess: conroe.includes("lakeConroeAccess"),
      namedCamping: conroe.includes("lakeConroeCamping"),
      independentHistorySource: conroe.includes("twdb.texas.gov"),
      regionalLinks: conroe.includes("/county/montgomery"),
      officialWaterLevel: conroe.includes("waterdatafortexas.org"),
      reviewStatus: "structural only; fact-check every source and facility",
    };
  }
  if (!block) throw new Error("No lake definition/prototype for " + slug);
  const region = block.match(/region:\s*"([^"]+)"/)?.[1] ?? null;
  const name = block.match(/name:\s*"([^"]+)"/)?.[1] ?? slug;
  const accessStart = block.indexOf("access:");
  const campStart = block.indexOf("camping:");
  const nearbyStart = block.indexOf("nearby:");
  const boatingStart = block.indexOf("boatingNotes:");
  const accessBlock = accessStart >= 0 ? block.slice(accessStart, boatingStart > accessStart ? boatingStart : accessStart + 700) : "";
  const campingBlock = campStart >= 0 ? block.slice(campStart, nearbyStart > campStart ? nearbyStart : campStart + 700) : "";
  const namedAccess = isStatewide ? block.includes("accessPoints:") : /name:\s*"/.test(accessBlock) && !/public access inventory/.test(accessBlock);
  const namedCamping = isStatewide ? /camping:\s*\{/.test(block)
    : /name:\s*"/.test(campingBlock) && !/trip-planning options|Camping and lodging planning/i.test(campingBlock);
  const fishTargets = isStatewide
    ? [...block.matchAll(/\bfish\(/g)].length
    : [...block.slice(block.indexOf("fish:"), accessStart > -1 ? accessStart : block.length).matchAll(/\bid:\s*"/g)].length;
  return {
    slug, name, page: "/fishing/lakes/" + slug,
    tier: isStatewide ? "statewide-template" : "showcase",
    sourceFile: sourceFile ?? null, region,
    officialTpwd: isStatewide ? !!block.match(/tpwdSlug:/) : block.includes("tpwdLake:"),
    mappedPhoto: photoLibrary.includes('"' + slug + '":'),
    fishTargets,
    namedAccess,
    namedCamping,
    independentHistorySource: isStatewide ? block.includes("historySourceUrl:") : block.includes("twdb:") || block.includes("reservoirHistory:"),
    regionalLinks: isStatewide ? block.includes("counties:") : block.includes("/county/"),
    officialWaterLevel: isStatewide ? /waterDataSlug:|lcraHydrometSiteNumber:|liveDataNote:/.test(block) : block.includes("liveLevel:"),
    reviewStatus: "structural only; current conditions, operator facts, links, imagery and all comparisons unverified",
  };
});
const textRecords = legacyDestinations.match(/const records = `([\s\S]*?)`\.trim\(\)/)?.[1] ?? "";
const legacy = textRecords.trim().split("\n").filter(Boolean).map((line) => {
  const [slug, name, city, county, region, lat, lng, summary, source] = line.split("|");
  return {
    slug, name, category: source?.includes("/state-parks/") ? "state-park" : "lake-nra",
    page: "/destination/" + slug, county, region,
    source, locationMapped: Boolean(lat && lng),
    genericHeroAtDataLayer: true,
    editorialQA: "Check production hero overrides, amenities, entrance/fees, accessibility, lake-guide cross-links and current source facts",
  };
});
const missing = entries.filter((entry) => !entry.officialTpwd || !entry.mappedPhoto || !entry.regionalLinks);
if (missing.length) {
  throw new Error("Structural authority regression (missing official source/photo/county): " + missing.map((x) => x.slug).join(", "));
}
const summary = {
  completeGuides: entries.length,
  specialSections: entries.length * baselines.sectionsPerGuide,
  statewideTemplate: entries.filter((x) => x.tier === "statewide-template").length,
  explicitNamedAccess: entries.filter((x) => x.namedAccess).length,
  lackingNamedAccess: entries.filter((x) => !x.namedAccess).length,
  explicitNamedCamping: entries.filter((x) => x.namedCamping).length,
  lackingNamedCamping: entries.filter((x) => !x.namedCamping).length,
  separateHistoricalSource: entries.filter((x) => x.independentHistorySource).length,
  sitePhotoMapping: entries.filter((x) => x.mappedPhoto).length,
  legacyDestinationEntries: legacy.length,
  legacyStateParks: legacy.filter((x) => x.category === "state-park").length,
  legacyNraPages: legacy.filter((x) => x.category === "lake-nra").length,
};
console.log(JSON.stringify({ summary, warnings: [
  "Official TPWD Lake Finder has more than 150 lake profiles. Coverage expansion is required.",
  "A page may be structurally complete while still failing independent visitor-authority standards.",
  "Generic legacy destination images are a data-layer risk; production overrides were not inspected.",
], ...baselines }, null, 2));
if (process.argv.includes("--write")) {
  const out = path.join(process.cwd(), "docs/fishing");
  fs.mkdirSync(out, {recursive: true});
  fs.writeFileSync(path.join(out, "ALL_LAKE_AUTHORITY_INVENTORY_2026-10-12.json"), JSON.stringify({schemaVersion: 1, ...baselines, summary, lakePages: entries, legacyDestinationPages: legacy}, null, 2) + "\n");
}
