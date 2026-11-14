#!/usr/bin/env node
/** Read-only representative desktop/mobile Chrome acceptance of the 32-page
 * authority release. Weekly and explicit manual runs only; no deploy follower.
 */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
const { chromium } = require("/tmp/texasdefined-32-qa/node_modules/playwright-core");

const base = "https://texasdefined.com";
const dir = "artifacts/texas-32-browser";
const cases = [
  {slug:"texas-fishing-license",table:true, marker:"August 3, 2026"},
  {slug:"texas-two-step",table:true,marker:"Department of Licensing"},
  {slug:"track-texas-drivers-license",marker:"DPS"},
  {slug:"texas-vs-every-state",marker:"Census"},
  {slug:"texas-unique-lodging",table:true,marker:"Indian Lodge"},
  {slug:"texas-music-timeline",marker:"Texas",expectedH1:"Texas Music Timeline"},
];
const viewports = [
  {name:"mobile",width:390,height:844,isMobile:true},
  {name:"desktop",width:1365,height:900,isMobile:false},
];
const report={checkedAt:new Date().toISOString(),cases:[],failures:[]};
await mkdir(dir,{recursive:true});
const browser=await chromium.launch({
  headless:true,executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",
  args:["--no-sandbox","--disable-dev-shm-usage"],
});
try {
  for (const pageCase of cases) for(const viewport of viewports) {
    const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},
      isMobile:viewport.isMobile,hasTouch:viewport.isMobile,deviceScaleFactor:1});
    await context.route("**/*",route=>{
      if(/googletagmanager|google-analytics|doubleclick\.net|clarity\.ms|facebook\.com\/tr|\/api\/analytics(?:\/|\?|$)/i.test(route.request().url())) return route.abort();
      return route.continue();
    });
    const page=await context.newPage(),errors=[];
    page.on("pageerror",e=>errors.push(e.message.slice(0,200)));
    const rec={path:"/"+pageCase.slug,viewport:viewport.name,checks:[],screenshot:null};
    const verify=(label,passed,detail="")=>{
      rec.checks.push({label,passed:!!passed,detail:String(detail).slice(0,220)});
      if(!passed) report.failures.push({path:rec.path,viewport:rec.viewport,label,detail:String(detail).slice(0,220)});
    };
    try {
      const url=base+rec.path+"?_authority_chrome="+Date.now().toString(36)+"-"+viewport.name;
      const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
      verify("HTTP 200",response?.status()===200,response?.status());
      verify("one main landmark",await page.locator("main").count()===1,await page.locator("main").count());
      verify("one H1",await page.locator("h1").count()===1,await page.locator("h1").count());
      const heading=(await page.locator("h1").first().textContent().catch(()=>""))??"";
      verify("specific H1",pageCase.expectedH1 ? heading.trim()===pageCase.expectedH1 : heading.trim().length>20,heading.slice(0,100));
      const visible=await page.locator("body").innerText();
      verify("page-specific first-party content visible",visible.includes(pageCase.marker),pageCase.marker);
      const canonical=await page.locator('link[rel="canonical"]').getAttribute("href").catch(()=>null);
      verify("canonical route",canonical===base+rec.path,canonical);
      const robots=await page.locator('meta[name="robots"]').getAttribute("content").catch(()=>"");
      verify("not noindex",!/\bnoindex\b/i.test(robots??""),robots);
      const googlebot=await page.locator('meta[name="googlebot"]').getAttribute("content").catch(()=>"");
      verify("Googlebot not noindex",!/\bnoindex\b/i.test(googlebot??""),googlebot);
      await page.waitForLoadState("load",{timeout:30000}).catch(()=>{});
      const measure=await page.evaluate(()=>({
        documentWidth:document.documentElement.scrollWidth,
        viewportWidth:document.documentElement.clientWidth,
      }));
      verify("no horizontal page overflow",measure.documentWidth<=measure.viewportWidth+3,JSON.stringify(measure));
      if(pageCase.table) {
        const tables=page.locator("main table");
        const count=await tables.count();
        verify("semantic table present",count>=1,count);
        if(count>0) {
          const table=tables.first();
          verify("caption or accessible table name",await table.locator("caption").count()>0 ||
            !!(await table.getAttribute("aria-label")), "table label");
          verify("column headings use scope",await table.locator("th[scope=col]").count()>=2);
          if(viewport.isMobile) {
            const m=await table.evaluate(el=>{
              let p=el.parentElement,scrollable=false;
              while(p&&p.tagName!=="BODY") {
                const overflow=getComputedStyle(p).overflowX;
                if(["auto","scroll"].includes(overflow)){scrollable=true;break;}
                p=p.parentElement;
              }
              return {scrollable,tableWidth:el.scrollWidth,viewportWidth:document.documentElement.clientWidth};
            });
            verify("wide table has its own mobile scroll container",
              m.tableWidth<=m.viewportWidth+3||m.scrollable,JSON.stringify(m));
          }
        }
      }
      verify("no uncaught browser errors",errors.length===0,errors.join(" | "));
      rec.screenshot=dir+"/"+pageCase.slug+"-"+viewport.name+".png";
      await page.screenshot({path:rec.screenshot,fullPage:false,animations:"disabled"});
    } catch(e) {
      report.failures.push({path:rec.path,viewport:rec.viewport,label:"browser execution",detail:String(e).slice(0,240)});
    } finally { report.cases.push(rec); await context.close(); }
  }
} finally { await browser.close(); }
await writeFile(dir+"/report.json",JSON.stringify(report,null,2)+"\n");
console.log("Texas 32 Chrome representative acceptance: "+report.cases.length+" cases, "+report.failures.length+" failures");
if(report.failures.length){for(const f of report.failures)console.error("FAIL "+f.path+" "+f.viewport+" "+f.label+" "+f.detail);process.exitCode=1;}
