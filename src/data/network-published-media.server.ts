/** Server-only, immutable public-media copier for editorially approved Network images.
 * Public Storage has no transactional rollback with the Network publication RPC:
 * a retry may find an object previously uploaded before a failed/ambiguous DB commit.
 * Never overwrite it; accept only a byte-identical pre-existing object.
 */
type PublishedStorage = {
 upload(path:string, bytes:ArrayBuffer, options:{contentType:string;upsert:false}):Promise<{error:unknown}>;
 download(path:string):Promise<{data:Blob|null;error:unknown}>;
};

export type PublishedMediaCopyOutcome='created'|'verified-existing';

export async function writeImmutableNetworkPublishedImage(
 storage:PublishedStorage, path:string, source:Blob, contentType:string,
):Promise<PublishedMediaCopyOutcome>{
 if(!path||path.startsWith('/')||path.includes('..')||
  !['image/png','image/jpeg','image/webp'].includes(contentType)||
  source.size<=0||source.size>3_000_000)
  throw Error('Invalid approved Network image');
 const original=await source.arrayBuffer();
 const {error:uploadError}=await storage.upload(path,original,{contentType,upsert:false});
 if(!uploadError)return 'created';

 // An upstream error may mean a prior attempt already created the object.
 // Download the exact target, never retry with upsert:true, never delete it.
 const {data:stored,error:readError}=await storage.download(path);
 if(readError||!stored||stored.size!==source.size||
    (stored.type!==''&&stored.type!==contentType))
  throw Error('Published image copy could not be verified');

 const [sourceDigest,storedDigest]=await Promise.all([
  crypto.subtle.digest('SHA-256',original),
  crypto.subtle.digest('SHA-256',await stored.arrayBuffer()),
 ]);
 const left=new Uint8Array(sourceDigest),right=new Uint8Array(storedDigest);
 let mismatch=0;
 for(let i=0;i<left.byteLength;i++)mismatch|=left[i]^right[i];
 if(mismatch!==0)throw Error('Existing published image differs from approved image');
 return 'verified-existing';
}
