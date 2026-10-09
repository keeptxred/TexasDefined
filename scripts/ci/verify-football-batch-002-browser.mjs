import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const output = 'artifacts/football-batch-002';
const roster = [
  ['abernathy','hale'], ['abilene','taylor'], ['abilene-cooper','taylor'],
  ['abilene-texas-leadership','taylor'], ['abilene-wylie','taylor'],
  ['ackerly-sands','dawson'], ['agua-dulce','nueces'],
  ['alba-golden','wood'], ['albany','shackelford'], ['aledo','parker'],
  ['alice','jim-wells'], ['alief-elsik','harris'], ['alief-hastings','harris'],
  ['alief-taylor','harris'], ['all-saints-fort-worth','tarrant'],
  ['allen','collin'], ['alpine','brewster'], ['altair-rice','colorado'],
  ['alto','cherokee'], ['alvarado','johnson'], ['alvin','brazoria'],
  ['alvin-iowa-colony','brazoria'], ['alvin-shadow-creek','brazoria'],
  ['alvord','wise'], ['amarillo','randall'],
];
const registry = JSON.parse(await readFile('docs/football-authority/REGISTRY.json', 'utf8'));
assert.equal(roster.length, 25);
assert.deepEqual(registry.batch.slugs, roster.map(([slug]) => slug));
const bySlug = new Map(registry.schoolRecords.filter(x => x.batch === 2).map(x => [x.slug, x]));
assert.equal(bySlug.size, 25);
await mkdir(output, { recursive: true });
// Confirm actual production sitemap membership, not only repository URL generation.
// A temporary 503 must fail acceptance rather than falsely promote profiles.
const sitemapChecks = [];
try {
  const response = await fetch(origin + '/sitemap.xml?batch002_acceptance=' + Date.now(), { signal: AbortSignal.timeout(90000) });
  const xml = await response.text();
  const locations = new Set([...xml.matchAll(new RegExp('<loc>\\s*([^<]+)\\s*</loc>', 'gi'))].map(match => match[1].replace(/&amp;/g, '&').trim()));
  for (const [slug] of roster) {
    const target = origin + '/texas-high-school-football-teams/' + slug;
    sitemapChecks.push({ slug, present: response.ok && locations.has(target), http: response.status });
  }
} catch (error) {
  for (const [slug] of roster) sitemapChecks.push({ slug, present: false, error: String(error) });
}
const results = [];
const contexts = [];
const browser = await chromium.launch({
  headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox','--disable-dev-shm-usage'],
});
const check = (errors, condition, message) => { if (!condition) errors.push(message); };
const schoolPath = slug => '/texas-high-school-football-teams/' + slug;
const tidy = text => String(text || '').trim().replace(/\s+/g, ' ');
const pathname = href => { try { return new URL(href, origin).pathname.replace(/\/$/, ''); } catch { return ''; } };
async function collect(page) {
  return await page.evaluate(() => ({
    title: document.title,
    h1: [...document.querySelectorAll('h1')].map(x => x.innerText.trim()),
    canonical: document.querySelector('link[rel=canonical]')?.href || '',
    description: document.querySelector('meta[name=description]')?.content || '',
    robots: document.querySelector('meta[name=robots]')?.content || '',
    body: document.body?.innerText || '',
    links: [...document.querySelectorAll('a[href]')].map(x => ({href:x.href,text:(x.innerText || x.getAttribute('aria-label') || '').trim(),visible:x.getBoundingClientRect().width > 0})),
    schema: [...document.querySelectorAll('script[type="application/ld+json"]')].map(x => x.textContent || '').join('\n'),
    brokenImages: [...document.images].filter(x => x.complete && !x.naturalWidth && x.getBoundingClientRect().width > 0).map(x => x.currentSrc),
    missingImageAlts: [...document.images].filter(x => !x.hasAttribute('alt') && x.getBoundingClientRect().width > 0).map(x => x.currentSrc),
    documentWidth:document.documentElement.scrollWidth,
    viewportWidth:window.innerWidth,
  }));
}
async function visit(context, viewport, id, path, validate) {
  const page = await context.newPage();
  const errors = [], runtime = [];
  page.on('pageerror', error => runtime.push(error.message));
  let status = 0, data = null;
  try {
    const response = await page.goto(origin + path + '?batch002_qa=' + Date.now(), {waitUntil:'domcontentloaded', timeout:55000});
    status = response?.status() || 0;
    await page.locator('h1').first().waitFor({state:'visible',timeout:25000});
    await page.waitForTimeout(900);
    data = await collect(page);
    validate(errors, data, status);
    check(errors, !runtime.length, 'client runtime errors: '+ runtime.join(' | '));
    await page.screenshot({path: output+'/'+viewport+'-'+id+'.png', animations:'disabled', fullPage:false, timeout:20000});
  } catch (error) {
    errors.push('browser failure: '+String(error?.message || error).slice(0,350));
  } finally {
    results.push({viewport,id,path,http:status,passed:errors.length===0,errors,
      title:data?.title || '',h1:data?.h1 || [],canonical:data?.canonical || '',
      sourceLinkCount:data?.links?.filter(x=>/^https?:/.test(x.href) && !x.href.startsWith(origin)).length || 0,
      horizontalOverflow:data ? Math.max(0,data.documentWidth-data.viewportWidth):null,
      runtimeErrors:runtime});
    await page.close();
  }
}
try {
  for (const [viewport,width,height,mobile] of [['desktop',1366,900,false],['mobile',390,844,true]]) {
    const context = await browser.newContext({viewport:{width,height},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1});
    contexts.push(context);
    for (const [slug,county] of roster) {
      const row = bySlug.get(slug);
      await visit(context,viewport,'school-'+slug,schoolPath(slug),(err,d,status)=>{
        check(err,status===200,'non-200 school HTTP: '+status);
        check(err,d.h1.length===1,'expected exactly one H1');
        check(err,tidy(d.h1[0]).length>8,'missing specific school H1');
        check(err,d.title.length>=20 && d.description.length>=55,'missing useful SEO title/description');
        check(err,d.canonical===origin+schoolPath(slug),'incorrect canonical: '+d.canonical);
        check(err,!/\bnoindex\b/i.test(d.robots),'unexpected noindex');
        check(err,d.body.length>1200,'insufficient rendered content');
        check(err,/football/i.test(d.body),'football content not rendered');
        check(err,d.links.some(x=>pathname(x.href)==='/county/'+county),'missing school to county link');
        check(err,d.schema.includes('SportsTeam') && d.schema.includes('BreadcrumbList'),'missing SportsTeam/Breadcrumb schema');
        check(err,d.links.some(x => (row.evidenceSources || []).some(source => x.href.replace(/\/$/,'')===source.replace(/\/$/,''))),'no visible matching recorded research source');
        check(err,d.documentWidth<=d.viewportWidth+10,'horizontal overflow '+(d.documentWidth-d.viewportWidth));
        check(err,d.brokenImages.length===0,'broken images '+d.brokenImages.join(', '));
        check(err,d.missingImageAlts.length===0,'missing image alt text');
      });
    }
    const countyToSlugs = new Map();
    for (const [slug,county] of roster) countyToSlugs.set(county,[...(countyToSlugs.get(county)||[]),slug]);
    for (const [county,slugs] of countyToSlugs) {
      await visit(context,viewport,'county-'+county,'/county/'+county,(err,d,status)=>{
        check(err,status===200,'non-200 county HTTP: '+status);
        check(err,d.h1.length===1,'county H1 count not one');
        check(err,d.canonical===origin+'/county/'+county,'incorrect county canonical: '+d.canonical);
        check(err,!/\bnoindex\b/i.test(d.robots),'county noindex');
        check(err,d.documentWidth<=d.viewportWidth+10,'county horizontal overflow');
        for (const slug of slugs) check(err,d.links.some(x=>pathname(x.href)===schoolPath(slug)&&x.visible),'county missing visible reciprocal '+slug);
      });
    }
    await context.close();
  }
} finally { await browser.close(); }
const fails=results.filter(x=>!x.passed);
const sitemapFailures=sitemapChecks.filter(x=>!x.present);
const summary={date:new Date().toISOString(),testedCommit:process.env.ACCEPTANCE_SHA || null,assigned:25,
  schoolChecks:results.filter(x=>x.id.startsWith('school-')).length,
  countyChecks:results.filter(x=>x.id.startsWith('county-')).length,
  passedChecks:results.length-fails.length,failedChecks:fails.length,sitemapChecks,sitemapFailures,results};
await writeFile(output+'/report.json',JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({testedCommit:summary.testedCommit,schoolChecks:summary.schoolChecks,
 countyChecks:summary.countyChecks,sitemapPassed:sitemapChecks.length-sitemapFailures.length,sitemapFailed:sitemapFailures.length,passed:summary.passedChecks,failed:summary.failedChecks,
 failures:fails.map(x=>({viewport:x.viewport,id:x.id,errors:x.errors}))},null,2));
if(fails.length || sitemapFailures.length) process.exitCode=1;
