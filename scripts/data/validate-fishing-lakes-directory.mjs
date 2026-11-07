import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), "utf8");

const [route, component, hubRoute, hubComponent, slugs, sitemap, search, publicRoutes, authorityWorkflow, liveChromeWorkflow, refreshWorkflow, sourceAudit, regulationAudit, researchValidator, advisoriesText, lakeFixtures, sharedAnswers, wave2Fixtures, statewideFixtures, wave2Showcase] = await Promise.all([
  read("src/routes/fishing.lakes.tsx"),
  read("src/components/fishing/FishingLakesDirectory.tsx"),
  read("src/routes/fishing.tsx"),
  read("src/components/fishing/FishingHub.tsx"),
  read("src/data/fishing/slugs.ts"),
  read("src/data/fishing/sitemap.ts"),
  read("src/data/fishing/search.ts"),
  read("src/lib/public-routes.ts"),
  read(".github/workflows/fishing-url-authority.yml"),
  read(".github/workflows/verify-fishing-lakes-directory-browser.yml"),
  read(".github/workflows/fishing-lakes-directory-refresh.yml"),
  read("scripts/ci/audit-fishing-lakes-directory-sources.mjs"),
  read("scripts/ci/audit-fishing-lake-regulation-sources.mjs"),
  read("scripts/data/validate-fishing-lake-research.mjs"),
  read("src/data/fishing/lake-directory-advisories.json"),
  read("src/data/fishing/fixtures.ts"),
  read("src/data/fishing/lake-directory-answers.ts"),
  read("src/data/fishing/lake-expansion-wave2-fixtures.ts"),
  read("src/data/fishing/statewide-lake-network.ts"),
  read("src/data/fishing/wave2-showcase-lakes-prototype.ts"),
]);

const liveChromeVerifier = await read("scripts/ci/verify-fishing-lakes-directory-browser.mjs");
const errors = [];
// Capture the SAME coherent source-backed browser DOM snapshot that satisfied
// readiness, not a second page.evaluate that can race TanStack stream remounts.
for (const marker of [
  "const stableSnapshotHandle = await page.waitForFunction(async () => {",
  "const snapshot = readSnapshot();",
  "return ready(snapshot) ? snapshot : false;",
  "const initial = await stableSnapshotHandle.jsonValue();",
  "await stableSnapshotHandle.dispose();",
  "snapshot.visible.every(item => item.name && item.text)",
]) if (!liveChromeVerifier.includes(marker)) errors.push("Fishing lakes real Chrome must capture strict atomic hydrated DOM: " + marker);

for (const marker of ['await page.waitForLoadState("load"', 'await page.waitForFunction(async () => {', 'await new Promise(requestAnimationFrame)', 'document.querySelectorAll("h1")', 'section[aria-labelledby="lake-directory-heading"] article', 'section[aria-labelledby="lake-answers-heading"] article']) {
  if (!liveChromeVerifier.includes(marker)) errors.push("Live mobile Chrome must only sample SEO DOM after stable hydration: " + marker);
}

const advisories = JSON.parse(advisoriesText);
// Quick answers remain visible, but obsolete FAQ rich-result schema is not emitted.
if (!component.includes("buildFishingLakeQuickAnswers(rows.length)")) errors.push("Keep original reader-facing quick answers.");
if (route.includes('"@type": "FAQPage"')) errors.push("Retired Google FAQPage rich-result markup must not be published.");
const assert = (condition, message) => { if (!condition) errors.push(message); };

for (const marker of [
  'createFileRoute("/fishing/lakes")',
  'await import("@/data/fishing/queries")',
  'fishingLakesQuery({ limit: 100 })',
  'lakeSpeciesProfilesQuery()',
  'fishingAccessPointsQuery({ limit: 1000 })',
  'isCompleteFishingLakeSlug(lake.slug)',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: rows.length',
  'documentedAccess: accessByLake.get(lake.id)',
  'const completeLakeCount = rows.length || COMPLETE_FISHING_LAKE_SLUGS.length',
  'title: `Texas Fishing Lakes — Compare ${completeLakeCount} Complete Lake Guides`',
  'lazy(() => import("@/components/fishing/FishingLakesDirectory")',
  'FishingLakesDirectory rows={rows} latestReview={latestReview}',
]) assert(route.includes(marker), `Fishing lakes route is missing loader/SEO/lazy-boundary marker: ${marker}.`);

for (const marker of [
  "Find the right Texas fishing lake",
  'What this directory covers',
  'Jump to a lake guide',
  'Compare Texas Fishing Lakes',
  'Fishing targets',
  'Documented access type',
  'Research season',
  'Source-reviewed trip options',
  'TPWD fishery profile',
  'Researched seasonal patterns',
  'Check Current Lake Conditions Before You Go',
  'New guides are added as the underlying fishing and access research is completed',
  'same sourcing standard',
  'source-backed lake-to-species relationships',
  'fishingFoundationAnchor("lake", lake.slug)',
]) assert(`${route}\n${component}\n${sharedAnswers}`.includes(marker), `Fishing lakes UI is missing quality/discovery marker: ${marker}.`);

for (const forbidden of [
  '@/data/fishing/fixtures',
  'showcase-lakes-prototype',
  'lake-conroe-prototype',
  'fishingPlatform',
]) assert(!route.includes(forbidden), `Fishing lakes directory must use lazy public queries instead of direct/heavy fishing data dependency: ${forbidden}.`);

const legacyExpectedCompleteSlugs = [
  "lake-conroe", "lake-fork", "sam-rayburn-reservoir", "lake-livingston", "lake-texoma",
  "toledo-bend-reservoir", "possum-kingdom-reservoir", "canyon-lake", "choke-canyon-reservoir", "amistad-reservoir",
  "o-h-ivie-lake", "lake-travis", "lake-whitney", "lake-tawakoni", "falcon-international-reservoir",
];
for (const slug of legacyExpectedCompleteSlugs) assert(slugs.includes(`"${slug}"`), `Complete fishing lake allowlist is missing legacy validated lake ${slug}.`);
const parseSlugArray = (source, name) => {
  const match = source.match(new RegExp(`${name}\\s*=\\s*\\[([^\\]]+)\\]`, "s"));
  return match ? [...match[1].matchAll(/"([a-z0-9-]+)"/g)].map((entry) => entry[1]) : [];
};
const statewideCompleteSlugs = parseSlugArray(slugs, "STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS");
const completeSlugs = [
  ...parseSlugArray(slugs, "BASE_COMPLETE_FISHING_LAKE_SLUGS"),
  ...parseSlugArray(slugs, "WAVE2_COMPLETE_FISHING_LAKE_SLUGS"),
  ...statewideCompleteSlugs,
];
assert(slugs.includes("...BASE_COMPLETE_FISHING_LAKE_SLUGS") && slugs.includes("...WAVE2_COMPLETE_FISHING_LAKE_SLUGS") && slugs.includes("...STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS"), "Fishing lakes complete-guide registry must compose the base, wave-2 and statewide-network slug tuples.");
assert(statewideCompleteSlugs.length === 57, `Fishing lakes directory must include exactly 57 statewide-network lake guides; found ${statewideCompleteSlugs.length}.`);
assert(new Set(completeSlugs).size === 72, `Fishing lakes directory must expose exactly 72 currently validated complete lake guides; found ${new Set(completeSlugs).size}.`);
assert(legacyExpectedCompleteSlugs.every((slug) => completeSlugs.includes(slug)), "Fishing lakes complete-guide registry no longer contains the original validated fifteen-lake collection.");

assert(hubRoute.includes('lazy(() => import("@/components/fishing/FishingHub")'), "Fishing hub lazy boundary is missing.");
assert(authorityWorkflow.includes("FISHING_AUDIT_FULL: ${{ github.event_name == 'workflow_dispatch' && inputs.full == true && '1' || '0' }}"), "Fishing full URL audit must require manual dispatch; no broad scan on every fishing production deployment.");
assert(authorityWorkflow.includes('FISHING_AUDIT_BATCH_SIZE: "120"'), "Bounded daily fishing URL audit batch limit must be retained.");
// The visitor-facing title and introduction must remain in the route itself,
// outside the lazy directory Suspense boundary, so hydration cannot transiently
// remove the only H1. Preserve one semantic heading on desktop and mobile.
const stableH1 = route.indexOf('>Texas fishing lakes</h1>');
const suspenseStart = route.indexOf('<Suspense fallback=');
assert(stableH1 !== -1 && suspenseStart !== -1 && stableH1 < suspenseStart,
  "Fishing lakes canonical H1 must render outside the lazy Suspense boundary.");
assert(!component.includes("<h1"), "Lazy lake directory must not create a second H1.");
// The mobile-only finder shortcut must remain immediately after the eager H1,
// and its target must survive any async Suspense/hydration fallback.
const jumpLink = route.indexOf('href="#lake-finder"');
const finderTarget = route.indexOf('id="lake-finder"');
assert(jumpLink > stableH1 && jumpLink < suspenseStart && route.includes('sm:hidden">Jump to lake finder '),
  "Keep a prominent mobile-only Jump to lake finder link in the persistent hero.");
assert(finderTarget > jumpLink && finderTarget < suspenseStart && route.includes('id="lake-finder" tabIndex={-1}'),
  "The finder fragment target must be keyboard-focusable and rendered outside Suspense.");
assert(!component.includes('id="lake-finder"'), "Do not duplicate the eager lake finder fragment target.");
assert(liveChromeVerifier.includes('page.locator(\'a[href="#lake-finder"]\')')
  && liveChromeVerifier.includes('await mobileFinderLink.click()')
  && liveChromeVerifier.includes('window.location.hash === "#lake-finder"'),
  "Chrome acceptance must actually click the mobile finder shortcut and verify its anchor, while keeping it hidden on desktop.");
assert(route.includes("Browse {rows.length} lake guides"), "Persistent fishing lakes hero must retain the accurate lake-guide count.");
assert(liveChromeWorkflow.includes("group: fishing-lakes-live-chrome-${{ github.event.pull_request.number || github.sha }}"), "Live fishing-lakes Chrome must group push runs by source SHA to prevent later main commits cancelling production browser acceptance.");
for (const marker of ['to="/fishing/lakes"', 'Browse fishing lakes →', 'Explore fishing lakes', 'Featured Texas Fishing Lakes']) assert(hubComponent.includes(marker), `Fishing hub is missing lakes-directory discovery marker: ${marker}.`);
for (const marker of ['id="fishing-research-method"', 'What fishery labels mean', 'desk research', 'TPWD Outdoor Annual', 'Link to="/corrections-policy"']) assert(hubComponent.includes(marker), `Fishing hub must disclose its real source methodology and corrections path: ${marker}.`);

for (const marker of ['FISHING_LAKES_DIRECTORY_PATH = "/fishing/lakes"', '{ path: FISHING_LAKES_DIRECTORY_PATH, lastmod: FISHING_LAKES_DIRECTORY_VERIFIED_AT }']) assert(sitemap.includes(marker), `Fishing sitemap is missing lakes-directory ownership marker: ${marker}.`);
assert(publicRoutes.includes('"/fishing/lakes"'), 'Public static route registry must sitemap-own /fishing/lakes.');
for (const marker of ['id: "fishing-directory:texas-fishing"', 'href: "/fishing"', 'id: "fishing-directory:texas-fishing-lakes"', 'title: "Texas Fishing Lakes"', 'href: "/fishing/lakes"', '"compare fishing lakes"']) assert(search.includes(marker), `Fishing site-search index is missing statewide/lakes directory marker: ${marker}.`);
for (const marker of [
  "const completeLakes = lakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug))",
  "const completeLakeCount = completeLakes.length",
  "const completeLakeNames = completeLakes.map((lake) => lake.name)",
  "Compare ${completeLakeCount} complete TexasDefined fishing-lake guides",
  "...completeLakeNames",
]) assert(search.includes(marker), `Fishing site-search complete-lake metadata is not dynamically derived: ${marker}.`);
assert(!search.includes("Compare the five complete TexasDefined fishing-lake guides"), "Fishing site-search must not reintroduce the stale five-lake summary.");


// The visitor-facing finder filters published guide records, not invented access inventory.
for (const marker of [
  'visibleRows.map(({ lake, targets, documentedAccess })',
  'setSearchText', 'setRegion', 'setSpecies', 'setAccess', 'setSortOrder',
  'aria-label="Region"', 'aria-label="Target species"', 'aria-label="Documented access restrictions"', 'aria-label="Sort guides"', 'Largest by surface area', 'Smallest by surface area',
  'Showing {filteredRows.length} of {rows.length} lake guides',
  'lakeDirectoryAdvisories[lake.slug',
  'Official access restriction — check before travel',
  'Excluding flagged restrictions does NOT mean other lakes or ramps are confirmed open',
  'selectedLakes.length >= 3',
  '"/fishing/compare?"',
  'What fishery labels mean',
  'Fishery profile, not current availability',
  'source-backed lake-to-species relationships',
  'Individual lake facts have different review dates',
]) assert(`${component}\n${sharedAnswers}`.toLowerCase().includes(marker.toLowerCase()), `Fishing lakes directory missing visitor safety, filtering or comparison contract: ${marker}`);

assert(refreshWorkflow.includes('37 14 * * 1,4'), "Fishing lake official-access status requires a twice-weekly GitHub Actions schedule.");
assert(refreshWorkflow.includes('49 15 2 1,4,7,10 *'), "Fishing lake facts require quarterly GitHub authority review.");
assert(refreshWorkflow.includes('17 15 15 8 *'), "The annual TPWD fishing legal-limit research must be rechecked in August, before September 1 rollover.");
assert(researchValidator.includes('applicableReviewYear') && researchValidator.includes('latestReviewFloor') && researchValidator.includes('matchAll(/'), "Preseason validation must reject genuinely stale lake research, including season claims written with an en dash.");
assert(refreshWorkflow.includes('scripts/data/validate-fishing-lake-research.mjs'), "Quarterly lake-fact authority validation is not wired.");
assert(refreshWorkflow.includes('audit-fishing-lakes-directory-sources.mjs'), "Scheduled directory official-source verification is not wired.");
assert(refreshWorkflow.includes('id: regulations') && refreshWorkflow.includes('audit-fishing-lake-regulation-sources.mjs'), "Scheduled directory refresh must review lake-specific official TPWD fishery/regulation links, not only Lake Abilene closures.");
assert(refreshWorkflow.includes('FISHING_LAKES_FULL_REVIEW') && refreshWorkflow.includes('scripts/ci/audit-fishing-lake-regulation-sources.mjs --plan'), "Rotating cohorts and full quarterly 72-lake review must be wired and validated.");
assert(refreshWorkflow.includes('fishing-lake-regulation-sources.json') && refreshWorkflow.includes("steps.regulations.outcome == 'failure'"), "Scheduled regulation source review must retain evidence and create actionable drift issue.");
for (const marker of ['all.length !== 72', 'buckets.some((row) => row.length !== 12)', 'tpwd.texas.gov', 'waterbody-regulations', '--smoke', '--full', 'No automated legal claims']) assert(regulationAudit.includes(marker), "Lake-specific source review missing truthful official-source and bounded cohort invariant: " + marker);
assert(refreshWorkflow.includes('gh issue create'), "Source drift must become an actionable GitHub issue rather than silent data loss.");
for (const marker of ["id: grades", "audit-fishing-lake-grade-sources.mjs", "fishing-lake-fishery-grade-evidence.json", "steps.grades.outcome == 'failure'", "scripts/ci/tpwd-fishery-grades.test.mjs"]) assert(refreshWorkflow.includes(marker), "Official fishery-grade drift review must stay on existing GitHub schedule: " + marker);
assert(route.includes("accessByLake") && route.includes("fishingAccessPointsQuery({ limit: 1000 })"), "Original source-reviewed access comparison missing from data loader.");
assert(component.includes("Documented access type") && component.includes("Research season") && component.includes("TPWD fishery profile"), "Evidence-backed access, season and direct citations missing from directory cards.");
assert(!route.includes('"@type": "FAQPage"') && component.includes("buildFishingLakeQuickAnswers(rows.length)"), "Reader quick answers must remain visible without deprecated FAQPage structured data.");
assert(sourceAudit.includes('Lake Abilene Closures') && sourceAudit.includes('swimming and fishing are not allowed'), "Official TPWD Lake Abilene closure language must be checked.");
assert(advisories["lake-abilene"]?.sourceUrl === "https://tpwd.texas.gov/state-parks/abilene/alert/", "Lake Abilene directory warning must point directly to the official TPWD alert.");
assert(advisories["lake-abilene"]?.verifiedAt && advisories["lake-abilene"]?.notice.includes("fishing"), "Lake Abilene restriction requires a dated, explicit visible warning.");
const samRayburnStart = lakeFixtures.indexOf('slug: "sam-rayburn-reservoir"');
const samRayburnSection = lakeFixtures.slice(samRayburnStart, samRayburnStart + 1400);
for (const county of ["Angelina", "Jasper", "Nacogdoches", "Sabine", "San Augustine"]) assert(samRayburnSection.includes(`"${county}"`), `Sam Rayburn missing TPWD reservoir-boundary county: ${county}`);
assert(samRayburnSection.includes("tpwd-sam-rayburn-legal-boundaries"), "Sam Rayburn source for county correction is missing.");


// Directory cards are progressive; the complete, visible A-Z link index must retain
// every matching destination, including before users click "Show more".
for (const marker of [
  'visibleRows = filteredRows.slice(0, visibleCount)',
  'filteredRows.map(({ lake })',
  'All matching fishing lake guides',
  'setVisibleCount((count) => count + 12)',
  'Show 12 more lake cards',
  'getGroupedFisheryTargets(lake.slug, targets)',
  'White & hybrid striped bass (TPWD combined)',
  'Largemouth & smallmouth bass (TPWD combined)',
  'Hybrid & striped bass (TPWD combined)',
  'target.quality !== "unknown"',
  'lake.slug === "lake-bridgeport" || lake.slug === "lake-sweetwater"',
]) assert(component.includes(marker), `Fishing lake progressive discovery / provenance / visual safeguard missing: ${marker}`);

// Agency angling-opportunity grades may not be inferred from species presence
// or regulation text. Falcon has a special alligator-gar rule, not a TPWD grade.
assert(/id: "falcon-alligator-gar"[^\n]*quality: "unknown"/.test(wave2Fixtures), "Falcon gar must remain ungraded until a quality-specific source supports a grade.");
assert(!/id: "falcon-alligator-gar"[^\n]*quality: "(good|excellent|fair|poor)"/.test(wave2Fixtures), "Do not reintroduce an unsupported Falcon alligator-gar grade.");
assert(wave2Showcase.includes('id: "alligator-gar", name: "Alligator gar", prominence: "Specialized target", quality: "Not graded by TPWD"'), "Falcon detailed guide must not show a fabricated Good gar grade.");
assert(statewideFixtures.includes("TPWD rates Largemouth & Smallmouth Bass together as Good"), "Bridgeport grouped black bass rating provenance missing.");
assert(statewideFixtures.includes("TPWD rates White & Hybrid Striped Bass as one combined Excellent category"), "Bridgeport grouped white/hybrid grade provenance missing.");
assert(wave2Fixtures.includes("TPWD's Excellent rating applies to the combined Hybrid & Striped Bass category"), "Tawakoni combined striper grade provenance missing.");
assert(component.includes('"lake-palestine": [{ members: ["White bass", "Hybrid striped bass"]'), "Palestine grouped TPWD rating must not be shown independently.");
assert(statewideFixtures.includes('fish("white-bass","White bass","excellent","spring","TPWD grades White & Hybrid Striped Bass together Excellent'), "Palestine combined white/hybrid TPWD grade is Excellent.");
assert(component.includes('"cedar-creek-reservoir": [{ members: ["White bass", "Hybrid striped bass"]'), "Cedar Creek must display combined agency category.");
assert(component.includes('"richland-chambers-reservoir": [{ members: ["White bass", "Hybrid striped bass"]'), "Richland Chambers must display combined agency category.");
assert(statewideFixtures.includes("TPWD awards Excellent to the combined White & Hybrid Striped Bass category"), "Somerville white/hybrid ratings must disclose TPWD combined category.");
assert(!/summary:[^\n]*today's water extent/.test(statewideFixtures), "Medina directory summary must not freeze a 'today' lake level.");
assert(!/water levels are currently far below conservation pool/.test(statewideFixtures), "Sweetwater summary must use official live levels, not a frozen current-level statement.");

if (errors.length) {
  console.error("Fishing lakes directory validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Fishing lakes directory validated: 72 completed lake guides remain query-backed, dynamically counted, lazily rendered, sitemap/search-owned and answer-first, while the original 15-lake cohort remains protected.");
