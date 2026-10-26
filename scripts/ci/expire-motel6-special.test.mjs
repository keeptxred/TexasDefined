import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import { CUTOFF, TARGETS, expireMotel6Special } from './expire-motel6-special.mjs';

const [stay, football] = TARGETS.map(p => readFileSync(p, 'utf8'));
const alreadyRetired = !stay.includes('MOTEL6_HALLOWEEN_AID') && !football.includes('MOTEL6_HALLOWEEN_URL');

test('fails closed before the display cutoff, with no edits', () => {
  const plan = expireMotel6Special(stay, football, '2026-11-01T04:59:59Z');
  assert.equal(plan.due, false);
  assert.equal(plan.changed, false);
  assert.equal(plan.staySource, stay);
  assert.equal(plan.footballSource, football);
  assert.equal(CUTOFF, '2026-11-01T05:00:00Z');
});

test('on the cutoff removes only seasonal copy and creative, not evergreen booking or tracking', () => {
  const plan = expireMotel6Special(stay, football, CUTOFF);
  assert.equal(plan.due, true);
  assert.equal(plan.changed, !alreadyRetired);
  for (const text of [plan.staySource, plan.footballSource]) {
    assert.doesNotMatch(text, /17371482|Trip and Treat|motel6Halloween|MOTEL6_HALLOWEEN|MOTEL6_CAMPAIGN|Motel 6 Halloween/);
  }
  assert.match(plan.staySource, /const MOTEL6_STANDARD_AID = "17198227"/);
  assert.match(plan.staySource, /link.dataset.commercialPartner = "motel6"/);
  assert.match(plan.staySource, /link.rel = "sponsored nofollow noopener noreferrer"/);
  assert.match(plan.footballSource, /href={MOTEL6_STANDARD_URL}/);
  assert.match(plan.footballSource, /trackAffiliateClick\({ partner: 'motel6'/);
  assert.match(plan.footballSource, /Affiliate disclosure: TexasDefined may earn a commission/);
  assert.doesNotMatch(plan.footballSource, /useState|useEffect|clientNow/);
  const sandbox = {
    window: { location: { pathname: '/' }, dataLayer: [], addEventListener() {}, dispatchEvent() {}, requestAnimationFrame() {} },
    document: { readyState: 'loading', addEventListener() {}, querySelectorAll() { return []; } },
    URL, Date, CustomEvent: class {},
  };
  vm.runInNewContext(plan.staySource, sandbox);
  assert.equal(sandbox.window.TexasDefinedStayAffiliateOptions.buildMotel6Link('17198227'), 'https://www.tqlkg.com/click-101876465-17198227');
  assert.equal(sandbox.window.TexasDefinedStayAffiliateOptions.motel6Eligible('/explore/road-trips'), true);
});

test('cleanup is idempotent after removal and fails on mixed/stale state', () => {
  const first = expireMotel6Special(stay, football, '2026-11-02T00:00:00Z');
  const second = expireMotel6Special(first.staySource, first.footballSource, '2026-11-03T00:00:00Z');
  assert.equal(second.due, true);
  assert.equal(second.changed, false);
  if (!alreadyRetired) assert.throws(() => expireMotel6Special(first.staySource, football, '2026-11-02'), /Partially expired/);
  assert.throws(() => expireMotel6Special(first.staySource + ' Trip and Treat', first.footballSource, '2026-11-03'), /Orphan expired/);
});
