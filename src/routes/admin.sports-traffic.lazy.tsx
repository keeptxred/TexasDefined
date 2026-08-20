import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useEffect, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { getSportsTrafficReadiness } from '@/data/sports-traffic.functions';
import type { SportsTrafficReadiness } from '@/data/sports-traffic.types';

const SESSION_KEY = 'texasdefined:sports-partner-admin-key';

export const Route = createLazyFileRoute('/admin/sports-traffic')({ component: SportsTrafficAdminPage });

function SportsTrafficAdminPage() {
  const [accessKey, setAccessKey] = useState('');
  const [data, setData] = useState<SportsTrafficReadiness | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load(key: string) {
    setLoading(true);
    setError('');
    try {
      const result = await getSportsTrafficReadiness({ data: { accessKey: key } });
      setData(result);
      sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      setData(null);
      setError(cause instanceof Error ? cause.message : 'Traffic readiness could not be loaded.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const key = sessionStorage.getItem(SESSION_KEY);
    if (!key) return;
    setAccessKey(key);
    void load(key);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (accessKey.trim()) await load(accessKey.trim());
  }

  return <Container className="py-12 sm:py-16">
    <main className="mx-auto max-w-6xl">
      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">TexasDefined Operations</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">Sports traffic readiness</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">A privacy-light 30-day view of actual sports venue-guide traffic. This dashboard is a launch signal only; reaching the threshold never sends outreach or removes the sponsorship hold automatically.</p>
      </header>

      {!data ? <section className="mt-10 max-w-xl border-y border-border py-8">
        <h2 className="font-display text-3xl">Unlock traffic metrics</h2>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">Admin access key
            <input type="password" autoComplete="current-password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" minLength={20} maxLength={200} required />
          </label>
          <button disabled={loading} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{loading ? 'Loading…' : 'Unlock traffic dashboard'}</button>
        </form>
        {error ? <p className="mt-4 text-sm font-semibold text-destructive">{error}</p> : null}
      </section> : <ReadinessDashboard data={data} onRefresh={() => void load(accessKey)} />}
    </main>
  </Container>;
}

function ReadinessDashboard({ data, onRefresh }: { data: SportsTrafficReadiness; onRefresh: () => void }) {
  const totalPct = Math.min(100, Math.round((data.totalVenuePageviews30d / data.monthlyPageviewTarget) * 100));
  const venuePct = Math.min(100, Math.round((data.venuesAtTarget / data.minimumVenuesAtTarget) * 100));
  return <>
    <section className="mt-8 border-y border-border py-7">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="eyebrow text-primary">Launch signal</p>
          <h2 className="mt-2 font-display text-4xl">{data.trafficReady ? 'Traffic threshold reached' : 'Keep growing traffic'}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Target: {data.monthlyPageviewTarget.toLocaleString()} venue-guide views in {data.windowDays} days and at least {data.minimumVenuesAtTarget} individual venue guides with {data.venuePageviewTarget.toLocaleString()}+ views each.</p>
          {data.outreachHoldActive ? <p className="mt-3 text-sm font-semibold">Sponsor outreach hold: ACTIVE. Traffic readiness does not remove it automatically.</p> : <p className="mt-3 text-sm font-semibold text-primary">Sponsor outreach hold: OFF.</p>}
        </div>
        <button type="button" onClick={onRefresh} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Refresh</button>
      </div>
    </section>

    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="30d venue views" value={data.totalVenuePageviews30d.toLocaleString()} detail={`${totalPct}% of ${data.monthlyPageviewTarget.toLocaleString()} target`} />
      <Metric label="Venues at 300+" value={data.venuesAtTarget.toLocaleString()} detail={`${venuePct}% of ${data.minimumVenuesAtTarget} venue target`} />
      <Metric label="Traffic ready" value={data.trafficReady ? 'YES' : 'NO'} detail="Signal only — manual launch decision" />
      <Metric label="Outreach hold" value={data.outreachHoldActive ? 'ACTIVE' : 'OFF'} detail="Never changed automatically" />
    </section>

    <section className="mt-12">
      <p className="eyebrow text-primary">Venue performance</p>
      <h2 className="mt-2 font-display text-4xl">Top venue guides · last 30 days</h2>
      <div className="mt-5 divide-y divide-border border-y border-border">
        {data.topVenues.length ? data.topVenues.map((row, index) => <div key={row.surfacePath} className="grid gap-2 py-4 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
          <span className="text-sm text-muted-foreground">#{index + 1}</span>
          <a href={row.surfacePath} className="font-semibold hover:text-primary">{row.surfacePath.replace('/sports-venue/', '').replaceAll('-', ' ')}</a>
          <span className="text-sm font-semibold">{row.pageviews30d.toLocaleString()} views</span>
        </div>) : <p className="py-6 text-sm text-muted-foreground">No venue-guide views have been recorded in the current 30-day window yet.</p>}
      </div>
    </section>

    <p className="mt-8 text-xs leading-6 text-muted-foreground">Privacy policy for this metric: the database stores only the UTC date, canonical venue-guide path and aggregate count. It does not store visitor IDs, cookies, email addresses, IP addresses or user-agent strings. A browser-session guard limits repeat counting of the same venue page during one session.</p>
  </>;
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="border-t border-border pt-4"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p><p className="mt-2 font-display text-3xl">{value}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p></div>;
}
