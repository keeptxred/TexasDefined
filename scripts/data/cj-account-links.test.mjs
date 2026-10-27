import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import { cjAccountRegistry, expectedCjAccountClick, expectedCjPageSid } from '../ci/cj-account-link-contract.mjs';

const read = path => readFileSync(path, 'utf8');
const hotelsModule = { exports: {} };
vm.runInNewContext(ts.transpile(read('src/lib/cj-hotels-evergreen.ts'), { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }), { exports: hotelsModule.exports, URL });
const accountModule = { exports: {} };
vm.runInNewContext(ts.transpile(read('src/lib/cj-account-links.ts'), { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }), {
  exports: accountModule.exports, URL,
  require(id) {
    if (id.includes('cj-account-verified-links.json')) return cjAccountRegistry;
    if (id === './cj-hotels-evergreen') return hotelsModule.exports;
    throw new Error('Unexpected dependency ' + id);
  },
});
const build = accountModule.exports.buildCjAccountClick;
const staySandbox = { URL, console, CustomEvent: class {}, window: { location: { pathname: '/' }, addEventListener() {}, requestAnimationFrame() {} }, document: { readyState: 'loading', addEventListener() {}, querySelectorAll() { return []; } } };
vm.runInNewContext(read('public/stay-affiliate-options.js'), staySandbox);
const stay = staySandbox.window.TexasDefinedStayAffiliateOptions;

test('registry is pinned to individually captured CJ creatives, never a shared advertiser AID', () => {
  assert.equal(cjAccountRegistry.publisherId, '101876465');
  for (const [program, advertiser, aid, host] of [
    ['booking.com', '7854081', '17289008', 'www.jdoqocy.com'],
    ['rvshare', '5126501', '15734916', 'www.kqzyfj.com'],
    ['orbitz', '4861280', '15734579', 'www.tkqlhce.com'],
    ['travelocity', '1549809', '15230459', 'www.kqzyfj.com'],
    ['vrbo', '2691607', '10697641', 'www.tkqlhce.com'],
    ['vrbo-owner', '2691607', '10697642', 'www.dpbolvw.net'],
    ['motel6-standard', '7624468', '17198227', 'www.tkqlhce.com'],
    ['motel6-halloween', '7624468', '17371482', 'www.kqzyfj.com'],
  ]) {
    const entry = cjAccountRegistry.links[program];
    assert.equal(entry.advertiserId, advertiser);
    assert.equal(entry.linkId, aid);
    assert.equal(entry.base, `https://${host}/click-101876465-${aid}`);
  }
  assert.equal(Object.keys(cjAccountRegistry.links).filter(key => key.startsWith('gearup-')).length, 8);
  assert.equal(cjAccountRegistry.links['really-good-stuff'], undefined, 'expired relationship must not be active');
});

test('React, public bootstrap and production expectations agree on exact destinations and stable bounded SIDs', () => {
  for (const route of ['/', '/destination/waco', '/event/polar-express-palestine', '/article/' + 'long-slug-'.repeat(15)]) {
    assert.equal(accountModule.exports.cjPageSid(route), expectedCjPageSid(route));
    assert.equal(accountModule.exports.cjPageSid(route + '?ignored=1'), expectedCjPageSid(route));
    for (const [program, entry] of Object.entries(cjAccountRegistry.links)) {
      const actual = build(program, route);
      assert.equal(actual, expectedCjAccountClick(program, route));
      const parsed = new URL(actual);
      assert.ok(parsed.searchParams.get('sid').length <= 64);
      assert.equal(parsed.pathname, '/click-101876465-' + entry.linkId);
      if (['rvshare', 'orbitz', 'travelocity', 'vrbo', 'vrbo-owner'].includes(program)) {
        for (const destination of entry.allowedDestinations) assert.equal(stay.buildCjDeepLink(destination, route), build(program, route, destination));
      }
    }
    assert.equal(stay.buildMotel6Link('17198227', route), build('motel6-standard', route));
    if (typeof stay.motel6CampaignActive === 'function') assert.equal(stay.buildMotel6Link('17371482', route), build('motel6-halloween', route));
  }
});

test('unknown programs, cross-advertiser destinations, credentials and unreviewed targets fail closed', () => {
  assert.throws(() => build('unapproved', '/'));
  assert.throws(() => build('rvshare', '/', 'https://www.hotels.com/'));
  assert.throws(() => build('booking.com', '/', 'https://www.booking.com/'));
  for (const destination of ['http://rvshare.com/', 'https://user@rvshare.com/', 'https://rvshare.com/#fragment', 'https://rvshare.com/?unknown=1', 'https://www.vrbo.com/unreviewed-property']) assert.throws(() => stay.buildCjDeepLink(destination, '/'));
  assert.throws(() => stay.buildMotel6Link('15734399', '/'));
});

test('all 26 Angi service destinations use their own captured creative and retain page attribution', () => {
  const sandbox = { URL, console, CustomEvent: class {}, MutationObserver: class { observe() {} }, window: { location: { pathname: '/' }, addEventListener() {}, clearTimeout() {}, setTimeout() {} }, document: { documentElement: {}, addEventListener() {} } };
  const source = read('public/angi-home-services.js');
  vm.runInNewContext(source.replace(/\}\)\(\);\s*$/, 'window.__verifiedAngi = { services, buildAngiClick, chooseService };})();'), sandbox);
  const api = sandbox.window.__verifiedAngi;
  assert.equal(api.services.length, 26);
  const creativeByEntryPoint = {
    '43313936':'17142826','43313937':'17142830','43313943':'17142838','43303139':'17141194','43303137':'17141190','44920547':'17252545','43313940':'17142833','43313942':'17142835','43313954':'17297358','43313957':'17297374','43313945':'17344173','43313956':'17297376','43313952':'17307735','43313950':'17344185','43303140':'17141195','43313938':'17142831','43303138':'17141193','44954937':'17276038','46163723':'17344214','43313951':'17297375','43313944':'17142839','43313939':'17142832','45292678':'17297390','46163719':'17344204','46163722':'17344212','44364980':'17219562',
  };
  for (const service of api.services) {
    const entry = cjAccountRegistry.links['angi-' + service.key];
    assert.equal(entry.advertiserId, '7439025');
    assert.equal(entry.destination, service.url);
    assert.equal(entry.linkId, creativeByEntryPoint[new URL(service.url).searchParams.get('entry_point_id')]);
    for (const route of ['/article/texas-roofs-hail-wind-heat', '/article/' + 'long-slug-'.repeat(15)]) {
      assert.equal(api.buildAngiClick(service, route), expectedCjAccountClick('angi-' + service.key, route));
    }
    assert.throws(() => api.buildAngiClick({ ...service, url: 'https://example.com/' }, '/'));
  }
  assert.ok(source.includes('href="${buildAngiClick(service, pathname)}"'));
  assert.equal(api.chooseService('unrelated', '/article/texas-roofs-hail-wind-heat').key, 'roofing');
  assert.equal(api.chooseService('roofing', '/article/corporate-relocation-to-texas'), null);
});

test('CJ production acceptance stays inside the existing change-scoped deployment lock', () => {
  const workflow = read('.github/workflows/deploy-production.yml');
  assert.ok(workflow.includes('group: texasdefined-production'));
  assert.ok(workflow.includes("steps.change_scope.outputs.cj_affiliate == 'true'"));
  assert.ok(workflow.includes('run: node scripts/ci/verify-cj-account-production.mjs'));
  const verifier = read('scripts/ci/verify-cj-account-production.mjs');
  assert.ok(verifier.includes("assert.equal(url.origin, new URL(origin).origin"));
  assert.ok(verifier.includes("redirect: 'error'"));
  assert.ok(!verifier.includes('fetch(href') && !verifier.includes('fetch(expected'));
});
