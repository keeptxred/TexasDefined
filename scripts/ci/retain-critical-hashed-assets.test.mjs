import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { expectedAssetResponse, retain, retentionCandidates, safeCriticalAsset } from './retain-critical-hashed-assets.mjs';
import { INCIDENT_OMITTED_PROOFS, INCIDENT_FIRST_SEEN } from './incident-omitted-hashed-assets-20261102.mjs';

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
    // Three observed Nov 2 Bingbot HTTP404s: only original healthy bytes may be retained.
    '/assets/CountyTaxRateSection-BJBHgsSN.js',
    '/assets/PublishableGraphic-DgFKoNsV.js',
    '/assets/_kind._slug.lazy-Ba1uajBm.js',
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
  for (const path of ['/assets/_config-private-ABCDEFGH.js', '/assets/_kind._slug.lazy-../../secret.js',
    '/assets/main-A.js?cachebust=1', '/assets/../../secrets.js',
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
    const result = await retain({ historicalProof: [], snapshotPath, reportPath, assetFolder, now, fetchImpl: async url => {
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
    await assert.rejects(() => retain({ historicalProof: [], snapshotPath, assetFolder: join(temp,'client','assets'),
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
  "/assets/PropertyCalculatorFramework-BfNaFZpi.js",
  "/assets/AnswerSummary-ClpRNP9w.js",
  "/assets/texas-home-insurance-calculator.lazy-B-Cusmus.js"
];
  for (const path of observed) assert.equal(safeCriticalAsset(path), true, path);
  for (const path of ['/assets/not-a-verified-family-AbC1234.js', '/assets/../secret-AbC1234.js',
    'https://other.example/assets/ArticleCard-OgqXjgNN.js']) assert.equal(safeCriticalAsset(path), false, path);
});

test('current-build duplicate hashes do not consume bounded old-binary retention slots', async () => {
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
    const built = Array.from({ length: 448 }, (_, i) =>
      '/assets/main-Built' + String(i).padStart(3, '0') + '.js');
    for (const name of built) writeFileSync(join(assetFolder, name.split('/').at(-1)), body);
    const old = '/assets/ArticleCard-PreviousVersion123.js';
    const assets = [...built, old].map(path => ({ path, wasAvailable: true,
      preSha256: digest, firstSeenAt: at }));
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{ format: 1,
      capturedAt: at, pages: [{ path: '/', assets }] }] }));
    const called = [];
    const result = await retain({ historicalProof: [], snapshotPath, reportPath, assetFolder, now,
      fetchImpl: async url => {
        called.push(url);
        return new Response(body, { status: 200, headers: { 'Content-Type': 'text/javascript' } });
      } });
    assert.deepEqual(called, ['https://texasdefined.com' + old]);
    assert.equal(result.retainedCount, 1);
    assert.equal(result.inspected, 1);
    assert.equal(result.alreadyInBuild.length, 448);
    assert.equal(result.ignoredOld, 0);
    assert.equal(readFileSync(join(assetFolder, 'ArticleCard-PreviousVersion123.js'), 'utf8'), body);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('old-only transfer attempts stop at 3072 and block deployment if eligible hashes are omitted', async () => {
  const tmp = mkdtempSync(join(tmpdir(), 'td-retention-hard-cap-'));
  try {
    const assetFolder = join(tmp, 'assets');
    const snapshotPath = join(tmp, 'snapshot.json');
    const reportPath = join(tmp, 'report.json');
    const body = 'export const retainedOld = 1;';
    const digest = createHash('sha256').update(body).digest('hex');
    const now = Date.parse('2026-11-02T17:00:00.000Z');
    const at = new Date(now - 1000).toISOString();
    const assets = Array.from({ length: 3075 }, (_, i) => ({
      path: '/assets/ArticleCard-Historical' + String(i).padStart(4, '0') + '.js',
      wasAvailable: true, preSha256: digest, firstSeenAt: at,
    }));
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{ format: 1,
      capturedAt: at, pages: [{ path: '/', assets }] }] }));
    let requests = 0;
    await assert.rejects(() => retain({ historicalProof: [], snapshotPath, reportPath, assetFolder, now,
      fetchImpl: async () => {
        requests++;
        return new Response(body, { status: 200, headers: { 'Content-Type': 'text/javascript' } });
      } }), /Old-only asset retention cap exceeded: 3/);
    const report = JSON.parse(readFileSync(reportPath, 'utf8'));
    assert.equal(requests, 3072);
    assert.equal(report.inspected, 3072);
    assert.equal(report.retainedCount, 3072);
    assert.equal(report.ignoredOld, 3);
    assert.deepEqual(new Set(report.ignoredOldPaths), new Set([
      '/assets/ArticleCard-Historical3072.js',
      '/assets/ArticleCard-Historical3073.js',
      '/assets/ArticleCard-Historical3074.js',
    ]));
    assert.equal(report.unavailable.length, 0);
    assert.ok(report.bytes < 64 * 1024 * 1024);
    const failedSnapshot = JSON.parse(readFileSync(snapshotPath, 'utf8')).snapshots.at(-1);
    assert.equal(failedSnapshot.omittedAssets.length, 3);
    // The next production recovery often restores only the newest snapshot.
    // Its list of retained copies must NOT erase omitted, originally healthy paths.
    const recovery = retentionCandidates({ snapshots: [{
      capturedAt: failedSnapshot.capturedAt,
      pages: [],
      retainedAssets: failedSnapshot.retainedAssets,
      omittedAssets: failedSnapshot.omittedAssets,
    }] }, now);
    assert.equal(recovery.length, 3075);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('1091 observed old-only hashes fit the measured finite 192 MiB budget with original SHA checks', async () => {
  const tmp = mkdtempSync(join(tmpdir(), 'td-retention-1091-proofs-'));
  try {
    const assetFolder = join(tmp, 'assets');
    const snapshotPath = join(tmp, 'snapshot.json');
    const reportPath = join(tmp, 'report.json');
    const now = Date.parse('2026-11-05T16:40:00Z');
    const at = new Date(now - 1000).toISOString();
    const count = 1091;
    // Nov 5 deployment proved 1,024 old-only hashes were 56.35 MB; 67 more
    // healthy hashes were excluded solely by the old count cap.
    // Model 1,091 unique SHA-verified originals, not generated substitutes.
    const payload = index => {
      const body = Buffer.alloc(56_400, 65);
      body.writeUInt32BE(index, 0);
      return body;
    };
    const assets = Array.from({ length: count }, (_, index) => ({
      path: '/assets/ArticleCard-Verified' + String(index).padStart(4, '0') + '.js',
      wasAvailable: true, preSha256: createHash('sha256').update(payload(index)).digest('hex'),
      firstSeenAt: at,
    }));
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{
      capturedAt: at, pages: [{ path: '/', assets }],
    }] }));
    let requests = 0;
    const report = await retain({ historicalProof: [], snapshotPath, reportPath, assetFolder, now,
      fetchImpl: async url => {
        requests++;
        const match = url.match(/ArticleCard-Verified(\d{4})\.js$/);
        assert.ok(match, 'retention fetched an unexpected URL');
        return new Response(payload(Number(match[1])), {
          status: 200, headers: { 'Content-Type': 'text/javascript' },
        });
      },
    });
    assert.equal(requests, count);
    assert.equal(report.retainedCount, count);
    assert.equal(report.ignoredOld, 0);
    assert.equal(report.unavailable.length, 0);
    assert.equal(report.budget.maxFiles, 3072);
    assert.equal(report.budget.maxBytes, 192 * 1024 * 1024);
    assert.equal(report.bytes, count * 56_400);
    assert.ok(report.bytes < report.budget.maxBytes);
    assert.equal(JSON.parse(readFileSync(snapshotPath, 'utf8')).snapshots[0].omittedAssets.length, 0);
  } finally { rmSync(tmp, { recursive: true, force: true }); }
});

test('Nov 5 observed old-only main-chunk bytes above 48 MiB are fully preserved inside bounded 64 MiB', async () => {
  const tmp = mkdtempSync(join(tmpdir(), 'td-retention-observed-byte-cap-'));
  try {
    const now = Date.parse('2026-11-05T18:37:12.000Z');
    const at = new Date(now - 1000).toISOString();
    const bytesPerMain = 1_825_890;
    const assetFolder = join(tmp, 'assets');
    const snapshotPath = join(tmp, 'snapshot.json');
    const reportPath = join(tmp, 'report.json');
    const payload = index => {
      const bytes = Buffer.alloc(bytesPerMain, 65);
      bytes.writeUInt32BE(index, 0);
      return bytes;
    };
    const assets = Array.from({ length: 28 }, (_, index) => ({
      path: '/assets/main-Observed' + String(index).padStart(3, '0') + '.js',
      wasAvailable: true,
      preSha256: createHash('sha256').update(payload(index)).digest('hex'),
      firstSeenAt: at,
    }));
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{ capturedAt: at,
      pages: [{ path: '/', assets }] }] }));
    let requests = 0;
    const report = await retain({ historicalProof: [], snapshotPath, reportPath,
      assetFolder, now, fetchImpl: async url => {
        requests++;
        const match = url.match(/main-Observed(\d{3})\.js$/);
        assert.ok(match, 'only proven same-origin chunks may be fetched');
        return new Response(payload(Number(match[1])), {
          status: 200, headers: { 'Content-Type': 'application/javascript' },
        });
      } });
    assert.equal(requests, 28);
    assert.equal(report.retainedCount, 28);
    assert.equal(report.bytes, 28 * bytesPerMain);
    assert.ok(report.bytes > 48 * 1024 * 1024);
    assert.ok(report.bytes < 64 * 1024 * 1024);
    assert.equal(report.ignoredOld, 0);
    assert.equal(report.unavailable.length, 0);
    assert.equal(JSON.parse(readFileSync(snapshotPath, 'utf8')).snapshots[0].omittedAssets.length, 0);
  } finally { rmSync(tmp, { recursive: true, force: true }); }
});

test('verified 72-hour assets exceeding capacity still fail closed at the 192 MiB hard ceiling', async () => {
  const tmp = mkdtempSync(join(tmpdir(), 'td-retention-capacity-'));
  try {
    const assetFolder = join(tmp, 'assets');
    const snapshotPath = join(tmp, 'snapshot.json');
    const reportPath = join(tmp, 'report.json');
    const now = Date.parse('2026-11-04T01:05:00.000Z');
    const at = new Date(now - 1000).toISOString();
    const bytesPerMain = 1_825_890; // actual rejected Nov 4 main-chunk size
    const makePayload = index => {
      const bytes = Buffer.alloc(bytesPerMain, 65);
      bytes.writeUInt32BE(index, 0);
      return bytes;
    };
    const assets = Array.from({ length: 112 }, (_, index) => ({
      path: '/assets/main-Verified' + String(index).padStart(3, '0') + '.js',
      wasAvailable: true,
      preSha256: createHash('sha256').update(makePayload(index)).digest('hex'),
      firstSeenAt: at,
    }));
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{
      capturedAt: at, pages: [{ path: '/', assets }],
    }] }));
    let requests = 0;
    await assert.rejects(() => retain({
      historicalProof: [], snapshotPath, reportPath, assetFolder, now,
      fetchImpl: async url => {
        requests++;
        const match = url.match(/main-Verified(\d{3})\.js$/);
        assert.ok(match, 'no unexpected external asset may be fetched');
        return new Response(makePayload(Number(match[1])), {
          status: 200, headers: { 'Content-Type': 'text/javascript' },
        });
      },
    }), /Retained client asset size budget exceeded/);
    // Every matching original SHA remains mandatory; we increase finite capacity,
    // never silently skip a 72-hour URL or disable the over-budget failure.
    const report = JSON.parse(readFileSync(reportPath, 'utf8'));
    assert.equal(report.budget.maxFiles, 3072);
    assert.equal(report.budget.maxBytes, 192 * 1024 * 1024);
    assert.equal(report.retainedCount, 110);
    assert.equal(requests, 111);
    assert.equal(report.bytes, 110 * bytesPerMain);
    assert.ok(report.bytes > 24 * 1024 * 1024);
    assert.ok(report.bytes <= report.budget.maxBytes);
    assert.equal(report.failure.reason, 'retained-client-asset-size-budget-exceeded');
    assert.equal(report.failure.path, '/assets/main-Verified110.js');
    assert.ok(report.failure.attemptedTotalBytes > report.budget.maxBytes);
    assert.equal(JSON.parse(readFileSync(snapshotPath, 'utf8')).snapshots[0].omittedAssets.length, 1);
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


test('identical hashed URL cannot conceal different current-build bytes', async () => {
  const temp = mkdtempSync(join(tmpdir(), 'td-current-hash-collision-'));
  try {
    const now = Date.parse('2026-11-02T21:00:00Z');
    const path = '/assets/main-ImmutableHashA1.js';
    const expectedBody = 'export const v = 1;';
    const snapshotPath = join(temp, 'snapshot.json');
    const folder = join(temp, 'assets');
    mkdirSync(folder, { recursive: true });
    writeFileSync(join(folder, 'main-ImmutableHashA1.js'), 'export const v = 2;');
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{
      capturedAt: new Date(now - 1000).toISOString(),
      pages: [{ assets: [{ path, wasAvailable: true,
        preSha256: createHash('sha256').update(expectedBody).digest('hex') }] }],
    }] }));
    await assert.rejects(retain({ historicalProof: [], snapshotPath, assetFolder: folder,
      reportPath: join(temp, 'report.json'), now,
      fetchImpl: async () => { throw Error('Must not fetch duplicate current path'); } }),
      /Current-build asset changed under identical hashed filename/);
  } finally { rmSync(temp, { recursive: true, force: true }); }
});

test('seven rapid releases can exceed the old-only cap without refreshing first-seen timestamps', () => {
  const start = Date.parse('2026-11-02T20:00:00Z');
  const snapshots = [];
  for (let release = 0; release < 7; release++) {
    const capturedAt = new Date(start + release * 10 * 60_000).toISOString();
    const assets = Array.from({ length: 69 }, (_, chunk) => {
      const path = '/assets/main-' + String(release).padStart(3, '0') +
        String(chunk).padStart(3, '0') + '.js';
      return { path, wasAvailable: true,
        preSha256: createHash('sha256').update(path).digest('hex'),
        firstSeenAt: capturedAt };
    });
    snapshots.push({ capturedAt, pages: [{ path: '/', assets }] });
  }
  // Re-observing the same hashed filename must not make it younger.
  snapshots.at(-1).pages[0].assets.push({
    ...snapshots[0].pages[0].assets[0],
    firstSeenAt: snapshots.at(-1).capturedAt,
  });
  const assets = retentionCandidates({ snapshots }, start + 70 * 60_000);
  assert.equal(assets.length, 483);
  assert.equal(assets.find(x => x.path === '/assets/main-000000.js').firstSeenAt,
    snapshots[0].capturedAt);
  assert.ok(assets.length > 448, 'existing safe limit must reveal a real multi-release deadlock');
});


test('Nov 2 production omission incident remains fail-closed on next deployment', () => {
  assert.equal(INCIDENT_OMITTED_PROOFS.length, 27);
  assert.equal(new Set(INCIDENT_OMITTED_PROOFS.map(x => x.path)).size, 27);
  for (const asset of INCIDENT_OMITTED_PROOFS) {
    assert.ok(safeCriticalAsset(asset.path));
    assert.match(asset.preSha256, /^[a-f0-9]{64}$/);
    assert.equal(asset.firstSeenAt, INCIDENT_FIRST_SEEN);
    assert.equal(asset.wasAvailable, true);
  }
  const beforeExpiry = Date.parse('2026-11-03T04:43:58.532Z');
  assert.equal(retentionCandidates({ snapshots: [] }, beforeExpiry,
    INCIDENT_OMITTED_PROOFS).length, 27);
  const afterExpiry = Date.parse(INCIDENT_FIRST_SEEN) + 72 * 60 * 60 * 1000 + 1;
  assert.equal(retentionCandidates({ snapshots: [] }, afterExpiry,
    INCIDENT_OMITTED_PROOFS).length, 0);
});


test('retention byte-cap failure persists parseable JSON diagnostics', async () => {
  const temp = mkdtempSync(join(tmpdir(), 'td-retention-failure-json-'));
  try {
    const body = 'x'.repeat(2 * 1024 * 1024 + 1);
    const digest = createHash('sha256').update(body).digest('hex');
    const snapshotPath = join(temp, 'snapshot.json');
    const reportPath = join(temp, 'report.json');
    writeFileSync(snapshotPath, JSON.stringify({ snapshots: [{
      capturedAt: new Date().toISOString(),
      pages: [{ assets: [{ path: '/assets/main-TooLarge.js',
        wasAvailable: true, preSha256: digest }] }],
    }] }));
    await assert.rejects(() => retain({ historicalProof: [], snapshotPath, reportPath,
      assetFolder: join(temp, 'assets'), fetchImpl: async () => new Response(body, {
        status: 200, headers: { 'Content-Type': 'application/javascript' },
      }) }), /Retained client asset size budget exceeded/);
    const report = JSON.parse(readFileSync(reportPath, 'utf8'));
    const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'));
    assert.equal(report.failure.reason, 'retained-client-asset-size-budget-exceeded');
    assert.equal(report.failure.path, '/assets/main-TooLarge.js');
    assert.equal(snapshot.snapshots.at(-1).omittedAssets.length, 1);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});

test('unavailable previously healthy original blocks deployment and preserves its proof',async()=>{
  const tmp=mkdtempSync(join(tmpdir(),'td-asset-unavailable-'));
  try {
    const snapshotPath=join(tmp,'snap.json'),reportPath=join(tmp,'retention.json');
    const now=Date.parse('2026-11-06T02:20:00Z');
    const at=new Date(now-1000).toISOString();
    const body=Buffer.from('verified-old-original');
    const digest=createHash('sha256').update(body).digest('hex');
    const ok='/assets/main-Healthy1234.js',missing='/assets/main-Missing1234.js';
    writeFileSync(snapshotPath,JSON.stringify({snapshots:[{
      capturedAt:at,pages:[{path:'/',assets:[ok,missing].map(path=>({
        path,wasAvailable:true,preSha256:digest,firstSeenAt:at,
      }))}],
    }]}));
    await assert.rejects(retain({historicalProof:[],snapshotPath,reportPath,
      assetFolder:join(tmp,'assets'),now,
      fetchImpl:async url=>url.endsWith(missing)?
        new Response('Not Found',{status:404,headers:{'content-type':'text/html'}}):
        new Response(body,{status:200,headers:{'content-type':'text/javascript'}}),
    }),/Previously healthy in-window old assets are now unavailable/);
    const report=JSON.parse(readFileSync(reportPath,'utf8'));
    assert.equal(report.failure.reason,'previously-healthy-asset-unavailable');
    assert.equal(report.unavailable.length,1);
    assert.equal(report.unavailable[0].path,missing);
    assert.equal(report.copied.length,1);
    assert.equal(report.ignoredOld,0);
    assert.equal(report.capacity.remainingOldFileSlots,3070);
    assert.equal(report.budget.maxFiles,3072);
    assert.equal(report.budget.maxBytes,192*1024*1024);
    const snapshot=JSON.parse(readFileSync(snapshotPath,'utf8')).snapshots.at(-1);
    assert.equal(snapshot.omittedAssets.length,1);
    assert.equal(snapshot.omittedAssets[0].path,missing);
    assert.equal(snapshot.omittedAssets[0].preSha256,digest);
    assert.equal(snapshot.omittedAssets[0].firstSeenAt,at);
  }finally{rmSync(tmp,{recursive:true,force:true});}
});

test('global first-seen evidence prevents 72h assets being re-aged by later HTML',()=>{
  const now=Date.parse('2026-11-06T06:00:00Z');
  const first=new Date(now-4*86400000).toISOString();
  const fresh=new Date(now-1000).toISOString();
  const path='/assets/main-CannotReage123.js';
  const record=at=>({path,wasAvailable:true,preSha256:hash,firstSeenAt:at});
  const history={snapshots:[
    {capturedAt:first,pages:[{assets:[record(first)]}]},
    {capturedAt:fresh,pages:[{assets:[record(fresh)]}],retainedAssets:[record(fresh)]},
  ]};
  assert.deepEqual(retentionCandidates(history,now),[]);
  const ledger=retentionCandidates(history,now,[],{includeExpired:true});
  assert.equal(ledger.length,1);
  assert.equal(ledger[0].firstSeenAt,first);
  assert.equal(ledger[0].preSha256,hash);
});

test('automatic 72h cleanup excludes expired old-only JS while keeping current build assets',async()=>{
  const root=mkdtempSync(join(tmpdir(),'td-expired-hash-prune-'));
  try {
    const now=Date.parse('2026-11-06T06:00:00Z');
    const first=new Date(now-73*60*60*1000).toISOString();
    const fresh=new Date(now-30*60*1000).toISOString();
    const old='/assets/main-ExpiredOriginal123.js';
    const current='/assets/main-CurrentBuild123.js';
    const live='/assets/main-FreshOriginal123.js';
    const bytes='export const verified=true';
    const digest=createHash('sha256').update(bytes).digest('hex');
    const item=(path,time)=>({path,wasAvailable:true,preSha256:digest,firstSeenAt:time});
    const snapshotPath=join(root,'snapshot.json');
    const reportPath=join(root,'report.json'),assetFolder=join(root,'assets');
    mkdirSync(assetFolder);
    writeFileSync(join(assetFolder,current.split('/').at(-1)),bytes);
    writeFileSync(snapshotPath,JSON.stringify({snapshots:[
      {capturedAt:first,pages:[{assets:[item(old,first),item(current,first)]}]},
      {capturedAt:fresh,pages:[{assets:[item(old,fresh),item(current,fresh),item(live,fresh)]}]},
    ]}));
    const requests=[];
    const result=await retain({snapshotPath,reportPath,assetFolder,now,historicalProof:[],
      fetchImpl:async url=>{
        requests.push(url);
        return new Response(bytes,{status:200,headers:{'content-type':'text/javascript'}});
      }});
    assert.deepEqual(requests,['https://texasdefined.com'+live]);
    assert.equal(result.expiredOriginalCount,2);
    assert.equal(result.expiredOldCopyCount,1);
    assert.deepEqual(result.expiredOldCopyPaths,[old]);
    assert.equal(existsSync(join(assetFolder,old.split('/').at(-1))),false);
    assert.equal(existsSync(join(assetFolder,current.split('/').at(-1))),true);
    assert.equal(result.retainedCount,1);
    assert.equal(result.unavailable.length,0);
    const persisted=JSON.parse(readFileSync(reportPath,'utf8'));
    assert.equal(persisted.expiredOldCopyCount,1);
    assert.equal(persisted.ignoredOld,0);
    assert.deepEqual(JSON.parse(readFileSync(snapshotPath,'utf8')).snapshots.at(-1).retainedAssets.map(x=>x.path),[live]);
  }finally{rmSync(root,{recursive:true,force:true});}
});

test('72h boundary is inclusive but 72h plus one millisecond expires',()=>{
  const now=Date.parse('2026-11-06T06:00:00Z');
  const path='/assets/main-ExpiryBoundary123.js';
  const item={path,wasAvailable:true,preSha256:hash,
    firstSeenAt:new Date(now-72*3600000).toISOString()};
  const history={snapshots:[{capturedAt:new Date(now).toISOString(),
    pages:[{assets:[item]}]}]};
  assert.equal(retentionCandidates(history,now).length,1);
  assert.equal(retentionCandidates(history,now+1).length,0);
});
