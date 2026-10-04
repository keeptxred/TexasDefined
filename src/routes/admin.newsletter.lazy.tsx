import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useEffect, useState } from 'react';

import { Container } from '@/components/layout/Container';
import {
  cancelNewsletterAdminIssue,
  getNewsletterAdminDashboard,
  getNewsletterAdminIssue,
  markNewsletterAdminIssueReady,
  scheduleNewsletterAdminIssue,
} from '@/data/newsletter/newsletter-admin.functions';

const SESSION_KEY = 'texasdefined:sports-partner-admin-key';

type Dashboard = Awaited<ReturnType<typeof getNewsletterAdminDashboard>>;
type IssueDetail = NonNullable<Awaited<ReturnType<typeof getNewsletterAdminIssue>>>;

export const Route = createLazyFileRoute('/admin/newsletter')({ component: NewsletterAdminPage });

function NewsletterAdminPage() {
  const [accessKey, setAccessKey] = useState('');
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [issueDetail, setIssueDetail] = useState<IssueDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [workingIssueId, setWorkingIssueId] = useState<string | null>(null);
  const [scheduleValue, setScheduleValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function unlock(key: string) {
    setLoading(true);
    setError('');
    try {
      const result = await getNewsletterAdminDashboard({ data: { accessKey: key } });
      setDashboard(result);
      sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      console.error('Newsletter admin access failed', cause);
      setDashboard(null);
      setIssueDetail(null);
      sessionStorage.removeItem(SESSION_KEY);
      setError('Access denied or newsletter operations are temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedKey = sessionStorage.getItem(SESSION_KEY);
    if (!storedKey) return;
    setAccessKey(storedKey);
    void unlock(storedKey);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const key = accessKey.trim();
    if (!key) return;
    await unlock(key);
  }

  function currentKey() {
    return sessionStorage.getItem(SESSION_KEY) || accessKey.trim();
  }

  async function refresh() {
    const key = currentKey();
    const result = await getNewsletterAdminDashboard({ data: { accessKey: key } });
    setDashboard(result);
    return result;
  }

  async function openIssue(issueId: string) {
    setWorkingIssueId(issueId);
    setError('');
    setSuccess('');
    try {
      const result = await getNewsletterAdminIssue({ data: { accessKey: currentKey(), issueId } });
      setIssueDetail(result);
      if (!result) setError('That newsletter issue no longer exists.');
    } catch (cause) {
      console.error('Newsletter issue load failed', cause);
      setError('The newsletter issue could not be loaded.');
    } finally {
      setWorkingIssueId(null);
    }
  }

  async function markReady(issueId: string) {
    setWorkingIssueId(issueId);
    setError('');
    setSuccess('');
    try {
      await markNewsletterAdminIssueReady({ data: { accessKey: currentKey(), issueId } });
      await refresh();
      await openIssue(issueId);
      setSuccess('Issue marked ready. Nothing was sent.');
    } catch (cause) {
      console.error('Newsletter ready transition failed', cause);
      setError(cause instanceof Error ? cause.message : 'The issue could not be marked ready.');
    } finally {
      setWorkingIssueId(null);
    }
  }

  async function scheduleIssue(issueId: string) {
    if (!scheduleValue) {
      setError('Choose a future date and time before scheduling.');
      return;
    }
    const when = new Date(scheduleValue);
    if (Number.isNaN(when.getTime())) {
      setError('The scheduled date and time is invalid.');
      return;
    }
    setWorkingIssueId(issueId);
    setError('');
    setSuccess('');
    try {
      const result = await scheduleNewsletterAdminIssue({
        data: { accessKey: currentKey(), issueId, scheduledFor: when.toISOString() },
      });
      await refresh();
      await openIssue(issueId);
      setSuccess(`Issue scheduled for ${formatDateTime(result.scheduledFor)}. Sending remains controlled by the newsletter kill switch.`);
    } catch (cause) {
      console.error('Newsletter scheduling failed', cause);
      setError(cause instanceof Error ? cause.message : 'The issue could not be scheduled.');
    } finally {
      setWorkingIssueId(null);
    }
  }

  async function cancelIssue(issueId: string) {
    setWorkingIssueId(issueId);
    setError('');
    setSuccess('');
    try {
      await cancelNewsletterAdminIssue({ data: { accessKey: currentKey(), issueId } });
      await refresh();
      await openIssue(issueId);
      setSuccess('Issue cancelled and queued deliveries, if any, were skipped.');
    } catch (cause) {
      console.error('Newsletter cancellation failed', cause);
      setError(cause instanceof Error ? cause.message : 'The issue could not be cancelled.');
    } finally {
      setWorkingIssueId(null);
    }
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setAccessKey('');
    setDashboard(null);
    setIssueDetail(null);
    setScheduleValue('');
    setError('');
    setSuccess('');
  }

  return <Container className="py-12 sm:py-16">
    <main className="mx-auto max-w-7xl">
      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">TexasDefined Operations</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="font-display text-4xl sm:text-6xl">Newsletter Operations</h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Review newsletter readiness, subscriber counts, issue lifecycle, delivery state and provider events. This console intentionally has no send-now control; public signup and bulk sending remain controlled by their server-side kill switches.</p>
          </div>
          {dashboard ? <button type="button" onClick={lock} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Lock console</button> : null}
        </div>
      </header>

      {!dashboard ? <section className="mt-10 max-w-xl border-y border-border py-8" aria-labelledby="newsletter-unlock-heading">
        <p className="eyebrow text-primary">Protected newsletter data</p>
        <h2 id="newsletter-unlock-heading" className="mt-2 font-display text-3xl">Unlock newsletter operations</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">Newsletter data is not loaded with this page. Enter the existing TexasDefined operations admin key. Verification happens on the server and the key is retained only for this browser session.</p>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold" htmlFor="newsletterAdminAccessKey">Operations admin key
            <input id="newsletterAdminAccessKey" type="password" autoComplete="current-password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" required minLength={20} maxLength={200} />
          </label>
          <button type="submit" disabled={loading} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{loading ? 'Unlocking…' : 'Unlock newsletter console'}</button>
        </form>
        {error ? <p className="mt-4 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
      </section> : <>
        <Rollout dashboard={dashboard} />
        {error ? <p className="mt-6 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
        {success ? <p className="mt-6 border-l-2 border-primary pl-4 text-sm font-semibold" role="status">{success}</p> : null}

        <section className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="border-b border-border pb-4">
              <p className="eyebrow text-primary">Issue queue</p>
              <h2 className="mt-2 font-display text-3xl">Recent newsletter issues</h2>
            </div>
            {dashboard.recentIssues.length ? <div>
              {dashboard.recentIssues.map((issue) => <article key={issue.id} className="border-b border-border py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-2xl">{issue.subject}</h3>
                      <StatusBadge value={issue.status} />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{issue.slug} · Updated {formatDateTime(issue.updatedAt)}</p>
                    {issue.scheduledFor ? <p className="mt-1 text-sm text-muted-foreground">Scheduled {formatDateTime(issue.scheduledFor)}</p> : null}
                    {issue.sentAt ? <p className="mt-1 text-sm text-muted-foreground">Sent {formatDateTime(issue.sentAt)}</p> : null}
                  </div>
                  <button type="button" disabled={workingIssueId === issue.id} onClick={() => void openIssue(issue.id)} className="min-h-10 border border-border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary disabled:opacity-60">Review</button>
                </div>
              </article>)}
            </div> : <p className="py-8 text-sm text-muted-foreground">No newsletter issues have been created yet.</p>}
          </div>

          <aside>
            <div className="border-b border-border pb-4">
              <p className="eyebrow text-primary">Provider activity</p>
              <h2 className="mt-2 font-display text-3xl">Recent events</h2>
            </div>
            <div className="border-t border-border">
              {Object.entries(dashboard.recentEventCounts).length ? Object.entries(dashboard.recentEventCounts).sort((a, b) => b[1] - a[1]).map(([event, count]) => <div key={event} className="flex items-center justify-between gap-4 border-b border-border py-3 text-sm"><span>{label(event)}</span><strong>{count}</strong></div>) : <p className="py-6 text-sm text-muted-foreground">No provider events recorded yet.</p>}
            </div>
          </aside>
        </section>

        {issueDetail ? <IssuePanel
          detail={issueDetail}
          working={workingIssueId === String(issueDetail.issue.id)}
          scheduleValue={scheduleValue}
          onScheduleValue={setScheduleValue}
          onReady={() => void markReady(String(issueDetail.issue.id))}
          onSchedule={() => void scheduleIssue(String(issueDetail.issue.id))}
          onCancel={() => void cancelIssue(String(issueDetail.issue.id))}
          onClose={() => setIssueDetail(null)}
        /> : null}
      </>}
    </main>
  </Container>;
}

function Rollout({ dashboard }: { dashboard: Dashboard }) {
  const subscribers = dashboard.infrastructure.subscribers;
  return <>
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="Active subscribers" value={subscribers.active} />
      <Metric label="Pending confirmation" value={subscribers.pending} />
      <Metric label="Draft issues" value={dashboard.infrastructure.draftIssues} />
      <Metric label="Queued deliveries" value={dashboard.infrastructure.queuedDeliveries} />
    </section>
    <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Newsletter rollout status">
      <SwitchState label="Public signups" enabled={dashboard.rollout.signupsEnabled} />
      <SwitchState label="Bulk sending" enabled={dashboard.rollout.sendingEnabled} />
      <SwitchState label="Double opt-in" enabled={dashboard.rollout.doubleOptIn} neutral />
      <SwitchState label="Resend credentials" enabled={dashboard.rollout.resendConfigured} configured />
    </section>
    <p className="mt-4 text-xs leading-5 text-muted-foreground">Suppressed: {subscribers.unsubscribed} unsubscribed · {subscribers.bounced} bounced · {subscribers.complained} complained. Confirmation mode: {dashboard.infrastructure.confirmationRequired ? 'required' : 'not required'}.</p>
  </>;
}

function IssuePanel({ detail, working, scheduleValue, onScheduleValue, onReady, onSchedule, onCancel, onClose }: {
  detail: IssueDetail;
  working: boolean;
  scheduleValue: string;
  onScheduleValue: (value: string) => void;
  onReady: () => void;
  onSchedule: () => void;
  onCancel: () => void;
  onClose: () => void;
}) {
  const issue = detail.issue;
  const status = String(issue.status || 'draft');
  const html = typeof issue.html_body === 'string' ? issue.html_body : '';
  const canReady = ['draft', 'ready', 'scheduled'].includes(status);
  const canSchedule = ['draft', 'ready', 'scheduled'].includes(status);
  const canCancel = ['draft', 'ready', 'scheduled'].includes(status);

  return <section className="mt-12 border-t border-border pt-8" aria-labelledby="issue-review-heading">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="eyebrow text-primary">Issue review</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 id="issue-review-heading" className="font-display text-3xl">{String(issue.subject || 'Untitled issue')}</h2>
          <StatusBadge value={status} />
        </div>
        {issue.preheader ? <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{String(issue.preheader)}</p> : null}
      </div>
      <button type="button" onClick={onClose} className="min-h-10 border border-border px-3 py-2 text-sm font-semibold">Close review</button>
    </div>

    <div className="mt-6 grid gap-6 lg:grid-cols-[18rem_1fr]">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">Delivery state</h3>
        <div className="mt-3 border-t border-border">
          {Object.entries(detail.deliveryCounts).length ? Object.entries(detail.deliveryCounts).sort((a, b) => b[1] - a[1]).map(([state, count]) => <div key={state} className="flex justify-between gap-4 border-b border-border py-3 text-sm"><span>{label(state)}</span><strong>{count}</strong></div>) : <p className="py-4 text-sm text-muted-foreground">No deliveries queued for this issue.</p>}
        </div>

        <div className="mt-7 grid gap-3">
          {canReady ? <button type="button" disabled={working} onClick={onReady} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary disabled:opacity-60">Mark ready</button> : null}
          {canSchedule ? <>
            <label className="grid gap-2 text-sm font-semibold">Schedule date and time
              <input type="datetime-local" value={scheduleValue} onChange={(event) => onScheduleValue(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" />
            </label>
            <button type="button" disabled={working || !scheduleValue} onClick={onSchedule} className="min-h-11 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">Schedule issue</button>
          </> : null}
          {canCancel ? <button type="button" disabled={working} onClick={onCancel} className="min-h-11 border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive hover:border-destructive disabled:opacity-60">Cancel issue</button> : null}
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">Scheduling changes the issue lifecycle only. This console does not expose a send-now action, and the server-side sending kill switch remains authoritative.</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">Rendered preview</h3>
        {html ? <iframe title="Newsletter issue preview" sandbox="" srcDoc={html} className="mt-3 min-h-[720px] w-full border border-border bg-white" /> : <pre className="mt-3 max-h-[720px] overflow-auto whitespace-pre-wrap border border-border bg-muted/20 p-5 text-xs leading-6">{String(issue.text_body || 'No rendered body is available.')}</pre>}
      </div>
    </div>
  </section>;
}

function Metric({ label: metricLabel, value }: { label: string; value: number }) {
  return <div className="border border-border p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{metricLabel}</p><strong className="mt-2 block font-display text-4xl">{value}</strong></div>;
}

function SwitchState({ label: stateLabel, enabled, neutral = false, configured = false }: { label: string; enabled: boolean; neutral?: boolean; configured?: boolean }) {
  const state = configured ? (enabled ? 'Configured' : 'Not configured') : neutral ? (enabled ? 'Required' : 'Optional') : (enabled ? 'Enabled' : 'Off');
  return <div className="flex items-center justify-between gap-4 border border-border px-4 py-3 text-sm"><span>{stateLabel}</span><strong className={enabled ? 'text-primary' : 'text-muted-foreground'}>{state}</strong></div>;
}

function StatusBadge({ value }: { value: string }) {
  return <span className="border border-border px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em]">{label(value)}</span>;
}

function label(value: string) {
  return value.replace(/[_-]+/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}
