import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';

export async function listNetworkApplications(accessKey: string) {
  await assertSportsPartnerAccess(accessKey);
  const { data, error } = await supabaseAdmin.from('texasdefined_network_applications').select('*').order('created_at', { ascending: false }).limit(200);
  if (error) throw new Error('Network applications are unavailable.');
  const applications = (data ?? []) as Array<Record<string, unknown>>;
  const enriched = await Promise.all(applications.map(async (entry) => {
    const paths = [entry.logo_storage_path, ...((entry.gallery_storage_paths as string[] | null) ?? [])].filter((p):p is string => typeof p === 'string' && p.length > 0);
    const media = await Promise.all(paths.map(async (path) => {
      const { data: signed, error: mediaError } = await supabaseAdmin.storage.from('texasdefined-network-applications').createSignedUrl(path, 300);
      return { path, url: mediaError ? null : signed?.signedUrl ?? null };
    }));
    return { ...entry, media };
  }));
  return { applications: enriched, generatedAt: new Date().toISOString() };
}

export async function setNetworkApplicationReview(accessKey: string, id: string, action: 'approve' | 'reject' | 'reopen') {
  await assertSportsPartnerAccess(accessKey);
  const status = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'pending_review';
  const { data, error } = await supabaseAdmin.from('texasdefined_network_applications').update({ status, updated_at: new Date().toISOString() } as never).eq('id', id).select('id,status').single();
  if (error || !data) throw new Error('Unable to update application.');
  return data;
}

export async function publishReviewedNetworkApplication(accessKey: string, id: string) {
  await assertSportsPartnerAccess(accessKey);
  const { data: current, error: readError } = await supabaseAdmin.from('texasdefined_network_applications')
    .select('id,plan,status,paid_entitlement_active').eq('id', id).single();
  if (readError || !current || current.status !== 'approved') throw new Error('Approve the application before publishing.');
  if (current.plan === 'plus' && !current.paid_entitlement_active) throw new Error('Verified Plus subscription payment is required before publication.');
  const { data, error } = await supabaseAdmin.from('texasdefined_network_applications')
    .update({status:'published',updated_at:new Date().toISOString()} as never)
    .eq('id', id).eq('status','approved').select('id,status').single();
  if (error || !data) throw new Error('Could not publish this listing.');
  return { id, status: 'published', url: '/network/business/' + id };
}

export async function listNetworkRevisions(accessKey:string) {
 await assertSportsPartnerAccess(accessKey);
 const {data,error}=await supabaseAdmin.from('texasdefined_network_profile_revisions').select('id,business_account_id,submitted_by,created_at,review_status,proposed_profile,reviewer_notes').order('created_at',{ascending:false}).limit(200);
 if(error)throw new Error('Cannot load change requests.');
 return data ?? [];
}
export async function reviewNetworkRevision(accessKey:string,id:string,decision:'approve'|'reject') {
 await assertSportsPartnerAccess(accessKey);
 const {data:current,error:lookupError}=await supabaseAdmin.from('texasdefined_network_profile_revisions').select('id,review_status').eq('id',id).single();
 if(lookupError||!current||current.review_status!=='pending_review')throw new Error('Change request is no longer pending.');
 const {data,error}=await supabaseAdmin.from('texasdefined_network_profile_revisions').update({review_status:decision==='approve'?'approved':'rejected',reviewed_at:new Date().toISOString()} as never).eq('id',id).eq('review_status','pending_review').select('id,review_status').single();
 if(error||!data)throw new Error('Could not review change request.');
 // This marks editorial approval only. A separate publication workflow must apply the approved revision.
 return data;
}

export async function publishApprovedNetworkListing(accessKey:string,id:string) {
 await assertSportsPartnerAccess(accessKey);
 const {data:app,error}=await supabaseAdmin.from('texasdefined_network_applications')
   .select('id,status,plan,business_name,category,description,city,address,phone,hours,website,social,services,faq,offer,logo_storage_path,gallery_storage_paths,paid_entitlement_active')
   .eq('id',id).single();
 if(error||!app)throw Error('Application unavailable');
 if(app.status!=='approved'&&app.status!=='published')throw Error('Listing requires editorial approval');
 if(app.plan==='plus'&&!app.paid_entitlement_active)throw Error('Active paid subscription required for Plus');
 const slugBase=String(app.business_name+'-'+app.city).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
 const slug=(slugBase||'texas-business')+'-'+id.slice(0,8);
 const profile={
  business_name:app.business_name, category:app.category,city:app.city,address:app.address,phone:app.phone,
  hours:app.hours,description:app.description,website:app.plan==='plus'?app.website:null,social:app.plan==='plus'?app.social:null,
  services:app.plan==='plus'?app.services:null,faq:app.plan==='plus'?app.faq:null,offer:app.plan==='plus'?app.offer:null,
 };
 const {error:publishError}=await supabaseAdmin.from('texasdefined_network_public_listings').upsert({
  application_id:app.id,slug,plan:app.plan,profile,logo_storage_path:app.logo_storage_path,
  gallery_storage_paths:app.plan==='plus'?app.gallery_storage_paths:[],is_published:true,updated_at:new Date().toISOString()
 } as never,{onConflict:'application_id'});
 if(publishError)throw Error('Could not publish the listing');
 const {error:statusError}=await supabaseAdmin.from('texasdefined_network_applications').update({status:'published',updated_at:new Date().toISOString()} as never).eq('id',id);
 if(statusError)throw Error('Listing published but workflow status update failed');
 return {slug,url:'/network/business/'+slug};
}
