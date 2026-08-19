import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const sourceFiles = fs.readdirSync(path.join(ROOT, 'src/data'))
  .filter((name) => /^destination-curation-top-attractions.*\.ts$/.test(name))
  .map((name) => path.join(ROOT, 'src/data', name));
sourceFiles.push(path.join(ROOT, 'src/data/top-attraction-authority-sources.ts'));

const urlPattern = /\b(?:officialUrl|reservationUrl|url):\s*["'](https:\/\/[^"']+)["']/g;
const urlToFiles = new Map();

for (const file of sourceFiles) {
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(urlPattern)) {
    const url = match[1].trim();
    const files = urlToFiles.get(url) ?? new Set();
    files.add(path.relative(ROOT, file));
    urlToFiles.set(url, files);
  }
}

const urls = [...urlToFiles.keys()].sort();
if (urls.length < 50) {
  console.error(`Top 25 source-health audit found only ${urls.length} unique HTTPS URLs; expected at least 50 official, reservation and supporting sources.`);
  process.exit(1);
}

const timeoutMs = 20000;
const concurrency = 6;
const userAgent = 'TexasDefinedSourceHealth/1.0 (+https://texasdefined.com/citation-guide)';

async function probe(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': userAgent,
        accept: 'text/html,application/xhtml+xml,application/json;q=0.8,*/*;q=0.5',
        'cache-control': 'no-cache',
      },
    });
    const status = response.status;
    const restrictedButReachable = [401, 403, 405, 406, 409, 418, 429].includes(status);
    const healthy = (status >= 200 && status < 400) || restrictedButReachable;
    return {
      url,
      status,
      healthy,
      restrictedButReachable,
      finalUrl: response.url,
      error: null,
    };
  } catch (error) {
    return {
      url,
      status: 0,
      healthy: false,
      restrictedButReachable: false,
      finalUrl: url,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

const queue = [...urls];
const results = [];

async function worker() {
  while (queue.length) {
    const url = queue.shift();
    if (!url) return;
    results.push(await probe(url));
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()));
results.sort((a, b) => a.url.localeCompare(b.url));

const failures = results.filter((result) => !result.healthy);
const restricted = results.filter((result) => result.restrictedButReachable);
const redirected = results.filter((result) => result.healthy && result.finalUrl && result.finalUrl !== result.url);
const checkedAt = new Date().toISOString();

console.log(`# Top 25 authority source health`);
console.log(`Checked: ${results.length}`);
console.log(`Healthy/reachable: ${results.length - failures.length}`);
console.log(`Bot/auth/rate restricted but reachable: ${restricted.length}`);
console.log(`Redirected: ${redirected.length}`);
console.log(`Failures: ${failures.length}`);

for (const result of failures) {
  const files = [...(urlToFiles.get(result.url) ?? [])].join(', ');
  console.error(`FAIL ${result.status || 'NETWORK'} ${result.url}${result.error ? ` — ${result.error}` : ''} [${files}]`);
}
for (const result of restricted) {
  console.log(`RESTRICTED ${result.status} ${result.url}`);
}
for (const result of redirected) {
  console.log(`REDIRECT ${result.url} -> ${result.finalUrl}`);
}

const report = {
  schemaVersion: 1,
  checkedAt,
  userAgent,
  counts: {
    checked: results.length,
    healthyOrReachable: results.length - failures.length,
    restrictedButReachable: restricted.length,
    redirected: redirected.length,
    failures: failures.length,
  },
  results: results.map((result) => ({
    ...result,
    sourceFiles: [...(urlToFiles.get(result.url) ?? [])].sort(),
  })),
};

const reportPath = process.env.TOP25_SOURCE_HEALTH_REPORT;
if (reportPath) {
  const absoluteReportPath = path.resolve(ROOT, reportPath);
  fs.mkdirSync(path.dirname(absoluteReportPath), { recursive: true });
  fs.writeFileSync(absoluteReportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Source-health snapshot: ${path.relative(ROOT, absoluteReportPath)}`);
}

if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = [
    '## Top 25 authority source health',
    '',
    `- Checked: **${results.length}**`,
    `- Healthy/reachable: **${results.length - failures.length}**`,
    `- Restricted but reachable: **${restricted.length}**`,
    `- Redirected: **${redirected.length}**`,
    `- Failures: **${failures.length}**`,
    `- Checked at: **${checkedAt}**`,
    '',
  ];
  if (failures.length) {
    rows.push('### Failures', '');
    for (const result of failures) rows.push(`- ${result.status || 'NETWORK'} — ${result.url}${result.error ? ` — ${result.error}` : ''}`);
  }
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${rows.join('\n')}\n`);
}

if (failures.length) process.exit(1);
