import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import {
  INTENTIONAL_404_DISPOSITIONS,
  NOV26_GSC_404_ALIASES, NOV26_GSC_404_TEMPLATE,
  RESTORE_REQUIRED_GSC_PATHS,
  RESTORED_GSC_CANONICAL_PATHS,
  INDEXABLE_RESTORED_GSC_PATHS,
  collectGscRobotsDirectives,
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
  robots = null,
  finalUrl = finalStatus === 200 ? 'https://texasdefined.com' + (RESTORED_GSC_CANONICAL_PATHS[path] || LIVE_VERIFIED_GSC_CANONICAL_PATHS[path] || path) : null,
  canonical = finalStatus === 200 ? 'https://texasdefined.com' + (RESTORED_GSC_CANONICAL_PATHS[path] || LIVE_VERIFIED_GSC_CANONICAL_PATHS[path] || path) : null,
} = {}) => {
  const outcome = classifyHistoricalGsc404({ invalidTemplate, firstStatus, finalStatus, error });
  return reviewGsc404Disposition({ path, invalidTemplate, firstStatus, finalStatus, finalUrl, canonical, robots, outcome, error });
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
    assert.ok(!path.includes(String.fromCharCode(36)), 'A route-template token cannot be a live verified path: ' + path);
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

test('every one of the frozen 99 GSC source URLs has a distinct evidence-backed expected disposition', () => {
  const templates = inventory.filter((path) => path.split('/').some((part) => part.startsWith('$')));
  assert.equal(templates.length, 16);
  const groups = [
    templates,
    Object.keys(INTENTIONAL_404_DISPOSITIONS),
    [...RESTORE_REQUIRED_GSC_PATHS],
    Object.keys(LIVE_VERIFIED_GSC_CANONICAL_PATHS),
  ];
  assert.deepEqual(groups.map((set) => set.length), [16, 12, 11, 60]);
  const combined = groups.flat();
  assert.equal(new Set(combined).size, 99, 'A historical URL has conflicting dispositions');
  assert.deepEqual(combined.slice().sort(), inventory.slice().sort(), 'Every one of the 99 historic GSC URLs must be explicitly classified');

  for (const path of templates) {
    assert.equal(observed(path, 404, 404, {invalidTemplate: true}).review, 'expected-404', path);
  }
});

test('intentional 404s and literal route tokens never leak into the static sitemap registry or clickable raw links', () => {
  const sourceRegistry = readFileSync('src/lib/public-routes.ts', 'utf8');
  const mainSitemap = readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
  const exploreSitemap = readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
  const forbidden = [
    ...Object.keys(INTENTIONAL_404_DISPOSITIONS),
    ...inventory.filter((item) => item.split('/').some((part) => part.startsWith(String.fromCharCode(36)))),
  ];
  assert.equal(forbidden.length, 28, 'Only the 12 disallowed legacy resources and 16 raw route templates are excluded');
  assert.ok(sourceRegistry.includes('hasUnresolvedPublicRouteToken(value)'), 'Sitemap path registration must retain shared invalid-token guard');

  for (const item of forbidden) {
    const quoted = JSON.stringify(item);
    assert.ok(!sourceRegistry.includes(quoted), 'Nonexistent or unapproved page in public sitemap route registry: ' + item);
    assert.ok(!mainSitemap.includes(quoted), 'Nonexistent or unapproved page registered by primary sitemap: ' + item);
    assert.ok(!exploreSitemap.includes(quoted), 'Nonexistent or unapproved page registered by Explore sitemap: ' + item);
  }

  const stack = ['src'];
  const clickable = [];
  while (stack.length) {
    const directory = stack.pop();
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const filepath = directory + '/' + entry.name;
      if (entry.isDirectory()) {
        stack.push(filepath);
        continue;
      }
      if (!/\.(?:ts|tsx)$/.test(entry.name)) continue;
      const source = readFileSync(filepath, 'utf8');
      for (const item of forbidden) {
        // A TanStack <Link to="/family/$slug" params={...}> is valid;
        // a plain href with the raw route-template token is not.
        const attributes = [
          'href="' + item + '"', "href='" + item + "'",
          'href: "' + item + '"', "href: '" + item + "'",
        ];
        if (Object.hasOwn(INTENTIONAL_404_DISPOSITIONS, item)) {
          // Deliberately absent resources are not valid navigation targets
          // whether referenced by a raw anchor or typed router link.
          attributes.push('to="' + item + '"', "to='" + item + "'",
            'to: "' + item + '"', "to: '" + item + "'");
        }
        if (attributes.some((fragment) => source.includes(fragment))) clickable.push(filepath + ' -> ' + item);
      }
    }
  }
  assert.deepEqual(clickable, [], 'Readers must not discover known nonexistent/unapproved 404 paths from source links');
});

test('restored public editorial and visitor guides cannot silently carry noindex despite a working 200', () => {
  assert.equal(INDEXABLE_RESTORED_GSC_PATHS.size, 7);
  for (const path of INDEXABLE_RESTORED_GSC_PATHS) {
    assert.ok(RESTORE_REQUIRED_GSC_PATHS.has(path));
    assert.equal(observed(path, 200, 200, { robots: 'index, follow' }).review, 'served-200');
    assert.equal(observed(path, 200, 200, { robots: 'noindex, follow' }).review, 'restore-regression');
    assert.equal(observed(path, 301, 200, { robots: 'googlebot: noindex; index, follow' }).review, 'restore-regression');
  }
  // A past football cohort intentionally varies Google-only indexing; the
  // historical 404 repair may not weaken or override those separate policies.
  for (const path of RESTORE_REQUIRED_GSC_PATHS) {
    if (INDEXABLE_RESTORED_GSC_PATHS.has(path)) continue;
    assert.ok(path.startsWith('/texas-high-school-football-isds/'));
    assert.equal(observed(path, 200, 200, { robots: 'noindex, follow' }).review, 'served-200');
  }
});

test('Googlebot-specific robots meta and X-Robots-Tag are cumulative, even when generic meta says index', () => {
  const page = '<html><head><meta name="robots" content="index, follow">' +
    '<meta content="noindex, follow" name="googlebot"></head></html>';
  const combined = collectGscRobotsDirectives(page, 'index, follow');
  assert.match(combined, /googlebot: noindex/);
  assert.match(combined, /robots: index/);
  assert.equal(observed('/article/texas-road-trip-rules', 200, 200, { robots: combined }).review, 'restore-regression');
  const directHeader = collectGscRobotsDirectives('<meta name="robots" content="index, follow">', 'googlebot: noindex');
  assert.equal(observed('/city/del-rio', 200, 200, { robots: directHeader }).review, 'restore-regression');
  const indexable = collectGscRobotsDirectives('<meta name="robots" content="index, follow">');
  assert.equal(observed('/city/del-rio', 200, 200, { robots: indexable }).review, 'served-200');
});


test('November 26 six new exact examples do not alter the frozen 99-path audit', () => {
  assert.equal(Object.keys(NOV26_GSC_404_ALIASES).length, 5);
  for (const [source, target] of Object.entries(NOV26_GSC_404_ALIASES)) {
    assert.ok(!inventory.includes(source));
    const url = 'https://texasdefined.com' + target;
    const options = { finalUrl: url, canonical: url };
    assert.equal(observed(source, 301, 200, options).review, 'served-200');
    assert.equal(observed(source, 404, 404).review, 'restore-regression');
    assert.equal(observed(source, 302, 200, options).review, 'restore-regression');
    assert.equal(observed(source, 301, 200, {...options, canonical: 'https://texasdefined.com/'}).review, 'restore-regression');
    if (!source.startsWith('/texas-high-school-football-isds/')) assert.equal(observed(source, 301, 200, {...options, robots: 'noindex'}).review, 'restore-regression');
  }
  assert.ok(!inventory.includes(NOV26_GSC_404_TEMPLATE));
  assert.equal(observed(NOV26_GSC_404_TEMPLATE, 404, 404, {invalidTemplate:true}).review, 'expected-404');
});
