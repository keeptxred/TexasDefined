import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-state-fair-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const url = origin + '/texas-state-fair';
const out = 'artifacts/state-fair-browser';
const viewports = [['mobile', 390, 844], ['tablet', 768, 1024], ['desktop', 1440, 900]];
await mkdir(out, { recursive: true });
const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map(x => [x.type, x.value]));
const seasonOver = (parts.year + '-' + parts.month + '-' + parts.day) > '2026-10-18';
const results = [];
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN, args: ['--no-sandbox'] });
try {
  for (const [viewport, width, height] of viewports) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const row = { viewport, width, height, checks: {}, errors: [] };
    results.push(row);
    page.on('pageerror', e => row.errors.push('Browser JS: ' + e.message));
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 55000 });
      row.checks.http = response?.status() === 200;
      await page.locator('h1').waitFor({ state: 'visible', timeout: 20000 });
      await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
      const initial = await page.evaluate(() => {
        const main = document.querySelector('main');
        const meta = document.querySelector('meta[name="robots"]');
        const gallery = document.querySelector('[data-state-fair-historical-gallery]');
        const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
        const types = [];
        function visit(obj) {
          if (!obj || typeof obj !== 'object') return;
          if (Array.isArray(obj)) return obj.forEach(visit);
          if (obj['@type']) types.push(obj['@type']);
          for (const value of Object.values(obj)) visit(value);
        }
        for (const script of scripts) { try { visit(JSON.parse(script.textContent)); } catch {} }
        return {
          title: document.title,
          headings: [...document.querySelectorAll('h1')].map(x => x.textContent.trim()),
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          robots: meta?.content || '',
          description: document.querySelector('meta[name="description"]')?.content || '',
          bodyText: main?.innerText || '',
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          galleryPresent: !!gallery,
          links: [...(main?.querySelectorAll('a[href]') || [])].map(a => a.href),
          jsonTypes: types.flat(),
        };
      });
      row.checks.canonical = initial.canonical === url;
      row.checks.indexable = !/noindex/i.test(initial.robots);
      row.checks.title = initial.headings.length === 1 && initial.headings[0].includes('State Fair of Texas');
      row.checks.description = initial.description.length > 80;
      row.checks.layout = initial.overflow <= 10;
      row.checks.gallery = initial.galleryPresent;
      row.checks.map = initial.links.includes('https://bigtex.com/plan-your-visit/map/');
      row.checks.ticketInfo = initial.bodyText.includes('2026 ticket prices and admission');
      row.checks.futureTicketDestination = !seasonOver || (await page.locator('[data-state-fair-official-ticket-cta]').getAttribute('href')) === 'https://bigtex.com/';
      row.checks.includedActivities = initial.bodyText.includes('More than 100 daily activities');
      row.checks.cottonBowlLink = initial.links.includes(origin + '/sports-venue/cotton-bowl');
      row.checks.redRiverLink = initial.links.includes(origin + '/event/red-river-rivalry');
      row.checks.season = seasonOver ? initial.bodyText.toLowerCase().includes('2026 fair concluded') : initial.bodyText.toLowerCase().includes('2026 fair underway');
      row.checks.schema = seasonOver ? (!initial.jsonTypes.includes('Event') && initial.jsonTypes.includes('WebPage')) : initial.jsonTypes.includes('Event');
      const summary = page.locator('[data-state-fair-historical-gallery] details summary');
      await summary.click({ timeout: 15000 });
      const archival = await page.locator('[data-state-fair-historical-gallery] figure').evaluateAll(els => els.map(e => ({
        alt: e.querySelector('img')?.getAttribute('alt') || '',
        source: e.querySelector('a[href*="commons.wikimedia.org"]')?.href || '',
        credit: e.textContent || '',
        license: e.querySelector('a[href*="creativecommons.org"]')?.href || '',
      })));
      row.photoCount = archival.length;
      row.checks.photoCount = archival.length === 31;
      row.checks.photoAttribution = archival.every(e => e.alt && e.source && e.license.includes('by-sa') && e.credit.includes('Michael Barera'));
      // Independently verify the 2026 photograph; do not conflate its CC0
      // licensing with the preserved 31-photo Michael Barera CC BY-SA archive.
      const freshFigure = page.locator('[data-state-fair-2026-licensed-photo]');
      await freshFigure.locator('img').scrollIntoViewIfNeeded({ timeout: 15000 });
      const freshImageLoaded = await page.waitForFunction(() => {
        const img = document.querySelector('[data-state-fair-2026-licensed-photo] img');
        return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
      }, null, { timeout: 20000 }).then(() => true).catch(() => false);
      row.currentYearPhoto = await freshFigure.evaluate(el => ({
        alt: el.querySelector('img')?.alt || '',
        source: el.querySelector('a[href*="commons.wikimedia.org"]')?.href || '',
        cc0: el.querySelector('a[href*="creativecommons.org/publicdomain/zero/1.0"]')?.href || '',
        credited: el.textContent?.includes('IcedCowboyCoffee') || false,
        imageSrc: el.querySelector('img')?.currentSrc || '',
        imageComplete: el.querySelector('img')?.complete || false,
        imageWidth: el.querySelector('img')?.naturalWidth || 0,
      }));
      row.checks.currentYearPhoto = freshImageLoaded &&
        row.currentYearPhoto.alt.includes('2026') &&
        row.currentYearPhoto.source.includes('The_Midway_of_the_State_Fair_of_Texas_2026.png') &&
        !!row.currentYearPhoto.cc0 && row.currentYearPhoto.credited;
      await freshFigure.screenshot({ path: out + '/' + viewport + '-2026-photo.png', timeout: 20000 });
      await page.screenshot({ path: out + '/' + viewport + '.png', fullPage: false });
      await page.locator('[data-state-fair-historical-gallery]').screenshot({ path: out + '/' + viewport + '-gallery.png', timeout: 20000 });
      // A root shell hydration marker is insufficient for this lazy route's
      // affiliate slot. Require the nested React effect's explicit handshake.
      row.checks.stateFairHydration = await page.waitForFunction(
        () => document.documentElement.dataset.tdStateFairHydrated === '1' &&
          !!document.querySelector('[data-state-fair-stay-slot]'),
        null, { timeout: 15000 },
      ).then(() => true).catch(() => false);
      row.checks.javascript = row.errors.length === 0;
      // Investigate real React #418 failures without weakening the strict baseline.
      // Compare fresh isolated browser contexts with third-party integrations blocked.
      if (viewport === 'mobile' && row.errors.some(e => /#418|hydrat/i.test(e))) {
        row.hydrationIsolation = [];
        const scenarios = [
          { name: 'unmodified-repeat', block: [] },
          { name: 'expedia-blocked', block: ['expedia-travel.js'] },
          { name: 'all-deferred-integrations-blocked', block: [
            'expedia-travel.js', 'stay-affiliate-options.js', 'stay-nearby-context-images.js',
            'city-experience-affiliate.js', 'texas-brand-locator.js',
          ] },
        ];
        for (const scenario of scenarios) {
          const isolated = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
          const probe = await isolated.newPage();
          const failures = [];
          probe.on('pageerror', e => failures.push({ message: e.message, stack: e.stack || '' }));
          if (scenario.block.length) {
            await probe.route('**/*', route => {
              const path = new URL(route.request().url()).pathname;
              return scenario.block.some(name => path.endsWith('/' + name))
                ? route.abort()
                : route.continue();
            });
          }
          let loaded = false, hydrationReady = false, liveStatus = '', loadError = '';
          try {
            const res = await probe.goto(url + '?fair-qa-probe=' + encodeURIComponent(scenario.name), {
              waitUntil: 'domcontentloaded', timeout: 55000,
            });
            loaded = res?.status() === 200;
            hydrationReady = await probe.waitForFunction(
              () => document.documentElement.dataset.tdRootHydrated === '1',
              null, { timeout: 15000 },
            ).then(() => true).catch(() => false);
            await probe.waitForTimeout(750);
            liveStatus = await probe.locator('[data-state-fair-live-panel] .eyebrow').first()
              .textContent({ timeout: 5000 }).catch(() => '');
          } catch (error) { loadError = String(error); }
          row.hydrationIsolation.push({
            scenario: scenario.name, blocked: scenario.block, loaded, hydrationReady,
            liveStatus, errors: failures, loadError,
          });
          await isolated.close();
        }
      }
    } catch (e) { row.errors.push(String(e)); }
    finally { await context.close(); }
  }
} finally { await browser.close(); }
await writeFile(out + '/results.json', JSON.stringify({ url, seasonOver, results }, null, 2));
for (const result of results) console.log(JSON.stringify(result));
if (results.some(row => row.errors.length || Object.values(row.checks).some(v => v !== true))) {
  console.error('State Fair Chrome QA failed; see artifacts/state-fair-browser/results.json');
  process.exit(1);
}
console.log('State Fair production Chrome QA passed on mobile, tablet and desktop.');
