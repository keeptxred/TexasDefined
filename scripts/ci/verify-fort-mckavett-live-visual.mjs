#!/usr/bin/env node
/** Bounded production Chrome QA for the seven-image Fort McKavett authority page.
 * Read-only: one real destination, desktop + mobile; no crawling or mutations.
 * Retain a machine-readable verdict and real screenshot for each viewport.
 */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/+$/, '');
const pagePath = '/destination/fort-mckavett';
const outputDir = 'artifacts/fort-mckavett-live-visual';
const expected = [
  { file: 'Fort_McKavett_Hospital.jpg', author: 'Articseahorse', license: 'CC BY-SA 4.0' },
  { file: 'Fort_McKavett_HQ.jpg', author: 'Articseahorse', license: 'CC BY-SA 4.0' },
  { file: 'Fort_McKavett_Commander%27s_house.jpg', author: 'Articseahorse', license: 'CC BY-SA 4.0' },
  { file: 'Fort_McKavett_hospital_medical_supplies.jpg', author: 'Articseahorse', license: 'CC BY-SA 4.0' },
  { file: 'Fort_McKavett_Cannon.jpg', author: 'Articseahorse', license: 'CC BY-SA 4.0' },
  { file: 'Buffalo_Soldiers_at_the_Fort_McKavett_State_Historic_Site.jpg', author: 'Pi3.124', license: 'CC BY-SA 3.0' },
];
const viewports = [
  { name: 'desktop', width: 1365, height: 900, mobile: false },
  { name: 'mobile', width: 390, height: 844, mobile: true },
];
if (process.argv.includes('--self-test')) {
  assert.equal(pagePath, '/destination/fort-mckavett');
  assert.equal(expected.length, 6);
  assert.equal(new Set(expected.map(x => x.file)).size, 6);
  assert.deepEqual(viewports.map(x => x.name), ['desktop', 'mobile']);
  console.log('Fort McKavett bounded visual QA scenario contract passed.');
  process.exit(0);
}
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-fort-mckavett-qa/node_modules/playwright-core');
await mkdir(outputDir, { recursive: true });
const report = { checkedAt: new Date().toISOString(), deployedSha: process.env.TARGET_DEPLOY_SHA || '',
  page: origin + pagePath, viewports: [], failures: [] };
let browser;
try {
  browser = await chromium.launch({ headless: true,
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1, isMobile: viewport.mobile, hasTouch: viewport.mobile,
    });
    await context.route('**/*', route => {
      if (/googletagmanager|google-analytics|doubleclick\.net|clarity\.ms|\/api\/analytics(?:\/|\?|$)/i.test(route.request().url()))
        return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    const record = { viewport: viewport.name, checks: [], pictures: [], screenshots: [], errors: [] };
    page.on('pageerror', e => record.errors.push(e.message.slice(0, 400)));
    const verify = (name, success, detail = '') => {
      const check = { name, pass: !!success, detail: String(detail).slice(0, 350) };
      record.checks.push(check);
      if (!check.pass) report.failures.push({ viewport: viewport.name, ...check });
    };
    try {
      const res = await page.goto(origin + pagePath + '?fort_photo_qa=' +
        encodeURIComponent((report.deployedSha || 'live').slice(0,12) + '-' + viewport.name),
        { waitUntil: 'domcontentloaded', timeout: 55000 });
      verify('HTTP 200', res?.status() === 200, res?.status());
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25000 });
      await page.locator('[aria-labelledby="destination-photo-archive"] figure').first()
        .waitFor({ state: 'attached', timeout: 25000 });
      await page.evaluate(() => document.fonts?.ready);
      verify('single accurate H1', await page.locator('h1').count() === 1 &&
        /Fort McKavett State Historic Site/.test(await page.locator('h1').first().innerText()));
      const metadata = await page.evaluate(() => ({
        title: document.title,
        canonical: document.querySelector('link[rel=canonical]')?.href,
        robots: document.querySelector('meta[name=robots]')?.content,
        description: document.querySelector('meta[name=description]')?.content || '',
      }));
      verify('canonical URL', metadata.canonical === origin + pagePath, metadata.canonical);
      verify('indexable', !/noindex/i.test(metadata.robots || ''), metadata.robots);
      verify('complete site-specific SEO description',
        /Fort McKavett/.test(metadata.description) &&
        /tour tips\.$/.test(metadata.description), metadata.description);
      const hero = page.locator('img[alt="Historic soldiers barracks at Fort McKavett State Historic Site in Texas"]');
      verify('exact-location barracks hero remains', await hero.count() === 1);
      if (await hero.count()) {
        await hero.scrollIntoViewIfNeeded();
        await hero.evaluate(async el => { try { await el.decode(); } catch {} });
        const heroStatus = await hero.evaluate(el => ({ src: el.currentSrc, width: el.naturalWidth,
          height: el.naturalHeight, drawn: el.getBoundingClientRect().width }));
        verify('hero decoded actual image', heroStatus.width >= 700 && heroStatus.height >= 300,
          JSON.stringify(heroStatus));
      }
      const gallery = page.locator('section[aria-labelledby="destination-photo-archive"]');
      const figures = gallery.locator('figure');
      verify('six real gallery figures', await figures.count() === 6, await figures.count());
      verify('correct gallery heading',
        (await gallery.locator('h2').first().innerText()).includes('Fort McKavett: buildings, exhibits and historical interpretation'));
      // Scroll every lazy-loaded photo into the viewport before checking actual decoded pixels.
      for (const [i, photo] of expected.entries()) {
        const figure = figures.nth(i);
        const img = figure.locator('img');
        const picture = { expected: photo.file };
        try {
          await img.scrollIntoViewIfNeeded({ timeout: 12000 });
          await img.evaluate(async element => { try { await element.decode(); } catch {} });
          Object.assign(picture, await figure.evaluate(element => {
            const image = element.querySelector('img');
            const link = element.querySelector('figcaption a');
            const bounds = image?.getBoundingClientRect();
            return { src: image?.currentSrc || '', alt: image?.getAttribute('alt') || '',
              naturalWidth: image?.naturalWidth || 0, naturalHeight: image?.naturalHeight || 0,
              drawnWidth: bounds?.width || 0, drawnHeight: bounds?.height || 0,
              caption: element.querySelector('figcaption')?.innerText || '', source: link?.href || '' };
          }));
          verify('image ' + (i + 1) + ' matches licensed exact-site file',
            picture.src.includes(encodeURIComponent(photo.file)) || picture.src.includes(photo.file),
            picture.src);
          verify('image ' + (i + 1) + ' decoded genuine pixels',
            picture.naturalWidth >= 700 && picture.naturalHeight >= 400 &&
              picture.drawnWidth > 100 && picture.drawnWidth <= viewport.width,
            JSON.stringify(picture));
          verify('image ' + (i + 1) + ' alt, credit, license and source URL',
            picture.alt.length >= 25 && picture.caption.includes(photo.author) &&
            picture.caption.includes(photo.license) &&
            picture.source.startsWith('https://commons.wikimedia.org/wiki/File:') &&
            picture.source.includes(photo.file),
            JSON.stringify(picture));
        } catch (error) {
          verify('image ' + (i + 1) + ' loads without browser failure', false, String(error));
        }
        record.pictures.push(picture);
      }
      const bounds = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }));
      verify('no mobile/desktop horizontal overflow', bounds.documentWidth <= bounds.viewportWidth + 6,
        JSON.stringify(bounds));
      verify('no browser runtime errors', record.errors.length === 0, record.errors.join(' | '));
      const galleryPath = outputDir + '/' + viewport.name + '-gallery.png';
      await gallery.screenshot({ path: galleryPath, animations: 'disabled', timeout: 25000 });
      record.screenshots.push(galleryPath);
      await page.evaluate(() => window.scrollTo(0,0));
      const heroPath = outputDir + '/' + viewport.name + '-hero.png';
      await page.screenshot({ path: heroPath, animations: 'disabled', timeout: 25000 });
      record.screenshots.push(heroPath);
    } catch (error) {
      verify('browser scenario', false, error instanceof Error ? error.stack || error.message : String(error));
    } finally {
      report.viewports.push(record);
      await context.close();
    }
  }
} catch (error) {
  report.failures.push({ viewport: 'runner', name: 'Chrome launch', detail: String(error) });
} finally {
  if (browser) await browser.close();
}
await writeFile(outputDir + '/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ page: report.page, totalChecks: report.viewports.reduce((sum, r) => sum + r.checks.length, 0),
  viewports: report.viewports.map(x => x.viewport), failures: report.failures }, null, 2));
if (report.failures.length) process.exitCode = 1;
