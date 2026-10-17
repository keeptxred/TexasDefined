#!/usr/bin/env node
// Canonical public HTML remains the editorial original; SSR bundled copy must be exact.
import { readFileSync } from "node:fs";
const read = p => readFileSync(p, "utf8");
const publicAuthority = read("public/content/explore-category-authority/swimming-holes-river-tubing.html");
const bundledAuthority = read("src/data/swimming-holes-river-tubing.html");
const server = read("src/data/swimming-authority-content.server.ts");
const fn = read("src/data/swimming-authority.functions.ts");
const route = read("src/routes/explore.$category.tsx");
const groups = read("src/components/editorial/DestinationRelationships.tsx");
const relationshipEngine = read("src/data/destination-relationships.ts");
const sitemap = read("src/routes/sitemap-explore[.]xml.ts");
const activity = read("src/data/water-recreation.ts");
const regional = read("src/data/destination-region-consistency.ts");
const lazyRoute = read("src/routes/explore.$category.lazy.tsx");
const destinationRuntime = read("src/data/destination-query-runtime.ts");
const workflow = read(".github/workflows/verify-sitemap-production-integrity.yml");
const officialSourceMigration = read("supabase/migrations/20261014215400_swim_float_authority_source_enrollment.sql");
const currentAlertSources = read("supabase/migrations/20261017145000_swim_float_current_alert_sources.sql");
const errors = [];

const mobileComparisonClass = 'class="mt-6 grid gap-5 md:hidden"';
const desktopComparisonClass = 'class="mt-6 hidden overflow-x-auto md:block"';
if (!publicAuthority.includes(mobileComparisonClass) || !publicAuthority.includes(desktopComparisonClass)) {
  errors.push("River comparison must have readable mobile cards and a tablet/desktop table.");
}
for (const riverSlug of [
  "texas-comal-river-guide",
  "texas-guadalupe-river-guide",
  "texas-san-marcos-river-guide",
  "texas-frio-river-guide",
]) {
  const riverLink = 'href="/article/' + riverSlug + '"';
  if (publicAuthority.split(riverLink).length - 1 < 2) {
    errors.push("Mobile cards must preserve the official river route link: " + riverSlug);
  }
}

for (const marker of [
  "https://tpwd.texas.gov/state-parks/blanco/alert",
  "https://wimberleyparksandrec.com/swimming-faqs/",
  "https://wimberleyparksandrec.com/blue-hole-water-quality-test/",
  "ON CONFLICT (path, source_url)",
]) {
  if (!currentAlertSources.includes(marker)) errors.push("Current swim access monitoring lost official source: " + marker);
}
for (const marker of [
  "Known restrictions checked October 17, 2026",
  "park-wide burn ban on October 16, 2026",
  "The 2026 published swim season is over by October",
  "https://tpwd.texas.gov/state-parks/blanco/alert",
  "https://wimberleyparksandrec.com/swimming-faqs/",
  "https://wimberleyparksandrec.com/blue-hole-water-quality-test/",
]) {
  if (!publicAuthority.includes(marker)) errors.push("Swim guide lost October 2026 current-notice evidence: " + marker);
}
for (const marker of [
  "'/explore/swimming-holes-river-tubing'",
  "'water-recreation-visitor-safety'",
  "cadence_days = LEAST(",
  "ON CONFLICT (path, source_url)",
  "https://tpwd.texas.gov/state-parks/abilene/alert/",
  "https://tpwd.texas.gov/state-parks/abilene/fees-facilities/pool/swimming-pool/",
  "https://www.newbraunfels.gov/comalriver",
  "https://newbraunfels.gov/3369/Guadalupe-River",
  "https://www.sanmarcostx.gov/facilities/facility/details/riovistapark-41",
  "https://wimberleyparksandrec.com/blue-hole-swimming/",
  "https://www.austintexas.gov/services/visit-barton-springs-pool",
]) {
  if (!officialSourceMigration.includes(marker)) errors.push("Swim/float official source monitoring lost: " + marker);
}
for (const marker of ['id="texas-float-corridors"', 'id="texas-swimming-picks"', 'id="texas-swimming-alerts"', 'id="texas-swim-planning"', '/article/texas-comal-river-guide', '/article/texas-guadalupe-river-guide', '/article/texas-frio-river-guide', '/article/texas-san-marcos-river-guide', 'https://tpwd.texas.gov/state-parks/abilene/alert/', 'https://wimberleyparksandrec.com/blue-hole-swimming/']) {
  if (!publicAuthority.includes(marker)) errors.push("Swim authority lost trip-planning evidence: " + marker);
}
if (publicAuthority.split("<figure").length - 1 < 3) errors.push("Swim authority lacks destination-specific photographic evidence");
if (!activity.includes('"abilene-state-park"') || !activity.includes('SWIM_ACTIVITY_RESTRICTIONS[destination.slug]')) errors.push("Closed swimming activity can reenter the recommendations");
if (!regional.includes('"abilene-state-park": "panhandle"')) errors.push("Abilene State Park has no verified Panhandle Plains override");
if (!lazyRoute.includes('id: "texas-swimming-floating-destination-graphic"')) errors.push("Swimming destinations no longer have an orientation map");
if(publicAuthority !== bundledAuthority) errors.push("Bundled swim authority and public HTML have drifted");
for (const marker of ['id="texas-swimming-holes-river-tubing-guide"',"Official sources","https://"]) if(!bundledAuthority.includes(marker))errors.push("Swim authority lost content/sources: "+marker);
if(!server.includes('swimming-holes-river-tubing.html?raw'))errors.push("SSR worker is not bundling the authoritative HTML");
if(!fn.includes('import("./swimming-authority-content.server")'))errors.push("SSR loader lost safe server-only authority import");
if(!route.includes('category.slug === SWIMMING_HOLES_RIVER_TUBING_SLUG') || !route.includes('getSwimmingAuthorityHtml()'))errors.push("Category route not loading resilient verified swim authority");
if(!route.includes('&& loaderData.authorityHtml.includes("Official sources")'))errors.push("Category index gate no longer checks evidence actually rendered");
if(!sitemap.includes('swimmingHoleAndTubingIndexReady ?'))errors.push("Sitemap no longer applies quality gate for swim category");
// Water is a curated virtual category. It is NOT the original category for
// towns, state parks, rivers or springs; a second category gate silently
// zeroes the entire published collection while leaving SEO/indexability on.
const virtualBranch = destinationRuntime.split('if (params.category === WATER_COLLECTION) {')[1]?.split('if (params.category === RV_COLLECTION) {')[0] || '';
if(!virtualBranch.includes('selectSwimmingHoleAndTubingDestinations(await listResolvedDestinations())') || !virtualBranch.includes('{ region: params.region }') || virtualBranch.includes('filterDestinationsByScope(selectSwimmingHoleAndTubingDestinations(await listResolvedDestinations()), params)')) errors.push("Virtual swim collection improperly filtered by original destination category");
if(!groups.includes('featuredDestinationRelationships(destination, groups)') ||
   !relationshipEngine.includes('const curated = groups.filter((group) => group.id === "curated-pairings")') ||
   !relationshipEngine.includes('unique([...curated, ...discovered])'))errors.push("Curated reciprocal links no longer prioritized over distance");
if(!workflow.includes("hashFiles('scripts/ci/verify-thc-landmark-sitemap-production.mjs') != ''"))errors.push("Old deployment SHA false-failure guard removed");
console.log(JSON.stringify({check:"swimming-authority-SSR-and-curated-links",passed:errors.length===0,errors},null,2));
if(errors.length)process.exitCode=1;
