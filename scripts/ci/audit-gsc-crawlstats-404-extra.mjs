// Supplemental read-only crawl of 42 *historical Crawl stats* 404 paths.
// Does not change public routes, replace the independently certified 99-path
// Page indexing source, or claim these 42 came from the missing 500-example export.
import { readFile, mkdir, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { parseSupplementalPaths, classifySupplementalResponse } from './gsc-crawlstats-404-extra-policy.mjs';

const origin = new URL(process.env.TD_GSC_CRAWLSTATS_ORIGIN || 'https://texasdefined.com');
if (origin.href !== 'https://texasdefined.com/')
  throw new Error('Supplemental Crawl stats verification must use canonical TexasDefined HTTPS origin');
const outDir = process.env.TD_GSC_CRAWLSTATS_OUT || 'artifacts/gsc-crawlstats-404-extra-2026-10-31';
const raw = await readFile('ops/seo/gsc-crawlstats-404-extra-2026-10-31-paths.txt', 'utf8');
const old = await readFile('ops/seo/gsc-404-2026-11-13-paths.txt', 'utf8');
const paths = parseSupplementalPaths(raw, old);
const timeoutMs = 15000;
const maxRedirects = 5;
const concurrency = 3;

function csvCell(value) {
  const v = value == null ? '' : String(value);
  return '"' + v.replace(/"/g, '""') + '"';
}
function metaTags(html) {
  const canonical = (html.match(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/i) || [])[0];
  const href = canonical?.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1] || null;
  const directives = [];
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const name = tag.match(/\bname\s*=\s*["'](robots|googlebot)["']/i)?.[1];
    const content = tag.match(/\bcontent\s*=\s*["']([^"']+)["']/i)?.[1];
    if (name && content) directives.push(name.toLowerCase() + ': ' + content);
  }
  return { canonical: href?.replace(/&amp;/g, '&') || null, robots: directives };
}

async function inspect(sourcePath) {
  let url = new URL(sourcePath, origin);
  const hops = [];
  let error = null;
  let canonical = null;
  let robots = null;
  let contentType = null;
  for (let hop = 0; hop <= maxRedirects; hop++) {
    let response;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        response = await fetch(url, {
          method: 'GET', redirect: 'manual',
          signal: AbortSignal.timeout(timeoutMs),
          headers: {
            accept: 'text/html,application/xhtml+xml,application/json;q=0.6,*/*;q=0.1',
            'user-agent': 'TexasDefined-GSC-CrawlStats-SupplementalReadOnly/1.0',
            'cache-control': 'no-cache',
          },
        });
        break;
      } catch (caught) {
        error = caught instanceof Error ? caught.message : String(caught);
      }
    }
    if (!response) break;
    error = null;
    const status = response.status;
    const location = response.headers.get('location');
    hops.push({ url: url.href, status, location });
    robots = response.headers.get('x-robots-tag');
    contentType = response.headers.get('content-type');
    if (status >= 300 && status < 400 && location) {
      await response.body?.cancel();
      const next = new URL(location, url);
      if (next.protocol !== 'https:' || next.hostname !== 'texasdefined.com') {
        error = 'Redirect left canonical TexasDefined HTTPS origin';
        break;
      }
      if (hop === maxRedirects) {
        error = 'Redirect chain exceeded guarded five-hop bound';
        break;
      }
      if (hops.some((entry) => entry.url === next.href)) {
        error = 'Redirect loop';
        break;
      }
      url = next;
      continue;
    }
    if (status === 200 && (contentType || '').includes('text/html')) {
      const expectedLength = Number(response.headers.get('content-length') || 0);
      if (expectedLength > 2_000_000) {
        error = 'HTML response larger than bounded 2 MB inspection budget';
        await response.body?.cancel();
      } else {
        try {
          const tags = metaTags(await response.text());
          canonical = tags.canonical;
          robots = [robots, ...tags.robots].filter(Boolean).join('; ') || null;
        } catch (caught) {
          error = caught instanceof Error ? caught.message : String(caught);
        }
      }
    } else {
      await response.body?.cancel();
    }
    break;
  }
  const firstStatus = hops[0]?.status ?? null;
  const finalStatus = hops.at(-1)?.status ?? null;
  const finalUrl = hops.at(-1)?.url ?? null;
  const disposition = classifySupplementalResponse({
    path: sourcePath, firstStatus, finalStatus, finalUrl,
    canonical, robots, contentType, error,
  });
  return {
    path: sourcePath, firstStatus, finalStatus, finalUrl,
    canonical, robots, contentType,
    redirectCount: Math.max(0, hops.length - 1), error, hops,
    ...disposition,
  };
}

let next = 0;
const results = new Array(paths.length);
await Promise.all(Array.from({ length: concurrency }, async () => {
  while (next < paths.length) {
    const i = next++;
    results[i] = await inspect(paths[i]);
    const item = results[i];
    console.log(String(i + 1).padStart(2, '0') + '/42 ' + item.path +
      ' [HTTP ' + (item.firstStatus ?? 'network') + ' -> ' + (item.finalStatus ?? 'network') +
      '] review=' + item.review + ' final=' + (item.finalUrl || 'none') +
      (item.error ? ' error=' + item.error : ''));
  }
}));
const counts = {};
for (const row of results) counts[row.review] = (counts[row.review] || 0) + 1;
const blockers = results.filter((r) => r.blocking);
const editorialReviews = results.filter((r) =>
  ['currently-missing-editorial-review', 'google-indexability-review'].includes(r.review));
const report = {
  createdAt: new Date().toISOString(),
  source: '2026-10-31 historical Crawl stats By response 404; NOT the original missing 500 Page indexing examples',
  relationToPageIndexingSample: '42 unique nonasset paths outside existing 99-path audit; no overlap by contract',
  count: paths.length,
  counts, blockingCount: blockers.length,
  editorialReviewCount: editorialReviews.length,
  boundary: "Real-time HTTP and HTML canonical observations, NOT Google's index state or evidence of a Googlebot crawl",
  blockers: blockers.map(({ path, review, firstStatus, finalStatus, error }) => ({ path, review, firstStatus, finalStatus, error })),
  reviews: editorialReviews.map(({ path, review, firstStatus, finalStatus }) => ({ path, review, firstStatus, finalStatus })),
  results,
};
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'results.json'), JSON.stringify(report, null, 2) + '\n');
const keys = ['path','review','blocking','firstStatus','finalStatus','finalUrl','canonical','robots','contentType','redirectCount','error'];
await writeFile(path.join(outDir, 'results.csv'),
  keys.join(',') + '\n' + results.map((r) => keys.map((k) => csvCell(r[k])).join(',')).join('\n') + '\n');
const summary = '# Supplemental 42-path historical GSC Crawl stats 404 audit\n\n' +
  '- Checked: ' + report.createdAt + '\n' +
  '- Source: October 31 *Crawl stats* export, not the 500-item *Page indexing* report\n' +
  '- Distinct paths checked: ' + paths.length + '\n' +
  '- Blocking route/canonical/transport regressions: ' + blockers.length + '\n' +
  '- Missing-page and indexability cases needing editorial review: ' + editorialReviews.length + '\n' +
  Object.entries(counts).sort().map(([k,v]) => '- ' + k + ': ' + v).join('\n') + '\n\n' +
  'An intentional 404 can be valid. Inspect exact authority/source evidence before approving 301s or publishing content.\n';
await writeFile(path.join(outDir, 'summary.md'), summary);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
console.log(summary);
if (blockers.length) throw new Error(blockers.length + ' verified supplemental HTTP/canonical problems; inspect retained results before changing routes');
