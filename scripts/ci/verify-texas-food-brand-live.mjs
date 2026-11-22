import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const origin = "https://texasdefined.com";
const cases = [
  ["/texas-brand-origin-stories", "The founding timeline", "/made-in-texas"],
  ["/made-in-texas", "Which products are actually made in Texas?", "/texas-brand-origin-stories"],
  ["/texas-chili-con-carne-history", "Two Terlingua cookoffs", "/food/tolberts-chili-parlor-grapevine"],
  ["/texas-chicken-fried-steak-guide", "Compare the plate before you order", "/food/blue-bonnet-cafe-marble-falls"],
  ["/texas-breakfast-taco-guide", "Regional ordering reference", "/food/joes-bakery-austin"],
];
const reverse = [
  ["/food/tolberts-chili-parlor-grapevine","/texas-chili-con-carne-history"],
  ["/food/blue-bonnet-cafe-marble-falls","/texas-chicken-fried-steak-guide"],
  ["/food/joes-bakery-austin","/texas-breakfast-taco-guide"],
];
const dir = ".artifacts/texas-food-brand-live";
await mkdir(dir,{recursive:true});
const report={checkedAt:new Date().toISOString(),sha:process.env.GITHUB_SHA??null,checks:[],failures:[]};
async function check(label,fn){try{await fn();report.checks.push(label);}catch(e){report.failures.push({label,error:e.message});console.error("FAIL",label,e.message);}}
async function fetchLive(path,uncached=true){
  const url=origin+path+(uncached?"?__td_refresh_proof="+randomUUID():"");
  const res=await fetch(url,{headers:uncached?{"Cache-Control":"no-cache, no-store, max-age=0"}:{},signal:AbortSignal.timeout(25000)});
  assert.equal(res.status,200);
  assert.equal(new URL(res.url).pathname,path);
  if(uncached)assert.ok(!["HIT","STALE","UPDATING"].includes((res.headers.get("cf-cache-status")??"").toUpperCase()));
  return {html:await res.text(),res};
}
const link=(html,href)=>html.includes('href="'+href+'"')||html.includes('href="'+origin+href+'"');
for(const [path,marker,related] of cases)for(const uncached of [true,false])await check(path+" "+(uncached?"uncached":"ordinary")+" HTML",async()=>{
  const {html,res}=await fetchLive(path,uncached);
  assert.ok(html.includes(marker),"Revised content missing");
  assert.ok(link(html,path)&&html.includes('rel="canonical"'),"Canonical missing");
  assert.ok(link(html,related),"Contextual link missing");
  assert.ok(!/<meta[^>]+name=["'](?:robots|googlebot)["'][^>]+noindex/i.test(html));
  assert.ok(!/noindex/i.test(res.headers.get("x-robots-tag")??""));
  assert.ok(/<title[^>]*>[^<]+<\/title>/.test(html));
  assert.ok(/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{30,}/i.test(html));
  assert.equal((html.match(/<h1(?:\s|>)/gi)??[]).length,1);
  assert.ok(html.includes("BreadcrumbList"));
  assert.ok(html.includes(path==="/made-in-texas"?"CollectionPage":"Article"));
  assert.ok(html.includes("2026-11-21"),"Meaningful modification date missing");
});
for(const [path,target] of reverse)await check(path+" contextual backlink",async()=>{
  const {html}=await fetchLive(path);
  assert.ok(link(html,target),"Reverse guide link absent");
});
await check("All five sitemap dates",async()=>{
  const {html}=await fetchLive("/sitemap.xml");
  for(const [path] of cases){
    const entry=html.split(/<url>/).find(x=>x.includes("<loc>"+origin+path+"</loc>"));
    assert.ok(entry,"Missing "+path);
    assert.ok(/<lastmod>2026-11-21(?:T[^<]+)?<\/lastmod>/.test(entry),"Stale sitemap entry "+path);
  }
});
if(process.argv.includes("--browser")){
 const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH||"/tmp/texasdefined-food-brand-qa/node_modules/playwright-core");
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
 try{for(const [path,marker,related] of cases)for(const viewport of [{name:"mobile",width:390,height:844},{name:"desktop",width:1366,height:900}]){
   await check(path+" "+viewport.name+" browser",async()=>{
    const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},isMobile:viewport.name==="mobile",hasTouch:viewport.name==="mobile",acceptDownloads:true});
    try{
     await context.route("**/*",route=>/googletagmanager|google-analytics|doubleclick\.net|clarity\.ms|facebook\.com\/tr/i.test(route.request().url())?route.abort():route.continue());
     const page=await context.newPage(),errors=[];
     page.on("pageerror",e=>errors.push(e.message));
     const response=await page.goto(origin+path+"?__td_refresh_proof="+randomUUID(),{waitUntil:"domcontentloaded",timeout:45000});
     assert.equal(response.status(),200);
     await page.locator("main h1").waitFor({state:"visible"});
     await page.waitForFunction(()=>document.documentElement.dataset.tdRootHydrated==="1",null,{timeout:30000});
     assert.equal(await page.locator("h1").count(),1);
     assert.ok((await page.locator("main").innerText()).includes(marker));
     assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),origin+path);
     assert.ok(await page.locator('main a[href="'+related+'"]').count()>0);
     if(path!=="/made-in-texas"){
       const hero=page.locator("main figure img").first();
       await hero.scrollIntoViewIfNeeded();
       await hero.evaluate(img=>new Promise(resolve=>{if(img.complete)return resolve();img.addEventListener("load",resolve,{once:true});img.addEventListener("error",resolve,{once:true});setTimeout(resolve,15000);}));
       assert.ok(await hero.evaluate(img=>img.complete&&img.naturalWidth>=1200&&img.alt.trim().length>10),"Lead image missing, undersized or undescribed");
       assert.ok(await page.locator("main table th[scope=col]").count()>=2,"Comparison table missing");
     }else{
       const search=page.getByRole("searchbox");
       await search.fill("ZZZ-no-matching-company-123");
       await page.getByText("No matches. Try a different search or reset the filters.").waitFor();
       await page.getByRole("button",{name:"Reset filters"}).click();
       await page.getByText("104 of 104 entries shown.").waitFor();
       await search.fill("Blue Bell");
       const downloadPromise=page.waitForEvent("download");
       await page.getByRole("button",{name:"Download filtered directory (CSV)"}).click();
       const download=await downloadPromise;
       const csv=await readFile(await download.path(),"utf8");
       assert.ok(csv.includes("Blue Bell")&&csv.includes("Source URL")&&!csv.includes("Rocketbuster"),"Export is not filtered");
     }
     assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+3),"Horizontal viewport overflow");
     assert.deepEqual(errors,[],"Uncaught browser errors");
     await page.screenshot({path:dir+"/"+path.slice(1)+"-"+viewport.name+".png",fullPage:false,animations:"disabled"});
    }finally{await context.close();}
   });
 }}finally{await browser.close();}
}
await writeFile(dir+"/report.json",JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));
if(report.failures.length)process.exitCode=1;
