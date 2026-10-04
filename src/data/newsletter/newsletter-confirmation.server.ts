import { supabaseAdmin } from '@/integrations/supabase/client.server';

type NewsletterClient = {
  from: (table: string) => any;
};

const client = supabaseAdmin as unknown as NewsletterClient;
const RESEND_API = 'https://api.resend.com';

function env(name: string) {
  return process.env[name]?.trim() || '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function newsletterOrigin() {
  const configured = env('NEWSLETTER_SITE_ORIGIN') || 'https://texasdefined.com';
  const url = new URL(configured);
  if (url.protocol !== 'https:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
    throw new Error('NEWSLETTER_SITE_ORIGIN must use HTTPS outside local development.');
  }
  return url.origin;
}

export function newsletterConfirmationEmailsEnabled() {
  return process.env['NEWSLETTER_CONFIRMATION_EMAILS_ENABLED'] === 'true';
}

export function newsletterConfirmationEmailConfigured() {
  return Boolean(env('RESEND_API_KEY') && env('NEWSLETTER_FROM_EMAIL'));
}

export async function sendNewsletterConfirmationEmail(input: {
  subscriberId: string;
  email: string;
  token: string;
  attemptId: string;
}) {
  if (!newsletterConfirmationEmailsEnabled()) {
    return { ok: true, sent: false, reason: 'disabled' } as const;
  }
  if (!newsletterConfirmationEmailConfigured()) {
    throw new Error('Newsletter confirmation email delivery is enabled but Resend is not configured.');
  }

  // Re-read the claim immediately before the provider call. A newer signup attempt,
  // confirmation, or unsubscribe makes this request stale and must suppress the send.
  const { data: current, error: currentError } = await client
    .from('texasdefined_newsletter_subscribers')
    .select('id,email,status,confirmation_token,confirmation_email_attempt_id')
    .eq('id', input.subscriberId)
    .maybeSingle() as {
      data: {
        id: string;
        email: string;
        status: string;
        confirmation_token: string | null;
        confirmation_email_attempt_id: string | null;
      } | null;
      error: { message: string } | null;
    };
  if (currentError) throw new Error(`Newsletter confirmation preflight failed: ${currentError.message}`);
  if (
    !current
    || current.status !== 'pending'
    || current.email.toLowerCase() !== input.email.trim().toLowerCase()
    || current.confirmation_token !== input.token
    || current.confirmation_email_attempt_id !== input.attemptId
  ) {
    return { ok: true, sent: false, reason: 'superseded' } as const;
  }

  const confirmationUrl = new URL('/api/newsletter/confirm', newsletterOrigin());
  confirmationUrl.searchParams.set('token', input.token);
  const confirmationHref = confirmationUrl.toString();
  const from = `TexasDefined <${env('NEWSLETTER_FROM_EMAIL')}>`;
  const subject = 'Confirm your TexasDefined newsletter subscription';
  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f5f1e8;color:#2e302d;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f1e8;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #ded8cb;border-radius:8px;overflow:hidden;">
          <tr><td style="padding:34px 36px;">
            <p style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8b4d33;font-weight:700;">TexasDefined</p>
            <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;color:#242824;">Confirm your subscription</h1>
            <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">Confirm that you want Texas places, events, road trips, outdoor guides and stories delivered to your inbox.</p>
            <p style="margin:0 0 26px;"><a href="${escapeHtml(confirmationHref)}" style="display:inline-block;background:#2f5d73;color:#ffffff;text-decoration:none;font-weight:700;padding:13px 20px;border-radius:5px;">Confirm subscription</a></p>
            <p style="margin:0;font-size:13px;line-height:1.6;color:#6b6f69;">If you did not request this, you can ignore this email. You will not be added to the active TexasDefined newsletter audience unless you confirm.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
  const text = `TexasDefined\n\nConfirm your newsletter subscription:\n${confirmationHref}\n\nIf you did not request this, ignore this email. You will not be added to the active newsletter audience unless you confirm.`;

  const response = await fetch(`${RESEND_API}/emails`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env('RESEND_API_KEY')}`,
      'content-type': 'application/json',
      'idempotency-key': `texasdefined-newsletter-confirm/${input.subscriberId}/${input.attemptId}`,
    },
    body: JSON.stringify({
      from,
      to: [input.email],
      subject,
      html,
      text,
    }),
  });

  const raw = await response.text();
  let body: unknown = null;
  try { body = raw ? JSON.parse(raw) : null; } catch { body = { message: raw }; }
  if (!response.ok) {
    const record = body && typeof body === 'object' ? body as Record<string, unknown> : {};
    throw new Error(String(record.message || record.error || `Resend confirmation email failed with HTTP ${response.status}.`));
  }

  const providerId = body && typeof body === 'object' && typeof (body as Record<string, unknown>).id === 'string'
    ? String((body as Record<string, unknown>).id)
    : '';
  if (!providerId) throw new Error('Resend did not return a confirmation email message ID.');

  const sentAt = new Date().toISOString();
  const { error } = await client
    .from('texasdefined_newsletter_subscribers')
    .update({
      confirmation_email_sent_at: sentAt,
      confirmation_email_provider_id: providerId,
      updated_at: sentAt,
    })
    .eq('id', input.subscriberId)
    .eq('status', 'pending')
    .eq('confirmation_token', input.token)
    .eq('confirmation_email_attempt_id', input.attemptId) as { error: { message: string } | null };

  if (error) throw new Error(`Newsletter confirmation delivery state could not be saved: ${error.message}`);
  return { ok: true, sent: true, providerId } as const;
}
