#!/usr/bin/env node
/**
 * Non-skipped, source-specific 5 x 3 public Chrome acceptance for issue #7368.
 * Refuse mixed Workers, stale article markers, broken canonical/index policy,
 * horizontal overflow, image decode failures, and JavaScript runtime crashes.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";

const origin = "https://texasdefined.com";
const cases = [
  {path:"/texas-tall-tales-folklore", heading:/folklore/i, marker:"October 1923"},
  {path:"/texas-dance-halls-honky-tonks", heading:/dance halls/i, marker:"Gruene Hall"},
  {path:"/texas-homecoming-mums", heading:/homecoming mums/i, marker:"DIY build"},
  {path:"/texas-natural-wonders-bucket-list", heading:/natural wonders/i, marker:"Del Norte"},
  {path:"/texas-rock-climbing-bouldering-guide", heading:/rock climbing/i,
    marker:"Bouldering, free climbing and soloing are prohibited"},
];
const viewports = [{name:"mobile-320",width:320,height:740},
  {name:"mobile-390",width:390,height:820},
  {name:"desktop-1366",width:1366,height:900}];
if (process.argv.includes("--self-test")) {
  assert.equal(cases.length,5);
  assert.deepEqual(viewports.map(x=>x.width),[320,390,1366]);
  assert.equal(new Set(cases.map(x=>x.path)).size,5);
  assert.ok(cases.every(x=>x.marker.length>=8 && x.heading instanceof RegExp));
  console.log("FIVE_CULTURE_CHROME_CONTRACT_PASS: 5 authority pages x 3 real viewports");
  process.exit(0);
}
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH ||
  "/tmp/texasdefined-five-culture-qa/node_modules/playwright-core");
const root="artifacts/five-culture-responsive";
await mkdir(root,{recursive:true});
const report={createdAt:new Date().toISOString(),sourceCommit:process.env.GITHUB_SHA||null,
  cases:[], failures:[], workerVersions:[]};
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",
  headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
try {
  for(const spec of cases) for(const viewport of viewports) {
    const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},
      deviceScaleFactor:1});
    await context.route(/googletagmanager|google-analytics|doubleclick\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track/i,r=>r.abort());
    const page=await context.newPage(), errors=[];
    page.on("pageerror",err=>errors.push(err.message.slice(0,240)));
    const result={path:spec.path,viewport:viewport.name,checks:[],workerVersion:null,screenshot:null};
    function check(name,ok,evidence=null) {
      result.checks.push({name,ok:Boolean(ok),evidence});
      if(!ok)report.failures.push({path:spec.path,viewport:viewport.name,name,evidence});
    }
    try {
      const requestUrl=origin+spec.path+"?td_culture_browser="+encodeURIComponent(
        (process.env.GITHUB_RUN_ID||"manual")+"-"+viewport.name);
      const response=await page.goto(requestUrl,{waitUntil:"domcontentloaded",timeout:45000});
      check("HTTP 200",response?.status()===200,response?.status()??null);
      const version=response?.headers()["x-texasdefined-worker-version"]||null;
      result.workerVersion=version; report.workerVersions.push(version);
      check("same route, no redirect",new URL(response.url()).pathname===spec.path,response.url());
      await page.locator("main h1").first().waitFor({state:"visible",timeout:20000});
      check("one H1",await page.locator("h1").count()===1);
      check("one main landmark",await page.locator("main").count()===1,await page.locator("main").count());
      const heading=await page.locator("main h1").first().innerText();
      check("specific H1",spec.heading.test(heading),heading);
      const copy=await page.locator("main").innerText();
      check("new source-backed editorial fact visible",copy.toLowerCase().includes(spec.marker.toLowerCase()),spec.marker);
      const canonical=await page.locator('link[rel="canonical"]').first().getAttribute("href").catch(()=>null);
      check("self-canonical",canonical===origin+spec.path,canonical);
      const robots=await page.locator('meta[name="robots"]').first().getAttribute("content").catch(()=>null);
      check("indexable robots",!/\bnoindex\b/i.test(robots||""),robots);
      check("at least one primary external citation",await page.locator('main a[href^="https://"]').count()>=1);
      const images=page.locator("main img");
      check("editorial image present",await images.count()>0,await images.count());
      if(await images.count()) {
        const img=images.first();
        await img.scrollIntoViewIfNeeded({timeout:9000});
        await img.evaluate(el=>el.decode?.().catch(()=>{})).catch(()=>{});
        const imageData=await img.evaluate(el=>({
          alt:el.alt,complete:el.complete,naturalWidth:el.naturalWidth,
          visibleWidth:el.getBoundingClientRect().width,
        }));
        check("accessible image label",Boolean(imageData.alt?.trim().length>=12),imageData.alt);
        check("image decoded",imageData.complete&&imageData.naturalWidth>120,imageData.naturalWidth);
        check("image within viewport",imageData.visibleWidth<=viewport.width+4,imageData.visibleWidth);
      }
      const dims=await page.evaluate(()=>({
        viewport:document.documentElement.clientWidth,
        scroll:document.documentElement.scrollWidth,
      }));
      check("no horizontal overflow",dims.scroll<=dims.viewport+4,dims);
      check("no uncaught JavaScript errors",errors.length===0,errors);
      result.screenshot=root+"/"+spec.path.slice(1)+"-"+viewport.name+".png";
      await page.screenshot({path:result.screenshot,animations:"disabled",fullPage:false});
    } catch(error) {
      report.failures.push({path:spec.path,viewport:viewport.name,name:"Chrome execution",evidence:String(error).slice(0,300)});
    } finally {
      report.cases.push(result);
      await context.close();
    }
  }
} finally { await browser.close(); }
const versionSet=new Set(report.workerVersions.filter(Boolean));
if(report.workerVersions.length!==15||versionSet.size!==1||report.workerVersions.some(x=>!x)) {
  report.failures.push({name:"one identified immutable Worker for all 15 browser cases",
    evidence:report.workerVersions});
}
await writeFile(root+"/report.json",JSON.stringify(report,null,2)+"\n");
console.log("FIVE_CULTURE_CHROME_RESULT "+JSON.stringify({screens:report.cases.length,
  workerVersion:versionSet.size===1?[...versionSet][0]:null,failures:report.failures}));
if(report.failures.length)process.exitCode=1;
