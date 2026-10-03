import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { buildNewsletterDeliveryQueue } from './newsletter.server';

type NewsletterClient = {
  from: (table: string) => any;
};

const client = supabaseAdmin as unknown as NewsletterClient;
const RESEND_API = 'https://api.resend.com';
const PROVIDER = 'resend';

function env(name: string) {
  return process.env[name]?.trim() || '';
}

export function resendNewsletterConfigured() {
  return Boolean(env('RESEND_API_KEY') && env('RESEND_NEWSLETTER_SEGMENT_ID') && env('NEWSLETTER_FROM_EMAIL'));
}

async function resendFetch(path: string, init: RequestInit = {}) {
  const apiKey = env('RESEND_API_KEY');
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured.');
  const response = await fetch(`${RESEND_API}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const text = await response.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { message: text }; }
  if (!response.ok) {
    const message = body?.message || body?.error || `Resend request failed with HTTP ${response.status}.`;
    const error = new Error(String(message)) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
  return body;
}

async function getResendContact(email: string) {
  return resendFetch(`/contacts/${encodeURIComponent(email)}`) as Promise<{ id: string; email: string; unsubscribed?: boolean }>;
}

export async function syncNewsletterSubscriberToResend(subscriberId: string) {
  if (!resendNewsletterConfigured()) return { ok: false, configured: false } as const;
  const { data: subscriber, error } = await client
    .from('texasdefined_newsletter_subscribers')
    .select('id,email,status,provider_contact_id')
    .eq('id', subscriberId)
    .maybeSingle() as { data: { id: string; email: string; status: string; provider_contact_id: string | null } | null; error: { message: string } | null };
  if (error) throw new Error(`Newsletter subscriber lookup failed: ${error.message}`);
  if (!subscriber) return { ok: false, configured: true } as const;

  const shouldReceive = subscriber.status === 'active';
  let contactId = subscriber.provider_contact_id;
  if (!contactId) {
    try {
      const created = await resendFetch('/contacts', {
        method: 'POST',
        body: JSON.stringify({ email: subscriber.email, unsubscribed: !shouldReceive }),
      }) as { id?: string };
      contactId = created.id || null;
    } catch (createError) {
      if ((createError as Error & { status?: number }).status !== 409) throw createError;
      const existing = await getResendContact(subscriber.email);
      contactId = existing.id;
    }
  }

  await resendFetch(`/contacts/${encodeURIComponent(subscriber.email)}`, {
    method: 'PATCH',
    body: JSON.stringify({ unsubscribed: !shouldReceive }),
  });

  const segmentId = env('RESEND_NEWSLETTER_SEGMENT_ID');
  const segmentPath = `/contacts/${encodeURIComponent(subscriber.email)}/segments/${encodeURIComponent(segmentId)}`;
  try {
    await resendFetch(segmentPath, { method: shouldReceive ? 'POST' : 'DELETE' });
  } catch (segmentError) {
    // Removing an already-absent contact from a segment is idempotent from our perspective.
    if (shouldReceive || (segmentError as Error & { status?: number }).status !== 404) throw segmentError;
  }

  const now = new Date().toISOString();
  const { error: updateError } = await client
    .from('texasdefined_newsletter_subscribers')
    .update({ provider: PROVIDER, provider_contact_id: contactId, provider_synced_at: now, updated_at: now })
    .eq('id', subscriber.id) as { error: { message: string } | null };
  if (updateError) throw new Error(`Newsletter provider sync state failed: ${updateError.message}`);
  return { ok: true, configured: true, contactId, subscribed: shouldReceive } as const;
}

export async function syncActiveNewsletterSubscribersToResend() {
  if (!resendNewsletterConfigured()) return { ok: false, configured: false, synced: 0 } as const;
  let offset = 0;
  let synced = 0;
  const pageSize = 250;
  while (true) {
    const { data, error } = await client
      .from('texasdefined_newsletter_subscribers')
      .select('id')
      .eq('status', 'active')
      .order('id', { ascending: true })
      .range(offset, offset + pageSize - 1) as { data: Array<{ id: string }> | null; error: { message: string } | null };
    if (error) throw new Error(`Newsletter audience sync lookup failed: ${error.message}`);
    if (!data?.length) break;
    for (let index = 0; index < data.length; index += 25) {
      const batch = data.slice(index, index + 25);
      await Promise.all(batch.map((row) => syncNewsletterSubscriberToResend(row.id)));
      synced += batch.length;
    }
    if (data.length < pageSize) break;
    offset += pageSize;
  }
  return { ok: true, configured: true, synced } as const;
}

function ensureResendUnsubscribe(html: string | null, text: string | null) {
  const token = '{{{RESEND_UNSUBSCRIBE_URL}}}';
  const htmlBody = html
    ? (html.includes(token) ? html : `${html}<p style="margin:32px 0 0;font-size:12px;color:#6b7280">You received this because you subscribed to TexasDefined. <a href="${token}">Unsubscribe</a>.</p>`)
    : null;
  const textBody = text
    ? (text.includes(token) ? text : `${text}\n\nUnsubscribe: ${token}`)
    : null;
  return { htmlBody, textBody };
}

export async function publishNewsletterIssueToResend(issueId: string, options: { send?: boolean } = {}) {
  if (!resendNewsletterConfigured()) throw new Error('Resend newsletter delivery is not configured.');
  const { data: issue, error } = await client
    .from('texasdefined_newsletter_issues')
    .select('id,slug,status,subject,preheader,from_name,reply_to,html_body,text_body,scheduled_for,provider_campaign_id')
    .eq('id', issueId)
    .maybeSingle() as {
      data: { id: string; slug: string; status: string; subject: string; preheader: string | null; from_name: string; reply_to: string | null; html_body: string | null; text_body: string | null; scheduled_for: string | null; provider_campaign_id: string | null } | null;
      error: { message: string } | null;
    };
  if (error) throw new Error(`Newsletter issue lookup failed: ${error.message}`);
  if (!issue) throw new Error('Newsletter issue does not exist.');
  if (!['ready', 'scheduled'].includes(issue.status)) throw new Error(`Newsletter issue cannot publish from status ${issue.status}.`);
  if (!issue.html_body && !issue.text_body) throw new Error('Newsletter issue has no body.');

  await syncActiveNewsletterSubscribersToResend();
  await buildNewsletterDeliveryQueue(issue.id);
  const bodies = ensureResendUnsubscribe(issue.html_body, issue.text_body);
  const payload = {
    name: `TexasDefined: ${issue.slug}`.slice(0, 70),
    segment_id: env('RESEND_NEWSLETTER_SEGMENT_ID'),
    from: `${issue.from_name} <${env('NEWSLETTER_FROM_EMAIL')}>`,
    subject: issue.subject,
    reply_to: issue.reply_to ? [issue.reply_to] : undefined,
    preview_text: issue.preheader || undefined,
    html: bodies.htmlBody || undefined,
    text: bodies.textBody || undefined,
    send: Boolean(options.send),
    scheduled_at: options.send && issue.status === 'scheduled' ? issue.scheduled_for || undefined : undefined,
  };

  let campaignId = issue.provider_campaign_id;
  if (campaignId) {
    await resendFetch(`/broadcasts/${campaignId}`, { method: 'PATCH', body: JSON.stringify(payload) });
    if (options.send) {
      await resendFetch(`/broadcasts/${campaignId}/send`, {
        method: 'POST',
        body: JSON.stringify(issue.status === 'scheduled' && issue.scheduled_for ? { scheduled_at: issue.scheduled_for } : {}),
      });
    }
  } else {
    const created = await resendFetch('/broadcasts', { method: 'POST', body: JSON.stringify(payload) }) as { id: string };
    campaignId = created.id;
  }

  const now = new Date().toISOString();
  const nextStatus = options.send && issue.status !== 'scheduled' ? 'sending' : issue.status;
  const { error: updateError } = await client
    .from('texasdefined_newsletter_issues')
    .update({
      provider: PROVIDER,
      provider_campaign_id: campaignId,
      provider_synced_at: now,
      status: nextStatus,
      sending_started_at: nextStatus === 'sending' ? now : undefined,
      updated_at: now,
    })
    .eq('id', issue.id) as { error: { message: string } | null };
  if (updateError) throw new Error(`Newsletter issue provider state failed: ${updateError.message}`);
  return { ok: true, campaignId, sentOrScheduled: Boolean(options.send) } as const;
}

export async function cancelResendNewsletterIssue(issueId: string) {
  const { data: issue, error } = await client
    .from('texasdefined_newsletter_issues')
    .select('provider_campaign_id')
    .eq('id', issueId)
    .maybeSingle() as { data: { provider_campaign_id: string | null } | null; error: { message: string } | null };
  if (error) throw new Error(`Newsletter issue lookup failed: ${error.message}`);
  if (issue?.provider_campaign_id && resendNewsletterConfigured()) {
    await resendFetch(`/broadcasts/${issue.provider_campaign_id}/cancel`, { method: 'POST', body: '{}' });
  }
  return { ok: true } as const;
}

function base64Bytes(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function timingSafeEqual(left: string, right: string) {
  const a = new TextEncoder().encode(left);
  const b = new TextEncoder().encode(right);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index += 1) diff |= a[index] ^ b[index];
  return diff === 0;
}

export async function verifyResendWebhook(rawBody: string, headers: Headers) {
  const secret = env('RESEND_WEBHOOK_SECRET');
  if (!secret.startsWith('whsec_')) return false;
  const id = headers.get('svix-id') || headers.get('webhook-id') || '';
  const timestamp = headers.get('svix-timestamp') || headers.get('webhook-timestamp') || '';
  const signatures = headers.get('svix-signature') || headers.get('webhook-signature') || '';
  if (!id || !timestamp || !signatures) return false;
  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber) || Math.abs(Date.now() / 1000 - timestampNumber) > 300) return false;
  const key = await crypto.subtle.importKey('raw', base64Bytes(secret.slice(6)), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${id}.${timestamp}.${rawBody}`));
  let binary = '';
  for (const byte of new Uint8Array(signature)) binary += String.fromCharCode(byte);
  const expected = btoa(binary);
  return signatures.split(' ').some((entry) => entry.startsWith('v1,') && timingSafeEqual(entry.slice(3), expected));
}

const emailEventMap: Record<string, string> = {
  'email.sent': 'sent',
  'email.delivered': 'delivered',
  'email.opened': 'opened',
  'email.clicked': 'clicked',
  'email.delivery_delayed': 'delivery_delayed',
  'email.failed': 'failed',
  'email.suppressed': 'suppressed',
  'email.bounced': 'bounced',
  'email.complained': 'complained',
};

export async function processResendNewsletterWebhook(event: any, providerEventId: string) {
  if (event?.type === 'contact.updated' && event?.data?.email && event?.data?.unsubscribed === true) {
    const now = event.created_at || new Date().toISOString();
    const { error } = await client.from('texasdefined_newsletter_subscribers').update({ status: 'unsubscribed', unsubscribed_at: now, updated_at: now }).eq('email', String(event.data.email).toLowerCase()) as { error: { message: string } | null };
    if (error) throw new Error(`Newsletter unsubscribe webhook failed: ${error.message}`);
    return { ok: true, matched: true } as const;
  }

  const normalizedType = emailEventMap[event?.type];
  const broadcastId = event?.data?.broadcast_id;
  const email = Array.isArray(event?.data?.to) ? event.data.to[0] : event?.data?.to;
  if (!normalizedType || !broadcastId || !email) return { ok: true, matched: false } as const;

  const [{ data: issue }, { data: subscriber }] = await Promise.all([
    client.from('texasdefined_newsletter_issues').select('id').eq('provider', PROVIDER).eq('provider_campaign_id', broadcastId).maybeSingle(),
    client.from('texasdefined_newsletter_subscribers').select('id,status').eq('email', String(email).toLowerCase()).maybeSingle(),
  ]) as [{ data: { id: string } | null }, { data: { id: string; status: string } | null }];
  if (!issue || !subscriber) return { ok: true, matched: false } as const;

  const { data: delivery, error: deliveryError } = await client
    .from('texasdefined_newsletter_deliveries')
    .select('id,status')
    .eq('issue_id', issue.id)
    .eq('subscriber_id', subscriber.id)
    .maybeSingle() as { data: { id: string; status: string } | null; error: { message: string } | null };
  if (deliveryError) throw new Error(`Newsletter delivery webhook lookup failed: ${deliveryError.message}`);
  if (!delivery) return { ok: true, matched: false } as const;

  const eventAt = event.created_at || event?.data?.created_at || new Date().toISOString();
  const providerMessageId = event?.data?.email_id || null;
  const update: Record<string, unknown> = { provider: PROVIDER, updated_at: new Date().toISOString() };
  if (providerMessageId) update.provider_message_id = providerMessageId;
  if (normalizedType === 'sent') { update.status = 'sent'; update.sent_at = eventAt; }
  if (normalizedType === 'delivered') { update.status = 'delivered'; update.delivered_at = eventAt; }
  if (normalizedType === 'bounced') { update.status = 'bounced'; update.failed_at = eventAt; }
  if (normalizedType === 'complained') { update.status = 'complained'; update.failed_at = eventAt; }
  if (normalizedType === 'failed' || normalizedType === 'suppressed') { update.status = 'failed'; update.failed_at = eventAt; update.error_code = normalizedType; }
  const { error: updateError } = await client.from('texasdefined_newsletter_deliveries').update(update).eq('id', delivery.id) as { error: { message: string } | null };
  if (updateError) throw new Error(`Newsletter delivery webhook state failed: ${updateError.message}`);

  const { error: eventError } = await client.from('texasdefined_newsletter_events').upsert({
    delivery_id: delivery.id,
    event_type: normalizedType,
    event_at: eventAt,
    provider_event_id: providerEventId,
    url: event?.data?.click?.link || null,
    metadata: event?.data || {},
  }, { onConflict: 'provider_event_id', ignoreDuplicates: true }) as { error: { message: string } | null };
  if (eventError) throw new Error(`Newsletter provider event write failed: ${eventError.message}`);

  if (normalizedType === 'bounced' || normalizedType === 'complained') {
    const status = normalizedType === 'bounced' ? 'bounced' : 'complained';
    const timestampField = normalizedType === 'bounced' ? 'bounced_at' : 'complained_at';
    const { error: suppressionError } = await client.from('texasdefined_newsletter_subscribers').update({ status, [timestampField]: eventAt, updated_at: eventAt }).eq('id', subscriber.id) as { error: { message: string } | null };
    if (suppressionError) throw new Error(`Newsletter suppression webhook failed: ${suppressionError.message}`);
  }
  return { ok: true, matched: true } as const;
}
