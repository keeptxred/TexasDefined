#!/usr/bin/env node
// Independent, key-free Lighthouse lab audit, run with pinned Chrome tooling
// on GitHub Actions. Synthetic measurements are NOT Chrome user field data.
import { mkdir,readFile,writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { join } from "node:path";
import { PAGES,STRATEGIES,isSameCanonical } from "./audit-five-culture-guide-vitals.mjs";
const execFileAsync=promisify(execFile);
const ORIGIN="https://texasdefined.com";
const DIR=".artifacts/five-culture-lighthouse";
const CLI="/tmp/texasdefined-five-culture-lighthouse/node_modules/lighthouse/cli/index.js";
const LIGHTHOUSE_VERSION="13.6.0";

export function summarizeLhr(lhr,url,strategy) {
  const actual=lhr?.finalDisplayedUrl || lhr?.finalUrl || null;
  const scores={
    performance:lhr?.categories?.performance?.score??null,
    accessibility:lhr?.categories?.accessibility?.score??null,
    bestPractices:lhr?.categories?.["best-practices"]?.score??null,
  };
  const audits=lhr?.audits||{};
  const lab={
    lcpMs:audits["largest-contentful-paint"]?.numericValue??null,
    cls:audits["cumulative-layout-shift"]?.numericValue??null,
    totalBlockingTimeMs:audits["total-blocking-time"]?.numericValue??null,
    speedIndexMs:audits["speed-index"]?.numericValue??null,
  };
  const errors=[];
  if(!isSameCanonical(actual,url))errors.push("Lighthouse final URL differs from requested canonical");
  if(lhr?.runtimeError?.message)errors.push("Lighthouse runtime: "+lhr.runtimeError.message);
  if(scores.performance===null || scores.accessibility===null)
    errors.push("Lighthouse performance/accessibility category missing");
  const concerns=[];
  if(scores.performance!==null && scores.performance<.70)concerns.push("lab performance below 70");
  if(scores.accessibility!==null && scores.accessibility<.90)concerns.push("automated accessibility below 90; not a manual WCAG audit");
  if(lab.lcpMs!==null && lab.lcpMs>4000)concerns.push("lab LCP exceeds 4000 ms");
  if(lab.cls!==null && lab.cls>.25)concerns.push("lab CLS above 0.25");
  return {url,strategy,finalUrl:actual,lighthouseVersion:lhr?.lighthouseVersion||null,
    fetchTime:lhr?.fetchTime||null,scores,lab,errors,concerns,
    note:"Lighthouse local emulated device & network, not CrUX field p75"};
}
if(process.argv.includes("--self-test")) {
  if(PAGES.length!==5 || STRATEGIES.length!==2)throw Error("Five guide x two device contract failed");
  const demo=summarizeLhr({finalUrl:ORIGIN+PAGES[0],
    categories:{performance:{score:.95},accessibility:{score:.98},"best-practices":{score:1}},
    audits:{"largest-contentful-paint":{numericValue:1200},"cumulative-layout-shift":{numericValue:0}}},ORIGIN+PAGES[0],"mobile");
  if(demo.errors.length || demo.concerns.length || demo.lab.lcpMs!==1200)
    throw Error("Local Lighthouse result interpretation failed");
  const mismatch=summarizeLhr({finalUrl:ORIGIN+PAGES[1],categories:{
    performance:{score:1},accessibility:{score:1}}},ORIGIN+PAGES[0],"mobile");
  if(!mismatch.errors.length)throw Error("Cross-URL Lighthouse false pass possible");
  console.log("FIVE_CULTURE_LOCAL_LIGHTHOUSE_CONTRACT_PASS 5x2 canonical and numeric metrics");
  process.exit(0);
}
await mkdir(DIR,{recursive:true});
const report={observedAt:new Date().toISOString(),engine:"Lighthouse "+LIGHTHOUSE_VERSION,
  provenance:"Chrome running on GitHub Actions shared runner; synthetic lab-only, not real-user Core Web Vitals or complete WCAG audit",
  cases:[],concerns:[],failures:[]};
for(const path of PAGES)for(const strategy of STRATEGIES) {
  const url=ORIGIN+path,slug=path.slice(1),filename=join(DIR,slug+"-"+strategy+".json");
  const args=[CLI,url,"--quiet","--output=json","--output-path="+filename,
    "--only-categories=performance,accessibility,best-practices",
    "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage"];
  if(strategy==="desktop")args.push("--preset=desktop");
  try{
    await execFileAsync(process.execPath,args,{
      timeout:115000,maxBuffer:8*1024*1024,
      env:{...process.env,CHROME_PATH:process.env.CHROME_BIN||"/usr/bin/google-chrome"}
    });
    const lhr=JSON.parse(await readFile(filename,"utf8"));
    const result=summarizeLhr(lhr,url,strategy);
    report.cases.push(result);
    for(const e of result.errors)report.failures.push({url,strategy,reason:e});
    for(const c of result.concerns)report.concerns.push({url,strategy,reason:c});
  }catch(e){
    const detail=String(e?.stderr||e?.message||e).slice(0,500);
    report.cases.push({url,strategy,notMeasured:true,reason:detail});
    report.failures.push({url,strategy,reason:"Chrome Lighthouse run incomplete: "+detail});
  }
}
report.conclusion=report.failures.length?"incomplete-lab-measurements":
  report.concerns.length?"measured-lab-issues":"measured-lab-no-severe-findings";
await writeFile(join(DIR,"index.json"),JSON.stringify(report,null,2)+"\n");
console.log("FIVE_CULTURE_LOCAL_LIGHTHOUSE_RESULT "+JSON.stringify({
  cases:report.cases.length,measured:report.cases.filter(x=>x.scores).length,
  concerns:report.concerns,failures:report.failures,conclusion:report.conclusion
}));
if(process.env.GITHUB_STEP_SUMMARY) {
  const {appendFile}=await import("node:fs/promises");
  const m=report.cases.filter(x=>x.scores);
  await appendFile(process.env.GITHUB_STEP_SUMMARY,
    "### Free local Lighthouse, synthetic only\n"+
    "Measured "+m.length+"/10 mobile+desktop. Findings: "+report.concerns.length+
    ", incomplete runs: "+report.failures.length+
    ". Neither a good score nor a missing score certifies CrUX real-user field data.\n");
}
if(report.failures.length||report.concerns.length)process.exitCode=1;
