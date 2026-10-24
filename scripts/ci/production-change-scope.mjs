import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, appendFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

export const PAGE_BUDGET = 40;
export const REPRESENTATIVE_PATHS = ['/', '/explore', '/texas-history', '/sports', '/fishing', '/events', '/shop', '/city/houston', '/article/bluebonnet-season-field-guide', '/destination/flat-creek-estate', '/county/travis'];
const sharedPattern = /^(?:package(?:-lock)?\.json|vite\.config\.|wrangler\.|src\/(?:worker|server|styles|index\.css|components\/layout|routes\/__root|lib\/(?:seo|public-routes|public-route-tokens)))/;
const groups = {
  images: /discover|hero|public\/images|materialize/,
  sports: /sports|venue|football/,
  horse_racing: /horse-racing|horseRacing|HorseRacing|verify-horse-racing-production/,
  foliage: /east-texas-fall-colors|fall-foliage/,
  discovery: /public-routes|sitemap|routeTree|discovery|indexing/,
  events: /events?|ticketmaster/,
  financial: /financial|mortgage|insurance|salary|cost-of-living|property-tax|calculators/,
  advertiser: /advertis|partner-inquiry|sponsor/,
};
const publicPath = value => typeof value === 'string' && /^\/(?!\/|api(?:\/|$)|admin(?:\/|$))[^\s?#$]*$/.test(value) && !/\.(?:png|jpe?g|webp|svg|js|css|json|xml|txt|csv|pdf)$/.test(value);

function records(source) {
  const file = ts.createSourceFile('source.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const result = new Map();
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map(p => [p.name.getText(file).replace(/^['"]|['"]$/g, ''), p.initializer]));
      for (const key of ['slug', 'canonicalPath', 'path', 'routePath']) {
        const value = props.get(key);
        if (value && ts.isStringLiteralLike(value)) {
          const id = `${key}:${value.text}`;
          result.set(id, { key, value: value.text, text: node.getText(file) });
          break;
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return result;
}

// Use the declared Article.slug, not a fixture filename or nested link parameter.
function standaloneArticleSlugs(source) {
  const file = ts.createSourceFile('article-fixture.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const slugs = new Set();
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.type?.getText(file) === 'Article'
      && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
      const slug = node.initializer.properties.find(prop => ts.isPropertyAssignment(prop)
        && prop.name.getText(file).replace(/^['"]|['"]$/g, '') === 'slug');
      if (slug && ts.isStringLiteralLike(slug.initializer)) slugs.add(slug.initializer.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return [...slugs];
}

function articleLinkRegistry(source) {
  const file = ts.createSourceFile('link-registry.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const records = new Map();
  function visit(node) {
    if (ts.isPropertyAssignment(node) && ts.isStringLiteralLike(node.name)
      && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(node.name.text)
      && ts.isArrayLiteralExpression(node.initializer)) {
      const hrefs = [];
      for (const item of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(item)) continue;
        const href = item.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(file).replace(/^['"]|['"]$/g, '') === 'href');
        if (href && ts.isStringLiteralLike(href.initializer) && publicPath(href.initializer.text)) hrefs.push(href.initializer.text);
      }
      records.set(node.name.text, { text: node.initializer.getText(file), hrefs });
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return records;
}

export function buildChangePlan({ changedFiles, sources = {}, baseline = null, head = null, enforceCriticalCanaries = false }) {
  const shared = baseline === null || changedFiles.some(p => sharedPattern.test(p));
  const candidates = new Set(shared ? REPRESENTATIVE_PATHS : []);
  const expectedHrefsByPage = {};
  const eventAuthorityPages = new Set();
  // The canonical corporate marketplace needs SSR authority and privacy smoke
  // after the finder, catalog, city guides, categories or consent forms change.
  // One route only; do not crawl hundreds of editorial venue links.
  const corporateEventPages = new Set();
  if (changedFiles.some(path =>
    path === 'src/routes/corporate-events.tsx'
    || path === 'src/routes/corporate-events.lazy.tsx'
    || path === 'src/data/corporate-events.ts'
    || path === 'src/data/corporate-events.functions.ts'
    || path === 'src/data/corporate-events-offers.server.ts'
    || path === 'src/components/events/CorporateEventMetroGuides.tsx'
    || path === 'src/components/events/CorporateEventCategoryGuides.tsx'
    || path === 'scripts/ci/validate-corporate-event-production-smoke.mjs'
  )) {
    corporateEventPages.add('/corporate-events');
    candidates.add('/corporate-events');
  }

  // The statewide Mardi Gras hub has a static route and its own event-directory
  // links. Verify it on production when either of its route files changes.
  const mardiGrasHubPages = new Set();
  if (changedFiles.some(path => path === 'src/routes/events.mardi-gras.tsx'
    || path === 'src/routes/events.mardi-gras.lazy.tsx')) {
    const page = '/events/mardi-gras';
    candidates.add(page);
    mardiGrasHubPages.add(page);
    expectedHrefsByPage[page] = [
      '/event/mardi-gras-galveston',
      '/event/mardi-gras-port-arthur',
      '/event/cowboy-mardi-gras-bandera',
      '/event/kemah-yachty-gras',
    ];
  }
  // A missing Davis Hill hero survived source checks because the editorial route
  // bypasses the generic destination image. Test the live HTML and both SVGs
  // whenever its component, image assets, or release verifier changes.
  const davisHillPages = new Set();
  if (changedFiles.some(path => [
    'src/components/editorial/DavisHillAuthority.tsx',
    'src/data/davis-hill-authority-fallback.ts',
    'src/data/destination-curation-batch12.ts',
    'public/images/state-parks/davis-hill-conservation-landscape.svg',
    'public/images/state-parks/davis-hill-salt-dome-concept.svg',
    'scripts/ci/production-change-scope.mjs',
    'scripts/ci/verify-changed-production-pages.mjs',
  ].includes(path))) {
    const page = '/destination/davis-hill-state-park';
    candidates.add(page);
    davisHillPages.add(page);
  }
  // The Road Trips category is rendered by a shared dynamic lazy route,
  // so no concrete URL is discoverable from its createFileRoute declaration.
  // Verify only the changed category page and its three editorial links.
  if (changedFiles.some(path => path === 'src/routes/explore.$category.lazy.tsx'
    || path === 'scripts/ci/production-change-scope.mjs')) {
    candidates.add('/explore/road-trips');
    expectedHrefsByPage['/explore/road-trips'] = [
      '/explore/casinos',
      '/explore/casinos/near-houston',
      '/explore/casinos/near-dallas-fort-worth',
    ];
  }
  // A generic historic-site authority source can change Battleship Texas
  // without touching a slug-specific route. Confirm the CLOSED vessel guidance
  // on the real canonical SSR page after relevant changes, not 11 unrelated
  // representative pages. Never expand this into a sitewide museum crawl.
  const battleshipVisitorPages = new Set();
  if (changedFiles.some(path => [
    'src/data/historic-site-authority-full-catalog.ts',
    'src/components/editorial/DestinationAuthorityGuide.tsx',
    'src/data/destination-curation-batch23.ts',
    'scripts/ci/production-change-scope.mjs',
  ].includes(path))) {
    const page = '/destination/battleship-texas';
    candidates.add(page);
    battleshipVisitorPages.add(page);
  }
  // The dynamic Explore sitemap can silently omit a researched town while
  // unrelated 200/canonical smokes pass. Verify exactly Fredericksburg's
  // canonical page AND its live sitemap record after an owner change.
  const fredericksburgSitemapPaths = new Set();
  if (changedFiles.some(path => [
    'src/routes/sitemap-explore[.]xml.ts',
    'scripts/ci/production-change-scope.mjs',
  ].includes(path))) {
    const page = '/destination/fredericksburg';
    candidates.add(page);
    fredericksburgSitemapPaths.add(page);
  }
  // Magoffin Home must be checked against live SSR when its researched overlay
  // or shared destination detail route changes. Build success alone can hide
  // a stale generic guide behind the public domain.
  const magoffinHomePages = new Set();
  if (changedFiles.some(path => [
    'src/data/magoffin-home-authority.ts',
    'src/routes/destination.$slug.tsx',
    'scripts/ci/production-change-scope.mjs',
    'scripts/ci/verify-changed-production-pages.mjs',
  ].includes(path))) {
    const page = '/destination/magoffin-home';
    candidates.add(page);
    magoffinHomePages.add(page);
  }
  // A shared football template affects every profile, but two representative
  // verified teams provide a bounded production canary without a 1,268-page crawl.
  const footballGameNightPages = new Set();
  if (changedFiles.some(path => [
    'src/routes/texas-high-school-football-teams_.$slug.tsx',
    'src/routes/texas-high-school-football-teams_.$slug.lazy.tsx',
    'src/components/sports/FootballGameNightGuide.tsx',
  ].includes(path))) {
    for (const slug of ['aledo', 'southlake-carroll']) {
      const page = `/texas-high-school-football-teams/${slug}`;
      candidates.add(page);
      footballGameNightPages.add(page);
    }
  }
  // Verify the corrected statewide source figures on the real public pages, not
  // just a generic HTTP 200 or sitemap entry. Four fixed URLs, no catalog crawl.
  // Deploy runs enforce these canaries even when a newer release supersedes the
  // original Texas Data change; otherwise the changed-files baseline can skip
  // the checks and certify stale cache content as healthy.
  const texasDataPages = new Set();
  if (enforceCriticalCanaries || changedFiles.some(path => [
    'src/data/texas-data-center.server.ts',
    'src/data/texas-data-center.ts',
    'src/routes/texas-data.tsx',
    'src/routes/texas-data.lazy.tsx',
    'src/routes/texas-data.$datasetSlug.lazy.tsx',
    'src/components/authority/CitationCollectionTrustRouter.tsx',
    'scripts/ci/production-change-scope.mjs',
    'scripts/ci/verify-changed-production-pages.mjs',
  ].includes(path))) {
    for (const page of [
      '/texas-data',
      '/texas-data/texas-homeowners-premium-history',
      '/texas-data/texas-metro-payrolls-august-2026',
      '/texas-data/texas-metro-payrolls-june-2026',
    ]) {
      candidates.add(page);
      texasDataPages.add(page);
    }
  }
  const downloadButtonPages = new Set();
  const regionGuidePages = new Set();
  // Make the previously missed standalone regions guide a bounded acceptance
  // target when correcting the planner; never start an unrelated site crawl.
  if (changedFiles.includes('scripts/ci/production-change-scope.mjs')) {
    const page = '/article/texas-regions-explained';
    candidates.add(page);
    regionGuidePages.add(page);
  }
  // Verify the existing representative data-brief detail (no dataset-wide crawl).
  // The generic view owns every brief's browser CSV action.
  if (changedFiles.some(path => [
    'src/routes/texas-data.$datasetSlug.lazy.tsx',
    'src/data/texas-data-download.ts',
    'scripts/ci/production-change-scope.mjs',
  ].includes(path))) {
    const page = '/texas-data/texas-population-and-migration-2025';
    candidates.add(page);
    downloadButtonPages.add(page);
  }
  // Retest the two precisely identified owners missed by the pre-fix planner
  // whenever this planner changes. No full-site scan or recurring follower.
  if (changedFiles.includes('scripts/ci/production-change-scope.mjs')) {
    const regressionEdges = {
      '/article/texas-regions-explained': ['/article/texas-gulf-coast-erosion-shoreline-retreat-guide'],
      '/article/texas-cultural-regions-explained': ['/article/texas-oil-boom-wichita-falls-west-texas-rigs'],
    };
    for (const [page, hrefs] of Object.entries(regressionEdges)) {
      candidates.add(page);
      expectedHrefsByPage[page] = hrefs;
    }
  }
  // These published profiles are owned by one dynamic view model rather than
  // individual route records. Only inspect the four historically underlinked
  // species whenever that owner or this planner changes.
  if (changedFiles.some(path => [
    'src/data/fishing/species-guide-data.server.ts',
    'src/components/fishing/FishingSpeciesProfile.tsx',
    'scripts/ci/production-change-scope.mjs',
  ].includes(path))) {
    const expectedFamilyLinks = {
      '/fishing/species/black-crappie': ['/fishing/species/white-crappie'],
      '/fishing/species/white-crappie': ['/fishing/species/black-crappie'],
      '/fishing/species/bluegill': ['/fishing/species/sunfish'],
      '/fishing/species/freshwater-drum': ['/fishing/species/alligator-gar'],
    };
    for (const [page, hrefs] of Object.entries(expectedFamilyLinks)) {
      candidates.add(page);
      expectedHrefsByPage[page] = hrefs;
    }
  }
  // McAllen day trips share one dynamic route with other metros; ordinary
  // static route matching cannot infer the affected canonical owner.
  // Keep this targeted to McAllen, never launch a statewide proximity crawl.
  // Assert the slug actually authored in MCALLEN_EDITORIAL_TRIPS, not the
  // separate legacy museum-south-texas-history-edinburg destination URL.
  if (changedFiles.some(path =>
    /^src\/routes\/explore\.near\.\$metro\.\$collection(?:\.lazy)?\.tsx$/.test(path)
    || ['src/data/metro-county-links.ts', 'src/data/viator-market-match.ts', 'src/data/national-wildlife-refuge-destinations.ts'].includes(path)
  )) {
    const path = '/explore/near/mcallen/day-trips';
    candidates.add(path);
    expectedHrefsByPage[path] = [
      '/destination/santa-ana-national-wildlife-refuge',
      '/destination/museum-of-south-texas-history-edinburg',
    ];
  }
  // A casino destination is owned by a dynamic route. Inspect the current
  // editorial roster and test only that small collection when it changes.
  // Do not expand unrelated deploys into gaming crawls.
  const casinoOwnerChanged = changedFiles.some(path =>
    path === 'src/data/texas-casino-guides.ts'
    || /^src\/routes\/explore\.casinos(?:\.index|\.\$slug)?\.tsx$/.test(path)
  );
  if (casinoOwnerChanged) {
    const path = 'src/data/texas-casino-guides.ts';
    const source = sources[path]?.after ?? readFileSync(path, 'utf8');
    const slugs = [...new Set([...source.matchAll(/["']slug["']\s*:\s*["']([a-z0-9-]+)["']/g)]
      .map(match => match[1]))].sort();
    if (slugs.length < 1 || slugs.length > 20) throw new Error('Unverified casino guide roster');
    const guidePaths = slugs.map(slug => `/explore/casinos/${slug}`);
    candidates.add('/explore');
    candidates.add('/explore/casinos');
    for (const guidePath of guidePaths) candidates.add(guidePath);
    expectedHrefsByPage['/explore'] = ['/explore/casinos'];
    expectedHrefsByPage['/explore/casinos'] = guidePaths;
  }
  // A shared water-park registry owns many dynamic guides. Verify only newly
  // added facility URLs (up to four) plus the statewide directory, not 101
  // unrelated pages. Template-only changes use four type-diverse canaries.
  // This stays inside the existing 40-page deployment smoke budget.
  const waterParkOwnerChanged = changedFiles.some(path =>
    path === 'src/data/texas-water-parks.ts'
    || /^src\/routes\/explore\.water-parks(?:\.(?:index|\$slug)(?:\.lazy)?)?\.tsx$/.test(path)
  );
  if (waterParkOwnerChanged) {
    const file = 'src/data/texas-water-parks.ts';
    const current = sources[file]?.after ?? readFileSync(file, 'utf8');
    const registryPattern = /export const texasWaterParks: WaterParkGuide\[\] = (\[[\s\S]*?\]);\nexport const texasWaterParksBySlug/;
    const match = current.match(registryPattern);
    if (!match) throw new Error('Water-park production smoke could not parse the canonical operator registry');
    const parks = JSON.parse(match[1]);
    if (parks.length < 1 || parks.length > 1000) throw new Error('Water-park production smoke found an implausible registry');
    const previous = sources[file]?.before?.match(registryPattern);
    const priorSlugs = previous ? new Set(JSON.parse(previous[1]).map(park => park.slug)) : new Set();
    const newParks = previous ? parks.filter(park => !priorSlugs.has(park.slug)) : [];
    const fallback = [
      parks.find(park => park.setting === 'Indoor' && !/Resort/.test(park.kind)),
      parks.find(park => /Resort/.test(park.kind)),
      parks.find(park => park.kind === 'Inflatable lake water park'),
      parks.find(park => park.setting === 'Outdoor' && park.kind === 'Destination park'),
    ].filter(Boolean);
    const chosen = [...new Map((newParks.length ? newParks : fallback)
      .slice(0, 4).map(park => [park.slug, park])).values()];
    const hrefs = chosen.map(park => `/explore/water-parks/${park.slug}`);
    candidates.add('/explore/water-parks');
    for (const href of hrefs) candidates.add(href);
    expectedHrefsByPage['/explore/water-parks'] = hrefs;
  }
  let contentFallback = false;
  for (const path of changedFiles) {
    const { before = '', after = '' } = sources[path] || {};
    // Permanent /event/:slug guides are data-owned, not filename-owned routes.
    // Diff AST records so only changed guides are verified. A bounded sample
    // protects release costs when a bulk tranche contains hundreds of entries.
    if (/^src\/data\/(?:major-event-(?:authority|expanded-authority(?:-tranche\d+)?|schema-enrichment-batch\d+)|festival-visitor-guide-extras)\.server\.ts$/.test(path)) {
      const previous = records(before);
      for (const [id, record] of records(after)) {
        if (eventAuthorityPages.size >= 8) break;
        if (record.key !== 'slug' || previous.get(id)?.text === record.text
          || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.value)) continue;
        const href = '/event/' + record.value;
        candidates.add(href);
        eventAuthorityPages.add(href);
      }
    }
    if (path === 'src/data/major-event-supplemental-registry.server.ts') {
      const extract = source => new Set([...source.matchAll(/^\s*"([a-z0-9]+(?:-[a-z0-9]+)*)",?\s*$/gm)].map(match => match[1]));
      const previous = extract(before);
      for (const slug of extract(after)) {
        if (eventAuthorityPages.size >= 8) break;
        if (previous.has(slug)) continue;
        const href = '/event/' + slug;
        candidates.add(href);
        eventAuthorityPages.add(href);
      }
    }
    if (path === 'src/data/major-event-page.server.ts') {
      // Route-layer changes also need a real 200/canonical SSR acceptance.
      for (const slug of ['texas-book-festival', 'zestfest']) {
        const href = '/event/' + slug;
        candidates.add(href);
        eventAuthorityPages.add(href);
      }
    }
    if (path.startsWith('src/routes/')) {
      for (const match of after.matchAll(/createFileRoute\(["']([^"']+)["']\)/g)) {
        const route = match[1].split('/').map(p => p.replace(/_$/, '')).join('/');
        if (publicPath(route)) candidates.add(route);
      }
    }
    if (!/^src\/(?:data|components|routes|lib)\//.test(path)) continue;
    // An article in a standalone fixture file may be keyed by the filename,
    // unlike bulk registries. Verify that one owner when its article changes.
    const fixtureMatch = path.match(/^src\/data\/fixtures\/([a-z0-9-]+)\.ts$/);
    if (fixtureMatch) {
      for (const slug of standaloneArticleSlugs(after)) {
        const page = '/article/' + slug;
        candidates.add(page);
        if (slug === 'texas-regions-explained') regionGuidePages.add(page);
      }
    }
    if (/^src\/data\/(?:article-internal-links|remote-evergreen-internal-links)\.ts$/.test(path)) {
      const previous = articleLinkRegistry(before);
      const current = articleLinkRegistry(after);
      for (const slug of new Set([...previous.keys(), ...current.keys()])) {
        const oldBlock = previous.get(slug), newBlock = current.get(slug);
        if (oldBlock?.text === newBlock?.text) continue;
        const page = '/article/' + slug;
        candidates.add(page);
        const added = newBlock?.hrefs.filter(href => !oldBlock?.hrefs.includes(href)) ?? [];
        if (added.length) expectedHrefsByPage[page] = [...new Set(added)];
      }
    }
    const oldRecords = records(before);
    for (const [id, record] of records(after)) {
      if (oldRecords.get(id)?.text === record.text) continue;
      if (record.key !== 'slug' && publicPath(record.value)) candidates.add(record.value);
      // Slugs in route/components JSX (for example <Link params={{ slug: 'article-name' }}>)
      // are outbound link arguments, not declarations of destination/article owners.
      // Only editorial data records may generate inferred slug-based URLs.
      if (record.key === 'slug' && path.startsWith('src/data/') && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.value)) {
        if (/articles?|core-articles/.test(path)) candidates.add(`/article/${record.value}`);
        else if (/destination/.test(path)) candidates.add(`/destination/${record.value}`);
      }
    }
    contentFallback = true;
  }
  if (!candidates.size && contentFallback) for (const p of REPRESENTATIVE_PATHS) candidates.add(p);
  // The two redirect-only state aliases are intentional canonical exceptions.
  // Verify their actual 301 response whenever their route or this planner
  // changes, using the existing deploy smoke instead of a new full crawl.
  const redirectChecks = [
    ...(changedFiles.some(path => path === 'src/routes/texas-vs.$state.tsx' || path === 'scripts/ci/production-change-scope.mjs')
      ? [
        { path: '/texas-vs/california', target: '/article/texas-vs-california-differences' },
        { path: '/texas-vs/florida', target: '/article/texas-vs-florida-differences' },
      ] : []),
    // Exactly one museum alias changed, not an entire destination crawl.
    ...(changedFiles.some(path => path === 'src/lib/legacy-editorial-redirects.ts' || path === 'src/data/destination-availability.ts')
      ? [{ path: '/destination/museum-south-texas-history-edinburg', target: '/destination/museum-of-south-texas-history-edinburg' }] : []),
  ];
  // The resolver can append fixed event canaries after eight newly discovered
  // events. Keep its semantic smoke sample within the verifier's eight-route
  // contract; any other selected event URLs still receive generic HTTP/SEO checks.
  const boundedEventAuthorityPages = new Set([...eventAuthorityPages].slice(0, 8));
  const allPaths = [...candidates].sort();
  // A deploy smoke is explicitly a bounded sample, never a full-content certification.
  const selectedPaths = [...new Set([...REPRESENTATIVE_PATHS.filter(p => candidates.has(p)), ...corporateEventPages, ...battleshipVisitorPages, ...fredericksburgSitemapPaths, ...magoffinHomePages, ...davisHillPages, ...texasDataPages, ...mardiGrasHubPages, ...boundedEventAuthorityPages, ...allPaths])].slice(0, PAGE_BUDGET - redirectChecks.length);
  const selectedExpectedHrefs = Object.fromEntries(selectedPaths.filter(p => expectedHrefsByPage[p]).map(p => [p, expectedHrefsByPage[p]]));
  const candidateCount = allPaths.length + redirectChecks.length;
  return { baseline, head, changedFiles, shared, selectedPaths, expectedHrefsByPage: selectedExpectedHrefs,
    texasDataPages: selectedPaths.filter(p => texasDataPages.has(p)),
    corporateEventPages: selectedPaths.filter(p => corporateEventPages.has(p)),
    eventAuthorityPages: selectedPaths.filter(p => boundedEventAuthorityPages.has(p)),
    mardiGrasHubPages: selectedPaths.filter(p => mardiGrasHubPages.has(p)),
    downloadButtonPages: selectedPaths.filter(p => downloadButtonPages.has(p)),
    regionGuidePages: selectedPaths.filter(p => regionGuidePages.has(p)),
    footballGameNightPages: selectedPaths.filter(p => footballGameNightPages.has(p)),
    battleshipVisitorPages: selectedPaths.filter(p => battleshipVisitorPages.has(p)),
    fredericksburgSitemapPaths: selectedPaths.filter(p => fredericksburgSitemapPaths.has(p)),
    magoffinHomePages: selectedPaths.filter(p => magoffinHomePages.has(p)),
    davisHillPages: selectedPaths.filter(p => davisHillPages.has(p)),
    redirectChecks, candidateCount,
    omittedCount: Math.max(0, allPaths.length - selectedPaths.length), pageBudget: PAGE_BUDGET,
    coverage: candidateCount > PAGE_BUDGET ? 'representative sample; full coverage belongs to weekly local audits' : 'identified changed pages and representative dependencies',
    groups: Object.fromEntries(Object.entries(groups).map(([name, pattern]) => [name, (name === 'horse_racing' ? false : shared) || changedFiles.some(p => pattern.test(p))])),
  };
}

const git = args => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 32 * 1024 * 1024 });
export async function baselineFromLedger({ repo = process.env.GITHUB_REPOSITORY, token = process.env.GH_TOKEN, fetchImpl = fetch } = {}) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo || '') || !token) throw new Error('Repository and GH_TOKEN are required for verified baseline lookup');
  async function get(path) {
    const r = await fetchImpl(`https://api.github.com/repos/${repo}${path}`, { headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'User-Agent': 'TexasDefined-Change-Scope' }, signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error(`Verified baseline lookup failed: HTTP ${r.status}`);
    return r.json();
  }
  const deployments = await get('/deployments?environment=texasdefined-verified-worker&per_page=30');
  if (!Array.isArray(deployments)) throw new Error('Malformed verified deployments response');
  for (const deployment of deployments) {
    const statuses = await get(`/deployments/${deployment.id}/statuses?per_page=1`);
    if (!Array.isArray(statuses)) throw new Error('Malformed verified status response');
    if (statuses[0]?.state !== 'success') continue;
    if (!/^[a-f0-9]{40}$/i.test(deployment.sha || '')) throw new Error('Invalid verified baseline SHA');
    return deployment.sha;
  }
  return null;
}

async function main() {
  const head = process.env.GITHUB_SHA || git(['rev-parse', 'HEAD']).trim();
  if (!/^[a-f0-9]{40}$/i.test(head)) throw new Error('Invalid target SHA');
  const baseline = await baselineFromLedger();
  const changedFiles = (baseline ? git(['diff', '--name-only', baseline, head]) : git(['ls-files'])).trim().split('\n').filter(Boolean);
  const sources = {};
  for (const path of changedFiles.filter(p => /^src\//.test(p) && /\.[cm]?[jt]sx?$/.test(p))) {
    let after = '';
    try { after = git(['show', `${head}:${path}`]); } catch {}
    let before = '';
    if (baseline) { try { before = git(['show', `${baseline}:${path}`]); } catch {} }
    sources[path] = { before, after };
  }
  const plan = buildChangePlan({ baseline, head, changedFiles, sources, enforceCriticalCanaries: true });
  mkdirSync('.artifacts', { recursive: true });
  writeFileSync('.artifacts/production-change-plan.json', JSON.stringify(plan, null, 2));
  if (process.env.GITHUB_OUTPUT) for (const [group, value] of Object.entries(plan.groups)) appendFileSync(process.env.GITHUB_OUTPUT, `${group}=${value}\n`);
  console.log(`Deployment smoke: ${changedFiles.length} changed files since ${baseline || 'unknown baseline'}, ${plan.selectedPaths.length}/${plan.candidateCount} candidate pages; ${plan.omittedCount} left to weekly local audits.`);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n### Change-scoped deployment smoke\nBaseline: ${baseline || 'unavailable; conservative shared checks'}. Pages: ${plan.selectedPaths.length}/${plan.candidateCount}. Omitted: ${plan.omittedCount}.\nThis is deployment smoke coverage, not a complete site audit.\n`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
