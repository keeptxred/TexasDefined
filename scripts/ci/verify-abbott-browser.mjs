import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const schoolPath = '/texas-high-school-football-teams/abbott';
const countyPath = '/county/hill';
const artifacts = 'artifacts/abbott-qa';
await mkdir(artifacts, { recursive: true });
const runs = [];
let browser;

function verify(condition, description) { assert.ok(condition, description); }
function hrefMatches(links, wanted) { return links.some((link) => link.href === wanted); }
function suffix() { return '?verify=abbott-football-' + Date.now(); }

async function checkSchool(page, viewport) {
  const response = await page.goto(origin + schoolPath + suffix(), { waitUntil: 'domcontentloaded', timeout: 50_000 });
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25_000 });
  await page.evaluate(() => document.fonts?.ready);
  const historicalPhoto = page.locator('img[alt*="Willie Nelson"]').first();
  await historicalPhoto.scrollIntoViewIfNeeded({ timeout: 12_000 });
  await page.waitForTimeout(800);
  const data = await page.evaluate(() => {
    const visible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    const imgs = [...document.images].filter(visible);
    const picture = document.querySelector('img[alt*="Willie Nelson"]');
    return {
      title: document.title,
      h1s: [...document.querySelectorAll('h1')].map(el => el.innerText.trim()),
      description: document.querySelector('meta[name=description]')?.content || '',
      robots: document.querySelector('meta[name=robots]')?.content || '',
      canonical: document.querySelector('link[rel=canonical]')?.href || '',
      text: document.body.innerText,
      links: [...document.querySelectorAll('a[href]')].map(el => ({ href: el.href, label: (el.innerText || el.getAttribute('aria-label') || '').trim() })),
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => el.textContent).join('\n'),
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      missingImageAlts: imgs.filter(img => !img.hasAttribute('alt')).map(img => img.currentSrc),
      brokenVisibleImages: imgs.filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc),
      historicalPhoto: picture ? { src: picture.currentSrc, complete: picture.complete, naturalWidth: picture.naturalWidth, renderedWidth: picture.getBoundingClientRect().width, alt: picture.alt } : null,
    };
  });
  data.http = response?.status() || 0;
  // Restore scroll after exposing the archival photograph; otherwise a sticky
  // mobile header can be painted at the image offset in a full-page capture.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
  await page.screenshot({ path: artifacts + '/' + viewport + '-abbott.png', fullPage: true, animations: 'disabled' });
  verify(data.http === 200, viewport + ': Abbott HTTP ' + data.http);
  verify(data.h1s.length === 1 && /Abbott Panthers Football/i.test(data.h1s[0]), viewport + ': invalid Abbott H1 ' + JSON.stringify(data.h1s));
  verify(data.title.includes('Abbott Panthers Six-Man Football: 2015 Title'), viewport + ': Abbott-specific title missing');
  verify(data.description.length >= 80 && /Abbott Panthers/i.test(data.description), viewport + ': Abbott meta description');
  verify(data.canonical === origin + schoolPath && !/\bnoindex\b/i.test(data.robots), viewport + ': canonical/indexability');
  for (const label of [
    'Kyle Crawford', 'Terry J Crawford', 'Willie Nelson', 'Crowell', '40–30',
    'Throckmorton', '72–30', 'Westbrook', 'Panther Field', 'Coolidge',
    '1A Division I', 'District 14', '2015',
  ]) verify(data.text.includes(label), viewport + ': missing school-specific text ' + label);
  for (const link of [
    'https://www.uiltexas.org/football/archives/P98',
    'https://www.uiltexas.org/football/archives/P148',
    'https://www.abbottisd.org/apps/events/',
    'https://www.abbottisd.org/apps/pages/index.jsp?pREC_ID=623415&type=u&uREC_ID=421837',
    'https://commons.wikimedia.org/wiki/File:Willie-Nelson-Highschool.jpg',
  ]) verify(hrefMatches(data.links, link), viewport + ': missing official/archive/rights link ' + link);
  verify(data.links.some(link => new URL(link.href).pathname === countyPath), viewport + ': no Abbott → Hill County link');
  verify(data.ld.includes('"SportsTeam"') && data.ld.includes('"BreadcrumbList"'), viewport + ': sports/breadcrumb schema');
  verify(data.documentWidth <= data.viewportWidth + 10, viewport + ': horizontal overflow ' + data.documentWidth);
  verify(!data.missingImageAlts.length && !data.brokenVisibleImages.length, viewport + ': broken/unnamed imagery');
  verify(data.historicalPhoto && data.historicalPhoto.naturalWidth >= 100 && data.historicalPhoto.renderedWidth <= 220,
    viewport + ': rights-cleared 134x200 Willie Nelson archival image missing or oversized: ' + JSON.stringify(data.historicalPhoto));
  return { http: data.http, title: data.title, h1s: data.h1s, canonical: data.canonical, viewportWidth: data.viewportWidth, documentWidth: data.documentWidth,
    sourceLinks: data.links.length, historicalPhoto: data.historicalPhoto };
}

async function checkCounty(page, viewport) {
  const response = await page.goto(origin + countyPath + suffix(), { waitUntil: 'domcontentloaded', timeout: 50_000 });
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25_000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(750);
  // Confirm hydration protection does not silently disable the county's
  // existing lodging/affiliate surface, as well as checking runtime errors.
  await page.locator('#expedia-travel-surface').waitFor({ state: 'attached', timeout: 15_000 });
  const data = await page.evaluate((school) => {
    const h1 = document.querySelector('h1')?.innerText || '';
    const canonical = document.querySelector('link[rel=canonical]')?.href || '';
    const link = [...document.querySelectorAll('a[href]')].find(el => new URL(el.href).pathname === school && /Abbott/i.test(el.innerText));
    return { h1, canonical, linkText: link?.innerText || '', linkVisible: Boolean(link && link.getBoundingClientRect().width > 0),
      height: document.documentElement.scrollHeight, width: document.documentElement.scrollWidth, viewport: window.innerWidth };
  }, schoolPath);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: artifacts + '/' + viewport + '-hill-county-top.png', fullPage: false, animations: 'disabled' });
  const buffer = await page.screenshot({ path: artifacts + '/' + viewport + '-hill-county.png', fullPage: true, animations: 'disabled' });
  const screenshotHeight = buffer.readUInt32BE(20);
  verify(response?.status() === 200, viewport + ': Hill County HTTP ' + response?.status());
  verify(/Hill County/i.test(data.h1) && data.canonical === origin + countyPath, viewport + ': wrong county H1/canonical');
  verify(data.linkVisible, viewport + ': Abbott reciprocal Hill County link missing');
  verify(data.width <= data.viewport + 10, viewport + ': county horizontal overflow');
  verify(screenshotHeight >= data.height * 0.75, viewport + ': incomplete Hill County screenshot ' + screenshotHeight + '/' + data.height);
  return { http: response.status(), h1: data.h1, canonical: data.canonical, linkText: data.linkText,
    documentHeight: data.height, screenshotHeight, documentWidth: data.width };
}

try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [name, width, height, mobile] of [['desktop', 1366, 900, false], ['mobile', 390, 844, true]]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    const schoolPage = await context.newPage();
    const schoolErrors = [];
    schoolPage.on('pageerror', e => schoolErrors.push(e.message));
    const result = { viewport: name };
    try {
      const failures = [];
      try {
        result.school = await checkSchool(schoolPage, name);
      } catch (error) {
        const message = error instanceof Error ? error.stack || error.message : String(error);
        failures.push('School: ' + message);
      }
      // Inspect the independently rendered Hill County page even when the
      // school contract fails. Never let one failure hide a second defect.
      const countyPage = await context.newPage();
      const countyErrors = [];
      countyPage.on('pageerror', e => countyErrors.push(e.message));
      try {
        result.county = await checkCounty(countyPage, name);
      } catch (error) {
        const message = error instanceof Error ? error.stack || error.message : String(error);
        failures.push('County: ' + message);
      }
      result.schoolRuntimeErrors = schoolErrors;
      result.countyRuntimeErrors = countyErrors;
      if (schoolErrors.length) failures.push('School runtime/hydration: ' + schoolErrors.join('; '));
      if (countyErrors.length) failures.push('County runtime/hydration: ' + countyErrors.join('; '));
      if (failures.length) {
        result.failures = failures;
        process.exitCode = 1;
        console.error('FAIL Abbott ' + name + ' browser acceptance:\n' + failures.join('\n'));
      } else {
        console.log('PASS Abbott ' + name + ' school/rights/SEO and Hill County reciprocal browser QA');
      }
    } catch (error) {
      result.failure = error instanceof Error ? error.stack || error.message : String(error);
      console.error('FAIL Abbott ' + name + ' browser acceptance: ' + result.failure);
      process.exitCode = 1;
    } finally {
      runs.push(result);
      await context.close();
    }
  }
} catch (error) {
  runs.push({ failure: error instanceof Error ? error.stack || error.message : String(error) });
  process.exitCode = 1;
} finally {
  await browser?.close();
  await writeFile(artifacts + '/report.json', JSON.stringify({ testedAt: new Date().toISOString(),
    school: origin + schoolPath, county: origin + countyPath, runs,
    note: 'Abbott-specific real Chrome acceptance; historic photo copyright attribution preserved. Independent rights/accessibility review remains separate.'
  }, null, 2) + '\n');
}
