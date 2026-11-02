import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { expectedAssetResponse, retain, retentionCandidates, safeCriticalAsset } from './retain-critical-hashed-assets.mjs';

const hash = 'b'.repeat(64);
const historical = '2026-10-30T12:00:00.000Z';
const now = Date.parse('2026-10-31T12:00:00.000Z');

test('retain only safe critical content-hashed JS/CSS, no arbitrary URL or traversal', () => {
  for (const path of [
    '/assets/main-BbzNQxMh.js', '/assets/Container-D5VE1rr_.js',
    '/assets/texas-high-school-football-districts_._slug.lazy-LUNlVWLt.js',
    '/assets/texas-high-school-football-districts.lazy-qUVgGBGS.js',
    '/assets/useLocation-BggeWcAi.js',
    '/assets/SponsoredSportsPlacement-VM9ICMMH.js',
    '/assets/createLucideIcon-yBqUUiDC.js',
    '/assets/ContextualOfficialSources-CoOaVWuv.js',
    '/assets/CitationTrustPanel-BF2Efeia.js',
    '/assets/CitationCollectionTrustRouter-CQsMd_7t.js',
    '/assets/analytics-aWB69Ydr.js',
    '/assets/styles-CGHzhhAO.css', '/assets/property-tax.taxing-unit._unit-BdLFe-27.js',
    '/assets/texas-high-school-football-teams_._slug.lazy-ClHVsoFo.js',
    '/assets/RouteStatusScreens-BpwrK-xE.js',
    // Actual October 31 verified Microsoft-crawler 404 paths, retained only if first
    // observed healthy and the digest is independently matched.
    '/assets/events.lazy-BqnK_3OO.js',
    '/assets/events._collection.lazy-D0ueLEjb.js',
    '/assets/food._slug.lazy-D_RAXB8y.js',
    '/assets/article._slug-Bo6h8g51.js',
    '/assets/destination._slug-CyHpA01o.js',
    '/assets/events.index.lazy-Bv3IVzKY.js',
    '/assets/explore.index.lazy-CDks8Iov.js',
    '/assets/search.lazy-DOdUUwCn.js',
    '/assets/fishing.lakes._slug-bnM1eCOw.js',
    '/assets/texas-high-school-football-playoff-brackets-BG2nCdNx.js',
    '/assets/MuseumAuthorityNetworkSection-DMbCzSMq.js',
    '/assets/museum-authority-heroes-DChJMGcZ.js',
    '/assets/texas-data.lazy-Bmna2q7H.js',
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

test('actual retention copies byte-identical prior Worker JS to next client assets, without new storage', async () => {
  const temp = mkdtempSync(join(tmpdir(), 'td-hashed-assets-'));
  try {
    const body = 'export const stillValidOldVersion = true;';
    const expected = createHash('sha256').update(body).digest('hex');
    const snapshotPath = join(temp, 'snapshot.json');
    const reportPath = join(temp, 'report.json');
    const assetFolder = join(temp, 'client', 'assets');
    const path = '/assets/main-OldHashA1.js';
    const now = Date.now();
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{
      format: 1, capturedAt: new Date(now - 1000).toISOString(),
      pages: [{ path: '/', assets: [{ path, wasAvailable: true, preSha256: expected }] }],
      builtAssets: [{ path: '/assets/main-NewHashB2.js' }],
    }] }));
    const requested = [];
    const result = await retain({ snapshotPath, reportPath, assetFolder, now, fetchImpl: async url => {
      requested.push(url);
      return new Response(body, { status: 200, headers: { 'Content-Type': 'text/javascript' } });
    } });
    assert.deepEqual(requested, ['https://texasdefined.com' + path]);
    assert.equal(readFileSync(join(assetFolder, 'main-OldHashA1.js'), 'utf8'), body);
    assert.equal(result.retainedCount, 1);
    assert.equal(JSON.parse(readFileSync(snapshotPath, 'utf8')).snapshots[0].retainedAssets[0].preSha256, expected);
    assert.equal(JSON.parse(readFileSync(reportPath, 'utf8')).copied[0].bytes, Buffer.byteLength(body));
  } finally { rmSync(temp, { recursive: true, force: true }); }
});

test('previously verified SHA never silently accepts different old code', async () => {
  const temp = mkdtempSync(join(tmpdir(), 'td-hashed-assets-'));
  try {
    const path = '/assets/Container-OldHashA1.js';
    const snapshotPath = join(temp, 'snapshot.json');
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{
      format: 1, capturedAt: new Date().toISOString(),
      pages: [{ path: '/', assets: [{ path, wasAvailable: true, preSha256: 'a'.repeat(64) }] }],
    }] }));
    await assert.rejects(() => retain({ snapshotPath, assetFolder: join(temp,'client','assets'),
      reportPath: join(temp,'report.json'), fetchImpl: async () => new Response('not original bytes',
        { status: 200, headers: { 'Content-Type': 'application/javascript' } }) }),
      /changed under identical hashed filename/);
    assert.equal(existsSync(join(temp, 'client', 'assets', 'Container-OldHashA1.js')), false);
  } finally { rmSync(temp, { recursive: true, force: true }); }
});

test('Nov 2 observed Meta/Bing imports are eligible only as same-origin hashed JS files', () => {
  const observed = [
  "/assets/external-link-DASm7Sot.js",
  "/assets/useBaseQuery-DAwRZeNC.js",
  "/assets/DestinationCard-CogOLLKC.js",
  "/assets/useQuery-6nTz4IUX.js",
  "/assets/SectionHeader-Do5UIIvo.js",
  "/assets/FootballFanOffers-DXCuhNe8.js",
  "/assets/ElPasoAreaAuthority-D_3Wtymp.js",
  "/assets/internal-linking-Dmlhp8ZR.js",
  "/assets/ArticleCard-OgqXjgNN.js",
  "/assets/UnusualBusinessAuthorityPanel-oTnuUrSP.js",
  "/assets/ArticleBody-Dfj6eFOG.js",
  "/assets/ParkingMapPanel-BZAeEgAI.js",
  "/assets/event._slug.lazy-JE-wjs_e.js",
  "/assets/shop.lazy-tGIKuzrC.js",
  "/assets/shop.product._productId-BUYhfVVT.js",
  "/assets/historic-sites-Dw2IKh_M.js",
  "/assets/museum-authority-network-Bl2sJ_Sq.js",
  "/assets/DestinationVerifiedVisitorFacts-DsdmC2Dw.js",
  "/assets/BookingCarRentalCard-BtJO_4As.js",
  "/assets/DestinationViatorBooking-DzgY8zhJ.js",
  "/assets/town-authority-links-BTV8jAtI.js",
  "/assets/CityPassContextualCallout-zSFvIGcO.js",
  "/assets/CityPassCalloutContent-YecoYaOL.js",
  "/assets/TexasExplainedContextLinks-CX8yFupy.js",
  "/assets/TexasEventCarousel-Bjl-TKRv.js",
  "/assets/sports-traffic.functions-BM-ItR2d.js",
  "/assets/useSuspenseQuery-LwAPVdI7.js",
  "/assets/PropertyCalculatorFramework-BfNaFZpi.js",
  "/assets/AnswerSummary-ClpRNP9w.js",
  "/assets/texas-home-insurance-calculator.lazy-B-Cusmus.js"
];
  for (const path of observed) assert.equal(safeCriticalAsset(path), true, path);
  for (const path of ['/assets/not-a-verified-family-AbC1234.js', '/assets/../secret-AbC1234.js',
    'https://other.example/assets/ArticleCard-OgqXjgNN.js']) assert.equal(safeCriticalAsset(path), false, path);
});

test('current-build duplicate hashes do not consume 384 old-binary retention slots', async () => {
  const tmp = mkdtempSync(join(tmpdir(), 'td-retention-budget-'));
  try {
    const assetFolder = join(tmp, 'assets');
    const snapshotPath = join(tmp, 'snapshot.json');
    const reportPath = join(tmp, 'report.json');
    mkdirSync(assetFolder, { recursive: true });
    const body = 'export const previousVersionStillAvailable = true;';
    const digest = createHash('sha256').update(body).digest('hex');
    const now = Date.parse('2026-11-02T17:00:00.000Z');
    const at = new Date(now - 1000).toISOString();
    const built = Array.from({ length: 384 }, (_, i) =>
      '/assets/main-Built' + String(i).padStart(3, '0') + '.js');
    for (const name of built) writeFileSync(join(assetFolder, name.split('/').at(-1)), 'current build');
    const old = '/assets/ArticleCard-PreviousVersion123.js';
    const assets = [...built, old].map(path => ({ path, wasAvailable: true,
      preSha256: digest, firstSeenAt: at }));
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{ format: 1,
      capturedAt: at, pages: [{ path: '/', assets }] }] }));
    const called = [];
    const result = await retain({ snapshotPath, reportPath, assetFolder, now,
      fetchImpl: async url => {
        called.push(url);
        return new Response(body, { status: 200, headers: { 'Content-Type': 'text/javascript' } });
      } });
    assert.deepEqual(called, ['https://texasdefined.com' + old]);
    assert.equal(result.retainedCount, 1);
    assert.equal(result.inspected, 1);
    assert.equal(result.alreadyInBuild.length, 384);
    assert.equal(result.ignoredOld, 0);
    assert.equal(readFileSync(join(assetFolder, 'ArticleCard-PreviousVersion123.js'), 'utf8'), body);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('old-only transfer attempts stop at 384 and block deployment if eligible hashes are omitted', async () => {
  const tmp = mkdtempSync(join(tmpdir(), 'td-retention-hard-cap-'));
  try {
    const assetFolder = join(tmp, 'assets');
    const snapshotPath = join(tmp, 'snapshot.json');
    const reportPath = join(tmp, 'report.json');
    const body = 'export const retainedOld = 1;';
    const digest = createHash('sha256').update(body).digest('hex');
    const now = Date.parse('2026-11-02T17:00:00.000Z');
    const at = new Date(now - 1000).toISOString();
    const assets = Array.from({ length: 387 }, (_, i) => ({
      path: '/assets/ArticleCard-Historical' + String(i).padStart(3, '0') + '.js',
      wasAvailable: true, preSha256: digest, firstSeenAt: at,
    }));
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{ format: 1,
      capturedAt: at, pages: [{ path: '/', assets }] }] }));
    let requests = 0;
    await assert.rejects(() => retain({ snapshotPath, reportPath, assetFolder, now,
      fetchImpl: async () => {
        requests++;
        return new Response(body, { status: 200, headers: { 'Content-Type': 'text/javascript' } });
      } }), /Old-only asset retention cap exceeded: 3/);
    const report = JSON.parse(readFileSync(reportPath, 'utf8'));
    assert.equal(requests, 384);
    assert.equal(report.inspected, 384);
    assert.equal(report.retainedCount, 384);
    assert.equal(report.ignoredOld, 3);
    assert.deepEqual(new Set(report.ignoredOldPaths), new Set([
      '/assets/ArticleCard-Historical384.js',
      '/assets/ArticleCard-Historical385.js',
      '/assets/ArticleCard-Historical386.js',
    ]));
    assert.equal(report.unavailable.length, 0);
    assert.ok(report.bytes < 24 * 1024 * 1024);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('Nov2 current search-crawler missing metro/map import paths are safe eligible hashes', () => {
  const observed = [
  "/assets/MapPreview-B9_3N0vq.js",
  "/assets/dallas-small-town-drives-CoKJb-D-.js",
  "/assets/explore.near._metro._collection.lazy-Bu6boA-B.js",
  "/assets/explore.near._metro.lazy-ADqGB_m8.js",
  "/assets/explore.near._metro._collection-HAHNflr3.js",
  "/assets/explore.near._metro-BsxC36wI.js"
];
  for (const path of observed) assert.equal(safeCriticalAsset(path), true, path);
  assert.equal(safeCriticalAsset('/assets/explore.near._metro._collection.lazy-OLD.js?token=1'), false);
  assert.equal(safeCriticalAsset('/assets/../internal-SECRET.js'), false);
});
