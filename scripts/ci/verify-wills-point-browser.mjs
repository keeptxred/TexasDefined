import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const schoolPath = '/texas-high-school-football-teams/wills-point';
const countyPath = '/county/van-zandt';
const dir = 'artifacts/wills-point-qa';
const results = [];
const warnings = [];
const cacheBust = () => '?verify=wills-point-browser-' + Date.now();

await mkdir(dir, { recursive: true });
let browser;

function check(condition, detail) {
  assert.ok(condition, detail);
}

function inspectSchool(data, viewport) {
  check(data.httpStatus === 200, viewport + ': school returned ' + data.httpStatus);
  check(data.h1s.length === 1 && /Wills Point/i.test(data.h1s[0]), viewport + ': expected one Wills Point h1, got ' + JSON.stringify(data.h1s));
  check(data.title.includes('Wills Point Tigers Football: 1965 State Title'), viewport + ': missing school-specific title');
  check(data.description.length >= 80 && /football/i.test(data.description), viewport + ': weak or missing description');
  check(data.canonical === origin + schoolPath, viewport + ': wrong canonical ' + data.canonical);
  check(!/\bnoindex\b/i.test(data.robots), viewport + ': robots noindex');
  for (const [needle,label] of [
    ['1965 Class 1A', 'correct 1965 championship class'],
    ['White Deer', '1965 final opponent'],
    ['14–0', '1965 final score'],
    ['4A Division II', 'current UIL assignment'],
    ['James Boxley', 'documented coach'],
    ['Ken Autry Davis Field', 'stadium'],
  ]) check(data.text.includes(needle), viewport + ': missing ' + label);
  check(data.links.some(l => l.href === 'https://www.uiltexas.org/football/archives/P528'), viewport + ': missing official 1965 UIL archive link');
  check(data.links.some(l => /wphs\.wpisd\.com/.test(l.href)), viewport + ': missing official high-school source');
  check(data.links.some(l => new URL(l.href).pathname === countyPath), viewport + ': missing Wills Point → county internal link');
  check(data.jsonLd.includes('"SportsTeam"') && data.jsonLd.includes('"BreadcrumbList"'), viewport + ': SportsTeam or breadcrumb schema missing');
  check(data.documentWidth <= data.viewportWidth + 10, viewport + ': horizontal overflow (' + data.documentWidth + ' > ' + data.viewportWidth + ')');
  check(data.imagesWithoutAlt.length === 0, viewport + ': visible images missing alt ' + JSON.stringify(data.imagesWithoutAlt));
  check(data.brokenVisibleImages.length === 0, viewport + ': broken visible images ' + JSON.stringify(data.brokenVisibleImages));
}

async function inspectPage(page, viewport) {
  const response = await page.goto(origin + schoolPath + cacheBust(), { waitUntil: 'domcontentloaded', timeout: 50_000 });
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25_000 });
  await page.evaluate(() => document.fonts?.ready);
  const data = await page.evaluate(() => {
    const visible = element => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
    };
    const images = Array.from(document.images).filter(visible);
    const links = Array.from(document.querySelectorAll('a[href]')).map(el => ({ href: el.href, text: (el.innerText || el.getAttribute('aria-label') || '').trim() }));
    return {
      title: document.title,
      h1s: Array.from(document.querySelectorAll('h1')).map(el => el.innerText.trim()),
      description: document.querySelector('meta[name=description]')?.content || '',
      canonical: document.querySelector('link[rel=canonical]')?.href || '',
      robots: document.querySelector('meta[name=robots]')?.content || '',
      text: document.body.innerText,
      links,
      jsonLd: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => s.textContent).join('\n'),
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      imagesWithoutAlt: images.filter(img => !img.hasAttribute('alt')).map(img => img.currentSrc || img.src),
      brokenVisibleImages: images.filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc || img.src),
    };
  });
  data.httpStatus = response?.status() ?? 0;
  await page.screenshot({ path: dir + '/' + viewport + '-school.png', fullPage: true, animations: 'disabled' });
  inspectSchool(data, viewport);
  return { viewport, http: data.httpStatus, h1: data.h1s, title: data.title, canonical: data.canonical,
    visibleImages: data.imagesWithoutAlt.length + data.brokenVisibleImages.length,
    linkCount: data.links.length, docWidth: data.documentWidth, viewportWidth: data.viewportWidth };
}

async function inspectCounty(page, viewport) {
  const response = await page.goto(origin + countyPath + cacheBust(), { waitUntil: 'domcontentloaded', timeout: 50_000 });
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25_000 });
  const county = await page.evaluate((schoolPath) => {
    const link = Array.from(document.querySelectorAll('a[href]')).find(el => new URL(el.href).pathname === schoolPath && (el.innerText || '').includes('Wills Point'));
    return { linkFound: Boolean(link), linkText: link?.innerText || '', visible: Boolean(link && link.getBoundingClientRect().width > 0) };
  }, schoolPath);
  await page.screenshot({ path: dir + '/' + viewport + '-county.png', fullPage: true, animations: 'disabled' });
  check(response?.status() === 200, viewport + ': county HTTP ' + response?.status());
  check(county.linkFound && county.visible, viewport + ': Wills Point reciprocal link absent or hidden on Van Zandt County page');
  return { viewport, countyHttp: response.status(), ...county };
}

try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [name, width, height, isMobile] of [
    ['mobile', 390, 844, true],
    ['desktop', 1366, 900, false],
  ]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile, hasTouch: isMobile });
    const page = await context.newPage();
    const browserErrors = [];
    page.on('pageerror', e => browserErrors.push(e.message));
    try {
      const school = await inspectPage(page, name);
      const county = await inspectCounty(page, name);
      results.push({ ...school, ...county, runtimeErrors: browserErrors });
      if (browserErrors.length) warnings.push(name + ': browser runtime errors: ' + browserErrors.slice(0, 3).join('; '));
      console.log('PASS ' + name + ' Wills Point and Van Zandt reciprocal route');
    } finally {
      await context.close();
    }
  }
} catch (error) {
  const reason = error instanceof Error ? error.stack || error.message : String(error);
  console.error('FAIL Wills Point browser acceptance:', reason);
  results.push({ failure: reason });
  process.exitCode = 1;
} finally {
  await browser?.close();
  await writeFile(dir + '/report.json', JSON.stringify({
    testedAt: new Date().toISOString(), school: origin + schoolPath, county: origin + countyPath,
    results, warnings, note: 'Automated rendered Chrome checks; human visual signoff and independently verified image rights remain separate.'
  }, null, 2) + '\n');
  for (const w of warnings) console.warn('WARNING: ' + w);
}
