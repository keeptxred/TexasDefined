#!/usr/bin/env node
/* Fail-closed structural regression checks. Facts and media rights also require independent source evidence. */
import fs from "node:fs";
const read = p => fs.readFileSync(p, "utf8");
const records = [
  ["src/data/thc-bosque-river-bridge.ts", "bosque-river-bridge-meridian", 7, 7, 5],
  ["src/data/thc-holland-hotel-authority.ts", "holland-hotel", 7, 8, 6],
  ["src/data/thc-sycamore-creek-bridge-fort-worth.ts", "sycamore-creek-bridge-fort-worth", 7, 8, 5],
];
const catalog=read("src/data/destination-preserved-catalog.ts");
const pairings=read("src/data/destination-curated-pairings.ts");
const index=read("src/routes/texas-historic-landmarks.lazy.tsx");
const batch=read("src/data/thc-historic-landmarks-authority-batch05.ts");
const builder=read("src/data/thc-landmark-heritage-builder.ts");
const errors=[];
if (!builder.includes("accessibilityNotes:site.accessibility")) errors.push("Accessibility details not rendered");
if (!catalog.includes("thcHistoricLandmarkAuthorityBatch05Destinations")) errors.push("Authority batch not in canonical Explore");
for (const [path,slug,minParagraphs,minFaqs,minSources] of records) {
  const s=read(path);
  if (!s.includes('slug:"'+slug+'"')) errors.push(slug+": canonical slug missing");
  if (!s.includes("makeThcHeritageDestination({")) errors.push(slug+": authority model missing");
  if (!batch.includes(path.split("/").pop().replace(".ts",""))) errors.push(slug+": not in authority batch");
  if (!pairings.includes('"'+slug+'"')) errors.push(slug+": reciprocal pairing missing");
  if (!index.includes('"'+slug+'"')) errors.push(slug+": THC index link missing");
  if (!s.includes("commonsFilePage(") || !s.includes("CC BY-SA")) errors.push(slug+": media evidence missing");
  if (!s.includes("entry:") || !s.includes("accessibility:") || !s.includes("firstVisitSteps:")) errors.push(slug+": site access requirements missing");
  const body=s.split("  body:[")[1]?.split("  faqs:[")[0] || "";
  if ((body.match(/^    "/gm)||[]).length<minParagraphs) errors.push(slug+": too few original history paragraphs");
  if ((s.match(/thcFaq\\(/g)||[]).length<minFaqs) errors.push(slug+": insufficient FAQs");
  if ((s.match(/thcSource\\(/g)||[]).length<minSources) errors.push(slug+": insufficient sources");
}
console.log(JSON.stringify({batch:"05",properties:records.length,passed:errors.length===0,errors},null,2));
if(errors.length)process.exitCode=1;
