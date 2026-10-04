import { type FormEvent, useEffect, useState } from 'react';

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

export function NewsletterOperationsPanel() {
  const [accessKey, setAccessKey] = useState('');
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [detail, setDetail] = useState<IssueDetail | null>(null);
  const [scheduleValue, setScheduleValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function unlock(key: string) {
    setBusy(true);
    setError('');
    try {
      const result = await getNewsletterAdminDashboard({ data: { accessKey: key } });
      setDashboard(result);
      sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      console.error('Newsletter admin access failed', cause);
      sessionStorage.removeItem(SESSION_KEY);
      setDashboard(null);
      setDetail(null);
      setError('Access denied or newsletter operations are temporarily unavailable.');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    const key = sessionStorage.getItem(SESSION_KEY);
    if (!key) return;
    setAccessKey(key);
    void unlock(key);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const key = accessKey.trim();
    if (key) await unlock(key);
  }

  function key() {
    return sessionStorage.getItem(SESSION_KEY) || accessKey.trim();
  }

  async function refresh() {
    const result = await getNewsletterAdminDashboard({ data: { accessKey: key() } });
    setDashboard(result);
  }

  async function openIssue(issueId: string) {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const result = await getNewsletterAdminIssue({ data: { accessKey: key(), issueId } });
      setDetail(result);
      if (!result) setError('That newsletter issue no longer exists.');
    } catch (cause) {
      console.error('Newsletter issue load failed', cause);
      setError('The newsletter issue could not be loaded.');
    } finally {
      setBusy(false);
    }
  }

  async function runIssueAction(action: 'ready' | 'schedule' | 'cancel') {
    if (!detail) return;
    const issueId = String(detail.issue.id);
    setBusy(true);
    setError('');
    setMessage('');
    try {
      if (action === 'ready') {
        await markNewsletterAdminIssueReady({ data: { accessKey: key(), issueId } });
        setMessage('Issue marked ready. Nothing was sent.');
      } else if (action === 'schedule') {
        const when = new Date(scheduleValue);
        if (!scheduleValue || Number.isNaN(when.getTime())) throw new Error('Choose a valid future date and time.');
        const scheduled = await scheduleNewsletterAdminIssue({ data: { accessKey: key(), issueId, scheduledFor: when.toISOString() } });
        setMessage(`Issue scheduled for ${formatDateTime(scheduled.scheduledFor)}. The sending kill switch remains authoritative.`);
      } else {
        await cancelNewsletterAdminIssue({ data: { accessKey: key(), issueId } });
        setMessage('Issue cancelled; queued deliveries, if any, were skipped.');
      }
      await refresh();
      const updated = await getNewsletterAdminIssue({ data: { accessKey: key(), issueId } });
      setDetail(updated);
    } catch (cause) {
      console.error('Newsletter issue action failed', cause);
      setError(cause instanceof Error ? cause.message : 'The newsletter issue could not be updated.');
    } finally {
      setBusy(false);
    }
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setAccessKey('');
    setDashboard(null);
    setDetail(null);
    setScheduleValue('');
    setMessage('');
    setError('');
  }

  return <section id="newsletter" className="mt-12 border-t border-border pt-10" aria-labelledby="newsletter-operations-heading">
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="eyebrow text-primary">Newsletter infrastructure</p>
        <h2 id="newsletter-operations-heading" className="mt-2 font-display text-3xl sm:text-4xl">Newsletter Operations</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Protected operations for rollout readiness, issue review and lifecycle controls. This panel intentionally has no send-now control; public signup and bulk sending remain governed by server-side kill switches.</p>
      </div>
      {dashboard ? <button type="button" onClick={lock} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Lock</button> : null}
    </div>

    {!dashboard ? <div className="mt-6 max-w-xl border-y border-border py-6">
      <p className="text-sm leading-7 text-muted-foreground">Newsletter data is not loaded until the existing TexasDefined operations admin key is verified on the server. The key is retained only in this browser session.</p>
      <form onSubmit={submit} className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold" htmlFor="newsletterAdminAccessKey">Operations admin key
          <input id="newsletterAdminAccessKey" type="password" autoComplete="current-password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" required minLength={20} maxLength={200} />
        </label>
        <button type="submit" disabled={busy} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{busy ? 'Unlocking…' : 'Unlock newsletter operations'}</button>
      </form>
    </div> : <>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Active subscribers" value={dashboard.infrastructure.subscribers.active} />
        <Metric label="Pending confirmation" value={dashboard.infrastructure.subscribers.pending} />
        <Metric label="Draft issues" value={dashboard.infrastructure.draftIssues} />
        <Metric label="Queued deliveries" value={dashboard.infrastructure.queuedDeliveries} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <State label="Public signups" value={dashboard.rollout.signupsEnabled ? 'Enabled' : 'Off'} good={dashboard.rollout.signupsEnabled} />
        <State label="Bulk sending" value={dashboard.rollout.sendingEnabled ? 'Enabled' : 'Off'} good={dashboard.rollout.sendingEnabled} />
        <State label="Confirmation email" value={dashboard.rollout.confirmationConfigured ? 'Configured' : 'Not configured'} good={dashboard.rollout.confirmationConfigured} />
        <State label="Double opt-in" value={dashboard.rollout.doubleOptInReady ? 'Ready' : 'Blocked'} good={dashboard.rollout.doubleOptInReady} />
        <State label="Resend broadcast" value={dashboard.rollout.resendConfigured ? 'Configured' : 'Not configured'} good={dashboard.rollout.resendConfigured} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Suppressed: {dashboard.infrastructure.subscribers.unsubscribed} unsubscribed · {dashboard.infrastructure.subscribers.bounced} bounced · {dashboard.infrastructure.subscribers.complained} complained.</p>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
        <div>
          <h3 className="font-display text-2xl">Recent issues</h3>
          {dashboard.recentIssues.length ? dashboard.recentIssues.map((issue) => <article key={issue.id} className="border-b border-border py-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><strong className="font-display text-xl">{issue.subject}</strong><p className="mt-1 text-sm text-muted-foreground">{label(issue.status)} · Updated {formatDateTime(issue.updatedAt)}</p></div>
              <button type="button" disabled={busy} onClick={() => void openIssue(issue.id)} className="min-h-10 border border-border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary disabled:opacity-60">Review</button>
            </div>
          </article>) : <p className="py-5 text-sm text-muted-foreground">No newsletter issues have been created yet.</p>}
        </div>
        <div><h3 className="font-display text-2xl">Recent provider events</h3><div className="mt-3 border-t border-border">{Object.entries(dashboard.recentEventCounts).length ? Object.entries(dashboard.recentEventCounts).sort((a, b) => b[1] - a[1]).map(([event, count]) => <div key={event} className="flex justify-between gap-4 border-b border-border py-3 text-sm"><span>{label(event)}</span><strong>{count}</strong></div>) : <p className="py-5 text-sm text-muted-foreground">No provider events recorded yet.</p>}</div></div>
      </div>

      {detail ? <IssueReview detail={detail} busy={busy} scheduleValue={scheduleValue} setScheduleValue={setScheduleValue} runIssueAction={runIssueAction} close={() => setDetail(null)} /> : null}
    </>}
    {error ? <p className="mt-5 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
    {message ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm font-semibold" role="status">{message}</p> : null}
  </section>;
}

function IssueReview({ detail, busy, scheduleValue, setScheduleValue, runIssueAction, close }: {
  detail: IssueDetail;
  busy: boolean;
  scheduleValue: string;
  setScheduleValue: (value: string) => void;
  runIssueAction: (action: 'ready' | 'schedule' | 'cancel') => Promise<void>;
  close: () => void;
}) {
  const issue = detail.issue;
  const status = String(issue.status || 'draft');
  const eligible = ['draft', 'ready', 'scheduled'].includes(status);
  const html = typeof issue.html_body === 'string' ? issue.html_body : '';
  return <div className="mt-9 border-t border-border pt-7">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">Issue review</p><h3 className="mt-2 font-display text-3xl">{String(issue.subject || 'Untitled issue')}</h3><p className="mt-2 text-sm text-muted-foreground">{label(status)}</p></div><button type="button" onClick={close} className="min-h-10 border border-border px-3 py-2 text-sm font-semibold">Close</button></div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[18rem_1fr]">
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-[0.12em]">Delivery state</h4>
        <div className="mt-3 border-t border-border">{Object.entries(detail.deliveryCounts).length ? Object.entries(detail.deliveryCounts).map(([state, count]) => <div key={state} className="flex justify-between border-b border-border py-3 text-sm"><span>{label(state)}</span><strong>{count}</strong></div>) : <p className="py-4 text-sm text-muted-foreground">No deliveries queued.</p>}</div>
        {eligible ? <div className="mt-6 grid gap-3">
          <button type="button" disabled={busy} onClick={() => void runIssueAction('ready')} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold disabled:opacity-60">Mark ready</button>
          <label className="grid gap-2 text-sm font-semibold">Schedule date and time<input type="datetime-local" value={scheduleValue} onChange={(event) => setScheduleValue(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" /></label>
          <button type="button" disabled={busy || !scheduleValue} onClick={() => void runIssueAction('schedule')} className="min-h-11 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">Schedule issue</button>
          <button type="button" disabled={busy} onClick={() => void runIssueAction('cancel')} className="min-h-11 border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive disabled:opacity-60">Cancel issue</button>
        </div> : null}
        <p className="mt-4 text-xs leading-5 text-muted-foreground">No send-now action is exposed here. Scheduling does not bypass the server-side sending kill switch.</p>
      </div>
      <div><h4 className="text-sm font-semibold uppercase tracking-[0.12em]">Rendered preview</h4>{html ? <iframe title="Newsletter issue preview" sandbox="" srcDoc={html} className="mt-3 min-h-[720px] w-full border border-border bg-white" /> : <pre className="mt-3 max-h-[720px] overflow-auto whitespace-pre-wrap border border-border bg-muted/20 p-5 text-xs leading-6">{String(issue.text_body || 'No rendered body is available.')}</pre>}</div>
    </div>
  </div>;
}

function Metric({ label: metricLabel, value }: { label: string; value: number }) { return <article className="border border-border p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{metricLabel}</p><strong className="mt-2 block font-display text-4xl">{value}</strong></article>; }
function State({ label: stateLabel, value, good }: { label: string; value: string; good: boolean }) { return <div className="flex items-center justify-between gap-4 border border-border px-4 py-3 text-sm"><span>{stateLabel}</span><strong className={good ? 'text-primary' : 'text-muted-foreground'}>{value}</strong></div>; }
function label(value: string) { return value.replace(/[_-]+/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDateTime(value: string | null) { if (!value) return 'Not scheduled'; const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date); }
