import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { nextSnapshotHistory, referencesFromHtml, selectBuiltRouteAssets, validAssetResponse } from './verify-referenced-assets-production.mjs';

test('find only same-origin hashed JS/CSS from script, modulepreload and stylesheet', () => {
  const html = [
    '<script type="module" crossorigin src="/assets/main-LkbE9wUL.js"></script>',
    '<link rel="modulepreload" href="/assets/Container-Cz1cjZOJ.js">',
    '<link rel="stylesheet" href="/assets/entry-C82abc.css">',
    '<link rel="preload" as="script" href="/assets/Header-BsOq5IkK.js">',
    '<script src="https://other.example/assets/tracker-X.js"></script>',
    '<link rel="stylesheet" href="/favicon.ico">',
    '<script type="module">import("/assets/internal-A.js")</script>',
    '<script src="/assets/../../private.js"></script>',
    '<script src="/assets/main-LkbE9wUL.js"></script>',
  ].join('\n');
  assert.deepEqual(referencesFromHtml(html).map(x => x.path), [
    '/assets/main-LkbE9wUL.js',
    '/assets/Container-Cz1cjZOJ.js',
    '/assets/entry-C82abc.css',
    '/assets/Header-BsOq5IkK.js',
  ]);
});

test('a missing, challenged, empty or wrong-MIME asset fails closed', () => {
  const okJs = { status: 200, bytes: 123, mime: 'text/javascript; charset=utf-8', challenge: false };
  const okCss = { ...okJs, mime: 'text/css' };
  assert.equal(validAssetResponse('js', okJs), true);
  assert.equal(validAssetResponse('css', okCss), true);
  for (const response of [
    { ...okJs, status: 404 }, { ...okJs, status: 302 },
    { ...okJs, bytes: 0 }, { ...okJs, challenge: true },
    { ...okJs, mime: 'text/html' },
  ]) assert.equal(validAssetResponse('js', response), false);
  assert.equal(validAssetResponse('css', okJs), false);
});

test('retain only one older generation plus current, never grow indefinitely', () => {
  const fake = id => ({ format: 1, pages: [{ path: '/', assets: [{ path: '/assets/x-' + id + '.js', wasAvailable: true }] }] });
  const one = nextSnapshotHistory(null, fake(1));
  assert.equal(one.snapshots.length, 1);
  const two = nextSnapshotHistory(one, fake(2));
  assert.equal(two.snapshots.length, 2);
  const three = nextSnapshotHistory(two, fake(3));
  assert.deepEqual(three.snapshots.map(x => x.pages[0].assets[0].path), ['/assets/x-2.js', '/assets/x-3.js']);
});

test('hidden forensic and cross-release asset artifacts must actually upload', () => {
  const workflow = readFileSync('.github/workflows/deploy-production.yml', 'utf8');
  for (const name of ['hashed-asset-continuity-', 'asset-handoff-']) {
    const index = workflow.indexOf('name: ' + name);
    assert.ok(index >= 0, name + ': missing artifact upload');
    const config = workflow.slice(index, index + 430);
    assert.match(config, /include-hidden-files: true/, name + ': .artifacts would be silently excluded');
    assert.match(config, /if-no-files-found: error/, name + ': lost evidence must fail the pipeline');
  }
});

test('select exact emitted football and tax lazy-route chunks even when absent from HTML', () => {
  const files = [
    'texas-high-school-football-teams_._slug.lazy-ClHVsoFo.js',
    'property-tax.taxing-unit._unit-CGuzIffC.js',
    'Container-Cz1cjZOJ.js',
    'main-LkbE9wUL.js',
    'other.lazy-123.js',
  ];
  assert.deepEqual(selectBuiltRouteAssets(files), [
    { path: '/assets/texas-high-school-football-teams_._slug.lazy-ClHVsoFo.js', kind: 'js', source: 'built-client-chunk' },
    { path: '/assets/property-tax.taxing-unit._unit-CGuzIffC.js', kind: 'js', source: 'built-client-chunk' },
    { path: '/assets/main-LkbE9wUL.js', kind: 'js', source: 'built-client-chunk' },
    { path: '/assets/Container-Cz1cjZOJ.js', kind: 'js', source: 'built-client-chunk' },
  ]);
  assert.deepEqual(referencesFromHtml('<script src="/assets/main-LkbE9wUL.js"></script>').map(x => x.path), [
    '/assets/main-LkbE9wUL.js',
  ], 'do not incorrectly assume lazy imports are present as HTML asset tags');
});

test('missing or ambiguous lazy-route chunks fail closed instead of silently skipping old Googlebot failures', () => {
  assert.throws(() => selectBuiltRouteAssets(['main-AbCd.js']), /Expected exactly one production client chunk/);
  assert.throws(() => selectBuiltRouteAssets([
    'texas-high-school-football-teams_._slug.lazy-A.js',
    'texas-high-school-football-teams_._slug.lazy-B.js',
    'property-tax.taxing-unit._unit-C.js',
  ]), /Expected exactly one production client chunk/);
});

test('handoff persists old built hashes and current built hashes for next release', () => {
  const snapshot = id => ({
    format: 1, pages: [],
    builtAssets: [{ path: '/assets/property-tax.taxing-unit._unit-' + id + '.js', kind: 'js' }],
    legacyAssets: [{ path: '/assets/texas-high-school-football-teams_._slug.lazy-' + id + '.js',
      kind: 'js', wasAvailable: true, preSha256: id }],
  });
  const after = nextSnapshotHistory(nextSnapshotHistory(null, snapshot('OLD')), snapshot('NEW'));
  assert.deepEqual(after.snapshots.map(s => s.builtAssets[0].path), [
    '/assets/property-tax.taxing-unit._unit-OLD.js',
    '/assets/property-tax.taxing-unit._unit-NEW.js',
  ]);
  assert.equal(after.snapshots[1].legacyAssets[0].preSha256, 'NEW');
});

test('strict production gate checks built lazy modules and previously confirmed old modules on both origins', () => {
  const code = readFileSync('scripts/ci/verify-referenced-assets-production.mjs', 'utf8');
  assert.match(code, /selectBuiltRouteAssets\(await readdir\('dist\/client\/assets'\)\)/);
  assert.match(code, /const legacyResponses = await auditAssets\(CANONICAL, priorBuilt\)/);
  assert.match(code, /const a of newBuilt/);
  assert.match(code, /OPTIONAL_BUILT_CHUNK_PATTERNS/);
  assert.match(code, /RouteStatusScreens-/);
  assert.match(code, /for \(const a of inherited.values\(\)\)/);
  assert.match(code, /for \(const origin of \[DIRECT, CANONICAL\]\)/);
  assert.match(code, /record\.sha256 === a\.preSha256/);
});

test('capture common CSS, header/footer and fallback chunks when built, without failing on optional missing', () => {
  const core = [
    'texas-high-school-football-teams_._slug.lazy-A1.js',
    'property-tax.taxing-unit._unit-B2.js',
  ];
  assert.equal(selectBuiltRouteAssets(core).length, 2);
  assert.deepEqual(selectBuiltRouteAssets([...core,
    'styles-C3.css', 'Header-D4.js', 'Footer-E5.js', 'RouteStatusScreens-F6.js', 'x-G7.js'
  ]).map(x => x.path), [
    '/assets/texas-high-school-football-teams_._slug.lazy-A1.js',
    '/assets/property-tax.taxing-unit._unit-B2.js',
    '/assets/styles-C3.css', '/assets/Header-D4.js', '/assets/Footer-E5.js',
    '/assets/RouteStatusScreens-F6.js', '/assets/x-G7.js',
  ]);
});
