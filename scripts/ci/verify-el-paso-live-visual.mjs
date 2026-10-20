#!/usr/bin/env node
/** Bounded live Chrome acceptance: one El Paso metro URL x desktop and mobile.
 * Read-only: no booking, publishing, sitewide crawling, cache purging or analytics.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = 'https://texasdefined.com';
const pagePath = '/metro-area/el-paso-metro';
const outputDir = 'artifacts/el-paso-live-visual';
const viewports = [
  { name: 'desktop', width: 1365, height: 900, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];
const photoAlt = 'Downtown El Paso skyline beneath the Franklin Mountains';
const metroLink = '/county/hudspeth';

if (process.argv.includes('--self-test')) {
  assert.equal(viewports.length, 2);
  assert.equal(pagePath, '/metro-area/el-paso-metro');
  assert.deepEqual(viewports.map(v => v.name), ['desktop', 'mobile']);
  assert.ok(viewports.every(v => v.width > 0 && v.height > 0));
  console.log('El Paso two-viewport browser scenario self-test passed.');
  process.exit(0);
}

const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-el-paso-qa/node_modules/playwright-core');
await mkdir(outputDir, { recursive: true });
const report = { checkedAt: new Date().toISOString(), sha: process.env.TARGET_DEPLOY_SHA || '',
  page: pagePath, viewports: [], failures: [] };
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile, hasTouch: viewport.isMobile, deviceScaleFactor: 1 });
    // Exclude measurement pings so synthetic acceptance does not pollute metrics.
    await context.route('**/*', route => {
      const url = route.request().url();
      if (/googletagmanager|google-analytics|doubleclick\.net|hotjar|clarity\.ms|plausible\.io|facebook\.com\/tr|\/api\/analytics(?:\/|\?|$)/i.test(url))
        return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    const checks = [];
    const errors = [];
    const verify = (name, ok, detail = '') => {
      const check = { name, ok: !!ok, detail: String(detail).slice(0, 240) };
      checks.push(check);
      if (!check.ok) report.failures.push({ viewport: viewport.name, ...check });
    };
    page.on('pageerror', error => errors.push(error.message.slice(0, 240)));
    const record = { name: viewport.name, checks, errors, screenshots: [], workerVersion: null };
    try {
      const response = await page.goto(origin + pagePath + '?el_paso_visual=' +
        encodeURIComponent((report.sha || 'current').slice(0, 12)) + '-' + viewport.name,
        { waitUntil: 'domcontentloaded', timeout: 45000 });
      record.workerVersion = response?.headers()['x-texasdefined-worker-version'] || null;
      verify('HTTP 200', response?.status() === 200, response?.status());
      await page.locator('#el-paso-metro-geography').waitFor({ state: 'visible', timeout: 25000 });
      await page.evaluate(() => document.fonts?.ready);
      const image = page.locator('img[alt="' + photoAlt + '"]');
      verify('exact El Paso photograph exists', await image.count() === 1);
      if (await image.count()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(async img => { if (!img.complete) await new Promise(resolve => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
          setTimeout(resolve, 15000);
        }); });
        const photo = await image.evaluate(img => {
          const r = img.getBoundingClientRect();
          return { src: img.getAttribute('src') || '', width: img.naturalWidth,
            height: img.naturalHeight, drawnWidth: r.width, drawnHeight: r.height };
        });
        verify('hero served by same-origin editorial image route',
          photo.src.startsWith('/media/remote?url='), photo.src);
        verify('hero decoded real image pixels', photo.width >= 500 && photo.height >= 300, JSON.stringify(photo));
        verify('hero visible at desktop/mobile dimensions', photo.drawnWidth > 250 && photo.drawnHeight > 120,
          JSON.stringify(photo));
      }
      const caption = page.locator('figure').filter({ has: image }).locator('figcaption');
      verify('licensed author attribution', (await caption.innerText().catch(() => '')).includes('Quintin Soloviev'));
      verify('clickable CC BY 4.0 license',
        (await caption.locator('a[href="https://creativecommons.org/licenses/by/4.0/"]').count()) > 0);
      const nav = page.locator('nav[aria-label="Explore the El Paso area on Texas Defined"]');
      verify('reciprocal El Paso navigation is present', await nav.count() === 1);
      if (await nav.count()) {
        verify('Hudspeth County link', await nav.locator('a[href="' + metroLink + '"]').count() > 0);
        verify('El Paso County link', await nav.locator('a[href="/county/el-paso"]').count() > 0);
        await nav.scrollIntoViewIfNeeded();
      }
      const bounds = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      verify('no viewport-wide horizontal overflow', bounds.width <= bounds.viewport + 3, JSON.stringify(bounds));
      // Preserve the finished image and navigational state for human inspection.
      await image.scrollIntoViewIfNeeded().catch(() => {});
      const heroPath = outputDir + '/el-paso-' + viewport.name + '-hero.png';
      await page.screenshot({ path: heroPath, animations: 'disabled', fullPage: false });
      record.screenshots.push(heroPath);
      if (await nav.count()) {
        await nav.scrollIntoViewIfNeeded();
        const linksPath = outputDir + '/el-paso-' + viewport.name + '-links.png';
        await page.screenshot({ path: linksPath, animations: 'disabled', fullPage: false });
        record.screenshots.push(linksPath);
      }
      verify('no browser JavaScript errors', errors.length === 0, errors.join(' | '));
    } catch (error) {
      report.failures.push({ viewport: viewport.name, name: 'browser probe', detail: String(error).slice(0, 350) });
    } finally {
      report.viewports.push(record);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(outputDir + '/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ viewports: report.viewports.length, totalChecks:
  report.viewports.reduce((n, v) => n + v.checks.length, 0), failures: report.failures }));
if (report.failures.length) process.exitCode = 1;
