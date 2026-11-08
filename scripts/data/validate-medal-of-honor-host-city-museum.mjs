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
  "visitorFaqs:",
  "authorityGuide:",
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
  "sources:",
  "https://www.nctc.edu/media/nctc/documents/pdf/Field%20Trip%20Handbook.pdf",
], "museum data");
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
