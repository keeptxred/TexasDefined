// Bounded asset handoff for the canonical GitHub production workflow.
// Capture old HTML-referenced hashes BEFORE a deploy, then verify old+new assets
// AFTER the SAME deployment. Carry the most recent older snapshot forward once
// to test that hashes survive two successive regular production replacements.
// No Cloudflare writes, caching changes, new publisher, or sitewide crawl.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CANONICAL = 'https://texasdefined.com';
const DIRECT = 'https://texasdefined-site.freddy-coppola.workers.dev';
const PAGES = ['/', '/property-tax/taxing-unit/ennis-isd', '/property-tax/taxing-unit/yoakum-hospital-district'];
const SNAPSHOT = '.artifacts/asset-handoff-snapshot.json';
const PRIOR = '.artifacts/prior-asset-handoff.json';
const REPORT = '.artifacts/asset-delivery-report.json';
const LIMIT_PER_PAGE = 80;
const REQUEST_TIMEOUT = 20000;

function tagAttributes(tag) {
  const result = {};
  const expr = /([^\s"'=<>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+)))?/g;
  for (const match of tag.matchAll(expr)) {
    const key = match[1].toLowerCase();
    result[key] = (match[2] ?? match[3] ?? match[4] ?? '').replace(/&amp;/gi, '&');
  }
  return result;
}

export function referencesFromHtml(html, base = CANONICAL) {
  const found = new Map();
  const origin = new URL(base).origin;
  const tags = html.match(/<(?:script|link)\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const attrs = tagAttributes(tag);
    const script = /^<script\b/i.test(tag);
    const rels = (attrs.rel || '').toLowerCase().split(/\s+/);
    const preload = rels.includes('modulepreload') || (rels.includes('preload') && /^(script|style)$/.test(attrs.as || ''));
    const stylesheet = rels.includes('stylesheet');
    const candidate = script ? attrs.src : (preload || stylesheet ? attrs.href : '');
    if (!candidate) continue;
    let url;
    try { url = new URL(candidate, base); } catch { continue; }
    if (url.origin !== origin || !/^\/assets\/[a-z0-9_./-]+\.(?:js|css)$/i.test(url.pathname)) continue;
    const kind = url.pathname.endsWith('.css') ? 'css' : 'js';
    if (script && kind !== 'js') continue;
    if (stylesheet && kind !== 'css') continue;
    found.set(url.pathname, { path: url.pathname, kind });
    if (found.size > LIMIT_PER_PAGE) throw new Error('Asset cap exceeded for ' + base);
  }
  return [...found.values()];
}

export function validAssetResponse(kind, response) {
  const mime = String(response.mime || '').toLowerCase().split(';')[0].trim();
  return response.status === 200
    && !response.challenge
    && response.bytes > 0
    && (kind === 'css' ? mime === 'text/css'
      : ['text/javascript', 'application/javascript', 'application/x-javascript', 'text/ecmascript', 'application/ecmascript'].includes(mime));
}

export function nextSnapshotHistory(prior, current) {
  const older = Array.isArray(prior?.snapshots) ? prior.snapshots.filter(x => x?.format === 1 && Array.isArray(x.pages)).slice(-1) : [];
  return { format: 1, snapshots: [...older, current] };
}

function label(origin) { return origin === CANONICAL ? 'canonical' : 'direct'; }
function probeUrl(origin, page) {
  const url = new URL(page, origin);
  url.searchParams.set('asset_handoff_verify', String(process.env.GITHUB_RUN_ID || 'manual') + '-' + Date.now());
  return url.toString();
}
async function get(url, opts = {}) {
  return fetch(url, { redirect: 'manual', cache: 'no-store',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    headers: { 'User-Agent': 'TexasDefined-Production-Asset-Handoff/1.0', ...opts.headers } });
}
async function retrieveHtml(origin, page) {
  const response = await get(probeUrl(origin, page), { headers: { 'Cache-Control': 'no-cache, no-store, max-age=0' } });
  const mime = (response.headers.get('content-type') || '').toLowerCase();
  if (response.status !== 200 || !mime.includes('text/html') || response.headers.get('cf-mitigated') === 'challenge') {
    throw new Error('HTML not usable on ' + label(origin) + page + ' (HTTP ' + response.status + ', ' + mime + ')');
  }
  const body = await response.text();
  const assets = referencesFromHtml(body, origin);
  if (!assets.some(x => x.kind === 'js')) {
    throw new Error('No versioned JS script/modulepreload found on ' + label(origin) + page + '; cannot certify');
  }
  return { path: page, version: response.headers.get('x-texasdefined-worker-version') || null,
    cfRay: response.headers.get('cf-ray') || null,
    cfCacheStatus: response.headers.get('cf-cache-status') || null, assets };
}

async function retrieveAsset(origin, path, kind) {
  // The URL path is deliberately preserved without a cache-busting query:
  // this is the exact URL requested by an old document or Googlebot.
  const response = await get(origin + path);
  const body = await response.arrayBuffer();
  const record = {
    path, kind, origin: label(origin), status: response.status,
    mime: response.headers.get('content-type') || '',
    challenge: response.headers.get('cf-mitigated') === 'challenge',
    bytes: body.byteLength, cfRay: response.headers.get('cf-ray') || null,
    cfCacheStatus: response.headers.get('cf-cache-status') || null,
    etag: response.headers.get('etag') || null,
    sha256: response.status === 200 ? createHash('sha256').update(Buffer.from(body)).digest('hex') : null,
  };
  record.ok = validAssetResponse(kind, record);
  return record;
}
async function auditAssets(origin, assets) {
  const rows = [];
  for (const { path, kind } of assets) {
    try { rows.push(await retrieveAsset(origin, path, kind)); }
    catch (error) { rows.push({ path, kind, origin: label(origin), status: 'network-error', ok: false, error: String(error) }); }
  }
  return rows;
}
function uniqueAssets(pages) {
  const result = new Map();
  for (const page of pages) for (const asset of page.assets || []) result.set(asset.path, { path: asset.path, kind: asset.kind });
  return [...result.values()];
}
async function capture() {
  let prior = null;
  try { prior = JSON.parse(await readFile(PRIOR, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const pages = [];
  for (const page of PAGES) pages.push(await retrieveHtml(CANONICAL, page));
  const checked = await auditAssets(CANONICAL, uniqueAssets(pages));
  const statuses = new Map(checked.map(x => [x.path, x]));
  for (const page of pages) for (const asset of page.assets) {
    const initial = statuses.get(asset.path);
    asset.wasAvailable = initial?.ok === true;
    asset.preStatus = initial?.status ?? 'unknown';
  }
  const current = { format: 1, capturedAt: new Date().toISOString(),
    sourceCommit: process.env.GITHUB_SHA || null, pages };
  const snapshot = nextSnapshotHistory(prior, current);
  await mkdir('.artifacts', { recursive: true });
  await writeFile(SNAPSHOT, JSON.stringify(snapshot, null, 2) + '\n');
  const available = checked.filter(x => x.ok).length;
  console.log('Captured ' + pages.length + ' page HTML manifests, ' + available + '/' + checked.length
    + ' assets healthy before replacement; retained ' + snapshot.snapshots.length + ' generations.');
  for (const row of checked.filter(x => !x.ok)) console.warn('PREEXISTING missing asset: ' + row.path + ' HTTP ' + row.status);
}

async function verify() {
  const saved = JSON.parse(await readFile(SNAPSHOT, 'utf8'));
  if (!Array.isArray(saved.snapshots) || !saved.snapshots.length) throw new Error('Predeploy asset snapshot missing');
  const expected = process.env.EXPECTED_DEPLOYED_WORKER_VERSION;
  if (!expected) throw new Error('EXPECTED_DEPLOYED_WORKER_VERSION is required for production verification');
  const histories = [];
  const inherited = new Map();
  for (const snapshot of saved.snapshots) {
    const available = [];
    for (const page of snapshot.pages) for (const asset of page.assets || []) {
      if (asset.wasAvailable === true) {
        inherited.set(asset.path, { path: asset.path, kind: asset.kind });
        available.push(asset.path);
      }
    }
    histories.push({ capturedAt: snapshot.capturedAt, sourceCommit: snapshot.sourceCommit,
      workerVersions: [...new Set(snapshot.pages.map(x => x.version).filter(Boolean))], availableCount: new Set(available).size });
  }
  const results = { format: 1, checkedAt: new Date().toISOString(), expected, histories,
    pages: [], assets: [], failures: [] };
  try {
    for (const origin of [DIRECT, CANONICAL]) {
      const currentPages = [];
      for (const page of PAGES) {
        const html = await retrieveHtml(origin, page);
        if (html.version !== expected) {
          throw new Error('Wrong active Worker version on ' + label(origin) + page + ': expected ' + expected + ', got ' + (html.version || 'missing'));
        }
        currentPages.push(html);
      }
      results.pages.push({ origin: label(origin), pages: currentPages });
      const combined = new Map();
      for (const a of uniqueAssets(currentPages)) combined.set(a.path, { ...a, sources: ['current'] });
      for (const a of inherited.values()) {
        if (combined.has(a.path)) combined.get(a.path).sources.push('old');
        else combined.set(a.path, { ...a, sources: ['old'] });
      }
      if (combined.size > 250) throw new Error('Cross-release asset verification cap exceeded');
      for (const a of combined.values()) {
        const [record] = await auditAssets(origin, [a]);
        record.sources = a.sources;
        results.assets.push(record);
        if (!record.ok) results.failures.push({ origin: label(origin), path: a.path, status: record.status,
          mime: record.mime || null, sources: a.sources, cfRay: record.cfRay || null });
      }
    }
  } catch (error) {
    results.failures.push({ fatal: String(error) });
  }
  await mkdir('.artifacts', { recursive: true });
  await writeFile(REPORT, JSON.stringify(results, null, 2) + '\n');
  console.log('Verified ' + results.assets.length + ' live asset responses across two public origins; failures=' + results.failures.length);
  if (results.failures.length) {
    for (const problem of results.failures.slice(0, 25)) console.error('::error title=Cross-release JS/CSS unavailable::' + JSON.stringify(problem));
    throw new Error('Live current/previous release JS/CSS verification failed; see ' + REPORT);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const mode = process.argv[2];
  if (mode === '--capture') await capture();
  else if (mode === '--verify') await verify();
  else throw new Error('Usage: node scripts/ci/verify-referenced-assets-production.mjs --capture|--verify');
}
