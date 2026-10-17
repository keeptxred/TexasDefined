import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const slug = 'alief-taylor';
const path = `/texas-high-school-football-teams/${slug}`;
const matchup = '/texas-high-school-football-matchups/2026-10-16-houston-memorial-at-alief-taylor';
const output = 'artifacts/alief-taylor-production';
const checks = [];
const images = [];
const failures = [];
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

async function testViewport(name, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const errors = [];
  try {
    const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 55000 });
    assert.equal(response?.status(), 200, 'Football profile should respond HTTP 200');
    await page.getByRole('heading', { name: /Alief Taylor Lions Football/i, level: 1 }).waitFor({ timeout: 25000 });
    // React's route data can hydrate later than the first H1. Wait for the sourced
    // final to be present rather than declaring success from SSR scaffolding.
    await page.getByText('L 18–42', { exact: false }).first().waitFor({ timeout: 25000 });
    const details = await page.evaluate(() => {
      const text = document.body?.innerText || '';
      const canonical = document.querySelector('link[rel="canonical"]')?.href || '';
      const description = document.querySelector('meta[name="description"]')?.content || '';
      const robots = document.querySelector('meta[name="robots"]')?.content || '';
      const headings = [...document.querySelectorAll('h1')].map(x => x.innerText.trim());
      const links = [...document.querySelectorAll('a[href]')].map(x => x.getAttribute('href'));
      const brokenImages = [...document.images].filter(i => i.complete && !i.naturalWidth && i.getBoundingClientRect().width > 0).map(i => i.currentSrc);
      return { text, canonical, description, robots, headings, links, brokenImages, documentWidth: document.documentElement.scrollWidth, viewportWidth: innerWidth };
    });
    function expect(ok, reason) { if (!ok) errors.push(reason); }
    expect(details.headings.length === 1 && /Alief Taylor Lions Football/.test(details.headings[0]), 'One correct H1 is required');
    expect(details.canonical === origin + path, 'Exact canonical mismatch');
    expect(details.description.includes('Alief Taylor Lions football'), 'Team-specific SEO description absent');
    expect(!/noindex/i.test(details.robots), 'Page must remain indexable');
    expect(/6[–-]2 overall/.test(details.text), 'Overall record is not 6–2');
    expect(/4[–-]2 district/.test(details.text), 'District record is not 4–2');
    expect(/W 29[–-]28/.test(details.text), 'Stratford final is missing');
    expect(/L 18[–-]42/.test(details.text), 'Memorial final is missing');
    expect(/most recent reported result/i.test(details.text), 'Recent result summary is absent');
    expect(/next listed 2026 fixture/i.test(details.text), 'Next fixture card is absent');
    expect(details.text.includes('Westside'), 'Westside next fixture absent');
    expect(details.text.includes('Red, Navy and White'), 'Verified school colors absent');
    expect(details.links.some(h => (h || '').includes(matchup)), 'Source-linked Memorial matchup URL missing');
    expect(details.links.some(h => (h || '').includes('/county/harris')), 'Harris County cross-link missing');
    expect(!details.text.includes('Upcoming Stratford, Memorial'), 'Stale pregame editorial remains');
    expect(details.documentWidth <= details.viewportWidth + 5, `Horizontal overflow: doc=${details.documentWidth} viewport=${details.viewportWidth}`);
    expect(!details.brokenImages.length, `Broken visible images: ${details.brokenImages.join(', ')}`);
    const screenshot = `${output}/alief-taylor-${name}.png`;
    await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled', timeout: 30000 });
    images.push(screenshot);
    checks.push({ name, status: errors.length ? 'FAIL' : 'PASS', errors, http: response?.status(), canonical: details.canonical, record: '6–2 / 4–2', screenshot, viewport, width: details.documentWidth });
    console.log('Alief Taylor production ' + name + ': ' + JSON.stringify(checks.at(-1)));
    failures.push(...errors.map(x => `${name}: ${x}`));
  } catch (error) {
    const errorMessage = String(error);
    failures.push(`${name}: ${errorMessage}`);
    checks.push({ name, status: 'ERROR', error: errorMessage });
    try {
      const screenshot = `${output}/alief-taylor-${name}-failure.png`;
      await page.screenshot({ path: screenshot, fullPage: true, timeout: 10000 });
      images.push(screenshot);
    } catch {}
    console.error(`Alief Taylor production ${name}: ${errorMessage}`);
  } finally {
    await page.close();
  }
}
try {
  await testViewport('desktop', { width: 1440, height: 900 });
  await testViewport('mobile', { width: 390, height: 844 });
} finally {
  await browser.close();
}
const report = { url: origin + path, checkedAt: new Date().toISOString(), checks, screenshots: images, failures };
await writeFile(`${output}/result.json`, JSON.stringify(report, null, 2));
console.log('Alief Taylor verified production report ' + JSON.stringify(report));
assert.deepEqual(failures, [], 'Alief Taylor page-specific production acceptance must pass');
