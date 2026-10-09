import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const schoolPath = '/texas-high-school-football-teams/southlake-carroll';
const countyPath = '/county/tarrant';
const artifacts = 'artifacts/southlake-carroll-qa';
const results = [];
await mkdir(artifacts, { recursive: true });
let browser;

function check(value, why) { assert.ok(value, why); }
function cacheBust() { return '?verify=southlake-carroll-' + Date.now(); }

async function schoolCheck(page, viewport) {
  const response = await page.goto(origin + schoolPath + cacheBust(), { waitUntil: 'domcontentloaded', timeout: 50000 });
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(700);
  const d = await page.evaluate(() => {
    const visible = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden'; };
    const imgs = [...document.images].filter(visible);
    return {
      title: document.title,
      h1s: [...document.querySelectorAll('h1')].map(e => e.innerText.trim()),
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      description: document.querySelector('meta[name="description"]')?.content || '',
      robots: document.querySelector('meta[name="robots"]')?.content || '',
      body: document.body.innerText,
      links: [...document.querySelectorAll('a[href]')].map(e => ({ href: e.href, label: (e.innerText || e.getAttribute('aria-label') || '').trim() })),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(e => e.textContent).join('\n'),
      documentWidth: document.documentElement.scrollWidth,
      viewport: innerWidth,
      badImages: imgs.filter(img => !img.hasAttribute('alt') || (img.complete && !img.naturalWidth)).map(img => ({ url: img.currentSrc, alt: img.alt })),
      titleSnapshots: [...document.querySelectorAll('dt')].filter(e => /All-time state titles/i.test(e.innerText)).map(e => (e.nextElementSibling?.innerText || '').trim())
    };
  });
  d.http = response?.status() || 0;
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: artifacts + '/' + viewport + '-southlake-carroll.png', fullPage: true, animations: 'disabled' });
  check(d.http === 200, viewport + ': school HTTP ' + d.http);
  check(d.h1s.length === 1 && /Southlake Carroll Dragons Football/i.test(d.h1s[0]), viewport + ': incorrect school H1 ' + JSON.stringify(d.h1s));
  check(/Southlake Carroll Dragons Football: 8 State Titles/.test(d.title), viewport + ': individual title regression ' + d.title);
  check(d.description.length >= 90 && /eight actual state titles/i.test(d.description), viewport + ': incomplete school description');
  check(d.canonical === origin + schoolPath && !/\bnoindex\b/i.test(d.robots), viewport + ': school canonical/indexability regression');
  for (const label of ['Lee Munn', 'Dragon Stadium', '1988', '1992', '1993', '2002', '2004', '2005', '2006', '2011', '2024', '2003', '16–15', 'eight', '2026', '6A', 'District 4']) {
    check(d.body.includes(label), viewport + ': missing researched Southlake football fact ' + label);
  }
  check(/2003 state final is a historic near miss/i.test(d.body) && /not a ninth title/i.test(d.body), viewport + ': 2003 runner-up vs title distinction omitted');
  check(!/nine football state championships/i.test(d.body), viewport + ': misleading nine-win championship claim');
  for (const target of [
    'https://www.uiltexas.org/100/football',
    'https://www.southlakecarroll.edu/district-information/district-departments/athletics/dragon-state-championships',
    'https://www.dragonsportsnetwork.com/news/110554',
    'https://www.southlakecarroll.edu/district-information/district-departments/athletics'
  ]) check(d.links.some(x => x.href === target), viewport + ': missing official research link ' + target);
  check(d.links.some(x => new URL(x.href).pathname === countyPath), viewport + ': missing school to Tarrant County link');
  check(d.jsonLd.includes('"SportsTeam"') && d.jsonLd.includes('"BreadcrumbList"'), viewport + ': school structured data absent');
  check(d.titleSnapshots.every(value => value === '8'), viewport + ': incorrect dynamic all-time title snapshot ' + JSON.stringify(d.titleSnapshots));
  check(d.documentWidth <= d.viewport + 10, viewport + ': school horizontal overflow ' + d.documentWidth);
  check(d.badImages.length === 0, viewport + ': invalid visible images ' + JSON.stringify(d.badImages));
  return { http: d.http, h1: d.h1s[0], title: d.title, canonical: d.canonical, width: d.documentWidth, viewport: d.viewport, officialLinks: d.links.length, allTimeTitles: d.titleSnapshots, visibleImages: d.badImages.length };
}

async function countyCheck(page, viewport) {
  const response = await page.goto(origin + countyPath + cacheBust(), { waitUntil: 'domcontentloaded', timeout: 50000 });
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25000 });
  await page.evaluate(() => document.fonts?.ready);
  let hydrationTimeout = '';
  try {
    await page.waitForFunction(path => {
      const heads = [...document.querySelectorAll('h1')];
      return heads.length === 1 && /Tarrant County/i.test(heads[0].textContent || '') &&
        document.querySelector('link[rel="canonical"]')?.href === path;
    }, origin + countyPath, { timeout: 15000, polling: 250 });
  } catch (e) { hydrationTimeout = e instanceof Error ? e.message : String(e); }
  const d = await page.evaluate(school => {
    const h1s = [...document.querySelectorAll('h1')].map(e => e.innerText.trim());
    const anchors = [...document.querySelectorAll('a[href]')];
    const link = anchors.find(e => new URL(e.href).pathname === school && /Southlake Carroll/i.test(e.innerText));
    return {
      h1s, title: document.title, canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      countyLink: link?.innerText || '', countyLinkVisible: Boolean(link && link.getBoundingClientRect().width > 0),
      width: document.documentElement.scrollWidth, viewport: innerWidth,
      height: document.documentElement.scrollHeight, mainPreview: (document.getElementById('main')?.innerText || '').slice(0, 200)
    };
  }, schoolPath);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: artifacts + '/' + viewport + '-tarrant-top.png', fullPage: false, animations: 'disabled' });
  const bytes = await page.screenshot({ path: artifacts + '/' + viewport + '-tarrant.png', fullPage: true, animations: 'disabled' });
  const screenshotHeight = bytes.readUInt32BE(20);
  check(response?.status() === 200, viewport + ': county HTTP ' + response?.status());
  check(d.h1s.length === 1 && /Tarrant County/i.test(d.h1s[0]) && d.canonical === origin + countyPath,
    viewport + ': wrong county H1/canonical ' + JSON.stringify(d) + ' hydrate=' + hydrationTimeout);
  check(d.countyLinkVisible, viewport + ': Tarrant County lacks reciprocal Southlake Carroll link');
  check(d.width <= d.viewport + 10, viewport + ': county horizontal overflow');
  check(screenshotHeight >= 0.75 * d.height, viewport + ': incomplete county screenshot ' + screenshotHeight + '/' + d.height);
  return { http: response.status(), h1: d.h1s[0], canonical: d.canonical, linkText: d.countyLink, documentWidth: d.width, screenshotHeight, documentHeight: d.height };
}

try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [name, width, height, mobile] of [['desktop', 1366, 900, false], ['mobile', 390, 844, true]]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    const record = { viewport: name };
    const failures = [];
    try {
      const schoolPage = await context.newPage();
      const schoolErrors = [];
      schoolPage.on('pageerror', e => schoolErrors.push(e.message));
      try { record.school = await schoolCheck(schoolPage, name); }
      catch (e) { failures.push('School: ' + (e instanceof Error ? e.stack : String(e))); }
      const countyPage = await context.newPage();
      const countyErrors = [];
      countyPage.on('pageerror', e => countyErrors.push(e.message));
      try { record.county = await countyCheck(countyPage, name); }
      catch (e) { failures.push('County: ' + (e instanceof Error ? e.stack : String(e))); }
      record.schoolRuntimeErrors = schoolErrors; record.countyRuntimeErrors = countyErrors;
      if (schoolErrors.length) failures.push('School React/runtime errors: ' + schoolErrors.join('; '));
      if (countyErrors.length) failures.push('County React/runtime errors: ' + countyErrors.join('; '));
      if (failures.length) { record.failures = failures; process.exitCode = 1; console.error('FAIL Southlake Carroll ' + name + ': ' + failures.join('\n')); }
      else console.log('PASS Southlake Carroll ' + name + ' individual school and Tarrant County browser QA');
    } finally { results.push(record); await context.close(); }
  }
} catch (e) { results.push({ failure: e instanceof Error ? e.stack : String(e) }); process.exitCode = 1; }
finally {
  await browser?.close();
  await writeFile(artifacts + '/report.json', JSON.stringify({ testedAt: new Date().toISOString(), school: origin + schoolPath, county: origin + countyPath, results, note: 'Southlake-specific source/history/county/SEO/real-Chrome evidence. No unsupported school photo rights claimed.' }, null, 2) + '\n');
}
