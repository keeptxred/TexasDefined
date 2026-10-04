import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { getNewsletterInfrastructureStats } from './newsletter.server';

type NewsletterClient = {
  from: (table: string) => any;
};

const client = supabaseAdmin as unknown as NewsletterClient;

export type NewsletterIssueStatus = 'draft' | 'ready' | 'scheduled' | 'sending' | 'sent' | 'cancelled';

export type NewsletterIssueListItem = {
  id: string;
  slug: string;
  status: NewsletterIssueStatus;
  subject: string;
  preheader: string | null;
  scheduledFor: string | null;
  sentAt: string | null;
  provider: string | null;
  providerCampaignId: string | null;
  updatedAt: string;
};

export async function listNewsletterIssues(options: {
  status?: NewsletterIssueStatus;
  limit?: number;
} = {}) {
  const limit = Math.min(Math.max(Math.trunc(options.limit ?? 50), 1), 100);
  let query = client
    .from('texasdefined_newsletter_issues')
    .select('id,slug,status,subject,preheader,scheduled_for,sent_at,provider,provider_campaign_id,updated_at')
    .order('updated_at', { ascending: false })
    .limit(limit);

  if (options.status) query = query.eq('status', options.status);

  const { data, error } = await query as {
    data: Array<{
      id: string;
      slug: string;
      status: NewsletterIssueStatus;
      subject: string;
      preheader: string | null;
      scheduled_for: string | null;
      sent_at: string | null;
      provider: string | null;
      provider_campaign_id: string | null;
      updated_at: string;
    }> | null;
    error: { message: string } | null;
  };

  if (error) throw new Error(`Newsletter issues could not be listed: ${error.message}`);
  return (data ?? []).map((issue) => ({
    id: issue.id,
    slug: issue.slug,
    status: issue.status,
    subject: issue.subject,
    preheader: issue.preheader,
    scheduledFor: issue.scheduled_for,
    sentAt: issue.sent_at,
    provider: issue.provider,
    providerCampaignId: issue.provider_campaign_id,
    updatedAt: issue.updated_at,
  })) satisfies NewsletterIssueListItem[];
}

export async function getNewsletterIssueForOperator(issueId: string) {
  const { data: issue, error } = await client
    .from('texasdefined_newsletter_issues')
    .select('id,slug,status,subject,preheader,from_name,reply_to,content,html_body,text_body,audience,metadata,scheduled_for,sent_at,provider,provider_campaign_id,provider_synced_at,created_at,updated_at')
    .eq('id', issueId)
    .maybeSingle() as {
      data: Record<string, unknown> | null;
      error: { message: string } | null;
    };

  if (error) throw new Error(`Newsletter issue could not be loaded: ${error.message}`);
  if (!issue) return null;

  const { data: deliveries, error: deliveryError } = await client
    .from('texasdefined_newsletter_deliveries')
    .select('status')
    .eq('issue_id', issueId) as {
      data: Array<{ status: string }> | null;
      error: { message: string } | null;
    };
  if (deliveryError) throw new Error(`Newsletter delivery summary could not be loaded: ${deliveryError.message}`);

  const deliveryCounts: Record<string, number> = {};
  for (const delivery of deliveries ?? []) {
    deliveryCounts[delivery.status] = (deliveryCounts[delivery.status] ?? 0) + 1;
  }

  return { issue, deliveryCounts };
}

export async function getNewsletterOperatorDashboard() {
  const infrastructure = await getNewsletterInfrastructureStats();
  const recentIssues = await listNewsletterIssues({ limit: 12 });

  const { data: recentEvents, error: eventError } = await client
    .from('texasdefined_newsletter_events')
    .select('event_type,event_at')
    .order('event_at', { ascending: false })
    .limit(100) as {
      data: Array<{ event_type: string; event_at: string }> | null;
      error: { message: string } | null;
    };
  if (eventError) throw new Error(`Newsletter event summary could not be loaded: ${eventError.message}`);

  const recentEventCounts: Record<string, number> = {};
  for (const event of recentEvents ?? []) {
    recentEventCounts[event.event_type] = (recentEventCounts[event.event_type] ?? 0) + 1;
  }

  return {
    infrastructure,
    recentIssues,
    recentEventCounts,
    rollout: {
      signupsEnabled: process.env['NEWSLETTER_SIGNUPS_ENABLED'] === 'true',
      sendingEnabled: process.env['NEWSLETTER_SENDING_ENABLED'] === 'true',
      doubleOptIn: process.env['NEWSLETTER_DOUBLE_OPT_IN'] === 'true',
      resendConfigured: Boolean(
        process.env['RESEND_API_KEY']
        && process.env['RESEND_NEWSLETTER_SEGMENT_ID']
        && process.env['NEWSLETTER_FROM_EMAIL']
        && process.env['RESEND_WEBHOOK_SECRET'],
      ),
    },
  };
}
