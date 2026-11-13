#!/usr/bin/env node
/** Headless real-browser verification. One Chrome process, sequential routes. */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const require=createRequire(import.meta.url);
const {chromium}=require("/tmp/texasdefined-music-qa/node_modules/playwright-core");
const base="https://texasdefined.com",dir="artifacts/texas-music-history-browser";
const slugs=[
"broken-spoke-austin-history","continental-club-austin-history","antones-austin-history",
"billy-bobs-texas-history","texas-music-cities","austin-music-history","houston-music-history",
"san-antonio-music-history","corpus-christi-music-history","lubbock-music-history"];
const viewports=[{name:"mobile",width:390,height:844,isMobile:true},{name:"desktop",width:1365,height:900,isMobile:false}];
const report={checkedAt:new Date().toISOString(),checks:[],failures:[]};
await mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
try{
 for(const viewport of viewports)for(const slug of slugs){
  const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},isMobile:viewport.isMobile,hasTouch:viewport.isMobile,deviceScaleFactor:1});
  await context.route("**/*",route=>{
   if(/googletagmanager|google-analytics|doubleclick\.net|clarity\.ms|facebook\.com\/tr|\/api\/analytics(?:\/|\?|$)/i.test(route.request().url()))return route.abort();
   return route.continue();
  });
  const page=await context.newPage(),errors=[],record={slug,viewport:viewport.name,checks:[],screenshot:null};
  page.on("pageerror",e=>errors.push(e.message.slice(0,150)));
  function check(name,ok,details=""){record.checks.push({name,ok:!!ok});if(!ok)report.failures.push({slug,viewport:viewport.name,name,details:String(details).slice(0,240)})}
  try{
   const res=await page.goto(base+"/"+slug+"?_music_chrome="+Date.now().toString(36)+"-"+viewport.name,{waitUntil:"domcontentloaded",timeout:45000});
   check("HTTP 200",res?.status()===200,res?.status());
   check("one H1",await page.locator("h1").count()===1);
   check("one main landmark",await page.locator("main").count()===1);
   const mainText=await page.locator("main").innerText({timeout:12000}).catch(()=>"");
   check("historical content visible",mainText.length>1300,mainText.length);
   check("accountable editorial desk visible",mainText.includes("Texas Defined Editorial Desk"));
   check("source chronology or city comparison visible",/documented milestones|source-linked chronology|Milestones in a Coastal Bend recording center|What made each Texas music city different\?/i.test(mainText));
   check("research dossier visible",mainText.includes("Research file")&&mainText.includes("What the record establishes")&&mainText.includes("Our reading")&&mainText.includes("What remains uncertain:"));
   check("at least four checked findings",((mainText.match(/What the record establishes/g)||[]).length)>=4);
   const links=await page.locator('section[aria-labelledby="music-research-dossier"] a[href^="https://"]').count();
   check("four or more linked records",links>=4,links);
   if(slug==="continental-club-austin-history")check("1955 and 1957 dispute published",mainText.includes("1955")&&mainText.includes("1957")&&mainText.includes("disputed"));
   const canonical=await page.locator('link[rel="canonical"]').getAttribute("href").catch(()=>null);
   check("self canonical",canonical===base+"/"+slug,canonical);
   const robots=await page.locator('meta[name="robots"]').getAttribute("content").catch(()=>"");
   check("indexable",!/\bnoindex\b/i.test(robots??""),robots);
   await page.waitForLoadState("load",{timeout:15000}).catch(()=>{});
   const dimensions=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
   check("no horizontal overflow",dimensions.doc<=dimensions.viewport+3,JSON.stringify(dimensions));
   if(slug==="texas-music-cities"){
    const table=page.locator("main table");
    check("six-city table is semantic",await table.count()===1);
    check("six city rows",await table.locator("tbody tr").count()===6);
    check("accessible headings",await table.locator("th[scope=col]").count()===4);
    if(viewport.isMobile){
     const scroller=await table.evaluate(el=>{for(let p=el.parentElement;p&&p.tagName!=="BODY";p=p.parentElement){if(["auto","scroll"].includes(getComputedStyle(p).overflowX))return true}return false});
     check("mobile table scroll container",scroller);
    }
   }
   if(["broken-spoke-austin-history","continental-club-austin-history","antones-austin-history","billy-bobs-texas-history"].includes(slug)){
    const documentaryPhoto=page.locator("main figure img");
    check("licensed documentary photo present",await documentaryPhoto.count()>=1);
    if(await documentaryPhoto.count()){
     await documentaryPhoto.first().scrollIntoViewIfNeeded({timeout:10000}).catch(()=>{});
     const picture=await documentaryPhoto.first().evaluate(async img=>{
      if(!img.complete)await new Promise(resolve=>{img.addEventListener("load",resolve,{once:true});img.addEventListener("error",resolve,{once:true});setTimeout(resolve,8000)});
      return {loaded:img.complete&&img.naturalWidth>0,alt:img.alt,src:img.currentSrc};
     });
     check("documentary photo loads",picture.loaded,JSON.stringify(picture));
     check("documentary photo has specific alternative text",picture.alt.length>30,picture.alt);
     check("photo author and license are visible",await page.locator("main figure figcaption a").count()>=2);
    }
   }
   check("no uncaught browser exceptions",!errors.length,errors.join(" | "));
   if(["texas-music-cities","corpus-christi-music-history","broken-spoke-austin-history"].includes(slug)){
    record.screenshot=dir+"/"+slug+"-"+viewport.name+".png";
    await page.screenshot({path:record.screenshot,fullPage:false,animations:"disabled"});
   }
  }catch(e){report.failures.push({slug,viewport:viewport.name,name:"browser navigation",details:String(e).slice(0,240)})}
  finally{report.checks.push(record);await context.close()}
 }
}finally{await browser.close()}
await writeFile(dir+"/report.json",JSON.stringify(report,null,2)+"\n");
console.log("Music history browser: "+report.checks.length+" cases; "+report.failures.length+" failures");
if(report.failures.length){report.failures.forEach(f=>console.error("FAIL",f.slug,f.viewport,f.name,f.details));process.exitCode=1}
