import { mkdir,writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const { chromium }=createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-park-qa/node_modules/playwright-core");
const origin="https://texasdefined.com";
const output="artifacts/tpwd-six-mobile-visual";
const parks=[
 ["kickapoo-cavern-state-park","Kickapoo Cavern State Park"],
 ["possum-kingdom-state-park","Possum Kingdom State Park"],
 ["lake-casa-blanca-international-state-park","Lake Casa Blanca International State Park"],
 ["lake-colorado-city-state-park","Lake Colorado City State Park"],
 ["purtis-creek-state-park","Purtis Creek State Park"],
 ["martin-dies-jr-state-park","Martin Dies, Jr. State Park"],
];
const viewports=[
 {label:"mobile",width:390,height:844,isMobile:true},
 {label:"desktop",width:1440,height:900,isMobile:false},
];
const results=[],failures=[];
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||"/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
try{
 for(const viewport of viewports){
  const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:1,isMobile:viewport.isMobile,hasTouch:viewport.isMobile});
  // Do not send analytics, touch checkout, or click hotel/affiliate links.
  await context.route(/(google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i,route=>route.abort());
  for(const [slug,title] of parks){
   const page=await context.newPage();
   page.on("dialog",dialog=>dialog.dismiss());
   try{
    const response=await page.goto(origin+"/destination/"+slug+"?visual_qa="+(process.env.GITHUB_SHA||"manual").slice(0,10),{waitUntil:"domcontentloaded",timeout:40000});
    if(response?.status()!==200)throw new Error("HTTP "+response?.status());
    await page.locator("h1").first().waitFor({state:"visible",timeout:15000});
    const hero=page.locator('img[fetchpriority="high"]').first();
    await hero.waitFor({state:"visible",timeout:12000});
    await page.waitForFunction(()=>{const image=document.querySelector('img[fetchpriority="high"]');return !!image?.complete;},null,{timeout:15000});
    const facts=await page.evaluate(()=>{
     const hero=document.querySelector('img[fetchpriority="high"]');
     const heading=document.querySelector("h1")?.textContent?.trim();
     const faq=document.querySelector("#destination-visitor-faqs");
     return {
      heading,
      viewport:window.innerWidth,
      documentWidth:document.documentElement.scrollWidth,
      heroNaturalWidth:hero?.naturalWidth||0,
      heroComplete:hero?.complete||false,
      heroAlt:hero?.getAttribute("alt")||"",
      visibleImageFailures:[...document.querySelectorAll("img")].filter(img=>{const b=img.getBoundingClientRect();return b.width>0&&b.height>0&&img.complete&&img.naturalWidth===0}).slice(0,5).map(img=>img.currentSrc),
      faqVisible:!!faq && faq.getBoundingClientRect().width>0,
      canonical:document.querySelector('link[rel="canonical"]')?.href||"",
      licenseLinks:[...document.querySelectorAll('a[href]')].map(a=>a.href).filter(h=>h.includes("commons.wikimedia.org/wiki/File:")||h.includes("creativecommons.org/licenses/")).slice(0,15),
     };
    });
    if(facts.heading!==title)throw new Error("Wrong park heading: "+facts.heading);
    if(facts.documentWidth>facts.viewport+8)throw new Error("Horizontal overflow: "+(facts.documentWidth-facts.viewport)+"px");
    if(!facts.heroComplete||facts.heroNaturalWidth<100)throw new Error("Hero not loaded");
    if(!facts.faqVisible)throw new Error("Source-backed park FAQ not rendered");
    if(facts.visibleImageFailures.length)throw new Error("Broken visible image: "+facts.visibleImageFailures.join(", "));
    if(facts.canonical!==origin+"/destination/"+slug)throw new Error("Canonical mismatch: "+facts.canonical);
    if(slug==="kickapoo-cavern-state-park"||slug==="lake-casa-blanca-international-state-park"){
     const match=slug==="kickapoo-cavern-state-park"?"Kickapoo_Cavern_State_Park,_landscape.jpg":"Entrance_to_Lake_Casa_Blanca,_Laredo,_TX_IMG_2013.JPG";
     if(!facts.licenseLinks.some(h=>h.includes(match)))throw new Error("Linked original Commons photo missing: "+match);
     if(!facts.licenseLinks.some(h=>h.includes("creativecommons.org/licenses/by-sa/")))throw new Error("Linked original photo share-alike license missing");
    }
    await page.screenshot({path:output+"/"+viewport.label+"-"+slug+"-hero.png",animations:"disabled",timeout:30000});
    if(viewport.label==="mobile"){
     await page.evaluate(() => { const faq = document.querySelector("#destination-visitor-faqs"); if (!faq || faq.getBoundingClientRect().width === 0) throw new Error("Park FAQ disappeared before screenshot"); faq.scrollIntoView({block:"center",behavior:"instant"}); });
     await page.screenshot({path:output+"/mobile-"+slug+"-faq.png",animations:"disabled",timeout:30000});
    }
    results.push({slug,viewport:viewport.label,status:"passed",...facts});
    console.log("PASS "+viewport.label+" "+slug+" image="+facts.heroNaturalWidth+" overflow="+(facts.documentWidth-facts.viewport));
   }catch(err){
    const message=viewport.label+" "+slug+": "+String(err?.message||err);
    failures.push(message);
    console.error("::error title=TPWD park mobile visual QA::"+message);
    // Diagnostic only; keep the same strict failure result. This distinguishes
    // genuinely missing FAQs from changes during client hydration/screenshot.
    try {
      const evidence=await page.evaluate(()=>{
        const faq=document.querySelector("#destination-visitor-faqs");
        return {readyState:document.readyState,href:location.pathname,
          faqPresent:!!faq,faqWidth:faq?.getBoundingClientRect().width??0,
          faqCount:document.querySelectorAll('#destination-visitor-faqs').length,
          textMentionsOfficialFaq:document.body?.innerText?.includes("Frequently asked questions about")??false,
          heroCount:document.querySelectorAll('img[fetchpriority="high"]').length};
      });
      console.error("TPWD_PARK_FAQ_DIAGNOSTIC "+JSON.stringify({slug,viewport:viewport.label,...evidence}));
    } catch (diagnosticError) {
      console.error("TPWD_PARK_FAQ_DIAGNOSTIC_FAILED "+String(diagnosticError));
    }
    try{await page.screenshot({path:output+"/FAIL-"+viewport.label+"-"+slug+".png",timeout:10000});}catch{}
   }finally{await page.close();}
  }
  await context.close();
 }
}finally{await browser.close();}
await writeFile(output+"/results.json",JSON.stringify({sha:process.env.GITHUB_SHA||"",results,failures},null,2));
if(failures.length)process.exitCode=1;
