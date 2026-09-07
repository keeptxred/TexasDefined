import type { ReactNode } from 'react';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';

export const Route = createLazyFileRoute('/admin/analytics-quality')({ component: Page });

function Page() {
  const report = Route.useLoaderData();
  const latest = report.latest;

  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">TexasDefined Operations</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">Analytics quality</h1>
    <p className="mt-4 max-w-3xl text-muted-foreground">Separate GA4's raw active-user count from privacy-minimized first-party evidence of genuine reading behavior. Quality classifications are conservative signals, not identity verification.</p>
    <div className="mt-8 flex flex-wrap gap-4 text-sm">
      <Link to="/admin/platform-health" className="font-medium text-primary hover:underline">← Platform health</Link>
    </div>

    <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="Raw GA4 active users" value={latest?.ga4ActiveUsers == null ? 'Not imported' : String(latest.ga4ActiveUsers)} detail={latest ? formatDate(latest.date) : 'No daily GA4 rollup yet'} />
      <Metric label="Likely genuine readers" value={!latest?.qualityMeasured ? 'Not yet measured' : String(latest.likelyGenuineReaders)} detail="Score ≥ 60 from visible time, trusted interaction and scroll signals" />
      <Metric label="Engaged readers" value={!latest?.qualityMeasured ? 'Not yet measured' : String(latest.engagedReaders)} detail="Score ≥ 80; a stricter subset of qualified sessions" />
      <Metric label="Suspicious sessions" value={!latest?.qualityMeasured ? 'Not yet measured' : String(latest.suspiciousSessions)} detail="Under 2 seconds, no trusted interaction and under 10% scroll" />
    </section>

    <section className="mt-10 rounded-md border border-border bg-muted/30 p-6">
      <h2 className="font-display text-2xl">How to read this</h2>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">GA4 already filters many known bots, but a GA4 active user is not proof of a human reader. TexasDefined now records a separate first-party quality signal only after browser behavior is observed. Missing quality data is shown as <strong className="text-foreground">Not yet measured</strong> rather than incorrectly converted to zero readers.</p>
    </section>

    <section className="mt-12 overflow-hidden rounded-md border border-border">
      <div className="border-b border-border px-5 py-4"><h2 className="font-display text-3xl">Last {report.windowDays} days</h2></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-muted/60 text-muted-foreground"><tr><Header>Date</Header><Header>GA4 users</Header><Header>GA4 sessions</Header><Header>Quality sessions</Header><Header>Likely genuine</Header><Header>Engaged</Header><Header>Suspicious</Header><Header>Avg. score</Header></tr></thead>
          <tbody>{[...report.daily].reverse().map((row) => <tr key={row.date} className="border-t border-border">
            <Cell>{formatDate(row.date)}</Cell>
            <Cell>{value(row.ga4ActiveUsers)}</Cell>
            <Cell>{value(row.ga4Sessions)}</Cell>
            <Cell>{row.qualityMeasured ? row.observedQualitySessions : '—'}</Cell>
            <Cell>{row.qualityMeasured ? row.likelyGenuineReaders : '—'}</Cell>
            <Cell>{row.qualityMeasured ? row.engagedReaders : '—'}</Cell>
            <Cell>{row.qualityMeasured ? row.suspiciousSessions : '—'}</Cell>
            <Cell>{row.qualityMeasured && row.averageQualityScore != null ? row.averageQualityScore.toFixed(1) : '—'}</Cell>
          </tr>)}</tbody>
        </table>
      </div>
    </section>

    <section className="mt-12 grid gap-8 lg:grid-cols-2">
      <Breakdown title="Suspicious paths" empty="No suspicious first-party sessions have been measured yet." rows={report.topSuspiciousPaths.map((row) => ({ label: row.path, count: row.sessions }))} />
      <Breakdown title="Likely-human referrers" empty="No likely-human first-party sessions have been measured yet." rows={report.likelyHumanReferrers.map((row) => ({ label: row.referrerClass, count: row.sessions }))} />
    </section>

    <section className="mt-12 rounded-md border border-border p-6">
      <h2 className="font-display text-3xl">Privacy controls</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="IP addresses stored in quality dataset" value={report.privacy.storesIpAddresses ? 'Yes' : 'No'} />
        <Fact label="Names or emails stored" value={report.privacy.storesNamesOrEmails ? 'Yes' : 'No'} />
        <Fact label="Raw user-agent stored" value={report.privacy.storesRawUserAgent ? 'Yes' : 'No'} />
        <Fact label="Session identifier" value={report.privacy.hashesSessionIdentifiers ? 'SHA-256 hashed' : 'Raw'} />
      </div>
    </section>
  </Container>;
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <article className="rounded-md bg-muted p-5"><strong className="font-display text-2xl">{value}</strong><span className="mt-2 block font-medium">{label}</span><small className="mt-1 block leading-5 text-muted-foreground">{detail}</small></article>; }
function Header({ children }: { children: ReactNode }) { return <th className="px-4 py-3 font-medium">{children}</th>; }
function Cell({ children }: { children: ReactNode }) { return <td className="px-4 py-3">{children}</td>; }
function Breakdown({ title, empty, rows }: { title: string; empty: string; rows: Array<{ label: string; count: number }> }) { return <div><h2 className="font-display text-3xl">{title}</h2><div className="mt-5 space-y-3">{rows.length ? rows.map((row) => <article key={row.label} className="flex items-center justify-between gap-4 rounded-md border border-border p-4"><span className="min-w-0 truncate text-sm">{row.label}</span><strong>{row.count}</strong></article>) : <p className="text-sm text-muted-foreground">{empty}</p>}</div></div>; }
function Fact({ label, value }: { label: string; value: string }) { return <div className="rounded-md bg-muted p-4"><span className="text-sm text-muted-foreground">{label}</span><strong className="mt-1 block">{value}</strong></div>; }
function value(input: number | null) { return input == null ? '—' : input; }
function formatDate(date: string) { const parsed = new Date(`${date}T12:00:00Z`); return Number.isFinite(parsed.getTime()) ? parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/Chicago' }) : date; }
