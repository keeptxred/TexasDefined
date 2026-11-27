// Bounded post-release Chrome acceptance for the three Alvin/Brazoria guides.
// Lab timings are observations, not field Core Web Vitals or Google indexing proof.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)('/tmp/td-alvin-browser/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const output = 'artifacts/alvin-brazoria-browser';
const targets = [
  { path: '/city/alvin', schema: 'City', markers: ['30,115', 'July 1, 2025', 'Maury Maverick Bridge'], links: ['/county/brazoria','/destination/alvin-historical-museum'] },
  { path: '/county/brazoria', schema: 'AdministrativeArea', markers: ['419,080','Official appraisal district contact details','Official tax office contact details','Marcel Pierel III','Kristin R. Bulanek'], links: ['/city/alvin','/destination/alvin-historical-museum'] },
  { path: '/destination/alvin-historical-museum', schema: 'Museum', markers: ['$5','12 and under','Emigrants at Nightfall'], links: ['/city/alvin','/county/brazoria','https://bcsummerpassport.org/sites/'] }
];
const imageIds = ['25635261034','26147334682','5822129305'];
const reports = [];
let workerVersion;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN });
try {
  for (const target of targets) {
    for (const mode of [
      { label: 'ssr', viewport: {width: 1280,height: 900}, javaScriptEnabled: false },
      { label: 'desktop', viewport: {width: 1440,height: 900}, javaScriptEnabled: true },
      { label: 'mobile', viewport: {width: 390,height: 844}, javaScriptEnabled: true, isMobile: true, hasTouch: true }
    ]) {
      const report = { path: target.path, mode: mode.label, errors: [] };
      reports.push(report);
      const context = await browser.newContext({ viewport: mode.viewport, javaScriptEnabled: mode.javaScriptEnabled, isMobile: !!mode.isMobile, hasTouch: !!mode.hasTouch });
      const page = await context.newPage();
      const errors = [];
      const network = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.url().startsWith(origin + '/') && response.status() >= 400) network.push({ url: response.url(), status: response.status() }); });
      if (mode.javaScriptEnabled) await page.addInitScript(() => {
        window.__tdLabLcp = null;
        try { new PerformanceObserver(list => { for (const e of list.getEntries()) window.__tdLabLcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch {}
      });
      try {
        const response = await page.goto(origin + target.path, {waitUntil:'domcontentloaded', timeout:45000});
        assert.equal(response?.status(), 200, 'HTTP status');
        const version = response.headers()['x-texasdefined-worker-version'];
        assert.ok(version, 'Missing Worker identity');
        workerVersion ??= version;
        assert.equal(version, workerVersion, 'Worker changed during acceptance');
        report.workerVersion = version;
        await page.locator('h1').first().waitFor({state:'visible',timeout:30000});
        for (const marker of target.markers) await page.getByText(marker, {exact:false}).first().waitFor({state:'attached',timeout:30000});
        if (mode.javaScriptEnabled) {
          // Require the page to remain populated after route hydration/revalidation.
          await page.waitForTimeout(1500);
          await page.locator('h1').first().waitFor({state:'visible',timeout:30000});
        }
        // DCL can precede the external stylesheet, especially for a page
        // without hydration. Check the actual rendered layout after load,
        // while retaining DCL in the timing report.
        await page.waitForLoadState('load', {timeout:30000});
        report.details = await page.evaluate(() => {
          const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => {
            const parsed = JSON.parse(el.textContent);
            return Array.isArray(parsed) ? parsed : parsed['@graph'] ?? [parsed];
          });
          return {
            canonical: document.querySelector('link[rel=canonical]')?.href,
            title: document.title,
            description: document.querySelector('meta[name=description]')?.content,
            robots: document.querySelector('meta[name=robots]')?.content ?? '',
            h1: [...document.querySelectorAll('h1')].map(el=>el.innerText.trim()),
            types: schemas.flatMap(node=>[node['@type']].flat()),
            links: [...document.querySelectorAll('a[href]')].map(el=>el.getAttribute('href')),
            bodyText: document.body.innerText,
            viewport: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            missingAlt: [...document.images].filter(img=>!img.hasAttribute('alt')).map(img=>img.src),
            images: [...document.images].map(img=>({ src:img.getAttribute('src'), alt:img.alt })),
            fcpMs: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null,
            observedLcpMs: window.__tdLabLcp ?? null,
            navigationMs: performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd ?? null
          };
        });
        const d = report.details;
        assert.equal(d.canonical, origin + target.path);
        assert.ok(d.title && d.description && !/noindex/i.test(d.robots), 'SEO metadata/indexability');
        assert.equal(d.h1.length, 1);
        assert.ok(d.types.includes(target.schema), 'Expected entity schema');
        for (const marker of target.markers) assert.ok(d.bodyText.includes(marker), 'Missing visitor-visible marker ' + marker);
        for (const href of target.links) assert.ok(d.links.includes(href) || d.links.includes(origin + href), 'Missing link ' + href);
        for (const id of imageIds) {
          const matching = page.locator('img[src*="' + id + '"]').first();
          assert.ok(await matching.count(), 'Missing archive photo ' + id);
          await matching.scrollIntoViewIfNeeded({timeout:15000});
          // Native image requests can take longer than one second even when
          // page JavaScript is disabled. Playwright can still inspect DOM state.
          // Require actual decoded image pixels and meaningful alt in every mode.
          assert.ok((await matching.getAttribute('alt'))?.trim(), 'Missing archive photo alt ' + id);
          // Poll from the Node runner, not page.waitForFunction: its injected
          // animation-frame polling does not resolve with JavaScript disabled,
          // even when the image has completed (confirmed in run 46010599010).
          const deadline = Date.now() + 20000;
          let state;
          do {
            state = await matching.evaluate(el => ({src:el.currentSrc, complete:el.complete, width:el.naturalWidth, loading:el.loading}));
            if (state.complete && state.width > 0) break;
            await new Promise(resolve => setTimeout(resolve, 250));
          } while (Date.now() < deadline);
          assert.ok(state.complete && state.width > 0, 'Archive photo failed to load ' + id + ': ' + JSON.stringify(state));
          assert.ok(await matching.evaluate(el=>el.complete && el.naturalWidth > 0 && !!el.alt), 'Broken archive photo or missing alt ' + id);
        }
        assert.ok(d.bodyText.includes('DeGolyer Library') && d.bodyText.includes('No known copyright restrictions'), 'Archive provenance');
        if (target.path === '/county/brazoria' && mode.javaScriptEnabled) {
          const region = page.getByRole('region', { name: 'County property tax rates table', exact: true });
          await region.waitFor({state:'visible',timeout:25000});
          const rows = region.locator('tbody tr');
          const count = await rows.count();
          assert.ok(count > 0, 'Hydrated county rate table has no rows');
          const headers = await region.locator('thead th').allTextContents();
          assert.equal(headers.length, 5, 'Tax table column headers');
          await region.focus();
          assert.equal(await region.evaluate(el => el === document.activeElement), true, 'Tax table keyboard focus');
          const rates = await rows.locator('td:nth-child(2)').allTextContents();
          assert.ok(rates.some(rate => /\\d+\\.\\d{6}/.test(rate)), 'No numeric county rate');
          report.taxTable = { countyRows: count, headers, rates, focusable: true };
        }
        if (target.path === '/county/brazoria' && !mode.javaScriptEnabled && process.env.GITHUB_EVENT_NAME !== 'pull_request') {
          assert.ok(d.bodyText.includes('Interactive rate tables load when JavaScript is available'), 'Missing meaningful tax SSR fallback');
        }
        if (target.path === '/city/alvin' && process.env.GITHUB_EVENT_NAME !== 'pull_request') {
          for (const marker of ['118 S. Magnolia', '200 Depot Centre Boulevard','300 W. Sealy','6:30 a.m. to 10:30 p.m.','designated parking']) assert.ok(d.bodyText.includes(marker), 'Missing municipal logistics ' + marker);
          assert.ok(d.links.includes('https://www.alvin.gov/482/Park-Rules'), 'Missing municipal rules link');
        }
        report.accessibility = await page.evaluate(() => ({
          landmarks: [...document.querySelectorAll('main,nav,header,footer,[role=main],[role=navigation]')].map(el => ({tag:el.tagName,role:el.getAttribute('role'),label:el.getAttribute('aria-label')})),
          headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(el => ({level:Number(el.tagName.slice(1)),text:el.innerText.trim()})),
          unnamedControls: [...document.querySelectorAll('button,a[href],input:not([type=hidden]),select,textarea')].filter(el => el.getClientRects().length && !(el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title') || el.innerText?.trim() || el.querySelector('img[alt]')?.alt || el.labels?.length)).map(el=>({tag:el.tagName,href:el.getAttribute('href'),id:el.id}))
        }));
        // Recheck after the lazy gallery has been revealed. Retain both
        // measurements; do not accept persistent overflow at either point.
        d.finalLayout = await page.evaluate(() => ({
          viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          offenders: [...document.querySelectorAll('body *')].map(el => {
            const rect = el.getBoundingClientRect();
            return {tag:el.tagName, id:el.id, className:typeof el.className === 'string' ? el.className.slice(0,200) : '', right:Math.round(rect.right), width:Math.round(rect.width)};
          }).filter(el => el.right > innerWidth + 3 && el.width > 0).sort((a,b)=>b.right-a.right).slice(0,12)
        }));
        assert.ok(d.scrollWidth <= d.viewport + 3 && d.finalLayout.scrollWidth <= d.finalLayout.viewport + 3,
          'Horizontal overflow ' + JSON.stringify({initial:{viewport:d.viewport,scrollWidth:d.scrollWidth},final:d.finalLayout}));
        assert.deepEqual(d.missingAlt, [], 'Missing image alt attributes');
        assert.deepEqual(errors, [], 'Uncaught client errors');
        // Record network failures for diagnosis; fail on any failed first-party
        // document or script/style/image request, not optional analytics requests.
        assert.deepEqual(network.filter(r=>/\/assets\/|\/media\/|\/images\/|\/city\/|\/county\/|\/destination\//.test(r.url)), [], 'Failed first-party page/assets');
        if (mode.javaScriptEnabled) await page.screenshot({path:output+'/'+target.path.split('/').at(-1)+'-'+mode.label+'.png',fullPage:true,timeout:30000});
        report.passed = true;
        console.log('PASS '+target.path+' '+mode.label+' '+JSON.stringify({fcpMs:d.fcpMs,observedLcpMs:d.observedLcpMs,navigationMs:d.navigationMs,workerVersion:version}));
      } catch(error) {
        report.passed = false;
        report.errors.push(String(error));
        console.error('FAIL '+target.path+' '+mode.label+' '+String(error));
        await page.screenshot({path:output+'/'+target.path.split('/').at(-1)+'-'+mode.label+'-FAIL.png',timeout:15000}).catch(()=>{});
      } finally {
        if (report.details) delete report.details.bodyText;
        report.pageErrors = errors;
        report.networkErrors = network;
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
  await writeFile(output+'/report.json',JSON.stringify({checkedAt:new Date().toISOString(),workerVersion,sourceSha:process.env.GITHUB_SHA,labOnly:true,reports},null,2));
}
// Verify sitemap coverage independently of browser mode, against live XML.
for (const [path, sitemap] of targets.map(t => [t.path, t.schema === 'Museum' ? '/sitemap-explore.xml' : '/sitemap.xml'])) {
  const response = await fetch(origin + sitemap);
  assert.equal(response.status, 200, 'Sitemap HTTP status');
  const xml = await response.text();
  const rows = [...xml.matchAll(/<url(?:\s[^>]*)?>[\s\S]*?<\/url>/g)].map(m => m[0]).filter(row => row.includes('<loc>' + origin + path + '</loc>'));
  assert.equal(rows.length, 1, 'Unique sitemap row ' + path);
  const lastmod = rows[0].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
  assert.ok(lastmod && lastmod.slice(0,10) >= '2026-11-24', 'Sitemap lastmod ' + path);
  console.log('PASS sitemap ' + path + ' ' + lastmod);
}
if (reports.length !== 9 || reports.some(r=>!r.passed)) process.exitCode = 1;
