// Scoped emergency repair for Cloudflare-observed missing immutable JS.
// Try only named old first-party Worker versions and exact logged filenames.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { safeCriticalAsset, expectedAssetResponse } from './retain-critical-hashed-assets.mjs';

const SNAPSHOT = '.artifacts/asset-handoff-snapshot.json';
const REPORT = '.artifacts/observed-hash-recovery-report.json';
const FOLDER = 'dist/client/assets';
const FIRST_SEEN = '2026-11-02T13:00:00.000Z';
const EXPIRES = Date.parse(FIRST_SEEN) + 72 * 3600000;
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_ONE = 2 * 1024 * 1024;
const TIMEOUT_MS = 7000;

// Verified real Cloudflare deployment/version IDs from Nov 1-2. Read-only
// versions API returned has_preview:true for the inspected old version.
export const OLD_VERSIONS = [
  '35e64cd8-455b-4dc3-b787-23776dc409b2',
  'dc5054f9-0dac-4249-aa8c-e02bb7248e20',
  '6d846178-9950-4f29-9996-4152b20cb25d',
  'edb72b9a-5ece-4645-973e-ff82b456bf95',
  '3dcb8101-ae9a-4e19-a407-07dfa4295802',
  'ef20fb06-2a12-4e42-97df-bdb7b1f955a5',
  'ac24c6c9-0e4d-457b-bb9b-0eef784f6760',
  'b633bf9c-a11d-418f-91ae-8f313c4e83db',
];
// Cloudflare verified these exact six historical versions have Worker previews.
// Prefer the 16:45Z generation that first emitted the newly reported Bing/Meta
// missing chunk hashes; do not infer the bytes without an actual HTTP200/MIME.
export const RECENT_OBSERVED_VERSIONS = [
  '65d863d0-6653-4730-8d0b-0e7a6d443422',
  'a46f31de-690e-41b0-875b-ab7695e9a4af',
  '70916cb7-79b8-4b20-bc25-8ffec3e96dd4',
  '9b183816-2c48-407e-b0d7-72a8234bbb17',
  '36c47041-8817-425e-9bbd-c71dab3b8ab9',
  'f9a676e3-3dc8-4b07-ae90-9723ffdf0d94',
];
export const RECENT_MISSING = new Set([
  'PropertyCalculatorFramework-BfNaFZpi.js',
  'AnswerSummary-ClpRNP9w.js',
  'texas-home-insurance-calculator.lazy-B-Cusmus.js',
  'main-BmrHq_-j.js',
  'destination._slug-BGfPNobU.js',
  'Container-2O1NhOAV.js',
]);
export const LOGGED_MISSING = [
  'useQuery-6nTz4IUX.js','ArticleCard-OgqXjgNN.js',
  'useBaseQuery-DAwRZeNC.js','ElPasoAreaAuthority-D_3Wtymp.js',
  'ArticleBody-Dfj6eFOG.js','external-link-DASm7Sot.js',
  'FootballFanOffers-DXCuhNe8.js','DestinationCard-CogOLLKC.js',
  'x-BRh_JR62.js','Header-C0Y_eOti.js','Container-mLbojg-d.js',
  'createLucideIcon-XSyG3BFp.js','article._slug-CoDD5yKy.js',
  'article._slug-DsyPOW_g.js','SectionHeader-Do5UIIvo.js',
  'internal-linking-Dmlhp8ZR.js','RouteStatusScreens-BZDUkz0q.js',
  'useLocation-CqpO0pgs.js','UnusualBusinessAuthorityPanel-oTnuUrSP.js',
  ...RECENT_MISSING,
];
// Authenticated 2026-11-02 production run #41496225567 proved these exact
// twelve old hashes absent from the first three version previews. Avoid
// repeating that known-failing cohort; scan the five older pinned versions.
export const FIRST_THREE_VERSION_MISSES = new Set([
  'useQuery-6nTz4IUX.js', 'ArticleCard-OgqXjgNN.js',
  'useBaseQuery-DAwRZeNC.js', 'ElPasoAreaAuthority-D_3Wtymp.js',
  'ArticleBody-Dfj6eFOG.js', 'external-link-DASm7Sot.js',
  'FootballFanOffers-DXCuhNe8.js', 'DestinationCard-CogOLLKC.js',
  'x-BRh_JR62.js', 'SectionHeader-Do5UIIvo.js',
  'internal-linking-Dmlhp8ZR.js', 'UnusualBusinessAuthorityPanel-oTnuUrSP.js',
]);
const MAX_HISTORICAL_PROBES = 135;
export function pinnedVersionUrl(versionId, path) {
  if (!/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(versionId))
    throw Error('Invalid pinned version ID');
  if (!safeCriticalAsset(path) || !path.endsWith('.js')) throw Error('Unsafe hashed JS path');
  return 'https://' + versionId.slice(0,8) +
    '-texasdefined-site.freddy-coppola.workers.dev' + path;
}
async function sourceBytes(version, path, fetchImpl) {
  try {
    const response = await fetchImpl(pinnedVersionUrl(version,path), {
      redirect:'manual', cache:'no-store',
      headers:{'User-Agent':'TexasDefined-Pinned-Old-Hash-Recovery/1.0'},
      signal:AbortSignal.timeout(TIMEOUT_MS),
    });
    if (response.status !== 200 || response.headers.get('cf-mitigated') === 'challenge') return null;
    const mime=response.headers.get('content-type') || '';
    if (!expectedAssetResponse('js',200,mime,1)) return null;
    const declared=Number(response.headers.get('content-length'));
    if (Number.isFinite(declared) && declared > MAX_ONE) return null;
    const bytes=Buffer.from(await response.arrayBuffer());
    if (!bytes.length || bytes.length > MAX_ONE) return null;
    return {bytes,sha256:createHash('sha256').update(bytes).digest('hex'),version};
  } catch { return null; }
}
export async function recoverObserved({
  now=Date.now(), filenames=LOGGED_MISSING, versions=OLD_VERSIONS,
  recentVersions=RECENT_OBSERVED_VERSIONS,
  snapshotPath=SNAPSHOT, reportPath=REPORT, folder=FOLDER, fetchImpl=fetch,
}={}) {
  if (filenames.length > 28 || versions.length > 8 || recentVersions.length > 6)
    throw Error('Historical recovery bounds exceeded');
  const snapshot=JSON.parse(await readFile(snapshotPath,'utf8'));
  const latest=snapshot.snapshots?.at(-1);
  if (!latest || !Array.isArray(latest.pages)) throw Error('Predeploy snapshot required');
  const report={format:1,checkedAt:new Date(now).toISOString(),
    expired:now>EXPIRES,probed:[],recovered:[],alreadyInBuild:[],unresolved:[],
    expiresAt:new Date(EXPIRES).toISOString(),maxBytes:MAX_BYTES};
  await mkdir(folder,{recursive:true});
  if (!report.expired) {
    const missing=[];
    for (const name of filenames) {
      const path='/assets/'+name;
      if (!safeCriticalAsset(path) || basename(path)!==name) throw Error('Invalid logged hash '+name);
      if (existsSync(resolve(folder,name))) report.alreadyInBuild.push(path);
      else missing.push({name,path});
    }
    // The newest real Bing/Meta failures take priority if the hard, bounded
    // remote-probe ceiling is reached. Never silently treat skips as recovered.
    missing.sort((a, b) => Number(RECENT_MISSING.has(b.name)) - Number(RECENT_MISSING.has(a.name)));
    // Every historical response is checked on its exact path. The previous
    // canary-based shortcut falsely ignored old versions that lacked the sample
    // file but could retain a different missing import. This pass is bounded by
    // 85 requests total and skips the three versions already proven absent for
    // 12 exact hashes in the prior signed production artifact.
    let total=0;
    for (const item of missing) {
      let result=null;
      const candidates = RECENT_MISSING.has(item.name) ? recentVersions
        : FIRST_THREE_VERSION_MISSES.has(item.name) ? versions.slice(3) : versions;
      for (const version of candidates) {
        if (report.probed.length >= MAX_HISTORICAL_PROBES) break;
        result=await sourceBytes(version,item.path,fetchImpl);
        report.probed.push({version,path:item.path,matched:Boolean(result)});
        if(result)break;
      }
      if(!result) {
        report.unresolved.push({path:item.path,reason:report.probed.length >= MAX_HISTORICAL_PROBES?'historical-probe-budget-reached':'not-in-pinned-versions'});
        continue;
      }
      if (total+result.bytes.length>MAX_BYTES) {
        report.unresolved.push({path:item.path,reason:'size-budget'});
        continue;
      }
      await writeFile(resolve(folder,item.name),result.bytes);
      total+=result.bytes.length;
      const recovered={path:item.path,kind:'js',wasAvailable:true,preStatus:200,
        preSha256:result.sha256,firstSeenAt:FIRST_SEEN,bytes:result.bytes.length,
        sourceVersionId:result.version,provenance:'pinned-first-party-worker-version'};
      latest.retainedAssets=[...(latest.retainedAssets||[]).filter(x=>x.path!==item.path),recovered];
      report.recovered.push({path:item.path,bytes:recovered.bytes,sha256:recovered.preSha256,
        sourceVersionId:recovered.sourceVersionId});
    }
    report.bytes=total;
  }
  await mkdir(dirname(snapshotPath),{recursive:true});
  await mkdir(dirname(reportPath),{recursive:true});
  await writeFile(snapshotPath,JSON.stringify(snapshot,null,2)+'\n');
  await writeFile(reportPath,JSON.stringify(report,null,2)+'\n');
  console.log('[old-worker-hash-recovery] copied='+report.recovered.length+
    ' unresolved='+report.unresolved.length+' old-version-preview-probes='+report.probed.length+
    ' expired='+report.expired);
  for(const r of report.unresolved)console.warn('::warning title=Unrecoverable old hash::'+r.path+' '+r.reason);
  return report;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  if(process.argv[2]!=='--recover')throw Error('Expected --recover');
  await recoverObserved();
}
