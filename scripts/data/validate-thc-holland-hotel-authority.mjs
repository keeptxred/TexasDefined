#!/usr/bin/env node
/** Ensure the researched Holland Hotel page remains a real property guide
 * with documented source identity, fees/amenities, photo license and links.
 */
import fs from "node:fs";
const source=fs.readFileSync("src/data/thc-holland-hotel-authority.ts","utf8");
const catalog=fs.readFileSync("src/data/destination-preserved-catalog.ts","utf8");
const index=fs.readFileSync("src/routes/texas-historic-landmarks.lazy.tsx","utf8");
const pairings=fs.readFileSync("src/data/destination-curated-pairings.ts","utf8");
const errs=[];
if(!source.includes('slug:"holland-hotel"'))errs.push("Wrong canonical site slug");
if(!catalog.includes("hollandHotelAuthorityDestination"))errs.push("Missing canonical preserved catalog registration");
if(!index.includes('"Holland Hotel": "holland-hotel"'))errs.push("Missing THC 2025 index link");
if(!pairings.includes('"holland-hotel":'))errs.push("No reverse contextual Alpine links");
const body=source.split("  body:[")[1]?.split("  faqs:[")[0]??"";
const faq=source.split("  faqs:[")[1]?.split("  sources:[")[0]??"";
const references=source.split("  sources:[")[1]?.split("  whyVisit:")[0]??"";
if((body.match(/^    "/gm)||[]).length<6||body.length<3700)errs.push("Insufficient historic research");
if((faq.match(/thcFaq\(/g)||[]).length<7)errs.push("Insufficient sourced operator FAQs");
if((references.match(/thcSource\(/g)||[]).length<6)errs.push("Source citation coverage incomplete");
if(!source.includes("commonsFilePage(image)")||!source.includes("CC BY-SA 3.0")||!source.includes("Adavyd"))errs.push("Photo attribution/rights missing");
if(!source.includes("nomination")||!source.includes("trost")||!source.includes("details")||!source.includes("rooms"))errs.push("Official architecture or current operator references missing");
if(!source.includes("accessibility:")||!source.includes("entry:"))errs.push("Hotel access and accessibility missing");
console.log(JSON.stringify({site:"holland-hotel",checksPassed:errs.length===0,errors:errs},null,2));if(errs.length)process.exitCode=1;
