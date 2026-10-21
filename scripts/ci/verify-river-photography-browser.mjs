import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/td-river-images-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const artifactDir = 'artifacts/river-photo-acceptance';
await mkdir(artifactDir, { recursive: true });

const rivers = [
  { slug: 'texas-lavaca-river-guide', image: 'Swing_Bridge_Over_Lavaca_River.jpg', alt: /Lavaca River/i, license: /CC BY 2\.0/i },
  { slug: 'texas-sabine-river-guide', image: 'Sabine_River_near_Big_Sandy', alt: /Sabine River/i, license: /CC BY 3\.0/i },
  { slug: 'texas-san-jacinto-river-guide', image: 'West_Fork_San_Jacinto_River.jpg', alt: /San Jacinto River/i, license: /CC BY-SA 4\.0/i },
  { slug: 'texas-cypress-river-basin-guide', image: 'Big_Cypress_Bayou%2C_Caddo_Lake_State_Park', alt: /Cypress Bayou/i, license: /CC BY-SA 4\.0/i, author: /William L\. Farr/i },
  { slug: 'texas-neches-river-guide', image: 'Neches_River%2C_Orange_County', alt: /Neches River/i, license: /CC BY-SA 4\.0/i, author: /William L\. Farr/i },
  { slug: 'texas-red-river-guide', image: 'Red_River%2C_Texas', alt: /Red River/i, license: /CC BY-SA 2\.0/i, author: /brewbooks/i },
  { slug: 'texas-sulphur-river-guide', image: 'Fishing_on_the_Sulphur_River_-_Wright_Patman_Dam', alt: /Sulphur River/i, license: /CC BY 2\.0/i, author: /Tony Webster/i },
  { slug: 'texas-frio-river-guide', image: 'Garner_state_park.jpg', alt: /Frio River/i, license: /CC BY 4\.0/i, author: /Larry D\. Moore/i },
  { slug: 'texas-llano-river-guide', image: 'Llano_River_in_Junction%2C_TX_IMG_4345', alt: /Llano River/i, license: /CC BY-SA 3\.0/i, author: /Billy Hathorn/i },
];

// The browser acceptance must cover the entire published river registry, not
// only its first nine photographs. Real-image licensing remains catalog-led.
const catalogSource = readFileSync('src/data/river-authority-photo-catalog.ts', 'utf8');
const catalogAt = catalogSource.indexOf('\n{\n');
assert.ok(catalogAt > -1, 'No parseable river photo catalog');
const catalogJson = catalogSource.slice(catalogAt + 1).trim().replace(/;\s*$/, '').replace(/,\s*}/g, '}');
const catalog = JSON.parse(catalogJson);
const alreadyTested = new Set(rivers.map(item => item.slug));
const additional = [
  'texas-brazos-river-guide', 'texas-colorado-river-guide',
  'texas-guadalupe-river-guide', 'texas-trinity-river-guide',
  'texas-rio-grande-river-guide', 'texas-canadian-river-guide',
  'texas-san-antonio-river-guide', 'texas-nueces-river-guide',
  'texas-pecos-river-guide', 'texas-comal-river-guide',
  'texas-san-marcos-river-guide',
];
const escapeRegex = value => String(value).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\const pages = [];');
for (const slug of additional) {
  assert.ok(!alreadyTested.has(slug), 'Duplicate photo test ' + slug);
  const photo = catalog['/article/' + slug];
  assert.ok(photo, 'Missing catalog photo ' + slug);
  const pathname = decodeURIComponent(new URL(photo.sourceUrl).pathname);
  const imageName = pathname.slice(pathname.indexOf('File:') + 5);
  const riverName = slug.replace(/^texas-/, '').replace(/-river(?:-basin)?-guide$/, '').replace(/-/g, ' ');
  rivers.push({
    slug, image: imageName,
    alt: new RegExp(escapeRegex(riverName), 'i'),
    license: new RegExp(escapeRegex(photo.license), 'i'),
    author: new RegExp(escapeRegex(photo.photographer), 'i'),
  });
}
const catalogSlugs = Object.keys(catalog).filter(href => href.startsWith('/article/'));
assert.equal(catalogSlugs.length, 20, '20 registered guides must have photos');
assert.equal(rivers.length, 20, 'All 20 river guides must pass Chrome');
assert.deepEqual(new Set(rivers.map(item => item.slug)), new Set(catalogSlugs.map(href => href.split('/').at(-1))));
const atlasSlugs = new Set([
  ...readFileSync('src/data/fixtures/texas-explained-river-profiles.ts', 'utf8').matchAll(/slug:\s*"([^"]+-guide)"/g),
  ...readFileSync('src/data/fixtures/texas-explained-river-profiles-remaining.ts', 'utf8').matchAll(/slug:\s*"([^"]+-guide)"/g),
].map(match => match[1]));
assert.equal(atlasSlugs.size, 15, 'The major basin atlas must contain 15 guides');

const pages = [];
const failureNotes = [];
const verify = (condition, message) => assert.ok(condition, message);
function originalImageIdentity(value) {
  // First-party /media/remote?url=... encodes the source once, and Wikimedia's
  // punctuation may be encoded a second time inside that embedded source URL.
  let normalized = String(value);
  for (let i = 0; i < 4; i++) {
    let next;
    try { next = decodeURIComponent(normalized); } catch { break; }
    if (next === normalized) break;
    normalized = next;
  }
  return normalized;
}

async function inspectImage(page, img, title) {
  await img.scrollIntoViewIfNeeded({ timeout: 20_000 });
  await img.waitFor({ state: 'visible', timeout: 15_000 });
  const read = async () => img.evaluate(el => {
    const r = el.getBoundingClientRect();
    return { src: el.currentSrc || el.src, alt: el.alt, naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight, complete: el.complete, renderedWidth: r.width, renderedHeight: r.height };
  });
  try {
    await page.waitForFunction(el => Boolean(el?.complete && el.naturalWidth >= 400), await img.elementHandle(),
      { timeout: 25_000, polling: 300 });
  } catch (err) {
    throw new Error(title + ' image failed to decode: ' + JSON.stringify(await read()) + ' / ' + (err?.message || err));
  }
  const data = await read();
  verify(data.naturalWidth >= 400 && data.renderedHeight > 50, title + ': image is missing or too small');
  verify(data.alt.length >= 30, title + ': image has no descriptive alt');
  return data;
}

async function visit(page, path, title, label) {
  const response = await page.goto(origin + path + '?qa=river-photo-' + Date.now(),
    { waitUntil: 'domcontentloaded', timeout: 55_000 });
  verify(response?.status() === 200, title + ': HTTP ' + response?.status());
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25_000 });
  return { page: path, viewport: label, title, http: response.status(), images: [], network: [] };
}

let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [label, width, height, mobile] of [['mobile', 390, 844, true], ['desktop', 1366, 900, false]]) {
    const context = await browser.newContext({
      viewport: { width, height }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1,
      extraHTTPHeaders: { 'X-TexasDefined-QA': 'river-photo-browser', 'Cache-Control': 'no-cache' },
      userAgent: 'TexasDefined-EditorialPhotoQA/1.0 Chrome',
    });
    // This is an image-display test, not an analytics visit. Do not load
    // third-party advertising, trackers or analytics tags.
    await context.route('**/*', route => {
      const u = route.request().url();
      if (/google-analytics\.com|googletagmanager\.com|doubleclick\.net|facebook\.com\/tr|clarity\.ms|analytics\.tiktok\.com|connect\.facebook\.net|hotjar\.com/i.test(u)) return route.abort('blockedbyclient');
      return route.continue();
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (/commons\.wikimedia\.org|upload\.wikimedia\.org/.test(response.url()) && response.status() >= 400)
        failureNotes.push({ viewport: label, response: response.status(), url: response.url() });
    });
    try {
      for (const river of rivers) {
        const path = '/article/' + river.slug;
        const record = await visit(page, path, river.slug, label);
        pages.push(record);
        // Check the rendered hero element, not a raw CSS substring. Browsers
        // can normalize Wikimedia %2C filenames to literal commas in src.
        const img = page.locator('section.relative.isolate > img').first();
        verify(await img.count() === 1, label + ': hero image element absent for ' + river.slug);
        const result = await inspectImage(page, img, label + ' hero ' + river.slug);
        verify(originalImageIdentity(result.src).includes(originalImageIdentity(river.image)),
          label + ': hero uses an unrelated photo: ' + river.slug + ' ' + result.src);
        verify(river.alt.test(result.alt), label + ': hero alt misidentifies ' + river.slug);
        record.images.push(result);
        await page.screenshot({ path: artifactDir + '/' + label + '-' + river.slug + '.png',
          fullPage: false, animations: 'disabled', timeout: 25_000 });
      }
      for (const path of ['/article/texas-rivers-explained', '/explore/landscapes/rivers-and-river-valleys']) {
        const record = await visit(page, path, path, label);
        pages.push(record);
        for (const river of rivers) {
          // The major-basin atlas has 15 basin cards; five recreation guides
          // are text links there. River Valleys has all 20 photo cards.
          if (path === '/article/texas-rivers-explained' && !atlasSlugs.has(river.slug)) continue;
          // River guides may have other linked teasers earlier in the article.
          // Match the *source photo* as well as the river link so the credit
          // assertion targets the real shared river directory card.
          const anchors = page.locator('a[href="/article/' + river.slug + '"]').filter({ has: page.locator('img') });
          let anchor = null;
          for (let i = 0; i < await anchors.count(); i++) {
            const candidate = anchors.nth(i);
            const candidateSrc = await candidate.locator('img').first().getAttribute('src') || '';
            if (originalImageIdentity(candidateSrc).includes(originalImageIdentity(river.image))) {
              anchor = candidate;
              break;
            }
          }
          verify(anchor !== null, label + ': missing exact river photo card ' + river.slug + ' at ' + path);
          const img = anchor.locator('img').first();
          const result = await inspectImage(page, img, label + ' card ' + river.slug + ' at ' + path);
          verify(new URL(result.src).pathname === '/media/remote',
            label + ': river card bypasses the cached first-party image delivery: ' + river.slug + ' at ' + path);
          verify(originalImageIdentity(result.src).includes(originalImageIdentity(river.image)),
            label + ': generic or mismatched image at ' + path + ' for ' + river.slug);
          verify(river.alt.test(result.alt), label + ': inaccurate card alt at ' + path);
          const outer = anchor.locator('..');
          const credit = await outer.innerText();
          verify(river.license.test(credit), label + ': missing visible photo license at ' + path + ' for ' + river.slug);
          if (river.author) verify(river.author.test(credit), label + ': missing correct photo creator at ' + path + ' for ' + river.slug);
          verify(await outer.locator('a[href*="commons.wikimedia.org/wiki/File:"]').count() >= 1,
            label + ': photo original source permalink absent at ' + path + ' for ' + river.slug);
          verify(await outer.locator('a[href^="https://creativecommons.org/licenses/"]').count() >= 1,
            label + ': Creative Commons license permalink absent at ' + path + ' for ' + river.slug);
          record.images.push({ river: river.slug, ...result, credited: true });
        }
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        verify(overflow <= 10, label + ': horizontal overflow at ' + path + ' = ' + overflow);
      }
      verify(errors.length === 0, label + ': uncaught browser errors ' + JSON.stringify(errors));
    } catch (e) {
      try { await page.screenshot({ path: artifactDir + '/' + label + '-failure.png', fullPage: false, timeout: 15_000 }); }
      catch { /* preserve the primary failure */ }
      throw e;
    } finally { await context.close(); }
  }
} finally {
  await writeFile(artifactDir + '/acceptance.json', JSON.stringify({
    at: new Date().toISOString(), origin, commit: process.env.GITHUB_SHA || '',
    pages, failures: failureNotes,
  }, null, 2));
  await browser?.close();
}
console.log('River photo acceptance passed: nine live guide heroes, seven basin-atlas cards and nine River Valleys cards at mobile and desktop widths.');
