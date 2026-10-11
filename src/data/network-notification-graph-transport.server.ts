/**
 * Prepared Microsoft Graph /users/{mailbox}/sendMail HTTP adapter.
 *
 * NO connection to the website's routes, timers, secrets or SQL.
 * Real transport cannot execute while the two compile-time kill switches
 * remain false. Provider responses never mark an outbox row sent.
 * A separately authorized deployment must restrict Mail.Send to exactly
 * admin@texasdefined.com and use staging-only synthetic recipients.
 */
import { NETWORK_NOTIFICATION_SENDER, NETWORK_EMAIL_DELIVERY_ENABLED } from './network-notification-templates.server.ts';
import { NETWORK_GRAPH_DISPATCH_ENABLED } from './network-notification-graph-readiness.server.ts';
import type { NetworkGraphClaimPlan } from './network-notification-claim-plan.server.ts';

const graphUrl='https://graph.microsoft.com/v1.0/users/admin%40texasdefined.com/sendMail';
const boundedEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function prepareNetworkGraphHttpRequest(plan: NetworkGraphClaimPlan): {
  url:string; method:'POST'; body:string;
} {
  if (!plan || typeof plan !== 'object' ||
    plan.sender !== NETWORK_NOTIFICATION_SENDER ||
    typeof plan.recipient !== 'string' ||
    plan.recipient.length>254 || !boundedEmail.test(plan.recipient) ||
    /[\x00-\x1f\x7f]/.test(plan.recipient)) throw Error('Graph claim envelope invalid');
  const msg=plan.graphPayload;
  if (!msg || typeof msg!=='object' || msg.saveToSentItems!==true ||
    !msg.message || typeof msg.message!=='object' ||
    !Array.isArray(msg.message.toRecipients) || msg.message.toRecipients.length!==1 ||
    !Array.isArray(msg.message.replyTo) || msg.message.replyTo.length!==1 ||
    msg.message.toRecipients[0]?.emailAddress?.address!==plan.recipient ||
    msg.message.replyTo[0]?.emailAddress?.address!==NETWORK_NOTIFICATION_SENDER ||
    typeof msg.message.subject!=='string' ||
    typeof msg.message.body?.content!=='string') throw Error('Graph claim envelope invalid');
  // Refuse fields that could silently add external copies, attachments,
  // impersonated senders, HTML or provider-specific actions.
  const fields=(value:unknown,allowed:readonly string[])=>
    !!value && typeof value==='object' && !Array.isArray(value) &&
    Object.keys(value).every(key=>allowed.includes(key));
  if (!fields(msg as Record<string,unknown>,['message','saveToSentItems']) ||
      !fields(msg.message as Record<string,unknown>,['subject','body','toRecipients','replyTo']) ||
      !fields(msg.message.body as Record<string,unknown>,['contentType','content']) ||
      msg.message.body.contentType!=='Text' ||
      !fields(msg.message.toRecipients[0].emailAddress as Record<string,unknown>,['address']) ||
      !fields(msg.message.replyTo[0].emailAddress as Record<string,unknown>,['address']) ||
      msg.message.subject.length>260 ||
      /[\r\n\x00-\x1f\x7f]/.test(msg.message.subject))
    throw Error('Graph claim envelope invalid');
  const body=JSON.stringify(msg);
  // Restrict an unusually large malformed or attacker-enriched mail payload
  // before allocating a provider request.
  if (new TextEncoder().encode(body).byteLength>16_384)
    throw Error('Graph claim envelope too large');
  return { url:graphUrl, method:'POST', body };
}

export async function submitNetworkGraphHttpRequest(
  plan:NetworkGraphClaimPlan,
  bearerToken:unknown,
  transport: typeof fetch = fetch,
): Promise<{status:number}> {
  // No operator flag, transport injection or environment variable can override
  // the two hardcoded OFF values in the approved unreleased source.
  if (!Boolean(NETWORK_GRAPH_DISPATCH_ENABLED) ||
      !Boolean(NETWORK_EMAIL_DELIVERY_ENABLED))
    throw Error('Network Graph delivery is not authorized');
  const request=prepareNetworkGraphHttpRequest(plan);
  if (typeof bearerToken!=='string' ||
      bearerToken.length<24 || bearerToken.length>8192 ||
      /[\x00-\x20\x7f]/.test(bearerToken)) throw Error('Network Graph bearer invalid');
  const response=await transport(request.url,{
    method:request.method,
    headers:{
      'Authorization': 'Bearer '+bearerToken,
      'Content-Type':'application/json',
    },
    body:request.body,
    redirect:'error',
    cache:'no-store',
    signal:AbortSignal.timeout(12_000),
  });
  // 202 is accepted_unconfirmed, not delivery proof; no SQL writes, no retries.
  return {status:response.status};
}
