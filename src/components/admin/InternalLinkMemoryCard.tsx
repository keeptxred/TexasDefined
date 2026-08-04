import { useEffect, useState } from 'react';
import { internalLinkMemorySummary } from '@/platform/internal-link-memory';

type Summary = ReturnType<typeof internalLinkMemorySummary>;
const EMPTY: Summary = { trackedEntities: 0, impressions: 0, clicks: 0, overexposed: [], mostEngaged: [], unclicked: [] };

export function InternalLinkMemoryCard() {
  const [summary, setSummary] = useState<Summary>(EMPTY);
  useEffect(() => setSummary(internalLinkMemorySummary()), []);
  const ctr = summary.impressions ? ((summary.clicks / summary.impressions) * 100).toFixed(1) : '0.0';
  return <section className="mt-12">
    <h2 className="font-display text-3xl">Internal-link outcomes on this browser</h2>
    <p className="mt-2 text-sm text-muted-foreground">Privacy-safe local counters only. No names, email addresses, physical addresses, or article text are stored.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric value={String(summary.trackedEntities)} label="Tracked entities" />
      <Metric value={String(summary.impressions)} label="Link impressions" />
      <Metric value={String(summary.clicks)} label="Link clicks" />
      <Metric value={`${ctr}%`} label="Local click-through rate" />
    </div>
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      <EntityList title="Most exposed" detail="Candidates for a ranking penalty" entries={summary.overexposed} metric={(entry) => `${entry.impressions} impressions`} />
      <EntityList title="Most engaged" detail="Links with at least three impressions" entries={summary.mostEngaged} metric={(entry) => `${(entry.ctr * 100).toFixed(1)}% CTR`} />
      <EntityList title="Shown but unclicked" detail="Review context or destination quality" entries={summary.unclicked} metric={(entry) => `${entry.impressions} impressions`} />
    </div>
  </section>;
}

function Metric({ value, label }: { value: string; label: string }) {
  return <article className="rounded-md border border-border p-5"><strong className="font-display text-2xl">{value}</strong><span className="mt-2 block text-sm text-muted-foreground">{label}</span></article>;
}

function EntityList({ title, detail, entries, metric }: { title: string; detail: string; entries: Summary['overexposed']; metric: (entry: Summary['overexposed'][number]) => string }) {
  return <article className="rounded-md border border-border p-5"><h3 className="font-display text-xl">{title}</h3><p className="mt-1 text-xs text-muted-foreground">{detail}</p><div className="mt-4 space-y-2">{entries.length ? entries.slice(0, 5).map((entry) => <div key={entry.entityId} className="flex items-start justify-between gap-3 text-sm"><code className="break-all text-xs">{entry.entityId}</code><span className="shrink-0 text-muted-foreground">{metric(entry)}</span></div>) : <p className="text-sm text-muted-foreground">Not enough local data yet.</p>}</div></article>;
}
