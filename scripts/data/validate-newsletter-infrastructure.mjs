import { readFileSync } from 'node:fs';

const failures = [];
const read = (path) => readFileSync(path, 'utf8');
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${JSON.stringify(needle)}`);
};

const resend = read('src/data/newsletter/newsletter-resend.server.ts');
const confirmation = read('src/data/newsletter/newsletter-confirmation.server.ts');
const template = read('src/data/newsletter/newsletter-template.ts');
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
  'NEWSLETTER_CONFIRMATION_EMAIL_ENABLED',
  'newsletterConfirmationEmailReady',
  'sendNewsletterConfirmationEmail',
  '${RESEND_API}/emails',
  "'idempotency-key'",
  'texasdefined-newsletter-confirm/',
  '/api/newsletter/confirm?token=',
  'Confirm your TexasDefined newsletter subscription',
]) requireText(confirmation, marker, 'Newsletter confirmation transport');

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
  '.min(1).max(12)',
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
  'resendConfigured',
  'missingRuntimeBindings',
  'activationBlocked',
  'confirmationEmailEnabled',
  'confirmationEmailConfigured',
  'confirmationEmailReady',
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
  'newsletterConfirmationEmailReady',
  'sendNewsletterConfirmationEmail',
  'confirmation_unavailable',
  'confirmation_delivery_failed',
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
  'NEWSLETTER_CONFIRMATION_EMAIL_ENABLED=true',
  'news.texasdefined.com',
  'Cloudflare Email Service is not the newsletter transport',
  'Server-only issue composer',
  'Server-only operator control plane',
  'keep_vars',
  'missing runtime bindings',
  'confirmation email transport',
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
