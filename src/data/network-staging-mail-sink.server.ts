/**
 * Synthetic-only outgoing mail safety boundary. A fully enabled isolated stage
 * may test real Graph sends, but its synthetic applicants NEVER receive email.
 * The owned admin mailbox serves as the only Graph test destination.
 * This transformation is applied consistently to send AND Sent Items proof.
 */
import type {NetworkGraphClaimPlan} from './network-notification-claim-plan.server.ts';
import {networkIsolatedStagingArmed} from './network-atomic-launch-readiness.server.ts';
import {NETWORK_NOTIFICATION_SENDER} from './network-notification-templates.server.ts';

export function networkGraphPlanForEnvironment(
 plan:NetworkGraphClaimPlan,env:Record<string,string|undefined>,
):NetworkGraphClaimPlan {
 if(env.NETWORK_ISOLATED_STAGING!=='true')return plan;
 if(!networkIsolatedStagingArmed(env))
  throw Error('Network synthetic mail sink requires isolated test stage');
 if(!plan || typeof plan.id!=='string' ||
    !plan.graphPayload || typeof plan.graphPayload!=='object' ||
    !plan.graphPayload.message || typeof plan.graphPayload.message!=='object' ||
    typeof plan.graphPayload.message.subject!=='string')
  throw Error('Network test email plan invalid');
 const originalSubject=plan.graphPayload.message.subject;
 return {
  ...plan,
  recipient:NETWORK_NOTIFICATION_SENDER,
  graphPayload:{
   ...plan.graphPayload,
   message:{
    ...plan.graphPayload.message,
    subject:'[NETWORK STAGING] '+originalSubject.slice(0,220),
    toRecipients:[{emailAddress:{address:NETWORK_NOTIFICATION_SENDER}}],
    body:{contentType:'Text' as const,
      content:'STAGING ONLY — synthetic Network business test notification.\n\n'+
        plan.graphPayload.message.body.content},
    replyTo:[{emailAddress:{address:NETWORK_NOTIFICATION_SENDER}}],
   },
  },
 };
}
