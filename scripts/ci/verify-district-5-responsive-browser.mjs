import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-wp-qa/node_modules/playwright-core');

const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const path = '/texas-high-school-football-districts/6a-district-5';
const dir = 'artifacts/district5-responsive-browser';
const results = [];
const failures = [];
await mkdir(dir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const cases = [
  { label: 'desktop', viewport: { width: 1440, height: 900 }, isMobile: false },
  { label: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true },
];

for (const spec of cases) {
  for (let attempt = 1; attempt <= 2; attempt++) {
  const context = await browser.newContext({ viewport: spec.viewport, deviceScaleFactor: 1, isMobile: spec.isMobile, hasTouch: spec.isMobile });
  // Do not send test visits to marketing or affiliate conversion analytics.
  await context.route(/(?:google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i, route => route.abort());
  const page = await context.newPage();
  const errors = [];
  const brokenAssets = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('response', response => {
    if (response.status() < 400) return;
    const url = response.url();
    if (url.startsWith(origin) && /\.(?:js|css|png|jpe?g|webp|svg)(?:\?|$)/i.test(url)) brokenAssets.push(response.status() + ' ' + url);
  });
  page.on('dialog', dialog => dialog.dismiss());
  let status = 0;
  try {
    const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 50000 });
    status = response?.status() || 0;
    await page.locator('[data-football-district-section="coverage"]').waitFor({ state: 'visible', timeout: 20000 });
    await page.locator('[data-football-district-section="official-game-day"]').waitFor({ state: 'visible', timeout: 20000 });
    await page.evaluate(() => document.fonts?.ready);
    const facts = await page.evaluate(() => {
      const visible = element => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
      };
      const games = [...document.querySelectorAll('[data-football-district-game]')];
      const teamPaths = [...new Set([...document.querySelectorAll('a[href^="/texas-high-school-football-teams/"]')].map(a => new URL(a.href).pathname))];
      const anchors = [...document.querySelectorAll('a[href]')];
      const affiliate = anchors.filter(a => a.href.includes('anrdoezrs.net'));
      return {
        title: document.title,
        h1: [...document.querySelectorAll('h1')].map(x => x.innerText.trim()),
        canonical: document.querySelector('link[rel="canonical"]')?.href ?? '',
        description: document.querySelector('meta[name="description"]')?.content ?? '',
        robots: document.querySelector('meta[name="robots"]')?.content ?? '',
        text: document.body.innerText,
        viewportWidth: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        records: document.querySelectorAll('[data-football-district-records="source-derived"] tbody tr').length,
        games: games.length,
        finals: games.filter(el => el.dataset.status === 'reported-final').length,
        scheduled: games.filter(el => el.dataset.status === 'schedule-only').length,
        districtSections: [...document.querySelectorAll('[data-football-district-section]')].map(el => el.dataset.footballDistrictSection),
        teamPaths,
        affiliate: affiliate.map(a => ({ href: a.href, rel: a.rel, text: a.innerText })),
        officialHosts: [...new Set(anchors.filter(a => /https:\/\/(?:athletics\.dentonisd\.org|www\.lisd\.net|www\.friscoisd\.org|tickets\.friscoisd\.org|www\.littleelmisd\.net)/i.test(a.href)).map(a => new URL(a.href).hostname))],
        imgProblems: [...document.images].filter(visible).filter(el => el.complete && el.naturalWidth === 0).map(el => el.currentSrc),
        missingImageAlt: [...document.images].filter(visible).filter(el => !el.hasAttribute('alt')).map(el => el.currentSrc),
      };
    });

    function check(condition, message) { if (!condition) errors.push(message); }
    check(status === 200, 'Non-200 HTML response: ' + status);
    check(facts.h1.length === 1 && /District 5-6A Football/i.test(facts.h1[0]), 'Missing or duplicated district H1');
    check(facts.canonical === origin + path, 'Incorrect canonical: ' + facts.canonical);
    check(/District 5-6A Football/i.test(facts.title), 'District-specific SEO title missing');
    check(facts.description.length >= 85, 'District-specific SEO description too short');
    check(!/noindex/i.test(facts.robots), 'District page unexpectedly noindexed');
    check(facts.documentWidth <= facts.viewportWidth + 8, 'Horizontal overflow ' + facts.documentWidth + ' vs ' + facts.viewportWidth);
    check(facts.records === 8, 'Expected eight source-derived team record rows, got ' + facts.records);
    check(facts.games === 28 && facts.finals >= 16 && facts.finals + facts.scheduled === 28, 'District fixtures must have 28 pairings and >=16 sourced finals: ' + facts.games + '/' + facts.finals + '/' + facts.scheduled);
    check(facts.teamPaths.length === 8, 'Expected exactly eight distinct internal UIL school profiles; got ' + facts.teamPaths.length);
    for (const marker of ['official-game-day', 'district-5-context', 'coverage', 'teams', 'official-sources']) check(facts.districtSections.includes(marker), 'Missing section ' + marker);
    for (const label of ['Denton Braswell', 'Denton Guyer', 'Frisco Wakeland', 'Lewisville', 'Flower Mound', 'Hebron', 'Marcus', 'Little Elm', 'Pigskin Prep', 'MaxPreps', 'not UIL-certified standings', 'Affiliate disclosure']) check(facts.text.includes(label), 'Missing on-screen copy: ' + label);
    check(!facts.text.includes('we do not assign district ranks, win–loss records'), 'Contradictory W–L disclaimer persists');
    check(facts.officialHosts.includes('athletics.dentonisd.org') && facts.officialHosts.includes('www.lisd.net') && facts.officialHosts.includes('www.friscoisd.org') && facts.officialHosts.includes('www.littleelmisd.net'), 'Official ticket links not shown for all four ISDs');
    check(facts.affiliate.length === 2, 'Expected two verified travel CJ links, got ' + facts.affiliate.length);
    for (const item of facts.affiliate) {
      check(item.rel.includes('sponsored') && item.rel.includes('nofollow'), 'Missing affiliate rel flags ' + item.href);
      check(item.href.startsWith('https://www.anrdoezrs.net/links/101876465/type/dlg/'), 'Ungoverned CJ URL ' + item.href);
    }
    check(facts.imgProblems.length === 0 && facts.missingImageAlt.length === 0, 'Broken image or missing alt: ' + JSON.stringify({broken:facts.imgProblems,unnamed:facts.missingImageAlt}));
    check(brokenAssets.length === 0, 'First-party asset failed: ' + brokenAssets.join('; '));
    // Full-page capture, including content below the fold. No outgoing affiliate link is clicked.
    await page.evaluate(() => scrollTo(0, 0));
    const screenshot = dir + '/district5-' + spec.label + '.png';
    await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled', timeout: 40000 });
    results.push({ viewport: spec.label, status: errors.length ? 'FAIL' : 'PASS', screenshot, http: status, h1: facts.h1, canonical: facts.canonical, pageWidth: facts.documentWidth, viewportWidth: facts.viewportWidth, records: facts.records, finals: facts.finals, scheduled: facts.scheduled, teams: facts.teamPaths.length, officialHosts: facts.officialHosts, affiliateLinks: facts.affiliate.length, errors });
    failures.push(...errors.map(error => spec.label + ': ' + error));
    console.log('DISTRICT_5_RESPONSIVE ' + JSON.stringify(results.at(-1)));
    // One bounded retry for a browser-only transient dynamic-import network failure.
    // A real 4xx asset response, incorrect page data, or repeated JS failure still fails.
    const transientImportOnly = attempt === 1 && errors.length === 1
      && /^TypeError: Failed to fetch dynamically imported module: https:\/\/texasdefined\.com\/assets\/[^\s]+\.js$/.test(errors[0])
      && brokenAssets.length === 0;
    if (transientImportOnly) {
      console.warn('Retrying one transient dynamic import failure with a fresh browser context: ' + spec.label);
      results.pop();
      failures.pop();
      continue;
    }

  } catch (error) {
    const problem = String(error);
    failures.push(spec.label + ': ' + problem);
    results.push({ viewport: spec.label, status: 'ERROR', http: status, errors: [problem] });
    try { await page.screenshot({ path: dir + '/district5-' + spec.label + '-failure.png', fullPage: true, timeout: 15000 }); } catch {}
    console.error('DISTRICT_5_RESPONSIVE_ERROR ' + spec.label + ' ' + problem);
  } finally {
    await context.close();
  }
  }
}
await browser.close();
const summary = { page: origin + path, commit: process.env.GITHUB_SHA || 'unspecified', checkedAt: new Date().toISOString(), results, failures };
await writeFile(dir + '/report.json', JSON.stringify(summary, null, 2));
assert.deepEqual(failures, [], 'District 5 production desktop/mobile must pass');
