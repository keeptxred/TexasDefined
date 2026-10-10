/**
 * Network prelaunch email content ONLY; no transport, mailbox credentials or sends.
 * A separate approved Microsoft 365 Graph sender and outbox dispatcher are required.
 */
export const NETWORK_NOTIFICATION_SENDER = 'admin@texasdefined.com';
export const NETWORK_EMAIL_DELIVERY_ENABLED = false as const;
export type NetworkEmailEvent =
 | 'application_received' | 'application_approved' | 'application_rejected'
 | 'owner_enabled' | 'membership_active' | 'membership_inactive'
 | 'revision_approved' | 'revision_rejected';

const copy: Record<NetworkEmailEvent,{subject:string;body:string}> = {
 application_received: {
  subject: 'Business application received',
  body: 'Your business application has been received for editorial review. It is not public, and no payment has been charged.'
 },
 application_approved: {
  subject: 'Business application approved',
  body: 'Your application has passed editorial review. Approval alone does not publish your listing. Plus requires verified ownership and a separate active membership before publication.'
 },
 application_rejected: {
  subject: 'Business application review decision',
  body: 'Your application was not approved in its current form. You may contact Texas Defined using the approved contact address to request clarification.'
 },
 owner_enabled: {
  subject: 'Verified business owner access enabled',
  body: 'Verified owner access is enabled. Sign in using the confirmed application email at https://texasdefined.com/business/dashboard. This does not automatically publish or charge you.'
 },
 membership_active: {
  subject: 'Network Plus membership active',
  body: 'Your Plus membership entitlement is active. Your business listing still requires independent editorial publication before appearing in the directory.'
 },
 membership_inactive: {
  subject: 'Network Plus membership inactive',
  body: 'Your Plus membership entitlement is inactive. Any paid public listing has been suspended. Payment recovery does not automatically republish it.'
 },
 revision_approved: {
  subject: 'Business profile revision approved',
  body: 'Your submitted business profile changes were approved by Texas Defined. You can review the current profile in your verified owner dashboard.'
 },
 revision_rejected: {
  subject: 'Business profile revision not approved',
  body: 'Your submitted profile changes were not approved. Your previously approved public information remains unchanged.'
 },
};
export function renderNetworkNotification(event: NetworkEmailEvent, businessName: unknown) {
 if (!(event in copy)) throw new Error('Unknown Network notification');
 const safeName = typeof businessName === 'string'
   ? businessName.replace(/[\r\n\t]+/g,' ').replace(/\s+/g,' ').trim().slice(0,120)
   : '';
 const name=safeName || 'your business';
 const template=copy[event];
 return {
  from: NETWORK_NOTIFICATION_SENDER,
  replyTo: NETWORK_NOTIFICATION_SENDER,
  subject: `Texas Defined Network — ${template.subject}: ${name}`,
  text: `Texas Defined Network — ${name}\n\n${template.body}\n\nQuestions? Reply to admin@texasdefined.com.\n`,
 };
}
