import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)('/tmp/texasdefined-van-zandt-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const url = origin + '/county/van-zandt';
const output = 'artifacts/van-zandt-acceptance';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN });
const failures = [];

async function inspect(label, width, height, failApi = false) {
  const context = await browser.newContext({ viewport: { width, height }, isMobile: label === 'mobile' });
  const page = await context.newPage();
  const pageErrors = [];
  const failedNetwork = [];
  const diagnosticConsole = [];
  page.on('pageerror', e => pageErrors.push('pageerror: ' + e.message + '\\n' + e.stack));
  // Remote source websites can legitimately block browser CORS; only uncaught
  // page exceptions and failed first-party resources constitute app failures.
  page.on('console', m => { if (m.type() === 'error') diagnosticConsole.push(m.text()); });
  page.on('requestfailed', req => failedNetwork.push(req.url() + ' : ' + req.failure()?.errorText));
  page.on('response', res => { if (res.status() >= 400 && res.url().startsWith(origin)) failedNetwork.push('HTTP ' + res.status() + ' ' + res.url()); });
  if (failApi) {
    await page.route('**/api/property-tax-rates?**', route => route.abort('failed'));
    await page.route('**/api/high-school-football?**', route => route.abort('failed'));
  }
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    assert.equal(response?.status(), 200, 'County HTTP status');
    // The route and county sections hydrate asynchronously after DOMContentLoaded.
    // Wait for their actual elements before inspecting links or SEO; do not confuse
    // a transient document state with a published-page regression.
    await page.waitForFunction(() => {
      const h1 = document.querySelector('h1');
      return h1?.textContent?.trim() === 'Van Zandt County' &&
        !!document.querySelector('a[href*="openstreetmap.org/search?query="]');
    }, null, { timeout: 55000 });
    // TanStack Start can briefly replace server HTML with an empty Suspense
    // outlet while the client route loader revalidates. Recheck a settled route
    // after that transition rather than treating a transient as a 404.
    await page.waitForTimeout(1500);
    await page.waitForFunction(() => {
      const h1 = document.querySelector('h1');
      return h1?.textContent?.trim() === 'Van Zandt County' &&
        !!document.querySelector('a[href*="openstreetmap.org/search?query="]');
    }, null, { timeout: 40000 });
    const seo = await page.evaluate(() => ({
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      robots: document.querySelector('meta[name="robots"]')?.content || '',
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      h1: document.querySelectorAll('h1').length,
      schema: [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => el.textContent)
    }));
    assert.equal(seo.canonical, url);
    assert.ok(!/noindex/i.test(seo.robots), 'County unexpectedly noindexed');
    assert.equal(seo.h1, 1);
    assert.ok(seo.title.includes('Van Zandt County') && seo.description?.length > 50);
    for (const value of seo.schema) assert.doesNotThrow(() => JSON.parse(value));
    for (const href of [
      'a[href*="grandsalinesaltpalace.com"]',
      'a[href*="atlas.thc.texas.gov/Details/4302000092"]',
      'a[href*="openstreetmap.org/search?query="]',
      'a[href="/destination/wills-point-depot-museum"]',
      'a[href="/texas-high-school-football-teams/wills-point"]'
    ]) assert.ok(await page.locator(href).count(), 'Missing important destination: ' + href);
    const body = page.locator('body');
    await page.getByRole('heading', { name: 'Taxing units in Van Zandt County' }).waitFor({ state: 'attached', timeout: 25000 });
    await page.waitForFunction(fail => {
      const txt = document.body.innerText;
      return fail ? txt.includes('Detailed rate tables are unavailable right now.')
        : /20\d{2} finalized statewide file/.test(txt);
    }, failApi, { timeout: 26000 });
    await page.getByRole('heading', { name: 'High school football in Van Zandt County' }).waitFor({ state: 'attached', timeout: 25000 });
    await page.waitForFunction(fail => {
      const txt = document.body.innerText;
      return fail ? !txt.includes('Loading current UIL football programs…') && /Failed to fetch|football lookup timed out|Football programs could not be loaded/i.test(txt)
        : !txt.includes('Loading current UIL football programs…') && !!document.querySelector('a[href^="/texas-high-school-football-teams/"]');
    }, failApi, { timeout: 26000 });
    assert.ok(!(await body.innerText()).includes('Loading current UIL football programs…'), 'Football spinner persists');
    const dimensions = await page.evaluate(() => ({
      screen: innerWidth,
      scroll: document.documentElement.scrollWidth,
      missingAlt: [...document.images].filter(i => !i.hasAttribute('alt')).map(i => i.src),
      brokenVisible: [...document.images].filter(i => {
        const r = i.getBoundingClientRect();
        return r.width && r.height && r.top < innerHeight && r.bottom > 0 && i.complete && !i.naturalWidth;
      }).map(i => i.src)
    }));
    assert.ok(dimensions.scroll <= dimensions.screen + 3, 'Horizontal overflow: ' + JSON.stringify(dimensions));
    assert.deepEqual(dimensions.missingAlt, [], 'Image alt text missing');
    assert.deepEqual(dimensions.brokenVisible, [], 'Broken visible imagery');
    assert.deepEqual(pageErrors, [], 'Uncaught client JavaScript exceptions');
    // A superseded React fetch can be canceled with ERR_ABORTED during route
    // revalidation. Successful loaded state above proves it was not a broken API.
    assert.deepEqual(failedNetwork.filter(x => x.startsWith(origin) && !failApi && !/net::ERR_ABORTED$/.test(x)), [], 'Failed first-party requests');
    if (process.env.EXPECT_VAN_ZANDT_COMPACT_LAYOUT === 'true' && !failApi) {
      // Only enforce the changed layout after the merged revision has deployed:
      // PR workflows intentionally inspect the previous production release.
      await page.waitForFunction(() => {
        const slot = document.querySelector('[data-stay-nearby-slot]');
        const surface = document.getElementById('expedia-travel-surface');
        return !!slot && !!surface && slot.contains(surface);
      }, null, { timeout: 20000 });
      const spacing = await page.evaluate(() => {
        const nav = document.querySelector('nav[aria-label="Breadcrumb"]');
        const title = document.querySelector('h1');
        const essentials = document.getElementById('van-zandt-guide-heading');
        const slot = document.querySelector('[data-stay-nearby-slot]');
        const affiliate = document.getElementById('expedia-travel-surface');
        const article = document.querySelector('main article');
        const crossCheck = document.querySelector('aside[aria-label="Find the county appraisal and tax offices responsible for the address"]');
        if (!nav || !title || !essentials || !slot || !affiliate || !article || !crossCheck)
          throw new Error('County visual spacing anchors missing');
        return {
          breadcrumbToTitle: Math.round(title.getBoundingClientRect().top - nav.getBoundingClientRect().bottom),
          articleToOfficialSources: Math.round(crossCheck.getBoundingClientRect().top - article.getBoundingClientRect().bottom),
          affiliateInOwnSlot: slot.contains(affiliate),
          affiliateBeforeEssentialsHeading: essentials.parentElement?.contains(affiliate) ?? false,
          affiliateWidth: Math.round(affiliate.getBoundingClientRect().width),
          slotWidth: Math.round(slot.getBoundingClientRect().width),
        };
      });
      assert.ok(spacing.breadcrumbToTitle >= 0 && spacing.breadcrumbToTitle <= 96, 'Oversized breadcrumb/header gap: ' + JSON.stringify(spacing));
      assert.ok(spacing.articleToOfficialSources >= 0 && spacing.articleToOfficialSources <= 96, 'Oversized football-to-official-sources gap: ' + JSON.stringify(spacing));
      assert.ok(spacing.affiliateInOwnSlot && !spacing.affiliateBeforeEssentialsHeading, 'Lodging incorrectly occupies essentials sidebar');
      assert.ok(spacing.affiliateWidth <= spacing.slotWidth + 3, 'Lodging overflows its full-width slot');
      console.log('PASS ' + label + ' county visual spacing: ' + JSON.stringify(spacing));
    }
    await page.screenshot({ path: output + '/' + label + (failApi ? '-fallback' : '-loaded') + '.png', fullPage: true });
    console.log('PASS ' + label + (failApi ? ' failure fallback' : ' normal load') + ': ' + JSON.stringify(dimensions));
  } catch (e) {
    console.error('DOM diagnostic ' + label + ' fallback=' + failApi + ': ' + JSON.stringify(await page.evaluate(() => ({url:location.href,title:document.title,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),headings:[...document.querySelectorAll('h1,h2')].slice(0,14).map(x=>x.textContent),mapLinks:document.querySelectorAll('a[href*="openstreetmap.org"]').length,bodyLength:document.body?.innerText.length, bodyText:document.body?.innerText.slice(0,1200),appNodes:[...document.querySelectorAll('#root, #__next, #app, [data-router-state]')].map(el=>({id:el.id,html:el.outerHTML.slice(0,1000)}))})).catch(()=>({error:'inspection unavailable'}))) + ' exceptions=' + JSON.stringify(pageErrors.slice(0,10)) + ' consoleErrors=' + JSON.stringify(diagnosticConsole.slice(0,10)) + ' failedRequests=' + JSON.stringify(failedNetwork.slice(0,20)));
    await page.screenshot({ path: output + '/' + label + '-FAIL.png', fullPage: true }).catch(() => {});
    failures.push(label + (failApi ? ' fallback' : '') + ': ' + (e?.message || e));
  } finally { await context.close(); }
}
try {
  await inspect('desktop', 1440, 900);
  await inspect('mobile', 390, 844);
  await inspect('mobile', 390, 844, true);
  const context = await browser.newContext();
  for (const path of [
    '/destination/wills-point-depot-museum',
    '/destination/canton',
    '/texas-high-school-football-teams/wills-point',
    '/property-tax/county/van-zandt'
  ]) {
    try {
      const response = await context.request.get(origin + path, { timeout: 20000, maxRedirects: 4 });
      if (response.status() !== 200 || !response.url().startsWith(origin + path))
        failures.push(path + ': expected published content; found HTTP ' + response.status() + ' at ' + response.url());
    } catch (e) { failures.push(path + ': ' + (e?.message || e)); }
  }
  await context.close();
} finally { await browser.close(); }
for (const failure of failures) console.error('FAIL ' + failure);
if (failures.length) process.exitCode = 1;
