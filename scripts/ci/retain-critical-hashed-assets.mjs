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
// Incident recovery retains immutable JS/CSS from active and prior browser versions.
// Nov 4 production run 41750349729 verified 424 old-only assets (24,460,827 bytes)
// and then reached another 1,825,890-byte, SHA-matched main chunk: 26,286,717
// bytes exceeded the prior 24 MiB budget even though all files were legitimate.
// The snapshot contains 439 eligible old paths and frequent safe deployments can
// add versions before the fixed 72-hour expiry. The previous 448-file/24 MiB
// capacity was therefore below real verified demand, not a security invariant.
// Observed production run 42065924607 preserved 768 verified original files
// (43,317,120 bytes) but omitted exactly 50 additional healthy old-only hashes
// solely because of the FILE COUNT cap; the separate 48 MiB byte cap was not hit.
// Nov 5 run 42085396054 actually recovered 884 original-byte, SHA-verified
// old-only files (48,574,753 bytes); the next healthy main chunk (1,824,174
// bytes) would make 50,398,927 bytes, just 67,279 bytes over 48 MiB.
// This is OUR conservative compatibility budget, not a Cloudflare static-asset
// platform aggregate limit (20,000 files and 25 MiB each on Workers Free).
// Nov 5 production runs 42103001762 and 42105902951 each failed closed
// after preserving 1,024 proven original hashes because 66–67 additional
// originally healthy files remained inside the 72-hour retention window.
// Latest measured 1,024 files were 56,348,390 bytes; all 1,091 eligible
// paths require retention, not a CI bypass. The old file ceiling, not a
// platform file limit, was the observed failure. Nov 6 02:20Z successful
// production run 42149204797 retained 1,431 old-only files / 80,757,434 bytes,
// leaving only 105 file slots below 1,536. Until independent KV is fully
// published and verified, use a finite 3,072-file / 192 MiB bridge, well
// below the documented Workers Free static-assets file-count limit.
// This is NOT a permanent archive or a change to original-byte obligations.
// Preserve strict 2 MiB/file, firstSeenAt, 72-hour expiry, same-origin HTTP
// 200, MIME, and SHA-256 checks and fail closed rather than omit healthy paths.
// Fail closed again if even the higher measured headroom is exceeded;
// never drop a healthy in-window URL to make a release succeed.
const LIMIT_FILES = 3072;
const LIMIT_BYTES = 192 * 1024 * 1024;
const LIMIT_ONE_FILE = 2 * 1024 * 1024;
const RETENTION_MS = 72 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 20000;

export function safeCriticalAsset(path) {
  if (typeof path !== 'string' || !/^\/assets\/[A-Za-z0-9_][A-Za-z0-9._-]{1,155}\.(?:js|css)$/.test(path)) return false;
  const name = basename(path);
  return /^(?:main-|Container-|Header-|Footer-|RouteStatusScreens-|styles-|x-|property-tax\.|texas-high-school-football-teams_|texas-high-school-football-districts_|texas-high-school-football-districts\.lazy-|useLocation-|SponsoredSportsPlacement-|createLucideIcon-|ContextualOfficialSources-|CitationTrustPanel-|CitationCollectionTrustRouter-|analytics-|events\.lazy-|events\._collection\.lazy-|food\._slug\.lazy-|article\._slug-|destination\._slug-|events\.index\.lazy-|explore\.index\.lazy-|search\.lazy-|fishing\.lakes\._slug-|texas-high-school-football-playoff-brackets-|MuseumAuthorityNetworkSection-|museum-authority-heroes-|external-link-|useBaseQuery-|DestinationCard-|PropertyCalculatorFramework-|useSuspenseQuery-|ProductCard-|ProductDetailPage-|DestinationVisitPlanner-|CountySelectorField-|destination-query-runtime-|state-park-heroes-|index\.lazy-|index-|events-generated-|HighSchoolFootballLookup-|SchoolSupplyPartners-|PrioritySearchPage-|football-district21-2026-|national-wildlife-refuge-destinations-|texas-gateway-(?:lifestyle|identity|monthly|decision|regional|bestof)-batch[0-9]+-|texas-high-school-football-teams\.lazy-|lazy-authority-legacy-|CountyTaxRateSection-|PublishableGraphic-|_kind\._slug\.lazy-|AnswerSummary-|texas-home-insurance-calculator\.lazy-|useQuery-|SectionHeader-|FootballFanOffers-|ElPasoAreaAuthority-|internal-linking-|ArticleCard-|UnusualBusinessAuthorityPanel-|ArticleBody-|ParkingMapPanel-|event\._slug\.lazy-|shop\.lazy-|shop\.product\._productId-|historic-sites-|museum-authority-network-|DestinationVerifiedVisitorFacts-|BookingCarRentalCard-|DestinationViatorBooking-|town-authority-links-|CityPassContextualCallout-|CityPassCalloutContent-|TexasExplainedContextLinks-|TexasEventCarousel-|MapPreview-|dallas-small-town-drives-|explore\.near\._metro\._collection\.lazy-|explore\.near\._metro\.lazy-|explore\.near\._metro\._collection-|explore\.near\._metro-|sports-traffic\.functions-|texas-data\.lazy-)/.test(name) || /^texas-[A-Za-z0-9_-]{8}\.js$/.test(name);
}

export function retentionCandidates(history, now = Date.now(), historicalProof = [], {includeExpired = false} = {}) {
  const snapshots = Array.isArray(history?.snapshots) ? history.snapshots : [];
  const candidates = new Map();
  function include(item, firstSeenAt, priority) {
    if (!safeCriticalAsset(item?.path) || item.wasAvailable !== true) return;
    if (typeof item.preSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(item.preSha256)) return;
    const timestamp = Date.parse(item.firstSeenAt || firstSeenAt || '');
    if (!Number.isFinite(timestamp) || timestamp > now + 60_000) return;
    // Reconcile EVERY previously verified observation before applying expiry.
    // Filtering stale records first lets a newer snapshot silently re-age the
    // same old hashed URL, defeating automatic cleanup after 72 hours.
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
  const ordered = [...candidates.values()].sort((a, b) =>
    b.firstSeenAt.localeCompare(a.firstSeenAt) || b.priority - a.priority || a.path.localeCompare(b.path));
  return includeExpired ? ordered : ordered.filter(a => now - Date.parse(a.firstSeenAt) <= RETENTION_MS);
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
  // Build a single earliest-observation ledger across ALL previous releases.
  // Copies older than 72h must not be fetched or added to the next Worker.
  const proofLedger = retentionCandidates(saved, now, historicalProof, {includeExpired:true});
  const candidates = proofLedger.filter(a => now - Date.parse(a.firstSeenAt) <= RETENTION_MS);
  const expired = proofLedger.filter(a => now - Date.parse(a.firstSeenAt) > RETENTION_MS);
  const report = { format: 1, checkedAt: new Date(now).toISOString(), version: 'predeploy-current-worker',
    budget: { maxFiles: LIMIT_FILES, maxBytes: LIMIT_BYTES, maxAgeHours: 72 }, inspected: 0,
    copied: [], alreadyInBuild: [], alreadyInBuildDetails: [], unavailable: [],
    ignoredOld: 0, ignoredOldPaths: [], omittedDetails: [],
    expiredOriginalCount: expired.length, expiredOldCopyCount: 0,
    expiredOldCopyPaths: [] };
  const kept = [];
  const omitted = [];
  function markUnavailable(asset, data) {
    report.unavailable.push({path:asset.path,...data});
    // Preserve original SHA and firstSeenAt in the protected failure handoff.
    omitted.push({path:asset.path,kind:asset.kind,wasAvailable:true,
      preSha256:asset.preSha256,firstSeenAt:asset.firstSeenAt});
  }
  let totalBytes = 0;
  let attemptedOld = 0;
  await mkdir(assetFolder, { recursive: true });
  // Assets genuinely present in today's Vite output are CURRENT assets, not
  // deletions. Expired old-only copies are omitted from the new Worker build.
  report.expiredOldCopyPaths = expired.filter(a =>
    !existsSync(resolve(assetFolder, basename(a.path)))).map(a => a.path);
  report.expiredOldCopyCount = report.expiredOldCopyPaths.length;
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
    // Enforce a bounded ceiling of 3,072 attempted old-only
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
      markUnavailable(asset,{ status:'network-error', detail:String(error) });
      continue;
    }
    const body = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || '';
    if (response.headers.get('cf-mitigated') === 'challenge' ||
        !expectedAssetResponse(asset.kind, response.status, contentType, body.byteLength)) {
      markUnavailable(asset,{ status:response.status, contentType });
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
      await writeFile(snapshotPath, JSON.stringify(saved, null, 2) + '\n');
      await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
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
  report.capacity = {remainingOldFileSlots:LIMIT_FILES-attemptedOld,
    remainingBytes:LIMIT_BYTES-totalBytes,
    fileUtilizationPercent:Math.round(1000*attemptedOld/LIMIT_FILES)/10,
    byteUtilizationPercent:Math.round(1000*totalBytes/LIMIT_BYTES)/10};
  if(report.unavailable.length) report.failure={reason:'previously-healthy-asset-unavailable',
    count:report.unavailable.length,paths:report.unavailable.map(x=>x.path)};
  await mkdir(dirname(snapshotPath), { recursive: true });
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(snapshotPath, JSON.stringify(saved, null, 2) + '\n');
  await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
  console.log('[chunk-retention] copied ' + kept.length + ' old critical JS/CSS assets (' + totalBytes
    + ' bytes) into next Worker; current-build duplicates=' + report.alreadyInBuild.length
    + '; already missing=' + report.unavailable.length
    + '; expired-old-copies-excluded=' + report.expiredOldCopyCount
    + '; over-budget-omitted=' + report.ignoredOld);
  for (const missing of report.unavailable) console.warn('::warning title=Pre-existing asset unavailable::' + missing.path + ' HTTP ' + missing.status);
  if(Math.max(report.capacity.fileUtilizationPercent,report.capacity.byteUtilizationPercent)>=80)
    console.warn('::warning title=Old hashed asset retention nearing bounded capacity::'+JSON.stringify(report.capacity));
  // Never silently ship a Worker that drops previously healthy, in-window old hashes.
  // The report is already persisted for diagnosis; fail BEFORE Wrangler deploy.
  if (report.ignoredOld > 0) {
    throw new Error('Old-only asset retention cap exceeded: ' + report.ignoredOld
      + ' previously healthy hashes omitted; inspect ' + reportPath + ' and preserve original bytes before deploying');
  }
  if (report.unavailable.length > 0) {
    throw new Error('Previously healthy in-window old assets are now unavailable: '+
      report.unavailable.length+'; inspect '+reportPath+'; refuse to drop original hashes');
  }
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] !== '--retain') throw new Error('Expected --retain');
  await retain();
}
