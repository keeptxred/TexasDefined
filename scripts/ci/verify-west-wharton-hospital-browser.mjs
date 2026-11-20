#!/usr/bin/env node
/**
 * Targeted real-Chrome postdeploy authority acceptance for West Wharton tax.
 * The static SSR check tests source parity; this catches mobile overflow,
 * inaccessible anchors, missing hydrated research and JavaScript exceptions.
 * No fabricated Lighthouse scores or Google ranking claims.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-wharton-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const path = '/property-tax/taxing-unit/west-wharton-county-hospital-district';
const outDir = 'artifacts/west-wharton-hospital-browser';
const viewports = [
  { label: 'mobile-320', width: 320, height: 720, isMobile: true },
  { label: 'mobile-390', width: 390, height: 844, isMobile: true },
  { label: 'desktop-1440', width: 1440, height: 900, isMobile: false },
];
await mkdir(outDir, { recursive: true });
const report = { checkedAt: new Date().toISOString(), commit: process.env.GITHUB_SHA || null, path, viewports: [], failures: [] };
const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile, hasTouch: viewport.isMobile, deviceScaleFactor: 1,
    });
    // Disable third-party tracking, never first-party route/data/hydration.
    await context.route(/googletagmanager|google-analytics|doubleclick\.net|facebook\.com\/tr/i, route => route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message.slice(0, 240)));
    const rec = { viewport: viewport.label, checks: [], failures: [], screenshot: null, workerVersion: null };
    const check = (name, ok, evidence = '') => {
      rec.checks.push({ name, pass: !!ok, evidence: String(evidence).slice(0, 180) });
      if (!ok) rec.failures.push({ name, evidence: String(evidence).slice(0, 240) });
    };
    try {
      // The exact canonical URL is crucial: do not mask stale HTML with a nonce.
      const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 55000 });
      rec.workerVersion = response?.headers()['x-texasdefined-worker-version'] || null;
      check('clean canonical HTTP 200', response?.status() === 200, response?.status());
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 25000 });
      // Wait for lazy/hydrated original authority content, not just the generic
      // tax-rate SSR shell or a briefly visible Suspense fallback.
      await page.locator('#wwchd-2023-sources').waitFor({ state: 'attached', timeout: 30000 });
      await page.locator('#wwchd-parcel').waitFor({ state: 'attached', timeout: 30000 });
      await page.evaluate(() => document.fonts?.ready);
      const data = await page.evaluate(() => ({
        width: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        mainCount: document.querySelectorAll('main').length,
        h1: [...document.querySelectorAll('h1')].map(el => el.textContent?.trim() || ''),
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || '',
        canonical: document.querySelector('link[rel="canonical"]')?.href || '',
        robots: document.querySelector('meta[name="robots"]')?.content || '',
        body: document.body.innerText,
        sourceLinks: [...document.querySelectorAll('a[href]')].map(el => el.getAttribute('href') || ''),
        tableCount: document.querySelectorAll('table').length,
        anchors: ['wwchd-current-rate','wwchd-2026','wwchd-2023-sources','wwchd-rate-decision','wwchd-parcel','taxing-unit-rate-history'].map(id => [id, !!document.getElementById(id)]),
      }));
      check('no document-level horizontal overflow', data.scrollWidth <= data.width + 2, data.scrollWidth + ' vs ' + data.width);
      check('exactly one main landmark', data.mainCount === 1, data.mainCount);
      check('exactly one topic H1', data.h1.length === 1 && /West Wharton County Hospital District property tax rate/i.test(data.h1[0]), data.h1.join(' | '));
      check('helpful unique SEO title and description', data.title.includes('West Wharton County Hospital District') && data.description.length > 100, data.description.length);
      check('correct self canonical', data.canonical === origin + path, data.canonical);
      check('indexable after hydration', !/\bnoindex\b/i.test(data.robots), data.robots);
      check('2026 county source answer visible', data.body.includes('2026 tax rate') && data.body.includes('0.23210') && data.sourceLinks.some(url => url.includes('2026%20Tax%20Rates.pdf')));
      check('2026 comparison benchmarks visible', data.body.includes('0.23633') && data.body.includes('0.25913'));
      check('2023 conflicting official evidence disclosed', data.body.includes('0.20550') && data.body.includes('0.21897') && data.body.includes('2023'));
      check('independent 2023 adopted rate corroboration', data.sourceLinks.some(url => url.includes('2024%20WWHD.pdf')) && data.sourceLinks.some(url => url.includes('2023%20WWHD.pdf')) && data.body.includes('A second county document corroborates the 2023 figure'));
      check('source verification date corresponds to latest editorial review', data.body.includes('November 20, 2026'));
      check('original historical research, calculator and official parcel guidance', data.body.includes('2025') && data.body.includes('2024') && data.body.includes('Wharton CAD') && data.tableCount >= 1, data.tableCount);
      check('all six authority anchors present', data.anchors.every(([,present]) => present), JSON.stringify(data.anchors));
      check('reciprocal contextual Wharton County link', data.sourceLinks.some(url => url.startsWith('/property-tax/county/wharton')));
      check('no uncaught page exceptions', errors.length === 0, errors.join('; '));
      const jump = page.locator('nav[aria-label="Hospital district tax page sections"] a[href="#wwchd-parcel"]');
      if (await jump.count()) {
        await jump.click();
        check('keyboard-accessible semantic parcel navigation', await page.evaluate(() => location.hash === '#wwchd-parcel'));
      } else {
        check('semantic parcel navigation exists', false);
      }
      await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
      const screenshot = outDir + '/' + viewport.label + '.png';
      await page.screenshot({ path: screenshot, fullPage: false, animations: 'disabled', timeout: 30000 });
      rec.screenshot = screenshot;
    } catch (error) {
      rec.failures.push({ name: 'browser inspection exception', evidence: String(error?.message || error).slice(0, 600) });
    }
    report.viewports.push(rec);
    report.failures.push(...rec.failures.map(failure => ({ viewport: viewport.label, ...failure })));
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(outDir + '/result.json', JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify({ checkedAt: report.checkedAt, viewports: report.viewports.map(({ viewport, workerVersion, failures }) => ({ viewport, workerVersion, failures })), failures: report.failures }, null, 2));
assert.equal(report.failures.length, 0, 'West Wharton responsive Chrome acceptance failed — see ' + outDir + '/result.json');
