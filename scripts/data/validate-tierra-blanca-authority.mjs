import fs from "node:fs";
import assert from "node:assert/strict";

const read = (path) => fs.readFileSync(path, "utf8");
const head = read("src/routes/explore.tierra-blanca-creek.tsx");
const article = read("src/routes/explore.tierra-blanca-creek.lazy.tsx");
const publicRoutes = read("src/lib/public-routes.ts");
const sitemap = read("src/routes/sitemap-explore[.]xml.ts");
const amarillo = read("src/routes/explore.near.$metro.$collection.lazy.tsx");
const randall = read("src/data/fixtures/randall-county-canyon-palo-duro.ts");
const existingRoadTrip = read("src/data/top-attraction-road-trips.ts");
const park = read("src/routes/destination.$slug.tsx");
const county = read("src/components/content/CountyIdentitySection.tsx");

function contains(text, required, where) {
  for (const needle of required) assert.ok(text.includes(needle), `${where}: missing ${needle}`);
}
contains(head, [
  'canonicalPath = "/explore/tierra-blanca-creek"',
  'dateModified: lastSubstantiveRevision',
  '"@type": "Article"',
  '"@type": "BreadcrumbList"',
  "buildMeta(",
  "canonicalLink(",
], "Head metadata and canonical");
contains(publicRoutes, ['"/explore/tierra-blanca-creek"'], "Public route registry");
assert.ok((sitemap.match(/"\/explore\/tierra-blanca-creek"/g) || []).length >= 2, "Normal and fallback XML sitemap must include authority guide");
contains(article, [
  'createLazyFileRoute("/explore/tierra-blanca-creek")',
  'Tierra Blanca Creek', 'Prairie Dog Town Fork', 'Palo Duro Creek',
  'Buffalo Lake National Wildlife Refuge', 'T Anchor Ranch', 'Georgia O\'Keeffe',
  'Antelope Creek phase', 'not</em> another name for Tierra Blanca Creek', 'The Tierra Blanca archaeological complex is real',
  'privately held', 'does not establish a trailhead', 'Do not dig',
  'Canadian River valley', 'Source', 'alt=', 'fetchPriority="high"',
  'https://www.tshaonline.org/handbook/entries/tierra-blanca-creek',
  'https://www.texasbeyondhistory.net/landis/images/proto-spanish-textbox.html',
  'https://www.fws.gov/refuge/buffalo-lake/visit-us',
  'https://thc.texas.gov/preserve/archeology-texas/archeology-faq',
  'https://access-ok.okeeffemuseum.org/object/615/',
  'https://tpwd.texas.gov/state-parks/palo-duro-canyon',
  '/explore/near/amarillo/road-trips', '/explore/near/amarillo/day-trips',
  '/destination/palo-duro-canyon-state-park',
], "Main guide / editorial sourcing");
contains(amarillo, [
  'metro.slug === "amarillo" && (collection.slug === "road-trips" || collection.slug === "day-trips")',
  'href="/explore/tierra-blanca-creek"',
], "Amarillo trip planning links");
contains(randall, ['href: "/explore/tierra-blanca-creek"'], "Randall County links");
contains(existingRoadTrip, ['The separate Tierra Blanca Creek guide'], "Panhandle top-attraction context");
contains(park, ['destination.slug === "palo-duro-canyon-state-park"', 'href="/explore/tierra-blanca-creek"'], "Public Palo Duro state park related guide");
contains(county, ["slug === 'randall'", 'href="/explore/tierra-blanca-creek"'], "Canonical Randall County related guide");
assert.ok(!article.includes("GPS coordinates for arrowheads") && !article.includes("artifact hunting locations"), "Do not reveal archaeological site coordinates");
assert.ok(!article.includes("JSON.stringify({ \"@type\": \"FAQPage\" })"), "Avoid FAQ rich-result promises");
assert.ok(article.length > 15000, "Guide must not regress into a thin page");
const liveHandoff = read(".github/workflows/verify-tierra-blanca-postdeploy.yml");
contains(liveHandoff, ['"/explore/near/amarillo/road-trips"', '"/explore/near/amarillo/day-trips"', '"/county/randall"', '"/destination/palo-duro-canyon-state-park"'], "Live reciprocal source verification");
const auditSchedule = read(".github/workflows/tierra-blanca-quarterly-audit.yml");
const sourceAudit = read("scripts/ci/verify-tierra-blanca-quarterly.mjs");
const failureReporter = read("scripts/ci/report-tierra-blanca-authority-failure.mjs");
assert.ok(!fs.existsSync(".github/workflows/verify-tierra-blanca-authority.yml"), "Remove zero-job failing legacy quarterly workflow");
contains(auditSchedule, [
  "schedule:", "17 14 10 1,4,7,10 *", "workflow_dispatch:",
  "node scripts/data/validate-tierra-blanca-authority.mjs",
  "node scripts/ci/verify-tierra-blanca-quarterly.mjs",
  "node scripts/ci/report-tierra-blanca-authority-failure.mjs",
], "Bounded GitHub source refresh schedule");
contains(sourceAudit, [
  "tshaonline.org/handbook/entries/tierra-blanca-creek",
  "fws.gov/refuge/buffalo-lake/visit-us", "fws.gov/refuge/buffalo-lake/about-us",
  "tpwd.texas.gov/state-parks/palo-duro-canyon",
  "sitemap-explore.xml", "editorialReviewDateAdvanced: false",
], "Quarterly live and factual contract");
contains(failureReporter, ["gh", "issue", "Tierra Blanca Creek quarterly authority source review failed"], "Scheduled editorial failure escalation");

console.log("PASS Tierra Blanca authority: research, trip links, canonical, normal/fallback sitemaps, safety, freshness.");
