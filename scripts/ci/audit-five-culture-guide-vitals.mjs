#!/usr/bin/env node
// Monthly diagnostic performance audit for the five canonical culture/outdoor
// guides. Real-user CrUX is accepted only for the exact URL. Origin fallback,
// sparse traffic, quota errors, and Lighthouse lab scores never certify field CWV.
import { mkdir,writeFile } from "node:fs/promises";
import { summarizePageSpeed } from "./audit-homepage-vitals.mjs";

import {PAGES,STRATEGIES,isSameCanonical} from "./five-culture-guide-roster.mjs";
export {PAGES,STRATEGIES,isSameCanonical};
const ORIGIN="https://texasdefined.com";
export const OUTPUT=".artifacts/five-culture-guide-vitals.json";
export function interpret(data,url,strategy) {
  const out=summarizePageSpeed(data,strategy);
  const fieldId=data?.loadingExperience?.id||null;
  if(out.fieldSource==="homepage-URL") {
    if(isSameCanonical(fieldId,url)) out.fieldSource="exact-guide-URL";
    else {
      out.fieldSource="unverified-URL";
      out.urlFieldStatus="not-measured";
      out.p75={lcp:null,inp:null,cls:null};
    }
  }
  const finalUrl=data?.lighthouseResult?.finalDisplayedUrl || data?.lighthouseResult?.finalUrl || null;
  const sameFinal=isSameCanonical(finalUrl,url);
  if(!sameFinal) {
    out.lab={lcpMs:null,cls:null,totalBlockingTimeMs:null,performanceScore:null};
  }
  const concerns=[];
  if(out.fieldSource==="exact-guide-URL" && out.urlFieldStatus==="needs-improvement")
    concerns.push("Measured URL-level CrUX is below good Web Vitals");
  if(sameFinal && out.lab.lcpMs!==null && out.lab.lcpMs>4000)
    concerns.push("Synthetic Lighthouse LCP >4000 ms");
  if(sameFinal && out.lab.cls!==null && out.lab.cls>0.25)
    concerns.push("Synthetic Lighthouse CLS >0.25");
  if(sameFinal && out.lab.performanceScore!==null && out.lab.performanceScore<0.70)
    concerns.push("Synthetic Lighthouse performance score below 70");
  return {url,strategy,finalUrl,fieldSampleUrl:fieldId,...out,concerns};
}
if(process.argv.includes("--self-test")) {
  if(PAGES.length!==5 || new Set(PAGES).size!==5 || !PAGES.every(p=>p.startsWith("/texas-")))
    throw Error("Five-guide canonical roster has changed");
  if(STRATEGIES.join(",")!=="mobile,desktop")throw Error("Both strategies required");
  if(!isSameCanonical(ORIGIN+"/texas-homecoming-mums/",ORIGIN+"/texas-homecoming-mums"))
    throw Error("Canonical trailing slash comparison failed");
  if(isSameCanonical(ORIGIN+"/texas-homecoming-mums-old",ORIGIN+"/texas-homecoming-mums"))
    throw Error("Canonical comparison accepted wrong page");
  const wrong=interpret({loadingExperience:{id:ORIGIN+"/another-page",metrics:{
    LARGEST_CONTENTFUL_PAINT_MS:{percentile:1000,category:"FAST"}
  }}},ORIGIN+"/texas-homecoming-mums","mobile");
  if(wrong.fieldSource==="exact-guide-URL"||wrong.urlFieldStatus==="good")
    throw Error("Wrong-URL CrUX could produce a false pass");
  console.log("FIVE_CULTURE_VITALS_CONTRACT_PASS: five exact canonicals, mobile+desktop and no CrUX origin fallback pass");
  process.exit(0);
}

const report={observedAt:new Date().toISOString(),source:"Google PageSpeed Insights v5 / CrUX if sampled",
  pages:PAGES.map(p=>ORIGIN+p),strategies:STRATEGIES,
  distinction:"URL-level p75 CrUX is real-user field evidence. Origin-only metrics are not page-level; Lighthouse is a lab diagnostic. Unavailable means unknown.",
  measurements:[],concerns:[],apiUnavailable:[]};
for(const path of PAGES)for(const strategy of STRATEGIES){
  const url=ORIGIN+path,endpoint=new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url",url);
  endpoint.searchParams.set("strategy",strategy);
  endpoint.searchParams.set("category","performance");
  if(process.env.PAGESPEED_API_KEY)endpoint.searchParams.set("key",process.env.PAGESPEED_API_KEY);
  try{
    const response=await fetch(endpoint,{signal:AbortSignal.timeout(48000)});
    if(!response.ok){
      const row={url,strategy,fieldSource:"unavailable",urlFieldStatus:"not-measured",
        apiHttpStatus:response.status,lab:null,concerns:[]};
      report.measurements.push(row);report.apiUnavailable.push({url,strategy,http:response.status});
      continue;
    }
    const data=await response.json();
    const row=interpret(data,url,strategy);
    report.measurements.push(row);
    for(const detail of row.concerns)report.concerns.push({url,strategy,detail});
  }catch(error){
    const row={url,strategy,fieldSource:"unavailable",urlFieldStatus:"not-measured",
      error:String(error).slice(0,250),lab:null,concerns:[]};
    report.measurements.push(row);report.apiUnavailable.push({url,strategy,error:row.error});
  }
}
const measured=report.measurements.filter(r=>r.fieldSource==="exact-guide-URL").length;
const lab=report.measurements.filter(r=>r.lab?.performanceScore!==null&&r.lab?.performanceScore!==undefined).length;
report.conclusion=report.concerns.length?"measured-regression-needs-attention":
  measured===10?"all-URL-field-samples-present":
  measured?"some-URL-field-samples-present":
  lab?"field-data-unavailable-lab-measured":
  "insufficient-API-or-field-data";
report.actualFieldSamples=measured;report.validLabSamples=lab;
await mkdir(".artifacts",{recursive:true});
await writeFile(OUTPUT,JSON.stringify(report,null,2)+"\n");
console.log("FIVE_CULTURE_VITALS_RESULT "+JSON.stringify({
  total:report.measurements.length,field:measured,lab,apiUnavailable:report.apiUnavailable.length,
  concerns:report.concerns,conclusion:report.conclusion
}));
if(process.env.GITHUB_STEP_SUMMARY){
  const {appendFile}=await import("node:fs/promises");
  await appendFile(process.env.GITHUB_STEP_SUMMARY,
    "### Five-guide independent PageSpeed evidence\n"+
    "Exact page CrUX observations: "+measured+"/10; Lighthouse labs: "+lab+"/10; "+
    "API unavailable: "+report.apiUnavailable.length+"/10; concerns: "+report.concerns.length+
    ". Missing field data is NOT a pass. Full JSON in workflow artifacts.\n");
}
if(report.concerns.length)process.exitCode=1;
