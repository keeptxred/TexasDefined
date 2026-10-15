import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, appendFileSync, copyFileSync, mkdtempSync, existsSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { LOCAL_QUALITY_AUDITS as audits } from './local-quality-audit-catalog.mjs';

const selection = process.argv[2] || 'all';
if (selection !== 'all' && !Object.hasOwn(audits, selection)) throw new Error(`Choose all or one of: ${Object.keys(audits).join(', ')}`);
const port = 8801;
const origin = `http://127.0.0.1:${port}`;
const reportDir = process.env.LOCAL_AUDIT_REPORT_DIR || mkdtempSync(path.join(tmpdir(), 'td-local-quality-reports-'));
const countyWorkDir = mkdtempSync(path.join(tmpdir(), 'td-local-county-work-'));
mkdirSync(reportDir, { recursive: true });
mkdirSync('.artifacts', { recursive: true });
mkdirSync('tmp', { recursive: true });
const config = JSON.parse(readFileSync('dist/server/wrangler.json', 'utf8'));
if (config.main !== 'index.js' && path.basename(config.main || '') !== 'index.js') throw new Error('Unexpected built Worker entry');
// The local-only audit has no AI, analytics writes, remote bindings, or deploy credentials.
delete config.ai;
delete config.analytics_engine_datasets;
if (/"remote"\s*:\s*true/.test(JSON.stringify(config))) throw new Error('Remote binding refused in local audit');
config.main = '.local-quality-worker.mjs';
config.assets = { ...config.assets, binding: 'ASSETS' };
copyFileSync('scripts/ci/local-audit-worker.mjs', 'dist/server/.local-quality-worker.mjs');
copyFileSync('scripts/ci/local-audit-worker-fetch.mjs', 'dist/server/.local-quality-worker-fetch.mjs');
writeFileSync('dist/server/.local-quality-wrangler.json', JSON.stringify(config));
const env = { ...process.env, CI: 'true', WRANGLER_SEND_METRICS: 'false', LOCAL_AUDIT_ORIGIN: origin,
  INTERNAL_LINK_AUDIT_STRICT: '1', INTERNAL_LINK_AUDIT_CONCURRENCY: '2',
  IMAGE_AUDIT_STRICT: '1', IMAGE_AUDIT_CONCURRENCY: '2',
  AUDIT_CONCURRENCY: '2', AUDIT_OUTPUT: path.join(reportDir, 'sitemap-page-indexability-audit.json'),
  INTERNAL_LINK_AUDIT_JSON: path.join(reportDir, 'internal-link-graph-audit.json'),
  INTERNAL_LINK_AUDIT_MD: path.join(reportDir, 'internal-link-graph-audit.md'),
  IMAGE_AUDIT_REPORT: path.join(reportDir, 'image-discover-production-report.json'),
  RV_AUDIT_REPORT: path.join(reportDir, 'rv-production-images.json'),
  LAKE_ACCEPTANCE_REPORT: path.join(reportDir, 'lake-authority-production-acceptance.json'),
  SPORTS_VENUE_AUDIT_REPORT: path.join(reportDir, 'sports-venue-heroes.json'),
  COUNTY_AUDIT_TMPDIR: countyWorkDir,
  AUDIT_JSON: path.join(reportDir, 'texasdefined-page-audit.json'),
  AUDIT_TSV: path.join(reportDir, 'texasdefined-page-audit.tsv'),
  AUDIT_AUTHORITY_TSV: path.join(reportDir, 'texasdefined-authority-review.tsv'),
  AUDIT_LINK_GRAPH_TSV: path.join(reportDir, 'texasdefined-contextual-link-graph.tsv'),
  AUDIT_SNIPPET_TSV: path.join(reportDir, 'texasdefined-snippet-classification.tsv') };
delete env.CLOUDFLARE_API_TOKEN;
delete env.CLOUDFLARE_API_KEY;
delete env.CLOUDFLARE_ACCOUNT_ID;
const child = spawn(path.resolve('node_modules/.bin/wrangler'), ['dev', '--local', '--config', 'dist/server/.local-quality-wrangler.json', '--ip', '127.0.0.1', '--port', String(port), '--inspector-port', '0', '--log-level', 'warn'], {
  env, stdio: ['ignore', 'pipe', 'pipe'], detached: process.platform !== 'win32',
});
const log = path.join(reportDir, 'local-quality-worker.log');
writeFileSync(log, '');
for (const stream of [child.stdout, child.stderr]) stream.on('data', chunk => appendFileSync(log, chunk));
let stopped = false;
child.on('exit', () => { stopped = true; });
child.on('error', error => { appendFileSync(log, String(error)); stopped = true; });
let auditChild;
function cleanup() {
  for (const proc of [auditChild, child]) {
    if (!proc?.pid) continue;
    try { if (process.platform !== 'win32') process.kill(-proc.pid, 'SIGKILL'); else proc.kill('SIGKILL'); } catch {}
  }
}
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { cleanup(); process.exit(1); });
try {
  const deadline = Date.now() + 120_000;
  let ready = false;
  while (!ready && !stopped && Date.now() < deadline) {
    try {
      const response = await fetch(`${origin}/ads.txt`, { signal: AbortSignal.timeout(2000) });
      ready = response.status === 200 && (await response.text()).includes('google.com');
    } catch {}
    if (!ready) await delay(500);
  }
  if (!ready) throw new Error(`Local Worker did not start: ${readFileSync(log, 'utf8').slice(-6000)}`);
  const results = [];
  for (const [name, [executable, script]] of Object.entries(audits)) {
    if (selection !== 'all' && selection !== name) continue;
    console.log(`::group::Full ${name} audit on local built Worker (${origin})`);
    const status = await new Promise(resolve => {
      const auditLog = path.join(reportDir, `${name}.log`);
      writeFileSync(auditLog, '');
      auditChild = spawn(executable === 'node' ? process.execPath : executable, [script], { env, stdio: ['ignore', 'pipe', 'pipe'], detached: process.platform !== 'win32' });
      for (const [stream, output] of [[auditChild.stdout, process.stdout], [auditChild.stderr, process.stderr]]) {
        stream.on('data', chunk => { appendFileSync(auditLog, chunk); output.write(chunk); });
      }
      auditChild.on('error', () => resolve(1));
      auditChild.on('exit', code => resolve(code ?? 1));
    });
    results.push({ name, passed: status === 0 });
    if (name === 'counties') {
      for (const file of ['results.txt', 'pending.tsv']) {
        const source = path.join(countyWorkDir, file);
        if (existsSync(source)) copyFileSync(source, path.join(reportDir, `county-${file}`));
      }
    }
    console.log('::endgroup::');
  }
  writeFileSync(path.join(reportDir, 'local-quality-summary.json'), JSON.stringify({ origin, selection, results }, null, 2));
  console.log(`Complete local audit evidence: ${reportDir}`);
  if (results.some(result => !result.passed)) process.exitCode = 1;
} finally { cleanup(); }
