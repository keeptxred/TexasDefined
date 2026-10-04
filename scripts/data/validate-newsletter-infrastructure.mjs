import { readFileSync } from 'node:fs';

const failures = [];
const read = (path) => readFileSync(path, 'utf8');
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${JSON.stringify(needle)}`);
};

const resend = read('src/data/newsletter/newsletter-resend.server.ts');
const confirmation = read('src/data/newsletter/newsletter-confirmation.server.ts');
const subscription = read('src/data/newsletter/newsletter-subscription.server.ts');
const functions = read('src/data/newsletter/newsletter.functions.ts');
const adminAuth = read('src/data/newsletter/newsletter-admin-auth.server.ts');
const adminFunctions = read('src/data/newsletter/newsletter-admin.functions.ts');
const adminPanel = read('src/components/admin/NewsletterOperationsPanel.tsx');
const platformHealth = read('src/routes/admin.platform-health.lazy.tsx');
const adminLayout = read('src/routes/admin.tsx');
const template = read('src/data/newsletter/newsletter-template.ts');
const composeContract = read('src/data/newsletter/newsletter-compose-contract.ts');
const composer = read('src/data/newsletter/newsletter-compose.server.ts');
const operations = read('src/data/newsletter/newsletter-operations.server.ts');
const newsletterApi = read('src/lib/texas-defined-newsletter-api.server.ts');
const serverEntry = read('src/server-entry.ts');
const docs = read('docs/newsletter-infrastructure.md');
const migration = read('supabase/migrations/20261003112811_add_texasdefined_newsletter_provider_identity.sql');
const wrangler = read('wrangler.jsonc');

for (const marker of [
  'RESEND_API_KEY',
  'RESEND_NEWSLETTER_SEGMENT_ID',
  'NEWSLETTER_FROM_EMAIL',
  'NEWSLETTER_SENDING_ENABLED',
  'RESEND_WEBHOOK_SECRET',
  'syncNewsletterAudienceToResend',
  'contact.unsubscribed === true',
  'mirrorProviderUnsubscribeToTexasDefined',
  '{{{RESEND_UNSUBSCRIBE_URL}}}',
  'Math.abs(Date.now() / 1000 - timestampNumber) > 300',
  "crypto.subtle.sign('HMAC'",
  'finalizeNewsletterIssueIfComplete',
  'Update and send are intentionally separate',
]) requireText(resend, marker, 'Resend adapter');

for (const marker of [
  "fetch(`${RESEND_API}/emails`",
  "'idempotency-key'",
  'RESEND_API_KEY',
  'NEWSLETTER_FROM_EMAIL',
  'NEWSLETTER_PUBLIC_BASE_URL',
  'Confirm your subscription',
  'resendNewsletterConfirmationConfigured',
]) requireText(confirmation, marker, 'Newsletter confirmation transport');

for (const marker of [
  'CONFIRMATION_COOLDOWN_MS',
  'confirmationRequestIsFresh',
  'resendNewsletterConfirmationConfigured',
  'sendNewsletterConfirmationEmail',
  'markConfirmationRetryable',
  'confirmation_token',
  'confirmation_requested_at',
  'subscribeNewsletterWithConfirmation',
  'newsletterDoubleOptInReady',
]) requireText(subscription, marker, 'Newsletter signup orchestration');

for (const marker of [
  'NEWSLETTER_SIGNUPS_ENABLED',
  'subscribeNewsletterWithConfirmation',
]) requireText(functions, marker, 'Newsletter server functions');

for (const marker of [
  'useSession',
  'NEWSLETTER_ADMIN_ACCESS_KEY',
  'NEWSLETTER_ADMIN_SESSION_SECRET',
  'NEWSLETTER_ADMIN_SESSION_VERSION',
  "sameSite: 'strict'",
  'httpOnly: true',
  'SESSION_MAX_AGE_SECONDS',
  "crypto.subtle.digest('SHA-256'",
  'constantTimeEqual',
  'requireNewsletterAdmin',
]) requireText(adminAuth, marker, 'Newsletter operator authentication');

for (const marker of [
  'private, no-store',
  "Vary: 'Cookie'",
  'requireNewsletterAdmin',
  'newsletterAdminLogin',
  'newsletterAdminLogout',
  'getNewsletterAdminSession',
  'getNewsletterAdminDashboard',
  'getNewsletterAdminIssue',
  'previewNewsletterAdminDraft',
  'saveNewsletterAdminDraft',
  'newsletterDraftSchema',
  'markNewsletterAdminIssueReady',
  'scheduleNewsletterAdminIssue',
  'cancelNewsletterAdminIssue',
  'syncNewsletterAdminAudience',
  'stageNewsletterAdminIssueInResend',
  'sendOrScheduleNewsletterAdminIssue',
  'NEWSLETTER_SENDING_ENABLED',
]) requireText(adminFunctions, marker, 'Newsletter authenticated operator functions');

for (const marker of [
  'newsletterAdminLogin',
  'newsletterAdminLogout',
  'getNewsletterAdminSession',
  'Newsletter Operations',
  'Unlock newsletter operations',
  'sandbox=""',
  'no send-now control',
  'Sync audience to Resend',
  'Stage in Resend',
  'Schedule issue',
  'Lock',
]) requireText(adminPanel, marker, 'Newsletter operations panel');

requireText(platformHealth, '<NewsletterOperationsPanel />', 'Platform health newsletter integration');
requireText(adminLayout, '/admin/platform-health#newsletter', 'Admin newsletter navigation');

for (const forbidden of [
  'sendOrScheduleNewsletterAdminIssue',
  'sendResendBroadcast',
  'sendNewsletterBroadcast',
  'NEWSLETTER_SENDING_ENABLED=true',
]) {
  if (adminPanel.includes(forbidden)) {
    failures.push(`Newsletter operations panel must not expose direct sending: found ${JSON.stringify(forbidden)}`);
  }
}

for (const marker of [
  'newsletterDraftSchema',
  'newsletterStorySchema',
  '.min(1).max(12)',
  'TexasDefinedNewsletterDraftInput',
]) requireText(composeContract, marker, 'Newsletter draft contract');

for (const marker of [
  '{{{RESEND_UNSUBSCRIBE_URL}}}',
  'renderTexasDefinedNewsletter',
  'Read on TexasDefined',
  'safeHttpUrl',
]) requireText(template, marker, 'Newsletter template');

for (const marker of [
  'previewTexasDefinedNewsletterDraft',
  'saveTexasDefinedNewsletterDraft',
  'saveNewsletterIssueDraft',
  'renderTexasDefinedNewsletter',
  "composer: 'texasdefined-story-digest-v1'",
  'storyCount',
]) requireText(composer, marker, 'Newsletter issue composer');

for (const marker of [
  'listNewsletterIssues',
  'getNewsletterIssueForOperator',
  'getNewsletterOperatorDashboard',
  'getNewsletterRuntimeReadiness',
  'getNewsletterInfrastructureStats',
  'deliveryCounts',
  'recentEventCounts',
  'signupsEnabled',
  'sendingEnabled',
  'confirmationConfigured',
  'doubleOptInReady',
  'resendConfigured',
  'missingRuntimeBindings',
  'activationBlocked',
  'RESEND_API_KEY',
  'RESEND_NEWSLETTER_SEGMENT_ID',
  'NEWSLETTER_FROM_EMAIL',
  'RESEND_WEBHOOK_SECRET',
]) requireText(operations, marker, 'Newsletter operator control plane');

for (const marker of [
  'NEWSLETTER_SIGNUPS_ENABLED',
  "'/api/newsletter/subscribe'",
  "'/api/newsletter/confirm'",
  "'/api/newsletter/unsubscribe'",
  "'/api/newsletter/resend-webhook'",
  'subscribeNewsletterWithConfirmation',
  "error: 'temporarily_unavailable'",
  'verifyResendWebhook(rawBody, request.headers)',
  'await request.text()',
  'invalid_signature',
  'contentLength > 2_000_000',
]) requireText(newsletterApi, marker, 'Worker newsletter API');

for (const marker of [
  'texasDefinedNewsletterApiResponse',
  'if (newsletterApiResponse) return newsletterApiResponse',
]) requireText(serverEntry, marker, 'Worker entry integration');

for (const marker of [
  'provider_contact_id',
  'provider_campaign_id',
  "'delivery_delayed'",
  "'suppressed'",
]) requireText(migration, marker, 'Newsletter provider migration');

for (const marker of [
  'Resend Broadcasts',
  'NEWSLETTER_SIGNUPS_ENABLED=true',
  'NEWSLETTER_SENDING_ENABLED=true',
  'news.texasdefined.com',
  'Cloudflare Email Service is not the newsletter transport',
  'Double opt-in and confirmation delivery',
  '15-minute confirmation-email cooldown',
  'Authenticated operator boundary',
  'NEWSLETTER_ADMIN_ACCESS_KEY',
  'NEWSLETTER_ADMIN_SESSION_SECRET',
  'Server-only issue composer',
  'Server-only operator control plane',
  'Protected newsletter operations panel',
  '/admin/platform-health#newsletter',
  'dedicated newsletter operator',
  'keep_vars',
  'missing runtime bindings',
]) requireText(docs, marker, 'Newsletter documentation');

requireText(wrangler, '"keep_vars": true', 'Wrangler newsletter runtime preservation');

// Marketing newsletters must not acquire a Cloudflare transactional-email binding by accident.
if (/\"send_email\"\s*:|\bsend_email\b|\bEMAIL\s*:\s*\{/.test(wrangler)) {
  failures.push('wrangler.jsonc must not configure Cloudflare transactional email as the TexasDefined newsletter sender.');
}

if (failures.length) {
  console.error(`Newsletter infrastructure validation failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Newsletter infrastructure validation passed.');
