import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const read = (path) => readFileSync(path, "utf8");
const sitemap = read("src/routes/sitemap-explore[.]xml.ts");
const primary = read("src/routes/sitemap[.]xml.ts");
const routes = read("src/lib/public-routes.ts");
const fixture = read("src/data/fixtures/texas.ts");
const reviewed = read("src/data/reviewed-attraction-authorities.ts");
const reviewedMarker = "export const reviewedAttractionDestinations: Destination[] = ";
const reviewedRecords = JSON.parse(reviewed.split(reviewedMarker)[1].trim().replace(/;\s*$/, ""));
assert.equal(reviewedRecords.length, 3, "Maintain exactly three reviewed attraction source records");
for (const attraction of reviewedRecords) {
  assert.ok(attraction.body.length >= 6, attraction.slug + " editorial body unexpectedly thin");
  assert.ok(attraction.authorityGuide.itineraries.length === 2, attraction.slug + " distinct itineraries");
  assert.notEqual(attraction.authorityGuide.itineraries[0].duration, attraction.authorityGuide.itineraries[1].duration, attraction.slug + " redundant itinerary durations");
  assert.ok(!/Do not promise step-free access|not a license to republish|intentionally avoids a blanket claim/i.test(attraction.body.join(" ")), attraction.slug + " editorial meta-language");
  assert.ok(Number.isFinite(Date.parse(attraction.sourceCheckedAt)) && Date.parse(attraction.sourceCheckedAt) >= Date.parse("2026-11-14") && Date.parse(attraction.sourceCheckedAt) <= Date.now(), attraction.slug + " requires a real verified source date, never a future or pre-audit stamp");
}
for (const attraction of reviewedRecords) {
  const bodyIntro = attraction.body[0] ?? "";
  assert.ok(!/^(?:Free admission and a 7 a\.m\.|Visit Fort Worth confirms free admission|Houston Botanic Garden is normally open 9 a\.m\.)/.test(bodyIntro),
    attraction.slug + " must not repeat quick admission facts as article opening");
}
const hbgReview = reviewedRecords.find((item) => item.slug === "houston-botanic-garden");
assert.ok(hbgReview.body.some((paragraph) => paragraph.includes("Museums for All") && paragraph.includes("$3") && paragraph.includes("four daytime general admission tickets")),
  "Houston original visitor guidance must preserve accurately sourced low-income admission option");
assert.ok(hbgReview.visitorFaqs.some((faq) => faq.sourceUrl === "https://hbg.gardenexplorer.org/" && /plant/i.test(faq.question)),
  "Houston guide must provide actionable official plant-collection search instead of generalized copy");
const routeCopy = read("src/routes/destination.$slug.tsx");
assert.ok(routeCopy.includes('!isReviewedAttraction && <section aria-labelledby="destination-research-sources"'),
  "Exactly three reviewed attractions must omit duplicate citation panels while keeping dated authority source list");
const fortWorth = reviewedRecords.find((item) => item.slug === "fort-worth-water-gardens");
const visitorBureau = "https://www.fortworth.com/things-to-do/attractions/fort-worth-water-gardens/";
const freeAdmission = fortWorth.visitorFacts.find((fact) => fact.topic === "admission");
const cityHours = fortWorth.visitorFacts.find((fact) => fact.topic === "hours");
assert.equal(freeAdmission.sourceUrl, visitorBureau, "Only Visit Fort Worth confirms admission is free on the cited official page");
assert.equal(cityHours.sourceUrl, fortWorth.officialUrl, "City park listing owns verified hours and no-wading rules");
assert.ok(fortWorth.authorityGuide.sources.some((source) => source.url === visitorBureau), "Fort Worth tourism source must be linked to readers");
assert.ok(fortWorth.body.join(" ").includes("38 feet") && fortWorth.body.join(" ").includes("40 nozzles"), "Genuine city-published design facts must be preserved");
const fullAuthorityGuide = read("src/components/editorial/DestinationAuthorityGuide.tsx");
assert.ok(
  fullAuthorityGuide.includes('const showSeparateVisitorQuestions = destination.slug !== "san-antonio-japanese-tea-garden"')
    && fullAuthorityGuide.includes("{showSeparateVisitorQuestions && <section"),
  "Tea Garden must not produce a second one-question duration FAQ panel when its first-screen essentials and real visitor FAQ already cover the decision"
);
const attractionRoute = read("src/routes/destination.$slug.tsx");
const galleryBrowser = read("scripts/ci/verify-three-attractions-responsive-browser.mjs");
assert.ok(attractionRoute.includes('<section aria-labelledby="destination-photo-archive"'), "Destination gallery must retain a labelled section landmark");
assert.ok(galleryBrowser.includes('section[aria-labelledby="destination-photo-archive"] figure img'), "Real Chrome must locate actual labelled gallery SECTION, not the heading ID");
assert.ok(!galleryBrowser.includes('#destination-photo-archive figure img'), "Do not regress to searching photos inside an h2 heading; this silently selects zero images");
assert.ok(galleryBrowser.includes('section[aria-labelledby="destination-authority-sources"]'), "Chrome must select the full labelled source section, not a heading or a cached preview");
assert.ok(galleryBrowser.includes("sourceUrls.every((url) => links.includes(url))"), "Chrome must wait for all actual approved operator citations before inspecting them");
assert.ok(galleryBrowser.includes("actualDate === reviewDate"), "Chrome must verify on-page official source check date against the canonical record");
assert.ok(!galleryBrowser.includes('document.querySelector("#destination-authority-sources")?.closest("section")'), "Do not regress to a fragile first heading-ID match rather than the actual citation landmark");

assert.ok(attractionRoute.includes("reviewedAttractionFacts") && attractionRoute.includes('data-attraction-photo-credit'), "Reviewed attraction visitor essentials and compact licensed photo credit missing");
assert.ok(attractionRoute.includes("isHoustonBotanicRecyclingOfferActive()"), "Timed Houston Recycles notice must be time gated");
const attractionPhotoRights = read("src/lib/reviewed-attraction-gallery-rights.ts");
for (const [slug, count] of [["san-antonio-japanese-tea-garden", 1], ["fort-worth-water-gardens", 2]]) {
  const item = reviewedRecords.find((value) => value.slug === slug);
  assert.ok((item.gallery?.length || 0) >= count, slug + " must retain minimum verified subject-specific views without blocking later rights-cleared additions");
  for (const image of item.gallery) {
    assert.ok(attractionPhotoRights.includes(image.sourceUrl), slug + " image rights missing from exact file ledger");
    assert.ok(image.image.credit.includes("resized") || image.image.credit.includes("web-sized"), slug + " resized derivative not identified");
  }
}

// A postdeploy workflow_run fires after a long protected Worker release. New
// commits can merge during that release, so checking out latest main instead of
// the successful workflow_run.head_sha creates false source/release certification.
const publishedVerifierWorkflow = read(".github/workflows/verify-active-shop-sitemap.yml");
assert.ok(publishedVerifierWorkflow.includes("github.event.workflow_run.head_sha"),
  "Postdeploy attraction SEO/Chrome certification must inspect the exact published source revision");

const curatedTourism = read("src/data/curated-tourism-collections.ts");
const houstonBotanicCard = curatedTourism.split('"name": "Houston Botanic Garden"')[1]?.split('"officialUrl":', 1)[0] ?? "";
assert.ok(houstonBotanicCard.includes('"destinationSlug": "houston-botanic-garden"'),
  "Existing Explore botanical gardens shortlist must link the published Houston Botanic Garden authority guide");

// Keep the canonical Houston visitor address once, rather than allowing a
// later duplicate object key to silently overwrite an earlier source value.
const botanicStart = reviewed.indexOf('"slug": "houston-botanic-garden"');
const botanicEnd = botanicStart < 0 ? -1 : reviewed.indexOf('"visitorFaqs":', botanicStart);
const botanicRecord = botanicStart < 0 || botanicEnd < 0 ? '' : reviewed.slice(botanicStart, botanicEnd);
assert.equal((botanicRecord.match(/"address":/g) ?? []).length, 1,
  "Houston Botanic Garden authority record must have one canonical visitor address");
assert.ok(botanicRecord.includes('"address": "One Botanic Lane, Houston, TX 77017"'),
  "Houston Botanic Garden must retain its independently reviewed operator address");

const reviewedCanonical = read("src/lib/reviewed-attraction-canonical-redirect.ts");
const cachePolicy = read("src/lib/hashed-asset-document-cache-policy.ts");
const worker = read("src/server.ts");

const preserved = read("src/data/small-town-destinations-wave7.ts");
const terms = read("src/routes/network.terms.tsx");

// Both pages are intentionally indexable and must appear in the NORMAL
// sitemap, not only the emergency fallback.
const normal = sitemap.slice(sitemap.indexOf("const staticPaths = ["));
for (const route of ["/explore/big-bend-scenic-drives", "/explore/lighthouses"]) {
  assert.match(normal, new RegExp('"' + route + '"'));
}

// These are complete source records also used by the public detail route.
// Preserve audit/visitability gates; never force raw path strings into XML.
for (const slug of ["caddo-lake", "blue-hole-wimberley"]) {
  assert.ok(fixture.includes(`slug: "${slug}"`), `Missing canonical fixture: ${slug}`);
  assert.ok(sitemap.includes(`"${slug}"`), `No fixture sitemap overlay: ${slug}`);
}
assert.ok(preserved.includes('slug: "blanco"'), "Town authority source missing");
assert.ok(sitemap.includes('item.slug === "blanco"'), "Town authority not reconciled");
assert.ok(worker.includes("reviewedAttractionCanonicalRedirect(request)"),
  "Worker must consolidate reviewed attraction query/slash variants before SSR.");
for (const path of ["/destination/san-antonio-japanese-tea-garden","/destination/fort-worth-water-gardens","/destination/houston-botanic-garden","/city/san-antonio","/city/fort-worth","/city/houston","/county/bexar","/county/tarrant","/county/harris"]) {
  assert.ok(cachePolicy.includes('"' + path + '"'), `Attraction/city/county HTML must not retain stale cached versions: ${path}`);
}
for (const path of ["/destination/san-antonio-japanese-tea-garden","/destination/fort-worth-water-gardens","/destination/houston-botanic-garden"]) {
  assert.ok(reviewedCanonical.includes('"' + path + '"'), `Reviewed attraction canonical redirect missing: ${path}`);
}

for (const slug of ["san-antonio-japanese-tea-garden", "fort-worth-water-gardens", "houston-botanic-garden"]) {
  assert.ok(reviewed.includes(`"slug": "${slug}"`), `Reviewed attraction source missing: ${slug}`);
  assert.ok(sitemap.includes(`"${slug}"`), `Reviewed attraction absent from sitemap reconcile: ${slug}`);
}
for (const guard of [
  'auditDestination(destination).readyForIndexing',
  'isPrimaryTripPlannerDestination(destination)',
  'const destinations = await resolveDestinationCatalog(rawDestinations)',
  'const editorialCanonicalSources',
  'reviewedAttractionDestinations.filter',
  'originalEditorialDestinations.filter',
]) assert.ok(sitemap.includes(guard), `Editorial sitemap must retain quality gate: ${guard}`);

const detailParity = read("src/data/destination-sitemap-detail-parity.server.ts");
for (const marker of [
  'const DETAIL_PARITY_SLUGS = ["blanco", "caddo-lake"] as const',
  'await getResolvedDestination(slug)',
  'auditDestination(destination).readyForIndexing',
  'isPrimaryTripPlannerDestination(destination)',
]) assert.ok(detailParity.includes(marker), `Shared detail parity must retain canonical resolver and audit gate: ${marker}`);
for (const marker of [
  'await import("@/data/destination-sitemap-detail-parity.server")',
  'await loadCanonicalDestinationSitemapParity()',
  'destinationEntries.some((item) => item.includes(loc))',
]) assert.ok(sitemap.includes(marker), `Explore sitemap must use shared detail parity: ${marker}`);
assert.ok(!sitemap.includes('await import("@/data/destination-query-runtime")'),
  "Do not couple Explore sitemap directly to the runtime; Metro proximity uses a distinct shared readiness owner.");

// Public membership terms are visible and self-canonical in production. Do
// not exclude them from the sitemap or accidentally index private Network
// enrollment, billing or callback surfaces.
assert.ok(routes.includes('  "/network/terms",'), "Terms route should be indexable");
const publicPaths = routes.split("export const NON_INDEXABLE_PUBLIC_PATHS")[0];
assert.ok(publicPaths.includes('  "/network/terms",'), "Terms absent from indexable static paths");
const excluded = routes.split("export const NON_INDEXABLE_PUBLIC_PATHS")[1].split("const NON_INDEXABLE_PREFIXES")[0];
assert.ok(!excluded.includes('"/network/terms"'), "Public terms still excluded from sitemap");
for (const privatePath of ["/network/apply", "/network/billing", "/network/checkout-return", "/network/join"]) {
  assert.ok(excluded.includes(`"${privatePath}"`), `Private network path accidentally indexable: ${privatePath}`);
}
assert.ok(terms.includes("canonicalLink(texasDefinedBrand,canonicalPath)"), "Terms page lost its self canonical");
assert.ok(primary.includes("INDEXABLE_STATIC_PATHS"), "Main sitemap must use public route registry");

// Execute request-level redirects and the nine scoped no-store HTML contracts in
// every canonical premerge run. Source grep alone does not prove response behavior.
execFileSync(process.execPath, [
  "--experimental-strip-types",
  "--test",
  "src/lib/reviewed-attraction-canonical-redirect.test.ts",
  "src/lib/hashed-asset-document-cache-policy.test.ts",
  "src/lib/houston-botanic-recycles.test.ts",
], { stdio: "inherit" });

console.log("PASS: eight existing editorial pages and public membership terms have canonical sitemap sources; protected quality gates and private network exclusions retained.");
