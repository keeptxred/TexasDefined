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
 const escaped=slug.replace(/[.*+?^$()|[\]{}]/g,'\\$&');
 const re=new RegExp("['\"]?"+escaped+"['\"]?\\s*:\\s*['\"]([a-z-]+)['\"]");
 const match=teamRoute.match(re);
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
 const resolved=match?.[1]||campusCountyFallback[slug];
 assert.ok(resolved,'Missing school/county cross-link source for '+slug);
 return resolved;
}
const schools=slugs.map(slug=>({slug,county:county(slug),model:model(slug)}));
for(const school of schools)assert.ok(school.model.season?.games?.length>=6&&school.model.faq?.length>=5,'Missing authored source content '+school.slug);
const result={schema:'football-b006-targeted-browser-v1',method:'Production live HTTPS, precisely 25 schools at 1366/390/320 CSS pixels, reciprocal county links',candidateSha:process.env.GITHUB_SHA||null,productionSha:'not independently identified from HTML',editorialAccepted:false,photoRightsAccepted:false,schools:[],counties:[],summary:{schoolCases:0,schoolPass:0,schoolFail:0,countyCases:0,countyPass:0,countyFail:0,screenshots:0,chunkErrors:0}};
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
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
    links:[...document.querySelectorAll('main a[href]')].map(x=>x.getAttribute('href')),
    broken:[...document.images].filter(i=>i.getBoundingClientRect().width&&i.complete&&!i.naturalWidth).map(i=>i.currentSrc),
    noAlt:[...document.images].filter(i=>i.getBoundingClientRect().width&&!i.hasAttribute('alt')).map(i=>i.currentSrc)
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
   if(!pageData.ld.includes('SportsTeam'))errors.push('SportsTeam JSON-LD absent');
   if(!pageData.ld.includes('FAQPage'))errors.push('FAQPage JSON-LD absent');
   if(pageData.rows<6)errors.push('insufficient dated game rows');
   if(!pageData.links.some(x=>x?.replace(/\/$/,'')==='/county/'+s.county))errors.push('school county link missing');
   if(pageData.cssWidth>width+8||pageData.bodyWidth>width+8)errors.push('overflow '+pageData.cssWidth+'/'+pageData.bodyWidth);
   if(pageData.broken.length)errors.push('broken image '+pageData.broken.join(',').slice(0,100));
   if(pageData.noAlt.length)errors.push('visible image without alt');
   if(width===320||errors.length||chunk.length){
    await page.screenshot({path:out+'/'+device+'-'+s.slug+'.png',fullPage:false,animations:'disabled',timeout:15000});
    result.summary.screenshots++;
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
 const groups=Map.groupBy(schools,x=>x.county);
 for(const [name,group] of groups){
  const errors=[],row={county:name,schools:group.map(x=>x.slug),errors};result.counties.push(row);result.summary.countyCases++;
  const ctx=await browser.newContext({viewport:{width:390,height:844}}),page=await ctx.newPage();const js=[];
  page.on('pageerror',e=>js.push(String(e.message||e)));
  try{
   const r=await page.goto(root+'/county/'+name,{waitUntil:'domcontentloaded',timeout:45000});
   if(r?.status()!==200)errors.push('county HTTP '+r?.status());
   await page.locator('main h1').first().waitFor({state:'visible',timeout:25000});
   await page.waitForFunction(()=>document.documentElement.dataset.tdFootballCountyHydrated==='1',{timeout:23000});
   const links=await page.evaluate(()=>[...document.querySelectorAll('main a[href]')].map(a=>a.getAttribute('href')));
   for(const s of group)if(!links.includes('/texas-high-school-football-teams/'+s.slug))errors.push('missing reciprocal '+s.slug);
   if(js.length)errors.push('county JavaScript errors '+js[0]);
  }catch(e){errors.push(String(e.message||e).slice(0,350))}
  finally{row.pass=errors.length===0;if(row.pass)result.summary.countyPass++;else result.summary.countyFail++;console.log('B006 county',name,row.pass?'PASS':'FAIL',errors.join('|'));await ctx.close();}
 }
}finally{await browser.close()}
await writeFile(out+'/report.json',JSON.stringify(result,null,2)+'\n');
console.log('B006 targeted production acceptance',JSON.stringify(result.summary));
assert.equal(result.summary.schoolCases,75,'Never reduce 25 school x 3 viewport scope');
assert.equal(result.summary.schoolFail,0,'Investigate school failures before technical acceptance');
assert.equal(result.summary.countyFail,0,'Investigate missing reciprocal county links');
