#!/usr/bin/env node
/** Non-generic THC landmark depth and rights contract.
 * New transport landmarks must have independent history, a real image from
 * the property, user-appropriate safety/access instructions, reviewed sources,
 * bidirectional contextual links, and the official National Register citation.
 * Note: structural checks cannot replace fact verification or live QA.
 */
import fs from "node:fs";
const read = (p) => fs.readFileSync(p,"utf8");
const catalog=read("src/data/destination-preserved-catalog.ts");
const index=read("src/routes/texas-historic-landmarks.lazy.tsx");
const links=read("src/data/destination-curated-pairings.ts");
const workflow=read(".github/workflows/thc-landmark-watch.yml");
const problems=[];
if(!catalog.includes("thcHistoricLandmarkAuthorityBatch03Destinations"))problems.push("No resolved destination catalog registration");
if(!workflow.includes("validate-thc-landmark-authority-batch03.mjs"))problems.push("Watch workflow omitted batch 03 validator");
const sites=[
  ["src/data/thc-del-rio-southern-pacific-depot.ts","southern-pacific-passenger-depot-del-rio","Southern Pacific Passenger Depot"],
  ["src/data/thc-bosque-river-bridge.ts","bosque-river-bridge-meridian","Bosque River Bridge"]
];
for(const [file,slug,name] of sites) {
 const code=read(file);
 if(!code.includes('slug:"'+slug+'"'))problems.push(slug+": canonical slug missing");
 if(!index.includes('"'+name+'": "'+slug+'"'))problems.push(slug+": missing National Register collection backlink");
 if(!links.includes('"'+slug+'"'))problems.push(slug+": missing contextual reverse link");
 const section=(start,end)=>code.slice(code.indexOf(start),code.indexOf(end,code.indexOf(start)+start.length));
 const body=section("  body:[","  faqs:[");
 const faqs=section("  faqs:[","  sources:[");
 const sources=section("  sources:[","  whyVisit:");
 const numP=(body.match(/^    "/gm)||[]).length;
 const questions=(faqs.match(/thcFaq\(/g)||[]).length;
 const cited=(sources.match(/thcSource\(/g)||[]).length;
 if(numP<6||body.length<3500)problems.push(slug+": historical writing incomplete ("+numP+")");
 if(questions<6)problems.push(slug+": FAQ research incomplete ("+questions+")");
 if(cited<4)problems.push(slug+": source coverage incomplete ("+cited+")");
 if(!code.includes("commonsFilePage(image)") && !code.includes("commonsFilePage(photo)"))problems.push(slug+": image license source missing");
 if(!code.includes("imageCredit:")||!code.includes("CC BY-SA"))problems.push(slug+": attribution and reusable image license missing");
 if(!code.includes("accessibility:")||!code.includes("entry:"))problems.push(slug+": visit-type access and mobility guidance missing");
 if(!code.includes("firstVisitSteps:"))problems.push(slug+": tailored travel guidance missing");
 if(!code.includes("makeThcHeritageDestination("))problems.push(slug+": authority schema unregistered");
}
console.log(JSON.stringify({cohort:"THC transportation batch03",count:sites.length,problems,passed:problems.length===0},null,2));
if(problems.length)process.exitCode=1;
