/**
 * Pure prelaunch Microsoft Graph message preparation and outcome classification.
 * NO Graph client, credentials, dispatcher, fetch, or live sends are provided.
 * Sender/worker installation requires a separate explicit launch authorization.
 */
import {
 NETWORK_NOTIFICATION_SENDER, NETWORK_EMAIL_DELIVERY_ENABLED,
 renderNetworkNotification, type NetworkEmailEvent,
} from './network-notification-templates.server';

export const NETWORK_GRAPH_DISPATCH_ENABLED = false as const;
export type NetworkGraphOutcome =
 | 'accepted_unconfirmed'
 | 'retryable_rejection'
 | 'permanent_rejection'
 | 'ambiguous_do_not_resend';

export function createNetworkGraphMailDraft(event: NetworkEmailEvent, name: unknown, to: unknown) {
 if(NETWORK_EMAIL_DELIVERY_ENABLED!==false || NETWORK_GRAPH_DISPATCH_ENABLED!==false)
  throw Error('Prelaunch delivery must remain disabled');
 if(typeof to!=='string')throw Error('Network recipient invalid');
 const address=to.trim().toLowerCase();
 if(address.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)
   || /[\x00-\x1f\x7f]/.test(address))throw Error('Network recipient invalid');
 const rendered=renderNetworkNotification(event,name);
 if(rendered.from!==NETWORK_NOTIFICATION_SENDER||rendered.replyTo!==NETWORK_NOTIFICATION_SENDER)
  throw Error('Network sender identity mismatch');
 return {
  sender: NETWORK_NOTIFICATION_SENDER,
  // This payload is a preview only. Actual Graph /users/{id}/sendMail transport
  // and restricted Exchange application identity do not exist in this module.
  payload: {
   message: {
    subject:rendered.subject,
    body:{contentType:'Text' as const,content:rendered.text},
    toRecipients:[{emailAddress:{address}}],
    replyTo:[{emailAddress:{address:NETWORK_NOTIFICATION_SENDER}}],
   },
   saveToSentItems:true,
  },
 };
}

/**
 * Graph sendMail HTTP 202 has no guaranteed delivery or stable provider message ID.
 * Never mark the outbox 'sent' merely from 202, or blindly retry after
 * a timeout/5xx because Graph might already have accepted the message.
 */
export function classifyNetworkGraphResponse(status: unknown): NetworkGraphOutcome {
 if(status===202)return 'accepted_unconfirmed';
 if(status===429)return 'retryable_rejection';
 if([400,401,403,404,413,415,422].includes(status as number))
  return 'permanent_rejection';
 return 'ambiguous_do_not_resend';
}
