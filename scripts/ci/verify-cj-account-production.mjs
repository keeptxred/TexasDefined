import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import { cjAccountRegistry, expectedCjAccountClick, expectedHotelsClick } from './cj-account-link-contract.mjs';

const origin = process.env.CJ_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const evidence = [];
let passed = false;
async function read(path) {
  const url = new URL(path, origin);
  assert.equal(url.origin, new URL(origin).origin, 'Only first-party production requests are allowed');
  url.searchParams.set('td_cj_verify', process.env.GITHUB_SHA || 'manual');
  // Network timeouts are not evidence of an incorrect advertiser link.
  // Retry only aborted first-party requests; never retry failed assertions,
  // HTTP statuses, challenges, or redirects and never visit affiliate URLs.
  let response;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      response = await fetch(url, { cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(30000) });
      break;
    } catch (error) {
      if (attempt === 3 || error?.name !== 'TimeoutError') throw error;
      console.warn('CJ_FIRST_PARTY_TIMEOUT ' + JSON.stringify({ path, attempt }));
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
  assert.equal(response.status, 200, path + ' HTTP status');
  assert.notEqual(response.headers.get('cf-mitigated'), 'challenge');
  const text = await response.text();
  evidence.push({ path, status: response.status, cache: response.headers.get('cf-cache-status') });
  return text;
}
function verifyAnchor(html, partner, expected) {
  const anchor = (html.match(/<a\b[^>]*>/gi) || []).find(tag => tag.includes(`data-commercial-partner="${partner}"`));
  assert.ok(anchor, partner + ' offer missing');
  const href = anchor.match(/href=["']([^"']+)["']/)?.[1]?.replace(/&amp;/g, '&');
  assert.equal(href, expected, partner + ' exact account URL, page SID and destination');
  for (const token of ['sponsored', 'nofollow', 'noopener', 'noreferrer']) assert.ok(anchor.match(/rel="([^"]+)"/)?.[1].split(/\s+/).includes(token));
  assert.ok(anchor.includes('data-commercial-placement='));
  assert.ok(html.indexOf('Affiliate disclosure:') >= 0);
  evidence.push({ partner, href, inspectedOnly: true });
}

try {
  const source = await read('/stay-affiliate-options.js');
  const expectedSource = readFileSync('public/stay-affiliate-options.js', 'utf8');
  const hash = value => createHash('sha256').update(value.replace(/\r\n/g, '\n')).digest('hex');
  assert.equal(hash(source), hash(expectedSource), 'Production stay bootstrap must match deployed source');
  const sandbox = { URL, console, CustomEvent: class {}, window: { location: { pathname: '/' }, addEventListener() {}, requestAnimationFrame() {} }, document: { readyState: 'loading', addEventListener() {}, querySelectorAll() { return []; } } };
  vm.runInNewContext(source, sandbox);
  const api = sandbox.window.TexasDefinedStayAffiliateOptions;
  for (const program of ['rvshare', 'orbitz', 'travelocity', 'vrbo', 'vrbo-owner']) {
    for (const destination of cjAccountRegistry.links[program].allowedDestinations) {
      const href = api.buildCjDeepLink(destination, '/destination/waco');
      assert.equal(href, expectedCjAccountClick(program, '/destination/waco', destination));
      evidence.push({ program, destination, href, inspectedOnly: true });
    }
  }
  const football = '/article/texas-high-school-football-playoffs-explained';
  const footballHtml = await read(football);
  verifyAnchor(footballHtml, 'hotels.com', expectedHotelsClick(football));
  verifyAnchor(footballHtml, 'rvshare', expectedCjAccountClick('rvshare', football));
  verifyAnchor(footballHtml, 'motel6', expectedCjAccountClick('motel6-standard', football));
  const roadTrips = '/explore/road-trips';
  verifyAnchor(await read(roadTrips), 'booking.com', expectedCjAccountClick('booking.com', roadTrips));
  for (const path of ['/gaming/latency', '/gaming/why-dallas-matters-online-gaming']) verifyAnchor(await read(path), 'gearup', expectedCjAccountClick('gearup-17255582', path));
  const schoolPath = '/article/texas-school-districts-explained';
  const school = await read(schoolPath);
  // This visitor-only rail is React.lazy with a null SSR Suspense fallback.
  // A raw HTML absence is not proof that its browser-rendered link is missing.
  // Keep the raw response non-affiliate check, then verify the real client DOM.
  assert.ok(!school.includes('click-101876465-17106455') && !school.includes('data-commercial-partner="really-good-stuff"'), 'Expired RGS relationship must remain non-affiliate in SSR');
  const { createRequire } = await import('node:module');
  const { chromium } = createRequire(import.meta.url)(
    process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-wp-qa/node_modules/playwright-core',
  );
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    const page = await browser.newPage();
    const schoolUrl = new URL(schoolPath, origin);
    schoolUrl.searchParams.set('td_cj_verify', process.env.GITHUB_SHA || 'manual');
    const navigation = await page.goto(schoolUrl.href, { waitUntil: 'domcontentloaded', timeout: 45000 });
    assert.equal(navigation?.status(), 200, 'School article browser HTTP status');
    const retailer = page.locator('a[href="https://www.reallygoodstuff.com/"]');
    await retailer.first().waitFor({ state: 'visible', timeout: 20000 });
    assert.ok((await retailer.count()) > 0, 'Direct editorial retailer link must render in Chrome');
    const rendered = await page.locator('body').innerText();
    assert.ok(rendered.includes('TexasDefined does not earn an affiliate commission from this link'), 'Non-affiliate disclosure must render in Chrome');
    const markup = await page.content();
    assert.ok(!markup.includes('click-101876465-17106455') && !markup.includes('data-commercial-partner="really-good-stuff"'), 'Expired RGS relationship must remain non-affiliate in browser DOM');
    evidence.push({ path: schoolPath, browserRendered: true, nonAffiliate: true, retailer: 'https://www.reallygoodstuff.com/', affiliateClicksGenerated: 0 });
  } finally {
    await browser.close();
  }
  // Match the first actual governed Kings Camo hub card (lightweight shirts),
  // not an unused general-shop creative. Never click advertiser redirects.
  // Check only first-party SSR HTML; do not follow CJ redirects or generate paid clicks.
  for (const [route, program] of [
    ['/hunting', 'kings-camo-lightweight-shirts'],
    ['/hunting/turkey-hunting', 'kings-camo-turkey-accessories'],
    ['/hunting/youth-hunting', 'kings-camo-kids'],
    ['/best-places-to-go-camping-in-texas', 'kings-camo-camping'],
  ]) {
    verifyAnchor(await read(route), 'kings-camo', expectedCjAccountClick(program, route));
  }
  const licensed = await read('/hunting/texas-hunting-license');
  assert.ok(!licensed.includes('data-commercial-partner="kings-camo"'), 'license rules must not be commercially interrupted');
  const angi = await read('/angi-home-services.js');
  assert.equal(hash(angi), hash(readFileSync('public/angi-home-services.js', 'utf8')), 'Angi production code must match its verified service-specific registry');
  passed = true;
  console.log('CJ account production PASS: exact source, advertiser-specific links, destinations, SIDs and expired relationship fallback. No affiliate redirects were requested.');
} finally {
  mkdirSync('.artifacts', { recursive: true });
  writeFileSync('.artifacts/cj-account-production.json', JSON.stringify({ passed, revision: process.env.GITHUB_SHA, checkedAt: new Date().toISOString(), affiliateClicksGenerated: 0, evidence }, null, 2));
}
