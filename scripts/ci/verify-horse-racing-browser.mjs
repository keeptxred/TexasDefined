import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const artifactDir = 'artifacts/horse-racing-browser';
const results = [];
const failures = [];
const requireCuratedHotels = process.env.EXPECT_CURATED_HOTELS === '1';
await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

function assertPage(ok, reason, details) {
  if (!ok) throw new Error(reason + (details ? ': ' + JSON.stringify(details).slice(0, 500) : ''));
}
function pageFacts() {
  const visible = el => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
  };
  return {
    heading: document.querySelector('h1')?.innerText?.trim() || '',
    headings: [...document.querySelectorAll('h1')].length,
    canonical: document.querySelector('link[rel=canonical]')?.href || '',
    title: document.title,
    viewport: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    imgProblems: [...document.images].filter(visible).filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc),
    surface: (() => {
      const el = document.querySelector('#expedia-travel-surface');
      return el ? {
        type: el.dataset.surfaceType,
        context: el.dataset.stayContext,
        visible: visible(el),
        text: (el.innerText || '').slice(0, 2000),
        outgoing: [...el.querySelectorAll('a[href]')].map(a => ({label: (a.innerText || '').slice(0, 100), href: a.href.slice(0, 180)})).slice(0, 15),
      } : null;
    })(),
    affiliateSlot: Boolean(document.querySelector('[data-stay-nearby-slot]')),
    hrefs: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
  };
}
const testCases = [
  { label: 'desktop', viewport: { width: 1440, height: 900 } },
  { label: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
];
try {
  for (const test of testCases) {
    const context = await browser.newContext({ viewport: test.viewport, deviceScaleFactor: 1, isMobile: !!test.isMobile, hasTouch: !!test.hasTouch });
    // Avoid contaminating GA, Meta or app telemetry while testing live content.
    // Never intercept hotel referrals: the check reads rendered links but does not open them.
    await context.route(/(google-analytics|googletagmanager|facebook\.com\/tr|connect\.facebook\.net|analytics\.google|\/api\/analytics|\/api\/track)/i, route => route.abort());
    const page = await context.newPage();
    page.on('dialog', dialog => dialog.dismiss());
    try {
      const res = await page.goto(origin + '/horse-racing', { waitUntil: 'domcontentloaded', timeout: 45000 });
      assert.equal(res?.status(), 200, 'Hub must return 200');
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 });
      let facts = await page.evaluate(pageFacts);
      assertPage(facts.headings === 1 && /Texas horse racing/i.test(facts.heading), 'Incorrect hub heading', facts);
      assertPage(facts.canonical === origin + '/horse-racing', 'Incorrect hub canonical', facts);
      assertPage(!facts.hrefs.includes('/sports-venues/horse-racing'), 'Old broken horse-racing link remains', facts);
      assertPage(facts.hrefs.includes('/horse-racing/calendar'), 'No official calendar link', facts);
      assertPage(facts.documentWidth <= facts.viewport + 8, 'Horizontal overflow on hub', facts);
      await page.screenshot({ path: artifactDir + '/' + test.label + '-hub.png', fullPage: true, animations: 'disabled', timeout: 30000 });
      results.push({ viewport: test.label, page: 'hub', h1: facts.heading, overflow: facts.documentWidth - facts.viewport, images: facts.imgProblems, passed: !facts.imgProblems.length });
      assertPage(!facts.imgProblems.length, 'Broken visible image on hub', facts.imgProblems);

      await page.locator('a[href="/horse-racing/gillespie-county-fairgrounds"]').first().click();
      await page.waitForURL('**/horse-racing/gillespie-county-fairgrounds', { timeout: 15000 });
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 12000 });
      await page.locator('#expedia-travel-surface').waitFor({ state: 'attached', timeout: 25000 });
      facts = await page.evaluate(pageFacts);
      assertPage(facts.headings === 1 && /Gillespie/i.test(facts.heading), 'Incorrect Gillespie heading', facts);
      assertPage(facts.canonical === origin + '/horse-racing/gillespie-county-fairgrounds', 'Gillespie canonical mismatch', facts);
      assertPage(facts.affiliateSlot && facts.surface?.visible, 'Hotel module must visibly render in Gillespie slot', facts);
      if (requireCuratedHotels) {
        assertPage(facts.surface?.type === 'curated' && facts.surface?.context === 'destination:fredericksburg', 'Gillespie requires curated Fredericksburg hotel cards, not generic fallback', facts.surface);
        assertPage((facts.surface?.outgoing || []).some(link => /hotels\.com\/|anrdoezrs\.net\//i.test(link.href)), 'Verified hotel affiliate links missing from curated Fredericksburg stays', facts.surface);
      } else if (facts.surface?.type !== 'curated') {
        console.log('Pre-merge baseline: generic hotel fallback still active; blocking curated-link acceptance runs after deployment.');
      }
      assertPage(/affiliate disclosure/i.test(facts.surface?.text || ''), 'Hotel affiliate disclosure missing', facts.surface);
      assertPage(facts.documentWidth <= facts.viewport + 8, 'Horizontal overflow on Gillespie', facts);
      await page.screenshot({ path: artifactDir + '/' + test.label + '-gillespie.png', fullPage: true, animations: 'disabled', timeout: 30000 });
      results.push({ viewport: test.label, page: 'gillespie', h1: facts.heading, hotelSurface: facts.surface, images: facts.imgProblems, passed: !facts.imgProblems.length });
      assertPage(!facts.imgProblems.length, 'Broken image on Gillespie page', facts.imgProblems);

      // Use actual SPA links. Verify that the prior hotel's surface is removed
      // when navigating to a hub and then an inactive race-license profile.
      await page.locator('a[href="/horse-racing"]').first().click();
      await page.waitForURL('**/horse-racing', { timeout: 15000 });
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 12000 });
      await page.waitForFunction(() => !document.querySelector('#expedia-travel-surface'), { timeout: 15000 });
      await page.locator('a[href="/horse-racing/manor-downs"]').first().click();
      await page.waitForURL('**/horse-racing/manor-downs', { waitUntil: 'domcontentloaded', timeout: 30000 });
      facts = await page.evaluate(pageFacts);
      assertPage(/Manor Downs/i.test(facts.heading), 'Inactive history lost during SPA navigation', facts);
      assertPage(!facts.surface && !facts.affiliateSlot, 'Stale hotel affiliate on inactive racetrack', facts);
      assertPage(facts.canonical === origin + '/horse-racing/manor-downs', 'History canonical incorrect', facts);
      assertPage(facts.documentWidth <= facts.viewport + 8, 'Horizontal overflow on Manor Downs', facts);
      await page.screenshot({ path: artifactDir + '/' + test.label + '-manor.png', fullPage: true, animations: 'disabled', timeout: 30000 });
      results.push({ viewport: test.label, page: 'manor', h1: facts.heading, staleHotel: !!facts.surface, passed: true });
      console.log('PASS horse racing ' + test.label + ': hub, Gillespie affiliate module, SPA cleanup, inactive history, mobile/desktop layout');
    } catch (error) {
      failures.push(test.label + ': ' + String(error));
      try { await page.screenshot({ path: artifactDir + '/' + test.label + '-failure.png', fullPage: true, timeout: 15000 }); } catch {}
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
const report = { checkedAt: new Date().toISOString(), origin, results, failures, analyticsRequestsBlocked: true, affiliateLinksClicked: false, requireCuratedHotels };
await writeFile(artifactDir + '/report.json', JSON.stringify(report, null, 2));
console.log('Horse racing browser QA report: ' + JSON.stringify(report));
assert.deepEqual(failures, [], 'Visual and affiliate horse racing acceptance failed');
