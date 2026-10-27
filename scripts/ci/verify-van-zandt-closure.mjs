/**
 * Focused follow-up to Van Zandt production Chrome acceptance.
 * Verifies two real 16s timeouts, all live county football profile links,
 * source-browser isolation, semantic JSON-LD,
 * and scoped WCAG accessibility without auditing other pages.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-van-zandt-qa/node_modules/playwright-core');
const axePath = '/tmp/texasdefined-van-zandt-qa/node_modules/axe-core/axe.min.js';
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const countyPath = '/county/van-zandt';
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN });
const problems = [];

async function settled(page) {
  await page.waitForFunction(() => document.querySelector('h1')?.textContent?.trim() === 'Van Zandt County' &&
    !!document.querySelector('a[href*="grandsalinesaltpalace.com"]'),
    null, { timeout: 60000 });
}

async function normalContentAndLinks() {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const externalBrowserFetches = [];
  page.on('request', req => {
    if (/^https:\/\/(www\.tsl\.texas\.gov|tigerweb\.geo\.census\.gov)\//.test(req.url()))
      externalBrowserFetches.push({ url: req.url(), type: req.resourceType() });
  });
  try {
    assert.equal((await page.goto(origin + countyPath, { waitUntil: 'domcontentloaded' }))?.status(), 200);
    await settled(page);
    await page.waitForTimeout(1100);
    await settled(page);

    if (process.env.EXPECT_SERVER_ONLY_COUNTY_SOURCES === 'true') {
      assert.equal(await page.getByRole('heading', { name: 'Places on the map' }).count(), 0,
        'The retired county map section must remain absent after deployment');
      assert.equal(await page.locator('[data-van-zandt-community-map], a[href*="openstreetmap.org/search?query="]').count(), 0,
        'The retired county map and link grid must not return');
      console.log('PASS layout: retired map section absent on Van Zandt County');
    }

    const rawLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    assert.ok(rawLd.length > 0, 'Missing county JSON-LD');
    const graphs = rawLd.map(raw => JSON.parse(raw)).filter(x => /schema\.org/.test(x['@context'] || '') && Array.isArray(x['@graph']));
    const nodes = graphs.flatMap(g => g['@graph']);
    const entity = nodes.find(n => n.name === 'Van Zandt County' && n.url === origin + countyPath);
    assert.ok(entity?.['@id'] === origin + countyPath + '#entity' && entity['@type'], 'County JSON-LD entity missing identity, type or stable ID');
    const breadcrumb = nodes.find(n => n['@type'] === 'BreadcrumbList');
    assert.ok(breadcrumb && Array.isArray(breadcrumb.itemListElement), 'County breadcrumb JSON-LD missing');
    const crumbs = breadcrumb.itemListElement;
    assert.ok(crumbs.length >= 3 && crumbs.at(-1)?.item === origin + countyPath, 'Structured breadcrumb does not terminate at county canonical');
    assert.ok(crumbs.every((item, index) => item['@type'] === 'ListItem' && item.position === index + 1 &&
      typeof item.item === 'string' && item.item.startsWith('https://')), 'Breadcrumb elements invalid');
    console.log('PASS structured data: schema.org county identity and ordered canonical breadcrumbs');

    const raw = await context.request.get(origin + '/api/high-school-football?county=Van%20Zandt%20County&limit=100');
    assert.equal(raw.status(), 200, 'Football source API');
    const payload = await raw.json();
    assert.equal(payload.ok, true, 'County football source unavailable');
    assert.ok(Array.isArray(payload.programs) && payload.programs.length >= 7,
      'Previously verified Van Zandt programs unexpectedly missing');
    const paths = new Set(payload.programs.map(p => p.profilePath));
    assert.equal(paths.size, payload.programs.length, 'Duplicate county football paths');
    for (const program of payload.programs) {
      assert.match(program.profilePath, /^\/texas-high-school-football-teams\/[a-z0-9-]+$/, 'Profile path must be canonical');
      const response = await context.request.get(origin + program.profilePath, { timeout: 20000, maxRedirects: 3 });
      assert.equal(response.status(), 200, program.schoolName + ' must have a published page');
      assert.equal(new URL(response.url()).pathname, program.profilePath, program.schoolName + ': unexpected destination redirect');
      const html = await response.text();
      assert.ok(/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html), program.schoolName + ': no server-rendered page H1');
      assert.ok(html.includes('rel="canonical"') && html.includes(origin + program.profilePath),
        program.schoolName + ': missing profile-specific canonical');
      console.log('PASS football destination: ' + program.schoolName + ' ' + program.profilePath);
    }
    console.log('PASS football: every ' + payload.programs.length + ' live Van Zandt API profile reaches published HTML');

    await page.addScriptTag({ path: axePath });
    const accessibility = await page.evaluate(async () => {
      const root = document.querySelector('main') || document.body;
      const result = await window.axe.run(root, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }
      });
      return { testedNodes: result.passes.length, violations: result.violations.map(v => ({
        id: v.id, impact: v.impact, description: v.help,
        nodes: v.nodes.slice(0, 3).map(n => ({ target: n.target, summary: n.failureSummary?.slice(0, 280) }))
      })) };
    });
    console.log('ACCESSIBILITY ' + JSON.stringify(accessibility));
    const serious = accessibility.violations.filter(v => ['serious', 'critical'].includes(v.impact));
    assert.deepEqual(serious, [], 'Serious/critical county accessibility violations must be investigated');
    // Additional violations are reported rather than silently called a perfect accessibility audit.
    console.log('PASS scoped accessibility: no serious/critical axe-core findings');
    if (process.env.EXPECT_SERVER_ONLY_COUNTY_SOURCES === 'true') {
      assert.deepEqual(externalBrowserFetches, [],
        'County revalidation attempted direct browser requests to TSLAC/TIGERweb (blocked by CORS)');
      console.log('PASS source requests: no visitor-browser TSLAC or Census TIGERweb fetches');
    } else console.log('PREDEPLOY source baseline: ' + JSON.stringify(externalBrowserFetches));
  } finally { await context.close(); }
}

async function verifyRealTimeouts() {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const page = await context.newPage();
  const times = { tax: null, football: null };
  async function hang(route, key) {
    times[key] = Date.now();
    // Keep the HTTP request pending longer than the application's 16s AbortController.
    // The 24s server-simulation safeguard avoids an unbounded test hang.
    setTimeout(() => route.abort('failed').catch(() => {}), 24000);
  }
  await page.route('**/api/property-tax-rates?**', route => hang(route, 'tax'));
  await page.route('**/api/high-school-football?**', route => hang(route, 'football'));
  try {
    assert.equal((await page.goto(origin + countyPath, { waitUntil: 'domcontentloaded' }))?.status(), 200);
    await settled(page);
    await page.waitForFunction(() => {
      const text = document.body.innerText;
      return text.includes('Detailed rate tables are unavailable right now.') &&
        text.includes('The county football lookup timed out.');
    }, null, { timeout: 23500 });
    for (const key of ['tax', 'football']) {
      assert.ok(times[key], key + ' hanging request was never intercepted');
      const elapsed = Date.now() - times[key];
      assert.ok(elapsed >= 14800 && elapsed <= 23500,
        key + ' fallback must occur after its 16s abort, before delayed response: ' + elapsed + 'ms');
      console.log('PASS simulated hung ' + key + ' request: meaningful fallback after ' + elapsed + 'ms');
    }
    const body = await page.locator('body').innerText();
    assert.ok(!body.includes('Loading current UIL football programs…'), 'Football spinner did not stop');
    assert.ok(!body.includes('Checking finalized local tax rates…'), 'Tax spinner did not stop');
  } finally { await context.close(); }
}


try {
  for (const [name, task] of [
    ['normal links, SEO and accessibility', normalContentAndLinks],
    ['16-second timeout behavior', verifyRealTimeouts]
  ]) {
    try { await task(); } catch (e) { problems.push(name + ': ' + String(e?.message || e)); }
  }
} finally { await browser.close(); }
for (const problem of problems) console.error('FAIL Van Zandt closure: ' + problem);
if (problems.length) process.exitCode = 1;
