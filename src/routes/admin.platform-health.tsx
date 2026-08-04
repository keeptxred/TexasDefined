import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { InternalLinkMemoryCard } from '@/components/admin/InternalLinkMemoryCard';
import { CONTENT_HEALTH_RESOURCES, validateAuthoritativeSources } from '@/data/source-governance';
import { TEXAS_CITIES, TEXAS_COUNTIES, validateTexasPlaces } from '@/data/texas-places';
import { loadTexasKnowledgeGraph, validateTexasEntityRegistry } from '@/data/knowledge-graph';
import { auditTexasKnowledgeGraph } from '@/data/knowledge-graph/audit';
import { buildContentHealthReport } from '@/platform/content-health';
import { INTERNAL_LINK_SURFACES, internalLinkCoverageSummary } from '@/platform/internal-link-coverage';
import { auditInternalLinkQuality, INTERNAL_LINK_QUALITY_THRESHOLDS } from '@/platform/internal-link-quality';
import {
  INTERNAL_LINK_POLICIES,
  INTERNAL_LINK_POLICY_REVIEWED_AT,
  INTERNAL_LINK_POLICY_VERSION,
  validateInternalLinkPolicies,
} from '@/platform/internal-link-policies';

export const Route = createFileRoute('/admin/platform-health')({
  head: () => ({ meta: [{ title: 'Platform Health | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  loader: async () => {
    const graph = await loadTexasKnowledgeGraph();
    return { graph, audit: auditTexasKnowledgeGraph(graph), linkQuality: auditInternalLinkQuality(graph) };
  },
  component: Page,
});

function Page() {
  const { graph, audit, linkQuality } = Route.useLoaderData();
  const places = validateTexasPlaces();
  const sources = validateAuthoritativeSources();
  const entities = validateTexasEntityRegistry();
  const policyHealth = validateInternalLinkPolicies();
  const report = buildContentHealthReport(CONTENT_HEALTH_RESOURCES, new Date());
  const linkCoverage = internalLinkCoverageSummary();
  const errors = [...places.errors, ...sources.errors, ...entities.errors, ...audit.errors.map((issue) => issue.message), ...policyHealth.errors];
  const counts = graph.reduce<Record<string, number>>((result, entity) => { result[entity.kind] = (result[entity.kind] ?? 0) + 1; return result; }, {});
  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">TexasDefined Operations</p><h1 className="mt-3 font-display text-4xl sm:text-6xl">Platform Health</h1>
    <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <Metric value={places.valid ? 'Healthy' : 'Blocked'} label="Statewide place data" detail={`${TEXAS_COUNTIES.length} counties · ${TEXAS_CITIES.length} seeded cities`} />
      <Metric value={errors.length ? 'Needs review' : 'Healthy'} label="Knowledge graph" detail={`${graph.length} merged entities`} />
      <Metric value={policyHealth.valid ? `v${INTERNAL_LINK_POLICY_VERSION}` : 'Needs review'} label="Link policies" detail={`Reviewed ${INTERNAL_LINK_POLICY_REVIEWED_AT} · ${policyHealth.fingerprint}`} />
      <Metric value={`${linkCoverage.coveragePercent}%`} label="Internal-link coverage" detail={`${linkCoverage.activeSurfaces}/${linkCoverage.eligibleSurfaces} eligible surfaces active`} />
      <Metric value={linkQuality.healthy ? 'Healthy' : 'Needs review'} label="Link quality" detail={`${linkQuality.issues.length} threshold issues`} />
    </section>
    <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric value={`${linkQuality.ambiguousAliasPercent}%`} label="Ambiguous aliases" detail={`${linkQuality.ambiguousAliases} aliases · max ${INTERNAL_LINK_QUALITY_THRESHOLDS.maximumAmbiguousAliasPercent}%`} />
      <Metric value={`${linkQuality.orphanEntityPercent}%`} label="Orphan entities" detail={`${linkQuality.orphanEntities} entities · max ${INTERNAL_LINK_QUALITY_THRESHOLDS.maximumOrphanEntityPercent}%`} />
      <Metric value={`${linkQuality.unverifiedEntityPercent}%`} label="Unverified entities" detail={`${linkQuality.unverifiedEntities} entities · max ${INTERNAL_LINK_QUALITY_THRESHOLDS.maximumUnverifiedEntityPercent}%`} />
      <Metric value={String(report.needsAttention)} label="Content attention" detail={`${report.total} monitored resources`} />
    </section>
    <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <Metric value={String(audit.missingOfficialUrls)} label="Missing official URL" detail="Source verification required" />
      <Metric value={String(audit.missingCoordinates)} label="Missing coordinates" detail="Geographic entities only" />
      <Metric value={String(audit.missingRelationships)} label="Missing relationships" detail="Potential orphan entities" />
      <Metric value={String(audit.overdueReviews)} label="Overdue reviews" detail="Review date has passed" />
      <Metric value={String(audit.duplicateAliases)} label="Duplicate aliases" detail="Ambiguous entity resolution" />
    </section>
    {errors.length > 0 && <section className="mt-8 rounded-md border border-destructive/40 p-5"><h2 className="font-display text-2xl">Validation errors</h2>{errors.slice(0, 100).map((error) => <p className="mt-2 text-sm" key={error}>{error}</p>)}</section>}
    {linkQuality.issues.length > 0 && <section className="mt-8 rounded-md border border-amber-500/40 p-5"><h2 className="font-display text-2xl">Internal-link quality issues</h2>{linkQuality.issues.map((issue) => <p className="mt-2 text-sm" key={issue}>{issue}</p>)}</section>}
    <InternalLinkMemoryCard />
    <section className="mt-12"><h2 className="font-display text-3xl">Governed internal-link policies</h2><p className="mt-2 text-sm text-muted-foreground">Release {INTERNAL_LINK_POLICY_VERSION} · reviewed {INTERNAL_LINK_POLICY_REVIEWED_AT} · fingerprint {policyHealth.fingerprint}</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{Object.values(INTERNAL_LINK_POLICIES).map((policy) => <article key={policy.id} className="rounded-md border border-border p-5"><div className="flex items-start justify-between gap-3"><strong className="capitalize">{policy.id.replaceAll('-', ' ')}</strong><span className="rounded-full bg-muted px-2 py-1 text-xs">{policy.topic}</span></div><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><PolicyFact label="Page budget" value={String(policy.pageBudget)} /><PolicyFact label="Block budget" value={String(policy.blockBudget)} /><PolicyFact label="Minimum score" value={String(policy.minimumScore)} /><PolicyFact label="Ambiguity margin" value={String(policy.ambiguityMargin)} /></dl><p className="mt-4 text-xs text-muted-foreground">Preferred: {policy.preferredKinds.join(', ')}</p><p className="mt-2 text-xs text-muted-foreground">Excluded: {policy.excludedKinds.join(', ')}</p></article>)}</div></section>
    <section className="mt-12"><h2 className="font-display text-3xl">Internal-link surfaces</h2><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{INTERNAL_LINK_SURFACES.map((surface) => <article key={surface.id} className="rounded-md border border-border p-5"><div className="flex items-start justify-between gap-3"><strong>{surface.routePattern}</strong><span className="rounded-full bg-muted px-2 py-1 text-xs capitalize">{surface.status.replace('-', ' ')}</span></div><p className="mt-2 text-sm text-muted-foreground">{surface.notes}</p>{surface.pageBudget ? <p className="mt-2 text-xs text-muted-foreground">Page budget: {surface.pageBudget} links</p> : null}</article>)}</div></section>
    <section className="mt-12"><h2 className="font-display text-3xl">Entity coverage</h2><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([kind, count]) => <article key={kind} className="rounded-md border border-border p-5"><strong className="capitalize">{kind.replaceAll('-', ' ')}</strong><p className="mt-2 text-sm text-muted-foreground">{count} records</p></article>)}</div></section>
    <section className="mt-12"><h2 className="font-display text-3xl">Graph review queue</h2><div className="mt-6 space-y-3">{audit.issues.slice(0, 100).map((issue, index) => <article key={`${issue.code}-${issue.entityId ?? index}`} className="rounded-md border border-border p-5"><strong>{issue.code.replaceAll('-', ' ')}</strong><p className="mt-1 text-sm text-muted-foreground">{issue.message}</p></article>)}</div></section>
    <section className="mt-12"><h2 className="font-display text-3xl">Content review queue</h2><div className="mt-6 space-y-3">{report.items.map((item) => <article key={item.id} className="grid gap-2 rounded-md border border-border p-5 sm:grid-cols-[1fr_auto]"><div><strong>{item.title}</strong><p className="mt-1 text-sm text-muted-foreground">{item.issues.length ? item.issues.join(' · ') : 'No structural issues found'}</p></div><div className="text-sm"><span className="font-medium capitalize">{item.status.replace('-', ' ')}</span><p className="text-muted-foreground">{Number.isFinite(item.daysSinceReview) ? `${item.daysSinceReview} days since review` : 'Invalid review date'}</p></div></article>)}</div></section>
  </Container>;
}
function Metric({ value, label, detail }: { value: string; label: string; detail: string }) { return <article className="rounded-md bg-muted p-5"><strong className="font-display text-2xl">{value}</strong><span className="mt-2 block font-medium">{label}</span><small className="mt-1 block text-muted-foreground">{detail}</small></article>; }
function PolicyFact({ label, value }: { label: string; value: string }) { return <div><dt className="text-muted-foreground">{label}</dt><dd className="font-medium">{value}</dd></div>; }
