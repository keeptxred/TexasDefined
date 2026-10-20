/**
 * Cloudflare Cron adapter for Texas Defined Network notices.
 * It is part of the ONE-CUTOVER release only, not a public route.
 *
 * No claims before Graph token and mailbox read access succeed. Graph 202 never
 * creates a 'sent' acknowledgment; Sent Items header proof is required. Crash,
 * 429, 5xx, timeout, no proof: keep claimed row held, never blind-resend.
 */
import {prepareNetworkGraphBatch,NETWORK_GRAPH_WORKER_MAX_BATCH} from './network-notification-dispatch-worker.server.ts';
import {submitNetworkGraphHttpRequest} from './network-notification-graph-transport.server.ts';
import {findNetworkGraphSentItemsEvidence,type NetworkSentEvidence} from './network-graph-sentitems.server.ts';
import {acquireNetworkGraphAppToken,networkGraphCredentialsFromEnv} from './network-graph-token.server.ts';
import type {NetworkGraphClaimPlan} from './network-notification-claim-plan.server.ts';
export type NetworkCronStats={claimed:number;previouslyHeld:number;verified:number;unconfirmed:number;rejected:number};
export type NetworkCronDependencies={
 preflight:()=>Promise<void>;
 listHeld:()=>Promise<unknown>;
 claim:()=>Promise<unknown>;
 send:(plan:NetworkGraphClaimPlan)=>Promise<{status:number}>;
 proof:(plan:NetworkGraphClaimPlan)=>Promise<NetworkSentEvidence|null>;
 reconcile:(plan:NetworkGraphClaimPlan,proof:NetworkSentEvidence)=>Promise<boolean>;
};
import {networkCustomerLaunchArmed} from './network-atomic-launch-readiness.server.ts';
export const networkCronLaunchArmed=networkCustomerLaunchArmed;
export async function runNetworkNotificationCron(
 deps:NetworkCronDependencies,
):Promise<NetworkCronStats>{
 // Fail before claim if sender, mailbox read proof or permissions are absent.
 await deps.preflight();
 const existing=await deps.listHeld();
 const held=prepareNetworkGraphBatch(existing);
 const heldIds=new Set(held.map(x=>x.id));
 const stats:NetworkCronStats={claimed:0,previouslyHeld:held.length,verified:0,unconfirmed:0,rejected:0};
 for(const plan of held){
  try{
   const proof=await deps.proof(plan);
   if(proof && await deps.reconcile(plan,proof))stats.verified++;
   else stats.unconfirmed++;
  }catch{stats.unconfirmed++;}
 }
 const newRows=await deps.claim();
 const next=prepareNetworkGraphBatch(newRows);
 stats.claimed=next.length;
 for(const plan of next){
  if(heldIds.has(plan.id))throw Error('Network outbox row claimed twice');
  let outcome:number|undefined;
  try{outcome=(await deps.send(plan)).status;}catch{stats.unconfirmed++;continue;}
  if(outcome!==202){stats.rejected++;continue;}
  try{
   const proof=await deps.proof(plan);
   if(proof && await deps.reconcile(plan,proof))stats.verified++;
   else stats.unconfirmed++;
  }catch{stats.unconfirmed++;}
 }
 return stats;
}
/** Production binding. No external HTTP handler exists for this capability. */
export async function runNetworkNotificationCronOnWorker(
 environment:Record<string,string|undefined>,
 transport:typeof fetch=fetch,
):Promise<NetworkCronStats|null>{
 if(!networkCustomerLaunchArmed(environment))return null;
 // The scheduled Workers env and the Node-compatible runtime must agree;
 // mismatched flag injection never creates an orphaned claimed outbox row.
 const {NETWORK_EMAIL_DELIVERY_ENABLED}=await import('./network-notification-templates.server.ts');
 const {NETWORK_GRAPH_DISPATCH_ENABLED}=await import('./network-notification-graph-readiness.server.ts');
 if(!NETWORK_EMAIL_DELIVERY_ENABLED || !NETWORK_GRAPH_DISPATCH_ENABLED)
  throw Error('Network Graph runtime release mismatch');
 const token=await acquireNetworkGraphAppToken(networkGraphCredentialsFromEnv(environment),transport);
 const bearer=token.accessToken;
 const {networkGraphPlanForEnvironment}=await import('./network-staging-mail-sink.server.ts');
 const outbound=(plan:NetworkGraphClaimPlan)=>networkGraphPlanForEnvironment(plan,environment);

 // Prove scoped mailbox read capability before durable outbox claim.
 const address='https://graph.microsoft.com/v1.0/users/admin%40texasdefined.com/mailFolders/sentitems/messages?$top=1&$select=id';
 let probe:Response;
 try{probe=await transport(address,{method:'GET',headers:{Authorization:'Bearer '+bearer},
  redirect:'error',cache:'no-store',signal:AbortSignal.timeout(12_000)});}
 catch{throw Error('Network sender mailbox scope unavailable');}
 if(probe.status!==200)throw Error('Network sender mailbox scope unavailable');
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 const db=supabaseAdmin;
 const selectColumns='id,event_key,event_type,recipient_email,payload,claim_token,attempts';
 const claimRows=async():Promise<unknown>=>{
  const {data,error}=await db.rpc('claim_texasdefined_network_notification',{p_limit:NETWORK_GRAPH_WORKER_MAX_BATCH});
  if(error||!Array.isArray(data))throw Error('Network notification claim failed');
  return data;
 };
 const heldRows=async():Promise<unknown>=>{
  const {data,error}=await db.from('texasdefined_network_email_outbox')
   .select(selectColumns).eq('status','sending').order('claimed_at',{ascending:true})
   .limit(NETWORK_GRAPH_WORKER_MAX_BATCH);
  if(error||!Array.isArray(data))throw Error('Network notification held inspection failed');
  return data;
 };
 return runNetworkNotificationCron({
  preflight:async()=>{},
  listHeld:heldRows,
  claim:claimRows,
  send:(plan)=>submitNetworkGraphHttpRequest(outbound(plan),bearer,transport),
  proof:(plan)=>findNetworkGraphSentItemsEvidence(outbound(plan),bearer,transport),
  reconcile:async(plan,proof)=>{
   if(!proof || !proof.reference.startsWith('graph-sentitems-header-match/'+plan.id+'/'))
     return false;
   const {data,error}=await db.rpc('reconcile_texasdefined_network_notification',{
    p_id:plan.id,p_claim_token:plan.claimToken,
    p_resolution:'sent_verified',p_evidence_reference:proof.reference.slice(0,500),
    p_reviewer_label:'Automated Sent Items header verifier',
    p_verified_provider_id:proof.messageId,
   });
   if(error)throw Error('Network notification proof could not be reconciled');
   return data===true;
  },
 });
}
