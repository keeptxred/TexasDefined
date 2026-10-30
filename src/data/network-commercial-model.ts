/**
 * Two independent TexasDefined products.
 *
 * Advertising is placement/presentation of an eligible, relevant listing.
 * Hosting is a customer-managed, multi-page website on TexasDefined.
 * No price, Stripe ID or enrollment guarantee belongs in a tier ID.
 *
 * This contract is draft source only. Entitlements must ultimately be verified
 * against independent, server-authoritative subscription records.
 */
export const ADVERTISING_PLANS = [
  {id:'basic', title:'Free Listing', placementPriority:0, illustration:'Name and short business blurb', sponsored:false},
  {id:'plus', title:'Expanded Listing', placementPriority:1, illustration:'Photo, paragraph and contact details', sponsored:true},
  {id:'featured', title:'Featured Listing', placementPriority:2, illustration:'Richer listing, profile link and higher position', sponsored:true},
  {id:'priority', title:'Priority Listing', placementPriority:3, illustration:'Highest paid priority among qualifying businesses', sponsored:true},
] as const;
export type AdvertisingTier=(typeof ADVERTISING_PLANS)[number]['id'];

export const WEBSITE_HOSTING_TIERS = [
  {id:'starter', title:'Starter Website', maxPages:1, maxGalleryImages:5,
    description:'A polished one-page business website with contact details, photos, services and updates.'},
  {id:'business', title:'Business Website', maxPages:3, maxGalleryImages:10,
    description:'A three-page website with room for services, photo galleries and business updates.'},
  {id:'premium', title:'Premium Website', maxPages:5, maxGalleryImages:15,
    description:'A five-page website with dedicated pages for services, photos, reports and contact information.'},
] as const;
export type WebsiteHostingTier=(typeof WEBSITE_HOSTING_TIERS)[number]['id'];

/** Page/image limits are initial engineering capacities, NOT approved commercial terms. */
export function getWebsiteHostingEntitlements(tier:unknown){
  return WEBSITE_HOSTING_TIERS.find(v=>v.id===tier)??null;
}
export function getAdvertisingEntitlements(tier:unknown){
  return ADVERTISING_PLANS.find(v=>v.id===tier)??null;
}
export function advertisingPlacementPriority(tier:unknown){
  return getAdvertisingEntitlements(tier)?.placementPriority??0;
}

/**
 * Input must ALREADY be selected for the exact geographic/topic context.
 * This function must never be used to bypass relevance, verification, or publication.
 * Ties use a stable name/slug order rather than promising permanent #1 placement.
 */
export function rankEligibleBusinessAdvertisements<T extends {
 advertisingTier:unknown;
 businessName:string;
 slug:string;
}>(eligiblePublishedListings:readonly T[]):T[]{
 return [...eligiblePublishedListings].sort((a,b)=>{
  const priority=advertisingPlacementPriority(b.advertisingTier)-advertisingPlacementPriority(a.advertisingTier);
  return priority||a.businessName.localeCompare(b.businessName,'en')||a.slug.localeCompare(b.slug,'en');
 });
}

/** Safeguard drafts before a separate server-side owner/paid-plan/publication gate. */
export type HostedWebsitePageInput={
 slug:string;
 title:string;
 body:string;
};
export type HostedWebsiteDraftInput={
 businessName:string;
 pages:readonly HostedWebsitePageInput[];
 galleryStoragePaths:readonly string[];
};
export type ValidHostedWebsiteDraft={
 businessName:string;
 pages:HostedWebsitePageInput[];
 galleryStoragePaths:string[];
};
export type WebsiteDraftCheck=
 | {ok:true;draft:ValidHostedWebsiteDraft}
 | {ok:false;reason:string};

const pathSlug=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const storageObject=/^[0-9a-f-]{36}\/[a-zA-Z0-9_./-]{1,400}$/i;
export function validateHostedWebsiteDraft(tier:unknown,input:unknown):WebsiteDraftCheck{
 const limits=getWebsiteHostingEntitlements(tier);
 if(!limits)return {ok:false,reason:'Hosting tier is not recognized'};
 if(!input||typeof input!=='object'||Array.isArray(input))return {ok:false,reason:'Invalid website draft'};
 const draft=input as Partial<HostedWebsiteDraftInput>;
 const businessName=typeof draft.businessName==='string'?draft.businessName.trim():'';
 if(!businessName||businessName.length>140)return {ok:false,reason:'Business name required (140 characters maximum)'};
 if(!Array.isArray(draft.pages)||draft.pages.length<1||draft.pages.length>limits.maxPages)
  return {ok:false,reason:'Website page count exceeds the hosting tier allowance'};
 if(!Array.isArray(draft.galleryStoragePaths)||draft.galleryStoragePaths.length>limits.maxGalleryImages)
  return {ok:false,reason:'Website image count exceeds the hosting tier allowance'};
 const pages:HostedWebsitePageInput[]=[];
 const slugs=new Set<string>();
 for(const page of draft.pages){
  if(!page||typeof page!=='object'||Array.isArray(page))return {ok:false,reason:'Invalid website page'};
  const p=page as Partial<HostedWebsitePageInput>;
  const slug=typeof p.slug==='string'?p.slug.trim():'';
  const title=typeof p.title==='string'?p.title.trim():'';
  const body=typeof p.body==='string'?p.body.trim():'';
  if(slug.length>60||!pathSlug.test(slug)||slugs.has(slug))
   return {ok:false,reason:'Page URLs must be unique, simple slugs'};
  if(!title||title.length>110||!body||body.length>12000)
   return {ok:false,reason:'Each page needs a title and original content'};
  slugs.add(slug);pages.push({slug,title,body});
 }
 if(pages[0].slug!=='home')return {ok:false,reason:'The first page must be home'};
 const paths:string[]=[];
 for(const value of draft.galleryStoragePaths){
  if(typeof value!=='string'||!storageObject.test(value)||value.includes('..'))
   return {ok:false,reason:'Image paths must be verified private storage object keys'};
  paths.push(value);
 }
 if(new Set(paths).size!==paths.length)return {ok:false,reason:'Duplicate website images'};
 return {ok:true,draft:{businessName,pages,galleryStoragePaths:paths}};
}

/** Selected hosting tier never implies advertising placement, or vice versa. */
export type BusinessCommercialSelection={
 advertising:AdvertisingTier|null;
 hosting:WebsiteHostingTier|null;
};
export function hasIndependentProducts(selection:BusinessCommercialSelection){
 return {
  paidAdvertising:selection.advertising!==null&&advertisingPlacementPriority(selection.advertising)>0,
  websiteHosting:selection.hosting!==null&&getWebsiteHostingEntitlements(selection.hosting)!==null,
 };
}
