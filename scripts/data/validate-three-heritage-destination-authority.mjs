import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(file, "utf8");
function section(content, start, end, subject) {
  const first = content.indexOf(start);
  const last = content.indexOf(end, first + start.length);
  assert.ok(first >= 0 && last > first, subject + " must have exactly one canonical catalog entry");
  return content.slice(first, last);
}
function includes(source, tokens, subject) {
  for (const token of tokens) assert.ok(source.includes(token), subject + " missing protected factual detail: " + token);
}
const redirects = read("src/lib/legacy-editorial-redirects.ts");
includes(redirects, [
  'LEGACY_EDITORIAL_REDIRECTS["/destination/lbj-presidential-library"] = "/destination/lbj-presidential-library-austin"',
  'LEGACY_EDITORIAL_REDIRECTS["/destination/mission-san-jose"] = "/destination/mission-san-jose-san-antonio"',
], "Canonical short-name 301 routes");

const capitol = section(read("src/data/destination-curation-top-attractions-batch2.ts"),
  '  "texas-state-capitol": {', '\n  "guadalupe-mountains-national-park": {', "Capitol");
includes(capitol, [
  'sourceCheckedAt: "2026-11-17"', 'South Foyer', 'North Entrance', 'free',
  '4:15 p.m.', 'every 15–30 minutes', 'one week', '1201 San Jacinto Boulevard', '1993',
  'https://tspb.texas.gov/plan/tours/tours.html',
], "Capitol operator-backed guide");

const lbjSource = read("src/data/museum-expansion-austin.ts");
const lbj = section(lbjSource, '    slug: "lbj-presidential-library-austin",',
  '  {\n    id: "museum-expansion-blanton"', "LBJ");
includes(lbj, [
  'sourceCheckedAt: "2026-11-17"', '2–4 hours', 'lot 38', 'last admission at 4 p.m.',
  'Great Hall', 'Vietnam', 'March 2026', 'https://www.lbjlibrary.org/visit',
], "LBJ visitor profile");
const museum = section(read("src/data/museum-authority-network.ts"),
  '  "lbj-presidential-library-austin": {', '\n  "blanton-museum-of-art-austin":', "LBJ dossier");
includes(museum, [
  'reviewed: "2026-11-17"', '2–4 hours', 'January 10, 2027',
  'January 3, 2027', 'National Archives',
], "LBJ museum dossier");
const faqs = section(read("src/data/museum-visitor-faqs.ts"),
  '  "lbj-presidential-library-austin": [', '\n  "blanton-museum-of-art-austin":', "LBJ FAQs");
assert.equal(faqs.split('"reviewed": "2026-11-17"').length - 1, 8,
  "All eight source-checked LBJ FAQs must retain factual review dates");
includes(faqs, ['2–4 hours', '30–45 minutes', 'https://www.lbjlibrary.org/visit'],
  "LBJ museum FAQs");

const mission = section(read("src/data/san-antonio-heritage-destinations.ts"),
  '    "slug": "mission-san-jose-san-antonio"',
  '\n  {\n    "id": "san-antonio-heritage-mission-san-juan-capistrano-san-antonio"',
  "Mission San José");
includes(mission, [
  '"sourceCheckedAt": "2026-11-17"', 'https://www.nps.gov/saan/planyourvisit/sanjose.htm',
  '1930s Works Progress Administration', 'Indigenous', '1794', '1804', '80 percent', 'free', 'wheelchair',
  '10 and 11 a.m.', '50 first-come',
], "Mission San José site-specific authority guide");

const monitor = read("scripts/data/authority/monitor-operator-sources.mjs");
includes(monitor, [
  'heritageDestinationMonitorRows', 'https://tspb.texas.gov/plan/tours/tours.html',
  'https://www.lbjlibrary.org/exhibitions',
  'https://www.nps.gov/saan/planyourvisit/guided-programs.htm',
  'sourceIndex(offers, [...operators, ...reviewedAttractionMonitorRows(reviewed), ...heritageDestinationMonitorRows])',
], "Weekly source-drift review");
const workflow = read(".github/workflows/destination-visitor-fact-freshness.yml");
includes(workflow, [
  "cron: '31 13 * * 1'", "src/data/museum-expansion-austin.ts",
  "src/data/san-antonio-heritage-destinations.ts", "monitor-operator-sources.test.mjs",
], "Scheduled verification workflow");
console.log("Three researched heritage guides: canonical consolidation, source-backed content, LBJ dossier and FAQ, source drift monitoring validated.");
