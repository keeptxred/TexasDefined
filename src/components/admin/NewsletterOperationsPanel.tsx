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
  sendNewsletterAdminTestIssue,
  stageNewsletterAdminIssueInResend,
  syncNewsletterAdminAudience,
} from '@/data/newsletter/newsletter-admin.functions';

type Dashboard = Awaited<ReturnType<typeof getNewsletterAdminDashboard>>;
type IssueDetail = NonNullable<Awaited<ReturnType<typeof getNewsletterAdminIssue>>>;
type SessionState = { configured: boolean; authorized: boolean };

export function NewsletterOperationsPanel() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [accessKey, setAccessKey] = useState('');
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [detail, setDetail] = useState<IssueDetail | null>(null);
  const [scheduleValue, setScheduleValue] = useState('');
  const [testRecipient, setTestRecipient] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadDashboard() { const result = await getNewsletterAdminDashboard(); setDashboard(result); return result; }
  async function refreshSession() { const next = await getNewsletterAdminSession(); setSession(next); if (next.authorized) await loadDashboard(); else setDashboard(null); }
  useEffect(() => { void refreshSession().catch((cause) => { console.error('Newsletter admin session check failed', cause); setSession({ configured: false, authorized: false }); setError('Newsletter operator authentication could not be checked.'); }); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try { const result = await newsletterAdminLogin({ data: { accessKey: accessKey.trim() } }); if (!result.ok) { setError('Access denied.'); return; } setAccessKey(''); await refreshSession(); setMessage('Newsletter operations unlocked for this secure session.'); }
    catch (cause) { console.error('Newsletter admin login failed', cause); setError('Newsletter operator authentication failed.'); } finally { setBusy(false); }
  }
  async function lock() {
    setBusy(true); setError(''); setMessage('');
    try { await newsletterAdminLogout(); setSession({ configured: session?.configured ?? true, authorized: false }); setDashboard(null); setDetail(null); setScheduleValue(''); setTestRecipient(''); setMessage('Newsletter operations locked.'); }
    catch (cause) { console.error('Newsletter admin logout failed', cause); setError('Newsletter operator session could not be cleared.'); } finally { setBusy(false); }
  }
  async function refresh() { const result = await loadDashboard(); if (detail) setDetail(await getNewsletterAdminIssue({ data: { issueId: String(detail.issue.id) } })); return result; }
  async function openIssue(issueId: string) {
    setBusy(true); setError(''); setMessage('');
    try { const result = await getNewsletterAdminIssue({ data: { issueId } }); setDetail(result); setTestRecipient(''); if (!result) setError('That newsletter issue no longer exists.'); }
    catch (cause) { console.error('Newsletter issue load failed', cause); setError('The newsletter issue could not be loaded.'); } finally { setBusy(false); }
  }
  async function runIssueAction(action: 'ready' | 'schedule' | 'cancel' | 'stage') {
    if (!detail) return; const issueId = String(detail.issue.id); setBusy(true); setError(''); setMessage('');
    try {
      if (action === 'ready') { await markNewsletterAdminIssueReady({ data: { issueId } }); setMessage('Issue marked ready. Nothing was sent.'); }
      else if (action === 'schedule') { const when = new Date(scheduleValue); if (!scheduleValue || Number.isNaN(when.getTime()) || when.getTime() <= Date.now()) throw new Error('Choose a valid future date and time.'); const scheduled = await scheduleNewsletterAdminIssue({ data: { issueId, scheduledFor: when.toISOString() } }); setMessage(`Issue scheduled for ${formatDateTime(scheduled.scheduledFor)}. The sending kill switch remains authoritative.`); }
      else if (action === 'stage') { await stageNewsletterAdminIssueInResend({ data: { issueId } }); setMessage('Issue staged in Resend without sending.'); }
      else { await cancelNewsletterAdminIssue({ data: { issueId } }); setMessage('Issue cancelled.'); }
      await refresh();
    } catch (cause) { console.error('Newsletter issue action failed', cause); setError(cause instanceof Error ? cause.message : 'The newsletter issue could not be updated.'); } finally { setBusy(false); }
  }
  async function sendTestIssue() {
    if (!detail) return; const recipient = testRecipient.trim().toLowerCase(); if (!recipient) { setError('Enter an allowlisted test recipient.'); return; }
    setBusy(true); setError(''); setMessage('');
    try { const result = await sendNewsletterAdminTestIssue({ data: { issueId: String(detail.issue.id), recipient } }); setMessage(`Test delivery sent to ${result.recipient}${result.messageId ? ` (Resend ${result.messageId})` : ''}. No subscriber, issue, or delivery state was changed.`); }
    catch (cause) { console.error('Newsletter test delivery failed', cause); setError(cause instanceof Error ? cause.message : 'Newsletter test delivery failed.'); } finally { setBusy(false); }
  }
  async function syncAudience() {
    setBusy(true); setError(''); setMessage('');
    try { const result = await syncNewsletterAdminAudience(); setMessage(`Audience sync completed${typeof result === 'object' && result && 'synced' in result ? `: ${String(result.synced)} synced` : ''}. Nothing was sent.`); await refresh(); }
    catch (cause) { console.error('Newsletter audience sync failed', cause); setError(cause instanceof Error ? cause.message : 'Newsletter audience sync failed.'); } finally { setBusy(false); }
  }

  return <section id="newsletter" className="mt-12 border-t border-border pt-10" aria-labelledby="newsletter-operations-heading">
    <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow text-primary">Newsletter infrastructure</p><h2 id="newsletter-operations-heading" className="mt-2 font-display text-3xl sm:text-4xl">Newsletter Operations</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Protected controls for readiness, issue review, provider staging, safe test delivery and lifecycle operations. This panel intentionally has no send-now control for bulk delivery; public signup and bulk sending remain governed by server-side kill switches.</p></div>{session?.authorized ? <button type="button" onClick={() => void lock()} disabled={busy} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary disabled:opacity-60">Lock</button> : null}</div>
    {session === null ? <p className="mt-6 text-sm text-muted-foreground">Checking newsletter operator session…</p> : null}
    {session && !session.configured ? <div className="mt-6 border border-amber-500/40 p-5"><strong>Newsletter operator authentication is not configured.</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Set NEWSLETTER_ADMIN_ACCESS_KEY and NEWSLETTER_ADMIN_SESSION_SECRET before using the operator panel. Public signup and sending remain disabled independently.</p></div> : null}
    {session?.configured && !session.authorized ? <div className="mt-6 max-w-xl border-y border-border py-6"><p className="text-sm leading-7 text-muted-foreground">Newsletter data loads only after the dedicated newsletter operator key is verified on the server. The authenticated session is stored in an HTTP-only SameSite=Strict cookie.</p><form onSubmit={submit} className="mt-5 grid gap-4"><label className="grid gap-2 text-sm font-semibold" htmlFor="newsletterAdminAccessKey">Newsletter operator key<input id="newsletterAdminAccessKey" type="password" autoComplete="current-password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" required minLength={32} maxLength={512} /></label><button type="submit" disabled={busy} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{busy ? 'Unlocking…' : 'Unlock newsletter operations'}</button></form></div> : null}
    {dashboard ? <>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Metric label="Active subscribers" value={dashboard.infrastructure.subscribers.active} /><Metric label="Pending confirmation" value={dashboard.infrastructure.subscribers.pending} /><Metric label="Draft issues" value={dashboard.infrastructure.draftIssues} /><Metric label="Queued deliveries" value={dashboard.infrastructure.queuedDeliveries} /></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"><State label="Public signups" value={dashboard.rollout.signupsEnabled ? 'Enabled' : 'Off'} good={!dashboard.rollout.signupsEnabled} /><State label="Bulk sending" value={dashboard.rollout.sendingEnabled ? 'Enabled' : 'Off'} good={!dashboard.rollout.sendingEnabled} /><State label="Confirmation email" value={dashboard.rollout.confirmationConfigured ? 'Configured' : 'Not configured'} good={dashboard.rollout.confirmationConfigured} /><State label="Double opt-in" value={dashboard.rollout.doubleOptInReady ? 'Ready' : 'Blocked'} good={dashboard.rollout.doubleOptInReady} /><State label="Resend broadcast" value={dashboard.rollout.resendConfigured ? 'Configured' : 'Not configured'} good={dashboard.rollout.resendConfigured} /><State label="Safe test delivery" value={dashboard.rollout.testDelivery.ready ? 'Ready' : dashboard.rollout.testDelivery.enabled ? 'Blocked' : 'Off'} good={dashboard.rollout.testDelivery.ready} /></div>
      {dashboard.rollout.activationBlocked ? <p className="mt-4 border-l-2 border-destructive pl-4 text-sm font-semibold text-destructive">Activation is blocked until the missing runtime configuration is fixed.</p> : null}
      {dashboard.rollout.missingRuntimeBindings.length ? <p className="mt-3 text-xs text-muted-foreground">Missing runtime bindings: {dashboard.rollout.missingRuntimeBindings.join(', ')}</p> : null}
      <p className="mt-3 text-xs text-muted-foreground">Suppressed: {dashboard.infrastructure.subscribers.unsubscribed} unsubscribed · {dashboard.infrastructure.subscribers.bounced} bounced · {dashboard.infrastructure.subscribers.complained} complained. Safe-test allowlist: {dashboard.rollout.testDelivery.recipientCount} recipient{dashboard.rollout.testDelivery.recipientCount === 1 ? '' : 's'}.</p>
      <div className="mt-6 flex flex-wrap gap-3"><button type="button" disabled={busy || !dashboard.rollout.resendConfigured} onClick={() => void syncAudience()} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary disabled:opacity-50">Sync audience to Resend</button><button type="button" disabled={busy} onClick={() => void refresh()} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary disabled:opacity-50">Refresh</button></div>
      <div className="mt-8 grid gap-8 xl:grid-cols-2"><div><h3 className="font-display text-2xl">Recent issues</h3>{dashboard.recentIssues.length ? dashboard.recentIssues.map((issue) => <article key={issue.id} className="border-b border-border py-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><strong className="font-display text-xl">{issue.subject}</strong><p className="mt-1 text-sm text-muted-foreground">{label(issue.status)} · Updated {formatDateTime(issue.updatedAt)}</p></div><button type="button" disabled={busy} onClick={() => void openIssue(issue.id)} className="min-h-10 border border-border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary disabled:opacity-60">Review</button></div></article>) : <p className="py-5 text-sm text-muted-foreground">No newsletter issues have been created yet.</p>}</div><div><h3 className="font-display text-2xl">Recent provider events</h3><div className="mt-3 border-t border-border">{Object.entries(dashboard.recentEventCounts).length ? Object.entries(dashboard.recentEventCounts).sort((a, b) => b[1] - a[1]).map(([event, count]) => <div key={event} className="flex justify-between gap-4 border-b border-border py-3 text-sm"><span>{label(event)}</span><strong>{count}</strong></div>) : <p className="py-5 text-sm text-muted-foreground">No provider events recorded yet.</p>}</div></div></div>
      {detail ? <IssueReview detail={detail} busy={busy} canStage={dashboard.rollout.resendConfigured} testDeliveryReady={dashboard.rollout.testDelivery.ready} testRecipientCount={dashboard.rollout.testDelivery.recipientCount} testRecipient={testRecipient} setTestRecipient={setTestRecipient} sendTestIssue={sendTestIssue} scheduleValue={scheduleValue} setScheduleValue={setScheduleValue} runIssueAction={runIssueAction} close={() => setDetail(null)} /> : null}
    </> : null}
    {error ? <p className="mt-5 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}{message ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm font-semibold" role="status">{message}</p> : null}
  </section>;
}

function IssueReview({ detail, busy, canStage, testDeliveryReady, testRecipientCount, testRecipient, setTestRecipient, sendTestIssue, scheduleValue, setScheduleValue, runIssueAction, close }: { detail: IssueDetail; busy: boolean; canStage: boolean; testDeliveryReady: boolean; testRecipientCount: number; testRecipient: string; setTestRecipient: (value: string) => void; sendTestIssue: () => Promise<void>; scheduleValue: string; setScheduleValue: (value: string) => void; runIssueAction: (action: 'ready' | 'schedule' | 'cancel' | 'stage') => Promise<void>; close: () => void }) {
  const issue = detail.issue; const status = String(issue.status || 'draft'); const eligible = ['draft', 'ready', 'scheduled'].includes(status); const html = typeof issue.html_body === 'string' ? issue.html_body : '';
  return <div className="mt-9 border-t border-border pt-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">Issue review</p><h3 className="mt-2 font-display text-3xl">{String(issue.subject || 'Untitled issue')}</h3><p className="mt-2 text-sm text-muted-foreground">{label(status)}</p></div><button type="button" onClick={close} className="min-h-10 border border-border px-3 py-2 text-sm font-semibold">Close</button></div><div className="mt-6 grid gap-6 lg:grid-cols-2"><div><h4 className="text-sm font-semibold uppercase tracking-[0.12em]">Delivery state</h4><div className="mt-3 border-t border-border">{Object.entries(detail.deliveryCounts).length ? Object.entries(detail.deliveryCounts).map(([state, count]) => <div key={state} className="flex justify-between border-b border-border py-3 text-sm"><span>{label(state)}</span><strong>{count}</strong></div>) : <p className="py-4 text-sm text-muted-foreground">No deliveries queued.</p>}</div><div className="mt-6 border border-border p-4"><h4 className="text-sm font-semibold uppercase tracking-[0.12em]">Safe test delivery</h4><p className="mt-2 text-xs leading-5 text-muted-foreground">Sends the rendered issue only to an address already present in NEWSLETTER_TEST_RECIPIENTS. This does not create subscriber rows, delivery rows, or change issue status.</p><label className="mt-4 grid gap-2 text-sm font-semibold" htmlFor="newsletterTestRecipient">Allowlisted test recipient<input id="newsletterTestRecipient" type="email" autoComplete="email" value={testRecipient} onChange={(event) => setTestRecipient(event.target.value)} placeholder="you@example.com" className="min-h-11 border border-border bg-background px-3 py-2 font-normal" maxLength={320} /></label><button type="button" disabled={busy || !testDeliveryReady || !testRecipient.trim()} onClick={() => void sendTestIssue()} className="mt-3 min-h-11 border border-primary px-4 py-2 text-sm font-semibold text-primary disabled:opacity-50">Send safe test</button><p className="mt-2 text-xs text-muted-foreground">Test delivery is {testDeliveryReady ? 'ready' : 'off or not fully configured'} · {testRecipientCount} allowlisted recipient{testRecipientCount === 1 ? '' : 's'}.</p></div>{eligible ? <div className="mt-6 grid gap-3"><button type="button" disabled={busy} onClick={() => void runIssueAction('ready')} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold disabled:opacity-60">Mark ready</button><button type="button" disabled={busy || !canStage} onClick={() => void runIssueAction('stage')} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold disabled:opacity-60">Stage in Resend</button><label className="grid gap-2 text-sm font-semibold">Schedule date and time<input type="datetime-local" value={scheduleValue} onChange={(event) => setScheduleValue(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" /></label><button type="button" disabled={busy || !scheduleValue} onClick={() => void runIssueAction('schedule')} className="min-h-11 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">Schedule issue</button><button type="button" disabled={busy} onClick={() => void runIssueAction('cancel')} className="min-h-11 border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive disabled:opacity-60">Cancel issue</button></div> : null}<p className="mt-4 text-xs leading-5 text-muted-foreground">No send-now control is exposed here for bulk delivery. Test delivery has its own independent kill switch and allowlist. Provider staging and scheduling do not bypass NEWSLETTER_SENDING_ENABLED.</p></div><div><h4 className="text-sm font-semibold uppercase tracking-[0.12em]">Rendered preview</h4>{html ? <iframe title="Newsletter issue preview" sandbox="" srcDoc={html} style={{ minHeight: 720, backgroundColor: '#fff' }} className="mt-3 w-full border border-border" /> : <pre style={{ maxHeight: 720 }} className="mt-3 overflow-auto whitespace-pre-wrap border border-border bg-muted/20 p-5 text-xs leading-6">{String(issue.text_body || 'No rendered body is available.')}</pre>}</div></div></div>;
}
function Metric({ label: metricLabel, value }: { label: string; value: number }) { return <article className="border border-border p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{metricLabel}</p><strong className="mt-2 block font-display text-4xl">{value}</strong></article>; }
function State({ label: stateLabel, value, good }: { label: string; value: string; good: boolean }) { return <div className="flex items-center justify-between gap-4 border border-border px-4 py-3 text-sm"><span>{stateLabel}</span><strong className={good ? 'text-primary' : 'text-muted-foreground'}>{value}</strong></div>; }
function label(value: string) { return value.replace(/[_-]+/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDateTime(value: string | null) { if (!value) return 'Not scheduled'; const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date); }