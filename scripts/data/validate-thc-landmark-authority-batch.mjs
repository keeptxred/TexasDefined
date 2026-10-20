#!/usr/bin/env node
/* Contract applies to the entire THC authority cohort, not only these first four.
 * Run on every subsequent THC authority publication with the same source-level checks.
 * The build/type checks and real source reviews remain required; this is a cheap
 * structural anti-thin-content gate rather than artificial SEO certification.
 */
import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const file=fs.readFileSync(path.join(root,"src/data/thc-historic-landmarks-authority-batch01.ts"),"utf8");
const index=fs.readFileSync(path.join(root,"src/routes/texas-historic-landmarks.lazy.tsx"),"utf8");
const preserved=fs.readFileSync(path.join(root,"src/data/destination-preserved-catalog.ts"),"utf8");
const pairings=fs.readFileSync(path.join(root,"src/data/destination-curated-pairings.ts"),"utf8");
const rootLabels=[
  ["castro-county-courthouse","Castro County Courthouse"],
  ["kokernot-field","Kokernot Field"],
  ["alpine-downtown-historic-district","Alpine Downtown Historic District"],
  ["downtown-bryan-historic-district","Downtown Bryan Historic District"],
];
const issues=[];
if(!preserved.includes("thcHistoricLandmarkAuthorityBatch01Destinations"))issues.push("Cohort absent from resolved destination/catalog pipeline");
if(!file.includes('category: "historic-sites"'))issues.push("Cohort not categorized as historic sites");
if(!file.includes('sourceCheckedAt: "2026-10-12"'))issues.push("Source review date missing");
if(!file.includes("authorityGuide: editorialGuide(site)"))issues.push("Authority guide absent");
for(const [slug,title] of rootLabels){
 if(!file.includes('slug: "'+slug+'"'))issues.push("Missing independent destination slug: "+slug);
 if(!index.includes('"' + title + '": "'+slug+'"'))issues.push("THC listing missing destination cross-link: "+slug);
 if(!pairings.includes('"'+slug+'"'))issues.push("No curated reverse pairing: "+slug);
}
const sections=file.split('    id: "thc-nrhp-').slice(1);
if(sections.length!==4)issues.push("Expected four individually researched sites; found "+sections.length);
for(const part of sections){
 const slug=part.match(/slug: "([^"]+)"/)?.[1]??"unknown";
 const body=part.match(/    body: \[([\s\S]*?)\n    \],/)?.[1]??"";
 const faqs=part.match(/    faqs: \[([\s\S]*?)\n    \],/)?.[1]??"";
 const src=part.match(/    sources: \[([\s\S]*?)\n    \],/)?.[1]??"";
 const highlights=part.match(/    highlights: \[([\s\S]*?)\n    \],/)?.[1]??"";
 const paragraphs=(body.match(/^      "/gm)||[]).length;
 const questions=(faqs.match(/^      faq\(/gm)||[]).length;
 const sources=(src.match(/^      official\(/gm)||[]).length;
 if(paragraphs<6)issues.push(slug+": substantive history requires at least 6 distinct paragraphs");
 if(body.length<2500)issues.push(slug+": historical treatment is thin");
 if(questions<5)issues.push(slug+": insufficient researched FAQs");
 if(sources<4)issues.push(slug+": too few independent sources");
 if((highlights.match(/^      "/gm)||[]).length<4)issues.push(slug+": insufficient unique highlights");
 if(!part.includes("CC BY-SA")||!part.includes("Wikimedia Commons"))issues.push(slug+": no explicit photo license");
 if(!part.includes("entryNote:")||!part.includes("access:"))issues.push(slug+": no access-specific guidance");
 if(!part.includes("officialUrl:")||!part.includes("coordinates:"))issues.push(slug+": official/geo evidence missing");
 if(/AI-generated representative editorial image|Confirm current hours, fees, reservations, and access with the official source/i.test(part))
  issues.push(slug+": generic editorial/image fallback");
}
const report={cohort:rootLabels.map(x=>x[0]),structuralIssues:issues,readyForBuild:issues.length===0,verifiedAt:new Date().toISOString()};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
