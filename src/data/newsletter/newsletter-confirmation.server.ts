const RESEND_API = 'https://api.resend.com';
const DEFAULT_SITE_URL = 'https://texasdefined.com';

function env(name: string) {
  return process.env[name]?.trim() || '';
}

function safeSiteUrl() {
  const configured = env('NEWSLETTER_PUBLIC_BASE_URL') || DEFAULT_SITE_URL;
  try {
    const parsed = new URL(configured);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return DEFAULT_SITE_URL;
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function resendNewsletterConfirmationConfigured() {
  return Boolean(env('RESEND_API_KEY') && env('NEWSLETTER_FROM_EMAIL'));
}

export function buildNewsletterConfirmationUrl(token: string) {
  const url = new URL('/api/newsletter/confirm', safeSiteUrl());
  url.searchParams.set('token', token);
  return url.toString();
}

export async function sendNewsletterConfirmationEmail(input: {
  email: string;
  token: string;
  idempotencyBucket: string;
}) {
  const apiKey = env('RESEND_API_KEY');
  const fromEmail = env('NEWSLETTER_FROM_EMAIL');
  if (!apiKey || !fromEmail) {
    throw new Error('Newsletter confirmation delivery is not configured.');
  }

  const confirmationUrl = buildNewsletterConfirmationUrl(input.token);
  const safeUrl = escapeHtml(confirmationUrl);
  const response = await fetch(`${RESEND_API}/emails`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
      'idempotency-key': `texasdefined-confirm/${input.token}/${input.idempotencyBucket}`.slice(0, 256),
    },
    body: JSON.stringify({
      from: `TexasDefined <${fromEmail}>`,
      to: [input.email],
      subject: 'Confirm your TexasDefined newsletter subscription',
      html: `<!doctype html><html><body style="margin:0;background:#f5f1e8;color:#20201f;font-family:Arial,sans-serif"><div style="max-width:620px;margin:0 auto;padding:40px 24px"><div style="font-family:Georgia,serif;font-size:28px;font-weight:700;margin-bottom:24px">TexasDefined</div><h1 style="font-family:Georgia,serif;font-size:30px;line-height:1.2;margin:0 0 16px">Confirm your subscription</h1><p style="font-size:16px;line-height:1.6;margin:0 0 24px">Confirm that you want Texas places, events, road trips, outdoor guides and stories worth knowing delivered to your inbox.</p><p style="margin:0 0 28px"><a href="${safeUrl}" style="display:inline-block;background:#8b3f2f;color:#ffffff;text-decoration:none;font-weight:700;padding:13px 20px;border-radius:6px">Confirm subscription</a></p><p style="font-size:13px;line-height:1.5;color:#68645d;margin:0">If you did not request this subscription, you can ignore this email.</p></div></body></html>`,
      text: `TexasDefined\n\nConfirm your subscription\n\nConfirm that you want Texas places, events, road trips, outdoor guides and stories worth knowing delivered to your inbox.\n\nConfirm: ${confirmationUrl}\n\nIf you did not request this subscription, you can ignore this email.`,
    }),
  });

  const rawBody = await response.text();
  let body: unknown = null;
  try { body = rawBody ? JSON.parse(rawBody) : null; } catch { body = null; }
  if (!response.ok) {
    const record = body && typeof body === 'object' ? body as Record<string, unknown> : {};
    const providerMessage = typeof record.message === 'string' ? ` ${record.message}` : '';
    throw new Error(`Newsletter confirmation delivery failed with HTTP ${response.status}.${providerMessage}`);
  }

  const record = body && typeof body === 'object' ? body as Record<string, unknown> : {};
  return {
    ok: true,
    messageId: typeof record.id === 'string' ? record.id : null,
  } as const;
}
