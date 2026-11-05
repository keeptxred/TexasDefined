// Staged publisher for future owner-approved KV storage.
// Uses injected KV API and supplied, independently fetched source bytes;
// no credentials, namespace creation, routing changes, automatic GC or deploy.
import { immutableAssetKey, verifyArchiveRecord } from './immutable-hashed-asset-archive.mjs';

async function digestHex(bytes) {
  const hash=await crypto.subtle.digest('SHA-256',bytes);
  return [...new Uint8Array(hash)].map(n=>n.toString(16).padStart(2,'0')).join('');
}
function toArrayBuffer(value) {
  if (value instanceof ArrayBuffer) return value;
  if (ArrayBuffer.isView(value))
    return value.buffer.slice(value.byteOffset,value.byteOffset+value.byteLength);
  throw new Error('Original bytes unavailable; refusing archive publication');
}
export async function verifyArchivedObject({value, metadata}, rec) {
  if (!value) return false;
  const r=verifyArchiveRecord(rec);
  const meta=typeof metadata==='string'?JSON.parse(metadata):metadata;
  if (!meta || meta.version!==1 || meta.path!==r.path ||
      meta.sha256!==r.preSha256 || meta.bytes!==r.bytes ||
      meta.contentType!==(r.kind==='css'?'text/css':'text/javascript') ||
      !Number.isFinite(Date.parse(meta.firstSeenAt || '')) ||
      Date.parse(meta.firstSeenAt)>Date.parse(r.firstSeenAt)) {
    throw new Error('Existing archive metadata conflicts with original immutable proof: '+r.path);
  }
  const bytes=toArrayBuffer(value);
  if (bytes.byteLength!==r.bytes || (await digestHex(bytes))!==r.preSha256)
    throw new Error('Existing archive original-byte SHA mismatch: '+r.path);
  return true;
}

export async function publishImmutableArchive({plan,namespace,readOriginalBytes}={}) {
  if (!plan || !Array.isArray(plan.allRecords) ||
      typeof namespace?.getWithMetadata!=='function' ||
      typeof namespace?.put!=='function' ||
      typeof readOriginalBytes!=='function') throw new Error('Archive publication prerequisites missing');
  if (!Array.isArray(plan.toPublish) || !Number.isSafeInteger(plan.newWrites) ||
      plan.newWrites !== plan.toPublish.length)
    throw new Error('Archive publication plan has no trustworthy write accounting');
  const newPaths = new Set(plan.toPublish.map((r) => r.path));
  const deferred=plan.deferredPaths || [];
  if (!Array.isArray(deferred))
    throw new Error('Archive publication plan has malformed deferred paths');
  const deferredPaths=new Set(deferred);
  if (deferred.length!==deferredPaths.size ||
      deferred.some(path=>typeof path!=='string' || newPaths.has(path)) ||
      newPaths.size !== plan.toPublish.length ||
      plan.allRecords.some((r) => !r || typeof r.path !== 'string') ||
      newPaths.size+deferredPaths.size > plan.allRecords.length ||
      [...newPaths,...deferredPaths].some((path) => !plan.allRecords.some((r) => r.path === path)))
    throw new Error('Archive publication plan references inconsistent or duplicate paths');
  const result={checked:0,newlyPublished:0,alreadyPresent:0,deferredCount:0,bytesPublished:0,
    fullyReadBack:false,globallyReplicated:false,readyForWorkerRouting:false};
  for(const proof of plan.allRecords) {
    const rec=verifyArchiveRecord(proof);
    const key=immutableAssetKey(rec.path);
    // Read every existing original-byte object, not only recent writes.
    // An already-used key is NEVER overwritten, even on a content mismatch.
    const current=await namespace.getWithMetadata(key,'arrayBuffer');
    result.checked++;
    if (await verifyArchivedObject(current,rec)) {result.alreadyPresent++;continue;}
    // A bootstrap-only deferred original has NO write allocation today.
    // Its absence is reported, never quietly counted as archived.
    if (deferredPaths.has(rec.path)) {result.deferredCount++;continue;}
    // An object that the signed release manifest says was already published
    // must never silently disappear and consume an unbudgeted new KV write.
    if (!newPaths.has(rec.path))
      throw new Error('Previously published immutable object is missing: '+rec.path);
    const original=toArrayBuffer(await readOriginalBytes(rec));
    if (original.byteLength!==rec.bytes || await digestHex(original)!==rec.preSha256)
      throw new Error('Original-byte source failed SHA-256 verification: '+rec.path);
    const metadata={version:1,path:rec.path,sha256:rec.preSha256,
      bytes:rec.bytes,firstSeenAt:rec.firstSeenAt,
      contentType:rec.kind==='css'?'text/css':'text/javascript'};
    // No TTL: omission and GC require independent signed reference evidence.
    await namespace.put(key,original,{metadata});
    const readBack=await namespace.getWithMetadata(key,'arrayBuffer');
    if (!await verifyArchivedObject(readBack,rec))
      throw new Error('New immutable object absent after write: '+rec.path);
    result.newlyPublished++;
    result.bytesPublished+=rec.bytes;
  }
  // Same-namespace readback proves stored bytes, NOT global propagation.
  // Never allow the deployment orchestrator to confuse this with readiness.
  result.fullyReadBack=result.deferredCount===0;
  return result;
}
