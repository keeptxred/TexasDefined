/**
 * Single real-Chrome mobile cohort of the thirteen published fishing authority
 * pages. Tests styled/hydrated visitor routes, not screenshots or a synthetic DOM.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const { chromium }=createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-fishing-13-qa/node_modules/playwright-core");
const origin=(process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/,"");
const slugs=["soft-plastics","crankbaits","spinnerbaits","topwater","trolling","vertical-jigging","jigs-and-minnows","live-bait","cut-bait"];
const paths=["/fishing/techniques",...slugs.map(s=>`/fishing/techniques/${s}`),"/fishing/regulations","/fishing/species","/fishing/species/largemouth-bass"];
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
const results=[];
const output="artifacts/fishing-13-mobile";
await mkdir(output,{recursive:true});
try {
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
  await context.route(/googletagmanager|google-analytics|connect\.facebook\.net|facebook\.com\/tr|\/api\/track/i,route=>route.abort());
  const page=await context.newPage();
  for(const path of paths) {
    const errors=[];
    const listener=e=>errors.push(String(e));
    page.on("pageerror",listener);
    const result={path,viewport:"390x844",status:0,styled:false,oneH1:false,noHorizontalOverflow:false,jsErrors:[]};
    try {
      const resp=await page.goto(origin+path,{waitUntil:"domcontentloaded",timeout:60000});
      result.status=resp?.status()??0;
      assert.equal(result.status,200,`${path}: page not 200`);
      await page.locator("h1").first().waitFor({state:"visible",timeout:30000});
      await page.waitForFunction(()=>{
        const m=document.querySelector('meta[name="viewport"]')?.getAttribute("content")||"";
        const links=[...document.querySelectorAll('link[rel="stylesheet"]')];
        return /width\s*=\s*device-width/i.test(m)&&links.length>0&&links.every(link=>Boolean(link.sheet));
      },null,{timeout:30000});
      result.styled=true;
      result.oneH1=await page.locator("h1").count()===1;
      assert(result.oneH1,`${path}: expected one visible H1`);
      await page.waitForFunction(()=>document.documentElement.scrollWidth<=window.innerWidth+12,null,{timeout:12000});
      result.noHorizontalOverflow=true;
      if(path.startsWith("/fishing/techniques/")) {
        const details=page.locator("details").filter({has:page.locator("summary", {hasText:/Browse all/})}).first();
        await details.locator("summary").click();
        assert((await details.locator('a[href^="/fishing/lakes/"]').count())>0,`${path}: full lake relationships cannot be explored`);
      }
      if(path==="/fishing/species/largemouth-bass") {
        const rows=page.locator("[data-bass-lake]");
        const initialCount=await rows.count();
        assert(initialCount>40,`${path}: expected published source-backed lake choices`);
        await page.locator('[data-bass-lake-finder-ready="true"]').waitFor({state:"attached",timeout:30000});
        const search=page.locator("#bass-lake-search");
        await search.fill("Lake Fork");
        await page.waitForFunction(()=>document.querySelectorAll("[data-bass-lake]").length===1,null,{timeout:15000});
        assert.equal(await rows.first().getAttribute("data-bass-lake"),"lake-fork",`${path}: search returned wrong lake`);
        await page.locator("#bass-lake-quality").selectOption("poor");
        await page.waitForFunction(()=>document.querySelectorAll("[data-bass-lake]").length===0,null,{timeout:10000});
        await page.getByRole("button",{name:"Clear lake filters"}).click();
        await page.waitForFunction((count)=>document.querySelectorAll("[data-bass-lake]").length===count,initialCount,{timeout:10000});
        assert.equal(await rows.count(),initialCount,`${path}: clearing filters did not restore lake list`);
        result.lakeFiltersVerified=true;
      }
      result.h1=await page.locator("h1").first().innerText();
    }catch(e){result.error=String(e);}
    result.jsErrors=errors.slice(0,10);
    page.off("pageerror",listener);
    results.push(result);
  }
  await context.close();
} finally { await browser.close(); }
await writeFile(output+"/report.json",JSON.stringify({checked:paths.length,results},null,2)+"\n");
for(const r of results)console.log(JSON.stringify(r));
if(results.length!==paths.length || results.some(r=>r.error || r.jsErrors.length))process.exitCode=1;
