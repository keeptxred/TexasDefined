import { supabaseAdmin } from '@/integrations/supabase/client.server';

type NewsletterClient = {
  from: (table: string) => any;
};

const client = supabaseAdmin as unknown as NewsletterClient;

export async function markNewsletterIssueReady(issueId: string) {
  const { data: issue, error: lookupError } = await client
    .from('texasdefined_newsletter_issues')
    .select('id,status,subject,html_body,text_body')
    .eq('id', issueId)
    .maybeSingle() as {
      data: { id: string; status: string; subject: string; html_body: string | null; text_body: string | null } | null;
      error: { message: string } | null;
    };

  if (lookupError) throw new Error(`Newsletter issue lookup failed: ${lookupError.message}`);
  if (!issue) throw new Error('Newsletter issue does not exist.');
  if (!issue.subject.trim()) throw new Error('Newsletter issue needs a subject before it can be marked ready.');
  if (!issue.html_body && !issue.text_body) throw new Error('Newsletter issue needs an HTML or text body before it can be marked ready.');
  if (['sending', 'sent', 'cancelled'].includes(issue.status)) throw new Error(`Newsletter issue cannot be marked ready from status ${issue.status}.`);

  const { error } = await client
    .from('texasdefined_newsletter_issues')
    .update({ status: 'ready', scheduled_for: null, updated_at: new Date().toISOString() })
    .eq('id', issueId) as { error: { message: string } | null };

  if (error) throw new Error(`Newsletter issue could not be marked ready: ${error.message}`);
  return { ok: true } as const;
}

export async function scheduleNewsletterIssue(issueId: string, scheduledFor: string) {
  const when = new Date(scheduledFor);
  if (Number.isNaN(when.getTime())) throw new Error('Newsletter scheduled time is invalid.');
  if (when.getTime() <= Date.now()) throw new Error('Newsletter scheduled time must be in the future.');

  const { data: issue, error: lookupError } = await client
    .from('texasdefined_newsletter_issues')
    .select('id,status,subject,html_body,text_body')
    .eq('id', issueId)
    .maybeSingle() as {
      data: { id: string; status: string; subject: string; html_body: string | null; text_body: string | null } | null;
      error: { message: string } | null;
    };

  if (lookupError) throw new Error(`Newsletter issue lookup failed: ${lookupError.message}`);
  if (!issue) throw new Error('Newsletter issue does not exist.');
  if (!issue.subject.trim() || (!issue.html_body && !issue.text_body)) throw new Error('Newsletter issue must be complete before it can be scheduled.');
  if (['sending', 'sent', 'cancelled'].includes(issue.status)) throw new Error(`Newsletter issue cannot be scheduled from status ${issue.status}.`);

  const { error } = await client
    .from('texasdefined_newsletter_issues')
    .update({ status: 'scheduled', scheduled_for: when.toISOString(), updated_at: new Date().toISOString() })
    .eq('id', issueId) as { error: { message: string } | null };

  if (error) throw new Error(`Newsletter issue could not be scheduled: ${error.message}`);
  return { ok: true, scheduledFor: when.toISOString() } as const;
}

export async function cancelNewsletterIssue(issueId: string) {
  const now = new Date().toISOString();
  const { error: issueError } = await client
    .from('texasdefined_newsletter_issues')
    .update({ status: 'cancelled', updated_at: now })
    .eq('id', issueId)
    .in('status', ['draft', 'ready', 'scheduled']) as { error: { message: string } | null };
  if (issueError) throw new Error(`Newsletter issue could not be cancelled: ${issueError.message}`);

  const { error: deliveryError } = await client
    .from('texasdefined_newsletter_deliveries')
    .update({ status: 'skipped', error_code: 'issue_cancelled', updated_at: now })
    .eq('issue_id', issueId)
    .eq('status', 'queued') as { error: { message: string } | null };
  if (deliveryError) throw new Error(`Newsletter queued deliveries could not be cancelled: ${deliveryError.message}`);

  return { ok: true } as const;
}

export async function finalizeNewsletterIssueIfComplete(issueId: string) {
  const { count: outstanding, error: outstandingError } = await client
    .from('texasdefined_newsletter_deliveries')
    .select('id', { count: 'exact', head: true })
    .eq('issue_id', issueId)
    .in('status', ['queued', 'sending']) as { count: number | null; error: { message: string } | null };
  if (outstandingError) throw new Error(`Newsletter issue completion check failed: ${outstandingError.message}`);

  const { count: total, error: totalError } = await client
    .from('texasdefined_newsletter_deliveries')
    .select('id', { count: 'exact', head: true })
    .eq('issue_id', issueId) as { count: number | null; error: { message: string } | null };
  if (totalError) throw new Error(`Newsletter issue delivery count failed: ${totalError.message}`);

  if ((total ?? 0) === 0 || (outstanding ?? 0) > 0) return { ok: true, finalized: false } as const;

  const now = new Date().toISOString();
  const { error } = await client
    .from('texasdefined_newsletter_issues')
    .update({ status: 'sent', sent_at: now, updated_at: now })
    .eq('id', issueId)
    .in('status', ['ready', 'scheduled', 'sending']) as { error: { message: string } | null };
  if (error) throw new Error(`Newsletter issue could not be finalized: ${error.message}`);

  return { ok: true, finalized: true } as const;
}
