import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const path = '/texas-high-school-football-playoff-brackets';
const output = 'artifacts/maxpreps-playoffs-2026';
const results = [];
const failures = [];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const providerScript = 'https://www.maxpreps.com/includes/js/widget/widget.compressed.js';
const expectedBracketId = 'ade72ad3-0f62-42ef-a2cb-143bf425942b';
const expectedMemberId = '8ada50e8-19a3-462f-9a14-ca430a481250';
async function checkViewport(name, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const errors = [];
  let providerResponse = null;
  page.on('response', response => {
    if (response.url().startsWith(providerScript)) providerResponse = response.status();
  });
  const expect = (test, message) => { if (!test) errors.push(message); };
  try {
    const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 55000 });
    expect(response?.status() === 200, 'Route did not return HTTP 200');
    await page.getByRole('heading', { level: 1, name: 'Texas high school football playoff brackets' }).waitFor({ timeout: 20000 });
    // Provider loads asynchronously; bounded 12 seconds, not a polling loop.
    await page.waitForFunction(() => !!document.querySelector('script[src="https://www.maxpreps.com/includes/js/widget/widget.compressed.js"]'), null, { timeout: 12000 });
    await page.waitForTimeout(2500);
    const first = await page.evaluate(() => {
      const el = document.querySelector('[data-official-playoff-bracket="6AD1"]');
      const anchor = el?.querySelector('.maxpreps-widget-link');
      const link = el?.querySelector('a[href*="maxpreps.com/tournament"]');
      return {
        title: el?.querySelector('h3')?.textContent,
        scripts: [...document.scripts].filter(s => s.src.includes('widget.compressed.js')).length,
        href: anchor?.getAttribute('href') || '',
        memberId: anchor?.getAttribute('data-member-id') || '',
        iframeCount: el?.querySelectorAll('iframe').length || 0,
        htmlSnippet: el?.innerHTML.slice(0, 1800) || '',
        hasDirectLink: !!link,
        wholeDocumentWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
      };
    });
    expect(first.scripts === 1, 'Provider JS should be loaded exactly once on initial mount');
    expect(first.href.includes(expectedBracketId) || first.iframeCount > 0, 'No provider-generated bracket anchor or iframe');
    if (first.memberId) expect(first.memberId === expectedMemberId, 'Unexpected MaxPreps member ID');
    expect(first.canonical === origin + path, 'Canonical URL differs');
    expect(first.hasDirectLink, 'MaxPreps tournament fallback missing');
    expect(first.wholeDocumentWidth <= first.viewportWidth + 5, 'Body has horizontal overflow (widget should scroll inside its region)');
    // Confirm other divisions do not accidentally display or inherit the verified 6A D1 widget.
    await page.getByRole('button', { name: 'Division II' }).click();
    await page.locator('[data-official-playoff-bracket="6AD2"]').waitFor({ timeout: 12000 });
    const other = await page.evaluate(() => {
      const el = document.querySelector('[data-official-playoff-bracket="6AD2"]');
      return { hasWidgetAnchor: !!el?.querySelector('.maxpreps-widget-link'), text: el?.textContent || '' };
    });
    expect(!other.hasWidgetAnchor, '6A D2 unexpectedly used 6A D1 generated widget');
    expect(other.text.includes('View official 6A Division II bracket'), '6A D2 official bracket fallback missing');
    await page.getByRole('button', { name: 'Division I', exact: true }).click();
    await page.locator('[data-official-playoff-bracket="6AD1"]').waitFor({ timeout: 12000 });
    await page.waitForTimeout(1800);
    const after = await page.evaluate(() => ({
      scriptCount: [...document.scripts].filter(s => s.src.includes('widget.compressed.js')).length,
      hasWidget: !!document.querySelector('[data-official-playoff-bracket="6AD1"] .maxpreps-widget-link, [data-official-playoff-bracket="6AD1"] iframe'),
      scrollWidth: document.documentElement.scrollWidth,
      width: innerWidth,
    }));
    expect(after.scriptCount === 1, 'Provider script duplicated or missing after switching away and back');
    expect(after.hasWidget, '6A D1 widget failed to remount after returning from another bracket');
    expect(after.scrollWidth <= after.width + 5, 'Horizontal overflow after switching brackets');
    const screenshot = `${output}/maxpreps-playoffs-${name}.png`;
    await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled', timeout: 30000 });
    results.push({ name, status: errors.length ? 'FAIL' : 'PASS', errors, providerResponse, first: { ...first, htmlSnippet: first.htmlSnippet.slice(0, 700) }, other, after, screenshot });
    console.log('MaxPreps playoff widget QA: ' + JSON.stringify(results.at(-1)));
    failures.push(...errors.map(error => `${name}: ${error}`));
  } catch (error) {
    failures.push(`${name}: ${String(error)}`);
    results.push({ name, status: 'ERROR', error: String(error), providerResponse });
    try { await page.screenshot({ path: `${output}/maxpreps-playoffs-${name}-error.png`, fullPage: true, timeout: 10000 }); } catch {}
  } finally {
    await page.close();
  }
}
try {
  await checkViewport('desktop', { width: 1440, height: 900 });
  await checkViewport('mobile', { width: 390, height: 844 });
} finally {
  await browser.close();
}
await writeFile(`${output}/report.json`, JSON.stringify({ url: origin + path, checkedAt: new Date().toISOString(), results, failures }, null, 2));
assert.deepEqual(failures, [], '6A D1 MaxPreps widget QA failed');
