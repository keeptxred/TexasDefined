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
requireAll(route, ["Medal of Honor Host City Museum, Gainesville: Hours & Visitor Guide", "isGainesvilleMedalMuseum", "isAccessibleForFree: true", "Gainesville’s Medal of Honor Host City tradition: archival photos"], "museum unique metadata and schema");
requireAll(subject, ["Duane E. Dewey", "Roger Hugh C. Donlon", "Michael John Fitzmaurice", "veteransDayCampusClosure", "Date.UTC(2026, 10, 12)", "2001041341", "2001041338", "not a photograph of the NCTC museum", "U.S. Air Force / Airman 1st Class Robert L. McIlrath"], "exhibit evidence and expiring closure");
requireAll(monitorWorkflow, ["verify-live:", "steps.live.outcome == 'failure'", "scripts/data/verify-medal-of-honor-host-city-museum-live.mjs"], "postdeploy and scheduled verifier");
requireAll(liveVerifier, ["/sitemap-explore.xml", "museum-canonical", "museum-jsonld", "museum-search-title", "incoming-link", "PUBLICATION NOT CERTIFIED"], "live acceptance");

const dossier = read("src/data/museum-authority-network.ts");
const faqRegistry = read("src/data/museum-visitor-faqs.ts");
const slugIndex = read("src/data/museum-authority-slugs.ts");
const manifest = JSON.parse(read("public/museum-verification-manifest.json"));
if (!dossier.includes('"medal-of-honor-host-city-museum-gainesville": {') || !dossier.includes('sources: [')) failures.push("Full sourced museum research dossier missing");
if (!dossier.includes("Documented 2025 recipient-gallery panels") || !dossier.includes("KXII — 2025 photograph of museum recipient gallery panels")) failures.push("Dated primary exhibit research missing");
if (!faqRegistry.includes('"medal-of-honor-host-city-museum-gainesville": [')) failures.push("Museum-specific researched FAQs missing");
if (!slugIndex.includes("|medal-of-honor-host-city-museum-gainesville")) failures.push("Lightweight museum SEO registry missing");
const row = manifest.museums.find((entry) => entry.path === canonical);
if (!row || row.cadenceDays > 30 || row.faqCount < 6) failures.push("Monthly museum source verification and six-plus unique FAQs required");
for (const path of incoming) {
  const article = read(path);
  if (!article.includes(canonical)) failures.push("Missing crawlable article link: " + path);
}
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
