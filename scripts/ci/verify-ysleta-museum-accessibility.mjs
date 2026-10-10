import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-ysleta-qa/node_modules/playwright-core');
const axe = require(process.env.AXE_CORE_PATH || '/tmp/texasdefined-ysleta-qa/node_modules/axe-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const museumPath = '/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso';
const artifacts = 'artifacts/ysleta-museum-qa';
const results = [];
await mkdir(artifacts, { recursive: true });
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [label, width, height, mobile] of [['mobile', 390, 844, true], ['desktop', 1366, 900, false]]) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const runtimeErrors = [];
    page.on('pageerror', err => runtimeErrors.push(err.message));
    try {
      const response = await page.goto(origin + museumPath + '?verify=ysleta-a11y-' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 60000 });
      assert.equal(response?.status(), 200, `${label}: museum HTTP response`);
      await page.waitForFunction(() => document.documentElement.dataset.tdRootHydrated === '1', null, { timeout: 25000 });
      await page.locator('main h1').waitFor({ state: 'visible' });
      await page.addScriptTag({ content: axe.source });
      const violations = await page.evaluate(async () => {
        const results = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
        return results.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description,
          nodes: v.nodes.slice(0, 12).map(n => ({ target: n.target, summary: n.failureSummary })) }));
      });
      // Exercise browser Tab navigation; static tabindex inspection cannot demonstrate real keyboard focus.
      const firstLink = page.locator('main a[href]').first();
      await firstLink.focus();
      const tabs = [];
      for (let i = 0; i < 9; i++) {
        await page.keyboard.press('Tab');
        tabs.push(await page.evaluate(() => {
          const e = document.activeElement;
          const rect = e?.getBoundingClientRect();
          const style = e ? getComputedStyle(e) : null;
          return { tag: e?.tagName || null, href: e?.getAttribute('href') || null,
            name: (e?.getAttribute('aria-label') || e?.innerText || e?.getAttribute('title') || '').trim(),
            visible: Boolean(rect && rect.width > 0 && rect.height > 0 && style && style.visibility !== 'hidden' && style.display !== 'none'),
            focusVisible: Boolean(e?.matches(':focus-visible')),
            focusIndicator: Boolean(style && ((style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 1) || style.boxShadow !== 'none')) };
        }));
      }
      const result = { viewport: label, url: page.url(), http: response.status(), wcagViolations: violations, keyboardTabs: tabs, runtimeErrors };
      results.push(result);
      await writeFile(`${artifacts}/${label}-accessibility.json`, JSON.stringify(result, null, 2) + '\n');
      assert.equal(runtimeErrors.length, 0, `${label}: runtime errors: ${JSON.stringify(runtimeErrors)}`);
      assert.equal(violations.length, 0, `${label}: WCAG 2.0/2.1 A/AA accessibility violations: ${JSON.stringify(violations)}`);
      assert(tabs.every(t => t.visible && t.name && t.focusVisible && t.focusIndicator), `${label}: missing keyboard focus, name, visibility or focus indicator: ${JSON.stringify(tabs)}`);
    } finally { await context.close(); }
  }
  await writeFile(`${artifacts}/accessibility-acceptance.json`, JSON.stringify({ checkedAt: new Date().toISOString(), passes: results }, null, 2) + '\n');
  console.log('Ysleta museum accessibility PASS: mobile and desktop axe WCAG 2.0/2.1 A/AA and nine visible, named keyboard Tab stops per viewport.');
} catch (error) {
  await writeFile(`${artifacts}/accessibility-failure.json`, JSON.stringify({ checkedAt: new Date().toISOString(), results, failure: String(error.stack || error) }, null, 2) + '\n');
  throw error;
} finally { if (browser) await browser.close(); }
