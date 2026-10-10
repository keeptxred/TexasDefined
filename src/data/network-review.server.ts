import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';

/** Validate image bytes again at the public media boundary, not just at browser upload. */
async function assertNetworkImageBytes(blob: Blob, type: string) {
  if (blob.size === 0 || blob.size > 3_000_000) throw new Error('Approved image size invalid');
  const bytes = new Uint8Array(await blob.slice(0, 12).arrayBuffer());
  const pngHeader = [137, 80, 78, 71, 13, 10, 26, 10];
  const png = bytes.length >= pngHeader.length && pngHeader.every((byte, index) => bytes[index] === byte);
  const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const webp = bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF'
    && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
  if (!(type === 'image/png' && png || type === 'image/jpeg' && jpg || type === 'image/webp' && webp)) {
    throw new Error('Approved image content is not a supported image');
  }
}

export async function listNetworkApplications(accessKey: string) {
  await assertSportsPartnerAccess(accessKey);
  const { data, error } = await supabaseAdmin.from('texasdefined_network_applications').select('*').order('created_at', { ascending: false }).limit(200);
  if (error) throw new Error('Network applications are unavailable.');
  const applications = (data ?? []) as Array<Record<string, unknown>>;
  // Published URLs must use stable slugs, not private application UUIDs.
  const ids = applications.map(entry => String(entry.id));
  const { data: publicRows, error: publicError } = ids.length
    ? await supabaseAdmin.from('texasdefined_network_public_listings')
      .select('application_id,slug,is_published').in('application_id', ids)
    : { data: [], error: null };
  if (publicError) throw new Error('Unable to load published listing links.');
  const publicSlugs = new Map((publicRows ?? [])
    .filter(row => row.is_published)
    .map(row => [String(row.application_id), String(row.slug)]));
  const enriched = await Promise.all(applications.map(async (entry) => {
    const paths = [entry.logo_storage_path, ...((entry.gallery_storage_paths as string[] | null) ?? [])].filter((p):p is string => typeof p === 'string' && p.length > 0);
    const media = await Promise.all(paths.map(async (path) => {
      const { data: signed, error: mediaError } = await supabaseAdmin.storage.from('texasdefined-network-applications').createSignedUrl(path, 300);
      return { path, url: mediaError ? null : signed?.signedUrl ?? null };
    }));
    return { ...entry, listing_slug: publicSlugs.get(String(entry.id)) ?? null, media };
  }));
  return { applications: enriched, generatedAt: new Date().toISOString() };
}

export async function setNetworkApplicationReview(accessKey: string, id: string, action: 'approve' | 'reject' | 'reopen') {
  await assertSportsPartnerAccess(accessKey);
  const status = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'pending_review';
  const { data: current, error: lookupError } = await supabaseAdmin.from('texasdefined_network_applications')
    .select('id,status').eq('id', id).single();
  if (lookupError || !current) throw new Error('Application not found.');
  if (current.status === 'published' && action === 'approve') {
    throw new Error('Unpublish a listing before reopening editorial approval.');
  }
  if (action === 'reject' || action === 'reopen') {
    // A status-only rejection would otherwise leave an already published page visible.
    const { error: hideError } = await supabaseAdmin.from('texasdefined_network_public_listings')
      .update({ is_published: false, updated_at: new Date().toISOString() } as never)
      .eq('application_id', id).eq('is_published', true);
    if (hideError) throw new Error('Could not unpublish this listing.');
  }
  const { data, error } = await supabaseAdmin.from('texasdefined_network_applications')
    .update({ status, updated_at: new Date().toISOString() } as never).eq('id', id).select('id,status').single();
  if (error || !data) throw new Error('Unable to update application.');
  return data;
}

/** Keep the legacy action safe: a published status must always have a real listing. */
export async function publishReviewedNetworkApplication(accessKey: string, id: string) {
  return publishApprovedNetworkListing(accessKey, id);
}

export async function listNetworkRevisions(accessKey:string) {
 await assertSportsPartnerAccess(accessKey);
 const {data,error}=await supabaseAdmin.from('texasdefined_network_profile_revisions').select('id,business_account_id,submitted_by,created_at,review_status,proposed_profile,reviewer_notes').order('created_at',{ascending:false}).limit(200);
 if(error)throw new Error('Cannot load change requests.');
 return Promise.all((data ?? []).map(async (revision) => {
  const profile=revision.proposed_profile as Record<string,unknown>;
  const paths=[
   ...(typeof profile.logo_storage_path==='string'?[profile.logo_storage_path]:[]),
   ...(Array.isArray(profile.gallery_storage_paths)?profile.gallery_storage_paths.filter((p):p is string=>typeof p==='string'):[])
  ];
  const media=await Promise.all(paths.map(async (path)=>{
   const {data:signed,error}=await supabaseAdmin.storage.from('texasdefined-network-featured-drafts').createSignedUrl(path,300);
   return {path,url:error?null:signed?.signedUrl??null};
  }));
  return {...revision,media};
 }));
}
export async function reviewNetworkRevision(accessKey:string,id:string,decision:'approve'|'reject') {
 await assertSportsPartnerAccess(accessKey);
 if(decision==='approve'&&process.env.NETWORK_PUBLICATION_ENABLED!=='true')
  throw Error('Network profile publication is not activated.');
 if(decision==='reject'){
  const {data:outcome,error}=await supabaseAdmin.rpc('finalize_texasdefined_featured_revision',{
   p_revision_id:id,p_decision:'reject',p_profile:null,p_logo:null,p_gallery:null
  });
  if(error||outcome!=='rejected')throw Error('Change request is no longer pending or could not be rejected');
  return {id,review_status:'rejected' as const};
 }
 const {data:revision,error:lookupError}=await supabaseAdmin.from('texasdefined_network_profile_revisions')
  .select('id,review_status,business_account_id,submitted_by,proposed_profile').eq('id',id).single();
 if(lookupError||!revision||revision.review_status!=='pending_review')throw new Error('Change request is no longer pending.');
   const {data:account,error:accountError}=await supabaseAdmin.from('texasdefined_network_business_accounts')
   .select('id,application_id,owner_user_id,access_enabled,membership_tier').eq('id',revision.business_account_id).single();
  if(accountError||!account||!account.access_enabled||account.membership_tier!=='featured'||account.owner_user_id!==revision.submitted_by)throw Error('Featured ownership or access is not valid.');
  const {data:listing,error:listingError}=await supabaseAdmin.from('texasdefined_network_public_listings')
   .select('application_id,profile,logo_storage_path,gallery_storage_paths').eq('application_id',account.application_id).eq('is_published',true).single();
  if(listingError||!listing)throw Error('A published business profile is required before applying changes.');
  const proposed=revision.proposed_profile as Record<string,unknown>;
  const allowed=new Set(['business_name','description','category','city','address','phone','hours','website','social','services','faq','offer','logo_storage_path','gallery_storage_paths']);
  if(Object.keys(proposed).some(key=>!allowed.has(key)))throw Error('Unsupported proposed change');
  const profile={...(listing.profile as Record<string,unknown>)};
  for(const [name,value] of Object.entries(proposed)){
   if(name==='logo_storage_path'||name==='gallery_storage_paths')continue;
   if(typeof value!=='string'||value.length>1600)throw Error('Invalid proposed field');
   profile[name]=value.trim();
  }
  const copy=async(path:string)=> {
   const prefix=account.owner_user_id+'/'+account.id+'/';
   if(!path.startsWith(prefix))throw Error('Image does not belong to this business');
   const ext=path.split('.').pop()?.toLowerCase();
   const type=ext==='png'?'image/png':ext==='webp'?'image/webp':ext==='jpg'?'image/jpeg':null;
   if(!type)throw Error('Unsupported image type');
   const {data:blob,error:readError}=await supabaseAdmin.storage.from('texasdefined-network-featured-drafts').download(path);
   if(readError||!blob)throw Error('Proposed image unavailable');
   await assertNetworkImageBytes(blob,type);
   const target=account.application_id+'/featured-'+id+'/'+path.split('/').pop();
   const {error:saveError}=await supabaseAdmin.storage.from('texasdefined-network-published')
    .upload(target,await blob.arrayBuffer(),{contentType:type,upsert:true});
   if(saveError)throw Error('Approved image could not be published');
   return target;
  };
  let logo=listing.logo_storage_path;
  if(typeof proposed.logo_storage_path==='string')logo=await copy(proposed.logo_storage_path);
  let gallery=listing.gallery_storage_paths as string[];
  if(Array.isArray(proposed.gallery_storage_paths)){
   if(proposed.gallery_storage_paths.length>6||proposed.gallery_storage_paths.some(p=>typeof p!=='string'))throw Error('Invalid gallery');
   gallery=[];
   for(const path of proposed.gallery_storage_paths)gallery.push(await copy(path as string));
  }

 // Only the service-role transaction may change both published profile and review status.
 // A failed/ambiguous result does not expose unapproved profile fields.
 const {data:outcome,error:reviewError}=await supabaseAdmin.rpc('finalize_texasdefined_featured_revision',{
  p_revision_id:id,p_decision:'approve',p_profile:profile,p_logo:logo,p_gallery:gallery
 });
 if(reviewError||outcome!=='approved')throw Error('Approved changes could not be committed atomically');
 return {id,review_status:'approved' as const};
}

/** Unpublish a previously approved listing while retaining the approved profile for later review. */
export async function unpublishNetworkListing(accessKey: string, id: string) {
  await assertSportsPartnerAccess(accessKey);
  const { data: app, error: readError } = await supabaseAdmin
    .from('texasdefined_network_applications').select('id,status').eq('id', id).single();
  if (readError || !app || app.status !== 'published') {
    throw new Error('Only a published listing can be unpublished.');
  }
  const { error: hideError } = await supabaseAdmin.from('texasdefined_network_public_listings')
    .update({ is_published: false, updated_at: new Date().toISOString() } as never)
    .eq('application_id', id).eq('is_published', true);
  if (hideError) throw new Error('Could not hide the public listing.');
  const { error: statusError } = await supabaseAdmin.from('texasdefined_network_applications')
    .update({ status: 'approved', updated_at: new Date().toISOString() } as never)
    .eq('id', id).eq('status', 'published');
  if (statusError) throw new Error('Listing hidden but application status could not be reset.');
  return { status: 'approved' as const, is_published: false };
}

export async function publishApprovedNetworkListing(accessKey:string,id:string) {
 await assertSportsPartnerAccess(accessKey);
 if(process.env.NETWORK_PUBLICATION_ENABLED!=='true')throw Error('Network publication has not been activated.');
 const {data:app,error}=await supabaseAdmin.from('texasdefined_network_applications')
   .select('id,status,plan,business_name,category,description,city,address,phone,hours,website,social,services,faq,offer,logo_storage_path,gallery_storage_paths,paid_entitlement_active')
   .eq('id',id).single();
 if(error||!app)throw Error('Application unavailable');
 // Do not overwrite a live Featured owner's subsequently approved revisions with stale intake fields.
 if(app.status!=='approved')throw Error('Only approved, unpublished applications can be published. Unpublish before requesting another publication.');
 if(app.plan==='plus'&&!app.paid_entitlement_active)throw Error('Active paid subscription required for Plus');
 const slugBase=String(app.business_name+'-'+app.city).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
 const slug=(slugBase||'texas-business')+'-'+id.slice(0,8);
 const profile={
  business_name:app.business_name, category:app.category,city:app.city,address:app.address,phone:app.phone,
  hours:app.hours,description:app.description,website:app.plan==='plus'?app.website:null,social:app.plan==='plus'?app.social:null,
  services:app.plan==='plus'?app.services:null,faq:app.plan==='plus'?app.faq:null,offer:app.plan==='plus'?app.offer:null,
 };
 // Existing unpublished rows contain the LAST APPROVED public profile, including
 // previously approved Featured edits. Never rebuild their contents from intake.
 const {data:currentListing,error:currentListingError}=await supabaseAdmin
  .from('texasdefined_network_public_listings')
  .select('slug,plan,is_published').eq('application_id',id).maybeSingle();
 if(currentListingError)throw Error('Unable to verify existing approved listing');
 if(currentListing&&currentListing.plan!==app.plan)throw Error('Listing membership mismatch');
 if(currentListing?.is_published)throw Error('A public listing already exists; reconcile application status before publishing');
 const copyMedia=async(path:string|null)=> {
  if(!path)return null;
  if(!path.startsWith(id+'/'))throw Error('Invalid applicant media path');
  const original=supabaseAdmin.storage.from('texasdefined-network-applications');
  const {data:blob,error:downloadError}=await original.download(path);
  if(downloadError||!blob)throw Error('Approved image unavailable');
  const ext=path.split('.').pop()?.toLowerCase();
  const contentType=ext==='png'?'image/png':ext==='webp'?'image/webp':ext==='jpg'?'image/jpeg':null;
  if(!contentType)throw Error('Unsupported approved image format');
  await assertNetworkImageBytes(blob,contentType);
  const {error:uploadError}=await supabaseAdmin.storage.from('texasdefined-network-published').upload(path,await blob.arrayBuffer(),{contentType,upsert:true});
  if(uploadError)throw Error('Could not publish approved media');
  return path;
 };
 const logoPath=currentListing?null:await copyMedia(app.logo_storage_path);
 const galleryPaths:string[]=[];
 if(!currentListing)for(const path of (app.plan==='plus'?app.gallery_storage_paths:[])||[]){const copied=await copyMedia(path);if(copied)galleryPaths.push(copied)}
 // Restore previously approved content verbatim; INSERT only for a first publication.
 const {data:savedListing,error:publishError}=currentListing
  ? await supabaseAdmin.from('texasdefined_network_public_listings')
     .update({is_published:true,updated_at:new Date().toISOString()} as never)
     .eq('application_id',id).eq('is_published',false).select('slug').single()
  : await supabaseAdmin.from('texasdefined_network_public_listings')
     .insert({application_id:app.id,slug,plan:app.plan,profile,logo_storage_path:logoPath,
       gallery_storage_paths:galleryPaths,is_published:true,updated_at:new Date().toISOString()} as never)
     .select('slug').single();
 if(publishError||!savedListing)throw Error('Could not publish the listing');
 const {data:updatedApplication,error:statusError}=await supabaseAdmin.from('texasdefined_network_applications')
  .update({status:'published',updated_at:new Date().toISOString()} as never)
  .eq('id',id).eq('status','approved').select('id').single();
 if(statusError||!updatedApplication){
  // Fail closed: never leave a public listing visible when the workflow cannot record publication.
  const {error:hideError}=await supabaseAdmin.from('texasdefined_network_public_listings')
   .update({is_published:false,updated_at:new Date().toISOString()} as never)
   .eq('application_id',id).eq('is_published',true);
  if(hideError)console.error('[network] CRITICAL: publication rollback failed',hideError.code);
  throw Error('Publication status could not be saved; the listing was not certified as published');
 }
 return {slug:savedListing.slug,url:'/network/business/'+savedListing.slug};
}

/** Administrator-only documented evidence + confirmed email; atomic DB provisioning. */
export async function provisionReviewedNetworkOwner(
 accessKey:string, applicationId:string, userId:string, ownershipVerified:boolean,
 verificationMethod:'official_domain'|'registry_documents'|'verified_public_phone'|'in_person'|'other_documented',
 evidenceReference:string, reviewerLabel:string,
) {
 await assertSportsPartnerAccess(accessKey);
 if(!ownershipVerified)throw Error('Independent business ownership verification is mandatory');
 if(evidenceReference.trim().length<20||evidenceReference.trim().length>500||
   reviewerLabel.trim().length<3||reviewerLabel.trim().length>100)
  throw Error('Documented evidence and a reviewer label are required');
 const {data:application,error:appError}=await supabaseAdmin.from('texasdefined_network_applications')
  .select('id,plan,status,contact_email').eq('id',applicationId).single();
 if(appError||!application||application.plan!=='plus'||!['approved','published'].includes(application.status))
  throw Error('An approved Plus application is required');
 const {data:auth,error:authError}=await supabaseAdmin.auth.admin.getUserById(userId);
 const user=auth?.user;
 if(authError||!user?.email_confirmed_at||!user.email||
    user.email.trim().toLowerCase()!==String(application.contact_email).trim().toLowerCase())
  throw Error('User must have verified the matching application email');
 const {data:provisioned,error}=await supabaseAdmin.rpc('provision_verified_network_owner',{
  p_application_id:applicationId,p_user_id:userId,p_method:verificationMethod,
  p_evidence:evidenceReference.trim(),p_reviewer:reviewerLabel.trim(),
 });
 if(error||!provisioned||typeof provisioned!=='object')throw Error('Owner provisioning and audit could not be committed');
 const record=provisioned as {id?:unknown;access_enabled?:unknown;alreadyEnabled?:unknown};
 if(typeof record.id!=='string'||record.access_enabled!==true)throw Error('Verified owner provisioning incomplete');
 return {id:record.id,access_enabled:true,alreadyEnabled:record.alreadyEnabled===true};
}
