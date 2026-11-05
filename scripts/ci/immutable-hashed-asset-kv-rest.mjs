// Cloudflare KV REST transport for a future owner-approved immutable archive.
// Constructor is inert. It NEVER provisions infrastructure and has no
// side effects until methods are explicitly invoked by an authorized release.
// No deletion, bulk overwrite, TTL, redirects or client-visible credentials.
import {
  MAX_KV_BYTES, immutableAssetKey, immutableAssetPath, verifyArchiveRecord,
} from './immutable-hashed-asset-archive.mjs';

const ID=/^[a-f0-9]{32}$/;
const PREFIX='immutable:v1:/assets/';
const BASE='https://api.cloudflare.com/client/v4';
const MAX_PAGES=200;

async function parseResponse(response, action) {
  if (!response.ok) throw new Error(action+' failed HTTP '+response.status);
  let json;
  try {json=await response.json();}
  catch {throw new Error(action+' returned invalid JSON');}
  if (!json || json.success!==true)
    throw new Error(action+' API declined operation');
  return json;
}

export function createImmutableKvRestTransport({
  accountId, namespaceId, token, fetchImpl=fetch,
}={}) {
  if (!ID.test(accountId || '') || !ID.test(namespaceId || '') ||
      typeof token!=='string' || !token.trim() || typeof fetchImpl!=='function')
    throw new Error('Dedicated KV account, namespace and token required');
  const root=BASE+'/accounts/'+accountId+'/storage/kv/namespaces/'+namespaceId;
  const headers={Authorization:'Bearer '+token};
  const call=(url,options={})=>fetchImpl(url,{
    redirect:'error',signal:AbortSignal.timeout(20000),
    ...options,headers:{...headers,...(options.headers||{})},
  });
  async function getWithMetadata(key, type='arrayBuffer') {
    if (type!=='arrayBuffer' || typeof key!=='string' ||
        !key.startsWith(PREFIX) || !immutableAssetPath(key.slice('immutable:v1:'.length)) ||
        key!==immutableAssetKey(key.slice('immutable:v1:'.length)))
      throw new Error('Refuse unapproved immutable KV read key');
    const url=root+'/values/'+encodeURIComponent(key);
    const valueResponse=await call(url,{method:'GET'});
    if (valueResponse.status===404) return {value:null,metadata:null};
    if (!valueResponse.ok) throw new Error('Immutable KV value read failed HTTP '+valueResponse.status);
    const bytes=await valueResponse.arrayBuffer();
    const metadataResponse=await call(root+'/metadata/'+encodeURIComponent(key),{method:'GET'});
    const data=await parseResponse(metadataResponse,'Immutable KV metadata read');
    if (!data.result) throw new Error('Original immutable object has missing KV metadata');
    return {value:bytes,metadata:data.result};
  }
  async function put(key,value,{metadata}={}) {
    if (typeof key!=='string' || !key.startsWith(PREFIX) ||
        !immutableAssetPath(key.slice('immutable:v1:'.length)))
      throw new Error('Refuse unapproved immutable KV write key');
    const record=verifyArchiveRecord({
      path:metadata?.path,preSha256:metadata?.sha256,bytes:metadata?.bytes,
      firstSeenAt:metadata?.firstSeenAt,lastObservedAt:metadata?.firstSeenAt,
    });
    if (key!==immutableAssetKey(record.path) || metadata.version!==1 ||
        metadata.contentType!==(record.kind==='css'?'text/css':'text/javascript'))
      throw new Error('Refuse mismatched immutable KV publication');
    const body=value instanceof ArrayBuffer?value:
      ArrayBuffer.isView(value)?
        value.buffer.slice(value.byteOffset,value.byteOffset+value.byteLength):null;
    if (!(body instanceof ArrayBuffer) || body.byteLength!==record.bytes)
      throw new Error('Refuse malformed immutable KV publication bytes');
    // Defense in depth: even a caller that bypasses publishImmutableArchive()
    // cannot send wrong original bytes under a verified immutable name.
    const digest=await crypto.subtle.digest('SHA-256',body);
    const actualSha=[...new Uint8Array(digest)]
      .map(n=>n.toString(16).padStart(2,'0')).join('');
    if (actualSha!==record.preSha256)
      throw new Error('Refuse original-byte SHA mismatch in immutable KV upload');
    const form=new FormData();
    form.append('value',new Blob([body],{type:'application/octet-stream'}));
    form.append('metadata',JSON.stringify(metadata));
    await parseResponse(await call(
      root+'/values/'+encodeURIComponent(key),{method:'PUT',body:form}),
      'Immutable KV write');
  }
  async function listStoredRecords({now=Date.now()}={}) {
    const records=[], seenKeys=new Set(),seenCursor=new Set();
    let cursor,bytes=0;
    for(let page=0;page<MAX_PAGES;page++) {
      const url=new URL(root+'/keys');
      url.searchParams.set('prefix',PREFIX);
      url.searchParams.set('limit','1000');
      if(cursor) url.searchParams.set('cursor',cursor);
      const result=await parseResponse(await call(url,{method:'GET'}),'Immutable KV key listing');
      if(!Array.isArray(result.result))
        throw new Error('KV listing has no trustworthy key array');
      for(const key of result.result) {
        if (!key || !key.name?.startsWith(PREFIX) ||
            key.name!==immutableAssetKey(key.name.slice('immutable:v1:'.length)) ||
            !key.metadata || key.expiration!==undefined ||
            seenKeys.has(key.name))
          throw new Error('Invalid, expiring or duplicated immutable archive key');
        const m=key.metadata;
        if (m.version!==1 || m.path!==key.name.slice('immutable:v1:'.length) ||
            m.contentType!==(m.path.endsWith('.css')?'text/css':'text/javascript'))
          throw new Error('KV listing conflicts with immutable original-byte metadata');
        const record=verifyArchiveRecord({
          path:m.path,preSha256:m.sha256,bytes:m.bytes,
          firstSeenAt:m.firstSeenAt,lastObservedAt:m.firstSeenAt,
        },now);
        records.push(record);
        bytes+=record.bytes;
        if (bytes>MAX_KV_BYTES)
          throw new Error('KV archive exceeds authorized storage budget');
        seenKeys.add(key.name);
      }
      const next=result.result_info?.cursor;
      if(!next) return records.sort((a,b)=>a.path.localeCompare(b.path));
      if(typeof next!=='string' || seenCursor.has(next))
        throw new Error('Invalid or repeated KV listing cursor');
      seenCursor.add(next);
      cursor=next;
    }
    throw new Error('KV listing exceeded pagination safety budget');
  }
  return {getWithMetadata,put,listStoredRecords};
}
