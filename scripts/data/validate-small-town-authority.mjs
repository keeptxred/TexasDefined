#!/usr/bin/env node
/** All existing researched towns and major city-authority profiles—not a fixed shortlist.
 * Run: node scripts/data/validate-small-town-authority.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
const read = (path) => readFileSync(path, "utf8");
const errors = [];
const warn = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

const waveNames = readdirSync("src/data")
  .filter((name) => /^small-town-destinations-wave\d+\.ts$/.test(name))
  .sort((a, b) => Number(a.match(/wave(\d+)/)?.[1]) - Number(b.match(/wave(\d+)/)?.[1]));
const guideSources = [
  ...waveNames.map((name) => ({ filename: "src/data/" + name, text: read("src/data/" + name) })),
  { filename: "src/data/small-town-authority-wave16.ts", text: read("src/data/small-town-authority-wave16.ts") },
];

// Enforce resolved, subject-specific primary tourism links that were previously
// HTTP 404 in Supabase source monitoring. This checks the individual canonical
// guide record, not the presence of the URL somewhere else in a large module.
const knownTownSourceRoutes = {
  lockhart: {
    required: ["https://www.cityoflockhart.gov/", "https://visitlockharttx.org/", "https://visitlockharttx.org/lockhart-bbq/"],
    retired: ["https://www.lockhart-tx.org/"],
  },
  nacogdoches: {
    required: ["https://www.visitnacogdoches.org/tours-and-trails", "https://www.visitnacogdoches.org/arts-and-cultural-attractions"],
    retired: ["https://www.visitnacogdoches.org/things-to-do/tours-trails/", "https://www.visitnacogdoches.org/things-to-do/arts-culture/"],
  },
  palestine: {
    required: ["https://www.visitpalestine.com/business/palestine-visitor-center"],
    retired: ["https://www.visitpalestine.com/visitor-center"],
  },
  terlingua: {
    required: ["https://visitbigbend.com/terlingua-activities/", "https://visitbigbend.com/terlingua-lodging/"],
    retired: ["https://visitbigbend.com/places/category/terlingua-activities/", "https://visitbigbend.com/places/category/terlingua-lodging/"],
  },
};

const guideSlugs = new Map();
const researchedMetadata = new Map();
let recordCount = 0;
for (const { filename, text } of guideSources) {
  const matches = [...text.matchAll(/\bid:\s*["']small-town-[a-z0-9-]+["']/g)];
  check(matches.length > 0, filename + ": no source-backed town records found");
  matches.forEach((match, i) => {
    const section = text.slice(match.index, i + 1 < matches.length ? matches[i + 1].index : undefined);
    const slug = section.match(/\bslug:\s*["']([a-z0-9-]+)["']/)?.[1];
    if (!slug) { errors.push(filename + ": town without canonical slug"); return; }
    recordCount++;
    if (guideSlugs.has(slug)) {
      // Duplicate, pre-existing waves: first complete record remains canonical.
      const original = guideSlugs.get(slug);
      if (!["jefferson", "wimberley", "marfa"].includes(slug)) errors.push(slug + ": unexpected duplicate in " + filename);
      else warn.push(slug + ": preserved existing later-wave variation; original canonical guide retained from " + original);
      return;
    }
    guideSlugs.set(slug, filename);
    const knownRoute = knownTownSourceRoutes[slug];
    if (knownRoute) {
      for (const url of knownRoute.required) check(section.includes(url), slug + ": official source missing " + url);
      for (const url of knownRoute.retired) check(!section.includes(url), slug + ": retired or broken source reintroduced " + url);
    }
    const name = section.match(/\bname:\s*["']([^"']+)["']/)?.[1];
    const county = section.match(/\bcounty:\s*["']([^"']+)["']/)?.[1];
    const region = section.match(/\bregion:\s*["']([^"']+)["']/)?.[1];
    const coords = section.match(/\bcoordinates:\s*\{\s*lat:\s*(-?\d+(?:\.\d+)?),\s*lng:\s*(-?\d+(?:\.\d+)?)/);
    if (name && county && region && coords) {
      researchedMetadata.set(slug, { name, county, region, lat: Number(coords[1]), lng: Number(coords[2]) });
    } else check(false, slug + ": missing place identity or coordinates for the compact link index");
    if (/small-town-destinations-wave(?:1[7-9]|[2-9]\d)\.ts$/.test(filename)) {
      check(section.includes("visitorFaqs:"), slug + ": visitor FAQs must cite researched visitor questions");
    }
    for (const field of ["authorityGuide:", "areaGuide:", "sources:", "hero:", "sourceCheckedAt", "coordinates:", "county:", "officialUrl:"]) {
      check(section.includes(field), slug + ": missing " + field);
    }
    check((section.match(/https:\/\//g) || []).length >= 2, slug + ": at least two primary/source-linked URLs expected");
    check(/\bcredit:\s*["']/.test(section), slug + ": photography attribution missing");
    check(/\bcategory:\s*["']small-towns["']/.test(section), slug + ": must be in small-towns Explore");
  });
}
check(guideSlugs.size === recordCount - 3, "Unexpected town duplicate count; currently 3 intentional duplicate records");
check(guideSlugs.size >= 59, "Missing an established town: expected at least 59 distinct checked-in records");
check(waveNames.length >= 15, "All original town waves 1–15 must be preserved");
const network = read("src/data/town-authority-network.ts");
const links = read("src/data/town-authority-links.ts");
const linkIndex = read("src/data/town-authority-link-index.ts");
for (const wave of guideSources) {
  const m = wave.filename.match(/wave(\d+)\.ts$/);
  if (m && wave.filename.includes("small-town-destinations-wave")) {
    const symbol = "smallTownWave" + m[1] + "Destinations";
    check(network.includes(symbol), wave.filename + ": not covered by universal authority network");
    check(read("src/data/destination-preserved-catalog.ts").includes(symbol), wave.filename + ": absent from Explore catalog");
  }
}
for (const key of [
  "export const TOWN_AUTHORITY_DIRECTORY", "export const TOWN_AUTHORITY_SLUGS",
  "canonicalAuthority.get(destination.slug)",
]) check(network.includes(key), "Network missing " + key);
for (const key of ["townAuthorityContextualLinks(", "TEXAS_CITIES.find", "countyTowns[countyKey", "candidate.region === destination.region"]) check(links.includes(key), "Lightweight linker missing " + key);
// The link projection deliberately allows compact JSON syntax as well as pretty-printed records.
// Validate normalized parsed data, never fragile exact whitespace in a code string.

const indexStart = linkIndex.indexOf("= [");
const indexEnd = linkIndex.lastIndexOf("];");
let allLinkPlaces = [];
try {
  allLinkPlaces = JSON.parse(linkIndex.slice(indexStart + 2, indexEnd + 1));
} catch { check(false, "Lightweight link index must remain an exact parseable JSON array"); }
const indexedSlugs = new Set(allLinkPlaces.map((row) => row.slug));
for (const slug of guideSlugs.keys()) check(indexedSlugs.has(slug), "Lightweight index missing researched town " + slug);
check(indexedSlugs.has("gruene-historic-district"), "Lightweight index missing Gruene Historic District");
check(allLinkPlaces.length === indexedSlugs.size, "Lightweight link index has duplicate slugs");
check(allLinkPlaces.length === guideSlugs.size + 1, "Lightweight link index must contain every researched town plus Gruene and no orphan records");
for (const [slug, expected] of researchedMetadata) {
  const actual = allLinkPlaces.find((row) => row.slug === slug);
  if (!actual) continue;
  for (const field of ["name", "county", "region"]) check(actual[field] === expected[field], slug + ": link index " + field + " diverges from researched guide");
  for (const field of ["lat", "lng"]) check(Math.abs(actual[field] - expected[field]) < 0.00001, slug + ": link index coordinates diverge from researched guide");
}


const curatedGruene = read("src/data/destination-curation-top-attractions-batch5.ts");
const grueneAuthority = read("src/data/destination-authority-top-attractions.ts");
check(curatedGruene.includes('"gruene-historic-district"') && grueneAuthority.includes('"gruene-historic-district"'),
  "Gruene Historic District's researched authority page must remain the canonical New Braunfels district");

const catalog = read("src/data/destination-preserved-catalog.ts");
const runtime = read("src/data/destination-query-runtime.ts");
const planner = read("src/components/editorial/DestinationVisitPlanner.tsx");
const authority = read("src/components/editorial/DestinationAuthoritySections.tsx");
const related = read("src/components/editorial/DestinationRelationships.tsx");
const countyTemplate = read("src/routes/$kind.$slug.lazy.tsx");
for (const value of ["smallTownWave15Destinations,", "additionalTownAuthorityDestinations,"]) check(catalog.includes(value), "Explore catalog missing " + value);
// Both direct and catalog paths must keep town enrichment first, then apply
// narrower evidence-preservation overlays without losing town authority.
check(/(?:return|const curated\s*=)\s*enforceFredericksburgJohnsonCityHeritageAuthority\(applyTownAuthority\(\s*(?:(?:enrich[A-Za-z]+Authority|enrichMuseumMedia)\(\s*)?normalizeDestinationCounty\(/.test(runtime), "Detail resolver must preserve town and corridor enrichment before any park-specific final photo step");
check(/\.map\(applyTownAuthority\)\s*\.map\(enforceFredericksburgJohnsonCityHeritageAuthority\);/.test(runtime) || runtime.includes(".map(applyTownAuthority);"), "Search/sitemap/catalog resolver must enrich every town");
check(runtime.includes("import { enforceFredericksburgJohnsonCityHeritageAuthority }") &&
      runtime.includes("const curated = enforceFredericksburgJohnsonCityHeritageAuthority(applyTownAuthority(") &&
      runtime.includes("return applyStateParkHeroAsset(curated);") &&
      /\.map\(applyTownAuthority\)\s*\.map\(enforceFredericksburgJohnsonCityHeritageAuthority\);/.test(runtime),
      "Corridor authority must follow all generic town, museum and historic enrichments in both resolvers");

check(planner.includes("<DestinationAuthoritySections destination={destination} />"), "Visible guide and research sections absent");
check(planner.includes("townAuthorityContextualLinks(destination)"), "Town/attraction contextual backlinks absent");
check(planner.includes('from "@/data/town-authority-links"'), "Destination client must import lightweight links only");
for (const required of ["guide.itineraries.map", "guide.sources.filter", "noopener noreferrer"]) {
  check(authority.includes(required), "Shared authority template missing " + required);
}
check(related.includes("DestinationAreaGuideSection") && related.includes("destination.areaGuide"), "Existing local-area guide must render once, downstream of authority research");
check(!authority.includes("area[key]") && !authority.includes("SafeAreaLink"), "Authority research must not duplicate the existing local-area guide");
check(countyTemplate.includes("<CountyTownAuthorityLinks"), "County/city inbound links missing");
check(read("src/components/content/CountyTownAuthorityLinks.tsx").includes('from "@/data/town-authority-links"'), "County/city client must import lightweight links only");
const cityIndex = read("src/data/city-authority-index.ts");
const cityProfiles = read("src/data/city-authority-profiles.ts");
const texasPlaces = read("src/data/texas-places.ts");
const cities = [...cityIndex.matchAll(/slug:\s*'([a-z-]+)'/g)].map((match) => match[1]);
check(cities.length >= 11, "Existing 11 city authority profiles must be retained");
for (const city of cities) check(cityProfiles.includes("  " + city + ": {") || cityProfiles.includes("  '" + city + "': {"),
  "Major-city authority profile missing: " + city);
check(texasPlaces.includes("export const TEXAS_CITIES"), "Broader city registry missing");
check(read("src/components/content/CountyTownAuthorityLinks.tsx").includes("townAuthorityCityLinks"), "All city page links missing");

if (errors.length) {
  console.error("STATEWIDE town authority contract FAILED: " + errors.length + " violations");
  for (const issue of errors) console.error(" - " + issue);
  process.exitCode = 1;
} else {
  console.log("Statewide authority contract PASSED: " + guideSlugs.size + " existing town guides + Gruene historic district, " + cities.length + " major city profiles; all wave 1–16 town pages, sources, shared templates and contextual linking included.");
  console.log("Coverage note: this contract verifies all existing researched guides, NOT that every Texas municipality has an authority page.");
}
