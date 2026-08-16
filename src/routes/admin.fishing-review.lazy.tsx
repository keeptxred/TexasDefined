import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import {
  getFishingEditorialReviewDashboard,
  setFishingEditorialSubmissionStatus,
} from '@/data/fishing/editorial-review.functions';
import type {
  FishingEditorialReviewDashboard,
  FishingEditorialSubmissionKind,
  FishingEditorialSubmissionStatus,
} from '@/data/fishing/editorial-review.types';

const SESSION_KEY = 'texasdefined:fishing-editorial-review-key';

export const Route = createLazyFileRoute('/admin/fishing-review')({ component: FishingEditorialReviewAdmin });

function FishingEditorialReviewAdmin() {
  const [accessKey, setAccessKey] = useState('');
  const [dashboard, setDashboard] = useState<FishingEditorialReviewDashboard | null>(null);
  const [kind, setKind] = useState<'all' | FishingEditorialSubmissionKind>('all');
  const [status, setStatus] = useState<'all' | FishingEditorialSubmissionStatus>('all');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  async function refresh(key = sessionStorage.getItem(SESSION_KEY) || accessKey.trim()) {
    const result = await getFishingEditorialReviewDashboard({ data: { accessKey: key } });
    setDashboard(result);
    return result;
  }

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      const key = accessKey.trim();
      await refresh(key);
      sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      setDashboard(null);
      setError(cause instanceof Error ? cause.message : 'Access denied.');
    } finally { setBusy(false); }
  }

  async function updateStatus(submissionId: string, nextStatus: FishingEditorialSubmissionStatus) {
    const key = sessionStorage.getItem(SESSION_KEY) || accessKey.trim();
    setBusy(true); setError(''); setNotice('');
    try {
      await setFishingEditorialSubmissionStatus({ data: { accessKey: key, submissionId, status: nextStatus } });
      await refresh(key);
      setNotice(`Submission moved to ${nextStatus}.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Status update failed.');
    } finally { setBusy(false); }
  }

  const rows = useMemo(() => (dashboard?.submissions ?? []).filter((row) => (kind === 'all' || row.kind === kind) && (status === 'all' || row.status === status)), [dashboard, kind, status]);

  return <Container className="py-12 sm:py-16"><main className="mx-auto max-w-7xl">
    <header className="border-b border-border pb-8"><p className="eyebrow text-primary">TexasDefined Operations</p><h1 className="mt-2 font-display text-5xl">Fishing Editorial Review</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Review fishing-guide listing requests and submitted fishing reports before anything becomes public. This queue changes workflow status only; it cannot publish a guide or report, and sponsorship never changes editorial approval.</p></header>

    {!dashboard ? <form onSubmit={unlock} className="mt-10 grid max-w-lg gap-4"><label className="grid gap-2 text-sm font-semibold">Admin access key<input type="password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} minLength={20} maxLength={200} required className="min-h-11 border border-border bg-background px-3" /></label><button disabled={busy} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Unlock review queue</button>{error ? <p className="text-sm font-semibold text-destructive">{error}</p> : null}</form> : <>
      <section className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6"><Metric label="New" value={dashboard.statusCounts.new} /><Metric label="Reviewing" value={dashboard.statusCounts.reviewing} /><Metric label="Contacted" value={dashboard.statusCounts.contacted} /><Metric label="Closed" value={dashboard.statusCounts.closed} /><Metric label="Guide requests" value={dashboard.kindCounts['guide-listing']} /><Metric label="Report submissions" value={dashboard.kindCounts['fishing-report']} /></section>
      {dashboard.truncated ? <p className="mt-5 text-sm font-semibold text-primary">Showing the newest {dashboard.limit} submissions.</p> : null}
      {error ? <p className="mt-5 text-sm font-semibold text-destructive">{error}</p> : null}{notice ? <p className="mt-5 text-sm font-semibold text-primary">{notice}</p> : null}

      <section className="mt-10 flex flex-wrap gap-4 border-y border-border py-5"><label className="text-sm font-semibold">Type<select value={kind} onChange={(event) => setKind(event.target.value as typeof kind)} className="ml-3 min-h-10 border border-border bg-background px-3 font-normal"><option value="all">All</option><option value="guide-listing">Guide listings</option><option value="fishing-report">Fishing reports</option></select></label><label className="text-sm font-semibold">Status<select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} className="ml-3 min-h-10 border border-border bg-background px-3 font-normal"><option value="all">All</option><option value="new">New</option><option value="reviewing">Reviewing</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></label><button disabled={busy} onClick={() => refresh().catch((cause) => setError(cause instanceof Error ? cause.message : 'Refresh failed.'))} className="min-h-10 border border-border px-4 text-sm font-semibold">Refresh</button></section>

      <section className="mt-8 grid gap-5">{rows.length ? rows.map((row) => <article key={row.id} className="border border-border p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">{row.kind === 'guide-listing' ? 'Guide listing' : 'Fishing report'} · {new Date(row.createdAt).toLocaleString()}</p><h2 className="mt-2 font-display text-3xl">{row.company}</h2><p className="mt-1 text-sm text-muted-foreground">Submitted by {row.contactName} · <a className="underline" href={`mailto:${row.email}`}>{row.email}</a></p>{row.website ? <a href={row.website} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-primary underline">Open submitted website/source →</a> : null}</div><select value={row.status} disabled={busy} onChange={(event) => updateStatus(row.id, event.target.value as FishingEditorialSubmissionStatus)} className="min-h-10 border border-border bg-background px-3 text-sm"><option value="new">new</option><option value="reviewing">reviewing</option><option value="contacted">contacted</option><option value="closed">closed</option></select></div><div className="mt-5 border-t border-border pt-5"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Submitted details</p><pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm leading-7 text-foreground">{row.message}</pre></div><p className="mt-5 text-xs text-muted-foreground">Source: {row.sourcePath}. Changing status here never creates or edits a public fishing guide/report record.</p></article>) : <p className="border-t border-border pt-8 text-sm text-muted-foreground">No submissions match these filters.</p>}</section>
    </>}
  </main></Container>;
}

function Metric({ label, value }: { label: string; value: number }) { return <div className="border-t border-border pt-3"><p className="eyebrow text-muted-foreground">{label}</p><p className="mt-1 font-display text-3xl">{value}</p></div>; }
