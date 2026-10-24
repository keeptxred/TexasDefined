import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-playoffs-qa/node_modules/playwright-core');
const origin = process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com';
const path = '/article/texas-high-school-football-playoffs-explained';
const output = 'artifacts/football-playoffs-qa';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN, headless: true, args: ['--no-sandbox'] });
const referenceSource = readFileSync('src/components/content/FootballPlayoffsReference.tsx', 'utf8');
const routeSource = readFileSync('src/routes/article.$slug.tsx', 'utf8');
const articleSource = readFileSync('src/data/fixtures/texas-high-school-football-playoffs.ts', 'utf8');
for (const [source, needle] of [
  [referenceSource, 'View all 2026 playoff brackets'],
  [referenceSource, '1A six-man · five rounds'],
  [referenceSource, '2A–6A · six rounds'],
  [referenceSource, 'Division I · larger qualifiers'],
  [routeSource, 'CC BY-SA 4.0 license'],
  [articleSource, 'Celina_High_School%2C_Friday_Night_Football.jpg'],
]) {
  assert.ok(source.includes(needle), 'PR source missing upgrade: ' + needle);
}
const evidence = [];
try {
  for (const width of [320, 375, 390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const runtimeErrors = [];
    page.on('pageerror', error => runtimeErrors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' && /hydration|Minified React error|react-dom/i.test(message.text())) {
        runtimeErrors.push(message.text());
      }
    });
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
    const upgradeDeployed = guideText.includes("View all 2026 playoff brackets");
    result.upgradeDeployed = upgradeDeployed;
    if (upgradeDeployed) {
      assert.ok(guideText.includes("1A six-man · five rounds"), "five-round six-man diagram missing");
      assert.ok(guideText.includes("2A–6A · six rounds"), "six-round diagram missing");
      assert.ok(guideText.includes("Division I · larger qualifiers"), "6A split diagram missing");
      assert.ok(await page.locator('a[href="/texas-high-school-football-playoff-brackets"]').count() > 0, "bracket finder link missing");
    } else {
      console.log("Pre-deployment production baseline; new guide UI assertions deferred until deployment.");
    }
    assert.equal(result.faqCount, 6);
    // Inspect the *hydrated* offer at every viewport. The HTTP-only production
    // verifier cannot catch missing React click handlers or mobile overflow.
    const offerSection = page.locator('section[aria-label="Football fan shopping and travel"]');
    await offerSection.waitFor({ state: 'visible', timeout: 18000 });
    // SSR markup is visible before React's client handlers are installed.
    // Wait for the root useEffect readiness signal before testing clicks.
    await page.waitForFunction(
      () => document.documentElement.dataset.tdRootHydrated === '1',
      undefined,
      { timeout: 25000 },
    );
    await page.waitForFunction(() => (
      document.querySelector('section[aria-label="Football fan shopping and travel"] a[data-commercial-partner="rvshare"]')
      && document.querySelector('section[aria-label="Football fan shopping and travel"] a[data-commercial-partner="hotels.com"]')
    ), undefined, { timeout: 15000 });
    const affiliate = await page.evaluate(() => {
      const section = document.querySelector('section[aria-label="Football fan shopping and travel"]');
      const disclosure = [...section.querySelectorAll('p')].find(p => p.textContent?.startsWith('Affiliate disclosure:'));
      const offers = ['hotels.com', 'rvshare'].map(partner => {
        const anchor = section.querySelector('a[data-commercial-partner="' + partner + '"]');
        const bounds = anchor?.getBoundingClientRect();
        return {
          partner, href: anchor?.href, rel: anchor?.rel, target: anchor?.target,
          placement: anchor?.dataset.commercialPlacement,
          label: anchor?.textContent?.trim(), visible: Boolean(bounds?.width && bounds?.height),
          x: bounds?.x, right: bounds?.right,
          disclosedBefore: Boolean(disclosure && anchor && (disclosure.compareDocumentPosition(anchor) & Node.DOCUMENT_POSITION_FOLLOWING)),
        };
      });
      return {
        heading: section.querySelector('h3')?.textContent?.trim(),
        disclosure: disclosure?.textContent?.trim(),
        official: section.querySelector('a[href="https://www.uiltexas.org/football/state"]')?.textContent?.trim(),
        offers,
      };
    });
    assert.equal(affiliate.heading, 'Plan your Texas playoff trip');
    assert.ok(affiliate.disclosure?.includes('TexasDefined may earn a commission'));
    assert.ok(affiliate.official?.includes('Official UIL championship'));
    for (const offer of affiliate.offers) {
      const destination = offer.partner === 'hotels.com' ? 'https://www.hotels.com/' : 'https://rvshare.com/';
      assert.equal(offer.href, 'https://www.anrdoezrs.net/links/101876465/type/dlg/' + destination,
        offer.partner + ' must use the approved CJ publisher redirect and real merchant destination');
      assert.ok(offer.rel.split(/\s+/).includes('sponsored') && offer.rel.includes('nofollow')
        && offer.rel.includes('noopener') && offer.rel.includes('noreferrer'), offer.partner + ' affiliate relationship');
      assert.equal(offer.target, '_blank');
      assert.ok(offer.placement?.startsWith('football-'));
      assert.ok(offer.visible && offer.x >= -2 && offer.right <= width + 2,
        offer.partner + ' CTA must fit the ' + width + 'px viewport');
      assert.ok(offer.disclosedBefore, offer.partner + ' must follow the disclosure');
    }

    // Dry-run React click handlers while browser networking is OFFLINE.
    // Prevent default navigation, block all requests, and inspect only ephemeral
    // page-local dataLayer/events. No CJ hits or first-party outcomes are sent.
    await page.context().setOffline(true);
    await page.route('**/*', route => route.abort());
    const clickEvidence = await page.evaluate(() => {
      const observed = [];
      window.addEventListener('texasdefined:affiliate-click', event => observed.push(event.detail));
      const before = (window.dataLayer || []).filter(entry => entry.event === 'affiliate_click').length;
      for (const partner of ['hotels.com', 'rvshare']) {
        const link = document.querySelector('section[aria-label="Football fan shopping and travel"] a[data-commercial-partner="' + partner + '"]');
        link.addEventListener('click', event => event.preventDefault(), { capture: true, once: true });
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      }
      return {
        dataLayer: (window.dataLayer || []).filter(entry => entry.event === 'affiliate_click').slice(before),
        customEvents: observed,
      };
    });
    assert.equal(clickEvidence.dataLayer.length, 2, 'React onClick must fire one marketing event per affiliate');
    assert.equal(clickEvidence.customEvents.length, 2, 'React onClick must dispatch one shared custom event per affiliate');
    for (const [i, partner] of ['hotels.com', 'rvshare'].entries()) {
      const e = clickEvidence.dataLayer[i], c = clickEvidence.customEvents[i];
      assert.equal(e.affiliate_partner, partner);
      assert.equal(c.affiliate_partner, partner);
      assert.equal(e.page_path, path);
      assert.equal(e.affiliate_module, 'football-fan-essentials');
      assert.ok(e.affiliate_placement?.includes('texas-high-school-football-playoffs-explained'));
      assert.equal(e.event, 'affiliate_click');
    }
    result.affiliate = { ...affiliate, simulatedClickCount: clickEvidence.dataLayer.length,
      customEventCount: clickEvidence.customEvents.length, networkBlocked: true };
    assert.deepEqual(runtimeErrors, [], 'No hydration/React runtime errors expected before simulated clicks');
    // Restore navigation so each responsive screenshot is captured in normal browser mode.
    await page.context().setOffline(false);
    await page.unroute('**/*');

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
    await reference.locator('figure').first().scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/${width}-bracket.png`, fullPage: false, animations: 'disabled' });
    evidence.push(result);
    await page.close();
  }
  await writeFile(`${output}/acceptance.json`, JSON.stringify({ passed: true, upgradeDeployed: evidence.every(item => item.upgradeDeployed), checkedAt: new Date().toISOString(), evidence }, null, 2));
  console.log('Playoff guide mobile/desktop acceptance passed:', JSON.stringify(evidence));
} finally { await browser.close(); }
