/**
 * Business Network Graph outbox preparation; NO sending/claiming/acknowledgement.
 * This pure planner has no provider client, credentials, network requests or timers.
 * A separate owner-authorized sender must validate and execute a claim before use.
 */
import { createNetworkGraphMailDraft, classifyNetworkGraphResponse } from './network-notification-graph-readiness.server.ts';
import type { NetworkEmailEvent } from './network-notification-templates.server.ts';

export type NetworkOutboxClaim = {
 id: unknown; claim_token: unknown; event_key: unknown; event_type: unknown;
 recipient_email: unknown; payload: unknown; attempts: unknown;
};
export type NetworkGraphClaimPlan = {
 id:string; claimToken:string; eventKey:string; attempt:number;
 recipient:string; sender:string; graphPayload:ReturnType<typeof createNetworkGraphMailDraft>['payload'];
};
export type NetworkGraphNextStep = 'manual_evidence_required'|'known_rejection_manual_review';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const events = new Set<string>([
 'application_received','application_approved','application_rejected','owner_enabled',
 'membership_active','membership_inactive','revision_approved','revision_rejected',
]);
function prepareText(value:unknown,max:number):string|null {
 if(typeof value!=='string'||value.length===0||value.length>max||
 /[\x00-\x1f\x7f]/.test(value)) return null;
 return value;
}
/** Only a well-formed, already-database-claimed row may be prepared.
 * Invalid input fails without changing outbox status or revealing its contents.
 */
export function prepareNetworkGraphClaim(claim:NetworkOutboxClaim): NetworkGraphClaimPlan {
 if(!claim||typeof claim!=='object')throw Error('Network notification claim invalid');
 const id=prepareText(claim.id,36);
 const token=prepareText(claim.claim_token,36);
 const key=prepareText(claim.event_key,300);
 const type=prepareText(claim.event_type,60);
 if(!id||!uuid.test(id)||!token||!uuid.test(token)||!key||!type||!events.has(type)||
 !Number.isSafeInteger(claim.attempts)||(claim.attempts as number)<1||(claim.attempts as number)>3)
  throw Error('Network notification claim invalid');
 const payload=claim.payload;
 if(!payload||typeof payload!=='object'||Array.isArray(payload))
  throw Error('Network notification claim invalid');
 const name=(payload as {business_name?:unknown}).business_name;
 if(typeof name!=='string'||!name.trim()||name.length>160)
  throw Error('Network notification claim invalid');
 // createNetworkGraphMailDraft enforces the exact approved mailbox, to-address,
 // template event and a single recipient. It does not contact a provider.
 const mail=createNetworkGraphMailDraft(type as NetworkEmailEvent,name,claim.recipient_email);
 return {id,claimToken:token,eventKey:key,attempt:claim.attempts as number,
  recipient:mail.payload.message.toRecipients[0].emailAddress.address,
  sender:mail.sender,graphPayload:mail.payload};
}
/** Graph sendMail returns 202 without a verified delivery receipt or stable ID.
 * Explicit provider rejections are not delivery evidence either.
 * NEVER auto-call finish(sent), claim again, or auto-send after an ambiguous reply.
 * A human evidence-backed reconciliation through the pending service-only
 * reconcile_texasdefined_network_notification RPC is required.
 */
export function classifyNetworkGraphClaimForOperator(httpStatus:unknown):{
 classification:ReturnType<typeof classifyNetworkGraphResponse>;
 nextStep:NetworkGraphNextStep;
 mayMarkDelivered:false; mayRetryAutomatically:false;
} {
 const classification=classifyNetworkGraphResponse(httpStatus);
 return {
  classification,
  nextStep:classification==='retryable_rejection'||classification==='permanent_rejection'
   ? 'known_rejection_manual_review' : 'manual_evidence_required',
  mayMarkDelivered:false,mayRetryAutomatically:false,
 };
}
