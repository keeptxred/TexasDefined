import { mkdir, writeFile, appendFile } from 'node:fs/promises';

export const PROBES = [
  { site: 'TexasDefined', url: 'https://texasdefined.com/', kind: 'html' },
  { site: 'TexasDefined', url: 'https://texasdefined.com/events', kind: 'html' },
  { site: 'TexasDefined', url: 'https://texasdefined.com/explore/search', kind: 'html' },
  { site: 'TexasDefined', url: 'https://texasdefined.com/sitemap.xml', kind: 'xml' },
  { site: 'TexasDefined', url: 'https://texasdefined.com/texas-high-school-football-teams/fort-bend-elkins', kind: 'html' },
  { site: 'TexasDefined', url: 'https://texasdefined.com/texas-high-school-football-teams/houston-strake-jesuit', kind: 'html' },
  { site: 'TexasDefined', url: 'https://texasdefined.com/property-tax/taxing-unit/anderson', kind: 'html' },
  { site: 'TexasDefined', url: 'https://texasdefined.com/images/discover/collin-county.webp', kind: 'webp' },
  { site: 'KeepTXRed', url: 'https://keeptxred.com/', kind: 'html' },
  { site: 'KeepTXRed', url: 'https://keeptxred.com/bills', kind: 'html' },
  { site: 'KeepTXRed', url: 'https://keeptxred.com/bills?chamber=senate&page=2', kind: 'html' },
  { site: 'KeepTXRed', url: 'https://keeptxred.com/news', kind: 'html' },
  { site: 'KeepTXRed', url: 'https://keeptxred.com/sitemap.xml', kind: 'xml' },
];

export function assessProbe({ kind }, status, contentType, bytes) {
  if (status !== 200) return `HTTP ${status}`;
  const type = (contentType || '').toLowerCase();
  if (kind === 'webp') {
    if (!type.startsWith('image/webp')) return `expected image/webp, got ${type || 'none'}`;
    if (bytes.length < 12 || bytes.toString('ascii', 0, 4) !== 'RIFF'
      || bytes.toString('ascii', 8, 12) !== 'WEBP') return 'invalid WebP signature';
  } else if (kind === 'html') {
    if (!type.includes('text/html')) return `expected HTML, got ${type || 'none'}`;
    if (!/<html[\s>]/i.test(bytes.toString('utf8', 0, Math.min(bytes.length, 4096)))) return 'missing HTML document';
  } else if (!/<(?:urlset|sitemapindex)\b/i.test(bytes.toString('utf8', 0, Math.min(bytes.length, 12000)))) {
    return 'missing sitemap XML root';
  }
  return null;
}

async function runOne(probe) {
  const timestamp = new Date().toISOString();
  let last = { site: probe.site, url: probe.url, kind: probe.kind, timestamp, status: null, ok: false, error: 'not tested', ray: '', workerVersion: '' };
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(probe.url, {
        method: 'GET', redirect: 'follow', cache: 'no-store',
        headers: { 'user-agent': 'TexasDefined-Server-Error-Canary/1.0', accept: '*/*', 'cache-control': 'no-cache' },
        signal: AbortSignal.timeout(20000),
      });
      const bytes = Buffer.from(await response.arrayBuffer());
      const error = assessProbe(probe, response.status, response.headers.get('content-type'), bytes);
      last = { ...last, status: response.status, ok: !error, error: error || '', attempt,
        ray: response.headers.get('cf-ray') || '',
        workerVersion: response.headers.get('x-texasdefined-worker-version') || '' };
      if (!error || response.status < 500) break;
    } catch (e) {
      last = { ...last, attempt, error: e instanceof Error ? e.message.slice(0, 250) : String(e).slice(0, 250) };
    }
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  return last;
}

async function main() {
  const rows = [];
  // Sequential, bounded canaries: no broad crawls, cache purges, or state changes.
  for (const probe of PROBES) rows.push(await runOne(probe));
  const stamp = new Date().toISOString().slice(0, 10);
  const directory = 'reports/server-error-canaries';
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/${stamp}.json`, JSON.stringify({ checkedAt: new Date().toISOString(), rows }, null, 2) + '\n');
  const columns = ['site','url','kind','timestamp','status','ok','error','attempt','ray','workerVersion'];
  const quote = (value) => '"' + String(value ?? '').replace(/"/g, '""') + '"';
  await writeFile(`${directory}/${stamp}.csv`, columns.join(',') + '\n' + rows.map((r) => columns.map((c) => quote(r[c])).join(',')).join('\n') + '\n');
  const errors = rows.filter((row) => !row.ok);
  const summary = `## Daily bounded production canaries · ${stamp}\n\n${rows.length - errors.length}/${rows.length} passed; ${errors.length} failed.\n\n`
    + (errors.length ? errors.map((row) => `- ${row.site} ${row.url}: ${row.error} (CF-Ray ${row.ray || 'unknown'})`).join('\n') : 'All tested URLs returned valid HTTP200 with expected content.')
    + '\n';
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
  console.log(summary);
  if (errors.length) process.exitCode = 1;
}
if (process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href) await main();
