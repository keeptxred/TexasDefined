#!/usr/bin/env node
// Batch012: real production Chrome, fail-closed on every assigned school and viewport.
import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {verifySchoolSitemapCoverage} from './verify-football-b011-sitemap-eligibility.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('/tmp/td-b012-chrome/node_modules/playwright-core');
const origin='https://texasdefined.com';
const reg=JSON.parse(readFileSync('docs/football-authority/REGISTRY.json','utf8'));
assert.equal(reg.batch.number,12);
assert.equal(reg.batch.slugs.length,25);
assert.equal(new Set(reg.batch.slugs).size,25);
assert.equal(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length,255);
for(const slug of reg.batch.slugs)assert.ok(reg.schoolRecords.some(s=>s.slug===slug&&s.batch===12&&s.status==='IMPLEMENTED'),'Unimplemented '+slug);
const source=process.env.FOOTBALL_CHROME_SOURCE_SHA||'';
const worker=process.env.FOOTBALL_EXPECTED_WORKER_VERSION||'';
assert.match(source,/^[a-f0-9]{40}$/);
assert.match(worker,/^[a-f0-9-]{36}$/);
const report={batch:12,sourceCommit:source,workerVersion:worker,schoolSlugs:reg.batch.slugs,schoolChecks:[],countyChecks:[],failures:[],technicalOnly:true};
mkdirSync('artifacts',{recursive:true});
const save=()=>writeFileSync('artifacts/b012-chrome-report.json',JSON.stringify(report,null,2)+'\n');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
try{
 const sitemapFailures=await verifySchoolSitemapCoverage(reg.batch.slugs);
 for(const failure of sitemapFailures)report.failures.push({slug:'sitemap',width:0,error:failure});
 for(const slug of reg.batch.slugs){
  const path='/texas-high-school-football-teams/'+slug;
  for(const width of [1366,390,320]){
   const context=await browser.newContext({viewport:{width,height:900}});
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',e=>errors.push('JS '+String(e.message).slice(0,120)));
   page.on('response',r=>{if(r.status()>=400&&/\.(?:js|css)(?:\?|$)/.test(r.url()))errors.push('asset '+r.status());});
   try{
    const response=await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:45000});
    assert.equal(response?.status(),200,'school HTTP '+slug);
    assert.equal(await response.headerValue('x-texasdefined-worker-version'),worker,'mixed Worker '+slug);
    await page.locator('main h1').first().waitFor({state:'visible',timeout:20000});
    const data=await page.evaluate(()=>({h1:[...document.querySelectorAll('main h1')].map(n=>n.textContent),title:document.title,
      canonical:document.querySelector('link[rel=canonical]')?.href,robots:document.querySelector('meta[name=robots]')?.content||'',
      links:[...document.querySelectorAll('main a[href]')].map(a=>a.getAttribute('href')),
      scroll:document.documentElement.scrollWidth,
      brokenImages:[...document.images].filter(i=>i.getBoundingClientRect().width&&i.complete&&!i.naturalWidth).length,
      schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(n=>n.textContent).join('') }));
    assert.equal(data.canonical,origin+path,'canonical '+slug);
    assert.ok(!/noindex/i.test(data.robots),'noindex '+slug);
    assert.equal(data.h1.length,1,'H1 '+slug);
    assert.ok(/football/i.test(data.h1[0]||''),'football H1 '+slug);
    assert.ok(/football/i.test(data.title),'title '+slug);
    assert.ok(data.schema.includes('SportsTeam'),'SportsTeam '+slug);
    assert.ok(data.schema.includes('FAQPage'),'FAQPage '+slug);
    assert.ok(data.scroll<=width+8,'horizontal overflow '+slug+' '+width+' actual '+data.scroll);
    assert.equal(data.brokenImages,0,'broken image '+slug);
    assert.deepEqual(errors,[],'browser errors '+slug);
    const county=data.links.find(l=>/^\/county\/[a-z0-9-]+\/?$/.test(l||''));
    assert.ok(county,'missing school-to-county link '+slug);
    report.schoolChecks.push({slug,width,pass:true,county});
    if(width===1366){
     const countyResponse=await page.goto(origin+county,{waitUntil:'domcontentloaded',timeout:45000});
     assert.equal(countyResponse?.status(),200,'county HTTP '+county);
     assert.equal(await countyResponse.headerValue('x-texasdefined-worker-version'),worker,'mixed county Worker '+county);
     // County football links are populated asynchronously after the AskTED/UIL
     // directory request. DOMContentLoaded alone is not evidence that the
     // county lookup has finished. Wait for the actual reciprocal anchor;
     // still fail closed on missing links, API failures, or timeout.
     const reciprocalLink=page.locator('a[href="'+path+'"]');
     await reciprocalLink.first().waitFor({state:'attached',timeout:20000});
     const reciprocal=await reciprocalLink.count();
     assert.ok(reciprocal>0,'county reciprocal missing '+slug+' '+county);
     report.countyChecks.push({slug,county,pass:true});
    }
   }catch(e){report.failures.push({slug,width,error:String(e.message||e).slice(0,400)});}
   finally{await context.close();}
  }
 }
}finally{await browser.close();save();}
assert.equal(report.schoolChecks.length,75,'all 75 viewports required');
assert.equal(report.countyChecks.length,25,'all 25 county reciprocal checks required');
assert.deepEqual(report.failures,[],'Batch012 Chrome failure');
console.log('PASS: 25 schools x 3 viewports, 25 reciprocal county checks, one exact signed source/Worker.');
