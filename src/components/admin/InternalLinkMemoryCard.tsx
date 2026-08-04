import { useEffect, useState } from 'react';
import { internalLinkMemorySummary } from '@/platform/internal-link-memory';

type Summary = ReturnType<typeof internalLinkMemorySummary>;

export function InternalLinkMemoryCard() {
  const [summary, setSummary] = useState<Summary>({ trackedEntities: 0, impressions: 0, clicks: 0 });
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
  </section>;
}

function Metric({ value, label }: { value: string; label: string }) {
  return <article className="rounded-md border border-border p-5"><strong className="font-display text-2xl">{value}</strong><span className="mt-2 block text-sm text-muted-foreground">{label}</span></article>;
}
