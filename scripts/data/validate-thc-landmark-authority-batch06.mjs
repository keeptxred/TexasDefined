#!/usr/bin/env node
// Dedicated production gate for Fort Worth's 1936 East Rosedale bridge.
// Do not confuse this structure with the NC Sycamore bridge or a railway truss.
import fs from "node:fs";
const read = p => fs.readFileSync(p,"utf8");
const code=read("src/data/thc-sycamore-creek-bridge-fort-worth.ts");
const manifest=read("src/data/destination-preserved-catalog.ts");
const index=read("src/routes/texas-historic-landmarks.lazy.tsx");
const pairings=read("src/data/destination-curated-pairings.ts");
const workflow=read(".github/workflows/thc-landmark-watch.yml");
const problems=[];
const yes=(test,message)=>{if(!test)problems.push(message)};
yes(code.includes('slug:"sycamore-creek-bridge-fort-worth"'),"Canonical historic bridge slug absent");
yes(code.includes('name:"Sycamore Creek Bridge — Fort Worth"'),"Specific property name missing");
yes(code.includes("1936") && code.includes("181") && code.includes("54"),"Historic construction and dimensions not sourced");
yes(code.includes("100012723") && code.includes("February 19, 2026"),"National Register status not distinguished");
yes(code.includes("variable-depth") && code.includes("haunched") && code.includes("reinforced-concrete"),"Bridge engineering narrative inadequate");
yes(code.includes("CC BY-SA 4.0")&&code.includes("Sycamore Creek Bridge Fort Worth.jpg")&&code.includes("commonsFilePage(bridgePhoto)"),"Actual site photo licensing missing");
yes(code.includes("Never stop")||code.includes("never stop")||code.includes("Do not stop"),"Active-roadway access risks not disclosed");
yes(code.includes("accessibility:")&&code.includes("Sycamore Park"),"Accessibility or safe park viewing missing");
yes((code.match(/thcFaq\(/g)||[]).length>=7,"Visitor FAQs are insufficient");
yes((code.match(/thcSource\(/g)||[]).length>=5,"Insufficient independently attributable source documents");
yes((code.slice(code.indexOf("body:["),code.indexOf("faqs:[")).match(/\n    "/g)||[]).length>=6,"Less than six historic/engineering paragraphs");
yes(code.includes("firstVisitSteps:"),"No practical site-specific visitor plan");
yes(manifest.includes("thcHistoricLandmarkAuthorityBatch06Destinations"),"Explore index not connected");
yes(index.includes('"Sycamore Creek Bridge": "sycamore-creek-bridge-fort-worth"'),"National Register index missing authority guide");
yes(pairings.includes('"sycamore-creek-bridge-fort-worth"'),"Bidirectional regional links missing");
yes(workflow.includes("validate-thc-landmark-authority-batch06.mjs"),"Persistent CI validator not configured");
console.log(JSON.stringify({name:"Fort Worth 1936 bridge",problems,passed:problems.length===0},null,2));
if(problems.length)process.exitCode=1;
