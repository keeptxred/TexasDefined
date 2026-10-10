import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-homeowners-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const article = '/texas-data/research/texas-homeowners-premiums-vs-coverage';
const csv = article + '.csv';
const hub = '/texas-data';
const artifacts = 'artifacts/homeowners-research-browser';
const report = { origin, article, csv, hub, checkedAt: new Date().toISOString(), viewports: [], errors: [], csv: null };
await mkdir(artifacts, { recursive: true });

const withNonce = (path) => origin + path + '?verify=homeowners-' + Date.now();
function ensure(ok, message) { assert.ok(ok, message); }
async function inspect(page, width) {
  const errors = [];
  page.on('pageerror', (e) => errors.push({ kind: 'pageerror', message: e.message, stack: e.stack }));
  page.on('console', (msg) => {
    if (msg.type() === 'error' && /hydrat|react error|#418|#423/i.test(msg.text())) {
      errors.push({ kind: 'console', message: msg.text() });
    }
  });
  const response = await page.goto(withNonce(article), { waitUntil: 'domcontentloaded', timeout: 60000 });
  ensure(response?.status() === 200, width + ': article HTTP ' + response?.status());
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 30000 });
  await page.waitForFunction(() => document.documentElement.dataset.tdRootHydrated === '1', null, { timeout: 30000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(900);
  const state = await page.evaluate(() => {
    const paths = [...document.querySelectorAll('a[href]')].map((a) => new URL(a.href).pathname);
    const dataset = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((e) => { try { return JSON.parse(e.textContent || 'null'); } catch { return null; } })
      .find((s) => s && s['@type'] === 'Dataset');
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      robots: document.querySelector('meta[name="robots"]')?.content || '',
      h1: [...document.querySelectorAll('h1')].map((x) => x.textContent?.trim() || ''),
      mainCount: document.querySelectorAll('main').length,
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      dataset,
      tableRows: document.querySelectorAll('main table tbody tr').length,
      chartLines: document.querySelectorAll('main svg[role="img"] polyline').length,
      text: document.body.innerText,
      paths,
    };
  });
  ensure(state.h1.length === 1 && /Did Texas home insurance premiums rise faster than coverage\?/i.test(state.h1[0]), width + ': incorrect article heading ' + JSON.stringify(state.h1));
  ensure(state.mainCount === 1, width + ': incorrect main landmark count');
  ensure(/Home Insurance Premiums Outpace Coverage Growth/i.test(state.title), width + ': incorrect SEO title');
  ensure(state.description.length > 100, width + ': missing description');
  ensure(state.canonical === origin + article, width + ': incorrect canonical ' + state.canonical);
  ensure(!/noindex/i.test(state.robots), width + ': article noindex');
  ensure(state.dataset && state.dataset['@type'] === 'Dataset', width + ': missing Dataset JSON-LD');
  ensure(state.dataset.distribution?.contentUrl === origin + csv, width + ': incorrect Dataset CSV contentUrl');
  ensure(state.tableRows === 10, width + ': expected ten years in table, got ' + state.tableRows);
  ensure(state.chartLines >= 2, width + ': indexed comparison chart missing');
  ensure(/preliminary/i.test(state.text) && /ratio of (these )?two statewide averages/i.test(state.text), width + ': source limitations missing');
  ensure(state.paths.includes(csv) && state.paths.includes(hub), width + ': CSV and/or hub link missing');
  ensure(state.documentWidth <= state.viewportWidth + 12, width + ': horizontal overflow ' + state.documentWidth + '/' + state.viewportWidth);
  await page.screenshot({ path: artifacts + '/' + width + '-article.png', fullPage: true, animations: 'disabled', timeout: 45000 });
  const hubResponse = await page.goto(withNonce(hub), { waitUntil: 'domcontentloaded', timeout: 60000 });
  ensure(hubResponse?.status() === 200, width + ': hub HTTP ' + hubResponse?.status());
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 30000 });
  await page.waitForFunction(() => document.documentElement.dataset.tdRootHydrated === '1', null, { timeout: 30000 });
  const hubHasResearchLink = await page.evaluate((researchPath) => [...document.querySelectorAll('a[href]')].some((a) => new URL(a.href).pathname === researchPath), article);
  ensure(hubHasResearchLink, width + ': Texas Data hub missing inbound research link');
  await page.screenshot({ path: artifacts + '/' + width + '-hub.png', fullPage: true, animations: 'disabled', timeout: 45000 });
  ensure(errors.length === 0, width + ': uncaught JavaScript or hydration errors: ' + JSON.stringify(errors));
  report.viewports.push({ width, articleHTTP: response.status(), hubHTTP: hubResponse.status(), ...state, text: undefined, paths: undefined, inboundHubLink: hubHasResearchLink, errors });
}
async function inspectCsv() {
  const response = await fetch(withNonce(csv), { cache: 'no-store', signal: AbortSignal.timeout(30000) });
  const body = await response.text();
  ensure(response.status === 200, 'CSV HTTP ' + response.status);
  const rows = body.trim().split(/\r?\n/).map((row) => row.split(','));
  ensure(rows.length === 11, 'CSV should have header and 10 annual records');
  ensure(rows[0][0] === 'year' && rows[0].includes('premium_per_100k_coverage_usd'), 'CSV headers incorrect');
  ensure(rows[1][0] === '2016' && rows[1][1] === '1791' && rows[1][2] === '252000', '2016 CSV figures mismatch');
  ensure(rows[10][0] === '2025' && rows[10][1] === '3489' && rows[10][2] === '432800', '2025 CSV figures mismatch');
  const statusColumn = rows[0].indexOf('source_status');
  ensure(rows[10][statusColumn] === 'preliminary', '2025 CSV preliminary status missing');
  report.csv = { url: response.url, httpStatus: response.status, contentType: response.headers.get('content-type'), rows: rows.length - 1, preliminary2025: true };
}

let browser;
try {
  await inspectCsv();
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const width of [390, 1366]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1 });
    try { await inspect(await context.newPage(), width); }
    finally { await context.close(); }
  }
  console.log('Homeowners research production browser acceptance passed on mobile, desktop, hub and CSV.');
} catch (error) {
  report.errors.push(error instanceof Error ? error.stack || error.message : String(error));
  console.error('Homeowners research acceptance FAILED:', error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  await writeFile(artifacts + '/acceptance.json', JSON.stringify(report, null, 2) + '\n');
}
