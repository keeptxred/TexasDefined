/**
 * Operator-only reconciliation of uncertain Network email messages.
 * No provider sends, automatic replays, plaintext message bodies or public API.
 * Privileged SQL RPC owns transactional claimed-token comparison and audit.
 */
import {assertNetworkAdminAccess} from '@/data/network-admin-access.server';
import {supabaseAdmin} from '@/integrations/supabase/client.server';
import {validateNetworkRecoveryDecision,maskNetworkRecoveryRecipient} from './network-notification-recovery-policy.ts';
export async function listNetworkNotificationRecovery(accessKey:string){
 await assertNetworkAdminAccess(accessKey);
 const {data,error}=await supabaseAdmin.from('texasdefined_network_email_outbox')
  .select('id,event_type,recipient_email,status,attempts,claimed_at,created_at,error_code')
  .in('status',['sending','suppressed','failed'])
  .order('created_at',{ascending:false}).limit(100);
 if(error)throw Error('Network notification recovery inventory unavailable');
 return (data||[]).map(row=>({
  id:row.id,eventType:row.event_type,
  recipientMasked:maskNetworkRecoveryRecipient(row.recipient_email),
  status:row.status,attempts:row.attempts,
  createdAt:row.created_at,claimedAt:row.claimed_at,
  errorCode:row.error_code||null,
 }));
}
export async function reconcileNetworkNotificationRecovery(
 accessKey:string,
 rawDecision:unknown,
){
 await assertNetworkAdminAccess(accessKey);
 const decision=validateNetworkRecoveryDecision(rawDecision);
 const {data:current,error:lookupError}=await supabaseAdmin
  .from('texasdefined_network_email_outbox')
  .select('id,status,claim_token').eq('id',decision.id).maybeSingle();
 if(lookupError||!current||!current.claim_token||
    !['sending','suppressed'].includes(current.status))
  throw Error('Notification is no longer eligible for reconciliation');
 const {data,error}=await supabaseAdmin.rpc('reconcile_texasdefined_network_notification',{
  p_id:decision.id,p_claim_token:current.claim_token,
  p_resolution:decision.resolution,
  p_evidence_reference:decision.evidenceReference,
  p_reviewer_label:decision.reviewerLabel,
  p_verified_provider_id:decision.verifiedProviderId,
 });
 if(error||data!==true)throw Error('Notification reconciliation was not accepted');
 return {id:decision.id,resolution:decision.resolution,ok:true};
}
