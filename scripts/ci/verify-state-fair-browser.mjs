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
      // Fail closed if the new 2026 retrospective loses its official figures
      // or citation; do not conflate annual estimates and 2026 attendance.
      row.checks.official2026Results =
        initial.bodyText.toLowerCase().includes('2026 fair by the numbers') &&
        initial.bodyText.includes('Nearly 2.1 million') &&
        initial.bodyText.includes('More than $2.7 million') &&
        initial.bodyText.includes('110,655 pounds') &&
        initial.bodyText.includes('103 students') &&
        initial.links.some(link => link.startsWith(
          'https://bigtex.com/the-2026-state-fair-of-texas-welcomes-nearly-2-1-million-fairgoers'
        ));
      // The recap image was distributed directly in the Fair's October 18
      // press release. Verify the actual pixels, source and prescribed credit.
      const recapImage = page.locator('[data-state-fair-recap-email-photo] img');
      await recapImage.scrollIntoViewIfNeeded({ timeout: 15000 });
      const recapPhotoLoaded = await page.waitForFunction(() => {
        const img = document.querySelector('[data-state-fair-recap-email-photo] img');
        return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
      }, null, { timeout: 20000 }).then(() => true).catch(() => false);
      const photoCaption = await page.locator('[data-state-fair-recap-email-photo] figcaption').innerText().catch(() => '');
      row.checks.recapEmailPhoto = recapPhotoLoaded &&
        (await recapImage.getAttribute('src'))?.includes('20261018/48/27/d5/98/') &&
        photoCaption.includes('Photo Credit: State Fair of Texas');

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
      // A full-element screenshot alone does not load offscreen lazy images.
      // Visit every gallery item as a user would, prove decoded image pixels,
      // and only then capture a gallery screenshot with all 31 images present.
      const galleryImages = page.locator('[data-state-fair-historical-gallery] figure img');
      const brokenGalleryImages = [];
      for (let index = 0; index < archival.length; index += 1) {
        const image = galleryImages.nth(index);
        await image.scrollIntoViewIfNeeded({ timeout: 12000 });
        const loaded = await page.waitForFunction((position) => {
          const img = document.querySelectorAll('[data-state-fair-historical-gallery] figure img')[position];
          return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
        }, index, { timeout: 15000 }).then(() => true).catch(() => false);
        if (!loaded) {
          brokenGalleryImages.push({
            index: index + 1,
            alt: await image.getAttribute('alt'),
            src: await image.getAttribute('src'),
          });
        }
      }
      row.brokenGalleryImages = brokenGalleryImages;
      row.checks.galleryImagePixels = archival.length === 31 && brokenGalleryImages.length === 0;
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
      // Separate October 2026 Commons CC0 photographs from the 31-photo
      // CC BY-SA 2019 archive; check decoded pixels on each viewport.
      const new2026Figures = page.locator('[data-state-fair-2026-bigtex-gallery] figure');
      const modernPhotoCount = await new2026Figures.count();
      const modernPhotoErrors = [];
      for (let index = 0; index < modernPhotoCount; index += 1) {
        const photo = new2026Figures.nth(index);
        const img = photo.locator('img');
        await img.scrollIntoViewIfNeeded({ timeout: 12000 });
        const pixels = await page.waitForFunction(position => {
          const src = document.querySelectorAll('[data-state-fair-2026-bigtex-gallery] figure img')[position];
          return src instanceof HTMLImageElement && src.complete && src.naturalWidth > 0;
        }, index, { timeout: 20000 }).then(() => true).catch(() => false);
        const alt = await img.getAttribute('alt') || '';
        const source = await photo.locator('a[href*="commons.wikimedia.org"]').getAttribute('href');
        const license = await photo.locator('a[href*="creativecommons.org/publicdomain/zero"]').getAttribute('href');
        const credit = await photo.innerText();
        if (!pixels || !alt.includes('2026') || !source?.includes('Big_Tex_') ||
            !license?.includes('zero/1.0') || !credit.includes('Texan29CleburnePhotographer')) {
          modernPhotoErrors.push({ index, pixels, alt, source, license, credit: credit.slice(0, 160) });
        }
      }
      row.modernPhotoCount = modernPhotoCount;
      row.modernPhotoErrors = modernPhotoErrors;
      row.checks.additional2026Photos = modernPhotoCount === 2 && modernPhotoErrors.length === 0;
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: out + '/' + viewport + '.png', fullPage: false });
      await page.locator('[data-state-fair-historical-gallery]').screenshot({ path: out + '/' + viewport + '-gallery.png', timeout: 20000 });
      // A root shell hydration marker is insufficient for this lazy route's
      // affiliate slot. Require the nested React effect's explicit handshake.
      row.checks.stateFairHydration = await page.waitForFunction(
        () => document.documentElement.dataset.tdStateFairHydrated === '1' &&
          !!document.querySelector('[data-state-fair-stay-slot]'),
        null, { timeout: 15000 },
      ).then(() => true).catch(() => false);
      // Check the actual hydrated hotel module, not just an empty React slot.
      // Expedia owns the surface and disclosures; keep its real DOM contract strict.
      row.checks.hotelAffiliateDisclosure = await page.waitForFunction(() => {
        const surface = document.querySelector('[data-state-fair-stay-slot] #expedia-travel-surface');
        if (!surface || !/Affiliate disclosure: TexasDefined may earn/i.test(surface.textContent || '')) return false;
        const affiliateLinks = [...surface.querySelectorAll('a[data-affiliate-partner]')];
        return affiliateLinks.every(a => (a.getAttribute('rel') || '').includes('sponsored'));
      }, null, { timeout: 15000 }).then(() => true).catch(() => false);
      row.hotelModuleText = await page.locator('[data-state-fair-stay-slot]').innerText().then(x => x.slice(0, 350)).catch(() => '');
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
