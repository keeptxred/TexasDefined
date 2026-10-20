import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
const {chromium}=createRequire(import.meta.url)("/tmp/texasdefined-young-county-qa/node_modules/playwright-core");
const origin="https://texasdefined.com", output="artifacts/young-county-graham-browser";
const post="/destination/old-post-office-museum-art-center-graham",museum="/destination/young-county-museum-of-history-and-culture";
const article="/article/young-county-graham-fort-belknap-brazos-cross-timbers-texas",west="/texas-old-west";
const report={date:new Date().toISOString(),passes:[],failures:[]};
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
async function visit(page,path,required=[]){
 const response=await page.goto(origin+path,{waitUntil:"domcontentloaded",timeout:45000});
 assert.equal(response?.status(),200,path+" response");
 await page.locator("h1").first().waitFor({state:"visible",timeout:15000});
 const data=await page.evaluate(()=>({canonical:document.querySelector('link[rel="canonical"]')?.href||"",links:[...document.querySelectorAll("a[href]")].map(a=>a.getAttribute("href")),overflow:document.documentElement.scrollWidth-window.innerWidth}));
 assert.equal(data.canonical,origin+path,path+" canonical");
 assert.ok(data.overflow<=14,path+" horizontal overflow "+data.overflow);
 for(const href of required)assert.ok(data.links.includes(href)||data.links.includes(origin+href),path+" missing link "+href);
 report.passes.push({path,required,overflow:data.overflow});
}
async function checkPost(page,label){
 const hero=page.locator('section.relative.isolate > img[fetchpriority="high"]').first();
 await hero.waitFor({state:"attached",timeout:15000});
 await page.waitForFunction(()=>{const i=document.querySelector('section.relative.isolate > img[fetchpriority="high"]');return !!i&&i.complete;},null,{timeout:20000});
 const photo=await hero.evaluate(i=>({src:i.currentSrc||i.src,alt:i.alt,width:i.naturalWidth,height:i.naturalHeight}));
 assert.ok(photo.src.includes("United_States_Post_Office_Graham_Wiki"),label+" wrong image: "+photo.src);
 assert.ok(photo.alt.includes("Old Post")&&photo.alt.includes("Graham"),label+" wrong alt: "+photo.alt);
 assert.ok(photo.width>100&&photo.height>100,label+" no decoded photo bytes");
 const credit=page.getByText(/Photography:.*Renelibrary/).first();
 await credit.waitFor({state:"visible",timeout:10000});
 assert.match(await credit.innerText(),/CC BY-SA 4\.0/,label+" missing license");
 assert.equal(await page.getByText("destination-specific photograph not yet available").count(),0,label+" placeholder still shown");
 report.passes.push({check:label,photo});
}
try{
 for(const [name,width,height] of [["mobile",390,844],["desktop",1440,900]]){
  const context=await browser.newContext({viewport:{width,height},isMobile:name==="mobile",hasTouch:name==="mobile",deviceScaleFactor:1});
  await context.route(/(google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i,route=>route.abort());
  const page=await context.newPage();
  try{
   await visit(page,post,[museum,"/destination/graham"]);await checkPost(page,name+" canonical");
   await page.screenshot({path:output+"/"+name+"-old-post.png",animations:"disabled"});
   await visit(page,museum,[post,"/county/young","/destination/graham","/explore/museums",west]);
   await visit(page,"/explore/museums",[post,museum]);
   await visit(page,"/county/young",[post,museum]);
   await visit(page,"/destination/graham",[post,museum]);
   await visit(page,article,[museum]);
   await visit(page,west,[museum,article]);
   await page.goto(origin+museum,{waitUntil:"domcontentloaded",timeout:45000});
   await page.locator('a[href="'+post+'"]').first().click();
   await page.waitForURL(origin+post,{timeout:15000});await checkPost(page,name+" client navigation");
   await page.goto(origin+post+"?young_verify="+(process.env.GITHUB_SHA||"manual").slice(0,12),{waitUntil:"domcontentloaded",timeout:45000});
   await checkPost(page,name+" cache-busted");
   console.log("PASS "+name+" 7 production pages, links, image bytes, alt, credit, navigation and cache");
  }catch(e){report.failures.push(name+": "+String(e?.stack||e));console.error("::error::"+name+" "+String(e?.message||e));try{await page.screenshot({path:output+"/FAIL-"+name+".png",fullPage:true,timeout:12000});}catch{}}
  finally{await page.close();await context.close();}
 }
}finally{await browser.close();}
await writeFile(output+"/report.json",JSON.stringify(report,null,2));
if(report.failures.length)process.exitCode=1;