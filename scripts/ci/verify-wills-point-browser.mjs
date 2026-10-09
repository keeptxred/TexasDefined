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
    ['Steve Oliver', 'school-listed 2026-27 offensive coordinator'],
    ['Flint Bigham', 'school-listed 2026-27 defensive coordinator'],
    ['Ken Autry Davis Field', 'stadium'],
  ]) check(data.text.includes(needle), viewport + ': missing ' + label);
  check(data.links.some(l => l.href === 'https://www.uiltexas.org/football/archives/P528'), viewport + ': missing official 1965 UIL archive link');
  check(data.links.some(l => /wphs\.wpisd\.com/.test(l.href)), viewport + ': missing official high-school source');
  check(data.links.some(l => l.href.includes('wpisd.com/page/page_calendar?calID=122113')), viewport + ': missing live Wills Point ISD events calendar');
  check(data.links.some(l => l.href === 'https://wphs.wpisd.com/3209_3'), viewport + ': missing official high-school ticket/contact source');
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
  await page.waitForTimeout(750); // Give client hydration time to report route-specific errors before acceptance.
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
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(750);
  // The Van Zandt after-hydration guard must not silently remove monetization.
  // It should allow the existing contextual lodging surface once React owns the DOM.
  await page.locator('#expedia-travel-surface').waitFor({ state: 'attached', timeout: 15_000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  const county = await page.evaluate((schoolPath) => {
    const link = Array.from(document.querySelectorAll('a[href]')).find(el => new URL(el.href).pathname === schoolPath && (el.innerText || '').includes('Wills Point'));
    return { linkFound: Boolean(link), linkText: link?.innerText || '', visible: Boolean(link && link.getBoundingClientRect().width > 0), h1: document.querySelector('h1')?.innerText || '', canonical: document.querySelector('link[rel=canonical]')?.href || '', documentHeight: document.documentElement.scrollHeight, scrollTop: window.scrollY };
  }, schoolPath);
  await page.screenshot({ path: dir + '/' + viewport + '-county-top.png', fullPage: false, animations: 'disabled' });
  const screenshot = await page.screenshot({ path: dir + '/' + viewport + '-county.png', fullPage: true, animations: 'disabled' });
  const screenshotHeight = screenshot.readUInt32BE(20); // PNG IHDR physical pixel height, DPR=1.
  check(response?.status() === 200, viewport + ': county HTTP ' + response?.status());
  check(/Van Zandt/i.test(county.h1), viewport + ': wrong county H1 ' + county.h1);
  check(county.canonical === origin + countyPath, viewport + ': wrong county canonical ' + county.canonical);
  check(screenshotHeight >= county.documentHeight * 0.75, viewport + ': county screenshot incomplete (' + screenshotHeight + 'px vs document ' + county.documentHeight + 'px)');
  check(county.linkFound && county.visible, viewport + ': Wills Point reciprocal link absent or hidden on Van Zandt County page');
  return { viewport, countyHttp: response.status(), screenshotHeight, ...county };
}


async function captureCountyHydrationDifference(page, viewport, width, height, isMobile) {
  const describe = async (candidate) => candidate.evaluate(() => {
    const element = document.querySelector('main article') || document.querySelector('article') || document.body;
    return {
      heading: element.querySelector('h1')?.textContent?.trim() || '',
      textLength: element.textContent?.length || 0,
      sectionOutlines: Array.from(element.querySelectorAll('section')).slice(0, 85).map((section, index) => ({
        index,
        heading: section.querySelector('h2,h3')?.textContent?.trim() || '',
        characters: section.textContent?.length || 0,
        links: section.querySelectorAll('a').length,
        children: section.children.length,
      })),
    };
  });
  const hydrated = await describe(page);
  const noJsContext = await browser.newContext({
    viewport: { width, height }, deviceScaleFactor: 1, isMobile, hasTouch: isMobile,
    javaScriptEnabled: false,
  });
  let snapshot;
  try {
    const ssrPage = await noJsContext.newPage();
    const response = await ssrPage.goto(origin + countyPath + cacheBust(), { waitUntil: 'domcontentloaded', timeout: 50_000 });
    snapshot = { status: response?.status(), ...await describe(ssrPage) };
  } finally {
    await noJsContext.close();
  }
  const mismatches = [];
  for (let index = 0; index < Math.max(snapshot.sectionOutlines.length, hydrated.sectionOutlines.length); index += 1) {
    const ssr = snapshot.sectionOutlines[index];
    const client = hydrated.sectionOutlines[index];
    if (JSON.stringify(ssr) !== JSON.stringify(client)) mismatches.push({ index, ssr, client });
  }
  const details = {
    viewport, testedAt: new Date().toISOString(), source: origin + countyPath,
    serverWithoutJavaScript: snapshot, hydratedBrowser: hydrated, mismatches: mismatches.slice(0, 35),
    note: 'Exploratory source-vs-hydrated DOM outline; client-only sections may add content normally. Do not treat differences alone as proof of an SSR bug.',
  };
  await writeFile(dir + '/' + viewport + '-county-hydration-diagnostic.json', JSON.stringify(details, null, 2) + '\n');
  console.log('COUNTY HYDRATION DIAGNOSTIC ' + viewport + ' SSR/client differing section outlines: ' + mismatches.length);
  return { sectionDifferences: mismatches.length, ssrSectionCount: snapshot.sectionOutlines.length, hydratedSectionCount: hydrated.sectionOutlines.length };
}

try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [name, width, height, isMobile] of [
    ['desktop-first', 1366, 900, false],
    ['mobile', 390, 844, true],
    ['desktop-repeat', 1366, 900, false],
  ]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile, hasTouch: isMobile });
    const schoolPage = await context.newPage();
    const schoolErrors = [];
    schoolPage.on('pageerror', e => schoolErrors.push(e.message));
    try {
      const school = await inspectPage(schoolPage, name);
      const countyPage = await context.newPage(); // Fresh navigation avoids reusing the tall mobile school page scroll state.
      const countyErrors = [];
      countyPage.on('pageerror', e => countyErrors.push(e.message));
      const county = await inspectCounty(countyPage, name);
      // Keep route facts separate: flattening county after school would overwrite the
      // school H1/canonical in the acceptance artifact despite valid assertions.
      results.push({ viewport: name, school, county, schoolRuntimeErrors: schoolErrors, countyRuntimeErrors: countyErrors });
      if (schoolErrors.length) warnings.push(name + ' SCHOOL: ' + schoolErrors.slice(0, 3).join('; '));
      if (countyErrors.length) {
        warnings.push(name + ' COUNTY: ' + countyErrors.slice(0, 3).join('; '));
        try {
          const diagnostic = await captureCountyHydrationDifference(countyPage, name, width, height, isMobile);
          results.push({ viewport: name, ...diagnostic });
        } catch (error) {
          warnings.push(name + ' county hydration diagnostic unable to compare SSR: ' + String(error));
        }
      }
      check(schoolErrors.length === 0, name + ': Wills Point school hydration/runtime errors ' + schoolErrors.join('; '));
      check(countyErrors.length === 0, name + ': Van Zandt county hydration/runtime errors ' + countyErrors.join('; '));
      console.log('PASS ' + name + ' Wills Point and Van Zandt reciprocal route (including hydration)');
    } catch (error) {
      const message = error instanceof Error ? error.stack || error.message : String(error);
      results.push({ viewportFailed: name, failure: message });
      console.error('FAIL ' + name + ' Wills Point browser acceptance:', message);
      process.exitCode = 1;
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
