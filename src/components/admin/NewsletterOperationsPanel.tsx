import { type FormEvent, useEffect, useState } from 'react';

import {
  cancelNewsletterAdminIssue,
  getNewsletterAdminDashboard,
  getNewsletterAdminIssue,
  getNewsletterAdminSession,
  markNewsletterAdminIssueReady,
  newsletterAdminLogin,
  newsletterAdminLogout,
  scheduleNewsletterAdminIssue,
} from '@/data/newsletter/newsletter-admin.functions';

type Dashboard = Awaited<ReturnType<typeof getNewsletterAdminDashboard>>;
type IssueDetail = NonNullable<Awaited<ReturnType<typeof getNewsletterAdminIssue>>>;
type SessionStatus = Awaited<ReturnType<typeof getNewsletterAdminSession>>;

export function NewsletterOperationsPanel() {
  const [session, setSession] = useState<SessionStatus | null>(null);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [detail, setDetail] = useState<IssueDetail | null>(null);
  const [accessKey, setAccessKey] = useState('');
  const [scheduleValue, setScheduleValue] = useState('');
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadDashboard() {
    const result = await getNewsletterAdminDashboard();
    setDashboard(result);
    return result;
  }

  async function refreshSession() {
    const status = await getNewsletterAdminSession();
    setSession(status);
    if (status.authorized) await loadDashboard();
    else {
      setDashboard(null);
      setDetail(null);
    }
    return status;
  }

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const status = await getNewsletterAdminSession();
        if (!active) return;
        setSession(status);
        if (status.authorized) {
          const result = await getNewsletterAdminDashboard();
          if (active) setDashboard(result);
        }
      } catch (cause) {
        console.error('Newsletter operator session check failed', cause);
        if (active) setError('Newsletter operations are temporarily unavailable.');
      } finally {
        if (active) setBusy(false);
      }
    })();
    return () => { active = false; };
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const result = await newsletterAdminLogin({ data: { accessKey: accessKey.trim() } });
      setAccessKey('');
      if (!result.ok) {
        setError('Invalid newsletter operator credentials.');
        return;
      }
      await refreshSession();
      setMessage('Newsletter operator session unlocked.');
    } catch (cause) {
      console.error('Newsletter operator login failed', cause);
      setError('Newsletter operator login failed.');
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    setBusy(true);
    try {
      await newsletterAdminLogout();
      setMessage('Newsletter operator session locked.');
      setError('');
      await refreshSession();
    } catch (cause) {
      console.error('Newsletter operator logout failed', cause);
      setError('Newsletter operator logout failed.');
    } finally {
      setBusy(false);
    }
  }

  async function openIssue(issueId: string) {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const issue = await getNewsletterAdminIssue({ data: { issueId } });
      setDetail(issue);
      if (!issue) setError('That newsletter issue no longer exists.');
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
        await markNewsletterAdminIssueReady({ data: { issueId } });
        setMessage('Issue marked ready. Nothing was sent.');
      } else if (action === 'schedule') {
        const when = new Date(scheduleValue);
        if (!scheduleValue || Number.isNaN(when.getTime())) throw new Error('Choose a valid future date and time.');
        const result = await scheduleNewsletterAdminIssue({ data: { issueId, scheduledFor: when.toISOString() } });
        setMessage(`Issue scheduled for ${formatDateTime(result.scheduledFor)}. The sending kill switch remains authoritative.`);
      } else {
        await cancelNewsletterAdminIssue({ data: { issueId } });
        setMessage('Issue cancelled.');
      }
      await loadDashboard();
      setDetail(await getNewsletterAdminIssue({ data: { issueId } }));
    } catch (cause) {
      console.error('Newsletter issue action failed', cause);
      setError(cause instanceof Error ? cause.message : 'The newsletter issue could not be updated.');
    } finally {
      setBusy(false);
    }
  }

  return <section id="newsletter" className="mt-12 rounded-md border border-border p-5" aria-labelledby="newsletter-operations-heading">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="eyebrow text-primary">Newsletter infrastructure</p>
        <h2 id="newsletter-operations-heading" className="mt-2 font-display text-3xl">Newsletter Operations</h2>
        <p className="mt-2 text-sm text-muted-foreground">Authenticated review and lifecycle controls. This panel intentionally has no send-now control; public signup and bulk sending remain governed by server-side kill switches.</p>
      </div>
      {session?.authorized ? <button type="button" onClick={() => void logout()} disabled={busy} className="rounded-md border border-border px-4 py-2 text-sm font-medium">Lock</button> : null}
    </div>

    {busy && !session ? <p className="mt-4 text-sm text-muted-foreground">Checking newsletter operator session…</p> : null}

    {session && !session.configured ? <div className="mt-6 rounded-md bg-muted p-5">
      <strong>Newsletter operator authentication is not configured.</strong>
      <p className="mt-2 text-sm text-muted-foreground">Set both NEWSLETTER_ADMIN_ACCESS_KEY and NEWSLETTER_ADMIN_SESSION_SECRET before using this panel. Public signup and sending remain off.</p>
    </div> : null}

    {session?.configured && !session.authorized ? <form onSubmit={login} className="mt-6 grid gap-4">
      <label className="text-sm font-medium" htmlFor="newsletterAdminAccessKey">Newsletter operator access key</label>
      <input id="newsletterAdminAccessKey" type="password" autoComplete="current-password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} required minLength={32} maxLength={512} className="rounded-md border border-border px-4 py-2 text-sm" style={{ width: '100%' }} />
      <button type="submit" disabled={busy} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{busy ? 'Unlocking…' : 'Unlock newsletter operations'}</button>
    </form> : null}

    {dashboard && session?.authorized ? <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Active subscribers" value={dashboard.infrastructure.subscribers.active} />
        <Metric label="Pending confirmation" value={dashboard.infrastructure.subscribers.pending} />
        <Metric label="Draft issues" value={dashboard.infrastructure.draftIssues} />
        <Metric label="Queued deliveries" value={dashboard.infrastructure.queuedDeliveries} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <State label="Public signups" value={dashboard.rollout.signupsEnabled ? 'Enabled' : 'Off'} />
        <State label="Bulk sending" value={dashboard.rollout.sendingEnabled ? 'Enabled' : 'Off'} />
        <State label="Confirmation email" value={dashboard.rollout.confirmationConfigured ? 'Configured' : 'Not configured'} />
        <State label="Double opt-in" value={dashboard.rollout.doubleOptInReady ? 'Ready' : 'Blocked'} />
        <State label="Resend broadcast" value={dashboard.rollout.resendConfigured ? 'Configured' : 'Not configured'} />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Suppressed: {dashboard.infrastructure.subscribers.unsubscribed} unsubscribed · {dashboard.infrastructure.subscribers.bounced} bounced · {dashboard.infrastructure.subscribers.complained} complained.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl">Recent issues</h3>
          {dashboard.recentIssues.length ? dashboard.recentIssues.map((issue) => <article key={issue.id} className="mt-4 rounded-md border border-border p-5">
            <strong>{issue.subject}</strong>
            <p className="mt-2 text-sm text-muted-foreground">{label(issue.status)} · Updated {formatDateTime(issue.updatedAt)}</p>
            <button type="button" disabled={busy} onClick={() => void openIssue(issue.id)} className="mt-4 rounded-md border border-border px-4 py-2 text-sm font-medium">Review</button>
          </article>) : <p className="mt-4 text-sm text-muted-foreground">No newsletter issues have been created yet.</p>}
        </div>
        <div>
          <h3 className="font-display text-2xl">Recent provider events</h3>
          {Object.entries(dashboard.recentEventCounts).length ? Object.entries(dashboard.recentEventCounts).sort((a, b) => b[1] - a[1]).map(([event, count]) => <p key={event} className="mt-4 text-sm"><strong>{count}</strong> {label(event)}</p>) : <p className="mt-4 text-sm text-muted-foreground">No provider events recorded yet.</p>}
        </div>
      </div>

      {detail ? <IssueReview detail={detail} busy={busy} scheduleValue={scheduleValue} setScheduleValue={setScheduleValue} runIssueAction={runIssueAction} close={() => setDetail(null)} /> : null}
    </> : null}

    {error ? <p className="mt-4 text-sm" role="alert">{error}</p> : null}
    {message ? <p className="mt-4 text-sm font-medium" role="status">{message}</p> : null}
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
  return <div className="mt-8 rounded-md border border-border p-5">
    <div className="flex items-start justify-between gap-3">
      <div><p className="eyebrow text-primary">Issue review</p><h3 className="mt-2 font-display text-2xl">{String(issue.subject || 'Untitled issue')}</h3><p className="mt-2 text-sm text-muted-foreground">{label(status)}</p></div>
      <button type="button" onClick={close} className="rounded-md border border-border px-4 py-2 text-sm font-medium">Close</button>
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div>
        <strong>Delivery state</strong>
        {Object.entries(detail.deliveryCounts).length ? Object.entries(detail.deliveryCounts).map(([state, count]) => <p key={state} className="mt-2 text-sm"><strong>{count}</strong> {label(state)}</p>) : <p className="mt-2 text-sm text-muted-foreground">No deliveries queued.</p>}
        {eligible ? <div className="mt-6 grid gap-4">
          <button type="button" disabled={busy} onClick={() => void runIssueAction('ready')} className="rounded-md border border-border px-4 py-2 text-sm font-medium">Mark ready</button>
          <label className="text-sm font-medium" htmlFor="newsletterSchedule">Schedule date and time</label>
          <input id="newsletterSchedule" type="datetime-local" value={scheduleValue} onChange={(event) => setScheduleValue(event.target.value)} className="rounded-md border border-border px-4 py-2 text-sm" style={{ width: '100%' }} />
          <button type="button" disabled={busy || !scheduleValue} onClick={() => void runIssueAction('schedule')} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Schedule issue</button>
          <button type="button" disabled={busy} onClick={() => void runIssueAction('cancel')} className="rounded-md border border-border px-4 py-2 text-sm font-medium">Cancel issue</button>
        </div> : null}
        <p className="mt-4 text-xs text-muted-foreground">No send-now action is exposed here. Scheduling does not bypass NEWSLETTER_SENDING_ENABLED.</p>
      </div>
      <div>
        <strong>Rendered preview</strong>
        {html ? <iframe title="Newsletter issue preview" sandbox="" srcDoc={html} className="mt-4 border border-border" style={{ width: '100%', minHeight: 720, background: 'white' }} /> : <pre className="mt-4 rounded-md bg-muted p-5 text-xs" style={{ maxHeight: 720, overflow: 'auto', whiteSpace: 'pre-wrap' }}>{String(issue.text_body || 'No rendered body is available.')}</pre>}
      </div>
    </div>
  </div>;
}

function Metric({ label: metricLabel, value }: { label: string; value: number }) {
  return <article className="rounded-md bg-muted p-5"><strong className="font-display text-2xl">{value}</strong><span className="mt-2 block font-medium">{metricLabel}</span></article>;
}

function State({ label: stateLabel, value }: { label: string; value: string }) {
  return <article className="rounded-md border border-border p-5"><strong>{stateLabel}</strong><p className="mt-2 text-sm text-muted-foreground">{value}</p></article>;
}

function label(value: string) {
  return value.replace(/[_-]+/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDateTime(value: string | null) {
  if (!value) return 'Not scheduled';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}
