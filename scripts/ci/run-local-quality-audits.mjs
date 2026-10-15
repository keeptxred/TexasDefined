import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, appendFileSync, copyFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import path from 'node:path';

const selection = process.argv[2] || 'all';
const audits = {
  links: 'scripts/ci/audit-internal-link-graph-production.mjs',
  sitemap: 'scripts/ci/audit-sitemap-page-indexability.mjs',
  images: 'scripts/ci/verify-image-discover-production.mjs',
};
if (selection !== 'all' && !Object.hasOwn(audits, selection)) throw new Error('Choose all, links, sitemap, or images');
const port = 8801;
const origin = `http://127.0.0.1:${port}`;
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
  AUDIT_CONCURRENCY: '2', AUDIT_OUTPUT: 'tmp/sitemap-page-indexability-audit.json' };
delete env.CLOUDFLARE_API_TOKEN;
delete env.CLOUDFLARE_API_KEY;
delete env.CLOUDFLARE_ACCOUNT_ID;
const child = spawn(path.resolve('node_modules/.bin/wrangler'), ['dev', '--local', '--config', 'dist/server/.local-quality-wrangler.json', '--ip', '127.0.0.1', '--port', String(port), '--inspector-port', '0', '--log-level', 'warn'], {
  env, stdio: ['ignore', 'pipe', 'pipe'], detached: process.platform !== 'win32',
});
const log = '.artifacts/local-quality-worker.log';
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
  for (const [name, script] of Object.entries(audits)) {
    if (selection !== 'all' && selection !== name) continue;
    console.log(`::group::Full ${name} audit on local built Worker (${origin})`);
    const status = await new Promise(resolve => {
      auditChild = spawn(process.execPath, [script], { env, stdio: 'inherit', detached: process.platform !== 'win32' });
      auditChild.on('error', () => resolve(1));
      auditChild.on('exit', code => resolve(code ?? 1));
    });
    results.push({ name, passed: status === 0 });
    console.log('::endgroup::');
  }
  writeFileSync('.artifacts/local-quality-summary.json', JSON.stringify({ origin, selection, results }, null, 2));
  if (results.some(result => !result.passed)) process.exitCode = 1;
} finally { cleanup(); }
