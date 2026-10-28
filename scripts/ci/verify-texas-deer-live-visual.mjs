#!/usr/bin/env node
/** Exact one-page, two-viewport live deer hunting acceptance.
 * Read-only, no third-party analytics, no sitewide crawl and no publishing.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
const pagePath = '/hunting/texas-deer-hunting';
const origin = 'https://texasdefined.com';
const dir = 'artifacts/texas-deer-live-visual';
const photoSource = 'https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/banner_images/2021-05/White-tailed%20deer.jpg?itok=tsL8BNDt';
const viewports = [
  { name: 'desktop', width: 1365, height: 900, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];
if (process.argv.includes('--self-test')) {
  assert.equal(pagePath, '/hunting/texas-deer-hunting');
  assert.deepEqual(viewports.map(x => x.name), ['desktop', 'mobile']);
  assert.ok(viewports.every(x => x.width >= 390 && x.height >= 800));
  assert.ok(photoSource.startsWith('https://www.fws.gov/'));
  console.log('Texas deer Chrome desktop/mobile acceptance contract passed.');
  process.exit(0);
}
const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-deer-qa/node_modules/playwright-core');
await mkdir(dir, { recursive: true });
const result = { checkedAt: new Date().toISOString(), releaseSha: process.env.TARGET_DEPLOY_SHA || '',
  url: origin + pagePath, viewports: [], failures: [] };
const browser = await chromium.launch({
  headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile, hasTouch: viewport.isMobile, deviceScaleFactor: 1,
    });
    await context.route('**/*', route => {
      const url = route.request().url();
      if (/googletagmanager|google-analytics|doubleclick\.net|hotjar|clarity\.ms|facebook\.com\/tr|\/api\/analytics(?:\/|\?|$)/i.test(url)) {
        return route.abort();
      }
      return route.continue();
    });
    const page = await context.newPage();
    const checks = [];
    const errors = [];
    const verify = (name, passed, detail = '') => {
      const x = { name, passed: !!passed, detail: String(detail).slice(0, 240) };
      checks.push(x);
      if (!passed) result.failures.push({ viewport: viewport.name, ...x });
    };
    page.on('pageerror', error => errors.push(error.message.slice(0, 200)));
    const record = { viewport: viewport.name, checks, screenshots: [], workerVersion: null };
    try {
      const response = await page.goto(origin + pagePath + '?deer_visual=' + viewport.name, {
        waitUntil: 'domcontentloaded', timeout: 45000,
      });
      record.workerVersion = response?.headers()?.['x-texasdefined-worker-version'] ?? null;
      verify('HTTP 200', response?.status() === 200, response?.status());
      verify('correct deer authority heading',
        (await page.locator('h1').first().textContent().catch(() => '')).includes('White-Tailed Deer Hunting Guide'));
      verify('official deer regulations link',
        await page.locator('a[href="https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer"]').count() > 0);
      const table = page.locator('table').filter({ has: page.locator('caption', { hasText: 'white-tailed deer season' }) }).first();
      verify('governed deer season table has eight entries', await table.locator('tbody tr').count() === 8,
        await table.locator('tbody tr').count().catch(() => 0));
      verify('eleven-section guide navigation', await page.locator('#deer-guide-11').count() === 1);
      const countySelect = page.locator('#deer-tpwd-county');
      verify('all 254 counties listed in the official-rules finder', await countySelect.locator('option').count() === 255);
      await countySelect.selectOption('la-salle');
      verify('TPWD exceptional La Salle route links correctly',
        await page.locator('a[href="https://tpwd.texas.gov/regulations/outdoor-annual/regs/counties/lasalle/"]').count() === 1);
      await countySelect.selectOption('tarrant');
      verify('TPWD county rules link responds to selection',
        await page.locator('a[href="https://tpwd.texas.gov/regulations/outdoor-annual/regs/counties/tarrant/"]').count() === 1);
      const photo = page.locator('img[alt^="Close view of a white-tailed buck"]').first();
      verify('exact licensed deer image is present', await photo.count() === 1);
      if (await photo.count()) {
        await photo.scrollIntoViewIfNeeded();
        await photo.evaluate(async img => {
          if (img.complete) return;
          await Promise.race([
            new Promise(resolve => { img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', resolve, { once: true }); }),
            new Promise(resolve => setTimeout(resolve, 15000)),
          ]);
        });
        const measurements = await photo.evaluate(img => {
          const r = img.getBoundingClientRect();
          return { src: img.src, width: img.naturalWidth, height: img.naturalHeight,
            visibleWidth: r.width, visibleHeight: r.height, complete: img.complete };
        });
        verify('actual USFWS image rendered', measurements.src === photoSource &&
          measurements.complete && measurements.width > 400 && measurements.height > 200,
          JSON.stringify(measurements));
        verify('image visible at viewport width',
          measurements.visibleWidth > 250 && measurements.visibleWidth <= viewport.width + 3,
          JSON.stringify(measurements));
        const imageShot = dir + '/deer-' + viewport.name + '-photo.png';
        await page.screenshot({ path: imageShot, fullPage: false, animations: 'disabled' });
        record.screenshots.push(imageShot);
      }
      const attribution = await page.locator('figure').filter({ has: photo }).locator('figcaption').first().textContent().catch(() => '');
      verify('USFWS attribution visible', attribution.includes('Tom Koerner'), attribution.slice(0, 180));
      verify('public domain image source linked',
        await page.locator('a[href="https://www.fws.gov/media/white-tailed-deer-buck-0"]').count() > 0);
      const bounds = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      verify('no document horizontal overflow',
        bounds.scrollWidth <= bounds.clientWidth + 3, JSON.stringify(bounds));
      await page.locator('#deer-season-dates').scrollIntoViewIfNeeded();
      const datesShot = dir + '/deer-' + viewport.name + '-season-table.png';
      await page.screenshot({ path: datesShot, fullPage: false, animations: 'disabled' });
      record.screenshots.push(datesShot);
      verify('no uncaught browser errors', errors.length === 0, errors.join(' | '));
    } catch (error) {
      result.failures.push({ viewport: viewport.name, name: 'browser execution',
        detail: String(error).slice(0, 300) });
    } finally {
      result.viewports.push(record);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(dir + '/report.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ checked: result.viewports.length,
  checks: result.viewports.reduce((n, x) => n + x.checks.length, 0),
  failures: result.failures.slice(0, 16) }));
if (result.failures.length) process.exitCode = 1;
