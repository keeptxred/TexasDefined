// Restore only two SHA-proven original CSS objects lost across historical releases.
// Source: protected production run #42448585724, original handoff artifact #13604619152.
// Do not reset firstSeenAt, create synthetic CSS or bypass the 72-hour expiry.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expectedAssetResponse, safeCriticalAsset } from './retain-critical-hashed-assets.mjs';

const VERSION = '953ec55d-c98c-41e8-b59e-613878d2a7c3';
const SOURCE_RELEASE = 'https://github.com/keeptxred/TexasDefined/actions/runs/42448585724/artifacts/13604619152';
const SNAPSHOT = '.artifacts/asset-handoff-snapshot.json';
const REPORT = '.artifacts/nov8-original-css-recovery-report.json';
const ASSETS = 'dist/client/assets';
const MAX_FILES = 2;
const MAX_ONE = 256 * 1024;
const MAX_TOTAL = 512 * 1024;
const EXPIRY_MS = 72 * 3600000;
const TIMEOUT_MS = 7000;
const SHA = /^[a-f0-9]{64}$/;
const UUID = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/;

export const VERIFIED_STYLES = Object.freeze([
  {name:'styles-Ckztjzs1.css',
    sha256:'a76c72bfdfbed25c3c915f0ea73df00714f0d567754f9dd1a13409a4319fdad0',
    bytes:142700,firstSeenAt:'2026-11-07T19:44:54.047Z'},
  {name:'styles-q4uoQ0Q0.css',
    sha256:'c247699ef384ddc47cbc767310b6008c5a95fd025756c3cbcf55f02e9b599785',
    bytes:142705,firstSeenAt:'2026-11-05T19:36:47.690Z'},
]);

export function originalCssUrl(version, name) {
  if (!UUID.test(version) || !safeCriticalAsset('/assets/'+name) ||
      !/^styles-[A-Za-z0-9_-]+\.css$/.test(name) || basename(name)!==name)
    throw Error('Unsafe original CSS source or filename');
  return 'https://'+version.slice(0,8)+'-texasdefined-site.freddy-coppola.workers.dev/assets/'+name;
}
function assertOriginalBytes(bytes, record) {
  if (bytes.length!==record.bytes ||
      createHash('sha256').update(bytes).digest('hex')!==record.sha256)
    throw Error('Immutable original CSS SHA/length mismatch for '+record.name);
}

export async function recoverOriginalCss({
  records=VERIFIED_STYLES,now=Date.now(),sourceVersion=VERSION,
  snapshotPath=SNAPSHOT,reportPath=REPORT,assetFolder=ASSETS,fetchImpl=fetch
}={}) {
  if (!UUID.test(sourceVersion) || !Array.isArray(records) || records.length>MAX_FILES ||
      records.reduce((n,x)=>n+x.bytes,0)>MAX_TOTAL)
    throw Error('Original CSS recovery budget exceeded');
  const archive=JSON.parse(await readFile(snapshotPath,'utf8'));
  const snapshot=archive.snapshots?.at(-1);
  if (!snapshot || !Array.isArray(snapshot.pages) || !Array.isArray(snapshot.builtAssets))
    throw Error('Genuine predeploy source-matched handoff required');
  const report={format:1,checkedAt:new Date(now).toISOString(),sourceRelease:SOURCE_RELEASE,
    sourceVersion,originalAgeHours:72,maxFiles:MAX_FILES,maxBytes:MAX_TOTAL,
    recovered:[],alreadyInBuild:[],expired:[],unresolved:[]};
  await mkdir(assetFolder,{recursive:true});
  for(const record of records) {
    if(!SHA.test(record.sha256) || !Number.isInteger(record.bytes) || record.bytes<1 ||
       record.bytes>MAX_ONE)
      throw Error('Invalid SHA or original CSS byte count for '+record.name);
    const url=originalCssUrl(sourceVersion,record.name);
    const firstSeen=Date.parse(record.firstSeenAt);
    if(!Number.isFinite(firstSeen)) throw Error('Missing immutable firstSeenAt '+record.name);
    const path='/assets/'+record.name;
    if(now<firstSeen || now-firstSeen>EXPIRY_MS) {
      report.expired.push({path,firstSeenAt:record.firstSeenAt});
      continue;
    }
    const local=resolve(assetFolder,record.name);
    if(existsSync(local)) {
      assertOriginalBytes(await readFile(local),record);
      report.alreadyInBuild.push({path,sha256:record.sha256});
      continue;
    }
    let response;
    try {
      response=await fetchImpl(url,{redirect:'manual',cache:'no-store',
        headers:{'User-Agent':'TexasDefined-Proven-Original-CSS/1.0'},
        signal:AbortSignal.timeout(TIMEOUT_MS)});
    } catch {
      report.unresolved.push({path,reason:'source-unreachable'});
      continue;
    }
    const mime=response.headers.get('content-type')||'';
    const declared=Number(response.headers.get('content-length'));
    if(!expectedAssetResponse('css',response.status,mime,1) ||
       response.headers.get('cf-mitigated')==='challenge') {
      report.unresolved.push({path,reason:'source-not-original-css',status:response.status});
      continue;
    }
    if(Number.isFinite(declared) && declared>MAX_ONE)
      throw Error('Original CSS too large '+path);
    const bytes=Buffer.from(await response.arrayBuffer());
    if(bytes.length>MAX_ONE) throw Error('Original CSS too large '+path);
    assertOriginalBytes(bytes,record);
    const collisions=(snapshot.retainedAssets||[]).filter(x=>x.path===path);
    if(collisions.some(x=>x.preSha256 && x.preSha256!==record.sha256))
      throw Error('Conflicting previous CSS SHA '+path);
    await writeFile(local,bytes);
    snapshot.retainedAssets=[...(snapshot.retainedAssets||[]).filter(x=>x.path!==path),{
      path,kind:'css',wasAvailable:true,preStatus:200,preSha256:record.sha256,
      bytes:record.bytes,firstSeenAt:record.firstSeenAt,sourceVersionId:sourceVersion,
      provenance:'original-source-SHA-verified-protected-release',
    }];
    report.recovered.push({path,bytes:record.bytes,sha256:record.sha256,firstSeenAt:record.firstSeenAt});
  }
  await mkdir(dirname(snapshotPath),{recursive:true});
  await mkdir(dirname(reportPath),{recursive:true});
  await writeFile(snapshotPath,JSON.stringify(archive,null,2)+'\n');
  await writeFile(reportPath,JSON.stringify(report,null,2)+'\n');
  console.log('[nov8-original-css] recovered='+report.recovered.length+
    ' alreadyInBuild='+report.alreadyInBuild.length+
    ' unresolved='+report.unresolved.length+' expired='+report.expired.length);
  return report;
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  if(process.argv[2]!=='--recover') throw Error('Expected --recover');
  await recoverOriginalCss();
}
