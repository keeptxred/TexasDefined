// Bounded, no-extra-service compatibility window for previously emitted
// content-hashed client JS/CSS. Wrangler scans dist/client AFTER this step,
// so the next Worker version includes selected previously healthy old URLs.
// Source bytes are fetched from the still-active public Worker BEFORE replace.
// Only a tiny JSON manifest is carried in existing GitHub Actions artifacts.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INCIDENT_OMITTED_PROOFS } from './incident-omitted-hashed-assets-20261102.mjs';

const SNAPSHOT = '.artifacts/asset-handoff-snapshot.json';
const REPORT = '.artifacts/retained-critical-assets-report.json';
const ASSET_FOLDER = 'dist/client/assets';
const SOURCE_ORIGIN = 'https://texasdefined.com';
// Verified Nov 2 retention artifact copied 192 old-only hashes but dropped 19 eligible hashes under the 192-file request ceiling.
// Keep strict 24 MiB total, 2 MiB/file, 72 h, HTTPS, SHA256 and MIME bounds.
// Nov 2 real release #41523593259 had 283 eligible old-only files: 256 copied,
// 27 excluded; only 22 of those were separately recovered. Budget remains 24 MiB.
// Run 41529296762 recorded 419 eligible original-byte old hashes (384 retained, 35 omitted).
// Their recorded combined size is 24,437,049 bytes, below the unchanged 24 MiB limit.
// Leave room for short-lived additional generations while preserving byte/SHA/age gates.
const LIMIT_FILES = 448;
const LIMIT_BYTES = 24 * 1024 * 1024;
const LIMIT_ONE_FILE = 2 * 1024 * 1024;
const RETENTION_MS = 72 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 20000;

export function safeCriticalAsset(path) {
  if (typeof path !== 'string' || !/^\/assets\/[A-Za-z0-9][A-Za-z0-9._-]{1,155}\.(?:js|css)$/.test(path)) return false;
  const name = basename(path);
  return /^(?:main-|Container-|Header-|Footer-|RouteStatusScreens-|styles-|x-|property-tax\.|texas-high-school-football-teams_|texas-high-school-football-districts_|texas-high-school-football-districts\.lazy-|useLocation-|SponsoredSportsPlacement-|createLucideIcon-|ContextualOfficialSources-|CitationTrustPanel-|CitationCollectionTrustRouter-|analytics-|events\.lazy-|events\._collection\.lazy-|food\._slug\.lazy-|article\._slug-|destination\._slug-|events\.index\.lazy-|explore\.index\.lazy-|search\.lazy-|fishing\.lakes\._slug-|texas-high-school-football-playoff-brackets-|MuseumAuthorityNetworkSection-|museum-authority-heroes-|external-link-|useBaseQuery-|DestinationCard-|PropertyCalculatorFramework-|AnswerSummary-|texas-home-insurance-calculator\.lazy-|useQuery-|SectionHeader-|FootballFanOffers-|ElPasoAreaAuthority-|internal-linking-|ArticleCard-|UnusualBusinessAuthorityPanel-|ArticleBody-|ParkingMapPanel-|event\._slug\.lazy-|shop\.lazy-|shop\.product\._productId-|historic-sites-|museum-authority-network-|DestinationVerifiedVisitorFacts-|BookingCarRentalCard-|DestinationViatorBooking-|town-authority-links-|CityPassContextualCallout-|CityPassCalloutContent-|TexasExplainedContextLinks-|TexasEventCarousel-|MapPreview-|dallas-small-town-drives-|explore\.near\._metro\._collection\.lazy-|explore\.near\._metro\.lazy-|explore\.near\._metro\._collection-|explore\.near\._metro-|sports-traffic\.functions-|texas-data\.lazy-)/.test(name);
}

export function retentionCandidates(history, now = Date.now(), historicalProof = []) {
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
    // Omitted does not mean unavailable: it was proven healthy before a failed
    // release; a subsequent handoff must not erase the obligation silently.
    for (const asset of snapshot?.omittedAssets || []) include(asset, at, 4);
  }
  for (const asset of historicalProof) include(asset, asset.firstSeenAt, 4);
  return [...candidates.values()].sort((a, b) =>
    b.firstSeenAt.localeCompare(a.firstSeenAt) || b.priority - a.priority || a.path.localeCompare(b.path));
}

export function expectedAssetResponse(kind, status, mime, bytes) {
  const contentType = String(mime || '').toLowerCase().split(';')[0].trim();
  return status === 200 && bytes > 0 && (kind === 'css'
    ? contentType === 'text/css'
    : ['text/javascript', 'application/javascript', 'application/x-javascript', 'text/ecmascript', 'application/ecmascript'].includes(contentType));
}

export async function retain({
  snapshotPath = SNAPSHOT, reportPath = REPORT, assetFolder = ASSET_FOLDER,
  sourceOrigin = SOURCE_ORIGIN, fetchImpl = fetch, now = Date.now(),
  historicalProof = INCIDENT_OMITTED_PROOFS,
} = {}) {
  const saved = JSON.parse(await readFile(snapshotPath, 'utf8'));
  const latest = saved.snapshots?.at(-1);
  if (!latest || !Array.isArray(latest.pages)) throw new Error('Current predeploy asset snapshot missing');
  const candidates = retentionCandidates(saved, now, historicalProof);
  const report = { format: 1, checkedAt: new Date(now).toISOString(), version: 'predeploy-current-worker',
    budget: { maxFiles: LIMIT_FILES, maxBytes: LIMIT_BYTES, maxAgeHours: 72 }, inspected: 0,
    copied: [], alreadyInBuild: [], alreadyInBuildDetails: [], unavailable: [],
    ignoredOld: 0, ignoredOldPaths: [], omittedDetails: [] };
  const kept = [];
  const omitted = [];
  let totalBytes = 0;
  let attemptedOld = 0;
  await mkdir(assetFolder, { recursive: true });
  for (const asset of candidates) {
    const destination = resolve(assetFolder, basename(asset.path));
    // A chunk already emitted by Vite is guaranteed to enter Wrangler's
    // current asset manifest. It must NOT use one of the bounded slots needed
    // for genuinely old-only binaries that would otherwise disappear.
    if (existsSync(destination)) {
      // A matching filename is not proof of matching immutable contents.
      // Reject collisions even when Vite has already emitted this path.
      const currentHash = createHash('sha256').update(await readFile(destination)).digest('hex');
      if (currentHash !== asset.preSha256) {
        throw new Error('Current-build asset changed under identical hashed filename: ' + asset.path);
      }
      report.alreadyInBuild.push(asset.path);
      report.alreadyInBuildDetails.push({ path: asset.path, preSha256: currentHash,
        firstSeenAt: asset.firstSeenAt });
      continue;
    }
    // Enforce a bounded ceiling of 448 attempted old-only
    // downloads. Count only candidates actually requiring a request.
    if (attemptedOld >= LIMIT_FILES) {
      report.ignoredOld += 1;
      report.ignoredOldPaths.push(asset.path);
      report.omittedDetails.push({ path: asset.path, preSha256: asset.preSha256,
        firstSeenAt: asset.firstSeenAt, kind: asset.kind });
      omitted.push({ path: asset.path, kind: asset.kind, wasAvailable: true,
        preSha256: asset.preSha256, firstSeenAt: asset.firstSeenAt });
      continue;
    }
    attemptedOld += 1;
    report.inspected += 1;
    let response;
    try {
      response = await fetchImpl(sourceOrigin + asset.path, {
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
      // Persist the exact failing candidate and all previously verified bytes
      // before refusing to deploy. A thrown error here used to lose the report.
      report.omittedDetails.push({ path: asset.path, preSha256: actualHash,
        firstSeenAt: asset.firstSeenAt, kind: asset.kind, bytes: body.byteLength,
        reason: body.byteLength > LIMIT_ONE_FILE ? 'per-file-byte-cap' : 'total-byte-cap' });
      omitted.push({ path: asset.path, kind: asset.kind, wasAvailable: true,
        preSha256: actualHash, firstSeenAt: asset.firstSeenAt });
      latest.retainedAssets = kept;
      latest.omittedAssets = omitted;
      report.bytes = totalBytes;
      report.retainedCount = kept.length;
      report.failure = { reason: 'retained-client-asset-size-budget-exceeded',
        path: asset.path, candidateBytes: body.byteLength,
        attemptedTotalBytes: totalBytes + body.byteLength,
        maxBytes: LIMIT_BYTES, maxOneFileBytes: LIMIT_ONE_FILE };
      await mkdir(dirname(snapshotPath), { recursive: true });
      await mkdir(dirname(reportPath), { recursive: true });
      await writeFile(snapshotPath, JSON.stringify(saved, null, 2) + '\\n');
      await writeFile(reportPath, JSON.stringify(report, null, 2) + '\\n');
      throw new Error('Retained client asset size budget exceeded; diagnostic saved to ' + reportPath + '; refuse unbounded release payload');
    }
    totalBytes += body.byteLength;
    await writeFile(destination, body);
    const retained = { path: asset.path, kind: asset.kind, wasAvailable: true,
      preStatus: 200, preSha256: actualHash, firstSeenAt: asset.firstSeenAt,
      bytes: body.byteLength };
    kept.push(retained);
    report.copied.push({ path: asset.path, bytes: body.byteLength,
      preSha256: actualHash, firstSeenAt: asset.firstSeenAt,
      cfRay: response.headers.get('cf-ray') || null,
      cfCacheStatus: response.headers.get('cf-cache-status') || null });
  }
  // Records already present in the current compiled manifest need not be
  // separately retained; Wrangler already includes them. Future snapshots
  // will discover their hash from HTML and generated route chunks.
  latest.retainedAssets = kept;
  // Do not erase previously healthy hashes during a failed retention attempt.
  // This proof is carried into the next handoff even when only the newest
  // snapshot is restored. Original first-seen timestamps NEVER restart.
  latest.omittedAssets = omitted;
  report.bytes = totalBytes;
  report.retainedCount = kept.length;
  await mkdir(dirname(snapshotPath), { recursive: true });
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(snapshotPath, JSON.stringify(saved, null, 2) + '\n');
  await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
  console.log('[chunk-retention] copied ' + kept.length + ' old critical JS/CSS assets (' + totalBytes
    + ' bytes) into next Worker; current-build duplicates=' + report.alreadyInBuild.length
    + '; already missing=' + report.unavailable.length + '; aged-out/budget-limited=' + report.ignoredOld);
  for (const missing of report.unavailable) console.warn('::warning title=Pre-existing asset unavailable::' + missing.path + ' HTTP ' + missing.status);
  // Never silently ship a Worker that drops previously healthy, in-window old hashes.
  // The report is already persisted for diagnosis; fail BEFORE Wrangler deploy.
  if (report.ignoredOld > 0) {
    throw new Error('Old-only asset retention cap exceeded: ' + report.ignoredOld
      + ' previously healthy hashes omitted; inspect ' + reportPath + ' and preserve original bytes before deploying');
  }
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] !== '--retain') throw new Error('Expected --retain');
  await retain();
}
