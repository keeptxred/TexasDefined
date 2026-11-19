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
const heroRights = read("src/data/heritage-photo-license-links.ts");
includes(heroRights, [
  "verifiedHeritageHeroImageRights", "commonsHeroAttribution(hero.src, hero.credit)",
  "comparableCommonsFile(published.sourceUrl) !== comparableCommonsFile(verified.fileUrl)",
  "Daderot — CC0 1.0 public domain dedication",
  "© ajay_suresh", "© Steven B Yount",
  "https://creativecommons.org/publicdomain/zero/1.0/",
  "https://creativecommons.org/licenses/by/4.0/",
  "https://creativecommons.org/licenses/by-sa/4.0/",
  "File:Texas_State_Capitol_-_Austin,_Texas_-_DSC08253.jpg",
  "File:LBJ_Presidential_LIbrary_-_UT_Austin_(54984753236).jpg",
  "File:Mission_San_Jose_San_Antonio_01.jpg",
], "Exact-file verified three heritage hero licensing");
const destinationRoute = read("src/routes/destination.$slug.tsx");
includes(destinationRoute, [
  "verifiedHeritageHeroImageRights(destination.slug, destination.hero)",
  "...verifiedAttractionPhotoRights",
], "Google ImageObject provenance wiring");
const editorialLinks = read("src/data/destination-editorial-links.ts");
includes(editorialLinks, [
  '"the-alamo": [', '"href": "/destination/mission-san-jose-san-antonio"',
  "Mission San José visitor center and Rose Window",
], "Mission San José Alamo comparison discovery link");
const redirects = read("src/lib/legacy-editorial-redirects.ts");
includes(redirects, [
  'LEGACY_EDITORIAL_REDIRECTS["/destination/lbj-presidential-library"] = "/destination/lbj-presidential-library-austin"',
  'LEGACY_EDITORIAL_REDIRECTS["/destination/mission-san-jose"] = "/destination/mission-san-jose-san-antonio"',
], "Canonical short-name 301 routes");

const capitol = section(read("src/data/destination-curation-top-attractions-batch2.ts"),
  '  "texas-state-capitol": {', '\n  "guadalupe-mountains-national-park": {', "Capitol");
includes(capitol, [
  'sourceCheckedAt: "2026-11-18"', 'South Foyer', 'North Entrance', 'free',
  '4:15 p.m.', 'every 15–30 minutes', 'one week', '1201 San Jacinto Boulevard', '1993', 'garage', 'XIT Ranch', 'gallery:', 'Goddess of Liberty', '1936 Texas Centennial',
  'https://tspb.texas.gov/plan/tours/tours.html',
], "Capitol operator-backed guide");

const lbjSource = read("src/data/museum-expansion-austin.ts");
const lbj = section(lbjSource, '    slug: "lbj-presidential-library-austin",',
  '  {\n    id: "museum-expansion-blanton"', "LBJ");
includes(lbj, [
  'sourceCheckedAt: "2026-11-18"', '2–4 hours', 'lot 38', 'last admission at 4 p.m.',
  'Great Hall', 'Vietnam', 'March 2026', '45 million pages', 'https://www.lbjlibrary.org/visit', 'third-floor checkroom',
], "LBJ visitor profile");
const museum = section(read("src/data/museum-authority-network.ts"),
  '  "lbj-presidential-library-austin": {', '\n  "blanton-museum-of-art-austin":', "LBJ dossier");
includes(museum, [
  'reviewed: "2026-11-18"', '2–4 hours', 'January 10, 2027',
  'January 3, 2027', 'National Archives',
], "LBJ museum dossier");
const faqs = section(read("src/data/museum-visitor-faqs.ts"),
  '  "lbj-presidential-library-austin": [', '\n  "blanton-museum-of-art-austin":', "LBJ FAQs");
assert.equal(faqs.split('"reviewed": "2026-11-18"').length - 1, 10,
  "All ten source-checked LBJ FAQs must retain factual review dates");
includes(faqs, ['2–4 hours', '30–45 minutes', 'https://www.lbjlibrary.org/visit'],
  "LBJ museum FAQs");

const mission = section(read("src/data/san-antonio-heritage-destinations.ts"),
  '    "slug": "mission-san-jose-san-antonio"',
  '\n  {\n    "id": "san-antonio-heritage-mission-san-juan-capistrano-san-antonio"',
  "Mission San José");
includes(mission, [
  '"sourceCheckedAt": "2026-11-18"', 'https://www.nps.gov/saan/planyourvisit/sanjose.htm',
  '1930s Works Progress Administration', 'Indigenous', '1794', '1804', '1758', '281 Indigenous', '28 plots', 'Pedro Huizar', '80 percent', '5 p.m.', '26–30 inches', 'free', 'wheelchair',
  '10 and 11 a.m.', 'limited to 50 people first-come',
], "Mission San José site-specific authority guide");

const detailedTimeline = read("src/data/historic-site-authority-timelines.ts");
includes(detailedTimeline, ['"mission-san-jose-san-antonio": [', 'July 16, 1794', '1804–1815', '1930s'], "Mission San José primary-source chronology");
const capitolTimeline = read("src/data/destination-timelines-top-attractions.ts");
includes(capitolTimeline, ['"texas-state-capitol": [', '1993', 'XIT Ranch'], "Capitol historical chronology");
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
const liveVerifier = read("scripts/ci/verify-three-heritage-destinations-production.mjs");
includes(liveVerifier, [
  '"/destination/texas-state-capitol"',
  '"/destination/lbj-presidential-library-austin"',
  '"/destination/mission-san-jose-san-antonio"',
  '"/destination/lbj-presidential-library"',
  '"/destination/mission-san-jose"',
  '"https://texasdefined.com"',
  '"https://texasdefined-site.freddy-coppola.workers.dev"',
  '"Goddess of Liberty"', '"45 million pages"', '"281 Indigenous"',
  "sitemap-explore.xml", "heritage-three-production.json",
], "Exact-deploy heritage authority verifier");
const deploy = read(".github/workflows/deploy-production.yml");
includes(deploy, [
  "Verify Capitol LBJ Library and Mission San José on production",
  "node scripts/ci/verify-three-heritage-destinations-production.mjs",
  "Preserve exact three-heritage live acceptance evidence",
  "heritage-three-production.json",
], "Protected live authority release gate");
const chrome = read("scripts/ci/verify-three-heritage-responsive-browser.mjs");
includes(chrome, [
  '"/tmp/texasdefined-wp-qa/node_modules/playwright-core"',
  '"mobile-320"', '"mobile-390"', '"desktop-1280"',
  '"document language set"', '"no horizontal overflow"', '"first location photo delivered"',
  'heritage-three-mobile', '"no JavaScript errors"',
], "Nine-view heritage accessibility and mobile browser acceptance");
includes(deploy, [
  "Verify three heritage destinations in mobile and desktop Chrome",
  "node scripts/ci/verify-three-heritage-responsive-browser.mjs",
  "Preserve three heritage mobile and desktop proof",
], "Postdeploy Chrome acceptance on same site release");
assert.ok(
  deploy.indexOf("Verify Capitol LBJ Library and Mission San José on production") <
  deploy.indexOf("Verify three heritage destinations in mobile and desktop Chrome"),
  "Do not skip Chrome: required live heritage HTTP gate must execute first"
);
console.log("Three researched heritage guides: canonical consolidation, source-backed content, LBJ dossier and FAQ, source drift monitoring validated.");
