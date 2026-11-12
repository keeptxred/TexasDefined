#!/usr/bin/env node
// Batch017: real production Chrome, fail-closed on every assigned school and viewport.
import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('/tmp/td-b017-chrome/node_modules/playwright-core');
const origin='https://texasdefined.com';
const source=process.env.FOOTBALL_CHROME_SOURCE_SHA||'';
const worker=process.env.FOOTBALL_EXPECTED_WORKER_VERSION||'';
const report={batch:17,sourceCommit:source,workerVersion:worker,schoolSlugs:[],schoolChecks:[],countyChecks:[],screenshots:[],failures:[],technicalOnly:true};
mkdirSync('artifacts',{recursive:true});
mkdirSync('artifacts/b017-chrome-screenshots',{recursive:true});
const save=()=>writeFileSync('artifacts/b017-chrome-report.json',JSON.stringify(report,null,2)+'\n');
const preflight=(name,fn)=>{try{fn();}catch(error){report.failures.push({slug:'preflight',width:0,error:name+': '+String(error.message||error)});save();throw error;}};
const reg=JSON.parse(readFileSync('docs/football-authority/REGISTRY.json','utf8'));
report.schoolSlugs=["el-paso-eastlake","el-paso-eastwood","el-paso-el-dorado","el-paso-franklin","el-paso-hanks","el-paso-irvin","el-paso-jefferson","el-paso-montwood","el-paso-parkland","el-paso-pebble-hills","el-paso-riverside","el-paso-socorro","el-paso-ysleta","eldorado","electra","elgin","elkhart","elysian-fields","ennis","era","euless-trinity","eustace","evadale","evant","everman"];
preflight('registry and source boundary',()=>{
 assert.equal(report.batch,17,'Batch017 evidence must identify Batch017, not prior batch');
 assert.equal(new Set(report.schoolSlugs).size,25,'exact 25 distinct canonical slugs');
 assert.equal(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length,380,'preserve 380 historic certifications');
 for(const slug of report.schoolSlugs)assert.equal(reg.schoolRecords.find(s=>s.slug===slug)?.status,'IMPLEMENTED','no source-only production graduation: '+slug);
 const authored=readFileSync('src/data/high-school-football/football-program-profile.server.ts','utf8');
 for(const method of ['getBatch017FirstFiveEditorial','getBatch017SecondFiveEditorial','getBatch017ThirdFiveEditorial','getBatch017FourthFiveEditorial','getBatch017FifthFiveEditorial'])assert.ok(authored.includes(method+'(canonicalSlug)'),'missing authored SSR loader '+method);
});
preflight('release identity',()=>{
 assert.match(source,/^[a-f0-9]{40}$/);
 assert.match(worker,/^[a-f0-9-]{36}$/);
});
const edgeSource=readFileSync('src/data/high-school-football/batch017-county-edges.ts','utf8');
const parsed=[...edgeSource.matchAll(/\{ slug: '([a-z0-9-]+)', name: '[^']+', county: '([a-z0-9-]+)'/g)].map(([,slug,county])=>({slug,county}));
preflight('exactly 25 uniquely named campus counties',()=>{assert.equal(parsed.length,25);assert.equal(new Set(parsed.map(x=>x.slug)).size,25);assert.deepEqual(parsed.map(x=>x.slug),report.schoolSlugs);});
const countyBySlug=new Map(parsed.map(({slug,county})=>[slug,county]));
save();
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
try{
 for(const slug of report.schoolSlugs){
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
    // Indexability is deliberately not certified by this source-only browser acceptance.
    assert.equal(data.h1.length,1,'H1 '+slug);
    assert.ok(/football/i.test(data.h1[0]||''),'football H1 '+slug);
    assert.ok(/football/i.test(data.title),'title '+slug);
    assert.ok(data.schema.includes('SportsTeam'),'SportsTeam '+slug);
    assert.ok(data.schema.includes('FAQPage'),'FAQPage '+slug);
    assert.ok(data.scroll<=width+8,'horizontal overflow '+slug+' '+width+' actual '+data.scroll);
    assert.equal(data.brokenImages,0,'broken image '+slug);
    assert.deepEqual(errors,[],'browser errors '+slug);
    const county=data.links.find(l=>/^\/county\/[a-z0-9-]+\/?$/.test(l||''));
    const expectedCounty=countyBySlug.get(slug);
    assert.equal(county,'/county/'+expectedCounty,'wrong campus county for '+slug);
    assert.ok(county,'missing school-to-county link '+slug);
    const screenshotPath='artifacts/b017-chrome-screenshots/'+slug+'-'+width+'.png';
    await page.screenshot({path:screenshotPath,fullPage:true,timeout:30000});
    report.screenshots.push({slug,width,path:screenshotPath});
    report.schoolChecks.push({slug,width,pass:true,county});
    if(width===1366){
     // Do not navigate the already-hydrated school page into a county route:
     // the school can have pending XHR, timers, image loads, and unload work.
     // An isolated browser page verifies the real county route, hydration,
     // matching Worker UUID, and actual reciprocal anchor. On a transport
     // timeout try ONE fresh page, never reusing a stuck navigation state.
     let countyAccepted=false;
     for(let attempt=1;attempt<=2&&!countyAccepted;attempt++){
      const countyPage=await context.newPage();
      try{
       const countyResponse=await countyPage.goto(origin+county,{waitUntil:'domcontentloaded',timeout:45000});
       assert.equal(countyResponse?.status(),200,'county HTTP '+county);
       assert.equal(await countyResponse.headerValue('x-texasdefined-worker-version'),worker,'mixed county Worker '+county);
       await countyPage.waitForFunction(
         () => document.documentElement.dataset.tdFootballCountyHydrated === '1',
         null, {timeout:40000}
       );
       const reciprocalLink=countyPage.locator('main a[href="'+path+'"]');
       await reciprocalLink.first().waitFor({state:'visible',timeout:20000});
       assert.ok(await reciprocalLink.count()>0,'county reciprocal missing '+slug+' '+county);
       report.countyChecks.push({slug,county,pass:true});
       countyAccepted=true;
      }catch(error){
       if(attempt===2 || error?.name!=='TimeoutError')throw error;
       console.warn('Retry isolated county navigation timeout',slug,county,'attempt',attempt);
      }finally{
       await countyPage.close();
      }
     }
     assert.ok(countyAccepted,'county verification not accepted '+slug);
    }
   }catch(e){report.failures.push({slug,width,error:String(e.message||e).slice(0,400)});}
   finally{await context.close();}
  }
 }
}finally{await browser.close();save();}
assert.equal(report.schoolChecks.length,75,'all 75 viewports required');
assert.equal(report.screenshots.length,75,'all 75 screenshot artifacts required');
assert.equal(report.countyChecks.length,25,'all 25 county reciprocal checks required');
assert.deepEqual(report.failures,[],'Batch017 Chrome failure');
console.log('PASS: 25 Batch017 source-authored schools x 3 viewports, 25 reciprocal county checks, one exact signed Worker; Batch017 registry remains source-IMPLEMENTED pending signed graduation; indexability is unasserted.');
