// Read-only, bounded recheck of the 99 exact historical GSC 404 URLs.
// No sitemap/crawl sweep, no mutation of production resources, and no claims
// that historical Search Console entries represent present-day HTTP failures.
import { readFile, mkdir, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { classifyHistoricalGsc404, REVIEW_OUTCOMES } from './gsc-404-classification.mjs';
import { reviewGsc404Disposition } from './gsc-404-disposition-policy.mjs';

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
const paths = lines.map((line) => line.trim()).filter((line) => line && !line.startsWith('#'));
if (paths.length !== 99 || new Set(paths).size !== 99 || paths.some((p) => !p.startsWith('/') || p.startsWith('//') || p.includes('?'))) {
  throw new Error('GSC audit inventory must contain 99 distinct, path-only URLs');
}

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
        const tag = body.match(/<meta\b(?=[^>]*\bname\s*=\s*["']robots["'])[^>]*>/i);
        if (tag) robots = (tag[0].match(/\bcontent\s*=\s*["']([^"']+)["']/i) || [])[1] || robots;
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
  const policy = reviewGsc404Disposition({ path: sourcePath, invalidTemplate, firstStatus, finalStatus, finalUrl: last?.url ?? null, canonical, outcome, error });
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
    console.log(String(index + 1).padStart(2, '0') + '/99 ' + paths[index] + ': ' + results[index].outcome + ' (' + results[index].review + ') [HTTP ' + (results[index].firstStatus ?? 'network') + ' -> ' + (results[index].finalStatus ?? 'network') + '] final=' + (results[index].finalUrl ?? 'unavailable') + (results[index].canonical ? ' canonical=' + results[index].canonical : '') + (results[index].error ? ' error=' + results[index].error : ''));
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
const blockingRegressions = results.filter((r) =>
  ['restore-regression','canonical-regression','route-leak-regression','policy-regression','redirect-to-missing'].includes(r.review)
  || r.outcome === 'server_error');
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
  source: 'TexasDefined GSC 99 historical Not found (404) examples supplied 2026-11-13',
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

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'results.json'), JSON.stringify(summary, null, 2) + '\n');
const cols = ['path','invalidTemplate','outcome','intent','review','policyReason','source','firstStatus','finalStatus','finalUrl','canonical','robots','redirectCount','error'];
const csv = cols.join(',') + '\n' + results.map((row) => cols.map((col) => csvCell(row[col])).join(',')).join('\n') + '\n';
await writeFile(path.join(outDir, 'results.csv'), csv);
const markdown = '# TexasDefined GSC historical 404 recheck\n\n' +
  '**Sample:** 99 exact historical paths. **Checked:** ' + summary.createdAt + '\n\n' +
  Object.entries(counts).map(([label, count]) => '- ' + label + ': ' + count).join('\n') + '\n\n' +
  '- Invalid template URLs: ' + templateCount + ' (direct 404/410: ' + expectedTemplate404Count + ', redirected: ' + templateRedirectCount + ')\n' +
  '- Source-backed intentional 404 URLs: ' + ((dispositionCounts['expected-404'] ?? 0) - expectedTemplate404Count) + '\n' +
  '- Genuine restored URLs currently served 200: ' + (dispositionCounts['served-200'] ?? 0) + '\n' +
  '- Blocking defects requiring changes: ' + blockingRegressions.length + '\n' +
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
