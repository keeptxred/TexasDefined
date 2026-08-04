import type { TexasEntityRecord } from '@/data/knowledge-graph';
import { AUTHORITATIVE_SOURCES } from '@/data/source-governance';
import { auditEntityMaintenanceHealth, ENTITY_MAINTENANCE_THRESHOLDS } from '@/platform/entity-maintenance';

export function EntityMaintenanceHealth({ graph }: { graph: TexasEntityRecord[] }) {
  const report = auditEntityMaintenanceHealth(graph, AUTHORITATIVE_SOURCES);
  const { entityHealth, sourceHealth } = report;
  return <section className="mt-12">
    <h2 className="font-display text-3xl">Entity maintenance</h2>
    <p className="mt-2 text-sm text-muted-foreground">Phase 3 source freshness, stale-entity review, and safe-import readiness.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric value={report.healthy ? 'Healthy' : 'Needs review'} label="Maintenance status" detail={`${report.issues.length} threshold issues`} />
      <Metric value={`${entityHealth.stalePercent}%`} label="Stale entities" detail={`${entityHealth.staleCount} records · max ${ENTITY_MAINTENANCE_THRESHOLDS.maximumStaleEntityPercent}%`} />
      <Metric value={`${entityHealth.missingOfficialUrlPercent}%`} label="Missing official URLs" detail={`${entityHealth.missingOfficialUrlCount} records · max ${ENTITY_MAINTENANCE_THRESHOLDS.maximumMissingOfficialUrlPercent}%`} />
      <Metric value={String(report.overdueSources)} label="Sources due" detail={`${sourceHealth.length} governed sources`} />
    </div>
    {report.issues.length > 0 && <div className="mt-6 rounded-md border border-amber-500/40 p-5"><strong>Maintenance issues</strong>{report.issues.map((issue) => <p className="mt-2 text-sm" key={issue}>{issue}</p>)}</div>}
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <List title="Highest-priority entity reviews" items={entityHealth.queue.slice(0, 20).map((item) => `${item.entityId} · priority ${item.priority} · ${item.reasons.join(', ') || 'current'}`)} />
      <List title="Authoritative source schedule" items={sourceHealth.map((source) => `${source.state.toUpperCase()} · ${source.name} · ${source.daysUntilReview ?? 'invalid'} days`)} />
    </div>
  </section>;
}
function Metric({ value, label, detail }: { value: string; label: string; detail: string }) { return <article className="rounded-md border border-border p-5"><strong className="font-display text-2xl">{value}</strong><span className="mt-2 block font-medium">{label}</span><small className="mt-1 block text-muted-foreground">{detail}</small></article>; }
function List({ title, items }: { title: string; items: string[] }) { return <article className="rounded-md border border-border p-5"><h3 className="font-display text-xl">{title}</h3><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{items.map((item) => <li key={item}>{item}</li>)}</ul></article>; }
