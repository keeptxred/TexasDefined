import { mkdir, writeFile } from "node:fs/promises";
import { summarizePageSpeed } from "./audit-homepage-vitals.mjs";
const guides = ["mountain-biking","horseback-riding","ohv","paddling","stargazing"];
const rows = [], concerns = [];
const samePage = (candidate, expected) => {
  try {
    const a = new URL(candidate), b = new URL(expected);
    return a.origin === b.origin && a.pathname.replace(/\/$/,"") === b.pathname.replace(/\/$/,"");
  } catch { return false; }
};
for (const guide of guides) {
  const url = "https://texasdefined.com/texas-" + guide + "-guide";
  for (const strategy of ["mobile","desktop"]) {
    try {
      const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
      endpoint.searchParams.set("url", url);
      endpoint.searchParams.set("strategy", strategy);
      endpoint.searchParams.set("category", "performance");
      if (process.env.PAGESPEED_API_KEY) endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);
      const response = await fetch(endpoint, { signal: AbortSignal.timeout(55000) });
      if (!response.ok) {
        rows.push({url,strategy,fieldSource:"unavailable",urlFieldStatus:"not-measured",apiHttpStatus:response.status});
        continue;
      }
      const data = await response.json(), result = summarizePageSpeed(data,strategy);
      if (result.fieldSource === "homepage-URL") {
        if (samePage(data.loadingExperience?.id,url)) result.fieldSource = "exact-guide-URL";
        else {
          result.fieldSource = "unverified-sample-url";
          result.urlFieldStatus = "not-measured";
          result.p75 = { lcp:null, inp:null, cls:null };
        }
      }
      const finalUrl = data.lighthouseResult?.finalDisplayedUrl || data.lighthouseResult?.finalUrl;
      if (!samePage(finalUrl,url)) {
        result.lab = { lcpMs:null, cls:null, totalBlockingTimeMs:null, performanceScore:null };
      }
      if (result.urlFieldStatus === "needs-improvement") concerns.push(guide+" "+strategy+": exact URL CrUX needs improvement");
      if (result.lab.lcpMs !== null && result.lab.lcpMs > 4000) concerns.push(guide+" "+strategy+": lab LCP over four seconds");
      if (result.lab.cls !== null && result.lab.cls > .25) concerns.push(guide+" "+strategy+": lab CLS above .25");
      if (result.lab.performanceScore !== null && result.lab.performanceScore < .70) concerns.push(guide+" "+strategy+": lab score under 70");
      rows.push({ url, finalUrl: finalUrl || null, ...result });
    } catch (error) {
      rows.push({url,strategy,fieldSource:"unavailable",urlFieldStatus:"not-measured",detail:String(error.message)});
    }
  }
}
const report = {observedAt:new Date().toISOString(),source:"Google PageSpeed Insights v5",note:"Field data requires the exact guide URL; unavailable or origin-only samples are not passing page-level CrUX. Lighthouse is diagnostic only.",rows,concerns};
await mkdir(".artifacts",{recursive:true});
await writeFile(".artifacts/outdoor-guide-vitals.json",JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report));
if (concerns.length) process.exitCode = 1;
