/**
 * Targeted follow-up for the raw axe 'incomplete' mobile horizontal table cells.
 * Scroll each reported element into view and rerun axe color-contrast on it.
 * NEVER treat a missing pass as verified; preserve all raw findings and review flags.
 * Also inventory editorial images/licensing on each school profile, separately
 * from general decorative site images and historical authoring assertions.
 */
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('/tmp/texasdefined-football-b004-a11y/node_modules/playwright-core');
const axe=require('/tmp/texasdefined-football-b004-a11y/node_modules/axe-core');
const root=(process.env.PRODUCTION_ORIGIN||'https://texasdefined.com').replace(/\/$/,'');
const schools=['arp','aspermont','athens','atlanta','aubrey','austin','austin-achieve','austin-akins','austin-anderson','austin-bowie','austin-crockett','austin-eastside','austin-johnson','austin-lake-travis','austin-lasa','austin-mccallum','austin-navarro','austin-northeast','austin-travis','austin-vandegrift','austin-westlake','avalon','axtell','azle','baird'];
const counties=['smith','stonewall','henderson','cass','denton','travis','ellis','mclennan','tarrant','callahan'];
const registry=JSON.parse(await readFile('docs/football-authority/REGISTRY.json','utf8'));
assert.deepEqual(registry.completedBatches.find(x=>x.number===4).slugs,schools,'Immutable roster mismatch');
const out='artifacts/football-b004-contrast-and-images';await mkdir(out,{recursive:true});
const report={schema:'b004-focused-contrast-and-image-v1',testedCommit:process.env.PRODUCTION_COMMIT_SHA||process.env.GITHUB_SHA||null,
 createdAt:new Date().toISOString(),disclaimer:'Real rendered Chrome and axe focused rescans are automated; not NVDA/VoiceOver, human WCAG or event/facility access certification.',
 rows:[],imageAudit:[],summary:{rawContrastIncomplete:0,focusedPass:0,focusedViolation:0,focusedStillIncomplete:0,focusedNoEvidence:0,imagePages:0,photosWithCompleteClaim:0,photosWithoutCompleteClaim:0}};
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
async function hydrate(page,url){
 const resp=await page.goto(root+url,{waitUntil:'domcontentloaded',timeout:50000});
 if(resp?.status()!==200)throw Error('Non-200 '+resp?.status()+' '+url);
 await page.locator('main h1').first().waitFor({state:'visible',timeout:30000});
 await page.waitForTimeout(850);
}
try{
 for(const slug of [...schools,...counties.map(x=>'county-'+x)]){
  const isSchool=!slug.startsWith('county-'),route=isSchool?'/texas-high-school-football-teams/'+slug:'/county/'+slug.slice(7);
  const row={id:slug,route,rawIncomplete:0,rawViolation:0,focused:[],errors:[]};report.rows.push(row);
  const page=await context.newPage();
  try{
   await hydrate(page,route);
   // County tax tables load client-side after the heading appears. Await real
   // populated table rows for all nine counties represented in the 255-node
   // initial audit, or fail closed rather than reporting a false zero.
   if(!isSchool && slug!=='county-ellis'){
     await page.locator('main [role="region"][aria-label$="property tax rates table"] table tbody tr').first()
       .waitFor({state:'visible',timeout:28000});
   }
   if(slug==='austin-westlake'){
     await page.locator('main [role="region"] table tbody tr').first()
       .waitFor({state:'visible',timeout:28000});
   }
   if(isSchool){
    const imageItems=await page.locator('main figure').evaluateAll(nodes=>nodes.filter(el=>el.querySelector('img')).map(el=>{
      const img=el.querySelector('img');const links=[...el.querySelectorAll('a[href]')];
      const license=links.find(a=>/creativecommons|license|public domain/i.test(a.href+' '+a.textContent));
      const credit=links.find(a=>a!==license);
      return {src:img.currentSrc||img.src,alt:img.alt,credit:credit?.textContent?.trim()||null,creditURL:credit?.href||null,
        licenseText:license?.textContent?.trim()||null,licenseURL:license?.href||null,caption:el.querySelector('figcaption')?.textContent?.trim().slice(0,300)||null};
    }));
    const externalLinkCount=await page.locator('main a[href^="http"]').count();
    report.imageAudit.push({slug,editorialPhotos:imageItems,externalLinkCount});
    report.summary.imagePages++;
    for(const p of imageItems){
      if(p.alt&&p.credit&&p.creditURL&&p.licenseURL&&p.licenseText){report.summary.photosWithCompleteClaim++}
      else {report.summary.photosWithoutCompleteClaim++}
    }
   }
   // Single initial scan on entire mobile page: same rule as previous 255 incomplete.
   await page.addScriptTag({content:axe.source});
   const scan=await page.evaluate(()=>window.axe.run(document,{runOnly:{type:'rule',values:['color-contrast']},resultTypes:['violations','incomplete']}));
   const raw=scan.incomplete.filter(x=>x.id==='color-contrast').flatMap(x=>x.nodes);
   row.rawIncomplete=raw.length;row.rawViolation=scan.violations.flatMap(x=>x.nodes).length;
   report.summary.rawContrastIncomplete+=raw.length;
   for(const [i,node] of raw.entries()){
    const selector=String(node.target?.[0]||'');
    const item={selector,originalReason:(node.failureSummary||'').slice(0,250),status:'NO_EVIDENCE'};
    row.focused.push(item);
    try{
     const found=await page.evaluate(s=>{
       const e=document.querySelector(s);if(!e)return {found:false};
       e.scrollIntoView({block:'center',inline:'center',behavior:'instant'});
       const rect=e.getBoundingClientRect();const parents=[];let a=e.parentElement;
       while(a){const st=getComputedStyle(a);if(/auto|scroll/.test(st.overflowX)&&a.scrollWidth>a.clientWidth)parents.push({left:a.scrollLeft,width:a.clientWidth,scrollWidth:a.scrollWidth});a=a.parentElement}
       return {found:true,text:e.textContent?.trim().slice(0,60),rect:{left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom,width:rect.width},parents};
     },selector);
     item.scrolled=found;
     if(!found.found){item.status='NOT_FOUND'}
     else if(found.rect.width<1 || found.rect.right<=0 || found.rect.left>=390){item.status='NOT_VISIBLE_AFTER_SCROLL'}
     else{
       // A fresh axe measurement of the original element after the relevant
       // horizontal scroll; absence from results is NOT a passed assertion.
       const verdict=await page.evaluate(async selector=>{
          const element=document.querySelector(selector);
          if(!element)return {pass:0,violation:0,incomplete:0};
          const res=await window.axe.run(element,{runOnly:{type:'rule',values:['color-contrast']},resultTypes:['passes','violations','incomplete']});
          return {pass:res.passes.filter(r=>r.id==='color-contrast').reduce((n,r)=>n+r.nodes.length,0),
            violation:res.violations.filter(r=>r.id==='color-contrast').reduce((n,r)=>n+r.nodes.length,0),
            incomplete:res.incomplete.filter(r=>r.id==='color-contrast').reduce((n,r)=>n+r.nodes.length,0)};
       },selector);
       item.rescan=verdict;
       item.status=verdict.violation?'FAIL_CONTRAST':verdict.incomplete?'INCOMPLETE_AFTER_SCROLL':verdict.pass?'PASS_AFTER_SCROLL':'NO_EVIDENCE';
     }
    }catch(e){item.status='RESCAN_ERROR';item.error=String(e).slice(0,240)}
    if(item.status==='PASS_AFTER_SCROLL')report.summary.focusedPass++;
    else if(item.status==='FAIL_CONTRAST')report.summary.focusedViolation++;
    else if(item.status==='INCOMPLETE_AFTER_SCROLL')report.summary.focusedStillIncomplete++;
    else report.summary.focusedNoEvidence++;
   }
   console.log('B004 focused contrast',JSON.stringify({slug,raw:row.rawIncomplete,focused:row.focused.reduce((a,r)=>(a[r.status]=(a[r.status]||0)+1,a),{}),images:isSchool?report.imageAudit.at(-1).editorialPhotos.length:null}));
  }catch(e){row.errors.push(String(e).slice(0,500));console.log('B004 focused test ERROR',slug,String(e).slice(0,200))}
  finally{await page.close()}
 }
}finally{await context.close();await browser.close()}
report.summary.unreviewed=report.summary.rawContrastIncomplete-report.summary.focusedPass;
report.summary.errors=report.rows.filter(x=>x.errors.length).map(x=>x.id);
report.summary.status=report.summary.focusedViolation||report.summary.focusedNoEvidence||report.summary.focusedStillIncomplete||report.summary.photosWithoutCompleteClaim||report.summary.errors.length||report.summary.unreviewed
 ?'MANUAL_REVIEW_OR_DEFECT_PENDING':'AUTOMATED_RESOLVED_WITHOUT_MANUAL_AT_CERTIFICATION';
await writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log('Batch004 all focused contrast and editorial image findings',JSON.stringify(report.summary));
assert(!report.summary.focusedViolation,'Confirmed focused contrast failure');
assert(!report.summary.errors.length,'Unusable audit routes');
assert(!report.summary.photosWithoutCompleteClaim,'Photo credited without complete license claim');
assert.equal(report.summary.unreviewed,0,'Some original contrast incompletes remain unresolved on focused rescans');
