/**
 * Independent 11-city production ACCESSIBILITY + COMPLETE RENDERED LINK inventory.
 *
 * Diagnostic research only. axe-core signals do NOT certify full WCAG compliance;
 * external 403/429/timeouts are inconclusive and never automatically classified 404.
 * Run only after the exact-SHA protected production gate completes.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-city-qa/node_modules/playwright-core');
const axe = require(process.env.AXE_CORE_PATH || '/tmp/texasdefined-city-qa/node_modules/axe-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const cities = ['houston','dallas','fort-worth','austin','san-antonio','el-paso','arlington','hurst','corpus-christi','plano','lubbock'];
const viewports = [['mobile',390,844],['tablet',768,1024],['desktop',1440,900]];
const out = 'artifacts/city-authority-independent';
await mkdir(out,{recursive:true});
const report = {
  metadata: {schema:'city-authority-independent-v1', origin, capturedAt:new Date().toISOString(),
    commit:process.env.PRODUCTION_COMMIT_SHA || process.env.GITHUB_SHA || null,
    limits:'axe automated WCAG A/AA rules and fetched URL diagnostics, not manual WCAG, relevance, quality or geometry certification'},
  cities:[], linkTargets:[], totals:{cases:0,violations:0,reviewNeeded:0,links:0,unconfirmedLinks:0}
};
const browser = await chromium.launch({
  headless:true, executablePath:process.env.CHROME_BIN, args:['--no-sandbox']
});
const allLinks = new Map();
try {
for (const city of cities) {
  const result = {city, viewports:[], linksFromCity:0};
  report.cities.push(result);
  for (const [label,width,height] of viewports) {
    const context = await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
    const page = await context.newPage();
    const row = {label,width,height,render:'UNVERIFIED',axeStatus:'UNVERIFIED',
      violationCount:0,incompleteCount:0,violations:[],incomplete:[],errors:[]};
    result.viewports.push(row);
    page.on('pageerror',e=>row.errors.push('JS: '+e.message));
    try {
      const response = await page.goto(origin+'/city/'+city,{waitUntil:'domcontentloaded',timeout:55000});
      row.httpStatus=response?.status() || null;
      if(row.httpStatus!==200)throw new Error('Unexpected page HTTP '+row.httpStatus);
      await page.locator('h1').first().waitFor({state:'visible',timeout:20000});
      await page.waitForLoadState('load',{timeout:20000}).catch(()=>{});
      row.render='PASS';
      await page.addScriptTag({content:axe.source});
      const findings = await page.evaluate(async () => {
        return await window.axe.run(document, {
          runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']},
          resultTypes:['violations','incomplete']
        });
      });
      const summarize = rule => ({
        id:rule.id,impact:rule.impact,description:rule.help,helpUrl:rule.helpUrl,
        nodes:rule.nodes.map(n=>({target:n.target,html:n.html?.slice(0,500),
          failureSummary:n.failureSummary?.slice(0,800)}))
      });
      row.violations=findings.violations.map(summarize);
      row.incomplete=findings.incomplete.map(summarize);
      row.violationCount=row.violations.reduce((a,v)=>a+v.nodes.length,0);
      row.incompleteCount=row.incomplete.reduce((a,v)=>a+v.nodes.length,0);
      row.axeStatus=row.violationCount===0?'PASS_AUTOMATED_ONLY':'ISSUES_DETECTED';
      report.totals.violations+=row.violationCount;
      report.totals.reviewNeeded+=row.incompleteCount;
      // Capture all main-area rendered links, not an arbitrary 12-link sample.
      // Each link's contextual label and city are retained for human review.
      if(label==='desktop') {
        const links=await page.locator('main a[href]').evaluateAll(anchors=>
          anchors.filter(a=>a.getClientRects().length).map(a=>({
            href:a.href,label:(a.textContent || a.getAttribute('aria-label') || '').trim().slice(0,180)
          })).filter(x=>/^https?:\/\//i.test(x.href))
        );
        result.linksFromCity=links.length;
        for(const link of links){
          let entry=allLinks.get(link.href);
          if(!entry){entry={href:link.href,category:link.href.startsWith(origin+'/')?'internal':'external',contexts:[]};allLinks.set(link.href,entry);}
          entry.contexts.push({city,label:link.label});
        }
      }
    } catch (err) {
      row.errors.push(String(err));
    } finally {
      await context.close();
    }
    report.totals.cases++;
    console.log('A11Y',city,label,JSON.stringify({
      render:row.render,axeStatus:row.axeStatus,violations:row.violationCount,
      incomplete:row.incompleteCount,error:row.errors[0]||null
    }));
  }
}
// One HTTP check per distinct rendered destination, across all cities.
// An origin 404 is a candidate defect; robots/403, 429 and timeouts
// may be deliberate rate limits and MUST be editorially reviewed.
const targets=[...allLinks.values()];
const probe=await browser.newContext({ignoreHTTPSErrors:false});
let index=0;
async function worker(){
  while(index<targets.length){
    const item=targets[index++];
    const attempts=[];
    let finalStatus=null, finalUrl=null;
    for(let n=0;n<2;n++){
      try {
        const response=await probe.request.get(item.href,{timeout:12000,maxRedirects:6});
        finalStatus=response.status();
        finalUrl=response.url();
        attempts.push({status:finalStatus,url:finalUrl});
        await response.dispose();
        if(finalStatus>=200&&finalStatus<400)break;
        if([401,403,429].includes(finalStatus))break;
      }catch(e){attempts.push({error:String(e).slice(0,320)})}
    }
    item.attempts=attempts;
    item.finalStatus=finalStatus;
    item.finalUrl=finalUrl;
    item.classification=finalStatus>=200&&finalStatus<400
      ? (finalUrl && finalUrl!==item.href?'REDIRECT_CHECK_CONTEXT':'HTTP_SUCCESS')
      : [401,403,429].includes(finalStatus)?'ACCESS_OR_RATE_LIMIT_UNCONFIRMED'
      : finalStatus===404||finalStatus===410?'PERSISTENT_HTTP_CANDIDATE_REVIEW'
      : 'NETWORK_OR_STATUS_UNCONFIRMED';
    if(item.classification!=='HTTP_SUCCESS')report.totals.unconfirmedLinks++;
  }
}
await Promise.all(Array.from({length:4},()=>worker()));
await probe.close();
report.linkTargets=targets;
report.totals.links=targets.length;
} finally {
  await browser.close();
  await writeFile(out+'/independent-review.json',JSON.stringify(report,null,2)+'\n');
}
console.log('INDEPENDENT CITY A11Y/LINK DIAGNOSTIC',JSON.stringify(report.totals));
console.log('This output does NOT award full accessibility, link, visual or GIS certification.');
const failedRenders=report.cities.flatMap(c=>c.viewports).filter(x=>x.render!=='PASS');
if(failedRenders.length){console.error('Some city pages were not rendered; research artifact incomplete.');process.exitCode=1;}
