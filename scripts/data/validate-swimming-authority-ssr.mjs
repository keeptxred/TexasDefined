#!/usr/bin/env node
// Canonical public HTML remains the editorial original; SSR bundled copy must be exact.
import { readFileSync } from "node:fs";
const read = p => readFileSync(p, "utf8");
const publicAuthority = read("public/content/explore-category-authority/swimming-holes-river-tubing.html");
const bundledAuthority = read("src/data/swimming-holes-river-tubing.html");
const server = read("src/data/swimming-authority-content.server.ts");
const fn = read("src/data/swimming-authority.functions.ts");
const route = read("src/routes/explore.$category.tsx");
const destinationRuntime = read("src/data/destination-query-runtime.ts");
const waterSelector = read("src/data/water-recreation.ts");
const groups = read("src/components/editorial/DestinationRelationships.tsx");
const relationshipEngine = read("src/data/destination-relationships.ts");
const sitemap = read("src/routes/sitemap-explore[.]xml.ts");
const workflow = read(".github/workflows/verify-sitemap-production-integrity.yml");
const errors = [];
if(publicAuthority !== bundledAuthority) errors.push("Bundled swim authority and public HTML have drifted");
for (const marker of ['id="texas-swimming-holes-river-tubing-guide"',"Official sources","https://"]) if(!bundledAuthority.includes(marker))errors.push("Swim authority lost content/sources: "+marker);
if(!server.includes('swimming-holes-river-tubing.html?raw'))errors.push("SSR worker is not bundling the authoritative HTML");
if(!fn.includes('import("./swimming-authority-content.server")'))errors.push("SSR loader lost safe server-only authority import");
if(!route.includes('category.slug === SWIMMING_HOLES_RIVER_TUBING_SLUG') || !route.includes('getSwimmingAuthorityHtml()'))errors.push("Category route not loading resilient verified swim authority");
if(!route.includes('&& loaderData.authorityHtml.includes("Official sources")'))errors.push("Category index gate no longer checks evidence actually rendered");
if(!sitemap.includes('swimmingHoleAndTubingIndexReady ?'))errors.push("Sitemap no longer applies quality gate for swim category");
// A virtual collection may pull vetted parks, springs and gateway towns from
// multiple true categories. Reusing the virtual slug as a second category
// filter emptied every CollectionPage ItemList while leaving the guide indexed.
if (!destinationRuntime.includes('if (params.category === WATER_COLLECTION)') ||
    !destinationRuntime.includes('selectSwimmingHoleAndTubingDestinations(await listResolvedDestinations())') ||
    !destinationRuntime.includes('{ category: undefined, region: params.region }') ||
    destinationRuntime.includes('filterDestinationsByScope(selectSwimmingHoleAndTubingDestinations(await listResolvedDestinations()), params)')) {
  errors.push("Swim collection must preserve qualifying cross-category destinations and optional region scope");
}
for (const marker of ['WATER_CATEGORY.test(destination.category)', 'TUBING_GATEWAY.test(destination.slug)', 'CURRENT_STATUS_RESTRICTION.test(sentence)', 'WATER_SIGNAL.test(text)', '!RESTRICTION.test(text)']) {
  if (!waterSelector.includes(marker)) errors.push("Swim qualification or current closure safeguard missing: " + marker);
}
if(!route.includes('destinationsQuery({ category: category.slug })') || !route.includes('...loaderData.destinations.map((destination, index)')) errors.push("Swim destination data not represented in canonical CollectionPage JSON-LD");
if(!groups.includes('featuredDestinationRelationships(destination, groups)') ||
   !relationshipEngine.includes('const curated = groups.filter((group) => group.id === "curated-pairings")') ||
   !relationshipEngine.includes('unique([...curated, ...discovered])'))errors.push("Curated reciprocal links no longer prioritized over distance");
if(!workflow.includes("hashFiles('scripts/ci/verify-thc-landmark-sitemap-production.mjs') != ''"))errors.push("Old deployment SHA false-failure guard removed");
console.log(JSON.stringify({check:"swimming-authority-SSR-and-curated-links",passed:errors.length===0,errors},null,2));
if(errors.length)process.exitCode=1;
