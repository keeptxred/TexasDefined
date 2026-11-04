// Pure, non-deployed archive core for a future owner-approved KV binding.
// No namespace creation, secret use, source-to-Worker routing or public writes.
// Must only be activated after prepublication and two-origin acceptance.
export const MAX_ASSET_BYTES = 2 * 1024 * 1024;
export const MAX_KV_BYTES = 1024 * 1024 * 1024;
export const FREE_KV_WRITES_PER_DAY = 1000;
export const MIN_GC_QUIET_MS = 30 * 24 * 60 * 60 * 1000;
const ASSET_PATH = /^\/assets\/[A-Za-z0-9][A-Za-z0-9._-]{1,155}-[A-Za-z0-9_-]{8,20}\.(?:js|css)$/;
const SHA = /^[a-f0-9]{64}$/;
const COMMIT_SHA = /^[a-f0-9]{40}$/;
const ABSOLUTE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 365;

export function immutableAssetPath(path) {
  return typeof path === 'string' && ASSET_PATH.test(path) && !path.includes('..');
}
export function immutableAssetKey(path) {
  if (!immutableAssetPath(path)) throw new Error('Refuse non-hashed or unsafe asset path');
  return 'immutable:v1:' + path;
}
function timestamp(value, name) {
  const t = Date.parse(value || '');
  if (!Number.isFinite(t)) throw new Error('Invalid '+name);
  return t;
}
export function verifyArchiveRecord(record, now = Date.now()) {
  if (!immutableAssetPath(record?.path)) throw new Error('Unsafe immutable path');
  if (!SHA.test(record?.preSha256 || '')) throw new Error('Original-byte SHA-256 required');
  if (!Number.isSafeInteger(record?.bytes) || record.bytes < 1 || record.bytes > MAX_ASSET_BYTES)
    throw new Error('Original file size outside bounded safety limits');
  const first = timestamp(record.firstSeenAt, 'firstSeenAt');
  const last = timestamp(record.lastObservedAt || record.firstSeenAt, 'lastObservedAt');
  if (first > now + 60000 || last < first || last > now + 60000 ||
      last - first > ABSOLUTE_MAX_AGE_MS) throw new Error('Invalid original observation window');
  return { path:record.path, preSha256:record.preSha256, bytes:record.bytes,
    firstSeenAt:new Date(first).toISOString(), lastObservedAt:new Date(last).toISOString(),
    kind:record.path.endsWith('.css')?'css':'js' };
}
export function planImmutablePublication({
  stored = [], incoming = [], now = Date.now(),
  maxTotalBytes = MAX_KV_BYTES, maxDailyWrites = FREE_KV_WRITES_PER_DAY, writesToday = 0,
} = {}) {
  if (!Array.isArray(stored) || !Array.isArray(incoming)) throw new Error('Archive input must be arrays');
  const all = new Map(), published = new Set();
  function insert(rec, alreadyPublished) {
    const r = verifyArchiveRecord(rec, now), previous = all.get(r.path);
    if (previous && (previous.preSha256 !== r.preSha256 || previous.bytes !== r.bytes))
      throw new Error('Immutable filename collision: ' + r.path);
    if (previous) {
      r.firstSeenAt = previous.firstSeenAt < r.firstSeenAt ? previous.firstSeenAt : r.firstSeenAt;
      r.lastObservedAt = previous.lastObservedAt > r.lastObservedAt ? previous.lastObservedAt : r.lastObservedAt;
    }
    all.set(r.path,r);
    if (alreadyPublished) published.add(r.path);
  }
  for (const rec of stored) insert(rec,true);
  for (const rec of incoming) insert(rec,false);
  const allRecords=[...all.values()].sort((a,b)=>a.path.localeCompare(b.path));
  const newRecords=allRecords.filter(r=>!published.has(r.path));
  const totalBytes=allRecords.reduce((sum,r)=>sum+r.bytes,0);
  if (totalBytes > maxTotalBytes) throw new Error('Archive storage budget exceeded; fail closed');
  if (!Number.isSafeInteger(writesToday) || writesToday<0 ||
      writesToday+newRecords.length > maxDailyWrites)
    throw new Error('Archive daily KV write quota exceeded; fail closed');
  return { allRecords, toPublish:newRecords, newWrites:newRecords.length,
    totalBytes, remainingBytes:maxTotalBytes-totalBytes,
    remainingDailyWrites:maxDailyWrites-writesToday-newRecords.length };
}

// Produces candidates ONLY; does not delete bytes. A separate protected,
// signed GC workflow must prove all historic cache and HTML lifetimes before
// authorizing removal. Old browser tabs can outlive CDN HTML headers.
export function proposeGarbageCollection({
  stored = [], now = Date.now(), activeReferencePaths = [],
  absenceProofs = [], quietMs = MIN_GC_QUIET_MS,
} = {}) {
  if (!Array.isArray(absenceProofs) || absenceProofs.length < 2) return [];
  const proofs = absenceProofs.slice(-2);
  // This shape check is NOT cryptographic signature verification. Caller
  // must independently validate the release ledger before passing proofs.
  if (!proofs.every(p=>p && p.signed===true && typeof p.workerVersion==='string' &&
    p.workerVersion.length>0 && typeof p.sourceSha==='string' && COMMIT_SHA.test(p.sourceSha) &&
    Array.isArray(p.referencedPaths) && Number.isFinite(Date.parse(p.capturedAt)) &&
    Date.parse(p.capturedAt)<=now)) return [];
  if (proofs[0].workerVersion===proofs[1].workerVersion) return [];
  const protectedPaths = new Set(activeReferencePaths);
  for (const proof of proofs) for (const path of proof.referencedPaths) protectedPaths.add(path);
  return stored.map(r=>verifyArchiveRecord(r,now))
    .filter(r=>!protectedPaths.has(r.path) &&
      proofs.every(p=>timestamp(p.capturedAt,'capturedAt') > timestamp(r.lastObservedAt,'lastObservedAt')) &&
      now-timestamp(r.lastObservedAt,'lastObservedAt') >= quietMs);
}

async function sha256(buffer) {
  const raw=await crypto.subtle.digest('SHA-256',buffer);
  return [...new Uint8Array(raw)].map(n=>n.toString(16).padStart(2,'0')).join('');
}
function refusal() {
  return new Response('Immutable asset archive integrity unavailable', {
    status:503,headers:{'content-type':'text/plain; charset=utf-8','cache-control':'no-store'},
  });
}

// Returns null when unbound or not archived. The eventual Worker must first
// ask its current static ASSETS binding and ONLY fall back after a genuine 404.
// Do not redirect, rewrite hashed filenames or turn a 5xx into stale bytes.
export async function archivedAssetResponse(request, namespace) {
  if (!['GET','HEAD'].includes(request?.method)) return null;
  const path=new URL(request.url).pathname;
  if (!immutableAssetPath(path) || !namespace) return null;
  if (typeof namespace.getWithMetadata !== 'function') return refusal();
  let object;
  try { object=await namespace.getWithMetadata(immutableAssetKey(path),'arrayBuffer'); }
  catch { return refusal(); }
  if (!object?.value) return null;
  try {
    const metadata=typeof object.metadata==='string'?JSON.parse(object.metadata):object.metadata;
    if (!metadata || metadata.version!==1 || metadata.path!==path) return refusal();
    const bytes=object.value;
    if (!(bytes instanceof ArrayBuffer) || bytes.byteLength<1 || bytes.byteLength>MAX_ASSET_BYTES ||
        metadata.bytes!==bytes.byteLength || !SHA.test(metadata.sha256)) return refusal();
    if (metadata.contentType !== (path.endsWith('.css')?'text/css':'text/javascript')) return refusal();
    if (await sha256(bytes)!==metadata.sha256) return refusal();
    return new Response(request.method==='HEAD'?null:bytes,{
      status:200,headers:{
        'content-type':metadata.contentType,
        'content-length':String(bytes.byteLength),
        'cache-control':'public, max-age=31536000, immutable',
        'x-content-type-options':'nosniff',
      },
    });
  } catch { return refusal(); }
}
