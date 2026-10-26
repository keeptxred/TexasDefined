#!/usr/bin/env node
// Read-only post-deployment city guide browser verification.
// Never follows a booking link or changes editorial/source data.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";

const metros = ["houston", "san-antonio", "austin", "corpus-christi", "dallas", "fort-worth", "waco", "beaumont-port-arthur", "college-station", "tyler", "amarillo", "lubbock", "midland-odessa", "el-paso"];
const approvedViator = new Set(["houston", "san-antonio", "austin", "corpus-christi", "dallas", "fort-worth", "waco", "amarillo", "el-paso"]);
const viewports = [{ name:"desktop", width:1365, height:900, isMobile:false }, { name:"mobile", width:390, height:844, isMobile:true }];
const directory = "artifacts/metro-day-trips-production";
const targetSha = process.env.TARGET_DEPLOY_SHA || process.env.GITHUB_SHA || "";
if (process.argv.includes("--self-test")) {
  assert.equal(new Set(metros).size, 14);
  assert.equal(viewports.length, 2);
  assert.ok(approvedViator.size < metros.length);
  console.log("Metro day trips fourteen-market browser contract passed");
  process.exit(0);
}
const require = createRequire(import.meta.url);
const { chromium } = require("/tmp/texasdefined-metro-qa/node_modules/playwright-core");
await mkdir(directory,{ recursive:true });
const results = [], failures = [];
const browser = await chromium.launch({ executablePath:process.env.CHROME_BIN || "/usr/bin/google-chrome", headless:true, args:["--no-sandbox","--disable-dev-shm-usage"] });
try {
  for(const metro of metros) for(const viewport of viewports) {
    const context = await browser.newContext({viewport:{width:viewport.width,height:viewport.height},isMobile:viewport.isMobile,hasTouch:viewport.isMobile,deviceScaleFactor:1});
    const page = await context.newPage();
    const record = {metro,viewport:viewport.name,status:"unverified",workerVersion:null,checks:[],pageErrors:[]};
    const check=(name,passed,detail="")=>{
      const row={name,passed:Boolean(passed),detail:String(detail).slice(0,250)};
      record.checks.push(row);
      if(!passed)failures.push({metro,viewport:viewport.name,...row});
    };
    page.on("pageerror",error=>record.pageErrors.push(error.message.slice(0,200)));
    try {
      const pathname="/explore/near/"+metro+"/day-trips";
      const response=await page.goto("https://texasdefined.com"+pathname+"?qa="+encodeURIComponent(targetSha.slice(0,12)||"live"),{waitUntil:"domcontentloaded",timeout:45000});
      record.workerVersion=response?.headers()["x-texasdefined-worker-version"]||null;
      check("HTTP 200",response?.status()===200,response?.status());
      if(response?.status()!==200){record.status="http-error";continue;}
      await page.locator("main h1").waitFor({state:"visible",timeout:25000});
      await page.waitForTimeout(800);
      const data=await page.evaluate(()=>{
        const cards=[...document.querySelectorAll("[data-metro-curated-day-trips] [data-curated-day-trip]")];
        const affiliate=document.querySelector("[data-day-trip-viator-market] a[href*='viator.com']");
        return {
          h1:document.querySelector("main h1")?.textContent||"",
          canonical:document.querySelector('link[rel="canonical"]')?.href||"",
          robots:document.querySelector('meta[name="robots"]')?.content||"",
          slugs:cards.map(card=>card.getAttribute("data-curated-day-trip")),
          allLinked:cards.every(card=>card.querySelector('a[href^="/destination/"]')&&[...card.querySelectorAll("a")].some(a=>a.href.includes("google.com/maps"))),
          mapCount:document.querySelectorAll('a[href*="google.com/maps"]').length,
          affiliate:affiliate?{href:affiliate.href,rel:affiliate.rel}:null,
          documentWidth:document.documentElement.scrollWidth,
          viewportWidth:innerWidth
        };
      });
      const indexReady=!/noindex/i.test(data.robots);
      record.status=indexReady?"indexable":"quality-gated";
      check("canonical URL",data.canonical==="https://texasdefined.com"+pathname,data.canonical);
      check("correct city heading",data.h1.toLowerCase().includes(metro.split("-")[0]),data.h1);
      check("unique curated destination IDs",new Set(data.slugs).size===data.slugs.length,data.slugs.join(","));
      check("curated destinations have guides and directions",data.allLinked,data.slugs.length);
      check("map route links available",data.mapCount>0,data.mapCount);
      check("no horizontal overflow",data.documentWidth<=data.viewportWidth+2,data.documentWidth+"/"+data.viewportWidth);
      if(indexReady){
        check("indexable city has curated guide",data.slugs.length>=1,data.slugs.length);
        if(approvedViator.has(metro)){
          const panel=page.locator("[data-day-trip-viator-market]");
          await panel.waitFor({state:"attached",timeout:15000});
          check("affiliate CTA disclosure relationship",!!data.affiliate?.rel?.includes("sponsored")&&!!data.affiliate?.rel?.includes("nofollow"),JSON.stringify(data.affiliate));
          await panel.scrollIntoViewIfNeeded();
          await page.waitForTimeout(1200);
          const impressions=await page.evaluate(()=>(window.dataLayer||[]).filter(e=>e?.event==="affiliate_impression"&&e.affiliate_placement==="metro-day-trips-experience").length);
          check("visible offer fires one measured impression",impressions===1,impressions);
        }else check("no invented Viator market",data.affiliate===null,JSON.stringify(data.affiliate));
      }else check("no monetization on gated collection",data.affiliate===null,JSON.stringify(data.affiliate));
      check("no hydration errors",!record.pageErrors.some(e=>/hydration|React error #418|React error #423/i.test(e)),record.pageErrors.join(";"));
      const screenshot=directory+"/"+metro+"-"+viewport.name+".png";
      await page.screenshot({path:screenshot,fullPage:true,animations:"disabled",timeout:30000});
      record.screenshot=screenshot;
    }catch(error){
      check("scenario completed",false,error?.message||error);
      await page.screenshot({path:directory+"/"+metro+"-"+viewport.name+"-error.png",timeout:12000}).catch(()=>{});
    }finally{results.push(record);await context.close();}
  }
}finally{await browser.close();await writeFile(directory+"/report.json",JSON.stringify({checkedAt:new Date().toISOString(),targetSha,results,failures},null,2)+"\n");}
for(const result of results)console.log(result.metro,result.viewport,result.status,result.checks.filter(x=>x.passed).length+"/"+result.checks.length);
if(failures.length){console.error("Metro production acceptance failed:",JSON.stringify(failures));process.exitCode=1;}
