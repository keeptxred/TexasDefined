#!/usr/bin/env node
/** Real production Chrome QA for the deer authority guide.
 * One URL x three representative viewports; read-only and no sitewide crawl.
 * Preserves screenshots and machine-readable findings for reproducible review.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = 'https://texasdefined.com';
const route = '/hunting/texas-deer-hunting';
const directory = 'artifacts/deer-production-visual';
const viewports = [
  { name: 'small-mobile', width: 320, height: 720, isMobile: true },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
  { name: 'desktop', width: 1440, height: 900, isMobile: false },
];
if (process.argv.includes('--self-test')) {
  assert.equal(viewports.length, 3);
  assert.deepEqual(viewports.map(v => v.width), [320, 390, 1440]);
  assert.equal(route, '/hunting/texas-deer-hunting');
  console.log('Deer 320/mobile/desktop Chrome QA contract passed.');
  process.exit(0);
}
const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-deer-qa/node_modules/playwright-core'
);
await mkdir(directory, { recursive: true });
const result = { route, verifiedAt: new Date().toISOString(), commit: process.env.GITHUB_SHA || '',
  viewports: [], failures: [] };
const browser = await chromium.launch({
  headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
try {
  for (const viewport of viewports) {
    const record = { viewport: viewport.name, width: viewport.width, checks: [],
      screenshot: directory + '/deer-' + viewport.name + '.png', workerVersion: null };
    const check = (name, ok, evidence = '') => {
      record.checks.push({ name, passed: Boolean(ok), evidence: String(evidence).slice(0, 250) });
      if (!ok) result.failures.push({ viewport: viewport.name, name, evidence: String(evidence).slice(0, 250) });
    };
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile, hasTouch: viewport.isMobile, deviceScaleFactor: 1,
    });
    await context.route(/(googletagmanager|google-analytics|doubleclick\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i,
      route => route.abort());
    const page = await context.newPage();
    const browserErrors = [];
    page.on('pageerror', e => browserErrors.push(e.message.slice(0, 250)));
    try {
      const response = await page.goto(origin + route + '?deer_browser_qa=' +
        encodeURIComponent((result.commit || 'scheduled').slice(0, 12)) + '-' + viewport.name,
        { waitUntil: 'domcontentloaded', timeout: 45000 });
      record.workerVersion = response?.headers()['x-texasdefined-worker-version'] || null;
      check('HTTP 200', response?.status() === 200, response?.status());
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 });
      const title = await page.locator('h1').first().innerText();
      check('deer authority H1', /Texas White-Tailed Deer Hunting Guide/i.test(title), title);
      await page.locator('#deer-season-dates').waitFor({ state: 'visible', timeout: 15000 });
      check('date table has eight rows', (await page.locator('#deer-season-dates').count()) === 1 &&
        (await page.locator('table').first().locator('tbody tr').count()) >= 8);
      const image = page.locator('img[alt^="Close view of a white-tailed buck"]').first();
      check('deer hero image exists', (await image.count()) === 1);
      if (await image.count()) {
        await image.scrollIntoViewIfNeeded();
        await page.waitForFunction(() => {
          const image = document.querySelector('img[alt^="Close view of a white-tailed buck"]');
          return !!image && image.complete;
        }, null, { timeout: 20000 });
        const rendered = await image.evaluate(img => {
          const bounds = img.getBoundingClientRect();
          return { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
            renderedWidth: bounds.width, renderedHeight: bounds.height, currentSrc: img.currentSrc };
        });
        check('deer photo decodes actual pixels', rendered.naturalWidth >= 400 &&
          rendered.naturalHeight >= 250, JSON.stringify(rendered));
        check('deer image fits viewport', rendered.renderedWidth > 110 &&
          rendered.renderedWidth <= viewport.width + 2, JSON.stringify(rendered));
        check('licensed federal source image', rendered.currentSrc.includes('www.fws.gov/'),
          rendered.currentSrc);
      }
      check('FWS attribution remains visible', (await page.locator('a[href="https://www.fws.gov/media/white-tailed-deer-buck-0"]').count()) > 0);
      const anchors = await page.locator('[id^="deer-guide-"]').count();
      check('guide sections render after hydration', anchors >= 11, anchors);
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      check('no document horizontal overflow', overflow.scrollWidth <= overflow.clientWidth + 3,
        JSON.stringify(overflow));
      const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
      check('responsive viewport meta', !!viewportMeta && viewportMeta.includes('width=device-width'),
        viewportMeta);
      check('no runtime JS errors', browserErrors.length === 0, browserErrors.join(' | '));
      await image.scrollIntoViewIfNeeded().catch(() => {});
      await page.screenshot({ path: record.screenshot, animations: 'disabled', fullPage: false });
    } catch (error) {
      result.failures.push({ viewport: viewport.name, name: 'Chrome execution',
        evidence: String(error).slice(0, 450) });
      try { await page.screenshot({ path: record.screenshot, animations: 'disabled' }); }
      catch { /* keep the structured failure even if Chrome is detached */ }
    } finally {
      result.viewports.push(record);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(directory + '/report.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ checked: result.viewports.length,
  assertions: result.viewports.reduce((n, v) => n + v.checks.length, 0),
  failures: result.failures }, null, 2));
if (result.failures.length) process.exitCode = 1;
