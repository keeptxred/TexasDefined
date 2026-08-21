import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';

export const Route = createLazyFileRoute('/admin/governance-health')({ component: Page });

function Page() {
  const health = Route.useLoaderData();
  const summary = health.summary;
  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">Texas Platform Operations</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">Cross-Site Governance Health</h1>
    <p className="mt-4 max-w-3xl text-muted-foreground">Privacy-safe publication decisions from TexasDefined and KeepTXRed, including override activity and canonical-ownership drift. Supabase persistence is used when configured, with bounded process memory as a fallback.</p>
    <div className="mt-8"><Link to="/admin/platform-health" className="text-sm font-medium text-primary hover:underline">← Platform Health</Link></div>
    <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="Health" value={health.healthy ? 'Healthy' : 'Needs review'} detail={`${health.ownershipDrift.length} unreviewed drift events`} />
      <Metric label="Recorded events" value={String(health.eventCount)} detail={`Memory fallback capped at ${health.maxMemoryEvents.toLocaleString()}`} />
      <Metric label="Blocked rate" value={`${(summary.blockedRate * 100).toFixed(1)}%`} detail={`${summary.blocked} blocked · ${summary.allowed} allowed`} />
      <Metric label="Override acceptance" value={`${(summary.overrideAcceptanceRate * 100).toFixed(1)}%`} detail={`${summary.overridesAccepted} accepted · ${summary.overridesRejected} rejected`} />
    </section>
    <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="TexasDefined events" value={String(summary.bySite.TexasDefined)} detail="All retained governed decisions" />
      <Metric label="KeepTXRed events" value={String(summary.bySite.KeepTXRed)} detail="All retained governed decisions" />
      <Metric label="Ownership drift" value={String(summary.ownershipDrift)} detail="Allowed off-owner without override" />
      <Metric label="Persistence" value={health.persistent ? 'Durable' : 'Fallback'} detail={health.persistenceError ?? health.storage} />
    </section>
    <Breakdown title="Events by content domain" values={summary.byDomain} />
    <Breakdown title="Events by disposition" values={summary.byDisposition} />
    <section className="mt-12 rounded-md border border-border p-6"><h2 className="font-display text-3xl">Privacy controls</h2><div className="mt-5 grid gap-3 sm:grid-cols-2"><Fact label="Article bodies stored" value={health.privacy.storesArticleBodies ? 'Yes' : 'No'} /><Fact label="Captions stored" value={health.privacy.storesCaptions ? 'Yes' : 'No'} /><Fact label="Reader identifiers stored" value={health.privacy.storesReaderIdentifiers ? 'Yes' : 'No'} /><Fact label="Credentials stored" value={health.privacy.storesCredentials ? 'Yes' : 'No'} /></div></section>
  </Container>;
}
function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <article className="rounded-md bg-muted p-5"><strong className="font-display text-2xl">{value}</strong><span className="mt-2 block font-medium">{label}</span><small className="mt-1 block text-muted-foreground">{detail}</small></article>; }
function Breakdown({ title, values }: { title: string; values: Record<string, number | undefined> }) { const entries = Object.entries(values).filter(([, count]) => count).sort((a, b) => Number(b[1]) - Number(a[1])); return <section className="mt-12"><h2 className="font-display text-3xl">{title}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{entries.length ? entries.map(([key, count]) => <article key={key} className="rounded-md border border-border p-5"><strong className="capitalize">{key.replaceAll('-', ' ')}</strong><p className="mt-2 text-2xl font-semibold">{count}</p></article>) : <p className="text-sm text-muted-foreground">No durable or in-memory events are available yet.</p>}</div></section>; }
function Fact({ label, value }: { label: string; value: string }) { return <div className="rounded-md bg-muted p-4"><span className="text-sm text-muted-foreground">{label}</span><strong className="mt-1 block">{value}</strong></div>; }
