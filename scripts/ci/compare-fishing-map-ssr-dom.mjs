import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE_PATH||"/tmp/td-planner-fresh-chrome/node_modules/playwright-core");
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
const target="https://texasdefined.com/fishing/plan?view=map&structural_nonce="+randomUUID();
const snapshots=[];
for(const javascriptEnabled of [false,true]){
  const context=await browser.newContext({javaScriptEnabled:javascriptEnabled,extraHTTPHeaders:{"cache-control":"no-cache, no-store",pragma:"no-cache"}});
  const page=await context.newPage();
  const errors=[];page.on("pageerror",e=>errors.push(String(e)));
  await page.goto(target,{waitUntil:"load",timeout:60000});
  if(javascriptEnabled)await page.waitForTimeout(3500);
  const snapshot=await page.evaluate(()=>{
    const map=document.querySelector("#texas-fishing-lakes-results-graphic");
    const select=document.querySelector("#fishing-map-lake-selector");
    const aside=select?.closest("aside");
    function describe(node,limit=13000){
      if(!node)return {found:false};
      const tree=[];
      const walk=(el,d=0)=>{
        if(tree.length>=limit)return;
        if(el.nodeType===1){
          tree.push(" ".repeat(d)+"<"+el.localName+">");
          [...el.children].forEach(x=>walk(x,d+1));
        }
      };
      walk(node);
      return {found:true,outerHtmlChars:node.outerHTML.length,structure:tree.join("\n"),text:node.textContent?.slice(0,600),head:node.outerHTML.slice(0,350)};
    }
    return {
      svg:describe(map),selection:describe(select),side:describe(aside),
      main:describe(document.querySelector("#main"),1200),
      canon:document.querySelector('link[rel="canonical"]')?.href,
      h1:document.querySelector("h1")?.textContent,
      hydrated:document.documentElement.dataset.tdRootHydrated??null
    };
  });
  snapshots.push({javascriptEnabled,errors,snapshot});
  await context.close();
}
await browser.close();
const [server,client]=snapshots.map(x=>x.snapshot);
const result={urlPath:"/fishing/plan?view=map",conditions:snapshots.map(x=>({javascriptEnabled:x.javascriptEnabled,errors:x.errors,hydrated:x.snapshot.hydrated,svg:{found:x.snapshot.svg.found,outerHtmlChars:x.snapshot.svg.outerHtmlChars},selection:{found:x.snapshot.selection.found,outerHtmlChars:x.snapshot.selection.outerHtmlChars},side:{found:x.snapshot.side.found,outerHtmlChars:x.snapshot.side.outerHtmlChars},main:{found:x.snapshot.main.found,outerHtmlChars:x.snapshot.main.outerHtmlChars}})),diffs:{}};
for(const key of ["svg","selection","side","main"]){
  const a=server[key]?.structure??"";const b=client[key]?.structure??"";
  let pos=0;while(pos<a.length&&pos<b.length&&a[pos]===b[pos])pos++;
  result.diffs[key]={same:a===b,serverChars:a.length,clientChars:b.length,firstDiffIndex:pos,serverContext:a.slice(Math.max(0,pos-250),pos+350),clientContext:b.slice(Math.max(0,pos-250),pos+350)};
}
await mkdir("artifacts/fishing-planner-dom-diff",{recursive:true});
await writeFile("artifacts/fishing-planner-dom-diff/result.json",JSON.stringify(result,null,2)+"\n");
console.log(JSON.stringify(result,null,2));
