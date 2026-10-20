import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/td-river-images-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const artifactDir = 'artifacts/river-photo-acceptance';
await mkdir(artifactDir, { recursive: true });

const rivers = [
  { slug: 'texas-lavaca-river-guide', image: 'Swing_Bridge_Over_Lavaca_River.jpg', alt: /Lavaca River/i, license: /CC BY 2\.0/i },
  { slug: 'texas-sabine-river-guide', image: 'Sabine_River_near_Big_Sandy', alt: /Sabine River/i, license: /CC BY 3\.0/i },
  { slug: 'texas-san-jacinto-river-guide', image: 'West_Fork_San_Jacinto_River.jpg', alt: /San Jacinto River/i, license: /CC BY-SA 4\.0/i },
];

const pages = [];
const failureNotes = [];
const verify = (condition, message) => assert.ok(condition, message);

async function inspectImage(page, img, title) {
  await img.scrollIntoViewIfNeeded({ timeout: 20_000 });
  await img.waitFor({ state: 'visible', timeout: 15_000 });
  const read = async () => img.evaluate(el => {
    const r = el.getBoundingClientRect();
    return { src: el.currentSrc || el.src, alt: el.alt, naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight, complete: el.complete, renderedWidth: r.width, renderedHeight: r.height };
  });
  try {
    await page.waitForFunction(el => Boolean(el?.complete && el.naturalWidth >= 400), await img.elementHandle(),
      { timeout: 25_000, polling: 300 });
  } catch (err) {
    throw new Error(title + ' image failed to decode: ' + JSON.stringify(await read()) + ' / ' + (err?.message || err));
  }
  const data = await read();
  verify(data.naturalWidth >= 400 && data.renderedHeight > 50, title + ': image is missing or too small');
  verify(data.alt.length >= 30, title + ': image has no descriptive alt');
  return data;
}

async function visit(page, path, title, label) {
  const response = await page.goto(origin + path + '?qa=river-photo-' + Date.now(),
    { waitUntil: 'domcontentloaded', timeout: 55_000 });
  verify(response?.status() === 200, title + ': HTTP ' + response?.status());
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25_000 });
  return { page: path, viewport: label, title, http: response.status(), images: [], network: [] };
}

let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [label, width, height, mobile] of [['mobile', 390, 844, true], ['desktop', 1366, 900, false]]) {
    const context = await browser.newContext({
      viewport: { width, height }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1,
      extraHTTPHeaders: { 'X-TexasDefined-QA': 'river-photo-browser', 'Cache-Control': 'no-cache' },
      userAgent: 'TexasDefined-EditorialPhotoQA/1.0 Chrome',
    });
    // This is an image-display test, not an analytics visit. Do not load
    // third-party advertising, trackers or analytics tags.
    await context.route('**/*', route => {
      const u = route.request().url();
      if (/google-analytics\.com|googletagmanager\.com|doubleclick\.net|facebook\.com\/tr|clarity\.ms|analytics\.tiktok\.com|connect\.facebook\.net|hotjar\.com/i.test(u)) return route.abort('blockedbyclient');
      return route.continue();
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (/commons\.wikimedia\.org|upload\.wikimedia\.org/.test(response.url()) && response.status() >= 400)
        failureNotes.push({ viewport: label, response: response.status(), url: response.url() });
    });
    try {
      for (const river of rivers) {
        const path = '/article/' + river.slug;
        const record = await visit(page, path, river.slug, label);
        pages.push(record);
        const img = page.locator('img[src*="' + river.image + '"]').first();
        verify(await img.count() === 1, label + ': hero photo absent for ' + river.slug);
        const result = await inspectImage(page, img, label + ' hero ' + river.slug);
        verify(river.alt.test(result.alt), label + ': hero alt misidentifies ' + river.slug);
        record.images.push(result);
        await page.screenshot({ path: artifactDir + '/' + label + '-' + river.slug + '.png',
          fullPage: false, animations: 'disabled', timeout: 25_000 });
      }
      for (const path of ['/article/texas-rivers-explained', '/explore/landscapes/rivers-and-river-valleys']) {
        const record = await visit(page, path, path, label);
        pages.push(record);
        for (const river of rivers) {
          const anchor = page.locator('a[href="/article/' + river.slug + '"]').filter({ has: page.locator('img') }).first();
          verify(await anchor.count() === 1, label + ': missing river card ' + river.slug + ' at ' + path);
          const img = anchor.locator('img').first();
          const result = await inspectImage(page, img, label + ' card ' + river.slug + ' at ' + path);
          verify(result.src.includes(river.image), label + ': generic or mismatched image at ' + path + ' for ' + river.slug);
          verify(river.alt.test(result.alt), label + ': inaccurate card alt at ' + path);
          const outer = anchor.locator('..');
          const credit = await outer.innerText();
          verify(river.license.test(credit), label + ': missing visible photo license at ' + path + ' for ' + river.slug);
          record.images.push({ river: river.slug, ...result, credited: true });
        }
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        verify(overflow <= 10, label + ': horizontal overflow at ' + path + ' = ' + overflow);
      }
      verify(errors.length === 0, label + ': uncaught browser errors ' + JSON.stringify(errors));
    } catch (e) {
      try { await page.screenshot({ path: artifactDir + '/' + label + '-failure.png', fullPage: false, timeout: 15_000 }); }
      catch { /* preserve the primary failure */ }
      throw e;
    } finally { await context.close(); }
  }
} finally {
  await writeFile(artifactDir + '/acceptance.json', JSON.stringify({
    at: new Date().toISOString(), origin, commit: process.env.GITHUB_SHA || '',
    pages, failures: failureNotes,
  }, null, 2));
  await browser?.close();
}
console.log('River photo acceptance passed: three live guide heroes and six directory cards at mobile and desktop widths.');
