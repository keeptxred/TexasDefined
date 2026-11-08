// Bounded original-byte recovery for exact 2026-11-08 production 200->404 hashes.
// SHA256, byte length and first-observed timestamps come from immutable successful
// GitHub asset-handoff #13604619152 (protected run #42448585724).
// Never manufacture a JS replacement, reset firstSeenAt, or relax 72h retention.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expectedAssetResponse, safeCriticalAsset } from './retain-critical-hashed-assets.mjs';

const SOURCE_VERSION = '953ec55d-c98c-41e8-b59e-613878d2a7c3';
const SOURCE_RELEASE = 'https://github.com/keeptxred/TexasDefined/actions/runs/42448585724/artifacts/13604619152';
const SNAPSHOT = '.artifacts/asset-handoff-snapshot.json';
const REPORT = '.artifacts/nov8-original-hash-recovery-report.json';
const ASSETS = 'dist/client/assets';
const MAX_ONE = 2 * 1024 * 1024;
const MAX_TOTAL = 4 * 1024 * 1024;
const AGE_MS = 72 * 3600000;
const TIMEOUT_MS = 7000;
const SHA = /^[a-f0-9]{64}$/;
const UUID = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/;

export const VERIFIED_NOV8_ORIGINALS = Object.freeze([
  { name: 'Header-BPIUxtUq.js', sha256: '9216b9ceacd87d52d90a4e29db65396cb89c58f810d664122acd784e92f58c91',
    bytes: 8272, firstSeenAt: '2026-11-08T04:56:04.752Z' },
  { name: 'Footer-B_uKx1E4.js', sha256: 'ca3036a1bf6cf24432152a6bebeb6b9d08c34108e4fa9c8a72ff3854ebadb19c',
    bytes: 4494, firstSeenAt: '2026-11-08T04:56:04.752Z' },
  { name: 'createLucideIcon-DbfCmcaA.js', sha256: 'cb24dd07da437d58b7cdd670528cabc16cf0801af8f8683ce97e51c7a9aa93ec',
    bytes: 1201, firstSeenAt: '2026-11-08T04:56:04.752Z' },
  { name: 'main-CHkeSoYv.js', sha256: '92998ebc4b63f476656bc672fcb8e6038432ec04a59498a63cc351819b6678b8',
    bytes: 1831570, firstSeenAt: '2026-11-06T15:45:46.630Z' },
]);

export function verifiedSourceUrl(version, name) {
  const assetPath = '/assets/' + name;
  if (!UUID.test(version) || !safeCriticalAsset(assetPath) || basename(assetPath) !== name || !name.endsWith('.js'))
    throw new Error('Invalid verified source or hashed asset path');
  return 'https://' + version.slice(0, 8) + '-texasdefined-site.freddy-coppola.workers.dev' + assetPath;
}

function assertRecord(record) {
  if (!SHA.test(record.sha256) || !Number.isInteger(record.bytes) || record.bytes <= 0 || record.bytes > MAX_ONE)
    throw new Error('Invalid immutable original SHA or source size for ' + record.name);
  const firstSeen = Date.parse(record.firstSeenAt);
  if (!Number.isFinite(firstSeen)) throw new Error('Missing original first-seen time for ' + record.name);
  verifiedSourceUrl(SOURCE_VERSION, record.name);
  return firstSeen;
}
function verifyOriginal(bytes, record) {
  const digest = createHash('sha256').update(bytes).digest('hex');
  if (bytes.length !== record.bytes || digest !== record.sha256)
    throw new Error('Original-byte integrity mismatch for /assets/' + record.name);
}

export async function recoverVerifiedNov8Originals({
  now = Date.now(), records = VERIFIED_NOV8_ORIGINALS,
  snapshotPath = SNAPSHOT, reportPath = REPORT, assetFolder = ASSETS,
  fetchImpl = fetch, sourceVersion = SOURCE_VERSION,
} = {}) {
  if (!UUID.test(sourceVersion) || records.length > 4 || records.reduce((n, r) => n + r.bytes, 0) > MAX_TOTAL)
    throw new Error('Original-byte recovery limit exceeded');
  const saved = JSON.parse(await readFile(snapshotPath, 'utf8'));
  const current = saved.snapshots?.at(-1);
  if (!current || !Array.isArray(current.pages) || !Array.isArray(current.builtAssets))
    throw new Error('Predeploy asset-handoff snapshot required');
  const report = {format: 1, checkedAt: new Date(now).toISOString(), sourceVersion, sourceRelease: SOURCE_RELEASE,
    maxAgeHours: 72, maxFiles: 4, maxBytes: MAX_TOTAL,
    recovered: [], alreadyInBuild: [], unresolved: [], expired: []};
  await mkdir(assetFolder, {recursive:true});
  for (const record of records) {
    const firstSeen = assertRecord(record);
    const path = '/assets/' + record.name;
    if (now < firstSeen || now - firstSeen > AGE_MS) {
      report.expired.push({path, firstSeenAt: record.firstSeenAt});
      continue;
    }
    const local = resolve(assetFolder, record.name);
    if (existsSync(local)) {
      verifyOriginal(await readFile(local), record);
      report.alreadyInBuild.push({path, sha256:record.sha256});
      continue;
    }
    let response;
    try {
      response = await fetchImpl(verifiedSourceUrl(sourceVersion, record.name), {
        redirect:'manual', cache:'no-store',
        headers:{'User-Agent':'TexasDefined-Source-SHA-Proven-Original-Recovery/1.0'},
        signal:AbortSignal.timeout(TIMEOUT_MS),
      });
    } catch {
      report.unresolved.push({path,reason:'original-version-unreachable'});
      continue;
    }
    const mime = response.headers.get('content-type') || '';
    const declared = Number(response.headers.get('content-length'));
    if (!expectedAssetResponse('js',response.status,mime,1) ||
        response.headers.get('cf-mitigated') === 'challenge') {
      report.unresolved.push({path,reason:'original-version-no-js-200',status:response.status});
      continue;
    }
    if (Number.isFinite(declared) && declared > MAX_ONE) throw new Error('Original-byte size cap exceeded for ' + path);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length > MAX_ONE) throw new Error('Original-byte size cap exceeded for ' + path);
    verifyOriginal(bytes,record);
    await writeFile(local,bytes);
    const previous = (current.retainedAssets || []).filter(x => x.path === path);
    for (const item of previous) {
      if (item.preSha256 && item.preSha256 !== record.sha256)
        throw new Error('Conflicting previous-original SHA for ' + path);
    }
    current.retainedAssets = [...(current.retainedAssets || []).filter(x => x.path !== path),{
      path,kind:'js',wasAvailable:true,preStatus:200,preSha256:record.sha256,
      firstSeenAt:record.firstSeenAt,bytes:record.bytes,sourceVersionId:sourceVersion,
      provenance:'source-matched-original-handoff-and-first-party-version',
    }];
    report.recovered.push({path,bytes:record.bytes,sha256:record.sha256,firstSeenAt:record.firstSeenAt});
  }
  await mkdir(dirname(snapshotPath), {recursive:true});
  await mkdir(dirname(reportPath), {recursive:true});
  await writeFile(snapshotPath,JSON.stringify(saved,null,2)+'\n');
  await writeFile(reportPath,JSON.stringify(report,null,2)+'\n');
  console.log('[nov8-original-hash-recovery] recovered='+report.recovered.length+
    ' alreadyInBuild='+report.alreadyInBuild.length+
    ' unresolved='+report.unresolved.length+' expired='+report.expired.length);
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] !== '--recover') throw new Error('Expected --recover');
  await recoverVerifiedNov8Originals();
}
