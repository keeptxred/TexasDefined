import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/td-planner-fresh-chrome/node_modules/playwright-core");
const root = "https://texasdefined.com";
const dir = "artifacts/fishing-planner-hydration-diagnostics";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const all = [];
for (const [name,path,transition] of [
  ["list-idle","/fishing/plan",false],
  ["list-explicit","/fishing/plan?view=list",false],
  ["list-filtered","/fishing/plan?species=largemouth-bass",false],
  ["map-with-query","/fishing/plan?view=map&q=Houston",false],
  ["map-idle","/fishing/plan?view=map",false],
  ["list-to-map","/fishing/plan",true],
  ["directory-idle","/fishing/lakes",false],
  ["compare-idle","/fishing/compare",false],
]) {
  const context = await browser.newContext({ viewport: {width: 1280, height: 900}, extraHTTPHeaders:{"Cache-Control":"no-cache,no-store",Pragma:"no-cache"} });
  await context.route(/google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track/i, route=>route.abort());
  const page = await context.newPage();
  const row = { name, path, events:[], navigations:[], status: null, initialHydrated:null, finalHydrated:null };
  let phase = "navigate";
  page.on("pageerror",e=>row.events.push({kind:"pageerror",phase,url:page.url(),message:String(e),stack:e.stack?.slice(0,800)}));
  page.on("console", msg=>{if(msg.type()==="error" || /hydrat|mismatch/i.test(msg.text()))row.events.push({kind:"console",phase,url:page.url(),message:msg.text().slice(0,950)})});
  page.on("framenavigated",f=>{if(f===page.mainFrame())row.navigations.push({phase,url:f.url()})});
  try {
    const u = new URL(path,root);u.searchParams.set("independent_fishing_hydration_diagnostic",randomUUID());
    const res = await page.goto(u.href,{waitUntil:"load",timeout:50000});row.status=res?.status();
    phase="idle-first-2500ms";
    await page.waitForTimeout(2500);
    row.initialHydrated=await page.evaluate(()=>({rootFlag:document.documentElement.dataset.tdRootHydrated,tag:document.documentElement.outerHTML.slice(0,140),h1:document.querySelector("h1")?.textContent,selectOptions:document.querySelector("#fishing-map-lake-selector")?.options.length??null,scriptTags:[...document.body.querySelectorAll(":scope > script")].map(s=>({src:s.src||null,type:s.type||null}))}));
    if(transition){
      phase="click-map-link";
      await page.getByRole("link",{name:"Map",exact:true}).click({timeout:16000});
      await page.waitForURL(/view=map/,{timeout:16000});
      phase="idle-map-3500ms";
      await page.waitForTimeout(3500);
    }
    row.finalHydrated=await page.evaluate(()=>({rootFlag:document.documentElement.dataset.tdRootHydrated,tag:document.documentElement.outerHTML.slice(0,140),h1:document.querySelector("h1")?.textContent,selectOptions:document.querySelector("#fishing-map-lake-selector")?.options.length??null}));
  }catch(e){row.error=String(e)}
  all.push(row);
  await context.close();
}
await browser.close();
await writeFile(dir+"/results.json",JSON.stringify(all,null,2)+"\n");
console.log(JSON.stringify(all,null,2));
