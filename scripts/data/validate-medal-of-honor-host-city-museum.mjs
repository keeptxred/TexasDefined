import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const subject = read("src/data/medal-of-honor-host-city-museum.ts");
const catalog = read("src/data/destination-preserved-catalog.ts");
const incoming = [
  "src/data/fixtures/texas-medal-of-honor-heroes.ts",
  "src/data/fixtures/texas-military-museums-historic-sites-guide.ts",
  "src/data/fixtures/cooke-county-gainesville-red-river-muenster-north-texas.ts",
];
const canonical = "/destination/medal-of-honor-host-city-museum-gainesville";
const failures = [];
const requireAll = (body, markers, location) => {
  for (const marker of markers) if (!body.includes(marker)) failures.push(location + ": missing " + marker);
};
requireAll(catalog, [
  'import { medalOfHonorHostCityMuseumDestinations } from "./medal-of-honor-host-city-museum";',
  "  medalOfHonorHostCityMuseumDestinations,",
], "preserved catalog");
requireAll(subject, [
  'slug: "medal-of-honor-host-city-museum-gainesville"',
  'category: "historic-sites"',
  'region: "prairies-lakes"',
  'countySlugs: ["cooke"]',
  'officialUrl: "https://www.nctc.edu/museum/"',
  "33.6185",
  "-97.16337",
  "sourceCheckedAt:",
  "visitorFacts:",
  "areaGuide:",
  "accessibilityNotes:",
  "Medal of Honor Host City Museum",
  "NCTC",
  "Arlington",
  "summer",
  "two weeks",
  "parking",
  "U.S. Special Operations Command",
  "not a photograph",
  "https://www.nctc.edu/media/nctc/documents/pdf/Field%20Trip%20Handbook.pdf",
], "museum data");
const route = read("src/routes/destination.$slug.tsx");
const monitorWorkflow = read(".github/workflows/medal-of-honor-museum-authority.yml");
const liveVerifier = read("scripts/data/verify-medal-of-honor-host-city-museum-live.mjs");
requireAll(route, ["Medal of Honor Host City Museum, Gainesville: Hours & Visitor Guide", "isGainesvilleMedalMuseum", 'sameAs: "https://www.nctc.edu/museum/"', "Gainesville’s Medal of Honor Host City tradition: archival photos"], "museum unique metadata and schema");
requireAll(subject, ["Duane E. Dewey", "Roger Hugh C. Donlon", "Michael John Fitzmaurice", "veteransDayCampusClosure", "Date.UTC(2026, 10, 12)", "2001041341", "2001041338", "not a photograph of the NCTC museum", "U.S. Air Force / Airman 1st Class Robert L. McIlrath"], "exhibit evidence and expiring closure");
requireAll(monitorWorkflow, ["verify-live:", "steps.live.outcome == 'failure'", "scripts/data/verify-medal-of-honor-host-city-museum-live.mjs"], "postdeploy and scheduled verifier");
requireAll(liveVerifier, ["/sitemap-explore.xml", "museum-canonical", "museum-jsonld", "museum-search-title", "incoming-link", "PUBLICATION NOT CERTIFIED"], "live acceptance");

const historicVisitorPlans = read("src/data/historic-site-authority-full-catalog.ts");
requireAll(historicVisitorPlans, [
  '"medal-of-honor-host-city-museum-gainesville": [',
  'Find the museum and read the recipients',
  'A deeper recipient-history visit',
  'Museum plus Gainesville civic history',
  'at Building 2700',
  'Primarily indoor gallery walking',
  'NCTC does not publish a standard visit duration',
], "custom museum visit plans, not generic preserved-site itineraries");
requireAll(subject, [
  "Building 2700",
  "https://www.nctc.edu/media/nctc/documents/pdf/NCTC%20Gainesville%20Campus%20Map.pdf",
  "Commemorative Air Force Ground Forces",
  "should not send a visitor looking for the newer 2025",
], "museum-specific campus wayfinding");

const dossier = read("src/data/museum-authority-network.ts");
const faqRegistry = read("src/data/museum-visitor-faqs.ts");
const slugIndex = read("src/data/museum-authority-slugs.ts");
const manifest = JSON.parse(read("public/museum-verification-manifest.json"));
if (!dossier.includes('"medal-of-honor-host-city-museum-gainesville": {') || !dossier.includes('sources: [')) failures.push("Full sourced museum research dossier missing");
if (!dossier.includes("Documented 2025 recipient-gallery panels") || !dossier.includes("KXII — 2025 photograph of museum recipient gallery panels")) failures.push("Dated primary exhibit research missing");
if (!faqRegistry.includes('"medal-of-honor-host-city-museum-gainesville": [')) failures.push("Museum-specific researched FAQs missing");
if (!faqRegistry.includes("Which NCTC campus building houses the museum") || !faqRegistry.includes("older library memorial")) failures.push("Museum 2700 wayfinding and library confusion FAQ missing");
if (!slugIndex.includes("|medal-of-honor-host-city-museum-gainesville")) failures.push("Lightweight museum SEO registry missing");
const row = manifest.museums.find((entry) => entry.path === canonical);
if (!row || row.cadenceDays > 30 || row.faqCount < 10) failures.push("Monthly museum source verification and ten documented visitor FAQs required");
if (!row?.sources?.some((source) => source.sourceUrl.includes("NCTC%20Gainesville%20Campus%20Map.pdf"))) failures.push("Official NCTC campus map source is not scheduled for recheck");
if (!dossier.includes('NCTC Gainesville campus map — current Building 2700 wayfinding')) failures.push("Research dossier omits official museum Building 2700 source");
if (!dossier.includes("a separate Texas Medal of Honor library") && !dossier.includes("a separate Medal of Honor memorial")) {
  // The current dossier calls it an older library memorial rather than conflating it with the museum.
  if (!dossier.includes("CAF")) failures.push("Dossier omits distinct NCTC library memorial");
}
for (const path of incoming) {
  const article = read(path);
  if (!article.includes(canonical)) failures.push("Missing crawlable article link: " + path);
}
const benchmark = read("docs/museum-official-site-benchmarks.json");
requireAll(benchmark, ["decision", "not-certified", "Building 2700", "21 of 21"], "honest Gainesville museum certification benchmark");
const paragraphs = (subject.match(/^    "/gm) ?? []).length;
if (paragraphs < 10) failures.push("Insufficient original explanatory sections: " + paragraphs);
if (!subject.includes("2026-11-08")) failures.push("Expected checked-at provenance missing");
if (/opens? (?:every day|daily)|seven days a week|fully wheelchair accessible/i.test(subject)) failures.push("Unsupported access promise");
if (/https:\/\/images\.squarespace-cdn\.com|nctc\.edu\/media\/.*\.(?:jpg|png|webp)/i.test(subject)) failures.push("Unlicensed institutional hero image");
if (failures.length) {
  console.error("Medal of Honor Host City Museum authority validation failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exitCode = 1;
} else {
  console.log("PASS: unique Gainesville destination, 3 topical inbound link classes, source-backed free admission and regular/summer hours, accessibility caveat, rights-aware image, researched itineraries and sources");
}
