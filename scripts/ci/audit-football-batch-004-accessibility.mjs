/**
 * Live Batch 004 diagnostic: browser-rendered axe A/AA, semantic AX tree,
 * sampled keyboard tabs, and full-page screenshots for every school viewport.
 * Not a manual WCAG certification or live stadium-accessibility assessment.
 */
import assert from 'node:assert/strict';
import { mkdir,readFile,writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('/tmp/texasdefined-football-b004-a11y/node_modules/playwright-core');
const axe=require('/tmp/texasdefined-football-b004-a11y/node_modules/axe-core');
const origin=(process.env.PRODUCTION_ORIGIN||'https://texasdefined.com').replace(/\/$/,'');
const out='artifacts/football-batch-004-accessibility';
const schools=[
'arp','aspermont','athens','atlanta','aubrey','austin','austin-achieve',
'austin-akins','austin-anderson','austin-bowie','austin-crockett',
'austin-eastside','austin-johnson','austin-lake-travis','austin-lasa',
'austin-mccallum','austin-navarro','austin-northeast','austin-travis',
'austin-vandegrift','austin-westlake','avalon','axtell','azle','baird'];
const counties=['smith','stonewall','henderson','cass','denton','travis','ellis','mclennan','tarrant','callahan'];
const registry=JSON.parse(await readFile('docs/football-authority/REGISTRY.json','utf8'));
const batch=registry.completedBatches?.find(x=>x.number===4);
assert(batch && batch.individuallyVerified===25,'Batch 004 completion evidence missing');
assert.deepEqual(batch.slugs,schools,'immutable Batch 004 roster changed');
const locations=[...schools.map(x=>({id:'school-'+x,path:'/texas-high-school-football-teams/'+x})),
 ...counties.map(x=>({id:'county-'+x,path:'/county/'+x})),{id:'city-austin',path:'/city/austin'}];
const report={schema:'football-b004-a11y-v1',createdAt:new Date().toISOString(),
 testedCommit:process.env.PRODUCTION_COMMIT_SHA||process.env.GITHUB_SHA||null,
 limitation:'Automated axe A/AA, Chrome accessibility tree, sampled tabs and screenshots. NOT manual screen-reader, full WCAG, 400% zoom, color overlay or event/ADA certification.',
 schools,results:[],summary:{checks:0,renderFailures:0,semanticFailures:0,axeViolationNodes:0,axeIncompleteNodes:0,keyboardReviewCases:0,runtimeFailures:0}};
await mkdir(out,{recursive:true});
const summarize=r=>({id:r.id,impact:r.impact,help:r.help,
 nodes:r.nodes.map(n=>({target:n.target,html:(n.html||'').slice(0,420),failure:(n.failureSummary||'').slice(0,500)}))});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',
 args:['--no-sandbox','--disable-dev-shm-usage']});
try {
 for(const [viewport,width,height,mobile] of [['desktop',1366,900,false],['mobile',390,844,true]]) {
  const context=await browser.newContext({viewport:{width,height},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1});
  try {
   for(const item of locations) {
    const page=await context.newPage(), row={viewport,id:item.id,path:item.path,
      http:null,render:'UNVERIFIED',axe:'UNVERIFIED',violations:[],incomplete:[],
      ax:{},semantics:{},keyboard:[],keyboardStatus:'UNVERIFIED',errors:[],runtime:[],recoveredNetworkErrors:[]};
    report.results.push(row);report.summary.checks++;
    page.on('pageerror',e=>row.runtime.push(e.message));
    try {
     // Do not mistake a site-shell H1 for the hydrated page's main heading.
     // Only a genuine transient navigation/module-load failure may get one retry.
     const transientModule=e=>/Failed to fetch dynamically imported module|Importing a module script failed|Failed to load module script/i.test(e);
     let ready=false;
     for(let attempt=1;attempt<=2;attempt++){
      try{
       const response=await page.goto(origin+item.path,{waitUntil:'domcontentloaded',timeout:55000});
       row.http=response?.status()||0;
       if(row.http!==200)throw Error('Non-200 response '+row.http);
       await page.locator('main h1').first().waitFor({state:'visible',timeout:25000});
       await page.waitForTimeout(950);
      }catch(e){
       const message=String(e?.message||e);
       const isTransientNavigation=/(?:net::ERR_|Failed to fetch dynamically imported module|Importing a module script failed)/i.test(message)
        || (row.http>=500 && row.http<=504)
        || (row.runtime.length>0 && row.runtime.every(transientModule));
       if(attempt!==1||!isTransientNavigation)throw e;
       row.recoveredNetworkErrors.push({attempt,http:row.http,error:message,runtime:[...row.runtime]});
       row.runtime.length=0;
       continue;
      }
      if(attempt===1&&row.runtime.length>0&&row.runtime.every(transientModule)){
       row.recoveredNetworkErrors.push({attempt,http:row.http,runtime:[...row.runtime]});
       row.runtime.length=0;
       continue;
      }
      ready=true;
      break;
     }
     if(!ready)throw Error('Main page content did not reach the hydrated audit-ready state');
     row.render='PASS';
     const captureSemantics=()=>page.evaluate((expectedViewportWidth)=>({
       mainCount:document.querySelectorAll('main').length,
       h1s:[...document.querySelectorAll('main h1')].map(x=>x.textContent.trim()),
       unlabeledLinks:[...document.querySelectorAll('main a[href]')].filter(x=>x.getClientRects().length&&
         !String(x.getAttribute('aria-label')||x.textContent||x.getAttribute('title')||'').trim()).map(x=>x.outerHTML.slice(0,280)),
       imagesWithoutAlt:[...document.querySelectorAll('main img')].filter(x=>x.getClientRects().length&&!x.hasAttribute('alt')).map(x=>x.src),
       overflow:Math.max(0,document.documentElement.scrollWidth-expectedViewportWidth)
     }),width);
     row.semantics=await captureSemantics();
     // Hydrated route transitions can temporarily remove an H1 after the
     // initial visible heading. One bounded resample distinguishes transient
     // rendering from a persistently missing semantic heading. Do not waive
     // the exact-one-H1 requirement, and record every recovery.
     if(row.semantics.h1s.length!==1){
       row.headingResample={initialCount:row.semantics.h1s.length,reason:'Heading changed after hydration'};
       await page.locator('main h1').first().waitFor({state:'visible',timeout:15000});
       await page.waitForTimeout(350);
       row.semantics=await captureSemantics();
       row.headingResample.finalCount=row.semantics.h1s.length;
     }
     if(row.semantics.overflow>10) row.errors.push('Horizontal scroll overflow '+row.semantics.overflow+'px in '+width+'px viewport');
     const cdp=await context.newCDPSession(page);
     const tree=await cdp.send('Accessibility.getFullAXTree');
     await cdp.detach();
     const nodes=tree.nodes.filter(x=>!x.ignored);
     row.ax={mains:nodes.filter(x=>x.role?.value==='main').length,
       unnamedLinks:nodes.filter(x=>x.role?.value==='link'&&!String(x.name?.value||'').trim()).length,
       unnamedButtons:nodes.filter(x=>x.role?.value==='button'&&!String(x.name?.value||'').trim()).length};
     await page.addScriptTag({content:axe.source});
     const scan=await page.evaluate(async()=>window.axe.run(document,{
       runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']},
       resultTypes:['violations','incomplete']}));
     row.violations=scan.violations.map(summarize);
     row.incomplete=scan.incomplete.map(summarize);
     row.violationNodes=row.violations.reduce((a,x)=>a+x.nodes.length,0);
     row.incompleteNodes=row.incomplete.reduce((a,x)=>a+x.nodes.length,0);
     row.axe=row.violationNodes?'VIOLATIONS_DETECTED':'PASS_AUTOMATED_ONLY';
     const first=page.locator('main a[href]:visible').first();
     if(await first.count()){
      await first.focus();
      for(let n=0;n<6;n++){
       await page.keyboard.press('Tab');
       row.keyboard.push(await page.evaluate(()=>{
        const x=document.activeElement,s=getComputedStyle(x),b=x.getBoundingClientRect();
        return {tag:x.tagName,name:String(x.getAttribute('aria-label')||x.textContent||x.getAttribute('title')||'').trim().slice(0,90),
          visible:b.width>0&&b.height>0&&s.visibility!=='hidden',focusVisible:x.matches(':focus-visible'),
          focusIndicator:(s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>=1)||s.boxShadow!=='none'};
       }));
      }
      row.keyboardStatus=row.keyboard.every(x=>x.visible&&x.name&&x.focusVisible&&x.focusIndicator)?'PASS_SAMPLED_TABS':'REVIEW_REQUIRED';
     }else row.keyboardStatus='REVIEW_NO_MAIN_LINKS';
     if(item.id.startsWith('school-')||['county-travis','county-smith','city-austin'].includes(item.id)){
      const screenshot=await page.screenshot({path:out+'/'+viewport+'-'+item.id+'-full.png',animations:'disabled',fullPage:true,timeout:45000});
      row.fullPageScreenshotWidth=screenshot.readUInt32BE(16);
      if(row.fullPageScreenshotWidth>width+10)row.errors.push('Full-page PNG '+row.fullPageScreenshotWidth+'px exceeds '+width+'px viewport');
     }
     if(row.semantics.mainCount!==1||row.semantics.h1s.length!==1||row.semantics.unlabeledLinks.length
        ||row.semantics.imagesWithoutAlt.length||row.ax.mains!==1||row.ax.unnamedLinks||row.ax.unnamedButtons)
      row.errors.push('Unexpected landmark/heading/name/image-alt accessibility semantics');
    }catch(e){row.errors.push(String(e?.message||e).slice(0,500));}
    finally{
     if(row.render!=='PASS')report.summary.renderFailures++;
     if(row.errors.length)report.summary.semanticFailures++;
     if(row.runtime.length)report.summary.runtimeFailures++;
     if(row.keyboardStatus!=='PASS_SAMPLED_TABS')report.summary.keyboardReviewCases++;
     report.summary.axeViolationNodes+=row.violationNodes||0;
     report.summary.axeIncompleteNodes+=row.incompleteNodes||0;
     console.log('B004 a11y',JSON.stringify({id:row.id,view:viewport,http:row.http,axe:row.axe,
       violations:row.violationNodes,keyboard:row.keyboardStatus,errors:row.errors,runtime:row.runtime.length}));
     await page.close();
    }
   }
  }finally{await context.close()}
 }
}finally{await browser.close()}
report.summary.verdict=(report.summary.renderFailures||report.summary.semanticFailures||report.summary.runtimeFailures||report.summary.axeViolationNodes||report.summary.keyboardReviewCases)
 ?'ISSUES_DETECTED':'NO_AUTOMATED_VIOLATIONS_DETECTED';
report.summary.reviewStatus=report.summary.axeIncompleteNodes ? 'AUTOMATED_CHECKS_WITH_INCOMPLETE_ITEMS_REQUIRING_REVIEW' : 'NO_INCOMPLETE_AXE_ITEMS';
await writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log('FINAL B004 ACCESSIBILITY DIAGNOSTIC',JSON.stringify(report.summary));
if(report.summary.verdict==='ISSUES_DETECTED')process.exitCode=1;
