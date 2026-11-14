#!/usr/bin/env node
/** Real Chrome desktop/mobile verification of all five authority hubs plus
 * their current original sports story. No local machine required.
 * Run only from owner-approved issue comment or scheduled GitHub action.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";

const origin="https://texasdefined.com";
const cases=[
  {path:"/hunting",heading:/Hunting Texas/i,marker:"Which public-land access route fits the hunt?",
    anchor:"#hunting-permit-choice",minimumSources:2,hasTable:true},
  {path:"/dogs",heading:/Texas dog life/i,marker:"Pick the outing before you pack for the dog",
    anchor:"#dog-source-decisions",minimumSources:4,hasTable:true,imageAlt:"Editorial illustration of a small long-haired Chihuahua"},
  {path:"/sports",heading:/Texas sports/i,marker:"Find the authoritative schedule, then plan the trip",
    anchor:"#sports-choose-official",minimumSources:4,hasTable:true},
  {path:"/sports/friday-night-lights",heading:/Friday Night Lights/i,marker:"Why the playoff path changes by classification",
    anchor:"#fnl-bracket-comparison",minimumSources:2,hasTable:true,imageAlt:"Editorial illustration of Texas high school football players"},
  {path:"/texas-tailgating-guide",heading:/Tailgating in Texas/i,marker:"Three trips, three very different packing decisions",
    anchor:"#tailgate-worked-examples",minimumSources:10,hasTable:true},
  {path:"/article/texas-sports-weekend-calendar-guide",heading:/Texas Sports Weekends: The Calendar Check Before You Buy Tickets/,
    marker:"What this article verifies",minimumSources:5,hasTable:false},
];
const viewports=[{name:"mobile-320",width:320,height:720,isMobile:true},
  {name:"desktop-1440",width:1440,height:900,isMobile:false}];
if(process.argv.includes("--self-test")){
  assert.equal(cases.length,6);
  assert.deepEqual(viewports.map(v=>v.width),[320,1440]);
  assert.equal(new Set(cases.map(c=>c.path)).size,6);
  assert.ok(cases.every(c=>c.heading&&c.marker&&c.minimumSources>0));
  console.log("PASS all five hubs + sports original article targeted Chrome contract");
  process.exit(0);
}
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH||
  "/tmp/texasdefined-five-hub-qa/node_modules/playwright-core");
const base="artifacts/five-hub-responsive";
await mkdir(base,{recursive:true});
const report={runAt:new Date().toISOString(),sha:process.env.GITHUB_SHA||"",checks:[],
  failures:[],versions:[],urls:[]};
const browser=await chromium.launch({
  executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",headless:true,
  args:["--no-sandbox","--disable-dev-shm-usage"]
});
try{
  for(const spec of cases) for(const viewport of viewports){
    const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},
      isMobile:viewport.isMobile,hasTouch:viewport.isMobile,deviceScaleFactor:1});
    await context.route(/googletagmanager|google-analytics|doubleclick\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track/i,r=>r.abort());
    const page=await context.newPage();
    const errors=[];page.on("pageerror",e=>errors.push(e.message.slice(0,250)));
    const rec={path:spec.path,viewport:viewport.name,width:viewport.width,checks:[],screenshot:null,workerVersion:null};
    const verify=(label,pass,evidence="")=>{
      rec.checks.push({label,pass:Boolean(pass),evidence:String(evidence).slice(0,200)});
      if(!pass)report.failures.push({path:spec.path,viewport:viewport.name,label,evidence:String(evidence).slice(0,300)});
    };
    try{
      const url=origin+spec.path+"?__td_browser_authority="+encodeURIComponent(
        (process.env.GITHUB_RUN_ID||"manual")+"-"+viewport.name+"-"+spec.path.replace(/\W+/g,"-"));
      const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
      rec.workerVersion=response?.headers()["x-texasdefined-worker-version"]??null;
      report.versions.push(rec.workerVersion);
      report.urls.push(response?.url());
      verify("HTTP 200",response?.status()===200,response?.status());
      await page.locator("main h1").first().waitFor({state:"visible",timeout:25000});
      verify("one main landmark",await page.locator("main").count()===1);
      verify("one H1",await page.locator("h1").count()===1);
      const h1=await page.locator("main h1").first().innerText();
      verify("specific heading",spec.heading.test(h1),h1);
      const visible=await page.locator("main").innerText();
      verify("source-backed editorial module visible",visible.includes(spec.marker),spec.marker);
      if(spec.anchor)verify("specific section anchored",await page.locator(spec.anchor).count()===1,spec.anchor);
      const canonical=await page.locator('link[rel="canonical"]').getAttribute("href");
      verify("canonical exact",canonical===origin+spec.path,canonical);
      const robots=await page.locator('meta[name="robots"]').getAttribute("content").catch(()=>null);
      verify("indexable",!/\bnoindex\b/i.test(robots||""),robots??"not set");
      const outside=await page.locator('main a[href^="https://"]').count();
      verify("primary-source links accessible",outside>=spec.minimumSources,outside);
      await page.waitForLoadState("load",{timeout:25000}).catch(()=>{});
      if(spec.hasTable){
        const tables=page.locator("main table"),count=await tables.count();
        verify("meaningful comparison table",count>0,count);
        if(count>0){
          const table=tables.first();
          verify("table caption",await table.locator("caption").count()>0);
          verify("column scopes",await table.locator("th[scope=col]").count()>=2);
          const display=await table.evaluate(el=>{
            let p=el.parentElement,scrollable=false;
            while(p&&p.tagName!=="BODY"){
              if(["auto","scroll"].includes(getComputedStyle(p).overflowX)){scrollable=true;break;}
              p=p.parentElement;
            }
            return {tableWidth:el.scrollWidth,pageWidth:document.documentElement.clientWidth,
              scrollable};
          });
          verify("wide tables independently scroll on mobile",
            !viewport.isMobile||display.tableWidth<=display.pageWidth+3||display.scrollable,
            JSON.stringify(display));
        }
      }
      if(spec.imageAlt){
        const img=page.locator('main img[alt^="'+spec.imageAlt+'"]').first();
        verify("subject-correct labeled illustration",await img.count()===1,spec.imageAlt);
        if(await img.count()){
          await img.scrollIntoViewIfNeeded();
          const evidence=await img.evaluate(el=>({complete:el.complete,naturalWidth:el.naturalWidth,
            naturalHeight:el.naturalHeight,width:el.getBoundingClientRect().width}));
          verify("real image decodes",evidence.complete&&evidence.naturalWidth>200&&evidence.naturalHeight>100,
            JSON.stringify(evidence));
          verify("illustration fits viewport",evidence.width<=viewport.width+3,JSON.stringify(evidence));
        }
      }
      const dimensions=await page.evaluate(()=>({
        documentWidth:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth,
        body:document.body.scrollWidth,
      }));
      verify("no horizontal page overflow",dimensions.documentWidth<=dimensions.viewport+3,
        JSON.stringify(dimensions));
      verify("no uncaught runtime JS errors",errors.length===0,errors.join(" | "));
      rec.screenshot=base+"/"+spec.path.replace(/^\/|\/$/g,"").replaceAll("/","-")+
        "-"+viewport.name+".png";
      await page.screenshot({path:rec.screenshot,animations:"disabled",fullPage:false});
    }catch(e){
      report.failures.push({path:spec.path,viewport:viewport.name,label:"Chrome execution",evidence:String(e).slice(0,350)});
    }finally{
      report.checks.push(rec);
      await context.close();
    }
  }
}finally{await browser.close();}
const versions=[...new Set(report.versions.filter(Boolean))];
if(report.versions.some(v=>!v)||versions.length!==1)
  report.failures.push({label:"single immutable Worker version across all 12 Chrome cases",
    evidence:JSON.stringify(report.versions)});
await writeFile(base+"/report.json",JSON.stringify(report,null,2)+"\n");
console.log("FIVE_HUB_CHROME_SUMMARY "+JSON.stringify({cases:report.checks.length,
  assertions:report.checks.reduce((n,x)=>n+x.checks.length,0),failures:report.failures,
  workerVersion:versions.length===1?versions[0]:null}));
if(report.failures.length)process.exitCode=1;
