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
if(!groups.includes('const curatedDestinations = groups.find((group) => group.id === "curated-pairings")'))errors.push("Curated reciprocal links no longer prioritized over distance");
if(!workflow.includes("hashFiles('scripts/ci/verify-thc-landmark-sitemap-production.mjs') != ''"))errors.push("Old deployment SHA false-failure guard removed");
console.log(JSON.stringify({check:"swimming-authority-SSR-and-curated-links",passed:errors.length===0,errors},null,2));
if(errors.length)process.exitCode=1;
