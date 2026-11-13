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
    // The page may stream HTML on an otherwise healthy Worker response. Waiting
    // for the entire DOMContentLoaded event can stall even when the meaningful
    // visitor content has arrived, especially on the mobile Chrome run.
    // Require an actual HTTP response AND the final named source-backed link.
    // This does not waive any downstream page, accessibility, or media assertion.
    // The November 13 mobile acceptance got a real transport-level 45-second
    // navigation timeout before even receiving response headers; Cloudflare
    // recorded the corresponding client request as cancelled, not an HTTP
    // page failure. Retry only this exact browser transport condition, then
    // enforce every original URL, CSS, hydration, content and image assertion.
    let response;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await page.goto(url, { waitUntil: 'commit', timeout: 45000 });
        break;
      } catch (error) {
        if (error?.name !== 'TimeoutError' || attempt === 3) throw error;
        console.warn('MSR_TRANSIENT_NAVIGATION_TIMEOUT ' + JSON.stringify({
          viewport: test.name, attempt, timeoutMs: 45000,
        }));
        await page.goto('about:blank', { waitUntil: 'commit', timeout: 10000 });
        await page.waitForTimeout(attempt * 500);
      }
    }
    assert.equal(response?.status(), 200, 'Canonical MSR page returned non-200 status');
    await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 });
    await page.locator('a[href="/destination/levi-jordan-plantation"]').first()
      .waitFor({ state: 'attached', timeout: 30000 });
    // `waitUntil: 'commit'` allows valid streamed HTML without blocking on
    // DOMContentLoaded, but visible article text can precede the viewport meta
    // and compiled stylesheet. A mobile Chrome layout measured at that moment
    // has a desktop-sized layout viewport even with a 390px device setting.
    // Never certify CSS/mobile geometry until both arrive and the *actual*
    // document layout fits. This is a bounded readiness assertion, not a skip.
    try {
      await page.waitForFunction(
        ({ expectedWidth }) => {
          const viewportMeta = document.querySelector('meta[name="viewport"]')?.getAttribute('content') || '';
          const css = [...document.querySelectorAll('link[rel="stylesheet"]')];
          const viewportReady = /width\s*=\s*device-width/i.test(viewportMeta);
          const cssReady = css.length > 0 && css.every(link => Boolean(link.sheet));
          return viewportReady && cssReady
            && window.innerWidth >= expectedWidth - 8 && window.innerWidth <= expectedWidth + 8
            && document.documentElement.scrollWidth <= window.innerWidth + 8;
        },
        { expectedWidth: test.viewport.width },
        { timeout: 25000, polling: 250 },
      );
    } catch (error) {
      const details = await page.evaluate(() => ({
        viewportMeta: document.querySelector('meta[name="viewport"]')?.getAttribute('content'),
        css: [...document.querySelectorAll('link[rel="stylesheet"]')].map(link => ({
          href: link.getAttribute('href'), loaded: Boolean(link.sheet),
        })),
        innerWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        readyState: document.readyState,
      }));
      throw new Error('Real mobile/desktop layout did not settle within 25 seconds: '
        + JSON.stringify(details) + '; ' + String(error));
    }
    // The Worker streams visible SSR before React attaches event handlers.
    // On a cold/mobile load, clicking a same-document anchor while the router
    // hydrates can race with client navigation and lose the fragment. Require
    // the site's own root-hydration signal before testing real user interaction.
    // This fails closed if client assets or hydration are actually broken.
    try {
      await page.waitForFunction(
        () => document.documentElement.dataset.tdRootHydrated === '1',
        null, { timeout: 30000, polling: 250 },
      );
    } catch (error) {
      const state = await page.evaluate(() => ({
        rootHydrated: document.documentElement.dataset.tdRootHydrated,
        readyState: document.readyState,
        scriptCount: document.querySelectorAll('script[src]').length,
        pathname: location.pathname,
      }));
      throw new Error('MSR root hydration did not complete: ' + JSON.stringify(state) + '; ' + String(error));
    }
    // Retain the independent post-settle overflow assertion below. A page
    // that remains too wide after all CSS/meta arrive still fails release QA.
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
    // A same-document hash click does not guarantee a new page "load" event.
    // Playwright waitForURL defaults to waiting for load and can time out on
    // a healthy mobile page after the fragment has already changed. Require
    // the actual live URL state instead; this still fails on broken anchors.
    const logisticsLink = page.locator('nav[aria-label="MSR Houston guide sections"] a[href="#msr-logistics"]');
    await logisticsLink.click();
    try {
      await page.waitForFunction(
        () => location.pathname === '/sports-venue/msr-houston' && location.hash === '#msr-logistics',
        null, { timeout: 10000, polling: 250 },
      );
    } catch (error) {
      const state = await page.evaluate(() => ({
        currentUrl: location.href,
        rootHydrated: document.documentElement.dataset.tdRootHydrated,
        anchorHref: document.querySelector('nav[aria-label="MSR Houston guide sections"] a[href="#msr-logistics"]')?.getAttribute('href'),
        destinationPresent: Boolean(document.querySelector('#msr-logistics')),
        readyState: document.readyState,
      }));
      throw new Error('MSR section-anchor click failed after root hydration: ' + JSON.stringify(state) + '; ' + String(error));
    }
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
