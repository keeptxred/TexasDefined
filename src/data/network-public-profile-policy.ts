/**
 * Server-safe public response projection for editorially reviewed Network
 * listings. Defense in depth: even a malformed/legacy database profile can
 * never serialize expanded paid fields to a Basic listing's browser payload.
 * Never trust arbitrary JSON keys inside a published profile.
 */
const basicKeys=[
 'business_name','category','city','address','service_area',
 'description','phone','hours',
] as const;
const enhancedKeys=[...basicKeys,'website','social','services','faq','offer'] as const;
const basic=new Set<string>(basicKeys);
const enhanced=new Set<string>(enhancedKeys);
export function projectNetworkPublicProfile<T extends {
 plan?:unknown;profile?:unknown;gallery_storage_paths?:unknown
}>(listing:T):T|null {
 if(!listing||typeof listing!=='object'||Array.isArray(listing)||
    !['basic','plus','featured'].includes(String(listing.plan))||
    !listing.profile||typeof listing.profile!=='object'||Array.isArray(listing.profile))
  return null;
 const allowed=listing.plan==='basic'?basic:enhanced;
 const safeProfile:Record<string,string>={};
 for(const [key,value] of Object.entries(listing.profile)){
  if(allowed.has(key)&&typeof value==='string')
   safeProfile[key]=value;
 }
 return {
  ...listing,
  profile:safeProfile,
  gallery_storage_paths:listing.plan==='basic'?[]:
    Array.isArray(listing.gallery_storage_paths)
      ?listing.gallery_storage_paths.filter(x=>typeof x==='string'&&x.length>0&&x.length<=500).slice(0,6):[],
 };
}
