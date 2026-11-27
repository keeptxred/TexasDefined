import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-rail-qa/node_modules/playwright-core");
const origin = "https://texasdefined.com";
const output = "artifacts/railroad-rusk-browser";
await mkdir(output,{recursive:true});
const results=[], failures=[];
const routes=[
 {name:"railroad",path:"/article/texas-state-railroad-rusk-palestine-history-guide",markers:["Can I visit downtown Rusk during the layover?","powered mobility scooters","75–80 minutes"],assets:["Locomotive_125_Texas_State_Railroad_2024.jpg","TSR_300_at_Rusk.jpg","Car_42_Interior_Texas_State_Railroad_2024.jpg","Palestine_Depot_Platform_Texas_State_Railroad_2024.jpg","moving_locomotives.jpg","texas-state-railroad-depot-schematic.svg"]},
 {name:"museum",path:"/destination/heritage-center-cherokee-county-rusk",markers:["Rex Brasher bird art","When is the Heritage Center of Cherokee County open?","Is admission to the Rusk museum free?","2009 relocation"],assets:["heritage-center-cherokee-county-rusk-station-2004.jpg"]}
];
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
try{
 for(const width of [320,390,1440]){
  const context=await browser.newContext({viewport:{width,height:width<600?844:900},isMobile:width<600,hasTouch:width<600,deviceScaleFactor:1});
  for(const route of routes){
   const page=await context.newPage();
   const errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   await page.addInitScript(()=>{window.__railMetrics={lcp:null,cls:0};try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.__railMetrics.lcp=e.startTime}).observe({type:"largest-contentful-paint",buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__railMetrics.cls+=e.value}).observe({type:"layout-shift",buffered:true})}catch{}});
   try{
    const response=await page.goto(origin+route.path,{waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>document.documentElement.dataset.tdRootHydrated==="1",null,{timeout:35000});
    const lab=await page.evaluate(()=>({...window.__railMetrics,domContentLoaded:performance.getEntriesByType("navigation")[0]?.domContentLoadedEventEnd}));
    const images=[];
    for(const key of route.assets){
     const target=page.locator('main img[src*="'+key+'"]').first();
     if(!await target.count()){images.push({key,loaded:false,reason:"missing"});continue;}
     await target.scrollIntoViewIfNeeded({timeout:20000});
     await target.evaluate(img=>new Promise(resolve=>{if(img.complete)return resolve();img.addEventListener("load",resolve,{once:true});img.addEventListener("error",resolve,{once:true});setTimeout(resolve,12000)}));
     images.push(await target.evaluate((img,key)=>({key,loaded:img.complete&&img.naturalWidth>0,alt:img.alt,src:img.currentSrc||img.src,width:img.naturalWidth}),key));
    }
    const data=await page.evaluate(()=>{const root=document.querySelector("main");return {mainCount:document.querySelectorAll("main").length,h1:root?.querySelectorAll("h1").length,text:root?.innerText||"",canonical:document.querySelector('link[rel="canonical"]')?.href,robots:document.querySelector('meta[name="robots"]')?.content||"",scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,missingAlt:[...root.querySelectorAll("img")].filter(x=>!x.hasAttribute("alt")).length}});
    let keyboard=true;
    if(route.name==="museum"){
     const summary=page.locator("main summary").filter({hasText:"Is admission to the Rusk museum free?"}).first();
     if(await summary.count()!==1)keyboard=false;else{
      await summary.focus();const before=await summary.evaluate(e=>e.parentElement.open);
      await page.keyboard.press("Enter");const after=await summary.evaluate(e=>e.parentElement.open);
      keyboard=before!==after;
     }
    }
    const checks=[["HTTP 200",response?.status()===200],["one main and H1",data.mainCount===1&&data.h1===1],["canonical",data.canonical===origin+route.path],["indexability",!/\bnoindex\b/i.test(data.robots)],["no horizontal overflow",data.scrollWidth<=data.viewport+4],["alt attributes",data.missingAlt===0],["FAQ keyboard",keyboard],["no uncaught page errors",errors.length===0],...route.markers.map(m=>["main: "+m,data.text.includes(m)]),...images.map(i=>["image "+i.key,i.loaded&&Boolean(i.alt)])];
    const failed=checks.filter(c=>!c[1]).map(c=>c[0]);
    results.push({route:route.name,width,failed,images,errors,lab,fieldMetrics:"Not measured by lab browser"});
    failures.push(...failed.map(x=>route.name+" "+width+": "+x));
    await page.screenshot({path:output+"/"+route.name+"-"+width+".png",fullPage:true,animations:"disabled",timeout:45000});
   }catch(e){failures.push(route.name+" "+width+": "+e.message);}
   finally{await page.close();}
  }
  await context.close();
 }
}finally{await browser.close();await writeFile(output+"/results.json",JSON.stringify({results,failures},null,2));}
for(const e of failures)console.error("::error::"+e);
if(failures.length)process.exitCode=1;else console.log("Railroad and Rusk museum: one Chrome, three sequential widths, content, keyboard, and seven critical images passed.");
