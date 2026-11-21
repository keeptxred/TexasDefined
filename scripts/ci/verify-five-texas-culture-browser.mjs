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
  {path:"/texas-tall-tales-folklore", heading:/folklore/i, marker:"Three source trails, three different kinds of evidence"},
  {path:"/texas-dance-halls-honky-tonks", heading:/dance halls/i, marker:"Compare the door, the dance floor and the trip"},
  {path:"/texas-homecoming-mums", heading:/homecoming mums/i, marker:"Actual maker and kit listings"},
  {path:"/texas-natural-wonders-bucket-list", heading:/natural wonders/i, marker:"Rio Grande canyons within Big Bend"},
  {path:"/texas-rock-climbing-bouldering-guide", heading:/rock climbing/i,
    marker:"Where to start, and where not to enter"},
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
  cases:[], failures:[], workerVersions:[], rawOriginChecks:[], labObservationsNote:"Synthetic lab timings only; not CrUX field data or a complete WCAG audit"};
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",
  headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
try {
  for(const spec of cases) for(const viewport of viewports) {
    const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},
      deviceScaleFactor:1});
    await context.route(/googletagmanager|google-analytics|doubleclick\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track/i,r=>r.abort());
    const page=await context.newPage(), errors=[];
    await page.addInitScript(() => {
      window.__tdVitals = {lcp:null,cls:0};
      try {
        new PerformanceObserver(list => {
          for(const entry of list.getEntries()) window.__tdVitals.lcp=entry.startTime;
        }).observe({type:"largest-contentful-paint",buffered:true});
      } catch {}
      try {
        new PerformanceObserver(list => {
          for(const entry of list.getEntries()) if(!entry.hadRecentInput)window.__tdVitals.cls+=entry.value;
        }).observe({type:"layout-shift",buffered:true});
      } catch {}
    });
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
      const tabbable=page.locator('main a[href], main button:not([disabled])').first();
      const canTab=await tabbable.count()===1;
      if(canTab)await tabbable.focus();
      const keyboard=await page.evaluate(()=>({tag:document.activeElement?.tagName,focusVisible:document.activeElement?.matches?.(':focus')||false}));
      check("keyboard-focusable article control",canTab&&["A","BUTTON"].includes(keyboard.tag)&&keyboard.focusVisible,keyboard);
      const lab=await page.evaluate(()=>({
        ...window.__tdVitals,
        navigation:performance.getEntriesByType("navigation").map(entry=>({
          domContentLoaded:Math.round(entry.domContentLoadedEventEnd),
          load:Math.round(entry.loadEventEnd),
          duration:Math.round(entry.duration)
        }))[0]||null
      }));
      result.syntheticLab=lab;
      if(spec.path==="/texas-homecoming-mums") {
        const jsonLd=await page.locator('script[type="application/ld+json"]').allTextContents();
        check("no unsupported consumer FAQPage markup",!jsonLd.some(v=>/"@type"\s*:\s*"FAQPage"/.test(v)));
      }
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

// Two public origins, raw SSR bytes and browser views must agree on the revised
// editorial markers and identified Worker. A web-search text cache is not proof
// of current first-party HTML. Use distinct query keys, never bypass asset gates.
for(const base of [origin,"https://texasdefined-site.freddy-coppola.workers.dev"]) {
  for(const spec of cases) {
    const url=base+spec.path+"?td_culture_origin="+encodeURIComponent(process.env.GITHUB_RUN_ID||"manual");
    try {
      const response=await fetch(url,{
        headers:{"Cache-Control":"no-cache","User-Agent":"TexasDefined-Authority-Origin-Parity/1.0"},
        signal:AbortSignal.timeout(20000)
      });
      const html=response.status===200?await response.text():"";
      const workerVersion=response.headers.get("x-texasdefined-worker-version");
      const hasMarker=html.toLowerCase().includes(spec.marker.toLowerCase());
      const revised=html.includes("November 20, 2026");
      const row={origin:base,path:spec.path,status:response.status,workerVersion,hasMarker,revised};
      report.rawOriginChecks.push(row);
      if(response.status!==200||!hasMarker||!revised||!workerVersion)report.failures.push({
        name:"independent raw origin SSR freshness",evidence:row
      });
    } catch(error) {
      report.failures.push({name:"raw HTML origin request",origin:base,path:spec.path,evidence:String(error).slice(0,250)});
    }
  }
}
const rawVersions=new Set(report.rawOriginChecks.map(r=>r.workerVersion));
if(rawVersions.size!==1||(rawVersions.size===1&&!rawVersions.has(report.workerVersions[0])))
  report.failures.push({name:"raw SSR origin versions agree with Chrome",evidence:[...rawVersions,...report.workerVersions]});

const versionSet=new Set(report.workerVersions.filter(Boolean));
if(report.workerVersions.length!==15||versionSet.size!==1||report.workerVersions.some(x=>!x)) {
  report.failures.push({name:"one identified immutable Worker for all 15 browser cases",
    evidence:report.workerVersions});
}
await writeFile(root+"/report.json",JSON.stringify(report,null,2)+"\n");
console.log("FIVE_CULTURE_CHROME_RESULT "+JSON.stringify({screens:report.cases.length,
  workerVersion:versionSet.size===1?[...versionSet][0]:null,rawOriginChecks:report.rawOriginChecks.length,failures:report.failures}));
if(report.failures.length)process.exitCode=1;
