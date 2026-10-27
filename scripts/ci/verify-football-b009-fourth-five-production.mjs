#!/usr/bin/env node
// Strict postdeployment live-Chrome evidence for Batch 009's fourth five individual school profiles.
// This verifier NEVER promotes technical VERIFIED status automatically.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/td-b009-fourth-chrome/node_modules/playwright-core');

const site = 'https://texasdefined.com';
const out = 'artifacts/b009-fourth-five-production-chrome';
const slugs = ['center','center-point','centerville','channelview','charlotte'];
const countyBySlug = {
  'center':'shelby','center-point':'kerr','centerville':'leon',
  'channelview':'harris','charlotte':'atascosa',
};
const schoolTerms = {
  'center':['Jack Alvarez','2026'],
  'center-point':['Brent Beadle','Mario Laque'],
  'centerville':['Kyle Hardee','cash'],
  'channelview':['Averion Hurts','Ray Maddry'],
  'charlotte':['Timothy Williams','2026'],
};
const expectedGraphics = new Set(); // No date-by-date verified 2026 finals have been authored for this cohort.
const reg = JSON.parse(await readFile('docs/football-authority/REGISTRY.json','utf8'));
const editorial = await readFile('src/data/high-school-football/program-editorial-b009.ts','utf8');
const route = await readFile('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx','utf8');
const countyPage = await readFile('src/routes/$kind.$slug.lazy.tsx','utf8');
assert.equal(reg.batch.number,9,'Use latest Batch 009 registry');
assert.equal(reg.batch.slugs.length,25);
assert.ok(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length>=180,'All 180 previously accepted schools must remain');
for(const batch of reg.completedBatches.filter(b=>b.number<=8)) for(const slug of batch.slugs) {
  assert.equal(reg.schoolRecords.find(s=>s.slug===slug)?.status,'VERIFIED','Historical protected school regressed: '+slug);
}
for (const slug of slugs) {
  const school = reg.schoolRecords.find(s=>s.slug===slug && s.batch===9);
  assert.ok(school && ['IMPLEMENTED','MERGED','DEPLOYED','VERIFIED'].includes(school.status),'Unimplemented '+slug);
  const dossier = await readFile('docs/football-authority/schools/'+slug+'.md','utf8');
  assert.ok(dossier.length>300 && dossier.includes('https://'),'Missing individual research dossier '+slug);
  assert.ok(editorial.includes('"'+slug+'": {'),'Missing source-backed individual editorial '+slug);
  assert.ok(route.includes("'"+slug+"': '"+countyBySlug[slug]+"'"),'Missing canonical school-to-county '+slug);
  assert.ok(countyPage.includes("slug: '"+slug+"'"),'Missing reciprocal county declaration '+slug);
}
await mkdir(out,{recursive:true});
const report = { version:1,sourceCommit:process.env.GITHUB_SHA||null,technicalOnly:true,
  schoolChecks:[],countyChecks:[],sitemapMissing:[],workerVersions:[],failures:[],screenshots:0,
  disclaimer:'Automated source-layout technical evidence, not human WCAG, complete coaching audit, media rights certification, current ticket inventory or ADA approval.' };
const versions = new Set();
const xml=await fetch(site+'/sitemap.xml',{signal:AbortSignal.timeout(45000)});
const urls=new Set([...((await xml.text()).matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi))].map(m=>m[1].trim().replace(/\/$/,'')));
for(const slug of slugs) if(!urls.has(site+'/texas-high-school-football-teams/'+slug)) report.sitemapMissing.push(slug);
if(xml.status!==200||report.sitemapMissing.length) report.failures.push('Sitemap exact school coverage: '+report.sitemapMissing.join(','));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',
  args:['--no-sandbox','--disable-dev-shm-usage']});
try {
  for (const slug of slugs) for (const [device,width,height] of [['desktop',1366,900],['mobile',390,844],['narrow',320,800]]) {
    const context=await browser.newContext({viewport:{width,height}});
    const page=await context.newPage(), errors=[], row={slug,device,width,pass:false,http:null};
    page.on('pageerror',e=>errors.push('Page error '+String(e.message||e).slice(0,160)));
    page.on('response',r=>{if(r.status()>=400 && /\.(?:js|css)(?:\?|$)/.test(r.url()))errors.push('Broken asset '+r.status());});
    try {
      const path='/texas-high-school-football-teams/'+slug;
      const response=await page.goto(site+path,{waitUntil:'domcontentloaded',timeout:45000});
      row.http=response?.status()||0;
      if(row.http!==200)throw new Error('HTTP '+row.http);
      const ver=await response.headerValue('x-texasdefined-worker-version');
      if(ver) versions.add(ver); else errors.push('Missing Worker version header');
      await page.locator('main h1').first().waitFor({state:'visible',timeout:24000});
      await page.waitForLoadState('load',{timeout:22000});
      const facts=await page.evaluate(()=>{
        const main=document.querySelector('main');
        const graphic=main?.querySelector('figure[aria-label*="dated visual timeline of reported 2026 football finals"]');
        return {h1:[...document.querySelectorAll('main h1')].map(n=>n.textContent||''),
          title:document.title,description:document.querySelector('meta[name="description"]')?.content||'',
          canonical:document.querySelector('link[rel="canonical"]')?.href||'',
          robots:document.querySelector('meta[name="robots"]')?.content||'',
          body:main?.innerText||'',links:[...main?.querySelectorAll('a[href]')||[]].map(a=>a.getAttribute('href')),
          schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(n=>n.textContent||'').join(''),
          pageWidth:document.documentElement.scrollWidth,images:[...document.images]
            .filter(x=>x.getBoundingClientRect().width).map(x=>({alt:x.hasAttribute('alt'),broken:x.complete&&!x.naturalWidth})),
          graphic:graphic?{cards:graphic.querySelectorAll('ol>li').length,sources:graphic.querySelectorAll('a[href^="https://"]').length,
            width:graphic.getBoundingClientRect().width,labels:[...graphic.querySelectorAll('ol>li')].map(n=>n.getAttribute('aria-label')||'')}:null};
      });
      if(facts.h1.length!==1||!/football/i.test(facts.h1[0]))errors.push('Invalid school football H1');
      if(!/Football/i.test(facts.title)||facts.description.length<45)errors.push('Missing individualized SEO metadata');
      if(facts.canonical!==site+path||/noindex/i.test(facts.robots))errors.push('Wrong canonical/noindex');
      if(!facts.schema.includes('SportsTeam')||!facts.schema.includes('FAQPage'))errors.push('Missing SportsTeam or FAQ schema');
      if(!facts.links.includes('/county/'+countyBySlug[slug]))errors.push('No outgoing campus county link');
      if(facts.pageWidth>width+8)errors.push('Page horizontal overflow');
      for(const term of schoolTerms[slug])if(!facts.body.includes(term))errors.push('Missing specific authority fact '+term);
      if(facts.images.some(x=>!x.alt||x.broken))errors.push('Missing alt or broken image');
      if(!facts.body.includes('Original TexasDefined typographic football identity panel'))errors.push('Missing original rights-safe school identity panel');
      if(!facts.body.includes('Milestones that shaped'))errors.push('Missing source-backed school milestones');
      if(facts.graphic)errors.push('Unexpected 2026 finals graphic without verified scored season data');
      if(expectedGraphics.has(slug)&&(!facts.graphic||facts.graphic.cards<1||facts.graphic.sources<1||
        facts.graphic.width>width+8||!facts.graphic.labels.every(x=>/\b(?:Win|Loss|Tie) against\b/.test(x))))
        errors.push('Missing/invalid 2026 source-backed timeline graphic');
      await page.screenshot({path:out+'/'+device+'-'+slug+'.png',timeout:15000,animations:'disabled'});
      report.screenshots++;
      if(expectedGraphics.has(slug)){
        const fig=page.locator('main figure[aria-label*="dated visual timeline of reported 2026 football finals"]').first();
        if(await fig.count()){await fig.scrollIntoViewIfNeeded({timeout:7000});await fig.screenshot({path:out+'/graphic-'+device+'-'+slug+'.png',timeout:15000});report.screenshots++;}
        else errors.push('Source timeline screenshot missing');
      }
    } catch(e){errors.push(String(e.message||e).slice(0,220));}
    row.issues=errors;row.pass=errors.length===0;
    report.schoolChecks.push(row);
    if(!row.pass)report.failures.push(slug+'/'+device+': '+errors.join('|'));
    console.log('B009',slug,device,row.pass?'PASS':'FAIL',errors.join('|'));
    await context.close();
  }
  for (const county of [...new Set(Object.values(countyBySlug))]) {
    const context=await browser.newContext({viewport:{width:390,height:844}});
    const page=await context.newPage(),row={county,pass:false,issues:[]};
    try {
      const response=await page.goto(site+'/county/'+county,{waitUntil:'load',timeout:45000});
      if(response?.status()!==200)throw new Error('County HTTP '+response?.status());
      const ver=await response.headerValue('x-texasdefined-worker-version');
      if(ver) versions.add(ver); else row.issues.push('Missing Worker version header');
      const expected=slugs.filter(s=>countyBySlug[s]===county).map(s=>'/texas-high-school-football-teams/'+s);
      await page.waitForFunction(paths=>{const links=[...document.querySelectorAll('main a[href]')].map(a=>a.getAttribute('href')?.replace(/\/$/,''));return paths.every(p=>links.includes(p));},expected,{timeout:25000});
      await page.screenshot({path:out+'/county-'+county+'.png',timeout:15000});report.screenshots++;
    }catch(e){row.issues.push(String(e.message||e).slice(0,220));}
    row.pass=row.issues.length===0;report.countyChecks.push(row);
    if(!row.pass)report.failures.push('County '+county+': '+row.issues.join('|'));
    console.log('B009 county',county,row.pass?'PASS':'FAIL');
    await context.close();
  }
}finally{await browser.close();}
report.workerVersions=[...versions].sort();
if(versions.size!==1)report.failures.push('Expected one active deployed Worker, observed '+JSON.stringify(report.workerVersions));
if(report.schoolChecks.length!==15||report.countyChecks.length!==5||
  report.schoolChecks.some(x=>!x.pass)||report.countyChecks.some(x=>!x.pass))
  report.failures.push('Strict per-school or county Chrome checks not fully passed');
if(report.screenshots!==20)report.failures.push('Missing expected 20 school and county screenshots');
await writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log('Batch 009 fourth-five production evidence',JSON.stringify({checks:report.schoolChecks.length,
  counties:report.countyChecks.length,screenshots:report.screenshots,versions:report.workerVersions,failures:report.failures.length}));
assert.equal(report.failures.length,0,'Unverified Batch 009: '+report.failures.slice(0,5).join(' | '));
