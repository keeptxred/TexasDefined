#!/usr/bin/env node
/* THC transportation authority batch 03: structural quality is required but
 * does not replace manual source, access and file-level photo verification. */
import fs from "node:fs";
const read = path => fs.readFileSync(path, "utf8");
const source = read("src/data/thc-del-rio-southern-pacific-depot.ts");
const catalog = read("src/data/destination-preserved-catalog.ts");
const index = read("src/routes/texas-historic-landmarks.lazy.tsx");
const pairings = read("src/data/destination-curated-pairings.ts");
const workflow = read(".github/workflows/thc-landmark-watch.yml");
const slug="southern-pacific-passenger-depot-del-rio";
const errors=[];
const expect=(ok,reason)=>{if(!ok)errors.push(reason)};
expect(source.includes('slug:"'+slug+'"'),"Depot slug missing");
expect(source.includes('name:"Southern Pacific Passenger Depot — Del Rio"'),"Specific place name missing");
expect(source.includes("makeThcHeritageDestination({"),"Authority guide missing");
expect(source.includes("CC BY-SA 3.0")&&source.includes("commonsFilePage(image)"),"File-license provenance missing");
expect(source.includes("buff brick")&&!source.toLowerCase().includes("stucco"),"Depot exterior architectural correction regressed");
expect(source.includes("entry:")&&source.includes("accessibility:")&&source.includes("station"),"Current public-access and Amtrak details missing");
expect((source.match(/thcFaq\(/g)||[]).length>=6,"Six sourced visitor FAQs required");
expect((source.match(/thcSource\(/g)||[]).length>=5,"Five source entries required");
expect((source.slice(source.indexOf("  body:["),source.indexOf("  faqs:[")).match(/\n    "/g)||[]).length>=6,"Six distinct substantive history paragraphs required");
expect(source.includes("firstVisitSteps:"),"Actionable site visit missing");
expect(catalog.includes("thcHistoricLandmarkAuthorityBatch03Destinations"),"Absent from canonical Explore catalog");
expect(index.includes('"Southern Pacific Passenger Depot": "'+slug+'"'),"No link from THC listing index");
expect(pairings.includes('"'+slug+'"'),"No reverse contextual links");
expect(workflow.includes("validate-thc-landmark-authority-batch03.mjs"),"No permanent CI coverage");
console.log(JSON.stringify({site:slug,checksPassed:errors.length===0,errors},null,2));
if(errors.length)process.exitCode=1;
