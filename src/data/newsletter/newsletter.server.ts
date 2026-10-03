import { supabaseAdmin } from '@/integrations/supabase/client.server';

export type NewsletterSubscriberStatus = 'pending' | 'active' | 'unsubscribed' | 'bounced' | 'complained';
export type NewsletterDeliveryEventType = 'accepted' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained' | 'unsubscribed';

type SubscriberRow = {
  id: string;
  email: string;
  status: NewsletterSubscriberStatus;
  interests: string[];
  unsubscribe_token: string;
  confirmation_token: string | null;
};

type NewsletterClient = {
  from: (table: string) => any;
};

const client = supabaseAdmin as unknown as NewsletterClient;

function nowIso() {
  return new Date().toISOString();
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeInterests(interests: string[]) {
  return [...new Set(interests.map((interest) => interest.trim().toLowerCase()).filter(Boolean))].slice(0, 12);
}

export function newsletterRequiresConfirmation() {
  return process.env['NEWSLETTER_DOUBLE_OPT_IN'] === 'true';
}

export async function subscribeNewsletter(input: {
  email: string;
  sourcePath: string;
  source: string;
  consentVersion: string;
  interests: string[];
}) {
  const email = normalizeEmail(input.email);
  const interests = normalizeInterests(input.interests);
  const now = nowIso();
  const confirmationRequired = newsletterRequiresConfirmation();

  const { data: existing, error: lookupError } = await client
    .from('texasdefined_newsletter_subscribers')
    .select('id,email,status,interests,unsubscribe_token,confirmation_token')
    .eq('email', email)
    .maybeSingle() as { data: SubscriberRow | null; error: { message: string } | null };

  if (lookupError) throw new Error(`Newsletter signup lookup failed: ${lookupError.message}`);

  // Complaints and bounces remain suppressed until an operator deliberately resolves them.
  // Return the same public response so callers cannot probe suppression state.
  if (existing?.status === 'complained' || existing?.status === 'bounced') {
    return { ok: true, confirmationRequired } as const;
  }

  const mergedInterests = normalizeInterests([...(existing?.interests ?? []), ...interests]);
  const nextStatus: NewsletterSubscriberStatus = confirmationRequired && existing?.status !== 'active' ? 'pending' : 'active';

  if (existing) {
    const update: Record<string, unknown> = {
      status: nextStatus,
      consent_at: now,
      consent_version: input.consentVersion,
      source: input.source,
      signup_path: input.sourcePath,
      interests: mergedInterests,
      subscribed_at: now,
      unsubscribed_at: null,
      updated_at: now,
    };

    if (nextStatus === 'pending') {
      update.confirmation_token = crypto.randomUUID();
      update.confirmation_requested_at = now;
      update.confirmed_at = null;
    } else {
      update.confirmation_token = null;
      update.confirmation_requested_at = null;
    }

    const { error } = await client
      .from('texasdefined_newsletter_subscribers')
      .update(update)
      .eq('id', existing.id) as { error: { message: string } | null };

    if (error) throw new Error(`Newsletter signup could not be updated: ${error.message}`);
    return { ok: true, confirmationRequired } as const;
  }

  const { error } = await client.from('texasdefined_newsletter_subscribers').insert({
    email,
    status: nextStatus,
    consent_at: now,
    consent_version: input.consentVersion,
    source: input.source,
    signup_path: input.sourcePath,
    interests,
    subscribed_at: now,
    confirmation_token: nextStatus === 'pending' ? crypto.randomUUID() : null,
    confirmation_requested_at: nextStatus === 'pending' ? now : null,
  }) as { error: { message: string } | null };

  if (error) throw new Error(`Newsletter signup could not be saved: ${error.message}`);
  return { ok: true, confirmationRequired } as const;
}

export async function confirmNewsletterSubscription(token: string) {
  const now = nowIso();
  const { error } = await client
    .from('texasdefined_newsletter_subscribers')
    .update({
      status: 'active',
      confirmed_at: now,
      confirmation_token: null,
      confirmation_requested_at: null,
      updated_at: now,
    })
    .eq('confirmation_token', token)
    .eq('status', 'pending') as { error: { message: string } | null };

  if (error) throw new Error(`Newsletter confirmation failed: ${error.message}`);
  return { ok: true } as const;
}

export async function unsubscribeNewsletter(token: string) {
  const { data: subscriber, error: lookupError } = await client
    .from('texasdefined_newsletter_subscribers')
    .select('id,email,status,interests,unsubscribe_token,confirmation_token')
    .eq('unsubscribe_token', token)
    .maybeSingle() as { data: SubscriberRow | null; error: { message: string } | null };

  if (lookupError) throw new Error(`Newsletter unsubscribe lookup failed: ${lookupError.message}`);
  if (!subscriber || subscriber.status === 'complained' || subscriber.status === 'unsubscribed') return { ok: true } as const;

  const now = nowIso();
  const { error } = await client
    .from('texasdefined_newsletter_subscribers')
    .update({
      status: 'unsubscribed',
      unsubscribed_at: now,
      confirmation_token: null,
      confirmation_requested_at: null,
      updated_at: now,
    })
    .eq('id', subscriber.id) as { error: { message: string } | null };

  if (error) throw new Error(`Newsletter unsubscribe failed: ${error.message}`);
  return { ok: true } as const;
}

export async function saveNewsletterIssueDraft(input: {
  slug: string;
  subject: string;
  preheader?: string | null;
  fromName?: string;
  replyTo?: string | null;
  content?: Record<string, unknown>;
  htmlBody?: string | null;
  textBody?: string | null;
  audience?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}) {
  const { data: existing, error: lookupError } = await client
    .from('texasdefined_newsletter_issues')
    .select('id,status')
    .eq('slug', input.slug)
    .maybeSingle() as { data: { id: string; status: string } | null; error: { message: string } | null };

  if (lookupError) throw new Error(`Newsletter draft lookup failed: ${lookupError.message}`);
  if (existing && ['sending', 'sent', 'cancelled'].includes(existing.status)) {
    throw new Error(`Newsletter issue cannot be edited as a draft from status ${existing.status}.`);
  }

  const now = nowIso();
  const payload = {
    slug: input.slug,
    status: 'draft',
    subject: input.subject,
    preheader: input.preheader ?? null,
    from_name: input.fromName ?? 'TexasDefined',
    reply_to: input.replyTo ?? null,
    content: input.content ?? { sections: [] },
    html_body: input.htmlBody ?? null,
    text_body: input.textBody ?? null,
    audience: input.audience ?? {},
    metadata: input.metadata ?? {},
    updated_at: now,
  };

  const { data, error } = await client
    .from('texasdefined_newsletter_issues')
    .upsert(payload, { onConflict: 'slug' })
    .select('id,slug,status,subject,updated_at')
    .single() as {
      data: { id: string; slug: string; status: string; subject: string; updated_at: string } | null;
      error: { message: string } | null;
    };

  if (error || !data) throw new Error(`Newsletter draft could not be saved: ${error?.message ?? 'No issue returned.'}`);
  return data;
}

export async function buildNewsletterDeliveryQueue(issueId: string) {
  const { data: issue, error: issueError } = await client
    .from('texasdefined_newsletter_issues')
    .select('id,status')
    .eq('id', issueId)
    .maybeSingle() as { data: { id: string; status: string } | null; error: { message: string } | null };

  if (issueError) throw new Error(`Newsletter issue lookup failed: ${issueError.message}`);
  if (!issue) throw new Error('Newsletter issue does not exist.');
  if (!['ready', 'scheduled'].includes(issue.status)) throw new Error(`Newsletter issue cannot be queued from status ${issue.status}.`);

  let offset = 0;
  const pageSize = 500;
  let queued = 0;

  while (true) {
    const { data: subscribers, error } = await client
      .from('texasdefined_newsletter_subscribers')
      .select('id,email')
      .eq('status', 'active')
      .order('id', { ascending: true })
      .range(offset, offset + pageSize - 1) as {
        data: Array<{ id: string; email: string }> | null;
        error: { message: string } | null;
      };

    if (error) throw new Error(`Newsletter audience lookup failed: ${error.message}`);
    if (!subscribers?.length) break;

    const rows = subscribers.map((subscriber) => ({
      issue_id: issueId,
      subscriber_id: subscriber.id,
      email: subscriber.email,
      status: 'queued',
    }));

    const { error: queueError } = await client
      .from('texasdefined_newsletter_deliveries')
      .upsert(rows, { onConflict: 'issue_id,subscriber_id', ignoreDuplicates: true }) as { error: { message: string } | null };

    if (queueError) throw new Error(`Newsletter delivery queue failed: ${queueError.message}`);
    queued += rows.length;
    if (subscribers.length < pageSize) break;
    offset += pageSize;
  }

  return { ok: true, queued } as const;
}

export async function recordNewsletterDeliveryEvent(input: {
  providerMessageId: string;
  providerEventId?: string | null;
  eventType: NewsletterDeliveryEventType;
  eventAt?: string;
  url?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const { data: delivery, error: deliveryError } = await client
    .from('texasdefined_newsletter_deliveries')
    .select('id,subscriber_id')
    .eq('provider_message_id', input.providerMessageId)
    .maybeSingle() as { data: { id: string; subscriber_id: string } | null; error: { message: string } | null };

  if (deliveryError) throw new Error(`Newsletter delivery lookup failed: ${deliveryError.message}`);
  if (!delivery) return { ok: true, matched: false } as const;

  const eventAt = input.eventAt ?? nowIso();
  const { error: eventError } = await client.from('texasdefined_newsletter_events').upsert({
    delivery_id: delivery.id,
    event_type: input.eventType,
    event_at: eventAt,
    provider_event_id: input.providerEventId ?? null,
    url: input.url ?? null,
    metadata: input.metadata ?? {},
  }, input.providerEventId ? { onConflict: 'provider_event_id', ignoreDuplicates: true } : undefined) as { error: { message: string } | null };

  if (eventError) throw new Error(`Newsletter event could not be recorded: ${eventError.message}`);

  const deliveryUpdate: Record<string, unknown> = { updated_at: nowIso() };
  if (input.eventType === 'delivered') {
    deliveryUpdate.status = 'delivered';
    deliveryUpdate.delivered_at = eventAt;
  } else if (input.eventType === 'bounced') {
    deliveryUpdate.status = 'bounced';
  } else if (input.eventType === 'complained') {
    deliveryUpdate.status = 'complained';
  }

  if (Object.keys(deliveryUpdate).length > 1) {
    const { error } = await client.from('texasdefined_newsletter_deliveries').update(deliveryUpdate).eq('id', delivery.id) as { error: { message: string } | null };
    if (error) throw new Error(`Newsletter delivery state could not be updated: ${error.message}`);
  }

  if (input.eventType === 'bounced' || input.eventType === 'complained' || input.eventType === 'unsubscribed') {
    const subscriberUpdate = input.eventType === 'bounced'
      ? { status: 'bounced', bounced_at: eventAt, updated_at: nowIso() }
      : input.eventType === 'complained'
        ? { status: 'complained', complained_at: eventAt, updated_at: nowIso() }
        : { status: 'unsubscribed', unsubscribed_at: eventAt, updated_at: nowIso() };
    const { error } = await client.from('texasdefined_newsletter_subscribers').update(subscriberUpdate).eq('id', delivery.subscriber_id) as { error: { message: string } | null };
    if (error) throw new Error(`Newsletter subscriber suppression could not be updated: ${error.message}`);
  }

  return { ok: true, matched: true } as const;
}

export async function getNewsletterInfrastructureStats() {
  const subscriberStatuses: NewsletterSubscriberStatus[] = ['pending', 'active', 'unsubscribed', 'bounced', 'complained'];
  const subscribers: Record<NewsletterSubscriberStatus, number> = {
    pending: 0,
    active: 0,
    unsubscribed: 0,
    bounced: 0,
    complained: 0,
  };

  for (const status of subscriberStatuses) {
    const { count, error } = await client
      .from('texasdefined_newsletter_subscribers')
      .select('id', { count: 'exact', head: true })
      .eq('status', status) as { count: number | null; error: { message: string } | null };
    if (error) throw new Error(`Newsletter subscriber stats failed: ${error.message}`);
    subscribers[status] = count ?? 0;
  }

  const { count: queuedDeliveries, error: deliveryError } = await client
    .from('texasdefined_newsletter_deliveries')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'queued') as { count: number | null; error: { message: string } | null };
  if (deliveryError) throw new Error(`Newsletter delivery stats failed: ${deliveryError.message}`);

  const { count: draftIssues, error: issueError } = await client
    .from('texasdefined_newsletter_issues')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'draft') as { count: number | null; error: { message: string } | null };
  if (issueError) throw new Error(`Newsletter issue stats failed: ${issueError.message}`);

  return {
    subscribers,
    queuedDeliveries: queuedDeliveries ?? 0,
    draftIssues: draftIssues ?? 0,
    confirmationRequired: newsletterRequiresConfirmation(),
  };
}
