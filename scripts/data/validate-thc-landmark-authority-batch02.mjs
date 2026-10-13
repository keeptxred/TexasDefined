#!/usr/bin/env node
/* Source-specific authority pages, not generated GIS-only tourist placeholders.
 * The minimums apply to every property in this cohort and block a merge if
 * essential facts, rights or relevant links are dropped.
 */
import fs from "node:fs";
const cohort=[
  ["thc-bailey-county-courthouse.ts","bailey-county-courthouse","Bailey County Courthouse"],
  ["thc-wimberley-downtown-square.ts","wimberley-downtown-square-historic-district","Wimberley Downtown Square Historic District"],
  ["thc-sour-lake-downtown.ts","sour-lake-downtown-historic-district","Sour Lake Downtown Historic District"],
];
const read=p=>fs.readFileSync(p,"utf8");
const manifest=read("src/data/destination-preserved-catalog.ts");
const index=read("src/routes/texas-historic-landmarks.lazy.tsx");
const pairings=read("src/data/destination-curated-pairings.ts");
const workflow=read(".github/workflows/thc-landmark-watch.yml");
const errors=[];
if(!manifest.includes("thcHistoricLandmarkAuthorityBatch02Destinations"))errors.push("Batch02 not in destination/sitemap catalog");
if(!workflow.includes("validate-thc-landmark-authority-batch02.mjs"))errors.push("Batch02 validator not linked to persistent CI workflow");
const all=new Set();
for(const [file,slug,title] of cohort){
 const contents=read("src/data/"+file);
 if(all.has(slug))errors.push(slug+" duplicate");all.add(slug);
 if(!contents.includes('slug:"'+slug+'"'))errors.push(slug+" missing individual canonical identifier");
 if(!contents.includes('name:"'+title+'"'))errors.push(slug+" incorrect displayed name");
 if(!contents.includes("makeThcHeritageDestination({"))errors.push(slug+" missing full destination builder");
 if(!contents.includes("commonsFilePage(")||!contents.includes("imageCredit:"))errors.push(slug+" missing photo credit and license provenance");
 if(!contents.includes("officialUrl:")||!contents.includes("accessibility:")||!contents.includes("entry:"))errors.push(slug+" missing visitor access context");
 if(!index.includes('"'+title+'": "'+slug+'"')&&!index.includes('"Sour Lake Historic District": "'+slug+'"'))errors.push(slug+" missing THC designation reverse link");
 if(!pairings.includes('"'+slug+'"'))errors.push(slug+" missing contextual/county linking");
 const prose=contents.match(/  body:\[([\s\S]*?)\n  \],/)?.[1]||"";
 const faqs=contents.match(/  faqs:\[([\s\S]*?)\n  \],/)?.[1]||"";
 const citations=contents.match(/  sources:\[([\s\S]*?)\n  \],/)?.[1]||"";
 const highlights=contents.match(/  highlights:\[([\s\S]*?)\n  \],/)?.[1]||"";
 if((prose.match(/^    "/gm)||[]).length<6||prose.length<2500)errors.push(slug+" has thin or incomplete historical narrative");
 if((faqs.match(/thcFaq\(/g)||[]).length<5)errors.push(slug+" has too few researched visitor FAQs");
 if((citations.match(/thcSource\(/g)||[]).length<4)errors.push(slug+" not enough substantive cited sources");
 if((highlights.match(/^    "/gm)||[]).length<4)errors.push(slug+" missing meaningful highlights");
 if(!/CC BY-SA 4\.0|public domain/i.test(contents))errors.push(slug+" photo rights incomplete");
 if(!contents.includes("firstVisitSteps:"))errors.push(slug+" missing site-specific trip guidance");
 if(/AI-generated representative editorial image|Confirm current hours, fees, reservations, and access with the official source/.test(contents))errors.push(slug+" generic boilerplate found");
}
console.log(JSON.stringify({batch:"02",siteCount:cohort.length,errors,ready:errors.length===0},null,2));
if(errors.length)process.exitCode=1;
