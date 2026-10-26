/**
 * Bounded post-deployment desktop/mobile acceptance for one MSR Houston page.
 * Never clicks outbound reservations, calls or affiliate links; no site crawl.
 */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-wp-qa/node_modules/playwright-core',
);
const origin = process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com';
const url = origin + '/sports-venue/msr-houston';
const outputDir = 'artifacts/msr-houston-browser';
await mkdir(outputDir, { recursive: true });
const failures = [];
const results = [];
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const tests = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, isMobile: false },
  { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true },
];

for (const test of tests) {
  const context = await browser.newContext({
    viewport: test.viewport, deviceScaleFactor: 1, isMobile: test.isMobile, hasTouch: test.isMobile,
  });
  await context.route(/(google-analytics|googletagmanager|facebook\.com\/tr|connect\.facebook\.net|analytics\.google|\/api\/analytics|\/api\/track)/i, route => route.abort());
  const page = await context.newPage();
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    assert.equal(response?.status(), 200, 'Canonical MSR page returned non-200 status');
    await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 });
    const facts = await page.evaluate(() => ({
      title: document.title,
      h1: Array.from(document.querySelectorAll('h1')).map(el => el.textContent?.trim()),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      viewport: window.innerWidth,
      width: document.documentElement.scrollWidth,
      kartingNotice: document.body.textContent?.includes('Karting is temporarily closed. The road course is a separate operation.'),
      phone: document.querySelector('a[href="tel:+12813690677"]')?.textContent?.trim(),
      table: (() => {
        const region = document.querySelector('[role="region"][aria-label="MSR Houston participation options"]');
        const table = region?.querySelector('table');
        return region && table ? {
          label: !!table.querySelector('caption'),
          headers: table.querySelectorAll('thead th[scope="col"]').length,
          keyboard: region.tabIndex === 0,
          scrollsWithin: region.scrollWidth > region.clientWidth || region.scrollWidth === region.clientWidth,
        } : null;
      })(),
      hotels: ['La Quinta Inn', 'Best Western Angleton Inn', 'Comfort Suites Lake Jackson Clute'].map(name => document.body.textContent?.includes(name)),
      bookingLinks: [
        'www.wyndhamhotels.com',
        'www.bestwestern.com',
        'www.choicehotels.com',
        'www.thextremexperience.com/tracks/msr-houston',
      ].map(domain => !!document.querySelector('a[href*="' + domain + '"]')),
      photoAttribution: document.body.textContent?.includes('Ginodemeneghi') && document.body.textContent?.includes('CC BY-SA 4.0'),
      event: [...document.querySelectorAll('h3')].some(el => /xtreme\s*xperience/i.test(el.textContent || '')),
      internalLinks: !!document.querySelector('a[href="/destination/sea-center-texas"]') && !!document.querySelector('a[href="/destination/levi-jordan-plantation"]'),
    }));
    assert.equal(facts.h1.length, 1, 'Must have exactly one main heading');
    assert.match(facts.h1[0], /MSR Houston/i);
    assert.equal(facts.canonical, url, 'Wrong canonical URL');
    assert.ok(facts.width <= facts.viewport + 8, 'Mobile/desktop horizontal document overflow: ' + JSON.stringify(facts));
    assert.ok(facts.kartingNotice, 'Critical karting-status notice absent');
    assert.match(facts.phone || '', /281-369-0677/);
    assert.ok(facts.table?.label && facts.table?.headers === 3 && facts.table.keyboard, 'Accessible participation table contract failed');
    assert.ok(facts.hotels.every(Boolean) && facts.bookingLinks.every(Boolean), 'Named hotel reservations or driving experience not rendered');
    assert.ok(facts.photoAttribution, 'Attribution for source-verified licensed image missing');
    assert.ok(facts.internalLinks, 'Brazoria County cross-links missing');

    const tableRegion = page.locator('[role="region"][aria-label="MSR Houston participation options"]');
    await tableRegion.focus();
    assert.equal(await tableRegion.evaluate(el => el === document.activeElement), true, 'Participation table not keyboard-focusable');
    // Mobile React hydration or same-document scroll restoration can settle after
    // Playwright's click resolves. Wait for the *actual* URL fragment change, but
    // still fail closed if anchor navigation does not work.
    const logisticsLink = page.locator('nav[aria-label="MSR Houston guide sections"] a[href="#msr-logistics"]');
    await logisticsLink.click();
    await page.waitForURL(current => current.pathname === '/sports-venue/msr-houston' && current.hash === '#msr-logistics', {
      timeout: 10000,
    });
    await page.waitForTimeout(300);
    assert.equal(new URL(page.url()).hash, '#msr-logistics', 'Section navigation did not retain hash after the route settled');
    assert.equal(await page.locator('#msr-logistics').count(), 1, 'Navigation destination heading is missing');

    // The October 2026 spotlight must be independently visible while active,
    // even if the main event carousel contains other events.
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' })
      .format(new Date());
    if (today <= '2026-11-01') assert.ok(facts.event, 'Verified Xtreme Xperience event must be visible in curated highlights or the live calendar');

    await page.screenshot({ path: outputDir + '/' + test.name + '.png', fullPage: true, animations: 'disabled', timeout: 30000 });
    results.push({ viewport: test.name, url, width: facts.width, viewportWidth: facts.viewport, accessibleTable: true, hotelLinks: 3, licensedPhoto: true, anchorNavigation: true });
    console.log('PASS MSR Houston ' + test.name + ': one H1, no overflow, named hotels, phone, table, photo credit, links and anchors');
  } catch (error) {
    failures.push(test.name + ': ' + String(error));
    try { await page.screenshot({ path: outputDir + '/' + test.name + '-failure.png', fullPage: true, timeout: 12000 }); } catch {}
  } finally {
    await context.close();
  }
}
await browser.close();
const report = { checkedAt: new Date().toISOString(), url, results, failures, analyticsRequestsBlocked: true, outboundBookingLinksClicked: false };
await writeFile(outputDir + '/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
assert.deepEqual(failures, [], 'MSR Houston browser visual and accessibility acceptance failed');
