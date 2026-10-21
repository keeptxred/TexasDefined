import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-playoffs-qa/node_modules/playwright-core');
const origin = process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com';
const path = '/article/texas-high-school-football-playoffs-explained';
const output = 'artifacts/football-playoffs-qa';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN, headless: true, args: ['--no-sandbox'] });
const evidence = [];
try {
  for (const width of [320, 375, 390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
    assert.equal(response.status(), 200);
    const reference = page.locator('[data-playoffs-reference="2026"]');
    await reference.waitFor({ state: 'visible' });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => {
      const ref = document.querySelector('[data-playoffs-reference]');
      const region = ref.querySelector('[role=region]');
      const cards = [...ref.querySelectorAll('figure .grid > div')].map(el => ({ x: el.getBoundingClientRect().x, width: el.getBoundingClientRect().width }));
      return { width: innerWidth, documentWidth: document.documentElement.scrollWidth,
        tableViewport: region.clientWidth, tableWidth: region.scrollWidth, overflow: getComputedStyle(region).overflowX,
        cards, canonical: document.querySelector('link[rel=canonical]').href,
        faqCount: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => {
          const data = JSON.parse(el.textContent); return data['@graph'] || [data];
        }).find(el => el['@type'] === 'FAQPage')?.mainEntity?.length };
    });
    assert.ok(result.documentWidth <= width + 1, `page overflows at ${width}px: ${result.documentWidth}`);
    assert.equal(result.canonical, origin + path);
    const guideText = await page.locator('[data-playoffs-reference="2026"]').innerText();
    assert.ok(guideText.includes("View all 2026 playoff brackets"), "prominent bracket CTA missing");
    assert.ok(guideText.includes("1A six-man · five rounds"), "five-round six-man diagram missing");
    assert.ok(guideText.includes("2A–6A · six rounds"), "six-round diagram missing");
    assert.ok(guideText.includes("Division I · larger qualifiers"), "6A split diagram missing");
    assert.ok(await page.locator('a[href="/texas-high-school-football-playoff-brackets"]').count() > 0, "bracket finder link missing");
    assert.equal(result.faqCount, 6);
    if (width < 640) {
      assert.ok(result.tableWidth > result.tableViewport);
      assert.equal(result.overflow, 'auto');
      assert.ok(result.cards.every(card => Math.abs(card.x - result.cards[0].x) < 1), 'mobile bracket cards must stack');
      const region = page.getByRole('region', { name: 'Playoff comparison table, scroll horizontally on small screens' });
      await region.focus();
      await region.press('ArrowRight');
      await page.waitForFunction(() => document.querySelector('[data-playoffs-reference] [role=region]').scrollLeft > 0, undefined, { timeout: 5000 });
      result.keyboardScroll = await region.evaluate(el => el.scrollLeft);
      assert.ok(result.keyboardScroll > 0, 'table must scroll with keyboard');
      await region.press('Home');
    }
    await reference.locator('table').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/${width}-reference.png`, fullPage: false, animations: 'disabled' });
    await reference.locator('figure').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/${width}-bracket.png`, fullPage: false, animations: 'disabled' });
    evidence.push(result);
    await page.close();
  }
  await writeFile(`${output}/acceptance.json`, JSON.stringify({ passed: true, checkedAt: new Date().toISOString(), evidence }, null, 2));
  console.log('Playoff guide mobile/desktop acceptance passed:', JSON.stringify(evidence));
} finally { await browser.close(); }
