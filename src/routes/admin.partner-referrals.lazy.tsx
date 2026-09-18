import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { getPartnerReferralAnalyticsDashboard } from '@/data/partner-referral-analytics.functions';
import type { PartnerReferralAnalyticsDashboard } from '@/data/partner-referral-analytics.types';

const SESSION_KEY = 'texasdefined:sports-partner-admin-key';

export const Route = createLazyFileRoute('/admin/partner-referrals')({ component: PartnerReferralAnalyticsAdmin });

function PartnerReferralAnalyticsAdmin() {
  const [accessKey, setAccessKey] = useState('');
  const [dashboard, setDashboard] = useState<PartnerReferralAnalyticsDashboard | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function refresh(key = sessionStorage.getItem(SESSION_KEY) || accessKey.trim()) {
    const result = await getPartnerReferralAnalyticsDashboard({ data: { accessKey: key } });
    setDashboard(result);
    return result;
  }

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const key = accessKey.trim();
      await refresh(key);
      sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      setDashboard(null);
      setError(cause instanceof Error ? cause.message : 'Access denied.');
    } finally {
      setBusy(false);
    }
  }

  const maxDaily = useMemo(() => Math.max(1, ...(dashboard?.daily.map((row) => row.clicks) ?? [1])), [dashboard]);

  return <Container className="py-12 sm:py-16"><main className="mx-auto max-w-7xl">
    <header className="border-b border-border pb-8">
      <p className="eyebrow text-primary">TexasDefined Operations</p>
      <h1 className="mt-2 font-display text-5xl">Partner Referral Analytics</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Private first-party reporting for outbound commercial referrals. This dashboard uses daily aggregates synced from Cloudflare Analytics Engine; raw browser session IDs are not stored in the reporting table and CI probe clicks are excluded.</p>
    </header>

    {!dashboard ? <form onSubmit={unlock} className="mt-10 max-w-lg grid gap-4">
      <label className="grid gap-2 text-sm font-semibold">Commercial admin key<input type="password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} minLength={20} maxLength={200} required className="min-h-11 border border-border bg-background px-3" /></label>
      <button disabled={busy} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Unlock analytics</button>
      {error ? <p className="text-sm font-semibold text-destructive">{error}</p> : null}
    </form> : <>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <Metric label="30d referral clicks" value={dashboard.totalClicks30d} />
        <Metric label="Last 7 days" value={dashboard.totalClicks7d} />
        <Metric label="Prior 7 days" value={dashboard.prior7dClicks} />
        <Metric label="Week over week" value={dashboard.weekOverWeekPercent === null ? 'New' : `${dashboard.weekOverWeekPercent > 0 ? '+' : ''}${dashboard.weekOverWeekPercent}%`} />
        <Metric label="Last aggregate write" value={dashboard.lastSyncedAt ? new Date(dashboard.lastSyncedAt).toLocaleString() : 'No referral rows yet'} />
        <Metric label="Hourly sync" value={dashboard.lastPipelineSyncAt ? new Date(dashboard.lastPipelineSyncAt).toLocaleString() : 'No successful sync heartbeat'} />
        <Metric label="Dashboard refreshed" value={new Date(dashboard.generatedAt).toLocaleString()} />
      </section>
      {dashboard.totalClicks30d === 0 ? <p className="mt-5 max-w-3xl border-l-2 border-border pl-4 text-sm leading-6 text-muted-foreground">No qualifying non-CI affiliate referral clicks are currently present in the 30-day aggregate. “Hourly sync” shows the most recent successful Cloudflare-to-Supabase pipeline run even when there are no referral rows; “Last aggregate write” remains blank until a real referral row exists.</p> : null}

      <section className="mt-12 border-t border-border pt-6">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="eyebrow text-primary">30-day trend</p><h2 className="mt-2 font-display text-4xl">Daily referral clicks</h2></div><button disabled={busy} onClick={() => { setBusy(true); setError(''); void refresh().catch((cause) => setError(cause instanceof Error ? cause.message : 'Refresh failed.')).finally(() => setBusy(false)); }} className="min-h-10 border border-border px-4 text-sm font-semibold">Refresh</button></div>
        {error ? <p className="mt-4 text-sm font-semibold text-destructive">{error}</p> : null}
        <div className="mt-6 grid h-44 items-end gap-1" style={{ gridTemplateColumns: 'repeat(30,minmax(0,1fr))' }} aria-label="Daily partner referral clicks">
          {dashboard.daily.map((row) => <div key={row.date} className="relative flex h-full items-end" title={`${row.date}: ${row.clicks} clicks`}><div className="w-full bg-primary" style={{ height: `${Math.max(2, (row.clicks / maxDaily) * 100)}%`, opacity: 0.7 }} /><span className="sr-only">{row.date}: {row.clicks} clicks</span></div>)}
        </div>
      </section>

      <section className="mt-12 grid gap-10 xl:grid-cols-2">
        <BreakdownTable title="Partners" rows={dashboard.partners.map((row) => ({ label: row.label, clicks30d: row.clicks30d, clicks7d: row.clicks7d }))} />
        <BreakdownTable title="Placements" rows={dashboard.placements.map((row) => ({ label: row.label, clicks30d: row.clicks30d, clicks7d: row.clicks7d }))} />
      </section>

      <section className="mt-12 border-t border-border pt-6">
        <p className="eyebrow text-primary">Content performance</p><h2 className="mt-2 font-display text-4xl">Top referral pages</h2>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead><tr className="border-b border-border text-left"><th className="py-3 pr-4">Page</th><th className="py-3 pr-4 text-right">30d</th><th className="py-3 text-right">7d</th></tr></thead><tbody>{dashboard.pages.map((row) => <tr key={row.pagePath} className="border-b border-border/60"><td className="py-3 pr-4 font-mono text-xs"><a href={row.pagePath} className="hover:text-primary">{row.pagePath}</a></td><td className="py-3 pr-4 text-right font-semibold">{row.clicks30d}</td><td className="py-3 text-right">{row.clicks7d}</td></tr>)}</tbody></table></div>
      </section>

      <section className="mt-12 border-t border-border pt-6">
        <p className="eyebrow text-primary">Outbound performance</p><h2 className="mt-2 font-display text-4xl">Top destinations</h2>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead><tr className="border-b border-border text-left"><th className="py-3 pr-4">Partner</th><th className="py-3 pr-4">Destination</th><th className="py-3 pr-4 text-right">30d</th><th className="py-3 text-right">7d</th></tr></thead><tbody>{dashboard.destinations.map((row) => <tr key={`${row.partner}:${row.destinationUrl}`} className="border-b border-border/60"><td className="py-3 pr-4 font-semibold">{row.partner}</td><td className="max-w-2xl truncate py-3 pr-4 text-xs"><a href={row.destinationUrl} target="_blank" rel="noreferrer" className="hover:text-primary">{row.destinationUrl}</a></td><td className="py-3 pr-4 text-right font-semibold">{row.clicks30d}</td><td className="py-3 text-right">{row.clicks7d}</td></tr>)}</tbody></table></div>
      </section>
    </>}
  </main></Container>;
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div className="border-t border-border pt-3"><p className="eyebrow text-muted-foreground">{label}</p><p className="mt-1 font-display text-3xl">{value}</p></div>;
}

function BreakdownTable({ title, rows }: { title: string; rows: Array<{ label: string; clicks30d: number; clicks7d: number }> }) {
  return <section><h2 className="font-display text-4xl">{title}</h2><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[520px] text-sm"><thead><tr className="border-b border-border text-left"><th className="py-3 pr-4">Name</th><th className="py-3 pr-4 text-right">30d</th><th className="py-3 text-right">7d</th></tr></thead><tbody>{rows.map((row) => <tr key={row.label} className="border-b border-border/60"><td className="py-3 pr-4">{row.label}</td><td className="py-3 pr-4 text-right font-semibold">{row.clicks30d}</td><td className="py-3 text-right">{row.clicks7d}</td></tr>)}</tbody></table></div></section>;
}
