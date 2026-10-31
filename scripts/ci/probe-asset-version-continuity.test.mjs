import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractAssetPaths,
  selectCanaryAssets,
  findTransitions,
  selectBuiltAssets,
} from './probe-asset-version-continuity.mjs';

test('extract same-site hashed JavaScript and CSS without query parameters or duplicates', () => {
  const html = '<script src="/assets/main-ABC123.js?v=1"></script>' +
    '<link href="https://texasdefined.com/assets/styles-Ab1.css" rel="stylesheet">' +
    '<script src="/assets/main-ABC123.js?v=2"></script>' +
    '<div data-url="/article/not-an-asset"></div>';
  assert.deepEqual(extractAssetPaths(html), [
    '/assets/main-ABC123.js',
    '/assets/styles-Ab1.css',
  ]);
});

test('prefer route-specific and bootstrap assets, within bounded sample', () => {
  const paths = [
    '/assets/zzz-A.js',
    '/assets/styles-ABC.css',
    '/assets/main-ABC.js',
    '/assets/texas-high-school-football-teams_._slug.lazy-ABC.js',
    '/assets/other-ABC.js',
  ];
  assert.deepEqual(selectCanaryAssets(paths, 3), [
    '/assets/texas-high-school-football-teams_._slug.lazy-ABC.js',
    '/assets/main-ABC.js',
    '/assets/styles-ABC.css',
  ]);
});

test('a formerly working old hash turning into 404 is a confirmed transition', () => {
  assert.deepEqual(findTransitions(
    [
      { path: '/assets/old-HASH.js', status: 200, cfRay: 'old-ray' },
      { path: '/assets/already-broken.js', status: 404 },
      { path: '/assets/unchanged.js', status: 200 },
    ],
    [
      { path: '/assets/old-HASH.js', status: 404, cfRay: 'new-ray' },
      { path: '/assets/already-broken.js', status: 404 },
      { path: '/assets/unchanged.js', status: 200 },
    ],
  ), [{
    path: '/assets/old-HASH.js',
    beforeStatus: 200,
    afterStatus: 404,
    beforeRay: 'old-ray',
    afterRay: 'new-ray',
  }]);
});

test('select only emitted critical fresh bundle files', () => {
  const files = [
    'main-C2.js',
    'styles-B3.css',
    'texas-high-school-football-teams_._slug.lazy-T1.js',
    'property-tax.taxing-unit._unit-P3.js',
    'random.txt',
    'unrelated.js',
  ];
  assert.deepEqual(selectBuiltAssets(files), [
    '/assets/main-C2.js',
    '/assets/styles-B3.css',
    '/assets/texas-high-school-football-teams_._slug.lazy-T1.js',
    '/assets/property-tax.taxing-unit._unit-P3.js',
  ]);
});

test('a missing post-deploy observation does not manufacture a removal', () => {
  assert.deepEqual(findTransitions(
    [{ path: '/assets/a-HASH.js', status: 200 }],
    [{ path: '/assets/different-HASH.js', status: 404 }],
  ), []);
});
