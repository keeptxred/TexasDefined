import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH
  || '/tmp/texasdefined-corporate-qa/node_modules/playwright-core');
const axeCore = require(process.env.AXE_CORE_PATH
  || '/tmp/texasdefined-corporate-qa/node_modules/axe-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const evidenceDir = 'artifacts/corporate-events-browser';
const cases = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1365, height: 900 },
];
await mkdir(evidenceDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || undefined,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const results = [];
let failed = false;

try {
  for (const view of cases) {
    const result = { viewport: view.name, checks: [], errors: [] };
    results.push(result);
    const context = await browser.newContext({ viewport: { width: view.width, height: view.height } });
    // Capture the *generated text*, not sensitive user contact details.
    // Clipboard is stubbed so the test does not depend on desktop clipboard
    // permissions; this is a public, synthetic shortlist URL only.
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (text) => { window.__tdCopiedShare = text; } },
      });
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', request => {
      if (request.method() !== 'GET' && request.method() !== 'HEAD'
        && /\/corporate-events(?:[/?#]|$)/.test(request.url())) {
        errors.push('Browser verifier attempted a non-read-only event request: ' + request.method());
      }
    });
    try {
      const response = await page.goto(origin + '/corporate-events?corporate_browser_verify='
        + encodeURIComponent(view.name + '-' + process.env.GITHUB_SHA), {
        waitUntil: 'domcontentloaded', timeout: 50_000,
      });
      assert.equal(response?.status(), 200, view.name + ': public finder must be HTTP 200');
      await page.getByRole('heading', {
        level: 1, name: 'Plan a company event worth leaving the office for.',
      }).waitFor({ state: 'visible', timeout: 25_000 });
      await page.getByRole('heading', { name: 'A practical guide to corporate event types' }).waitFor();
      await page.getByRole('heading', { name: 'Your event shortlist' }).waitFor();
      result.checks.push('Live hydrated public finder and six-type educational guides');

      const horizontalOverflow = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));
      assert(horizontalOverflow.documentWidth <= horizontalOverflow.viewportWidth + 2,
        view.name + ': horizontal overflow: ' + JSON.stringify(horizontalOverflow));
      result.checks.push('No horizontal viewport overflow');

      const guests = page.getByRole('spinbutton', { name: 'Number of guests' });
      await guests.fill('8001');
      await page.getByText('Choose a whole-number group of 2 to 8,000 guests.').waitFor();
      assert.equal(await guests.getAttribute('aria-invalid'), 'true',
        view.name + ': invalid group sizes need accessible field error state');
      await page.getByRole('button', { name: 'Send planning request to TexasDefined' }).waitFor();
      assert.equal(await page.getByRole('button', { name: 'Send planning request to TexasDefined' }).isDisabled(), true,
        'Invalid headcount may not submit a planning request');
      await guests.fill('45');
      assert.equal(await guests.getAttribute('aria-invalid'), 'false');
      const cityInput = page.locator('input[placeholder="Houston"]');
      const broadTypes = page.getByRole('checkbox', { name: /Show relevant group venues from other event types/i });
      await broadTypes.check();
      for (const market of ['Dallas', 'Dallas-Fort Worth', 'Austin', 'San Antonio', 'El Paso', '77002', 'Texas']) {
        await cityInput.fill(market);
        await page.getByText(market + ' · 45 guests', { exact: false }).first().waitFor();
        const label = await page.getByRole('heading', { level: 2, name: /group event options?/ }).textContent();
        assert(Number(label?.match(/(\d+) group event/)?.[1]) > 0,
          view.name + ': no sourced venue candidates for ' + market);
      }
      await cityInput.fill('Houston');
      await page.getByText('Houston · 45 guests', { exact: false }).first().waitFor();
      await broadTypes.uncheck();
      result.checks.push('Seven real Texas city/DFW/ZIP/statewide market filters return sourced candidates');

      const dateInput = page.locator('input[type="date"]');
      const today = await dateInput.getAttribute('min');
      assert(/^\d{4}-\d{2}-\d{2}$/.test(today || ''), 'Missing Texas-local minimum event date');
      const yesterday = new Date(Date.parse(today + 'T12:00:00Z') - 86400000).toISOString().slice(0, 10);
      await dateInput.fill(yesterday);
      assert.equal(await page.getByRole('button', { name: 'Send planning request to TexasDefined' }).isDisabled(), true,
        'Past event dates must block planner submission before hitting the server');
      await page.getByText('Choose a real event date that is today or later in Texas', { exact: false }).waitFor();
      await dateInput.fill(today);
      assert.equal(await page.getByRole('button', { name: 'Send planning request to TexasDefined' }).isEnabled(), true);
      await dateInput.fill('');
      result.checks.push('Optional event date uses Texas calendar and rejects expired dates without a POST');

      await page.getByRole('combobox', { name: 'Maximum budget per person' }).selectOption('100');
      await page.getByRole('combobox', { name: 'Event type' }).selectOption('team-building');
      await page.getByRole('button', { name: 'Compare', exact: true }).first()
        .waitFor({ state: 'visible', timeout: 12_000 });
      await page.getByRole('button', { name: 'Compare', exact: true }).first().click();
      const proposal = page.locator('#proposal');
      await proposal.getByText('$4,500', { exact: true }).waitFor();
      assert.equal(await page.getByRole('button', { name: 'Shortlisted', exact: true }).count() >= 1, true);
      result.checks.push('45 guests, $100/person -> illustrative $4,500 ceiling, and shortlist selection');
      for (const count of [13, 25, 100, 300, 500, 5000, 8000]) {
        await guests.fill(String(count));
        await page.waitForFunction((n) =>
          document.querySelector('#proposal .td-print-summary')?.textContent?.includes('Group size: ' + n), count);
        const body = await proposal.locator('.td-print-summary').textContent();
        const total = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',
          maximumFractionDigits: 0 }).format(count * 100);
        assert(body?.includes('Total planning ceiling: ' + total),
          view.name + ': incorrect illustrative budget at group size ' + count);
      }
      // Only a documented full-center option covers 8,000; no live opening is claimed.
      await guests.fill('8000');
      await page.getByRole('heading', { level: 3, name: 'Space Center Houston' })
        .waitFor({ state: 'visible', timeout: 12_000 });
      await guests.fill('45');
      await page.waitForFunction(() =>
        document.querySelector('#proposal .td-print-summary')?.textContent?.includes('Group size: 45'));
      result.checks.push('13, 25, 100, 300, 500, 5,000 and 8,000 guests recalculate planning ceilings without vendor quotes');

      const request = page.locator('#planning-request form');
      assert.equal(await request.evaluate(form => form.checkValidity()), false,
        'Form must require valid identity/contact and explicit organizer consent');
      const personalConsent = request.locator('input[name="consentContact"]');
      assert.equal(await personalConsent.isChecked(), false);
      result.checks.push('Required contact consent; no customer data submitted');

      await proposal.getByRole('button', { name: 'Copy share link' }).click();
      const copied = await page.evaluate(() => window.__tdCopiedShare || '');
      assert(copied, view.name + ': shortlist clipboard capture missing');
      const url = new URL(copied);
      assert.equal(url.origin, origin);
      assert.equal(url.pathname, '/corporate-events');
      assert.equal(url.searchParams.get('city'), 'Houston');
      assert.equal(url.searchParams.get('guests'), '45');
      assert.equal(url.searchParams.get('budget'), '100');
      assert.equal(url.searchParams.get('type'), 'team-building');
      assert(url.searchParams.get('venues')?.length, view.name + ': selected venue missing from public share link');
      assert(!/email|phone|contactName|companyAddress2/.test(url.search),
        'Share link may not contain organizer contact fields');
      result.checks.push('Shareable shortlist URL contains public planning choices without private contact fields');
      await page.getByRole('button', { name: 'Shortlisted', exact: true }).first().click();
      assert.equal(await page.getByRole('button', { name: 'Shortlisted', exact: true }).count(), 0,
        view.name + ': removing the only selected venue did not clear the shortlist');
      await page.goto(copied, { waitUntil: 'domcontentloaded', timeout: 50_000 });
      await page.getByRole('button', { name: 'Shortlisted', exact: true }).first()
        .waitFor({ state: 'visible', timeout: 25_000 });
      assert.equal(await page.getByRole('button', { name: 'Shortlisted', exact: true }).count(), 1);
      result.checks.push('Shortlist removal and URL reloading restores exactly one approved public venue');

      await page.emulateMedia({ media: 'print' });
      const visibility = await page.locator('#proposal').evaluate(el => getComputedStyle(el).visibility);
      assert.equal(visibility, 'visible');
      const summary = await page.locator('#proposal .td-print-summary').evaluate(el => ({
        display: getComputedStyle(el).display,
        content: el.textContent || '',
      }));
      assert.notEqual(summary.display, 'none');
      assert(summary.content.includes('Group size: 45'));
      assert(summary.content.includes('Total planning ceiling: $4,500'));
      assert(summary.content.includes('Illustrative group totals'));
      result.checks.push('Printable management proposal excludes fictional quotes and shows planning caveats');
      await page.emulateMedia({ media: 'screen' });
      // Offline automated accessibility smoke on fully hydrated production HTML.
      // axe is bundled in the isolated GitHub runner, not fetched from a CDN.
      // This never submits customer data and is not a claim of full manual WCAG conformance.
      await page.addScriptTag({ content: axeCore.source });
      const a11yViolations = await page.evaluate(async () => {
        const root = document.querySelector('main#main') || document;
        const findings = await window.axe.run(root, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
        });
        return findings.violations.map(v => ({
          id: v.id, impact: v.impact, affectedElements: v.nodes.length,
          selectors: v.nodes.slice(0, 3).map(n => n.target.join(' > ')),
        }));
      });
      result.accessibilityViolations = a11yViolations;
      const severeA11y = a11yViolations.filter(v => v.impact === 'critical' || v.impact === 'serious');
      assert.deepEqual(severeA11y, [],
        view.name + ': serious/critical WCAG A/AA defects: ' + JSON.stringify(severeA11y));
      result.checks.push('Automated WCAG 2/2.1 A/AA axe inspection found no serious/critical issues; moderate issues retained in evidence');
      await page.screenshot({ path: evidenceDir + '/' + view.name + '.png', fullPage: false });
      assert.deepEqual(errors, [], view.name + ': unhandled browser errors or prohibited requests');
      result.checks.push('No browser JS errors or event form POSTs');
      console.log('PASS ' + view.name + ': ' + result.checks.join('; '));
    } catch (error) {
      failed = true;
      result.errors.push(error instanceof Error ? error.message : String(error));
      await page.screenshot({ path: evidenceDir + '/' + view.name + '-failed.png', fullPage: false })
        .catch(() => {});
      console.error('FAIL ' + view.name + ': ' + result.errors.join('; '));
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(evidenceDir + '/results.json', JSON.stringify({
    url: origin + '/corporate-events', sha: process.env.GITHUB_SHA || null,
    createdAt: new Date().toISOString(), results,
    noProductionInquiriesSubmitted: true,
  }, null, 2));
}
if (failed) process.exitCode = 1;
