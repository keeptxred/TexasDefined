import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { expectedAssetResponse, retentionCandidates, safeCriticalAsset } from './retain-critical-hashed-assets.mjs';

const hash = 'b'.repeat(64);
const historical = '2026-10-30T12:00:00.000Z';
const now = Date.parse('2026-10-31T12:00:00.000Z');

test('retain only safe critical content-hashed JS/CSS, no arbitrary URL or traversal', () => {
  for (const path of [
    '/assets/main-BbzNQxMh.js', '/assets/Container-D5VE1rr_.js',
    '/assets/styles-CGHzhhAO.css', '/assets/property-tax.taxing-unit._unit-BdLFe-27.js',
    '/assets/texas-high-school-football-teams_._slug.lazy-ClHVsoFo.js',
    '/assets/RouteStatusScreens-BpwrK-xE.js',
  ]) assert.equal(safeCriticalAsset(path), true, path);
  for (const path of ['/assets/main-A.js?cachebust=1', '/assets/../../secrets.js',
    '/api/private.js', 'https://other.example/assets/main-A.js',
    '/assets/article-something-HASH.js', '/assets/main-A.json']) {
    assert.equal(safeCriticalAsset(path), false, path);
  }
});

test('candidate union contains current HTML old bundle and prior generated lazy modules', () => {
  const old = { path: '/assets/main-BbzNQxMh.js', kind: 'js',
    wasAvailable: true, preSha256: hash };
  const olderRoute = { path: '/assets/property-tax.taxing-unit._unit-BdLFe-27.js',
    wasAvailable: true, preSha256: hash, firstSeenAt: historical };
  const history = { snapshots: [
    { format: 1, capturedAt: historical, pages: [{ assets: [old] }] },
    { format: 1, capturedAt: '2026-10-31T11:59:00.000Z',
      pages: [{ assets: [old] }],
      builtAssets: [{ path: '/assets/texas-high-school-football-teams_._slug.lazy-NEW.js' }],
      legacyAssets: [olderRoute], retainedAssets: [olderRoute] },
  ] };
  const selected = retentionCandidates(history, now);
  assert.deepEqual(new Set(selected.map(x => x.path)), new Set([
    '/assets/main-BbzNQxMh.js', '/assets/property-tax.taxing-unit._unit-BdLFe-27.js',
  ]));
  assert.equal(selected.find(x => x.path === olderRoute.path).firstSeenAt, historical);
});

test('never retain unproven, aged-out, excessively future, or malformed prior hashes', () => {
  const invalid = [
    { path: '/assets/main-OLD.js', wasAvailable: false, preSha256: hash },
    { path: '/assets/Container-OLD.js', wasAvailable: true, preSha256: 'not-a-sha' },
    { path: '/assets/main-TOOOLD.js', wasAvailable: true, preSha256: hash,
      firstSeenAt: '2026-10-20T00:00:00Z' },
    { path: '/assets/main-FUTURE.js', wasAvailable: true, preSha256: hash,
      firstSeenAt: '2026-11-02T00:00:00Z' },
  ];
  assert.deepEqual(retentionCandidates({ snapshots: [{
    capturedAt: '2026-10-31T11:00:00Z', pages: [{ assets: invalid }],
  }] }, now), []);
});

test('do not treat non-JS 200, HTML fallback or empty content as preserved chunks', () => {
  assert.equal(expectedAssetResponse('js', 200, 'text/javascript; charset=utf-8', 1), true);
  assert.equal(expectedAssetResponse('css', 200, 'text/css', 12), true);
  assert.equal(expectedAssetResponse('js', 200, 'text/html', 999), false);
  assert.equal(expectedAssetResponse('css', 404, 'text/css', 999), false);
  assert.equal(expectedAssetResponse('js', 200, 'text/javascript', 0), false);
});

test('outgoing-Worker retention precedes Wrangler deploy and is covered by postdeploy gate', () => {
  const workflow = readFileSync('.github/workflows/deploy-production.yml', 'utf8');
  const capture = workflow.indexOf('name: Capture old HTML JS/CSS hashes before Worker replacement');
  const retain = workflow.indexOf('name: Retain bounded old hashed client assets');
  const deploy = workflow.indexOf('name: Deploy TexasDefined Worker');
  const verify = workflow.indexOf('name: Verify current and previous release JS/CSS on both public origins');
  assert.ok(capture > 0 && retain > capture && deploy > retain && verify > deploy);
  assert.match(workflow, /node scripts\/ci\/retain-critical-hashed-assets\.mjs --retain/);
  assert.match(workflow, /retained-critical-assets-report\.json/);
  const verifier = readFileSync('scripts/ci/verify-referenced-assets-production.mjs', 'utf8');
  assert.match(verifier, /latest\.retainedAssets/);
  assert.match(verifier, /record\.sha256 === a\.preSha256/);
});
