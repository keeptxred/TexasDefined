import type { TexasEntityRecord } from '@/data/knowledge-graph';
import { auditKnowledgeGraphBehavior, GRAPH_BEHAVIOR_THRESHOLDS } from '@/platform/knowledge-graph-behavior';

export function KnowledgeGraphBehavior({ graph }: { graph: TexasEntityRecord[] }) {
  const report = auditKnowledgeGraphBehavior(graph);
  const { simulation, completeness, benchmark } = report;
  return <section className="mt-12">
    <h2 className="font-display text-3xl">Knowledge-graph behavior</h2>
    <p className="mt-2 text-sm text-muted-foreground">Behavioral checks for reachability, authority, canonical paths, completeness, graph regressions, and AI retrieval.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric value={report.healthy ? 'Healthy' : 'Needs review'} label="Behavioral status" detail={`${report.issues.length} threshold issues`} />
      <Metric value={`${simulation.orphanPercent}%`} label="Orphan entities" detail={`Maximum ${GRAPH_BEHAVIOR_THRESHOLDS.maximumOrphanPercent}%`} />
      <Metric value={String(simulation.connectedComponents)} label="Connected components" detail={`${simulation.largestComponentSharePercent}% in largest component`} />
      <Metric value={`${benchmark.passPercent}%`} label="AI benchmark" detail={`${benchmark.passed}/${benchmark.total} cases passed`} />
    </div>
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric value={String(simulation.averageRelationships)} label="Average relationships" detail={`Minimum ${GRAPH_BEHAVIOR_THRESHOLDS.minimumAverageRelationships}`} />
      <Metric value={`${simulation.brokenRelationshipPercent}%`} label="Broken relationships" detail={`${simulation.brokenRelationshipCount} broken edges`} />
      <Metric value={String(completeness.averageScore)} label="Average completeness" detail={`Minimum ${GRAPH_BEHAVIOR_THRESHOLDS.minimumAverageCompleteness}`} />
      <Metric value={String(report.missingCanonicalPaths)} label="Missing canonical paths" detail="Entities without a complete Texas path" />
    </div>
    {report.issues.length > 0 && <div className="mt-6 rounded-md border border-amber-500/40 p-5"><strong>Behavioral release issues</strong>{report.issues.map((issue) => <p className="mt-2 text-sm" key={issue}>{issue}</p>)}</div>}
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      <List title="Weakest entities" items={completeness.weakest.slice(0, 10).map((item) => `${item.entityId} · ${item.score}% · missing ${item.missing.join(', ') || 'nothing'}`)} />
      <List title="Highest authority" items={report.authority.slice(0, 10).map((item) => `${item.entityId} · ${item.score}`)} />
      <List title="AI retrieval cases" items={benchmark.results.map((item) => `${item.passed ? 'PASS' : 'FAIL'} · ${item.query} · ${item.actualIds.slice(0, 3).join(', ') || 'no results'}`)} />
    </div>
  </section>;
}

function Metric({ value, label, detail }: { value: string; label: string; detail: string }) {
  return <article className="rounded-md border border-border p-5"><strong className="font-display text-2xl">{value}</strong><span className="mt-2 block font-medium">{label}</span><small className="mt-1 block text-muted-foreground">{detail}</small></article>;
}
function List({ title, items }: { title: string; items: string[] }) {
  return <article className="rounded-md border border-border p-5"><h3 className="font-display text-xl">{title}</h3><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}
