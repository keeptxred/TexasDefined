/**
 * Read-only storefront visual QA. No cart interactions, purchases, seller writes
 * or external Cloudflare Browser Rendering API permissions.
 * Playwright runs within GitHub Actions against public TexasDefined pages.
 */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/td-fishing-qa/node_modules/playwright-core');
const origin = (process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const dir = 'artifacts/fishing-shirts-browser';
await mkdir(dir, { recursive: true });
const results = [];

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}),
  args: ['--no-sandbox'],
});

const checks = [
  { name: 'lake-conroe-desktop', path: '/fishing/lakes/lake-conroe', viewport: { width: 1440, height: 900 } },
  { name: 'fishing-hub-mobile', path: '/fishing', viewport: { width: 390, height: 844 } },
  { name: 'largemouth-bass-desktop', path: '/fishing/species/largemouth-bass', viewport: { width: 1440, height: 900 } },
];

try {
  for (const row of checks) {
    const context = await browser.newContext({ viewport: row.viewport });
    const page = await context.newPage();
    const entry = { ...row, errors: [], result: 'FAIL' };
    results.push(entry);
    page.on('pageerror', e => entry.errors.push(e.message));
    try {
      const response = await page.goto(origin + row.path, { waitUntil: 'domcontentloaded', timeout: 60000 });
      assert.equal(response?.status(), 200, `${row.path}: unexpected HTTP ${response?.status()}`);
      const section = page.locator('[aria-label="Texas Defined fishing shirts"]');
      await section.waitFor({ state: 'visible', timeout: 25000 });
      const merchLinks = section.locator('a[href^="/shop/product/"]');
      const count = await merchLinks.count();
      assert.ok(count >= 2, `${row.path}: expected at least two shop product cards, got ${count}`);
      const screenshot = `${dir}/${row.name}.png`;
      await section.screenshot({ path: screenshot, animations: 'disabled', timeout: 20000 });
      const first = section.locator('img').first();
      await first.waitFor({ state: 'visible', timeout: 10000 });
      const image = await first.evaluate(e => ({ complete: e.complete, naturalWidth: e.naturalWidth, src: e.currentSrc }));
      assert.ok(image.complete && image.naturalWidth > 0, `${row.path}: actual product mockup failed to load: ${image.src}`);
      entry.result = 'PASS';
      entry.cards = count;
      entry.productMockupLoaded = true;
      entry.screenshot = screenshot;
      console.log(`PASS ${row.name}: ${count} real product cards, image loaded, screenshot ${screenshot}`);
    } catch (error) {
      entry.error = String(error);
      process.exitCode = 1;
      console.error(`FAIL ${row.name}: ${entry.error}`);
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(`${dir}/results.json`, JSON.stringify({ noPurchases: true, noEtsyWrites: true, results }, null, 2));
}
if (results.some(x => x.result !== 'PASS')) process.exitCode = 1;
