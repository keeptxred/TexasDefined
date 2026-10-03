import { supabaseAdmin } from '@/integrations/supabase/client.server';

type NewsletterClient = {
  from: (table: string) => any;
  rpc: (fn: string, args?: Record<string, unknown>) => any;
};

const client = supabaseAdmin as unknown as NewsletterClient;

export type NewsletterDeliveryClaim = {
  id: string;
  issue_id: string;
  subscriber_id: string;
  email: string;
};

export type NewsletterDeliveryMessage = {
  deliveryId: string;
  to: string;
  subject: string;
  preheader: string | null;
  fromName: string;
  replyTo: string | null;
  html: string | null;
  text: string | null;
  unsubscribeToken: string;
};

export interface NewsletterTransportResult {
  provider: string;
  messageId: string;
}

export interface NewsletterTransport {
  readonly provider: string;
  send(message: NewsletterDeliveryMessage): Promise<NewsletterTransportResult>;
}

export async function claimNewsletterDeliveries(provider: string, limit = 50) {
  const safeLimit = Math.max(1, Math.min(Math.trunc(limit), 500));
  const { data, error } = await client.rpc('claim_texasdefined_newsletter_deliveries', {
    p_limit: safeLimit,
    p_provider: provider,
  }) as { data: NewsletterDeliveryClaim[] | null; error: { message: string } | null };

  if (error) throw new Error(`Newsletter delivery claim failed: ${error.message}`);
  return data ?? [];
}

export async function getNewsletterDeliveryMessage(deliveryId: string): Promise<NewsletterDeliveryMessage | null> {
  const { data: delivery, error: deliveryError } = await client
    .from('texasdefined_newsletter_deliveries')
    .select('id,email,status,issue_id,subscriber_id')
    .eq('id', deliveryId)
    .maybeSingle() as {
      data: { id: string; email: string; status: string; issue_id: string; subscriber_id: string } | null;
      error: { message: string } | null;
    };

  if (deliveryError) throw new Error(`Newsletter delivery lookup failed: ${deliveryError.message}`);
  if (!delivery || delivery.status !== 'sending') return null;

  const [{ data: issue, error: issueError }, { data: subscriber, error: subscriberError }] = await Promise.all([
    client
      .from('texasdefined_newsletter_issues')
      .select('subject,preheader,from_name,reply_to,html_body,text_body,status')
      .eq('id', delivery.issue_id)
      .maybeSingle(),
    client
      .from('texasdefined_newsletter_subscribers')
      .select('status,unsubscribe_token')
      .eq('id', delivery.subscriber_id)
      .maybeSingle(),
  ]) as [
    { data: { subject: string; preheader: string | null; from_name: string; reply_to: string | null; html_body: string | null; text_body: string | null; status: string } | null; error: { message: string } | null },
    { data: { status: string; unsubscribe_token: string } | null; error: { message: string } | null },
  ];

  if (issueError) throw new Error(`Newsletter issue lookup failed: ${issueError.message}`);
  if (subscriberError) throw new Error(`Newsletter subscriber lookup failed: ${subscriberError.message}`);

  if (!issue || !subscriber || subscriber.status !== 'active' || !['ready', 'scheduled', 'sending'].includes(issue.status)) {
    await markNewsletterDeliverySkipped(delivery.id, 'recipient_or_issue_no_longer_eligible');
    return null;
  }

  if (!issue.html_body && !issue.text_body) {
    await markNewsletterDeliveryFailed(delivery.id, 'missing_content', 'Newsletter issue has neither an HTML nor text body.');
    return null;
  }

  return {
    deliveryId: delivery.id,
    to: delivery.email,
    subject: issue.subject,
    preheader: issue.preheader,
    fromName: issue.from_name,
    replyTo: issue.reply_to,
    html: issue.html_body,
    text: issue.text_body,
    unsubscribeToken: subscriber.unsubscribe_token,
  };
}

export async function markNewsletterDeliverySent(deliveryId: string, result: NewsletterTransportResult) {
  const now = new Date().toISOString();
  const { data: delivery, error } = await client
    .from('texasdefined_newsletter_deliveries')
    .update({
      status: 'sent',
      provider: result.provider,
      provider_message_id: result.messageId,
      sent_at: now,
      updated_at: now,
      error_code: null,
      error_message: null,
      failed_at: null,
    })
    .eq('id', deliveryId)
    .eq('status', 'sending')
    .select('subscriber_id')
    .maybeSingle() as { data: { subscriber_id: string } | null; error: { message: string } | null };

  if (error) throw new Error(`Newsletter sent state could not be recorded: ${error.message}`);
  if (!delivery) return { ok: false } as const;

  const { error: subscriberError } = await client
    .from('texasdefined_newsletter_subscribers')
    .update({ last_sent_at: now, updated_at: now })
    .eq('id', delivery.subscriber_id) as { error: { message: string } | null };

  if (subscriberError) throw new Error(`Newsletter subscriber sent timestamp failed: ${subscriberError.message}`);
  return { ok: true } as const;
}

export async function markNewsletterDeliveryFailed(deliveryId: string, code: string, message: string) {
  const now = new Date().toISOString();
  const { error } = await client
    .from('texasdefined_newsletter_deliveries')
    .update({
      status: 'failed',
      failed_at: now,
      updated_at: now,
      error_code: code.slice(0, 120),
      error_message: message.slice(0, 2000),
    })
    .eq('id', deliveryId) as { error: { message: string } | null };

  if (error) throw new Error(`Newsletter failed state could not be recorded: ${error.message}`);
  return { ok: true } as const;
}

export async function markNewsletterDeliverySkipped(deliveryId: string, reason: string) {
  const now = new Date().toISOString();
  const { error } = await client
    .from('texasdefined_newsletter_deliveries')
    .update({
      status: 'skipped',
      updated_at: now,
      error_code: reason.slice(0, 120),
    })
    .eq('id', deliveryId) as { error: { message: string } | null };

  if (error) throw new Error(`Newsletter skipped state could not be recorded: ${error.message}`);
  return { ok: true } as const;
}
