// Read-only, bounded recheck of the 99 exact historical GSC 404 URLs.
// No sitemap/crawl sweep, no mutation of production resources, and no claims
// that historical Search Console entries represent present-day HTTP failures.
import { readFile, mkdir, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { classifyHistoricalGsc404, REVIEW_OUTCOMES, isBlockingGsc404Result } from './gsc-404-classification.mjs';
import {
  reviewGsc404Disposition,
  INTENTIONAL_404_DISPOSITIONS,
  NOV26_GSC_404_ALIASES, NOV26_GSC_404_TEMPLATE,
  RESTORED_GSC_CANONICAL_PATHS,
  INDEXABLE_RESTORED_GSC_PATHS,
  collectGscRobotsDirectives,
  LIVE_VERIFIED_GSC_CANONICAL_PATHS,
} from './gsc-404-disposition-policy.mjs';
import { GSC_SITEMAP_SEEDS, parseGscSitemapXml, identifyGscSitemapLeaks, missingRestoredGscSitemapCanonicals } from './gsc-404-sitemap.mjs';

const origin = new URL(process.env.TD_GSC_404_ORIGIN || 'https://texasdefined.com');
if (origin.protocol !== 'https:' || !['texasdefined.com', 'www.texasdefined.com'].includes(origin.hostname)) {
  throw new Error('GSC 404 audit only accepts the canonical TexasDefined HTTPS host');
}
const inventoryPath = 'ops/seo/gsc-404-2026-11-13-paths.txt';
const outDir = process.env.TD_GSC_404_OUT || 'artifacts/gsc-404-2026-11-13';
const timeoutMs = 15_000;
const maxRedirects = 5;
const concurrency = 3;

const lines = (await readFile(inventoryPath, 'utf8')).split(/\r?\n/);
const historicalPaths = lines.map((line) => line.trim()).filter((line) => line && !line.startsWith('#'));
if (historicalPaths.length !== 99 || new Set(historicalPaths).size !== 99 || historicalPaths.some((p) => !p.startsWith('/') || p.startsWith('//') || p.includes('?'))) {
  throw new Error('GSC audit inventory must contain 99 distinct, path-only URLs');
}

const paths = [...historicalPaths, ...Object.keys(NOV26_GSC_404_ALIASES), NOV26_GSC_404_TEMPLATE];
if (paths.length !== 105 || new Set(paths).size !== paths.length) throw new Error('Expected 99 frozen plus six distinct Nov 26 paths');

function unresolvedToken(input) {
  let pathValue = input;
  for (let i = 0; i < 3; i += 1) {
    let next;
    try { next = decodeURIComponent(pathValue); }
    catch { return true; }
    if (next === pathValue) break;
    pathValue = next;
  }
  return pathValue.split('/').some((segment) => segment.startsWith('$') || /^\{[-+]?\$[^}]+\}$/.test(segment));
}

function htmlCanonical(html) {
  const links = html.match(/<link\b[^>]*>/gi) || [];
  for (const link of links) {
    if (!/\brel\s*=\s*["']?canonical(?:["'\s>]|$)/i.test(link)) continue;
    const attr = link.match(/\bhref\s*=\s*["']([^"']+)["']/i);
    if (attr) return attr[1].replace(/&amp;/g, '&');
  }
  return null;
}
function csvCell(value) {
  const str = value == null ? '' : String(value);
  return '"' + str.replace(/"/g, '""') + '"';
}

async function inspect(sourcePath) {
  const invalidTemplate = unresolvedToken(sourcePath);
  let url = new URL(sourcePath, origin);
  const hops = [];
  let canonical = null;
  let robots = null;
  let error = null;
  for (let step = 0; step <= maxRedirects; step += 1) {
    let response;
    try {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'manual',
        signal: AbortSignal.timeout(timeoutMs),
        headers: {
          accept: 'text/html,application/xhtml+xml',
          'user-agent': 'TexasDefined-GSC-404-ReadOnlyAudit/1.0',
          'cache-control': 'no-cache',
        },
      });
    } catch (caught) {
      error = caught instanceof Error ? caught.message : String(caught);
      break;
    }
    const location = response.headers.get('location');
    const status = response.status;
    hops.push({ url: url.href, status, location });
    robots = response.headers.get('x-robots-tag');
    if (status >= 300 && status < 400 && location) {
      await response.body?.cancel();
      const next = new URL(location, url);
      if (!['texasdefined.com', 'www.texasdefined.com'].includes(next.hostname) || next.protocol !== 'https:') {
        error = 'Redirect left the canonical TexasDefined HTTPS hosts';
        break;
      }
      if (step === maxRedirects) { error = 'Redirect chain exceeds guarded hop limit'; break; }
      url = next;
      continue;
    }
    if (status === 200 && (response.headers.get('content-type') || '').includes('text/html')) {
      try {
        const body = await response.text();
        canonical = htmlCanonical(body);
        robots = collectGscRobotsDirectives(body, robots);
      } catch (caught) { error = caught instanceof Error ? caught.message : String(caught); }
    } else {
      await response.body?.cancel();
    }
    break;
  }
  const last = hops[hops.length - 1];
  const finalStatus = last?.status ?? null;
  const firstStatus = hops[0]?.status ?? null;
  const outcome = classifyHistoricalGsc404({ invalidTemplate, firstStatus, finalStatus, error });
  const policy = reviewGsc404Disposition({ path: sourcePath, invalidTemplate, firstStatus, finalStatus, finalUrl: last?.url ?? null, canonical, robots, outcome, error });
  return {
    path: sourcePath,
    invalidTemplate,
    outcome,
    ...policy,
    firstStatus,
    finalStatus,
    finalUrl: last?.url ?? null,
    canonical,
    robots,
    redirectCount: Math.max(0, hops.length - 1),
    error,
    hops,
  };
}

let nextIndex = 0;
const results = new Array(paths.length);
await Promise.all(Array.from({ length: concurrency }, async () => {
  while (true) {
    const index = nextIndex++;
    if (index >= paths.length) return;
    results[index] = await inspect(paths[index]);
    console.log(String(index + 1).padStart(2, '0') + '/' + paths.length + ' ' + paths[index] + ': ' + results[index].outcome + ' (' + results[index].review + ') [HTTP ' + (results[index].firstStatus ?? 'network') + ' -> ' + (results[index].finalStatus ?? 'network') + '] final=' + (results[index].finalUrl ?? 'unavailable') + (results[index].canonical ? ' canonical=' + results[index].canonical : '') + (results[index].error ? ' error=' + results[index].error : ''));
  }
}));
const counts = Object.fromEntries([...new Set(results.map((r) => r.outcome))].sort().map((name) => [
  name, results.filter((r) => r.outcome === name).length,
]));
const actionableReviewCount = results.filter((r) =>
  r.review !== 'expected-404' && (
    REVIEW_OUTCOMES.has(r.outcome) ||
    ['restore-regression','canonical-regression','route-leak-regression','policy-regression'].includes(r.review)
  )).length;
const dispositionCounts = Object.fromEntries([...new Set(results.map((r) => r.review))].sort().map((review) => [
  review, results.filter((r) => r.review === review).length,
]));
const blockingRegressions = results.filter(isBlockingGsc404Result);
const templateCount = results.filter((r) => r.invalidTemplate).length;
const expectedTemplate404Count = results.filter((r) => r.outcome === 'expected_invalid_template').length;
const templateRedirectCount = results.filter((r) => r.outcome === 'invalid_template_redirect_chain').length;
const summary = {
  createdAt: new Date().toISOString(),
  auditBoundary: 'Read-only HTTP observation; GSC coverage labels may lag and a genuine 404 can remain appropriate.',
  actionableReviewCount,
  dispositionCounts,
  blockingRegressions: blockingRegressions.map((r) => ({ path: r.path, review: r.review, firstStatus: r.firstStatus, finalStatus: r.finalStatus, finalUrl: r.finalUrl })),
  templateCount,
  expectedTemplate404Count,
  templateRedirectCount,
  source: 'TexasDefined GSC 99 historical examples supplied Nov 13 plus six additional examples supplied Nov 26',
  inventoryPath,
  origin: origin.origin,
  count: paths.length,
  counts,
  caveat: 'This is an ordinary-agent production HTTP sample, not authenticated GSC URL Inspection and not a Googlebot simulation.',
  results,
};
// Inspect plausible editorial replacement targets separately. Candidates never
// automatically authorize a redirect: source equivalence and editorial readiness
// still require a human-readable disposition in the checkpoint.
const candidateUrls = [
  '/texas-state-fair',
  '/things-unique-to-texas/methodology',
  '/destination/fort-leaton',
  '/destination/dr-pepper-museum-waco',
  '/destination/barton-warnock-visitor-center',
  '/destination/ray-roberts-lake-state-park-isle-du-bois-unit',
  '/destination/ray-roberts-lake-state-park-johnson-branch-unit',
  '/destination/hill-country-state-natural-area',
  '/destination/indian-lodge',
  '/destination/seminole-canyon-state-park-and-historic-site',
  '/destination/seminole-canyon-state-park',
  '/destination/fredericksburg-wineries',
  '/destination/lake-somerville-state-park',
  '/dr-pepper-texas-history',
  '/texas-home-insurance-calculator',
];
const candidateResults = await Promise.all(candidateUrls.map((url) => inspect(url)));
summary.candidates = candidateResults;
for (const item of candidateResults) {
  console.log('[candidate] ' + item.path + ': HTTP ' + (item.firstStatus ?? 'network') + ' -> ' + (item.finalStatus ?? 'network') + ' final=' + (item.finalUrl ?? 'unavailable') + (item.canonical ? ' canonical=' + item.canonical : '') + (item.robots ? ' robots=' + item.robots : ''));
}


// Sample just the two known XML sitemap entry points and their same-host XML
// index children. This is not a sitewide crawl or a URL Inspection API call.
// Use a strict bounded ten-XML budget, no dynamic route scan or writes.
const sitemapSources = [];
const sitemapErrors = [];
const sitemapLocations = new Set();
const sitemapQueue = [...GSC_SITEMAP_SEEDS];
const visitedSitemaps = new Set();
while (sitemapQueue.length && visitedSitemaps.size < 10) {
  const sourcePath = sitemapQueue.shift();
  if (visitedSitemaps.has(sourcePath)) continue;
  visitedSitemaps.add(sourcePath);
  try {
    const response = await fetch(new URL(sourcePath, origin), {
      method: 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        accept: 'application/xml,text/xml;q=0.9,*/*;q=0.1',
        'user-agent': 'TexasDefined-GSC-404-ReadOnlyAudit/1.0',
      },
    });
    if (response.status !== 200) {
      await response.body?.cancel();
      throw new Error('HTTP ' + response.status + ', expected XML HTTP200');
    }
    const expectedSize = Number(response.headers.get('content-length') || 0);
    if (expectedSize > 8_000_000) {
      await response.body?.cancel();
      throw new Error('Sitemap XML exceeds 8 MB bounded verification limit');
    }
    const xml = await response.text();
    if (xml.length > 8_000_000) throw new Error('Sitemap XML exceeds bounded verification limit after reading');
    const parsed = parseGscSitemapXml(xml);
    for (const entry of parsed.paths) sitemapLocations.add(entry);
    for (const child of parsed.children) if (!visitedSitemaps.has(child)) sitemapQueue.push(child);
    sitemapSources.push({ path: sourcePath, status: response.status, kind: parsed.kind, locationCount: parsed.paths.length, childCount: parsed.children.length });
  } catch (caught) {
    sitemapErrors.push({ path: sourcePath, error: caught instanceof Error ? caught.message : String(caught) });
  }
}
if (sitemapQueue.length) sitemapErrors.push({ path: 'sitemap-index', error: 'More than ten distinct XML sources require inspection; bounded audit incomplete' });
if (sitemapLocations.size === 0) sitemapErrors.push({ path: 'sitemap-set', error: 'No same-host published URLs found; sitemap verification cannot be certified' });
const intentionallyMissing = [...Object.keys(INTENTIONAL_404_DISPOSITIONS), ...paths.filter(unresolvedToken)];
const expectedCanonicalBySource = { ...LIVE_VERIFIED_GSC_CANONICAL_PATHS, ...RESTORED_GSC_CANONICAL_PATHS, ...NOV26_GSC_404_ALIASES };
const noncanonicalAliases = Object.entries(expectedCanonicalBySource)
  .filter(([source, destination]) => source !== destination).map(([source]) => source);
const sitemapLeaks = identifyGscSitemapLeaks([...sitemapLocations], intentionallyMissing, noncanonicalAliases);
// Five distinct published editor/visitor canonicals are intended to be
// indexed, even when their historic sources were old redirects or 404s.
// Never force the four football ISDs into a sitemap: their separate
// Googlebot-only noindex cohort remains an independent release policy.
const requiredIndexableCanonicals = [...new Set([...INDEXABLE_RESTORED_GSC_PATHS]
  .map((source) => RESTORED_GSC_CANONICAL_PATHS[source]))].sort();
const missingRestoredCanonicals = missingRestoredGscSitemapCanonicals(
  [...sitemapLocations], requiredIndexableCanonicals);

summary.sitemaps = {
  checkedSources: sitemapSources,
  errors: sitemapErrors,
  locationCount: sitemapLocations.size,
  requiredIndexableCanonicals,
  missingRestoredCanonicals,
  ...sitemapLeaks,
  auditComplete: sitemapErrors.length === 0,
};
for (const sourcePath of sitemapLeaks.forbiddenListed) blockingRegressions.push({ path: sourcePath, review: 'sitemap-404-leak' });
for (const sourcePath of sitemapLeaks.redirectSourceListed) blockingRegressions.push({ path: sourcePath, review: 'sitemap-noncanonical-redirect-leak' });
for (const item of sitemapErrors) blockingRegressions.push({ path: item.path, review: 'sitemap-evidence-incomplete', error: item.error });
for (const sourcePath of missingRestoredCanonicals)
  blockingRegressions.push({ path: sourcePath, review: 'sitemap-restored-canonical-missing' });
summary.blockingRegressions = blockingRegressions.map((row) => ({
  path: row.path, review: row.review, firstStatus: row.firstStatus, finalStatus: row.finalStatus,
  finalUrl: row.finalUrl, error: row.error,
}));
console.log('[sitemap] XML sources=' + sitemapSources.length + ' indexed locations=' + sitemapLocations.size
  + ' forbidden=' + sitemapLeaks.forbiddenListed.length + ' redirect-aliases=' + sitemapLeaks.redirectSourceListed.length
  + ' missing-restored=' + missingRestoredCanonicals.length
  + ' errors=' + sitemapErrors.length);

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'results.json'), JSON.stringify(summary, null, 2) + '\n');
const cols = ['path','invalidTemplate','outcome','intent','review','policyReason','source','firstStatus','finalStatus','finalUrl','canonical','robots','redirectCount','error'];
const csv = cols.join(',') + '\n' + results.map((row) => cols.map((col) => csvCell(row[col])).join(',')).join('\n') + '\n';
await writeFile(path.join(outDir, 'results.csv'), csv);
const markdown = '# TexasDefined GSC historical 404 recheck\n\n' +
  '**Sample:** 105 distinct paths (99 frozen plus six additional Nov 26 examples). **Checked:** ' + summary.createdAt + '\n\n' +
  Object.entries(counts).map(([label, count]) => '- ' + label + ': ' + count).join('\n') + '\n\n' +
  '- Invalid template URLs: ' + templateCount + ' (direct 404/410: ' + expectedTemplate404Count + ', redirected: ' + templateRedirectCount + ')\n' +
  '- Source-backed intentional 404 URLs: ' + ((dispositionCounts['expected-404'] ?? 0) - expectedTemplate404Count) + '\n' +
  '- Genuine restored URLs currently served 200: ' + (dispositionCounts['served-200'] ?? 0) + '\n' +
  '- Blocking defects requiring changes: ' + blockingRegressions.length + '\n' +
  '- Sitemap XML sources checked: ' + sitemapSources.length + ' (complete: ' + (sitemapErrors.length === 0) + ')\n' +
  '- Forbidden 404/template URLs in sitemap: ' + sitemapLeaks.forbiddenListed.length + '\n' +
  '- Redirect-only historical aliases in sitemap: ' + sitemapLeaks.redirectSourceListed.length + '\n' +
  '- Missing indexable restored authority canonicals in sitemaps: ' + missingRestoredCanonicals.length + '\n' +
  Object.entries(dispositionCounts).map(([label, count]) => '- Editorial review ' + label + ': ' + count).join('\n') + '\n' +
  '- URLs requiring response/content disposition review: ' + actionableReviewCount + '\n\n' +
  'Do not equate transport failures with HTTP404, or every remaining 404 with a defect. An invalid route template returning a direct 404 is correct. Review real broken redirects and meaningful missing content separately.\n';
await writeFile(path.join(outDir, 'summary.md'), markdown);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown);
console.log(markdown);
if (results.every((r) => r.error)) {
  throw new Error('All 99 checks failed on transport or redirect chain; no valid HTTP results obtained');
}
if (blockingRegressions.length) {
  throw new Error('Historical GSC 404 audit has ' + blockingRegressions.length + ' evidence-backed route regressions; inspect retained results.json and summary.md. Do not convert intentional 404s into 200.');
}
