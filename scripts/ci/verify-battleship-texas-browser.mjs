#!/usr/bin/env node
/**
 * Real Chrome/Playwright post-release acceptance for the three Battleship Texas
 * authority pages. Screenshots are retained for a human editorial review;
 * automated DOM/image checks do NOT claim subjective visual sign-off.
 */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-naval-qa/node_modules/playwright-core');
const origin = (process.env.TD_PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/+$/, '');
const dir = 'artifacts/battleship-texas-browser';
const cases = [
  { name:'bb35', path:'/article/battleship-texas-bb-35-history-restoration', minimum:11, phrases:['Normandy','Galveston','2027'] },
  { name:'original', path:'/article/uss-texas-1895-original-battleship', minimum:6, phrases:['San Marcos','1895','Spanish'] },
  { name:'visitor', path:'/destination/battleship-texas', minimum:6, phrases:['Gulf Copper','Pier 21','Pier 15','2027'] },
];
const report = { checkedAt:new Date().toISOString(), origin, revision:process.env.PRODUCTION_COMMIT_SHA || process.env.DEPLOY_SHA || 'manual', verifierRevision:process.env.VERIFIER_COMMIT_SHA || 'manual', checks:[], failures:[] };
await mkdir(dir,{recursive:true});
function must(condition,message){if(!condition) throw Error(message);}
async function capture(browser,c,mode) {
  const mobile=mode==='mobile';
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1366,height:900},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1});
  const page=await context.newPage(), pageErrors=[];
  page.on('pageerror', e => pageErrors.push(e.message));
  const pathname=c.path;
  try {
    const response=await page.goto(origin+pathname+'?naval_browser='+encodeURIComponent(report.revision)+'-'+mode,{waitUntil:'domcontentloaded',timeout:60000});
    must(response?.status()===200,c.name+' '+mode+': HTTP '+response?.status());
    await page.locator('h1').first().waitFor({state:'visible',timeout:30000});
    await page.evaluate(()=>document.fonts?.ready);
    await page.waitForTimeout(700);
    // Force lazy image requests and inspect each actual image rather than one
    // sampled image. Save evidence even when an image fails to decode.
    const count=await page.locator('img').count();
    for(let i=0;i<count;i++){
      const loc=page.locator('img').nth(i);
      try{await loc.scrollIntoViewIfNeeded({timeout:4500});}catch{}
    }
    await page.waitForTimeout(900);
    const data=await page.evaluate(()=>{
      const attrs=(selector)=>[...document.querySelectorAll(selector)];
      const images=attrs('img').map(img=>{
        const box=img.getBoundingClientRect();
        return {src:img.currentSrc||img.src,alt:img.getAttribute('alt'),naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,complete:img.complete,displayWidth:Math.round(box.width),displayHeight:Math.round(box.height),visible:box.width>0&&box.height>0};
      });
      return {
        pathname:location.pathname,canonical:document.querySelector('link[rel="canonical"]')?.href,
        robots:document.querySelector('meta[name="robots"]')?.content||'',
        h1:attrs('h1').map(x=>x.textContent.trim()),viewport:innerWidth,docWidth:document.documentElement.scrollWidth,
        text:document.body.innerText,images,
        creditLinks:attrs('a[href]').filter(a=>/commons\.wikimedia\.org\/wiki\/File:|creativecommons\.org\/licenses\//.test(a.href)).map(a=>a.href),
        links:attrs('a[href]').map(a=>new URL(a.href,location.href).pathname),
      };
    });
    const evidence={path:pathname,mode,http:response.status(),canonical:data.canonical,robots:data.robots,h1:data.h1,viewport:data.viewport,docWidth:data.docWidth,images:data.images,credits:data.creditLinks.length,pageErrors};
    const failures=[];
    const test=(ok,msg)=>{if(!ok) failures.push(msg);};
    test(data.pathname===pathname,'wrong route');
    test(data.canonical===origin+pathname,'wrong self canonical');
    test(!/\bnoindex\b/i.test(data.robots),'noindex directive');
    test(data.h1.length===1,'expected exactly one H1');
    test(data.docWidth<=data.viewport+8,'horizontal overflow '+data.docWidth+'/'+data.viewport);
    for(const phrase of c.phrases)test(data.text.toLowerCase().includes(phrase.toLowerCase()),'missing fact '+phrase);
    const archival=data.images.filter(i=>i.visible && (/\/media\/remote\?/.test(i.src)||/commons\.wikimedia\.org|upload\.wikimedia\.org/.test(i.src)));
    test(archival.length>=c.minimum,'only '+archival.length+' relevant images; minimum '+c.minimum);
    for(const [idx,img] of archival.entries()){
      test(img.complete&&img.naturalWidth>0&&img.naturalHeight>0,'broken archival image #'+idx+': '+img.src.slice(0,160));
      test(!!img.alt?.trim(),'missing alt on archival image #'+idx);
      test(img.displayWidth>40 && img.displayHeight>25,'collapsed archival image #'+idx);
      test(img.displayWidth<=data.viewport+8,'oversized archival image #'+idx);
    }
    test(data.creditLinks.length>=c.minimum,'fewer Commons/license attribution links than required photos');
    test(pageErrors.length===0,'JS page errors: '+pageErrors.join(' | '));
    evidence.archivalImages=archival.length;
    evidence.failures=failures;
    // Save full-page evidence for actual human review; do not equate a
    // screenshot existing with a human having visually approved it.
    try{await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:dir+'/'+c.name+'-'+mode+'.png',fullPage:true,animations:'disabled',timeout:40000});}
    catch(e){failures.push('screenshot failed: '+String(e));}
    report.checks.push({...evidence,failures});
    if(failures.length) report.failures.push({page:c.name,mode,failures});
    console.log((failures.length?'FAIL ':'PASS ')+pathname+' '+mode+' images='+archival.length+' credits='+data.creditLinks.length+' overflow='+Math.max(0,data.docWidth-data.viewport));
  }catch(e){
    report.failures.push({page:c.name,mode,error:String(e)});
    console.error('FAIL '+pathname+' '+mode+': '+String(e));
  }finally{await context.close();}
}
let browser;
try{
  // A redirect-following browser response hides the original status: request
  // with redirect:manual to prove a true permanent redirect and Location.
  const old=origin+'/destination/battleship-texas-state-historic-site';
  const redirect=await fetch(old+'?naval_raw_redirect='+encodeURIComponent(report.revision),{redirect:'manual',signal:AbortSignal.timeout(25000)});
  const location=redirect.headers.get('location')||'';
  const resolved=new URL(location,old).pathname;
  report.legacy={status:redirect.status,location,resolved};
  must(redirect.status===301 && resolved==='/destination/battleship-texas','legacy raw redirect is not HTTP 301 to canonical: '+JSON.stringify(report.legacy));
  console.log('PASS exact 301 redirect '+JSON.stringify(report.legacy));
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
  for(const c of cases) for(const mode of ['mobile','desktop']) await capture(browser,c,mode);
}catch(e){report.failures.push({global:String(e)});console.error('FAIL global '+String(e));}
finally{if(browser)await browser.close();await writeFile(dir+'/acceptance.json',JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify({passed:report.failures.length===0,checks:report.checks.length,failures:report.failures},null,2));
if(report.failures.length)process.exitCode=1;
