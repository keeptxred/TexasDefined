import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import {
  INTENTIONAL_404_DISPOSITIONS,
  RESTORE_REQUIRED_GSC_PATHS,
  RESTORED_GSC_CANONICAL_PATHS,
  LIVE_VERIFIED_GSC_CANONICAL_PATHS,
  reviewGsc404Disposition,
} from './gsc-404-disposition-policy.mjs';
import { classifyHistoricalGsc404 } from './gsc-404-classification.mjs';

const inventory = readFileSync('ops/seo/gsc-404-2026-11-13-paths.txt', 'utf8')
  .split(/\r?\n/).filter((l) => l.startsWith('/'));
const intentionalPaths = Object.keys(INTENTIONAL_404_DISPOSITIONS);
const explicit = new Set([...intentionalPaths, ...RESTORE_REQUIRED_GSC_PATHS]);

const observed = (path, firstStatus, finalStatus, {
  invalidTemplate = false, error = null,
  finalUrl = finalStatus === 200 ? 'https://texasdefined.com' + (RESTORED_GSC_CANONICAL_PATHS[path] || LIVE_VERIFIED_GSC_CANONICAL_PATHS[path] || path) : null,
  canonical = finalStatus === 200 ? 'https://texasdefined.com' + (RESTORED_GSC_CANONICAL_PATHS[path] || LIVE_VERIFIED_GSC_CANONICAL_PATHS[path] || path) : null,
} = {}) => {
  const outcome = classifyHistoricalGsc404({ invalidTemplate, firstStatus, finalStatus, error });
  return reviewGsc404Disposition({ path, invalidTemplate, firstStatus, finalStatus, finalUrl, canonical, outcome, error });
};

test('historical 404 policy only covers the exact supplied 99 URLs and is not blanket URL rewriting', () => {
  assert.equal(inventory.length, 99);
  assert.equal(new Set(inventory).size, 99);
  assert.equal(intentionalPaths.length, 12);
  assert.equal(RESTORE_REQUIRED_GSC_PATHS.size, 11);
  assert.deepEqual(Object.keys(RESTORED_GSC_CANONICAL_PATHS).sort(), [...RESTORE_REQUIRED_GSC_PATHS].sort());
  assert.equal(Object.keys(LIVE_VERIFIED_GSC_CANONICAL_PATHS).length, 60);
  for (const path of Object.keys(LIVE_VERIFIED_GSC_CANONICAL_PATHS)) {
    assert.ok(inventory.includes(path), 'Live source outside historical GSC inventory: ' + path);
    assert.ok(!explicit.has(path), 'Canonical ledger overlaps intentional or restored paths: ' + path);
    assert.ok(!path.includes('
  for (const path of explicit) assert.ok(inventory.includes(path), 'Policy refers to a URL not in 99-path inventory: ' + path);
  for (const path of RESTORE_REQUIRED_GSC_PATHS) {
    assert.ok(!intentionalPaths.includes(path), 'Same path cannot be must-restore and intentionally missing');
  }
  for (const path of intentionalPaths) {
    assert.ok(!path.includes('$'), 'Literal router tokens are exclusively handled by the shared token guard');
    assert.ok(INTENTIONAL_404_DISPOSITIONS[path].reason);
    assert.ok(INTENTIONAL_404_DISPOSITIONS[path].source);
  }
});

test('operator-closed and not-yet-open park import paths stay absent until source-backed reopening', () => {
  const expectedParks = [
    '/destination/fairfield-lake-state-park','/state-park/fairfield-lake-state-park',
    '/destination/wyler-aerial-tramway-state-park','/state-park/wyler-aerial-tramway-state-park',
    '/destination/chinati-mountains-state-natural-area','/attraction/chinati-mountains-state-natural-area',
  ];
  for (const path of expectedParks) {
    assert.match(INTENTIONAL_404_DISPOSITIONS[path].source, /^https:\/\/tpwd\.texas\.gov\//);
    assert.equal(observed(path, 404, 404).review, 'expected-404');
    assert.equal(observed(path, 301, 404).review, 'policy-regression', 'old 301->404 chain is not permitted');
    assert.equal(observed(path, 200, 200).review, 'policy-regression', 'unapproved stub cannot become indexable');
  }
});

test('two unverified UIL programs, three retired shop collections and composite county do not get a generic 301', () => {
  const expected = [
    '/texas-high-school-football-isds/golden-rule-charter-school',
    '/texas-high-school-football-isds/central-isd',
    '/shop/campfire-kitchen','/shop/smoke-and-salt','/shop/wildflower-house',
    '/county/cameron-hidalgo-starr-and-willacy-counties',
  ];
  for (const path of expected) {
    assert.equal(observed(path, 404, 404).review, 'expected-404');
    assert.equal(observed(path, 301, 200).review, 'policy-regression');
  }
});

test('valuable restored sources must be served HTTP200 directly or via working redirects', () => {
  for (const path of RESTORE_REQUIRED_GSC_PATHS) {
    assert.equal(observed(path, 200, 200).review, 'served-200');
    assert.equal(observed(path, 301, 200).review, 'served-200');
    assert.equal(observed(path, 301, 404).review, 'restore-regression');
    assert.equal(observed(path, 404, 404).review, 'restore-regression');
    assert.equal(observed(path, null, null, {error: 'timeout'}).review, 'restore-regression');
  }
});

test('invalid $slug does not become a 301-to-404 or a 200 thin-page substitute', () => {
  const p = '/explore/casinos/$slug';
  assert.equal(observed(p, 404, 404, {invalidTemplate: true}).review, 'expected-404');
  assert.equal(observed(p, 307, 404, {invalidTemplate: true}).review, 'route-leak-regression');
  assert.equal(observed(p, 200, 200, {invalidTemplate: true}).review, 'route-leak-regression');
});

test('the new TxDOT/DPS road-trip authority article is explicitly required, not left unclassified', () => {
  const p = '/article/texas-road-trip-rules';
  assert.ok(explicit.has(p), 'Article restored in PR #7137');
  assert.equal(observed(p, 404, 404).review, 'restore-regression');
  assert.equal(observed(p, 301, 404).review, 'restore-regression');
  assert.equal(observed(p, 200, 200).review, 'served-200');
  assert.equal(observed(p, 200, 200, { canonical: 'https://texasdefined.com/article/scenic-drives-in-texas' }).review, 'restore-regression');
});

test('all sixty 2026-11-13 live verified pages preserve a real self-canonical final authority page', () => {
  for (const [path, destination] of Object.entries(LIVE_VERIFIED_GSC_CANONICAL_PATHS)) {
    const expected = 'https://texasdefined.com' + destination;
    assert.equal(observed(path, path === destination ? 200 : 301, 200, { finalUrl: expected, canonical: expected }).review, 'served-200', path);
    assert.equal(observed(path, 301, 404).review, 'canonical-regression', path);
    assert.equal(observed(path, 301, 200, { finalUrl: 'https://texasdefined.com/' }).review, 'canonical-regression', path);
    assert.equal(observed(path, 301, 200, { canonical: null }).review, 'canonical-regression', path);
    assert.equal(observed(path, null, null, {error: 'timeout'}).review, 'canonical-regression', path);
  }
});

test('real restored routes require exact published destinations and self-canonicals, not arbitrary 200', () => {
  for (const path of RESTORE_REQUIRED_GSC_PATHS) {
    const expected = 'https://texasdefined.com' + RESTORED_GSC_CANONICAL_PATHS[path];
    assert.equal(observed(path, 301, 200, {finalUrl: expected, canonical: expected}).review, 'served-200');
    assert.equal(observed(path, 301, 200, {finalUrl: 'https://texasdefined.com/'}).review, 'restore-regression');
    assert.equal(observed(path, 200, 200, {canonical: null}).review, 'restore-regression');
    assert.equal(observed(path, 301, 200, {canonical: 'https://texasdefined.com/'}).review, 'restore-regression');
    assert.equal(observed(path, 301, 200, {canonical: 'http://texasdefined.com' + RESTORED_GSC_CANONICAL_PATHS[path]}).review, 'restore-regression');
    assert.equal(observed(path, 301, 200, {finalUrl: expected + '?tracked=1'}).review, 'restore-regression');
  }
});
), 'Route template cannot be published verified URL: ' + path);
  }
  for (const path of explicit) assert.ok(inventory.includes(path), 'Policy refers to a URL not in 99-path inventory: ' + path);
  for (const path of RESTORE_REQUIRED_GSC_PATHS) {
    assert.ok(!intentionalPaths.includes(path), 'Same path cannot be must-restore and intentionally missing');
  }
  for (const path of intentionalPaths) {
    assert.ok(!path.includes('$'), 'Literal router tokens are exclusively handled by the shared token guard');
    assert.ok(INTENTIONAL_404_DISPOSITIONS[path].reason);
    assert.ok(INTENTIONAL_404_DISPOSITIONS[path].source);
  }
});

test('operator-closed and not-yet-open park import paths stay absent until source-backed reopening', () => {
  const expectedParks = [
    '/destination/fairfield-lake-state-park','/state-park/fairfield-lake-state-park',
    '/destination/wyler-aerial-tramway-state-park','/state-park/wyler-aerial-tramway-state-park',
    '/destination/chinati-mountains-state-natural-area','/attraction/chinati-mountains-state-natural-area',
  ];
  for (const path of expectedParks) {
    assert.match(INTENTIONAL_404_DISPOSITIONS[path].source, /^https:\/\/tpwd\.texas\.gov\//);
    assert.equal(observed(path, 404, 404).review, 'expected-404');
    assert.equal(observed(path, 301, 404).review, 'policy-regression', 'old 301->404 chain is not permitted');
    assert.equal(observed(path, 200, 200).review, 'policy-regression', 'unapproved stub cannot become indexable');
  }
});

test('two unverified UIL programs, three retired shop collections and composite county do not get a generic 301', () => {
  const expected = [
    '/texas-high-school-football-isds/golden-rule-charter-school',
    '/texas-high-school-football-isds/central-isd',
    '/shop/campfire-kitchen','/shop/smoke-and-salt','/shop/wildflower-house',
    '/county/cameron-hidalgo-starr-and-willacy-counties',
  ];
  for (const path of expected) {
    assert.equal(observed(path, 404, 404).review, 'expected-404');
    assert.equal(observed(path, 301, 200).review, 'policy-regression');
  }
});

test('valuable restored sources must be served HTTP200 directly or via working redirects', () => {
  for (const path of RESTORE_REQUIRED_GSC_PATHS) {
    assert.equal(observed(path, 200, 200).review, 'served-200');
    assert.equal(observed(path, 301, 200).review, 'served-200');
    assert.equal(observed(path, 301, 404).review, 'restore-regression');
    assert.equal(observed(path, 404, 404).review, 'restore-regression');
    assert.equal(observed(path, null, null, {error: 'timeout'}).review, 'restore-regression');
  }
});

test('invalid $slug does not become a 301-to-404 or a 200 thin-page substitute', () => {
  const p = '/explore/casinos/$slug';
  assert.equal(observed(p, 404, 404, {invalidTemplate: true}).review, 'expected-404');
  assert.equal(observed(p, 307, 404, {invalidTemplate: true}).review, 'route-leak-regression');
  assert.equal(observed(p, 200, 200, {invalidTemplate: true}).review, 'route-leak-regression');
});

test('unclassified retired articles remain open editorial decisions, not fabricated restored pages', () => {
  const p = '/article/texas-road-trip-rules';
  assert.ok(!explicit.has(p));
  assert.equal(observed(p, 404, 404).review, 'editorial-disposition-needed');
  assert.equal(observed(p, 301, 404).review, 'redirect-to-missing');
  assert.equal(observed(p, 200, 200).review, 'observed-response');
});

test('real restored routes require exact published destinations and self-canonicals, not arbitrary 200', () => {
  for (const path of RESTORE_REQUIRED_GSC_PATHS) {
    const expected = 'https://texasdefined.com' + RESTORED_GSC_CANONICAL_PATHS[path];
    assert.equal(observed(path, 301, 200, {finalUrl: expected, canonical: expected}).review, 'served-200');
    assert.equal(observed(path, 301, 200, {finalUrl: 'https://texasdefined.com/'}).review, 'restore-regression');
    assert.equal(observed(path, 200, 200, {canonical: null}).review, 'restore-regression');
    assert.equal(observed(path, 301, 200, {canonical: 'https://texasdefined.com/'}).review, 'restore-regression');
    assert.equal(observed(path, 301, 200, {canonical: 'http://texasdefined.com' + RESTORED_GSC_CANONICAL_PATHS[path]}).review, 'restore-regression');
    assert.equal(observed(path, 301, 200, {finalUrl: expected + '?tracked=1'}).review, 'restore-regression');
  }
});
