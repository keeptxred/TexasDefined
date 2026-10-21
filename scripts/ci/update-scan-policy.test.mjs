import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { baselineFromLedger, buildChangePlan, REPRESENTATIVE_PATHS, PAGE_BUDGET } from './production-change-scope.mjs';
import { verifyChangedPages } from './verify-changed-production-pages.mjs';
import { createProductionPageFetch } from './reuse-production-page.mjs';
const policy = JSON.parse(readFileSync('scripts/ci/update-scan-policy.json', 'utf8'));
const text = file => readFileSync(file, 'utf8');
const head = 'a'.repeat(40), baseline = 'b'.repeat(40);

test('blanket deployment subscriptions and duplicate validation cannot return', () => {
  for (const name of policy.manualFeatureWorkflows) {
    const source = text(`.github/workflows/${name}.yml`);
    assert.doesNotMatch(source, /^  workflow_run:/m, name);
    assert.match(source, /^  workflow_dispatch:/m, name);
  }
  assert.deepEqual(policy.postDeployVerificationWorkflows, ['texasdefined-publication-production-smoke']);
  for (const name of policy.postDeployVerificationWorkflows) {
    const source = text(`.github/workflows/${name}.yml`);
    assert.match(source, /^  workflow_dispatch:/m, name);
    assert.match(source, /^  workflow_run:/m, name);
    assert.match(source, /^    workflows:\s*$/m, name);
    assert.match(source, /^      - Deploy TexasDefined production\s*$/m, name);
    assert.match(source, /^    types: \[completed\]\s*$/m, name);
    assert.match(source, /^    branches: \[main\]\s*$/m, name);
    assert.doesNotMatch(source, /^  (push|schedule):/m, name);
  }
  for (const name of policy.manualDiagnosticWorkflows) {
    const source = text(`.github/workflows/${name}.yml`);
    assert.doesNotMatch(source, /^  (push|pull_request|workflow_run|schedule):/m, name);
    assert.match(source, /^  workflow_dispatch:/m, name);
  }
  assert.doesNotMatch(text('.github/workflows/validate.yml'), /^  push:/m);
  assert.doesNotMatch(text('.github/workflows/site-quality-watchdog.yml'), /^  (push|pull_request):/m);
  assert.match(text('.github/workflows/site-quality-watchdog.yml'), /^  schedule:/m);
  const deploy = text('.github/workflows/deploy-production.yml');
  assert.doesNotMatch(deploy, /node scripts\/ci\/verify-production-surfaces.mjs/);
  for (const group of ['sports','foliage','discovery','events','financial','advertiser','images']) assert.ok(deploy.includes(`steps.change_scope.outputs.${group}`));
  for (const guard of ['verify-production-health.mjs','capture-active-worker-version.mjs','verified-worker-ledger.mjs record','verify-changed-production-pages.mjs']) assert.ok(deploy.includes(guard));
});

test('new water park registry rows receive four bounded route-specific production checks', () => {
  const file = 'src/data/texas-water-parks.ts';
  const wrap = records => 'export const texasWaterParks: WaterParkGuide[] = ' + JSON.stringify(records)
    + ';\nexport const texasWaterParksBySlug';
  const old = [{ slug: 'existing-park', name: 'Existing', setting: 'Outdoor', kind: 'Destination park' }];
  const added = [
    { slug: 'new-indoor', setting: 'Indoor', kind: 'Community water park' },
    { slug: 'new-resort', setting: 'Outdoor', kind: 'Resort water park' },
    { slug: 'new-lagoon', setting: 'Outdoor', kind: 'Inflatable lake water park' },
    { slug: 'new-aqua', setting: 'Outdoor', kind: 'Inflatable lake water park' },
  ];
  const plan = buildChangePlan({ baseline, head, changedFiles: [file],
    sources: { [file]: { before: wrap(old), after: wrap([...old, ...added]) } },
  });
  const paths = added.map(park => '/explore/water-parks/' + park.slug);
  assert.deepEqual(plan.expectedHrefsByPage['/explore/water-parks'], paths);
  for (const path of ['/explore/water-parks', ...paths]) assert.ok(plan.selectedPaths.includes(path));
  assert.equal(plan.omittedCount, 0);
  assert.ok(plan.selectedPaths.length <= PAGE_BUDGET);
});

test('workflow-only changes select no public pages or feature crawls', () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['.github/workflows/validate.yml'] });
  assert.deepEqual(plan.selectedPaths, []);
  assert.ok(Object.values(plan.groups).every(v => v === false));
});

test('one edited article selects that record, not its unchanged siblings', () => {
  const path = 'src/data/fixtures/lazy-core-articles.ts';
  const before = `const records = [{ slug: 'first-article', title: 'Old' }, { slug: 'second-article', title: 'Keep' }];`;
  const after = before.replace("title: 'Old'", "title: 'New'");
  const plan = buildChangePlan({ baseline, head, changedFiles: [path], sources: { [path]: { before, after } } });
  assert.deepEqual(plan.selectedPaths, ['/article/first-article']);
  assert.ok(Object.values(plan.groups).every(v => v === false));
});

test('statewide Mardi Gras hub must be live, indexable by default, and link to real guides on the visitor URL', async () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['src/routes/events.mardi-gras.tsx'] });
  assert.deepEqual(plan.mardiGrasHubPages, ['/events/mardi-gras']);
  assert.ok(plan.selectedPaths.includes('/events/mardi-gras'));
  assert.equal(plan.selectedPaths.length, 1);
  const guides = [
    '/event/mardi-gras-galveston',
    '/event/mardi-gras-port-arthur',
    '/event/cowboy-mardi-gras-bandera',
    '/event/kemah-yachty-gras',
  ];
  const html = (fresh = true) => '<html><head><title>Mardi Gras in Texas</title>'
    + '<link rel="canonical" href="https://texasdefined.com/events/mardi-gras"></head><body>'
    + (fresh ? '<h1>Mardi Gras in Texas</h1><p>2027 dates</p>'
        + guides.map(href => '<a href="' + href + '">Guide</a>').join('') : '<p>Stale listing 2027</p>')
    + '</body></html>';
  const requests = [];
  const good = await verifyChangedPages({ plan, head, fetchImpl: async url => {
    requests.push(url.href);
    return new Response(html());
  } });
  assert.equal(good.length, 1);
  assert.equal(good[0].passed, true, JSON.stringify(good));
  assert.ok(requests.includes('https://texasdefined.com/events/mardi-gras'), 'must verify exact visitor URL');
  const stale = await verifyChangedPages({ plan, head, fetchImpl: async url =>
    new Response(html(url.searchParams.has('deploy_smoke'))) });
  assert.equal(stale[0].passed, false);
  assert.match(stale[0].error, /Mardi Gras hub ordinary visitor URL lacks live guide/);
  const broken = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(false)) });
  assert.equal(broken[0].passed, false);
  assert.match(broken[0].error, /Mardi Gras hub release lacks live guide/);
  const deindexed = await verifyChangedPages({ plan, head, fetchImpl: async () =>
    new Response(html().replace('</head>', '<meta name="robots" content="noindex, follow"></head>')) });
  assert.equal(deindexed[0].passed, false);
  assert.match(deindexed[0].error, /Mardi Gras hub release is unexpectedly noindex/);
});

test('a changed event authority record creates a bounded, cache-aware production acceptance', async () => {
  const file = 'src/data/major-event-expanded-authority-tranche54.server.ts';
  const old = `const records = [{ slug: "existing-festival", name: "Previous festival", planningSections: [] }, { slug: "unchanged-festival", name: "Keep", planningSections: [] }];`;
  const updated = `const records = [{ slug: "existing-festival", name: "Improved festival", planningSections: [] }, { slug: "unchanged-festival", name: "Keep", planningSections: [] }, { slug: "new-festival", name: "New verified", planningSections: [] }];`;
  const plan = buildChangePlan({ baseline, head, changedFiles: [file],
    sources: { [file]: { before: old, after: updated } } });
  assert.deepEqual(plan.selectedPaths, ['/event/existing-festival', '/event/new-festival']);
  assert.deepEqual(plan.eventAuthorityPages, plan.selectedPaths);
  assert.ok(plan.selectedPaths.length <= PAGE_BUDGET);
  const html = (url, current = true) => '<html><head><title>Texas festival</title><link rel="canonical" href="https://texasdefined.com'
    + url.pathname + '"></head><body>' + (current
      ? '<section>Planning your visit</section><section data-event-discovery-tail="true">More to do</section><section>Official event links</section>'
      : '<section>Stale generic article</section>') + '</body></html>';
  const requests = [];
  const good = await verifyChangedPages({ plan, head, fetchImpl: async url => {
    requests.push(url.href);
    return new Response(html(url));
  } });
  assert.ok(good.every(result => result.passed), JSON.stringify(good));
  assert.ok(requests.includes('https://texasdefined.com/event/new-festival'), 'must check actual visitor URL');

  const stale = await verifyChangedPages({ plan, head, fetchImpl: async url =>
    new Response(html(url, url.searchParams.has('deploy_smoke'))) });
  assert.ok(stale.every(result => !result.passed && /ordinary visitor URL/.test(result.error)));
});

test('major event shared resolver uses two bounded production canaries', () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['src/data/major-event-page.server.ts'] });
  assert.deepEqual(plan.eventAuthorityPages, ['/event/texas-book-festival', '/event/zestfest']);
  assert.ok(plan.selectedPaths.length <= PAGE_BUDGET);
});

test('slug-keyed article link changes verify actual source pages and newly added SSR anchors', async () => {
  const path = 'src/data/article-internal-links.ts';
  const before = 'export const articleInternalLinks = { "texas-regions-explained": [{ href: "/texas-explained" }], "texas-trees-guide": [] };';
  const after = 'export const articleInternalLinks = { "texas-regions-explained": [{ href: "/texas-explained" }, { href: "/article/texas-gulf-coast-erosion-shoreline-retreat-guide" }], "texas-trees-guide": [] };';
  const plan = buildChangePlan({ baseline, head, changedFiles: [path], sources: { [path]: { before, after } } });
  assert.deepEqual(plan.selectedPaths, ['/article/texas-regions-explained']);
  assert.deepEqual(plan.expectedHrefsByPage['/article/texas-regions-explained'], ['/article/texas-gulf-coast-erosion-shoreline-retreat-guide']);
  const html = href => '<html><title>Regions</title><link rel="canonical" href="https://texasdefined.com/article/texas-regions-explained"><body>' + (href ? '<a href="/article/texas-gulf-coast-erosion-shoreline-retreat-guide">Erosion</a>' : '') + '</body></html>';
  const good = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(true)) });
  assert.equal(good[0].passed, true);
  const bad = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(false)) });
  assert.equal(bad[0].passed, false);
  assert.match(bad[0].error, /Expected changed internal link is missing/);
});

test('planner corrections retest previously missed editorial SSR links, not entire site', () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['scripts/ci/production-change-scope.mjs'] });
  assert.deepEqual(plan.selectedPaths, [
    '/destination/battleship-texas', '/destination/fredericksburg', '/destination/magoffin-home',
    '/destination/davis-hill-state-park',
    '/texas-data', '/texas-data/texas-homeowners-premium-history',
    '/texas-data/texas-metro-payrolls-august-2026', '/texas-data/texas-metro-payrolls-june-2026',
    '/article/texas-cultural-regions-explained', '/article/texas-regions-explained',
    '/explore/road-trips',
    '/fishing/species/black-crappie', '/fishing/species/bluegill',
    '/fishing/species/freshwater-drum', '/fishing/species/white-crappie',
    '/texas-data/texas-population-and-migration-2025',
  ]);
  assert.deepEqual(plan.davisHillPages, ['/destination/davis-hill-state-park']);
  assert.deepEqual(plan.downloadButtonPages, ['/texas-data/texas-population-and-migration-2025']);
  assert.deepEqual(plan.regionGuidePages, ['/article/texas-regions-explained']);
  assert.equal(plan.expectedHrefsByPage['/article/texas-regions-explained'][0], '/article/texas-gulf-coast-erosion-shoreline-retreat-guide');
  assert.equal(plan.expectedHrefsByPage['/article/texas-cultural-regions-explained'][0], '/article/texas-oil-boom-wichita-falls-west-texas-rigs');
});

test('Texas Data release checks are bounded and reject stale SSR values', async () => {
  const source = 'src/data/texas-data-center.server.ts';
  const plan = buildChangePlan({ baseline, head, changedFiles: [source] });
  const paths = [
    '/texas-data',
    '/texas-data/texas-homeowners-premium-history',
    '/texas-data/texas-metro-payrolls-august-2026',
    '/texas-data/texas-metro-payrolls-june-2026',
  ];
  assert.deepEqual(plan.selectedPaths, paths);
  assert.deepEqual(plan.texasDataPages, paths);
  assert.equal(plan.omittedCount, 0);
  assert.ok(plan.selectedPaths.length <= PAGE_BUDGET);
  const fresh = {
    '/texas-data': '<h1>Texas by the Numbers</h1> Texas at a glance Latest verified BLS nonfarm payroll jobs /texas-data/texas-metro-payrolls-latest $3,489 Search official data briefs /texas-data/texas-metro-payrolls-august-2026 Major Texas metro payrolls Texas Defined insurance research not an exhaustive list of every incorporated municipality',
    '/texas-data/texas-homeowners-premium-history': '2023 $2,795 2025 $3,489 October 20, 2026',
    '/texas-data/texas-metro-payrolls-august-2026': 'August 2026 4,357,000 3,495,300 metro_09302026.htm',
    '/texas-data/texas-metro-payrolls-june-2026': 'June 2026 4,363,300 metro_07292026.htm',
  };
  const serve = (record) => async url => new Response(
    '<html><head><title>Texas by the Numbers: Population, Housing, Jobs &amp; Counties</title><link rel="canonical" href="https://texasdefined.com'
      + url.pathname + '"></head><body>' + record[url.pathname] + '</body></html>',
  );
  const current = await verifyChangedPages({ plan, head, fetchImpl: serve(fresh) });
  assert.equal(current.length, 4);
  assert.ok(current.every(result => result.passed), JSON.stringify(current));

  const stalePremium = { ...fresh, '/texas-data/texas-homeowners-premium-history': '2023 $2,800 2025 $3,489 October 20, 2026' };
  const badPremium = await verifyChangedPages({ plan, head, fetchImpl: serve(stalePremium) });
  assert.equal(badPremium.find(result => result.path.endsWith('premium-history')).passed, false);

  const staleHeading = { ...fresh, '/texas-data': fresh['/texas-data'].replace('<h1>Texas by the Numbers</h1>', '<h1>Texas Data & Statistics</h1>') };
  const badHeading = await verifyChangedPages({ plan, head, fetchImpl: serve(staleHeading) });
  assert.equal(badHeading.find(result => result.path === '/texas-data').passed, false, 'old H1 must fail production canary');

  const staleHub = { ...fresh, '/texas-data': 'Texas at a glance 4,363,300 DFW nonfarm payrolls June 2026 preliminary $3,489' };
  const badHub = await verifyChangedPages({ plan, head, fetchImpl: serve(staleHub) });
  assert.equal(badHub.find(result => result.path === '/texas-data').passed, false);

  const badSource = { ...fresh, '/texas-data/texas-metro-payrolls-june-2026': 'June 2026 4,363,300 metro.t03.htm' };
  const badArchive = await verifyChangedPages({ plan, head, fetchImpl: serve(badSource) });
  assert.equal(badArchive.find(result => result.path.endsWith('june-2026')).passed, false);
});

test('every production release verifies Texas Data content even after original PR deployment is superseded', async () => {
  const unrelated = ['docs/football-authority/PROGRESS.md'];
  const ordinary = buildChangePlan({ baseline, head, changedFiles: unrelated });
  assert.deepEqual(ordinary.texasDataPages, []);
  const plan = buildChangePlan({ baseline, head, changedFiles: unrelated, enforceCriticalCanaries: true });
  const canaries = [
    '/texas-data',
    '/texas-data/texas-homeowners-premium-history',
    '/texas-data/texas-metro-payrolls-august-2026',
    '/texas-data/texas-metro-payrolls-june-2026',
  ];
  assert.deepEqual(plan.selectedPaths, canaries);
  assert.deepEqual(plan.texasDataPages, canaries);
  assert.equal(plan.omittedCount, 0);
  assert.ok(plan.selectedPaths.length <= PAGE_BUDGET);
  const content = {
    '/texas-data': '<h1>Texas by the Numbers</h1> Texas at a glance Latest verified BLS nonfarm payroll jobs /texas-data/texas-metro-payrolls-latest $3,489 Search official data briefs /texas-data/texas-metro-payrolls-august-2026 Major Texas metro payrolls Texas Defined insurance research not an exhaustive list of every incorporated municipality',
    '/texas-data/texas-homeowners-premium-history': '2023 $2,795 2025 $3,489 October 20, 2026',
    '/texas-data/texas-metro-payrolls-august-2026': 'August 2026 4,357,000 3,495,300 metro_09302026.htm',
    '/texas-data/texas-metro-payrolls-june-2026': 'June 2026 4,363,300 metro_07292026.htm',
  };
  const fetchImpl = async url => new Response(
    '<html><head><title>Texas by the Numbers: Population, Housing, Jobs &amp; Counties</title><link rel="canonical" href="https://texasdefined.com'
      + url.pathname + '"></head><body>' + content[url.pathname] + '</body></html>',
  );
  const verified = await verifyChangedPages({ plan, head, fetchImpl });
  assert.ok(verified.every(item => item.passed), JSON.stringify(verified));
  const stale = await verifyChangedPages({ plan, head, fetchImpl: async url =>
    new Response('<html><head><title>Texas by the Numbers: Population, Housing, Jobs &amp; Counties</title><link rel="canonical" href="https://texasdefined.com'
      + url.pathname + '"></head><body>$2,800 4,363,300 June 2026</body></html>') });
  assert.ok(stale.every(item => !item.passed));
});

test('ordinary Texas Data URL must not serve stale HTML when query-string canary is fresh', async () => {
  const page = '/texas-data/texas-homeowners-premium-history';
  const plan = { head, selectedPaths: [page], texasDataPages: [page], redirectChecks: [] };
  const fresh = '2023 $2,795 2025 $3,489 October 20, 2026';
  const old = '2023 $2,800 2025 $3,489 October 20, 2026';
  const requests = [];
  const serve = (body, url) =>
    new Response('<html><head><title>Premiums</title><link rel="canonical" href="https://texasdefined.com'
      + url.pathname + '"></head><body>' + body + '</body></html>');
  const healthy = await verifyChangedPages({ plan, head, fetchImpl: async url => {
    requests.push(url.href);
    return serve(fresh, url);
  } });
  assert.equal(healthy[0].passed, true);
  assert.ok(requests.some(url => url.includes('deploy_smoke=')), 'release bust request required');
  assert.ok(requests.includes('https://texasdefined.com' + page), 'ordinary visitor request required');

  const stale = await verifyChangedPages({ plan, head, fetchImpl: async url =>
    serve(url.searchParams.has('deploy_smoke') ? fresh : old, url) });
  assert.equal(stale[0].passed, false);
  assert.match(stale[0].error, /ordinary visitor URL still serves stale HTML/);

  const purgeWorkflow = text('.github/workflows/deploy-production.yml');
  for (const url of [
    'https://texasdefined.com/texas-data',
    'https://texasdefined.com/texas-data/texas-homeowners-premium-history',
    'https://texasdefined.com/texas-data/texas-metro-payrolls-august-2026',
    'https://texasdefined.com/texas-data/texas-metro-payrolls-june-2026',
  ]) assert.ok(purgeWorkflow.includes('            ' + url + '\n'), 'missing precise purge target: ' + url);
});

test('Magoffin restoration edits require exact live SSR closure, FAQ and visitor center', async () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['src/data/magoffin-home-authority.ts'] });
  assert.deepEqual(plan.selectedPaths, ['/destination/magoffin-home']);
  assert.deepEqual(plan.magoffinHomePages, ['/destination/magoffin-home']);
  const body = 'Historic home closed through 2027 · Magoffin Home visitor FAQ · 1117 Magoffin Avenue';
  const html = text => '<html><head><title>Magoffin Home</title><link rel="canonical" href="https://texasdefined.com/destination/magoffin-home"></head><body>' + text + '</body></html>';
  const success = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(body)) });
  assert.equal(success[0].passed, true);
  const stale = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html('Old generic Magoffin guide')) });
  assert.equal(stale[0].passed, false);
  assert.match(stale[0].error, /Magoffin Home current authority SSR missing/);
  const booking = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(body + ' Tours and experiences near Magoffin Home State Historic Site')) });
  assert.equal(booking[0].passed, false);
  assert.match(booking[0].error, /generic tour booking component/);
});
test('football template changes verify only two real team pages and their live game-night paths', async () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['src/routes/texas-high-school-football-teams_.$slug.lazy.tsx'] });
  assert.deepEqual(plan.selectedPaths, [
    '/texas-high-school-football-teams/aledo',
    '/texas-high-school-football-teams/southlake-carroll',
  ]);
  assert.deepEqual(plan.footballGameNightPages, plan.selectedPaths);
  const html = (url, valid) => '<html><title>Team guide</title>'
    + '<link rel="canonical" href="https://texasdefined.com' + url.pathname + '">'
    + '<h2>Game-night essentials</h2>'
    + '<a href="#football-current-season">2026 results and schedule</a>'
    + (valid ? 'Browse the TexasDefined shop' : '')
    + '<section id="football-current-season">Current season</section>'
    + '<section>Program overview</section></html>';
  const success = await verifyChangedPages({ plan, head, fetchImpl: async url => new Response(html(url, true)) });
  assert.equal(success.length, 2);
  assert.ok(success.every(record => record.passed));
  const fail = await verifyChangedPages({ plan, head, fetchImpl: async url => new Response(html(url, false)) });
  assert.ok(fail.every(record => !record.passed && /commerce link absent/.test(record.error)));
});

test('a shared fishing species change smoke-checks only four real family links', () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['src/data/fishing/species-guide-data.server.ts'] });
  assert.deepEqual(plan.selectedPaths, [
    '/fishing/species/black-crappie', '/fishing/species/bluegill',
    '/fishing/species/freshwater-drum', '/fishing/species/white-crappie',
  ]);
  assert.deepEqual(plan.expectedHrefsByPage['/fishing/species/bluegill'], ['/fishing/species/sunfish']);
  assert.deepEqual(plan.expectedHrefsByPage['/fishing/species/freshwater-drum'], ['/fishing/species/alligator-gar']);
  assert.equal(plan.candidateCount, 4);
  assert.equal(plan.omittedCount, 0);
});

test('two canonical state aliases are verified by bounded manual-redirect smoke', async () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['src/routes/texas-vs.$state.tsx'] });
  assert.deepEqual(plan.redirectChecks, [
    { path: '/texas-vs/california', target: '/article/texas-vs-california-differences' },
    { path: '/texas-vs/florida', target: '/article/texas-vs-florida-differences' },
  ]);
  assert.equal(plan.selectedPaths.length + plan.redirectChecks.length <= PAGE_BUDGET, true);
  const respond = async (url, options) => {
    assert.equal(options.redirect, 'manual');
    return new Response(null, { status: 301, headers: { location: '/article/texas-vs-' + url.pathname.split('/').pop() + '-differences' } });
  };
  const redirectOnlyPlan = { ...plan, selectedPaths: [] };
  const good = await verifyChangedPages({ plan: redirectOnlyPlan, head, fetchImpl: respond });
  assert.deepEqual(good.map(x => x.status), [301, 301]);
  assert.ok(good.every(x => x.passed));
  const bad = await verifyChangedPages({ plan: redirectOnlyPlan, head, fetchImpl: async () => new Response('OK', { status: 200 }) });
  assert.equal(bad.length, 2);
  assert.ok(bad.every(x => !x.passed && /Expected HTTP 301/.test(x.error)));
});

test('a legitimate final HTML 200 never substitutes for a canonical 301', async () => {
  const plan = { head, selectedPaths: [], redirectChecks: [{ path: '/texas-vs/california', target: '/article/texas-vs-california-differences' }] };
  const bad = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response('<html>canonical article</html>', { status: 200 }) });
  assert.equal(bad[0].passed, false);
});

test('McAllen edits verify only its canonical page and both visitor destinations', async () => {
  const path = 'src/routes/explore.near.$metro.$collection.lazy.tsx';
  const plan = buildChangePlan({ baseline, head, changedFiles: [path] });
  assert.deepEqual(plan.selectedPaths, ['/explore/near/mcallen/day-trips']);
  const expected = [
    '/destination/santa-ana-national-wildlife-refuge',
    '/destination/museum-of-south-texas-history-edinburg',
  ];
  assert.deepEqual(plan.expectedHrefsByPage['/explore/near/mcallen/day-trips'], expected);
  // The live guide owns this exact source slug; do not let the smoke plan
  // silently substitute a similarly named but different destination route.
  const routeSource = text('src/routes/explore.near.$metro.$collection.lazy.tsx');
  assert.match(routeSource, /slug:\s*"museum-of-south-texas-history-edinburg"/);
  assert.match(routeSource, /<Link to="\/destination\/\$slug" params=\{\{ slug: trip\.slug \}\}/);
  assert.doesNotMatch(routeSource, /slug:\s*"museum-south-texas-history-edinburg"/);
  const html = includeMuseum => '<html><title>Best Day Trips From McAllen, Texas</title>'
    + '<link rel="canonical" href="https://texasdefined.com/explore/near/mcallen/day-trips">'
    + '<a href="' + expected[0] + '">Santa Ana</a>'
    + (includeMuseum ? '<a href="' + expected[1] + '">Museum</a>' : '') + '</html>';
  const success = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(true)) });
  assert.equal(success[0].passed, true);
  const missing = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(false)) });
  assert.equal(missing[0].passed, false);
  assert.match(missing[0].error, /Expected changed internal link is missing/);
});

test('existing Texas Data brief CSV changes select one representative dynamic page only', async () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['src/data/texas-data-download.ts'] });
  assert.deepEqual(plan.selectedPaths, ['/texas-data/texas-population-and-migration-2025']);
  assert.deepEqual(plan.downloadButtonPages, ['/texas-data/texas-population-and-migration-2025']);
  const html = button => '<html><title>Population figures</title><link rel="canonical" href="https://texasdefined.com/texas-data/texas-population-and-migration-2025"><body>'
    + (button ? '<button type="button">Download CSV</button>' : '') + '</body></html>';
  const good = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(true)) });
  assert.equal(good[0].passed, true);
  const bad = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(false)) });
  assert.equal(bad[0].passed, false);
  assert.match(bad[0].error, /missing the server-rendered CSV download button/);
});

test('planner change preserves bounded prior regression surfaces including data CSV', () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['scripts/ci/production-change-scope.mjs'] });
  assert.ok(plan.selectedPaths.includes('/texas-data/texas-population-and-migration-2025'));
  assert.ok(plan.selectedPaths.length + plan.redirectChecks.length <= PAGE_BUDGET);
});

test('destination route article links never masquerade as destination pages in production smoke', () => {
  const routePath = 'src/routes/destination.$slug.tsx';
  const before = 'const view = <div>Original destination detail</div>;';
  const after = `const view = <div>Original destination detail<Link to="/article/\\$slug" params={{ slug: "chip-and-joanna-gaines-magnolia-waco" }}>Gaines</Link></div>;`;
  const plan = buildChangePlan({ baseline, head, changedFiles: [routePath],
    sources: { [routePath]: { before, after } } });
  assert.ok(plan.selectedPaths.includes('/destination/magoffin-home'), 'shared destination route still has real Magoffin live canary');
  assert.ok(!plan.selectedPaths.includes('/destination/chip-and-joanna-gaines-magnolia-waco'),
    'outbound article link slug cannot fabricate a nonexistent destination');
  const articlePath = 'src/data/fixtures/chip-and-joanna-gaines-magnolia-waco.ts';
  const article = 'export const chipJoannaGainesMagnoliaWacoArticle: Article = { slug: "chip-and-joanna-gaines-magnolia-waco", body: [] };';
  const combined = buildChangePlan({ baseline, head, changedFiles: [routePath, articlePath],
    sources: { [routePath]: { before, after }, [articlePath]: { before: '', after: article } } });
  assert.ok(combined.selectedPaths.includes('/article/chip-and-joanna-gaines-magnolia-waco'),
    'the published article route must still get a live production smoke check');
  assert.ok(!combined.selectedPaths.includes('/destination/chip-and-joanna-gaines-magnolia-waco'),
    'combining route and published fixture must not reintroduce the phantom destination');
});

test('standalone article fixture edits select the owner, not generic homepage samples', async () => {
  const path = 'src/data/fixtures/texas-regions-explained.ts';
  const before = 'export const texasRegionsExplainedArticle: Article = { slug: "texas-regions-explained", body: [] };';
  const after = before.replace('body: []', 'body: [newParagraph]');
  const plan = buildChangePlan({ baseline, head, changedFiles: [path], sources: { [path]: { before, after } } });
  assert.deepEqual(plan.selectedPaths, ['/article/texas-regions-explained']);
  assert.deepEqual(plan.regionGuidePages, ['/article/texas-regions-explained']);
  const html = heading => '<html><title>Texas regions</title><link rel="canonical" href="https://texasdefined.com/article/texas-regions-explained"><body>'
    + (heading ? '<h2>How to use the seven regions when planning a trip</h2>' : '') + '</body></html>';
  const good = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(true)) });
  assert.equal(good[0].passed, true);
  const bad = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(false)) });
  assert.equal(bad[0].passed, false);
  assert.match(bad[0].error, /missing its reader-facing SSR heading/);
});

test('unchanged sibling registry keys are not independently crawled', () => {
  const path = 'src/data/remote-evergreen-internal-links.ts';
  const before = 'const groups = { "history-one": [{ href: "/texas-history" }], "history-two": [{ href: "/texas-history" }] };';
  const after = 'const groups = { "history-one": [{ href: "/texas-history" }], "history-two": [{ href: "/texas-history" }, { href: "/article/history-one" }] };';
  const plan = buildChangePlan({ baseline, head, changedFiles: [path], sources: { [path]: { before, after } } });
  assert.deepEqual(plan.selectedPaths, ['/article/history-two']);
  assert.deepEqual(plan.expectedHrefsByPage['/article/history-two'], ['/article/history-one']);
});

test('static routes normalize TanStack trailing underscores and scope relevant gates', () => {
  const path = 'src/routes/fishing_.structure.tsx';
  const plan = buildChangePlan({ baseline, head, changedFiles: [path], sources: { [path]: { after: `createFileRoute('/fishing_/structure')({});` } } });
  assert.deepEqual(plan.selectedPaths, ['/fishing/structure']);
  assert.equal(plan.groups.financial, false);
});

test('shared runtime changes and missing baseline select representative coverage', () => {
  for (const args of [{ baseline, changedFiles: ['src/routes/__root.tsx'] }, { baseline: null, changedFiles: [] }]) {
    const plan = buildChangePlan({ ...args, head });
    assert.deepEqual(new Set(plan.selectedPaths), new Set(REPRESENTATIVE_PATHS));
    // The horse-racing acceptance is deliberately change-scoped, not a generic
    // shared-release/sitewide crawl. Other representative groups retain prior behavior.
    const { horse_racing, ...regularGroups } = plan.groups;
    assert.equal(horse_racing, false);
    assert.ok(Object.values(regularGroups).every(Boolean));
  }
});

test('horse racing authority is verified only for a racing change, not an unrelated deployment', () => {
  const change = buildChangePlan({ baseline, head, changedFiles: ['src/data/horse-racing-authority.ts'] });
  assert.equal(change.groups.horse_racing, true);
  const unrelated = buildChangePlan({ baseline, head, changedFiles: ['src/routes/__root.tsx'] });
  assert.equal(unrelated.groups.horse_racing, false);
  const workflowOnly = buildChangePlan({ baseline, head, changedFiles: ['.github/workflows/verify-aubrey-football.yml'] });
  assert.equal(workflowOnly.groups.horse_racing, false);
});

test('deleted feature files still select their native gate and large updates disclose sampling', () => {
  const path = 'src/data/articles-large.ts';
  const after = 'const a = [' + Array.from({ length: 80 }, (_, i) => `{ slug: 'article-${i}', title: 'New' }`).join(',') + '];';
  const plan = buildChangePlan({ baseline, head, changedFiles: [path, 'src/data/event-removed.ts'], sources: { [path]: { after } } });
  assert.equal(plan.groups.events, true);
  assert.equal(plan.selectedPaths.length, PAGE_BUDGET);
  assert.equal(plan.candidateCount, 80);
  assert.equal(plan.omittedCount, 40);
  assert.match(plan.coverage, /sample/);
});

test('a shared successful page response satisfies multiple assertions but refresh remains possible', async () => {
  let calls = 0;
  const fetchPage = createProductionPageFetch(async () => { calls++; return new Response('one page', { status: 200 }); });
  for (let i = 0; i < 10; i++) assert.equal(await (await fetchPage(`https://texasdefined.com/page?verify=${i}`)).text(), 'one page');
  assert.equal(calls, 1);
  await fetchPage('https://texasdefined.com/page?verify=retry', {}, true);
  assert.equal(calls, 2);
});

test('failed responses and edge challenges cannot poison the response cache', async () => {
  let calls = 0;
  const fetchPage = createProductionPageFetch(async () => { calls++; return new Response('blocked', { status: calls === 1 ? 500 : 200, headers: calls === 2 ? { 'cf-mitigated': 'challenge' } : {} }); });
  for (let i = 0; i < 4; i++) await fetchPage('https://texasdefined.com/page');
  assert.equal(calls, 3);
});

test('dynamic Road Trips owner verifies the three casino discovery links without a sitewide crawl', async () => {
  const changedFiles = ['src/routes/explore.$category.lazy.tsx'];
  const plan = buildChangePlan({ baseline, head, changedFiles });
  const required = [
    '/explore/casinos',
    '/explore/casinos/near-houston',
    '/explore/casinos/near-dallas-fort-worth',
  ];
  assert.deepEqual(plan.selectedPaths, ['/explore/road-trips']);
  assert.deepEqual(plan.expectedHrefsByPage['/explore/road-trips'], required);
  assert.equal(plan.omittedCount, 0);

  const html = (hrefs) => '<html><title>Texas Road Trips</title>'
    + '<link rel="canonical" href="https://texasdefined.com/explore/road-trips">'
    + '<body><h1>Texas Road Trips</h1>'
    + hrefs.map(href => `<a href="${href}">Read guide</a>`).join('')
    + '</body></html>';
  const valid = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(required)) });
  assert.equal(valid[0].passed, true);
  const missing = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(html(required.slice(0, -1))) });
  assert.equal(missing[0].passed, false);

  const unrelated = buildChangePlan({ baseline, head, changedFiles: ['src/data/texas-birds.ts'] });
  assert.ok(!unrelated.selectedPaths.includes('/explore/road-trips'));
});

test('casino collection edits smoke exactly the existing guides and fail on a missing SSR guide link', async () => {
  const path = 'src/data/texas-casino-guides.ts';
  const currentGuides = text(path);
  const plan = buildChangePlan({ baseline, head, changedFiles: [path], sources: { [path]: { after: currentGuides } } });
  const guides = plan.expectedHrefsByPage['/explore/casinos'];
  assert.equal(guides.length, 9);
  assert.equal(new Set(guides).size, guides.length);
  assert.ok(guides.includes('/explore/casinos/ischoopa-travel-center'));
  assert.ok(guides.includes('/explore/casinos/texas-gaming-laws'));
  assert.deepEqual(plan.expectedHrefsByPage['/explore'], ['/explore/casinos']);
  assert.equal(plan.selectedPaths.length, 11);
  assert.equal(plan.omittedCount, 0);
  assert.ok(plan.selectedPaths.every(p => p === '/explore' || p === '/explore/casinos' || guides.includes(p)));

  const htmlFor = (url, dropLastGuide = false) => {
    const hrefs = url.pathname === '/explore'
      ? ['/explore/casinos']
      : url.pathname === '/explore/casinos'
        ? guides.slice(0, dropLastGuide ? -1 : undefined)
        : [];
    return '<html><title>Texas Defined guide</title><link rel="canonical" href="https://texasdefined.com'
      + url.pathname + '"><body><h1>Visitor guide</h1>'
      + hrefs.map(href => '<a href="' + href + '">Read</a>').join('') + '</body></html>';
  };
  const good = await verifyChangedPages({ plan, head, fetchImpl: async url => new Response(htmlFor(url)) });
  assert.ok(good.every(result => result.passed));
  const missing = await verifyChangedPages({ plan, head, fetchImpl: async url => new Response(htmlFor(url, true)) });
  assert.equal(missing.find(result => result.path === '/explore/casinos')?.passed, false);

  const unrelated = buildChangePlan({ baseline, head, changedFiles: ['src/data/texas-birds.ts'] });
  assert.ok(unrelated.selectedPaths.every(path => !path.startsWith('/explore/casinos')));
});

test('changed-page smoke verifies only selected pages and fails stale plans before HTTP', async () => {
  let calls = 0;
  const fetchImpl = async url => { calls++; return new Response(`<html><title>Page</title><link rel="canonical" href="https://texasdefined.com${url.pathname}"></html>`); };
  const plan = { head, selectedPaths: ['/article/changed'] };
  const results = await verifyChangedPages({ plan, head, fetchImpl });
  assert.deepEqual(results, [{ path: '/article/changed', passed: true, attempt: 1 }]);
  assert.equal(calls, 1);
  await assert.rejects(verifyChangedPages({ plan, head: baseline, fetchImpl }), /stale/);
  assert.equal(calls, 1);
});

test('bad canonical, missing HTML and failed status never pass; retries stay bounded', async () => {
  for (const response of [() => new Response('<html><title>Page</title></html>'), () => new Response('error', { status: 500 }), () => new Response('empty')]) {
    let calls = 0;
    const results = await verifyChangedPages({ plan: { head, selectedPaths: ['/example'] }, head, fetchImpl: async () => { calls++; return response(); } });
    assert.equal(results[0].passed, false);
    assert.equal(calls, 3);
  }
});


test('baseline lookup skips unverified releases and rejects invalid API evidence', async () => {
  const calls = [];
  const fetchImpl = async url => {
    calls.push(url);
    const value = url.includes('/1/statuses') ? [{ state: 'failure' }] : url.includes('/2/statuses') ? [{ state: 'success' }] : [{ id: 1, sha: head }, { id: 2, sha: baseline }];
    return Response.json(value);
  };
  assert.equal(await baselineFromLedger({ repo: 'owner/repo', token: 'fixture', fetchImpl }), baseline);
  assert.equal(calls.length, 3);
  await assert.rejects(baselineFromLedger({ repo: 'owner/repo', token: 'fixture', fetchImpl: async () => new Response('blocked', { status: 403 }) }), /lookup failed/);
  assert.equal(await baselineFromLedger({ repo: 'owner/repo', token: 'fixture', fetchImpl: async () => Response.json([]) }), null);
});


test('semantic query parameters remain separate pages in manual acceptance', async () => {
  let calls = 0;
  const fetchPage = createProductionPageFetch(async () => { calls++; return new Response('page'); });
  await fetchPage('https://texasdefined.com/fishing/plan?view=map&verify=1');
  await fetchPage('https://texasdefined.com/fishing/plan?view=list&verify=2');
  await fetchPage('https://texasdefined.com/fishing/plan?view=map&verify=3');
  assert.equal(calls, 2);
});

test('one duplicate Edinburg museum URL receives a bounded, exact permanent redirect check', async () => {
  const museum = { path: '/destination/museum-south-texas-history-edinburg', target: '/destination/museum-of-south-texas-history-edinburg' };
  const plan = buildChangePlan({ baseline, head, changedFiles: ['src/lib/legacy-editorial-redirects.ts'] });
  assert.deepEqual(plan.redirectChecks, [museum]);
  assert.ok(plan.selectedPaths.length + plan.redirectChecks.length <= PAGE_BUDGET);
  const onlyRedirect = { ...plan, selectedPaths: [] };
  const good = await verifyChangedPages({ plan: onlyRedirect, head, fetchImpl: async (_url, init) => {
    assert.equal(init.redirect, 'manual');
    return new Response(null, { status: 301, headers: { location: museum.target } });
  } });
  assert.deepEqual(good.map(row => [row.passed, row.status, row.redirectTo]), [[true, 301, museum.target]]);
  const bad = await verifyChangedPages({ plan: onlyRedirect, head, fetchImpl: async () => new Response(null, { status: 200 }) });
  assert.equal(bad[0].passed, false);
  assert.match(bad[0].error, /Expected HTTP 301/);
  const wrong = await verifyChangedPages({ plan: onlyRedirect, head, fetchImpl: async () => new Response(null, { status: 301, headers: { location: '/destination/unrelated' } }) });
  assert.equal(wrong[0].passed, false);
  assert.match(wrong[0].error, /Incorrect redirect target/);
});


test('closed Battleship authority edits validate the exact canonical SSR page and reject stale visitor guidance', async () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['src/data/historic-site-authority-full-catalog.ts'] });
  assert.deepEqual(plan.battleshipVisitorPages, ['/destination/battleship-texas']);
  assert.deepEqual(plan.selectedPaths, plan.battleshipVisitorPages);
  const fixture = (correct) => '<html><head><title>Battleship Texas</title><link rel="canonical" href="https://texasdefined.com/destination/battleship-texas"></head><body>'
    + (correct ? 'Three ways to explore while the ship is closed The ship is closed for ordinary boarding Not applicable' : 'Three ways to visit The focused visit Low to moderate')
    + '</body></html>';
  const good = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(fixture(true)) });
  assert.equal(good[0].passed, true);
  const bad = await verifyChangedPages({ plan, head, fetchImpl: async () => new Response(fixture(false)) });
  assert.equal(bad[0].passed, false);
  assert.match(bad[0].error, /generic visitor guidance/);
});

test('Fredericksburg sitemap ownership validates a single canonical page and live sitemap membership', async () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['src/routes/sitemap-explore[.]xml.ts'] });
  assert.deepEqual(plan.fredericksburgSitemapPaths, ['/destination/fredericksburg']);
  assert.ok(plan.selectedPaths.includes('/destination/fredericksburg'));
  const detail = '<html><title>Fredericksburg</title><link rel="canonical" href="https://texasdefined.com/destination/fredericksburg"></html>';
  const checked = await verifyChangedPages({ plan, head, fetchImpl: async url =>
    url.pathname === '/sitemap-explore.xml'
      ? new Response('<urlset><loc>https://texasdefined.com/destination/fredericksburg</loc></urlset>')
      : new Response(detail) });
  assert.ok(checked.some(r => r.path === '/sitemap-explore.xml' && r.passed));
  const broken = await verifyChangedPages({ plan, head, fetchImpl: async url =>
    url.pathname === '/sitemap-explore.xml'
      ? new Response('<urlset><loc>https://texasdefined.com/destination/another-town</loc></urlset>')
      : new Response(detail) });
  assert.ok(broken.some(r => r.path === '/sitemap-explore.xml' && !r.passed && /Fredericksburg missing/.test(r.error)));
});
