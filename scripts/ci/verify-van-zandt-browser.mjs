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
    // Re-check the fully hydrated route after the first layout and async state pass.
    await page.waitForTimeout(1500);
    assert.ok(await page.locator('h1').filter({ hasText: 'Van Zandt County' }).count(), 'County route lost its main heading after hydration');
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
    assert.deepEqual(failedNetwork.filter(x => x.startsWith(origin) && !failApi), [], 'Failed first-party requests');
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
