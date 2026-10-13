import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-batch005-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const outputDir = 'artifacts/football-batch-005';
const schools = [
  ['ballinger','runnels'],['balmorhea','reeves'],['bandera','bandera'],['bangs','brown'],['banquete','nueces'],
  ['barksdale-nueces-canyon','edwards'],['bartlett','bell'],['bastrop','bastrop'],['bastrop-cedar-creek','bastrop'],['bay-city','matagorda'],
  ['baytown-goose-creek-memorial','harris'],['baytown-lee','harris'],['baytown-sterling','harris'],['beaumont-united','jefferson'],['beaumont-west-brook','jefferson'],
  ['beckville','panola'],['beeville-jones','bee'],['bells','grayson'],['bellville','austin'],['belton','bell'],
  ['ben-bolt-palito-blanco','jim-wells'],['benavides','duval'],['benjamin','knox'],['big-lake-reagan-co','reagan'],['big-sandy','upshur']
];
const independentlyDatedSchedules = new Set(['bay-city','baytown-goose-creek-memorial','baytown-lee','baytown-sterling','beaumont-united','beaumont-west-brook','beckville','beeville-jones','bells','bellville','belton','ben-bolt-palito-blanco','benavides','big-lake-reagan-co','big-sandy']);
const knownFixtureEvidence = {
  'bay-city':'Sealy',
  'baytown-goose-creek-memorial':'Beaumont United',
  'baytown-lee':'Nederland',
  'baytown-sterling':'West Brook',
  'beaumont-united':'Goose Creek Memorial',
  'beaumont-west-brook':'Sterling',
  'beckville':'Pewitt',
  'beeville-jones':'Corpus Christi Moody',
  'bells':'Valley View',
  'bellville':'Hitchcock',
  'belton':'Rudder',
  'ben-bolt-palito-blanco':'Louise',
  'benavides':'Pawnee',
  'big-lake-reagan-co':'Ballinger',
  'big-sandy':'Hemphill',
};
const report = { targetSha: process.env.ACCEPTANCE_SHA || '', checkedAt: new Date().toISOString(), checks: [], failures: [], schoolResults: [] };
const check = (pass, label, detail = {}) => {
  const row = { label, pass: Boolean(pass), ...detail }; report.checks.push(row);
  if (!row.pass) report.failures.push(row);
};
await mkdir(outputDir, { recursive: true });
const registry = JSON.parse(await readFile('docs/football-authority/REGISTRY.json','utf8'));
check(schools.length === 25 && new Set(schools.map(x => x[0])).size === 25,'All 25 unique Batch005 schools');
check(schools.every(([slug]) => registry.schoolRecords.some(r=>r.slug===slug && r.batch===5 && ['IMPLEMENTED','VERIFIED'].includes(r.status))),'Registry tracks all 25 as implemented or verified');
const sitemapResponse = await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(90000)});
const sitemapXml = await sitemapResponse.text();
check(sitemapResponse.status===200,'Production sitemap HTTP 200');
for(const [slug] of schools) check(sitemapXml.includes(origin+'/texas-high-school-football-teams/'+slug),slug+': sitemap listed');
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN || '/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const clean=(t)=>String(t||'').replace(/\s+/g,' ').trim();
try {
 for(const [view,width,height] of [['desktop',1366,900],['mobile',390,844]]) {
  const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  for(const [slug,county] of schools) {
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(String(e.message||e)));
   let response=null,details={};
   try {
    response=await page.goto(origin+'/texas-high-school-football-teams/'+slug,{waitUntil:'domcontentloaded',timeout:60000});
    await page.locator('h1').first().waitFor({state:'visible',timeout:30000});
    await page.waitForTimeout(550);
    details=await page.evaluate(() => ({
     title:document.title,
     h1:[...document.querySelectorAll('h1')].map(x=>x.innerText.trim()),
     canonical:document.querySelector('link[rel=canonical]')?.href||'',
     description:document.querySelector('meta[name=description]')?.content||'',
     robots:document.querySelector('meta[name=robots]')?.content||'',
     body:document.body?.innerText||'',
     anchors:[...document.querySelectorAll('a[href]')].map(x=>x.href),
     schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>x.textContent||'').join('\n'),
     scheduleRows:[...document.querySelectorAll('tbody tr')].map(x=>x.innerText),
     width:document.documentElement.scrollWidth,
     brokenImages:[...document.images].filter(i=>i.complete && !i.naturalWidth && i.getBoundingClientRect().width>0).map(i=>i.currentSrc)
    }));
    check(response?.status()===200,view+' '+slug+': HTTP 200',{http:response?.status()});
    check(details.h1.length===1 && clean(details.h1[0]).length>=12,view+' '+slug+': one descriptive H1');
    check(details.title.length>=25,view+' '+slug+': descriptive page title');
    check(details.canonical===origin+'/texas-high-school-football-teams/'+slug,view+' '+slug+': canonical');
    check(details.description.length>=65,view+' '+slug+': description');
    check(!/noindex/i.test(details.robots),view+' '+slug+': indexable');
    check(details.body.length>=1100,view+' '+slug+': meaningful visible information');
    check(details.anchors.some(a=>new URL(a).pathname==='/county/'+county),view+' '+slug+': county outgoing link');
    check(details.schema.includes('SportsTeam'),view+' '+slug+': structured SportsTeam');
    check(details.width<=width+3,view+' '+slug+': no horizontal overflow',{scrollWidth:details.width});
    check(details.brokenImages.length===0,view+' '+slug+': no broken visible images');
    if(independentlyDatedSchedules.has(slug)) {
      check(details.scheduleRows.length >= (slug === 'benavides' ? 9 : 10),view+' '+slug+': source-evidenced 2026 varsity fixtures',{rows:details.scheduleRows.length});
      check(details.body.includes('2026') && details.body.includes('MaxPreps'),view+' '+slug+': dated 2026 scoreboard source visible');
      check(details.scheduleRows.some(row=>row.includes(knownFixtureEvidence[slug])),view+' '+slug+': independently reported school-specific fixture visible');
      check(details.schema.includes('FAQPage'),view+' '+slug+': authority FAQ structured data');
    }
    check(errors.length===0,view+' '+slug+': no JS runtime errors',{errors});
    await page.screenshot({path:outputDir+'/'+view+'-'+slug+'.png',animations:'disabled',fullPage:false,timeout:30000});
    report.schoolResults.push({view,slug,http:response?.status(),h1:details.h1,title:details.title,canonical:details.canonical,bodyLength:details.body.length});
   } catch(e) {
    check(false,view+' '+slug+': browser exception',{error:String(e.message||e).slice(0,900)});
   } finally {await page.close();}
  }
  // Test reciprocal links on each distinct campus county. Wait for the county route
  // hydration marker: SSR-only HTML is not evidence of client-side link availability.
  for(const county of [...new Set(schools.map(x=>x[1]))]) {
   const page=await ctx.newPage(),errs=[];
   page.on('pageerror',e=>errs.push(String(e.message||e)));
   try {
    const res=await page.goto(origin+'/county/'+county,{waitUntil:'domcontentloaded',timeout:60000});
    await page.locator('h1').first().waitFor({state:'visible',timeout:25000});
    await page.waitForFunction(()=>document.documentElement.dataset.tdFootballCountyHydrated==='1',{}, {timeout:35000});
    const links=await page.locator('a[href]').evaluateAll(a=>a.filter(x=>x.getBoundingClientRect().width>0).map(x=>new URL(x.href).pathname.replace(/\/$/,'')));
    check(res?.status()===200,view+' '+county+' county: HTTP 200');
    for(const [slug,mappedCounty] of schools.filter(x=>x[1]===county)) check(links.includes('/texas-high-school-football-teams/'+slug),view+' '+county+': reciprocal '+slug);
    check(errs.length===0,view+' '+county+': no runtime errors',{errors:errs});
    await page.screenshot({path:outputDir+'/'+view+'-county-'+county+'.png',animations:'disabled',fullPage:false,timeout:30000});
   } catch(e) {
    check(false,view+' '+county+': county browser exception',{error:String(e.message||e).slice(0,900)});
   } finally {await page.close();}
  }
  await ctx.close();
 }
} finally {await browser.close();}
await writeFile(outputDir+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:report.failures.length===0,checks:report.checks.length,failures:report.failures.slice(0,25),sha:report.targetSha,schools:schools.length,viewportCount:2}));
assert.equal(report.failures.length,0,'Batch005 production/browser acceptance has outstanding failures');
