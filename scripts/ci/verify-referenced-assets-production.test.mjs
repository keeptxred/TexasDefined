import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { MAX_ASSET_AUDIT_CONCURRENCY, MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN, assertBoundedCrossReleaseSet, mapBounded, retryOneTransportTimeout, nextSnapshotHistory, referencesFromHtml, selectBuiltRouteAssets, validAssetResponse } from './verify-referenced-assets-production.mjs';

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

test('discover event and food lazy-route hashes observed missing for Microsoft search crawler', () => {
  const files = [
    'texas-high-school-football-teams_._slug.lazy-A1.js',
    'property-tax.taxing-unit._unit-B2.js',
    'events.lazy-C3.js',
    'events._collection.lazy-D4.js',
    'food._slug.lazy-E5.js',
    'another-unrelated.lazy-Z9.js',
  ];
  assert.deepEqual(selectBuiltRouteAssets(files).map(x => x.path), [
    '/assets/texas-high-school-football-teams_._slug.lazy-A1.js',
    '/assets/property-tax.taxing-unit._unit-B2.js',
    '/assets/events.lazy-C3.js',
    '/assets/events._collection.lazy-D4.js',
    '/assets/food._slug.lazy-E5.js',
  ]);
  // Unemitted optional chunks are not fabricated into a deployment.
  assert.equal(selectBuiltRouteAssets(files.slice(0, 2)).length, 2);
  assert.deepEqual(selectBuiltRouteAssets([...files, 'food._slug.lazy-DUPLICATE.js'])
    .map(x => x.path).filter(x => x.includes('/food._slug.lazy-')), [
      '/assets/food._slug.lazy-DUPLICATE.js',
      '/assets/food._slug.lazy-E5.js',
    ], 'legitimate multiple Vite outputs within one optional route family stay covered');
  assert.throws(() => selectBuiltRouteAssets([...files, ...Array.from({length: 9},
    (_, i) => 'food._slug.lazy-OVERFLOW' + i + '.js')]),
    /at most eight distinct/, 'unbounded optional route family must fail closed');
  assert.throws(() => selectBuiltRouteAssets([...files, 'food._slug.lazy-E5.js']),
    /at most eight distinct/, 'same exact filename duplicated must fail closed');
});

test('handoff discovers actual generated district and sports dependency chunks', () => {
  const required = [
    'texas-high-school-football-teams_._slug.lazy-A1.js',
    'property-tax.taxing-unit._unit-B2.js',
  ];
  const observed = [
    'texas-high-school-football-districts_._slug.lazy-LUNlVWLt.js',
    'texas-high-school-football-districts.lazy-qUVgGBGS.js',
    'useLocation-BggeWcAi.js',
    'SponsoredSportsPlacement-VM9ICMMH.js',
    'createLucideIcon-yBqUUiDC.js',
    'ContextualOfficialSources-CoOaVWuv.js',
    'CitationTrustPanel-BF2Efeia.js',
    'CitationCollectionTrustRouter-CQsMd_7t.js',
    'analytics-aWB69Ydr.js',
  ];
  assert.deepEqual(selectBuiltRouteAssets([...required, ...observed]).map(x => x.path).slice(2),
    observed.map(x => '/assets/' + x));
  assert.equal(selectBuiltRouteAssets(required).length, 2, 'do not create fictitious old hashes');
});

test('discover observed old major article, destination, sports and discovery JS families', () => {
  const base = [
    'texas-high-school-football-teams_._slug.lazy-BASE.js',
    'property-tax.taxing-unit._unit-BASE.js',
  ];
  const historical = [
    'article._slug-Bo6h8g51.js',
    'destination._slug-CyHpA01o.js',
    'events.index.lazy-Bv3IVzKY.js',
    'explore.index.lazy-CDks8Iov.js',
    'search.lazy-DOdUUwCn.js',
    'fishing.lakes._slug-bnM1eCOw.js',
    'texas-high-school-football-playoff-brackets-BG2nCdNx.js',
    'MuseumAuthorityNetworkSection-DMbCzSMq.js',
    'museum-authority-heroes-DChJMGcZ.js',
    'texas-data.lazy-Bmna2q7H.js',
  ];
  const selected = selectBuiltRouteAssets([...base, ...historical]);
  assert.deepEqual(selected.slice(2).map(a => a.path), historical.map(name => '/assets/' + name));
  assert.equal(selectBuiltRouteAssets(base).length, 2, 'optional unbuilt chunks must not be fabricated');
});

test('observed Bing calculator and answer modules are included only when emitted', () => {
  const required = [
    'texas-high-school-football-teams_._slug.lazy-BASE.js',
    'property-tax.taxing-unit._unit-BASE.js',
  ];
  const observed = [
    'PropertyCalculatorFramework-BfNaFZpi.js',
    'AnswerSummary-ClpRNP9w.js',
    'texas-home-insurance-calculator.lazy-B-Cusmus.js',
  ];
  const selected = selectBuiltRouteAssets([...required, ...observed]).map(x => x.path);
  for (const name of observed) assert.ok(selected.includes('/assets/' + name), name);
  assert.equal(selectBuiltRouteAssets(required).length, 2, 'missing optional files must not be fabricated');
});

test('production build may emit two distinct article route chunks and both must be checked', () => {
  const files = [
    'texas-high-school-football-teams_._slug.lazy-ONE.js',
    'property-tax.taxing-unit._unit-TWO.js',
    'article._slug-EAST.js',
    'article._slug-WEST.js',
  ];
  assert.deepEqual(selectBuiltRouteAssets(files).slice(2).map(x => x.path), [
    '/assets/article._slug-EAST.js',
    '/assets/article._slug-WEST.js',
  ]);
  assert.throws(() => selectBuiltRouteAssets([...files,
    'property-tax.taxing-unit._unit-ANOTHER.js']),
    /Expected exactly one production client chunk/);
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

test('Nov 2 observed Meta/Bing chunks enter bounded predeploy handoff when emitted', () => {
  const required = ['texas-high-school-football-teams_._slug.lazy-Test1234.js',
    'property-tax.taxing-unit._unit-Test1234.js'];
  const observed = [
  "external-link-DASm7Sot.js",
  "useBaseQuery-DAwRZeNC.js",
  "DestinationCard-CogOLLKC.js",
  "useQuery-6nTz4IUX.js",
  "SectionHeader-Do5UIIvo.js",
  "FootballFanOffers-DXCuhNe8.js",
  "ElPasoAreaAuthority-D_3Wtymp.js",
  "internal-linking-Dmlhp8ZR.js",
  "ArticleCard-OgqXjgNN.js",
  "UnusualBusinessAuthorityPanel-oTnuUrSP.js",
  "ArticleBody-Dfj6eFOG.js",
  "ParkingMapPanel-BZAeEgAI.js",
  "event._slug.lazy-JE-wjs_e.js",
  "shop.lazy-tGIKuzrC.js",
  "shop.product._productId-BUYhfVVT.js",
  "historic-sites-Dw2IKh_M.js",
  "museum-authority-network-Bl2sJ_Sq.js",
  "DestinationVerifiedVisitorFacts-DsdmC2Dw.js",
  "BookingCarRentalCard-BtJO_4As.js",
  "DestinationViatorBooking-DzgY8zhJ.js",
  "town-authority-links-BTV8jAtI.js",
  "CityPassContextualCallout-zSFvIGcO.js",
  "CityPassCalloutContent-YecoYaOL.js",
  "TexasExplainedContextLinks-CX8yFupy.js",
  "TexasEventCarousel-Bjl-TKRv.js",
  "sports-traffic.functions-BM-ItR2d.js"
];
  const selected = selectBuiltRouteAssets([...required, ...observed]).map(asset => asset.path);
  for (const name of observed) assert.equal(selected.includes('/assets/' + name), true, name);
  assert.equal(selected.length, observed.length + 2);
  const absent = selectBuiltRouteAssets(required).map(asset => asset.path);
  assert.equal(absent.length, 2, 'never fabricate absent old assets');
});

test('Nov2 current missing metro/map families are discovered only if Vite emitted them', () => {
  const required=['texas-high-school-football-teams_._slug.lazy-ONE.js','property-tax.taxing-unit._unit-TWO.js'];
  const observed = [
  "MapPreview-B9_3N0vq.js",
  "dallas-small-town-drives-CoKJb-D-.js",
  "explore.near._metro._collection.lazy-Bu6boA-B.js",
  "explore.near._metro.lazy-ADqGB_m8.js",
  "explore.near._metro._collection-HAHNflr3.js",
  "explore.near._metro-BsxC36wI.js"
];
  const found=selectBuiltRouteAssets([...required,...observed]).map(x=>x.path);
  for (const filename of observed) assert.ok(found.includes('/assets/'+filename),filename);
  assert.equal(selectBuiltRouteAssets(required).length,2);
});

test('full cross-release retention cohort is verified without sampling, with a finite per-origin bound', () => {
  const page = new Map(Array.from({ length: 80 }, (_, i) => ['/assets/entry-' + i + '.js', {kind:'js'}]));
  // Production retains up to two immutable hash generations and current emitted
  // lazy-route chunks; the previous 250 limit failed before a single HTTP probe.
  const retained = new Map([...page, ...Array.from({ length: 192 }, (_, i) =>
    ['/assets/old-' + i + '.js', {kind:'js', preSha256:'verified'}])]);
  const combined = new Map([...retained, ...Array.from({ length: 96 }, (_, i) =>
    ['/assets/built-' + i + '.js', {kind:'js', source:'built-lazy-route'}])]);
  assert.equal(combined.size, 368);
  assert.equal(assertBoundedCrossReleaseSet(combined), 368);
  assert.equal(combined.size, 368, 'the guard must not truncate any old or current asset');
  assert.equal(assertBoundedCrossReleaseSet(new Map(Array.from({length:MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN},
    (_, i) => ['/assets/test-' + i + '.js', {kind:'js'}]))), MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN);
  assert.throws(() => assertBoundedCrossReleaseSet(new Map(Array.from({length:MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN+1},
    (_, i) => ['/assets/test-' + i + '.js', {kind:'js'}]))),
    /Cross-release asset verification cap exceeded: 513 > 512; inspect retained-asset history, do not truncate/);
  assert.throws(() => assertBoundedCrossReleaseSet([]), /must be a Map/);
});

test('all 1,500 immutable originals are audited once in stable order and bounded concurrency',async()=>{
  const originals=Array.from({length:1500},(_,i)=>'/assets/Old-'+String(i).padStart(4,'0')+'.js');
  let concurrent=0,maxConcurrent=0;
  const visited=new Set();
  const result=await mapBounded(originals,MAX_ASSET_AUDIT_CONCURRENCY,async(path,index)=>{
    assert.equal(visited.has(path),false,'duplicate asset verification');
    visited.add(path);concurrent++;
    maxConcurrent=Math.max(maxConcurrent,concurrent);
    await new Promise(resolve=>setImmediate(resolve));
    concurrent--;
    return {path,index,ok:true};
  });
  assert.equal(result.length,1500);
  assert.equal(visited.size,1500);
  assert.ok(maxConcurrent<=6 && maxConcurrent>1);
  assert.deepEqual(result.map(x=>x.path),originals);
  await assert.rejects(mapBounded([],0,async()=>{}),/Invalid bounded/);
});

test('HTML probe retry permits exactly one transient transport timeout, never false acceptance',async()=>{
  let calls=0,pauses=0;
  const success=await retryOneTransportTimeout(async()=>{
    calls++;
    if(calls===1)throw Object.assign(new Error('transient timeout'),{name:'TimeoutError'});
    return {status:200,version:'expected-sha'};
  },async()=>{pauses++;});
  assert.deepEqual(success,{status:200,version:'expected-sha'});
  assert.equal(calls,2);
  assert.equal(pauses,1);
  calls=0;
  await assert.rejects(retryOneTransportTimeout(async()=>{
    calls++;throw Object.assign(new Error('still unavailable'),{name:'TimeoutError'});
  },async()=>{}),/still unavailable/);
  assert.equal(calls,2,'never loop endlessly on a failed source');
  calls=0;
  await assert.rejects(retryOneTransportTimeout(async()=>{
    calls++;throw new Error('wrong Worker SHA or HTTP 503 is not a network timeout');
  },async()=>{throw Error('must not pause');}),/wrong Worker SHA/);
  assert.equal(calls,1,'never retry a substantive release failure');
});
