/**
 * Operator-only reconciliation of uncertain Network email messages.
 * No provider sends, automatic replays, plaintext message bodies or public API.
 * Privileged SQL RPC owns transactional claimed-token comparison and audit.
 */
import {assertNetworkAdminAccess} from '@/data/network-admin-access.server';
import {supabaseAdmin} from '@/integrations/supabase/client.server';
export type NetworkRecoveryResolution='sent_verified'|'not_delivered_retry'|'failed_verified'|'suppress_uncertain';
export const networkRecoveryResolutions=[
 'sent_verified','not_delivered_retry','failed_verified','suppress_uncertain'
] as const;
const uuid=/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
export function maskNetworkRecoveryRecipient(value:unknown):string{
 if(typeof value!=='string'||!value.includes('@'))return '[unavailable]';
 const [local,domain]=value.trim().toLowerCase().split('@');
 if(!domain||!local)return '[unavailable]';
 return local.slice(0,1)+'***@'+domain;
}
export function validateNetworkRecoveryDecision(input:unknown):{
 id:string;resolution:NetworkRecoveryResolution;evidenceReference:string;
 reviewerLabel:string;verifiedProviderId:string|null;confirmedNoDelivery:boolean;
}{
 if(!input||typeof input!=='object'||Array.isArray(input))
  throw Error('Network recovery decision invalid');
 const data=input as Record<string,unknown>;
 if(typeof data.id!=='string'||!uuid.test(data.id)||
    !networkRecoveryResolutions.includes(data.resolution as NetworkRecoveryResolution) ||
    typeof data.evidenceReference!=='string' ||
    data.evidenceReference.trim().length<20 ||
    data.evidenceReference.trim().length>500 ||
    /[\x00-\x1f\x7f]/.test(data.evidenceReference)||
    typeof data.reviewerLabel!=='string'||
    data.reviewerLabel.trim().length<3||
    data.reviewerLabel.trim().length>100 ||
    /[\x00-\x1f\x7f]/.test(data.reviewerLabel))
  throw Error('Documented provider evidence and authorized reviewer are mandatory');
 const resolution=data.resolution as NetworkRecoveryResolution;
 const id=data.id as string;
 const verifiedProviderId=typeof data.verifiedProviderId==='string'?
  data.verifiedProviderId.trim():null;
 if(resolution==='sent_verified'){
  if(!verifiedProviderId||verifiedProviderId.length<6||verifiedProviderId.length>300||
     /[\x00-\x1f\x7f]/.test(verifiedProviderId)||
     !data.evidenceReference.startsWith('graph-sentitems-header-match/'+id+'/') ||
     data.evidenceReference!==
       'graph-sentitems-header-match/'+id+'/'+verifiedProviderId)
   throw Error('An exact Sent Items header match and provider message ID are required');
 }else if(verifiedProviderId)
  throw Error('Only provider-verified sent messages may record a provider message ID');
 if(resolution==='not_delivered_retry'&&data.confirmedNoDelivery!==true)
  throw Error('Independent provider non-delivery confirmation is required before retry');
 return {id,resolution,
  evidenceReference:data.evidenceReference.trim(),
  reviewerLabel:data.reviewerLabel.trim(),
  verifiedProviderId,confirmedNoDelivery:data.confirmedNoDelivery===true,
 };
}
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
