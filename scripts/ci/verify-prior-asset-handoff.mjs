// Only a successfully deployed artifact for the exact active Worker may seed
// outgoing Vite chunk history. Failed-run build filenames were never published.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const UUID=/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/;
const SHA=/^[a-f0-9]{40}$/;
const DIGEST=/^[a-f0-9]{64}$/;
const ASSET=/^\/assets\/[A-Za-z0-9_][A-Za-z0-9._-]*\.(?:js|css)$/;

export function verifyPriorAssetHandoff(snapshot, report, {expectedWorkerVersion,expectedSourceSha}={}) {
  if (!UUID.test(expectedWorkerVersion||'')) throw Error('Invalid active Worker version');
  if (!SHA.test(expectedSourceSha||'')) throw Error('Invalid successful run source SHA');
  const prior=Array.isArray(snapshot?.snapshots) ? snapshot.snapshots.at(-1) : null;
  if (!prior || prior.sourceCommit!==expectedSourceSha) throw Error('Prior source SHA does not match successful release');
  if (!Array.isArray(prior.builtAssets) || prior.builtAssets.length===0) throw Error('Prior release has no emitted assets');
  if (report?.expected!==expectedWorkerVersion) throw Error('Prior asset report does not match active Worker version');
  if (!Array.isArray(report.failures) || report.failures.length>0) throw Error('Prior release had failed asset deliveries');
  if (!Array.isArray(report.assets) || report.assets.length===0) throw Error('Prior asset report has no checks');
  const origins=new Map();
  for (const item of report.assets) {
    if (!ASSET.test(item?.path||'') || !['direct','canonical'].includes(item?.origin) ||
        item.ok!==true || item.status!==200 || !DIGEST.test(item.sha256||'') ||
        item.oldHashMatches===false) throw Error('Prior delivery contains an invalid SHA/status/origin');
    if (!origins.has(item.path)) origins.set(item.path,new Set());
    origins.get(item.path).add(item.origin);
  }
  const built=new Set();
  for (const asset of prior.builtAssets) {
    if (!ASSET.test(asset?.path||'')) throw Error('Unsafe emitted asset in prior snapshot');
    built.add(asset.path);
  }
  for (const path of built) {
    if (!origins.get(path)?.has('direct') || !origins.get(path)?.has('canonical'))
      throw Error('Missing direct and canonical SHA proof for emitted asset: '+path);
  }
  return {worker:expectedWorkerVersion,sha:expectedSourceSha,emitted:built.size,checked:report.assets.length};
}

if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const [snapshotPath, reportPath, expectedWorkerVersion, expectedSourceSha]=process.argv.slice(2);
  try {
    if (!snapshotPath||!reportPath) throw Error('Missing original handoff files');
    const [s,r]=await Promise.all([readFile(snapshotPath,'utf8').then(JSON.parse),readFile(reportPath,'utf8').then(JSON.parse)]);
    console.log(JSON.stringify(verifyPriorAssetHandoff(s,r,{expectedWorkerVersion,expectedSourceSha})));
  } catch (error) {
    console.error('::warning title=Reject false predecessor::'+String(error?.message||error));
    process.exitCode=1;
  }
}
