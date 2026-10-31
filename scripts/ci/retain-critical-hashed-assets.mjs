// Bounded, no-extra-service compatibility window for previously emitted
// content-hashed client JS/CSS. Wrangler scans dist/client AFTER this step,
// so the next Worker version includes selected previously healthy old URLs.
// Source bytes are fetched from the still-active public Worker BEFORE replace.
// Only a tiny JSON manifest is carried in existing GitHub Actions artifacts.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SNAPSHOT = '.artifacts/asset-handoff-snapshot.json';
const REPORT = '.artifacts/retained-critical-assets-report.json';
const ASSET_FOLDER = 'dist/client/assets';
const SOURCE_ORIGIN = 'https://texasdefined.com';
const LIMIT_FILES = 96;
const LIMIT_BYTES = 24 * 1024 * 1024;
const LIMIT_ONE_FILE = 2 * 1024 * 1024;
const RETENTION_MS = 72 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 20000;

export function safeCriticalAsset(path) {
  if (typeof path !== 'string' || !/^\/assets\/[A-Za-z0-9][A-Za-z0-9._-]{1,155}\.(?:js|css)$/.test(path)) return false;
  const name = basename(path);
  return /^(?:main-|Container-|Header-|Footer-|RouteStatusScreens-|styles-|x-|property-tax\.|texas-high-school-football-teams_)/.test(name);
}

export function retentionCandidates(history, now = Date.now()) {
  const snapshots = Array.isArray(history?.snapshots) ? history.snapshots : [];
  const candidates = new Map();
  function include(item, firstSeenAt, priority) {
    if (!safeCriticalAsset(item?.path) || item.wasAvailable !== true) return;
    if (typeof item.preSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(item.preSha256)) return;
    const timestamp = Date.parse(item.firstSeenAt || firstSeenAt || '');
    if (!Number.isFinite(timestamp) || timestamp > now + 60_000 || now - timestamp > RETENTION_MS) return;
    const existing = candidates.get(item.path);
    const value = { path: item.path, kind: item.path.endsWith('.css') ? 'css' : 'js',
      preSha256: item.preSha256, firstSeenAt: new Date(timestamp).toISOString(), priority };
    if (existing && existing.preSha256 !== value.preSha256) throw new Error('Same hashed asset path has different contents: ' + item.path);
    // Prefer the earliest actual firstSeenAt, to avoid unbounded re-aging.
    if (existing) value.firstSeenAt = existing.firstSeenAt < value.firstSeenAt ? existing.firstSeenAt : value.firstSeenAt;
    candidates.set(item.path, value);
  }
  for (const snapshot of snapshots) {
    const at = snapshot?.capturedAt;
    for (const page of snapshot?.pages || []) for (const asset of page?.assets || []) include(asset, at, 1);
    for (const asset of snapshot?.legacyAssets || []) include(asset, at, 2);
    for (const asset of snapshot?.retainedAssets || []) include(asset, at, 3);
  }
  return [...candidates.values()].sort((a, b) =>
    b.firstSeenAt.localeCompare(a.firstSeenAt) || b.priority - a.priority || a.path.localeCompare(b.path));
}

export function expectedAssetResponse(kind, status, mime, bytes) {
  const contentType = String(mime || '').toLowerCase().split(';')[0].trim();
  return status === 200 && bytes > 0 && (kind === 'css'
    ? contentType === 'text/css'
    : ['text/javascript', 'application/javascript', 'application/x-javascript', 'text/ecmascript', 'application/ecmascript'].includes(contentType));
}

async function retain() {
  const saved = JSON.parse(await readFile(SNAPSHOT, 'utf8'));
  const latest = saved.snapshots?.at(-1);
  if (!latest || !Array.isArray(latest.pages)) throw new Error('Current predeploy asset snapshot missing');
  const candidates = retentionCandidates(saved);
  const report = { format: 1, checkedAt: new Date().toISOString(), version: 'predeploy-current-worker',
    budget: { maxFiles: LIMIT_FILES, maxBytes: LIMIT_BYTES, maxAgeHours: 72 }, inspected: 0,
    copied: [], alreadyInBuild: [], unavailable: [], ignoredOld: Math.max(0, candidates.length - LIMIT_FILES) };
  const kept = [];
  let totalBytes = 0;
  await mkdir(ASSET_FOLDER, { recursive: true });
  for (const asset of candidates.slice(0, LIMIT_FILES)) {
    report.inspected += 1;
    const destination = resolve(ASSET_FOLDER, basename(asset.path));
    if (existsSync(destination)) {
      report.alreadyInBuild.push(asset.path);
      continue;
    }
    let response;
    try {
      response = await fetch(SOURCE_ORIGIN + asset.path, {
        redirect: 'manual', cache: 'no-store',
        headers: { 'User-Agent': 'TexasDefined-Predeploy-Chunk-Retention/1.0' },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
    } catch (error) {
      report.unavailable.push({ path: asset.path, status: 'network-error', detail: String(error) });
      continue;
    }
    const body = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || '';
    if (response.headers.get('cf-mitigated') === 'challenge' ||
        !expectedAssetResponse(asset.kind, response.status, contentType, body.byteLength)) {
      report.unavailable.push({ path: asset.path, status: response.status, contentType });
      continue;
    }
    const actualHash = createHash('sha256').update(body).digest('hex');
    if (actualHash !== asset.preSha256) {
      throw new Error('Old static asset changed under identical hashed filename: ' + asset.path);
    }
    if (body.byteLength > LIMIT_ONE_FILE || totalBytes + body.byteLength > LIMIT_BYTES) {
      throw new Error('Retained client asset size budget exceeded; refuse unbounded release payload');
    }
    totalBytes += body.byteLength;
    await writeFile(destination, body);
    const retained = { path: asset.path, kind: asset.kind, wasAvailable: true,
      preStatus: 200, preSha256: actualHash, firstSeenAt: asset.firstSeenAt,
      bytes: body.byteLength };
    kept.push(retained);
    report.copied.push({ path: asset.path, bytes: body.byteLength,
      cfRay: response.headers.get('cf-ray') || null,
      cfCacheStatus: response.headers.get('cf-cache-status') || null });
  }
  // Records already present in the current compiled manifest need not be
  // separately retained; Wrangler already includes them. Future snapshots
  // will discover their hash from HTML and generated route chunks.
  latest.retainedAssets = kept;
  report.bytes = totalBytes;
  report.retainedCount = kept.length;
  await mkdir('.artifacts', { recursive: true });
  await writeFile(SNAPSHOT, JSON.stringify(saved, null, 2) + '\n');
  await writeFile(REPORT, JSON.stringify(report, null, 2) + '\n');
  console.log('[chunk-retention] copied ' + kept.length + ' old critical JS/CSS assets (' + totalBytes
    + ' bytes) into next Worker; current-build duplicates=' + report.alreadyInBuild.length
    + '; already missing=' + report.unavailable.length + '; aged-out/budget-limited=' + report.ignoredOld);
  for (const missing of report.unavailable) console.warn('::warning title=Pre-existing asset unavailable::' + missing.path + ' HTTP ' + missing.status);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] !== '--retain') throw new Error('Expected --retain');
  await retain();
}
