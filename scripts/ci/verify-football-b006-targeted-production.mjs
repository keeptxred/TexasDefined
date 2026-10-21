#!/usr/bin/env node
// Exact Batch 006 school-scoped Chrome evidence; never editorial acceptance.
import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('/tmp/td-b006-chrome/node_modules/playwright-core');
const root='https://texasdefined.com',out='artifacts/b006-targeted-browser';
await mkdir(out,{recursive:true});
const registry=JSON.parse(await readFile('docs/football-authority/REGISTRY.json','utf8'));
const editorial=await readFile('src/data/high-school-football/program-editorial.ts','utf8');
const teamRoute=await readFile('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx','utf8');
assert.equal(registry.batch.number,6);
const slugs=registry.batch.slugs;
assert.equal(slugs.length,25,'Must test all 25 assigned Batch 006 schools');
assert.equal(new Set(slugs).size,25,'Duplicate school slug in registry');
function model(slug){
 const s='  "'+slug+'": {',i=editorial.indexOf(s);
 assert.ok(i>=0,'Missing authored school '+slug);
 const r=/\n  "[^"\n]+": \{/g;r.lastIndex=i+s.length;
 const raw=editorial.slice(i,r.exec(editorial)?.index||editorial.length).trim().replace(/,$/,'');
 return JSON.parse(raw.slice(raw.indexOf('{')));
}
function county(slug){
 // Restrict lookup to the real production campus-county map; do not
 // allow a similarly named school or an unrelated string to supply county.
 const countySection=teamRoute.split('const researchedCampusCounty:')[1]?.split(/\n\s*};/)[0];
 assert.ok(countySection,'Production researched campus county map is missing');

 const candidate=countySection.split('\n').find(line=>{
  const t=line.trimStart();
  return t.startsWith("'"+slug+"':") || t.startsWith('"'+slug+'":') || t.startsWith(slug+':');
 });
 const match=candidate?.match(/:\s*['"]([a-z-]+)['"]/);
 // The live school route first uses the explicit researchedCampusCounty mapping,
 // then falls back to countySlug(program.countyName) for UIL program records.
 // Eight Batch006 campuses use that second, genuine production routing path.
 // Their campus counties are individually grounded in NCES/school dossiers
 // (including NCES Blackwell School: Nolan County) and must still pass the
 // downstream real-browser school and reciprocal-county-link assertions.
 const campusCountyFallback={
  'big-spring':'howard','bishop':'nueces','blackwell':'nolan',
  'blanco':'blanco','blanket':'brown','blooming-grove':'navarro',
  'bloomington':'victoria','blue-ridge':'collin'
 };
 if(!match)assert.ok(teamRoute.includes('program?.countyName ?'), 'Missing production county-name fallback');
 if(match&&campusCountyFallback[slug])assert.equal(match[1],campusCountyFallback[slug],'Campus/county mapping source conflict for '+slug);
 const resolved=match?.[1]||campusCountyFallback[slug];
 assert.ok(resolved,'Missing school/county cross-link source for '+slug);
 return resolved;
}
const schools=slugs.map(slug=>({slug,county:county(slug),model:model(slug)}));
// Dated, individually sourced 2026 coaching identities. Catch mistaken school data
// and hydrated UI omissions; don't invent coaching claims for unsettled programs.
const coachCheckpoints={
 'big-sandy-harmony':'Brian Mauk',      // KLTV May 2026, former-coach correction PR #5317
 bishop:'Keith Talbert', blackwell:'Clint Linman',               // KLST Apr22 hiring plus Aug17 first-season interview
                // MaxPreps Oct 13 staff; qualified third-party attribution
 blanco:'Kent Walker',                  // 2026 football roster, not inferred from AD role
 bloomington:'Lane Shands',             // Texas Football Feb 2026 analysis
 boerne:'Brett Sawyer',                 // Feb 2025 hiring + Sept 2026 Boerne Star
 'boys-ranch':'Louis Kelley III',        // Boys Ranch ISD head-coach directory + 2023 hiring
 bovina:'Wade Wilson',                // KFDA August 2026 first-hand coach interview
 boyd:'Shawn Sparks',                // NTX Varsity August 2026 first-hand interview
 'borden-county':'Trey Richey',      // Lamesa Press-Reporter August 2026 original sports report
 'bowie-gold-burg':'Austin Norman',  // Bowie News Oct 2026 game-day coaching interview
};
for(const school of schools){
 const checkpoint=coachCheckpoints[school.slug];
 if(checkpoint)assert.equal(school.model.coach?.name,checkpoint,
  'Dated 2026 Batch006 coach identity/source mismatch for '+school.slug);
}
for(const school of schools)assert.ok(school.model.season?.games?.length>=6&&school.model.faq?.length>=5,'Missing authored source content '+school.slug);
const result={schema:'football-b006-targeted-browser-v2',method:'Production live HTTPS, precisely 25 schools at 1366/390/320 CSS pixels, 25 sitemap entries and reciprocal county links',candidateSha:process.env.GITHUB_SHA||null,productionSha:'not independently identified from HTML',editorialAccepted:false,photoRightsAccepted:false,schools:[],counties:[],sitemap:{status:0,checked:slugs.length,missing:[],error:null},observedWorkerVersions:[],summary:{schoolCases:0,schoolPass:0,schoolFail:0,countyCases:0,countyPass:0,countyFail:0,sitemapPass:0,sitemapFail:0,screenshots:0,graphicScreenshots:0,graphicPass:0,graphicFail:0,countyScreenshots:0,chunkErrors:0}};
// A complete 25-school browser PASS without discoverable production sitemap URLs
// is not a valid acceptance. This is one bounded fetch, not a crawl or poll.
try {
 const sitemapResponse=await fetch(root+'/sitemap.xml',{signal:AbortSignal.timeout(45000)});
 result.sitemap.status=sitemapResponse.status;
 const xml=await sitemapResponse.text();
 // Compare complete <loc> URLs, never a prefix: /boerne must not match
 // /boerne-champion, nor should a URL mentioned outside a <loc> count.
 const sitemapUrls=new Set([...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
  .map(([,url])=>url.trim().replace(/\/$/,'')));
 for(const slug of slugs){
  if(!sitemapUrls.has(root+'/texas-high-school-football-teams/'+slug))result.sitemap.missing.push(slug);
 }
 if(sitemapResponse.status!==200)result.sitemap.error='Non-200 production sitemap HTTP '+sitemapResponse.status;
} catch(error) {
 result.sitemap.error=String(error?.message||error).slice(0,300);
 result.sitemap.missing=slugs.slice();
}
result.summary.sitemapPass=result.sitemap.error?0:slugs.length-result.sitemap.missing.length;
result.summary.sitemapFail=slugs.length-result.summary.sitemapPass;
// Detect mixed Cloudflare Worker revisions when the server exposes the
// release header. Do not pretend this header proves an unobservable git SHA.
const workerVersions=new Set();
let browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
try{
 for(const s of schools)for(const [device,width,height] of [['desktop',1366,900],['mobile390',390,844],['reflow320',320,800]]){
  const errors=[],chunk=[],row={slug:s.slug,county:s.county,device,width,errors},path='/texas-high-school-football-teams/'+s.slug;
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:false});
  const page=await context.newPage();result.schools.push(row);result.summary.schoolCases++;
  page.on('pageerror',e=>chunk.push({event:'pageerror',message:String(e.message||e).slice(0,160)}));
  page.on('requestfailed',req=>{if(/\.js(?:\?|$)/.test(req.url()))chunk.push({event:'js-requestfailed',url:req.url(),failure:req.failure()?.errorText})});
  page.on('response',r=>{if(r.status()>=400&&/\.js(?:\?|$)|\/assets\//.test(r.url()))chunk.push({event:'bad-asset',url:r.url(),status:r.status(),headers:r.headers()})});
  try{
   const response=await page.goto(root+path,{waitUntil:'domcontentloaded',timeout:45000});
   row.http=response?.status();
   row.workerVersion=await response?.headerValue('x-texasdefined-worker-version')||null;
   if(row.workerVersion)workerVersions.add(row.workerVersion);
   if(row.http!==200)errors.push('HTTP '+row.http);
   await page.locator('main h1').first().waitFor({state:'visible',timeout:25000});
   const faq=s.model.faq[0].question;
   await page.waitForFunction(phrase=>document.body.innerText.includes(phrase),faq,{timeout:23000});
   const pageData=await page.evaluate(()=>({
    h1:[...document.querySelectorAll('main h1')].map(x=>x.textContent?.trim()),
    title:document.title,canonical:document.querySelector('link[rel="canonical"]')?.href,
    description:document.querySelector('meta[name="description"]')?.content,
    robots:document.querySelector('meta[name="robots"]')?.content||'',
    body:document.body.innerText,cssWidth:document.documentElement.scrollWidth,
    bodyWidth:document.body.scrollWidth,
    ld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>x.textContent).join('\n'),
    rows:document.querySelectorAll('main tbody tr').length,
    graphic:(()=>{
     // Require the actual source-derived figure, not a matching body string,
     // generic school photo, off-site image or raw unhydrated SSR text.
     const f=document.querySelector('main figure[aria-label*="dated visual timeline of reported 2026 football finals"]');
     const cards=[...f?.querySelectorAll('ol > li')||[]];
     return {present:!!f,title:f?.textContent?.includes('The games behind the record')||false,
      count:cards.length,cardLabels:cards.map(x=>x.getAttribute('aria-label')||''),
      sourceLinks:[...f?.querySelectorAll('a[href]')||[]].map(a=>a.href),
      width:f?.getBoundingClientRect().width||0};
    })(),
    links:[...document.querySelectorAll('main a[href]')].map(x=>x.getAttribute('href')),
    broken:[...document.images].filter(i=>i.getBoundingClientRect().width&&i.complete&&!i.naturalWidth).map(i=>i.currentSrc),
    noAlt:[...document.images].filter(i=>i.getBoundingClientRect().width&&!i.hasAttribute('alt')).map(i=>i.currentSrc),
    coaches:[...document.querySelectorAll('main dt')]
      .filter(el=>el.textContent?.trim().toLowerCase()==='head coach')
      .map(el=>el.nextElementSibling?.textContent?.trim()||'')
   }));
   row.h1=pageData.h1[0];row.canonical=pageData.canonical;
   row.cssWidth=pageData.cssWidth;row.gameRows=pageData.rows;
   const teamName=String(s.model.seo?.title||'').split(' Football')[0];
   const expectedRecord=String(s.model.season.record).match(/^\d+[–-]\d+/)?.[0];
   if(pageData.h1.length!==1||!/football/i.test(row.h1||''))errors.push('missing unique football H1');
   if(teamName&&!String(row.h1).toLowerCase().includes(teamName.toLowerCase()))errors.push('school H1 identity differs: '+teamName);
   if(!pageData.title.includes('Football'))errors.push('missing distinct football title');
   if(pageData.canonical!==root+path)errors.push('incorrect canonical');
   if(!pageData.description||pageData.description.length<45)errors.push('missing SEO description');
   if(/noindex/i.test(pageData.robots))errors.push('unexpected noindex');
   if(!pageData.body.includes('2026'))errors.push('no current-season content');
   if(!expectedRecord||!pageData.body.includes(expectedRecord))errors.push('displayed W-L record differs from source record '+expectedRecord);
   if(coachCheckpoints[s.slug]){
    row.observedHeadCoaches=pageData.coaches;
    // Desktop and mobile fact presentations may both render in the DOM. Every
    // observed Head coach fact must agree; reject missing or contradictory values.
    if(!pageData.coaches.length||pageData.coaches.some(name=>name!==coachCheckpoints[s.slug]))
     errors.push('rendered head-coach fact mismatch: expected '+coachCheckpoints[s.slug]
       +', observed '+JSON.stringify(pageData.coaches));
   }
   if(!pageData.ld.includes('SportsTeam'))errors.push('SportsTeam JSON-LD absent');
   if(!pageData.ld.includes('FAQPage'))errors.push('FAQPage JSON-LD absent');
   if(pageData.rows<6)errors.push('insufficient dated game rows');
   const finals=s.model.season.games.filter(game=>/^[WLT] /.test(game.result||''));
   row.graphicCardCount=pageData.graphic.count;
   row.expectedGraphicFinals=finals.length;
   if(!pageData.graphic.present||!pageData.graphic.title)
    errors.push('Batch006 original school results graphic absent');
   if(pageData.graphic.count!==finals.length)
    errors.push('graphic finals count differs from source: '+pageData.graphic.count+' / '+finals.length);
   for(const game of finals){
    const outcome=game.result?.[0],label=outcome==='W'?'Win':outcome==='L'?'Loss':'Tie';
    const caption=game.date+', '+label+' against '+game.opponent+', '+game.result;
    if(!pageData.graphic.cardLabels.includes(caption))
     errors.push('missing or mislabeled visual result: '+caption.slice(0,140));
   }
   if(!pageData.graphic.sourceLinks.includes(s.model.season.sourceUrl))
    errors.push('results graphic lacks the documented individual season source link');
   if(pageData.graphic.width>width+8)
    errors.push('graphic overflows '+pageData.graphic.width+'px on '+width+'px viewport');
   if(!pageData.graphic.cardLabels.every(x=>/\b(?:Win|Loss|Tie) against\b/.test(x)))
    errors.push('graphic contains a result without an accessible W/L/T label');
   if(!errors.some(x=>x.includes('graphic')||x.includes('visual result')))
    result.summary.graphicPass++;
   else result.summary.graphicFail++;
   if(!pageData.links.some(x=>x?.replace(/\/$/,'')==='/county/'+s.county))errors.push('school county link missing');
   if(pageData.cssWidth>width+8||pageData.bodyWidth>width+8)errors.push('overflow '+pageData.cssWidth+'/'+pageData.bodyWidth);
   if(pageData.broken.length)errors.push('broken image '+pageData.broken.join(',').slice(0,100));
   if(pageData.noAlt.length)errors.push('visible image without alt');
   // Keep 1366, 390 and 320 CSS pixel screenshots for *every* school;
   // earlier runs preserved only 320 unless another check failed.
   {
    await page.screenshot({path:out+'/'+device+'-'+s.slug+'.png',fullPage:false,animations:'disabled',timeout:15000});
    result.summary.screenshots++;
   }
   // Capture the actual visual results strip at each device width.
   // Existing school-top screenshots above are preserved, not overwritten.
   const graphic=page.locator('main figure[aria-label*="dated visual timeline of reported 2026 football finals"]').first();
   if(await graphic.count()){
    await graphic.scrollIntoViewIfNeeded({timeout:6000});
    await graphic.screenshot({path:out+'/graphic-'+device+'-'+s.slug+'.png',animations:'disabled',timeout:15000});
    result.summary.graphicScreenshots++;
   }else{
    errors.push('missing screenshot target: school results graphic');
   }
  }catch(e){errors.push(String(e.message||e).slice(0,350))}
  finally{
   row.chunk=chunk;row.pass=errors.length===0&&chunk.length===0;
   if(chunk.length){errors.push('JS/asset transport '+JSON.stringify(chunk).slice(0,240));result.summary.chunkErrors+=chunk.length}
   if(errors.length){row.pass=false;result.summary.schoolFail++}else result.summary.schoolPass++;
   console.log('B006 school',s.slug,device,row.pass?'PASS':'FAIL',errors.join('|'));
   await context.close();
  }
 }
 // County checks run in a fresh Chrome process. After 75 separate school visits,
 // releasing Chromium's process resources reduces the chance that a county
 // hydration failure is a side effect of the preceding long batch.
 await browser.close();
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
 const groups=Map.groupBy(schools,x=>x.county);
 for(const [name,group] of groups){
  const errors=[],row={county:name,schools:group.map(x=>x.slug),errors};result.counties.push(row);result.summary.countyCases++;
  const ctx=await browser.newContext({viewport:{width:390,height:844}}),page=await ctx.newPage();const js=[],assetFailures=[];
  page.on('pageerror',e=>js.push(String(e.message||e)));
  page.on('requestfailed',request=>{if(request.url().startsWith(root)&&/\.(?:js|css)(?:\?|$)/.test(request.url()))assetFailures.push({url:request.url(),failure:request.failure()?.errorText})});
  page.on('response',response=>{if(response.url().startsWith(root)&&response.status()>=400&&/\.(?:js|css)(?:\?|$)/.test(response.url()))assetFailures.push({url:response.url(),status:response.status()})});
  try{
   const r=await page.goto(root+'/county/'+name,{waitUntil:'domcontentloaded',timeout:45000});
   if(r?.status()!==200)errors.push('county HTTP '+r?.status());
   // Inspect the response for the expected anchors, separately from the
   // post-hydration DOM. No extra network request or acceptance shortcut.
   const initialHtml=await r?.text().catch(()=>null);
   row.serverHtmlHasFootballSection=initialHtml?.includes('Independent football histories from this county')??null;
   row.serverHtmlExpectedAnchors=group.map(s=>({slug:s.slug,present:initialHtml?.includes('/texas-high-school-football-teams/'+s.slug)??null}));
   row.workerVersion=await r?.headerValue('x-texasdefined-worker-version')||null;
   if(row.workerVersion)workerVersions.add(row.workerVersion);
   await page.locator('main h1').first().waitFor({state:'visible',timeout:25000});
   // SSR may briefly expose links before county React hydration unmounts and
   // remounts the card section. Wait for the real DOM links to remain present
   // after load rather than accepting the initial transient HTML snapshot.
   const expected=group.map(s=>'/texas-high-school-football-teams/'+s.slug);
   await page.waitForLoadState('load',{timeout:25000});
   try{
    await page.waitForFunction(paths=>{
     const key=paths.join('|');
     const hrefs=new Set([...document.querySelectorAll('main a[href]')]
      .map(a=>(a.getAttribute('href')||'').replace(/\/$/,'')));
     const found=paths.every(href=>hrefs.has(href));
     const now=performance.now();
     if(!window.__tdB006StableLinks||window.__tdB006StableLinks.key!==key)
      window.__tdB006StableLinks={key,since:0};
     if(!found){window.__tdB006StableLinks.since=0;return false;}
     if(!window.__tdB006StableLinks.since)window.__tdB006StableLinks.since=now;
     return now-window.__tdB006StableLinks.since>=1200;
    },expected,{timeout:25000,polling:200});
    row.stableCountyLinks='all expected links continuously present for 1200ms after load';
   }catch(error){
    row.stableCountyLinks='unmet: '+String(error?.message||error).slice(0,160);
    // Keep the strict final DOM assertion and report the actual absent slugs.
   }
   const observation=await page.evaluate(()=>({
    links:[...document.querySelectorAll('main a[href]')].map(a=>(a.getAttribute('href')||'').replace(/\/$/,'')),
    footballSection:!!document.querySelector('section[aria-label="Independent football histories from this county"]'),
    footballHydrated:document.documentElement.dataset.tdFootballCountyHydrated||null
   }));
   const links=observation.links;
   row.linkCount=links.length;
   row.renderedFootballSection=observation.footballSection;
   row.hydratedMarker=observation.footballHydrated;
   row.renderedBatch006Links=links.filter(x=>x.startsWith('/texas-high-school-football-teams/'));
   row.observedUrl=page.url();
   for(const s of group)if(!links.includes('/texas-high-school-football-teams/'+s.slug))errors.push('missing reciprocal '+s.slug);
   row.assetFailures=assetFailures.slice(0,8);
   if(js.length)errors.push('county JavaScript errors '+js[0]);
   if(assetFailures.length)errors.push('county first-party JS/CSS failures '+JSON.stringify(assetFailures.slice(0,2)).slice(0,240));
  }catch(e){errors.push(String(e.message||e).slice(0,350))}
  finally{
   try{
    // Put the reciprocal-link section in view when rendered; a top-of-page
    // capture alone cannot show missing football cards lower on a county guide.
    const footballSection=page.locator('section[aria-label="Independent football histories from this county"]').first();
    if(await footballSection.count()){
     await footballSection.scrollIntoViewIfNeeded({timeout:3000}).catch(()=>{});
    }
    await page.screenshot({path:out+'/county-'+name+'.png',fullPage:false,animations:'disabled',timeout:15000});
    result.summary.countyScreenshots++;
   }catch(error){errors.push('county evidence screenshot failed: '+String(error?.message||error).slice(0,200));}
   row.pass=errors.length===0;
   if(row.pass)result.summary.countyPass++;else result.summary.countyFail++;
   console.log('B006 county',name,row.pass?'PASS':'FAIL',errors.join('|'),
    'release='+String(row.workerVersion||'none'),
    'section='+String(row.renderedFootballSection),
    'hydrated='+String(row.hydratedMarker),
    'schoolLinks='+JSON.stringify(row.renderedBatch006Links||[]),
    'serverHtml='+JSON.stringify(row.serverHtmlExpectedAnchors||[]),
    'assetFailures='+JSON.stringify(row.assetFailures||[]));
   await ctx.close();
  }
 }
}finally{await browser.close()}
result.observedWorkerVersions=[...workerVersions].sort();
await writeFile(out+'/report.json',JSON.stringify(result,null,2)+'\n');
console.log('B006 targeted production acceptance',JSON.stringify(result.summary));
console.log('B006 observed Worker release headers',JSON.stringify(result.observedWorkerVersions));
assert.equal(result.summary.schoolCases,75,'Never reduce 25 school x 3 viewport scope');
assert.equal(result.summary.sitemapFail,0,'Every assigned school must be discoverable in the live production sitemap');
assert.equal(workerVersions.size,1,'Production acceptance must identify exactly one Cloudflare Worker version; observed: '+(result.observedWorkerVersions.join(', ')||'none'));
assert.equal(result.summary.screenshots,75,'Preserve every one of the 25 schools at all three viewport sizes');
assert.equal(result.summary.graphicScreenshots,75,'Capture all 25 distinct published source-derived graphics at each of three responsive widths');
assert.equal(result.summary.graphicFail,0,'Every displayed school result graphic must match the authored finals and accessible labels');
assert.equal(result.summary.countyScreenshots,result.summary.countyCases,'Preserve one screenshot per county for reciprocal-link diagnosis');
assert.equal(result.summary.schoolFail,0,'Investigate school failures before technical acceptance');
assert.equal(result.summary.countyFail,0,'Investigate missing reciprocal county links');
