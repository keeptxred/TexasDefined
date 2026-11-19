#!/usr/bin/env node
/**
 * Three heritage destinations: real Chrome at 320, 390 and 1280 pixels.
 * Exact-release follow-up to the 200/canonical/license/alias production test.
 * No external paid service; reuse the protected deployment's existing Chrome.
 */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-wp-qa/node_modules/playwright-core");

const origin = "https://texasdefined.com";
const sha = process.env.GITHUB_SHA || "manual";
const out = "artifacts/heritage-three-mobile";
const sites = [
  { slug: "texas-state-capitol", title: "Texas State Capitol", facts: ["Goddess of Liberty", "1936 Texas Centennial"] },
  { slug: "lbj-presidential-library-austin", title: "LBJ Presidential Library", facts: ["Origins of Ambition", "45 million pages"] },
  { slug: "mission-san-jose-san-antonio", title: "Mission San José", facts: ["1758", "Pedro Huizar"] },
];
const sizes = [
  { name: "mobile-320", width: 320, height: 720, mobile: true },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "desktop-1280", width: 1280, height: 800, mobile: false },
];
if (process.argv.includes("--self-test")) {
  assert.equal(sites.length,3);
  assert.equal(sizes.length,3);
  assert.ok(sites.every(site=>site.facts.length>=2));
  console.log("Three heritage browser QA contract passed.");
  process.exit(0);
}
await mkdir(out, {recursive:true});
const records=[];
const failures=[];
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox","--disable-dev-shm-usage"],
});
try {
  for (const site of sites) for (const size of sizes) {
    const path = "/destination/" + site.slug;
    const url = new URL(origin + path);
    url.searchParams.set("heritage_mobile_proof",sha.slice(0,12));
    const context = await browser.newContext({
      viewport: {width:size.width,height:size.height},
      deviceScaleFactor:1,isMobile:size.mobile,hasTouch:size.mobile,
    });
    await context.route(/(?:google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i, r=>r.abort());
    const page=await context.newPage();
    const errs=[];
    page.on("pageerror",err=>errs.push(String(err).slice(0,240)));
    const row={site:site.slug,viewport:size.name,checks:[],pageErrors:errs};
    const check=(name,passed,detail="")=>{
      row.checks.push({name,passed:Boolean(passed),detail:String(detail).slice(0,240)});
      if(!passed)failures.push(site.slug+" "+size.name+" "+name+": "+detail);
    };
    try {
      const response=await page.goto(url.href,{waitUntil:"domcontentloaded",timeout:45000});
      check("200 HTTP",response?.status()===200,response?.status());
      if(response?.status()!==200)continue;
      await page.locator("main h1").waitFor({state:"visible",timeout:25000});
      await page.waitForFunction(()=>document.documentElement.dataset.tdRootHydrated==="1",undefined,{timeout:18000}).catch(()=>{});
      const base=await page.evaluate(()=>({
        h1s:[...document.querySelectorAll("main h1")].map(n=>(n.textContent||"").trim()),
        canonical:document.querySelector('link[rel="canonical"]')?.href||"",
        robots:document.querySelector('meta[name="robots"]')?.content||"",
        width:document.documentElement.scrollWidth,
        viewport:window.innerWidth,
        body:document.body.innerText||"",
        sourceLinks:[...document.querySelectorAll("a[href^='https://']")].map(a=>a.href),
        imageCount:document.querySelectorAll("main img[alt]").length,
        htmlLang:document.documentElement.lang,
        skipLink:!!document.querySelector("a[href='#main-content'],a[href='#content'],a[href^='#main']"),
      }));
      check("one correct H1",base.h1s.length===1 && base.h1s[0].includes(site.title),JSON.stringify(base.h1s));
      check("self canonical",base.canonical===origin+path,base.canonical);
      check("indexable",!/noindex/i.test(base.robots),base.robots);
      check("no horizontal overflow",base.width<=base.viewport+3,base.width+"/"+base.viewport);
      check("source-backed historical facts",site.facts.every(text=>base.body.includes(text)),site.facts.join("; "));
      check("operator source link",base.sourceLinks.some(link=>site.slug==="texas-state-capitol"?link.includes("tspb.texas.gov"):site.slug.startsWith("lbj")?link.includes("lbjlibrary.org"):link.includes("nps.gov")),site.slug);
      check("document language set",base.htmlLang.toLowerCase().startsWith("en"),base.htmlLang);
      check("descriptive photos present",base.imageCount>=1,base.imageCount);
      const images=page.locator("main img[alt]");
      const limit=Math.min(await images.count(),3);
      const imageData=[];
      for(let i=0;i<limit;i++){
        const img=images.nth(i);
        await img.scrollIntoViewIfNeeded({timeout:10000}).catch(()=>{});
        await img.evaluate(async(el)=>{try{await el.decode();}catch{}}).catch(()=>{});
        imageData.push(await img.evaluate(el=>({alt:el.alt,src:el.currentSrc||el.src,complete:el.complete,width:el.naturalWidth,height:el.naturalHeight})));
      }
      check("first location photo delivered",imageData.some(img=>img.complete&&img.width>100&&img.height>100&&img.alt.length>15),JSON.stringify(imageData.slice(0,2)));
      await page.screenshot({path:`${out}/${site.slug}-${size.name}.png`,fullPage:false});
      check("no JavaScript errors",errs.length===0,errs.join(" | "));
    }catch(e){
      check("browser navigation and assertions",false,String(e));
    }finally{
      records.push(row);
      await context.close();
    }
  }
} finally {await browser.close();}
await writeFile(out+"/acceptance.json",JSON.stringify({sourceSha:sha,checkedAt:new Date().toISOString(),records,failures},null,2)+"\n");
console.log(JSON.stringify({sourceSha:sha,checked:records.length,failures},null,2));
if(failures.length)process.exitCode=1;
