import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-wp-qa/node_modules/playwright-core");
const origin = "http://127.0.0.1:8799";
const root = "artifacts/attraction-authority-browser";
await mkdir(root, { recursive: true });
const worker = spawn("./node_modules/.bin/wrangler", ["dev","--config","dist/server/wrangler.json","--local","--ip","127.0.0.1","--port","8799","--inspector-port","0"], { stdio:["ignore","pipe","pipe"],detached:true,env:{...process.env,CI:"true",NO_COLOR:"1"} });
let output = "";
worker.stdout.on("data", d => { output += d.toString(); process.stdout.write(d); });
worker.stderr.on("data", d => { output += d.toString(); process.stderr.write(d); });
const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));
let browser;
const targets = [
  {slug:"texas-freshwater-fisheries-center",title:"Texas Freshwater Fisheries Center",credit:"Larry D. Moore",noindex:true},
  {slug:"texas-forestry-museum-lufkin",title:"Texas Forestry Museum",credit:"Billy Hathorn",noindex:false},
  {slug:"national-ranching-heritage-center-lubbock",title:"National Ranching Heritage Center",credit:"Billy Hathorn",noindex:true},
];
const results = [];
try {
  let ready = false;
  for (let attempt=0;attempt<90;attempt++) {
    if (worker.exitCode !== null) throw new Error("Wrangler stopped before ready: "+output.slice(-1800));
    try { const response=await fetch(origin+"/",{signal:AbortSignal.timeout(3000)}); if(response.status<500){ready=true;break;} } catch {}
    await sleep(1000);
  }
  assert.ok(ready,"Built Worker did not become ready");
  browser = await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN || "/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
  for (const viewport of [{key:"desktop",width:1440,height:900},{key:"mobile",width:390,height:844}]) {
    const context = await browser.newContext({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:1,isMobile:viewport.key==="mobile",hasTouch:viewport.key==="mobile"});
    await context.route(/(?:google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr)/i, route=>route.abort());
    for(const target of targets){
      const page=await context.newPage();
      const name=target.slug+"-"+viewport.key;
      try{
        const response=await page.goto(origin+"/destination/"+target.slug,{waitUntil:"domcontentloaded",timeout:60000});
        assert.equal(response?.status(),200,name+" HTTP");
        await page.locator("h1").first().waitFor({state:"visible",timeout:15000});
        assert.ok((await page.locator("h1").first().innerText()).includes(target.title),name+" heading");
        const robots=await page.locator('meta[name="robots"]').getAttribute("content").catch(()=>null);
        assert.equal(Boolean(robots?.includes("noindex")),target.noindex,name+" robots policy");
        const canonical=await page.locator('link[rel="canonical"]').getAttribute("href");
        assert.ok(canonical?.endsWith("/destination/"+target.slug),name+" canonical");
        assert.ok((await page.locator("body").innerText()).includes(target.credit),name+" visible photo credit");
        const hero=page.locator("section img").first();
        await hero.waitFor({state:"attached",timeout:15000});
        await page.waitForFunction(()=>{const img=document.querySelector("section img");return !!img && img.complete;},{timeout:20000}).catch(()=>{});
        const image=await hero.evaluate(img=>({loaded:img.complete&&img.naturalWidth>0,src:img.currentSrc,alt:img.alt}));
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
        assert.ok(overflow<=4,name+" horizontal overflow "+overflow);
        await page.screenshot({path:root+"/"+name+".png",fullPage:true,animations:"disabled"});
        assert.ok(image.loaded,name+" hero image failed to load: "+image.src);
        results.push({name,status:"pass",image,overflow});
      }catch(error){
        await page.screenshot({path:root+"/"+name+"-failure.png",fullPage:true}).catch(()=>{});
        results.push({name,status:"fail",error:String(error)});
      }finally{await page.close();}
    }
    await context.close();
  }
  await writeFile(root+"/results.json",JSON.stringify(results,null,2));
  const failures=results.filter(x=>x.status!=="pass");
  assert.equal(failures.length,0,JSON.stringify(failures,null,2));
  console.log("Attraction browser QA passed: 3 guides × 2 viewports, live hero loads, canonical, noindex, credits and overflow.");
} finally {
  if(browser) await browser.close();
  try{process.kill(-worker.pid,"SIGTERM");}catch{worker.kill("SIGTERM");}
}
