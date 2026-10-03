import { readFileSync } from 'node:fs';

const failures = [];
const read = (path) => readFileSync(path, 'utf8');
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${JSON.stringify(needle)}`);
};

const resend = read('src/data/newsletter/newsletter-resend.server.ts');
const template = read('src/data/newsletter/newsletter-template.ts');
const subscribe = read('src/routes/api.newsletter.subscribe.ts');
const confirm = read('src/routes/api.newsletter.confirm.ts');
const unsubscribe = read('src/routes/api.newsletter.unsubscribe.ts');
const webhook = read('src/routes/api.newsletter.resend-webhook.ts');
const docs = read('docs/newsletter-infrastructure.md');
const migration = read('supabase/migrations/20261003113000_add_texasdefined_newsletter_provider_identity.sql');
const wrangler = read('wrangler.jsonc');

for (const marker of [
  "RESEND_API_KEY",
  "RESEND_NEWSLETTER_SEGMENT_ID",
  "NEWSLETTER_FROM_EMAIL",
  "NEWSLETTER_SENDING_ENABLED",
  "RESEND_WEBHOOK_SECRET",
  "syncNewsletterAudienceToResend",
  "contact.unsubscribed === true",
  "mirrorProviderUnsubscribeToTexasDefined",
  "{{{RESEND_UNSUBSCRIBE_URL}}}",
  "Math.abs(Date.now() / 1000 - timestampNumber) > 300",
  "crypto.subtle.sign('HMAC'",
  "finalizeNewsletterIssueIfComplete",
]) requireText(resend, marker, 'Resend adapter');

for (const marker of [
  "{{{RESEND_UNSUBSCRIBE_URL}}}",
  'renderTexasDefinedNewsletter',
  'Read on TexasDefined',
  'safeHttpUrl',
]) requireText(template, marker, 'Newsletter template');

requireText(subscribe, "NEWSLETTER_SIGNUPS_ENABLED", 'Subscribe rollout gate');
requireText(subscribe, "createFileRoute('/api/newsletter/subscribe')", 'Subscribe API route');
requireText(confirm, "createFileRoute('/api/newsletter/confirm')", 'Confirm API route');
requireText(unsubscribe, "createFileRoute('/api/newsletter/unsubscribe')", 'Unsubscribe API route');
for (const marker of [
  "createFileRoute('/api/newsletter/resend-webhook')",
  'verifyResendWebhook(rawBody, request.headers)',
  'await request.text()',
  "invalid_signature",
]) requireText(webhook, marker, 'Resend webhook route');

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
]) requireText(docs, marker, 'Newsletter documentation');

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
