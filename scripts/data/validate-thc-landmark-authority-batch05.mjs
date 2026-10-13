#!/usr/bin/env node
/**
 * Release contract for Meridian's 1940 NR bridge, distinct from the 1884
 * Clifton Whipple truss. Structural assertions supplement — not replace —
 * primary-source review and live photo/accessibility checks.
 */
import fs from "node:fs";
const read = p => fs.readFileSync(p, "utf8");
const site=read("src/data/thc-bosque-river-bridge-meridian.ts");
const catalog=read("src/data/destination-preserved-catalog.ts");
const index=read("src/routes/texas-historic-landmarks.lazy.tsx");
const pairings=read("src/data/destination-curated-pairings.ts");
const workflow=read(".github/workflows/thc-landmark-watch.yml");
const errors=[];
function ensure(pass,label){if(!pass)errors.push(label)}
ensure(site.includes('slug:"bosque-river-bridge-meridian"'),"Missing correct canonical bridge slug");
ensure(site.includes('name:"Bosque River Bridge — Meridian"'),"Incorrect historic bridge name");
ensure(site.includes("makeThcHeritageDestination({"),"Site-specific authority schema omitted");
ensure(site.includes("1940")&&site.includes("1885")&&site.includes("2025"),"Bridge generations and NR listing dates conflated");
ensure(site.includes("100011449")&&site.includes("https://atlas.thc.texas.gov/Details?atlasnumber=2100011449"),"THC National Register evidence missing");
ensure(site.includes("Works Progress Administration")&&site.includes("I-beam"),"Engineering/work-relief history missing");
ensure(site.includes("556")&&site.includes("566"),"Conflicting bridge length inventories not explained");
ensure(site.includes("Rene Gomez")&&site.includes("CC BY-SA 4.0")&&site.includes("commonsFilePage(commonsImage)"),"Exact licensed structure photo absent");
ensure(site.includes("accessibility:")&&site.includes("Never stop")&&site.includes("Do not"),"No safe active-highway visitor guidance");
ensure((site.match(/thcFaq\(/g)||[]).length>=7,"Insufficient bridge-specific, sourced visitor FAQs");
ensure((site.match(/thcSource\(/g)||[]).length>=5,"Insufficient independent primary and engineering sources");
ensure((site.slice(site.indexOf("body:["),site.indexOf("faqs:[")).match(/\n    "/g)||[]).length>=6,"Insufficient researched narrative sections");
ensure(site.includes("firstVisitSteps:"),"No context-appropriate visit itinerary");
ensure(catalog.includes("thcHistoricLandmarkAuthorityBatch05Destinations"),"Not in Explore destination catalog");
ensure(index.includes('"Bosque River Bridge": "bosque-river-bridge-meridian"'),"THC listing has no authority guide link");
ensure(pairings.includes('"bosque-river-bridge-meridian":'),"No bidirectional nearby destination links");
ensure(workflow.includes("validate-thc-landmark-authority-batch05.mjs"),"Release gate not integrated with CI");
ensure(!site.includes("Confirm current hours, fees, reservations"),"Generic destination boilerplate");
console.log(JSON.stringify({cohort:"THC Bosque River bridge batch05",passed:errors.length===0,errors},null,2));
if(errors.length)process.exitCode=1;
