// Reproducible predeployment inventory; deliberately independent of Cloudflare.
// Produces original-byte evidence and a bounded publication plan from the
// actual build output. No network, namespace provisioning or deploy side effects.
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  MAX_ASSET_BYTES, immutableAssetPath, planImmutablePublication, verifyArchiveRecord,
} from './immutable-hashed-asset-archive.mjs';

const SHA = /^[a-f0-9]{64}$/;
const COMMIT = /^[a-f0-9]{40}$/;

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}
function checkedHistorical(proof, now) {
  if (!immutableAssetPath(proof?.path) || !SHA.test(proof?.preSha256 || ''))
    throw new Error('Historical original-byte proof missing valid path/SHA-256');
  const first = Date.parse(proof.firstSeenAt || '');
  if (!Number.isFinite(first) || first > now + 60_000)
    throw new Error('Historical first-seen evidence invalid');
  if (proof.bytes !== undefined &&
      (!Number.isSafeInteger(proof.bytes) || proof.bytes < 1 || proof.bytes > MAX_ASSET_BYTES))
    throw new Error('Historical proof size is invalid');
  return { ...proof, firstSeenAt:new Date(first).toISOString() };
}

// requiredHistorical contains all proven old hashes that have NOT yet been
// independently archived. Every one must have verified bytes in this build.
// published contains only objects whose independent archive has already been
// verified, never merely emitted files or observed healthy HTTP responses.
export async function scanImmutableAssetBuild({
  assetDirectory, sourceSha, now=Date.now(), requiredHistorical=[],
  published=[], writesToday=0, allowPartial=false,
}={}) {
  if (typeof assetDirectory!=='string' || !assetDirectory.trim() ||
      !COMMIT.test(sourceSha || '') || !Array.isArray(requiredHistorical))
    throw new Error('Reproducible build inventory prerequisites missing');
  const historical=new Map();
  for(const raw of requiredHistorical) {
    const proof=checkedHistorical(raw, now), existing=historical.get(proof.path);
    if (existing && existing.preSha256!==proof.preSha256)
      throw new Error('Contradictory historical SHA-256 for '+proof.path);
    if (existing && existing.bytes!==undefined && proof.bytes!==undefined &&
        existing.bytes!==proof.bytes) throw new Error('Contradictory historical size for '+proof.path);
    if (!existing || proof.firstSeenAt<existing.firstSeenAt)
      historical.set(proof.path,proof);
  }
  const entries=(await readdir(assetDirectory,{withFileTypes:true}))
    .sort((a,b)=>a.name.localeCompare(b.name));
  const scanned=[];
  const filePaths=new Map();
  let skippedNonJsCss=0;
  for(const entry of entries) {
    if (!/\.(?:js|css)$/.test(entry.name)) {
      skippedNonJsCss++;
      continue;
    }
    if (!entry.isFile()) throw new Error('Refusing non-file or symlink JS/CSS asset: '+entry.name);
    const path='/assets/'+entry.name;
    if (!immutableAssetPath(path)) throw new Error('Unhashed or unsafe JS/CSS in asset build: '+path);
    const diskPath=join(assetDirectory,entry.name);
    const body=await readFile(diskPath);
    if (body.length<1 || body.length>MAX_ASSET_BYTES)
      throw new Error('Invalid original asset size: '+path);
    const digest=sha256(body);
    const prior=historical.get(path);
    if (prior && (prior.preSha256!==digest ||
        (prior.bytes!==undefined && prior.bytes!==body.length)))
      throw new Error('Current build contradicts previously verified original bytes: '+path);
    const firstSeenAt=prior?.firstSeenAt || new Date(now).toISOString();
    const record=verifyArchiveRecord({
      path, preSha256:digest, bytes:body.length,
      firstSeenAt, lastObservedAt:new Date(now).toISOString(),
    },now);
    scanned.push(record);
    filePaths.set(path,diskPath);
  }
  const publishedPaths=new Map(published.map(x=>[x.path,x]));
  for(const proof of historical.values()) {
    if (filePaths.has(proof.path)) continue;
    const inArchive=publishedPaths.get(proof.path);
    if (!inArchive || inArchive.preSha256!==proof.preSha256 ||
        (proof.bytes!==undefined && proof.bytes!==inArchive.bytes))
      throw new Error('Previously healthy unarchived original bytes missing from release: '+proof.path);
  }
  const plan=planImmutablePublication({stored:published,incoming:scanned,now,writesToday,allowPartial});
  const manifest={
    format:1,
    sourceSha,
    builtAt:new Date(now).toISOString(),
    totalBytes:plan.totalBytes,
    archivedRecordCount:plan.allRecords.length,
    newRecordCount:plan.newWrites,
    deferredRecordCount:plan.deferredPaths.length,
    archiveComplete:plan.archiveComplete,
    skippedNonJsCss,
    records:plan.allRecords,
  };
  return {
    plan, manifest,
    // The bytes are read again during publication. A stale/modified build
    // cannot silently reuse the earlier digest; the caller must fail closed.
    readOriginalBytes:async (raw)=>{
      const rec=verifyArchiveRecord(raw,now);
      const diskPath=filePaths.get(rec.path);
      if (!diskPath) throw new Error('Original build source unavailable: '+rec.path);
      const body=await readFile(diskPath);
      if (body.byteLength!==rec.bytes || sha256(body)!==rec.preSha256)
        throw new Error('Original build changed after evidence capture: '+rec.path);
      return body;
    },
  };
}
