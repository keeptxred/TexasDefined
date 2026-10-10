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
