import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-river-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const articleUrl = origin + '/article/texas-rivers-explained';
const artifactDir = 'artifacts/texas-river-map-browser';
const evidence = [];
await mkdir(artifactDir, { recursive: true });

function verify(condition, description) { assert.ok(condition, description); }
function normalize(value) { return String(value).toLowerCase().replace(/[^a-z]/g, ''); }

async function inspect(page, label, width, height, mobile) {
  const network = [];
  const errors = [];
  page.on('requestfailed', request => {
    if (/twdb|texasdefined/.test(request.url())) network.push({ event: 'failed', url: request.url(), message: request.failure()?.errorText || 'unknown' });
  });
  page.on('response', response => {
    if (/gis1\.twdb\.texas\.gov|texasdefined\.com/.test(response.url()) && /MapServer|river-basins|rivers-explained/.test(response.url()))
      network.push({ event: 'response', status: response.status(), url: response.url() });
  });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && /twdb|basin|CORS/i.test(message.text())) errors.push(message.text()); });
  page.on('request', request => { if (/gis1\\.twdb\\.texas\\.gov/.test(request.url())) network.push({ event: 'request', url: request.url() }); });
  const row = { viewport: label, width, height, mobile, network, errors, checks: [] };
  evidence.push(row);
  try {
    const response = await page.goto(articleUrl + '?browser_verify=river-atlas-' + Date.now(), {
      waitUntil: 'domcontentloaded', timeout: 55_000,
    });
    verify(response?.status() === 200, label + ': page returned HTTP ' + response?.status());
    const section = page.locator('section[aria-labelledby="interactive-texas-basin-heading"]');
    await section.scrollIntoViewIfNeeded({ timeout: 25_000 });
    const load = section.getByRole('button', { name: 'Load interactive basin map' });
    await load.waitFor({ state: 'visible', timeout: 25_000 });
    row.checks.push('Article rendered with opt-in map control');
    await page.waitForLoadState('load', { timeout: 20_000 }).catch(() => {});
    // A server-rendered button can accept a click before the React handlers have
    // hydrated. Reclick only while the opt-in button remains; otherwise a no-op
    // click would incorrectly look like a failed TWDB GIS request.
    let activated = false;
    for (let attempt = 0; attempt < 4; attempt++) {
      await load.click();
      activated = await load.waitFor({ state: 'detached', timeout: 5_000 }).then(() => true, () => false);
      if (activated) break;
      await page.waitForTimeout(1_200);
    }
    row.mapButtonActivated = activated;
    if (!activated) throw new Error(label + ': button never activated after browser load/hydration attempts');
    row.checks.push('React interaction activated after hydration');
    await section.locator('svg[role="img"] path').first().waitFor({ state: 'attached', timeout: 35_000 }).catch(async cause => {
      row.mapAlert = await section.locator('[role="alert"]').allTextContents();
      throw new Error(label + ': no official GIS polygons rendered: ' + JSON.stringify(row.mapAlert) +
        ' / ' + (cause instanceof Error ? cause.message : String(cause)));
    });
    const shapes = await section.locator('svg[role="img"] path').count();
    verify(shapes >= 23, label + ': expected at least 23 TWDB land/bay geometries, got ' + shapes);
    row.shapes = shapes;
    row.checks.push('TWDB polygons rendered: ' + shapes);
    const selector = section.locator('#texas-basin-selector');
    const choices = await selector.locator('option').allTextContents();
    row.options = choices;
    verify(choices.length >= 24, label + ': expected 23 basin names plus All, found ' + choices.length);
    for (const name of ['Brazos', 'Rio Grande', 'San Antonio', 'Canadian', 'Trinity', 'Nueces']) {
      verify(choices.some(value => normalize(value).includes(normalize(name))), label + ': missing official basin name ' + name);
    }
    row.checks.push('Basin selector includes major and coastal systems');
    const brazos = await selector.locator('option').evaluateAll(options =>
      options.find(option => /brazos/i.test(option.textContent || '') && !/san jacinto/i.test(option.textContent || '') && !/colorado/i.test(option.textContent || ''))?.value || '');
    verify(Boolean(brazos), label + ': no Brazos option');
    await selector.selectOption(brazos);
    verify((await section.locator('[role="status"]').allTextContents()).some(x => /Brazos/i.test(x)), label + ': selected label absent');
    const map = section.locator('svg[role="img"]');
    const original = await map.getAttribute('viewBox');
    const zoomButton = section.getByRole('button', { name: 'Zoom to selection' });
    await zoomButton.click();
    const zoomed = await map.getAttribute('viewBox');
    verify(Boolean(original && zoomed && original !== zoomed), label + ': zoom did not change SVG viewBox');
    row.checks.push('Select a basin and zoom updates the map');
    await section.getByRole('button', { name: 'Full Texas view' }).click();
    verify(await map.getAttribute('viewBox') === original, label + ': zoom reset did not restore full view');
    const coastal = section.getByLabel('Show eight coastal basins');
    await coastal.uncheck();
    const landChoices = await selector.locator('option').count();
    verify(landChoices >= 16 && landChoices < choices.length, label + ': coastal filter did not update choices: ' + landChoices);
    row.checks.push('Coastal filter updates basin menu');
    await coastal.check();
    const bayControl = section.getByLabel('Include bay polygons');
    if (await bayControl.isEnabled()) {
      await bayControl.check();
      const bays = await section.locator('svg[role="img"] path').count();
      verify(bays >= shapes, label + ': bay layer unexpectedly removed basin polygons');
      row.checks.push('Bay layer displays without losing land polygons');
    } else {
      verify(await section.getByText(/no separate bay polygons/i).isVisible(),
        label + ': disabled bay control needs an explanation');
      row.checks.push('Unavailable separate bay layer is explicitly disabled, not a misleading toggle');
    }
    const selectedGuide = section.locator('a[href="/article/texas-brazos-river-guide"]');
    if (await selectedGuide.count()) row.checks.push('Selected major basin links to its dedicated guide');
    await section.getByRole('button', { name: 'Reset' }).click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    row.horizontalOverflow = overflow;
    verify(overflow <= 10, label + ': horizontal overflow is ' + overflow + 'px');
    row.checks.push('No horizontal overflow');
    await section.screenshot({ path: artifactDir + '/' + label + '-interactive-map.png', animations: 'disabled', timeout: 30_000 });
    return row;
  } catch (error) {
    row.failure = error instanceof Error ? error.message : String(error);
    try {
      await page.screenshot({ path: artifactDir + '/' + label + '-failed.png', fullPage: false, timeout: 20_000 });
    } catch (captureError) {
      row.screenshotError = String(captureError);
    }
    throw error;
  }
}

let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [label, width, height, mobile] of [['mobile', 390, 844, true], ['desktop', 1366, 900, false]]) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
    const page = await context.newPage();
    try { await inspect(page, label, width, height, mobile); }
    finally { await context.close(); }
  }
} finally {
  await writeFile(artifactDir + '/acceptance.json', JSON.stringify({
    testedAt: new Date().toISOString(), url: articleUrl, gitSha: process.env.GITHUB_SHA || 'local', evidence,
  }, null, 2));
  await browser?.close();
}
console.log('Texas river basin interactive map real-browser acceptance passed on mobile and desktop.');
