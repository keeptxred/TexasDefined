#!/usr/bin/env node
// Exact-production, school-by-school evidence, not a generic route smoke test.
// A PR run checks the current live release but does NOT certify the PR's SHA.
// workflow_run runs certify the completed production deployment's exact SHA.
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-batch005-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const group = Number(process.env.BATCH005_GROUP ?? '0');
assert(Number.isInteger(group) && group >= 0 && group < 4, 'group must be 0, 1, 2 or 3');
const root = 'artifacts/football-batch005/group-' + group;
await mkdir(root, { recursive: true });
const registry = JSON.parse(await readFile('docs/football-authority/REGISTRY.json','utf8'));
const editorial = await readFile('src/data/high-school-football/program-editorial.ts','utf8');
const identities = await readFile('src/data/high-school-football/school-identities.ts','utf8');
const profileRoute = await readFile('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx','utf8');
const countyRoute = await readFile('src/routes/$kind.$slug.lazy.tsx','utf8');
const batch005 = registry.batch?.number === 5
  ? registry.batch
  : registry.completedBatches?.find(batch => batch.number === 5);
assert.ok(batch005, 'Batch 005 verifier requires its original immutable roster');
const slugs = batch005.slugs.filter(slug => slug !== 'benjamin');
assert.equal(slugs.length, 24, 'Batch 005 must retain 24 unverified assignments');
const subjects = slugs.filter((_, i) => i % 4 === group);
assert.equal(subjects.length, 6, 'Each group must check six schools');
const report = {
  version: 1, group, schools: subjects, mode: process.env.VERIFICATION_MODE || 'unknown',
  releaseSha: process.env.ACCEPTANCE_SHA || null, checkedAt: new Date().toISOString(),
  checks: [], failures: [], schoolsResult: []
};
const check = (condition, label, slug, details) => {
  const passed = Boolean(condition);
  report.checks.push({ school: slug, label, pass: passed, ...(details === undefined ? {} : {details}) });
  if (!passed) report.failures.push({school:slug, label, ...(details === undefined ? {} : {details})});
};
const clean = v => String(v ?? '').replace(/\s+/g,' ').trim();
const grabString = (section, field) => {
  const found = section.match(new RegExp('"' + field + '"\\s*:\\s*("(?:\\\\.|[^"\\\\])*")'));
  return found ? JSON.parse(found[1]) : null;
};
const getSchoolResearch = slug => {
  const begin = editorial.indexOf('  "' + slug + '": {');
  assert(begin >= 0, 'Missing school-specific editorial for ' + slug);
  const remaining = editorial.slice(begin);
  const next = remaining.slice(1).search(/\n  "[a-z0-9-]+": \{/);
  const segment = next >= 0 ? remaining.slice(0, next+1) : remaining;
  const title = segment.match(/"seo"\s*:\s*\{\s*"title"\s*:\s*("(?:\\.|[^"\\])*")/);
  const development = segment.match(/"development"\s*:\s*\{\s*"title"\s*:\s*("(?:\\.|[^"\\])*")/);
  const faq = segment.match(/"faq"\s*:\s*\[\s*\{\s*"question"\s*:\s*("(?:\\.|[^"\\])*")/);
  const mascotLine = identities.split('\n').find(l => l.includes("slug: '" + slug + "'"));
  const mascot = mascotLine?.match(/mascot: '([^']+)'/)?.[1];
  const county = profileRoute.match(new RegExp("['\"]" + slug + "['\"]:\\s*['\"]([^'\"]+)['\"]"))?.[1];
  const season = segment.match(/"season"\s*:\s*\{[\s\S]*?"games"\s*:\s*\[([\s\S]*?)\s*\]/);
  return {
    title: title ? JSON.parse(title[1]) : null,
    development: development ? JSON.parse(development[1]) : null,
    faq: faq ? JSON.parse(faq[1]) : null,
    mascot, county,
    gameCount: season ? [...season[1].matchAll(/"opponent"\s*:/g)].length : 0,
    hasReverseLink: countyRoute.includes("slug: '" + slug + "'") || countyRoute.includes('slug: "' + slug + '"')
  };
};
let sitemap;
try {
  const response = await fetch(origin + '/sitemap.xml', {signal: AbortSignal.timeout(45000)});
  sitemap = {status:response.status, body:await response.text()};
} catch (error) { sitemap = {status:0,body:'',error:String(error)}; }

const browser = await chromium.launch({
  headless:true, executablePath:process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args:['--no-sandbox','--disable-dev-shm-usage']
});
try {
  for (const slug of subjects) {
    const schoolResult = {slug, checks:0, failures:0};
    const firstCheck = report.checks.length, firstFailure = report.failures.length;
    report.schoolsResult.push(schoolResult);
    try {
      const research = getSchoolResearch(slug);
      const route = '/texas-high-school-football-teams/' + slug;
      check(Boolean(research.title && research.development && research.faq && research.mascot && research.county), 'specific research, identity and campus county in code', slug, research);
      check(research.gameCount >= 6, 'source-backed 2026 games stored (at least six)', slug, research.gameCount);
      check(research.hasReverseLink, 'county source includes unique reciprocal link',slug);
      check(sitemap.status === 200 && sitemap.body.includes(origin + route), 'listed in production sitemap', slug, sitemap.status);
      for (const [view,width,height] of [['desktop',1366,900],['mobile',390,844]]) {
        const context = await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
        const page = await context.newPage();
        const jsErrors = [];
        page.on('pageerror',error=>jsErrors.push(String(error?.message || error)));
        try {
          const response = await page.goto(origin + route, {waitUntil:'domcontentloaded',timeout:60000});
          await page.locator('h1').first().waitFor({state:'visible',timeout:35000});
          if (research.development) {
            await page.waitForFunction((wanted)=>document.body.innerText.includes(wanted),research.development,{timeout:35000});
          }
          const data = await page.evaluate(()=>({
            title:document.title,
            heading:[...document.querySelectorAll('h1')].map(x=>x.textContent?.trim()),
            canonical:document.querySelector('link[rel="canonical"]')?.href,
            description:document.querySelector('meta[name="description"]')?.content,
            robots:document.querySelector('meta[name="robots"]')?.content || '',
            body:document.body.innerText,
            width:document.documentElement.scrollWidth,
            hrefs:[...document.querySelectorAll('a[href]')].map(a=>a.href),
            jsonld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent || '').join('\n'),
            games:[...document.querySelectorAll('tbody tr')].map(tr=>tr.innerText),
            broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth&&i.getBoundingClientRect().width>0).map(i=>i.currentSrc)
          }));
          const body = clean(data.body);
          check(response?.status()===200,view+' live HTTP 200',slug,response?.status());
          check(data.heading.length===1 && /football/i.test(data.heading[0]) && data.heading[0].includes(research.mascot),view+' team-specific H1',slug,data.heading);
          check(data.title.includes(research.title),view+' exact authored SEO title',slug,data.title);
          check(data.canonical===origin+route,view+' self canonical',slug,data.canonical);
          check((data.description?.length || 0)>=80,view+' substantive description',slug);
          check(!/noindex/i.test(data.robots),view+' indexable',slug);
          check(body.includes(research.development),view+' individual history or game-day story',slug);
          check(body.includes(research.faq),view+' individually written FAQ',slug);
          check(data.games.length>=research.gameCount,view+' complete 2026 season rows',slug,{rendered:data.games.length,expected:research.gameCount});
          check(data.hrefs.includes(origin+'/county/'+research.county),view+' outbound campus county link',slug);
          check(data.jsonld.includes('SportsTeam')&&data.jsonld.includes('FAQPage'),view+' team and FAQ structured data',slug);
          check(data.width<=width+3,view+' no horizontal overflow',slug,{viewport:width,documentWidth:data.width});
          check(data.broken.length===0,view+' zero broken visible images',slug,data.broken);
          check(jsErrors.length===0,view+' zero JavaScript errors',slug,jsErrors);
          await page.screenshot({path:root+'/'+view+'-'+slug+'.png',fullPage:false,animations:'disabled'});
        } catch(error) {
          check(false,view+' school browser exception',slug,String(error).slice(0,1200));
          await page.screenshot({path:root+'/'+view+'-'+slug+'-error.png',fullPage:false}).catch(()=>{});
        } finally { await page.close().catch(()=>{}); }
        const county = await context.newPage();
        const countyErrors=[];
        county.on('pageerror',e=>countyErrors.push(String(e?.message||e)));
        try {
          const response = await county.goto(origin+'/county/'+research.county,{waitUntil:'domcontentloaded',timeout:60000});
          await county.locator('h1').first().waitFor({state:'visible',timeout:30000});
          await county.waitForFunction(()=>document.documentElement.dataset.tdFootballCountyHydrated==='1',null,{timeout:35000});
          const inbound = await county.locator('a[href="/texas-high-school-football-teams/'+slug+'"]').count();
          check(response?.status()===200,view+' county live HTTP 200',slug,response?.status());
          check(inbound>0,view+' county links back to exact program',slug,{county:research.county,inbound});
          check(countyErrors.length===0,view+' zero county JavaScript errors',slug,countyErrors);
          if (view==='desktop') await county.screenshot({path:root+'/county-'+research.county+'-'+slug+'.png',fullPage:false,animations:'disabled'});
        } catch(error) {
          check(false,view+' county browser exception',slug,String(error).slice(0,1200));
        } finally {
          await county.close().catch(()=>{});
          await context.close();
        }
      }
    } catch(error) { check(false,'research parsing or school setup exception',slug,String(error).slice(0,1200)); }
    schoolResult.checks=report.checks.length-firstCheck;
    schoolResult.failures=report.failures.length-firstFailure;
    console.log(slug+': '+(schoolResult.failures===0?'PASS':'FAIL')+' ('+schoolResult.checks+' checks, '+schoolResult.failures+' failures)');
  }
} finally { await browser.close(); }
await writeFile(root+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({group,mode:report.mode,releaseSha:report.releaseSha,checks:report.checks.length,pass:report.checks.length-report.failures.length,failures:report.failures},null,2));
if(report.failures.length)process.exitCode=1;
