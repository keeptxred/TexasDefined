#!/usr/bin/env node
// Museum authority contract: no dependencies and no paid services.
// New museum destination records in a PR require a full verified dossier.
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const read = (path) => readFileSync(path, "utf8");
const src = read("src/data/museum-authority-network.ts");
const failures = [];

// AAM Dallas currently publishes conflicting normal/event-day hours.
// Treat this as a disclosure requirement, not a reason to invent one schedule.
const aamRecords = read("src/data/museum-authority-new-destinations.ts");
const aamFaqSource = read("src/data/museum-visitor-faqs.ts");
const aamRecord = aamRecords.split('slug: "african-american-museum-dallas-fair-park"')[1]?.split('slug: "', 1)[0] || "";
const aamFaq = aamFaqSource.split('"african-american-museum-dallas-fair-park": [')[1]?.split('"texas-forestry-museum-lufkin": [')[0] || "";
for (const [label, content] of [["destination", aamRecord], ["FAQ", aamFaq]]) {
  for (const marker of ["10 a.m.", "11 a.m.", "State Fair", "214-565-9026"]) {
    if (!content.includes(marker)) failures.push("African American Museum Dallas " + label + " lost official-hours conflict/phone detail: " + marker);
  }
}

// The Rockport visitor guide must preserve primary-source dates and links,
// and must not mistakenly refer to Spain's American Revolution role as a
// "Spanish Revolution". This guard covers the actual rendered dossier contract,
// not a standalone duplicate museum page.
const rockportDossierSource = src.split('  "texas-maritime-museum-rockport": {')[1]?.split('  "national-museum-pacific-war": {')[0] || "";
const rockportDestinationSource = read("src/data/museum-expansion-statewide-wave2.ts").split('slug: "texas-maritime-museum-rockport"')[1]?.split('slug: "museum-south-texas-history-edinburg"')[0] || "";
const rockportFaqSource = aamFaqSource.split('"texas-maritime-museum-rockport": [')[1]?.split('"national-museum-pacific-war": [')[0] || "";
const rockportManifest = JSON.parse(read("public/museum-verification-manifest.json"));
const rockportManifestEntry = JSON.stringify(rockportManifest).includes('"/destination/texas-maritime-museum-rockport"') ? read("public/museum-verification-manifest.json").split('"path": "/destination/texas-maritime-museum-rockport"')[1]?.split('"path": "', 1)[0] || "" : "";
for (const [sectionName, content, markers] of [
  ["dossier", rockportDossierSource, ["Tides of Freedom", "Built for Victory", "February 2–December 31, 2026", "September 30–December 31, 2026", "https://texasmaritimemuseum.org/event/tides-of-freedom/", "https://texasmaritimemuseum.org/event/built-for-victory/"]],
  ["destination", rockportDestinationSource, ["Tides of Freedom", "Built for Victory", "December 31, 2026", "2026-10-14"]],
  ["FAQ", rockportFaqSource, ["Tides of Freedom", "Built for Victory", "2026-10-14", "https://texasmaritimemuseum.org/event/tides-of-freedom/", "https://texasmaritimemuseum.org/event/built-for-victory/"]],
  ["source manifest", rockportManifestEntry, ['"faqCount": 8', "https://texasmaritimemuseum.org/event/tides-of-freedom/", "https://texasmaritimemuseum.org/event/built-for-victory/"]],
]) {
  for (const marker of markers) if (!content.includes(marker)) failures.push("Rockport museum " + sectionName + " missing " + marker);
}
if (rockportDestinationSource.includes("Spanish Revolution")) failures.push("Rockport museum must not misidentify Spanish support for the American Revolution");

const required = [
  "bullock-texas-state-history-museum",
  "perot-museum-nature-science-dallas",
  "witte-museum",
  "museum-of-the-big-bend-alpine",
  "panhandle-plains-historical-museum-canyon",
  "george-ranch-historical-park",
  "texas-maritime-museum-rockport",
  "national-museum-pacific-war",
  "frontier-texas",
  "texas-energy-museum-beaumont",
];
const manifestStart = src.indexOf("export const museumAuthorityDossiers");
const manifestEnd = src.indexOf("\n};\n\nexport const museumAuthorityDirectory", manifestStart);
if (manifestStart < 0 || manifestEnd < 0) {
  console.error("Museum dossier manifest cannot be identified.");
  process.exit(1);
}
const allDossiers = [...src.slice(manifestStart, manifestEnd).matchAll(/^  "([a-z0-9-]+)": \{/gm)].map((m) => m[1]);
const lightweightSource = read("src/data/museum-authority-slugs.ts");
const compactSlugMatch = lightweightSource.match(/new Set\(\s*"([a-z0-9|-]+)"\.split\("\|"\)\s*\)/);
const lightweightSlugs = compactSlugMatch
  ? compactSlugMatch[1].split("|")
  : [...lightweightSource.matchAll(/^  "([a-z0-9-]+)",$/gm)].map(m => m[1]);
// Parse the compact representation as a full set. Duplicates, a truncated list,
// or any drift from the authoritative dossiers must fail the existing contract.
if (lightweightSlugs.length !== new Set(lightweightSlugs).size)
  failures.push("Duplicate slug in compact museum identity set");

if (lightweightSlugs.length !== allDossiers.length || lightweightSlugs.some(s => !allDossiers.includes(s))) failures.push("Museum SEO slug index must match all dossier keys exactly.");
if (new Set(allDossiers).size !== allDossiers.length) failures.push("Duplicate museum authority dossier keys.");
function dossier(slug) {
  const start = src.indexOf('  "' + slug + '": {');
  if (start < 0) return "";
  const next = src.indexOf('\n  "', start + slug.length + 8);
  const end = next < 0 ? src.indexOf('\n};', start) : next;
  return src.slice(start, end);
}
function section(entry, key) {
  const index = entry.indexOf(key + ": [");
  if (index < 0) return "";
  const tail = entry.slice(index + key.length + 3);
  const end = tail.indexOf("\n    ],");
  return end < 0 ? "" : tail.slice(0, end);
}
function value(entry, key) {
  const expression = new RegExp("\\b" + key + '\\s*:\\s*"([^"\\n]*)"');
  return entry.match(expression)?.[1] || "";
}
for (const slug of new Set([...required, ...allDossiers])) {
  const entry = dossier(slug);
  if (!entry) { failures.push("No museum dossier for " + slug); continue; }
  for (const key of ["name", "slug", "county", "city", "reviewed", "whyVisit", "visitorStrategy", "accessibility", "familiesAndGroups", "researchValue"]) {
    if (!value(entry, key)) failures.push(slug + ": missing " + key);
  }
  if (value(entry, "slug") !== slug) failures.push(slug + ": canonical slug mismatches key");
  const reviewed = Date.parse(value(entry, "reviewed"));
  if (!Number.isFinite(reviewed) || reviewed > Date.now() + 86400000 || Date.now() - reviewed > 365 * 86400000)
    failures.push(slug + ": invalid/stale source review date");
  for (const key of ["whyVisit", "visitorStrategy", "accessibility", "familiesAndGroups", "researchValue"]) {
    if (value(entry, key).length < 100) failures.push(slug + ": thin " + key);
  }
  const topics = entry.match(/\btopics:\s*\[([^\]]*)\]/)?.[1] || "";
  const topicValues = [...topics.matchAll(/"([a-z-]+)"/g)].map((match) => match[1]);
  if (new Set(topicValues).size < 2) failures.push(slug + ": at least two distinct research topics needed for automatic peer-museum linking");
  const exhibits = section(entry, "exhibits");
  const routes = section(entry, "routes");
  const sources = section(entry, "sources");
  const links = section(entry, "connections");
  const exhibitCount = (exhibits.match(/heading: "/g) || []).length;
  if (exhibitCount < 1 || exhibitCount > 10 || (exhibits.match(/detail: "/g) || []).length !== exhibitCount)
    failures.push(slug + ": include 1–10 meaningful, briefly interpreted exhibit/topic highlights; do not inventory museum collections.");
  const routeCount = (routes.match(/label: "/g) || []).length;
  if (routeCount < 1 || routeCount > 4 || (routes.match(/steps: \[/g) || []).length !== routeCount)
    failures.push(slug + ": provide 1–4 useful visit plans suited to this actual museum, never invented routes.");
  const urls = [...sources.matchAll(/url: "(https:\/\/[^"]+)"/g)].map((x) => x[1]);
  if (new Set(urls).size < 2 || urls.some((x) => x.includes("example.com") || x.includes("wikipedia.org")))
    failures.push(slug + ": fewer than two distinct authoritative source URLs");
  const hrefs = [...links.matchAll(/href: "(\/[^"]+)"/g)].map((x) => x[1]);
  if (hrefs.length < 2 || !hrefs.some((x) => x.startsWith("/county/")))
    failures.push(slug + ": county and context cross-links required");
}
for (const [path, marker] of [
  ["src/data/destination-preserved-catalog.ts", "museumAuthorityDestinations"],
  ["src/data/destination-query-runtime.ts", "enrichMuseumMedia"],
  ["src/components/editorial/DestinationRelationships.tsx", "MuseumAuthorityNetworkSection"],
  ["src/routes/destination.$slug.tsx", "museumAuthoritySlugs"],
  ["src/routes/$kind.$slug.lazy.tsx", "CountyCityMuseums"],
]) {
  if (!read(path).includes(marker)) failures.push("Missing museum integration in " + path);
}
// Main destination discovery must not import the full museum research dossier payload.
for (const path of ["src/data/destination-query-runtime.ts", "src/data/destination-preserved-catalog.ts", "src/data/museum-authority-new-destinations.ts"]) {
  if (read(path).includes('from "./museum-authority-network"')) failures.push(path + ": heavyweight dossier import regresses main client performance.");
}
if (!read("src/data/museum-authority-heroes.ts").includes("export const museumLicensedHeroes")) failures.push("Lightweight license-cleared museum heroes module missing.");
// Licensed museum photos must survive final catalog reconciliation before corridor authority overlays.
if (!/\.map\(enrichMuseumMedia\)\s*\.map\(applyTownAuthority\)\s*\.map\(enforceFredericksburgJohnsonCityHeritageAuthority\);/.test(read("src/data/destination-query-runtime.ts")))
  failures.push("Explore catalog lacks final licensed museum hero reconciliation.");
execFileSync(process.execPath, ["scripts/data/test-museum-owner-inventory-parser.mjs"], { stdio: "inherit" });
if (!read("src/routes/destination.$slug.tsx").includes("enrichMuseumAuthority")) failures.push("Museum body enrichment must remain in the museum destination page, not global search.");
if (read("src/routes/destination.$slug.tsx").includes('from "@/data/museum-authority-network"')) failures.push("Museum route must lazily load full research dossiers.");

if (!read("src/data/museum-authority-new-destinations.ts").includes('slug: "george-ranch-historical-park"'))
  failures.push("Missing George Ranch destination record");

// Museum FAQs are a researched publishing requirement, not generated boilerplate.
const faqSource = read("src/data/museum-visitor-faqs.ts");
const faqMatch = faqSource.match(/export const museumVisitorFaqs: Record<string, MuseumVisitorFaq\[\]> = (\{[\s\S]*?\});\nexport const museumVisitorFaqFor/);
if (!faqMatch) failures.push("Museum FAQ registry must remain machine-readable and referenced in the UI.");
let faqRegistry = {};
try { faqRegistry = JSON.parse(faqMatch?.[1] ?? "{}"); } catch { failures.push("Museum FAQ registry cannot be parsed."); }
for (const slug of allDossiers) {
  const faqs = faqRegistry[slug] ?? [];
  if (faqs.length < 4 || faqs.length > 16) failures.push(slug + ": need a researched, appropriately scoped FAQ (4–16 genuine questions, not a fixed template).");
  const unique = new Set();
  let independentlyDiscovered = 0;
  for (const faq of faqs) {
    if (typeof faq.question !== "string" || faq.question.length < 18 ||
        typeof faq.answer !== "string" || faq.answer.length < 80)
      failures.push(slug + ": a FAQ has a thin question or unsourced short answer.");
    const normalized = (faq.question || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (unique.has(normalized)) failures.push(slug + ": duplicate FAQ question.");
    unique.add(normalized);
    if (!["museum-faq", "visitor-qna", "editorial-research"].includes(faq.questionOrigin))
      failures.push(slug + ": FAQ question origin must be documented.");
    if (faq.questionOrigin !== "museum-faq") independentlyDiscovered++;
    if (!/^https:\/\/[^/]+/.test(faq.verificationUrl || "") ||
        !/^https:\/\/[^/]+/.test(faq.questionEvidenceUrl || ""))
      failures.push(slug + ": FAQ source URL missing.");
    if (!["monthly", "quarterly"].includes(faq.reviewCycle)) failures.push(slug + ": FAQ needs its fact review cadence.");
    const date = Date.parse(faq.reviewed || "");
    if (!Number.isFinite(date) || date > Date.now() + 86400000 || Date.now() - date > 365 * 86400000)
      failures.push(slug + ": FAQ needs a real recent review date.");
  }
  if (independentlyDiscovered < 2) failures.push(slug + ": do not stop at the operator's FAQ; research other visitor questions.");
}
if (!read("src/components/editorial/MuseumAuthorityNetworkSection.tsx").includes("museumVisitorFaqFor"))
  failures.push("Museum-specific FAQs must render on live museum guide templates.");


const sourceManifest = JSON.parse(read("public/museum-verification-manifest.json"));
if (sourceManifest.schemaVersion !== 1 || !Array.isArray(sourceManifest.museums))
  failures.push("The production Supabase museum verification source manifest is missing or invalid.");
const manifestByPath = new Map((sourceManifest.museums || []).map((item) => [item.path, item]));
for (const slug of allDossiers) {
  const row = manifestByPath.get("/destination/" + slug);
  const faqs = faqRegistry[slug] || [];
  if (!row || row.cadenceDays > 30 || row.cadenceDays < 1)
    failures.push(slug + ": missing current ≤30-day Supabase museum source registration.");
  else {
    if (row.faqCount !== faqs.length) failures.push(slug + ": manifest FAQ count differs from source FAQ registry.");
    for (const faq of faqs) {
      if (!row.sources.some((source) => source.sourceUrl === faq.verificationUrl &&
          /^https:\/\//.test(source.fetchUrl)))
        failures.push(slug + ": an FAQ verification source is missing from the automated Supabase source manifest.");
    }
  }
}
if (manifestByPath.size !== allDossiers.length)
  failures.push("Museum source manifest has missing or stale museum paths relative to the complete dossier registry.");

const base = process.env.MUSEUM_AUTHORITY_BASE_REF;
if (base) {
  try {
    // A new museum record must be a destination definition, not a reference to
    // a historic site in a cross-link graph, itinerary, timeline or FAQ.
    // Keep checking the source catalogs where new museum records are authored.
    const candidatePaths = [
      "src/data/*museum*",
      "src/data/*destination*",
      "src/data/historic-sites.ts",
      "src/data/*top-attraction*",
      "src/data/fixtures/*museum*",
      "src/data/fixtures/*destination*",
    ];
    const diff = execFileSync("git", ["diff", "--no-ext-diff", "--unified=8", base + "...HEAD", "--", ...candidatePaths], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
    const added = diff.split("\n").filter((line) => line.startsWith("+") && !line.startsWith("+++")).map((line) => line.slice(1)).join("\n");
    const found = new Set();
    // Parse actual newly added destination records, not nearby references,
    // FAQ data or unrelated taxonomy slugs like "law-enforcement".
    // Requiring the adjacent id/brandId/slug/name sequence prevents false
    // positives from concatenated git diff hunks without weakening the gate.
    for (const match of added.matchAll(/\bid:\s*"[^"\n]+"\s*,\s*brandId:\s*"[^"\n]+"\s*,\s*slug:\s*"([a-z0-9-]+)"\s*,\s*name:\s*"([^"\n]+)"/g)) {
      const [, slug, name] = match;
      if (/(museum|historical-park|science-center)/i.test(slug) ||
          /(museum|historical park|science center)/i.test(name)) found.add(slug);
    }
    // Triples such as ["texas-history", "law-enforcement", "museum-heritage"]
    // are category taxonomy, not a destination tuple. Only a complete,
    // exactly three-field [id, slug, human name] record qualifies; an
    // embedded topic like ["presidential-history", "dallas-history", "museum", ...]
    // is not a new museum destination. Require museum in the human name.
    for (const match of added.matchAll(/\[\s*"[^"\n]+"\s*,\s*"([a-z0-9-]+)"\s*,\s*"([^"\n]+)"\s*\]/g)) {
      if (/(?:^|[\s(])(?:museums?|historical park|science center)(?=$|[\s),.!])/i.test(match[2])) found.add(match[1]);
    }
    for (const slug of found) {
      if (!dossier(slug)) failures.push("NEW museum destination " + slug + " lacks museum authority dossier. See docs/museum-authority-standard.md");
    }
  } catch (error) {
    failures.push("Cannot validate changed museum records against " + base + ": " + String(error));
  }
}
// A researched closed museum is historical reference content, not a bookable stop.
const historicalMuseumReferences = ["1940-air-terminal-museum-houston", "elisabet-ney-museum-austin", "buffalo-soldiers-national-museum-houston"];
const museumAvailability = read("src/data/destination-availability.ts");
const museumSeoRoute = read("src/routes/destination.$slug.tsx");
const museumSitemapRoute = read("src/routes/sitemap-explore[.]xml.ts");
for(const historicalSlug of historicalMuseumReferences) {
  if(!museumAvailability.includes('"' + historicalSlug + '"'))
    failures.push("Closed historical museum is missing from trip planner exclusion: " + historicalSlug);
  if(!museumSeoRoute.includes('"' + historicalSlug + '"') || !museumSitemapRoute.includes('"' + historicalSlug + '"'))
    failures.push("Closed researched historical museum is missing from search-indexing exception: " + historicalSlug);
}

if (failures.length) {
  console.error("Museum authority gate FAILED:\n" + failures.map((x) => " - " + x).join("\n"));
  process.exit(1);
}
execFileSync(process.execPath, ["scripts/data/validate-dallas-black-history.mjs"], { stdio: "inherit" });
// Prevent future owner-inventory reassignments or silent resumption regressions.
execFileSync(process.execPath, ["scripts/data/next-museum-owner-batch.mjs", "--self-test"], { stdio: "inherit" });
// Print the next read-only 25-candidate queue in CI so reviewers can checkpoint it
// explicitly after merging, rather than claiming an uncommitted assignment is a lock.
execFileSync(process.execPath, ["scripts/data/next-museum-owner-batch.mjs"], { stdio: "inherit" });
console.log("Museum authority gate PASSED: " + allDossiers.length + " museum guides + cross-links + new-museum rule.");
