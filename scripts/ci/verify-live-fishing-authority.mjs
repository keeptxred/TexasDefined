import { createLocalAuditFetch } from './local-audit-fetch.mjs';
const localAuditFetch = createLocalAuditFetch({ localOrigin: process.env.LOCAL_AUDIT_ORIGIN });
/**
 * Verify the published TexasDefined lake authority network after deployment.
 * Do not substitute these HTTP assertions for manual editorial, WCAG, source or
 * first-party field-image certification.
 */
import fs from "node:fs";

const origin = (process.env.TEXASDEFINED_PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const countyIndex = JSON.parse(fs.readFileSync("src/data/fishing/county-lake-links.generated.json", "utf8"));
const destinationsSource = fs.readFileSync("src/data/fishing/destination-lake-crosslinks.ts", "utf8");
const destinationJson = destinationsSource.match(/DESTINATION_LAKE_GUIDE_LINKS:[\s\S]*? = (\{[\s\S]*?\});\s*export const LAKE_VISITOR_DESTINATIONS:/)?.[1];
if (!destinationJson) throw Error("Cannot identify source-backed destination/lake route contract");
const destinations = JSON.parse(destinationJson);
const lakeRows = new Map();
for (const [county, rows] of Object.entries(countyIndex)) {
  for (const row of rows) {
    const existing = lakeRows.get(row.slug) ?? { name: row.name, counties: [] };
    if (existing.name !== row.name) throw Error("Conflicting named lake " + row.slug);
    existing.counties.push(county);
    lakeRows.set(row.slug, existing);
  }
}
const checks = [];
for (const [slug, lake] of lakeRows) checks.push({
  type:"lake", path:"/fishing/lakes/"+slug, name:lake.name,
  required:["tpwd.texas.gov", "/fishing/lakes", "/county/"+lake.counties[0]],
});
for (const [county, lakes] of Object.entries(countyIndex)) checks.push({
  type:"county",path:"/county/"+county,name:"County "+county,
  required:lakes.map(x=>"/fishing/lakes/"+x.slug),
});
for (const [slug, lake] of Object.entries(destinations)) checks.push({
  type:"destination",path:"/destination/"+slug,name:slug,
  required:["/fishing/lakes/"+lake.slug],
});
const failures=[], successes=[];
const concurrency=Math.max(1,Math.min(8,Number(process.env.FISHING_ACCEPTANCE_CONCURRENCY)||4));
let next=0;
const worker=async()=>{
  for (;;) {
    const i=next++;if(i>=checks.length)break;
    const check=checks[i];
    const url=origin+check.path;
    try {
      const response=await localAuditFetch(url,{
        redirect:"follow",
        headers:{"user-agent":"TexasDefined-Lake-Authority-Production-Acceptance/1.0","cache-control":"no-cache"},
        signal:AbortSignal.timeout(12000),
      });
      if(response.status!==200){failures.push({...check,status:response.status,issue:"non-200"});continue;}
      const html=await response.text();
      const missing=check.required.filter(k=>!html.includes(k));
      if (check.path === "/county/haskell" && !html.includes("reservoir began impounding Paint Creek in 1953")) {
        missing.push("Haskell lake-history correction (construction 1951 vs impoundment 1953)");
      }
      if(check.type==="lake"){
        if(!html.includes(check.name))missing.push("expected lake name");
        if(!html.includes("rel=\"canonical\""))missing.push("canonical HTML tag");
        if(!html.includes("<figcaption") || !html.includes("Photo credit:"))missing.push("visible governed image with labeled photographer/license attribution");
      }
      if(missing.length)failures.push({...check,status:response.status,issue:"missing content",missing});
      else successes.push({type:check.type,path:check.path,status:200});
    }catch(e){failures.push({...check,issue:"network/timeout",reason:String(e).slice(0,160)});}
  }
};
await Promise.all(Array.from({length:concurrency},worker));
localAuditFetch.assertComplete();
const summary={
  checkedAt:new Date().toISOString(),origin,
  level:"automated published HTML/routes only — NOT full authority or original field-photo certification",
  pagesChecked:checks.length,lakeOverviews:lakeRows.size,countyPages:Object.keys(countyIndex).length,
  destinationPages:Object.keys(destinations).length,passed:successes.length,failed:failures.length,
  followUp:["Manual WCAG and mobile inspection","Agency source/operating-status recency",
    "Independently produced field imagery and rights","Lake-by-lake park/campground facts",
    "Compare each page against official managing agency before claiming superior authority"],
};
fs.mkdirSync(".artifacts",{recursive:true});
fs.writeFileSync(process.env.LAKE_ACCEPTANCE_REPORT || ".artifacts/lake-authority-production-acceptance.json",JSON.stringify({summary,failures,successes},null,2)+"\n");
console.log(JSON.stringify({summary,failedSamples:failures.slice(0,30)},null,2));
if(failures.length)process.exitCode=1;
