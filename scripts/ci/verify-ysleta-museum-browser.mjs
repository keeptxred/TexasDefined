import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-ysleta-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const museumPath = '/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso';
const artifacts = 'artifacts/ysleta-museum-qa';
const links = {
  borderlands: '/article/texas-borderlands-historic-sites-guide',
  city: '/city/el-paso',
  county: '/county/el-paso',
  sacred: '/texas-sacred-places',
  history: '/article/indigenous-texas-history-native-nations',
};
const out = [];
const cacheBusted = path => origin + path + '?verify=ysleta-browser-' + Date.now();
await mkdir(artifacts, { recursive: true });

function check(ok, message) { assert.ok(ok, message); }
async function snapshot(page) {
  return page.evaluate(() => {
    const visible = el => { const rect = el.getBoundingClientRect(); const cs = getComputedStyle(el); return rect.width > 0 && rect.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    const images = [...document.images].filter(visible);
    return {
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      robots: document.querySelector('meta[name="robots"]')?.content || '',
      h1: [...document.querySelectorAll('h1')].map(e => e.innerText.trim()),
      text: document.body.innerText,
      links: [...document.querySelectorAll('a[href]')].map(e => ({ href: e.href, label: (e.innerText || '').trim() })),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(e => e.textContent).join('\n'),
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      images: images.map(img => ({ src: img.currentSrc || img.src, complete: img.complete, naturalWidth: img.naturalWidth, renderedWidth: img.getBoundingClientRect().width, alt: img.alt })),
      missingAlt: images.filter(img => !img.hasAttribute('alt')).map(img => img.src),
    };
  });
}
function hasLink(data, path) {
  return data.links.some(link => { try { return new URL(link.href).pathname === path; } catch { return false; } });
}
async function inspectMuseum(page, viewport) {
  const response = await page.goto(cacheBusted(museumPath), { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25_000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(1200);
  const hero = page.locator('img[alt*="Photograph of the actual Tigua Cultural Center"]');
  const panorama = page.locator('img[alt*="Wide panoramic photograph"]');
  await panorama.scrollIntoViewIfNeeded({ timeout: 20_000 });
  let photoWait = null;
  try {
    await page.waitForFunction(() => [...document.images].filter(img => /Tigua Cultural Center/.test(img.alt)).length === 2 &&
      [...document.images].filter(img => /Tigua Cultural Center/.test(img.alt)).every(img => img.complete && img.naturalWidth >= 500),
      null, { timeout: 25_000, polling: 350 });
  } catch (err) { photoWait = err instanceof Error ? err.message : String(err); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: artifacts + '/' + viewport + '-museum.png', fullPage: true, animations: 'disabled', timeout: 40_000 });
  const data = await snapshot(page);
  check(response?.status() === 200, viewport + ': museum HTTP ' + response?.status());
  check(data.h1.length === 1 && data.h1[0] === 'Ysleta del Sur Pueblo Cultural Center Museum', viewport + ': incorrect H1');
  check(await page.locator('main').count() === 1, viewport + ': museum route should use a single semantic main landmark');
  check(data.title.includes('Ysleta del Sur Pueblo Museum'), viewport + ': missing SEO title');
  check(data.metaDescription.length > 80, viewport + ': missing/short description');
  check(data.canonical === origin + museumPath, viewport + ': wrong canonical ' + data.canonical);
  check(!/\bnoindex\b/i.test(data.robots), viewport + ': still noindex');
  check(data.jsonLd.includes('"Museum"') && data.jsonLd.includes('"BreadcrumbList"'), viewport + ': missing museum/breadcrumb JSON-LD');
  check(hasLink(data, links.borderlands) && hasLink(data, links.history) && hasLink(data, links.county), viewport + ': internal museum outbound links missing');
  check(data.links.some(l => l.href === 'https://visitelpaso.com/epmissiontrail'), viewport + ': missing authentic Mission Trail resource');
  check(!data.links.some(l => l.label.includes('Understand the El Paso Mission Trail') && new URL(l.href).pathname === '/article/el-paso-county-missions-rio-grande-texas'), viewport + ': misleading legacy link remains');
  check(data.text.includes('Wednesday–Sunday') && data.text.includes('Confirm directly') && data.text.includes('second and fourth Saturdays'), viewport + ': visitor claims/caveats missing');
  check(data.documentWidth <= data.viewportWidth + 10, viewport + ': horizontal overflow ' + data.documentWidth + '/' + data.viewportWidth);
  check(data.missingAlt.length === 0, viewport + ': images with missing alt ' + JSON.stringify(data.missingAlt));
  for (const img of [hero, panorama]) {
    const state = await img.evaluate(e => ({ src: e.currentSrc || e.src, width: e.naturalWidth, complete: e.complete, rendered: e.getBoundingClientRect().width }));
    check(state.complete && state.width >= 500 && state.rendered <= data.viewportWidth + 10, viewport + ': failed exact-place licensed image ' + JSON.stringify(state) + ' wait=' + photoWait);
  }
  return { page: 'museum', viewport, http: response.status(), title: data.title, canonical: data.canonical, robots: data.robots, documentWidth: data.documentWidth, viewportWidth: data.viewportWidth, images: data.images, linkCount: data.links.length };
}
async function inspectInbound(page, path, viewport) {
  const response = await page.goto(cacheBusted(path), { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25_000 });
  await page.evaluate(() => document.fonts?.ready);
  const data = await snapshot(page);
  check(response?.status() === 200, viewport + ': inbound ' + path + ' HTTP ' + response?.status());
  check(hasLink(data, museumPath), viewport + ': missing reciprocal museum link on ' + path);
  check(data.documentWidth <= data.viewportWidth + 10, viewport + ': overflow at ' + path);
  return { page: path, viewport, http: response.status(), museumLink: true, documentWidth: data.documentWidth };
}
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [viewport, width, height, mobile] of [['mobile', 390, 844, true], ['desktop', 1366, 900, false]]) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
    const page = await context.newPage(); const errors = [];
    page.on('console', message => { if (message.type() === 'error') errors.push({ url: page.url(), kind: 'console', message: message.text() }); });
    page.on('pageerror', e => errors.push({ url: page.url(), kind: 'exception', message: e.message }));
    try {
      out.push(await inspectMuseum(page, viewport));
      for (const path of [links.borderlands, links.city, links.county, links.sacred]) out.push(await inspectInbound(page, path, viewport));
      await writeFile(artifacts + '/' + viewport + '-runtime-errors.json', JSON.stringify({ viewport, errors }, null, 2) + '\\n');
      check(errors.length === 0, viewport + ': page runtime errors ' + JSON.stringify(errors));
    } finally { await context.close(); }
  }
  await writeFile(artifacts + '/acceptance.json', JSON.stringify({ checkedAt: new Date().toISOString(), origin, passes: out }, null, 2) + '\n');
  console.log('Ysleta museum real-browser acceptance PASS: responsive layouts, licensed images, SEO/indexability, primary visitor caveats, all four inbound page families; evidence saved.');
} catch (e) {
  await writeFile(artifacts + '/failure.json', JSON.stringify({ checkedAt: new Date().toISOString(), completed: out, failure: String(e?.stack || e) }, null, 2) + '\n');
  throw e;
} finally { if (browser) await browser.close(); }
