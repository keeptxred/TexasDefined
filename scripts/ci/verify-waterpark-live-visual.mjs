#!/usr/bin/env node
/** Bounded read-only Chrome verification after the protected Worker deployment.
 * Exactly five venue pages x two viewports. Never publishes, indexes, or changes data.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const ORIGIN = "https://texasdefined.com";
const DIR = "artifacts/waterpark-live-visual";
const checks = [
  {slug:"paradise-springs-grapevine",name:"Paradise Springs Water Park",photo:"formulanone",source:"Paradise Springs Aquatic Park",link:"/destination/sea-life-grapevine-aquarium"},
  {slug:"hawaiian-waters-garland",name:"Hawaiian Waters Garland",photo:"davidjoviera",source:"Hawaiian falls garland",link:null},
  {slug:"port-royal-ocean-resort-pools",name:"Port Royal Ocean Resort Water Slides",faq:"Can non-resort visitors buy a pool and waterslide day pass?",photo:null,link:"/destination/mustang-island-state-park"},
  {slug:"bahama-beach-dallas",name:"Bahama Beach Waterpark",photo:null,link:"/destination/dallas-world-aquarium"},
  {slug:"kalahari-round-rock",name:"Kalahari Resorts Waterparks",photo:"Larry D. Moore",source:"Kalahari Resort Hotel",faq:"Can families bring coolers",link:null},
];
const viewports=[
  {name:"desktop",width:1280,height:850,isMobile:false},
  {name:"mobile",width:390,height:844,isMobile:true},
];
if(process.argv.includes("--self-test")){
  assert.equal(checks.length,5);
  assert.equal(viewports.length,2);
  assert.equal(new Set(checks.map(x=>x.slug)).size,checks.length);
  assert.ok(checks.every(x=>/^[a-z0-9-]+$/.test(x.slug)));
  console.log("Waterpark browser acceptance config self-test passed.");
  process.exit(0);
}
const require = createRequire(import.meta.url);
const { chromium } = require("/tmp/texasdefined-waterpark-qa/node_modules/playwright-core");
await mkdir(DIR,{recursive:true});
const report={checkedAt:new Date().toISOString(),targetSha:process.env.TARGET_DEPLOY_SHA??"",routes:checks.length,viewports:viewports.length,results:[],failures:[]};
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
const observedVersions=new Set();
try{
  for(const vp of viewports){
    const ctx=await browser.newContext({viewport:{width:vp.width,height:vp.height},isMobile:vp.isMobile,deviceScaleFactor:1});
    for(const item of checks){
      const page=await ctx.newPage();
      const url=ORIGIN+"/explore/water-parks/"+item.slug;
      const result={slug:item.slug,viewport:vp.name,url,checks:[],networkErrors:[],screenshot:null,version:null};
      const verify=(name,pass,detail="")=>{result.checks.push({name,pass:!!pass,detail:String(detail).slice(0,200)});if(!pass)report.failures.push({slug:item.slug,viewport:vp.name,name,detail:String(detail).slice(0,200)});};
      page.on("response",res=>{
        if(res.status()>=400 && (res.url().includes("commons.wikimedia.org")||res.url().startsWith(ORIGIN+"/assets/"))) result.networkErrors.push({url:res.url().slice(0,180),status:res.status()});
      });
      try{
        const nav=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
        result.version=nav?.headers()?.["x-texasdefined-worker-version"]??null;
        if(result.version)observedVersions.add(result.version);
        verify("response 200",nav?.status()===200,nav?.status());
        verify("visible exact park identity",(await page.locator("h1").first().textContent().catch(()=>"")).includes(item.name),item.name);
        const robots=await page.locator('meta[name="robots"]').getAttribute("content").catch(()=>"");
        verify("uncertified page remains noindex",robots?.includes("noindex"),robots);
        verify("official source linked",(await page.locator('a[href^="https://"]').count())>=1);
        if(item.faq)verify("specific visitor FAQ appears",(await page.locator("main").innerText().catch(()=>"")).includes(item.faq),item.faq);
        if(item.link)verify("relevant internal authority link",(await page.locator('a[href="'+item.link+'"]').count())>0,item.link);
        const photo=page.locator("figure img");
        if(item.photo){
          verify("exact venue photo shown",(await photo.count())>0,item.photo);
          const caption=await page.locator("figure figcaption").first().innerText().catch(()=>"");
          verify("photographer credited",caption.includes(item.photo),caption.slice(0,140));
          verify("Commons original linked",(await page.locator('figure a[href*="commons.wikimedia.org/wiki/File:"]').count())>0);
          verify("reusable license linked",(await page.locator('figure a[href*="creativecommons.org/"]').count())>0);
          const src=await photo.first().getAttribute("src").catch(()=>"");
          verify("correct historic photo source",decodeURIComponent(src).replaceAll("_"," ").toLowerCase().includes(item.source.toLowerCase()),item.source);
          await photo.first().evaluate(async img=>{
            if(img.complete)return;
            await Promise.race([new Promise(resolve=>{img.addEventListener("load",resolve,{once:true});img.addEventListener("error",resolve,{once:true})}),new Promise(resolve=>setTimeout(resolve,9000))]);
          }).catch(()=>{});
          const dim=await photo.first().evaluate(img=>({width:img.naturalWidth,height:img.naturalHeight,complete:img.complete})).catch(()=>({width:0,height:0,complete:false}));
          verify("remote licensed photo delivered",dim.width>100&&dim.height>100,JSON.stringify(dim));
        }else{
          verify("no unlicensed generic photo",(await photo.count())===0);
        }
        const scrollWidth=await page.evaluate(()=>document.documentElement.scrollWidth).catch(()=>0);
        verify("no horizontal overflow",scrollWidth<=vp.width+12,scrollWidth+" vs "+vp.width);
        verify("no broken same-origin script or Commons image",result.networkErrors.length===0,JSON.stringify(result.networkErrors.slice(0,3)));
        const filename=DIR+"/"+item.slug+"-"+vp.name+".png";
        await page.screenshot({path:filename,fullPage:true,animations:"disabled",timeout:30000});
        result.screenshot=filename;
      }catch(error){
        verify("browser test completed",false,String(error?.message??error));
      }finally{
        report.results.push(result);
        await page.close().catch(()=>{});
      }
    }
    await ctx.close();
  }
}finally{await browser.close()}
report.workerVersions=[...observedVersions];
if(observedVersions.size!==1)report.failures.push({name:"Mixed or unidentified Worker release across checks",versions:report.workerVersions});
await writeFile(DIR+"/report.json",JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify({passed:report.failures.length===0,checks:report.results.length,failures:report.failures.slice(0,12),workerVersions:report.workerVersions}));
if(report.failures.length)process.exitCode=1;
