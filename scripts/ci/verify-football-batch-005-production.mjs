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
const editorialSource = await readFile('src/data/high-school-football/program-editorial.ts','utf8');
function extractWrittenProgram(slug) {
  const marker = '  "' + slug + '": {';
  const start = editorialSource.indexOf(marker);
  if (start < 0) return null;
  const brace = editorialSource.indexOf('{',start);
  let depth=0, quoted=false, escaped=false;
  for (let i=brace;i<editorialSource.length;i++) {
    const char=editorialSource[i];
    if (quoted) { if (escaped) escaped=false; else if (char==='\\') escaped=true; else if (char==='"') quoted=false; }
    else if (char==='"') quoted=true;
    else if (char==='{') depth++;
    else if (char==='}' && --depth===0) return JSON.parse(editorialSource.slice(brace,i+1));
  }
  throw new Error('Unclosed school-specific editorial object: '+slug);
}
const faqFingerprints = new Map();
for (const [slug] of schools) {
  const profile=extractWrittenProgram(slug);
  check(!!profile,slug+': individually authored football editorial record');
  if (!profile) continue;
  check((profile.overview?.length||0)>=3,slug+': at least three individual research paragraphs');
  check((profile.faq?.length||0)>=5,slug+': at least five visitor questions');
  for(const item of profile.faq||[]) {
    const key=String(item.question||'').trim().toLowerCase()+' | '+String(item.answer||'').trim().toLowerCase();
    const previous=faqFingerprints.get(key);
    check(!previous,slug+': FAQ must not duplicate another school'+(previous?' ('+previous+')':''));
    if(!previous) faqFingerprints.set(key,slug);
  }
  check((profile.milestones?.length||0)>=2,slug+': historic/source-backed milestones');
  check((profile.season?.games?.length||0)>=8,slug+': no generic or empty 2026 varsity season');
  check(/^https:\/\//.test(profile.season?.sourceUrl||''),slug+': citable 2026 season source');
  const games=profile.season?.games || [];
  check(new Set(games.map(game=>game.date+':'+game.opponent)).size===games.length,slug+': no duplicate 2026 fixtures');
  check(games.every(game=>game.opponent && ['Home','Away','Neutral'].includes(game.site)),slug+': individually named opponent and venue type');
  check((profile.seo?.description||'').length>=65 && (profile.seo?.title||'').length>=20,slug+': unique researched SEO package');
}

check(schools.length === 25 && new Set(schools.map(x => x[0])).size === 25,'All 25 unique Batch005 schools');
check(schools.every(([slug]) => registry.schoolRecords.some(r=>r.slug===slug && r.batch===5 && ['IMPLEMENTED','VERIFIED'].includes(r.status))),'Registry tracks all 25 as implemented or verified');
const sitemapResponse = await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(90000)});
const sitemapXml = await sitemapResponse.text();
check(sitemapResponse.status===200,'Production sitemap HTTP 200');
for(const [slug] of schools) check(sitemapXml.includes(origin+'/texas-high-school-football-teams/'+slug),slug+': sitemap listed');
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN || '/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const clean=(t)=>String(t||'').replace(/\s+/g,' ').trim();
// A passed QA report must represent one coherent production Worker release,
// not a mixture of hashed assets / SSR responses across overlapping deploys.
const workerVersions=new Set();
report.workerVersionObservations=[];
report.assetTransportIssues=[];
async function observeWorkerVersion(response,label) {
  const version=response ? await response.headerValue('x-texasdefined-worker-version') : null;
  report.workerVersionObservations.push({label,version:version||null});
  if(version) workerVersions.add(version);
}
function trackSameOriginChunkFailures(page,label,issues) {
  const match=url=>{
    try { const u=new URL(url); return u.origin===origin && u.pathname.startsWith('/assets/') && /\.(?:js|css)$/.test(u.pathname); }
    catch { return false; }
  };
  page.on('requestfailed',request=>{
    if(match(request.url())) issues.push({label,event:'requestfailed',url:request.url(),failure:request.failure()});
  });
  page.on('response',response=>{
    if(match(response.url()) && response.status()>=400)
      issues.push({label,event:'asset-http-error',url:response.url(),status:response.status()});
  });
}
async function detectUnwantedChunkReload(page,view,label) {
  const marker=await page.evaluate(()=>{
    try {return sessionStorage.getItem('td:stale-chunk-reload-at:v1')||'';}
    catch {return '';}
  });
  if(marker && !report.chunkReloadDetectedFor?.includes(view)) {
    report.chunkReloadDetectedFor||=[];
    report.chunkReloadDetectedFor.push(view);
    check(false,view+': lazy-module recovery was needed during production acceptance',{firstDetectedAt:label,sessionReloadTimestamp:marker});
  }
}
// Do not mark a transient navigation timeout as a permanent school-page failure
// until one fresh attempt also fails. The second attempt must still pass EVERY
// original HTTP, hydration, SEO, content, link, image and runtime assertion.
const schoolNavigationOptions={waitUntil:'domcontentloaded',timeout:60000};
const transientDocumentNavigation=/^page\.goto: (?:Timeout \d+ms exceeded|net::ERR_(?:TIMED_OUT|CONNECTION_RESET|CONNECTION_CLOSED|CONNECTION_ABORTED|NETWORK_CHANGED))/;
async function navigateSchoolWithOneNetworkRetry(page,url,view,slug) {
  try {
    return await page.goto(url,schoolNavigationOptions);
  } catch(firstError) {
    const firstMessage=String(firstError?.message||firstError);
    if (!transientDocumentNavigation.test(firstMessage)) throw firstError;
    try {
      const response=await page.goto(url,schoolNavigationOptions);
      check(true,view+' '+slug+': document navigation recovered after one transient retry',{
        firstAttempt:firstMessage.slice(0,250)
      });
      return response;
    } catch(secondError) {
      throw new Error('Navigation failed twice for '+view+' '+slug+': first='+firstMessage.slice(0,250)+'; second='+String(secondError?.message||secondError).slice(0,350));
    }
  }
}
try {
 for(const [view,width,height] of [['desktop',1366,900],['mobile',390,844]]) {
  const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  for(const [slug,county] of schools) {
   const page=await ctx.newPage(),errors=[],assetIssues=[];
   trackSameOriginChunkFailures(page,view+' '+slug,assetIssues);
   page.on('pageerror',e=>errors.push(String(e.message||e)));
   let response=null,details={};
   try {
    response=await navigateSchoolWithOneNetworkRetry(page,origin+'/texas-high-school-football-teams/'+slug,view,slug);
    await observeWorkerVersion(response,view+' '+slug);
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
    await detectUnwantedChunkReload(page,view,slug);
    check(errors.length===0,view+' '+slug+': no JS runtime errors',{errors,assetIssues});
    await page.screenshot({path:outputDir+'/'+view+'-'+slug+'.png',animations:'disabled',fullPage:false,timeout:30000});
    report.schoolResults.push({view,slug,http:response?.status(),h1:details.h1,title:details.title,canonical:details.canonical,bodyLength:details.body.length});
   } catch(e) {
    check(false,view+' '+slug+': browser exception',{error:String(e.message||e).slice(0,900),assetIssues});
   } finally {await page.close();}
  }
  // Test reciprocal links on each distinct campus county. Wait for the county route
  // hydration marker: SSR-only HTML is not evidence of client-side link availability.
  for(const county of [...new Set(schools.map(x=>x[1]))]) {
   let page=await ctx.newPage(),errs=[],assetIssues=[];
   const historicalAssetIssues=[];
   trackSameOriginChunkFailures(page,view+' '+county,assetIssues);
   let firstModuleErrors=[];
   page.on('pageerror',e=>errs.push(String(e.message||e)));
   try {
    let res=await page.goto(origin+'/county/'+county,{waitUntil:'domcontentloaded',timeout:60000});
    await observeWorkerVersion(res,view+' '+county+' initial');
    await page.locator('h1').first().waitFor({state:'visible',timeout:25000});
    // Retry one full navigation when the county hydration signal is slow.
    // Do NOT bypass actual client hydration or reciprocal-link verification:
    // a persistent failure on both attempts still fails this acceptance gate.
    try {
      await page.waitForFunction(()=>document.documentElement.dataset.tdFootballCountyHydrated==='1',null,{timeout:35000});
    } catch(firstHydrationError) {
      await page.reload({waitUntil:'domcontentloaded',timeout:60000});
      await page.locator('h1').first().waitFor({state:'visible',timeout:25000});
      await page.waitForFunction(()=>document.documentElement.dataset.tdFootballCountyHydrated==='1',null,{timeout:35000});
      check(true,view+' '+county+': client hydration recovered after one fresh navigation',{firstAttempt:String(firstHydrationError.message||firstHydrationError).slice(0,160)});
    }
    let links=await page.locator('a[href]').evaluateAll(a=>a.filter(x=>x.getBoundingClientRect().width>0).map(x=>new URL(x.href).pathname.replace(/\/$/,'')));
    // A lazy chunk fetch failure may be transient during an edge deployment,
    // but it is NOT a pass. Require one NEW page with complete hydration,
    // county links and zero runtime errors. Persistent failures remain fatal.
    const transientChunk=/Failed to fetch dynamically imported module|Importing a module script failed|Failed to load module script/i;
    if(res?.status()===200 && errs.length>0 && errs.every(e=>transientChunk.test(e))) {
      firstModuleErrors=[...errs];
      historicalAssetIssues.push(...assetIssues);
      await page.close();
      page=await ctx.newPage();
      errs=[];
      assetIssues=[];
      trackSameOriginChunkFailures(page,view+' '+county+' recovery',assetIssues);
      page.on('pageerror',e=>errs.push(String(e.message||e)));
      res=await page.goto(origin+'/county/'+county,{waitUntil:'domcontentloaded',timeout:60000});
      await observeWorkerVersion(res,view+' '+county+' recovery');
      await page.locator('h1').first().waitFor({state:'visible',timeout:25000});
      await page.waitForFunction(()=>document.documentElement.dataset.tdFootballCountyHydrated==='1',null,{timeout:35000});
      links=await page.locator('a[href]').evaluateAll(a=>a.filter(x=>x.getBoundingClientRect().width>0).map(x=>new URL(x.href).pathname.replace(/\/$/,'')));
      if(res?.status()===200 && errs.length===0) check(true,view+' '+county+': transient lazy-module import recovered on fresh page',{firstRuntimeErrors:firstModuleErrors,historicalAssetIssues});
    }
    check(res?.status()===200,view+' '+county+' county: HTTP 200');
    for(const [slug,mappedCounty] of schools.filter(x=>x[1]===county)) check(links.includes('/texas-high-school-football-teams/'+slug),view+' '+county+': reciprocal '+slug);
    await detectUnwantedChunkReload(page,view,'county '+county);
    check(errs.length===0,view+' '+county+': no runtime errors',{errors:errs,assetIssues,historicalAssetIssues});
    await page.screenshot({path:outputDir+'/'+view+'-county-'+county+'.png',animations:'disabled',fullPage:false,timeout:30000});
   } catch(e) {
    check(false,view+' '+county+': county browser exception',{error:String(e.message||e).slice(0,900),firstModuleErrors,assetIssues,historicalAssetIssues});
   } finally {await page.close();}
  }
  await ctx.close();
 }
} finally {await browser.close();}
check(workerVersions.size===1,'Single consistent deployed Worker across full 25-school/two-viewport production run',{versions:[...workerVersions],observations:report.workerVersionObservations.length});
report.assetTransportIssues=report.checks.flatMap(x=>[...(x.assetIssues||[]),...(x.historicalAssetIssues||[])]);
await writeFile(outputDir+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:report.failures.length===0,checks:report.checks.length,failures:report.failures.slice(0,25),sha:report.targetSha,schools:schools.length,viewportCount:2}));
assert.equal(report.failures.length,0,'Batch005 production/browser acceptance has outstanding failures');
