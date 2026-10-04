import { supabaseAdmin } from '@/integrations/supabase/client.server';

type NewsletterClient = {
  from: (table: string) => any;
};

const client = supabaseAdmin as unknown as NewsletterClient;
const RESEND_API = 'https://api.resend.com';
const DEFAULT_PUBLIC_BASE_URL = 'https://texasdefined.com';

function env(name: string) {
  return process.env[name]?.trim() || '';
}

function normalizedBaseUrl() {
  const configured = env('NEWSLETTER_PUBLIC_BASE_URL') || DEFAULT_PUBLIC_BASE_URL;
  try {
    const url = new URL(configured);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return DEFAULT_PUBLIC_BASE_URL;
    return url.origin;
  } catch {
    return DEFAULT_PUBLIC_BASE_URL;
  }
}

export function newsletterConfirmationEmailConfigured() {
  return Boolean(env('RESEND_API_KEY') && env('NEWSLETTER_FROM_EMAIL'));
}

export function newsletterConfirmationEmailEnabled() {
  return process.env['NEWSLETTER_CONFIRMATION_EMAIL_ENABLED'] === 'true';
}

export function newsletterConfirmationEmailReady() {
  return newsletterConfirmationEmailConfigured() && newsletterConfirmationEmailEnabled();
}

export async function sendNewsletterConfirmationEmail(email: string) {
  if (!newsletterConfirmationEmailReady()) {
    throw new Error('Newsletter confirmation email is not enabled and configured.');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const { data: subscriber, error } = await client
    .from('texasdefined_newsletter_subscribers')
    .select('id,email,status,confirmation_token')
    .eq('email', normalizedEmail)
    .maybeSingle() as {
      data: { id: string; email: string; status: string; confirmation_token: string | null } | null;
      error: { message: string } | null;
    };

  if (error) throw new Error(`Newsletter confirmation lookup failed: ${error.message}`);
  if (!subscriber || subscriber.status !== 'pending' || !subscriber.confirmation_token) {
    return { ok: true, sent: false } as const;
  }

  const confirmationUrl = `${normalizedBaseUrl()}/api/newsletter/confirm?token=${encodeURIComponent(subscriber.confirmation_token)}`;
  const fromEmail = env('NEWSLETTER_FROM_EMAIL');
  const response = await fetch(`${RESEND_API}/emails`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env('RESEND_API_KEY')}`,
      'content-type': 'application/json',
      'idempotency-key': `texasdefined-newsletter-confirm/${subscriber.confirmation_token}`,
    },
    body: JSON.stringify({
      from: `TexasDefined <${fromEmail}>`,
      to: [subscriber.email],
      subject: 'Confirm your TexasDefined newsletter subscription',
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937"><h1 style="font-size:24px">Confirm your TexasDefined subscription</h1><p>One quick step confirms that you want Texas places, events, road trips, outdoor guides, and stories delivered to your inbox.</p><p><a href="${confirmationUrl}" style="display:inline-block;padding:12px 18px;background:#1f4f8a;color:#fff;text-decoration:none;border-radius:6px">Confirm subscription</a></p><p style="font-size:12px;color:#6b7280">If you did not request this, you can ignore this email.</p></div>`,
      text: `Confirm your TexasDefined newsletter subscription:\n\n${confirmationUrl}\n\nIf you did not request this, you can ignore this email.`,
    }),
  });

  const bodyText = await response.text();
  let responseBody: Record<string, unknown> = {};
  try {
    responseBody = bodyText ? JSON.parse(bodyText) as Record<string, unknown> : {};
  } catch {
    responseBody = {};
  }

  if (!response.ok) {
    const message = responseBody.message || responseBody.error || `Resend confirmation request failed with HTTP ${response.status}.`;
    throw new Error(String(message));
  }

  return {
    ok: true,
    sent: true,
    provider: 'resend',
    messageId: typeof responseBody.id === 'string' ? responseBody.id : null,
  } as const;
}
