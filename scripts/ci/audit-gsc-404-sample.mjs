// Read-only, bounded recheck of the 99 exact historical GSC 404 URLs.
// No sitemap/crawl sweep, no mutation of production resources, and no claims
// that historical Search Console entries represent present-day HTTP failures.
import { readFile, mkdir, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';

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
  const redirected = hops.length > 1;
  let outcome;
  if (error) outcome = 'transport_or_chain_problem';
  else if (finalStatus === 404 || finalStatus === 410) {
    outcome = redirected ? 'redirect_to_missing' : invalidTemplate ? 'expected_invalid_template' : 'missing_needs_disposition';
  } else if (finalStatus === 200) {
    outcome = redirected ? 'redirected_to_200' : 'now_200';
  } else if (finalStatus != null && finalStatus >= 500) outcome = 'server_error';
  else outcome = 'other_http_status';
  return {
    path: sourcePath,
    invalidTemplate,
    outcome,
    firstStatus: hops[0]?.status ?? null,
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
    console.log(String(index + 1).padStart(2, '0') + '/99 ' + paths[index] + ': ' + results[index].outcome + ' [HTTP ' + (results[index].firstStatus ?? 'network') + ' -> ' + (results[index].finalStatus ?? 'network') + '] final=' + (results[index].finalUrl ?? 'unavailable') + (results[index].canonical ? ' canonical=' + results[index].canonical : '') + (results[index].error ? ' error=' + results[index].error : ''));
  }
}));
const counts = Object.fromEntries([...new Set(results.map((r) => r.outcome))].sort().map((name) => [
  name, results.filter((r) => r.outcome === name).length,
]));
const summary = {
  createdAt: new Date().toISOString(),
  source: 'TexasDefined GSC 99 historical Not found (404) examples supplied 2026-11-13',
  inventoryPath,
  origin: origin.origin,
  count: paths.length,
  counts,
  caveat: 'This is an ordinary-agent production HTTP sample, not authenticated GSC URL Inspection and not a Googlebot simulation.',
  results,
};
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'results.json'), JSON.stringify(summary, null, 2) + '\n');
const cols = ['path','invalidTemplate','outcome','firstStatus','finalStatus','finalUrl','canonical','robots','redirectCount','error'];
const csv = cols.join(',') + '\n' + results.map((row) => cols.map((col) => csvCell(row[col])).join(',')).join('\n') + '\n';
await writeFile(path.join(outDir, 'results.csv'), csv);
const markdown = '# TexasDefined GSC historical 404 recheck\n\n' +
  '**Sample:** 99 exact historical paths. **Checked:** ' + summary.createdAt + '\n\n' +
  Object.entries(counts).map(([label, count]) => '- ' + label + ': ' + count).join('\n') + '\n\n' +
  'Do not equate transport failures with HTTP404. An invalid template returning 404 is correct. Review broken redirects and missing meaningful content separately.\n';
await writeFile(path.join(outDir, 'summary.md'), markdown);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown);
console.log(markdown);
if (results.every((r) => r.error)) {
  throw new Error('All 99 checks failed on transport or redirect chain; no valid HTTP results obtained');
}
