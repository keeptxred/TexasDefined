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
const holland=read("src/data/thc-holland-hotel-authority.ts");
const alpineDistrict=read("src/data/thc-historic-landmarks-authority-batch01.ts");
const hollandPhoto="Alpine - Holland Hotel.jpg";
const sycamore=read("src/data/thc-sycamore-creek-bridge-fort-worth.ts");
if(!sycamore.includes("https://fortworthgov.granicus.com/boards/board_answers/279122/attachment")) errors.push("Fort Worth bridge lost reachable official HCLC April 14 minutes");
if(sycamore.includes("2025-minutes-combined.pdf"))errors.push("Fort Worth bridge references bot-blocked old municipal PDF instead of reachable approved minutes");
if (!holland.includes(`const image = "${hollandPhoto}";`)) errors.push("Holland Hotel must use its independently sourced exact-property photo");
if (!holland.includes("P. Hughes") || !holland.includes("CC BY 4.0") || !holland.includes("imageWidth:5012,imageHeight:3896")) errors.push("Holland Hotel file-level creator/license/dimensions missing");
if (alpineDistrict.includes(`commons("${hollandPhoto}"`)) errors.push("Holland Hotel and Alpine district cannot share a hero image");
if (!alpineDistrict.includes('commons("Holland Avenue and Hotel Holland Alpine Texas DSC 5556 ad.JPG"')) errors.push("Alpine district original distinct photo provenance changed: reverify collision");
if (!builder.includes("accessibilityNotes:site.accessibility")) errors.push("Accessibility details not rendered");
if (!catalog.includes("thcHistoricLandmarkAuthorityBatch05Destinations")) errors.push("Authority batch not in canonical Explore");
if (!pairings.includes('"sycamore-creek-bridge-fort-worth": ["fort-worth-stockyards"]')) errors.push("Fort Worth bridge requires an actually published heritage companion; nonexistent park/city slugs must not masquerade as related destinations");
const attractions=read("src/data/destination-curation-top-attractions-fallbacks.ts");
if (!attractions.includes('"fort-worth-stockyards"'))errors.push("Fort Worth bridge companion missing from preserved attraction catalog");
for (const [path,slug,minParagraphs,minFaqs,minSources] of records) {
  const s=read(path);
  if (!s.includes('slug:"'+slug+'"')) errors.push(slug+": canonical slug missing");
  if (!s.includes("makeThcHeritageDestination({")) errors.push(slug+": authority model missing");
  if (!batch.includes(path.split("/").pop().replace(".ts",""))) errors.push(slug+": not in authority batch");
  if (!pairings.includes('"'+slug+'"')) errors.push(slug+": reciprocal pairing missing");
  if (!index.includes('"'+slug+'"')) errors.push(slug+": THC index link missing");
  if (!s.includes("commonsFilePage(") || !/CC BY(?:-SA)? (?:3\.0|4\.0)/.test(s)) errors.push(slug+": file-specific image rights missing");
  if (!s.includes("entry:") || !s.includes("accessibility:") || !s.includes("firstVisitSteps:")) errors.push(slug+": site access requirements missing");
  const body=s.split("  body:[")[1]?.split("  faqs:[")[0] || "";
  if ((body.match(/^    "/gm)||[]).length<minParagraphs) errors.push(slug+": too few original history paragraphs");
  if ((s.split("thcFaq(").length-1)<minFaqs) errors.push(slug+": insufficient FAQs");
  if ((s.split("thcSource(").length-1)<minSources) errors.push(slug+": insufficient sources");
}
console.log(JSON.stringify({batch:"05",properties:records.length,passed:errors.length===0,errors},null,2));
if(errors.length)process.exitCode=1;
