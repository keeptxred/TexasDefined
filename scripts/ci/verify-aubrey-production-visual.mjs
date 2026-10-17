import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const url = 'https://texasdefined.com/texas-high-school-football-teams/aubrey';
const output = 'artifacts/aubrey-production-visual';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const results = [];
const setups = [{ name: 'desktop', width: 1366, height: 900 }, { name: 'mobile', width: 390, height: 844 }];
try {
  for (const viewport of setups) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      userAgent: 'TexasDefinedProductionQA/1.0 Chrome Playwright (non-visitor; suppress analytics)',
      reducedMotion: 'reduce',
    });
    // Never send synthetic page-view or advertising conversion requests.
    await context.route(/(google-analytics\.com|googletagmanager\.com|doubleclick\.net|facebook\.com\/tr|plausible\.io|segment\.io|\/api\/(?:analytics|track|events|pageviews|sports-traffic))/i,
      (route) => route.abort('blockedbyclient'));
    const page = await context.newPage();
    const runtime = [];
    page.on('pageerror', (error) => runtime.push(error.message));
    const errors = [];
    let response;
    try {
      response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 20000 });
      await page.waitForTimeout(2200);
      const data = await page.evaluate(() => ({
        title: document.title,
        h1: [...document.querySelectorAll('h1')].map((el) => el.innerText.trim()),
        canonical: document.querySelector('link[rel="canonical"]')?.href || '',
        description: document.querySelector('meta[name="description"]')?.content || '',
        body: document.body?.innerText || '',
        links: [...document.querySelectorAll('a[href]')].map((el) => ({
          text: (el.innerText || el.getAttribute('aria-label') || '').trim(),
          href: el.href,
        })),
        faqCoach: [...document.querySelectorAll('h3')]
          .map((el) => el.innerText.trim()).filter((str) => /head coach|who coaches/i.test(str)),
        gameRows: [...document.querySelectorAll('#football-current-season table tbody tr')]
          .map((el) => el.innerText.replace(/\s+/g, ' ').trim()),
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        brokenImages: [...document.images]
          .filter((el) => el.getBoundingClientRect().width && el.complete && !el.naturalWidth)
          .map((el) => el.currentSrc),
        missingAlt: [...document.images]
          .filter((el) => el.getBoundingClientRect().width && !el.hasAttribute('alt'))
          .map((el) => el.currentSrc),
      }));
      const check = (condition, why) => { if (!condition) errors.push(why); };
      check(response?.status() === 200, 'HTTP was not 200');
      check(data.h1.length === 1 && /Aubrey/.test(data.h1[0]), 'Missing single Aubrey H1');
      check(data.title.includes('Aubrey Chaparrals Football (2026)'), 'Old/stale page title');
      check(data.canonical === url, 'Incorrect canonical URL');
      check(data.description.includes('66–14'), 'SEO description missing 66–14 final');
      check(data.body.includes('4–3 overall') && data.body.includes('4–0 district'),
        'Missing verified 2026 record');
      check(data.body.includes('66–14') && data.body.includes('Carrollton Ranchview'),
        'Missing Oct 16 Aubrey win');
      check(data.body.includes('Lake Dallas'), 'Missing next scheduled opponent');
      check(data.gameRows.length === 10, 'Expected ten dated schedule rows, got ' + data.gameRows.length);
      check(data.gameRows.some((x) => x.includes('2026-10-16') && x.includes('66–14')),
        'October 16 final missing from visible schedule');
      check(data.faqCoach.length === 1, 'Expected one head-coach FAQ, found ' + data.faqCoach.length +
        ' (' + data.faqCoach.join(' | ') + ')');
      check(data.links.some((x) => x.href === 'https://gofan.co/app/school/TX90134'),
        'Official GoFan ticket link missing');
      check(data.links.some((x) => x.href === 'https://www.aubreyisd.net/page/aubrey-isd-stadium-policies'),
        'Official stadium policy link missing');
      check(data.links.some((x) => /maxpreps\.com\/tx\/football\/game\/aubrey-vs-ranchview-irving\/10-16-2026/.test(x.href)),
        'Independent verified final link missing');
      check(!/Avoid inventing a trophy|Project context reviewed|Historical alias metadata may help resolve/.test(data.body),
        'Unpublished editorial notes still visible');
      check(!/Looking for Texas gear\?/.test(data.body),
        'Generic Aubrey shop promotion still visible');
      check(data.overflow <= 4, 'Horizontal overflow: ' + data.overflow + 'px');
      check(data.brokenImages.length === 0, 'Visible broken images: ' + data.brokenImages.join(', '));
      check(data.missingAlt.length === 0, 'Visible images without alt text');
      check(runtime.length === 0, 'Runtime errors: ' + runtime.join(' | '));
      await page.screenshot({ path: output + '/' + viewport.name + '-top.png', animations: 'disabled' });
      const faq = page.getByRole('heading', { name: /Aubrey football questions/i });
      if (await faq.count()) {
        await faq.scrollIntoViewIfNeeded();
        await page.screenshot({ path: output + '/' + viewport.name + '-faq.png', animations: 'disabled' });
      }
      results.push({
        viewport: viewport.name, http: response?.status(), errors, passed: errors.length === 0,
        h1: data.h1, title: data.title, faqCoach: data.faqCoach,
        gameRows: data.gameRows, sourceLinks: data.links.filter((x) => /GoFan|tickets|stadium|recorded final/i.test(x.text)),
        overflow: data.overflow, brokenImages: data.brokenImages, runtimeErrors: runtime,
        cfCacheStatus: response?.headers()['cf-cache-status'] || null,
        cfRay: response?.headers()['cf-ray'] || null,
      });
    } catch (error) {
      errors.push('Browser exception: ' + String(error).slice(0,600));
      results.push({ viewport: viewport.name, http: response?.status() || 0, passed: false, errors });
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(output + '/report.json', JSON.stringify({
    testedAt: new Date().toISOString(), url, results,
  }, null, 2) + '\n');
}
for (const result of results) console.log(JSON.stringify(result));
assert.ok(results.length === 2 && results.every((r) => r.passed),
  'Targeted Aubrey production desktop/mobile checks failed; see screenshot and report artifacts.');
console.log('Verified Aubrey live production on 1366px desktop and 390px mobile.');
