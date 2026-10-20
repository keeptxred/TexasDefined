/** Validate owner-supplied JSON before service-role draft URL signing.
 * The SQL top-level key count does not bound nested gallery arrays. */
export function validatedNetworkRevisionMediaPaths(
 profile:unknown,ownerUserId:string,businessAccountId:string,
):string[]|null {
 const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
 if(!uuid.test(ownerUserId)||!uuid.test(businessAccountId)
   ||!profile||typeof profile!=='object'||Array.isArray(profile))return null;
 const p=profile as Record<string,unknown>;
 if(Object.prototype.hasOwnProperty.call(p,'logo_storage_path') &&
   typeof p.logo_storage_path!=='string')return null;
 if(Object.prototype.hasOwnProperty.call(p,'gallery_storage_paths') &&
   (!Array.isArray(p.gallery_storage_paths)||p.gallery_storage_paths.length>6))return null;
 const gallery=Array.isArray(p.gallery_storage_paths)?p.gallery_storage_paths:[];
 const paths:unknown[]=[...(typeof p.logo_storage_path==='string'?[p.logo_storage_path]:[]),...gallery];
 if(paths.length>7)return null;
 const prefix=ownerUserId+'/'+businessAccountId+'/';
 const names=new Set<string>();
 for(const value of paths){
  if(typeof value!=='string'||value.length>240||!value.startsWith(prefix))return null;
  const filename=value.slice(prefix.length);
  if(!/^[A-Za-z0-9][A-Za-z0-9_-]{0,150}\.(?:png|jpg|webp)$/.test(filename)
   ||names.has(value))return null;
  names.add(value);
 }
 return paths as string[];
}
