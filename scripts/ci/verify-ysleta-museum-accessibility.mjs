import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-ysleta-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const museumPath = '/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso';
const artifacts = 'artifacts/ysleta-museum-qa';
await mkdir(artifacts, { recursive: true });
const results = [];
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [label, width, height, mobile] of [['mobile', 390, 844, true], ['desktop', 1366, 900, false]]) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const runtimeErrors = [];
    page.on('pageerror', e => runtimeErrors.push(e.message));
    try {
      const response = await page.goto(origin + museumPath + '?verify=ysleta-a11y-' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 60000 });
      assert.equal(response?.status(), 200, label + ': HTTP');
      await page.waitForFunction(() => document.documentElement.dataset.tdRootHydrated === '1', null, { timeout: 25000 });
      await page.locator('main h1').waitFor({ state: 'visible' });
      const aria = await page.evaluate(() => ({
        h1: [...document.querySelectorAll('main h1')].map(e => e.textContent.trim()),
        mainCount: document.querySelectorAll('main').length,
        unnamedMainLinks: [...document.querySelectorAll('main a[href]')].filter(e => !(e.getAttribute('aria-label') || e.innerText || e.getAttribute('title') || '').trim()).map(e => e.outerHTML.slice(0, 350)),
        missingImageAlt: [...document.querySelectorAll('main img')].filter(e => !e.hasAttribute('alt')).map(e => e.src)
      }));
      const cdp = await context.newCDPSession(page);
      const ax = await cdp.send('Accessibility.getFullAXTree');
      const visibleNodes = ax.nodes.filter(n => !n.ignored);
      const axSummary = {
        mains: visibleNodes.filter(n => n.role?.value === 'main').length,
        museumHeadings: visibleNodes.filter(n => n.role?.value === 'heading' && /Ysleta del Sur Pueblo Cultural Center Museum/.test(n.name?.value || '')).length,
        unnamedLinks: visibleNodes.filter(n => n.role?.value === 'link' && !(n.name?.value || '').trim()).length
      };
      // Audit actual computed solid-background text contrast in the museum body.
      // Exclude the photographic hero: a pixel-level image/gradient review is separate.
      const contrast = await page.evaluate(() => {
        const rgb = value => {
          const m = value?.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          return m ? [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])] : null;
        };
        const lum = color => {
          const c = color.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
          return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
        };
        const ratio = (a, b) => {
          const x = lum(a), y = lum(b);
          return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
        };
        const failures = [];
        let sampled = 0;
        for (const e of document.querySelectorAll('main h2, main h3, main p, main a[href], main dt, main dd')) {
          if (e.closest('section.bg-ink')) continue;
          const rect = e.getBoundingClientRect(), css = getComputedStyle(e);
          if (!rect.width || !rect.height || css.display === 'none' || css.visibility === 'hidden') continue;
          let ancestor = e, bg = null;
          while (ancestor && !bg) {
            const c = rgb(getComputedStyle(ancestor).backgroundColor);
            if (c && c[3] === 1) bg = c;
            ancestor = ancestor.parentElement;
          }
          const fg = rgb(css.color);
          if (!bg || !fg || fg[3] !== 1) continue;
          sampled++;
          const size = parseFloat(css.fontSize), bold = parseInt(css.fontWeight, 10) >= 700;
          const minimum = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5;
          const actual = ratio(fg, bg);
          if (actual + .01 < minimum) failures.push({ tag: e.tagName, text: (e.innerText || '').slice(0, 75), ratio: +actual.toFixed(2), minimum });
        }
        return { sampled, failures: failures.slice(0, 25) };
      });
      // Native Tab traversal must visibly focus named, visible controls.
      await page.locator('main a[href]').first().focus();
      const tabs = [];
      for (let i = 0; i < 9; i++) {
        await page.keyboard.press('Tab');
        tabs.push(await page.evaluate(() => {
          const e = document.activeElement, style = getComputedStyle(e), rect = e.getBoundingClientRect();
          return { tag: e.tagName, name: (e.getAttribute('aria-label') || e.innerText || e.getAttribute('title') || '').trim().slice(0, 95),
            visible: rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none',
            focusVisible: e.matches(':focus-visible'),
            focusIndicator: (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 1) || style.boxShadow !== 'none' };
        }));
      }
      const result = { viewport: label, url: page.url(), aria, axSummary, contrast, keyboardTabs: tabs, runtimeErrors };
      results.push(result);
      await writeFile(artifacts + '/' + label + '-accessibility.json', JSON.stringify(result, null, 2) + '\n');
      assert.equal(runtimeErrors.length, 0, label + ': runtime errors');
      assert.equal(aria.mainCount, 1, label + ': main landmark count');
      assert.equal(aria.h1.length, 1, label + ': H1 count');
      assert.equal(aria.unnamedMainLinks.length, 0, label + ': unnamed museum links');
      assert.equal(aria.missingImageAlt.length, 0, label + ': missing museum image alt');
      assert.equal(axSummary.mains, 1, label + ': accessibility tree main landmark');
      assert(axSummary.museumHeadings >= 1, label + ': missing accessible heading');
      assert.equal(axSummary.unnamedLinks, 0, label + ': unnamed accessibility-tree links');
      assert(contrast.sampled >= 25, label + ': too few contrast samples');
      assert.equal(contrast.failures.length, 0, label + ': contrast failure ' + JSON.stringify(contrast.failures));
      assert(tabs.every(t => t.visible && t.name && t.focusVisible && t.focusIndicator), label + ': keyboard focus failure ' + JSON.stringify(tabs));
    } finally { await context.close(); }
  }
  await writeFile(artifacts + '/accessibility-acceptance.json', JSON.stringify({ checkedAt: new Date().toISOString(), passes: results }, null, 2) + '\n');
  console.log('Ysleta accessibility PASS: mobile/desktop AX tree, keyboard focus and solid-background contrast.');
} catch (error) {
  await writeFile(artifacts + '/accessibility-failure.json', JSON.stringify({ checkedAt: new Date().toISOString(), results, failure: String(error.stack || error) }, null, 2) + '\n');
  throw error;
} finally { if (browser) await browser.close(); }
