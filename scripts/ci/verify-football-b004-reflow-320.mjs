/**
 * WCAG 1.4.10 automated RE-FLOW proxy: 1280px desktop reduced to a
 * 320 CSS-pixel content viewport (the layout available at 400% browser zoom).
 * This is NOT a claim that a human performed native browser zoom or used AT.
 * Two-dimensional data tables may independently scroll horizontally while
 * the document itself MUST NOT require horizontal page scrolling.
 */
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('/tmp/texasdefined-football-b004-a11y/node_modules/playwright-core');
const axe=require('/tmp/texasdefined-football-b004-a11y/node_modules/axe-core');
const origin=(process.env.PRODUCTION_ORIGIN||'https://texasdefined.com').replace(/\/$/,'');
const schools=['arp','aspermont','athens','atlanta','aubrey','austin','austin-achieve',
'austin-akins','austin-anderson','austin-bowie','austin-crockett','austin-eastside',
'austin-johnson','austin-lake-travis','austin-lasa','austin-mccallum','austin-navarro',
'austin-northeast','austin-travis','austin-vandegrift','austin-westlake','avalon',
'axtell','azle','baird'];
const counties=['smith','stonewall','henderson','cass','denton','travis','ellis','mclennan','tarrant','callahan'];
const citySchools=['austin','austin-achieve','austin-akins','austin-anderson','austin-bowie',
'austin-crockett','austin-eastside','austin-johnson','austin-lasa','austin-mccallum',
'austin-navarro','austin-northeast','austin-travis','austin-vandegrift'];
const registry=JSON.parse(await readFile('docs/football-authority/REGISTRY.json','utf8'));
const batch=registry.completedBatches?.find(x=>x.number===4);
assert.deepEqual(batch?.slugs,schools,'Batch004 25-school immutable roster changed');
const destinations=[
 ...schools.map(slug=>({kind:'school',slug,path:'/texas-high-school-football-teams/'+slug})),
 ...counties.map(slug=>({kind:'county',slug,path:'/county/'+slug})),
 {kind:'city',slug:'austin',path:'/city/austin'}
];
const pathOut='artifacts/football-b004-reflow-320';await mkdir(pathOut,{recursive:true});
const report={schema:'football-b004-wcag1410-reflow-proxy-v1',
 createdAt:new Date().toISOString(),testedCommit:process.env.PRODUCTION_COMMIT_SHA||process.env.GITHUB_SHA||null,
 method:'320 CSS-pixel rendered browser viewport, corresponding to CSS layout width at 400% zoom on a 1280px reference viewport. Not native GUI browser zoom; not an assistive-technology or manual WCAG certificate.',
 results:[],summary:{cases:0,passes:0,failures:0,axeViolationNodes:0,axeIncompleteNodes:0,focusedContrastPasses:0,focusedContrastRemaining:0,focusedContrastViolations:0,recoveredTransient:0,cityReturnLinks:0,cityInboundLinks:0,fullScreenshots:0}};
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',
 args:['--no-sandbox','--disable-dev-shm-usage']});
const context=await browser.newContext({viewport:{width:320,height:800},isMobile:false,hasTouch:false,deviceScaleFactor:1});
try{
 for(const item of destinations){
  const row={kind:item.kind,slug:item.slug,path:item.path,http:null,passed:false,errors:[],axeViolations:[],axeIncompletes:[],recoveredTransient:[],semantics:{},links:{}};
  report.results.push(row);report.summary.cases++;
  const page=await context.newPage(),runtime=[];
  page.on('pageerror',e=>runtime.push(String(e.message||e).slice(0,220)));
  try{
   let ready=false;
   for(let attempt=1;attempt<=2;attempt++){
    try{
     const res=await page.goto(origin+item.path,{waitUntil:'domcontentloaded',timeout:55000});
     row.http=res?.status()||0;
     if(row.http!==200)throw Error('HTTP '+row.http);
     await page.locator('main h1').first().waitFor({state:'visible',timeout:25000});
     await page.waitForTimeout(850);
     ready=true;break;
    }catch(e){
     const msg=String(e?.message||e);
     const transient=/net::ERR_|Failed to fetch dynamically imported module|Importing a module script failed/i.test(msg)||[502,503,504].includes(row.http);
     if(attempt===2||!transient)throw e;
     row.recoveredTransient.push(msg.slice(0,200));report.summary.recoveredTransient++;
    }
   }
   if(!ready)throw Error('Route failed to hydrate');
   // Hydration of the shell H1 does not guarantee the county tax tables or
   // Westlake's schedule have populated. Await real table rows before axe:
   // otherwise an incompletely loaded page can produce a false contrast pass.
   if(item.kind==='county' && item.slug!=='ellis'){
     await page.locator('main [role="region"][aria-label$="property tax rates table"] table tbody tr').first()
       .waitFor({state:'visible',timeout:28000});
   }
   if(item.kind==='school' && item.slug==='austin-westlake'){
     await page.locator('main [role="region"] table tbody tr').first()
       .waitFor({state:'visible',timeout:28000});
   }
   row.semantics=await page.evaluate(()=>{
     const doc=document.documentElement,main=document.querySelector('main');
     const h1=main?.querySelector('h1');
     const h1rect=h1?.getBoundingClientRect();
     const tables=[...(main?.querySelectorAll('table')||[])].map(el=>{
        let a=el.parentElement,scroll=null;
        while(a){const cs=getComputedStyle(a);
          if(/auto|scroll/.test(cs.overflowX)&&a.scrollWidth>a.clientWidth){scroll={label:a.getAttribute('aria-label'),tabIndex:a.tabIndex,scrollWidth:a.scrollWidth,clientWidth:a.clientWidth};break}
          a=a.parentElement;
        }
        return {scrollableContainer:scroll,tableWidth:el.scrollWidth};
     });
     return {clientWidth:doc.clientWidth,scrollWidth:doc.scrollWidth,
       bodyScrollWidth:document.body.scrollWidth,
       viewportWidth:window.innerWidth,mainCount:document.querySelectorAll('main').length,
       h1Text:h1?.textContent?.trim().slice(0,110)||'',h1Rect:h1rect?{x:h1rect.x,right:h1rect.right,width:h1rect.width}:null,
       tables,unlabeledImages:[...(main?.querySelectorAll('img')||[])].filter(x=>x.getClientRects().length&&!x.hasAttribute('alt')).map(x=>x.src),
       unnamedMainLinks:[...(main?.querySelectorAll('a[href]')||[])].filter(x=>x.getClientRects().length&&!String(x.getAttribute('aria-label')||x.textContent||x.title||'').trim()).length};
   });
   if(row.semantics.clientWidth!==320)row.errors.push('unexpected CSS viewport '+row.semantics.clientWidth);
   if(row.semantics.scrollWidth>328||row.semantics.bodyScrollWidth>328)
     row.errors.push('document-wide horizontal overflow at reflow width: '+row.semantics.scrollWidth+'/'+row.semantics.bodyScrollWidth);
   if(row.semantics.mainCount!==1||!row.semantics.h1Text)row.errors.push('missing main landmark or hydrated heading');
   if(row.semantics.h1Rect&&(row.semantics.h1Rect.x<-8||row.semantics.h1Rect.right>328))
     row.errors.push('main heading extends beyond 320px viewport');
   if(row.semantics.unlabeledImages.length)row.errors.push('visible image missing alt');
   if(row.semantics.unnamedMainLinks)row.errors.push(row.semantics.unnamedMainLinks+' unlabeled main links');
   for(const t of row.semantics.tables)if(t.tableWidth>328&&(!t.scrollableContainer||t.scrollableContainer.tabIndex<0||!t.scrollableContainer.label))
     row.errors.push('oversize data table lacks named keyboard-scroll region');
   if(item.kind==='city'){
     row.links.cityInbound=await page.evaluate(slugs=>Object.fromEntries(slugs.map(slug=>[slug,
       [...document.querySelectorAll('main a[href]')].some(a=>a.getAttribute('href')?.replace(/\/$/,'')==='/texas-high-school-football-teams/'+slug)
     ])),citySchools);
     report.summary.cityInboundLinks=Object.values(row.links.cityInbound).filter(Boolean).length;
     for(const [slug,ok] of Object.entries(row.links.cityInbound))if(!ok)row.errors.push('missing Austin inbound school link: '+slug);
   }
   if(item.kind==='school'&&citySchools.includes(item.slug)){
     row.links.cityReturn=await page.locator('main a[href="/city/austin"]').count()>0;
     if(row.links.cityReturn)report.summary.cityReturnLinks++;
     else row.errors.push('missing reciprocal school-to-Austin link');
   }
   await page.addScriptTag({content:axe.source});
   const scan=await page.evaluate(()=>window.axe.run(document,{
      runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']},
      resultTypes:['violations','incomplete']}));
   row.axeViolations=scan.violations.map(rule=>({id:rule.id,impact:rule.impact,nodes:rule.nodes.map(n=>({target:n.target,summary:(n.failureSummary||'').slice(0,260)}))}));
   row.axeIncompletes=scan.incomplete.map(rule=>({id:rule.id,count:rule.nodes.length}));
   const violations=row.axeViolations.reduce((a,x)=>a+x.nodes.length,0);
   report.summary.axeViolationNodes+=violations;
   report.summary.axeIncompleteNodes+=row.axeIncompletes.reduce((a,x)=>a+x.count,0);
   if(violations)row.errors.push(violations+' confirmed axe violation nodes');

   // Axe cannot infer the background of cells hidden within scrollable data
   // tables. Move every original incomplete color-contrast node into view and
   // demand a fresh axe PASS. Missing results are NOT proof of compliance.
   const uncertain=scan.incomplete.filter(rule=>rule.id==='color-contrast')
     .flatMap(rule=>rule.nodes.map(n=>({selector:String(n.target?.[0]||''),
       reason:(n.failureSummary||'').slice(0,220)})));
   row.focusedContrast=[];
   for(const original of uncertain){
     const finding={...original,result:'UNRESOLVED'};
     row.focusedContrast.push(finding);
     try{
       const scrolled=await page.evaluate(selector=>{
         const el=document.querySelector(selector);
         if(!el)return {found:false};
         el.scrollIntoView({block:'center',inline:'center',behavior:'instant'});
         const r=el.getBoundingClientRect();
         return {found:true,rect:{left:r.left,right:r.right,width:r.width,top:r.top,bottom:r.bottom}};
       },finding.selector);
       finding.scrolled=scrolled;
       if(!scrolled.found){finding.result='ELEMENT_MISSING'}
       else if(scrolled.rect.width<1||scrolled.rect.right<=0||scrolled.rect.left>=320)
         finding.result='ELEMENT_OFFSCREEN_AFTER_SCROLL';
       else{
         const result=await page.evaluate(async selector=>{
           const el=document.querySelector(selector);if(!el)return {passes:0,violations:0,incomplete:0};
           const result=await window.axe.run(el,{
             runOnly:{type:'rule',values:['color-contrast']},
             resultTypes:['passes','violations','incomplete']});
           const n=arr=>arr.filter(x=>x.id==='color-contrast').reduce((sum,x)=>sum+x.nodes.length,0);
           return {passes:n(result.passes),violations:n(result.violations),incomplete:n(result.incomplete)};
         },finding.selector);
         finding.rescan=result;
         finding.result=result.violations?'CONTRAST_VIOLATION':
           result.incomplete?'INCOMPLETE_AFTER_SCROLL':
           result.passes?'PASS_AFTER_SCROLL':'NO_VERIFIABLE_RESULT';
       }
     }catch(e){finding.result='RESCAN_ERROR';finding.error=String(e).slice(0,220)}
     if(finding.result==='PASS_AFTER_SCROLL')report.summary.focusedContrastPasses++;
     else if(finding.result==='CONTRAST_VIOLATION'){report.summary.focusedContrastViolations++;row.errors.push('confirmed focused contrast violation: '+finding.selector)}
     else{report.summary.focusedContrastRemaining++;row.errors.push('unresolved focused contrast: '+finding.selector+' ('+finding.result+')')}
   }

   // Sample keyboard focusability at the constrained width; separately,
   // real keyboard and screen reader acceptance still needs manual use.
   const first=page.locator('main a[href]:visible').first();
   if(await first.count()){
     await first.focus();
     const samples=[];
     for(let i=0;i<4;i++){
       await page.keyboard.press('Tab');
       samples.push(await page.evaluate(()=>{
         const x=document.activeElement,s=getComputedStyle(x),r=x.getBoundingClientRect();
         return {name:String(x.getAttribute('aria-label')||x.textContent||x.getAttribute('title')||'').trim().slice(0,70),
           visible:r.width>0&&r.height>0&&s.visibility!=='hidden',
           focusVisible:x.matches(':focus-visible'),indicator:(s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>=1)||s.boxShadow!=='none'};
       }));
     }
     row.keyboard=samples;
     if(!samples.every(x=>x.name&&x.visible&&x.focusVisible&&x.indicator))
       row.errors.push('sampled keyboard focus needs manual review');
   }
   if(['austin','austin-achieve','austin-vandegrift','austin-westlake'].includes(item.slug)||item.kind==='city'){
      const file=pathOut+'/reflow320-'+item.kind+'-'+item.slug+'.png';
      await page.screenshot({path:file,fullPage:true,timeout:45000,animations:'disabled'});
      row.screenshot=file;report.summary.fullScreenshots++;
   }
   row.passed=row.errors.length===0;
  }catch(e){row.errors.push(String(e?.stack||e).slice(0,800));row.passed=false}
  finally{await page.close()}
  if(row.passed)report.summary.passes++;else report.summary.failures++;
  console.log('B004 reflow',item.kind,item.slug,row.passed?'PASS':'FAIL',row.errors.join(' | '));
 }
}finally{await context.close();await browser.close()}
await writeFile(pathOut+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log('Batch004 320px reflow summary',JSON.stringify(report.summary));
assert.equal(report.summary.cases,36,'Scope must cover 25 schools + 10 counties + Austin city');
assert.equal(report.summary.cityInboundLinks,14,'14 Austin city inbound school links required');
assert.equal(report.summary.cityReturnLinks,14,'14 Austin school return links required');
assert.equal(report.summary.focusedContrastRemaining,0,'All initial incomplete color-contrast nodes must be resolved by scroll-to-visible rescans');
assert.equal(report.summary.focusedContrastViolations,0,'No confirmed focus-rescan contrast violations permitted');
assert.equal(report.summary.failures,0,'Reflow failures must be investigated, not marked accepted');
