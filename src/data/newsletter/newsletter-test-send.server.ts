import { supabaseAdmin } from '@/integrations/supabase/client.server';

type NewsletterClient = {
  from: (table: string) => any;
};

type NewsletterIssueForTest = {
  id: string;
  subject: string;
  preheader: string | null;
  from_name: string;
  reply_to: string | null;
  html_body: string | null;
  text_body: string | null;
};

const client = supabaseAdmin as unknown as NewsletterClient;
const RESEND_API = 'https://api.resend.com';
const RESEND_UNSUBSCRIBE_TOKEN = '{{{RESEND_UNSUBSCRIBE_URL}}}';
const TEST_LINK_FALLBACK = 'https://texasdefined.com/?newsletter_test=1';
const TEST_IDEMPOTENCY_WINDOW_MS = 5 * 60 * 1000;

function env(name: string) {
  return process.env[name]?.trim() || '';
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function testRecipientAllowlist() {
  return Array.from(new Set(
    env('NEWSLETTER_TEST_RECIPIENTS')
      .split(',')
      .map(normalizeEmail)
      .filter(Boolean),
  ));
}

export function getNewsletterTestDeliveryReadiness() {
  const enabled = process.env['NEWSLETTER_TEST_SENDS_ENABLED'] === 'true';
  const missingRuntimeBindings = [
    'RESEND_API_KEY',
    'NEWSLETTER_FROM_EMAIL',
    'NEWSLETTER_TEST_RECIPIENTS',
  ].filter((key) => !env(key));
  const recipientCount = testRecipientAllowlist().length;
  const configured = missingRuntimeBindings.length === 0 && recipientCount > 0;

  return {
    enabled,
    configured,
    ready: enabled && configured,
    recipientCount,
    missingRuntimeBindings,
  } as const;
}

function safeTestBodies(html: string | null, text: string | null) {
  const banner = '<div style="margin:0 0 24px;padding:12px 16px;border:2px solid #b45309;background:#fffbeb;color:#78350f;font:700 14px/1.4 Arial,sans-serif">TEST DELIVERY — no subscriber, issue, or delivery state will be changed. Production unsubscribe links are injected only for real broadcasts.</div>';
  const htmlBody = html
    ? `${banner}${html.replaceAll(RESEND_UNSUBSCRIBE_TOKEN, TEST_LINK_FALLBACK)}`
    : null;
  const textBody = text
    ? `TEST DELIVERY — no subscriber, issue, or delivery state will be changed. Production unsubscribe links are injected only for real broadcasts.\n\n${text.replaceAll(RESEND_UNSUBSCRIBE_TOKEN, '[unsubscribe link disabled in test delivery]')}`
    : null;
  return { htmlBody, textBody };
}

async function testIdempotencyKey(issueId: string, recipient: string, subject: string) {
  const bucket = Math.floor(Date.now() / TEST_IDEMPOTENCY_WINDOW_MS);
  const input = `${issueId}|${recipient}|${subject}|${bucket}`;
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  const hex = Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `texasdefined-newsletter-test-${hex.slice(0, 48)}`;
}

export async function sendNewsletterTestIssue(issueId: string, requestedRecipient: string) {
  const readiness = getNewsletterTestDeliveryReadiness();
  if (!readiness.enabled) {
    throw new Error('Newsletter test delivery is disabled. Set NEWSLETTER_TEST_SENDS_ENABLED=true only while validating the sender.');
  }
  if (!readiness.configured) {
    throw new Error(`Newsletter test delivery is not configured. Missing: ${readiness.missingRuntimeBindings.join(', ') || 'recipient allowlist'}.`);
  }

  const recipient = normalizeEmail(requestedRecipient);
  const allowlist = testRecipientAllowlist();
  if (!allowlist.includes(recipient)) {
    throw new Error('That address is not in NEWSLETTER_TEST_RECIPIENTS.');
  }

  const { data: issue, error } = await client
    .from('texasdefined_newsletter_issues')
    .select('id,subject,preheader,from_name,reply_to,html_body,text_body')
    .eq('id', issueId)
    .maybeSingle() as {
      data: NewsletterIssueForTest | null;
      error: { message: string } | null;
    };
  if (error) throw new Error(`Newsletter test issue lookup failed: ${error.message}`);
  if (!issue) throw new Error('Newsletter issue does not exist.');
  if (!issue.html_body && !issue.text_body) throw new Error('Newsletter issue has no rendered body to test.');

  const apiKey = env('RESEND_API_KEY');
  const fromEmail = env('NEWSLETTER_FROM_EMAIL');
  const bodies = safeTestBodies(issue.html_body, issue.text_body);
  const response = await fetch(`${RESEND_API}/emails`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
      'idempotency-key': await testIdempotencyKey(issue.id, recipient, issue.subject),
    },
    body: JSON.stringify({
      from: `${issue.from_name || 'TexasDefined'} <${fromEmail}>`,
      to: [recipient],
      subject: `[TEST] ${issue.subject}`,
      reply_to: issue.reply_to || undefined,
      html: bodies.htmlBody || undefined,
      text: bodies.textBody || undefined,
    }),
  });

  const raw = await response.text();
  let body: unknown = null;
  try { body = raw ? JSON.parse(raw) : null; } catch { body = { message: raw }; }
  if (!response.ok) {
    const record = body && typeof body === 'object' ? body as Record<string, unknown> : {};
    throw new Error(String(record.message || record.error || `Resend test delivery failed with HTTP ${response.status}.`));
  }

  const messageId = body && typeof body === 'object' && 'id' in body ? String((body as { id?: unknown }).id || '') || null : null;
  return {
    ok: true,
    test: true,
    provider: 'resend',
    recipient,
    messageId,
  } as const;
}
