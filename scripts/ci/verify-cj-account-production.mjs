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
  const response = await fetch(url, { cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(30000) });
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
  const school = await read('/article/texas-school-districts-explained');
  assert.ok(school.includes('href="https://www.reallygoodstuff.com/"'));
  assert.ok(school.includes('TexasDefined does not earn an affiliate commission from this link'));
  assert.ok(!school.includes('click-101876465-17106455') && !school.includes('data-commercial-partner="really-good-stuff"'), 'Expired RGS relationship must remain non-affiliate');
  // Check only first-party SSR HTML; do not follow CJ redirects or generate paid clicks.
  for (const [route, program] of [
    ['/hunting', 'kings-camo-shop'],
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
