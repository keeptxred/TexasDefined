#!/usr/bin/env node
// Strict live Chrome acceptance for all 25 Batch 008 team guides.
// Test evidence only. NEVER automatically promote registry status.
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('/tmp/td-b008-chrome/node_modules/playwright-core');
const site='https://texasdefined.com',out='artifacts/b008-targeted-browser';
const reg=JSON.parse(await readFile('docs/football-authority/REGISTRY.json','utf8'));
const editorial=await readFile('src/data/high-school-football/program-editorial-b008.ts','utf8');
const route=await readFile('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx','utf8');
assert.equal(reg.batch.number,8);
const slugs=reg.batch.slugs;
assert.equal(slugs.length,25);
assert.equal(new Set(slugs).size,25);
const visualSection=route.split('const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS = new Set([')[1]?.split(']);')[0];
const countySection=route.split('const researchedCampusCounty:')[1]?.split(/\n\s*};/)[0];
assert.ok(visualSection&&countySection);
const schools=[];
for(const slug of slugs){
 const entry=reg.schoolRecords.find(x=>x.batch===8&&x.slug===slug);
 assert.ok(entry&&['IMPLEMENTED','MERGED','DEPLOYED','VERIFIED'].includes(entry.status),'Incomplete school '+slug);
 assert.equal(entry.audit,'docs/football-authority/schools/'+slug+'.md');
 const dossier=await readFile(entry.audit,'utf8');
 assert.ok(dossier.length>300&&dossier.includes('https://'),'Missing sourced dossier '+slug);
 assert.ok(editorial.includes('slug: '+String.fromCharCode(39)+slug+String.fromCharCode(39)),
   'No school-specific editorial '+slug);
 assert.ok(visualSection.includes(String.fromCharCode(39)+slug+String.fromCharCode(39)),
   'Original source-derived graphic not enabled: '+slug);
 const mapping=countySection.split('\n').find(line=>line.trimStart().startsWith(String.fromCharCode(39)+slug+String.fromCharCode(39)+':'));
 const county=mapping?.match(/:\s*'([a-z-]+)'/)?.[1];
 assert.ok(county,'No sourced county mapping for '+slug);
 schools.push({slug,county});
}
await mkdir(out,{recursive:true});
const report={version:1,sourceCommit:process.env.GITHUB_SHA||null,technicalOnly:true,manualWCAG:false,
 schoolChecks:[],countyChecks:[],sitemap:[],workerVersions:[],failures:[],screenshots:0};
const versions=new Set();
const xmlResponse=await fetch(site+'/sitemap.xml',{signal:AbortSignal.timeout(45000)});
const sitemap=await xmlResponse.text();
const locations=new Set([...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map(x=>x[1].trim().replace(/\/$/,'')));
for(const s of schools)if(!locations.has(site+'/texas-high-school-football-teams/'+s.slug))
 report.sitemap.push(s.slug);
if(xmlResponse.status!==200||report.sitemap.length)
 report.failures.push('Missing 25 exact sitemap URLs: '+report.sitemap.join(','));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',
 args:['--no-sandbox','--disable-dev-shm-usage']});
try{
 for(const school of schools)for(const [device,width,height] of [['desktop',1366,900],['mobile',390,844],['narrow',320,800]]){
  const context=await browser.newContext({viewport:{width,height}});
  const page=await context.newPage(), errors=[], row={slug:school.slug,device,width,pass:false,http:null};
  page.on('pageerror',e=>errors.push('React error '+String(e.message||e).slice(0,140)));
  page.on('response',r=>{if(r.status()>=400&&/\.(?:js|css)(?:\?|$)/.test(r.url()))errors.push('Asset '+r.status());});
  try{
   const path='/texas-high-school-football-teams/'+school.slug;
   const response=await page.goto(site+path,{waitUntil:'domcontentloaded',timeout:45000});
   row.http=response?.status()||0;
   const ver=await response?.headerValue('x-texasdefined-worker-version');
   if(ver)versions.add(ver);
   if(row.http!==200)throw new Error('HTTP '+row.http);
   await page.locator('main h1').first().waitFor({state:'visible',timeout:24000});
   await page.waitForLoadState('load',{timeout:22000});
   const facts=await page.evaluate(()=>{
    const links=[...document.querySelectorAll('main a[href]')].map(x=>x.getAttribute('href'));
    const graphic=document.querySelector('main figure[aria-label*="dated visual timeline of reported 2026 football finals"]');
    const cards=[...(graphic?.querySelectorAll('ol>li')||[])];
    return {
     h1:[...document.querySelectorAll('main h1')].map(x=>x.textContent),
     title:document.title,canonical:document.querySelector('link[rel="canonical"]')?.href||'',
     description:document.querySelector('meta[name="description"]')?.content||'',
     robots:document.querySelector('meta[name="robots"]')?.content||'',
     body:document.querySelector('main')?.innerText||'',
     schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>x.textContent).join(''),
     pageWidth:document.documentElement.scrollWidth,links,
     graphic:{present:!!graphic,width:graphic?.getBoundingClientRect().width||0,
      cards:cards.length,labels:cards.map(x=>x.getAttribute('aria-label')||''),
      sources:graphic?.querySelectorAll('a[href^="https://"]').length||0},
     images:[...document.images].filter(x=>x.getBoundingClientRect().width).map(x=>({alt:x.hasAttribute('alt'),broken:x.complete&&!x.naturalWidth}))
    };
   });
   if(facts.h1.length!==1||!/football/i.test(facts.h1[0]))errors.push('Invalid football H1');
   if(!/Football/.test(facts.title)||facts.description.length<45)errors.push('Missing SEO metadata');
   if(facts.canonical!==site+path||/noindex/i.test(facts.robots))errors.push('Canonical/robots failure');
   if(!facts.schema.includes('SportsTeam')||!facts.schema.includes('FAQPage'))errors.push('Missing schema');
   if(!facts.body.includes('2026'))errors.push('No dated season');
   if(!facts.links.includes('/county/'+school.county))errors.push('Missing reciprocal county outbound');
   if(facts.pageWidth>width+8)errors.push('Horizontal overflow');
   if(facts.images.some(x=>!x.alt||x.broken))errors.push('Broken image or missing alt');
   if(!facts.graphic.present||facts.graphic.cards<1||facts.graphic.sources<1||
      facts.graphic.width>width+8||
      !facts.graphic.labels.every(x=>/\b(?:Win|Loss|Tie) against\b/.test(x)))
    errors.push('Original source-backed results graphic defective');
   await page.screenshot({path:out+'/'+device+'-'+school.slug+'.png',animations:'disabled',timeout:15000});
   report.screenshots++;
   const figure=page.locator('main figure[aria-label*="dated visual timeline of reported 2026 football finals"]').first();
   if(await figure.count()){
    await figure.scrollIntoViewIfNeeded({timeout:7000});
    await figure.screenshot({path:out+'/graphic-'+device+'-'+school.slug+'.png',timeout:15000});
    report.screenshots++;
   }else errors.push('Missing graphic screenshot');
  }catch(e){errors.push(String(e.message||e).slice(0,220));}
  finally{
   row.issues=errors;row.pass=errors.length===0;report.schoolChecks.push(row);
   if(!row.pass)report.failures.push(school.slug+'/'+device+': '+errors.join('|'));
   console.log('B008',school.slug,device,row.pass?'PASS':'FAIL',errors.join('|'));
   await context.close();
  }
 }
 for(const county of [...new Set(schools.map(x=>x.county))]){
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();
  const group=schools.filter(x=>x.county===county);
  const row={county,slugs:group.map(x=>x.slug),pass:false,issues:[]};
  try{
   const response=await page.goto(site+'/county/'+county,{waitUntil:'load',timeout:45000});
   if(response?.status()!==200)throw new Error('County HTTP '+response?.status());
   const version=await response?.headerValue('x-texasdefined-worker-version');if(version)versions.add(version);
   const expected=group.map(x=>'/texas-high-school-football-teams/'+x.slug);
   await page.waitForFunction(paths=>{
    const links=[...document.querySelectorAll('main a[href]')].map(a=>a.getAttribute('href')?.replace(/\/$/,''));
    return paths.every(path=>links.includes(path));
   },expected,{timeout:25000});
   await page.screenshot({path:out+'/county-'+county+'.png',timeout:15000});
   report.screenshots++;
  }catch(e){
   row.issues.push(String(e.message||e).slice(0,220));
   // Preserve actual hydrated DOM and the full visible county navigation on
   // error. A code-only reciprocal link is not proof it rendered on production.
   // Diagnostics never replace the strict reciprocal-link assertion above.
   try {
    const diagnostics=await page.evaluate(()=>({
      title:document.title,pathname:location.pathname,
      hydrated:document.documentElement.dataset.tdFootballCountyHydrated||null,
      mainLinkCount:document.querySelectorAll('main a[href]').length,
      bullardAnywhere:[...document.querySelectorAll('a[href]')]
        .filter(a=>(a.getAttribute('href')||'').includes('/texas-high-school-football-teams/bullard'))
        .map(a=>({href:a.getAttribute('href'),text:(a.textContent||'').trim().slice(0,100)})),
      footballHeading:[...document.querySelectorAll('h2')].some(h=>(h.textContent||'').includes('Football history connected')),
      mainText:(document.querySelector('main')?.innerText||'').slice(0,1100)
    }));
    row.diagnostics=diagnostics;
    await writeFile(out+'/county-failure-'+county+'.json',JSON.stringify(diagnostics,null,2)+'\n');
    await writeFile(out+'/county-failure-'+county+'.html',(await page.content()).slice(0,2000000));
    await page.screenshot({path:out+'/county-failure-'+county+'.png',timeout:15000});
   } catch(diagnosticError) {
    row.issues.push('Diagnostic capture: '+String(diagnosticError.message||diagnosticError).slice(0,120));
   }
  }
  row.pass=row.issues.length===0;report.countyChecks.push(row);
  if(!row.pass)report.failures.push('County '+county+': '+row.issues.join('|'));
  await context.close();
 }
}finally{await browser.close();}
report.workerVersions=[...versions].sort();
if(versions.size!==1)report.failures.push('Expected one Worker version, found '+JSON.stringify(report.workerVersions));
if(report.schoolChecks.length!==75||report.schoolChecks.some(x=>!x.pass)||
   report.countyChecks.some(x=>!x.pass))report.failures.push('Strict school/county checks failed');
if(report.screenshots!==150+report.countyChecks.length)report.failures.push('Evidence screenshots missing');
await writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log('Batch008 evidence',JSON.stringify({checks:report.schoolChecks.length,
 counties:report.countyChecks.length,screenshots:report.screenshots,workerVersions:report.workerVersions,failures:report.failures.length}));
assert.equal(report.failures.length,0,'Unverified Batch008 production: '+report.failures.slice(0,5).join(' | '));
