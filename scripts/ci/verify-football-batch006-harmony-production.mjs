import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-harmony-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const path = '/texas-high-school-football-teams/big-sandy-harmony';
const output = 'artifacts/football-batch006-harmony';
await mkdir(output, { recursive: true });
const report = { version: 1, releaseSha: process.env.ACCEPTANCE_SHA || null, timestamp: new Date().toISOString(), checks: [], failures: [] };
const check = (ok, label) => { report.checks.push({label, pass:Boolean(ok)}); if (!ok) report.failures.push(label); };
const normalize = str => String(str ?? '').replace(/\s+/g, ' ').trim();
const expected = [
  "Big Sandy Harmony Eagles Football",
  "2022",
  "2026 results",
  "2026",
  "Eagle Stadium",
  "Upshur County",
  "Poth",
  "New Waverly",
  "Quitman",
  "Chisum",
  "Harmony ISD",
  "Who coaches Harmony football in 2026?",
  "Red and White",
];
const sitemap = await fetch(origin + '/sitemap.xml', { signal: AbortSignal.timeout(30000) }).then(async r => ({status:r.status,xml:await r.text()}));
check(sitemap.status === 200 && sitemap.xml.includes(origin + path), 'Harmony appears in production sitemap');

const browser = await chromium.launch({
  headless:true,
  executablePath:process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args:['--no-sandbox', '--disable-dev-shm-usage'],
});
try {
  for (const [viewport, width, height] of [['desktop',1366,900],['mobile',390,844]]) {
    const context = await browser.newContext({ viewport:{width,height}, deviceScaleFactor:1 });
    const page = await context.newPage();
    const runtimeErrors = [];
    page.on('pageerror', e => runtimeErrors.push(String(e.message || e)));
    const response = await page.goto(origin + path, {waitUntil:'domcontentloaded', timeout:45000});
    await page.locator('h1').first().waitFor({state:'visible', timeout:25000});
    await page.waitForFunction(() => document.body.innerText.includes('Who coaches Harmony football in 2026?'), {timeout:30000});
    const data = await page.evaluate(() => ({
      title:document.title,
      h1:[...document.querySelectorAll('h1')].map(x=>x.textContent?.trim()),
      canonical:document.querySelector('link[rel="canonical"]')?.href,
      description:document.querySelector('meta[name="description"]')?.content,
      robots:document.querySelector('meta[name="robots"]')?.content || '',
      body:document.body.innerText,
      width:document.documentElement.scrollWidth,
      jsonLd:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>x.textContent || '').join('\n'),
      hrefs:[...document.querySelectorAll('a[href]')].map(x=>x.href),
      rows:[...document.querySelectorAll('tbody tr')].map(x=>x.innerText),
      brokenImages:[...document.images].filter(i => i.complete && !i.naturalWidth && i.getBoundingClientRect().width).map(i=>i.currentSrc),
    }));
    report.checks.push({label:viewport+' HTTP', pass:response?.status()===200, status:response?.status()});
    if (response?.status()!==200) report.failures.push(viewport+' HTTP 200');
    check(data.h1.length===1 && normalize(data.h1[0])==='Big Sandy Harmony Eagles Football', viewport+' correct H1');
    check(data.title.includes('Harmony Eagles Football'), viewport+' unique SEO title');
    check(data.canonical === origin + path, viewport+' canonical');
    check(data.description?.includes('Harmony Eagles'), viewport+' description');
    check(!/noindex/i.test(data.robots), viewport+' indexable');
    const body = normalize(data.body);
    for (const phrase of expected) check(body.includes(phrase), viewport+' content: '+phrase);
    check(data.hrefs.some(h=>h.endsWith('/county/upshur')),viewport+' outgoing Upshur County link');
    check(data.hrefs.some(h=>h.startsWith('https://www.harmonyisd.net/o/ha/page/harmony-football')),viewport+' official school football source');
    check(data.hrefs.some(h=>h.includes('maxpreps.com/tx/big-sandy/harmony-eagles/football')),viewport+' six-man schedule source');
    check(data.rows.length >= 10, viewport+' 10-row 2026 game schedule');
    check(data.jsonLd.includes('SportsTeam'),viewport+' SportsTeam JSON-LD');
    check(data.jsonLd.includes('FAQPage'),viewport+' FAQPage JSON-LD');
    check(data.width <= width+3, viewport+' no horizontal viewport overflow: '+data.width);
    check(data.brokenImages.length===0,viewport+' no broken visible images');
    check(runtimeErrors.length===0,viewport+' zero JavaScript page errors');
    await page.screenshot({path:output+'/'+viewport+'-big-sandy-harmony-top.png',fullPage:false,animations:'disabled'});
    await page.locator('text=2026 results & schedule').first().scrollIntoViewIfNeeded().catch(()=>{});
    await page.screenshot({path:output+'/'+viewport+'-big-sandy-harmony-season.png',fullPage:false,animations:'disabled'});
    await page.close();

    const county = await context.newPage();
    const countyErrors=[];
    county.on('pageerror',e=>countyErrors.push(String(e.message||e)));
    const countyResponse=await county.goto(origin+'/county/upshur',{waitUntil:'domcontentloaded',timeout:45000});
    await county.locator('h1').first().waitFor({state:'visible',timeout:25000});
    await county.waitForFunction(() => document.documentElement.dataset.tdFootballCountyHydrated === '1', {timeout:40000});
    const hasLink=await county.locator('a[href="/texas-high-school-football-teams/big-sandy-harmony"]').count();
    check(countyResponse?.status()===200,viewport+' Upshur County HTTP 200');
    check(hasLink>0,viewport+' reciprocal Harmony link from Upshur County');
    check(countyErrors.length===0,viewport+' zero county JavaScript errors');
    await county.screenshot({path:output+'/'+viewport+'-upshur.png',fullPage:false,animations:'disabled'});
    await county.close();
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(output+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({verified:report.failures.length===0,checks:report.checks.length,failures:report.failures,releaseSha:report.releaseSha},null,2));
assert.equal(report.failures.length,0,'Harmony production acceptance failures');
